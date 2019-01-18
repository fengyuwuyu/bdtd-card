package com.bdtd.card.common.util;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class OSUtil {
	
	private static final Logger log = LoggerFactory.getLogger(OSUtil.class);

	public static boolean isWindows(){
		String os = System.getProperty("os.name");  
		if(os.toLowerCase().startsWith("win")){ 
			return true;
		}
		return false;
	}
	
	public static Process runCommand(String cmd) {
		log.trace("Executing: [{}]", cmd);
		if (isWindows()) {
			try {
				return Runtime.getRuntime().exec(cmd);
			} catch (IOException e) {
				log.warn(String.format("Failed to execute cmd = [%s].", cmd), e);
				return null;
			}
		}
		
		String[] cmds = {
				"/bin/sh",
				"-c",
				cmd
		};
		
		try {
			return Runtime.getRuntime().exec(cmds);
		} catch (IOException e) {
			log.warn(String.format("Failed to execute cmd = [%s].", cmd), e);
			return null;
		}
	}
}
