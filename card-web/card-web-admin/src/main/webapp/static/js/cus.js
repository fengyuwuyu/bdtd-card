function AddCus_All(cusType, srcForm, productidlist) {
  //if (cusType == 0) cusType = 1;
  var timestamp = new Date().getTime();//获取时间戳
  var diag = new Dialog();
  diag.ID = "CustomersEdit";
  diag.Width = 1000;
  diag.Height = 800;
  //if (cusType == 2) {
  //diag.URL = "/app/customers/PerCusEdit.aspx?Mode=Add&srcForm=" + srcForm;
  //diag.URL = "/app/customers/CustomersEdit.aspx?vt=" + timestamp + "&CusType=" + cusType + "&Mode=Add&srcForm=" + srcForm + "&productidlist=" + productidlist;
  //2017-07-13 qianlong 添加temp参数，表示取临时数据
  diag.URL = "/app/customers/CustomersEdit.aspx?tips=1&CusType=" + cusType + "&Mode=Add&srcForm=" + srcForm + "&productidlist=" + productidlist;
  //}
  //else {
  //    diag.URL = "/app/customers/EnCusEdit.aspx?Mode=Add&srcForm=" + srcForm;
  //}
  diag.show();
}
function AddCus_MobilePhone(custype, srcForm, mobilephone) {
  var diag = new Dialog();
  diag.ID = "CustomersEdit";
  diag.Width = 1000;
  diag.Height = 800;
  //if (custype == 2)
  diag.URL = "/app/customers/CustomersEdit.aspx?&CusType=" + custype + "&Mode=Add&srcForm=" + srcForm + "&MobilePhone=" + mobilephone;
  //else
  //    diag.URL = "/app/customers/EnCusEdit.aspx?Mode=Add&srcForm="+srcForm+"&MobilePhone="+mobilephone;
  diag.show();
}
//2018-01-16 qianlong 通过呼叫中心功能去添加的客户，如果是在打完电话后再去新建的客户，此时需要带上通话记录pid，新建完客户之后需要更新对应的通话记录中的客户id
function AddCus_FromCallCenter(custype, srcform, mobilephone, pid) {
  var diag = new Dialog();
  diag.ID = "CustomersEdit";
  diag.Width = 1000;
  diag.Height = 800;
  diag.URL = "/app/customers/CustomersEdit.aspx?&CusType=" + custype + "&Mode=Add&srcForm=" + srcform + "&MobilePhone=" + mobilephone + "&pid=" + pid;
  diag.show();
}
//2018-04-16 qianlong 在通话流水统计中添加客户，并且同时创建跟进记录
function AddCus_FromCallCenterAndAddFollow(custype, srcform, mobilephone, pid) {
  var diag = new Dialog();
  diag.ID = "CustomersEdit";
  diag.Width = 1000;
  diag.Height = 800;
  diag.URL = "/app/customers/CustomersEdit.aspx?&CusType=" + custype + "&Mode=Add&srcForm=" + srcform + "&MobilePhone=" + mobilephone + "&pid=" + pid + "&addfollow=1";
  diag.show();
}

function AddCus(cusType) {
  AddCus_All(cusType, '', '');
}

function EditCus(cusID, viewName, dialogId, callbackFunction) {
  if (viewName == undefined) {
    viewName = "";
  }
  if (typeof (dialogId) == "undefined") {
    dialogId = "";
  }
  if (typeof (callbackFunction) == "undefined") {
    callbackFunction = "";
  }

  var diag = new Dialog();
  diag.ID = "CustomersEdit";
  diag.Width = 1000;
  diag.Height = 800;
  diag.URL = "/app/customers/CustomersEdit.aspx?Mode=Edit&CusID=" + cusID + "&viewname=" + viewName + "&dialogId=" + dialogId + "&callbackFunction=" + callbackFunction;
  //diag.URL = "/app/customers/CusEdit.aspx?CusID=" + cusID;
  diag.show();
}

function OpenCusInfo(cusType, cusID, cusName) {
  var diag = new Dialog();
  diag.ID = "CusParentForm";
  //diag.Top = "114";
  diag.Modal = false;
  diag.Width = 960;
  diag.Height = screen.height - 350;
  diag.URL = "/app/customers/CusDetail.aspx?CusType=" + cusType + "&DialogID=" + diag.ID + "&CusID=" + cusID + "&CusName=" + cusName;
  diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}
function PrintCus(cusid, custype) {
  var diag = new Dialog();
  diag.ID = "PrintSelect";
  diag.Width = 400;
  diag.Height = 125;
  diag.URL = "/app/customers/CusPrintSelect.aspx?CusID=" + cusid + "&CusType=" + custype;
  diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}

//编辑客户信息-列表
function EditCusList(fieldName, parameverValue, cusid, td) {
  var diag = new Dialog();
  diag.ID = "EditCustomersList";
  diag.Width = 400;
  diag.Height = 72;
  diag.URL = "/App/Customers/Edit-List.aspx?fieldName=" + fieldName + "&parameverValue=" + parameverValue + "&CusID=" + cusid + "&td=" + td;
  diag.show();
}

function EditProductSelect(tableID, productIDList, indexID, td) {
  var diag = new Dialog();
  diag.ID = "EditCustomersProduct";
  diag.Width = 600;
  diag.Height = 150;
  diag.URL = "/App/Customers/Edit-Product.aspx?TableID=" + tableID + "&ProductIDList=" + productIDList + "&IndexID=" + indexID + "&td=" + td;
  diag.show();
}

//编辑客户信息-单行
function EditCusText(fieldName, cusid, td) {
  var diag = new Dialog();
  diag.ID = "EditCustomersText";
  diag.Width = 450;
  diag.Height = 72;
  diag.URL = "/App/Customers/Edit-Text.aspx?fieldName=" + fieldName + "&CusID=" + cusid + "&td=" + td;
  diag.show();
}
//编辑客户信息-多行
function EditCusTextArea(fieldName, cusid) {
  var diag = new Dialog();
  diag.ID = "EditCustomersText";
  diag.Width = 500;
  diag.Height = 223;
  diag.URL = "/App/Customers/Edit-Text.aspx?fieldName=" + fieldName + "&CusID=" + cusid + "&TextArea=true";
  diag.show();
}
//编辑客户信息-性别
function EditCusSex(cusid) {
  var diag = new Dialog();
  diag.ID = "EditCustomersSex";
  diag.Width = 330;
  diag.Height = 72;
  diag.URL = "/App/Customers/Edit-Sex.aspx?CusID=" + cusid;
  diag.show();
}
//编辑客户信息-生日
function EditCusBirthday(cusid) {
  var diag = new Dialog();
  diag.ID = "EditCustomersBirthday";
  diag.Width = 400;
  diag.Height = 85;
  diag.URL = "/App/Customers/Edit-Birthday.aspx?CusID=" + cusid;
  diag.show();
}
//编辑相关文档
function EditCusFiles(cusid) {
  var diag = new Dialog();
  diag.ID = "EditCusFiles";
  diag.Width = 350;
  diag.Height = 72;
  diag.URL = "/App/Customers/Edit-Files.aspx?CusID=" + cusid;
  diag.show();
}

function OpenCusLog(cusid, fieldname) {
  var diag = new Dialog();
  diag.ID = "CusLogList";
  diag.Width = 550;
  diag.Height = 200;
  diag.MessageTitle = "历史修改记录";
  diag.Message = "此功能于2013年1月8日上线，只有在此之后的操作才会被记录";
  diag.URL = "/app/customers/log/LogList.aspx?CusID=" + cusid + "&FieldName=" + fieldname;
  diag.OnLoad = function () {
    var h = GetCwinHeight(diag.innerFrame);
    if (h < 200) h = 200;
    diag.setSize(null, h);
  };
  diag.show();
}

//转为公共客户
function ChangeToPublic(idlist, dialogId, callbackFunction) {
  if (typeof (dialogId) == "undefined") {
    dialogId = "";
  }
  if (typeof (callbackFunction) == "undefined") {
    callbackFunction = "";
  }
  var diag = new Dialog();
  diag.ID = "ChangeToPublic";
  diag.Width = 400;
  diag.Height = 215;
  diag.URL = "/app/customers/ChangeToPublic.aspx?idlist=" + idlist + "&dialogId=" + dialogId + "&callbackFunction=" + callbackFunction;
  diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}

