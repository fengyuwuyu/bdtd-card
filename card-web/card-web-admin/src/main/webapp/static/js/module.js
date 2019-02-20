var userAgent = navigator.userAgent.toLowerCase();
var is_opera = userAgent.indexOf('opera') != -1 && opera.version();
var is_moz = (navigator.product == 'Gecko') && userAgent.substr(userAgent.indexOf('firefox') + 8, 3);
var is_ie = (userAgent.indexOf('msie') != -1 && !is_opera) && userAgent.substr(userAgent.indexOf('msie') + 5, 3);

function LoadDialogWindow(URL, width, height) {
  /*if(is_ie)//window.open(URL);
     window.showModalDialog(URL,parent,"edge:raised;scroll:1;status:0;help:0;resizable:1;dialogWidth:"+width+"px;dialogHeight:"+height+"px;dialogTop:"+loc_y+"px;dialogLeft:"+loc_x+"px",true);
  else
     window.open(URL,parent,"height="+height+",width="+width+",status=0,toolbar=no,menubar=no,location=no,scrollbars=yes,top="+loc_y+",left="+loc_x+",resizable=yes,modal=yes,dependent=yes,dialog=yes,minimizable=no",true);*/

  var diag = new Dialog();
  //diag.Modal = false;
  //diag.Top = 10;
  //diag.Left = 10;
  diag.ID = "CusSelectWindow";
  diag.Width = width;
  diag.Height = height;
  diag.URL = URL;
  diag.show();
}
//选择客户
function SelectCus(cusType, mode, IDControl, NameControl, formName) {
  //URL = "/App/Module/CusSelect/Cus_Select_Index.aspx?CusType=" + cusType + "&Mode=" + mode + "&IDControl=" + IDControl + "&NameControl=" + NameControl + "&formName=" + formName;
  //LoadDialogWindow(URL, 650, 450);//这里设置了选人窗口的宽度和高度

  URL = "/App/Module/CusSelect/Cus_Select_Index2.aspx?CusType=" + cusType + "&Mode=" + mode + "&IDControl=" + IDControl + "&NameControl=" + NameControl + "&formName=" + formName;
  LoadDialogWindow(URL, 1000, 680);//这里设置了选人窗口的宽度和高度



}//2017-03-28 qianlong 获取选择用户的当前状态
function showCusState() {
  var delay = setTimeout("setCusState()", 100);
}
function setCusState() {
  var cusID = $("#rptCusID").val();
  $("#currentState").html("<img src=\"/theme/default/images/loading_16.gif\" align=\"middle\" /> 正在载入...");
  Kehu51.Team.UI.Web.App.Ajax.GetCusState.GetCusCurrentState(cusID, callshowcusState);
}
function callshowcusState(res) {
  var text = res.value;
  $("#currentState").html(text);
  if (text != "") {
    $("#trCurrentState").show();
  } else {
    $("#trCurrentState").hide();
  }
}
//清除客户
function ClearCus(TO_ID, TO_NAME) {
  if (TO_ID == "" || TO_ID == "undefined" || TO_ID == null) {
    TO_ID = "TO_ID";
    TO_NAME = "TO_NAME";
  }
  document.getElementsByName(TO_ID)[0].value = "";
  document.getElementsByName(TO_NAME)[0].value = "";
  if (document.getElementById("rptLinkManTD")) {
    $("#rptLinkManTD").remove();
  }
  if (document.getElementById("rptLinkManTD2")) {
    $("#rptLinkManTD2").remove();
  }
  //如果存在订单，那么同时清空订单
  if (document.getElementById("rptDealID")) {
    $("#rptDealID").val("");
    $("#rptDealTitle").val("");
  }
  //2017-03-29 qianlong
  if ($("#trCurrentState").length > 0) {
    $("#trCurrentState").hide();
  }
}
//编辑参数 controlType 参数类型，有下拉列表，单选，复选
function EditParameter(parameterName, formName, controlName, formatConfig, controlType) {
  var diag = new Dialog();
  diag.ID = "ConfigFileParameter_Edit";

  if (controlType == 4) {//多级联动下拉选择框
    diag.Width = 550;
    diag.Height = 600;
    diag.URL = "/App/Module/ParameterEdit/ParameterIndex_Multistage.aspx?ParameterName=" + parameterName + "&FormName=" + formName + "&ControlName=" + controlName + "&ControlType=" + controlType;
  } else {

    diag.Height = 550;
    if (formatConfig == 0) {
      diag.Width = 450;
      diag.URL = "/App/Module/ParameterEdit/ParameterIndex.aspx?ParameterName=" + parameterName + "&FormName=" + formName + "&ControlName=" + controlName + "&ControlType=" + controlType;
    } else {
      diag.Width = 530;
      diag.URL = "/App/Module/ParameterEdit/ParameterIndex_FormatConfig.aspx?ParameterName=" + parameterName + "&FormName=" + formName + "&ControlName=" + controlName + "&ControlType=" + controlType;
    }
  }
  diag.show();
}

//2015-11-13日后不用上面的了，使用这一个
function EditParameter2(parameterName, formName, controlName, formatConfig, controlType, classID, configGuid) {
  if (typeof (configGuid) == "undefined") {
    configGuid = "";
  }

  var diag = new Dialog();
  diag.ID = "ConfigFileParameter_Edit";

  if (controlType == 4) {//多级联动下拉选择框
    diag.Width = 550;
    diag.Height = 600;
    diag.URL = "/App/Module/ParameterEdit/ParameterIndex_Multistage.aspx?ParameterName=" + parameterName + "&ClassID=" + classID + "&FormName=" + formName + "&ControlName=" + controlName + "&ControlType=" + controlType + "&configguid=" + configGuid;
  } else {

    diag.Height = 550;
    if (formatConfig == 0) {
      diag.Width = 450;
      diag.URL = "/App/Module/ParameterEdit/ParameterIndex.aspx?ParameterName=" + parameterName + "&ClassID=" + classID + "&FormName=" + formName + "&ControlName=" + controlName + "&ControlType=" + controlType + "&configguid=" + configGuid;
    } else {
      diag.Width = 530;
      diag.URL = "/App/Module/ParameterEdit/ParameterIndex_FormatConfig.aspx?ParameterName=" + parameterName + "&ClassID=" + classID + "&FormName=" + formName + "&ControlName=" + controlName + "&ControlType=" + controlType + "&configguid=" + configGuid;
    }
  }
  diag.show();
}


//设置是否允许下属编辑跟进时间
function EditSetTimePower(formName) {
  var diag = new Dialog();
  diag.ID = "SetTimePower";
  diag.Width = 500;
  diag.Height = 140;
  diag.Title = "设置是否允许修改跟进时间";
  diag.URL = "SetTimePower.aspx?dialog=" + formName;
  diag.show();
}

//重新载入参数select
function reLoadParameter(parameterName, controlName, controlType, classID, configGuid) {
  if (typeof (configGuid) == "undefined") {
    configGuid = "";
  }
  //alert(parameterName);
  //alert(parameterType);
  //alert(controlName);
  if (controlName != "" && document.getElementById(controlName + "Loading")) {
    document.getElementById(controlName + "Loading").style.display = "";
    var delay = setTimeout("reLoadParameterStart('" + parameterName + "', '" + controlName + "','" + controlType + "'," + classID + ",'" + configGuid + "')", 10);
  }
}

//重新载入参数select
function reLoadParameterStart(parameterName, controlName, controlType, classID, configGuid) {
  if (typeof (configGuid) == "undefined") {
    configGuid = "";
  }

  if (controlType == "dropdownlist") {//下拉选择框
    var slt = document.getElementById(controlName);
    var oldValue = slt.value;

    var v = Kehu51.Team.UI.Web.App.Ajax.GetData.GetSysParameterNew(parameterName, classID, configGuid).value; // 类的名称
    if (v.Rows.length == 0) {
      alert("为空");
      return;
    }

    if (v != null) {
      if (v != null && typeof (v) == "object" && v != null) {
        slt.length = 0;
        slt.options.length = 0;
        slt.options.add(new Option(" ", 0));
      }
      var checkedValue = "";
      for (var i = 0; i < v.Rows.length; i++) {
        var txt = v.Rows[i].Text; //这个地方需要注意区分大小写
        var che = v.Rows[i].Checked;
        var vol = v.Rows[i].Value;
        slt.options.add(new Option(txt, vol));
        if (che == "true") checkedValue = vol;
      }
      if (oldValue != "0") slt.value = oldValue; else slt.value = checkedValue;
    }
  } else if (controlType == "dropdownlist_multi") {//多级联动下拉选择框


    for (var n = 2; n <= 5; n++) {
      //rptCityID_NextSpan_5
      document.getElementById(controlName + "_NextSpan_" + n).innerHTML = "";//清空除当前级别之后所有的
    }

    var v = Kehu51.Team.UI.Web.App.Ajax.GetListMultiData.GetNextDataNew(parameterName, 0, classID, configGuid).value; // 类的名称

    var nextSelectID = controlName + "_List_1";
    var selectObj = document.getElementById(nextSelectID);

    //先清空
    selectObj.length = 0;
    selectObj.options.length = 0;
    selectObj.options.add(new Option(" ", 0));


    selectObj.options.add(new Option("  ", 0));//加上空值

    for (var i = 0; i < v.Rows.length; i++) {
      var text = v.Rows[i].Text; //这个地方需要注意区分大小写
      var oneabc = v.Rows[i].OneAbc;
      var valueid = v.Rows[i].ID;

      selectObj.options.add(new Option(oneabc + " " + text, valueid));
    }


  } else {//其它，CheckBox
    var v = Kehu51.Team.UI.Web.App.Ajax.GetData.GetSysParamterNewHTML(parameterName, controlName, controlType, classID, configGuid).value;
    document.getElementById(controlName + "_div").innerHTML = v;
    //2017-02-13 qianlong
    bindEvent();
  }
  document.getElementById(controlName + "Loading").style.display = "none";
}

//重新载入职位参数select(与其它select不同的是获取配置文件地址不同)
function reLoadControlData(parameterName, controlName, defaultID, controlType, classID) {
  document.getElementById(controlName + "Loading").style.display = "";
  var delay = setTimeout("reLoadControlDataStart('" + parameterName + "', '" + controlName + "'," + defaultID + ",'" + controlType + "'," + classID + ")", 10);
}

//重新载入职位参数select
function reLoadControlDataStart(parameterName, controlName, defaultID, controlType, classID) {
  document.getElementById(controlName + "Loading").style.display = "none";
  if (controlType == "dropdownlist") {//下拉选择框
    var slt = document.getElementById(controlName);
    var oldValue = slt.value;

    var v = Kehu51.Team.UI.Web.App.Ajax.GetData.GetRoleData().value; // 类的名称
    if (v.Rows.length == 0) {
      alert("职位为空");
      return;
    }

    if (v != null) {
      if (v != null && typeof (v) == "object" && v != null) {
        slt.length = 0;
        slt.options.length = 0;
      }
      for (var i = 0; i < v.Rows.length; i++) {
        var txt = v.Rows[i].RoleName; //这个地方需要注意区分大小写
        var vol = v.Rows[i].RoleID;
        slt.options.add(new Option(txt, vol));
      }
      if (defaultID == 0) {
        var rowIndex = v.Rows.length == 1 ? 0 : 1;
        defaultID = v.Rows[rowIndex].RoleID;
      }
      slt.value = defaultID;
    }
  } else if (controlType == "dropdownlist_multi") {//多级联动下拉选择框


    for (var n = 2; n <= 5; n++) {
      //rptCityID_NextSpan_5
      document.getElementById(controlName + "_NextSpan_" + n).innerHTML = "";//清空除当前级别之后所有的
    }

    var v = Kehu51.Team.UI.Web.App.Ajax.GetListMultiData.GetNextData(parameterName, 0, classID).value; // 类的名称

    var nextSelectID = controlName + "_List_1";
    var selectObj = document.getElementById(nextSelectID);

    //先清空
    selectObj.length = 0;
    selectObj.options.length = 0;
    selectObj.options.add(new Option(" ", 0));


    selectObj.options.add(new Option("  ", 0));//加上空值

    for (var i = 0; i < v.Rows.length; i++) {
      var text = v.Rows[i].Text; //这个地方需要注意区分大小写
      var oneabc = v.Rows[i].OneAbc;
      var valueid = v.Rows[i].ID;

      selectObj.options.add(new Option(oneabc + " " + text, valueid));
    }
  } else {//其它，CheckBox
    var v = Kehu51.Team.UI.Web.App.Ajax.GetData.GetSysParamterHTML(parameterName, controlName, controlType, classID).value;
    document.getElementById(controlName + "_div").innerHTML = v;
    //2017-02-13 qianlong
    bindEvent();
  }
  document.getElementById(controlName + "Loading").style.display = "none";
}

//编辑自定义字段【旧的，要删掉的】
function EditCustomizeField(customizeName, formName, controlName) {
  var diag = new Dialog();
  diag.Width = 280;
  diag.Height = 345;
  diag.URL = "/App/Module/CustomizeField/CustomizeFieldEdit.aspx?CustomizeName=" + customizeName + "&FormName=" + formName + "&ControlName=" + controlName;
  diag.show();
}

//打开自定义字段的设置窗口
function CustomizeFieldSet(customizeName, formName, cusType) {
  var diag = new Dialog();
  diag.ID = "CustomizeField";
  diag.Width = 350;
  diag.Height = 580;
  diag.Title = "选择您需要的录入项";
  diag.URL = "/App/Module/CustomizeField/Index.aspx?CustomizeName=" + customizeName + "&FormName=" + formName + "&CusType=" + cusType;
  diag.show();
}

function ShowField(tableid, formName) {
  //2017-07-07 qianlong 暂时只开放联系人，后续可以将其他的自定义功能模块都添加上去
  if (tableid == 3)
    SaveFormData(tableid, 1, 0);

  var diag = new Dialog();
  diag.ID = "CustomizeField";
  diag.Width = 1000;
  diag.Height = 800;
  diag.URL = "/App/Module/ShowField/ShowFieldIndex.aspx?tableid=" + tableid + "&FormName=" + formName;
  diag.show();
}

function ShowFieldClassID(tableid, classID, formName, isHideRepeat, tip, oid) {
  if (typeof (isHideRepeat) == "undefined") {
    isHideRepeat = 0;
  }
  if (typeof (tip) == "undefined") {
    tip = "";
  }
  if (typeof (oid) == "undefined") {
    oid = "";
  }

  var diag = new Dialog();
  diag.ID = "CustomizeField";
  diag.Width = 1000;
  diag.Height = 800;
  diag.URL = "/App/Module/ShowField/ShowFieldIndex.aspx?tableid=" + tableid + "&ClassID=" + classID + "&FormName=" + formName + "&ishiderepeat=" + isHideRepeat + "&tip=" + escape(tip) + "&oid=" + oid;
  diag.show();
}

function ShowFieldGuid(tableid, configGuid, formName, isHideRepeat, tip, oid) {
  if (typeof (isHideRepeat) == "undefined") {
    isHideRepeat = 0;
  }
  if (typeof (tip) == "undefined") {
    tip = "";
  }
  if (typeof (oid) == "undefined") {
    oid = "";
  }

  var diag = new Dialog();
  diag.ID = "CustomizeField";
  diag.Width = 1000;
  diag.Height = 800;
  diag.URL = "/App/Module/ShowField/ShowFieldIndex.aspx?tableid=" + tableid + "&configguid=" + configGuid + "&FormName=" + formName + "&ishiderepeat=" + isHideRepeat + "&tip=" + escape(tip) + "&oid=" + oid;
  diag.show();
}

//客户自定义录入项，单独处理
function ShowField_Cus(cusType, formName, cType, srcForm, MobilePhone, productidlist) {
  var diag = new Dialog();
  diag.ID = "CustomizeField";
  diag.Width = 1100;
  diag.Height = 800;
  if (cusType == 1)
    diag.URL = "/App/Module/ShowField/ShowFieldIndex_Customers.aspx?CusType=" + cusType + "&FormName=" + formName + "&cType=" + cType + "&srcForm=" + srcForm + "&MobilePhone=" + MobilePhone + "&productidlist=" + productidlist + "&mode=" + mode + "&cusid=" + cusid;
  else
    diag.URL = "/App/Module/ShowField/ShowFieldIndex_Customers.aspx?CusType=" + cusType + "&FormName=" + formName + "&cType=" + cType + "&srcForm=" + srcForm + "&productidlist=" + productidlist + "&mode=" + mode + "&cusid=" + cusid;
  diag.show();
}

//2017-07-07 qianlong
function ShowField_CusNew(tableid, cusType, formName, cType, srcForm, MobilePhone, productidlist) {
  SaveFormData(tableid, cusType, cusid);

  var diag = new Dialog();
  diag.ID = "CustomizeField";
  diag.Width = 1100;
  diag.Height = 800;
  if (cusType == 1)
    diag.URL = "/App/Module/ShowField/ShowFieldIndex_Customers.aspx?CusType=" + cusType + "&FormName=" + formName + "&cType=" + cType + "&srcForm=" + srcForm + "&MobilePhone=" + MobilePhone + "&productidlist=" + productidlist + "&mode=" + mode + "&cusid=" + cusid;
  else
    diag.URL = "/App/Module/ShowField/ShowFieldIndex_Customers.aspx?CusType=" + cusType + "&FormName=" + formName + "&cType=" + cType + "&srcForm=" + srcForm + "&productidlist=" + productidlist + "&mode=" + mode + "&cusid=" + cusid;
  diag.show();
}



//设置每页显示记录数
function SetPageSize(action, dialogId, callbackFunction) {
  if (typeof (dialogId) == "undefined") {
    dialogId = "";
  }
  if (typeof (callbackFunction) == "undefined") {
    callbackFunction = "";
  }
  var diag = new Dialog();
  diag.ID = "SetPageSize";
  diag.Title = "每页显示数量";
  diag.Width = 350;
  diag.Height = 120;
  diag.Message = "每页显示<span style='color:red'>10</span>条：性能最佳。<br />每页显示<span style='color:red'>20</span>条：最常规设置。";
  diag.URL = "/App/Module/SetPageSize/index.aspx?Action=" + action + "&dialogId=" + dialogId + "&callbackFunction=" + callbackFunction;
  diag.show();
}

/*************************网盘部分开始*************************/
//获取指定name的checkbox被选中的value值,为空表示未选中任何项
function GetCheckBoxValueList(checkboxName) {
  var arrItem = document.getElementsByName(checkboxName);
  var strValue = "";
  for (var i = 0; i < arrItem.length; i++) {
    if (arrItem[i].checked) strValue += arrItem[i].value + ",";
  }

  strValue = strValue.substring(0, strValue.length - 1); //去掉最后的逗号
  return strValue;
}
//选择文件
//mode：Select为选择文件 DiskUpload 为网盘上传
//folderID：保存位置的初始文件夹ID
//spanID：父窗体的保存选中文件的SpanID[选择文件时才用到]
//dialogID：窗体ID【选择文件时才用到】
//viewType：1我的文档，2公共文档
function SelectFiles(viewType, mode, folderID, spanID, dialogID) {
  var diag = new Dialog();
  //diag.Modal = false;
  //diag.Top = 10;
  //diag.Left = 10;
  diag.ID = "SelectFiles";
  diag.Width = 650;
  diag.Height = 450;
  //diag.ShowCloseButton = false;
  diag.URL = "/App/Module/FileSelect/Upload.aspx?ViewType=" + viewType + "&Mode=" + mode + "&FolderID=" + folderID + "&SpanID=" + spanID + "&DialogID=" + dialogID;
  diag.show();
}
//图片上传控件
function ImageUpload(viewType, mode, folderID, spanID, dialogID, dataType, tablename, fieldname, datetick) {
  var diag = new Dialog();
  diag.ID = "SelectFiles";
  diag.Width = 650;
  diag.Height = 450;
  diag.Title = "选择图片";
  diag.URL = "/App/Module/FileSelect/ImageUpload.aspx?ViewType=" + viewType + "&Mode=" + mode + "&FolderID=" + folderID + "&SpanID=" + spanID + "&DialogID=" + dialogID + "&dataType=" + dataType + "&tablename=" + tablename + "&fieldname=" + fieldname + "&datetick=" + datetick;
  diag.show();
}

