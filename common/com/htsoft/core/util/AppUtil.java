package com.htsoft.core.util;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/

import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.MalformedURLException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

import javax.servlet.ServletContext;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.Node;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.core.io.DefaultResourceLoader;

import com.htsoft.core.Constants;
import com.htsoft.core.DataInit.DataInit;
import com.htsoft.core.jbpm.jpdl.ProcessInit;
import com.htsoft.core.menu.TopModule;
import com.htsoft.core.model.OnlineUser;

import com.htsoft.core.web.filter.SecurityInterceptorFilter;
import com.htsoft.oa.model.system.AppFunction;
import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.Company;
import com.htsoft.oa.model.system.FunUrl;
import com.htsoft.oa.model.system.SysConfig;
import com.htsoft.oa.service.system.AppFunctionService;
import com.htsoft.oa.service.system.CompanyService;
import com.htsoft.oa.service.system.FunUrlService;
import com.htsoft.oa.service.system.SysConfigService;
import com.htsoft.oa.util.FlowUtil;

/**
 * 方便取得Spring容器，取得其他服务实例，必须在Spring的配置文件里进行配置
 * 如：<bean id="appUtil" class="com.htsoft.util.core.AppUtil"/>
 * 也提供整个应用程序的相关配置获取方法
 * @author cf0666@gmail.com
 *
 */
public class AppUtil implements ApplicationContextAware{
	
	private static Log logger=LogFactory.getLog(AppUtil.class);
	
	/**
	 * 存放应用程序的配置,如邮件服务器等
	 */
	@SuppressWarnings("unchecked")
    private static Map configMap=new HashMap();
	/**
	 * 应用程序全局对象
	 */
	private static ServletContext servletContext=null;
	
	//存放在线用户,SessionId,OnlineUser
	private static Map<String,OnlineUser> onlineUsers=new LinkedHashMap<String, OnlineUser>();
	
	private static ApplicationContext appContext;
	
	@SuppressWarnings("static-access")
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		this.appContext=applicationContext;
	}

	
	/**
	 * 系统的左边导航菜单文档，当系统启动时，
	 * 由系统去解析menu-all.xml，并放置系统，供权限菜单使用
	 */
	private static Map<String,Document> orgMenus=null;
	/**
	 * 去除了Function与url
	 */
	private static Map<String,Document> itemsMenus=null;
	
	/**
	 * 系统的所有头部菜单配置
	 */
	private static Map<String,TopModule> allTopModels=null;
	/**
	 * 系统的所有菜单功能
	 */
	private static Document menuDocument=null;
	
	public static Map<String, Document> getOrgMenus() {
		return orgMenus;
	}

	public static Map<String, Document> getItemsMenus() {
		return itemsMenus;
	}

	public static Map<String, TopModule> getAllTopModels() {
		return allTopModels;
	}

	public static Document getMenuDocument() {
		return menuDocument;
	}
	
	
