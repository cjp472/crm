package com.htsoft.core.util;

import java.io.StringWriter;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;

import com.htsoft.core.model.BaseModel;
import com.htsoft.core.util.xml.convert.AuthorConverter;
import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.StaxDriver;
import com.thoughtworks.xstream.mapper.Mapper;
import com.ulane.monitor.model.unim.*;

public class XMLHelper {
	  static XStream xstream = new XStream(new StaxDriver());

	  static
	  { 
	    xstream.setMode(1001);
	    
	    //包别名申明
	    xstream.aliasPackage("", "util");
	    xstream.aliasPackage("", "model");
	    xstream.aliasPackage("", "dto");

	    //需要丢弃的字段申明
	    xstream.omitField(BaseModel.class, "logger"); 
	   	    

	    xstream.alias("root", XmlObjectData.class);
	    //1.班长/监控的坐席列表
	    xstream.alias("agent", UnimAgent.class);
	    //字段名替换
	    xstream.aliasField("id", UnimAgent.class, "agentId");
	    xstream.aliasField("userId", UnimAgent.class, "userId");
	    xstream.aliasField("agentNum", UnimAgent.class, "aid");
	    xstream.aliasField("name", UnimAgent.class, "agentName");
	    //丢弃的字段
	    xstream.omitField(UnimAgent.class, "agentPass");
	    xstream.omitField(UnimAgent.class, "unimServerConfig");;
	    xstream.omitField(UnimAgent.class, "unimAgentSkillgroups");;
	    xstream.omitField(UnimAgent.class, "unimMapAgents");;
	    xstream.omitField(UnimAgent.class, "unimMonitorAgents");;
	    xstream.omitField(UnimAgent.class, "unimChannels");
	    xstream.omitField(UnimAgent.class, "unimAssetss");
	    xstream.omitField(UnimAgent.class, "unimThrlevls");
	    xstream.omitField(UnimAgent.class, "unimMapChannels");
	    xstream.omitField(UnimAgent.class, "unimMapAssetss");
	    
	    //2.地图导航
	    //类名替换
	    xstream.alias("node", UnimMapNavigation.class);
	    //字段名替换
	    xstream.aliasField("id", UnimMapNavigation.class, "mapNavId");
	    xstream.aliasField("name", UnimMapNavigation.class, "navName");
	    //丢弃的字段
	    xstream.omitField(UnimMapNavigation.class, "status");
	    xstream.omitField(UnimMapNavigation.class, "remark"); 
	    xstream.omitField(UnimMapNavigation.class, "mapId"); 
	    //需要解析的子类
	    xstream.addImplicitCollection(UnimMapNavigation.class, "children");
	    xstream.useAttributeFor(UnimMapNavigation.class, "mapNavId");
	    xstream.useAttributeFor(UnimMapNavigation.class, "navName");
	    xstream.useAttributeFor(UnimMapNavigation.class, "orderno");
	    xstream.useAttributeFor(UnimMapNavigation.class, "parentid");
	    
	    //3.地图
	    //类名替换
	    xstream.alias("AgentMap", UnimAgentMap.class);
	    //字段名替换
	    xstream.aliasField("id", UnimAgentMap.class, "mapId");
	    xstream.aliasField("name", UnimAgentMap.class, "mapName");
	    xstream.aliasField("desc", UnimAgentMap.class, "reamrk");
	    xstream.aliasField("designXML", UnimAgentMap.class, "designxml");
	    xstream.omitField(UnimAgentMap.class, "unimMapAgents");
	    
	    //4.技能组
	    //类名替换
	    xstream.alias("Skillgroup", UnimSkillgroup.class);
	    //字段名替换
	    xstream.aliasField("id", UnimSkillgroup.class, "skgId");
	    xstream.aliasField("code", UnimSkillgroup.class, "skgCode");
	    xstream.aliasField("name", UnimSkillgroup.class, "skgName");
	    xstream.aliasField("desc", UnimSkillgroup.class, "remark");
	    //丢弃的字段
	    xstream.omitField(UnimSkillgroup.class, "unimAgentSkillgroups");
	    xstream.omitField(UnimSkillgroup.class, "status");
	    
	    //5.分机地址
	    //类名替换
	    xstream.alias("Extension", UnimExtension.class);
	    //字段名替换
	    xstream.aliasField("id", UnimExtension.class, "extId");
	    xstream.aliasField("code", UnimExtension.class, "extCode");
	    xstream.aliasField("ipaddress", UnimExtension.class, "ipaddress");
	    xstream.aliasField("ipport", UnimExtension.class, "ipport");
	    xstream.aliasField("username", UnimExtension.class, "username");
	    xstream.aliasField("password", UnimExtension.class, "password");
	    //丢弃的字段
	    
	    //6::2 坐席状态 3 示忙原因 4 举手原因
	    //类名替换
	    xstream.alias("Category", UnimCategory.class);
	    //字段名替换
	    xstream.aliasField("id", UnimCategory.class, "catId");
	    xstream.aliasField("typeId", UnimCategory.class, "typeId");
	    xstream.aliasField("name", UnimCategory.class, "catName");
	    xstream.aliasField("code", UnimCategory.class, "catCode");
	    //丢弃的字段
	    xstream.omitField(UnimCategory.class, "extend1");
	    xstream.omitField(UnimCategory.class, "extend2");
	    xstream.omitField(UnimCategory.class, "statustype");
	    xstream.omitField(UnimCategory.class, "thrlevladv");
	    xstream.omitField(UnimCategory.class, "thrlevlwar");
	    
	    //7.坐席状态/阀值
	    //类名替换
	    xstream.alias("category", UnimThrLevlDTO.class);
	    
	    //10.业务视图导航
	    //类名替换
	    xstream.alias("node", UnimChannelNavigation.class);
	    //字段名替换
	    xstream.aliasField("id", UnimChannelNavigation.class, "mapNavId");
	    xstream.aliasField("name", UnimChannelNavigation.class, "navName");
	    //丢弃的字段
	    xstream.omitField(UnimChannelNavigation.class, "status");
	    xstream.omitField(UnimChannelNavigation.class, "remark"); 
	    xstream.omitField(UnimChannelNavigation.class, "mapId");  
	    xstream.omitField(UnimChannelNavigation.class, "unimChannelMaps"); 
	    //需要解析的子类
	    xstream.addImplicitCollection(UnimChannelNavigation.class, "children");
	    xstream.useAttributeFor(UnimChannelNavigation.class, "mapNavId");
	    xstream.useAttributeFor(UnimChannelNavigation.class, "navName");
	    xstream.useAttributeFor(UnimChannelNavigation.class, "orderno");
	    xstream.useAttributeFor(UnimChannelNavigation.class, "parentid");
	    

	    //11.业务视图
	    //类名替换
	    xstream.alias("ChannelMap", UnimChannelMap.class);
	    //字段名替换
	    xstream.aliasField("id", UnimChannelMap.class, "mapId");
	    xstream.aliasField("name", UnimChannelMap.class, "mapName");
	    xstream.aliasField("desc", UnimChannelMap.class, "reamrk");
	    xstream.aliasField("designXML", UnimChannelMap.class, "designxml");
	    //丢弃的字段
	    xstream.omitField(UnimChannelMap.class, "unimMapAgents");
	    xstream.omitField(UnimChannelMap.class, "unimChannelNavigation");
	    
	    xstream.registerConverter(new AuthorConverter());

	    xstream.addDefaultImplementation(
	      org.hibernate.mapping.List.class, java.util.List.class);
	    xstream.addDefaultImplementation(
	      org.hibernate.mapping.Map.class, java.util.Map.class);
	    xstream.addDefaultImplementation(
	      org.hibernate.mapping.Set.class, java.util.Set.class);

	    Mapper mapper = xstream.getMapper();
	    xstream.registerConverter(new HibernateCollectionConverter(mapper));
	    xstream.registerConverter(new HibernateMapConverter(mapper));
	  }

	  public static String convertObjectToXml_Xtream(Object o)
	    throws Exception
	  {
	    xstream.autodetectAnnotations(true);
	    return xstream.toXML(o);
	  }

	  public static String convertObjectToXml_JAXB(Object o)
	    throws Exception
	  {
	    JAXBContext context = JAXBContext.newInstance(new Class[] { XmlObjectData.class });
	    Marshaller marshaller = context.createMarshaller();
	    StringWriter writer = new StringWriter();
	    marshaller.marshal(o, writer);
	    return writer.toString();
	  }

	  public static void main(String[] args)
	    throws Exception
	  {
	  }
}
