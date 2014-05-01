// ==UserScript==
// @name       SpeedRead - Pocket addon 
// @namespace  ptkwilliams.com 
// @version    0.1
// @description helps you speed read pocket articles 
// @resource Customcss speedread.css 
// @match      https://getpocket.com/a/read/*
// @copyright  2014+, Patrick Williams
// @grant   GM_addStyle
// @grant       GM_getResourceText
// ==/UserScript==
var newCSS = GM_getResourceText ("Customcss");
GM_addStyle (newCSS);
var timerIds = [];

function insertHTML(htmlStr){
    var rBFrag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild){
        rBFrag.appendChild(temp.firstChild);
    }
    return rBFrag;
}

function speedRead(){
    
    var text;
    var  readingBoxTemplate = insertHTML("<div id=\"RBWrap\"><div id=\"RBMain\"></div></div>");
    var inactiveTemplate = "<span class=\"SRinactive\">";
    var template = "<span class=\"SRactive\">";
    var wrapperTemplate = "<span class=\"SRwrap\">";
    var pauseDivTemplate = insertHTML("<span id=\"pauseDiv\">0</span>");
    var templateEnd = "</span>";
    var words = [];
    var j = 0;
    var count = 0;
    var article = document.getElementsByClassName('text_body')[0].textContent;
    
    document.getElementsByTagName("body")[0].insertBefore(pauseDivTemplate,document.getElementsByTagName("body")[0].children[0]);
    document.getElementsByClassName('reader_content')[0].insertBefore(readingBoxTemplate,document.getElementsByClassName('text_body')[0]);
    words = document.getElementsByClassName('text_body')[0].textContent.split(' ');
    document.getElementsByClassName('text_body')[0].innerHTML = document.getElementsByClassName('text_body')[0].textContent;
    for(var i = j; i < words.length; i++){
        
        (function(n) {
            var speedValue = 75;
            
            timerIds.push(setTimeout(function(){
                console.log(words[n]);
                if(document.getElementsByClassName('SRactive').length!== 0){
                    document.getElementsByClassName('SRactive')[0].className = '';
                }
                var halflength = words[n].length/2;
                
                document.getElementsByClassName('text_body')[0].innerHTML = inactiveTemplate+article.substr(0,count)+wrapperTemplate+words[n].substr(0,halflength)+template+words[n].substr(halflength,1)+templateEnd+words[n].substr(halflength+1,words[n].length)+templateEnd+article.substr(count+words[n].length,article.length)+templateEnd;
                document.getElementById('RBMain').innerHTML = wrapperTemplate+words[n].substr(0,halflength)+template+words[n].substr(halflength,1)+templateEnd+words[n].substr(halflength+1,words[n].length)+templateEnd;
                count+=words[n].length+1;
                //document.getElementsByClassName('text_body')[0].innerHTML = document.getElementsByClassName('text_body')[0].innerHTML.replace(words[i],template+words[i]+templateEnd);
                // words[i] = null;
                
            },speedValue*n));
            
        }(i));
        
        
    }
    
    
    
    
}




//document.getElementsByClassName('text_body')[0].onmouseover = function(){document.getElementById('pauseDiv').innerHTML  = timerIds.length.toString();for(var z = 0; z<timerIds.length;++z){clearTimeout(timerIds[z]);}};
//  document.getElementsByClassName('text_body')[0].onmouseout =  function(){speedRead(parseFloat(document.getElementById('pauseDiv').innerHTML))]
setTimeout(speedRead(),5000);