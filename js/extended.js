var CKEDITOR_BASEPATH = "/javascripts/ckeditor/";
var mainContent = null;

function startAnnotator() {
  var m  = window.location.href.match(/textbooks\/\d+\/(\d+)/);
  if(!m) return;
  var node_id = m[1];
  jQuery.ajax({type: "GET", dataType: "json", url: "/annotate/userinfo",
      success: function(data) {
      // TODO: query for user info
      var annot = jQuery(".mainContent").annotator();

      annot.annotator('addPlugin', 'Permissions', {
          user: {id: data.id, name: data.name},
          showViewPermissionsCheckbox: true,
          showEditPermissionsCheckbox: false,
          permissions: {
            'read':   [],
            'update': [data.id],
            'delete': [data.id],
            'admin':  [data.id]
          },
          userId: function (user) {
            if (user && user.id) {
              return user.id;
            }
            return user;
          },
          userString: function (user) {
            if (user && user.name) {
              return user.name;
            }
            return user;
          }
      });
      annot.annotator('addPlugin', 'Filter');

      annot.annotator('addPlugin', 'Store', {
        prefix: "/annotate/inline/"+node_id
      });
    }
   });

}

function add_annot_script() {
   var css=document.createElement("link")
   jQuery(function(){
    if(jQuery(".currPath").text().match(/(хімія|химия)/i) && !jQuery(".currPath").text().match(/(Загальна та органічна хімія)/i) &&
       jQuery(".currPath").text() != 'Хімія'){
          jQuery(".mainContent").addClass("chemistry");
      }
	});

  css.setAttribute("rel", "stylesheet")
  css.setAttribute("type", "text/css")
  css.setAttribute("href", "/javascripts/annotator/annotator.min.css");
  document.getElementsByTagName("head")[0].appendChild(css);
  var script=document.createElement("script");
  script.language="JavaScript";
  script.src="/javascripts/annotator/annotator-full.min.js";
  script.onreadystatechange= function () {
    if (this.readyState == 'complete') startAnnotator();
  }
  script.onload = startAnnotator;
  document.head.appendChild(script);
}

function add_annot_script_q() {
  setTimeout("if(typeof MathJax != 'undefined') MathJax.Hub.Queue(add_annot_script); else add_annot_script();", 5000);
}
//подключаем jQuery, jQuery.noConflict() в конце jQuery.js
/*function link(){
  var script=document.createElement("script");
  script.language="JavaScript";
  script.src="../js/jquery.min.js";
  script.onreadystatechange= function () {
    if (this.readyState == 'complete') {
	 add_annot_script_q();
    }
  }
  script.onload = add_annot_script_q;
  document.head.appendChild(script);
}
link();*/

// load css js
function loadjscssfile(filename, filetype){
  if (filetype=="js"){ //if filename is a external JavaScript file
    var fileref=document.createElement('script')
    fileref.setAttribute("type","text/javascript")
    fileref.setAttribute("src", filename)
  }
  else if (filetype=="css"){ //if filename is an external CSS file
    var fileref=document.createElement("link")
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", filename)
  }
  if (typeof fileref!="undefined")
  document.getElementsByTagName("head")[0].appendChild(fileref)
}
loadjscssfile("../js/jquery.min.js", "js")
loadjscssfile("../js/materialize.min.js", "js")
loadjscssfile("../css/font-awesome.css", "css") //dynamically load font-awesome.min.css
loadjscssfile("../css/materialize.min.css", "css") //dynamically load materialize.min.css

