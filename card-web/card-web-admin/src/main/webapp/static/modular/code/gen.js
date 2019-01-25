/**
 * 初始化
 */
var Code = {
    ztreeInstance: null,
    tableName: "",
    submitData: {},
    switchs: {}
};

/**
 * 选择table的事件
 */
Code.selectTable = function (tableName, tableComment) {

    if (SelectList.singelSelect("tableList", "tableName", tableName) == true) {
        Code.tableName = tableName;
        Code.setTableName(tableName, tableComment);
    } else {
        Code.tableName = "";
    }
};

/**
 * 选择模板的事件
 */
Code.selectTemplate = function (templateKey) {
    if (Code.tableName != "") {
        if (SelectList.mutiSelect("templateList", "key", templateKey) == true) {
            Code.switchs[templateKey] = true;
        } else {
            Code.switchs[templateKey] = false;
        }
    } else {
        Feng.info("请先选择表");
    }
};

/**
 * 点击生成
 */
Code.generate = function () {
//    Code.submitData = {};
//    Code.submitData.tableName = Code.tableName;
    var data = $('#generatorForm').serializeObject();
//    this.set('projectPath').set('author').set('projectPackage').set('corePackage').set('ignoreTabelPrefix').set('bizName').set('moduleName').set('parentMenuName');
    var baseAjax = Feng.baseAjax("/code/generate", "生成代码");

    var selected = false;
    for (var item in Code.switchs) {
    	data[item] = Code.switchs[item];
    	if (Code.switchs[item]) {
    		selected = true
    	}
    }
    
    if (!selected) {
    	Feng.info("请至少选择一个要生成的模板！");
    	return;
    }

    console.log(data)
    baseAjax.setData(data);
    baseAjax.start();
};

/**
 * 设置表名称
 */
Code.setTableName = function (tableName, tableComment) {
	var prefix = tableName.split('_')[0] + '_';
    $('#ignoreTabelPrefix').val(prefix);
    var preSize = prefix.length;
    $("#tableName").val(tableName);
    $("#className").val(Feng.underLineToCamel(tableName.substring(preSize)));
    $('#bizName').val(tableComment);
};

/**
 * 点击父级编号input框时
 */
Code.onClickDept = function (e, treeId, treeNode) {
    $("#parentMenuName").attr("value", Code.ztreeInstance.getSelectedVal());
};

/**
 * 显示父级菜单选择的树
 */
Code.showMenuSelectTree = function () {
    Feng.showInputTree("parentMenuName", "pcodeTreeDiv", 15, 34);
};

$(function () {
    var ztree = new $ZTree("pcodeTree", "/menu/selectMenuTreeList");
    ztree.bindOnClick(Code.onClickDept);
    ztree.init();
    Code.ztreeInstance = ztree;
    $("#pcodeTree").css('width',$("#parentMenuName").css('width'));
});

Code.set = function (key, val) {
    Code.submitData[key] = (typeof value == "undefined") ? $("#" + key).val() : value;
    return this;
};