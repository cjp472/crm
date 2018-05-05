package com.ulane.customer.model.customer;

import java.io.Serializable;


/**
 * 系统日报表报表视图 
 * 报表需要的主键id字段
 * 通过访问EveryDayReport.getId().get...   获取EveryDayReportId中字段的属性值
 * @author Mr.Hu
 *
 */
public class EveryDayReport implements Serializable {
	
	private EveryDayReportId id;
	
	public EveryDayReport(){
		super();
	}
	
	public EveryDayReportId getId() {
		return id;
	}

	public void setId(EveryDayReportId id) {
		this.id = id;
	}
	
}
