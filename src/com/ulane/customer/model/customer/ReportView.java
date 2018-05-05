package com.ulane.customer.model.customer;

import java.io.Serializable;
/**
 * 座席运营报表视图 
 * 报表需要的主键id字段
 * 通过访问reportView.getId().get...   获取ReportViewId中字段的属性值
 * @author Mr.Hu
 *
 */
public class ReportView implements Serializable {
	private ReportViewId id;

	public ReportView() {
        super();
    }
	
	public ReportViewId getId() {
		return id;
	}

	public void setId(ReportViewId id) {
		this.id = id;
	}
}