window.onload = function() {
  if (jQuery) {
    var k = document.getElementsByClassName("wrapper");
    for ( i = 0 ; k.length > i ; i++) {
      $(".wrapper_top img:first-child").after("<i class='fa fa-info-circle fa-lg'> </i>")
    }
    jQuery('.currPath ~ table tr td:nth-child(1) a').append('<i class="fa fa-arrow-circle-up fa-3x fa-rotate-270"> </i>');
    jQuery('.currPath ~ table tr td:nth-child(3) a').append('<i class="fa fa-arrow-circle-up fa-3x fa-rotate-90"> </i>');
    jQuery('.footer tr:nth-child(1) td:nth-child(2) a').append('<i class="fa fa-arrow-left fa-rotate-90 fa-2x"> </i>');
    jQuery('.footer tr:nth-child(2) td:nth-child(2) a').append('<i class="fa fa-list-alt fa-2x"> </i>');
    jQuery('.mainContent').append('<div id="toTop"><i class="fa fa-arrow-circle-up fa-4x"> </i></div>');
    $(function() {
      $(window).scroll(function() {
        if($(this).scrollTop() != 0) {
          $('#toTop').fadeIn();
        } else {
          $('#toTop').fadeOut();
        }
      });
      $('#toTop').click(function() {
        $('body,html').animate({scrollTop:0},800);
      });
    });
    (function(){
      $('.toc, .keywords').on('click', 'a', function () {
        $('html, body').animate({ scrollTop:  $('a[name="'+this.hash.slice(1)+'"]').offset().top }, 1000 );
        return false;
      });
		})(jQuery);
		$('.im img').addClass( "materialboxed responsive-img" );
		jQuery('.im img').materialbox();
    jQuery('.cut').collapsible({
      accordion : false
    });
    } else {
      console.log('jQuery dont load')
    }
    //document.querySelector('.footer tr:nth-child(1) td:nth-child(1) a').innerHTML += '<i class="fa fa-arrow-left fa-2x"> </i>';
		//document.querySelector('.footer tr:nth-child(1) td:nth-child(3) a').innerHTML += '<i class="fa fa-arrow-right fa-2x"> </i>';
    /*
    document.querySelector('table:nth-child(4) tr td:nth-child(1) a').innerHTML += '<i class="fa fa-arrow-circle-up fa-3x fa-rotate-270"> </i>';
    document.querySelector('table:nth-child(4) tr td:nth-child(3) a').innerHTML += '<i class="fa fa-arrow-circle-up fa-3x fa-rotate-90"> </i>';
    document.querySelector('.footer tr:nth-child(1) td:nth-child(2) a').innerHTML += '<i class="fa fa-arrow-left fa-rotate-90 fa-2x"> </i>';
    document.querySelector('.footer tr:nth-child(2) td:nth-child(2) a').innerHTML += '<i class="fa fa-list-alt fa-2x"> </i>';
    document.querySelector('.mainContent').innerHTML += '<div id="toTop"><i class="fa fa-arrow-circle-up fa-4x"> </i></div>';
    var script = document.createElement('script');
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js';
    document.getElementsByTagName('head')[0].appendChild(script);
    var mscript = document.createElement('script');
    mscript.src = '../js/materialize.js';
    //script.src = 'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.1/js/materialize.min.js';
    document.getElementsByTagName('head')[0].appendChild(script);*/

    /*
    document.querySelector('body').innerHTML += '<div class="slideout"></div>';
    document.querySelector('.slideout').innerHTML += '<i class="fa fa-bars fa-2x"> </i>';
    document.querySelector('.slideout').innerHTML += '<div class="slideout_inner"></div>';
    */
    /* in future fix btn in alert message
    document.querySelector('.warning').innerHTML += '<i class="fa fa-exclamation-triangle fa-2x"> </i>';
    document.querySelector('.notice').innerHTML += '<i class="fa fa-commenting-o fa-2x"> </i>';
    document.querySelector('.quote').innerHTML += '<i class="fa fa-search fa-2x"> </i>';
    */
}

