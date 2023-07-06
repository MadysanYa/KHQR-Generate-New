const {
    BakongKHQR,
    khqrData,
    MerchantInfo,
    IndividualInfo,
} = require("bakong-khqr");
const $ = require("jquery");
var FileSaver = require('file-saver');
import QrCodeWithLogo from "qrcode-with-logos";
// var typeKHQR = $("#type-khqr").val();

$('#generate').on('click', function(){
    let currency = "840";
    // let currency = $('#currency').val() == "840" ? khqrData.currency.usd : khqrData.currency.khr;
    let error = false;

    // Get Merchant Name value into KHQR image
    var input = "Ya Madysan";
    // var input = document.getElementById('merchantName').value;
    var temp = input;
    temp = temp.replace(/\s/g, '');
    var isKhmer = isKhmerLetter(temp);

    if(isKhmer){
        $('#merName').attr('style', 'font-size: 42px;margin-bottom: 2px;font-weight: 700; font-family: Hanuman Bold !important; ')
    }else{
        // $('#merName').attr('style', 'font-size: 42px; margin-bottom: 2px;font-weight: 700; font-family: Nunito Sans ExtraBold; ')
    }

    document.getElementById('merName').innerHTML = input;

    // Get Account Name value into KHQR image
    var input = "Ya Madysan";
    // var input = document.getElementById('accountName').value;
    // document.getElementById('accName').innerHTML = input;

    // Get Account No value into KHQR image
    var input = "700000379499";
    // var input = document.getElementById('accountNo').value;
    // document.getElementById('accNo').innerHTML = input;

    var input = "100";
    document.getElementById('amount').innerHTML = input;
 
    // Get Currency value into KHQR image
    var input = "840";
    // var input = document.getElementById('currency').value;
    var inputName = input;
    if(input == '840'){
        inputName = 'USD';
    }else if(input = '116'){
        inputName = 'KHR';
    }
    document.getElementById('curType').innerHTML = inputName;

    const optionalData = {
        currency: currency,
        // mobileNumber: $('#mobileNumber').val(),
        // storeLabel: $('#storeLabel').val(),
        terminalLabel: "terlabe123"
        // terminalLabel: $('#terminalLabel').val(),
    };
    const merchantInfo = new MerchantInfo(
        'shbkkhppxxx@shbk',
        "Ya Madysan",
        // $('#merchantName').val().trim(),
        "Phnom Penh",
        // $('#merchantCity').val(),
        "merchntid123",
        // $('#merchantId').val(),
        "Shinhan Bank Cambodia Plc",
        optionalData
    );
    const khqr = new BakongKHQR();
    var merchant = khqr.generateMerchant(merchantInfo);

    $('#khqrString').text(merchant.data.qr);
    var src = "./img/usd.png";
    if(currency == khqrData.currency.khr) {
        src = "./img/khr.png";
    }

    new QrCodeWithLogo({
        content: merchant.data.qr,
        width: 641,
        download: false,
        image: document.getElementById("image"),
        logo: {
            src: src,
            // borderRadius: 50,
            borderSize: 0.02
        }
    }).toImage().then(() => {
        // var cpimg = document.getElementById("image1");
        html2canvas(document.querySelector("#gen1")).then(canvas => {
            // document.body.appendChild(canvas);
          
            // Fix size on KHQR place
            $('#preview').empty()
            document.getElementById('preview').appendChild(canvas);
            // $('#preview > canvas').attr('style', 'background-size: 100% 100%;');
            $('#preview > canvas').attr('style', 'width: 320px;');
        });
        $('#download').removeClass('d-none');
    }); 
 
    $('#download').on('click', () => {
        html2canvas(document.querySelector("#gen1")).then(canvas => {
            canvas.toBlob(function(blob) {
                window.saveAs(blob, "KHQR.png");
            });
        });
    });
});

myFunction();

function isKhmerLetter(string) {
    let isKhmer = true;
    for (let i = 0; i < string.length; i++) {
        let code = string.charCodeAt(i);
        if (code < 0x1780 || (code > 0x17FF && code < 0x19E0) || code > 0x19FF) {
            isKhmer = false;
            break;
        }
    }

    return isKhmer;
}

function myFunction() {
        var prqr = document.getElementById("gen1"); 
        var hdqr = document.getElementById("head");
        var img1 = document.getElementById("image");
        var dhead = document.getElementById("dhead");

        // Add New
        var dhead = document.getElementById("dhead");
        var mName = document.getElementById("merName");
        var aName = document.getElementById("accName");
        var aNo = document.getElementById("accNo");
        var curT = document.getElementById("curType");
        var amount = document.getElementById("amount");

        // prqr.style.background = "url(img/Card_641x1008/KHQR_Card_q.png)";
        // prqr.style.width = "641px";
        // prqr.style.height = "1008px";    
        prqr.style.borderRadius = "0";
        prqr.style.marginTop = "20px";

        prqr.style.padding = "0 !important";
        prqr.style.backgroundSize = "100% 100%";
        // background-size: 100% 100%;
        hdqr.innerHTML = "";
        img1.style.width = "290px";
        // img1.style.paddingTop = "248px";

        // Add New
        dhead.style.marginTop = "0px";
        // mName.style.fontSize = "40px";
        // mName.style.fontWeight = "700";
        // mName.style.marginBottom = "2px";
        aName.style.fontSize = "26px";
        aName.style.fontWeight = "500";
        aNo.style.fontSize = "26px";
        aNo.style.fontWeight = "500";
        amount.style.fontSize = "22px";
        amount.style.fontWeight = "700";
        // curT.style.fontSize = "26px";
        // curT.style.fontWeight = "500";
        // document.getElementById("gen1").innerHTML = x.options[i].innerText = "Testing one";
}


