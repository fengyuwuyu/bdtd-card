@/*
    选择查询条件标签的参数说明:

    name : 查询条件的名称
    id : 查询内容的input框id
@*/
<div class="input-group">
    <div class="input-group-btn">
        <button data-toggle="dropdown" class="btn btn-white dropdown-toggle" type="button">
            <b>${name}</b>
        </button>
    </div>
    <select class="form-control easyui-combobox easyui-validatebox" id="${id}" name="${id}"
        @if(isNotEmpty(dataOptions)){
            @if (isEmpty(itemList) || tool.checkListSize(itemList)) { 
                data-options="panelHeight:'auto',panelMaxHeight:'240px', editable:false,${dataOptions}"
            @}else{
                    data-options="panelHeight:'auto',panelMaxHeight:'240px',${dataOptions}"
            @}
        @} else {
            @if (isEmpty(itemList) || tool.checkListSize(itemList)) { 
                data-options="panelHeight:'auto',panelMaxHeight:'240px', editable:false"
            @}else{
                    data-options="panelHeight:'auto',panelMaxHeight:'240px'"
            @}
        @}
    >
    	@if (isNotEmpty(itemList)) { 
    			<option></option>
        		@for (item in itemList) {
        		<option value="${item.id}"
        			@if (isNotEmpty(value) && parseInt(value) == item.id) {
        				selected="selected"
        			@}
        		>${item.name}</option>
        		@}
        	@} 
        	
        @if (isNotEmpty(tagBody)) {
           		${tagBody!}
        	@} 
    </select>
</div>