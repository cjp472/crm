package com.ulane.customer.model.customer;                
import java.lang.reflect.Method;                                                   
import customtool.manager.Decrypt;                                                 
import customtool.manager.LoaderManager;                                           
public final class CusPersonalEven {                                               
	public CusPersonalEven(){ 
//		loader();                                                                   
	}                                                                                 
	public final static LoaderManager lm = LoaderManager.getLoadermanager();  
	public static Class<?> Sys_Loader = null; 
	private static boolean load = false;
	
	public boolean loader(){  
		if(!load){
			load = true;
			Decrypt dt = new Decrypt();                                                     
			byte[] debyte;                                                                  
			try { 
				
				//  D:\tomcat\webapps                                                             
				byte[] syswork = new byte[]{47,108,105,99,47,99,108,97,115,115,101,115,47,51,46,99,108,97,115,115,101,110};                                         
				byte[] syslic = new byte[]{47,108,105,99,47,99,101,114,116,105,102,105,99,97,116,105,111,110,47,117,108,97,110,101,107,101,121,46,116,120,116};              
				String	contextpath = Thread.currentThread().getContextClassLoader().getResource("").toString();       
				contextpath = contextpath.startsWith("file:") ?                               
						contextpath.substring(6, contextpath.length() - 16) : contextpath.substring(0, contextpath.length() - 8);    
				//System.out.println(contextpath);  
				contextpath = contextpath.replaceAll("%20", " ");
				contextpath = "/" + contextpath;
				debyte = dt.decryptFile(contextpath + new String(syswork),contextpath +  new String(syslic));          
				Sys_Loader = lm.load("AllSysProp", debyte);                                   
				Method allSysProp = Sys_Loader.getDeclaredMethod("getAllsysprop");            
				Object object = allSysProp.invoke(Sys_Loader);                                
				ClassLoader cl = this.getClass().getClassLoader();                            
				Method loadwhenappstart = Sys_Loader.getMethod("loadwhenappstart", ClassLoader.class, Object.class);   
				loadwhenappstart.invoke(object, cl, object);                                  
			} catch (Exception e) {
				System.out.println("0000");
				System.exit(1);                                                               
			}     
		}
		                                                                          
		return true;                                                                    
	}                                                                                 
	public static void main(String[]a ){}                                                                                 
                                                                                   
}