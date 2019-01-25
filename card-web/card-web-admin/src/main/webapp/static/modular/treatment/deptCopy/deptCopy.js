/**
 * 部门表管理初始化
 */
var DeptCopy = {
    id: "DeptCopyTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
DeptCopy.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
        {
            title: '序号',
            field: '',
            align: 'center',
            formatter: Feng.getTableSerialNumberFunc(DeptCopy.id)
        },
            {title: '主键id', field: 'id', visible: true, align: 'center', valign: 'middle'},
            {title: '排序', field: 'num', visible: true, align: 'center', valign: 'middle'},
            {title: '父部门id', field: 'pid', visible: true, align: 'center', valign: 'middle'},
            {title: '父级ids', field: 'pids', visible: true, align: 'center', valign: 'middle'},
            {title: '简称', field: 'simplename', visible: true, align: 'center', valign: 'middle'},
            {title: '全称', field: 'fullname', visible: true, align: 'center', valign: 'middle'},
            {title: '提示', field: 'tips', visible: true, align: 'center', valign: 'middle'},
            {title: '版本（乐观锁保留字段）', field: 'version', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
DeptCopy.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        DeptCopy.seItem = selected[0];
        return true;
    }
};

/**
 * 重置搜索表单，并刷新
 */
DeptCopy.resetSearchForm = function () {
    Feng.clearSearchForm(function() {
        DeptCopy.search();
    });
};

/**
 * 点击添加部门表
 */
DeptCopy.openAddDeptCopy = function () {
    var index = layer.open({
        type: 2,
        title: '添加部门表',
        area: ['800px', '600px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/deptCopy/deptCopy_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看部门表详情
 */
DeptCopy.openDeptCopyDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '部门表详情',
            area: ['800px', '600px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/deptCopy/deptCopy_update/' + DeptCopy.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除部门表
 */
DeptCopy.delete = function () {
    if (this.check()) {
	    var operation = function() {
	    	var ajax = new $ax(Feng.ctxPath + "/deptCopy/delete", function (data) {
	            Feng.success("删除成功!");
	            DeptCopy.table.refresh();
        	}, function (data) {
            	Feng.error("删除失败!" + data.responseJSON.message + "!");
        	});
	        ajax.set("deptCopyId",DeptCopy.seItem.id);
	        ajax.start();
	    };
        
        Feng.confirm("是否删除该选项？", operation);
    }
};

/**
 * 查询部门表列表
 */
DeptCopy.search = function () {
    var queryData = $('#searchForm').serializeObject();
    DeptCopy.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = DeptCopy.initColumn();
    var table = new BSTable(DeptCopy.id, "/deptCopy/list", defaultColunms);
    DeptCopy.table = table.init();
});
