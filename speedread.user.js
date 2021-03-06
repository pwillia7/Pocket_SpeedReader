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
var count = 0;
var speedValue=125;
var pause = false;

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
  document.getElementById('RBMain').insertBefore(insertHTML("<span id=\"RBMenu\"><span class=\"wpmWrap\"><span class=\"wpmLabel\">WPM: </span><input value=\""+60000/speedValue+"\"type=\"text\"class=\"wpm\"></span><span id=\"pausedRB\" style=\"display: none;\"></span></span>"));
  // document.getElementById('speedValue').innerHTML = speedValue;
$( "#RBMain" ).drags();

$("#RBMain").hover(
  function(){
    document.getElementById('pausedRB').innerHTML = i;
    pause = true;
    $(".SRinactive").removeClass('unpause');
    $("#RBMenu").fadeIn();
  },
  function(){
    pause = false;
    speedRead1();
    document.getElementById('pausedRB').innerHTML = "";
    $(".SRinactive").addClass('unpause');
    $("#RBMenu").fadeOut();
    

  });
 
  words = document.getElementsByClassName('text_body')[0].textContent.split(' ');
  
  speedRead1();
}

function speedRead1() {
      if(document.getElementById('pausedRB').innerHTML > 0){
        i = document.getElementById('pausedRB').innerHTML;
      }
      if(document.getElementsByClassName('SRactive').length!== 0){
      document.getElementsByClassName('SRactive')[0].className = '';
  }
    limit = words.length;
    var readingBox;
    var halflength = words[i].length/2;
    var currentWord = 
      // start html wrap
      "<span class=\"SRinactive unpause\">" +
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
        "</span>" +
      // end html wrap
      "</span>" ;
    count+=words[i].length+1;




    $('.SRinactive').remove();
    document.getElementById('RBMain').insertBefore(insertHTML(currentWord),document.getElementById('RBMenu'));

    i++;


    // run RB

    if (i < limit && (!pause)){
       readingBox = setTimeout(speedRead1,speedValue);
    }
    else{
        clearTimeout(readingBox);
    }
}


setTimeout(speedRead,5000);

