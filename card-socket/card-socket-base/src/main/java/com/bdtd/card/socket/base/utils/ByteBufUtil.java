package com.bdtd.card.socket.base.utils;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.UUID;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.PooledByteBufAllocator;
import io.netty.buffer.Unpooled;

/**
 * 
 * 这个类用来添加netty中bytebuf读取字符串的方法
 *
 * @author Terry
 * @time 2016年5月17日
 */
public class ByteBufUtil {

	static final char INTEGER_VALUE_ARRAY[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd',
			'e', 'f', };

	public static final int DEFAULT_BYTE_COUNT_PERLINE = 8;
	final protected static char[] hexArray = "0123456789ABCDEF".toCharArray();

	public static String bytesToHexString(byte[] src, boolean withStub) {
		StringBuilder stringBuilder = new StringBuilder("");
		if (src == null || src.length <= 0) {
			return null;
		}
		char[] value = new char[4];
		value[0] = '0';
		value[1] = 'x';
		for (int i = 0; i < src.length; i++) {
			if (withStub) {
				if (i == 4 || i == 6 || i == 8 || i == 10) {
					stringBuilder.append("-");
				}
			}
			int v = src[i] & 0xFF;
			value[2] = hexArray[v >>> 4];
			value[3] = hexArray[v & 0x0F];
			stringBuilder.append(value);
		}
		return stringBuilder.toString();
	}

	/**
	 * 
	 * 此方法是使用bytebuf的缓存池创建一个bytebuf对象
	 *
	 * @param initialCapacity
	 * @return
	 * @author Terry
	 * @time 2016年5月27日
	 */
	public static ByteBuf createFromPool(int initialCapacity) {
		return PooledByteBufAllocator.DEFAULT.buffer(initialCapacity);
	}

	/**
	 * 
	 * 此方法是使用netty的unpool创建一个bytebuf对象
	 *
	 * @param initialCapacity
	 * @return
	 * @author Terry
	 * @time 2016年5月27日
	 */
	public static ByteBuf createFromUnpool(int initialCapacity) {
		return Unpooled.buffer(initialCapacity);
	}

	/**
	 * 
	 * 此方法是将bytebuf剩余的可读取字节转为byte数组,并释放bytebuf所占的内存
	 *
	 * @param byteBuf
	 * @return
	 * @author Terry
	 * @time 2016年5月27日
	 */
	public static byte[] toReadableArray(ByteBuf byteBuf) {
		byte[] bytes = new byte[byteBuf.readableBytes()];
		byteBuf.readBytes(bytes);
		byteBuf.release();
		return bytes;
	}

	/**
	 * @brief 把bytebuf从ReaderIndex到WriterIndex转换成 16进制的字符串
	 * @param buf
	 *            byte 数组
	 * @return 字符串
	 */
	public static String toHexString(ByteBuf buf) {
		return toHexString(buf, buf.readerIndex(), buf.readableBytes(), DEFAULT_BYTE_COUNT_PERLINE);
	}

	/**
	 * @brief 把byte数值转换成 16进制的字符串
	 * @param buf
	 *            byte 数组
	 * @return 字符串
	 */
	public static String toHexString(byte[] buf) {
		return toHexString(buf, 0, buf.length, DEFAULT_BYTE_COUNT_PERLINE);
	}

	/**
	 * @brief 把byte数值转换成 16进制的字符串
	 * @param buf
	 *            byte 数组
	 * @param offset
	 *            偏移量
	 * @param len
	 *            长度
	 * @param bytePerline
	 *            多少个byte打一行字符串
	 * @return 字符串
	 */
	public static String toHexString(byte[] buf, int offset, int len, int bytePerline) {
		if (len == 0) {
			return "";
		}
		char buffer[] = new char[4];
		buffer[0] = '0';
		buffer[1] = 'x';
		int radix = 16;
		int perlineMax = bytePerline - 1;
		assert bytePerline > 0;
		assert len >= 0;
		assert offset >= 0 && offset + len <= buf.length;
		StringBuilder builder = new StringBuilder();
		// builder.reverse()
		for (int i = offset; i < offset + len; ++i) {
			int value = buf[i] & 0xff;
			buffer[3] = INTEGER_VALUE_ARRAY[value % radix];
			value /= radix;
			buffer[2] = INTEGER_VALUE_ARRAY[value % radix];
			builder.append(buffer);
			if ((i % bytePerline) == perlineMax) {
				builder.append('\n');
			} else {
				builder.append(' ');
			}
		}
		return builder.toString();
	}

