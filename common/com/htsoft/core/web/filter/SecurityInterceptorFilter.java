package com.htsoft.core.web.filter;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.io.IOException;
import java.util.HashMap;
import java.util.Set;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.AccessDeniedException;
import org.springframework.security.Authentication;
import org.springframework.security.GrantedAuthority;
import org.springframework.security.context.SecurityContext;
import org.springframework.security.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.param;
import com.htsoft.core.security.SecurityDataSource;
import com.htsoft.core.util.AppUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.oa.model.system.AppUser;

/**
 * 权限拦载器
 * @author cf0666@gmail.com
 */
public class SecurityInterceptorFilter extends OncePerRequestFilter {
	
	/**
	 * 角色权限映射列表源，用于权限的匹配
	 */
	private HashMap<String, Set<String>> roleUrlsMap=null;
	
	private SecurityDataSource securityDataSource;

	public void setSecurityDataSource(SecurityDataSource securityDataSource) {
		this.securityDataSource = securityDataSource;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request,
			HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
		String url=request.getRequestURI();
		String contextPath = "/ulane/";
		if(org.springframework.util.StringUtils.hasLength(request.getContextPath())){
			contextPath=request.getContextPath();
			int index=url.indexOf(contextPath);
			if(index!=-1){
				url=url.substring(index+contextPath.length());
			}
		}
		SecurityContext sc = SecurityContextHolder.getContext();
		Authentication auth= sc.getAuthentication();
		int free =  param.getUser() - AppUtil.getOnlineUsers().size() ;
		if(free <= 0 && !url.equals("/index.jsp") && !url.equals("/info/sendmsgInMessage.do")){
			free = Math.abs(free);
			Set<String> uks = AppUtil.getOnlineUsers().keySet();
			Object[] oo = uks.toArray();
			for(int ooo=oo.length-free;ooo<oo.length;ooo++){
				if(SecurityContextHolder.getContext().getAuthentication().getName().equals(AppUtil.getOnlineUsers().get(oo[ooo]).getUsername())){
					throw new AccessDeniedException("Access is denied! Url:" + url + " User:" + SecurityContextHolder.getContext().getAuthentication().getName());
				}
			}
		} 

		boolean isSuperUser=false;
		for(int i=0;i<auth.getAuthorities().length;i++){
			if("超级管理员".equals(auth.getAuthorities()[i].getAuthority())){
				isSuperUser=true;
				break;
			}else if("ROLE_PUBLIC".equals(auth.getAuthorities()[i].getAuthority())){//TODO，加上这个是为了项目权限分配的简化处理，不需要细化每个url
				isSuperUser=true;
			}
		}
		if(!isSuperUser ){
			if(!isUrlGrantedRight(url,auth)){
				if(logger.isDebugEnabled()){
					logger.info("ungranted url:" + url);
				}
				if(url.startsWith("/mobile/")){
					response.sendRedirect(request.getContextPath() + "/mobile/login.jsp");
					return;
				}
				if( !url.equals("/info/sendmsgShortMessage.do") )
				throw new AccessDeniedException("Access is denied! Url:" + url + " User:" + SecurityContextHolder.getContext().getAuthentication().getName());
			}
		}
		if(logger.isDebugEnabled()){
			logger.debug("pass the url:" + url);
		}
		chain.doFilter(request, response);
	}
	
	/**
	 * 检查该URL是否授权访问
	 * @param url
	 * @return
	 */
	private boolean isUrlGrantedRight(String url,Authentication auth){
		//遍历该用户下所有角色对应的URL，看是否有匹配的
		for(GrantedAuthority ga:auth.getAuthorities()){
			//System.out.println(ga.getAuthority());
			Set<String> urlSet=roleUrlsMap.get(ga.getAuthority());
			//TODO AntPathMatcher here
			if(urlSet!=null && urlSet.contains(url)){
				return true;
			}
		}
		return false;
	}
	
	public void loadDataSource(){
		roleUrlsMap=securityDataSource.getDataSource();
	}
	
	@Override
	public void afterPropertiesSet() throws ServletException {
		loadDataSource();
		if(roleUrlsMap==null){
			throw new RuntimeException("没有进行设置系统的权限匹配数据源");
		}
	}
}
