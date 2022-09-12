let {PythonShell} = require('python-shell')

module.exports = function gettext(text,leng,Callback){
  var options = {
    mode: 'text',
    args: [text, leng, '--option=123']
  };
  PythonShell.run('./src/ai.py', options, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    Callback(results);
});
}