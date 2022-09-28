var fs = require("fs");
var worts = [[],[],[],[],[],[],[],[],[],[]];
fs.readFile("./src/wortdateien/Worter.txt", function(text,data){
    var textByLine =data.toString().split("\n");
    worts[0] = textByLine;
})
fs.readFile("./src/wortdateien/Namen.txt", function(text,data){
    var textByLine =data.toString().split("\n");
    worts[1] = textByLine;          
});
fs.readFile("./src/wortdateien/Nomen.txt", function(text,data){
    var textByLine =data.toString().split("\n");
    worts[2] = textByLine;              
});
fs.readFile("./src/wortdateien/Konjunktionen.txt", function(text,data){
    var textByLine =data.toString().split("\n");
    worts[3] = textByLine;             
});
fs.readFile("./src/wortdateien/Interjektionen.txt", function(text,data){
    var textByLine =data.toString().split("\n");
    worts[4] = textByLine;               
});
fs.readFile("./src/wortdateien/Pronomen.txt", function(text,data){
    var textByLine =data.toString().split("\n");
    worts[5] = textByLine;            
});
fs.readFile("./src/wortdateien/Verben.txt", function(text,data){
    var textByLine =data.toString().split("\n");
    worts[6] = textByLine;            
});
fs.readFile("./src/wortdateien/english-adjectives.txt", function(text,data){
    var textByLine =data.toString().split("\n");
    worts[7] = textByLine;          
});
fs.readFile("./src/wortdateien/Praepositionen.txt", function(text,data){
    var textByLine =data.toString().split("\n");
    worts[8] = textByLine;              
});
fs.readFile("./src/wortdateien/frageworter.txt", function(text,data){
    var textByLine =data.toString().split("\n");
    worts[9] = textByLine;             
});

module.exports =function getRandomWort(number){
    var textByLine = [];
    // console.log(number);
    switch(number){
        case "1":{
                textByLine =worts[0];
            break;
        }
        case "2":{
            textByLine =worts[1];
            break;
        }
        case "3":{
            textByLine =worts[2];
            break;
        }
        case "4":{
            textByLine =worts[3];
            break;
        }
        case "5":{
            textByLine =worts[4];
            break;
        }
        case "6":{
            textByLine =worts[5];
            break;
        }
        case "7":{
            textByLine =worts[6];
            break;
        }
        case "8":{
            textByLine =worts[7];
            break;
        }
        case "9":{
            textByLine =worts[8];
            break;
        }
        case "10":{
            textByLine =worts[9];
            break;
        }
    }
    return textByLine[Math.floor(Math.random()*textByLine.length)];
    // console.log(textByLine);
    
}
