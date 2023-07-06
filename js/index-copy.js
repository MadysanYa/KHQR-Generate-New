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
    let currency = $('#currency').val() == "840" ? khqrData.currency.usd : khqrData.currency.khr;
    let error = false;

    // Get Merchant Name value into KHQR image
    var input = document.getElementById('merchantName').value;
    var temp = input;
    console.log(temp);
    temp = temp.replace(/\s/g, '');
    // alert(temp);
    var isKhmer = isKhmerLetter(temp);

    if(isKhmer){
        // alert('Khmer');
        var x = document.getElementById("qrimage");
        var i = x.selectedIndex;
    
        // Khmer Language Fonts
        if(i == 1) {
            // alert("This is Khmer Card Size");
            $('#merName').attr('style', 'font-size: 42px;margin-bottom: 2px;font-weight: 700; font-family: Hanuman Bold !important; ')
        }
        if(i == 2) {
            // alert("This is Khmer Small Sticker Size");
            $('#merName').attr('style', 'font-size: 60px;margin-bottom: 2px;font-weight: 700; font-family: Hanuman Bold !important; ')
        }
        if(i == 3) {
            // alert("This is Khmer Standiplay Size");
            $('#merName').attr('style', 'font-size: 78px;margin-bottom: 2px;font-weight: 700; font-family: Hanuman Bold !important; ')
        }
        if(i == 4) {
            // alert("This is Khmer Sticker Size");
            $('#merName').attr('style', 'font-size: 78px;margin-bottom: 2px;font-weight: 700; font-family: Hanuman Bold !important; ')
        }
    }
    else{
        var x = document.getElementById("qrimage");
        var i = x.selectedIndex;
    
        // English Language Fonts
        if(i == 1) {
            // alert("This is English Card Size");
            $('#merName').attr('style', 'font-size: 42px; margin-bottom: 2px;font-weight: 700; font-family: Nunito Sans ExtraBold; ')
        }
        if(i == 2) {
            // alert("This is English Small Sticker Size");
            $('#merName').attr('style', 'font-size: 60px; margin-bottom: 2px;font-weight: 700; font-family: Nunito Sans ExtraBold; ')
        }
        if(i == 3) {
            // alert("This is English Standiplay Size");
            $('#merName').attr('style', 'font-size: 78px; margin-bottom: 2px;font-weight: 700; font-family: Nunito Sans ExtraBold; ')
        }
        if(i == 4) {
            // alert("This is English Khmer Sticker Size");
            $('#merName').attr('style', 'font-size: 78px; margin-bottom: 2px;font-weight: 700; font-family: Nunito Sans ExtraBold; ')
        }
    }
    // var inputFont = input;
    // if(input == '840'){
    //     inputFont = 'USD';
    // }else if(input = '116'){
    //     inputFont = 'KHR';
    // }
    document.getElementById('merName').innerHTML = input;

    // Get Account Name value into KHQR image
    var input = document.getElementById('accountName').value;
    document.getElementById('accName').innerHTML = input;

    // Get Account No value into KHQR image
    var input = document.getElementById('accountNo').value;
    document.getElementById('accNo').innerHTML = input;
 
    // Get Currency value into KHQR image
    var input = document.getElementById('currency').value;
    var inputName = input;
    if(input == '840'){
        inputName = 'USD';
    }else if(input = '116'){
        inputName = 'KHR';
    }
    document.getElementById('curType').innerHTML = "(" + inputName + ")";

    var x = document.getElementById("qrimage");
    var i = x.selectedIndex;

    if(i == 0) {
        alert("Please Choose KHQR Type");
        // $('#bakongAccountIdMsg').removeClass('d-none');
        error = true;
    }

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
            $('#merchantName').val().trim(),
            $('#merchantCity').val(),
            $('#merchantId').val(),
            "Shinhan Bank Cambodia Plc",
            optionalData
        );
        const khqr = new BakongKHQR();
        var merchant = khqr.generateMerchant(merchantInfo);
        
    }else if(typeKHQR == 'personal'){
        const optionalData = {
            currency: currency,
            // mobileNumber: $('#mobileNumber').val(),
            amount:  $('#amount').val(),
            acquiringBank: "Shinhan Bank Cambodia Plc",
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
            $('#preview > canvas').attr('style', 'width: 450px;');
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

$('#qrimage').change(function() {
    myFunction($(this));
});

$('#merchantName').on('input', function() {
    //checkKhmerUnicode($(this));
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

$(document).ready(function() {
    $(document).on('paste', function(e) {
        
        var pastedData = e.originalEvent.clipboardData.getData("text").split('|');

            // var currency = pastedData[5];
            // if(pastedData[5] == '840'){
            //     currency = 'USD';
            // }
            //     else
            //     {
            //         currency = 'KHR';
            //     }
                


            // }else if(pastedData[5] != '116'){
            //     Terminal = 'KHR';
            // }
            
            // console.log('length' + pastedData[0].length);

            console.log(pastedData);

            // if (pastedData[0].length < maxLength) {
            //     pastedData[0].slice('sfdsdf', pastedData[1]);
            // } 

        pastedData[0] = pastedData[0] + "                         ";
        if (pastedData.length == 7) {

            $('#merchantName').val(pastedData[0]);
            $('#merchantCity').val(pastedData[1]);
            $('#merchantId').val(pastedData[2]);

            $('#mobileNumber').val(pastedData[3]);
            // $('#storeLabel').val(pastedData[4]);
            $('#terminalLabel').val(pastedData[4]);
            // $('#accountname').val(pastedData[6]);
            // $('#accountno').val(pastedData[7]);
            $('#currency').val(pastedData[5]);

            // $('#merchantName').val(pastedData[0]);
            // $('#merchantCity').val(pastedData[1]);
            // $('#merchantId').val(pastedData[2]);
            // $('#mobileNumber').val(pastedData[3]);
            // $('#storeLabel').val(pastedData[4]);
            // $('#terminalLabel').val(pastedData[5]);
            // // $('#accountname').val(pastedData[6]);
            // // $('#accountno').val(pastedData[7]);
            // $('#currency').val(pastedData[6]);
            // // $('#merchantName').val(pastedData[0]);
            
        }        
    });


    
    // var ctrlDown = false,
    //     ctrlKey = 17,
    //     cmdKey = 91,
    //     vKey = 86,
    //     cKey = 67;

    // $(document).on('keydown', function(e) {
    //     if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = true;
    // }).keyup(function(e) {
    //     if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = false;
    // });
    
    // // Document Ctrl + C/V 
    // $(document).on('keydown', function(e) {
    //     if (ctrlDown && (e.keyCode == vKey)) {

    //     }
    // });
});


$('#merchantName').on('blur',function(){
    $(this).val($(this).val().trim());
    
});

function checkKhmerUnicode(element) {
    let text = element.val();
    let code = text.charCodeAt(text.length - 1);
    if (code < 0x1780 || (code > 0x17FF && code < 0x19E0) || code > 0x19FF) {
    } else {
        element.val(element.val().slice(0, -1));
    }
}

function isKhmerLetter(string) {
    let isKhmer = true;
    for (let i = 0; i < string.length; i++) {
        // if(string[i] != " "){
        let code = string.charCodeAt(i);
            if (code < 0x1780 || (code > 0x17FF && code < 0x19E0) || code > 0x19FF) {
                isKhmer = false;
                break;
            }
        // }
        // else {
        //     alert('space');
        // }
    }

    return isKhmer;
}



function myFunction() {

    var x = document.getElementById("qrimage");
    var i = x.selectedIndex;

    // if(i == 0){
        
    //     alert("Please Choose KHQR Type");
    //     // var prqr = document.getElementById("gen1"); 
    //     // var hdqr = document.getElementById("head");
    //     // var img1 = document.getElementById("image1");

    //     // document.ge

    //     // prqr.style.background = "#f2f2f2";
    //     // prqr.style.width = "";
    //     // prqr.style.height = "";
    //     // prqr.style.borderRadius = "20px";
    //     // hdqr.innerHTML = "KHQR";
    //     // img1.style.width = "";
    //     // img1.style.paddingTop = "";
    //     // document.getElementById("gen1").innerHTML = x.options[i].innerText = "Testing";
    // }
    
    if(i == 1 )
    {
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

        prqr.style.background = "url(img/Card_641x1008/KHQR_Card_q.png)";
        prqr.style.width = "641px";
        prqr.style.height = "1008px";    
        prqr.style.borderRadius = "0";
        prqr.style.marginTop = "20px";

        prqr.style.padding = "0 !important";
        prqr.style.backgroundSize = "100% 100%";
        // background-size: 100% 100%;
        hdqr.innerHTML = "";
        img1.style.width = "365px";
        img1.style.paddingTop = "248px";

        // Add New
        dhead.style.marginTop = "40px";
        mName.style.fontSize = "40px";
        mName.style.fontWeight = "700";
        mName.style.marginBottom = "2px";
        aName.style.fontSize = "26px";
        aName.style.fontWeight = "500";
        aNo.style.fontSize = "26px";
        aNo.style.fontWeight = "500";
        curT.style.fontSize = "26px";
        curT.style.fontWeight = "500";
        // document.getElementById("gen1").innerHTML = x.options[i].innerText = "Testing one";
    }
    else if(i == 2 )
    {
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

        prqr.style.background = "url(img/Small_Sticker_946x1354/KHQR_Small_Sticker_q.png)";
        prqr.style.width = "946px";
        prqr.style.height = "1354px";
        prqr.style.borderRadius = "0";
        prqr.style.marginTop = "20px";
        
        prqr.style.padding = "0 !important";
        prqr.style.backgroundSize = "100% 100%";

        hdqr.innerHTML = "";
        img1.style.width = "420px";
        img1.style.paddingTop = "347px";

        // Add New
        dhead.style.marginTop = "60px";
        mName.style.fontSize = "60px !important";
        mName.style.fontWeight = "700";
        mName.style.marginBottom = "15px";
        aName.style.fontSize = "27px";
        aName.style.fontWeight = "500";
        aNo.style.fontSize = "27px";
        aNo.style.fontWeight = "500";
        curT.style.fontSize = "27px";
        curT.style.fontWeight = "500";
        // document.getElementById("gen1").innerHTML = x.options[i].innerText = "Testing Two";
    }
    else if(i == 3 )
    {
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

        prqr.style.background = "url(img/Standiplay_1217x1744/KHQR_Standiplay_q.png)";
        prqr.style.width = "1217px";
        prqr.style.height = "1744px";
        prqr.style.borderRadius = "0";
        prqr.style.marginTop = "20px";

        prqr.style.padding = "0 !important";
        prqr.style.backgroundSize = "100% 100%";

        hdqr.innerHTML = "";
        img1.style.width = "540px";
        img1.style.paddingTop = "455px";

        // Add New
        dhead.style.marginTop = "80px";
        mName.style.fontSize = "78px";
        mName.style.fontWeight = "700";
        mName.style.marginBottom = "15px";
        aName.style.fontSize = "36px";
        aName.style.fontWeight = "500";
        aNo.style.fontSize = "36px";
        aNo.style.fontWeight = "500";
        curT.style.fontSize = "36px";
        curT.style.fontWeight = "500";
        // document.getElementById("gen1").innerHTML = x.options[i].innerText = "Testing Three";
    }
    else if(i == 4 )
    {
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

        prqr.style.background = "url(img/Sticker_1217x1744/KHQR_Sticker_q.png)";
        prqr.style.width = "1217px";
        prqr.style.height = "1744px";
        prqr.style.borderRadius = "0";
        prqr.style.marginTop = "20px";  

        prqr.style.padding = "0 !important";
        prqr.style.backgroundSize = "100% 100%";

        hdqr.innerHTML = "";
        img1.style.width = "540px";
        img1.style.paddingTop = "455px";

        // Add New
        dhead.style.marginTop = "80px";
        mName.style.fontSize = "78px";
        mName.style.fontWeight = "700";
        mName.style.marginBottom = "15px";
        aName.style.fontSize = "36px";
        aName.style.fontWeight = "500";
        aNo.style.fontSize = "36px";
        aNo.style.fontWeight = "500";
        curT.style.fontSize = "36px";
        curT.style.fontWeight = "500";
        // document.getElementById("gen1").innerHTML = x.options[i].innerText = "Testing Four";
    }
}


