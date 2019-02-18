package com.bdtd.card.socket.base.model;

import java.util.HashMap;
import java.util.Map;

public enum MethodType {
	NOTIFY(1),
	RECEIVE(2),
	PUBLISH(3),
	SUBSCRIBE(4),
	INVOKE(5),
	BE_INVOKE(6),
	INVALID(-1);
	private int id;
	MethodType(int id) {
		this.id = id;
	}
	public int getId() {
		return id;
	}
	
	
	private final static Map<Integer, MethodType> METHOD_TYPE_MAP = new HashMap<>(MethodType.values().length);

	static {
		registerMethod(MethodType.values());
	}

	public static MethodType getType(int id) {
		MethodType product =  METHOD_TYPE_MAP.get(id);
		if(product == null) {
			return MethodType.INVALID;
		}
		return product;
	}

	
	public static void registerMethod(MethodType[] type) {
		if (type != null) {
			for (MethodType method : type) {
				METHOD_TYPE_MAP.put(method.getId(), method);
			}
		}
	}
}