//转为其他公客分组
function ChangeToOtherPublicSea(idlist, dialogId, callbackFunction) {
  if (typeof (dialogId) == "undefined") {
    dialogId = "";
  }
  if (typeof (callbackFunction) == "undefined") {
    callbackFunction = "";
  }
  var diag = new Dialog();
  diag.ID = "ChangeToOtherPublicSea";
  diag.Title = "转到其他公客分组";
  diag.Width = 400;
  diag.Height = 215;
  diag.URL = "/app/customers/ChangeToOtherPublicSea.aspx?idlist=" + idlist + "&dialogId=" + dialogId + "&callbackFunction=" + callbackFunction;
  diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}


//领取公共客户
function ReceivePublicCus(idlist, viewName, dialogId, callbackFunction) {
  if (viewName == undefined) {
    viewName = "";
  }
  if (typeof (dialogId) == "undefined") {
    dialogId = "";
  }
  if (typeof (callbackFunction) == "undefined") {
    callbackFunction = "";
  }

  var diag = new Dialog();
  diag.ID = "ReceivePublicCus";
  diag.Width = 400;
  diag.Height = 203;
  diag.URL = "/app/customers/ReceivePublicCus.aspx?idlist=" + idlist + "&viewname=" + viewName + "&dialogId=" + dialogId + "&callbackFunction=" + callbackFunction;
  diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}

function DeleteCus(idlist, returnList, viewName, dialogId, callbackFunction) {
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
  dialog.ID = "CusDelete";
  dialog.Width = 560;
  dialog.Height = 400;
  //dialog.URL = "CusDelete.aspx?idList=" + idlist + "&ReturnList=" + returnList;
  dialog.URL = "/app/customers/CusDeleteNew.aspx?idList=" + idlist + "&ReturnList=" + returnList + "&viewname=" + viewName + "&dialogId=" + dialogId + "&callbackFunction=" + callbackFunction;
  dialog.OnLoad = function () { var h = GetCwinHeight(dialog.innerFrame); dialog.setSize(null, h); };
  dialog.show();
}


function OpenCusContact(id, type) {
  //type:cus 或 linkman
  var dialog = new Dialog();
  dialog.Title = "联系方式";
  dialog.ID = "OpenCusContact";
  dialog.Width = 600;
  dialog.Height = 310;
  var url = type == "cus" ? "/app/customers/Contact/CusContact.aspx?cusid=" + id : "/app/customers/Contact/CusContact.aspx?linkmanid=" + id;
  dialog.URL = url;
  dialog.show();
}

