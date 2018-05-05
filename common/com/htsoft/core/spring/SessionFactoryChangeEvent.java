package com.htsoft.core.spring;

import org.springframework.context.ApplicationEvent;
/**
 * 用于更新SessionFactory的事件
 * @author cf0666@gmail.com
 *
 */
public class SessionFactoryChangeEvent extends ApplicationEvent {
	private static final long serialVersionUID = 1L;

	public SessionFactoryChangeEvent(Object paramObject) {
		super(paramObject);
	}
}