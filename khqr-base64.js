const express = require('express');
const path = require('path');
const ejs = require('ejs');
const { createCanvas, loadImage } = require('canvas');
const html2canvas = require('html2canvas');

const app = express();

app.use(express.static(path.join(__dirname, 'css')),
        express.static(path.join(__dirname, 'js')), 
        express.static(path.join(__dirname, 'img')));

app.get('/convert-to-html', async (req, res) => {
  const name = "Ya Madysan";
  const amount = 190;

  const filePath = path.join(__dirname, './khqr-base64.html');

  ejs.renderFile(filePath, { name, amount }, async (err, html) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    // Send the html data as a response
    res.send(html);
  })
});

app.listen(3030, () => {
    console.log('Server is running on port 3030');
});