var container="<div class='wid-container'></div>"
var expand="<div class='tool-wrapper'><div class='toolbar-exp'></div></div>"
var stars =
    "<div id='rating'>" +
    "<span id='markO'>Оцінка</span>"+
    " <div class='lmark'>" +
    "<div class='listmark1'><a class='linckm' onclick='mark(1,parseInt(getNodeId()))' title='1/5' onclick></a></div>" +
    "<div class='listmark2'><a class='linckm' onclick='mark(2,parseInt(getNodeId()))' title='2/5' onclick></a></div>"+
    "<div class='listmark3'><a class='linckm' onclick='mark(3,parseInt(getNodeId()))' title='3/5' onclick></a></div>"+
    "<div class='listmark4'><a class='linckm' onclick='mark(4,parseInt(getNodeId()))' title='4/5' onclick></a></div>"+
    "<div class='listmark5'><a class='linckm' onclick='mark(5,parseInt(getNodeId()))' title='5/5' onclick></a></div>"+
    "</div>" +
    "<span id='mark1'> Кількість голосів:</span>"+
    "</div>"

/**
 * Запуск дополнительных элементов при загрузке окна
 */
addEvent(window, 'load', start);

/**
 * Если Interner Exprover
 */
var IE = false, IE6 = false, IE7 = false;
if(window.ActiveXObject) {
  IE = true;
  var uaVers = window.navigator.userAgent.substr(window.navigator.userAgent.indexOf('MSIE') + 5, 3);
  if(uaVers.slice(0, 1) == 6) { IE6 = true; }
  else { IE7 = true; }
}

/**
 * Открывает фрагмент
 */


function showAll(button){
    button = $(button.parentNode);
    var object = button.getElementsByClassName('cut')[0];
    var top_button = button.getElementsByClassName('wrapper_top')[0];
    var bottom_button = button.getElementsByClassName('wrapper_bottom')[0];
    top_button.adjacent('img')[0].src = '../img/less.png'
    top_button.adjacent('span')[0].hide();
    top_button.adjacent('span')[1].show();
    bottom_button.show();
    object.show();
}

/**
 * Закрывает фрагмент
 */

function hideAll(button){
    button = $(button.parentNode);
    var object = button.getElementsByClassName('cut')[0];
    var top_button = button.getElementsByClassName('wrapper_top')[0];
    var bottom_button = button.getElementsByClassName('wrapper_bottom')[0];
    top_button.adjacent('img')[0].src = '../img/more.png';
    top_button.adjacent('span')[1].hide();
    top_button.adjacent('span')[0].show();
    bottom_button.hide();
    object.hide();
}
/**
 * Спрятать или показать краткий конспект
 */
function Show_or_Hide_Subling(button){
  button = $(button.parentNode);
  var object = button.getElementsByClassName('cut')[0];
  var top_button = button.getElementsByClassName('wrapper_top')[0];
  var bottom_button = button.getElementsByClassName('wrapper_bottom')[0];
  if (object.style.display == 'none' || object.style.display == 'none' || object.style.overflow == 'hidden'){
    top_button.adjacent('img')[0].src = '../img/less.png'
    top_button.adjacent('span')[0].hide();
    top_button.adjacent('span')[1].show();
    bottom_button.show();
    object.show();
  } else {
    top_button.adjacent('img')[0].src = '../img/more.png';
    top_button.adjacent('span')[1].hide();
    top_button.adjacent('span')[0].show();
    bottom_button.hide();
    object.hide();
    window.scroll(0,top_button.adjacent('img')[0].offsetTop);
  }
  return false;
}


/**
 * Определяет установлен ли текст для заголовков краткого конспекта и если нет, то ставит дефолтовое значение
 */
function text_if_defined(text, def){
    if (text == '') return def;
    return text;
}

function getRandom(max,min){
  return Math.floor(Math.random()*max-min)+min;
 }
/**
 * Оборачивает блок краткого конспекта
 */
