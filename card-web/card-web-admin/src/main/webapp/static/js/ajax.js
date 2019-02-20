//ajax读取数据
function ajaxRead(file,fun)
{
  var xmlObj = null;
  if(window.XMLHttpRequest)
  {
    xmlObj = new XMLHttpRequest();
  }
  else if(window.ActiveXObject){
    xmlObj = new ActiveXObject("Microsoft.XMLHTTP");
  }
  else
  {
    return;
  }
  xmlObj.onreadystatechange = function()
  {
    if(xmlObj.readyState == 4)
    {
      if (xmlObj.status ==200)
      {
        var data = xmlObj.responseText;
        eval(fun);
      }
      else
      {
        //alert("读取文件出错,错误号为 [" + xmlObj.status  + "]");
      }

    }
  }
  xmlObj.open ('GET', file, true);
  xmlObj.send ('');
}