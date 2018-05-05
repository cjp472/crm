package com.htsoft.core.dao.pool;

import java.sql.SQLException;
import java.util.TimerTask;

import org.apache.log4j.Logger;

public class JdbcPoolTimerTask extends TimerTask {
	public static final Logger logger = Logger.getLogger(JdbcPoolTimerTask.class);

	@Override
	public void run() {
		try {
			logger.debug("### update the JdbcPool!");
			JdbcPool.updatepool();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