function addCutWrapping() {
  var cut_close_button =
    "<div class='wrapper_bottom' onClick='Show_or_Hide_Subling(this)' style='display:none'>\
      <img src='../img/direction_up.png' title='згорнути' alt='згорнути'></div>";
  var i = 0;
  $$('div.cut').each(function(obj){
    if (!IE){
      more = text_if_defined(obj.adjacent('span.if_hide')[i].textContent, 'Детальніше');
      less = text_if_defined(obj.adjacent('span.if_show')[i].textContent, 'Згорнути');
    } else {
      more = text_if_defined(obj.adjacent('span.if_hide')[i].innerText, 'Детальніше');
      less = text_if_defined(obj.adjacent('span.if_show')[i].innerText, 'Згорнути');
    }
    show_hide_button =
      '<div class="wrapper_top" onClick="Show_or_Hide_Subling(this);">\
        <img src="../img/more.png" title="Відкрити|Сховати"></img>\
        <span>'+more+'</span><span style="display:none">'+less+'</span></div>';
    obj.wrap('div', {'class':'wrapper'}); // obj оборачивается дивом с классом wrapper
    obj.insert({'before':show_hide_button,'after':cut_close_button}).hide();
    i++;
  });
}

/**
 * Отлавливает главный текстовый блок
 */

function getMain(){
  if (mainContent == null){
    mainContent = $$('.mainContent')[0];
  }
  return mainContent;
}

/**
 * Открыть/скрыть фрагменты. Работает независимо, открыт фрагмент или закрыт
 * @param obj - div, из которого вызывается функция
 */
function ShowHideAll(obj){
    if (obj.attributes.src.value.match('../img/openall.png')){ // match - for IE
        $$('div.cut').each(function(objone){
            showAll(objone);
            obj.attributes.src.value = '../img/closeall.png';
        });
    $$('#fixme img')[0].writeAttribute('title','Свернуть все');
    }
    else {
        $$('div.cut').each(function(objone){
            hideAll(objone);
            obj.attributes.src.value = '../img/openall.png';
        });
    $$('#fixme img')[0].writeAttribute('title','Развернуть все');
    }
}

function addSwimmingPanel () {

    getMain().insert({'top' : stars});
 }
/**
 * Что именно запускается
 */