//新建文件夹
function AddFolder(viewType, folderID, dialogID, controlName) {

  if (dialogID == undefined) dialogID = "";
  if (controlName == undefined) controlName = "";

  var diag = new Dialog();
  diag.Width = 350;
  diag.Height = 108;
  diag.Title = "新建文件夹";
  diag.URL = "/app/netdisk/FolderEdit.aspx?ViewType=" + viewType + "&Mode=Add&FolderID=" + folderID + "&DialogID=" + dialogID + "&ControlName=" + controlName;
  diag.show();
}
//改名
function UpdateFName(fid) {
  var diag = new Dialog();
  diag.Width = 350;
  diag.Height = 101;
  diag.Title = "改名";
  diag.URL = "/app/netdisk/UpdateFName.aspx?FID=" + fid;
  diag.show();
}
//备注
function UpdateRemarks(fid, type, typeid) {
  var diag = new Dialog();
  diag.Width = 450;
  diag.Height = 213;
  diag.Title = "备注";
  diag.URL = "/app/netdisk/Remarks.aspx?FID=" + fid + "&Type=" + type + "&TypeID=" + typeid;
  diag.show();
}

//移动
function Move(viewType, folderID) {
  var idList = GetCheckBoxValueList("rptID");
  if (idList == "") {
    Dialog.alert("您还未选择任何文件或文件夹！");
    return;
  }

  var diag = new Dialog();
  diag.Width = 450;
  diag.Height = 72;
  diag.Title = "移动位置";
  diag.URL = "/app/netdisk/Move.aspx?ViewType=" + viewType + "&FolderID=" + folderID + "&IDList=" + idList;
  diag.show();
}
//预览
function View(fid, FileType, fName, type, typeid) {
  var diag = new Dialog();
  diag.Title = fName + " -- 在线预览";
  diag.ID = "View";
  diag.Width = screen.width;
  diag.Height = screen.height;
  diag.URL = "/app/netdisk/view.aspx?FID=" + fid + "&FileType=" + FileType + "&Type=" + type + "&TypeID=" + typeid;
  diag.show();
}
/*************************网盘部分结束*************************/



/******************选择文件部分**********************/

function SetFileList(fidlist) {
  document.getElementById("rptFilesLoading").style.display = "";
  setTimeout("StartSetFileList('" + fidlist + "','',0)", 1);
}

//客户专用//保留只为兼容之前的
function SetFileList_Cus(fidlist, cusid) {
  SetFileList_Type(fidlist, 'cus', cusid);
}


function SetFileList_Type(fidlist, type, typeid) {
  document.getElementById("rptFilesLoading").style.display = "";
  setTimeout("StartSetFileList('" + fidlist + "','" + type + "'," + typeid + ")", 1);
}


function StartSetFileList(fidlist, type, typeid) {
  var idlist = "|" + fidlist.replace(/,/g, "|") + "|";//逗号替换为|
  //alert(idlist);
  //如果有原始的旧的filesID，则叠加上，编辑时需要
  var oldID = document.getElementById("rptOldIDList");
  if (oldID.value != "") {
    idlist = idlist + "|" + oldID.value;
  }

  idlist = idlist.replace("||", "|");//每次都把两个逗号替换成1个(否则多执行删除再添加几次逗号就会无限叠加)
  idlist = idlist.replace("|||", "|");
  idlist = idlist.replace("|||", "|");
  oldID.value = idlist;//重新赋值

  //alert(idlist);

  var v = Kehu51.Team.UI.Web.App.Ajax.GetData.GetFilesHtml(idlist, type, typeid, true).value;
  if (v != null) document.getElementById("rptFilesList").innerHTML = v;

  SetFilesCount();
  document.getElementById("rptFilesLoading").style.display = "none";


  //if (document.getElementById("rptIsSetSize")) StartSetSize();//重设dialog的高度

  //if (document.getElementById("rptIsSetSize")) {
  //if (dialog == undefined) StartSetSize();
  //else StartAutoSize(dialog);
  //}
  StartSetSize();
}

function SetFileList_Detail(idList) {
  var v = Kehu51.Team.UI.Web.App.Ajax.GetData.GetFilesHtml(idList, '', 0, false).value;
  if (v != null) document.getElementById("rptFilesList").innerHTML = v;

  SetFilesCount();
}

//在列表界面显示附件，indexID为当前记录ID，比如跟进列表界面，这里就是这条跟进记录的ID
function SetFileList_Detail_ListPage(fieldIDList, indexid) {
  var v = Kehu51.Team.UI.Web.App.Ajax.GetData.GetFilesHtml(fieldIDList, '', 0, false).value;
  if (v != null) document.getElementById("rptFilesList_" + indexid).innerHTML = v;
}
function SetFileList_Detail_ListPage_Cus(fieldIDList, indexid, cusid) {
  var v = Kehu51.Team.UI.Web.App.Ajax.GetData.GetFilesHtml(fieldIDList, 'cus', cusid, false).value;
  if (v != null) document.getElementById("rptFilesList_" + indexid).innerHTML = v;
}

function NetdiskFilesDownload(fid, type, typeid) {

  try {
    setTimeout("parent.CloseLoading()", 100);
  } catch (err) { }

  window.location.href = "/app/netdisk/download.aspx?FID=" + fid + "&Type=" + type + "&TypeID=" + typeid + "";




}


function SetFileList_Detail_Cus(idList, cusid) {
  SetFileList_Detail_Type(idList, 'cus', cusid);
}

function SetFileList_Detail_Type(idList, type, typeid) {
  var v = Kehu51.Team.UI.Web.App.Ajax.GetData.GetFilesHtml(idList, type, typeid, false).value;
  if (v != null) document.getElementById("rptFilesList").innerHTML = v;

  SetFilesCount();
}

//删除已选择的文件
function deleteSelectFile(fid) {
  //document.getElementById("rptSelectFiles_List_" + fid).style.display = "none";
  //document.getElementById("rptSelectFiles_ID_" + fid).value = "";
  var li = document.getElementById("li_" + fid);
  li.parentNode.removeChild(li);

  //从id列表中删除掉当前ID
  var oldID = document.getElementById("rptOldIDList");
  oldID.value = oldID.value.replace("|" + fid + "|", "|");


  SetFilesCount();
}
//删除全部
function DeleteAllFiles() {
  var ul = document.getElementById('rptFilesUL');
  if (ul) {
    var arrLi = ul.getElementsByTagName('li');
    var len = arrLi.length;
    for (var i = 0; i < len; i++) {
      arrLi[0].parentNode.removeChild(arrLi[0]);
      //document.getElementById('rptFilesUL').removeChild(arrLi[0]);
    }
    document.getElementById("rptOldIDList").value = "";//清空ID列表
    SetFilesCount();
  }
}

function SetFilesCount() {
  var ul = document.getElementById('rptFilesUL');
  var count = document.getElementById("rptFilesCount");
  if (ul) {
    count.innerText = ul.getElementsByTagName('li').length;
  }
}
/******************选择文件部分结束**********************/

/******************图片上传**********************/
function SetImageList(imageList) {
  if (imageList != "") {
    document.getElementById("rptImageLoading").style.display = "";
    setTimeout("StartSetImageList('" + imageList + "')", 1);
  }
}

function StartSetImageList(imageList) {

  var savePath = "";

  var selectType = document.getElementById("imageSelectType").value;
  var fieldName = document.getElementById("hidFieldName").value;
  var tableName = document.getElementById("hidTableName").value;
  if (selectType == "imageupload_single") {
    //单选
    //图片内容
    var arrImage = imageList.split('|');
    var html = '<ul id="rptImageUL">';
    var ischeck = '';
    if (arrImage.length == 1) {
      ischeck = 'checked=checked';
    }//如果是单张图片上传，那么只取第一张图片显示，还是全部都显示，如果只取1张，只遍历一次，如果全部都显示，那么全部遍历？
    for (var i = 0; i < arrImage.length; i++) {
      var filePath = arrImage[i];
      var fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
      savePath = filePath.substring(filePath.indexOf('ImageUpload'));
      if (savePath.indexOf("?") > -1)
        savePath = savePath.substring(0, savePath.indexOf("?"));
      if (fileName.indexOf("?") > -1)
        fileName = fileName.substring(0, fileName.indexOf("?"));

      html += '<li id="imageLi_' + i + '"  style="text-align:left;float:left;position:relative;margin-left:10px;height:60px;">';
      if (fieldName.toLowerCase() == "logo") {
        html += '<div id="setFirstPage_' + i + '" style="width:65px;height:26px; line-height:26px;position:absolute;top:0px; left:0px;padding:0px;margin: 0;opacity: 0.8;color:#fff;background: none repeat scroll 0 0 #000000; font-size:10px;cursor:pointer;">';
        html += '<div style="text-align:center;"><span style="display:inline-block;float: left; padding-left: 2px;">设为封面</span>';
        html += "<span style=\"display:inline-block; padding-top: 5px;\"><input type='checkbox' onchange='CheckImage(this)' id='checkbox_" + (index + i) + "' value='" + arrImage[i] + "' " + ischeck + " style='width:14px;height:14px;' /></span></div>";
        html += '</div>';
      }
      //删除按钮
      html += '<div id="deletebtn_' + i + '" style="width:13px;height:13px;position:absolute;bottom:5px; right:5px;padding:0px;margin: 0;cursor:pointer;">';
      html += "<span><img src=\"/app/Module/UploadFile/control/images/delete_white.png?20161101\" width=\"16px\" height=\"16px\" align=\"absmiddle\" style=\"cursor:hand\" border=\"0\" title='删除' alt=\"删除\" onclick='deleteImage(this,\"" + savePath + "\")' /></span>";
      html += '</div>';

      html += "<a href=\"###\" class=\"kankan\" title='点击预览'><img  width='65px' height='60px' style='border:0px;' src='" + arrImage[i] + "' title='" + fileName + "'  /></a>";
      //图片名称和删除按钮
      /*html += '<div style="width:80px;height:20px;padding:0px;margin: 0;margin-top:2px;color:#fff;background: none repeat scroll 0 0 #000000; font-size:10px;cursor:pointer;"><p style="margin:0px;white-space: nowrap;width: 60px; height:20px;line-height:20px;overflow: hidden; -o-text-overflow: ellipsis;text-overflow:ellipsis;float: left;">' + fileName + '</p>';
      html += "<span style='width: 13px; height: 13px; display: inline-block; margin-top: 3px; margin-left: 3px; float: left;-moz-user-select: none;'><img src=\"/app/Module/UploadFile/control/images/delete_white.png\" align=\"absmiddle\" style=\"cursor:hand\" border=\"0\" title='删除' alt=\"删除\" onclick='deleteImage(this,\"" + savePath + "\")'  /></span>";
      html += '</div>';*/

      html += "<input type='hidden' id='hidImageList" + i + "' value='" + arrImage[i] + "' />";
      html += '</li>';
    }
    html += "</ul>";
    savePath = imageList.substring(imageList.indexOf('ImageUpload'));
    document.getElementById("rpt" + fieldName).value = savePath;
    document.getElementById("rptImageList").innerHTML = html;
  } else {
    //多选
    //目前只显示50张图片
    var count = 50;//指定最大显示多少张图片
    var isAdd = true;//是否是新增
    var haveCheckImage = IsCheckImage();//判断是否有选中的图片
    if (imageList.indexOf("title") > -1) isAdd = false;
    //图片内容
    var arrImage = imageList.split('|');
    if (!document.getElementById("rptImageUL")) {
      var ul = document.createElement("ul");
      ul.id = "rptImageUL";
      document.getElementById("rptImageList").appendChild(ul);
    }
    if (!document.getElementById("hidImageList")) {
      var hidden = document.createElement("hidden");
      hidden.id = "hidImageList";
      //hidden.value = imageList;
      document.getElementById("rptImageList").appendChild(hidden);
    }
    var html = "";

    var ulObj = document.getElementById("rptImageUL");

    var index = ulObj.getElementsByTagName("li").length;//获取已经选择的图片数量

    var ischeck = '';
    if (arrImage.length == 1 && index == 0) {
      ischeck = 'checked=checked';
      savePath = imageList.substring(imageList.indexOf('ImageUpload'));
      document.getElementById("rpt" + fieldName).value = savePath;
    }
    //记录遍历的次数
    var temp = 0;
    //temp = (index + arrImage.length) > count ? ((index + arrImage.length) - count >= count ? (count - index) : (index + arrImage.length) - count) : arrImage.length;
    if ((index + arrImage.length) > count && index > 0) {
      if ((index + arrImage.length) - count >= count) {
        temp = count - index;
      } else {
        if (index >= count) {
          temp = 0;
        } else {
          temp = (index + arrImage.length) - count;
        }
      }
    } else {
      temp = arrImage.length;
    }

    for (var i = 0; i < temp; i++) {
      //var liCount = ulObj.getElementsByTagName("li").length + 1;
      //alert(liCount);
      //if (liCount > count) return;
      var filePath = arrImage[i];
      var fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
      savePath = filePath.substring(filePath.indexOf('ImageUpload'));
      if (savePath.indexOf("?") > -1)
        savePath = savePath.substring(0, savePath.indexOf("?"));
      if (fileName.indexOf("?") > -1)
        fileName = fileName.substring(0, fileName.indexOf("?"));
      var ind = fileName.indexOf("title");//是否有设置封面
      var isout = ind > -1 ? "" : 'onmouseout ="hiddenSet(this)"';//如果有设置封面，移除onmouseout
      //var isshow = ind > -1 ? "display:block" : (i == 0 ? "display:block" : "display:none");//如果有设置封面，显示内容
      var isshow = "";
      if (ind > -1) {
        isshow = "display:block";
      }
      else {
        if (i == 0 && isAdd && !haveCheckImage) isshow = "display:block";
        else isshow = "display:none";
      }
      //var ischeck2 = ischeck != "" ? ischeck : (ind > -1 ? "checked=checked" : (i == 0 ? "checked=checked" : ""));
      var ischeck2 = "";
      if (ischeck != "") {
        ischeck2 = ischeck;
      }
      else {
        if (ind > -1) ischeck2 = "checked=checked";
        else {
          if (i == 0 && isAdd && !haveCheckImage) ischeck2 = "checked=checked";
          else ischeck2 = "";
        }
      }
      html += '<li id="imageLi_' + (index + i) + '" style="text-align:left;float:left; margin-left:10px;position:relative;height:60px;" onmouseover="showSet(this)" ' + isout + ' >';
      //var isCheck = i == 0 ? "checked=\"checked\"" : "";//是否选中
      if (fieldName.toLowerCase() == "logo") {
        html += '<div id="setFirstPage_' + (index + i) + '" style="width:65px;height:26px; line-height:26px;position:absolute;top:0px; left:0px;padding:0px;margin: 0;opacity: 0.7;color:#fff;background: none repeat scroll 0 0 #000000; font-size:10px; ' + isshow + ';cursor:pointer;">';
        html += '<div style="text-align:center;"><span style="display:inline-block;float: left; padding-left: 2px;">设为封面</span>';
        html += "<span style=\"display:inline-block; padding-top: 5px;\"><input type='checkbox' onchange='CheckImage(this)' id='checkbox_" + (index + i) + "' value='" + arrImage[i] + "' " + ischeck2 + " style='width:14px;height:14px;' /></span></div>";
        html += '</div>';
      }
      else {
        html += '<div id="setFirstPage_' + (index + i) + '" style="width:65px;height:26px; line-height:26px;position:absolute;top:0px; left:0px;padding:0px;margin: 0;opacity: 0.7;color:#fff;background: none repeat scroll 0 0 #000000; font-size:10px; display:none;cursor:pointer;">';
        html += '<div style="text-align:center;"><span style="display:inline-block;float: left; padding-left: 2px;">设为封面</span>';
        html += "<span style=\"display:inline-block; padding-top: 5px;\"><input type='checkbox' onchange='CheckImage(this)' id='checkbox_" + (index + i) + "' value='" + arrImage[i] + "' " + ischeck2 + " style='width:14px;height:14px;' /></span></div>";
        html += '</div>';
      }
      //删除按钮
      html += '<div id="deletebtn_' + (index + i) + '" style="width:13px;height:13px;position:absolute;bottom:5px; right:5px;padding:0px;margin: 0;cursor:pointer;">';
      html += "<span><img src=\"/app/Module/UploadFile/control/images/delete_white.png?20161101\"  width=\"16px\" height=\"16px\" align=\"absmiddle\" style=\"cursor:hand\" border=\"0\" title='删除' alt=\"删除\" onclick='deleteImage(this,\"" + savePath + "\")' /></span>";
      html += '</div>';
      html += "<img width='65px' height='60px' style='border:0px;' src='" + arrImage[i] + "' title='" + fileName + "'  />";
      //图片名称和删除按钮
      /*html += '<div style="width:80px;height:20px;padding:0px;margin: 0;margin-top:2px;color:#fff;background: none repeat scroll 0 0 #000000; font-size:10px;cursor:pointer;"><p style="margin:0px;white-space: nowrap;width: 60px; height:20px;line-height:20px;overflow: hidden; -o-text-overflow: ellipsis;text-overflow:ellipsis;float: left;">&nbsp;&nbsp;' + (ind > -1 ? fileName : "") + '</p>';
      html += "<span style='width: 13px; height: 13px; display: inline-block; margin-top: 3px; margin-left: 3px; float: left;-moz-user-select: none;'><img src=\"/app/Module/UploadFile/control/images/delete_white.png\" align=\"absmiddle\" style=\"cursor:hand\" border=\"0\" title='删除' alt=\"删除\" onclick='deleteImage(this,\"" + savePath + "\")' /></span>";
      html += '</div>';*/

      html += "<input type='hidden' id='hidImageList_" + (index + i) + "' value='" + arrImage[i] + "' />";
      html += '</li>';
    }
    ulObj.innerHTML += html;
    //
    if (ischeck != "" && fieldName.toLowerCase() == "logo") {
      ulObj.getElementsByTagName("li")[0].childNodes[0].style.display = "block";
      ulObj.getElementsByTagName("li")[0].removeAttribute("onmouseout");
    }

    setHiddenValue();
  }



  document.getElementById("rptImageLoading").style.display = "none";

  StartSetSize();
}

function setHiddenValue() {
  var fieldName = document.getElementById("hidFieldName").value;
  var ckObj = document.getElementById("rptImageUL").getElementsByTagName("input");
  for (var i = 0; i < ckObj.length; i++) {
    if (ckObj[i].type == "checkbox") {
      if (ckObj[i].checked) {
        var savePath = ckObj[i].value.substring(ckObj[i].value.indexOf('ImageUpload'));
        if (savePath.indexOf("?") > -1)
          savePath = savePath.substring(0, savePath.indexOf("?"));
        document.getElementById("rpt" + fieldName).value = savePath;
        return;
      }
    }
  }
}
function showSet(obj) {
  var fieldName = document.getElementById("hidFieldName").value;
  if (fieldName.toLowerCase() == "logo")
    obj.childNodes[0].style.display = 'block';
}
function hiddenSet(obj) {
  var fieldName = document.getElementById("hidFieldName").value;
  if (fieldName.toLowerCase() == "logo")
    obj.childNodes[0].style.display = 'none';
}
function CheckImage(obj) {
  var fieldName = document.getElementById("hidFieldName").value;
  var ckObj = document.getElementById("rptImageUL").getElementsByTagName("input");
  for (var i = 0; i < ckObj.length; i++) {
    if (ckObj[i].type == "checkbox") {
      if (ckObj[i].id != obj.id) {
        ckObj[i].checked = false;
        var parentObj = ckObj[i].parentNode.parentNode.parentNode.parentNode;
        ckObj[i].parentNode.parentNode.parentNode.style.display = "none";
        parentObj.setAttribute("onmouseout", 'hiddenSet(this)');
      }
    }
  }
  obj.checked = true;

  var savePath = obj.value.substring(obj.value.indexOf('ImageUpload'));
  if (savePath.indexOf("?") > -1)
    savePath = savePath.substring(0, savePath.indexOf("?"));
  document.getElementById("rpt" + fieldName).value = savePath;
  //始终显示勾选后的设置
  obj.parentNode.parentNode.parentNode.parentNode.removeAttribute("onmouseout");
}
//判断是否有已经选中的图片
function IsCheckImage() {
  if (document.getElementById("rptImageUL")) {
    var ckObj = document.getElementById("rptImageUL").getElementsByTagName("input");
    for (var i = 0; i < ckObj.length; i++) {
      if (ckObj[i].type == "checkbox") {
        if (ckObj[i].checked) return true;
      }
    }
  }
  return false;
}

