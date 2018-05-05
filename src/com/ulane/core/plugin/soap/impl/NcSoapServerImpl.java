package com.ulane.core.plugin.soap.impl;


import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

//import javax.jws.WebService;

import com.htsoft.core.util.AppUtil;
import com.htsoft.core.util.JsonUtil;
import com.ulane.core.plugin.soap.NcSoapServer;
import com.ulane.core.plugin.util.XmlHelps;
import com.ulane.know.dao.know.UkSysKnowDao;
import com.ulane.know.model.know.UkSysKnow;
import com.ulane.know.service.know.UkSysKnowService;

import flexjson.JSONSerializer;

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
 * @author 陈峰cf0666@gmail.com
 * @date 2011-8-2
 * @version 1.0
 */
//@WebService(endpointInterface = "com.ulane.core.plugin.soap.NcSoapServer", serviceName = "NcSoapServer")
//@WebService
public class NcSoapServerImpl implements NcSoapServer {
	
    /**
     * 测试已出账单接口用，正式发布时请删除
     * @param xmlStr
     * @return
     */
    @SuppressWarnings({ "unchecked", "deprecation" })
    public String hasChargeBill(String xmlStr){
        List list=new ArrayList();
        com.ulane.serve.model.creditcard.HasChargeBill hcb1 = new com.ulane.serve.model.creditcard.HasChargeBill();
        com.ulane.serve.model.creditcard.HasChargeBill hcb2 = new com.ulane.serve.model.creditcard.HasChargeBill();
        com.ulane.serve.model.creditcard.HasChargeBill hcb3 = new com.ulane.serve.model.creditcard.HasChargeBill();
        com.ulane.serve.model.creditcard.HasChargeBill hcb4 = new com.ulane.serve.model.creditcard.HasChargeBill();
        try{
            SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
            hcb1.setAfterFour("4130");
            hcb1.setAmount(new java.math.BigDecimal(507.3));
            hcb1.setConsumptionTime(sdf.parse("2011-12-03 14:25:25")); 
            hcb1.setCurrency((short)1);
            hcb1.setId((long)1);
            hcb1.setIsInstallment((short)1);
            hcb1.setNote("测试数据1");
            hcb1.setRecordTime(sdf.parse("2011-12-03 14:55:04"));
            hcb1.setRevoked((short)1);
            hcb1.setTradingNo("413026198512033225");

            hcb2.setAfterFour("9991");
            hcb2.setAmount(new java.math.BigDecimal(507.3));
            hcb2.setConsumptionTime(sdf.parse("2011-12-04 14:25:25")); 
            hcb2.setCurrency((short)1);
            hcb2.setId((long)2);
            hcb2.setIsInstallment((short)1);
            hcb2.setNote("测试数据2");
            hcb2.setRecordTime(sdf.parse("2011-12-03 14:55:04"));
            hcb2.setRevoked((short)1);
            hcb2.setTradingNo("999184470186012011");

            hcb3.setAfterFour("5112");
            hcb3.setAmount(new java.math.BigDecimal(507.3));
            hcb3.setConsumptionTime(sdf.parse("2011-12-05 14:25:25")); 
            hcb3.setCurrency((short)1);
            hcb3.setId((long)3);
            hcb3.setIsInstallment((short)1);
            hcb3.setNote("测试数据3");
            hcb3.setRecordTime(sdf.parse("2011-12-03 14:55:04"));
            hcb3.setRevoked((short)1);
            hcb3.setTradingNo("511223197804047889");

            hcb4.setAfterFour("4130");
            hcb4.setAmount(new java.math.BigDecimal(507.3));
            hcb4.setConsumptionTime(sdf.parse("2012-05-06 18:06:39")); 
            hcb4.setCurrency((short)1);
            hcb4.setId((long)4);
            hcb4.setIsInstallment((short)1);
            hcb4.setNote("测试数据4");
            hcb4.setRecordTime(sdf.parse("2012-05-06 20:55:04"));
            hcb4.setRevoked((short)1);
            hcb4.setTradingNo("123456789012345678");

        }
        catch(Exception e){}
        String CardNo=null;
        String RowDat=null;
        int x=xmlStr.indexOf("\"CardNo\":\"");
        if(x>1){
            CardNo = xmlStr.substring(x+10);
            CardNo = CardNo.substring(0, CardNo.indexOf("\""));
        }
        x=xmlStr.indexOf("\"RowDat\":\"");
        if(x>1){
            RowDat = xmlStr.substring(x+10);
            RowDat = RowDat.substring(0, RowDat.indexOf("\""));
        }
        if(RowDat!=null&&RowDat.length()==4){
            String mm=RowDat.substring(2,3).equals("0")?RowDat.substring(3,3):RowDat.substring(2,3);
            RowDat=RowDat.substring(0, 2)+"-"+mm;
        }
        
        if(CardNo!=null&&hcb1.getAfterFour().indexOf(CardNo)>-1&&RowDat==null)
            list.add(hcb1);
        if(CardNo!=null&&hcb2.getAfterFour().indexOf(CardNo)>-1&&RowDat==null)
            list.add(hcb2);
        if(CardNo!=null&&hcb3.getAfterFour().indexOf(CardNo)>-1&&RowDat==null)
            list.add(hcb3);
        if(CardNo!=null&&hcb4.getAfterFour().indexOf(CardNo)>-1&&RowDat==null)
            list.add(hcb4);
        if(RowDat!=null&&hcb1.getConsumptionTime().toLocaleString().indexOf(RowDat)==2&&CardNo==null)
            list.add(hcb1);
        if(RowDat!=null&&hcb2.getConsumptionTime().toLocaleString().indexOf(RowDat)==2&&CardNo==null)
            list.add(hcb2);
        if(RowDat!=null&&hcb3.getConsumptionTime().toLocaleString().indexOf(RowDat)==2&&CardNo==null)
            list.add(hcb3);
        if(RowDat!=null&&hcb4.getConsumptionTime().toLocaleString().indexOf(RowDat)==2&&CardNo==null)
            list.add(hcb4);
        if(RowDat!=null&&hcb1.getConsumptionTime().toLocaleString().indexOf(RowDat)==2&&CardNo!=null&&hcb1.getAfterFour().indexOf(CardNo)>-1)
            list.add(hcb1);
        if(RowDat!=null&&hcb2.getConsumptionTime().toLocaleString().indexOf(RowDat)==2&&CardNo!=null&&hcb2.getAfterFour().indexOf(CardNo)>-1)
            list.add(hcb2);
        if(RowDat!=null&&hcb3.getConsumptionTime().toLocaleString().indexOf(RowDat)==2&&CardNo!=null&&hcb3.getAfterFour().indexOf(CardNo)>-1)
            list.add(hcb3);
        if(RowDat!=null&&hcb4.getConsumptionTime().toLocaleString().indexOf(RowDat)==2&&CardNo!=null&&hcb4.getAfterFour().indexOf(CardNo)>-1)
            list.add(hcb4);

        StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(list.size()).append(",result:");
        JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
        buff.append(jsonSer.serialize(list));
        buff.append("}");
        return buff.toString();
    }