function start() {
  setupMultilangContent();
  jQuery.ajax({url: "/home/roles/only_head", success: function(r) { jQuery("table.header:first").replaceWith(r) } });
  window.setTimeout(function(){
  addSwimmingPanel();
  updateUser();
  styles();
  cont();
  addCutWrapping();
  wrapLibraryLinks();

  },1000);
}
function cont(){
  getMain().insert({'top' : container });
  jQuery(".wid-container").css({ 'height': '180px','width':'40px',   'border-width': '1px','marginTop' : '30px','left':'0px','position' : 'fixed'});
  var upc=jQuery('<div class="upc"> </div>');
  var bigStarc=jQuery('<div class="bigStarc"></div>');
  var downc=jQuery('<div class="downc"></div>');
  var expandc=jQuery('<div class="expandc"></div>');
  var hightlight=jQuery('<div class="highlight"></div>');
  var show=jQuery('<div class="show"></div>');
  var users=jQuery('<div class="user"></div>');
  hightlight.css({'float':'left','background' : 'url(/images/widget/pencil.png) no-repeat','height' :'40px','width' : '40px','marginTop':'2px','marginLeft':'5px'});
  hightlight.attr({'title':'Виділити короткий конспект'});
  hightlight.click(function () {
        $(".marked").toggleClass("enabled");
      });
  show.click(function () {
             jQuery("p").not(".marked").toggle(400);

      });
  show.css({'float':'left','background' : 'url(/images/widget/expand.png) no-repeat','height' :'40px','width' : '40px','marginTop':'0px'});
  show.attr({'title':'Показати тільки короткий конспект'});
  users.css({'background' : 'url(/images/widget/user_black.png) no-repeat','height' :'40px','width' : '40px','marginTop':'2px','marginLeft':'1px'});
  users.attr({'title':'Зараз на сайті'});
  expandc.attr({'title':'Короткий конспект'});
  expandc.css({'background' : 'url(/images/widget/book_black.png) no-repeat','height' :'40px','width' : '40px','marginTop':'5px'});
  upc.css({'background' : 'url(/images/widget/up_black.png) no-repeat','height' :'40px','width' : '40px','marginTop':'5px'});
  upc.attr({'title':'Уверх'});
  downc.css({'background' : 'url(/images/widget/down_black.png) no-repeat','height' :'40px','width' : '40px','marginTop':'5px'});
  downc.attr({'title':'Вниз'});
  bigStarc.css({'background' : 'url(/images/widget/bigstar_black.png) no-repeat','height' :'40px','width' : '40px'});
  bigStarc.attr({'title':'Оцінка'});
  jQuery(".wid-container").append(upc);
  if(getNodeId()){
   jQuery(".wid-container").append(bigStarc)
  }
  if((jQuery('.marked')==null))
      jQuery(".wid-container").append(expandc);
   if(getPubId()){
     jQuery(".wid-container").append(users);
   }
  jQuery(".wid-container").append(downc);

  (function(jq) {
      jq.autoScroll = function(ops) {
      var t = jq('.'+ops.styleClass),
      d = jq(document);
      t.click(function() {
    jq('html,body').animate({
        scrollTop:   ops.where
    }, ops.scrollDuration || 1000);
      });


    t.css(
      {
        'display': 'no'
      });

      }
    })(jQuery);


  jQuery.autoScroll({
      scrollDuration: 500,
      showDuration: 600,
      hideDuration: 300,
      styleClass: 'upc',
      where : 0

  });

  jQuery.autoScroll({
      scrollDuration: 500,
      showDuration: 600,
      hideDuration: 300,
      styleClass: 'downc',
      where : jQuery(document).height()


  });
  //expand-widgets-panels
  getMain().insert({'top': expand});
  jQuery('.toolbar-exp').css({'opacity':'0','background':'white','borderColor':'#c4b7b7','boxShadow':'3px 3px 3px grey'});
  jQuery('.toolbar-exp').css({'borderRadius':'5px','borderWidth':'1px','borderStyle':'solid','height':'40px','width':'100px','position':'fixed','marginTop': '120px','left':'60px'}) ;
  jQuery('.toolbar-exp').before('<div class="booble"></div>');
  jQuery('.toolbar-exp').before('<div class="booblewhit"></div>');
  jQuery('.toolbar-exp').append(hightlight,show);
  jQuery('.booble').css({'opacity':'0','border':'10px solid','position':'fixed','borderColor':'  transparent  #667 transparent  transparent','marginTop':'125px','left':'40px'});
  jQuery('.booblewhite').css({'border':'8px solid','position':'fixed','borderColor':'  transparent  white transparent  transparent','marginTop':'127px','left':'45px'});
  jQuery('#rating').before('<div class="booble1"></div>');
  jQuery('#rating').css({'boxShadow':'3px 3px 3px grey'});
  jQuery('#rating').before('<div class="booblewhite"></div>');
  jQuery('.booble1').css({'opacity':'0','border':'10px solid','position':'fixed','borderColor':'  transparent  #667 transparent  transparent','marginTop':'90px','left':'40px'});
  jQuery('.booblewhite1').css({'display':'no','border':'8px solid','position':'fixed','borderColor':'  transparent  white transparent  transparent','marginTop':'92px','left':'45px'});

  var check=false;
  var checkS=false;
  var check1=false;
  var checkE=false;
  bigStarc.hover(
    function(){
        jQuery('#rating').animate({'opacity':'1','z-index':'1'},200);
        bigStarc.css({'background' : 'url(/images/widget/bigstar.png) no-repeat'});
        jQuery('.booble1').animate({'opacity':'1','display':'block'},200);
        checkS=true;
    },
    function(){
      setTimeout(function(){
        if(!check && !checkS){
         jQuery('#rating').animate({'opacity':'0','z-index':'-1'},200);
         bigStarc.css({'background' : 'url(/images/widget/bigstar_black.png) no-repeat'});
         jQuery('.booble1').animate({'opacity':'0','display':'block'},200);
        }
      },1000);
      checkS=false;
    }
  );

  jQuery('#rating').hover(
    function(){
      check=true;
    },
    function(){
      setTimeout(function(){
      if(!checkS){
       jQuery('#rating').animate({'opacity':'0','z-index':'-1'},200);
       bigStarc.css({'background' : 'url(/images/widget/bigstar_black.png) no-repeat'});
       jQuery('.booble1').animate({'opacity':'0','display':'block'},200);
      }},1000);
      check=false;
    }
  );



  expandc.hover(
    function(){
        expandc.css({'background' : 'url(/images/widget/book.png) no-repeat'});
        jQuery('.booble').animate({'opacity':'1','display':'block'},200);
        jQuery('.toolbar-exp ').animate({'opacity':'1','z-index':'1'},200);
        checkE=true;
    },
    function(){
      setTimeout(function(){
        if(!check1 && !checkE){
         jQuery('.toolbar-exp').animate({'opacity':'0','z-index':'-1'},200);
         expandc.css({'background' : 'url(/images/widget/book_black.png) no-repeat'});
         jQuery('.booble').animate({'opacity':'0','display':'block'},200);
        }
      },1000);
      checkE=false;
    }
  );

  jQuery('.toolbar-exp ').hover(
    function(){
      check1=true;
    },
    function(){
      if(!checkE){
    jQuery('.toolbar-exp').animate({'opacity':'0','z-index':'-1'},200);
    expandc.css({'background' : 'url(/images/widget/book_black.png) no-repeat'});
    jQuery('.booble').animate({'opacity':'0','display':'block'},200);

      }
      check1=false;
    }
  );

var checkU=false;
 var checkA=false;
   users.hover(
     function(){
         jQuery('#attendence').animate({'opacity':'1','z-index':'1'},200);
         users.css({'background' : 'url(/images/widget/user.png) no-repeat'});
         jQuery('.boobleu').animate({'opacity':'1','display':'block'},200);
         checkU=true;
     },
     function(){
       setTimeout(function(){
         if(!checkA && !checkU){
          jQuery('#attendence').animate({'opacity':'0','z-index':'-1'},200);
          users.css({'background' : 'url(/images/widget/user_black.png) no-repeat'});
          jQuery('.boobleu').animate({'opacity':'0','display':'block'},200);
         }
       },500);
       checkU=false;
     }
   );

     jQuery('#attendence').hover(
    function(){
       checkA=true;
     },
     function(){
       if(!checkU){
 	jQuery('#attendence').animate({'opacity':'0','z-index':'-1'},200);
 	users.css({'background' : 'url(/images/widget/user_black.png) no-repeat'});
 	jQuery('.boobleu').animate({'opacity':'0','display':'block'},200);
       }
       checkA=false;
     }
   );

  downc.hover(function(){
    downc.css({'background': 'url(/images/widget/down.png) no-repeat'});
  },
    function(){
      downc.css({'background': 'url(/images/widget/down_black.png) no-repeat'});

    }
  );
  upc.hover(function(){
    upc.css({'background': 'url(/images/widget/up.png) no-repeat'});
  },
    function(){
      upc.css({'background': 'url(/images/widget/up_black.png) no-repeat'});

    }
  );



}


