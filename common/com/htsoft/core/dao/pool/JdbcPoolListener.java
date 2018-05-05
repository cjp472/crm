package com.htsoft.core.dao.pool;

import java.util.Timer;
import java.util.TimerTask;

public class JdbcPoolListener {

	public void run(){
		TimerTask tt = new JdbcPoolTimerTask();
		Timer mt = new JdbcPoolTimer();
		mt.schedule(tt, 1000, 15000);//每隔15秒检查一次连接池
	}
	
}
