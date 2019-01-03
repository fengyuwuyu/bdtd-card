var UserCommon = {
	initSearchDtUserComboGrid: function(callFunc) {
		$('#name').combogrid({
			width: '100%',
			panelWidth: 500,
			idField: 'userNo',   
		    delay: 600, 
		    fitColumns: true,
		    mode: 'remote', 
			textField: 'userName',
			url: Feng.ctxPath + '/registration/findByUserName',
			columns:[[    
				{field:'userId', hidden: true},    
		        {field:'userCard', hidden: true},    
		        {field:'userNo',title:'编号',width:80, align: 'center'},    
		        {field:'userName',title:'姓名',width:100, align: 'center'},    
		        {field:'userSex',title:'性别',width:50, align: 'center'},    
		        {field:'userDuty',title:'身份',width:50, align: 'center'},   
		        {field:'orgName',title:'单位',width:100, align: 'center'},   
		        {field:'userTelephone',title:'联系方式',width:100, align: 'center'},   
		        {field:'enrolDate',title:'入伍时间',width:60, align: 'center'}   
		    ]],
		    onClickRow: function(index, row) {
		    	if (callFunc && $.isFunction(callFunc)) {
		    		callFunc(index, row);
		    	} 
		    }
		});
	},
	checkDtUser: function() {
		if (Feng.isNull($('#userNo').val())) {
			Feng.info("请选择一卡通用户！");
			return false;
		}
		return true;
	}
}

$(function() {
	UserCommon.initSearchDtUserComboGrid(function(index, row) {
		$('#userNo').val(row.userNo);
		$('#name').combogrid('setValue', row.userName);
		$('#deptName').val(row.orgName);
		$('#userDepname').val(row.orgName);
		$('#phone').val(row.userTelephone);
		console.log(row.userPassword)
		$('#password').val(row.userPassword);
		$('#rePassword').val(row.userPassword);
	});
});