var AlertFever = {
	ctxPath: $('#ctxPath').val(),
	confirmMsg: function(msg) {
		parent.layer.confirm(msg, {
			btn : [ '查看详情', '关闭' ]
		}, function(index) {
			console.log($("a[href$='alertFever']"))
			 $("a[href$='alertFever']").trigger('click');
			parent.layer.close(index);
		}, function(index) {
			parent.layer.close(index);
		});
	},
	checkFeverDepCount: function () {
		$.ajax(AlertFever.ctxPath + '/alertFever/checkFeverDepCount', {
			type : 'post',
			dataType : 'json',
			data : {},
			async : false,
			complete : function(data) {

			},
			error : function(response, textStatus, errorThrown) {
				try {
					var data = $.parseJSON(response.responseText);
					alert(data.message || "服务器异常");
				} catch (e) {
					alert(data.message || "服务器异常");
				}
			},
			success : function(data) {
				if (data.total > 0) {
					AlertFever.confirmMsg('有' + data.total + '个单位发热人数超限');
				}
			}
		});
	}
};

$(function() {
	var address = $('#address').val();
	if (!address) {
		return;
	}
	AlertFever.checkFeverDepCount();
	var socket;  
    if(typeof(WebSocket) == "undefined") {  
        console.log("您的浏览器不支持WebSocket");  
    }else{  
    	var preUrl = 'ws://' + address;
    	socket = new WebSocket(preUrl + '/alertFeverServer');  
        //打开事件  
        socket.onopen = function() {  
            console.log("Socket 已打开");  
            socket.send("这是来自客户端的消息" + location.href + new Date());  
        };  
        //获得消息事件  
        socket.onmessage = function(msg) {  
            //发现消息进入    调后台获取  
        	var data = $.parseJSON(msg.data);
        	AlertFever.confirmMsg(data.depName + "发热人数：" + data.count + "!");
        };  
        //关闭事件  
        socket.onclose = function() {  
            console.log("Socket已关闭");  
        };  
        //发生了错误事件  
        socket.onerror = function() {  
            console.log("Socket发生了错误");  
        }  
         $(window).unload(function(){  
              socket.close();  
            });  
    }
});