/**
 * Создание события
 */
function addEvent(elm, evType, fn, useCapture)
{
  if (elm.addEventListener){
    elm.addEventListener(evType, fn, useCapture);
    return true;
  } else if (elm.attachEvent){
    var r = elm.attachEvent("on" + evType, fn);
    return r;
  } else {
    alert("Handler could not be removed");
  }
}


// виджет оценки
var totalMark=0;

function getNodeId(){
  var reg =/textbooks\/\d+\/(\d+)/;
  var test = reg.exec(location);
  return test && test[1]
}

function getPubId(){
   var reg =/textbooks\/(\d+)\/\d+/;
  var test = reg.exec(location);
  return test && test[1]
}
function mark(value,Id){

  new Ajax.Request('/api/textbooks/create',{
       parameters : {mark : value , id : Id},
       onSuccess: function(response){
         if(response.responseText=="not_well")
     alert("Щось пішло не за планом");
       }
  }
  );

  new Ajax.Request('/api/textbooks/show',
       { method : 'get',
         parameters : {id : getNodeId()},
         onSuccess: function(data){
            var json = data.responseText.evalJSON();
           totalMark=parseInt(json.mark)/parseInt(json.amount);
            for(var i=0;i<totalMark;i++){
        $$('[class=linckm]')[i].setStyle({'backgroundImage':'url(/images/widget/orstar.png)'});
           }
           $$('#mark1')[0].update('Кількість голосів:'+' '+ json.amount);}
       }
  );

    }

