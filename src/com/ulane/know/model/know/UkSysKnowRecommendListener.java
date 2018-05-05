package com.ulane.know.model.know;

import java.util.Timer;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UkSysKnowRecommendListener implements ServletContextListener {
	private final static Logger log = LoggerFactory
			.getLogger(UkSysKnowRecommendListener.class);
	private Timer timer = null;

	@Override
	public void contextDestroyed(ServletContextEvent event) {
		log.info("知识推荐引擎监听启动");
		Timer timer = new Timer(true);
		event.getServletContext().log("定时器已启动");// 添加日志，可在tomcat日志中查看到
		timer.schedule(new UkSysKnowRecommendTimer(event.getServletContext()),
				0l, (60 * 60 * 1000 * 2));
		// 调用UkSysKnowRecommendTimer，0表示任务无延迟，5*1000表示每隔5秒执行任务，60*60*1000表示一个小时。
		event.getServletContext().log("已经添加任务");
	}

	@Override
	public void contextInitialized(ServletContextEvent event) {
		timer.cancel();
		event.getServletContext().log("定时器销毁");
	}

}
