package com.htsoft.oa.action.system;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Date;
import java.util.HashMap;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import nl.captcha.Captcha;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.security.AuthenticationManager;
import org.springframework.security.context.SecurityContext;
import org.springframework.security.context.SecurityContextHolder;
import org.springframework.security.providers.UsernamePasswordAuthenticationToken;
import org.springframework.security.ui.rememberme.TokenBasedRememberMeServices;

import com.param;
import com.htsoft.core.util.AppUtil;
import com.htsoft.core.util.StringUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.SysConfig;
import com.htsoft.oa.service.system.AppUserService;
import com.htsoft.oa.service.system.SysConfigService;

public class LoginAction extends BaseAction {
	private AppUser user;
	private String username;
	private String password;
	private String usernumber;
	public String getUsernumber() {
		return usernumber;
	}

	public void setUsernumber(String usernumber) {
		this.usernumber = usernumber;
	}

	private String checkCode;// 验证码

	// must be same to app-security.xml
	private String key = "RememberAppUser";

	// private String rememberMe;//自动登录
	@Resource
	private AppUserService userService;
	@Resource
	private SysConfigService sysConfigService;
	@Resource(name = "authenticationManager")
	private AuthenticationManager authenticationManager = null;
	/**
	 * license, 如果存在授权文件，那么本次不校验license，在某个时机进行license校验，直接进入登陆验证。
	 * @return
	 */
	public boolean check(){
		try{
			@SuppressWarnings("unused")
			int aa = Integer.valueOf(param.getUser());
			aa = AppUtil.getOnlineUsers().size();
			return AppUtil.getOnlineUsers().size() < Integer.valueOf(param.getUser());
		} catch (Exception e){
			return false;
		}
	}
	public String auth(){
		
		return SUCCESS;
	}
	
