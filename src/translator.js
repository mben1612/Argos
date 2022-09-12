const request = require('request');
module.exports = function translate(langto,text,howoften,Callback){
    const url = "https://script.google.com/macros/s/AKfycbx9Mia8aRJ4OJ3geF5MJViZ951DpQaYRIKOt-fX-8zsXL9-wreU8EPz5smBZHF_XsJN3Q/exec" +
    "?q=" + encodeURIComponent(text) +
    "&target=" + langto +
    "&howmuch=" + howoften;

    request(url, async function (error, response, body) {
        // console.error('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // Print the HTML for the Google homepage.
        Callback(decodeURIComponent(body));
        
      });

}