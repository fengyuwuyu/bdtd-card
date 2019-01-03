var Feng = {
	checkTableSelect: function(id) {
		if (Feng.isNull(id)) {
			return false;
		}
		var selected = $('#' + id).bootstrapTable('getSelections');
	    if(selected.length == 0){
	        Feng.info("请先选中表格中的某一记录！");
	        return false;
	    }
	    return true;
	},
	checkTableSelectOne: function(id) {
		if (Feng.isNull(id)) {
			return false;
		}
		var selected = $('#' + id).bootstrapTable('getSelections');
	    if(selected.length != 1){
	        Feng.info("只能选择一条记录！");
	        return false;
	    }
	    return true;
	},
	getTableSelectOne: function(id) {
		return $('#' + id).bootstrapTable('getSelections')[0];
	},
	getTableSelectMultiple: function(id) {
		return $('#' + id).bootstrapTable('getSelections');
	},
	getTableSelectMultipleIds: function(id) {
		var selected = $('#' + id).bootstrapTable('getSelections');
		var ids = [];
	    for(var i = 0; i < selected.length; i++) {
	    	ids.push(selected[i].id);
	    }
	    return ids;
	},
	formatterExpireDate: function() {
		return function(value, item) {
			if (!value) {
				return;
			}
			var nowTime = new Date().getTime();
        	var expiredTime = Date.parse(item['expireDate']);
        	if (expiredTime - nowTime < 30 * 24 * 3600000) {
        		return "<span style='color:red'>" + value + "</span>";
        	}
        	return value;
		}
	},
	ctxPath : "/yljz",
	formatterLongValue: function() {
		return function(value) {
			if (!value || value.trim() === "") {
	    		return "";
	    	}
	    	var len = value.length;
	    	var maxLen = 7;
	    	if (len > maxLen) {
	    		return value.substring(0, maxLen) + "..."
	    	}
	    	return value;
		}
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
	makeGetParams: function(conf) {
		if (!conf) {
			var res = '?';
			$.each(conf, function(i, n) {
				res += i + "=n&"
			});
			res = res.substr(0, res.length - 1);
			console.log(res)
			return res;
		}
		return "";
	},
	exportData : function(url, data){
		var param = data || $('#searchForm').serialize();
		url = Feng.ctxPath + url + '?'+param,
		window.location = decodeURIComponent(url);
		
	},
	clearSearchForm: function(callback) {
		var searchForm = $('#searchForm');
		if (searchForm) {
			searchForm.form('reset');
			if (callback && $.isFunction(callback)) {
				callback();
			}
		}
	},
	checkSearchTimeSection: function() {
		var beginDate = $('#beginDate').val();
		var endDate = $('#endDate').val();
		if (beginDate && endDate && beginDate > endDate) {
			Feng.info('开始时间必须小于结束时间！');
			return false;
		}
		return true;
	},
	// JSON方法二
	parseJson : function(str) {
		return eval('(' + str + ')');
	},
	getTableSerialNumberFunc: function(tableId) {
		return function (value, row, index) {
            var pageSize = $('#' + tableId).bootstrapTable('getOptions').pageSize;     // 通过table的#id
																						// 得到每页多少条
            var pageNumber = $('#' + tableId).bootstrapTable('getOptions').pageNumber; // 通过table的#id
																						// 得到当前第几页
            return pageSize * (pageNumber - 1) + index + 1;    // 返回每条的序号： 每页条数
																// *（当前页 - 1 ）+
																// 序号
        };
	},
	getTableSelectOne: function(table) {
		 var selected = table.bootstrapTable('getSelections');
		 if(selected.length == 0 || selected.length != 1){
		     Feng.info("请先选中表格中的某一记录！");
		     return null;
		 }
		 return selected[0];
	},
	getTableSelectMulti: function(table) {
		 var selected = table.bootstrapTable('getSelections');
		 if(selected.length == 0){
		     Feng.info("请先选中表格中的某一记录！");
		     return null;
		 }
		 return selected;
	},
	// 进度弹出框
	progress : function(text) {
		$.messager.progress({
			title : '进度信息',
			text : text || '请求中，请稍后。。。'
		});
	},
	// 关闭进度弹出框
	closeProgress : function() {
		$.messager.progress('close');
	},
	createDatagrid : function(dataGrid, Grid) {
		var fitColumns;
		if (dataGrid.fitColumns != undefined) {
			fitColumns = dataGrid.fitColumns;
		} else {
			fitColumns = true;
		}
		var singleSelect;
		if (dataGrid.singleSelect != undefined) {
			singleSelect = dataGrid.singleSelect;
		} else {
			singleSelect = true;
		}
		
		var showButton = false;
		if (dataGrid.showButton != undefined) {
			showButton = dataGrid.showButton;
		}
		var pagination = false;
		if (dataGrid.pagination != undefined) {
			pagination = dataGrid.pagination;
		}
		var queryParams = dataGrid.queryParams || {};
		var pageSize = dataGrid.pageSize ? dataGrid.pageSize : 10;
		var pageList = dataGrid.pageList ? dataGrid.pageList : [ 10, 20, 30,
				40, 50 ];
		var dataconfig = {
			iconCls : dataGrid.iconCls || 'icon-grid',
			height : dataGrid.height || 435,
			width : dataGrid.height || 786,
			fitColumns : fitColumns,
			nowrap : false,
			autoRowHeight : false,
			striped : true,
			// collapsible:true,
			remoteSort : false,
			pagination : pagination,
			rownumbers : true,
			singleSelect : singleSelect,
			pageSize : pageSize,
			pageList : pageList,
			checkOnSelect : true,
			selectOnCheck : true,
			url : dataGrid.url,
			method : dataGrid.method || 'post',
			loadMsg : dataGrid.loadMsg || '加载中 ... ',
			idField : dataGrid.idField || 'id',
			columns : dataGrid.columns,
			queryParams : queryParams,
			toolbar : showButton == false ? [] : dataGrid.toolbar2
					|| getToolbar(),
			onLoadSuccess : dataGrid.onLoadSuccess || function() {
				Grid.datagrid('clearSelections');
				Grid.datagrid('clearChecked');
			}
		};
		
		if (dataGrid.title) {
			dataconfig.title = dataGrid.title;
		}
		Grid.datagrid(dataconfig);
	},
	addCtx : function(ctx) {
		this.ctxPath = ctx;
	},
	ajaxSubmit : function(form, option) {
		form.ajaxSubmit(option);
	},
	// AJAX提交JSON
	ajaxJson : function(url, option, callback, type) {
		Feng.progress();
		$.ajax(url, {
			type : type || 'post',
			dataType : 'json',
			data : option,
			complete : function(data) {

			},
			error : function(response, textStatus, errorThrown) {
				try {
					Feng.closeProgress();
					
					var data = $.parseJSON(response.responseText);
					// 检查登录
					Feng.error(data.message);
				} catch (e) {
					Feng.error("服务器内部错误！" || data.message);
				}
			},
			success : function(data) {
				Feng.closeProgress();
				
				if (data && data.message) {
					Feng.success(data.message);
				}
				
				if ($.isFunction(callback)) {
					callback(data);
				}
			}
		});
	},
	// AJAX同步提交JSON
	ajaxAsyncJson : function(url, param, callback, type) {
		Feng.progress();
		$.ajax(url, {
			type : type || 'post',
			dataType : 'json',
			data : param,
			async : false,
			complete : function(data) {

			},
			error : function(response, textStatus, errorThrown) {
				try {
					Feng.closeProgress();
					var data = $.parseJSON(response.responseText);
					Feng.error(data.message || "服务器异常");
				} catch (e) {
					Feng.error(data.message || "服务器异常");
				}
			},
			success : function(data) {
				Feng.closeProgress();
				// 坚持登录
				if ($.isFunction(callback)) {
					callback(data);
				}
				if (data && (data.message || data.msg)) {
					Feng.msg(data.message || data.msg);
				}
			}
		});
	},
	confirm : function(tip, ensure) {// 询问框
		parent.layer.confirm(tip || '确定要执行此操作吗', {
			btn : [ '确定', '取消' ]
		}, function(index) {
			ensure();
			parent.layer.close(index);
		}, function(index) {
			parent.layer.close(index);
		});
	},
	log : function(info) {
		console.log(info);
	},
	msg : function(info, iconIndex) {
		parent.layer.msg(info, {
			icon : iconIndex
		});
	},
	alert : function(info, iconIndex) {
		parent.layer.alert(info, {
			icon : iconIndex
		});
	},
	info : function(info) {
		Feng.msg(info, 0);
	},
	success : function(info) {
		Feng.msg(info, 1);
	},
	error : function(info) {
		Feng.alert(info, 2);
	},
	infoDetail : function(title, info) {
		var display = "";
		if (typeof info == "string") {
			display = info;
		} else {
			if (info instanceof Array) {
				for ( var x in info) {
					display = display + info[x] + "<br/>";
				}
			} else {
				display = info;
			}
		}
		parent.layer.open({
			title : title,
			type : 1,
			skin : 'layui-layer-rim', // 加上边框
			area : [ '950px', '600px' ], // 宽高
			content : '<div style="padding: 20px;">' + display + '</div>'
		});
	},
	writeObj : function(obj) {
		var description = "";
		for ( var i in obj) {
			var property = obj[i];
			description += i + " = " + property + ",";
		}
		layer.alert(description, {
			skin : 'layui-layer-molv',
			closeBtn : 0
		});
	},
	showInputTree : function(inputId, inputTreeContentId, leftOffset,
			rightOffset) {
		var onBodyDown = function(event) {
			if (!(event.target.id == "menuBtn"
					|| event.target.id == inputTreeContentId || $(event.target)
					.parents("#" + inputTreeContentId).length > 0)) {
				$("#" + inputTreeContentId).fadeOut("fast");
				$("body").unbind("mousedown", onBodyDown);// mousedown当鼠标按下就可以触发，不用弹起
			}
		};

		if (leftOffset == undefined && rightOffset == undefined) {
			var inputDiv = $("#" + inputId);
			var inputDivOffset = $("#" + inputId).offset();
			$("#" + inputTreeContentId).css({
				left : inputDivOffset.left + "px",
				top : inputDivOffset.top + inputDiv.outerHeight() + "px"
			}).slideDown("fast");
		} else {
			$("#" + inputTreeContentId).css({
				left : leftOffset + "px",
				top : rightOffset + "px"
			}).slideDown("fast");
		}

		$("body").bind("mousedown", onBodyDown);
	},
	baseAjax : function(url, tip) {
		var ajax = new $ax(Feng.ctxPath + url, function(data) {
			Feng.success(tip + "成功!");
		}, function(data) {
			Feng.error(tip + "失败!" + data.responseJSON.message + "!");
		});
		return ajax;
	},
	changeAjax : function(url) {
		return Feng.baseAjax(url, "修改");
	},
	zTreeCheckedNodes : function(zTreeId) {
		var zTree = $.fn.zTree.getZTreeObj(zTreeId);
		var nodes = zTree.getCheckedNodes();
		var ids = "";
		for (var i = 0, l = nodes.length; i < l; i++) {
			ids += "," + nodes[i].id;
		}
		return ids.substring(1);
	},
	eventParseObject : function(event) {// 获取点击事件的源对象
		event = event ? event : window.event;
		var obj = event.srcElement ? event.srcElement : event.target;
		return $(obj);
	},
	sessionTimeoutRegistry : function() {
		$.ajaxSetup({
			contentType : "application/x-www-form-urlencoded;charset=utf-8",
			complete : function(XMLHttpRequest, textStatus) {
				// 通过XMLHttpRequest取得响应头，sessionstatus，
				var sessionstatus = XMLHttpRequest
						.getResponseHeader("sessionstatus");
				if (sessionstatus == "timeout") {
					// 如果超时就处理 ，指定要跳转的页面
					window.location = Feng.ctxPath + "/global/sessionError";
				}
			}
		});
	},
	initValidator : function(formId, fields) {
		$('#' + formId).bootstrapValidator({
			feedbackIcons : {
				valid : 'glyphicon glyphicon-ok',
				invalid : 'glyphicon glyphicon-remove',
				validating : 'glyphicon glyphicon-refresh'
			},
			fields : fields,
			live : 'enabled',
			message : '该字段不能为空'
		});
	},
	underLineToCamel : function(str) {
		var strArr = str.split('_');
		for (var i = 1; i < strArr.length; i++) {
			strArr[i] = strArr[i].charAt(0).toUpperCase()
					+ strArr[i].substring(1);
		}
		var result = strArr.join('');
		return result.charAt(0).toUpperCase() + result.substring(1);
	},
	fixWidth : function(percent) {
		if (percent == null) {
			percent = 1;
		}
		return document.body.clientWidth * percent;
	},
	setSelectWidth : function() {
		$.each($('.textbox'), function() {
			$(this).css('width', '100%');
		});
		$.each($('.combo'), function() {
			$(this).css('width', '100%');
		});
	},
	validateForm : function(form) {
		if (form.form('validate')) {
			return true;
		}
		return false;
	},
	isNull : function(str) {
		if (str == null || str.trim() == '') {
			return true;
		}
		return false;
	},
	filterNull : function(config) {
		var result = {};
		for ( var attr in config) {
			var value = config[attr];
			if (attr == 'userType') {
				result[attr] = value;
			} else if (!Feng.isNull(value)) {
				if (value instanceof Array) {
					value = value.join(",");
				}
				result[attr] = value;
			}
		}
		return result;
	},
	filterEmptySetNull : function(config) {
		for (var attr in config) {
			var value = config[attr];
			if (value == '') {
				config[attr] = null;
			}
		}
	}
};

$.fn.validatebox.defaults.missingMessage = '此项不能为空';
$.fn.validatebox.defaults.rules.email.message = '请输入有效的电子邮件地址';
$.fn.validatebox.defaults.rules.url.message = '请输入有效的URL地址';
$.fn.validatebox.defaults.rules.length.message = '输入内容长度必须介于{0}和{1}之间';
$.fn.validatebox.defaults.rules.remote.message = '请修正该字段';

$.extend($.fn.validatebox.defaults.rules, {
	comboxRequired : {
		validator : function(value, param) {
			try {
				// console.log($(this))
				// console.log($($(this)[0]).next("input[type='hidden']"))
			} catch (err) {
				console.log(err)
				return false;
			}
			return true;
		},
		message : '该选项不存在'
	}
});

$.extend($.fn.validatebox.defaults.rules, {
	number : {
		validator : function(value, param) {
// console.log(value)
// console.log(param)
// var a = parseInt(value);
// if (isNaN(a) || !isFinite(a)) {
// return false;
// }
			return true
		},
		message : "请输入数字"
	}
});

$.extend($.fn.validatebox.defaults.rules, {
	amount : {
		validator : function(value, param) {
			var a = parseInt(value);
			if (isNaN(a) || !isFinite(a) || a <= 0) {
				return false;
			}
			return true
		},
		message : "请输入大于0的数字"
	}
});

$.fn.serializeObjectFilterNull = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || null);
		} else {
			if (this.value && this.value.trim() !== '') {
				o[this.name] = this.value || null;
			}
		}
	});
	return Feng.filterNull(o);
};

$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || null);
		} else {
			o[this.name] = this.value || null;
		}
	});
	return o;
}

Date.prototype.format = function(fmt) { // author: meizz
var o = {
	"M+" : this.getMonth() + 1, // 月份
	"d+" : this.getDate(), // 日
	"h+" : this.getHours(), // 小时
	"m+" : this.getMinutes(), // 分
	"s+" : this.getSeconds(), // 秒
	"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
	"S" : this.getMilliseconds()
// 毫秒
};
if (/(y+)/.test(fmt))
	fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
			.substr(4 - RegExp.$1.length));
for ( var k in o)
	if (new RegExp("(" + k + ")").test(fmt))
		fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
				: (("00" + o[k]).substr(("" + o[k]).length)));
return fmt;
};

$(function() {
	Feng.setSelectWidth();
});