	/**
	 * <pre>
	 * 描述：3.1.知识新增接口
	 * 接口类型：服务器端
	 * *******************************************************
	 * 传人参数（客户端传入）：知识
	 * <?xml version="1.0" encoding="utf-8"?>
	 * <root>
	 * 	<item>
	 * <knowTmpId></knowTmpId>
	 * <tiTle></tiTle>
	 * <busiType></busiType>
     * <enableTime></enableTime>
     * <pastTime></pastTime>
     * <sysKnowStatus></sysKnowStatus>
     * <viewCount></viewCount>
     * <sysKnowComment></sysKnowComment>
     * <sysKnowVersion></sysKnowVersion>
     * <plus1></plus1>
     * <plus2></plus2>
     * <plus3></plus3>
     * <plus4></plus4>
     * <plus5></plus5>
     * <plus6></plus6>
     * <plus7></plus7>
     * <plus8></plus8>
     * <userid></userid>
	 * 	</item>
	 * </root>
	 * 
	 * ********************************************************
	 * 传出参数(服务器端返回)：进销存项目传出参数
	 * <?xml version="1.0" encoding="utf-8"?>
	 * <root>
	 * <code></code >
	 * 	<message></message>
	 * </root>
	 * 
	 * </pre>
	 * 
	 * @return
	 */
	@SuppressWarnings({ "null", "deprecation" })
    @Override
	/**
	 * @author yuying
	 */
    public String allocationApprovedBack(String xmlStr) {
        // TODO Auto-generated method stub
     // TODO Auto-generated method stub
        int code =0;
        String message = "";
        List<String[]> backInfos=XmlHelps.getUkSysKnowXml(xmlStr);
        UkSysKnowDao ukSysKnowDao=(UkSysKnowDao) AppUtil.getBean("ukSysKnowDao");
        UkSysKnowService ukSysKnowService=(UkSysKnowService)AppUtil.getBean("ukSysKnowService");
        for(String[] backInfo:backInfos){
            String knowTmpId=backInfo[0];
            String tiTle=backInfo[1];
            String busiType=backInfo[2];
            String enableTime=backInfo[3];
            String pastTime=backInfo[4];
            String sysKnowStatus=backInfo[5];
            String viewCount=backInfo[6];
            String sysKnowComment=backInfo[7];
            String sysKnowVersion=backInfo[8];
            String plus1=backInfo[9];
            String plus2=backInfo[10];
            String plus3=backInfo[11];
            String plus4=backInfo[12];
            String plus5=backInfo[13];
            String plus6=backInfo[14];
            String plus7=backInfo[15];
            String plus8=backInfo[16];
            String hql="from UkSysKnow a where a.tiTle='"+tiTle+"'";
            List<UkSysKnow> ukSysKnows=ukSysKnowDao.findByHql(hql, null);
            UkSysKnow ukSysKnow=new UkSysKnow();
            if(ukSysKnows!=null&&ukSysKnows.size()!=0){
                message+="标题冲突请修改标题后再提交;";
            }else {
                ukSysKnow.setKnowTmpId(new Long(knowTmpId));
                ukSysKnow.setTiTle(tiTle);
                ukSysKnow.setBusiType(new Long(busiType));
                ukSysKnow.setEnableTime(com.ulane.core.DateUtil.parseDate(enableTime, "yyyy-MM-dd hh:mm:ss"));
                ukSysKnow.setPastTime(com.ulane.core.DateUtil.parseDate(pastTime, "yyyy-MM-dd hh:mm:ss"));
                ukSysKnow.setSysKnowStatus(new Integer(sysKnowStatus));
                ukSysKnow.setViewCount(new Integer(viewCount));
                ukSysKnow.setSysKnowComment(sysKnowComment);
                ukSysKnow.setSysKnowVersion(new Integer(sysKnowVersion));
                ukSysKnow.setPlus1(plus1);
                ukSysKnow.setPlus2(plus2);
                ukSysKnow.setPlus3(plus3);
                ukSysKnow.setPlus4(plus4);
                ukSysKnow.setPlus5(plus5);
                ukSysKnow.setPlus6(plus6);
                ukSysKnow.setPlus7(plus7);
                ukSysKnow.setPlus8(plus8);
                ukSysKnow.setUserId(new Long(1));
                ukSysKnow.setCreateDate(new Date());
                
                ukSysKnow = ukSysKnowService.save(ukSysKnow);
           }
            if(ukSysKnow!=null){
                code++;
                if(ukSysKnow.getKnowId()!=null){
                    message+="["+code+"]提交完成;";
                }else{
                    message+="["+code+"]提交失败;";
                }
            }           
            //需要陈峰提供生成凭证的业务类的方法
        }
        StringBuffer sb = new StringBuffer();
        sb.append("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
        sb.append("<root>");
        sb.append("<code>");
        sb.append(code);
        sb.append("</code>");
        sb.append("<message>");
        sb.append(message);
        sb.append("</message>");
        sb.append("</root>");
        return sb.toString();
    }

    public String hangMingHangHao(String xmlStr) {
        // TODO Auto-generated method stub
        StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(1).append(",result:[{");
        buff.append("\"EX1\":\"中国工商银行\",");
        buff.append("\"EX2\":\"北京海淀支行\",");
        buff.append("\"EX3\":\"102100004960\",");
        buff.append("\"EX4\":\"北京市\",");
        buff.append("\"EX5\":\"海淀区中关村东路100号\",");
        buff.append("\"EX6\":\"AAAAA\",");
        buff.append("\"EX7\":\"AAAAA\",");
        buff.append("\"EX8\":\"AAAAA\",");
        buff.append("\"EX9\":\"AAAAA\",");
        buff.append("\"EX10\":\"AAAAA\"");
        buff.append("}]}");
        return buff.toString();
    }

    public String jiGou(String xmlStr) {
        // TODO Auto-generated method stub
        StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(1).append(",result:[{");
        buff.append("\"EX1\":\"研发\",");
        buff.append("\"EX2\":\"北京市\",");
        buff.append("\"EX3\":\"自有产品研发部\",");
        buff.append("\"EX4\":\"JG10001\",");
        buff.append("\"EX5\":\"北京市中关村西彩和坊西路8号\",");
        buff.append("\"EX6\":\"010-65792918\",");
        buff.append("\"EX7\":\"AAAAA\",");
        buff.append("\"EX8\":\"AAAAA\",");
        buff.append("\"EX9\":\"AAAAA\",");
        buff.append("\"EX10\":\"AAAAA\"");
        buff.append("}]}");
        return buff.toString();
    }

    public String rMBCunKuan(String xmlStr) {
        // TODO Auto-generated method stub
        StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(1).append(",result:[{");
        buff.append("\"EX1\":\"零存整取\",");
        buff.append("\"EX2\":\"3年\",");
        buff.append("\"EX3\":\"2012年6月2日\",");
        buff.append("\"EX4\":\"0.16%\",");
        buff.append("\"EX5\":\"零存整取\",");
        buff.append("\"EX6\":\"AAAAA\",");
        buff.append("\"EX7\":\"AAAAA\",");
        buff.append("\"EX8\":\"AAAAA\",");
        buff.append("\"EX9\":\"AAAAA\",");
        buff.append("\"EX10\":\"AAAAA\"");
        buff.append("}]}");
        return buff.toString();
    }

    public String rMBDaiKuan(String xmlStr) {
        // TODO Auto-generated method stub
        StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(1).append(",result:[{");
        buff.append("\"EX1\":\"投资贷款\",");
        buff.append("\"EX2\":\"5年\",");
        buff.append("\"EX3\":\"2012年5月30日\",");
        buff.append("\"EX4\":\"0.24%\",");
        buff.append("\"EX5\":\"投资贷款\",");
        buff.append("\"EX6\":\"AAAAA\",");
        buff.append("\"EX7\":\"AAAAA\",");
        buff.append("\"EX8\":\"AAAAA\",");
        buff.append("\"EX9\":\"AAAAA\",");
        buff.append("\"EX10\":\"AAAAA\"");
        buff.append("}]}");
        return buff.toString();
    }

    public String wBCunKuan(String xmlStr) {
        // TODO Auto-generated method stub
        StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(1).append(",result:[{");
        buff.append("\"EX1\":\"活期储蓄\",");
        buff.append("\"EX2\":\"加拿大元\",");
        buff.append("\"EX3\":\"3年\",");
        buff.append("\"EX4\":\"2012年3月27日\",");
        buff.append("\"EX5\":\"0.33%\",");
        buff.append("\"EX6\":\"外币储蓄\",");
        buff.append("\"EX7\":\"AAAAA\",");
        buff.append("\"EX8\":\"AAAAA\",");
        buff.append("\"EX9\":\"AAAAA\",");
        buff.append("\"EX10\":\"AAAAA\"");
        buff.append("}]}");
        return buff.toString();
    }

    public String wHPaiJia(String xmlStr) {
        // TODO Auto-generated method stub
        StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(1).append(",result:[{");
        buff.append("\"EX1\":\"2012年5月8日\",");
        buff.append("\"EX2\":\"15:07:27\",");
        buff.append("\"EX3\":\"美元\",");
        buff.append("\"EX4\":\"美元\",");
        buff.append("\"EX5\":\"$\",");
        buff.append("\"EX6\":\"6.40\",");
        buff.append("\"EX7\":\"6.71\",");
        buff.append("\"EX8\":\"0.31\",");
        buff.append("\"EX9\":\"6.50\",");
        buff.append("\"EX10\":\"6.50\"");
        buff.append("}]}");
        return buff.toString();
    }

    public String yeWuFeiLv(String xmlStr) {
        // TODO Auto-generated method stub
        StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(1).append(",result:[{");
        buff.append("\"EX1\":\"中国农业银行朝阳分行\",");
        buff.append("\"EX2\":\"人民币\",");
        buff.append("\"EX3\":\"信用卡费率\",");
        buff.append("\"EX4\":\"高\",");
        buff.append("\"EX5\":\"5%/10000\",");
        buff.append("\"EX6\":\"0.05%\",");
        buff.append("\"EX7\":\"100\",");
        buff.append("\"EX8\":\"100\",");
        buff.append("\"EX9\":\"100000\",");
        buff.append("\"EX10\":\"2012年5月1日-2012年8月1日\"");
        buff.append("}]}");
        return buff.toString();
    }
}