	/**
	 * @brief 把byteBuf转换成 16进制的字符串
	 * @param buf
	 *            byte 数组
	 * @param offset
	 *            偏移量
	 * @param len
	 *            长度
	 * @param bytePerline
	 *            多少个byte打一行字符串
	 * @return 字符串
	 */
	public static String toHexString(ByteBuf buf, int offset, int len, int bytePerline) {
		if (len == 0) {
			return "";
		}
		char buffer[] = new char[4];
		buffer[0] = '0';
		buffer[1] = 'x';
		int radix = 16;
		int perlineMax = bytePerline - 1;
		assert bytePerline > 0;
		assert len >= 0;
		assert offset >= 0 && offset + len <= buf.capacity();
		StringBuilder builder = new StringBuilder();
		for (int i = offset; i < offset + len; ++i) {
			int value = buf.getByte(i) & 0xff;
			buffer[3] = INTEGER_VALUE_ARRAY[value % radix];
			value /= radix;
			buffer[2] = INTEGER_VALUE_ARRAY[value % radix];
			builder.append(buffer);
			if ((i % bytePerline) == perlineMax) {
				builder.append('\n');
			} else {
				builder.append(' ');
			}
		}
		return builder.toString();
	}

	/**
	 * 
	 * 描述:这个方法是将整个bytebuf的数据转化为字节数组
	 *
	 * @param byteBuf
	 * @return
	 * @author Terry
	 * @time 2016年6月21日-下午7:11:56
	 */
	public static byte[] toArrays(ByteBuf byteBuf) {
		byte[] result = null;
		if (byteBuf.isDirect()) {
			byteBuf.readerIndex(0);
			result = toReadableArray(byteBuf);
			byteBuf.release();
		} else {
			result = byteBuf.array();
		}
		return result;

	}

	/**
	 * 
	 * 此方法是从bytebuf中读取一个字符串，此字符串的长度是short类型的。
	 *
	 * @param byteBuf
	 * @return 如果读取失败，返回null
	 * @author Terry
	 * @time 2016年5月17日
	 */
	public static String readStrByShortLen(ByteBuf byteBuf) {
		short len = byteBuf.readShort();
		return readStr(len, byteBuf);
	}

	/**
	 * 
	 * 此方法是从bytebuf中读取一个字符串，此字符串的长度是int类型的。
	 *
	 * @param byteBuf
	 * @return 如果读取失败，返回null
	 * @author Terry
	 * @time 2016年5月17日
	 */
	public static String readStrByIntLen(ByteBuf byteBuf) {

		int len = byteBuf.readInt();
		return readStr(len, byteBuf);
	}

