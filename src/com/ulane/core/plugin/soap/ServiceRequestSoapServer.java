package com.ulane.core.plugin.soap;

import java.util.List;

import javax.jws.WebService;

import com.ulane.customer.model.customer.ConServiceRequest;

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
public interface ServiceRequestSoapServer {
    /**
     * 添加服务请求
     * @param xmlStr
     * @return 
     */
    public String addConServiceRequest(String xmlStr);
    /**
     * 更新服务请求
     * @param xmlStr
     * @return 
     */
    public String updateConServiceRequest(String xmlStr);
    /**
     * 根据客户Id查询服务请求
     * @param xmlStr
     * @return 
     */
    public List<ConServiceRequest> listConServiceRequestByCusId(String xmlStr);
}
