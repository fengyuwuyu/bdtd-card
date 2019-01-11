package com.bdtd.card.socket.base.model;

import java.util.HashMap;
import java.util.Map;

public enum CommandCategory {
	REQUEST(1),
	RESPONSE(2),
	PUBLISH(3),
	
	INVALID(-1);
	private int type;
	CommandCategory(int type){
		this.type = type;
	}
	public int getType() {
		return type;
	}
	
	private final static Map<Integer, CommandCategory> CATEGORY_MAP = new HashMap<>();

	static {
		registerCategory(CommandCategory.values());
	}


	public static CommandCategory getCategory(int id) {
		CommandCategory category =  CATEGORY_MAP.get(id);
		if(category == null) {
			return CommandCategory.INVALID;
		}
		return category;
	}

	
	public static void registerCategory(CommandCategory[] categories) {
		if (categories != null) {
			for (CommandCategory category : categories) {
				CATEGORY_MAP.put(category.getType(), category);
			}
		}
	}
		
}