	/**
	 * 登录
	 * 
	 * @return
	 */
	public String login() {
		
		// 定义验证信息
		StringBuffer msg = new StringBuffer("{msg:'");
		
		
		// 取得验证码配置
		SysConfig codeConfig = sysConfigService.findByKey("codeConfig");

		// 取得验证码
		Captcha captcha = (Captcha) getSession().getAttribute(Captcha.NAME);
		Boolean login = false;

		String newPassword = null;
		
		if(! check() ){
			msg.append("登陆用户数超过授权人数，无法登陆！'");
			msg.append(",failure:true}");
			setJsonString(msg.toString());
			return SUCCESS;
		}
		System.out.println("当前密码："+password);
		// 用户名不为空
		if (!"".equals(username) && username != null) {
			setUser(userService.findByUserName(username));
			// 验证用户是否存在
			if (user != null) {
				// 密码不为空
				if (StringUtils.isNotEmpty(password)) {
					// 密码加密
					newPassword = StringUtil.encryptSha256(password);
					System.out.println("当前密码-加密后："+newPassword);
					// 密码验证
					if (user.getPassword().equalsIgnoreCase(newPassword)) {
						// 判断是否需要验证码验证
						if (codeConfig != null
								&& codeConfig.getDataValue().equals(
										SysConfig.CODE_OPEN)) {
							if (captcha == null) {
								msg.append("请刷新验证码再登录.'");
							} else {
								// 验证码验证
								if (captcha.isCorrect(checkCode)) {
									login = dyPwdCheck(msg, login);
								} else
									msg.append("验证码不正确.'");
							}
						} else {
							// 此处不需要验证码验证
							login = dyPwdCheck(msg, login);
							//添加有效日期校验
							//login = login && isDateValid(this.user);
							if(dateMsg!=null&&!dateMsg.equals("")){
								msg.append(dateMsg);
							}
						}
						
					} else
						msg.append("密码不正确.'");
				} else
					msg.append("密码不能为空.'");
			} else
				msg.append("用户不存在.'");
		}
		if (login) {
			UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(
					username, password);
			SecurityContext securityContext = SecurityContextHolder
					.getContext();
			securityContext.setAuthentication(authenticationManager
					.authenticate(authRequest));
			SecurityContextHolder.setContext(securityContext);
			//测试是否可以修改这里的东东...
//			getSession().setAttribute(AuthenticationProcessingFilter.SPRING_SECURITY_LAST_USERNAME_KEY,
//							username);
			
			String rememberMe = getRequest().getParameter(
					"_spring_security_remember_me");
			//把工号信息加入到cookie里
			getSession().setAttribute("usernumber",usernumber);
			getSession().setAttribute("username",username);
			if (rememberMe != null && rememberMe.equals("on")) {
				// 加入cookie
				long tokenValiditySeconds = 1209600; // 14 days
				long tokenExpiryTime = System.currentTimeMillis()
						+ (tokenValiditySeconds * 1000);
				// DigestUtils.md5Hex(username + ":" + tokenExpiryTime + ":" +
				// password + ":" + getKey());
				String signatureValue = DigestUtils.md5Hex(username + ":"
						+ tokenExpiryTime + ":" + user.getPassword() + ":"
						+ key);
				String tokenValue = username + ":" + tokenExpiryTime + ":"
						+ signatureValue;
				String tokenValueBase64 = new String(Base64
						.encodeBase64(tokenValue.getBytes()));
				getResponse().addCookie(
						makeValidCookie(tokenExpiryTime, tokenValueBase64));
			}
			msg.append("',success:true}");
			setJsonString(msg.toString());
			/**
			 * jforum论坛整合
			 */
			try {
				username = URLEncoder.encode(username,"UTF-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
			Cookie cookie = new Cookie("jforumSSOCookieNameUser", username+","+user.getPassword()+","+user.getEmail());
			cookie.setMaxAge(-1);
			cookie.setPath("/");
			getResponse().addCookie(cookie);
		} else {
			msg.append(",failure:true}");
			setJsonString(msg.toString());
		}
		
		return SUCCESS;
	}

	private String dateMsg;
	protected boolean isDateValid(AppUser appuser){
		java.util.Date curDate = new java.util.Date();
//		java.text.DateFormat df = new java.text.SimpleDateFormat("yyyy-MM-dd");
//		curDate = df.parse(curDate);
		if(appuser.getBeginDate().getTime() > curDate.getTime()){
//			dateMsg = "用户无法登陆，请联系管理员.'";
			dateMsg = "1" + "__" + appuser.getUserId() + "";
			return false;
		} else if(appuser.getEndDate().getTime() <= curDate.getTime()){
//			dateMsg = "密码过期，请修改密码！'";
			dateMsg = "2" + "__" + appuser.getUserId() + "";
			return true;
		}
		return true;
	}
	
	// add Cookie
	protected Cookie makeValidCookie(long expiryTime, String tokenValueBase64) {
		HttpServletRequest request = getRequest();
		Cookie cookie = new Cookie(
				TokenBasedRememberMeServices.SPRING_SECURITY_REMEMBER_ME_COOKIE_KEY,
				tokenValueBase64);
		cookie.setMaxAge(60 * 60 * 24 * 365 * 5); // 5 years
		cookie.setPath(org.springframework.util.StringUtils.hasLength(request
				.getContextPath()) ? request.getContextPath() : "/");
		return cookie;
	}

	public AppUser getUser() {
		return user;
	}

	public void setUser(AppUser user) {
		this.user = user;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getCheckCode() {
		return checkCode;
	}

	public void setCheckCode(String checkCode) {
		this.checkCode = checkCode;
	}

	private boolean dyPwdCheck(StringBuffer msg, boolean login) {
		// 取得动态密码配置
		SysConfig dyPwdConfig = sysConfigService.findByKey("dynamicPwd");
		// 判断是否需要动态密码
		if (dyPwdConfig != null
				&& dyPwdConfig.getDataValue().equals(SysConfig.DYPWD_OPEN)) {
			// 动态密码配置为打开状态
			if (user.getUserId().longValue() == AppUser.SUPER_USER.longValue()) {
				// 假如是超级管理员,则不需要动态密码
				login = true;
			} else {
				if (StringUtils.isEmpty(user.getDynamicPwd())) {
					msg.append("此用户未有令牌,请联系管理员.'");
				} else if (user.getDyPwdStatus().shortValue() == AppUser.DYNPWD_STATUS_UNBIND
						.shortValue()) {
					msg.append("此用户令牌未绑定,请联系管理员.'");
				} else {
					String curDynamicPwd = getRequest().getParameter(
							"curDynamicPwd");
					HashMap<String, String> input = new HashMap<String, String>();
					input.put("app", "demoauthapp");
					input.put("user", user.getDynamicPwd());
					input.put("pw", curDynamicPwd);

					String result = userService.initDynamicPwd(input, "verify");
					if (result.equals("ok")) {
						if (user.getStatus() == 1) {
//							if(user.getBeginDate().after(new Date())){
//								msg.append("此用户未到使用时间.禁止登陆!'");
//							}else{
//								login = true;
//							}
							msg.append("成功...");
							login = true;
						} else {
							msg.append("此用户已被注销.禁止登陆!'");
						}
					} else {
						msg.append("令牌不正确,请重新输入.'");
					}
				}
			}

		} else {
			// 此处不需要动态密码
			// 判断用户是否被禁用,超级管理员不可被禁用
			if (user.getStatus() == 1
					|| user.getUserId().longValue() == AppUser.SUPER_USER
							.longValue()) {
//				if(user.getBeginDate().after(new Date())){
//					msg.append("此用户未到使用时间.禁止登陆!'");
//				}else{
//					login = true;
//				}
				login = true;
			} else{
				msg.append("此用户已被注销.禁止登陆!'");
			}
		}

		return login;
	}
}