function deleteImage(obj, path) {
  var tableName = document.getElementById("hidTableName").value;
  var fieldName = document.getElementById("hidFieldName").value;
  var parentLi = obj.parentNode.parentNode.parentNode;//li
  //判断是否删除的是封面图片
  var isCheck = 0;
  var objInput = parentLi.getElementsByTagName("input");
  for (var i = 0; i < objInput.length; i++) {
    var objCk = objInput[i];
    if (objCk.type == "checkbox") {
      if (objCk.checked) { isCheck = 1; break; }
    }
  }
  var parentUl = parentLi.parentNode;//ul
  parentUl.removeChild(parentLi);//ul移除li
  if (parentUl.getElementsByTagName("li").length == 0) {
    //清空数据
    document.getElementById("rpt" + fieldName).value = "";
  }
  if (isCheck == 1 && fieldName.toLowerCase() == "logo") document.getElementById("rpt" + fieldName).value = "";
  //alert(path);
  /*var msg = Kehu51.Team.UI.Web.App.Ajax.GetData.DeleteImageFile(path, fieldName, tableName, isCheck).value;
  if (msg != "") {
      Dialog.alert(msg);
  }*/

  document.getElementById("hidDeleteFiles").value += path + ",";
}

//预览
function ScrollImageView(value, cusid) {
  var diag = new Dialog();
  diag.Title = "图片预览";
  diag.ID = "ScrollImageView";
  diag.Width = 980;
  diag.Height = 720;
  //diag.URL = "/app/netdisk/scrollimageview.aspx?value=" + value + "&objID=" + cusid;
  diag.URL = "/app/netdisk/ImageSlider.aspx?value=" + value + "&objID=" + cusid;
  diag.show();
}

function SliderImageView(value, tableId, objId, imagelist) {
  var diag = new Dialog();
  diag.Title = "图片预览";
  diag.ID = "ScrollImageView";
  diag.Width = 980;
  diag.Height = 720;
  diag.URL = "/app/netdisk/ImageSlider.aspx?value=" + value + "&tableId=" + tableId + "&objId=" + objId + "&imagelist=" + imagelist;
  diag.show();
}
/******************图片上传结束**********************/

/**************选择销售机会**************/
//选择销售机会
function SelectOdds(cusID, IDControl, NameControl, formName) {
  var diag = new Dialog();
  //diag.Modal = false;
  //diag.Top = 10;
  //diag.Left = 10;
  diag.ID = "OddsSelect";
  diag.Width = 400;
  diag.Height = 380;
  diag.URL = "/App/Module/OddsSelect/Index.aspx?CusID=" + cusID + "&IDControl=" + IDControl + "&NameControl=" + NameControl + "&formName=" + formName;
  diag.show();
}
//清除销售机会
function ClearOdds(TO_ID, TO_NAME) {
  if (TO_ID == "" || TO_ID == "undefined" || TO_ID == null) {
    TO_ID = "TO_ID";
    TO_NAME = "TO_NAME";
  }
  document.getElementsByName(TO_ID)[0].value = "";
  document.getElementsByName(TO_NAME)[0].value = "";
}
/**************选择销售结束**************/



/**************选择成交订单**************/
function SelectDeal(cusID, IDControl, NameControl, formName) {
  var diag = new Dialog();
  //diag.Modal = false;
  //diag.Top = 10;
  //diag.Left = 10;
  diag.ID = "DealSelect";
  diag.Width = 1000;
  diag.Height = 600;
  //diag.URL = "/App/Module/DealSelect/DealSelectList.aspx?CusID=" + cusID + "&IDControl=" + IDControl + "&NameControl=" + NameControl + "&formName=" + formName;
  //2017-09-13 qianlong
  diag.URL = "/App/Module/DealSelect/DealSelectListNew.aspx?CusID=" + cusID + "&IDControl=" + IDControl + "&NameControl=" + NameControl + "&formName=" + formName;
  diag.show();
}
function ClearDeal(TO_ID, TO_NAME) {
  if (TO_ID == "" || TO_ID == "undefined" || TO_ID == null) {
    TO_ID = "TO_ID";
    TO_NAME = "TO_NAME";
  }
  document.getElementsByName(TO_ID)[0].value = "";
  document.getElementsByName(TO_NAME)[0].value = "";
}

function OpenDealDetail() {
  var dealid = document.getElementById("rptDealID").value;
  if (dealid == "" || dealid == "0") {
    Dialog.alert("还没有选择成交订单！");
    return;
  }
  DealDetail(dealid);
}
/**************选择成交订单end**************/




/**************选择客户投诉记录**************/
//选择投诉记录
function SelectComplaints(cusID, IDControl, NameControl, formName) {
  var diag = new Dialog();
  //diag.Modal = false;
  //diag.Top = 10;
  //diag.Left = 10;
  diag.ID = "ComplaintsSelect";
  diag.Width = 700;
  diag.Height = 500;
  diag.URL = "/App/Module/ComplaintsSelect/Index.aspx?CusID=" + cusID + "&IDControl=" + IDControl + "&NameControl=" + NameControl + "&formName=" + formName;
  diag.show();
}
//清除投诉记录
function ClearComplaints(TO_ID, TO_NAME) {
  if (TO_ID == "" || TO_ID == "undefined" || TO_ID == null) {
    TO_ID = "TO_ID";
    TO_NAME = "TO_NAME";
  }
  document.getElementsByName(TO_ID)[0].value = "";
  document.getElementsByName(TO_NAME)[0].value = "";
}
/**************选择客户投诉记录结束**************/







/**************选择联系任务**************/
//选择联系任务
function SelectFollowTask(cusID, IDControl, NameControl, formName) {
  var diag = new Dialog();
  //diag.Modal = false;
  //diag.Top = 10;
  //diag.Left = 10;
  diag.ID = "FollowTaskSelect";
  diag.Width = 400;
  diag.Height = 380;
  diag.URL = "/App/Module/FollowTaskSelect/Index.aspx?CusID=" + cusID + "&IDControl=" + IDControl + "&NameControl=" + NameControl + "&formName=" + formName;
  diag.show();
}
//清除联系任务
function ClearFollowTask(TO_ID, TO_NAME) {
  if (TO_ID == "" || TO_ID == "undefined" || TO_ID == null) {
    TO_ID = "TO_ID";
    TO_NAME = "TO_NAME";
  }
  document.getElementsByName(TO_ID)[0].value = "";
  document.getElementsByName(TO_NAME)[0].value = "";
}
/**************选择联系任务**************/







/*****************自定义选择列部分*******************/

//showdataviewlist 标记是否在指定的分类中生效，如果为1自定义显示列界面下方就会显示数据视图的列表
function SelectColumn(tableID, viewName, showID, showdataviewlist) {
  var diag = new Dialog();
  //diag.Modal = false;
  //diag.Top = 10;
  //diag.Left = 10;
  diag.ID = "SelectColumn";
  diag.Width = 550;
  diag.Height = 600;
  diag.URL = "/App/Module/ColumnSelect/ColumnIndex.aspx?TableID=" + tableID + "&ViewName=" + viewName + "&ShowID=" + showID + "&showdataviewlist=" + showdataviewlist;
  diag.show();
}

//审批列表界面自定义显示列，使用ClassID分开的，以后的日志也使用这种方式
function SelectColumnClassID(tableID, viewName, classID) {
  var diag = new Dialog();
  diag.ID = "SelectColumn";
  diag.Width = 550;
  diag.Height = 600;
  diag.URL = "/App/Module/ColumnSelect/ColumnClassIDIndex.aspx?TableID=" + tableID + "&ViewName=" + viewName + "&ClassID=" + classID;
  diag.show();
}


function SelectColumnDialogID(tableID, viewName, showID, showdataviewlist, dialogID, callbackFunction) {
  if (typeof (callbackFunction) == "undefined") {
    callbackFunction = "";
  }
  var diag = new Dialog();
  //diag.Modal = false;
  //diag.Top = 10;
  //diag.Left = 10;
  diag.ID = "SelectColumn";
  diag.Width = 500;
  diag.Height = 555;
  diag.URL = "/App/Module/ColumnSelect/ColumnIndex.aspx?TableID=" + tableID + "&ViewName=" + viewName + "&ShowID=" + showID + "&showdataviewlist=" + showdataviewlist + "&DialogID=" + dialogID + "&CallbackFunction=" + callbackFunction;
  diag.show();
}

function SelectColumnCusUserID(tableID, viewName, showID, showdataviewlist, cusUserID) {
  var diag = new Dialog();
  //diag.Modal = false;
  //diag.Top = 10;
  //diag.Left = 10;
  diag.ID = "SelectColumn";
  diag.Width = 500;
  diag.Height = 555;
  diag.URL = "/App/Module/ColumnSelect/ColumnIndex.aspx?TableID=" + tableID + "&ViewName=" + viewName + "&ShowID=" + showID + "&showdataviewlist=" + showdataviewlist + "&CusUserID=" + cusUserID;
  diag.show();
}
/*****************自定义选择列部分结束*******************/



/*****************设置默认排序部分*******************/
function DefaultSort(action) {
  var diag = new Dialog();
  //diag.Modal = false;
  //diag.Top = 10;
  //diag.Left = 10;
  diag.ID = "DefaultSort";
  diag.Width = 300;
  diag.Height = 94;
  diag.URL = "/App/Module/DefaultSort/SortEdit.aspx?action=" + action;
  diag.show();
}
/*****************默认排序部分结束*******************/


/*****新的自定义显示视图 2013-10-24*****/
function ShowView(tableID, viewName) {
  var diag = new Dialog();
  diag.ID = "ShowView";
  diag.Width = 500;
  diag.Height = 300;
  diag.URL = "/App/Module/ShowView/ShowViewIndex.aspx?tableid=" + tableID + "&viewname=" + viewName;
  diag.show();
}

/*****新的自定义视图 end 2013-10-24*****/





/********数据视图自定义********/
function CustomizeDataView(tableID, viewName) {
  var diag = new Dialog();
  diag.ID = "CustomizeDataView";
  diag.Width = 700;
  diag.Height = 550;
  diag.URL = "/App/Module/CustomizeDataView/DataViewList.aspx?TableID=" + tableID + "&ViewName=" + viewName;
  diag.CancelEvent = function () {
    top.LoadMsg();
    //关闭二级窗口页面
    diag.close();
  };
  diag.show();
}

/********数据视图自定义结束********/

/*******群发短信部分********/
function SendSMS_Phone(phone, msg) {
  var message = msg == "" ? "尊敬的客户：" : msg;
  var diag = new Dialog();
  diag.ID = "SMSSend";
  diag.Width = 790;
  diag.Height = 535;
  diag.Title = "手机短信群发";
  diag.URL = "/app/module/SendSMS/index.aspx?phone=" + phone + "&msg=" + message;
  diag.show();
}
//type 1表示为企业联系人,2表示为个人客户 0表示都有，此时发送短信程序上就得拼出ID，当cusid为0时则 idlist 就表示一个数组
function SendSMS_Cus(msg, cusid, idlist, type) {
  var message = msg == "" ? "尊敬的客户：" : msg;
  var diag = new Dialog();
  diag.ID = "SMSSend";
  diag.Width = 790;
  diag.Height = 566;
  diag.Title = "手机短信群发";
  diag.URL = "/app/module/SendSMS/SendCus.aspx?CusID=" + cusid + "&IDList=" + idlist + "&msg=" + message + "&CusType=" + type;
  diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}

