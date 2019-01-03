(function () {
	var errorFunc = function (data) {
		var msg = "服务器异常！";
		if (data.responseJSON.errors && data.responseJSON.errors[0] && data.responseJSON.errors[0].rejectedValue) {
			msg = "操作失败, " + (data.responseJSON.errors[0].rejectedValue ? "非法的数据 " +data.responseJSON.errors[0].rejectedValue : data.responseJSON.message) + "!"
		}
		Feng.error(msg);
    };
	var $ax = function (url, success, error) {
		this.url = url;
		this.type = "post";
		this.data = {};
		this.dataType = "json";
		this.async = false;
		this.success = success;
		this.error = error || errorFunc;
	};
	
	$ax.prototype = {
		start : function () {
			var loadIndex = layer.load();
			var me = this;
			
			if (this.url.indexOf("?") == -1) {
				this.url = this.url + "?jstime=" + new Date().getTime();
			} else {
				this.url = this.url + "&jstime=" + new Date().getTime();
			}
			
			$.ajax({
		        type: this.type,
		        url: this.url,
		        dataType: this.dataType,
		        async: this.async,
		        data: this.data,
				beforeSend: function(data) {
					
				},
		        success: function(data) {
		        	if (data.code && data.code != 200) {
		        		Feng.error(data.message || "操作失败！");
		        		layer.close(loadIndex);
		        		return;
		        	}
		        	me.success(data);
		        	layer.close(loadIndex);
		        },
		        error: function(data) {
		        	me.error(data);
		        	layer.close(loadIndex);
		        }
		    });
		}, 
		
		set : function (key, value) {
			if (typeof key == "object") {
				for (var i in key) {
					if (typeof i == "function")
						continue;
					this.data[i] = key[i];
				}
			} else {
				this.data[key] = (typeof value == "undefined") ? $("#" + key).val() : value;
			}
			return this;
		},
		
		setData : function(data){
			this.data = data;
			return this;
		},
		
		clear : function () {
			this.data = {};
			return this;
		}
	};
	
	window.$ax = $ax;
	
} ());