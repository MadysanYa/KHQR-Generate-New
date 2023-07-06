<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Bakong KHQR</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="./css/bootstrap.min.css" rel="stylesheet">
        <script src="./js/bootstrap.bundle.min.js"></script>
        <!-- HTML to Canvas -->
        <script src="./js/html2canvas.js"></script>
        <script src="./js/html2canvas.min.js"></script>

        <link rel="shortcut icon" href="./img/sbc_logo.png" />
        <style>
             @font-face {
                font-family: "Nunito Sans ExtraBold";
                src: url("fonts/NunitoSans-ExtraBold.ttf");
                }

                @font-face {
                font-family: "Hanuman Bold";
                src: url("fonts/Hanumanb.ttf");
                }
                /* Hanuman Bold */

            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }



            .title
            {
                /* margin-left: 205px;
                margin-bottom: 10px; */
                justify-content: center;
                /* margin-top: -8px; */
            }

            .content
            {
                text-align: center;
                border: 0;
                font-weight: 500;
                font-size: 5px;
                flex: none;
                display: block;
                /* font-family: "Nunito Sans ExtraBold"; */
            }

           
            
        /* .hidden {
            display: none;

        } */
        </style>
    </head>
    <body>
<!-- <label style="font-family: Nunito Sans ExtraBold">ssdfGsewiweorisdfwelkrrw</label> -->
        <div class="container">
        <!-- style="max-width:fit-content ;" -->
            <h1 class="text-center py-5">
                <img src="./img/sbc_logo.png" width="75"/>
                Bakong KHQR Generator For Merchant
            </h1>
            <input type="hidden" id="type-khqr" name="type-khqr" value="merchant"/>
            <div class="row">
                <div class="col-6">
                    <div style="border: 1px solid #d1d1d1; padding: 30px; border-radius: 20px; " class="h-100">
                        <h3 class="text-center pb-3">Bakong Merchant Information</h3>
                        <div class="form-group pb-3 row">
                            <label class="col-sm-4 d-flex align-items-center">Merchant Name *</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="merchantName" placeholder="Please Enter Merchant Name *" maxlength="25">    
                                <small id="merchantNameMsg" class="d-none form-text text-danger require">Please enter Merchant Name</small>
                            </div>
                        </div>

                        <!-- Choose Merchant City -->
                        <div class="form-group pb-3 row">
                            <label class="col-sm-4 d-flex align-items-center">Merchant City *</label>
                            <div class="col-sm-8">
                                <select id="merchantCity" class="form-control" style="appearance: auto">
                                    <option selected>Phnom Penh</option>
                                    <!-- <option>Banteay Meanchey</option> -->
                                    <option>Battambang</option>
                                    <option>Kampong Cham</option>
                                    <option>Kampong Chhnang</option>
                                    <option>Kampong Speu</option>
                                    <option>Kampong Thom</option>
                                    <option>Kampot</option>
                                    <option>Kandal</option>
                                    <option>Kep</option>
                                    <option>Koh Kong</option>
                                    <option>Kratié</option>
                                    <option>Mondulkiri</option>
                                    <option>Oddar Meanchey</option>
                                    <option>Pailin</option>
                                    <option>Preah Sihanouk</option>
                                    <option>Preah Vihear</option>
                                    <option>Prey Veng</option>
                                    <option>Pursat</option>
                                    <option>Ratanakiri</option>
                                    <option>Siem Reap</option>
                                    <option>Stung Treng</option>
                                    <option>Svay Rieng</option>
                                    <option>Takeo</option>
                                    <option>Tboung Khmum</option>
                                </select>
                            </div>
                        </div>

                        <!-- Merchant Id -->
                        <div class="form-group pb-3 row">
                            <label class="col-sm-4 d-flex align-items-center">Merchant Id *</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" id="merchantId" aria-describedby="merchantId" placeholder="Please Enter Merchant Id *" maxlength="8" 
                                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"/>
                                <small id="merchantIdMsg" class="d-none form-text text-danger require">Please enter Merchant Id</small>
                            </div>
                        </div>

                        <!-- Mobile Number -->
                        <div class="form-group pb-3 row">
                            <label class="col-sm-4 d-flex align-items-center">Mobile Number</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" id="mobileNumber" placeholder="Please Enter Mobile Number" maxlength="12"/>
                            </div>
                        </div>

                        <!-- Store Label -->
                        <div class="form-group pb-3 row">
                            <label class="col-sm-4 d-flex align-items-center">Store Label</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="storeLabel" placeholder="Please Enter Store Label" maxlength="24" />
                            </div>
                        </div>

                        <!-- Terminal Label -->
                        <div class="form-group pb-3 row">
                            <label class="col-sm-4 d-flex align-items-center">Terminal Label</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="terminalLabel" placeholder="Please Enter Terminal Label" maxlength="24" />
                            </div>
                        </div>

                        <!-- <div class="form-group pb-3 row">
                            <label class="col-sm-4 d-flex align-items-center">currency</label>
                            <div class="col-sm-8">
                                <select id="currency" class="form-control" style="appearance: auto">
                                    <option selected>USD</option>
                                    <option>KHR</option>
                                </select>
                            </div>
                        </div> -->

                        <!-- Fill Account Name for show on image of KHQR -->
                        <div class="form-group pb-3 row">
                            <label class="col-sm-4 d-flex align-items-center">Account Name</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="accountName" placeholder="Please Enter Account Name" maxlength="30">    
                                <small id="merchantNameMsg" class="d-none form-text text-danger require">Please enter Account Name</small>
                            </div>
                        </div>

                        <!-- Fill Account Number for show on image of KHQR -->
                        <div class="form-group pb-3 row">
                            <label class="col-sm-4 d-flex align-items-center">Account No</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="accountNo" placeholder="Please Enter Account Number " maxlength="25">    
                                <small id="merchantNameMsg" class="d-none form-text text-danger require">Please enter Account No</small>
                            </div>
                        </div>

                        <!-- Choose Currency & show on image of KHQR -->
                        <div class="form-group pb-3 row">
                            <label class="col-sm-4 d-flex align-items-center">currency</label>
                            <div class="col-sm-8">
                                <select id="currency" class="form-control" style="appearance: auto">
                                    <option selected value="840">USD</option>
                                    <option value="116">KHR</option>
                                </select>
                            </div>
                        </div>

                        <!-- Choose KHQR Type -->
                        <div class="form-group pb-3 row">
                            <label class="col-sm-4 d-flex align-items-center">KHQR Type</label>
                            <div class="col-sm-8">
                                <select id="qrimage" class="form-control" style="appearance: auto">
                                    <option disabled selected>Please choose an option</option>
                                    <!-- <option>Default</option> -->
                                    <option>Card_641x1008</option>
                                    <option>Small_Sticker_946x1354</option>
                                    <option>Standiplay_1217x1744</option>
                                    <option>Sticker_1217x1744</option>
                                </select>
                            </div>
                        </div>
                    
                        <button class="btn btn-primary d-block m-auto mt-2" id="generate">Generate KHQR</button>
                        <div id="khqrString" class="py-3" style="line-break: anywhere;"></div>
                    </div>
                </div>

                <div class="col-6 p-3" style="background-color: #e9ecef; border-radius: 20px; text-align:center; border: 1px solid #759bbf;">
                    <h3 class="text-center pb-3">KHQR Preview</h3>
                    <div id="preview" class="d-block m-auto" style="width: 100%;"></div>
                    <a class="btn btn-primary mt-3 d-block m-auto d-none" id="download" style="width: 30%;">Download KHQR</a>
                </div>

                <!-- <div class="col-6 p-3" style="background-color: #f2f2f2; border-radius: 20px;">
                    <h3 class="text-center pb-3">KHQR</h3>
                    <div id="preview" style="width: 100%;"></div>
                    <img id="image" class="d-block m-auto">
                    <a class="btn btn-primary mt-3 d-block m-auto d-none" id="download" style="width: 30%;">Download KHQR</a>
                </div> -->
            </div>

            <center>
                <div id="gen1" class="col-6 p-3" style="background-color: #f2f2f2; border-radius: 20px; padding: 0px !important; position: absolute; top: -3000px; ">
                <!-- <div id="gen1" class="col-6 p-3" style="background-color: #f2f2f2; border-radius: 20px; padding: 0px !important;"> -->
                    <!-- <h3 id="head" class="text-center pb-3">KHQR</h3> -->
                    <h3 id="head" class="text-center pb-3"></h3>
                    <img id="image" class="d-block m-auto">

                    <!-- Add New -->
                    <div id="dhead" style="margin-top: 40px; ">
                        <div class="title col-sm-4 d-flex align-items-center">
                            <label id="merName" class="content" style="font-size: 25px; margin-bottom: 2px; font-weight: bold; font-family: Nunito Sans ExtraBold;"></label>
                        </div>
                        <div class="title col-sm-4 d-flex align-items-center">
                            <label id="accName" class="content"></label>
                        </div>
                        <div class="title col-sm-4 d-flex align-items-center">
                            <label id="accNo" class="content"></label>&nbsp;
                            <label id="curType" class="content"></label>
                        </div>
                    </div>
                </div>
            </center>

            <!-- <center>
                <div id="gen2" class="col-6 p-3" style="background-color: #f2f2f2; border-radius: 20px; padding: 0px !important;">
                    <h3 id="head" class="text-center pb-3"></h3>
                    <img id="image" class="d-block m-auto">

                    <div id="dhead" style="margin-top: 40px; ">
                        <div class="title col-sm-4 d-flex align-items-center">
                            <label id="merName" class="content" style="font-size: 25px; margin-bottom: 2px; font-weight: 700;">test 1</label>
                        </div>
                        <div class="title col-sm-4 d-flex align-items-center">
                            <label id="accName" class="content">test 2</label>
                        </div>
                        <div class="title col-sm-4 d-flex align-items-center">
                            <label id="accNo" class="content">test 3</label>
                            <label id="curType" class="content">currency test</label>
                        </div>
                    </div>
                </div>
            </center> -->
            <!-- <div>
                <a class="btn btn-primary mt-3 d-block m-auto d-none" id="download" style="width: 30%;">Download KHQR</a>
            </div> -->
            <!-- <a class="btn btn-secondary mt-3 py-2 d-block m-auto" style="width: 30%;" href="individual.html">Generator For Personal</a> -->

        </div>

        <script src="./dist/bundle.js"></script>
        <!-- <script>
            // On Keyboard Typing can on other place
            // const input = document.querySelector('#merchantName');
            // const log = document.getElementById('merName');

            // input.addEventListener('input', updateValue);

            // function updateValue(e) {
            // log.textContent = e.target.value;
            // }
        </script> -->
    </body>
</html>
