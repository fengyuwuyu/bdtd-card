/*声明命名空间*/
$package('BDTD');

/* 封装变量（利用JSONP） */
var BDTD = {
	checkDateQuery : function() {
		if(document.getElementById("begin") && document.getElementById("end")){
			var begin = $('#begin').datebox('getValue');
			var end = $('#end').datebox('getValue');
			if(begin && end && begin > end){
				VWVO.alert('消息', '开始时间不能大于结束时间！');
				return false
			}
		}
		return true;
	},
	fixedNum : function(num, number){
		number = number | 2; 
		try {
			return parseFloat(num).toFixed(number);
		} catch (e) {
			return num;
		}
	},
	isIP : function(ip) {
		var re = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
		return re.test(ip);
	},
	// IP转成整型
	ip2int : function(ipAddressStr) {
		var result = 0;
		if (VWVO.isNull(ipAddressStr)) {
			VWVO.alert('消息', 'ip不能为空！');
		}
		try {
			var tmp = ipAddressStr;
			var offset = 24;
			for (var i = 0; i < 3; i++) {
				var index = tmp.indexOf('.');
				if (index != -1) {
					var numberStr = tmp.substring(0, index);
					var number = parseInt(numberStr);
					if ((number < 0) || (number > 255)) {
						VWVO.alert('消息', "Invalid IP Address [" + ipAddressStr
								+ "]");
						return false;
					}

					result += number << offset;
					offset -= 8;
					tmp = tmp.substring(index + 1);
				} else {
					VWVO.alert('消息', "Invalid IP Address [" + ipAddressStr
							+ "]");
					return false;
				}
			}

			// the remaining part of the string should be the last number.
			if (tmp.length > 0) {
				var number = parseInt(tmp);
				if ((number < 0) || (number > 255)) {
					VWVO.alert('消息', "Invalid IP Address [" + ipAddressStr
							+ "]");
					return false;
				}

				result += number << offset;
				ipAddress = result;
			} else {
				VWVO.alert('消息', "Invalid IP Address [" + ipAddressStr + "]");
				return false;
			}
		} catch (ex) {
			VWVO.alert('消息', "Invalid IP Address [" + ipAddressStr + "]" + ex);
			return false;
		}
		return result;

	},
	// 整型解析为IP地址
	int2iP : function(ip) {
		return (ip >>> 24 & 0xff) + '.' + (ip >>> 16 & 0xff) + '.'
				+ (ip >>> 8 & 0xff) + '.' + (ip & 0xff);
	},
	// JSON方法一
	isJson : function(json) {
		try {
			if (typeof json !== 'string') {
				// make sure we start with the JSON as a string
				json = JSON.stringify(json);
			} else {
				// is already a string, so parse and re-stringify in order to
				// remove extra whitespace
				json = JSON.parse(json);
				json = JSON.stringify(json);
			}
		} catch (e) {
			return false;
		}
		return true;
	},

	// JSON方法二
	paserJson : function(str) {
		return eval('(' + str + ')');
	},
	removeJsonNotes :function(str){
		// 正则表达式  
		var reg = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g;
		console.log(str);
		console.log(str.match(reg));
		str.replace(reg, function(word) { // 去除注释后的文本  
			return /^\/{2,}/.test(word) || /^\/\*/.test(word) ? "" : word;  
		});  
	},
	fixHeight : function(percent) {
		if (percent == null) {
			percent = 0.8;
		}
		return (document.body.clientHeight) * percent;
	},
	fixParentHeight : function(parent) {
		return (document.body.clientHeight)-parent.parent().parent().height()-20;
	},
	fixWidth : function(percent) {
		if (percent == null) {
			percent = 1;
		}
		return (document.body.clientWidth - 20) * percent;
	},
	fixParentWidth : function(parent) {
		return parent.width()
	},
	// 显示时间
	showTime : function() {
		var today = new Date();
		var year = today.getFullYear();
		var month = today.getMonth() + 1;
		var monthDay = today.getDate();
		var weekDay;
		var hour = today.getHours();
		var minute = today.getMinutes();
		var second = today.getSeconds();
		var day = today.getDay();
		switch (day) {
		case 0: {
			weekDay = '星期日';
			break;
		}
		case 1: {
			weekDay = '星期一';
			break;
		}
		case 2: {
			weekDay = '星期二';
			break;
		}
		case 3: {
			weekDay = '星期三';
			break;
		}
		case 4: {
			weekDay = '星期四';
			break;
		}
		case 5: {
			weekDay = '星期五';
			break;
		}
		case 6: {
			weekDay = '星期六';
			break;
		}
		case 7: {
			weekDay = '星期日';
			break;
		}
		}
		if (month < 10)
			month = '0' + month;
		if (monthDay < 10)
			monthDay = '0' + monthDay;
		if (hour < 10)
			hour = '0' + hour;
		if (minute < 10)
			minute = '0' + minute;
		if (second < 10)
			second = '0' + second;

		return year + '年' + month + '月' + monthDay + '日 ' + weekDay + ' '
				+ hour + ':' + minute + ':' + second;
	},
	show : function(msg, timeout, closable) {
		$.messager.show({
			title : '提示消息',
			msg : msg,
			timeout : timeout,
			showType : 'slide',
			closable : closable
		});
	},
	// 提示弹出框
	alert : function(title, msg, icon, callback) {
		$.messager.alert(title, msg, icon || 'info', callback);
	},
	// 询问弹出框
	confirm : function(title, msg, callback) {
		$.messager.confirm(title, msg, callback);
	},
	// 进度弹出框
	progress : function(text) {
		$.messager.progress({
			title : '进度信息',
			text : text || '请求中，请稍后。。。'
		});
	},// 关闭show弹出框
	closeShow : function() {
		$(".messager-body").window('close');
	},
	// 关闭进度弹出框
	closeProgress : function() {
		$.messager.progress('close');
	},
	// 关闭进度弹出框
	prompt : function(title, msg, callback) {
		$.messager.prompt(title, msg, function(r) {
			if (r) {
				if ($.isFunction(callback)) {
					callback(r);
				}
			}
		});
	},
	// 重新登录
	toLogin : function() {
		window.top.location = VWVO.urls.url + 'login.jsp';
	},
	ajaxSubmit : function(form, option) {
		form.ajaxSubmit(option);
	},
	// AJAX提交JSON
	ajaxJson : function(url, option, callback, type) {
		$.ajax(url, {
			type : type || 'post',
			dataType : 'json',
			data : option,
			complete : function(data) {
			
			},
			error : function(response, textStatus, errorThrown) {
				try {
					VWVO.closeProgress();
					      var sessionstatus=response.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus，  
					      if (sessionstatus == "timeout") {
								VWVO.confirm('消息', "登录超时,请重新登录！", function(r) {
									// 如果超时就处理 ，指定要跳转的页面
									window.parent.location.replace(VWVO.urls.url);
								});
						return false;
					} 
					var data = $.parseJSON(response.responseText);
					// 检查登录
					VWVO.alert('系统异常', '请求出现异常,请联系管理员。', 'error');
				} catch (e) {
					VWVO.alert('系统异常', '请求出现异常,请联系管理员。', 'error');
				}
			},
			success : function(data) {
				// 坚持登录
				if ($.isFunction(callback)) {
					callback(data);
				}
				if (data && data.msg) {
					VWVO.alert("消息", data.msg, "info");
				}
				VWVO.closeProgress();
			}
		});
	},
	// AJAX同步提交JSON
	ajaxAsyncJson : function(url, option, callback, type) {
		$.ajax(url, {
			type : type || 'post',
			dataType : 'json',
			data : option,
			 async: false,
			complete : function(data) {
			
			},
			error : function(response, textStatus, errorThrown) {
				try {
					VWVO.closeProgress();
					      var sessionstatus=response.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus，  
					      if (sessionstatus == "timeout") {
								VWVO.confirm('消息', "登录超时,请重新登录！", function(r) {
									// 如果超时就处理 ，指定要跳转的页面
									window.parent.location.replace(VWVO.urls.url);
								});
						return false;
					} 
					var data = $.parseJSON(response.responseText);
					// 检查登录
					VWVO.alert('系统异常', '请求出现异常,请联系管理员。', 'error');
				} catch (e) {
					VWVO.alert('系统异常', '请求出现异常,请联系管理员。', 'error');
				}
			},
			success : function(data) {
				VWVO.closeProgress();
				// 坚持登录
				if ($.isFunction(callback)) {
					callback(data);
				}
				if (data && data.msg) {
					VWVO.alert("消息", data.msg, "info");
				}
			}
		});
	},
	// AJAX提交表单
	submitForm : function(form, callback, dataType) {
		var option = {
			type : 'post',
			dataType : dataType || 'json',
			complete : function() {
				VWVO.closeProgress();
			},
			error : function(response, textStatus, errorThrown) {
				try {
					VWVO.closeProgress();
					var sessionstatus = response
							.getResponseHeader("sessionstatus"); // 通过XMLHttpRequest取得响应头，sessionstatus，
					if (sessionstatus == "timeout") {
						VWVO.confirm('消息', "登录超时,请重新登录！", function(r) {
							// 如果超时就处理 ，指定要跳转的页面
							window.location.replace(VWVO.urls.url);
						});
						return false;
					}
					var data = $.parseJSON(response.responseText);
					VWVO.alert('系统异常', '请求出现异常,请联系管理员。', 'error');
				} catch (e) {
					VWVO.alert('系统异常', '请求出现异常,请联系管理员。', 'error');
				}
			},
			success : function(data) {
				VWVO.closeProgress();
				if ($.isFunction(callback)) {
					callback(data);
				}
				if (data && data.msg) {
					VWVO.alert('消息', data.msg, 'info');
				} else if (!data.success && !data.msg) {
					VWVO.alert('系统异常', '请求出现异常,请联系管理员。', 'error');
				}
			}
		}
		VWVO.ajaxSubmit(form, option);
	},
	ajaxUploadFile : function(editForm, callback) {
		var option = {
				type : 'post',
				dataType : 'text/html',
				complete : function() {
					VWVO.closeProgress();
				},
				error : function(response, textStatus, errorThrown) {
					try {
						VWVO.closeProgress();
						var sessionstatus = response.getResponseHeader("sessionstatus"); // 通过XMLHttpRequest取得响应头，sessionstatus，
						if (sessionstatus == "timeout") {
							VWVO.confirm('消息', "登录超时,请重新登录！", function(
									r) {
								// 如果超时就处理 ，指定要跳转的页面
								window.location.replace(VWVO.urls.url);
							});
							return false;
						}
						var data = JSON.parse(response.responseText);
						VWVO.alert('错误信息', data.msg || '请求出现异常,请联系管理员。', 'error');
					} catch (e) {
						VWVO.alert('错误信息', '请求出现异常,请联系管理员。', 'error');
					}
				},
				success : function(data) {
					VWVO.closeProgress();
					$('#edit-win').dialog('close');
					data = data.substring(data.indexOf('{'), data
							.indexOf('}') + 1);
					data = JSON.parse(data);
					if (data && data.msg) {
						VWVO.alert('消息', data.msg, 'info');
					}
					// 回调函数
					if (jQuery.isFunction(callback)) {
						callback(data);
					}
				}
			}
			VWVO.ajaxSubmit( editForm, option);
	},
	// 添加、修改 保存
	save : function(form, callback) {
		if (form.form('validate')) {
			VWVO.progress('请求中...');
			// AJAX提交form
			VWVO.submitForm(form, function(data) {
				if (data.success || data.check) {
					if (callback) {
						callback(data);
					}
				}
			});
		}
	},
	// 查询
	getById : function(url, option, callback) {
		VWVO.progress('请求中...');
		VWVO.ajaxJson(url, option, function(data) {
			if (data.success) {
				if (callback) {
					callback(data);
				}
			}
		});
	},
	// 删除
	remove : function(url, option, callback) {
		VWVO.progress('请求中...');
		VWVO.ajaxJson(url, option, function(data) {
			VWVO.closeProgress();
			if (data.success) {
				if (callback) {
					callback(data);
				}
			}
		});
	},
	filterNull : function(config) {
		var result = {};
		for ( var attr in config) {
			var value = config[attr];
			if (attr == 'userType') {
				result[attr] = value;
			}
			if (value != null && value != "") {
				if (value instanceof Array) {
					value = value.join(",");
				}
				result[attr] = value;
			}
		}
		return result;
	},
	// 判断是否需要服务器主动推送同步数据提示框
	needServerNotify : function() {
		var needServerNotify = $('#needServerNotify').val();
		if (needServerNotify && needServerNotify == 1) {
			return true;
		}
		return false;
	},
	// ele是jquery的radio元素
	radioCheck : function(ele, check) {
		ele.prop("checked", check);
	},
	isNull : function(str) {
		if (str == null || str.trim() == '') {
			return true;
		}
		return false;
	},
	formatDate : function(time, pattern) {
		if (!time || time == "") {
			return '';
		}
		pattern = pattern || "yyyy-MM-dd hh:mm:ss";
		var date = new Date();
		date.setTime(time);
		return date.format(pattern);
	},
	fixDataGridColumn : function(str, colWidth){
		if(VWVO.isNull(str)){
			return '';
		}
		colWidth = colWidth || 100;
		var fixCount = 2.1;
		var count = colWidth / fixCount;
		var result = '';
		console.log(str.length + '  '+ count);
		if(str.length <= count){
			return str;
		}
		while(str.length > count){
			result += str.substring(0, count);
			result +=  '<br>';
			str = str.substring(count, str.length);
		}
		result += str;
		return result;
	},
	formatJson : function(json, options) {
		var reg = null, formatted = '', pad = 0, PADDING = '    '; // one can
		// also use
		// '\t' or a
		// different
		// number of
		// spaces

		// optional settings
		options = options || {};
		// remove newline where '{' or '[' follows ':'
		options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true
				: false;
		// use a space after a colon
		options.spaceAfterColon = (options.spaceAfterColon === false) ? false
				: true;

		// begin formatting...
		if (typeof json !== 'string') {
			// make sure we start with the JSON as a string
			json = JSON.stringify(json);
		} else {
			// is already a string, so parse and re-stringify in order to remove
			// extra whitespace
			json = JSON.parse(json);
			json = JSON.stringify(json);
		}

		// add newline before and after curly braces
		reg = /([\{\}])/g;
		json = json.replace(reg, '\r\n$1\r\n');

		// add newline before and after square brackets
		reg = /([\[\]])/g;
		json = json.replace(reg, '\r\n$1\r\n');

		// add newline after comma
		reg = /(\,)/g;
		json = json.replace(reg, '$1\r\n');

		// remove multiple newlines
		reg = /(\r\n\r\n)/g;
		json = json.replace(reg, '\r\n');

		// remove newlines before commas
		reg = /\r\n\,/g;
		json = json.replace(reg, ',');

		// optional formatting...
		if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
			reg = /\:\r\n\{/g;
			json = json.replace(reg, ':{');
			reg = /\:\r\n\[/g;
			json = json.replace(reg, ':[');
		}
		if (options.spaceAfterColon) {
			reg = /\:/g;
			json = json.replace(reg, ':');
		}

		$.each(json.split('\r\n'), function(index, node) {
			var i = 0, indent = 0, padding = '';

			if (node.match(/\{$/) || node.match(/\[$/)) {
				indent = 1;
			} else if (node.match(/\}/) || node.match(/\]/)) {
				if (pad !== 0) {
					pad -= 1;
				}
			} else {
				indent = 0;
			}

			for (i = 0; i < pad; i++) {
				padding += PADDING;
			}

			formatted += padding + node + '\r\n';
			pad += indent;
		});
		return formatted;
	}
};

/* 自定义密码验证 */
$.extend($.fn.validatebox.defaults.rules, {
	equals : {
		validator : function(value, param) {
			return value == $(param[0]).val();
		},
		message : 'Field do not match.'
	}
});

/* 自定义密码验证 */
$.extend($.fn.validatebox.defaults.rules, {
	comboxRequired : {
		validator : function(value, param) {
			return value != param[0];
		},
		message : '必须选择一个'
	}
});

/* 自定义组合框按索引赋值 */
$.extend($.fn.combobox.methods, {
	selectedIndex : function(jq, index) {
		var data = $(jq).combobox('getData');
		var vf = $(jq).combobox('options').valueField;
		var va = data[0][vf];
		$(jq).combobox('setValue', va);
	}
});

/* 自定义表单转成JSON数据 */
$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || '');
		} else {
			if (this.value && this.value.trim() !== '')
				o[this.name] = this.value || '';
		}
	});
	return o;
}

