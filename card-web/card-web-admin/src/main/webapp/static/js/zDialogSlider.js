/*
*
* 更新时间：2016-04-13
* 更新人：qianlong
* 功能说明：添加页面滑入滑出效果
*
*/
//var topWin = window;
//var topDoc = window.document;
var DialogSlider = function () {
  //标题
  this.Title = "";
  this.iWidth = parseInt($(top.window).width() * 0.7);//滑动的最大距离
  this.isMoving = false;//是否进行滑动
  //var isExpand = true;//是否是滑出，true 表示呈现，false 表示消失
  this.slider;//需要滑动的对象
  this.step = 40;//移动的间距
  this.tempW = 0;//当前滑动的宽度
  this.moveT = null;//计时
  this.speed = 1;//速度
  //this.top = $($(top.window.document.body).find(".header")[0]).height();//导航栏的高度
  this.top = 0;
  this.iHeight = top.window.innerHeight - this.top;//设置层的高度
  this.URL = "";//链接地址
  this.InnerHtml = ""//html内容显示
  this.showTitle = true;


  topDoc.getElementById("rptContentLoading").style.display = "none";
};

//创建滑动层
DialogSlider.prototype.getSliderBgdiv = function () {
  //if (Dialog.bgDiv) Dialog.bgDiv = null;
  var bgdiv = topWin.$id("_Slider_DialogBGDiv");
  if (!bgdiv) {
    bgdiv = topDoc.createElement("div");
    bgdiv.id = "_Slider_DialogBGDiv";
    bgdiv.class = "_Slider_DialogBGDiv";
    bgdiv.style.cssText = "position:absolute;right:0px;top:" + this.top + "px;width:0px;height:100%;z-index:100000;box-shadow:-5px 0 20px #8e9092;-webkit-box-shadow:-5px 0 20px #8e9092;-moz-box-shadow:-5px 0 20px #8e9092;";
    var bgIframeBox = '<div style="position:relative;width:100%;height:100%;">';
    var bgIframeMask = '<div id="_Slider_DialogBGMask" style="position:absolute;background-color:white;width:100%;height:100%;"></div>';
    var bgIframe = ielt7 ? '<iframe src="about:blank" style="filter:alpha(opacity=0);" width="100%" height="100%"></iframe>' : '';
    bgdiv.innerHTML = bgIframeBox + bgIframeMask + bgIframe + '</div>';
    topDoc.getElementsByTagName("BODY")[0].appendChild(bgdiv);
    if (ielt7) {
      var bgIframeDoc = bgdiv.getElementsByTagName("IFRAME")[0].contentWindow.document;
      bgIframeDoc.open();
      bgIframeDoc.write("<body style='background-color:#333' oncontextmenu='return false;'></body>");
      bgIframeDoc.close();
      bgIframeDoc = null;
    }
  }
  bgdiv = null;
};

DialogSlider.prototype.getSliderDialogDiv = function () {
  var dialogDiv = topWin.$id("_Slider_DialogDiv_" + this.ID)
  if (!dialogDiv) alert("获取弹出层页面对象出错！");
  try {
    return dialogDiv;
  } finally {
    dialogDiv = null;
  }
};

DialogSlider.prototype.showSlider = function () {
  sliderFrame = topWin.$id("_Slider_ContentFrame");
  //如果存在该div，那么直需要刷新链接即可
  if (sliderFrame) {
    if (this.URL) {
      if (this.showTitle) {
        //重新设置标题
        topWin.$id("sliderName").innerText = this.Title;
      }
      //重新加载地址
      topWin.$id("_Slider_DialogFrame").contentWindow.location.href = this.displacePath();
      topDoc.getElementById("rptContentLoading").style.display = "none";
    }
    if (this.InnerHtml) {
      sliderFrame.innerHeight = this.InnerHtml;
    }
  } else {
    this.getSliderBgdiv();
    this.slider(true);
    //添加关闭事件
    if (topWin.$id("closeWin")) {
      topWin.$id("closeWin").attachEvent('onclick', closeSlider);
    }
  }

};

$(topWin).resize(function () {
  resizePosition();
});
//重新设置宽度、高度
resizePosition = function () {
  this.slider = topWin.$id("_Slider_DialogBGDiv");
  if (this.slider) {
    //this.slider.iHeight = top.window.innerHeight - $($(top.window.document.body).find(".header")[0]).height();//设置层的高度
    this.slider.iHeight = topWin.innerHeight;
    this.slider.iWidth = parseInt($(window).width() * 0.8);
    $(this.slider).css({ "height": this.slider.iHeight, "width": this.slider.iWidth });
    var frame = topWin.$id("_Slider_DialogFrame");
    $(frame).css({ "height": this.slider.iHeight + 50, "width": this.slider.iWidth });
  }
}

closeSlider = function () {
  var dialogSlider = new DialogSlider();
  dialogSlider.slider(false);
};

//滑出效果
DialogSlider.prototype.slider = function (isExpand) {
  this.slider = topWin.$id("_Slider_DialogBGDiv");
  //关闭窗口时重新赋值
  if (!isExpand) {
    this.iHeight = $(this.slider).height();
    this.iWidth = $(this.slider).width();
  }
  this.slider.style.height = this.iHeight + "px";
  if (this.isMoving) return;
  if (this.slider.offsetWidth > this.iWidth) return;
  this.tempW = isExpand ? 0 : this.iWidth;
  var _this = this;
  this.moveT = setInterval(function () { _this.move(isExpand); }, _this.speed);
};

