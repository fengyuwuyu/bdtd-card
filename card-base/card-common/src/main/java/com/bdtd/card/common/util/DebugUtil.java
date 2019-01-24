package com.bdtd.card.common.util;

import java.io.PrintWriter;
import java.io.StringWriter;

public class DebugUtil {
	private static boolean isDebug = true;
	/**
	 * 
	 * 此方法是封装System.out.println方法，在程序中凡是要用到System.out.println的地方一律用本方法代替，方便上线之后有遗漏。
	 *
	 * @param msg
	 */
	public static void println(String msg){
		if(isDebug){
			System.out.println(msg);
		}
	}
	
	public static String exceptionStackTraceToString(Throwable throwable) {
		StringWriter sw = new StringWriter();
		PrintWriter pw = new PrintWriter(sw);
		throwable.printStackTrace(pw);
		return sw.toString();
	}

	
	public static void main(String[] args) {
		println("aaaaaaaaa");
	}
}
