// ==UserScript==
// @name       SpeedRead - Pocket addon 
// @namespace  ptkwilliams.com 
// @version    0.1
// @description helps you speed read pocket articles 
// @resource Customcss speedread.css 
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @match      *://getpocket.com/a/read/*
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


//add drag to Jquery
(function($) {
    $.fn.drags = function(opt) {

        opt = $.extend({handle:"",cursor:"auto"}, opt);

        if(opt.handle === "") {
            var $el = this;
        } else {
            var $el = this.find(opt.handle);
        }

        return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
            if(opt.handle === "") {
                var $drag = $(this).addClass('draggable');
            } else {
                var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
            }
            var z_idx = $drag.css('z-index'),
                drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;
            $drag.css('z-index', 1000).parents().on("mousemove", function(e) {
                $('.draggable').offset({
                    top:e.pageY + pos_y - drg_h,
                    left:e.pageX + pos_x - drg_w
                }).on("mouseup", function() {
                    $(this).removeClass('draggable').css('z-index', z_idx);
                });
            });
            e.preventDefault(); // disable selection
        }).on("mouseup", function() {
            if(opt.handle === "") {
                $(this).removeClass('draggable');
            } else {
                $(this).removeClass('active-handle').parent().removeClass('draggable');
            }
        });

    }
})(jQuery);
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

$( "#RBWrap" ).drags();
 
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

