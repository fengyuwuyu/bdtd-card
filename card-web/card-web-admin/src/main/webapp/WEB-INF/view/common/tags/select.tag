@/* select标签中各个参数的说明: name : select的名称 id : select的id underline : 是否带分割线
itemList : 下拉列表需要显示的数据 @*/

<div class="input-group">
	<div class="input-group-btn">
		<button data-toggle="dropdown" class="btn btn-white dropdown-toggle"
			type="button"><b>${name}</b></button>
	</div>
	<select class="form-control easyui-combobox easyui-validatebox" id="${id}" name="${id}" 
		@if(isNotEmpty(dataOptions)){
        	@if (isEmpty(itemList) || tool.checkListSize(itemList)) { 
        		data-options="panelHeight:'auto',panelMaxHeight:'240px', editable:false,${dataOptions}"
			@}else{
	        		data-options="panelHeight:'auto',panelMaxHeight:'240px',${dataOptions}"
		    @}
        @}else{
        	 @if (isEmpty(itemList) || tool.checkListSize(itemList)) { 
                data-options="panelHeight:'auto',panelMaxHeight:'240px', editable:false"
            @}else{
                    data-options="panelHeight:'auto',panelMaxHeight:'240px'"
            @}
        @}
        @if(isNotEmpty(disabled) || isNotEmpty(readonly)){
            readonly="readonly"
        @}
        @if(isNotEmpty(disable)){
            disabled="disabled"
        @}
        >
        @if (isNotEmpty(emptyValue)) {
            <option></option>
        @}
		@if (isNotEmpty(itemList)) {
			@for (item in itemList) {
			<option value="${item.id}"
				@if (isNotEmpty(value) && tool.equals(value, item.id)) {
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

@if(isNotEmpty(underline) && underline == 'true'){
<div class="hr-line-dashed"></div>
@}