var styles=function(){
  //установка стилей
  for(var i = 1;i<=5;i++){
     $$('[class=listmark'+i+']')[0].setStyle({ 'position' : 'static' ,'background-color' : 'white','float':'left','list-style-type' :'none','paddingLeft':'4px'});
   }
  for(var i=0; i<5; i++){
     $$('[class=linckm]')[i].setStyle({'backgroundImage': 'url(/images/widget/starin.png)' , 'display':'block','height':'23px','width':'24px','backgroundRepeat':'no-repeat'});
  }
    $$('#rating')[0].setStyle({ 'background':'white','height' : '80px', 'width' : '180px','borderWidth':'1px','borderColor':'#c4b7b7','borderStyle':'solid','borderRadius':'10px','opacity' : '0', 'z-index':'-1'});
    $$('#markO')[0].setStyle({ 'marginLeft':'75px','marginTop':'30px','font':'9pt sans-serif'});
    $$('[class=lmark]')[0].setStyle({'marginTop':'10px', 'marginLeft':'18px','width':'150px','display':'block','position':'static','list-style-type' : 'none'});
    $$('#mark1')[0].setStyle({'display' : 'block','marginLeft':'35px','marginTop': '40px','font':'9pt sans-serif'});
    $$('#rating')[0].setStyle({'left' : '60px', 'top' : '240px', 'position' : 'fixed'});
    // начальная инициализация
  new Ajax.Request('/api/textbooks/show',
       { method : 'get',
         parameters : {id : getNodeId()},
         onSuccess: function(data){
            var json = data.responseText.evalJSON();
           totalMark=parseInt(json.mark)/parseInt(json.amount);
           for(var i=0;i<totalMark;i++){
        $$('[class=linckm]')[i].setStyle({'backgroundImage':'url(/images/widget/orstar.png)'});
        }
        $$('#mark1')[0].update('Кількість голосів:'+' '+ json.amount);}
       }
  );
      //обработчики событий
    for(var i=1;i<=5;i++){
        (function (a){
            $$('[class=listmark'+a+']')[0].observe('mouseover',function(){
                for(var p=0;p<a;p++){
                    $$('[class=linckm]')[p].setStyle({'backgroundImage':'url(/images/widget/mstar.png)'})
                }
            });
            $$('[class=listmark'+a+']')[0].observe('mouseout',function(){
                if(a<=totalMark)
                    $$('[class=linckm]')[(a-1)].setStyle({'backgroundImage':'url(/images/widget/orstar.png)'});
                else
                    $$('[class=linckm]')[(a-1)].setStyle({'backgroundImage':'url(/images/widget/starin.png)'});
            });

        })(i);
        $$('[class=lmark]')[0].observe('mouseout',function(){
            for(var i=0;i<5;i++){
                if(i<totalMark)
                    $$('[class=linckm]')[i].setStyle({'backgroundImage':'url(/images/widget/orstar.png)'});
                else
                    $$('[class=linckm]')[i].setStyle({'backgroundImage':'url(/images/widget/starin.png)'});
            }
        });
    }
}

    function updateUser(){
       sid=Math.random()
       jQuery(".mainContent").append("<div id='attendence'></div>");
       jQuery('#attendence').css({'position' : 'fixed', 'width' : '13%' ,'height' : '200px','background' : '#D8D8D8','top' : '190px' ,'right' :'2px'});
       jQuery("#attendence").append("<div id='head_a'></div>");
       jQuery("#attendence").append("<div id='main_c'></div>");
       jQuery("#head_a").html("Зараз на сайті:");
       jQuery("#head_a").css({'text-align' : 'center', 'font-size' : '80%','marginBottom' :'15px'});
       jQuery("#main_c").css({'font-size' : '80%', 'padding': '4px'});
       jQuery('#attendence').css({'opacity':'0','position' : 'absolute', 'width' : '13%','background' : 'white','top' : '330px' ,'left' :'60px', 'z-index':'-1','borderRadius':'5px','borderWidth':'1px','borderStyle':'solid','borderColor':'#c4b7b7','boxShadow':'3px 3px 3px grey'});
       setInterval(function(){
        new Ajax.Request('/api/textbooks/attendence',
        { method : 'post',
         parameters : {node_id : getNodeId(), pub_id : getPubId(), sid : sid},
         onSuccess: function(data){
 	    json = data.responseText.evalJSON();
	    jQuery.each(json,function(k,v){
	      jQuery('#main_c').html('<div><img src="/img/userpic/large/'+v.party.party_login+'.png"/><br/>'+v.party.party_name+'</div>');
	    });
	 }
       }
  );
      },60000);
    }

