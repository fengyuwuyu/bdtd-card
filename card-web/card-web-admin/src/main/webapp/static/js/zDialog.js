document.domain = "localhost";
var IMAGESPATH = '/theme/default/Dialog/images/'; //图片路径配置，如在有iframe情况下使用，此路径为最顶层窗口页面的相对路径
//var IMAGESPATH = 'http://www.wangzhaohui.com/wp-content/uploads/2009/11/'; //图片路径配置
var HideScrollbar = true;//弹出Dialog时是否隐藏滚动条
/*************************一些公用方法和属性****************************/
var agt = window.navigator.userAgent;
var isIE = agt.toLowerCase().indexOf("msie") != -1;
var isGecko = agt.toLowerCase().indexOf("gecko") != -1;
var ieVer = isIE ? parseInt(agt.split(";")[1].replace(/(^\s*)|(\s*$)/g, "").split(" ")[1]) : 0;
var isIE8 = !!window.XDomainRequest && !!document.documentMode;
var isIE7 = ieVer == 7 && !isIE8;
var ielt7 = isIE && ieVer < 7;
var isQuirks = document.compatMode == "BackCompat";

var $id = function (id) {
  return typeof id == "string" ? document.getElementById(id) : id;
};
//var getDom = $id;
function stopEvent(evt) {//阻止一切事件执行,包括浏览器默认的事件
  evt = window.event || evt;
  if (!evt) {
    return;
  }
  if (isGecko) {
    evt.preventDefault();
    evt.stopPropagation();
  }
  evt.cancelBubble = true
  evt.returnValue = false;
}

Array.prototype.remove = function (s, dust) { //如果dust为ture，则返回被删除的元素
  if (dust) {
    var dustArr = [];
    for (var i = 0; i < this.length; i++) {
      if (s == this[i]) {
        dustArr.push(this.splice(i, 1)[0]);
      }
    }
    return dustArr;
  }
  for (var i = 0; i < this.length; i++) {
    if (s == this[i]) {
      this.splice(i, 1);
    }
  }
  return this;
}
if (!isIE && HTMLElement) {
  if (!HTMLElement.prototype.attachEvent) {
    window.attachEvent = document.attachEvent = HTMLElement.prototype.attachEvent = function (evtName, func) {
      evtName = evtName.substring(2);
      this.addEventListener(evtName, func, false);
    }
    window.detachEvent = document.detachEvent = HTMLElement.prototype.detachEvent = function (evtName, func) {
      evtName = evtName.substring(2);
      this.removeEventListener(evtName, func, false);
    }
  }
} else if (isIE && ieVer < 8) {
  try { document.execCommand('BackgroundImageCache', false, true); } catch (e) { }
}
var $topWindow = function () {
  var parentWin = window;
  while (parentWin != parentWin.parent) {
    if (parentWin.parent.document.getElementsByTagName("FRAMESET").length > 0) break;
    parentWin = parentWin.parent;
  }
  return parentWin;
};
var $bodyDimensions = function (win) {
  win = win || window;
  var doc = win.document;
  var cw = doc.compatMode == "BackCompat" ? doc.body.clientWidth : doc.documentElement.clientWidth;
  var ch = doc.compatMode == "BackCompat" ? doc.body.clientHeight : doc.documentElement.clientHeight;
  var sl = Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft);
  var st = Math.max(doc.documentElement.scrollTop, doc.body.scrollTop);
  var sw = Math.max(doc.documentElement.scrollWidth, doc.body.scrollWidth);
  var sh = Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight);
  if (sh < ch)
    sh = ch; //IE下在页面内容很少时存在scrollHeight<clientHeight的情况
  return {
    "clientWidth": cw,
    "clientHeight": ch,
    "scrollLeft": sl,
    "scrollTop": st,
    "scrollWidth": sw,
    "scrollHeight": sh
  }
}

var fadeEffect = function (element, start, end, speed, callback) {//透明度渐变：start:开始透明度 0-100；end:结束透明度 0-100；speed:速度1-100
  if (!element.effect)
    element.effect = { fade: 0, move: 0, size: 0 };
  clearInterval(element.effect.fade);
  var speed = speed || 20;
  element.effect.fade = setInterval(function () {
    start = start < end ? Math.min(start + speed, end) : Math.max(start - speed, end);
    element.style.opacity = start / 100;
    element.style.filter = "alpha(opacity=" + start + ")";
    if (start == end) {
      clearInterval(element.effect.fade);
      if (callback)
        callback.call(element);
    }
  }, 20);
};

