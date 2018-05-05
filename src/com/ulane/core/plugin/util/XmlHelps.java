package com.ulane.core.plugin.util;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.w3c.dom.NodeList;

import com.ulane.core.plugin.vo.AllocationHeaderVO;
import com.ulane.core.plugin.vo.AllocationLineVO;

/**
 * <p>Title: Demosss.java</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2009-2011</p>
 * <p>Company: http://www.lasun.com.cn </p>
 * @author yongan.liu
 * @date 2011-8-2
 * @version 1.0
 */
public class XmlHelps {

	/**
	 * @author yuying 2011-8-4
	 * @param xmlStr
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static List<String[]> getUkSysKnowXml(String xmlStr){
		List<String[]> backInfos=new ArrayList<String[]>();
		Document doc=null;
		try {
			doc=DocumentHelper.parseText(xmlStr);
			Element root=doc.getRootElement();
			Iterator it=root.elements().iterator();
			while(it.hasNext()){
				Element item=(Element) it.next();
				Iterator itemIt=item.elements().iterator();
				String[] backInfo=new String[18];
				while(itemIt.hasNext()){
					Element child=(Element) itemIt.next();
					if(child.getName().equals("knowTmpId")){
						backInfo[0]=child.getText();
					}
					if(child.getName().equals("tiTle")){
						backInfo[1]=child.getText();
					}
					if(child.getName().equals("busiType")){
						backInfo[2]=child.getText();
					}
                    if(child.getName().equals("enableTime")){
                        backInfo[3]=child.getText();
                    }
                    if(child.getName().equals("pastTime")){
                        backInfo[4]=child.getText();
                    }
                    if(child.getName().equals("sysKnowStatus")){
                        backInfo[5]=child.getText();
                    }
                    if(child.getName().equals("viewCount")){
                        backInfo[6]=child.getText();
                    }
                    if(child.getName().equals("sysKnowComment")){
                        backInfo[7]=child.getText();
                    }
                    if(child.getName().equals("sysKnowVersion")){
                        backInfo[8]=child.getText();
                    }
                    if(child.getName().equals("plus1")){
                        backInfo[9]=child.getText();
                    }
                    if(child.getName().equals("plus2")){
                        backInfo[10]=child.getText();
                    }
                    if(child.getName().equals("plus3")){
                        backInfo[11]=child.getText();
                    }
                    if(child.getName().equals("plus4")){
                        backInfo[12]=child.getText();
                    }
                    if(child.getName().equals("plus5")){
                        backInfo[13]=child.getText();
                    }
                    if(child.getName().equals("plus6")){
                        backInfo[14]=child.getText();
                    }
                    if(child.getName().equals("plus7")){
                        backInfo[15]=child.getText();
                    }
                    if(child.getName().equals("plus8")){
                        backInfo[16]=child.getText();
                    }
                    if(child.getName().equals("userid")){
                        backInfo[17]=child.getText();
                    }

				}
				backInfos.add(backInfo);
			}
		} catch (DocumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return backInfos;
	}
	
//<?xml version="1.0" encoding="utf-8"?><root><code>1</code><message>null</message></root>   
    public static String analyzeReturnXml(String xmlStr) {
//      Document document=null;
        String code="no"; //0为成功，其他为失败
        String message="fail message!"; //反馈信息
        if(xmlStr==null||xmlStr.length()==0){
            return code;
        }
        try {
            xmlStr=xmlStr.substring(xmlStr.indexOf("<root>"));
            String codeStr=xmlStr.substring(xmlStr.indexOf("<code>"),xmlStr.indexOf("</code>"));
            code = codeStr.substring(6);
            String messageStr=xmlStr.substring(xmlStr.indexOf("<message>"),xmlStr.indexOf("</message>"));
            message = messageStr.substring(9).trim().replaceAll("\r", "").replaceAll("\n", "");

            if(code.equals("0"))
                message=null;
//          document=DocumentHelper.parseText(xmlStr);//获得xml文档对象
//          Element root=(Element)document.getRootElement();//获得根元素
//          Iterator it = root.elements().iterator();
//          while(it.hasNext()){
//              Element item=(Element) it.next();
//              code =item.elementText("code");
//              message =item.elementText("message");
//          }
        } catch (Exception e) {
            return message;
        }
        return message;
    }
}
