const request = require('request');
module.exports = function question(Callback){
    const url = "https://opentdb.com/api.php?amount=1&encode=url3986";

    request(url, async function (error, response, body) {
        // console.error('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // Print the HTML for the Google homepage.
        Callback(body);
        
      });

}