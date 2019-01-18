package com.bdtd.card.base.service.util;

import java.util.concurrent.atomic.AtomicInteger;

public class SequenceIdUtil {
	
	private static final AtomicInteger COUNTER = new AtomicInteger(0);

	public static int generatorId() {
		return COUNTER.incrementAndGet();
	}
	
}
