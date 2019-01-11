package com.bdtd.card.base.common.web.base;

import com.bdtd.card.base.common.base.model.BdtdError;

/**
 * 返回给前台的提示（最终转化为json形式）
 *
 * @author 
 * @Date 2017年1月11日 下午11:58:00
 */
public class Tip {
	
	public static final Tip SUCCESS_TIP = new Tip(200, "操作成功！");
	public static final Tip ERROR_TIP = new Tip(500, "操作失败！");

	protected long code;
	protected String message;

	public Tip() {
		super();
	}
	
	public Tip(long code, String message) {
		super();
		this.code = code;
		this.message = message;
	}
	
	public Tip(BdtdError error) {
		super();
		this.code = error.getErrorCode();
		this.message = error.getMessage();
	}

	public long getCode() {
		return code;
	}

	public void setCode(long code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
