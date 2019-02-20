package com.bdtd.card.socket.base.utils;

public class UserUtil {

	private static Long userId;

	public static Long getUserId() {
		return userId;
	}

	public static void setUserId(Long userId) {
		UserUtil.userId = userId;
	}

}