//移动效果
DialogSlider.prototype.move = function (isExpand) {
  //div滑入
  if (isExpand) {
    this.tempW += this.step;
    if (this.tempW > this.iWidth) {
      if ((this.tempW - this.iWidth) >= this.step) {
        isExpand = false;
        this.isMoving = false;
        clearInterval(this.moveT);
        return;
      } else {
        this.tempW = this.iWidth;
      }
    }
  } else {
    //div滑出
    this.tempW -= this.step;
    if (this.tempW < 0) {
      if (-this.tempW >= this.step) {
        isExpand = true;
        this.isMoving = false;
        clearInterval(this.moveT);
        return;
      } else {
        this.tempW = 0;

      }
    }
  }
  if (this.tempW >= this.iWidth) {
    this.create();
  }
  this.slider.style.width = this.tempW + "px";
  this.slider.scrollRight = this.iWidth - this.tempW;
  //当滑出的div全部不显示的时候
  if (this.tempW == 0 && !isExpand) {
    //移除滑出的div
    topDoc.getElementsByTagName("BODY")[0].removeChild(topWin.$id("_Slider_DialogBGDiv"));
    this.slider = null;
  }

};

DialogSlider.prototype.create = function () {
  var bd = $bodyDimensions(topWin);
  if (typeof (this.OKEvent) == "function") this.ShowButtonRow = true;
  //设置窗体格式
  var html = '<div id="_Slider_DialogDiv" class="_Slider_DialogDiv" style="width:' + this.iWidth + 'px;height:' + this.iHeight + 'px;position:absolute;top:0px;left:0px;">';
  if (this.showTitle) {
    html += '<div class="slider_header" style="background-color:#e8ebf0;padding:5px 20px;height:40px; line-height:40px;width:' + this.iWidth + 'px;margin-bottom:10px;">';
    html += '<span id="sliderName" style="font-size:18px;color:#34495e">' + this.Title + '</span>';
    html += '<span id= "closeWin" style= "width:20px;position:absolute;top:5px; right:20px;display:inline-block;font-weight:bold;cursor:pointer;font-size:18px;color:#34495e">X</span >';
    html += '</div>';
  }
  html += '<div id="_Slider_ContentFrame">';
  (function (obj) {
    if (obj.InnerHtml) return obj.InnerHtml;
    if (obj.URL) html += '<iframe width="' + (obj.iWidth) + '" height="' + (obj.iHeight) + '" frameborder="0" onload="CloseZDialogLoading()" style="border:none 0;" id="_Slider_DialogFrame" src="' + obj.displacePath() + '"></iframe>';
    html += "";
  })(this);
  html += '</div></div>';
  //新加的 if(this.URL != null && isIE)
  if (this.URL != null) html += '<div id="zDialog_Iframe_Loading" name="zDialog_Iframe_Loading" style="position:absolute;background-color: #333333;border-radius: 6px;opacity: 0.3;-moz-opacity: 0.3;padding: 10px;bottom:' + ((this.iHeight / 2 + 31) - 20) + 'px;right:' + ((this.iWidth / 2 + 10) - 20) + 'px"><img src="/theme/default/images/loading55.gif" /></div>';

  topWin.$id("_Slider_DialogBGMask").innerHTML = html;
};

DialogSlider.prototype.displacePath = function () {
  if (this.URL.substr(0, 7) == "http://" || this.URL.substr(0, 1) == "/" || this.URL.substr(0, 11) == "javascript:") {
    return this.URL;
  } else {
    var thisPath = this.URL;
    var locationPath = window.location.href;
    locationPath = locationPath.substring(0, locationPath.lastIndexOf('/'));
    while (thisPath.indexOf('../') >= 0) {
      thisPath = thisPath.substring(3);
      locationPath = locationPath.substring(0, locationPath.lastIndexOf('/'));
    }
    return locationPath + '/' + thisPath;
  }
};

function closeDialog(e) {
  //2016-04-13 qianlong 判断当前是否有存在滑出的div，如果有，先退出滑出的div然后在进行加载菜单
  var sliderObj = topDoc.getElementById("_Slider_DialogBGDiv");
  if (sliderObj) {
    var oWidth = sliderObj.offsetWidth;
    if (oWidth > 0) {
      var slider = new DialogSlider();
      slider.speed = 1;//设置隐藏速度
      slider.slider(false);
    }
  }
}
//窗口全屏显示
function fullScreenSlider() {

  var w = $(top.window).width();
  var h = $(top.window).height();
  this.slider = topWin.$id("_Slider_DialogBGDiv");
  this.slider.style.width = w + "px";
  this.slider.style.top = "0px";
  this.slider.style.height = h + "px";
  var frame = topWin.$id("_Slider_DialogFrame");
  $(frame).css({ "height": h, "width": w });
}
//退出全屏
function exitfullScreenSlider() {
  var slider = new DialogSlider();
  var left = topDoc.getElementById("rptLeftList");

  this.slider = topWin.$id("_Slider_DialogBGDiv");
  this.slider.style.width = slider.iWidth + "px";
  this.slider.style.top = slider.top + "px";
  this.slider.style.height = slider.iHeight + "px";

  var frame = topWin.$id("_Slider_DialogFrame");
  $(frame).css({ "height": slider.iHeight, "width": slider.iWidth });
}
$(topWin.document).bind('click', function (e) {
  var e = e || window.event; //浏览器兼容性
  var elem = e.target || e.srcElement;

  //点击弹窗的关闭事件
  if ($(elem).isChildOf($("._Slider_DialogDiv")) && $(elem).attr("class") != "header" && !$(elem).isChildOf(".side-menu"))
    return;
  else
    closeDialog();

});



//判断:当前元素是否是被筛选元素的子元素
jQuery.fn.isChildOf = function (b) {
  return (this.parents(b).length > 0);
};
//判断:当前元素是否是被筛选元素的子元素或者本身
jQuery.fn.isChildAndSelfOf = function (b) {
  return (this.closest(b).length > 0);
};
