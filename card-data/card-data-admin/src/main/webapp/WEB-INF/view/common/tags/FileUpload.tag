@/*
    头像参数的说明:
    name : 名称
    id : 头像的id
@*/

<div class="form-group">
    <label class="col-sm-3 control-label head-scu-label">${name}</label>
    <div class="col-sm-2 input-group-btn">
        <button class="btn btn-primary" id="${id}BtnId" type="button">
            <i class="fa fa-upload">&nbsp;上传</i>
        </button>
    </div>
    <input type="hidden" id="${id}" value="${avatarImg!}"/>
</div>


@if(isNotEmpty(underline) && underline == 'true'){
    <div class="hr-line-dashed"></div>
@}