dynamic_css_name=[]

function AddCss(css_name){
  if (dynamic_css_name.indexOf(css_name) != -1) {return;}
  var l=document.createElement("link");
  l.setAttribute("type","text/css");
  l.setAttribute("rel","stylesheet");
  l.setAttribute("href","/stylesheets/"+css_name);
  l.setAttribute("media","screen");
  document.getElementsByTagName("head")[0].appendChild(l);
  dynamic_css_name.push(css_name);
}
    function toggleLanguage(current) {
      jQuery("div[lang=ru],div[lang=ua],div[lang=en]").hide();
      jQuery("div[lang="+current+"]").show();
      return false;
    }

function setupMultilangContent() {
  var lang_blocks = jQuery("div[lang=ru],div[lang=ua],div[lang=en]");
  if(lang_blocks.size() > 1) {
    var out = "<div id='flags'>";
    for(var i = 0; i < lang_blocks.size(); i++) {
      out += "<a href='#' lang='"+jQuery(lang_blocks[i]).attr("lang")+"'></a>";
    }
    jQuery("#flags").remove();
    out += "</div>";
    jQuery("div.mainContent").prepend(out);
    var tasks = lang_blocks;
    var links = document.getElementById('flags').getElementsByTagName('a');
		for (i = 0; i < links.length; i++) {
			links[i].setAttribute('onclick', "toggleLanguage('" + links[i].lang + "')");
			var link = document.createElement('img');
			link.setAttribute('src', '/images/lang/' + links[i].lang + '.gif');
			links[i].appendChild(link);
		}
		toggleLanguage(links[0].lang);
  }
}

function wrapLibraryLinks() {
  jQuery("a").each(function(){
    if(this.href.match(/http:\/\/lib\.sumdu\.edu\.ua\/library\/DocDownloadForm/)) {
      this.href = "/home/roles/download_lib?doc_url="+encodeURIComponent(this.href);
    }
  });
  jQuery("li").each(function(){
    var m = this.innerHTML.match(/(http:\/\/lib\.sumdu\.edu\.ua\/library\/DocDownloadForm\?docid=\d+)/)
    if(m) {
      this.innerHTML = this.innerHTML.replace(m[1], "<a href=\"/home/roles/download_lib?doc_url="+encodeURIComponent(m[1])+"\">"+m[1]+"</a>");
    }
  });
  jQuery("p").each(function(){
    var m = jQuery(this).text().match(/Режим доступу: (http:\/\/lib\.sumdu\.edu\.ua\/library\/DocDownloadForm\?docid=\d+)/)
    if(m) {
      jQuery(this).html(jQuery(this).text().replace(m[1], "<a href=\"/home/roles/download_lib?doc_url="+encodeURIComponent(m[1])+"\">"+m[1]+"</a>"));
    }
  });

}