//	
//	/**
//	 * 系统的左边导航菜单文档，当系统启动时，
//	 * 由系统去解析menu.xml，并放置系统，供权限菜单使用
//	 */
//	private static Document lefMenuDocument=null;
//	
//	/**
//	 * 公共菜单
//	 */
//	private static Document publicDocument=null;
//	
//	/**
//	 * 公共菜单IDs
//	 */
//	private static Set<String> publicMenuIds=null; 
//	
//	
//	public static Document getLeftMenuDocument(){
//		return lefMenuDocument;
//	}
//	
//	public static void setLeftMenuDocument(Document doc){
//		lefMenuDocument=doc;
//	}
//
//	
//	public static Document getPublicDocument() {
//		return publicDocument;
//	}
//
//	public static void setPublicDocument(Document pubDoc) {
//		publicDocument = pubDoc;
//	}
//
//	public static void setPublicMenuIds(Set<String> pubIds) {
//		publicMenuIds = pubIds;
//	}

	/**
	 * 取得Bean
	 * @param beanId
	 * @return
	 */
	public static Object getBean(String beanId){
		return appContext.getBean(beanId);
	}
	/**
	 * 返回在线用户
	 * @return
	 */
	public static Map<String,OnlineUser> getOnlineUsers(){
		return onlineUsers;
	}
	/**
	 * 移除在线用户
	 * @param sessionId
	 */
	public static void removeOnlineUser(String sessionId){
		onlineUsers.remove(sessionId);
	}
	
	public static void addOnlineUser(String sessionId,AppUser user){
		
		if(!onlineUsers.containsKey(sessionId)){
			OnlineUser onlineUser=new OnlineUser();
			onlineUser.setFullname(user.getFullname());
			onlineUser.setSessionId(sessionId);
			onlineUser.setUsername(user.getUsername());
			onlineUser.setUserId(user.getUserId());
			onlineUser.setEmployeeid(user.getEmployeeid());
			if(!user.getUserId().equals(AppUser.SUPER_USER)){
//				onlineUser.setDepPath("."+user.getDepartment().getPath());//原逻辑
				
//				AppUserDaoImpl appUserDaoImpl = new AppUserDaoImpl();
//				appUserDaoImpl.get(user.getUserId());
				onlineUser.setDepPath("." + user.getDepPath());
//			    onlineUser.setDepPath("."+user.getUlEmployee().getUlDepartment().getPath());
//				UlEmployee emp = new AppUtil().getEmp(user.getEmployeeid());
//				onlineUser.setDepPath(new AppUtil().getEmp(user.getEmployeeid()).getUlDepartment().getPath());	
			}
			Set<AppRole> roles = user.getRoles();
			StringBuffer roleIds = new StringBuffer(",");
			for(AppRole role : roles){
				roleIds.append(role.getRoleId()+",");
			}
			onlineUser.setRoleIds(roleIds.toString());
			onlineUser.setTitle(user.getTitle());
			onlineUsers.put(sessionId, onlineUser);
		}
	}

	/**
	 * 取得应用程序的绝对路径
	 * @return
	 */
	public static String getAppAbsolutePath(){
//		String path = "";
//		try {
//			path = servletContext.getResource("/").toString();
//		} catch (MalformedURLException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		path = path.substring(6);
//		System.out.println("<<getAppAbsolutePath>> , path = " + path);
//		return path;
		return servletContext.getRealPath("/");
	}
	
	/**
	 * 取得流程表单模板的目录的绝对路径
	 * @return
	 */
	public static String getFlowFormAbsolutePath(){
		String path=(String)configMap.get("app.flowFormPath");
		if(path==null) path="/WEB-INF/FlowForm/";
		return getAppAbsolutePath()+path;
		
	}
	
	public static String getMobileFlowFlowAbsPath(){
		return getAppAbsolutePath() + "/mobile/flow/FlowForm/";
	}
	
	/**
	 * 重新加载安全权限匹配的数据源
	 */
	public static void reloadSecurityDataSource(){
		SecurityInterceptorFilter securityInterceptorFilter=(SecurityInterceptorFilter)AppUtil.getBean("securityInterceptorFilter");
		securityInterceptorFilter.loadDataSource();
	}
	
	/**
	 * 应用程序启动时调用
	 * @param servletContext
	 */
	 @SuppressWarnings({ "unchecked", "deprecation" })
    public static void init(ServletContext in_servletContext){
	    	servletContext=in_servletContext;
	    	
	    	System.out.println("绝对路径："+servletContext.getRealPath("/"));
	    	System.out.println("-------->"+Thread.currentThread().getContextClassLoader().getResource("/").getPath());
	    	try {
				System.out.println("servletContext.getResource ："+servletContext.getResource("/"));
			} catch (MalformedURLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	    	
			String path = new DefaultResourceLoader().getClassLoader().getResource("/").getPath();
			path = URLDecoder.decode(path);
			System.out.println("===========>"+path);
			path = path + "conf";
			System.out.println("end===========>"+path);
//			if (path.endsWith("/")) {
//				path.substring(0, path.length() - 1);
//				
//			} else {
//				
//			}

	    	//读取来自config.properties文件的配置,并且放入configMap内,应用程序共同使用
//	    	String filePath=servletContext.getRealPath("/WEB-INF/classes/conf/");
//	    	System.out.println("------>WebLogic Service DeBug Path : "+filePath);
	    	String configFilePath=path+"/config.properties";
	    	System.out.println("configFilePath===========>"+configFilePath);
	    	Properties props=new Properties();
	    	try{
	    		FileInputStream fis=new FileInputStream(configFilePath);
	    		Reader r = new InputStreamReader(fis, "UTF-8"); 
	    		props.load(r);
	    		Iterator it= props.keySet().iterator();
	    		while(it.hasNext()){
	    			String key=(String)it.next();
	    			configMap.put(key, props.get(key));
	    		}
	    	}catch(Exception ex){
	    		logger.error(ex.getMessage());
	    	}
	    	
	    	//TODO 从系统配置中读取所有的信息
	    	
	    	reloadSysConfig();
	    	
	    	CompanyService companyService=(CompanyService)getBean("companyService");
	    	List<Company> cList=companyService.findCompany();
	    	if(cList.size()>0){
	    		Company company=cList.get(0);
	    		configMap.put(Constants.COMPANY_LOGO,company.getLogo());
	    		configMap.put(Constants.COMPANY_NAME,company.getCompanyName());
	    	}
	    	//初始化安装
	    	
	    	if(isSetupMode()){
	    		logger.info("开始初始化系统的缺省流程...");
		    	ProcessInit.initFlows(getAppAbsolutePath());
		    	logger.info("结束初始化系统的缺省流程...");
		    	//初始化系统流程
		    	//安装完成后，修改config.properites的文件的setupMode为false;
		    	logger.info("初始化数据~	开始...");
	    		DataInit.init(getAppAbsolutePath());
	    		logger.info("初始化数据~	结束...");
	    		logger.info("更改安装模式为false");
		    	PropertiesUtil.writeKey(configFilePath, "setupMode", "false");
	    	}
	    	
	    	//加载菜单转换器
			reloadMenu();
	    	
	    	//存放流程动态表单动态实体的结构映射
	    	logger.info("加载流程动态表单动态实体的结构映射到静态变量... ");
	    	FlowUtil.initDynModel();

	  }
	 
	 /**
	  * 重新加载菜单配置
	  */
	 public static void reloadMenu(){
		orgMenus=MenuUtil.getAllOrgMenus();
		itemsMenus=MenuUtil.getAllItemsMenus(orgMenus);
		menuDocument=MenuUtil.mergeOneDoc(orgMenus);
		allTopModels=MenuUtil.getTopModules(menuDocument);
	 }
	 
	 
	 @SuppressWarnings("unchecked")
    public static void synMenu(){
		 AppFunctionService appFunctionService=(AppFunctionService)getBean("appFunctionService");
			FunUrlService funUrlService=(FunUrlService)getBean("funUrlService");
			
			//同步menu.xml中的功能菜单配置至app_function表
			Iterator<String> menuKeys= orgMenus.keySet().iterator();
			
			while(menuKeys.hasNext()){
				
				Document doc=orgMenus.get(menuKeys.next());
				
				List funNodeList=doc.getRootElement().selectNodes("/Menus/Items//Item/Function");
				
				for(int i=0;i<funNodeList.size();i++){
					Element funNode=(Element)funNodeList.get(i);
					
					String key=funNode.attributeValue("id");
					String name=funNode.attributeValue("text");

					AppFunction appFunction=appFunctionService.getByKey(key);
					
					if(appFunction==null){	
						appFunction=new AppFunction(key,name);
					}else{
						appFunction.setFunName(name);
					}
					
					List urlNodes=funNode.selectNodes("./url");
					
					appFunctionService.save(appFunction);
					
					for(int k=0;k<urlNodes.size();k++){
						Node urlNode=(Node)urlNodes.get(k);
						String path=urlNode.getText();
						FunUrl fu=funUrlService.getByPathFunId(path, appFunction.getFunctionId());
						if(fu==null){
							fu=new FunUrl();
							fu.setUrlPath(path);
							fu.setAppFunction(appFunction);
							funUrlService.save(fu);
						}
					}
				}//end of for
			}//end of while

	 }
	 
	 /**
	  * 取得用于授权的文档，即转化后，去掉url的元素
	  * @return
	  */
	 public static Document getGrantMenuDocument(){
		String xslStyle = servletContext.getRealPath("/js/menu")+"/menu-grant.xsl";
		Document finalDoc=null;
		try{
			finalDoc=XmlUtil.styleDocument(menuDocument,xslStyle);
		}catch(Exception ex){
			logger.error("menu-grant.xsl transform has error:" + ex.getMessage());
		}
		return finalDoc;
	 }
	 
//	 /**
//	  * 取得公共的菜单文档，即menu.xml文件中标注为isPublic=true的属性
//	  * @return
//	  */
//	 public static Document getPublicMenuDocument(){
//		return publicDocument;
//	 }
//	 
//	 /**
//	  * 取得当前配置文件中的公共菜单的ID
//	  * @return
//	  */
//	 public static Set<String> getPublicMenuIds(){
//		 return publicMenuIds;
//	 }

	 
	 /*
	  * 是否同步菜单
	  */
	 public static boolean getIsSynMenu(){
	    String synMenu=(String)configMap.get("isSynMenu");
	    if("true".equals(synMenu)){
	    	return true;
	    }
	    return false;
	 }
	 
	/**
	 * 获取系统配置MAP 
	 */
	 @SuppressWarnings("unchecked")
    public static Map getSysConfig(){
		 return configMap;
	 }
	 
	 @SuppressWarnings("unchecked")
    public static void reloadSysConfig(){
		 	//configMap.clear();
			SysConfigService sysConfigService=(SysConfigService)getBean("sysConfigService");
	    	List<SysConfig> list=sysConfigService.getAll();
	    	for(SysConfig conf:list){
	    		configMap.put(conf.getConfigKey(),conf.getDataValue());
	    	}
	 }
	 
	 public static String getCompanyLogo(){
		 String defaultLogoPath=Constants.DEFAULT_LOGO;
		 String path=(String)configMap.get(Constants.COMPANY_LOGO);
		 if(StringUtils.isNotEmpty(path)){
			 defaultLogoPath="/attachFiles/"+path;
		 }
		 return defaultLogoPath;
	 }
	 
	 public static String getCompanyName(){
		 String defaultName=Constants.DEFAULT_COMPANYNAME;
		 String companyName=(String)configMap.get(Constants.COMPANY_NAME);
		 if(StringUtils.isNotEmpty(companyName)){
			 defaultName=companyName;
		 }
		 return defaultName;
	 }
	 
	 /*
	  * 是否用短信端口
	  */
	 public static boolean getSmsPort(){
	    String smsPort=(String)configMap.get("smsPort");
	    if("true".equals(smsPort)){
	    	return true;
	    }
	    return false;
	 }
	 /**
	  * 是否为安装模式
	  * @return
	  */
	 public static boolean isSetupMode(){
		 String isSetupMode=(String)configMap.get("setupMode");
		 if("true".equals(isSetupMode)){
			 return true;
		 }
		 return false;
	 }
	
}
