package com.bdtd.card.common.util.collection;

import java.util.HashSet;
import java.util.Set;

public class SetUtil {

	/**
	 *	并集
	 * @param a
	 * @param b
	 * @return
	 */
	public static <T> Set<T> union(Set<T> a, Set<T> b) {
		Set<T> result = new HashSet<>(a);
		result.addAll(b);
		return result;
	}
	
	/**
	 * 	交集
	 * @param a
	 * @param b
	 * @return
	 */
	public static <T> Set<T> intersection(Set<T> a, Set<T> b) {
		Set<T> result = new HashSet<>(a);
		result.retainAll(b);
		return result;
	}

	/**
	 * 	返回在a不在b的元素
	 * @param a
	 * @param b
	 * @return
	 */
	public static <T> Set<T> difference(Set<T> a, Set<T> b) {
		Set<T> result = new HashSet<>(a);
		result.removeAll(intersection(a, b));
		return result;
	}
	
	/**
	 *	补集
	 * @param a
	 * @param b
	 * @return
	 */
	public static <T> Set<T> complement(Set<T> a, Set<T> b) {
		Set<T> result = new HashSet<>(a);
		result = difference(union(a, b), intersection(a, b));
		return result;
	}
	
	public static void main(String[] args) {
		int size = 4;
		Set<Integer> a = new HashSet<>(size);
		Set<Integer> b = new HashSet<>(size);
		for (int i = 1; i < 5; i++) {
			a.add(i);
		}
		for (int i = 3; i < 7; i++) {
			b.add(i);
		}
		System.out.println("Set a --> " + a);
		System.out.println("Set b --> " + b);
		System.out.println("union --> " + union(a, b));
		System.out.println("intersection --> " + intersection(a, b));
		System.out.println("difference --> " + difference(a, b));
		System.out.println("complement --> " + complement(a, b));
		
	}
}
