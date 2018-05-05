package com.htsoft.oa.action.system;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */

import java.util.List;
import javax.annotation.Resource;

import com.htsoft.core.util.JsonUtil;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;

import com.htsoft.oa.model.hrm.Job;
import com.htsoft.oa.model.system.UserJob;
import com.htsoft.oa.service.hrm.JobService;
import com.htsoft.oa.service.system.UserJobService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

/**
 * @description 职位人员管理
 * @class UserJobAction
 * @author 优创融联科技
 * @updater YHZ
 * @company www.ulane.cn
 * @data 2011-1-11PM
 * 
 */
public class UserJobAction extends BaseAction {
	@Resource
	private UserJobService userJobService;
	@Resource
	private JobService jobService;

	private UserJob userJob;

	private Long userJobId;

	public Long getUserJobId() {
		return userJobId;
	}

	public void setUserJobId(Long userJobId) {
		this.userJobId = userJobId;
	}

	public UserJob getUserJob() {
		return userJob;
	}

	public void setUserJob(UserJob userJob) {
		this.userJob = userJob;
	}

	/**
	 * 显示列表
	 */
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		if (userJob != null && userJob.getJob() != null
				&& userJob.getJob().getJobId() > 0) {
			Job job = jobService.get(userJob.getJob().getJobId());
			filter.addFilter("Q_job.path_S_LK", job.getPath());
		}
		List<UserJob> list = userJobService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"),
				new String[] { "appUser.accessionTime","appUser.beginDate","appUser.endDate" });//add 两个日期
		buff.append(serializer.serialize(list));
		buff.append("}");
		jsonString = buff.toString();

		return SUCCESS;
	}

	/**
	 * 批量删除
	 * 
	 * @return
	 */
	public String multiDel() {

		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				userJobService.remove(new Long(id));
			}
		}

		jsonString = "{success:true}";

		return SUCCESS;
	}

	/**
	 * 显示详细信息
	 */
	public String get() {
		UserJob userJob = userJobService.get(userJobId);
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(JsonUtil.getJSONSerializer(new String[] { "accessionTime" })
				.serialize(userJob));
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	/**
	 * 添加及保存操作，添加主职位时，判断是否已经添加多个主职位
	 */
	public String save() {
		String msg = "{success:true,msg:'数据操作成功！'}";
		Long userId = userJob.getAppUser().getUserId();
		if (userJob.getIsMain().equals(UserJob.ISMIAN)
				&& userJobService.IsExistsjob(userJob.getUserJobId(), userId)) {
			msg = "{failure:true,msg:'对不起，该用户已经存在主职位，请添加副职位！'}";// 存在
			setJsonString(msg);
			return SUCCESS;
		}
		// 判断是否为添加操作
		boolean isAdd = userJob != null && userJob.getUserJobId() != null ? true
				: false;
		if (!isAdd)
			msg = userJobService.add(userJob);
		else
			userJobService.save(userJob);
		setJsonString(msg);
		return SUCCESS;
	}
}