	/**
	 * 
	 * 此方法是从bytebuf中读取一个字符串
	 *
	 * @param len
	 * @param byteBuf
	 * @return 读取失败返回null
	 * @author Terry
	 * @time 2016年5月17日
	 */
	private static String readStr(int len, ByteBuf byteBuf) {
		byte[] bytes = new byte[len];
		byteBuf.readBytes(bytes);
		String str = null;
		try {
			str = new String(bytes, "utf8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return str;
	}

	/**
	 * 
	 * 描述:这个方法是将byte数据转化为十六进制的字符串
	 *
	 * @param src
	 * @return
	 * @author Terry
	 * @time 2016年8月13日-下午10:49:23
	 */
	public static String bytesToHexString(byte[] src) {
		return bytesToHexString(src, false);
	}

	/**
	 * Convert hex string to byte[]
	 * 
	 * @param hexString
	 *            the hex string
	 * @return byte[]
	 */
	public static byte[] hexStringToBytes(String hexString) {
		if (hexString == null || hexString.equals("")) {
			return null;
		}
		hexString = hexString.toUpperCase();
		int length = hexString.length() / 2;
		char[] hexChars = hexString.toCharArray();
		byte[] d = new byte[length];
		for (int i = 0; i < length; i++) {
			int pos = i * 2;
			d[i] = (byte) (charToByte(hexChars[pos]) << 4 | charToByte(hexChars[pos + 1]));
		}
		return d;
	}

	/**
	 * Convert char to byte
	 * 
	 * @param c
	 *            char
	 * @return byte
	 */
	private static byte charToByte(char c) {
		return (byte) "0123456789ABCDEF".indexOf(c);
	}

	/**
	 * 
	 * 描述:uuid转成16长度byte[]
	 *
	 * @param uuid
	 * @return
	 * @author Cai
	 * @time 2016年8月31日-下午4:01:55
	 */
	public static byte[] uuidToBytes(UUID uuid) {
		ByteBuffer bb = ByteBuffer.wrap(new byte[16]);
		bb.order(ByteOrder.BIG_ENDIAN);
		bb.putLong(uuid.getMostSignificantBits());
		bb.putLong(uuid.getLeastSignificantBits());
		return bb.array();
	}
	/**
	 * 
	 * @Desc  描述：对象序列化为字节数组
	 * @param obj
	 * @return
	 * @author 王广帅
	 * @Date 2017年4月7日  下午3:45:09
	 *
	 */
	public static byte[] objectToBytes(Object obj) {
		byte[] bytes = null;
		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		try {
			ObjectOutputStream oos = new ObjectOutputStream(bos);
			oos.writeObject(obj);
			oos.flush();
			bytes = bos.toByteArray();
			oos.close();
			bos.close();
		} catch (IOException ex) {
			ex.printStackTrace();
		}
		return bytes;
	}
	/**
	 * 
	 * @Desc  描述：字节数组转化为对象，这个对象必须继承Serializable接口
	 * @param bytes
	 * @param t
	 * @return
	 * @author 王广帅
	 * @Date 2017年4月7日  下午3:45:33
	 *
	 */
	@SuppressWarnings("unchecked")
	public static <T> T bytesToObject(byte[] bytes, Class<?> t) {
		Object obj = null;
		try {
			ByteArrayInputStream bis = new ByteArrayInputStream(bytes);
			ObjectInputStream ois = new ObjectInputStream(bis);
			obj = ois.readObject();
			ois.close();
			bis.close();
		} catch (IOException ex) {
			ex.printStackTrace();
		} catch (ClassNotFoundException ex) {
			ex.printStackTrace();
		}
		return (T)obj;
	}

	public static void main(String[] args) {

//		String value = "aaaa";
//		byte[] bytes = value.getBytes();
//		System.out.println(Arrays.toString(bytes));
//		String hexStr = ByteBufUtil.bytesToHexString(bytes);
//		System.out.println(hexStr);
//		bytes = ByteBufUtil.hexStringToBytes(hexStr);
//		System.out.println(Arrays.toString(bytes));
		/*
		 * byte all[] = new byte[256]; int lt = 0; for (byte i = 0; i != -1;
		 * ++i) { all[lt] = i; // System.out.println(i); int l = i & 0xff;
		 * System.out.println(l); if (l != lt) { System.out.println("budeng"); }
		 * ++lt; } ByteBuf buf = ByteBufUtil.createFromPool(256);
		 * buf.writeBytes(all); System.out.println(toHexString(all, 0, 255,
		 * 16));
		 */

		/*
		 * System.out.println(toHexString(buf, 0, 255, 16));
		 * System.out.println(toHexString(buf));
		 * 
		 * StringBuilder str = new StringBuilder("tutorials");
		 * System.out.println("string = " + str); // length of StringBuilder
		 * System.out.println("length = " + str.length());
		 * 
		 * // set the length of StringBuilder to 5 str.setLength(16);
		 * 
		 * // print new StringBuilder value after changing length
		 * System.out.println("After set, string = " + str); // length of
		 * StringBuilder after changing length System.out.println("length = " +
		 * str.length());
		 */

		// System.out.println(l);
		
		Data data =new Data();
		byte[] bytes = objectToBytes(data);
		Data d = bytesToObject(bytes, Data.class);
		System.out.println(d.getA());
	}
	
	 static class Data implements Serializable{
		/**
		 * 
		 */
		private static final long serialVersionUID = 1L;
		private int a = 10;
		private int b = 11;
		public int getA() {
			return a;
		}
		public void setA(int a) {
			this.a = a;
		}
		public int getB() {
			return b;
		}
		public void setB(int b) {
			this.b = b;
		}
		
	}

}