/* 自定义数据表格添加和删除按钮 */
$.extend($.fn.datagrid.methods,
				{
					addToolbarItem : function(jq, items) {
						return jq
								.each(function() {
									var toolbar = $(this).parent().prev(
											'div.datagrid-toolbar');
									for (var i = 0; i < items.length; i++) {
										var item = items[i];
										if (item === '-') {
											toolbar
													.append('<div class=\'datagrid-btn-separator\'></div>');
										} else {
											var btn = $('<a href=\'javascript:void(0)\'></a>');
											btn[0].onclick = eval(item.handler
													|| function() {
													});
											btn.css('float', 'left').appendTo(
													toolbar).linkbutton(
													$.extend({}, item, {
														plain : true
													}));
										}
									}
									toolbar = null;
								});
					},
					removeToolbarItem : function(jq, param) {
						return jq
								.each(function() {
									var btns = $(this).parent().prev(
											'div.datagrid-toolbar').children(
											'a');
									var cbtn = null;
									if (typeof param == 'number') {
										cbtn = btns.eq(param);
									} else if (typeof param == 'string') {
										var text = null;
										btns
												.each(function() {
													text = $(this).data().linkbutton.options.text;
													if (text == param) {
														cbtn = $(this);
														text = null;
														return;
													}
												});
									}
									if (cbtn) {
										var prev = cbtn.prev()[0];
										var next = cbtn.next()[0];
										if (prev
												&& next
												&& prev.nodeName == 'DIV'
												&& prev.nodeName == next.nodeName) {
											$(prev).remove();
										} else if (next
												&& next.nodeName == 'DIV') {
											$(next).remove();
										} else if (prev
												&& prev.nodeName == 'DIV') {
											$(prev).remove();
										}
										cbtn.remove();
										cbtn = null;
									}
								});
					}
				});

//Date.prototype.format = function(fmt) { // author: meizz
//	var o = {
//		"M+" : this.getMonth() + 1, // 月份
//		"d+" : this.getDate(), // 日
//		"h+" : this.getHours(), // 小时
//		"m+" : this.getMinutes(), // 分
//		"s+" : this.getSeconds(), // 秒
//		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
//		"S" : this.getMilliseconds()
//	// 毫秒
//	};
//	if (/(y+)/.test(fmt))
//		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
//				.substr(4 - RegExp.$1.length));
//	for ( var k in o)
//		if (new RegExp("(" + k + ")").test(fmt))
//			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
//					: (("00" + o[k]).substr(("" + o[k]).length)));
//	return fmt;
//};

$(function(){
	$.ajaxSetup({   
	    contentType:"application/x-www-form-urlencoded;charset=utf-8",   
	    complete:function(XMLHttpRequest,textStatus){ 
	      var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus，  
	          if(sessionstatus=="timeout"){ 
	        	  VWVO.confirm('消息',"登录超时,请重新登录！",function(r){
			          //如果超时就处理 ，指定要跳转的页面  
			          window.parent.location.replace(VWVO.urls.url);  
		          });
		          return false; 
	          } 
	       }
	  });
});