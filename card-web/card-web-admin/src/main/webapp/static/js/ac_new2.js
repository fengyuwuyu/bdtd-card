function SoSmart() {
  var f = this;
  var g = function(a) {
    return document.getElementById(a)
  };
  var h = function(a) {
    return document.createElement(a)
  };
  var j = function(s) {
    return s.replace(/^\s+/, "").replace(/\s+$/, "")
  };
  var k = g('rptSearchCusName');
  var cid = g('search_cusid');
  var search_viewname = g('search_viewname');
  var l = {};
  var m = false;
  var n = -1;
  var o = [];
  var p = [];
  var q = "";
  var r = function() {
    for (pos in o) {
      o[pos].className = "mouseout"
    }
  };
  var C = function() {
    var a = k;
    for (i = 0; i < 3; i++) {
      a = a.parentNode;
      if (a.tagName == "FORM") {
        return a;
        break
      }
    }
  };
  var D = function(a) {
    var b = document.getElementsByName(a);
    for (var i = 0; i < b.length; i++) {
      if (b[i].checked) {
        return b[i].value;
        break
      }
    }
  };
  var t = function() {
    var a = k.getAttribute('smartPid');
    /*if (p[n].flag == 9999999) {
        window.location = "http://so.1000you.com/go.aspx?action=game&word=" + p[n].word
    } else if (p[n].flag == 9999998) {
        window.location = "http://so.1000you.com/go.aspx?action=tag&word=" + p[n].word
    } else {*/
    var b = C();
    if (b != undefined) {
      b.submit()
      //searchCus();
    } else {
      var c = D("area");
      //window.location = "http://so.1000you.com/?action=search&tips=true" + (c != undefined ? "&area=" + c: "") + "&k=" + p[n].word + "&pid=" + a
      //alert(p[n].flag);

      ListStartSearch(p[n].word, p[n].flag, p[n].viewname);
    }
    //}
  };
  var u = function() {
    n = -1;
    o = [];
    p = [];
    q = "";


    var a = g('smart_pop');
    if (a && a != null) {
      a.parentNode.removeChild(a)
    }
    if (g('smart_arrow').firstChild.className != 'hide') g('smart_arrow').firstChild.className = 'hide'
  };
  var v = function() {
    var b = h('div');
    b.id = 'smart_pop';
    for (i in p) {
      if (p[i].word == undefined) continue;//不存在则退出循环
      var c = h('div');
      c.seq = parseInt(i); (function() {
        var a = c;
        f.Event.add(c, 'mouseover',
          function() {
            r();
            a.className = "mouseover";
            n = a.seq
          })
      })(); (function() {
        f.Event.add(c, 'mouseout',
          function() {
            r();
            n = -1
          })
      })(); (function() {
        f.Event.add(c, 'mousedown',
          function () {
            k.value = p[n].word;
            cid.value = p[n].flag;
            search_viewname.value = p[n].viewname;//2018-09-13 qianlong 选中某一个客户之后需要给viewname控件赋值。解决在搜索时选择了一个客户之后，再次点击搜索按钮时出现搜索不到的问题
            t()
          })
      })();
      var d = h('div');
      var e = h('div');
      d.className = 'left1';
      e.className = 'right1';
      //alert(p[i].word);
      d.innerHTML = p[i].word.replace(k.value, '<strong>' + k.value + '</strong>');
      //if (p[i].flag > 3) {
      //d.className += ' font_blue'
      //}
      /*if (p[i].flag == 9999998) {
          tipPic = h('span');
          tipPic.className = 'pic';
          tipPic.appendChild(document.createTextNode(' '));
          d.appendChild(tipPic);
          e.appendChild(document.createTextNode('进入专题'))
      }
      if (p[i].flag == 9999999) {
          e.appendChild(document.createTextNode('直接进入游戏'))
      }
      if (p[i].flag > 10) {
          tipPic = h('span');
          tipPic.className = 'pic2';
          tipPic.appendChild(document.createTextNode(' '));
          d.appendChild(tipPic);
          e.appendChild(document.createTextNode("搜索约"+p[i].flag+"个结果"))
      }*/
      c.appendChild(d);
      c.appendChild(e);
      b.appendChild(c);
      o.push(c)
    }
    closeDiv = h('div');
    closeDiv.className = 'close';
    linkBtn = h('span');
    linkBtn.appendChild(document.createTextNode("关闭"));
    f.Event.add(linkBtn, 'click',
      function() {
        u()
      });
    closeDiv.appendChild(linkBtn);
    b.appendChild(closeDiv);
    g('smart_arrow').firstChild.className = 'show';
    return b
  };
  var w = function(e) {
    if (o.length == 0) {
      return
    }
    if (e.keyCode == 13 && n != -1) {
      f.Event.stop(e);
      t()
    } else if (e.keyCode == 38) {
      r();
      n = (n <= 0) ? (o.length - 1) : (n - 1);
      o[n].className = "mouseover";
      q = k.value = p[n].word;//2015-10-28把cusid写到控件中
      cid.value = p[n].flag;
      search_viewname.value = p[n].viewname;
    } else if (e.keyCode == 40) {
      r();
      n = (n >= o.length - 1) ? 0 : (n + 1);
      o[n].className = "mouseover";
      q = k.value = p[n].word;
      cid.value = p[n].flag;
      search_viewname.value = p[n].viewname;
    }
  };
  var x = function(a) {
    l = {
      top: f.Locator.getY(k),
      left: f.Locator.getX(k),
      width: f.Locator.getW(k),
      height: f.Locator.getH(k)
    };
    locator = f.Locator;
    locator.setX(a, l.left);
    locator.setY(a, l.top + l.height);
    locator.setW(a, l.width - 2 + 44);//重新调整宽度 追加44的宽度，与搜索按钮对齐
    k.parentNode.appendChild(a)
  };
  var y = function () {

    //if (document.getElementById("rptSearchField").value != "cusname") return;//不是按客户名搜索则不执行


    //alert("点击执行");
    SearchInputOnChange();


    m = false;
    var b = k.value;
    if (b != "" && b != "客户名或拼音" && b != "模糊搜索") {
      var viewName = "mycus";
      //if (document.getElementById("rptCusViewName")) viewName = document.getElementById("rptCusViewName").value;
      new f.Ajax({
        type: "GET",
        url: "/App/Customers/GetSearchKeywordTips.aspx?fieldname=" + document.getElementById("rptSearchField").value + "&k=" + escape(b) + "&viewname=&_=" + Math.random(),
        timeout: 1000,
        onSuccess: function (a) {
          m = true;
          u();
          q = b;
          if (p = z(a)) {
            c = v(p);
            x(c)
          }
        }
      })
    }
  };
  var z = function(a) {
    if (j(a) == "") {
      return false
    }
    a = a.split("\n");
    res = [];
    for (i = 0; i < a.length; i++) {
      a[i] = a[i].split("\t");
      res.push({
        word: a[i][0],
        flag: a[i][1],
        viewname: a[i][2]
      })
    }
    return res
  };
  var A = function() {
    f.Event.add(k, 'focus',
      function() {
        m = true
      });
    f.Event.add(k, 'blur',
      function() {
        m = false
      });
    f.Event.add(k, 'keydown',
      function(e) {
        m = true;
        m && w(e)
      });
    f.Event.add(window, 'resize',
      function() {
        m && y();
        B()
      });
    mysi = setInterval(function() {
        if (!m || j(k.value).length == 0) {
          u()
        } else if (q != k.value) {
          y()
        }
      },
      300)
  };
  var B = function() {
    locator = f.Locator;
    lo = {
      top: locator.getY(k),
      left: locator.getX(k),
      width: locator.getW(k),
      height: locator.getH(k)
    };
    if (arrowDiv = g('smart_arrow')) {} else {
      arrowDiv = h('div');
      arrowDiv.id = 'smart_arrow';
      picDiv = h('div');
      locator.setH(picDiv, lo.height);
      f.Event.add(arrowDiv, 'mousedown',
        function(a) {
          a = a || window.event;
          f.Event.stop(a);
          if (g('smart_pop')) {
            k.blur()
          } else {
            k.focus()
          }
        });
      arrowDiv.appendChild(picDiv);
      k.parentNode.appendChild(arrowDiv)
    }
    locator.setH(arrowDiv, lo.height);
    locator.setX(arrowDiv, lo.left + lo.width - 16);
    locator.setY(arrowDiv, lo.top)
  };
  B();
  A()
};
var ua = window.navigator.userAgent.toLowerCase();
SoSmart.prototype.Ajax = function(d) {
  var f = function(r) {
    try {
      return ! r.status && location.protocol == "file:" || (r.status >= 200 && r.status < 300) || r.status == 304 || ua.indexOf('safari') >= 0 && typeof r.status == "undefined"
    } catch(e) {}
    return false
  };
  var g = function(r, a) {
    var b = r.getResponseHeader("content-type");
    var c = (!a && b && b.indexOf("xml") >= 0);
    c = (a == "xml" || c) ? re.responseXML: r.responseText;
    if (a == "script") {
      eval.call(window, c)
    }
    return c
  };
  d = {
    type: d.type || "POST",
    url: d.url || "",
    timeout: d.timeout || 5000,
    onComplete: d.onComplete ||
    function() {},
    onError: d.onerror ||
    function() {},
    onSuccess: d.onSuccess ||
    function() {},
    data: d.data || ""
  };
  if (typeof XMLHttpRequest == "undefined") {
    XMLHttpRequest = function() {
      return new ActiveXObject('Microsoft.XMLHTTP')
    }
  }
  var h = new XMLHttpRequest();
  h.open(d.type, d.url, true);
  var i = d.timeout;
  var j = false;
  setTimeout(function() {
      j = true
    },
    i);
  h.onreadystatechange = function() {
    if (h.readyState == 4 && !j) {
      if (f(h)) {
        d.onSuccess(g(h, d.type))
      } else {
        d.onError()
      }
      d.onComplete();
      h = null
    }
  };
  h.send(null)
};
SoSmart.prototype.Browser = {
  ie: /msie/.test(ua),
  moz: (/gecko/.test(ua) && !/khtml/.test(ua)),
  safari: /safari/.test(ua),
  opera: /opera/.test(ua)
};
SoSmart.prototype.Locator = {
  getX: function(a) {
    return a.offsetParent ? a.offsetLeft + this.getX(a.offsetParent) : a.offsetLeft
  },
  getY: function(a) {
    return a.offsetParent ? a.offsetTop + this.getY(a.offsetParent) : a.offsetLeft
  },
  getW: function(a) {
    return a.offsetWidth
  },
  getH: function(a) {
    return a.offsetHeight
  },
  setX: function(a, b) {
    a.style.left = b + "px"
  },
  setY: function(a, b) {
    a.style.top = b + "px"
  },
  setW: function(a, b) {
    a.style.width = b + "px"
  },
  setH: function(a, b) {
    a.style.height = b + "px"
  }
};
SoSmart.prototype.Event = {
  add: function(a, b, c) {
    if (a.addEventListener) {
      a.addEventListener(b, c, false)
    } else {
      a.attachEvent("on" + b, c)
    }
  },
  remove: function(a, b, c) {
    if (a.removeEventListener) {
      a.removeEventListener(b, c, false)
    } else {
      a.detachEvent("on" + b, c)
    }
  },
  stop: function(a) {
    if (a.preventDefault) {
      a.preventDefault();
      a.stopPropagation()
    } else {
      a.cancelBubble = true;
      a.returnValue = false
    }
  }
};
new SoSmart;