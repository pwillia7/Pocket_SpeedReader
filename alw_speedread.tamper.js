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
var inactiveTemplate = "<span class=\"SRinactive\">";
var template = "<span class=\"SRactive\">";
var wrapperTemplate = "<span class=\"SRwrap\">";
var templateEnd = "</span>";
var count = 0;
var article = document.getElementsByClassName('text_body')[0].textContent;
var speedValue=150;
function speedRead(){
var text;




words = document.getElementsByClassName('text_body')[0].textContent.split(' ');
document.getElementsByClassName('text_body')[0].innerHTML = document.getElementsByClassName('text_body')[0].textContent;
limit=words.length;
speedRead1();
}

function speedRead1() {
      console.log('hey');
        if(document.getElementsByClassName('SRactive').length!== 0){
        document.getElementsByClassName('SRactive')[0].className = '';
    }
      // console.log(template+words[i]+templateEnd);
      var halflength = words[i].length/2;
      document.getElementsByClassName('text_body')[0].innerHTML = inactiveTemplate+article.substr(0,count)+wrapperTemplate+words[i].substr(0,halflength)+template+words[i].substr(halflength,1)+templateEnd+words[i].substr(halflength+1,words[i].length)+templateEnd+article.substr(count+words[i].length,article.length)+templateEnd;
      count+=words[i].length+1;
      //document.getElementsByClassName('text_body')[0].innerHTML = document.getElementsByClassName('text_body')[0].innerHTML.replace(words[i],template+words[i]+templateEnd);
       // words[i] = null;
 i++;
 if (i<limit) setTimeout(speedRead1,speedValue); 
}


setTimeout(speedRead,5000);
