const express = require('express')
const fs = require('fs');
const bodyParser = require('body-parser')
const requiredFields = require('express-required-fields')

const app = express()

// create application/json parser
app.use(bodyParser.json())

app.post('/api/shinhan/khqr-generate', requiredFields([
        'req_time', 
        'amount',
        'bill_number',
        'merchant_id',
        'hash',
        'terminal_id',
        'merchant_city',
        'merchant_name',
        'currency'
    ],{ error_status: 400, message:'Missing required fields' }), 
async (req, res) => {

    // Validation authorized
    if (!req.body.secret_key) {
        return res.status(401).json({ error: 'You are not authorized to access.' });
    }

    // Body parameter
    const reqTime = req.body.req_time; 
    const amount = req.body.amount;
    const billNumber = req.body.bill_number;
    const terminalId = req.body.terminal_id;
    const merchantId = req.body.merchant_id;
    const merchantCity = req.body.merchant_city;
    const merchantName = req.body.merchant_name;
    const hash = req.body.hash;
    const currency = req.body.currency;

    // Load KHQR file

    // Load the image file
    const imageFilePath = "./img/khqr-logo.png";
  
    // Read the image file
    const imageBuffer = fs.readFileSync(imageFilePath);

    // Convert the image buffer to Base64 string
    const base64String = imageBuffer.toString('base64');
  
    // Return the Base64 data:image/png;base64, string in the response
    return res.json({
        "amount": amount,
        "status": {
            "code": 200,
            "message": "Success!"
        },
        "description ":"success",
        "QR": base64String
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});