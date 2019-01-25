/**
 * 初始化部门表详情对话框
 */
var DeptCopyInfoDlg = {

};

/**
 * 关闭此对话框
 */
DeptCopyInfoDlg.close = function() {
    parent.layer.close(window.parent.DeptCopy.layerIndex);
}


/**
 * 提交添加
 */
DeptCopyInfoDlg.addSubmit = function() {
	var addForm = $('#addForm');
	if (!Feng.validateForm(addForm)) {
		return;
	}
	
	var data = addForm.serializeObjectFilterNull();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/deptCopy/add", function(data){
        Feng.success("添加成功!");
        window.parent.DeptCopy.table.refresh();
        DeptCopyInfoDlg.close();
    });
    ajax.set(data);
    ajax.start();
}

/**
 * 提交修改
 */
DeptCopyInfoDlg.editSubmit = function() {
	var editForm = $('#editForm');
	if (!Feng.validateForm(editForm)) {
		return;
	}
	
	var data = editForm.serializeObjectFilterNull();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/deptCopy/update", function(data){
        Feng.success("修改成功!");
        window.parent.DeptCopy.table.refresh();
        DeptCopyInfoDlg.close();
    });
    ajax.set(data);
    ajax.start();
}

$(function() {

});
