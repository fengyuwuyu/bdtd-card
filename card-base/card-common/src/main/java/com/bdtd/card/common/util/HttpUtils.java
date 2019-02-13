package com.bdtd.card.common.util;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.Map;

public class HttpUtils {
    /**
     * 向指定URL发送GET方法的请求
     * 
     * @param url
     *            发送请求的URL
     * @param param
     *            请求参数，请求参数应该是 name1=value1&name2=value2 的形式。
     * @return URL 所代表远程资源的响应结果
     */
    public static String sendGet(String url, String param, String charset) {
    	charset = StringUtil.isNullEmpty(charset) ? "UTF-8" : charset;
        String result = "";
        BufferedReader in = null;
        String urlNameString = null ;
        try {
        	 if(param != null){
        		 urlNameString = url + "?" + param;
        	 }else{
        		 urlNameString = url ;
        	 }
            URL realUrl = new URL(urlNameString);
            // 打开和URL之间的连接
            URLConnection connection = realUrl.openConnection();
            // 设置通用的请求属性
            connection.setRequestProperty("accept", "*/*");
            connection.setRequestProperty("connection", "Keep-Alive");
            connection.setRequestProperty("user-agent",
                    "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            connection.setRequestProperty("Content-Type", String.format("text/xml; charset=%s", charset));
            // 建立实际的连接
            connection.connect();
            // 定义 BufferedReader输入流来读取URL的响应
            in = new BufferedReader(new InputStreamReader(
                    connection.getInputStream(), charset));
            String line;
            while ((line = in.readLine()) != null) {
                result += line;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        // 使用finally块来关闭输入流
        finally {
            try {
                if (in != null) {
                    in.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        return result;
    }
    

    public static String sendPost(String url, String param, String charsetName) {
    	return sendPost(url, param, charsetName, null);
    }

    /**
     * 向指定 URL 发送POST方法的请求
     * 
     * @param url
     *            发送请求的 URL
     * @param param
     *            请求参数，请求参数应该是 name1=value1&name2=value2 的形式。
     * @return 所代表远程资源的响应结果
     */
    public static String sendPost(String url, String param, String charsetName, Map<String, String> headers) {
        PrintWriter out = null;
        BufferedReader in = null;
        String result = "";
        try {
            URL realUrl = new URL(url);
            // 打开和URL之间的连接
            HttpURLConnection conn = (HttpURLConnection) realUrl.openConnection();
            // 设置通用的请求属性
            conn.setRequestProperty("accept", "*/*");
            conn.setRequestProperty("connection", "Keep-Alive");
            conn.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            // 意思是正文是urlencoded编码过的form参数  
            if (headers != null && headers.size() > 0) {
            	for (Map.Entry<String, String> entry : headers.entrySet()) {
            		conn.setRequestProperty(entry.getKey(), entry.getValue());
            	}
            }
            // 发送POST请求必须设置如下两行
            conn.setDoOutput(true);
            conn.setDoInput(true);
            // 默认是 GET方式  
            conn.setRequestMethod("POST");
            // 获取URLConnection对象对应的输出流
            out = new PrintWriter(conn.getOutputStream());
            // 发送请求参数
            out.print(param);
            // flush输出流的缓冲
            out.flush();
            if (charsetName != null && !"".equals(charsetName)){
            	// 定义BufferedReader输入流来读取URL的响应
                in = new BufferedReader(
                        new InputStreamReader(conn.getInputStream(),charsetName));
            }else{
            	// 定义BufferedReader输入流来读取URL的响应
                in = new BufferedReader(
                        new InputStreamReader(conn.getInputStream(),"UTF-8"));
            }
            String line;
            while ((line = in.readLine()) != null) {
            	 result += line;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        //使用finally块来关闭输出流、输入流
        finally{
            try{
                if(out!=null){
                    out.close();
                }
                if(in!=null){
                    in.close();
                }
            }
            catch(IOException ex){
                ex.printStackTrace();
            }
        }
        return result;
    }    
    
    public static String sendPostJson(String url, String param, String charsetName) {
    	return sendPostJson(url, param, charsetName, null);
    }

    /**
     * 向指定 URL 发送POST方法的请求
     * 
     * @param url
     *            发送请求的 URL
     * @param param
     *            请求参数，请求参数应该是 name1=value1&name2=value2 的形式。
     * @return 所代表远程资源的响应结果
     */
    public static String sendPostJson(String url, String param, String charsetName, Map<String, String> headers) {
    	DataOutputStream out = null;
        BufferedReader in = null;
        String result = "";
        try {
            URL realUrl = new URL(url);
            // 打开和URL之间的连接
            HttpURLConnection conn = (HttpURLConnection) realUrl.openConnection();
            // 设置通用的请求属性
            conn.setRequestProperty("accept", "application/json");
            conn.setRequestProperty("connection", "Keep-Alive");
            conn.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            // 意思是正文是urlencoded编码过的form参数  
            conn.setRequestProperty("Content-Type","application/json; charset=UTF-8");
            if (headers != null && headers.size() > 0) {
            	for (Map.Entry<String, String> entry : headers.entrySet()) {
            		conn.setRequestProperty(entry.getKey(), entry.getValue());
            	}
            }
            // 发送POST请求必须设置如下两行
            conn.setDoOutput(true);
            conn.setDoInput(true);
            // 默认是 GET方式  
            conn.setRequestMethod("POST");
            // 获取URLConnection对象对应的输出流
            out = new DataOutputStream(conn.getOutputStream());
            // 发送请求参数
            out.write(param.getBytes("UTF-8"));;
            // flush输出流的缓冲
            out.flush();
            if (charsetName != null && !"".equals(charsetName)){
            	// 定义BufferedReader输入流来读取URL的响应
                in = new BufferedReader(
                        new InputStreamReader(conn.getInputStream(),charsetName));
            }else{
            	// 定义BufferedReader输入流来读取URL的响应
                in = new BufferedReader(
                        new InputStreamReader(conn.getInputStream(),"UTF-8"));
            }
            String line;
            while ((line = in.readLine()) != null) {
            	 result += line;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        //使用finally块来关闭输出流、输入流
        finally{
            try{
                if(out!=null){
                    out.close();
                }
                if(in!=null){
                    in.close();
                }
            }
            catch(IOException ex){
                ex.printStackTrace();
            }
        }
        return result;
    }    
    
    public static String getParamStr(Map<String, Object> param) {
    	if (param == null || param.size() == 0) {
    		return null;
    	}
    	
    	StringBuilder sb = new StringBuilder();
    	for (Map.Entry<String, Object> entry : param.entrySet()) {
    		sb.append(entry.getKey());
    		sb.append("=");
    		sb.append(entry.getValue());
    		sb.append("&");
    	}
    	return sb.substring(0, sb.length() - 1);
    }
    
}