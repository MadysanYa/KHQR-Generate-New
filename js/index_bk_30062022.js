const {
    BakongKHQR,
    khqrData,
    MerchantInfo,
    IndividualInfo,
} = require("bakong-khqr");
const $ = require("jquery");
var FileSaver = require('file-saver');
import QrCodeWithLogo from "qrcode-with-logos";
var typeKHQR = $("#type-khqr").val();

$('#generate').on('click', function(){
    let currency = $('#currency').val() == "USD" ? khqrData.currency.usd : khqrData.currency.khr;
    let error = false;

    $('.require').addClass('d-none');
    
    if($('#bakongAccountId').val()=='') {
        $('#bakongAccountIdMsg').removeClass('d-none');
        error = true;
    }

    if($('#merchantName').val()=='') {
        $('#merchantNameMsg').removeClass('d-none');
        error = true;
    }

    if($('#merchantCity').val()=='') {
        $('#merchantCityMsg').removeClass('d-none');
        error = true;
    }

    if($('#merchantId').val()=='') {
        $('#merchantIdMsg').removeClass('d-none');
        error = true;
    }

    if(error)
        return;
    if(typeKHQR == 'merchant'){
        const optionalData = {
            currency: currency,
            mobileNumber: $('#mobileNumber').val(),
            storeLabel: $('#storeLabel').val(),
            terminalLabel: $('#terminalLabel').val(),
        };
        const merchantInfo = new MerchantInfo(
            'shbkkhppxxx@shbk',
            $('#merchantName').val(),
            $('#merchantCity').val(),
            $('#merchantId').val(),
            "shbk",
            optionalData
        );
        const khqr = new BakongKHQR();
        var merchant = khqr.generateMerchant(merchantInfo);
        
    }else if(typeKHQR == 'personal'){
        const optionalData = {
            currency: currency,
            // mobileNumber: $('#mobileNumber').val(),
            amount:  $('#amount').val(),
            acquiringBank: "shbk",
            accountInformation: $('#merchantId').val()
    
    
            // storeLabel: $('#storeLabel').val(),
            // terminalLabel: $('#terminalLabel').val(),
        };
        const merchantInfo = new IndividualInfo(
            'shbkkhppxxx@shbk',
            $('#merchantName').val(),
            $('#merchantCity').val(),
            optionalData
        );
    
        const khqr = new BakongKHQR();
        var merchant = khqr.generateIndividual(merchantInfo);
    }
    $('#khqrString').text(merchant.data.qr);
    

    var src = "./img/usd.png";
    if(currency == khqrData.currency.khr) {
        src = "./img/khr.png";
    }
    new QrCodeWithLogo({
        content: merchant.data.qr,
        width: 440,
        download: false,
        image: document.getElementById("image"),
        logo: {
            src: src,
            borderRadius: 50,
            borderSize: 0.02
        }
    }).toImage().then(() => {
        $('#download').removeClass('d-none');
    }); 
 
    $('#download').on('click', () => {
        let imagePath =  $('#image').attr('src');
        FileSaver.saveAs(imagePath, "KHQR");
    });
});


$('#merchantName').on('input', function() {
    checkKhmerUnicode($(this));
});

$('#storeLabel').on('input', function() {
    checkKhmerUnicode($(this));
});

$('#terminalLabel').on('input', function() {
    checkKhmerUnicode($(this));
});

$('#mobileNumber').on('keydown', function(e) {
    if($(this).val().length == 0) {
        let key = e.keyCode;
        if( key == 8 || key == 46 )
            return false;

        $(this).val('855' + $(this).val());
    }
});

$('#mobileNumber').on('input', function() {
    if ($(this).val().length > $(this).attr('maxLength')) {
        $(this).val($(this).val().slice(0, $(this).attr('maxLength')));
    } 
});

function checkKhmerUnicode(element) {
    let text = element.val();
    let code = text.charCodeAt(text.length - 1);
    if (code < 0x1780 || (code > 0x17FF && code < 0x19E0) || code > 0x19FF) {
    } else {
        element.val(element.val().slice(0, -1));
    }
}