/****联系人部分****/
function LinkManAdd(cusid) {
  LinkManAdd_All('', cusid, '');
}
function LinkManAdd_All(DialogID, cusid, mobilephone) {
  var diag = new Dialog();
  diag.ID = "LinkManEdit";
  diag.Width = 900;
  diag.Height = 375;
  diag.Title = "添加联系人";
  diag.MessageTitle = "添加新联系人";
  diag.Message = "您可以为一个公司添加多个联系人，如张经理，王总等！联系人是指您与该公司的谁进行联系。";
  diag.URL = "/app/customers/linkman/LinkManEdit.aspx?DialogID=" + DialogID + "&Mode=Add&CusID=" + cusid + "&MobilePhone=" + mobilephone;
  //diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}
function LinkManEdit(dialogid, linkID) {
  var diag = new Dialog();
  diag.ID = "LinkManEdit";
  diag.Width = 900;
  diag.Height = 392;
  diag.URL = "/app/customers/linkman/LinkManEdit.aspx?DialogID=" + dialogid + "&Mode=Edit&LinkID=" + linkID;
  diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}
function LinkManDetail(linkID, grantPowerId) {
  var url = "/app/customers/linkman/LinkManDetail.aspx?LinkID=" + linkID;
  //客户授权ID
  if (typeof (grantPowerId) != "undefined" && grantPowerId != 0) {
    url += "&grantpowerid=" + grantPowerId
  }
  var diag = new Dialog();
  diag.ID = "LinkManDetail";
  diag.Width = 960;
  diag.Height = 500;
  diag.URL = url;
  //diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();

  /*parent.CloseLoading();
  var slider = new DialogSlider();
  slider.Title = "联系人详情";
  slider.URL = "/app/customers/linkman/LinkManDetail.aspx?LinkID=" + linkID;
  slider.showSlider();*/
}

//在一级父页编辑
function LinkManParentEdit() {
  var id = GetCheckedID("rptID");
  if (id == "") {
    Dialog.showError("请选择要编辑的记录！");
    return;
  } else if (id.indexOf(',') != -1) {
    Dialog.showError("同时只能编辑一条记录，请只选择一个！");
    return;
  } else {
    LinkManEdit('', id)
  }
}
/****联系人部分结束****/


/*****产品记录******/
function ProductDetail(productid) {
  var url = "/App/#customers-product?mode=detail&productid=" + productid;
  window.open(url);
}
/****产品记录结束****/

/****成交记录部分****/
function DealAdd_All(cusid, srcForm, dialogId, callbackFunction) {
  if (typeof (dialogId) == "undefined") {
    dialogId = "";
  }
  if (typeof (callbackFunction) == "undefined") {
    callbackFunction = "";
  }
  var diag = new Dialog();
  diag.ID = "DealEdit";
  diag.Width = 1200;
  diag.Height = 600;
  diag.Title = "新建成交记录";
  diag.MessageTitle = "新建一条成交订单记录";
  diag.Message = "将新成交的订单在这里记录下来，方便查询和统计，也可以自动提醒";
  diag.URL = "/app/customers/deal/DealEdit2.aspx?Mode=Add&CusID=" + cusid + "&srcForm=" + srcForm + "&currenttime=" + new Date().getTime() + "&dialogId=" + dialogId + "&callbackFunction=" + callbackFunction;
  //diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}
function DealAdd(cusid, dialogId, callbackFunction) {
  if (typeof (dialogId) == "undefined") {
    dialogId = "";
  }
  if (typeof (callbackFunction) == "undefined") {
    callbackFunction = "";
  }
  DealAdd_All(cusid, '', dialogId, callbackFunction);
}
function DealEdit(dialogid, dealID) {
  ////进销存版本需判断是否已经发货，已发货的不允许编辑
  //$.ajax({
  //    type: "GET",
  //    async: true, //同步执行
  //    url: "/app/ajax/GetDealIsOut.aspx?DealID=" + dealID,
  //    cache: false,
  //    dataType: "text", //返回数据形式为text
  //    success: function (result) {
  //        if (result!="0") {
  //            Dialog.showError("已执行流程或已发货的订单不允许修改！");
  //            return;
  //        }
  //        else {
  //            var diag = new Dialog();
  //            diag.ID = "DealEdit";
  //            diag.Width = 1100;
  //            diag.Height = 600;
  //            diag.Title = "编辑成交记录";
  //            diag.URL = "/app/customers/deal/DealEdit2.aspx?DialogID=" + dialogid + "&Mode=Edit&DealID=" + dealID + "&currenttime=" + new Date().getTime();
  //            diag.show();
  //        }
  //    },
  //    error: function (errorMsg) {
  //        alert("修改订单失败，请联系管理员");
  //    }
  //});

  //选择产品模块换上了进销存上的新模块，可以修改除产品成交个数以外的信息了
  var diag = new Dialog();
  diag.ID = "DealEdit";
  diag.Width = 1200;
  diag.Height = 600;
  diag.Title = "编辑成交记录";
  diag.URL = "/app/customers/deal/DealEdit2.aspx?DialogID=" + dialogid + "&Mode=Edit&DealID=" + dealID + "&currenttime=" + new Date().getTime();
  diag.show();

}
//销售机会界面新增成交记录
function DealAdd_Odds(cusid, oddsid) {
  var diag = new Dialog();
  diag.ID = "DealEdit";
  diag.Width = 1100;
  diag.Height = 600;
  diag.Title = "新建成交记录";
  diag.MessageTitle = "新建一条成交历史记录";
  diag.Message = "将新成交的订单在这里记录下来，方便查询和统计，也可以自动提醒";
  diag.URL = "/app/customers/deal/DealEdit2.aspx?Mode=Add&CusID=" + cusid + "&OddsID=" + oddsid + "&DialogID=&currenttime=" + new Date().getTime();
  diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}
//产品界面新增成交记录
function DealAdd_Product(productidlist) {
  var diag = new Dialog();
  diag.ID = "DealEdit";
  diag.Width = 1100;
  diag.Height = 600;
  diag.Title = "新建成交记录";
  diag.MessageTitle = "新建一条成交历史记录";
  diag.Message = "将新成交的订单在这里记录下来，方便查询和统计，也可以自动提醒";
  diag.URL = "/app/customers/deal/DealEdit2.aspx?Mode=Add&productlist=" + productidlist + "&currenttime=" + new Date().getTime();
  diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}
//销售机会界面点击跳转到成交记录列表
function OddsGotoDealList(id, action) {
  if (action == "view") {
    Dialog.showError("在此预览界面，支持跳转到成交记录列表");
    return;
  }
  parent.SetLeftTabCSS("deal");
  window.location.href = "/App/customers/deal/index2.aspx?mode=search&selectuserid=3&OddsID=" + id;
}

//在一级父页编辑
function DealParentEdit() {
  var id = GetCheckedID("rptID");
  if (id == "") {
    Dialog.showError("请选择要编辑的记录！");
    return;
  } else if (id.indexOf(',') != -1) {
    Dialog.showError("同时只能编辑一条记录，请只选择一个！");
    return;
  } else {
    DealEdit('', id);
  }
}

//续费
function DealRenew_Edit(dealID) {
  var dialogID = "";
  if (typeof (currentDialogID) != "undefined") dialogID = currentDialogID;
  var diag = new Dialog();
  diag.ID = "DealRenewEdit";
  diag.Width = 1200;
  diag.Height = 600;
  diag.Title = "订单续费";
  diag.URL = "/app/customers/deal/DealEdit2.aspx?Mode=Add&DealID=" + dealID + "&DialogID=" + dialogID + "&currenttime=" + new Date().getTime();
  diag.show();
}

function DealDetail(dealID) {
  var diag = new Dialog();
  diag.ID = "DealDetail";
  diag.Width = 1200;
  diag.Height = 700;
  diag.URL = "/app/customers/Deal/DealDetail2.aspx?DealID=" + dealID;
  //diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}

function DealDetailAss(dealID) {
  var diag = new Dialog();
  diag.ID = "DealDetail";
  diag.Width = 1100;
  diag.Height = 700;
  diag.URL = "/app/customers/Deal/DealDetail2.aspx?DealID=" + dealID;
  //diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}

//2016-05-04 qianlong 添加跳转到回款界面
function DealDetailToBackFunds(dealID, CusId) {
  var diag = new Dialog();
  diag.ID = "DealDetail";
  diag.Width = 1100;
  diag.Height = 700;
  diag.URL = "/app/customers/BackFunds/index_deal.aspx?DealID=" + dealID + "&CusID=" + CusId;
  diag.show();
}

//添加跳转到退款界面
function DealDetailToReFunds(dealID, CusId) {
  var diag = new Dialog();
  diag.ID = "DealDetail";
  diag.Width = 1100;
  diag.Height = 700;
  diag.URL = "/app/customers/ReFunds/index_deal.aspx?DealID=" + dealID + "&CusID=" + CusId;
  diag.show();
}

//添加跳转到退款界面
function DealDetailToFeesInfo(dealID, CusId) {
  var diag = new Dialog();
  diag.ID = "DealDetail";
  diag.Width = 1100;
  diag.Height = 700;
  diag.URL = "/app/customers/FeesNew/index_deal.aspx?DealID=" + dealID + "&CusID=" + CusId;
  diag.show();
}


function DealDetail_TipsMessage(dealID, tipsid) {
  var diag = new Dialog();
  diag.ID = "DealDetail";
  diag.Width = 1100;
  diag.Height = 700;
  diag.URL = "/app/customers/Deal/DealDetail2.aspx?DealID=" + dealID + "&TipsID=" + tipsid;
  //diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}

//打开到期提醒的界面
function DealTipsList() {
  var diag = new Dialog();
  diag.ID = "DealTipsList";
  diag.Width = 1200;
  diag.Height = 700;
  diag.URL = "/app/customers/deal/DealTipsList.aspx";
  //diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}
function DealDelete() {
  parent.CloseLoading();
  var id = GetCheckedID("rptID");
  if (id == "") {
    Dialog.showError("请选择要删除的记录！");
    return;
  }
  //if (confirm('确定要删除选中的记录吗？')) {
  var diag = new Dialog();
  diag.ID = "DealDelete";
  diag.Width = 300;
  diag.Height = 110;
  diag.URL = "/app/customers/Deal/DealDeleteNew.aspx?IDList=" + id;
  diag.show();
  //}
}
function DealExport(selectuserid, cusid, selectTypeID) {
  module.businessExport(14, selectuserid, cusid, selectTypeID);
}
/****成交记录部分结束****/



/*****选择销售机和投诉记录部分*****/
function CheckCus() {
  var cusID = document.getElementById("rptCusID") ? document.getElementById("rptCusID").value : "0";
  if (cusID == "" || cusID == "0") {
    Dialog.showError("请先选择客户！")
    return 0;
  }
  return cusID;
}
function SelectCus2(fromID) {
  var cusType = document.getElementById("rptCusType").value;
  SelectCus(0, '1', 'rptCusID', 'rptCusName', fromID);
}
function selectDeal2(fromID) {
  var cusID = CheckCus();
  if (cusID == 0) return;
  SelectDeal(cusID, 'rptDealID', 'rptDealTitle', fromID);
}
function selectOdds2(fromID) {
  var cusID = CheckCus();
  if (cusID == 0) return;
  SelectOdds(cusID, 'rptOddsID', 'rptOddsText', fromID);
}
function SelectComplaints2(fromID) {
  var cusID = CheckCus();
  if (cusID == 0) return;
  SelectComplaints(cusID, 'rptCompID', 'rptCompText', fromID);
}
function OpenComplaintsDetail() {
  var compID = document.getElementById("rptCompID").value;
  if (compID == "" || compID == "0") {
    Dialog.showError("请先选择投诉记录！");
    return;
  }
  var diag = new Dialog();
  diag.ID = "ComplaintsDetail";
  diag.Width = 960;
  diag.Height = 600;
  diag.URL = "/app/customers/ComplaintsNew/ComplaintsDetail.aspx?CID=" + compID + "&action=view";
  diag.show();
}
function OpenOddsDetail() {
  var oddsID = document.getElementById("rptOddsID").value;
  if (oddsID == "" || oddsID == "0") {
    Dialog.showError("请先选择销售机会！");
    return;
  }
  /*var diag = new Dialog();
  diag.ID = "OddsDetail";
  diag.Width = 800;
  diag.Height = 460;
  diag.URL = "../OddsNew/OddsDetail.aspx?OID=" + oddsID;
  diag.show();*/


  window.open("/App/#customers-odds?mode=odds&oid=" + oddsID);
}
/*****选择销售机和投诉记录部分结束*****/



















/****联系跟进记录部分****/

function FollowAddParentFunction(cusid, functionName, functionParameter, rowIndex, dialogId, callbackFunction) {
  if (typeof (dialogId) == "undefined") {
    dialogId = "";
  }
  if (typeof (callbackFunction) == "undefined") {
    callbackFunction = "";
  }

  var diag = new Dialog();
  diag.ID = "FollowEditNew";
  diag.Width = 900;
  diag.Height = 600;
  diag.Title = "新建联系记录";
  diag.MessageTitle = "新建联系记录";
  diag.Message = "您可以在这里把每次与客户联系的内容记录下来，这样日后可以随时回来查询";
  diag.URL = "/app/Customers/follow/FollowEditNew.aspx?Mode=Add&CusID=" + cusid + "&ContentIframeFunction=" + functionName + "&ContentIframeFuntionParameter=" + functionParameter + "&rowIndex=" + rowIndex + "&dialogId=" + dialogId + "&callbackFunction=" + callbackFunction;
  /*diag.OnLoad = function () {
      var h = GetCwinHeight(diag.innerFrame);
      if (h < 356) h = 356;
      diag.setSize(null, h);
  };*/
  diag.show();
}

function FollowAdd(cusid, linkmanid, tasknodeid, dialogId, callbackFunction) {
  if (typeof (dialogId) == "undefined") {
    dialogId = "";
  }
  if (typeof (callbackFunction) == "undefined") {
    callbackFunction = "";
  }
  FollowAdd2(cusid, linkmanid, tasknodeid, 0, 0, 0, dialogId, callbackFunction);
}

function FollowAdd2(cusid, linkmanid, tasknodeid, complatinsid, tasktype, taskid, dialogid, callbackFunction) {
  if (typeof (dialogId) == "undefined") {
    dialogId = "";
  }
  if (typeof (callbackFunction) == "undefined") {
    callbackFunction = "";
  }

  var timestamp = new Date().getTime();//获取时间戳
  //alert("执行");
  var diag = new Dialog();
  diag.ID = "FollowEditNew";
  diag.Width = 900;
  diag.Height = 600;//chrome浏览器默认363
  diag.URL = "/app/Customers/follow/FollowEditNew.aspx?vt=" + timestamp + "&Mode=Add&CusID=" + cusid + "&linkmanid=" + linkmanid + "&tasknodeid=" + tasknodeid + "&TaskType=" + tasktype + "&TaskID=" + taskid + "&ComplaintsID=" + complatinsid + "&DialogID=" + dialogid + "&callbackFunction=" + callbackFunction;
  diag.show();
}

function FollowAddByCallCenter(pid, cusid) {
  var timestamp = new Date().getTime();//获取时间戳
  var diag = new Dialog();
  diag.ID = "FollowEditNew";
  diag.Width = 900;
  diag.Height = 600;//chrome浏览器默认363
  diag.URL = "/app/Customers/follow/FollowEditNew.aspx?vt=" + timestamp + "Mode=Edit&pid=" + pid + "&CusID=" + cusid;
  diag.show();
}
//2018-01-17 qianlong 在回电界面中查看跟进详情
function FollowDetailByCallCenter(pid) {
  var diag = new Dialog();
  diag.ID = "FollowDetailNew";
  diag.Width = 900;
  diag.Height = 600;
  diag.Title = "详情";
  diag.MessageTitle = "跟进记录详情";
  diag.Message = "在这里，您可以看到此跟进记录的详情内容，并可以为此跟进记录做出批注";
  diag.URL = "/app/Customers/follow/FollowDetailNew.aspx?pid=" + pid;
  diag.show();
}

function FollowAdd3(cusid, linkmanid, tasknodeid, complatinsid, dialogID) {
  var timestamp = new Date().getTime();//获取时间戳
  var diag = new Dialog();
  diag.ID = "FollowEditNew";
  diag.Width = 900;
  diag.Height = 560;
  diag.URL = "/app/Customers/follow/FollowEditNew.aspx?vt=" + timestamp + "&Mode=Add&CusID=" + cusid + "&linkmanid=" + linkmanid + "&tasknodeid=" + tasknodeid + "&ComplaintsID=" + complatinsid + "&DialogID=" + dialogID;
  diag.show();
}

function FollowAdd_Src(cusid, linkmanid, tasknodeid, complatinsid, srcForm) {
  var diag = new Dialog();
  diag.ID = "FollowEditNew";
  diag.Width = 900;
  diag.Height = 560;
  diag.URL = "/app/Customers/follow/FollowEditNew.aspx?Mode=Add&CusID=" + cusid + "&linkmanid=" + linkmanid + "&tasknodeid=" + tasknodeid + "&ComplaintsID=" + complatinsid + "&srcForm=" + srcForm;
  diag.show();
}
//在销售机会界面添加联系跟进
function FollowAdd_Odds(cusid, linkmanid, oddsid) {
  var diag = new Dialog();
  diag.ID = "FollowEditNew";
  diag.Width = 900;
  diag.Height = 560;
  diag.URL = "/app/Customers/follow/FollowEditNew.aspx?Mode=Add&CusID=" + cusid + "&linkmanid=" + linkmanid + "&OddsID=" + oddsid;
  diag.show();
}
//2016-04-18 qianlong
function FollowAdd_OddsNew(cusid, linkmanid, oddsid, DialogId) {
  var diag = new Dialog();
  diag.ID = "FollowEditNew";
  diag.Width = 900;
  diag.Height = 560;
  diag.URL = "/app/Customers/follow/FollowEditNew.aspx?Mode=Add&CusID=" + cusid + "&linkmanid=" + linkmanid + "&OddsID=" + oddsid + "&DialogID=" + DialogId;
  diag.show();
}


function FollowEdit(dialogid, followid, callbackFunction) {
  if (typeof (dialogId) == "undefined") {
    dialogId = "";
  }
  if (typeof (callbackFunction) == "undefined") {
    callbackFunction = "";
  }

  var diag = new Dialog();
  diag.ID = "FollowEditNew";
  diag.Width = 900;
  diag.Height = 600;
  diag.URL = "/app/Customers/follow/FollowEditNew.aspx?DialogID=" + dialogid + "&Mode=Edit&FollowID=" + followid + "&callbackFunction=" + callbackFunction;
  diag.show();
}

//在一级父页编辑
function FollowParentEdit() {
  var id = GetCheckedID("rptID");
  if (id == "") {
    Dialog.showError("请选择要编辑的记录！");
    return;
  } else if (id.indexOf(',') != -1) {
    Dialog.showError("同时只能编辑一条记录，请只选择一个！");
    return;
  } else {
    FollowEdit('', id);
  }
}

function FollowDetail(followID) {
  var diag = new Dialog();
  diag.ID = "FollowDetailNew";
  diag.Width = 900;
  diag.Height = 600;
  diag.Title = "详情";
  diag.MessageTitle = "跟进记录详情";
  diag.Message = "在这里，您可以看到此跟进记录的详情内容，并可以为此跟进记录做出批注";
  diag.URL = "/app/Customers/follow/FollowDetailNew.aspx?FollowID=" + followID;
  //diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}
//系统消息处打开详细，要传统tipsid过去
function FollowDetail_TipsMessage(followID, tipsid) {
  var diag = new Dialog();
  diag.ID = "FollowDetailNew";
  diag.Width = 900;
  diag.Height = 600;
  diag.Title = "详情";
  diag.MessageTitle = "跟进记录详情";
  diag.Message = "在这里，您可以看到此跟进记录的详情内容，并可以为此跟进记录做出批注";
  diag.URL = "/app/Customers/follow/FollowDetailNew.aspx?FollowID=" + followID + "&TipsID=" + tipsid;
  diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}
//新建任务  src 为来源
/*function FollowTaskAdd(cusid,linkmanid,srcForm){
    var diag = new Dialog();
    diag.ID = "FollowTaskEdit";
    diag.Width = 650;
    diag.Height = 316;
    diag.MessageTitle = "新建一个客户联系的计划任务";
    diag.Message = "在这里，您可以设定某个客户的下次联系时间，这样到时系统就会提醒您。<a href=\"http://bbs.kehu51.com/help/thread-109-1-1.html\" target=\"_blank\">初次使用请查看帮助</a>";
    diag.URL = "/app/Customers/task/follow/FollowTaskEdit.aspx?Mode=Add&CusID=" + cusid + "&linkmanid=" + linkmanid + "&srcFrom=" + srcForm;
    diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
    diag.show();
}*/


//新建待办任务 2013-7-29
function WaitTaskEdit(mode, cusid, linkmanid, srcForm, dialogId, callbackFunction) {
  if (typeof (dialogId) == "undefined") {
    dialogId = "";
  }
  if (typeof (callbackFunction) == "undefined") {
    callbackFunction = "";
  }

  var timestamp = new Date().getTime();//获取时间戳
  var diag = new Dialog();
  diag.ID = "WaitTaskEdit";
  diag.Width = 900;
  diag.Height = 510;
  diag.Title = "待办任务";
  diag.MessageTitle = "新建一个待办任务";
  diag.Message = "您可以将要办的事情在这里新建为任务，到时系统就会提醒您，也可以给下级分配工作任务(团队版)。<a href=\"http://bbs.kehu51.com/Notice/thread-3267-1-1.html\" target=\"_blank\">初次使用请查看帮助</a>";
  diag.URL = "/app/tools/WaitTask/WaitTaskEdit.aspx?vt=" + timestamp + "&Mode=" + mode + "&CusID=" + cusid + "&linkmanid=" + linkmanid + "&srcFrom=" + srcForm + "&DialogID=" + dialogId + "&callbackFunction=" + callbackFunction;
  diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}

function WaitTaskAddByDay(mode, day, srcForm) {
  var timestamp = new Date().getTime();//获取时间戳
  var diag = new Dialog();
  diag.ID = "WaitTaskEdit";
  diag.Width = 900;
  diag.Height = 400;
  diag.Title = "待办任务";
  diag.MessageTitle = "新建一个待办任务";
  diag.Message = "您可以将要办的事情在这里新建为任务，到时系统就会提醒您，也可以给下级分配工作任务(团队版)。<a href=\"http://bbs.kehu51.com/Notice/thread-3267-1-1.html\" target=\"_blank\">初次使用请查看帮助</a>";
  diag.URL = "/app/tools/WaitTask/WaitTaskEdit.aspx?vt=" + timestamp + "&Mode=" + mode + "&day=" + day + "&srcFrom=" + srcForm;
  diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}

//批量新建待办任务 2013-8-14
function WaitTaskEditAll(cusidlist, srcForm, viewName) {
  var timestamp = new Date().getTime();//获取时间戳
  var diag = new Dialog();
  diag.ID = "WaitTaskEdit";
  diag.Width = 800;
  diag.Height = 400;
  diag.Title = "待办任务";
  diag.MessageTitle = "批量新建待办任务";
  diag.Message = "您可以将要办的事情在这里新建为任务，到时系统就会提醒您，也可以给下级分配工作任务(团队版)。<a href=\"http://bbs.kehu51.com/Notice/thread-3267-1-1.html\" target=\"_blank\">初次使用请查看帮助</a>";
  diag.URL = "/app/tools/WaitTask/WaitTaskEdit.aspx?vt=" + timestamp + "&Mode=Add&cusidlist=" + cusidlist + "&srcFrom=" + srcForm + "&viewName=" + viewName;
  diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}

function BatchFollowTaskAdd(cusidlist) {
  var diag = new Dialog();
  diag.ID = "FollowTaskEdit";
  diag.Width = 650;
  diag.Height = 316;
  diag.MessageTitle = "批量新建联系计划";
  diag.Message = "在这里，您可以设定某个客户的下次联系时间，这样到时系统就会提醒您。<a href=\"http://bbs.kehu51.com/help/thread-109-1-1.html\" target=\"_blank\">初次使用请查看帮助</a>";
  diag.URL = "/app/Customers/task/follow/FollowTaskEdit.aspx?Mode=Add&CusIDList=" + cusidlist;
  diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}
//2016-12-05 qianlong 任务-日历模式下显示新建的按钮
function showAddButton(tag) {
  if (document.getElementById("addButton" + tag))
    document.getElementById("addButton" + tag).style.display = "";
}
function hiddenAddButton(tag) {
  if (document.getElementById("addButton" + tag))
    document.getElementById("addButton" + tag).style.display = "none";
}

//打开联系跟进任务窗口
function FollowTask(cusid, cusname) {
  var diag = new Dialog();
  diag.ID = "FollowTask";
  diag.Width = 800;
  diag.Height = 400;
  diag.URL = "/app/Customers/task/follow/index_cus.aspx?CusID=" + cusid + "&CusName=" + cusname;
  diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}
//打开任务详细信息窗口  type的值为 task 或 tasknode
/*function TaskDetail(id,type) {
   var diag = new Dialog();
   diag.ID = "TaskDetail";
   //diag.Modal = false;
   diag.Width = 600;
   diag.Height = 320;
   diag.URL = "/app/customers/task/follow/TaskDetail.aspx?id=" + id + "&type=" + type;
   diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
   diag.show();
}*/

//单个取消任务
/*function CloseLink(nodeid) {
    parent.CloseLoading();
    if (confirm('确定要取消本次联系计划吗？')) {

        var diag = new Dialog();
        diag.ID = "CliseLink";
        diag.Modal = false;
        diag.Width = 300;
        diag.Height = 150;
        diag.URL = "/app/customers/task/follow/CloseLink.aspx?idlist=" + nodeid;
        diag.show();
    }
}
function CloseLink2(nodeid,formName) {
    parent.CloseLoading();
    if (confirm('确定要取消本次联系计划吗？')) {

        var diag = new Dialog();
        diag.ID = "CliseLink";
        diag.Modal = false;
        diag.Width = 300;
        diag.Height = 150;
        diag.URL = "/app/customers/task/follow/CloseLink.aspx?idlist=" + nodeid+"&FormName="+formName;
        diag.show();
    }
}


//批量取消任务
function CloseLinkAll() {
    parent.CloseLoading();
    if (confirm('确定要取消本次联系计划吗？')) {
        var id = GetCheckedID("rptID");
        if (id == "") {
           Dialog.alert("请选择要忽略的联系计划！");
           return;
        }

        var diag = new Dialog();
        diag.ID = "CliseLink";
        diag.Width = 300;
        diag.Height = 150;
        diag.URL = "/app/customers/task/follow/CloseLink.aspx?idlist=" + id;
        diag.show();
    }
}*/






//2013-8-1新的任务详情
/*function WaitTaskDetail(id, type) {
    var diag = new Dialog();
    diag.ID = "TaskDetail";
    diag.Width = 900;
    diag.Height = 700;
    //diag.URL = "/app/tools/WaitTask/WaitTaskEdit.aspx?Mode=Add&CusID=0&linkmanid=0&srcFrom=undefined";
    diag.Title = "任务详情";
    //diag.URL = "/app/tools/waittask/TaskDetail.aspx?id=" + id + "&type=" + type;
    diag.URL = "/app/tools/waittask/TaskDetailNew.aspx?id=" + id + "&type=" + type;
    //diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
    diag.show();
}*/
//2017-09-19 qianlong 任务详情界面
function ShowWaitTaskDetail(taskid, nodeID, dialog) {
  var diag = new Dialog();
  diag.ID = "TaskDetail";
  diag.Width = 1100;
  diag.Height = 700;
  diag.Title = "任务详情";
  diag.URL = "/app/tools/waittask/WaitTaskDetail.aspx?taskid=" + taskid + "&nodeid=" + nodeID + "&dialog=" + dialog;
  diag.show();
}

//2016-12-05 任务的日历模式
function WaitTaskDetailCalendar(id, type, dialog) {
  var diag = new Dialog();
  diag.ID = "TaskDetail";
  diag.Width = 900;
  diag.Height = 600;
  diag.Title = "任务详情";
  //diag.URL = "/app/tools/WaitTask/WaitTaskEdit.aspx?Mode=Add&CusID=0&linkmanid=0&srcFrom=undefined";
  diag.URL = "/app/tools/waittask/TaskDetail.aspx?id=" + id + "&type=" + type + "&dialog=" + dialog;
  //diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}
//2017-09-20 qianlong 任务详情界面
function ShowWaitTaskDetailCalendar(taskid, nodeid, dialog) {
  var diag = new Dialog();
  diag.ID = "TaskDetail";
  diag.Width = 900;
  diag.Height = 700;
  diag.Title = "任务详情";
  diag.URL = "/app/tools/waittask/WaitTaskDetail.aspx?taskid=" + taskid + "&nodeid=" + nodeid + "&dialog=" + dialog;
  diag.show();
}







//查看指定客户历史联系记录【任务中心用到的】
function OpenFollowList(cusid) {
  var diag = new Dialog();
  diag.ID = "OpenFollowList";
  diag.Width = 1000;
  diag.Height = 750;
  diag.URL = "/app/customers/follow/openfollowlist.aspx?cusid=" + cusid;
  /*diag.OnLoad = function () {
      var h = GetCwinHeight(diag.innerFrame);
      if (h < 300) h = 300;
      diag.setSize(null, h);
  };*/
  diag.show();
}




//联系跟进导出
function FollowExport(selectuserid, cusid, selectTypeID) {
  module.businessExport(28, selectuserid, cusid, selectTypeID);
}


/****联系跟进记录部分结束****/



/****客户投诉部分****/
function ComplaintsAdd(cusid) {
  var diag = new Dialog();
  diag.ID = "ComplaintsEdit";
  diag.Width = 1000;
  diag.Height = 700;
  diag.URL = "/app/Customers/ComplaintsNew/ComplaintsEdit.aspx?Mode=Add&CusID=" + cusid;
  diag.OnLoad = function () {
    var h = GetCwinHeight(diag.innerFrame);
    diag.setSize(null, h);
  };
  diag.show();
}
//在一级父页编辑
function ComplaintsParentEdit() {
  var id = GetCheckedID("rptID");
  if (id == "") {
    Dialog.showError("请选择要编辑的记录！");
    return;
  } else if (id.indexOf(',') != -1) {
    Dialog.showError("同时只能编辑一条记录，请只选择一个！");
    return;
  } else {
    ComplaintsEdit('', id);
  }
}
function ComplaintsEdit(dialogid, cid) {
  var diag = new Dialog();
  diag.ID = "ComplaintsEdit";
  diag.Width = 1000;
  diag.Height = 700;
  diag.URL = "/app/Customers/ComplaintsNew/ComplaintsEdit.aspx?DialogID=" + dialogid + "&Mode=Edit&CID=" + cid;
  diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}
function ComplaintsDetail(cid) {
  var diag = new Dialog();
  diag.ID = "ComplaintsDetail";
  diag.Width = 1000;
  diag.Height = 600;
  diag.URL = "/app/Customers/ComplaintsNew/ComplaintsDetail.aspx?CID=" + cid + "&action=view";
  //diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}
function ComplaintsDelete() {
  var strID = GetCheckedID("rptID");
  if (strID == "") {
    Dialog.showError("请选择您要删除的记录！");
    return false;
  } else if (!showError("确定要删除选定的记录吗？")) return false;
}
/****客户投诉部分结束****/




/****销售机会部分****/
function OddsAdd_All(cusid, srcForm) {
  var diag = new Dialog();
  diag.ID = "OddsEdit";
  diag.Width = 1000;
  diag.Height = 600;
  diag.Title = "新建销售机会";
  diag.MessageTitle = "新建一个机会";
  diag.Message = "在这里，您可以将您觉得可能成交的一个机会记录下来，这样日后可以对这个机会进行跟踪";
  diag.URL = "/app/Customers/OddsNew/OddsEdit.aspx?Mode=Add&CusID=" + cusid + "&srcForm=" + srcForm;
  diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}
function OddsAdd(cusid) {
  OddsAdd_All(cusid, '');
}

function OddsDetail(oID) {
  /*var diag = new Dialog();
  diag.ID = "OddsDetail";
  diag.Width = 960;
  diag.Height = 500;
  diag.URL = "/app/Customers/Odds/OddsDetail.aspx?Action=view&OID=" + oID;
  //diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();*/

  window.open("/App/#customers-odds?mode=odds&oid=" + oID);
}
//2018-02-06 qianlong 添加销售机会的跳转
function OddsDetail_TipsMessage(oid, tipsid) {
  window.open("/App/#customers-odds?mode=oddstips&oid=" + oid + "&tipsid=" + tipsid);
}

function OddsEdit(dialogid, oid) {
  var diag = new Dialog();
  diag.ID = "OddsEdit";
  diag.Width = 1000;
  diag.Height = 600;
  diag.URL = "/app/Customers/Oddsnew/OddsEdit.aspx?DialogID=" + dialogid + "&Mode=Edit&OID=" + oid;
  diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}

//在一级父页编辑
function OddsParentEdit() {
  var id = GetCheckedID("rptID");
  if (id == "") {
    Dialog.alert("请选择要编辑的记录！");
    return;
  } else if (id.indexOf(',') != -1) {
    Dialog.alert("同时只能编辑一条记录，请只选择一个！");
    return;
  } else {
    OddsEdit('', id);
  }
}

function OddsDelete() {
  var strID = GetCheckedID("rptID");
  if (strID == "") {
    Dialog.showError("请选择您要删除的记录！");
    return false;
  } else if (!confirm("确定要删除选定的记录吗？")) return false;
}


/****费用收支记录部分****/
function FeesAdd(cusid, dealid) {
  var dialogid = "";
  try {
    dialogid = currentDialogID;
  } catch (err) { }

  var diag = new Dialog();
  diag.ID = "FeesEdit";
  diag.Width = 1000;
  diag.Height = 600;
  diag.MessageTitle = "新建一个费用收支记录";
  diag.Message = "在这里，您可以将您的收取和支出的费用进行详细记录。";
  diag.URL = "/app/Customers/FeesNew/FeesEdit.aspx?Mode=Add&CusID=" + cusid + "&DealID=" + dealid + "&DialogID=" + dialogid;
  //diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}



function FeesStatistics(cusid, linkmanid) {
  var diag = new Dialog();
  diag.ID = "FeesStatistics";
  diag.Width = 500;
  diag.Height = 300;
  diag.URL = "/app/Customers/Fees/FeesStatistics.aspx?CusID=" + cusid + "&LinkManID=" + linkmanid;
  diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}

//2016-12-09 qianlong
function FeesMove() {
  var diag = new Dialog();
  diag.ID = "FeesMove";
  diag.Width = 800;
  diag.Height = 300;
  diag.URL = "/app/Customers/FeesNew/FeesMove.aspx";
  diag.Title = "数据转移";
  diag.Message = "将原费用收支记录数据，转移到现有费用收支记录中，以便在新的费用收支系统中可以查看原费用收支记录";
  //diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}
//2016-12-07 qianlong
function FeesDelete() {
  var dialogid = "";
  try {
    dialogid = currentDialogID;
  } catch (err) { }

  parent.CloseLoading();
  var idList = GetCheckedID("rptID");
  if (idList == "") {
    Dialog.showError("请选择要删除的记录！");
    return;
  }
  if (!confirm('删除后将无法恢复，确定要删除吗？')) return;

  var diag = new Dialog();
  diag.ID = "FeesDelete";
  diag.Width = 300;
  diag.Height = 110;
  diag.URL = "/app/Customers/FeesNew/FeesDelete.aspx?idlist=" + idList + "&DialogID=" + dialogid;
  diag.show();
}

function FeesDetail(fid) {
  var diag = new Dialog();
  diag.ID = "FeesDetail";
  diag.Width = 1000;
  diag.Height = 700;
  diag.URL = "/app/Customers/FeesNew/FeesDetail.aspx?FID=" + fid;
  diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}

function FeesEdit(fid) {
  parent.CloseLoading();
  if (fid == undefined) {
    var strID = GetCheckedID("rptID");
    if (strID == "") {
      Dialog.showError("未选择任何记录！");
      return;
    } else if (strID.split(',').length != 1) {
      Dialog.showError("您只能同时选择一条记录进行编辑！");
      return;
    }

    fid = strID;
  }
  var dialogid = "";
  try {
    dialogid = currentDialogID;
  } catch (err) { }

  var diag = new Dialog();
  diag.ID = "FeesEdit";
  diag.Width = 1000;
  diag.Height = 600;
  diag.URL = "/app/Customers/FeesNew/FeesEdit.aspx?Mode=Edit&FID=" + fid + "&DialogID=" + dialogid;
  //diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}

/****费用收支记录部分结束****/

/********客户生日处理部分********/
function BirthdayWork(mode, birid, startDate, endDate) {
  var diag = new Dialog();
  diag.ID = "BirthdayWork";
  //diag.Modal = false;
  diag.Width = 600;
  diag.Height = 350;
  diag.URL = "/app/customers/care/birthdaywork.aspx?mode=" + mode + "&BirID=" + birid + "&StartDate=" + startDate + "&EndDate=" + endDate;
  diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}
function CloseBirthdayWork(birid, startDate, endDate) {
  parent.CloseLoading();
  if (confirm('确定要忽略本次客户生日吗？')) {
    var diag = new Dialog();
    diag.ID = "CloseBirthdayWork";
    //diag.Modal = false;
    diag.Width = 300;
    diag.Height = 150;
    diag.URL = "/app/Customers/Care/CloseBirthday.aspx?birid=" + birid + "&StartDate=" + startDate + "&EndDate=" + endDate;
    diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
    diag.show();
  }

}


//转到客户详情【在其它记录列表界面，如果有企业客户用到】
function GotoCusDetail(id, grantPowerId) {

  //parent.SetTopMenu("customers-mycus");
  //parent.document.getElementById("rptContentIframe").src = "/app/customers/cusdetail.aspx?cusid=" + id;
  var url = "/App/#customers-mycus?mode=cus&cusid=" + id;
  //客户授权ID
  if (typeof (grantPowerId) != "undefined" && grantPowerId != 0) {
    url += "&grantpowerid=" + grantPowerId
  }
  window.open(url);

  /*var url = parent.location.href.toLocaleLowerCase();
  if (url.indexOf("#customers-") != -1) { //如果是在我的客户
      parent.SetLeftTab2('mycus');
      window.location.href = "/app/customers/cusdetail.aspx?cusid=" + id;
  } else {
      window.location.href = "/app/#customers-mycus?mode=cus&cusid=" + id;
  }*/
}


//客户资料的快捷预览，比如CusView.aspx界面右侧
function CusDetailPreview(module, cususerid, custype) {
  var diag = new Dialog();
  diag.ID = "CusDetailPreview";
  diag.Width = 550;
  diag.Height = 580;
  diag.MessageTitle = "客户简要内容自定义";
  diag.Message = "将客户资料中感兴趣的直接显示在这个界面上。当前自定义<font color=red><b>" + (custype == 1 ? "企业客户" : "个人客户") + "</b></font>显示内容";
  diag.URL = "/app/module/CusDetailPreview/CusDetailPreviewIndex.aspx?module=" + module + "&cusUserID=" + cususerid + "&custype=" + custype;
  //diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}

function CusDetailPreviewOnDetail(module, cususerid, custype) {
  var diag = new Dialog();
  diag.ID = "CusDetailPreview";
  diag.Width = 550;
  diag.Height = 580;
  diag.MessageTitle = "客户基本信息自定义";
  diag.Message = "可以将不需要关注的内容取消显示。";
  diag.URL = "/app/module/CusDetailPreview/CusDetailPreview.aspx?module=" + module + "&cusUserID=" + cususerid + "&custype=" + custype;
  //diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}


/*********款项收支部分start************/
function FundsAdd(dealid, cusid) {
  var diag = new Dialog();
  diag.ID = "FundsEdit";
  diag.Width = 900;
  diag.Height = 600;
  diag.URL = "/app/customers/funds/fundsedit.aspx?mode=Add&cusid=" + cusid + "&dealid=" + dealid;
  //diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}



function BackFundsAdd(dealid, cusid, dialogId, callbackFunction) {
  if (typeof (dialogId) == "undefined") {
    dialogId = "";
  }
  if (typeof (callbackFunction) == "undefined") {
    callbackFunction = "";
  }
  if (dialogId == "") {
    try {
      dialogId = currentDialogID;
    } catch (err) { }
  }

  //2017-06-20 lijingbo 新增回款时校验回款比例是否已经是100%，如果是不允许继续回款
  if (dealid != 0 && CheckBackFundsAdd(dealid)) {
    Dialog.showError("该订单的款项已经全部回完，无需再进行回款！");
    return false;
  }

  var diag = new Dialog();
  //diag.MessageTitle = "新建收款记录";
  diag.Message = "在这里，记录下客户每笔订单的收款记录，以后可以方便的进行统计和查询";
  diag.ID = "BackFundsEdit";
  diag.Width = 1000;
  diag.Height = 600;
  diag.URL = "/app/customers/backfunds/backfundsedit.aspx?mode=Add&cusid=" + cusid + "&dealid=" + dealid + "&DialogID=" + dialogId + "&callbackFunction=" + callbackFunction;
  diag.show();
}

//2017-06-20 lijingbo 新增回款时校验回款比例是否已经是100%
function CheckBackFundsAdd(dealid) {
  //var backFundsProportion = Kehu51.Team.UI.Web.App.Ajax.GetBackFundsProportion.GetBackFundsProportionDecimal(dealid).value;
  var backFundsProportion = 0;
  $.ajax({
    url: "/app/ajax/GetBackFundsProportion.aspx",
    type: "GET",
    async: false, //同步执行
    data: { dealid: dealid },
    success: function (res) {
      backFundsProportion = res;
    }
  });
  if (backFundsProportion >= 100) {
    return true;
  }
  else {
    return false;
  }
}

function BackFundsEdit(backid) {
  var diag = new Dialog();
  //diag.MessageTitle = "新建收款记录";
  diag.Message = "在这里，记录下客户每笔订单的收款记录，以后可以方便的进行统计和查询";
  diag.ID = "BackFundsEdit";
  diag.Width = 900;
  diag.Height = 600;
  diag.URL = "/app/customers/backfunds/backfundsedit.aspx?mode=Edit&backid=" + backid + "&DialogID=" + currentDialogID;
  diag.show();
}

function CheckedBackFundsEdit() {
  var strID = GetCheckedID("rptID");
  if (strID == "") {
    Dialog.showError("未选择任何记录！");
    return;
  } else if (strID.split(',').length != 1) {
    Dialog.showError("您只能同时选择一条记录进行编辑！");
    return;
  }
  BackFundsEdit(strID);
}

function BackFundsDetail(backid) {
  var diag = new Dialog();
  diag.ID = "BackFundsDetail";
  diag.URL = "/app/customers/backfunds/backfundsdetail.aspx?backid=" + backid;
  diag.show();
}

function BackFundsDetailAss(backid) {
  var diag = new Dialog();
  diag.ID = "BackFundsDetail";
  diag.Width = 900;
  diag.Height = 600;
  diag.URL = "/app/customers/backfunds/backfundsdetail.aspx?backid=" + backid;
  diag.show();
}

function BackFundsDetail_TipsMessage(backid, tipsid) {
  var diag = new Dialog();
  diag.ID = "BackFundsDetail";
  diag.Width = 900;
  diag.Height = 600;
  diag.URL = "/app/customers/backfunds/backfundsdetail.aspx?backid=" + backid + "&TipsID=" + tipsid;
  diag.show();
}

function BackFundsCheckedDelete() {
  parent.CloseLoading();
  var idList = GetCheckedID("rptID");
  if (idList == "") {
    Dialog.showError("请选择要删除的记录！");
    return;
  }
  BackFundsDelete(idList, 'refresh');
}

//returnAction: refresh表示刷父页,list表示转到列表界面
function BackFundsDelete(idlist, returnAction) {
  parent.CloseLoading();
  if (!confirm('删除后将无法恢复，确定要删除吗？')) return;

  var diag = new Dialog();
  diag.ID = "BackFundsDelete";
  diag.Width = 300;
  diag.Height = 110;
  diag.URL = "/app/customers/backfunds/backfundsdelete.aspx?idlist=" + idlist + "&returnaction=" + returnAction + "&DialogID=" + currentDialogID;
  diag.show();
}

function BackFundsSyncFeesList() {
  var diag = new Dialog();
  diag.ID = "BackFundsSyncFeesList";
  diag.Width = 400;
  diag.Height = 130;
  diag.URL = "/app/customers/feesnew/backfundssyncfeeslist.aspx";
  diag.Message = "将原来的回款记录同步到费用收支中";
  diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}

function BackFundsExport(selectuserid, cusid, selectTypeID) {
  module.businessExport(85, selectuserid, cusid, selectTypeID);
}
/*********款项部分end************/

/*********退款管理模块start************/
function ReFundsAdd(dealid, cusid) {

  var dialogid = "";
  try {
    dialogid = currentDialogID;
  } catch (err) { }



  var diag = new Dialog();
  //diag.MessageTitle = "新建收款记录";
  diag.Message = "在这里，记录下客户每笔订单的退款记录，以后可以方便的进行统计和查询";
  diag.ID = "ReFundsEdit";
  diag.Width = 1000;
  diag.Height = 600;
  diag.URL = "/app/customers/refunds/refundsedit.aspx?mode=Add&cusid=" + cusid + "&dealid=" + dealid + "&DialogID=" + dialogid;
  diag.show();
}
function ReFundsEdit(reid) {
  var diag = new Dialog();
  //diag.MessageTitle = "新建收款记录";
  diag.Message = "在这里，记录下客户每笔订单的退款记录，以后可以方便的进行统计和查询";
  diag.ID = "ReFundsEdit";
  diag.Width = 900;
  diag.Height = 600;
  diag.URL = "/app/customers/refunds/refundsedit.aspx?mode=Edit&reid=" + reid + "&DialogID=" + currentDialogID;
  diag.show();
}

function CheckedReFundsEdit() {
  var strID = GetCheckedID("rptID");
  if (strID == "") {
    Dialog.showError("未选择任何记录！");
    return;
  } else if (strID.split(',').length != 1) {
    Dialog.showError("您只能同时选择一条记录进行编辑！");
    return;
  }
  ReFundsEdit(strID);
}

function ReFundsDetail(reid) {
  var diag = new Dialog();
  diag.ID = "ReFundsDetail";
  diag.Width = 900;
  diag.Height = 600;
  diag.URL = "/app/customers/refunds/refundsdetail.aspx?reid=" + reid;
  diag.show();
}

function ReFundsDetail_TipsMessage(reid, tipsid) {
  var diag = new Dialog();
  diag.ID = "ReFundsDetail";
  diag.Width = 900;
  diag.Height = 600;
  diag.URL = "/app/customers/refunds/refundsdetail.aspx?reid=" + reid + "&TipsID=" + tipsid;
  diag.show();
}

function ReFundsCheckedDelete() {
  parent.CloseLoading();
  var idList = GetCheckedID("rptID");
  if (idList == "") {
    Dialog.showError("请选择要删除的记录！");
    return;
  }
  ReFundsDelete(idList, 'refresh');
}

//returnAction: refresh表示刷父页,list表示转到列表界面
function ReFundsDelete(idlist, returnAction) {
  parent.CloseLoading();
  if (!confirm('删除后将无法恢复，确定要删除吗？')) return;

  var diag = new Dialog();
  diag.ID = "ReFundsDelete";
  diag.Width = 300;
  diag.Height = 110;
  diag.URL = "/app/customers/refunds/refundsdelete.aspx?idlist=" + idlist + "&returnaction=" + returnAction + "&DialogID=" + currentDialogID;
  diag.show();
}

function ReFundsExport(selectuserid, cusid, selectTypeID) {
  module.businessExport(127, selectuserid, cusid, selectTypeID);
}

/*********退款管理模块end************/

/*********开票************/

function PurchaseDetail(purchaseID) {
  var url = gethost();

  var diag = new Dialog();
  diag.ID = "PurchaseDetail";
  diag.Width = 1000;
  diag.Height = 650;
  diag.URL = url + "/Page/Purchase/PurchaseDetail.aspx?PurchaseID=" + purchaseID;
  diag.show();
}

/*********开票end************/

/*********开票************/

function InvoiceDetail(invoiceID) {
  var url = gethost();

  var diag = new Dialog();
  diag.ID = "InvoiceDetail";
  diag.Width = 1000;
  diag.Height = 650;
  diag.URL = url + "/Page/Invoice/InvoiceDetail.aspx?invoiceid=" + invoiceID;
  //diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}

function DealDetailToInvoice(dealID, CusId) {
  var url = gethost();

  var diag = new Dialog();
  diag.ID = "DealDetail";
  diag.Width = 1000;
  diag.Height = 650;
  diag.URL = url + "/Page/Invoice/index_deal.aspx?DealID=" + dealID + "&CusID=" + CusId;
  //diag.URL = "/app/customers/Invoice/index_deal.aspx?DealID=" + dealID + "&CusID=" + CusId;
  diag.show();
}


function InvoiceBackList(backID) {
  var url = gethost();

  var diag = new Dialog();
  diag.ID = "InvoiceList";
  diag.Width = 1000;
  diag.Height = 650;
  diag.URL = url + "/Page/Invoice/index_back.aspx?BackID=" + backID;
  //diag.URL = "/app/customers/Invoice/index_back.aspx?BackID=" + backID;
  diag.show();
}

/*********开票end************/

/*********发货************/
function GoodsOutAdd(dealid, cusid) {
  var url = gethost();

  var diag = new Dialog();
  diag.ID = "GoodsOutEdit";
  diag.Width = 1000;
  diag.Height = 650;
  diag.Title = "新增发货记录";
  //diag.MessageTitle = "新增发货记录";
  diag.Message = "在这里，记录下每笔发货记录，以后可以方便的进行统计和查询";
  diag.URL = url + "/Page/GoodsOut/GoodsOutEdit.aspx?mode=Add&cusid=" + cusid + "&dealid=" + dealid + "&DialogID=" + currentDialogID;;
  diag.show();
}

function GoodsOutDetail(outID) {
  var url = gethost();

  var diag = new Dialog();
  diag.ID = "GoodsOutDetail";
  diag.Width = 1000;
  diag.Height = 650;
  diag.URL = url + "/Page/GoodsOut/GoodsOutDetail.aspx?outid=" + outID;
  //diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}

function DealDetailToGoodsOut(dealID, CusId) {
  var url = gethost();

  var diag = new Dialog();
  diag.ID = "DealDetail";
  diag.Width = 1000;
  diag.Height = 650;
  diag.URL = url + "/Page/GoodsOut/index_deal.aspx?DealID=" + dealID + "&CusID=" + CusId;
  //diag.URL = "/app/customers/Invoice/index_deal.aspx?DealID=" + dealID + "&CusID=" + CusId;
  diag.show();
}
/*********发货end************/

/*********退货************/
function GoodsInAdd(dealid, cusid) {
  var url = gethost();

  var diag = new Dialog();
  diag.ID = "GoodsInEdit";
  diag.Width = 1000;
  diag.Height = 650;
  diag.Title = "新增退货记录";
  //diag.MessageTitle = "新增发货记录";
  diag.Message = "在这里，记录下每笔退货记录，以后可以方便的进行统计和查询";
  diag.URL = url + "/Page/GoodsIn/GoodsInEdit.aspx?mode=Add&cusid=" + cusid + "&dealid=" + dealid + "&DialogID=" + currentDialogID;;
  diag.show();
}

function GoodsInDetail(inID) {
  var url = gethost();

  var diag = new Dialog();
  diag.ID = "GoodsInDetail";
  diag.Width = 1000;
  diag.Height = 650;
  diag.URL = url + "/Page/GoodsIn/GoodsInDetail.aspx?inid=" + inID;
  //diag.OnLoad = function () { var h = GetCwinHeight(diag.innerFrame); diag.setSize(null, h); };
  diag.show();
}

function DealDetailToGoodsIn(dealID, CusId) {
  var url = gethost();

  var diag = new Dialog();
  diag.ID = "DealDetail";
  diag.Width = 1000;
  diag.Height = 650;
  diag.URL = url + "/Page/GoodsIn/index_deal.aspx?DealID=" + dealID + "&CusID=" + CusId;
  //diag.URL = "/app/customers/Invoice/index_deal.aspx?DealID=" + dealID + "&CusID=" + CusId;
  diag.show();
}
/*********退货end************/


/*********待发货订单************/
function DealGoodsOutAdd(dealid, cusid) {
  var diag = new Dialog();
  diag.ID = "DealGoodsOutEdit";
  diag.Width = 1000;
  diag.Height = 300;
  diag.Title = "新增待发货订单";
  diag.URL = "/app/customers/dealgoodsout/DealGoodsOutEdit.aspx?mode=Add&cusid=" + cusid + "&dealid=" + dealid + "&DialogID=" + currentDialogID;;
  diag.show();
}
/*********待发货订单end************/

/*********调拨单************/
function AllocateDetail(allocateid) {
  var url = gethost();

  var diag = new Dialog();
  diag.ID = "AllocateDetail";
  diag.Width = 1000;
  diag.Height = 450;
  diag.URL = url + "/Page/Allocate/AllocateDetail.aspx?allocateid=" + allocateid;
  diag.show();
}
/*********调拨单end************/

/*********出库单************/
function OutStockDetail(outstockid) {
  var url = gethost();

  var diag = new Dialog();
  diag.ID = "OutStockDetail";
  diag.Width = 1000;
  diag.Height = 450;
  diag.URL = url + "/Page/OutStock/OutStockDetail.aspx?outstockid=" + outstockid;
  diag.show();
}
/*********出库单end************/

//判断是否为内网，并获取站点host（打开进销存界面的时候，以此确定url）
function gethost() {
  var host = window.location.host.toLowerCase();

  var protocol = window.location.protocol.replace(":", "");

  if (host == "invoicing.kehu51.com" || host == "local.kehu51.com") {
    return protocol + "://invoicing.kehu51.com";
  } else {
    var urlhead = host.split('.')[0];
    if (host.split('.')[0].indexOf("stock") < 0) {
      urlhead = urlhead.replace("s", "stock");
    }
    return protocol + "://" + urlhead + ".kehu51.com";
  }
}

//2016 qianlong 个人客户转企业客户或者联系人

function ConvertCusToComList(type) {
  parent.CloseLoading();
  var strID = "";
  var strCusType = "";
  var idList = document.getElementsByName("rptID");
  var cusTypeList = document.getElementsByName("hidCusType");
  for (var i = 0; i < idList.length; i++) {
    if (idList[i].checked) {
      strID += idList[i].value + ",";
      strCusType += cusTypeList[i].value + ",";
    }
  }
  if (strID == "") {
    Dialog.showError("请选择要转换的个人客户！");
    return;
  }
  if (strCusType.indexOf("2") == -1) {
    Dialog.showError("选择的客户中并不包含个人客户！");
    return;
  }
  strID = strID.substring(0, strID.length - 1); //去掉最后的,
  strCusType = strCusType.substring(0, strCusType.length - 1); //去掉最后的,
  var diag = new Dialog();
  diag.ID = "CusConvertToCom";
  diag.Width = 560;
  diag.Height = 460;
  diag.Title = "个人客户转换";
  if (type == 1)
    diag.URL = "/App/Customers/CusConvertToCom.aspx?cusidlist=" + strID + "&custypelist=" + strCusType;
  else
    diag.URL = "/App/Customers/CusConvertToLinkMan.aspx?cusidlist=" + strID + "&custypelist=" + strCusType;
  diag.show();
}

function ConvertCusToCom(cusID, type) {
  var diag = new Dialog();
  diag.ID = "CusConvertToCom";
  diag.Width = 560;
  diag.Height = 460;
  diag.Title = "个人客户转换";
  //diag.Message="提醒：个人客户转换成企业客户，将会自动生成联系人。<br /><span style=\"color:red\">系统建议：更换新的企业客户名称，避免与联系人名称一致。</span>"
  if (type == 1)
    diag.URL = "/App/Customers/CusConvertToCom.aspx?cusidlist=" + cusID;
  else
    diag.URL = "/App/Customers/CusConvertToLinkMan.aspx?cusidlist=" + cusID;
  diag.show();
}

function OpenRelateRecipient_Single(dialogName) {
  var cusid = $("#rptCusID").val();
  if (typeof (cusid) == "undefined" || cusid == "" || cusid == "0") {
    Dialog.showError("请先选择客户！");
    return;
  }

  var diag = new Dialog();
  diag.MessageTitle = "选择收货地址";
  diag.Message = "在这里，可以选择该订单的收货地址";
  diag.ID = "RelateRecipient_Single";
  diag.Width = 1200;
  diag.Height = 660;
  diag.URL = "/App/Module/AddressManage/AddressManageList.aspx?dialogName=" + dialogName + "&cusID=" + cusid;
  diag.show();
}