function SendSMS_Team(msg, idlist) {
  var diag = new Dialog();
  diag.ID = "SMSSend";
  diag.Width = 790;
  diag.Height = 535;
  diag.Title = "手机短信群发";
  diag.URL = "/app/module/SendSMS/TeamSend.aspx?IDList=" + idlist + "&msg=" + msg;
  diag.show();
}
//返回短信条数
function GetSMSLen(conentLen) {
  var zongTiaoSu = conentLen / 64;
  if (zongTiaoSu != parseInt(zongTiaoSu)) zongTiaoSu += 1; //如果不为整数
  zongTiaoSu = Math.floor(zongTiaoSu);
  return zongTiaoSu;
}
//打开短信库  dialogID为窗体名称 functionName 为返回时执行页面的函数名
function OpenSMSBase() {
  OpenSMSBase2('SMSSend', 'ImportSMSContent');
}
function OpenSMSBase2(formName, funName) {
  var diag = new Dialog();
  diag.ID = "SMSBase";
  diag.Width = 900;
  diag.Height = 600;
  diag.Title = "短信库";
  diag.URL = "/app/module/SMSBase/MySMSBase.aspx?formName=" + formName + "&funName=" + funName;
  diag.show();
}
//查看短信记录详情 type 1发送 2回复
function SMSNodeDetail(nodeid, type) {
  var diag = new Dialog();
  diag.ID = "SMSDetail";
  diag.Width = 700;
  diag.Height = 600;
  diag.URL = "/app/tools/sms/SMSDetail.aspx?NodeID=" + nodeid + "&type=" + type;
  //diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}

/*******群发短信部分end********/





/*******强制QQ对话*******/
function OpneQQDialog(qq) {
  //var url = "http://wpa.qq.com/msgrd?v=3&uin="+qq+"&site=qq&menu=yes";
  var url = "tencent://message/?uin=" + qq + "&Site=客户无忧网&Menu=yes";
  window.open(url);
  //document.write("<iframe id='rptQQDialogIframe' src='' height=0 width=0 style='display:none'></iframe>");
  //document.getElementById("rptQQDialogIframe").src = url;
  parent.CloseLoading();
}


/*****绑定手机号******/
function OpenbindMobilePhone(shuaxin) {
  var diag = new Dialog();
  diag.ID = "BindMobilePhone";
  diag.Width = 350;
  diag.Height = 158;
  diag.Title = "绑定您的手机号";
  diag.URL = "/app/UserCenter/Config/bindMobilePhone.aspx?shuaxin=" + shuaxin;
  diag.show();
}
var checkbox;
function CheckMobilePhone(obj) {
  checkbox = $(obj).children(":first");
  var selected = $(checkbox).attr("data-selected");
  if (selected == 1) {
    Kehu51.Team.UI.Web.App.Ajax.GetData.CheckUserMobilePhone(mobilecallback);
  }
}
function mobilecallback(res) {
  if (res.value == 1) {
    Dialog.showError("您还未绑定手机号或手机号不正确，您必须绑定之后才能使用短信提醒功能！", function () {
      $(checkbox).attr("class", "checkbox-item");
      $(checkbox).attr("data-selected", "0");
      OpenbindMobilePhone(0);
    });
  } else if (res.value == 2) {
    Dialog.confirm("您的短信账户余额不足，不能使用短信提醒功能，是否现在充值？", function () {
      window.open('/app/#usercenter-smstopup');
      $(checkbox).attr("class", "checkbox-item");
      $(checkbox).attr("data-selected", "0");
    }, function () {
      $(checkbox).attr("class", "checkbox-item");
      $(checkbox).attr("data-selected", "0");
    });
  }
}

/*****修改手机号****/
function UpdateBindMobilePhone() {
  var diag = new Dialog();
  diag.ID = "UpdateBindMobilePhone";
  diag.Width = 450;
  diag.Height = 260;
  diag.URL = "/app/usercenter/config/UpdateBindMobilePhone.aspx";
  diag.show();
}



/****邮件群发部分*****/
function SendMail_Email(email, content) {
  /*var content2 = content == "" ? "尊敬的客户：" : content;
  var diag = new Dialog();
  diag.ID = "EmailSend";
  diag.Width = 800;
  diag.Height = 481;
  diag.URL = "/app/module/SendMail/SendMail.aspx?email=" + email + "&content=" + content2;
  diag.OnLoad = function () {
      var h = GetCwinHeight(diag.innerFrame);
      if (h < 525) h = 525;
      diag.setSize(null, h);
  };
  diag.show();*/

  SendEmail(email);
}
//type 1表示为企业联系人,2表示为个人客户 0表示都有，此时发送短信程序上就得拼出ID
function SendMail_Cus(msg, cusid, idlist, type) {
  var message = msg == "" ? "尊敬的客户：" : msg;
  var diag = new Dialog();
  diag.ID = "EmailSend";
  diag.Width = 800;
  diag.Height = 525;
  diag.URL = "/app/module/SendMail/SendCus.aspx?CusID=" + cusid + "&IDList=" + idlist + "&msg=" + message + "&CusType=" + type;
  diag.show();
}
function OpenEmailConfig(parentwindowid) {
  var diag = new Dialog();
  diag.ID = "EmailConfigList";
  diag.Width = 500;
  diag.Height = 300;
  diag.Title = "我的发件邮箱";
  diag.URL = "/app/module/SendMail/EmailConfigList.aspx?parentWindowID=" + parentwindowid;
  diag.show();
}

function SetFormAddressList() {
  document.getElementById("rptFormLoading").style.display = "";
  Kehu51.Team.UI.Web.App.Ajax.GetData.GetEmailConfigList(SetFormAddressListCallback); // 类的名称

}
function SetFormAddressListCallback(res) {
  var slt = document.getElementById("rptFormAddressList");
  var v = res.value;
  if (v != null) {
    slt.options.length = 0; //清空之前的
    for (var i = 0; i < v.Rows.length; i++) {
      var txt = v.Rows[i].Email; //这个地方需要注意区分大小写
      var vol = v.Rows[i].EID;
      slt.options.add(new Option(txt, vol));
    }
  }
  document.getElementById("rptFormLoading").style.display = "none";
}


/**********计划任务部分***********/
function TaskAdd(cusid, tasktype) {
  var diag = new Dialog();
  diag.ID = "TaskEdit";
  diag.Width = 800;
  diag.Height = 530;
  switch (tasktype) {
    case 2:
      diag.URL = "/app/Customers/Task/TaskEdit_Birthday.aspx?Mode=Add&CusID=" + cusid;
      break;
    case 3:
      diag.URL = "/app/Customers/Task/TaskEdit_Festival.aspx?Mode=Add&CusID=" + cusid;
      break;
    default:
      diag.URL = "/app/Customers/Task/TaskEdit.aspx?Mode=Add&CusID=" + cusid;
      break;

  }
  diag.show();
}



/*****打开签名编辑窗口*****/
function OpenSignature() {
  var diag = new Dialog();
  diag.ID = "OpenSignature";
  diag.Width = 220;
  diag.Height = 88;
  diag.Title = "编辑默认签名";
  diag.URL = "/app/module/SendSMS/Signature.aspx";
  diag.show();
}

/***********/


/*选择用户,tagid：当一个页面有多个选择用户时，用来标识区分*/


//这个是在弹出的选择用户界面，点确定时调用的
var selectusersufixx = "";

function SelectUsers(dialogid, selecttype, tagid, ishideadmin) {
  selectusersufixx = "";
  if (ishideadmin == undefined) ishideadmin = 0; //是否隐藏管理员，默认为0，不隐藏，1为隐藏
  if (tagid == undefined) tagid = 0;
  if (tagid != 0) selectusersufixx = "_TagID" + tagid;
  var idlist = document.getElementById("rptUserIDAll" + selectusersufixx).value;//已经选择用户的ID，带上去

  var diag = new Dialog();
  diag.ID = "SelectUsers";
  diag.Width = 1000;
  diag.Height = 610;
  diag.URL = "/app/module/SelectUsers/index.aspx?DialogID=" + dialogid + "&SelectType=" + selecttype + "&tagid=" + tagid + "&idlist=" + idlist + "&ishideadmin=" + ishideadmin;
  diag.show();
}
//2017-03-23 qianlong 选择职位
function SelectRole(dialogid, tagid, ishideadmin) {
  if (ishideadmin == undefined) ishideadmin = "0";
  if (tagid == undefined) tagid = 0;
  if (tagid != 0) selectusersufixx = "_TagID" + tagid;
  var roleidlist = document.getElementById("rptRoleIDAll").value;//已经选择的ID，带上去
  var diag = new Dialog();
  diag.ID = "SelectRole";
  diag.Title = "选择职位";
  diag.Width = 600;
  diag.Height = 500;
  diag.URL = "/app/module/SelectRole/Index.aspx?DialogID=" + dialogid + "&tagid=" + tagid + "&roleidlist=" + roleidlist + "&ishideadmin=" + ishideadmin;
  diag.show();
}

//2017-03-22 qianlong 通过部门或者职位进行筛选
function SelectSimpleUser(dialogid, tagid) {
  var groupidlist = $("#rptGroupIDAll").length > 0 ? $("#rptGroupIDAll").val() : "";
  var roleidlist = $("#rptRoleIDAll").length > 0 ? $("#rptRoleIDAll").val() : "";
  if (groupidlist == "" && roleidlist == "") { Dialog.showError("请选择部门或者职位"); return; }
  if (tagid == undefined) tagid = 0;
  if (tagid != 0) selectusersufixx = "_TagID" + tagid;
  else selectusersufixx = "";
  var idlist = document.getElementById("rptUserIDAll" + selectusersufixx).value;//已经选择用户的ID，带上去
  var diag = new Dialog();
  diag.ID = "SelectSimpleUsers";
  diag.Width = 850;
  diag.Height = 610;
  diag.URL = "/app/module/SelectUsers/IndexDept.aspx?DialogID=" + dialogid + "&tagid=" + tagid + "&roleidlist=" + roleidlist + "&groupidlist=" + groupidlist + "&idlist=" + idlist;
  diag.show();
}

//2017-02-28 qianlong 用户单选
function SingleSelectUsers(dialogid, tagid) {

  if (tagid == undefined) tagid = 0;
  if (tagid != 0) selectusersufixx = "_TagID" + tagid;
  else selectusersufixx = "";
  var idlist = document.getElementById("rptUserIDAll" + selectusersufixx).value;//已经选择用户的ID，带上去
  var diag = new Dialog();
  diag.ID = "SingleSelectUsers";
  diag.Width = 850;
  diag.Height = 610;
  diag.URL = "/app/module/SelectUsers/SingleIndex.aspx?DialogID=" + dialogid + "&tagid=" + tagid;
  diag.show();
}

//2018-07-06 lx 带用户id条件去选择对应的某个用户
function SingleSelectUsersForCondition(dialogid, tagid, userIdList) {
  var diag = new Dialog();
  diag.ID = "WorkListRepulse";
  diag.Width = 300;
  diag.Height = 400;
  diag.URL = "/App/Module/SelectUsers/SelectUserForCondition.aspx?useridlist=" + userIdList + "&DialogID=" + dialogid + "&tagid=" + tagid;
  diag.show();
}

//2017-03-23 qianlong 添加设置选择职位的功能
function SetSelectRole(idlist, dialogid, tagid, ishideadmin) {
  if (ishideadmin == undefined) ishideadmin = 0;
  if (tagid == undefined) tagid = 0;
  if (tagid != 0) selectusersufixx = "_TagID" + tagid;
  else selectusersufixx = "";

  document.getElementById("rptRoleListDIV" + selectusersufixx).innerHTML = "<ul><li><img src=\"/Resource/images/loading_16.gif\" align=\"middle\" /> 正在载入...</li></ul>";//loading

  var html = [];
  html.push("<ul id=\"rptRoleListUL" + selectusersufixx + "\" style=\"line-height:40px;\">");
  var roleidlist = "";
  var arrList = idlist.split('$');
  for (var i = 0; i < arrList.length - 1; i++) {
    var roleInfo = arrList[i];
    if (roleInfo == "") continue;
    var arrRole = roleInfo.split("|");
    var roleID = arrRole[0];
    var roleName = arrRole[1];
    roleidlist += roleID + "|";
    html.push("<li id=\"li_" + roleID + selectusersufixx + "\" class=\"selectuser_item\">");
    //html.push("<a href=\"javascript:ShowUserInfo(" + roleID + ")\"><li id=\"li_" + roleID + selectusersufixx + "\" class=\"selectuser_item\">");
    html.push("<input type=\"hidden\" name=\"rptSelectGroupID\" id=\"rptSelectRole_ID_" + roleID + "\" value=\"" + roleID + "\" />");
    html.push("<img src=\"/Resource/images/users/groupicon_20.png\" />" + roleName);
    html.push("&nbsp;<a href=\"javascript:DeleteSelectRole(" + roleID + "," + tagid + ")\" title=\"删除\"><i class=\"menufont\" style=\"margin-right:0px\">&#xe645;</i></a>")
    html.push("</li></a>");
  }
  html.push("<li class=\"selectuser_item_add\"><a href=\"javascript:SelectRole('" + dialogid + "'," + tagid + "," + ishideadmin + ")\" class=\"orgAdd\" style=\"margin-left:5px\">添加</a></li>");
  html.push("<ul>");
  roleidlist = "|" + roleidlist;
  $("#rptRoleIDAll" + selectusersufixx).val(roleidlist);
  $("#rptRoleListDIV" + selectusersufixx).html(html.join(''));
}

function DeleteSelectRole(id, tagid) {

  var suffix = tagid == 0 ? "" : "_TagID" + tagid;
  var li = document.getElementById("li_" + id + suffix);
  li.parentNode.removeChild(li);

  var newIDlist = document.getElementById("rptRoleIDAll" + suffix).value;
  newIDlist = newIDlist.replace("|" + id + "|", "|");
  newIDlist = newIDlist.replace("||", "|");
  document.getElementById("rptRoleIDAll" + suffix).value = newIDlist;
}

function SetSimpleSelectUsers(userid, groupidlist, roleidlist, dialogid, tagid) {
  if (tagid == undefined) tagid = 0;
  if (tagid != 0) selectusersufixx = "_TagID" + tagid;
  document.getElementById("rptUserListDIV" + selectusersufixx).innerHTML = "<ul><li><img src=\"/Resource/images/loading_16.gif\" align=\"middle\" /> 正在载入...</li></ul>";//loading
  //addSelectUserID(userid);
  //Kehu51.Team.UI.Web.App.Ajax.SimpleSelectUser.GetSimpleSelectUsers(userid, groupidlist, roleidlist, dialogid, tagid, selectuserscallback);
  SetUserInfo(userid, '', dialogid, tagid, "SelectSimpleUser");
}

function SetSingleSelectUsers(userid, dialogid, tagid) {
  SetSingleSelectUsersMethod(userid, dialogid, tagid);
}

function SetSingleSelectUsersMethod(userid, dialogid, tagid) {
  selectusersufixx = "";
  if (tagid == undefined) tagid = 0;
  if (tagid != 0) selectusersufixx = "_TagID" + tagid;

  if (dialogid == "SMSAlter") {
    var _userid = userid.split('|')[0];
    smsAlter.SetDeductionUser(_userid);
    return;//因为方法里会自己生成人员HTML
  }

  document.getElementById("rptUserListDIV" + selectusersufixx).innerHTML = "<ul><li><img src=\"/theme/default/images/loading_16.gif\" align=\"middle\" /> 正在载入...</li></ul>";//loading
  //Kehu51.Team.UI.Web.App.Ajax.SingleSelectUsers.GetSingleSelectUsers(userid, dialogid, tagid, selectuserscallback);
  //2018-01-26 qianlong 如果是在客户编辑界面选择所有者，那么判断是否为公客
  if (dialogid == "CustomersEdit" || dialogid == "CusImport") {
    var _userid = userid.split('|')[0];
    if (_userid == -10) {
      //如果是公客
      setExecuteMan(1);
    } else {
      setExecuteMan(0);
    }
  }
  SetUserInfo(userid, '', dialogid, tagid, "SingleSelectUsers");

}

function SetSingleSelectUsersForCondition(userid, dialogid, tagid, condition) {
  selectusersufixx = "";
  if (tagid == undefined) tagid = 0;
  if (tagid != 0) selectusersufixx = "_TagID" + tagid;
  document.getElementById("rptUserListDIV" + selectusersufixx).innerHTML = "<ul><li><img src=\"/theme/default/images/loading_16.gif\" align=\"middle\" /> 正在载入...</li></ul>";//loading
  //2018-01-26 qianlong 如果是在客户编辑界面选择所有者，那么判断是否为公客
  if (dialogid == "CustomersEdit" || dialogid == "CusImport") {
    var _userid = userid.split('|')[0];
    if (_userid == -10) {
      //如果是公客
      setExecuteMan(1);
    } else {
      setExecuteMan(0);
    }
  }
  SetUserInfo(userid, '', dialogid, tagid, "SingleSelectUsersForCondition", 0, condition);

}


function SetUsersList(idlist, selecttype, dialogid, tagid) {

  if (tagid == undefined) tagid = 0;

  if (tagid != 0) {
    selectusersufixx = "_TagID" + tagid;
  }
  else {
    selectusersufixx = "";
  }



  document.getElementById("rptUserListDIV" + selectusersufixx).innerHTML = "<ul><li><img src=\"/theme/default/images/loading_16.gif\" align=\"middle\" /> 正在载入...</li></ul>";//loading

  var allIDList = "";
  if (idlist == "all") allIDList = "all";
  else {
    allIDList = addSelectUserID(idlist);
  }
  Kehu51.Team.UI.Web.App.Ajax.GetData.GetSelectUserList(allIDList, selecttype, dialogid, tagid, selectuserscallback);
}
//2017-04-26 qianlong 选择全部成员
function SelectAllUserList(serverID, dialogid, tagid, ishideadmin) {
  if (ishideadmin == undefined) ishideadmin = 0;
  if (tagid == undefined) tagid = 0;
  if (tagid != 0) selectusersufixx = "_TagID" + tagid;
  else selectusersufixx = "";

  if (serverID != "local") serverID = "s" + serverID;
  var protocol = window.location.protocol;
  var server = protocol + "//" + serverID + ".kehu51.com";

  document.getElementById("rptUserListDIV" + selectusersufixx).innerHTML = "<ul><li><img src=\"/Resource/images/loading_16.gif\" align=\"middle\" /> 正在载入...</li></ul>";//loading
  //Kehu51.Team.UI.Web.App.Module.SelectRole.SelectRoleAjax.GetSelectRoleList(roleidlist, dialogid, tagid, selectRoleCallback);
  var uri = server + "/app/ajax/SimpleSelectUser.aspx?dialogid=" + dialogid + "&tagid=" + tagid + "&ishideadmin=" + ishideadmin;
  $.ajax({
    url: uri,
    type: "GET",
    dataType: "text",
    //crossDomain: true,//设置跨域
    xhrFields: {
      withCredentials: true//设置cookie
    },
    success: function (res) {
      $("#rptUserListDIV" + selectusersufixx).html(res);
      $("#rptUserIDAll" + selectusersufixx).val($("#rptSelectAllUserIDList").val());
    }
  });
  StartSetSize();
}
//2017-04-26 qianlong 选择用户
function SelectUserList(idlist, selecttype, dialogid, tagid, ishideadmin) {
  if (ishideadmin == undefined) ishideadmin = 0;
  selectusersufixx = "";
  if (tagid != 0) selectusersufixx = "_TagID" + tagid;
  SetUserInfo(idlist, selecttype, dialogid, tagid, "OpenSelectUsersTagID", ishideadmin);
}

function SetUserInfo(idlist, selecttype, dialogid, tagid, clickName, ishideadmin, condition) {
  if (ishideadmin == undefined) ishideadmin = 0;
  if (condition == undefined) condition = '';
  var html = [];
  html.push("<ul id=\"rptUserListUL" + selectusersufixx + "\" style=\"line-height:40px;\">");
  var useridlist = "";
  var arrList = idlist.split('$');
  for (var i = 0; i < arrList.length; i++) {
    var userinfo = arrList[i];
    if (userinfo == "") continue;
    var arrUser = userinfo.split("|");
    var userID = arrUser[0];
    var realName = arrUser[1];
    var userImg = arrUser[2];
    if (clickName != "SingleSelectUsers") {
      useridlist += userID + "|";
    }
    else {
      useridlist += userID;
    }
    //2017-06-27 lijingbo 如果所选为公客，则显示为公客（目前只有导入客户的时候所有者可以选择公客）
    if (userID == -10) {
      html.push("<span id=\"rptSelectPublicUser\" class=\"selectuser_item\" style=\"background-color:red;color:#ffffff;\" title=\"此客户为公共客户\">公客&nbsp;");
      html.push("<input type=\"hidden\" name=\"rptSelectUsersID\" id=\"rptSelectUsers_ID_" + userID + "\" value=\"" + userID + "\" />");
      //if (clickName != "SingleSelectUsers") {
      html.push("<a href=\"javascript:DeleteSelectPublicUsers(" + userID + "," + tagid + ")\" title=\"删除\"><i class=\"menufont\" style=\"margin-right:0px\">&#xe645;</i></a>");
      //}
      html.push("</span>");
    }
    else {
      html.push("<li id=\"li_" + userID + selectusersufixx + "\" class=\"selectuser_item\" ><a href=\"javascript:ShowUserInfo(" + userID + ")\">");
      html.push("<input type=\"hidden\" name=\"rptSelectUsersID\" id=\"rptSelectUsers_ID_" + userID + "\" value=\"" + userID + "\" />");
      html.push("<img src=\"" + userImg + "\" alt='用户头像' width='20px' height='20px;' />" + realName + "</a>&nbsp;");
      //if (clickName != "SingleSelectUsers") {
      html.push("&nbsp;<a href=\"javascript:DeleteSelectUsers(" + userID + "," + tagid + ")\" title=\"删除\"><i class=\"menufont\" style=\"margin-right:0px\">&#xe645;</i></a>")
      //}
      html.push("</li>");
    }
  }
  if (clickName == "OpenSelectUsersTagID")
    html.push("<li class=\"selectuser_item_add\"><a href=\"javascript:" + clickName + "('" + dialogid + "','" + selecttype + "'," + tagid + "," + ishideadmin + ")\" class=\"orgAdd\" style=\"margin-left:5px\">添加</a></li>");
  else if (clickName == "SingleSelectUsersForCondition")
    html.push("<li class=\"selectuser_item_add\"><a href=\"javascript:" + clickName + "('" + dialogid + "'," + tagid + ",'" + condition + "')\" class=\"orgAdd\" style=\"margin-left:5px\">选择</a></li>");
  else
    html.push("<li class=\"selectuser_item_add\"><a href=\"javascript:" + clickName + "('" + dialogid + "'," + tagid + ")\" class=\"orgAdd\" style=\"margin-left:5px\">选择</a></li>");
  html.push("<ul>");
  if (clickName != "SingleSelectUsers") {
    useridlist = "|" + useridlist;
  }

  $("#rptUserIDAll" + selectusersufixx).val(useridlist);
  $("#rptUserListDIV" + selectusersufixx).html(html.join(''));

  if ($("#rptUsersCount").length > 0) {
    $("#rptUsersCount").text(arrList.length - 1);
  }
  if (dialogid != "CustomizeDataViewEdit")
    StartSetSize();
}

function getSingleSelectUserHtml(userinfo, dialogid, tagid) {
  var html = [];
  var arrUser = userinfo.split("|");
  var userID = arrUser[0];
  var realName = arrUser[1];
  var userImg = arrUser[2];
  html.push("<a href=\"javascript:ShowUserInfo(" + userID + ")\"><li id=\"li_" + userID + "\" class=\"selectuser_item\">");
  html.push("<input type=\"hidden\" name=\"rptSelectUsersID\" id=\"rptSelectUsers_ID_" + userID + "\" value=\"" + userID + "\" />");
  html.push("<img src=\"" + userImg + "\" alt='用户头像' width='20px' height='20px;' />" + realName);
  html.push("&nbsp;<a href=\"javascript:DeleteSelectUsers(" + userID + "," + tagid + ")\" title=\"删除\"><i class=\"menufont\" style=\"margin-right:0px\">&#xe645;</i></a>")
  html.push("</li></a>");
  html.push("<li class=\"selectuser_item_add\"><a href=\"javascript:SingleSelectUsers('" + dialogid + "'," + tagid + ")\" class=\"orgAdd\" style=\"margin-left:5px\">添加</a></li>");
  return html;
}

//2017-02-08 qianlong 添加部门全部人员
function SetDeptUserAll(serverID, groupID, selecttype, dialogid, tagid, ishideadmin) {
  if (ishideadmin == undefined) ishideadmin = 0;
  if (tagid == undefined) tagid = 0;
  if (serverID != "local") serverID = "s" + serverID;
  var protocol = window.location.protocol;
  var server = protocol + "//" + serverID + ".kehu51.com";

  if (tagid != 0) selectusersufixx = "_TagID" + tagid;
  document.getElementById("rptUserListDIV" + selectusersufixx).innerHTML = "<ul><li><img src=\"/theme/default/images/loading_16.gif\" align=\"middle\" /> 正在载入...</li></ul>";//loading

  //Kehu51.Team.UI.Web.App.Ajax.SetDeptUserAll.GetDeptUserAll(groupID, selecttype, dialogid, tagid, selectuserscallback);
  var uri = server + "/app/ajax/SetDeptUserAll.aspx?groupid=" + groupID + "&selecttype=" + selecttype + "&dialogid=" + dialogid + "&tagid=" + tagid + "&ishideadmin=" + ishideadmin;
  $.ajax({
    url: uri,
    type: "GET",
    dataType: "text",
    xhrFields: {
      withCredentials: true//设置cookie
    },
    success: function (res) {
      $("#rptUserListDIV" + selectusersufixx).html(res);
      $("#rptUserIDAll" + selectusersufixx).val($("#rptSelectAllUserIDList").val());
    }
  });
  StartSetSize();

}

//将新选择的叠加到原有的上面
function addSelectUserID(idlist) {
  /*var allIDList = document.getElementById("rptUserIDAll" + selectusersufixx).value
  allIDList = allIDList + idlist;
  allIDList = allIDList.replace("||", "|");
  document.getElementById("rptUserIDAll" + selectusersufixx).value = allIDList;

  return allIDList;*/

  document.getElementById("rptUserIDAll" + selectusersufixx).value = idlist;
  return idlist;
}

function selectuserscallback(res) {
  var div = document.getElementById("rptUserListDIV" + selectusersufixx);
  div.innerHTML = res.value;

  //一个页面只有一个选择用户的，就统计总数，多个的不统计总数【目前多个选择就只有设置审批流程界面用到】
  if (selectusersufixx == "") {
    SetUserCount();
  }

  if (!document.getElementById("NoStartSetSize")) {
    StartSetSize();
  }

  //当选择所有用户时
  if (document.getElementById("rptSelectAllUserIDList")) {
    document.getElementById("rptUserIDAll" + selectusersufixx).value = document.getElementById("rptSelectAllUserIDList").value;
  }
}

function DeleteSelectUsers(id, tagid) {
  DeleteSelectUsersMethod(id, tagid);
}

function DeleteSelectUsersMethod(id, tagid) {
  var suffix = tagid == 0 ? "" : "_TagID" + tagid;


  var li = document.getElementById("li_" + id + suffix);
  li.parentNode.removeChild(li);

  var newIDlist = document.getElementById("rptUserIDAll" + suffix).value;
  newIDlist = newIDlist.replace(/\|/g, ",")
  newIDlist = ("," + newIDlist + ",").replace(/\,,/g, ",").replace("," + id + ",", ",");
  newIDlist = newIDlist.replace(",,", ",").replace(/\,/g, "|");
  if (newIDlist == "|") {
    newIDlist = "";
  }
  document.getElementById("rptUserIDAll" + suffix).value = newIDlist;


  //同一页面，多个用户选择时，不统计总数
  if (tagid == 0) {
    SetUserCount();
  }


  StartSetSize();
}

//单选用户选择公客后点击删除公客
function DeleteSelectPublicUsers() {
  var span = document.getElementById("rptSelectPublicUser");
  span.parentNode.removeChild(span);


  StartSetSize();
}

function SetUserCount() {
  var div = document.getElementById("rptUserListDIV");
  var userCount = div.getElementsByTagName("li").length - 1;
  document.getElementById("rptUsersCount").innerHTML = userCount;

  //var coumNum = document.getElementById("rptColumnNum").innerHTML;


  if (document.getElementById("rptIsSetSize")) {
    if (document.getElementById("rptIsSetSize").innerHTML == "true") SetSize();
  }
}
/***选择用户end***/







/*******选择部门start********/
var groupSufixx = "";
function SelectGroup(dialogName, tagID) {

  if (tagID != 0) groupSufixx = "_TagID" + tagID;

  //已经选择了ID列表
  var yixuanidlist = document.getElementById("rptGroupIDAll" + groupSufixx).value;

  var diag = new Dialog();
  diag.ID = "SelectGroup";
  diag.Width = 600;
  diag.Height = 500;
  diag.URL = "/app/module/SelectGroup/SelectGroupIndex.aspx?DialogName=" + dialogName + "&IDList=" + yixuanidlist + "&TagID=" + tagID;
  diag.show();
}


function SetGroupList(idlist, dialogName, tagID) {

  document.getElementById("rptGroupListDIV" + groupSufixx).innerHTML = "<ul><li><img src=\"/Resource/images/loading_16.gif\" align=\"middle\" /> 正在载入...</li></ul>";//loading


  var allIDList = "";

  //Kehu51.Team.UI.Web.App.Module.SelectGroup.SelectGroupAjax.GetSelectGroupList(allIDList, dialogName, tagID, selectGroupCallback);
  //2017-04-26 qianlong 重新调整
  //idlist 部门ID|部门名称$
  var html = [];
  html.push("<ul id=\"rptGroupListUL" + groupSufixx + "\" style=\"line-height:40px;\">");
  var arrList = idlist.split('$');
  for (var i = 0; i < arrList.length; i++) {
    var arrGroup = arrList[i].split("|");
    if (arrGroup == "") continue;
    var groupID = arrGroup[0];
    var groupName = arrGroup[1];
    allIDList += groupID + "|";
    html.push("<li id=\"li_" + groupID + groupSufixx + "\" class=\"selectuser_item\">");
    html.push("<input type=\"hidden\" name=\"rptSelectGroupID\" id=\"rptSelectGroup_ID_" + groupID + "\" value=\"" + groupID + "\" />");
    html.push("<img src=\"/Resource/images/users/groupicon_20.png\" />" + groupName);
    html.push("&nbsp;<a href=\"javascript:DeleteSelectGroup(" + groupID + "," + tagID + ")\" title=\"删除\"><i class=\"menufont\" style=\"margin-right:0px\">&#xe645;</i></a>");
    html.push("</li>");
  }
  if (allIDList != "") {
    allIDList = "|" + allIDList;
    addSelectGroupID(allIDList);
  }
  html.push("<li class=\"selectuser_item_add\"><a href=\"javascript:SelectGroup('" + dialogName + "'," + tagID + ")\" class=\"orgAdd\" style=\"margin-left:5px\">添加</a></li>");
  html.push("</ul>");
  $("#rptGroupListDIV" + groupSufixx).html(html.join(""));
}

function addSelectGroupID(idlist) {
  //var allIDList = document.getElementById("rptGroupIDAll" + groupSufixx).value
  //allIDList = allIDList + idlist;
  //allIDList = allIDList.replace("||", "|");
  document.getElementById("rptGroupIDAll" + groupSufixx).value = idlist;

  return idlist;
}

function selectGroupCallback(res) {
  var div = document.getElementById("rptGroupListDIV" + groupSufixx);
  div.innerHTML = res.value;
}


function DeleteSelectGroup(id, tagid) {

  var suffix = tagid == 0 ? "" : "_TagID" + tagid;


  var li = document.getElementById("li_" + id + suffix);
  li.parentNode.removeChild(li);

  var newIDlist = document.getElementById("rptGroupIDAll" + suffix).value;
  newIDlist = newIDlist.replace("|" + id + "|", "|");
  newIDlist = newIDlist.replace("||", "|");
  document.getElementById("rptGroupIDAll" + suffix).value = newIDlist;
}

/*******选择部门end********/






/*新增客户时共享设置*/
function SelectUserClick(id, dialogID, isAutoSize, selecttype) {
  switch (id) {
    case 0://不共享
      HideSelectUser();
      if (isAutoSize == "true") StartSetSize();
      break;
    case 1://所有人
      HideSelectUser();
      if (isAutoSize == "true") StartSetSize();
      break;
    case 2://我和我选定的人员
      ShowSelectUser();
      OpenSelectUsersTagID(dialogID, selecttype, 0);
      if (isAutoSize == "true") StartSetSize();
      break;
  }
}
function ShowSelectUser() {
  document.getElementById("rptUserListWaiDiv").style.display = "";
  //document.getElementById("rptUserListSPAN").style.display = "";
  //document.getElementById("rptShowUserCount").style.display = "";
}
function HideSelectUser() {
  document.getElementById("rptUserListWaiDiv").style.display = "none";
  //document.getElementById("rptUserListSPAN").style.display = "none";
  //document.getElementById("rptShowUserCount").style.display = "none";
}
function OpenSelectUsers(dialogID, selecttype) {
  SelectUsers(dialogID, selecttype, 0);
}

function OpenSelectUsersTagID(dialogID, selecttype, tagid, ishideadmin) {
  if (ishideadmin == undefined) ishideadmin = 0;
  SelectUsers(dialogID, selecttype, tagid, ishideadmin);
}


/*选择用户end*/


/****客户转交***/
function ChangeUsers(idlist, from, viewName, dialogId, callbackFunction) {
  if (viewName == undefined) {
    viewName = "";
  }
  if (typeof (dialogId) == "undefined") {
    dialogId = "";
  }
  if (typeof (callbackFunction) == "undefined") {
    callbackFunction = "";
  }

  var dialog = new Dialog();
  dialog.ID = "ChangeUsers";
  dialog.Width = 400;
  dialog.Height = 278;
  dialog.URL = "/app/customers/CusChangeUser.aspx?idlist=" + idlist + "&from=" + from + "&viewname=" + viewName + "&dialogId=" + dialogId + "&callbackFunction=" + callbackFunction;
  dialog.OnLoad = function () { var h = GetCwinHeight(dialog.innerFrame); dialog.setSize(null, h); };
  dialog.show();
}








/****共享相关****/
function OpenShareDetail(tableNameID, action, idlist, indexID, dialogId, callbackFunction) {
  if (typeof (dialogId) == "undefined") {
    dialogId = "";
  }
  if (typeof (callbackFunction) == "undefined") {
    callbackFunction = "";
  }

  var diag = new Dialog();
  diag.ID = "CusShareDetail";
  diag.Width = 450;
  diag.Height = 166;
  diag.Title = "共享设置";
  //diag.MessageTitle = "共享设置";
  //diag.Message = "您可以在这里更改客户的共享设置";
  diag.URL = "/app/module/shareconfig/ShareDetail.aspx?TableNameID=" + tableNameID + "&Action=" + action + "&IDList=" + idlist + "&IndexID=" + indexID + "&dialogId=" + dialogId + "&callbackFunction=" + callbackFunction;
  diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}
//取消共享
function CancelShare(tableNameID) {
  var strID = GetCheckedID("rptID");
  if (strID == "") {
    Dialog.alert("好像啥都没有选择哦！");
    return;
  }
  parent.CloseLoading();
  if (confirm('确定要取消共享吗？')) {
    var diag = new Dialog();
    diag.ID = "CancelShare";
    diag.Width = 300;
    diag.Height = 110;
    diag.Title = "取消共享";
    diag.URL = "/app/module/shareconfig/CancelShare.aspx?TableNameID=" + tableNameID + "&IDList=" + strID;
    diag.show();
  }
}
function SingleCancelShare(tableNameID, cusID, dialogId, callbackFunction) {
  if (typeof (dialogId) == "undefined") {
    dialogId = "";
  }
  if (typeof (callbackFunction) == "undefined") {
    callbackFunction = "";
  }

  parent.CloseLoading();
  if (confirm('确定要取消共享吗？')) {
    var diag = new Dialog();
    diag.ID = "CancelShare";
    diag.Width = 300;
    diag.Height = 110;
    diag.Title = "取消共享";
    diag.URL = "/app/module/shareconfig/CancelShare.aspx?TableNameID=" + tableNameID + "&IDList=" + cusID + "&dialogId=" + dialogId + "&callbackFunction=" + callbackFunction;
    diag.show();
  }
}
//批量设置为共享
function SetShareAll(tableNameID) {
  var strID = GetCheckedID("rptID");
  if (strID == "") {
    Dialog.showError("好像啥都没有选择呢！");
    return;
  }
  OpenShareDetail(tableNameID, "all", strID, 0);
}


//赠送短信
function SMSGift() {
  var diag = new Dialog();
  diag.ID = "SMSGift";
  diag.Width = 500;
  diag.Height = 150;
  diag.MessageTitle = "赠送短信";
  diag.Message = "您可以利用此功能，将您的短信余额赠送给团队其它成员";
  diag.URL = "/app/usercenter/sms/SMSGift.aspx";
  diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}

//弹出选择产品的窗口,mode 1为单选,2为多选
function SelectProduct(dialogID, mode) {
  var diag = new Dialog();
  diag.ID = "SelectProductWindow";
  if (mode == 1) {
    diag.Width = 700;
    diag.Height = 500;
    diag.URL = "/app/module/ProductSelect/Single_Index.aspx?dialogid=" + dialogID;//单选
  } else {

    //将选择模式设为添加，否则编辑时重新选择时不会更新
    selectmode = "add";


    var idlist = GetProduceIdList();//已经选择的

    diag.Width = 1000;
    diag.Height = 520;
    diag.URL = "/app/module/ProductSelect/Multi_Index.aspx?idlist=" + idlist + "&dialogid=" + dialogID;//多选
  }
  diag.show();
}

function SelectProduct2(dialogID, mode, IDControl, NameControl) {
  var diag = new Dialog();
  diag.ID = "SelectProductWindow";
  if (mode == 1) {
    diag.Width = 700;
    diag.Height = 500;
    diag.URL = "/app/module/ProductSelect/Single_Index.aspx?dialogid=" + dialogID + "&idcontrol=" + IDControl + "&namecontrol=" + NameControl;//单选
  } else {
    diag.Width = 800;
    diag.Height = 505;
    diag.URL = "/app/module/ProductSelect/Multi_Index.aspx?dialogid=" + dialogID + "&idcontrol=" + IDControl + "&namecontrol=" + NameControl;//多选
  }
  diag.show();
}
//产品单选时返回选择结果
function SelectProduct_SingleSet(productid, productname, idControl, nameControl) {
  var objName = document.getElementById(nameControl);
  document.getElementById(idControl).value = productid;

  objName.value = productname;
  objName.style.color = "#000000";


  //执行函数
  if (document.getElementById("rptCommonmMultiSelect_EvalFunction")) {
    eval(document.getElementById("rptCommonmMultiSelect_EvalFunction").innerHTML + "(" + productid + ")");
  }

}


//公共的批量修改
function BatchUpdate(tableID, type) {

  if (type == "checked") {
    var id = GetCheckedID("rptID");
    if (id == "") {
      Dialog.showError("请先选择要修改的记录！");
      return;
    }
    BatchUpdate_Start(tableID, type, "id=" + id + "&viewName=" + viewName);
  } else if (type == "search") {
    if (mode != "search") {
      Dialog.showError("请先搜索出要修改的记录！");
      return;
    }
    var par = jxurlParameter;
    BatchUpdate_Start(tableID, type, par);
  } else {
    BatchUpdate_Start(tableID, type, "viewName=" + viewName);
  }
}
function BatchUpdate_Start(tableID, type, parameter) {
  var diag = new Dialog();
  diag.ID = "BatchUpdate";
  diag.Width = 700;
  diag.Height = 300;
  diag.URL = "/app/module/BatchUpdate/BatchUpdate.aspx?TableID=" + tableID + "&Type=" + type + "&" + parameter;
  diag.show();
}


//打开公共搜索
function OpenCommonSearch() {
  var urlpar = jxurlParameter;


  if (urlpar.toLowerCase().indexOf('tableid=') == -1) urlpar += "&tableid=" + tableID;
  if (urlpar.toLowerCase().indexOf('viewname=') == -1) urlpar += "&viewname=" + viewName;

  var dialog = new Dialog();
  dialog.ID = "CommonSearch";
  dialog.Width = 1000;
  dialog.Height = 800;
  dialog.URL = "/app/module/CommonSearch/SearchIndex.aspx?dialog=CommonSearch&" + urlpar;
  dialog.show();
}
//2018-04-28 qianlong 在slider中进行搜索
function OpenCommonSearch2Slider() {
  var urlpar = jxurlParameter;


  if (urlpar.toLowerCase().indexOf('tableid=') == -1) urlpar += "&tableid=" + tableID;
  if (urlpar.toLowerCase().indexOf('viewname=') == -1) urlpar += "&viewname=" + viewName;

  var dialog = new Dialog();
  dialog.ID = "CommonSearch";
  dialog.Width = 1000;
  dialog.Height = 800;
  dialog.URL = "/app/module/CommonSearch/SearchIndex.aspx?dialog=CommonSearchSlider&" + urlpar;
  dialog.show();
}



/*******公共多选start*******/
var commonMultiSelectTableID;
function SetCommonMultiSelect(multiTableID, idlist) {
  commonMultiSelectTableID = multiTableID;
  //如果是成交产品的多选
  if (document.getElementById("CommonMultiSelect_DealProduct")) {
    //document.getElementById("rptDealProductHTMLTR").style.display = "";
    SetDealProductList(commonMultiSelectTableID, idlist, dealID);//新建时
  } else if (document.getElementById("CommonMultiSelect_InStockProduct")) {//库存入库时产品多选
    //alert("入库选择产品");
    SetInStockProductList(multiTableID, idlist, 0);
  } else {
    var allIDList = addCommonMultiSelectID(idlist);

    document.getElementById("rptCommonMulti_Div_" + commonMultiSelectTableID).innerHTML = "<img src=\"/theme/default/images/loading_16.gif\" align=\"middle\" /> 正在载入...";
    Kehu51.Team.UI.Web.App.Ajax.GetData.GetCommonMultiSelect(commonMultiSelectTableID, allIDList, commonMultiSelect_callback);

    //执行函数
    if (document.getElementById("rptCommonmMultiSelect_EvalFunction")) {
      eval(document.getElementById("rptCommonmMultiSelect_EvalFunction").innerHTML + "(" + idlist + ")");
    }
  }
}
function commonMultiSelect_callback(res) {
  document.getElementById("rptCommonMulti_Div_" + commonMultiSelectTableID).innerHTML = res.value;

  commonMultiSelect_SetCount();

  //重置Dialog高度
  if (document.getElementById("IsSetPageSize")) {
    StartSetSize();
  }
}

//将新选择的叠加到原有的上面
function addCommonMultiSelectID(idlist) {

  var objIDALL = document.getElementById("rptCommonMultiSelectIDALL");

  //var allIDList = objIDALL.value
  //allIDList = allIDList + idlist;
  //allIDList = allIDList.replace("||", "|");
  objIDALL.value = idlist;

  return idlist;
}

function commonMultiSelect_DeleteAll() {
  var count = document.getElementById("rptCommonMultiSelectCount").innerHTML;
  if (count != "0") {
    document.getElementById("rptCommonMultiSelectIDALL").value = "";
    document.getElementById("rptCommonMulti_Div_" + commonMultiSelectTableID).innerHTML = "";
    document.getElementById("rptCommonMultiSelectCount").innerHTML = "0";
    document.getElementById("rptCommonMultiSelect_delallSpan").style.display = "none";
  }
}

function commonMultiSelect_Delete(id) {
  var span = document.getElementById("rptCommonMultiSpan_" + id);
  span.parentNode.removeChild(span);

  var objIDALL = document.getElementById("rptCommonMultiSelectIDALL");

  var newIDlist = objIDALL.value;
  newIDlist = newIDlist.replace("|" + id + "|", "|");
  newIDlist = newIDlist.replace("||", "|");
  objIDALL.value = newIDlist;

  commonMultiSelect_SetCount();
  //StartSetSize();
}
function commonMultiSelect_SetCount() {
  var div = document.getElementById("rptCommonMulti_Div_" + commonMultiSelectTableID);
  var userCount = div.getElementsByTagName("span").length;
  document.getElementById("rptCommonMultiSelectCount").innerHTML = userCount;

  //是否显示全部删除字样
  document.getElementById("rptCommonMultiSelect_delallSpan").style.display = userCount == 0 ? "none" : "";
}

function tagChangeColor(obj, focus) {
  if (focus) obj.className = "tagCss_focus";
  else obj.className = "tagCss";
}
/*******公共多选end*******/


/*******成交产品多选[与上面的公共多选有关联]*******/
//选择成交产品【修改和显示详情】
function SetDealProductList(productTableID, productIDList, dealID) {


  commonMultiSelectTableID = productTableID;//这里重置TableID，否则编辑时直接调用这个会传TableID进来，保证在载入完成时commonMultiSelectTableID是有值的，选择内容的表ID,这里是选择产品，就应该是产品表的ID
  var divList = document.getElementById("rptCommonMulti_Div_" + commonMultiSelectTableID);
  if (divList.children.length == 0)
    divList.innerHTML = "<img src=\"/theme/default/images/loading_16.gif\" align=\"middle\" /> 正在载入...";
  Kehu51.Team.UI.Web.App.Ajax.GetData.GetDealProductSelect(productIDList, selectmode, dealID, dealproduct_callback);
}
//产品的回调方法
function product_callback(res) {
  var divList = document.getElementById("rptCommonMulti_Div_" + commonMultiSelectTableID);
  initProductContent(divList, res.value);

  var table = divList.childNodes[0];//获取table
  var count = table.rows.length;//获取table的总行数
  document.getElementById("rptCommonMultiSelectCount").innerHTML = count == 0 ? 0 : count - 1;//设置选择产品数量

  StartSetSize();
}

function dealproduct_callback(res) {
  product_callback(res);
  if (selectmode != "detail") {
    firstUpdate();
  }

  //执行打印
  try {
    showPrint();
  } catch (err) { }

}
//2016-08-29 qianlong 初始化产品数据
function initProductContent(divList, content) {
  if (divList.childNodes.length == 1) {
    var table = divList.childNodes[0];//获取table
    if (table.rows.length > 2) {//过滤表头
      //1、先获取出已经存在的table数据内容
      //var tempTable = CreateTempleTable("tempTable", divList.innerHTML);
      //2、重新给div赋值后，获取出新的table内容
      var tableNew = CreateTempleTable("tableNew", content);//获取table
      //3、过滤掉重新选择后的table内容与原来内容的重复数据
      CreateNewTable(table, tableNew);
    }
    else {
      divList.innerHTML = content;
    }
  }
  else {
    divList.innerHTML = content;
  }
}
//创建新的table数据
function CreateNewTable(tableOld, tableNew) {
  //document.getElementById("rptCommonMulti_Div_" + commonMultiSelectTableID).innerHTML = "";//清空数据
  //再次点击产品，去掉某一些产品后，将去掉的产品从列表中删除
  for (var m = 1; m < tableOld.rows.length; m++) {
    var isdel = 1;
    var oldrowid = tableOld.rows[m].getAttribute("id");
    for (var n = 1; n < tableNew.rows.length; n++) {
      if (oldrowid == tableNew.rows[n].getAttribute("id")) {
        isdel = 0;
        break;
      }
    }
    if (isdel == 1) {
      tableOld = RemoveRepeatRow(oldrowid, tableOld);//从旧表中删除已被取消选择的产品
    }

  }
  //删除重复的数据行
  for (var i = 1; i < tableOld.rows.length; i++) {
    var rowid = tableOld.rows[i].getAttribute("id");
    tableNew = RemoveRepeatRow(rowid, tableNew);//删除重复的数据行
  }
  //将没有重复的tableNew数据写入到tableOld中
  for (var j = 1; j < tableNew.rows.length; j++) {
    var rowid = tableNew.rows[j].getAttribute("id");
    var newRow = tableOld.insertRow(tableOld.rows.length);
    newRow.id = rowid;
    newRow.className = "TableLine1";
    //循环遍历列
    for (var k = 0; k < tableNew.rows[1].cells.length; k++) {

      var newCell = newRow.insertCell(k);
      if (k > 0)
        newCell.style.textAlign = "center";
      if (k == 1) {
        var isDisplay = tableNew.rows[j].cells[1].style.display;//获取是否显示
        if (typeof (isDisplay) == "undefined") isDisplay = "";
        newCell.style.display = isDisplay;

      }
      newCell.innerHTML = tableNew.rows[j].cells[k].innerHTML;
    }
  }
  //将table添加到div中
  document.getElementById("rptCommonMulti_Div_" + commonMultiSelectTableID).appendChild(tableOld);
  //删除临时的div
  //removeTempleTable("tempTable");
  removeTempleTable("tableNew");
}
//删除重复的数据行
function RemoveRepeatRow(id, table) {
  for (var i = 1; i < table.rows.length; i++) {
    var rowid = table.rows[i].getAttribute("id");
    if (rowid == id) {
      table.deleteRow(i);
    }
  }
  return table;
}
//删除数据
function DeleteProduct(id) {
  var divList = document.getElementById("rptCommonMulti_Div_" + commonMultiSelectTableID);
  var table = divList.childNodes[0];//获取table
  for (var i = 1; i < table.rows.length; i++) {
    var row = table.rows[i];
    var rowid = row.getAttribute("id");
    if (rowid == id) {
      table.deleteRow(i);
    }
  }
  //设置选择产品数量
  document.getElementById("rptCommonMultiSelectCount").innerHTML = table.rows.length - 1;//设置选择产品数量
  firstUpdate();//更新成交总额，总成本数据
}
//获取产品ID
function GetProduceIdList() {
  var idlist = "";
  var divList = document.getElementById("rptCommonMulti_Div_" + productID);
  if (divList && divList.childNodes.length > 0) {
    var table = divList.childNodes[0];//获取table
    if (table.nodeName == "TABLE") {
      for (var i = 1; i < table.rows.length; i++) {
        var row = table.rows[i];
        var rowid = row.getAttribute("id");
        idlist += rowid + "||";
      }
    } else {
      idlist = document.getElementById("rptCommonMultiSelectIDALL").value;
    }

  }
  return idlist;
}

//获取产品ID(新)
function GetProduceIdList_New() {
  var idlist = "";
  var divList = document.getElementById("rptCommonMulti_Div_" + productID);
  if (divList && divList.childNodes.length > 0) {
    var table = divList.childNodes[0];//获取table
    if (table.nodeName == "TABLE") {
      for (var i = 1; i < table.rows.length; i++) {
        var row = table.rows[i];
        var obj = $("input[name='rptProductID']", row);
        if (obj.length > 0 && obj.val() != "") {
          idlist += obj.val() + "||";
        }
      }
    } else {
      idlist = document.getElementById("rptCommonMultiSelectIDALL").value;
    }

  }
  return idlist;
}

//创建临时的table
function CreateTempleTable(name, content) {
  if (document.getElementById(name)) document.body.removeChild(document.getElementById(name));
  var tempDiv = document.createElement("div");
  tempDiv.id = name;
  tempDiv.innerHTML = content;
  document.body.appendChild(tempDiv);
  var table = document.getElementById(name).childNodes[0];//获取table
  return table;
}
function removeTempleTable(name) {
  if (document.getElementById(name)) document.body.removeChild(document.getElementById(name));
}
/****成交产品多选end****/


/*******发货时产品多选*****/
function SetGoodsOutProductTempList(productTableID, productIDList, outid, dealid, selectmode) {
  commonMultiSelectTableID = productTableID;//这里重置TableID，否则编辑时直接调用这个会传TableID进来，保证在载入完成时commonMultiSelectTableID是有值的，选择内容的表ID,这里是选择产品，就应该是产品表的ID
  //document.getElementById("rptCommonMulti_Div_" + commonMultiSelectTableID).innerHTML = "<img src=\"/theme/default/images/loading_16.gif\" align=\"middle\" /> 正在载入...";
  var divList = document.getElementById("rptCommonMulti_Div_" + commonMultiSelectTableID);
  if (divList.children.length == 0)
    divList.innerHTML = "<img src=\"/theme/default/images/loading_16.gif\" align=\"middle\" /> 正在载入...";
  //todo 审批有单独调用的ajax
  var url = "/App/Team/Check/GoodsOut/GoodsOutProductTempAjax.aspx";
  $.ajax({
    type: "POST",
    url: url,
    data: { productIDList: productIDList, selectmode: selectmode, outid: outid },
    ValidateInput: false,
    success: function (result) {
      goodsoutproduct_callback(result);
    }
  });

}

//产品的回调方法
function goodsoutproduct_callback(res) {
  var divList = document.getElementById("rptCommonMulti_Div_" + commonMultiSelectTableID);
  initProductContent(divList, res);

  var table = divList.childNodes[0];//获取table
  var count = table.rows.length;//获取table的总行数
  document.getElementById("rptCommonMultiSelectCount").innerHTML = count == 0 ? 0 : count - 1;//设置选择产品数量

  StartSetSize();
}

/*******退货时产品多选*****/
function SetGoodsInProductTempList(productTableID, productIDList, inid, dealid, selectmode) {
  commonMultiSelectTableID = productTableID;//这里重置TableID，否则编辑时直接调用这个会传TableID进来，保证在载入完成时commonMultiSelectTableID是有值的，选择内容的表ID,这里是选择产品，就应该是产品表的ID
  //document.getElementById("rptCommonMulti_Div_" + commonMultiSelectTableID).innerHTML = "<img src=\"/theme/default/images/loading_16.gif\" align=\"middle\" /> 正在载入...";
  var divList = document.getElementById("rptCommonMulti_Div_" + commonMultiSelectTableID);
  if (divList.children.length == 0)
    divList.innerHTML = "<img src=\"/theme/default/images/loading_16.gif\" align=\"middle\" /> 正在载入...";
  //todo 审批有单独调用的ajax
  var url = "/App/Team/Check/GoodsIn/GoodsInProductTempAjax.aspx";
  $.ajax({
    type: "POST",
    url: url,
    data: { productIDList: productIDList, selectmode: selectmode, inid: inid, dealid: dealid },
    ValidateInput: false,
    success: function (result) {
      goodsoutproduct_callback(result);
    }
  });

}


/*******入库产品多选[与上面的公共多选有关联]*******/
//选择入库产品【修改和显示详情】
function SetInStockProductList(productTableID, productIDList, instockid) {
  commonMultiSelectTableID = productTableID;//这里重置TableID，否则编辑时直接调用这个会传TableID进来，保证在载入完成时commonMultiSelectTableID是有值的，选择内容的表ID,这里是选择产品，就应该是产品表的ID
  //document.getElementById("rptCommonMulti_Div_" + commonMultiSelectTableID).innerHTML = "<img src=\"/theme/default/images/loading_16.gif\" align=\"middle\" /> 正在载入...";
  var divList = document.getElementById("rptCommonMulti_Div_" + commonMultiSelectTableID);
  if (divList.children.length == 0)
    divList.innerHTML = "<img src=\"/theme/default/images/loading_16.gif\" align=\"middle\" /> 正在载入...";
  Kehu51.Team.UI.Web.App.Product.Stock.InStockProductAjax.GetInStockProductSelect(productIDList, selectmode, instockid, product_callback);
}

/*function instockproduct_callback(res) {
    document.getElementById("rptCommonMulti_Div_" + commonMultiSelectTableID).innerHTML = res.value;
    document.getElementById("rptCommonMultiSelectCount").innerHTML = document.getElementsByName("rptProductIDList").length;//设置选择产品数量
    StartSetSize();
}*/

/****入库产品多选end****/

//显示字段编辑按钮
function ShowEditButton(tableID, show, fieldname) {
  //if (tableID == 39) {
  var obj = document.getElementById("show_" + fieldname);
  //console.info("fieldname:" + fieldname);
  if (obj) {
    if (show == true) {
      obj.style.display = "";
    } else {
      obj.style.display = "none";
    }
  }
  //}
}
//编辑文本
function EditText(tableid, fieldName, objid, textarea, td) {
  var dialog;
  try { dialog = currentDialogID; } catch (e) { dialog = ""; }
  var diag = new Dialog();
  diag.ID = "TextEdit";
  diag.Width = 450;
  diag.Height = 80;
  diag.URL = "/App/Module/SingleEdit/TextEdit.aspx?tableId=" + tableid + "&fieldName=" + fieldName + "&objId=" + objid + "&TextArea=" + textarea + "&dialogId=" + dialog + "&td=" + td;
  diag.show();
}
//编辑多行文本
function EditTextArea(tableid, fieldName, objid, textarea, td) {
  var dialog;
  try { dialog = currentDialogID; } catch (e) { dialog = ""; }
  var diag = new Dialog();
  diag.ID = "TextEdit";
  diag.Width = 500;
  diag.Height = 230;
  diag.URL = "/App/Module/SingleEdit/TextEdit.aspx?tableId=" + tableid + "&fieldName=" + fieldName + "&objId=" + objid + "&TextArea=" + textarea + "&dialogId=" + dialog + "&td=" + td;
  diag.show();
}
//编辑下拉框
function EditList(tableid, fieldName, parameverValue, objid, td) {
  var dialog;
  try { dialog = currentDialogID; } catch (e) { dialog = ""; }
  var diag = new Dialog();
  diag.ID = "ListEdit";
  diag.Width = 400;
  diag.Height = 80;
  diag.URL = "/App/Module/SingleEdit/ListEdit.aspx?tableId=" + tableid + "&fieldName=" + fieldName + "&objId=" + objid + "&parameverValue=" + parameverValue + "&dialogId=" + dialog + "&td=" + td;
  diag.show();
}
//编辑附件
function EditFiles(tableid, fieldName, objid) {
  var dialog;
  try { dialog = currentDialogID; } catch (e) { dialog = ""; }
  var diag = new Dialog();
  diag.ID = "FilesEdit";
  diag.Width = 400;
  diag.Height = 80;
  diag.URL = "/App/Module/SingleEdit/FilesEdit.aspx?tableId=" + tableid + "&fieldName=" + fieldName + "&objId=" + objid + "&dialogId=" + dialog;
  diag.show();
}
//编辑多级下拉框
function MultiLisEdit(tableid, fieldName, parameverValue, objid, td) {
  var dialog;
  try { dialog = currentDialogID; } catch (e) { dialog = ""; }
  var diag = new Dialog();
  diag.ID = "MultiLisEdit";
  diag.Width = 500;
  diag.Height = 120;
  diag.URL = "/App/Module/SingleEdit/MultiListEdit.aspx?tableId=" + tableid + "&fieldName=" + fieldName + "&objId=" + objid + "&parameverValue=" + parameverValue + "&dialogId=" + dialog + "&td=" + td;
  diag.show();
}
//编辑富文本
function EditTextArea2(tableid, fieldName, objid) {
  var dialog;
  try { dialog = currentDialogID; } catch (e) { dialog = ""; }
  var diag = new Dialog();
  diag.ID = "TextAreaEdit";
  diag.Width = 650;
  diag.Height = 400;
  diag.URL = "/App/Module/SingleEdit/TextEditArea.aspx?tableId=" + tableid + "&fieldName=" + fieldName + "&objId=" + objid + "&dialogId=" + dialog;
  diag.show();
}
//多选框
function EditCheckBox(tableid, fieldName, parameverValue, objid, td) {
  var dialog;
  try { dialog = currentDialogID; } catch (e) { dialog = ""; }
  var diag = new Dialog();
  diag.ID = "CheckBoxEdit";
  diag.Width = 700;
  diag.Height = 200;
  diag.URL = "/App/Module/SingleEdit/CheckBoxEdit.aspx?tableId=" + tableid + "&fieldName=" + fieldName + "&objId=" + objid + "&parameverValue=" + parameverValue + "&dialogId=" + dialog + "&td=" + td;
  diag.show();
}


/*打开图片预览-手机上拍照上传的图片在电脑上预览*/
function OpenImagePreview(tableID, indexID, currentfilename) {
  /*var dialog = new Dialog();
  dialog.ID = "ImagePreview";
  dialog.Width = 800;
  dialog.Height = 700;
  dialog.URL = "/app/module/ImagePreview/Preview2.aspx?tableID=" + tableID + "&indexID=" + indexID + "&currentfilename=" + currentfilename;
  dialog.show();*/
  parent.CloseLoading();
  window.open(currentfilename);
}


/*打地图定位*/
function OpenMapPreview(longitude, latitude, address) {
  ////阻止事件冒泡
  //if (typeof (event) != "undefined") {
  //    event.stopPropagation();
  //}

  cancelBubble();

  var dialog = new Dialog();
  dialog.ID = "ImagePreview";
  dialog.Width = 1000;
  dialog.Height = 700;
  dialog.URL = "/app/module/Map/Preview1.aspx?longitude=" + longitude + "&latitude=" + latitude + "&address=" + address;
  dialog.show();
}


function OpenMapAddressSearch(fieldname, controlName, fieldtext, isRepeat, datatype, dialogName, position) {

  var currentcontent = document.getElementById(controlName).value;

  //在新建的时候，先选择了一个地址没有保存，再又重新选择，会没有默认坐标，这里从界面中取得默认坐标
  if (position == "") {
    var dataObj = document.getElementById(controlName + "_mapdata");
    if (dataObj) {
      var data = dataObj.value;
      if (data != "") {
        var arrData = data.split(',');
        if (arrData.length == 7) {
          position = arrData[5] + "," + arrData[6];
        }
      }
    }
  }

  var dialog = new Dialog();
  dialog.ID = "OpenMapAddressSearch";
  dialog.Width = 1000;
  dialog.Height = 601;
  dialog.URL = "/app/module/Map/OpenMapAddressSearch.aspx?controlName=" + controlName + "&fieldname=" + fieldname + "&fieldtext=" + fieldtext + "&isRepeat=" + isRepeat + "&datatype=" + datatype + "&currentcontent=" + currentcontent + "&dialogName=" + dialogName + "&position=" + position;
  dialog.show();
}


//多级联动list选择
function ListMultiChange(dept, fieldName, parameterName, classID, markID, obj, configGuid) {
  if (typeof (configGuid) == "undefined") {
    configGuid = "";
  }

  var id = obj.value;


  var nextDept = parseInt(dept) + 1;//下一个选项项的级别


  for (var n = nextDept; n <= 5; n++) {
    document.getElementById("rpt" + fieldName + "_NextSpan_" + n).innerHTML = "";//清空除当前级别之后所有的
  }

  //alert(markID);

  //标识ID，在自定义顶部分类或自定义搜索时用到的
  if (markID != 0) {

    var contentFieldID = "rptContent_" + markID;

    if (id == 0) {
      var upDept = parseInt(dept) - 1;
      var upListObjID = "rpt" + fieldName + "_List_" + upDept;

      if (document.getElementById(upListObjID)) {
        document.getElementById(contentFieldID).value = document.getElementById(upListObjID).value;
      } else {
        document.getElementById(contentFieldID).value = "";
      }
    } else {
      document.getElementById(contentFieldID).value = id;
    }
  }


  if (id == 0) return;


  var v = Kehu51.Team.UI.Web.App.Ajax.GetListMultiData.GetNextDataNew(parameterName, id, classID, configGuid).value; // 类的名称


  if (v.Rows.length != 0) {

    var nextSpan = document.getElementById("rpt" + fieldName + "_NextSpan_" + nextDept);


    var nextSelectID = "rpt" + fieldName + "_List_" + nextDept;
    nextSpan.innerHTML = "&nbsp;<select name=\"rpt" + fieldName + "\" id=\"" + nextSelectID + "\" style=\"max-width:210px\" onchange=\"ListMultiChange(" + nextDept + ",'" + fieldName + "','" + parameterName + "'," + classID + "," + markID + ",this,'" + configGuid + "')\" class=\"form-control\"></select>";

    var selectObj = document.getElementById(nextSelectID);
    selectObj.options.add(new Option("  ", 0));//加上空值

    for (var i = 0; i < v.Rows.length; i++) {
      var text = v.Rows[i].Text; //这个地方需要注意区分大小写
      var oneabc = v.Rows[i].OneAbc;
      var valueid = v.Rows[i].ID;

      selectObj.options.add(new Option(oneabc + " " + text, valueid));
    }
  }
}

//获取MultiList的选择ID，返回0表示未选择
function GetMultiListValue(fieldname) {
  var objList = document.getElementsByName(fieldname);
  var valueID;
  for (var i = objList.length - 1; i >= 0; i--) {
    valueID = objList[i].value;
    if (valueID != "0") return valueID;
  }
  return 0;
}


//编辑客户信息-列表
function SingleEdit_MultiList(tableID, fieldName, parameverValue, indexID) {
  var diag = new Dialog();
  diag.ID = "SingleEdit_MultiList";
  diag.Width = 500;
  diag.Height = 72;
  diag.URL = "/App/Module/SingleEdit/MultiList.aspx?tableID=" + tableID + "&fieldName=" + fieldName + "&parameverValue=" + parameverValue + "&indexID=" + indexID;
  diag.show();
}


//查看评论详情
function CommentDetail(objtype, objid, commentcount) {
  var diag = new Dialog();
  diag.ID = "CommentDetail";
  diag.Width = 800;
  diag.Height = 600;
  diag.URL = "/App/Module/Comment/CommentDetail.aspx?objtype=" + objtype + "&objid=" + objid + "&commentcount=" + commentcount;
  diag.show();
}


/******多个文字输入框相关js*****/
function addElementLi(text, fieldName, dataType, indexID, fieldPrefix) {

  //显示第一行的主要
  document.getElementById("Frist_" + fieldName).style.display = "";
  document.getElementById(fieldPrefix + fieldName).style.width = "160px";



  var ul = document.getElementById("multiUL_" + fieldName);

  //添加 li
  var li = document.createElement("li");


  var len = ul.getElementsByTagName("li").length;
  var newid = len + 1;


  li.id = "Li_" + fieldName + "_" + newid;
  li.className = "multiLi";

  //设置 li 属性，如 id
  //li.setAttribute("id", "Li_"+fieldName+"_"+newid);
  //li.setAttribute("class","multiLi");


  var contentHTML = "<input type=\"text\" name=\"" + fieldPrefix + fieldName + "_MultiTitle\" class=\"form-control\" style=\"width:60px;color:#999999;text-align:right\" />：<input name=\"" + fieldPrefix + fieldName + "_MultiContent\" type=\"text\" id=\"" + fieldPrefix + fieldName + newid + "\" value=\"\" class=\"form-control\" style=\"width:160px\"";
  if (document.getElementById(fieldPrefix + "RepeatList").value.indexOf(fieldName) != -1) {
    contentHTML += " onblur=\"checkRepeat(this,'" + text + "','" + fieldName + "','" + dataType + "'," + indexID + ")\"";//检查重复的，datatype传过去，如果是多项input，需要再单独检查
  }
  contentHTML += "/><a href=\"javascript:removeElementLi('" + fieldName + "'," + newid + ",'" + fieldPrefix + "')\" style=\"margin-left:5px\"><i class=\"toolfont\" style=\"margin-right:2px;font-size:14px;color:#eb4f38\">&#xe60e;</i>删除</a>";

  li.innerHTML = contentHTML;
  ul.appendChild(li);
}

function removeElementLi(fieldName, id, fieldPrefix) {
  var ul = document.getElementById("multiUL_" + fieldName);

  var liid = "Li_" + fieldName + "_" + id;
  var li = document.getElementById(liid);

  ul.removeChild(li);

  var len = ul.getElementsByTagName("li").length;

  if (len == 1) {
    //删光了，只剩下一个
    document.getElementById("Frist_" + fieldName).style.display = "none";
    document.getElementById(fieldPrefix + fieldName).style.width = "200px";
  }
}
//2017-01-06 qianlong 设置待办任务显示模式
function SetWaitTaskMode(url) {
  var diag = new Dialog();
  diag.ID = "WaitTaskMode";
  diag.Width = 500;
  diag.Height = 182;
  diag.Title = "任务模式设置";
  diag.URL = "/app/tools/WaitTask/WaitTaskMode.aspx?url=" + url;
  diag.show();
}

//2017-07-05 qianlong 待办任务的编辑功能
function DateTimeEdit(title, fieldName) {
  var diag = new Dialog();
  diag.ID = "DateTimeEdit";
  diag.Width = 460;
  diag.Height = 230;
  diag.Title = "修改" + title;
  diag.URL = "/app/tools/waittask/SingleEdit/DateTimeEdit.aspx?dialog=TaskDetail&TaskID=" + taskid + "&title=" + title + "&fieldname=" + fieldName;
  diag.show();
}

function TextEdit(title, fieldName) {
  var diag = new Dialog();
  diag.ID = "TextEdit";
  diag.Width = 550;
  diag.Height = 230;
  diag.Title = "修改" + title;
  diag.URL = "/app/tools/waittask/SingleEdit/TextEdit.aspx?dialog=TaskDetail&TaskID=" + taskid + "&title=" + title + "&fieldname=" + fieldName;
  diag.show();
}

function TaskTypeEdit(title, fieldName) {
  var diag = new Dialog();
  diag.ID = "TaskTypeEdit";
  diag.Width = 520;
  diag.Height = 200;
  diag.Title = "修改" + title;
  diag.URL = "/app/tools/waittask/SingleEdit/TaskTypeEdit.aspx?dialog=TaskDetail&TaskID=" + taskid + "&title=" + title + "&fieldname=" + fieldName;
  diag.show();
}

function CCUserEdit(title, fieldName) {
  var diag = new Dialog();
  diag.ID = "CCUserEdit";
  diag.Width = 400;
  diag.Height = 160;
  diag.Title = "修改" + title;
  diag.URL = "/app/tools/waittask/SingleEdit/CCUserEdit.aspx?dialog=TaskDetail&TaskID=" + taskid + "&title=" + title + "&fieldname=" + fieldName;
  diag.show();
}

function FilesEdit(title, fieldName) {
  var diag = new Dialog();
  diag.ID = "FilesEdit";
  diag.Width = 550;
  diag.Height = 230;
  diag.Title = "修改" + title;
  diag.URL = "/app/tools/waittask/SingleEdit/FilesEdit.aspx?dialog=TaskDetail&TaskID=" + taskid + "&title=" + title + "&fieldname=" + fieldName;
  diag.show();
}

function TaskModeEdit(title, fieldName) {
  var diag = new Dialog();
  diag.ID = "TaskModeEdit";
  diag.Width = 550;
  diag.Height = 230;
  diag.Title = "修改" + title;
  diag.URL = "/app/tools/waittask/SingleEdit/TaskModeEdit.aspx?dialog=TaskDetail&TaskID=" + taskid + "&title=" + title + "&fieldname=" + fieldName;
  diag.show();
}
//2017-07-06 qianlong 保存表单内容
function SaveFormData(tableid, modlueType, id) {
  //获取多选框的内容
  var checkList = "";
  var radioList = "";
  $(".checkbox-item").each(function (index) {
    var type = $(this).attr("data-type");
    if (checkList.indexOf(type) == -1) checkList += type + ",";
  });
  if (checkList != "") {
    checkList = checkList.substr(0, checkList.length - 1);

    var arrCheckBox = checkList.split(',');
    for (var i = 0; i < arrCheckBox.length; i++) {
      var type = arrCheckBox[i]
      var chkValue = GetValue(type);
      $("#rpt" + type).val(chkValue);
    }
  }
  //获取单选框的内容
  $(".radiobox-item").each(function (index) {
    var type = $(this).attr("data-type");
    if (radioList.indexOf(type) == -1) radioList += type + ",";
  });

  if (radioList != "") {
    radioList = radioList.substr(0, radioList.length - 1);
    var arrRadio = radioList.split(',');
    for (var i = 0; i < arrRadio.length; i++) {
      var type = arrRadio[i]
      var chkValue = GetRadioValue(type);
      if (type == "rptLinkMan_Sex")
        $("#rptLinkMan_Sex").val(chkValue);
      else
        $("#rpt" + type).val(chkValue);
    }
  }
  if (CheckFormContent()) {
    //写临时的配置文件
    var url = "/app/ajax/SaveFormData.aspx?action=save&tableid=" + tableid + "&type=" + modlueType + "&id=" + id;
    $.ajax({
      type: "POST",
      url: url,
      data: $('#form1').serialize(),
      ValidateInput: false,
      success: function (result) {
        //暂时不做任务处理
      },
      error: function (result) {
        //暂时不做任务处理
      }
    });
  }
}
//2017-09-19 qianlong 查看任务完成情况
function LookWaitTaskCompleteInfo(taskID) {
  $.ajax({
    url: "/App/Tools/WaitTask/LookWaitTaskCompleteInfo.aspx?taskid=" + taskID,
    type: "GET",
    async: true,
    success: function (result) {
      $("#completeInfo_" + taskID).html(result);
    }
  });
}
//2018-03-12 qianlong 转交给其他人
function SelectOtherUsersExcute(taskID, taskNodeID, dialog) {
  var diag = new Dialog();
  diag.ID = "SelectOtherUsers";
  diag.Width = 800;
  diag.Height = 700;
  diag.Title = "选择其他人执行";
  diag.URL = "/app/tools/waittask/SelectOtherUsers.aspx?taskid=" + taskID + "&tasknodeid=" + taskNodeID + "&dialog=" + dialog;
  diag.show();
}

//2017-10-10 lijingbo 关联业务
function chooseAss(formName, customersids, customersinfo, followsids, followsinfo, dealsids, dealsinfo, backfundsids, backfundsinfo, refundsids, refundsinfo, feesids, feesinfo, complaintsids, complaintsinfo, oddsids, oddsinfo) {
  //1.先给隐藏域赋值，保存时通过隐藏域值处理
  $("#customers").val(customersids);
  $("#customersinfo").val(customersinfo);
  $("#follows").val(followsids);
  $("#followsinfo").val(followsinfo);
  $("#deals").val(dealsids);
  $("#dealsinfo").val(dealsinfo);
  $("#backfunds").val(backfundsids);
  $("#backfundsinfo").val(backfundsinfo);
  $("#refunds").val(refundsids);
  $("#refundsinfo").val(refundsinfo);
  $("#fees").val(feesids);
  $("#feesinfo").val(feesinfo);
  $("#complaints").val(complaintsids);
  $("#complaintsinfo").val(complaintsinfo);
  $("#odds").val(oddsids);
  $("#oddsinfo").val(oddsinfo);

  //2.界面展示
  var html = "";
  if (followsinfo != "" || customersinfo != "" || dealsinfo != "" || backfundsinfo != "" || refundsinfo != "" || feesinfo != "" || complaintsinfo != "" || oddsinfo != "") {
    html += "<div id=\"divass\">";
    //客户
    if (customersinfo != "") {
      html += "<div id=\"divcustomers\" class=\"divselect\">";
      html += "<span class=\"chooscss\" style=\"color:#666\">客户：</span>";
      html += "<ul class=\"chooscss\">"
      for (var i = 0; i < customersinfo.split("'").length; i++) {
        html += "<li id=\"li_" + customersinfo.split("'")[i].split("|")[0] + "_customers" + "\" class=\"selectuser_item\"><a href=\"javascript:CusDetail(" + customersinfo.split("'")[i].split("|")[0] + ")\" title=\"查看详情\">" + customersinfo.split("'")[i].split("|")[1] + "</a>&nbsp;";
        html += "<a href=\"javascript:DeleteSelectAss(" + customersinfo.split("'")[i].split("|")[0] + ",'" + customersinfo.split("'")[i].split("|")[1] + "','customers')\" title=\"删除\"><i class=\"menufont\" style=\"margin-right:0px\"></i></a>";
      }
      html += "</ul>"
      html += "</div>";
    }
    //跟进
    if (followsinfo != "") {
      html += "<div id=\"divfollows\" class=\"divselect\">";
      html += "<span class=\"chooscss\" style=\"color:#666\">联系跟进：</span>";
      html += "<ul class=\"chooscss\">"
      for (var i = 0; i < followsinfo.split("'").length; i++) {
        html += "<li id=\"li_" + followsinfo.split("'")[i].split("|")[0] + "_follows" + "\" class=\"selectuser_item\"><a href=\"javascript:FollowDetail(" + followsinfo.split("'")[i].split("|")[0] + ")\" title=\"查看详情\">" + followsinfo.split("'")[i].split("|")[1] + "</a>&nbsp;";
        html += "<a href=\"javascript:DeleteSelectAss(" + followsinfo.split("'")[i].split("|")[0] + ",'" + followsinfo.split("'")[i].split("|")[1] + "','follows')\" title=\"删除\"><i class=\"menufont\" style=\"margin-right:0px\"></i></a>";
      }
      html += "</ul>"
      html += "</div>";
    }
    //订单
    if (dealsinfo != "") {
      html += "<div id=\"divdeals\" class=\"divselect\">";
      html += "<span class=\"chooscss\" style=\"color:#666\">成交订单：</span>";
      html += "<ul class=\"chooscss\">"
      for (var i = 0; i < dealsinfo.split("'").length; i++) {
        html += "<li id=\"li_" + dealsinfo.split("'")[i].split("|")[0] + "_deals" + "\" class=\"selectuser_item\"><a href=\"javascript:DealDetailAss(" + dealsinfo.split("'")[i].split("|")[0] + ")\" title=\"查看详情\">" + dealsinfo.split("'")[i].split("|")[1] + "</a>&nbsp;";
        html += "<a href=\"javascript:DeleteSelectAss(" + dealsinfo.split("'")[i].split("|")[0] + ",'" + dealsinfo.split("'")[i].split("|")[1] + "','deals')\" title=\"删除\"><i class=\"menufont\" style=\"margin-right:0px\"></i></a>";
      }
      html += "</ul>"
      html += "</div>";
    }
    //回款
    if (backfundsinfo != "") {
      html += "<div id=\"divbackfunds\" class=\"divselect\">";
      html += "<span class=\"chooscss\" style=\"color:#666\">回款管理：</span>";
      html += "<ul class=\"chooscss\">"
      for (var i = 0; i < backfundsinfo.split("'").length; i++) {
        html += "<li id=\"li_" + backfundsinfo.split("'")[i].split("|")[0] + "_backfunds" + "\" class=\"selectuser_item\"><a href=\"javascript:BackFundsDetailAss(" + backfundsinfo.split("'")[i].split("|")[0] + ")\" title=\"查看详情\">" + backfundsinfo.split("'")[i].split("|")[1] + "</a>&nbsp;";
        html += "<a href=\"javascript:DeleteSelectAss(" + backfundsinfo.split("'")[i].split("|")[0] + ",'" + backfundsinfo.split("'")[i].split("|")[1] + "','backfunds')\" title=\"删除\"><i class=\"menufont\" style=\"margin-right:0px\"></i></a>";
      }
      html += "</ul>"
      html += "</div>";
    }

    //退款
    if (refundsinfo != "") {
      html += "<div id=\"divrefunds\" class=\"divselect\">";
      html += "<span class=\"chooscss\" style=\"color:#666\">退款管理：</span>";
      html += "<ul class=\"chooscss\">"
      for (var i = 0; i < refundsinfo.split("'").length; i++) {
        html += "<li id=\"li_" + refundsinfo.split("'")[i].split("|")[0] + "_refunds" + "\" class=\"selectuser_item\"><a href=\"javascript:ReFundsDetail(" + refundsinfo.split("'")[i].split("|")[0] + ")\" title=\"查看详情\">" + refundsinfo.split("'")[i].split("|")[1] + "</a>&nbsp;";
        html += "<a href=\"javascript:DeleteSelectAss(" + refundsinfo.split("'")[i].split("|")[0] + ",'" + refundsinfo.split("'")[i].split("|")[1] + "','refunds')\" title=\"删除\"><i class=\"menufont\" style=\"margin-right:0px\"></i></a>";
      }
      html += "</ul>"
      html += "</div>";
    }

    //费用收支
    if (feesinfo != "") {
      html += "<div id=\"divfees\" class=\"divselect\">";
      html += "<span class=\"chooscss\" style=\"color:#666\">费用收支：</span>";
      html += "<ul class=\"chooscss\">"
      for (var i = 0; i < feesinfo.split("'").length; i++) {
        html += "<li id=\"li_" + feesinfo.split("'")[i].split("|")[0] + "_fees" + "\" class=\"selectuser_item\"><a href=\"javascript:FeesDetail(" + feesinfo.split("'")[i].split("|")[0] + ")\" title=\"查看详情\">" + feesinfo.split("'")[i].split("|")[1] + "</a>&nbsp;";
        html += "<a href=\"javascript:DeleteSelectAss(" + feesinfo.split("'")[i].split("|")[0] + ",'" + feesinfo.split("'")[i].split("|")[1] + "','fees')\" title=\"删除\"><i class=\"menufont\" style=\"margin-right:0px\"></i></a>";
      }
      html += "</ul>"
      html += "</div>";
    }

    //客户投诉
    if (complaintsinfo != "") {
      html += "<div id=\"divcomplaints\" class=\"divselect\">";
      html += "<span class=\"chooscss\" style=\"color:#666\">客户投诉：</span>";
      html += "<ul class=\"chooscss\">"
      for (var i = 0; i < complaintsinfo.split("'").length; i++) {
        html += "<li id=\"li_" + complaintsinfo.split("'")[i].split("|")[0] + "_complaints" + "\" class=\"selectuser_item\"><a href=\"javascript:ComplaintsDetailNew('" + complaintsinfo.split("'")[i].split("|")[0] + "')\" title=\"查看详情\">" + complaintsinfo.split("'")[i].split("|")[1] + "</a>&nbsp;";
        html += "<a href=\"javascript:DeleteSelectAss(" + complaintsinfo.split("'")[i].split("|")[0] + ",'" + complaintsinfo.split("'")[i].split("|")[1] + "','complaints')\" title=\"删除\"><i class=\"menufont\" style=\"margin-right:0px\"></i></a>";
      }
      html += "</ul>"
      html += "</div>";
    }

    //销售机会
    if (oddsinfo != "") {
      html += "<div id=\"divodds\" class=\"divselect\">";
      html += "<span class=\"chooscss\" style=\"color:#666\">销售机会：</span>";
      html += "<ul class=\"chooscss\">"
      for (var i = 0; i < oddsinfo.split("'").length; i++) {
        html += "<li id=\"li_" + oddsinfo.split("'")[i].split("|")[0] + "_odds" + "\" class=\"selectuser_item\"><a href=\"javascript:OddsDetail('" + oddsinfo.split("'")[i].split("|")[0] + "')\" title=\"查看详情\">" + oddsinfo.split("'")[i].split("|")[1] + "</a>&nbsp;";
        html += "<a href=\"javascript:DeleteSelectAss(" + oddsinfo.split("'")[i].split("|")[0] + ",'" + oddsinfo.split("'")[i].split("|")[1] + "','odds')\" title=\"删除\"><i class=\"menufont\" style=\"margin-right:0px\"></i></a>";
      }
      html += "</ul>"
      html += "</div>";
    }

    html += "</div>";
  }
  html += "<a href=\"javascript:OpenAssociation('" + formName + "',0);\" class=\"orgAdd\">选择</a>";
  $("#tdAssociation").html("");
  $("#tdAssociation").append(html);

  StartSetSize();
}

function DeleteSelectAss(id, title, tagid) {
  var li = document.getElementById("li_" + id + "_" + tagid);
  li.parentNode.removeChild(li);
  //去掉隐藏域中对应id
  var newIDlist = $("#" + tagid).val();
  newIDlist = ("'" + newIDlist + "'").replace(/\'/g, "'").replace("'" + id + "'", "'");
  newIDlist = newIDlist.replace("''", "'").replace(/^'*|'*$/g, '');
  if (newIDlist == "'") {
    newIDlist = "";
  }
  //如果对应关联模块全部删除了，则同时删掉对应标题
  if (newIDlist == "") {
    $("#div" + tagid).remove();
  }
  $("#" + tagid).val(newIDlist);
  //同时去掉隐藏域中对应详细信息
  var newInfolist = $("#" + tagid + "info").val();
  newInfolist = ("'" + newInfolist + "'").replace(/\''/g, "'").replace("'" + id + "|" + title + "'", "'");
  newInfolist = newInfolist.replace("''", "'").replace(/^'*|'*$/g, '');
  if (newInfolist == "'") {
    newInfolist = "";
  }
  $("#" + tagid + "info").val(newInfolist);
  StartSetSize();
}
//2017-10-18 qianlong 设置已读消息
function SetReadMessage(messageid) {
  $.ajax({
    url: "/App/ajax/SetRead.aspx?messageid=" + messageid,
    type: "GET",
    async: true,
    cache: false,
    success: function (result) {
      if (result == "") {
        //暂时不做任何处理
      }
    }
  });
}

function OpenContact(custype, id, taskID, taskNodeID, stateID) {
  var diag = new Dialog();
  diag.ID = "ContactWindow";
  //diag.Modal = false;
  diag.Width = 500;
  diag.Height = 285;
  diag.URL = "/app/customers/CusContact.aspx?CusType=" + custype + "&taskid=" + taskID + "&taskNodeid=" + taskNodeID + "&stateid=" + stateID + "&ID=" + id;
  diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}

//拨打电话
function GoCall(userid, cusid, cusname, linkmanid, linkmanname, taskid, tasknodeid, phone, code, tag) {

  if (!top.isCalling) {
    phone = phone.replace(/-/g, "");

    if (tag == 1) {
      var reg = /^\d{11}|\d{12}$/;　　//11或者12为数字
      if (!phone.match(reg)) { Dialog.showError("请拨打国内有效的手机号码或者座机号码。"); return; }
      if (phone.length != 11 && phone.length != 12 && phone.length != 7 && phone.length != 8) { Dialog.showError("请拨打国内有效的手机号码或者座机号码。"); return; }
      if (phone.length == 11) {
        reg = /^1[3456789]\d{9}$/;
        if (!phone.match(reg)) {

          reg = /^0\d{2,3}\d{7,8}$/;
          if (!phone.match(reg)) {
            Dialog.showError("请拨国内打有效的手机号码或者座机号码。"); return;
          }
        }
      }
    }

    var obj = $("#calllist_" + cusid);
    var i = $(obj.find("i")[0]);
    if (!i.hasClass("color5"))
      i.addClass("color5");
    //如果在客户列表中打电话没有问题，但是在详情界面打电话，就无法将top.isCalling重置为false，暂时先注释后期想到好的办法再进行处理
    //top.isCalling = true;

    window.onbeforeunload = function () {
      return;
    }

    cusname = cusname.replace(/ /g, '');
    cusname = cusname.replace(/　/g, '');

    window.location.href = "kehu51://kehu51/?userid=" + userid + "&cusid=" + cusid + "&cusname=" + escape(cusname) + "&linkmanid=" + linkmanid + "&linkmanname=" + escape(linkmanname) + "&taskid=" + taskid + "&tasknodeid=" + tasknodeid + "&tel=" + phone + "&code=" + code + "&tag=" + tag;
  } else {
    alert("通话中，请等待......");
    //Dialog.showError("通话中，请等待......");
  }
}

//2018-05-07 qianlong 客户详情侧滑
function CusDetailNew(id, grantPowerId) {
  parent.CloseLoading();
  var url = "/app/customers/customersdetail/cusdetail.aspx?cusid=" + id + "";

  //客户授权ID
  if (typeof (grantPowerId) != "undefined" && grantPowerId != 0) {
    url += "&grantpowerid=" + grantPowerId
  }
  GotoCusDetail_Slider(url);
}

function GotoCusDetail_Slider(url) {
  var slider = new DialogSlider();
  slider.Title = "客户资料";
  slider.URL = url;
  slider.showTitle = false;
  slider.isBlank = false;
  slider.showSlider();
}



function Detail_Slider(url, isblank) {
  var slider = new DialogSlider();
  slider.Title = "详细资料";
  slider.URL = url;
  slider.showTitle = false;
  slider.isBlank = isblank;
  slider.showSlider();
}

//发送邮件
function SendEmail(email) {
  window.onbeforeunload = function () {
    return;
  }
  window.location.href = "mailto:" + email + "";
}
//打开旺旺
function OpenWangWang(wangwang) {
  window.open("http://amos.alicdn.com/getcid.aw?v=2&uid=" + wangwang + "&site=cntaobao&s=1&groupid=0&charset=utf-8", "blank");
}

//2018-05-14 qianlong 显示隐藏在新窗口中打开按钮
function trHover(obj, indexID) {
  obj.style.backgroundColor = '#FFFDD7';
  if ($("#list-new_" + indexID).length > 0) {
    $("#list-new_" + indexID).show();
  }
}

function trLeave(obj, indexID) {
  obj.style.backgroundColor = '#FFFFFF';
  if ($("#list-new_" + indexID).length > 0) {
    $("#list-new_" + indexID).hide();
  }
}

//2018-05-18 lx 打开公共二级明细显示页面（目前只有统计穿透在用）
function openPenetratingDetail(typeName, tableNameId, sqlWhere) {
  if (typeof (sqlWhere) == "undefined" || sqlWhere == "") {
    Dialog.showError("未找到对应条件。");
    return;
  }

  var url = "/app/module/PenetratingData/PenetratingDataList.aspx?typename=" + escape(typeName) + "&tablenameid=" + tableNameId;
  //$("#hidSqlWhere").val(sqlWhere);

  var diag = new Dialog();
  diag.ID = "PenetratingDataList";
  diag.InnerFrameName = "_DialogFrame_PenetratingDataList";
  diag.Width = 1200;
  diag.Height = 800;
  diag.IsPost = true;
  diag.PostKey = "sqlWhere";
  diag.PostValue = sqlWhere;
  diag.URL = url;
  diag.show();
  diag.PostSubmit();
}

function chooseContacts(formName, contactsname, contactsphone, contactsaddress, location_longitude, location_latitude, location_cityname, location_citycode) {
  var customstr = "";
  var ismust = 1;
  if (formName.toLowerCase() == "dealedit" || formName.toLowerCase() == "dealgoodsoutedit" || formName.toLowerCase() == "dealrenewedit") {
    customstr = "_do";

    //同时判断是否存在上门取件的选择，如果选择了上门取件，地址选择为非必填
    if ($("input[name='rptIsPickSelf']").length > 0 && $("input[name='rptIsPickSelf']:checked").val() == "1") {
      ismust = 0;
    }
  }
  //1.先给隐藏域赋值，保存时通过隐藏域值处理
  $("#rptContactsName" + customstr).val(contactsname);
  $("#rptContactsPhone" + customstr).val(contactsphone);
  $("#rptContactsAddress" + customstr).val(contactsaddress);
  $("#rptLocation_longitude" + customstr).val(location_longitude);
  $("#rptLocation_latitude" + customstr).val(location_latitude);
  $("#rptLocation_cityname" + customstr).val(location_cityname);
  $("#rptLocation_citycode" + customstr).val(location_citycode);

  //2.界面展示
  var html = "";

  if ((contactsname + contactsphone + contactsaddress) != "") {
    var contactsAddressHtml = contactsaddress;
    if ((location_longitude != 0 && location_longitude != "") || (location_latitude != 0 && location_latitude != "")) {
      contactsAddressHtml = "<a style='cursor:pointer;' onclick='OpenMapPreview(" + location_longitude + "," + location_latitude + ",\"" + contactsaddress + "\")'>" + contactsaddress + "</a>";
    }
    html += contactsname + "&nbsp;&nbsp;&nbsp;&nbsp;" + contactsphone + "&nbsp;&nbsp;&nbsp;&nbsp;" + contactsAddressHtml + "&nbsp;&nbsp;&nbsp;&nbsp;";
    html += "<a href=\"javascript:OpenRelateRecipient_Single('" + formName + "');\" class=\"orgAdd\">选择</a>";
  }
  else {
    html += "<a href=\"javascript:OpenRelateRecipient_Single('" + formName + "');\" class=\"orgAdd\" style=\"margin-left:5px;\">选择</a>";
  }

  html += "<a href=\"javascript:void(0); \" class=\"orgClear\" onclick=\"clearContacts('" + formName + "')\">清空</a>";

  if (ismust == 1) html += "<font class=\"color_red\" style=\"text-align:left; margin-left:5px;\">*</font>";

  $("#tdreceiveselect").html("");
  $("#tdreceiveselect").append(html);

}

function clearContacts(formName) {
  var customstr = "";
  var ismust = 1;

  if (formName.toLowerCase() == "dealedit" || formName.toLowerCase() == "dealgoodsoutedit") {
    customstr = "_do";

    //同时判断是否存在上门取件的选择，如果选择了上门取件，地址选择为非必填
    if ($("input[name='rptIsPickSelf']").length > 0 && $("input[name='rptIsPickSelf']:checked").val() == "1") {
      ismust = 0;
    }
  }
  //1.先给隐藏域赋值，保存时通过隐藏域值处理
  $("#rptContactsName" + customstr).val("");
  $("#rptContactsPhone" + customstr).val("");
  $("#rptContactsAddress" + customstr).val("");
  $("#rptLocation_longitude" + customstr).val("");
  $("#rptLocation_latitude" + customstr).val("");
  $("#rptLocation_cityname" + customstr).val("");
  $("#rptLocation_citycode" + customstr).val("");

  //2.界面展示
  var html = "";

  html += "<a href=\"javascript:OpenRelateRecipient_Single('" + formName + "');\" class=\"orgAdd\" style=\"margin-left:5px;\">选择</a>";

  html += "<a href=\"javascript:void(0); \" class=\"orgClear\" onclick=\"clearContacts('" + formName + "')\">清空</a>";

  if (ismust == 1) html += "<font class=\"color_red\" style=\"text-align:left; margin-left:5px;\">*</font>";

  $("#tdreceiveselect").html("");
  $("#tdreceiveselect").append(html);
}

//选择客户后根据客户ID获取收货信息自动填入
function AutoFillContacts(formName, cusid, companyID) {
  $.ajax({
    url: "/App/Ajax/GetAddressPrompt.aspx",
    type: "GET",
    async: false, //同步执行
    data: { cusid: cusid, companyid: companyID },
    success: function (res) {
      var customstr = "";
      var ismust = 1;
      if (formName == "DealEdit" || formName == "DealGoodsOutEdit") {
        customstr = "_do";

        //同时判断是否存在上门取件的选择，如果选择了上门取件，地址选择为非必填
        if ($("input[name='rptIsPickSelf']").length > 0 && $("input[name='rptIsPickSelf']:checked").val() == "1") {
          ismust = 0;
        }
      }

      if (res != "") {
        var data = eval("(" + res + ")");

        var contactsname = data.ContactsName;
        var contactsphone = data.ContactsPhone;
        var contactsaddress = data.ContactsAddress;
        var location_longitude = data.Location_longitude;
        var location_latitude = data.Location_latitude;
        var location_cityname = data.Location_cityname;
        var location_citycode = data.Location_citycode;

        //1.先给隐藏域赋值，保存时通过隐藏域值处理
        $("#rptContactsName" + customstr).val(contactsname);
        $("#rptContactsPhone" + customstr).val(contactsphone);
        $("#rptContactsAddress" + customstr).val(contactsaddress);
        $("#rptLocation_longitude" + customstr).val(location_longitude);
        $("#rptLocation_latitude" + customstr).val(location_latitude);
        $("#rptLocation_cityname" + customstr).val(location_cityname);
        $("#rptLocation_citycode" + customstr).val(location_citycode);

        //2.界面展示
        var html = "";

        if ((contactsname + contactsphone + contactsaddress) != "") {
          html += contactsname + "&nbsp;&nbsp;&nbsp;&nbsp;" + contactsphone + "&nbsp;&nbsp;&nbsp;&nbsp;" + contactsaddress + "&nbsp;&nbsp;&nbsp;&nbsp;";
          html += "<a href=\"javascript:OpenRelateRecipient_Single('" + formName + "');\" class=\"orgAdd\">选择</a>";

        }
        else {
          html += "<a href=\"javascript:OpenRelateRecipient_Single('" + formName + "');\" class=\"orgAdd\" style=\"margin-left:5px;\">选择</a>";
        }

        html += "<a href=\"javascript:void(0); \" class=\"orgClear\" onclick=\"clearContacts('" + formName + "')\">清空</a>";

        if (ismust == 1) html += "<font class=\"color_red\" style=\"text-align:left; margin-left:5px;\">*</font>";

        $("#tdreceiveselect").html("");
        $("#tdreceiveselect").append(html);
      }
      else {
        //1.先给隐藏域赋值，保存时通过隐藏域值处理
        $("#rptContactsName" + customstr).val("");
        $("#rptContactsPhone" + customstr).val("");
        $("#rptContactsAddress" + customstr).val("");
        $("#rptLocation_longitude" + customstr).val("");
        $("#rptLocation_latitude" + customstr).val("");
        $("#rptLocation_cityname" + customstr).val("");
        $("#rptLocation_citycode" + customstr).val("");

        //2.界面展示
        var html = "";

        html += "<a href=\"javascript:OpenRelateRecipient_Single('" + formName + "');\" class=\"orgAdd\" style=\"margin-left:5px;\">选择</a>";

        html += "<a href=\"javascript:void(0); \" class=\"orgClear\" onclick=\"clearContacts('" + formName + "')\">清空</a>";

        if (ismust == 1) html += "<font class=\"color_red\" style=\"text-align:left; margin-left:5px;\">*</font>";

        $("#tdreceiveselect").html("");
        $("#tdreceiveselect").append(html);
      }
    }
  });
}

function setCookie(name, value, expire) {
  var exp = new Date();
  exp.setTime(exp.getTime() + expire);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}

function getCookie(name) {
  var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  if (arr != null) return unescape(arr[2]); return null;
}

function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
}

function formatNumberShowStyle(num) {
  num = num.toString().split(".");  // 分隔小数点
  var arr = num[0].split("").reverse();  // 转换成字符数组并且倒序排列
  var res = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    if (i % 3 === 0 && i !== 0) {
      res.push(",");   // 添加分隔符
    }
    res.push(arr[i]);
  }
  res.reverse(); // 再次倒序成为正确的顺序
  if (num[1]) {  // 如果有小数的话添加小数部分
    res = res.join("").concat("." + num[1]);
  } else {
    res = res.join("");
  }
  return res;
}

