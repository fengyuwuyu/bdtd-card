/**
 * 管理初始化
 */
var Dict = {
    id: "DictTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Dict.initColumn = function () {
	if (!$('#pid').val()) {
		return [
			{field: 'selectItem', radio: true},
            {title: 'id', field: 'id', visible: false, align: 'center', valign: 'middle'},
            {title: '中文类别', field: 'name', visible: true, align: 'center', valign: 'middle'},
            {title: '英文类别', field: 'enName', visible: true, align: 'center', valign: 'middle'},
            {title: '描述', field: 'content', visible: true, align: 'center', valign: 'middle'},
            {title: '创建时间', field: 'createDate', visible: true, align: 'center', valign: 'middle'},
            {title: '更新时间', field: 'updateDate', visible: true, align: 'center', valign: 'middle'}
        ];
	}
    return [
        	{field: 'selectItem', radio: true},
            {title: 'id', field: 'id', visible: false, align: 'center', valign: 'middle'},
            {title: '上级字典', field: 'parentName', visible: true, align: 'center', valign: 'middle'},
            {title: '名称', field: 'name', visible: true, align: 'center', valign: 'middle'},
            {title: '英文类别', field: 'enName', visible: true, align: 'center', valign: 'middle'},
            {title: '描述', field: 'content', visible: true, align: 'center', valign: 'middle'},
            {title: '创建时间', field: 'createDate', visible: true, align: 'center', valign: 'middle'},
            {title: '更新时间', field: 'updateDate', visible: true, align: 'center', valign: 'middle'}
            ];
};

/**
 * 检查是否选中
 */
Dict.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        Dict.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加
 */
Dict.openAddDict = function () {
    var index = layer.open({
        type: 2,
        title: '添加',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/dict/dict_add/' + ($('#pid').val() || 0)
    });
    this.layerIndex = index;
};

/**
 * 打开查看详情
 */
Dict.openDictDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/dict/dict_update/' + Dict.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 打开查看详情
 */
Dict.openSubDictList = function () {
	if (this.check()) {
		var index = layer.open({
			type: 2,
			title: '详情',
			area: ['1200px', '700px'], //宽高
			fix: false, //不固定
			maxmin: true,
			content: Feng.ctxPath + '/dict/dict_sublist/' + Dict.seItem.id
		});
		this.layerIndex = index;
	}
};

/**
 * 删除
 */
Dict.delete = function () {
    if (this.check()) {
	    var operation = function() {
	    	var ajax = new $ax(Feng.ctxPath + "/dict/delete", function (data) {
	    		if (data.code && data.code == 500) {
	    			Feng.error(data.message || "操作失败！");
	    			return;
	    		}
	            Feng.success("删除成功!");
	            Dict.table.refresh();
        	}, function (data) {
            	Feng.error("删除失败!" + data.responseJSON.message + "!");
        	});
	        ajax.set("dictId",Dict.seItem.id);
	        ajax.start();
	    };
        
        Feng.confirm("是否删除该选项？", operation);
    }
};

/**
 * 查询列表
 */
Dict.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    var pid = $("#pid").val();
    if (pid) {
    	queryData['pid'] = $("#pid").val();
    }
    Dict.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Dict.initColumn();
    var table = new BSTable(Dict.id, "/dict/list/" + ($('#pid').val() || 0), defaultColunms, {showColumns: true});
    table.setPaginationType("client");
    Dict.table = table.init();
});
