package com.ulane.core.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.Random;

import org.apache.http.HttpEntity;
import org.apache.http.HttpException;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.protocol.HTTP;

import com.htsoft.core.util.AppUtil;

/**
 * 使用HttpClient的jar,发送http请求
 * 
 * @author zhanghao
 * 
 */
public class HttpUtil {
	public static final String SYS;
	public static final String ACCOUNT;
	public static final String PASSWORD;

	// public static final String PROXY_URL =
	// "http://192.168.233.31:80/Interface/service";

	// public static final String PROXY_URL =
	// "http://192.168.222.72:8080/Interface/service";
	public static final String PROXY_URL;
	static {
		PROXY_URL = (String) AppUtil.getSysConfig().get("interface_url");
		SYS = (String) AppUtil.getSysConfig().get("interface_sys");
		ACCOUNT = (String) AppUtil.getSysConfig().get("interface_account");
		PASSWORD = (String) AppUtil.getSysConfig().get("interface_password");
	}

	/**
	 * 发送HTTP post请求
	 * 
	 * @param url
	 *            请求的地址
	 * @param data
	 *            发送的数据(现阶段的数据格式为json格式的字符串)
	 * @param charsetName
	 *            字符集 默认UTF-8
	 * @return http响应返回的字符串
	 */
	public static String post(String url, String data, String charsetName) {

		Integer statusCode = -1;
		// Create HttpClient Object
		DefaultHttpClient client = new DefaultHttpClient();
		// Send data by post method in HTTP protocol,use HttpPost instead of
		// PostMethod which was occurred in former version
		HttpPost post = new HttpPost(url);
		// Construct a string entity
		StringEntity entity;
		try {
			entity = new StringEntity(data, charsetName);
			entity.setContentType("application/json;charset=UTF-8");
			// Set XML entity
			post.setEntity(entity);
			// Set content type of request header
			post.setHeader("accept", "application/json");
			post.setHeader("Content-Type", "application/json;charset=UTF-8");
			// Execute request and get the response
			HttpResponse response = client.execute(post);

			// Response Header - StatusLine - status code
			statusCode = response.getStatusLine().getStatusCode();

			if (statusCode != HttpStatus.SC_OK) {
				throw new HttpException("Http Status is error.");
			}
			HttpEntity entityRsp = response.getEntity();
			StringBuffer result = new StringBuffer();
			BufferedReader rd = new BufferedReader(new InputStreamReader(
					entityRsp.getContent(), HTTP.UTF_8));
			String tempLine = rd.readLine();
			while (tempLine != null) {
				result.append(tempLine);
				tempLine = rd.readLine();
			}

			if (entityRsp != null) {
				entityRsp.consumeContent();
			}
			return result.toString();

		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			return createOutResult("编码错误!");
		} catch (ClientProtocolException e) {
			e.printStackTrace();
			return createOutResult("协议错误!");
		} catch (IOException e) {
			e.printStackTrace();
			return createOutResult("IO通讯错误!");
		} catch (HttpException e) {
			e.printStackTrace();
			return createOutResult("通讯错误!");
		}
	}

	/**
	 * 包装返回结果
	 * 
	 * @param callResult
	 * @return
	 */
	public static String createOutResult(String callResult) {
		StringBuffer reVol = new StringBuffer();

		reVol.append("{\"failure\":true,\"message\":\"");
		reVol.append(callResult);
		reVol.append("\"}");
		return reVol.toString();
	}

	public static void main(String[] args) {
		String remoteUrl = "http://192.168.250.72:8080/Interface/service/updateCustInfo";
		String content = "{\"subsystem\":\"1\",\"account\":\"2\",\"password\":\"1\",\"cust_id\":\"1001693\",\"cust_nm\":\""
				+ ("周立伟")
				+ "\",\"sex_cd\":\"F\",\"citi_no\":\"522401198307140023\",\"cust_lvl_cd\":\"10\",\"birth_ymd\":\"19830714\",\"birth_cd\":\"S\"}";
		// content = URLEncoder.encode(content, "utf-8");

		int rad = new Random().nextInt();
		System.out.println(rad + "------1.URL-----------" + remoteUrl);
		System.out.println(rad + "------2.jsonData-----------" + content);

		String result = HttpUtil.post(remoteUrl, content, "UTF-8");
		System.out.println(rad + "------3.json结果-----------" + result);

	}
}
