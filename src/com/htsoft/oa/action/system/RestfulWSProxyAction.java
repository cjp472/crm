package com.htsoft.oa.action.system;

import com.htsoft.core.web.action.BaseAction;
import com.ulane.core.util.HttpUtil;

public class RestfulWSProxyAction extends BaseAction {

	String wsUrl;
	String jsonData_;
	protected Integer limit;

	/**
	 * 开始取数据的索引号
	 */
	protected Integer start;

	public Integer getLimit() {
		return limit;
	}

	public void setLimit(Integer limit) {
		this.limit = limit;
	}

	public Integer getStart() {
		return start;
	}

	public void setStart(Integer start) {
		this.start = start;
	}

	public String getWsUrl() {
		return wsUrl;
	}

	public void setWsUrl(String wsUrl) {
		this.wsUrl = wsUrl;
	}

	public String getJsonData_() {
		return jsonData_;
	}

	public void setJsonData_(String jsonData_) {
		this.jsonData_ = jsonData_;
	}

	public String proxy() throws Exception {
		logger.info("Call Proxy Interface");
		logger.info("------1.URL-----------" + wsUrl);

		if (start != null && limit != null) {
			jsonData_ = jsonData_.substring(0, jsonData_.length() - 1);
			jsonData_ = jsonData_.concat(",\"start\" : \"" + start
					+ "\", \"limit\" : \"" + limit + "\"}");
		}
		logger.info("------2.jsonData-----------" + jsonData_);
		String json = HttpUtil.post(wsUrl, jsonData_, "UTF-8");
		logger.info("------3.json结果-----------" + json);

		jsonString = json;
		return SUCCESS;
	}
}
