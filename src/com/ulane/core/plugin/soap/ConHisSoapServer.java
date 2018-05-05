package com.ulane.core.plugin.soap;

import javax.jws.WebService;

/**
 * <p>
 * Title: Demosss.java
 * </p>
 * <p>
 * Description:
 * </p>
 * <p>
 * Copyright: Copyright (c) 2009-2011
 * </p>
 * <p>
 * Company: http://www.ulane.cn
 * </p>
 * 
 * @author washingtin
 * @Date 12-6-13
 * @version 1.0
 */
@WebService
public interface ConHisSoapServer {
	/**
     * 添加联络记录 createConHis(String xmlStr);
     * @param xmlStr
     * @return success : true , id : id; success : false, msg : error
     */
    public String createConHis(String xmlStr);
    /**
     * 添加放弃的请求 createConHuXun(String xmlStr);
     * @param xmlStr
     * @return success : true , id : id; success : false, msg : error
     */
    public String createConHuXun(String xmlStr);
    /**
     * 添加未处理的请求 createConWeiChuLi(String xmlStr);
     * @param xmlStr
     * @return success : true , id : id; success : false, msg : error
     */
    public String createConWeiChuLi(String xmlStr);
    /**
     * 添加拦截记录 createConLanJie(String xmlStr);
     * @param xmlStr
     * @return success : true , id : id; success : false, msg : error
     */
    public String createConLanJie(String xmlStr);
    
    /**
     * 更新联络记录 updateConHis(String xmlStr)
     * @param xmlStr
     * @return success : true , msg : success ; success : false, msg : error
     */
    public String updateConHis(String xmlStr);
	/**
	 * 获得所有联络历史
	 * @param xmlStr
	 * @return success : true
	 */
    public String list(String xmlStr);
    /**
     * 质检根据单id查询联络历史
     * @param xmlStr = id
     * @return {success : true,id : id,,,}
     */
    public String queryById(String xmlStr);
    /**
     * 质检根据多id查询联络历史
     * @param xmlStr = id,id1,id2...
     * @return {success : true ,data[{},{}]}
     */
    public String queryByMultId(String xmlStr);
}