/*************************弹出框类实现****************************/
var topWin = $topWindow();
var topDoc = topWin.document;
var Dialog = function () {
  /****以下属性以大写开始，可以在调用show()方法前设置值****/
  this.ID = null;
  this.Width = 1200;//设置默认高度
  this.Height = 800;//设置默认高度
  this.URL = null;
  this.OnLoad = null;
  this.InnerHtml = ""
  this.InvokeElementId = ""
  this.Top = "50%";
  this.Left = "50%";
  this.Title = "　";
  this.OkButtonText = "确 定";
  this.CancelButtonText = "取 消";
  this.OKEvent = null; //点击确定后调用的方法
  this.CancelEvent = null; //点击取消及关闭后调用的方法
  this.ShowButtonRow = false;
  this.MessageIcon = "window.gif";
  this.MessageTitle = "";
  this.Message = "";
  this.ShowMessageRow = false;
  //if(ieVer >= 7) this.Modal = false; else this.Modal = true;//如果是IE7以上则不显示遮罩
  this.Modal = true;
  this.Drag = true;
  this.AutoClose = null;
  this.ShowCloseButton = true;
  this.Animator = !ielt7;
  this.MsgForESC = "";
  this.InnerFrameName = null;
  /****以下属性以小写开始，不要自行改变****/
  this.dialogDiv = null;
  this.bgDiv = null;
  this.openerWindow = null;
  this.openerDialog = null;
  this.innerFrame = null;
  this.innerWin = null;
  this.innerDoc = null;
  this.zindex = 900;
  this.cancelButton = null;
  this.okButton = null;
  this.unauthorized = false;

  if (arguments.length > 0 && typeof (arguments[0]) == "string") { //兼容旧写法
    this.ID = arguments[0];
  } else if (arguments.length > 0 && typeof (arguments[0]) == "object") {
    Dialog.setOptions(this, arguments[0])
  }
  //if (!this.ID)
  //    this.ID = topWin.Dialog._dialogArray.length + "";

  try { parent.document.getElementById("rptContentLoading").style.display = "none"; } catch (err) { }

};
Dialog._dialogArray = [];
Dialog._childDialogArray = [];
Dialog.bgDiv = null;
Dialog.setOptions = function (obj, optionsObj) {
  if (!optionsObj) return;
  for (var optionName in optionsObj) {
    obj[optionName] = optionsObj[optionName];
  }
};
Dialog.attachBehaviors = function () {
  if (typeof (Dialog) != "undefined") {
    document.attachEvent("onkeydown", Dialog.onKeyDown);
    window.attachEvent('onresize', Dialog.resetPosition);
    if (!HideScrollbar && ielt7)
      window.attachEvent("onscroll", Dialog.resetPosition);
  }
};
Dialog.prototype.attachBehaviors = function () {
  var self = this;
  if (this.Drag && topWin.Drag) {//注册拖拽方法
    var dragHandle = topWin.$id("_Draghandle_" + this.ID), dragBody = topWin.$id("_DialogDiv_" + this.ID);
    topWin.Drag.init(dragHandle, dragBody);
    dragBody.onDragStart = function (left, top, mouseX, mouseY) {
      if (!isIE && self.URL) { //非ie浏览器下在拖拽时用一个层遮住iframe，以免光标移入iframe失去拖拽响应
        topWin.$id("_Covering_" + self.ID).style.display = ""
      }
    }
    dragBody.onDragEnd = function (left, top, mouseX, mouseY) {
      if (!isIE && self.URL) {
        topWin.$id("_Covering_" + self.ID).style.display = "none"
      }
      var bd = $bodyDimensions(topWin);
      if (left < 0)
        this.style.left = '0px';
      if (left + this.clientWidth > bd.clientWidth)
        this.style.left = bd.clientWidth - this.clientWidth + 'px';
      if (self.fixedPosition) {
        if (top < 0)
          this.style.top = '0px';
        if (top + 33 > bd.clientHeight)
          this.style.top = bd.clientHeight - 33 + 'px';
      } else {
        if (top < bd.scrollTop)
          this.style.top = bd.scrollTop + 'px';
        if (top + 33 > bd.scrollTop + bd.clientHeight)
          this.style.top = bd.scrollTop + bd.clientHeight - 33 + 'px';
      }
    }
  }
};
Dialog.prototype.displacePath = function () {
  if (this.URL.substr(0, 7) == "http://" || this.URL.substr(0, 8) == "https://" || this.URL.substr(0, 1) == "/" || this.URL.substr(0, 11) == "javascript:") {
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
Dialog.prototype.setPosition = function () {
  var bd = $bodyDimensions(topWin);
  var thisTop = this.Top,
    thisLeft = this.Left,
    thisdialogDiv = this.getDialogDiv();
  if (typeof this.Top == "string" && this.Top.indexOf("%") != -1) {
    var percentT = parseFloat(this.Top) * 0.01;
    thisTop = this.fixedPosition
      ? bd.clientHeight * percentT - thisdialogDiv.scrollHeight * percentT
      : bd.clientHeight * percentT - thisdialogDiv.scrollHeight * percentT + bd.scrollTop;
  }
  if (typeof this.Left == "string" && this.Left.indexOf("%") != -1) {
    var percentL = parseFloat(this.Left) * 0.01;
    thisLeft = ielt7 ? bd.clientWidth * percentL - thisdialogDiv.scrollWidth * percentL + bd.scrollLeft : bd.clientWidth * percentL - thisdialogDiv.scrollWidth * percentL;
  }
  thisdialogDiv.style.top = Math.round(thisTop) + "px";
  thisdialogDiv.style.left = Math.round(thisLeft) + "px";

  //document.getElementById("zDialog_Iframe_Loading").style.top = Math.round(thisTop) + "px";
  //document.getElementById("zDialog_Iframe_Loading").style.left = Math.round(thisLeft) + "px";

  //alert(bd.clientWidth);
  //alert(bd.clientHeight);
};
Dialog.setBgDivSize = function () {
  var bd = $bodyDimensions(topWin);
  if (Dialog.bgDiv) {
    if (ielt7) {
      Dialog.bgDiv.style.height = bd.clientHeight + "px";
      Dialog.bgDiv.style.top = bd.scrollTop + "px";
      Dialog.bgDiv.childNodes[0].style.display = "none";//让div重渲染,修正IE6下尺寸bug
      Dialog.bgDiv.childNodes[0].style.display = "";
    } else {
      Dialog.bgDiv.style.height = bd.scrollHeight + "px";
    }
  }
};
Dialog.resetPosition = function () {
  Dialog.setBgDivSize();
  for (var i = 0, len = topWin.Dialog._dialogArray.length; i < len; i++) {
    topWin.Dialog._dialogArray[i].setPosition();
  }
};
Dialog.prototype.create = function () {

  if (typeof (topWin.arrDialog) == "undefined") topWin.arrDialog = new Array();

  var size = topWin.arrDialog.length;

  if (this.ID == null || this.ID == "") {
    this.ID = "Dialog_" + (size + 1);
  }
  if(this.ID!="confirm")
    topWin.arrDialog.push(this.ID);
  //console.info(top.arrDialog);

  var bd = $bodyDimensions(topWin);
  if (typeof (this.OKEvent) == "function") this.ShowButtonRow = true;
  if (!this.Width) this.Width = Math.round(bd.clientWidth * 4 / 10);
  if (!this.Height) this.Height = Math.round(this.Width / 2);
  if (this.MessageTitle || this.Message) this.ShowMessageRow = true;
  //var DialogDivWidth = this.Width + 13 + 13;
  //var DialogDivHeight = this.Height + 33 + 13 + (this.ShowButtonRow ? 40 : 0) + (this.ShowMessageRow ? 50 : 0);

  var DialogDivWidth = this.Width;
  var DialogDivHeight = this.Height + (this.ShowButtonRow ? 40 : 0) + (this.ShowMessageRow ? 50 : 0);
  if (DialogDivWidth > bd.clientWidth) this.Width = Math.round(bd.clientWidth - 26);
  if (DialogDivHeight > bd.clientHeight) this.Height = Math.round(bd.clientHeight - 46-13 - (this.ShowButtonRow ? 40 : 0) - (this.ShowMessageRow ? 50 : 0));
  var html = '\
  <table id="_DialogTable_{thisID}" class="DialogTable" width="' + (this.Width + 26) + '" cellspacing="0" cellpadding="0" border="0" style="">\
    <tr height="50px" id="_Draghandle_{thisID}" onselectstart="return false;" style="-moz-user-select: -moz-none; ' + (this.Drag ? "cursor: move;" : "") + '">\
      <td class="width"><div class="DialogTable-left height width bgcolor" style="">&nbsp;</div></td>\
      <td><div class="DialogTable-center height bgcolor"><span id="_Title_{thisID}">' + this.Title + '</span></div>\
        <div id="_ButtonClose_{thisID}" onclick="Dialog.getInstance(\'{thisID}\').cancelButton.onclick.apply(Dialog.getInstance(\'{thisID}\').cancelButton,[]);" class="DialogClose" style="' + (ielt7 ? "margin-top: 3px;" : "") + (this.ShowCloseButton ? "" : "display:none;") + '" title="关闭"><span></span></div></td>\
      <td><div class="DialogTable-right height bgcolor width" style="">&nbsp;</div></td>\
    </tr>\
    <tr valign="top">\
      <td class="width"></td>\
      <td align="center"><table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#ffffff">\
            \
          <tr>\
            <td valign="top" align="center"><div id="_Container_{thisID}" style="position: relative; width: 100%; height: ' + this.Height + 'px;">\
                <div style="position: absolute; height: 100%; width: 100%; display: none; background-color:#fff; opacity: 0.5;" id="_Covering_{thisID}">&nbsp;</div>\
	' + (function (obj) {
    if (obj.InnerHtml) return '<div id="zDialog_Content_' + obj.ID + '">' + obj.InnerHtml+'</div>';
    if (obj.URL) return '<iframe width="100%" height="100%" onload=\"CloseZDialogLoading()\" frameborder="0" style="border:none 0;" id="_DialogFrame_' + obj.ID + '" ' + (obj.InnerFrameName ? 'name="' + obj.InnerFrameName + '"' : '') + ' src="' + obj.displacePath() + '"></iframe>';
    return "";
  })(this) + '\
              </div></td>\
          </tr>\
          <tr id="_ButtonRow_{thisID}" style="' + (this.ShowButtonRow ? "" : "display:none") + '">\
            <td height="36"><div id="_DialogButtons_{thisID}" style="border-top: 1px solid #e5e5e5; padding: 8px 20px; text-align: center; background-color:#f6f6f6;">\
                <input type="button" class="btn2 btn2-success" value="' + this.OkButtonText + '" id="_ButtonOK_{thisID}"/>\
                <input type="button" class="btn2 btn2-default" value="' + this.CancelButtonText + '" onclick="Dialog.getInstance(\'{thisID}\').close();" id="_ButtonCancel_{thisID}"/>\
              </div></td>\
          </tr>\
        </table></td>\
      <td class="width"></td>\
    </tr>\
    <tr height="1px">\
      <td class="width"></td>\
      <td></td>\
      <td class="width"><a onfocus=\'$id("_forTab_{thisID}").focus();\' href="#;"></a></td>\
    </tr>\
  </table>\
</div>\
';
  //新加的 if(this.URL != null && isIE)
  if (this.URL != null) html += '<div id="zDialog_Iframe_Loading" name="zDialog_Iframe_Loading" class="zDialogLoading" style="position:absolute;top:' + ((this.Height / 2) - 22) + 'px;left:' + ((this.Width / 2) - 22) + 'px"><img src="/theme/default/images/loading55.gif" /><span id="dialog_loadcontent">正在加载...</span></div>';

  html = html.replace(/\{IMAGESPATH\}/gm, IMAGESPATH).replace(/\{thisID\}/gm, this.ID)
  var div = topWin.$id("_DialogDiv_" + this.ID);
  if (!div) {
    div = topDoc.createElement("div");
    div.id = "_DialogDiv_" + this.ID;
    topDoc.getElementsByTagName("BODY")[0].appendChild(div);
  }
  if (isIE && topDoc.compatMode == "BackCompat" || ielt7) {
    div.style.position = "absolute";
    this.fixedPosition = false;
  } else {
    div.style.position = "fixed";
    this.fixedPosition = true;
  }
  div.style.left = "-9999px";
  div.style.top = "-9999px";
  div.style.zIndex = "10000";
  div.className = "DialogDiv";
  div.innerHTML = html;
  if (this.InvokeElementId) {
    var element = $id(this.InvokeElementId);
    element.style.position = "";
    element.style.display = "";
    if (isIE) {
      var fragment = topDoc.createElement("div");
      fragment.innerHTML = element.outerHTML;
      element.outerHTML = "";
      topWin.$id("_Covering_" + this.ID).parentNode.appendChild(fragment)
    } else {
      topWin.$id("_Covering_" + this.ID).parentNode.appendChild(element)
    }
  }
  this.openerWindow = window;
  if (window.ownerDialog)
    this.openerDialog = window.ownerDialog;
  if (this.URL) {
    if (topWin.$id("_DialogFrame_" + this.ID)) {
      this.innerFrame = topWin.$id("_DialogFrame_" + this.ID);
    };
    var self = this;


    this.innerFrameOnload = function () {
      self.innerWin = self.innerFrame.contentWindow;
      try {
        self.innerWin.ownerDialog = self;
        self.innerDoc = self.innerWin.document;
        if (self.Title == '　' && self.innerDoc && self.innerDoc.title) {
          if (self.innerDoc.title) topWin.$id("_Title_" + self.ID).innerHTML = self.innerDoc.title;//document.title;
        };
      } catch (e) {
        if (window.console && window.console.log) console.log("可能存在访问限制，不能获取到浮动窗口中的文档对象。");
        self.unauthorized = true;
      }
      if (typeof (self.OnLoad) == "function") self.OnLoad();

      //关闭loading
      CloseZDialogLoading();
    };
    if (!isGecko) {
      this.innerFrame.attachEvent("onreadystatechange", function () {//在ie下可以给iframe绑定onreadystatechange事件
        if (self.innerFrame != null) {
          if ((/loaded|complete/).test(self.innerFrame.readyState)) {
            self.innerFrameOnload();
          }
        }
      });
      //this.innerFrame.attachEvent("onload", self.innerFrameOnload);
    } else {
      try {
        //this.innerFrame.contentWindow.addEventListener("load", function () { self.innerFrameOnload() }, false);//在firefox下iframe仅能够绑定onload事件
        this.innerFrame.onload = self.innerFrameOnload;//取消这个，否则在chrome下,iframe的onload不执行，不能关闭loading【2014-1-11】  2017-5-16打开这一行，否则chrome下不能显示标题，同时在CloaseZDialogLoading中加上parent.window  解决标题不显示问题 huangjinliang
      }
      catch (e) {
        console.log("异常：" + e.message);
      }
    };
  };
  topWin.$id("_DialogDiv_" + this.ID).dialogId = this.ID;
  topWin.$id("_DialogDiv_" + this.ID).dialogInstance = this;
  this.attachBehaviors();
  this.okButton = topWin.$id("_ButtonOK_" + this.ID);
  this.cancelButton = topWin.$id("_ButtonCancel_" + this.ID);
  div = null;
};
Dialog.prototype.setSize = function (w, h) {
  if (w && +w > 20) {
    this.Width = +w;
    topWin.$id("_DialogTable_" + this.ID).width = this.Width + 26;
    topWin.$id("_Container_" + this.ID).style.width = this.Width + "px";
  }
  if (h && +h > 10) {
    this.Height = +h;
    topWin.$id("_Container_" + this.ID).style.height = this.Height + "px";
  }
  this.setPosition();
};
Dialog.prototype.show = function () {
  this.create();
  var bgdiv = Dialog.getBgdiv(),
    thisdialogDiv = this.getDialogDiv();

  thisdialogDiv.InnerHtml = this.InnerHtml;
  //2018-05-21 qianlong 获取弹出窗口的zIndex
  var slider_index = 0;
  var slider = topWin.$id("_Slider_DialogBGDiv");
  if (slider) {
    slider_index = parseInt(slider.style.zIndex);
  }

  var _ind = Dialog.bgDiv.style.zIndex == "" ? 0 : parseInt(Dialog.bgDiv.style.zIndex);

  _ind = _ind == 0 ? this.zindex : _ind

  thisdialogDiv.style.zIndex = _ind + 1 + slider_index;
  if (topWin.Dialog._dialogArray.length > 0) {
    thisdialogDiv.style.zIndex = parseInt(topWin.Dialog._dialogArray[topWin.Dialog._dialogArray.length - 1].zindex) + topWin.arrDialog.length + slider_index;

  } else {
    bgdiv.style.display = "none";
    if (HideScrollbar) {
      var topWinBody = topDoc.getElementsByTagName(topDoc.compatMode == "BackCompat" ? "BODY" : "HTML")[0];
      topWinBody.styleOverflow = topWinBody.style.overflow;
      if (window.navigator.userAgent.indexOf("Firefox/3.6") != -1) {//在firefox3.6下改变overflow属性会导致scrollTop=0
        var topWinBodyScrollTop = topWinBody.scrollTop;
        topWinBody.style.overflow = "hidden";      /*2010-12-21修改不隐藏滚动条*/
        topWinBody.scrollTop = topWinBodyScrollTop;
      } else {
        topWinBody.style.overflow = "hidden";     /*2010-12-21修改不隐藏滚动条*/
      }
    }
  }
  this.zindex = thisdialogDiv.style.zIndex;

  topWin.Dialog._dialogArray.push(this);
  Dialog._childDialogArray.push(this);
  if (Dialog._childDialogArray.length == 1) {
    if (window.ownerDialog) {
      ownerDialog.hiddenCloseButton();
    }
  }
  if (this.Modal) {
    bgdiv.style.zIndex = thisdialogDiv.style.zIndex - 1;
    Dialog.setBgDivSize();
    if (bgdiv.style.display == "none") {
      if (this.Animator) {
        var bgMask = topWin.$id("_DialogBGMask");
        bgMask.style.opacity = 0;
        bgMask.style.filter = "alpha(opacity=0)";
        bgdiv.style.display = "";
        fadeEffect(bgMask, 0, 60, ielt7 ? 20 : 10);
        bgMask = null;
      } else {
        bgdiv.style.display = "";
      }
    }
  }
  this.setPosition();
  if (this.CancelEvent) {
    this.cancelButton.onclick = this.CancelEvent;
    if (this.ShowButtonRow) this.cancelButton.focus();
  }
  if (this.OKEvent) {
    this.okButton.onclick = this.OKEvent;
    if (this.ShowButtonRow) this.okButton.focus();
  }
  if (this.AutoClose && this.AutoClose > 0) this.autoClose();
  this.opened = true;
  bgdiv = null;
};
Dialog.prototype.close = function () {

  topWin.arrDialog.remove(this.ID);
  console.info(topWin.arrDialog);

  if (this.unauthorized == false) {
    if (this.innerWin && this.innerWin.Dialog && this.innerWin.Dialog._childDialogArray.length > 0) {
      return;
    }
  }
  var thisdialogDiv = this.getDialogDiv();
  if (this == topWin.Dialog._dialogArray[topWin.Dialog._dialogArray.length - 1]) {
    var isTopDialog = topWin.Dialog._dialogArray.pop();
  } else {
    topWin.Dialog._dialogArray.remove(this);
  }
  Dialog._childDialogArray.remove(this);
  if (Dialog._childDialogArray.length == 0) {
    try {
      if (window.ownerDialog) {
        ownerDialog.showCloseButton();
      }
    }
    catch (e) {
      ownerDialog.showCloseButton();
    }
  }

  if (this.InvokeElementId) {
    var innerElement = topWin.$id(this.InvokeElementId);
    innerElement.style.display = "none";
    if (isIE) {
      //ie下不能跨窗口拷贝元素，只能跨窗口拷贝html代码
      var fragment = document.createElement("div");
      fragment.innerHTML = innerElement.outerHTML;
      innerElement.outerHTML = "";
      document.getElementsByTagName("BODY")[0].appendChild(fragment)
    } else {
      document.getElementsByTagName("BODY")[0].appendChild(innerElement)
    }

  }
  if (topWin.Dialog._dialogArray.length > 0) {
    if (this.Modal && isTopDialog) {
      var index = topWin.Dialog._dialogArray.length;
      var hiddenBgDiv = true;
      while (index) {
        --index;
        if (topWin.Dialog._dialogArray[index].Modal) {
          Dialog.bgDiv.style.zIndex = topWin.Dialog._dialogArray[index].zindex - 1;
          hiddenBgDiv = false;
          break;
        }
      }
      if (hiddenBgDiv) {
        Dialog.bgDiv.style.display = "none";
      }
    }
  } else {
    Dialog.bgDiv.style.zIndex = "900";
    Dialog.bgDiv.style.display = "none";
    if (HideScrollbar) {
      var topWinBody = topDoc.getElementsByTagName(topDoc.compatMode == "BackCompat" ? "BODY" : "HTML")[0];
      if (topWinBody.styleOverflow != undefined)
        if (window.navigator.userAgent.indexOf("Firefox/3.6") != -1) {//在firefox3.6下改变overflow属性会导致scrollTop=0
          var topWinBodyScrollTop = topWinBody.scrollTop;
          topWinBody.style.overflow = topWinBody.styleOverflow;
          topWinBody.scrollTop = topWinBodyScrollTop;
        } else {
          topWinBody.style.overflow = topWinBody.styleOverflow;
          //alert(topWinBody.styleOverflow);
        }
    }
  }
  this.openerWindow.focus();
  /*****释放引用，以便浏览器回收内存**/
  if (isIE && !isIE8) {
    thisdialogDiv.dialogInstance = null;
    if (this.CancelEvent) { this.cancelButton.onclick = null; };
    if (this.OKEvent) { this.okButton.onclick = null; };
    topWin.$id("_DialogDiv_" + this.ID).onDragStart = null;
    topWin.$id("_DialogDiv_" + this.ID).onDragEnd = null;
    topWin.$id("_Draghandle_" + this.ID).onmousedown = null;
    topWin.$id("_Draghandle_" + this.ID).root = null;
    thisdialogDiv.outerHTML = "";
    CollectGarbage();
  } else {
    var RycDiv = topWin.$id("_RycDiv");
    if (!RycDiv) {
      RycDiv = topDoc.createElement("div");
      RycDiv.id = "_RycDiv";
    }
    RycDiv.appendChild(thisdialogDiv);
    RycDiv.innerHTML = "";
    RycDiv = null;
  }
  this.innerFrame = null;
  this.bgDiv = null;
  thisdialogDiv = null;
  this.closed = true;
};
Dialog.prototype.autoClose = function () {
  if (this.closed) {
    clearTimeout(this._closeTimeoutId);
    return;
  }
  this.AutoClose -= 1;
  topWin.$id("_Title_" + this.ID).innerHTML = this.AutoClose + " 秒后自动关闭";
  if (this.AutoClose <= 0) {
    this.close();
  } else {
    var self = this;
    this._closeTimeoutId = setTimeout(function () {
        self.autoClose();
      },
      1000);
  }
};
Dialog.getInstance = function (id) {
  var dialogDiv = topWin.$id("_DialogDiv_" + id);
  if (!dialogDiv) alert("没有取到对应ID的弹出框页面对象");
  try {
    return dialogDiv.dialogInstance;
  } finally {
    dialogDiv = null;
  }
};
Dialog.prototype.addButton = function (id, txt, func) {
  topWin.$id("_ButtonRow_" + this.ID).style.display = "";
  this.ShowButtonRow = true;
  var button = topDoc.createElement("input");
  button.id = "_Button_" + this.ID + "_" + id;
  button.type = "button";
  button.style.cssText = "margin-right:5px";
  button.value = txt;
  button.onclick = func;
  var input0 = topWin.$id("_DialogButtons_" + this.ID).getElementsByTagName("INPUT")[0];
  input0.parentNode.insertBefore(button, input0);
  return button;
};
Dialog.prototype.removeButton = function (btn) {
  var input0 = topWin.$id("_DialogButtons_" + this.ID).getElementsByTagName("INPUT")[0];
  input0.parentNode.removeChild(btn);
};
Dialog.prototype.hiddenCloseButton = function (btn) {
  var closebtn = topWin.$id("_ButtonClose_" + this.ID);
  if (closebtn)
    closebtn.style.display = 'none';
};
Dialog.prototype.showCloseButton = function (btn) {
  var closebtn = topWin.$id("_ButtonClose_" + this.ID);
  if (closebtn)
    closebtn.style.display = '';
};
Dialog.getBgdiv = function () {
  if (Dialog.bgDiv) return Dialog.bgDiv;
  var bgdiv = topWin.$id("_DialogBGDiv");
  if (!bgdiv) {
    bgdiv = topDoc.createElement("div");
    bgdiv.id = "_DialogBGDiv";
    //bgdiv.style.cssText = "position:absolute;left:0px;top:0px;width:100%;height:100%;z-index:900";
    bgdiv.className = "_DialogBGDiv";
    var bgIframeBox = '<div style="position:relative;width:100%;height:100%;">';
    var bgIframeMask = '<div id="_DialogBGMask" class="_DialogBGMask"></div>';
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
  Dialog.bgDiv = bgdiv;
  bgdiv = null;
  return Dialog.bgDiv;
};
Dialog.prototype.getDialogDiv = function () {
  var dialogDiv = topWin.$id("_DialogDiv_" + this.ID)
  if (!dialogDiv) alert("获取弹出层页面对象出错！");
  try {
    return dialogDiv;
  } finally {
    dialogDiv = null;
  }
};
Dialog.prototype.SetHtml = function (html) {
  var objDiv = topWin.$id("zDialog_Content_" + this.ID);

  if (objDiv) {
    objDiv.innerHTML = html;
  }
}
Dialog.onKeyDown = function (evt) {
  var evt = window.event || evt;
  if ((evt.shiftKey && evt.keyCode == 9)
    || evt.keyCode == 8) { //shift键及tab键,或backspace键
    if (topWin.Dialog._dialogArray.length > 0) {
      var target = evt.srcElement || evt.target;
      if (target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') {//如果在不在输入状态中
        stopEvent(evt);
        return false;
      }
    }
  }
  if (evt.keyCode == 27) { //ESC键
    Dialog.close();
  }
};
Dialog.close = function (id) {
  if (topWin.Dialog._dialogArray.length > 0) {
    var diag = topWin.Dialog._dialogArray[topWin.Dialog._dialogArray.length - 1];
    if (diag.MsgForESC) {
      Dialog.confirm(diag.MsgForESC, function () { diag.cancelButton.onclick.apply(diag.cancelButton, []); })
    } else {
      diag.cancelButton.onclick.apply(diag.cancelButton, []);
    }
  }
};
Dialog.alert = function (msg, func, w, h) {
  var w = w || 300,
    h = h || 110;
  var diag = new Dialog({
    Width: w,
    Height: h
  });
  diag.ShowButtonRow = true;
  diag.Title = "温馨提示";
  diag.CancelEvent = function () {
    diag.close();
    if (func) func();
  };
  diag.InnerHtml = '<table height="100%" border="0" align="center" cellpadding="10" cellspacing="0">\
		<tr><td align="right"><img id="Icon_' + this.ID + '" src="' + IMAGESPATH + 'icon_alert.gif" width="34" height="34" align="absmiddle"></td>\
			<td align="left" id="Message_' + this.ID + '" style="font-size:9pt;padding-left:10px">' + msg + '</td></tr>\
	</table>';
  diag.show();
  diag.okButton.parentNode.style.textAlign = "center";
  diag.okButton.style.display = "none";
  diag.cancelButton.value = diag.OkButtonText;
  diag.cancelButton.focus();
};
//成功提示
Dialog.showAlert = function (msg, func) {
  if (msg == "") msg = "保存成功";
  if ($("#showAlert").length > 0) {
    $("#msgContent").html(msg);
  } else {
    //$(document.body).append('<div id="showAlert" class="showAlert"><table><tr><td width="60px" align="center" style="height:64px; "><img src="/Resource/images/ok.png" style="border:0px;" /></td><td style="padding:5px 0px 5px 0px"><span id="msgContent" class="msgContent">' + msg + '</span></td></tr></table></div>');
    $(document.body).append('<div id="showAlert" class="showAlert"><table><tr><td width="60px" align="center" style="height:64px;padding-left:10px;"><i class="toolfont" style="font-size:24px;color:#A7B367;">&#xe66f;</i></td><td style="padding:5px 0px 5px 0px"><span id="msgContent" class="msgContent">' + msg + '</span></td></tr></table></div>');
  }
  $(".showAlert").fadeIn(500, function () {
    //退出提示
    //$(".showAlert").fadeOut(1500);
    var timeNum = GetTimeNum(msg);
    //退出提示
    setTimeout("closeMessageBox('showAlert')", timeNum);

    if (func) func();
  });

}
//失败提示
Dialog.showError = function (msg, func) {
  try {
    parent.CloseLoading();
  } catch (e) { }
  if (msg == "") msg = "保存失败";
  if ($("#showError").length > 0) {
    $("#errorContent").html(msg);
  } else {
    //$(document.body).append('<div id="showError" class="showError"><table><tr><td width="60px" align="center" style="height:64px; "><img src="/images/error.png" style="border:0px;" /></td><td style="padding:5px 5px 5px 0px"><span id="errorContent" class="errorContent">' + msg + '</span></td></tr></table></div>');

    $(document.body).append('<div id="showError" class="showError"><table><tr><td width="60px" align="center" style="height:64px; padding-left:10px;"><i class="toolfont" style="font-size:24px;color:#C10034;">&#xe66e;</i></td><td style="padding:5px 5px 5px 0px"><span id="errorContent" class="errorContent">' + msg + '</span></td></tr></table></div>');
  }
  $(".showError").fadeIn(500, function () {

    //根据msg的长度，动态设置显示时间
    var timeNum = GetTimeNum(msg);
    //alert(len + "," + timeNum);

    //退出提示
    setTimeout("closeMessageBox('showError')", timeNum);

    if (func) func();
  });
}

function GetTimeNum(msg) {
  var len = msg.length;
  var timeNum = 3000;
  if (len < 8) timeNum = 1000;//1秒
  else if (len < 16) timeNum = 2000;
  else if (len < 24) timeNum = 3000;
  else if (len < 32) timeNum = 4000;
  else if (len < 40) timeNum = 5000;
  else if (len < 48) timeNum = 6000;
  else if (len < 56) timeNum = 7000;
  else if (len < 64) timeNum = 8000;
  else if (len < 72) timeNum = 9000;
  else timeNum = 10000;
  return timeNum;
}

function closeMessageBox(className) {
  $("." + className).fadeOut(300);
}


Dialog.confirm = function (msg, funcOK, funcCal, w, h) {
  var w = w || 300,
    h = h || 110;
  var diag = new Dialog({
    Width: w,
    Height: h
  });
  diag.ID = "confirm";
  diag.ShowButtonRow = true;
  diag.Title = "信息确认";
  diag.CancelEvent = function () {
    diag.close();
    if (funcCal) funcCal();
  };
  diag.OKEvent = function () {
    diag.close();
    if (funcOK) funcOK();
  };
  diag.InnerHtml = '<table height="100%" border="0" align="center" cellpadding="10" cellspacing="0">\
		<tr><td align="right"><img id="Icon_' + this.ID + '" src="' + IMAGESPATH + 'icon_query.gif" width="34" height="34" align="absmiddle"></td>\
			<td align="left" id="Message_' + this.ID + '" style="font-size:9pt;padding-left:10px">' + msg + '</td></tr>\
	</table>';
  diag.show();
  diag.okButton.parentNode.style.textAlign = "center";
  diag.okButton.focus();
};
Dialog.open = function (arg) {
  var diag = new Dialog(arg);
  diag.show();
  return diag;
};
window.attachEvent("onload", Dialog.attachBehaviors);

var scripts = document.getElementsByTagName("script");
for (var i = 0; i < scripts.length; i++) {
  if (/.*zDrag\.js$/g.test(scripts[i].getAttribute("src"))) {
    break;
  }
  /*if (/.*zDialog\.js$/g.test(scripts[i].getAttribute("src"))) {
      var jsPath = scripts[i].getAttribute("src").replace(/zDialog\.js$/g, '');
      document.write('<script type="text/javascript" src="' + jsPath + 'zDrag.js"><\/script>');
      break;
  }*/
  //2017-5-16 解决zDialog.js后面带版本号后不能拖动的问题[huangjinliang]
  document.write('<script type="text/javascript" src="/Resource/Dialog/zDrag.js"><\/script>');
}


function CloseZDialogLoading() {
  var oEle = topWin.document.getElementsByName("zDialog_Iframe_Loading");
  for (var i = 0 ; i < oEle.length; i++) {
    oEle[i].style.display = "none";
  }
}

Array.prototype.indexOf = function (val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
};
Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};