var module = {
  //导出EXCEL
  exportToExcel: function (exportDataJson, exportEntityName) {
    if (typeof (exportDataJson) == "undefined") {
      exportDataJson = "";
    }
    if (exportDataJson == "") {
      Dialog.showError("无数据导出。");
      return;
    }

    var form = $("#__excelForm:first");
    if (form.length === 0) {
      var html = "<form id=\"__excelForm\" action=\"/ExportToExcel.aspx\" method=\"post\" target=\"__excelIFrame\">" +
        "<input type=\"hidden\" id=\"ExportDataJson\" name=\"ExportDataJson\" />" +
        "<input type=\"hidden\" id=\"ExportEntityName\" name=\"ExportEntityName\" />" +
        "</form>" +
        "<iframe id=\"__excelIFrame\" name=\"__excelIFrame\" style=\"display:none;\"></iframe>";
      $(html).appendTo("body");
      form = $("#__excelForm:first");
    }
    form.find("#ExportDataJson").val(exportDataJson);
    form.find("#ExportEntityName").val(exportEntityName);
    form.submit();
  },
  //下载文件
  downloadFile: function (url) {
    if (url == "") {
      Dialog.showError("无文件路径。");
      return;
    }

    var form = $("#__excelForm:first");
    if (form.length === 0) {
      var html = "<form id=\"__excelForm\" action=\"" + url+"\" method=\"post\" target=\"__excelIFrame\">" +
        "</form>" +
        "<iframe id=\"__excelIFrame\" name=\"__excelIFrame\" style=\"display:none;\"></iframe>";
      $(html).appendTo("body");
      form = $("#__excelForm:first");
    }
    form.submit();
    form.remove();
  },
  //业务模块导出
  businessExport: function (tableID,selectuserid, cusid, selectTypeID) {
    var url = "";
    if (tableID == 28) {//跟进
      url = Get2Host() + "/App/Module/Export/ExportExcel.aspx?tableid=" + tableID + "&ExportType=all&sortname1=followtime&sortmode1=desc&cusid=" + cusid;
    }
    else {
      url = Get2Host() + "/App/Module/Export/ExportExcel.aspx?tableid=" + tableID + "&SelectUserID=" + selectuserid + "&selecttypeid=" + selectTypeID + "&cusID=" + cusid;
    }
    var diag = new Dialog();
    diag.ID = "ExportExcel";
    diag.Width = 640;
    diag.Height = 515;
    diag.URL = url;
    diag.show();
  },
  //重新加载父页面
  reloadParent: function (url) {
    try {
      parent.window.frames["rptContentIframe"].location = url;
    }
    catch (err) { parent.location.reload(); }
  },
  //批量修改（新）
  batchUpdateNew: function (tableID) {
    var id = GetCheckedID("rptID");
    if (id == "") {
      Dialog.showError("请先选择要修改的记录！");
      return;
    }

    var diag = new Dialog();
    diag.ID = "BatchUpdateNew";
    diag.Width = 700;
    diag.Height = 300;
    diag.URL = "/app/module/BatchUpdate/BatchUpdateNew.aspx?tableid=" + tableID + "&idlist=" + id;
    diag.show();
  },
  DealDetail_GotoPage: function (dealID, isblank) {
    var url = "/app/customers/Deal/DealDetail2.aspx?DealID=" + dealID;
    Detail_Slider(url, isblank);
  },
  //获取guid
  getGuid: function () {
    var result = "";
    $.ajax({
      type: "Post",
      url: "/app/Module/Pub/Pub.aspx/GetGuid",
      data: "{}",
      async: false,
      contentType: "application/json; charset=utf-8",
      dataType: 'json',
      cache: false,
      success: function (data) {
        result = data.d;
      }
    });
    return result;
  },
  //2018-08-13 qianlong 新增关注功能
  doFocus: function (tableID, indexID) {
    var isShow = $("#label_focusnumber_" + indexID).parent().is(":hidden") ? 0 : 1;
    var data = { tableid: tableID, indexid: indexID, iscancel: isShow };
    $.ajax({
      type: "Post",
      url: "/app/Customers/Ajax/Customers/DoFocus.aspx",
      data: data,
      async: false,
      cache: false,
      dataType: 'json',
      success: function (data) {
        if (!isShow) {
          if (data.result == "success") {

            $("#label_icon_" + indexID + "").html("<i class=\"toolfont color3\">&#xe666;</i>已关注");
            $("#label_focusnumber_" + indexID).parent().show();
            $("#label_focusnumber_" + indexID).text(data.count);
            var cookiesName = getCookie("focusFirst");
            if (cookiesName == "1")
              Dialog.showAlert("关注成功");
            else {
              Dialog.showAlert("关注成功，请在右上角个人信息->我的关注中查看");
              setCookie("focusFirst", "1", 365);
            }
          };
        } else {
          Dialog.showAlert("取消关注成功");
          $("#label_icon_" + indexID + "").html("<i class=\"toolfont\">&#xe666;</i>关注");
          $("#label_focusnumber_" + indexID).parent().hide();
        }
      }
    });
  },
  //批量取消关注
  cancelFocus: function (tableID, title) {
    var indexIDList = GetCheckedID("rptID");
    if (indexIDList != "") {
      if (confirm("您确定要取消已关注的" + title + "吗？")) {
        var data = { tableid: tableID, indexidlist: indexIDList };
        $.ajax({
          type: "Post",
          url: "/app/Customers/Ajax/Customers/CancelFocus.aspx",
          data: data,
          async: false,
          cache: false,
          dataType: 'json',
          success: function (data) {
            if (data.result == "success") {
              window.location.href = window.location.href;
            };
          }
        });
      }
    } else {
      Dialog.showError("请选择要取消关注的" + title);
    }
  },
  //模糊查重设置
  showDailog_CheckRepeatPower: function () {
    var dialog = new Dialog();
    dialog.Title = "模糊查重权限设置";
    dialog.Width = 500;
    dialog.Height = 500;
    dialog.ID = "CheckRepeatPower";
    dialog.URL = "/App/Team/Config/Role/CRM/Customers/SetCheckRepeatPower.aspx";
    dialog.show();
  },
  //根据数组元素获取里面对应的值并按字符串返回
  getValueStrFromHtmlInputArr: function (obj) {
    var arrTemp = [];
    obj.each(function () {
      arrTemp.push($(this).val());
    })
    return JSON.stringify(arrTemp);
  },
  DealRenewMark: function (dealid) {
    if (dealid != 0) {
      if (confirm("您确定要将该订单标记为续费吗？")) {
        var data = { dealid: tableID};
        $.ajax({
          type: "Post",
          url: "/app/Customers/Ajax/Customers/CancelFocus.aspx",
          data: data,
          async: false,
          cache: false,
          dataType: 'json',
          success: function (data) {
            if (data.result == "success") {
              window.location.href = window.location.href;
            };
          }
        });
      }
    }
  },
  SetSingleSelectUsers: function (userid, dialogid, tagid) {
    SetSingleSelectUsersMethod(userid, dialogid, tagid);
  },
  DeleteSelectUsers: function (id, tagid) {
    DeleteSelectUsersMethod(id, tagid);
  },
  //授权
  GrantPower: function (tableId, hidControlName, dialogID, fieldName) {
    var grantPowerId = $("#" + hidControlName).val().split('|')[0];
    var diag = new Dialog();
    diag.ID = "GrantPowerIndex";
    diag.Width = 700;
    diag.Height = 850;
    diag.URL = "/app/Module/GrantPower/GrantPowerIndex.aspx?tableid=" + tableId + "&ctname=" + hidControlName + "&grantpowerid=" + grantPowerId + "&DialogID=" + dialogID + "&fieldname=" + fieldName;
    diag.show();
  },
  //选择自定义字段
  ChooseFields: function (tableId, hidControlName, dialogID, fieldName, chooseFieldsTypeId, tips, checkText, headerText) {
    var grantPowerId = $("#" + hidControlName).val().split('|')[0];
    var diag = new Dialog();
    diag.ID = "ChooseFields";
    diag.Width = 700;
    diag.Height = 850;
    diag.URL = "/app/Module/FieldsSelect/ChooseFields.aspx?tableid=" + tableId + "&ctname=" + hidControlName + "&grantpowerid=" + grantPowerId + "&DialogID=" + dialogID + "&fieldname=" + fieldName + "&choosefieldstypeid=" + chooseFieldsTypeId + "&tips=" + escape(tips) + "&checktext=" + escape(checkText) + "&headertext=" + headerText;
    diag.show();
  },
  //打开配置文件的列表
  settingConfigList: function (configListType, title, cancelCallBackFunction, delValidateFunName) {
    //configListType为枚举，有新的则加进去
    var diag = new Dialog();
    diag.ID = "ConfigList";
    diag.Width = 450;
    diag.Height = 600 > $(window).height() ? $(window).height() : 600;
    diag.Title = title;//"消息提醒设置";
    diag.URL = "/app/Module/Pub/ConfigList.aspx?configListType=" + configListType + "&delValidate=" + delValidateFunName;
    diag.CancelEvent = function () {
      //取消的回调函数
      if (typeof (cancelCallBackFunction) != "undefined" && typeof (eval("cancelCallBackFunction")) == "function") {
        cancelCallBackFunction();
      }
      //关闭二级窗口页面
      diag.close();
    };
    diag.show();
  },
  //导出
  export: function(tableid, exportType, sqlCondition) {
    var dialog = new Dialog();
    dialog.ID = "ExportExcel";
    dialog.Width = 640;
    dialog.Height = 515;
    dialog.URL = Get2Host() + "/App/Module/Export/ExportExcel.aspx?tableid=" + tableid + "&exportType=" + exportType + "&sqlCondition=" + sqlCondition;
    dialog.show();
  }

};
