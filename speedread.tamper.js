// ==UserScript==
// @name       SpeedRead - Pocket addon 
// @namespace  ptkwilliams.com 
// @version    0.1
// @description helps you speed read pocket articles 
// @resource Customcss speedread.css 
// @match      https://getpocket.com/a/read/*
// @copyright  2014+, Patrick Williams
// @grant		GM_addStyle
// @grant       GM_getResourceText
// ==/UserScript==
var newCSS = GM_getResourceText ("Customcss");
GM_addStyle (newCSS);



var i=0;
var limit;
var words = [];
var wrapperTemplate = "<span class=\"SRwrap\">";
var count = 0;
var article = document.getElementsByClassName('text_body')[0].textContent;
var speedValue=150;
var quoteOn = false;

//html string helper function
function insertHTML(htmlStr) {
    var rBFrag = document.createDocumentFragment(),
    temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        rBFrag.appendChild(temp.firstChild);
    }
    return rBFrag;
}


function speedRead(){
  // setup ReadingBox
  document.getElementById('container').insertBefore(insertHTML("<div id=\"RBWrap\"><div id=\"RBMain\"></div></div>"));
  words = document.getElementsByClassName('text_body')[0].textContent.split(' ');
  limit = words.length;
  speedRead1();
}

function speedRead1() {
      if(document.getElementsByClassName('SRactive').length!== 0){
      document.getElementsByClassName('SRactive')[0].className = '';
  }
    var halflength = words[i].length/2;
    var currentWord = 
      // start html wrap
      "<span class=\"SRinactive\">" +
        // preceding word text
        //words[i-1] +
        // start active word
        " <span class=\"SRwrap\">" +
          //  first half of active word
          words[i].substr(0,halflength) +
          // highlight middle letter
          "<span class=\"SRactive\">" +
            words[i].substr(halflength,1) +
          // end middle letter
          "</span>" +
          // last half of active word
          words[i].substr(halflength+1,words[i].length) +
        // end active word
        " </span>" +
      // following word text 
      //words[i+1] +
      // end html wrap
      "</span>" ;
    count+=words[i].length+1;




    
    document.getElementById('RBMain').innerHTML = currentWord;


    // if(words[i].indexOf('"')>-1 && quoteOn){
    //   document.getElementById('RBWrap').className = ""
    //   quoteOn = false;
    // } else if(words[i].indexOf('"')>-1){
    //   document.getElementById('RBWrap').className = "quoteOn";
    // quoteOn = true;
    // }
    i++;
    if (i<limit) setTimeout(speedRead1,speedValue);
}


setTimeout(speedRead,5000);

