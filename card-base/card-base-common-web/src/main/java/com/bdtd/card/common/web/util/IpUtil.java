package com.bdtd.card.common.web.util;

import javax.servlet.http.HttpServletRequest;

/**
 * @description: 从request里面获得IP
 */
public class IpUtil {

	public static String getIpAddress(HttpServletRequest request) {
		String ip = request.getHeader("X-Forwarded-For");
		if (ip == null || ip.length() == 0) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0) {
			ip = request.getRemoteAddr();
		}
		if (ip != null) {
			String[] temp = ip.split(",");
			if (temp.length > 1)
				ip = temp[0];
		}
		return ip.trim();
	}
}
