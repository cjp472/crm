package com.ulane.monitor.dao.unim.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.util.StringUtil;
import com.ulane.monitor.dao.unim.UnimAgentDao;
import com.ulane.monitor.model.unim.UnimAgent;
import com.ulane.monitor.model.unim.UnimCategory;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */

@SuppressWarnings("unchecked")
public class UnimAgentDaoImpl extends BaseDaoImpl<UnimAgent> implements
		UnimAgentDao {

	public UnimAgentDaoImpl() {
		super(UnimAgent.class);
	}

	@Override
	public List<UnimAgent> listByMonitorForUnimAgent(Long agentId) {
		final String hql = "from UnimAgent d where d.agentId in (select d2.comp_id.monitorAgentId from UnimMonitorAgent d2 where d2.comp_id.agentId=?)";
		Object[] params = { agentId };
		return findByHql(hql, params);
	}

	public List<UnimAgent> search(Integer searchMode, String searchKey,
			Boolean isIgnoreCase, Boolean isAllMatch) {
		String attribute = "";
		switch (searchMode.intValue()) {
		case 1:
			attribute = "name";
			break;
		case 2:
			attribute = "agentNum";
			break;
		case 3:
			attribute = "name";
			break;
		case 4:
			attribute = "desc";
		}

		String bzSearchKey = searchKey;
		if ((searchKey != null) && (searchMode.intValue() != 2)) {
			searchKey = "'" + searchKey + "'";
		}

		String op = "";
		String key = "";

		if ((isAllMatch.booleanValue()) || (searchMode.intValue() == 2)) {
			op = " = ";
			key = searchKey;
		} else {
			op = " like ";
			key = "'%" + bzSearchKey + "%'";
		}

		String field = "";
		if ((isIgnoreCase.booleanValue()) && (searchMode.intValue() != 2)) {
			if (searchMode.intValue() == 3) {
				field = "lower(e." + attribute + ")";
				key = "lower(" + key + ")";
			} else {
				key = "lower(" + key + ")";
				field = "lower(t." + attribute + ")";
			}
		} else if (searchMode.intValue() == 3)
			field = "e." + attribute;
		else {
			field = "t." + attribute;
		}

		String hql = "";
		if (bzSearchKey == null)
			hql = "from Agent t";
		else {
			hql = "from Agent t where " + field + op + key;
		}

		if (searchMode.intValue() == 3) {
			hql = "from Agent t inner join fetch t.skillgroups e where "
					+ field + op + key;
		}

		List result = this.findByHql(hql);
		return result;
	}

	public UnimAgent getByAgentNum(String agentNum) {
		String hql = "from UnimAgent t where t.aid = " + agentNum;
		UnimAgent agent = (UnimAgent) this.findByHql(hql).get(0);

		// if (agent.getIsmonitor().intValue() == 2) {
		// UnimCategory agentClass = this.getCategory(
		// Integer.valueOf(1), agent.getAgentCode());
		// agent.setAgentClass(agentClass);
		// }
		return agent;
	}

	//add by liuqh
	public List<UnimAgent> login(String agentNum, String pass)

	{
		String passEncrypt = StringUtil.encryptSha256(pass);
		//String hql = "select t from AppUser t2,UnimAgent t where t2.ulEmployee.userNo=? and t2.password=? and t2.status=1 and t.userId=t2.userId and t.ismonitor=1 and t.status=1 ";
		String hql = "select t from AppUser t2,UnimAgent t where t2.username=? and t2.password=? and t2.status=1 and t.userId=t2.userId and t.ismonitor=1 and t.status=1 ";
		Object[] param = { agentNum, passEncrypt };
		return this.findByHql(hql, param);
	}

	public List<UnimAgent> listGeneralAgents() {
		String hql = "from UnimAgent t where t.ismonitor = 2";
		List result = this.findByHql(hql);
		// Category agentClass = null;
		// for (int i = 0; i < result.size(); ++i) {
		// UnimAgent agent = (UnimAgent)result.get(i);
		// agentClass =
		// this.categoryManager.getCategory(Constant.cateGory_AgentClass,
		// agent.getCode());
		// agent.setAgentClass(agentClass);
		// }

		return result;
	}

	@Override
	public String saveAgtAndSkg(Map<String, String> param) {
		String skgIds = param.get("skgIds");
		String agtId = param.get("agtId");
		
		if(StringUtils.isNotBlank(agtId)) {
			//====删除已有的agentId对应的数据
			String deleteSQL = "delete unim_agent_skillgroup where agent_id="+agtId;
			jdbcTemplate.execute(deleteSQL);
			
			//====新增数据
			String[] ids = null;
			if(param.containsKey("monitorSaveType")) {
				ids = StringUtils.split(skgIds, "_");
			} else {
				ids = StringUtils.split(skgIds, ",");
			}
			
			for(String id : ids) {
				if(StringUtils.isNotBlank(id)) {
					String insertSQL = "insert into unim_agent_skillgroup(agent_id,skillgroup_id) values("+agtId+","+id+")";
					jdbcTemplate.execute(insertSQL);
				}
			}		
		}
		return null;
	}

	@Override
	public String saveAgtAndMap(Map<String, String> param) {
		String mapIds = param.get("maps");
		String agtId = param.get("agtId");
		
		if(StringUtils.isNotBlank(agtId)) {
			//====删除已有的agentId对应的数据
			String deleteSQL = "delete unim_map_agent where agent_id="+agtId;
			jdbcTemplate.execute(deleteSQL);
			
			//====新增数据
			String[] ids = StringUtils.split(mapIds, "_");
			for(String id : ids) {
				if(StringUtils.isNotBlank(id)) {
					String insertSQL = "insert into unim_map_agent(agent_id,map_id) values("+agtId+","+id+")";
					jdbcTemplate.execute(insertSQL);
				}
			}		
		}
		return null;
	}

	@Override
	public String saveAgtAndMonitor(Map<String, String> param) {
		String moniterIds = param.get("moniterIds");
		String agtId = param.get("agtId");
		
		if(StringUtils.isNotBlank(agtId)) {
			//====删除已有的agentId对应的数据
			String deleteSQL = "delete unim_monitor_agent where agent_id="+agtId;
			jdbcTemplate.execute(deleteSQL);
			
			//====新增数据
			String[] ids = StringUtils.split(moniterIds, "_");
			for(String id : ids) {
				if(StringUtils.isNotBlank(id)) {
					String insertSQL = "insert into unim_monitor_agent(agent_id,monitor_agent_id) values("+agtId+","+id+")";
					jdbcTemplate.execute(insertSQL);
				}
			}		
		}
		return null;
	}

	@Override
	public String saveAgtAndChannel(Map<String, String> param) {
		String chnIds = param.get("chnIds");
		String agtId = param.get("agtId");
		
		if(StringUtils.isNotBlank(agtId)) {
			//====删除已有的agentId对应的数据
			String deleteSQL = "delete UNIM_CHAL_MAP_MON where agent_id="+agtId;
			jdbcTemplate.execute(deleteSQL);
			
			//====新增数据
			String[] ids = StringUtils.split(chnIds, "_");
			for(String id : ids) {
				if(StringUtils.isNotBlank(id)) {
					String insertSQL = "insert into UNIM_CHAL_MAP_MON(agent_id,CHANNEL_ID) values("+agtId+","+id+")";
					jdbcTemplate.execute(insertSQL);
				}
			}		
		}
		return null;
	}

	@Override
	public String saveAgtAndAssets(Map<String, String> param) {
		String assIds = param.get("assIds");
		String agtId = param.get("agtId");
		
		if(StringUtils.isNotBlank(agtId)) {
			//====删除已有的agentId对应的数据
			String deleteSQL = "delete UNIM_ASSETS_MAP_MON where agent_id="+agtId;
			jdbcTemplate.execute(deleteSQL);
			
			//====新增数据
			String[] ids = StringUtils.split(assIds, "_");
			for(String id : ids) {
				if(StringUtils.isNotBlank(id)) {
					String insertSQL = "insert into UNIM_ASSETS_MAP_MON(agent_id,ASSETS_ID) values("+agtId+","+id+")";
					jdbcTemplate.execute(insertSQL);
				}
			}		
		}
		return null;
	}

	@Override
	public String saveAstAndMap(Map<String, String> param) {
		String assIds = param.get("astIds");
		String agtId = param.get("agtId");
		
		if(StringUtils.isNotBlank(agtId)) {
			//====删除已有的agentId对应的数据
			String deleteSQL = "delete UNIM_ASSETS_MAP_MONITOR where agent_id="+agtId;
			jdbcTemplate.execute(deleteSQL);
			
			//====新增数据
			String[] ids = StringUtils.split(assIds, "_");
			for(String id : ids) {
				if(StringUtils.isNotBlank(id)) {
					String insertSQL = "insert into UNIM_ASSETS_MAP_MONITOR(agent_id,map_id) values("+agtId+","+id+")";
					jdbcTemplate.execute(insertSQL);
				}
			}		
		}
		return null;
	}

	@Override
	public String saveBusAndMap(Map<String, String> param) {
		String busIds = param.get("busIds");
		String agtId = param.get("agtId");
		
		if(StringUtils.isNotBlank(agtId)) {
			//====删除已有的agentId对应的数据
			String deleteSQL = "delete UNIM_CHANNEL_MAP_MONITOR where agent_id="+agtId;
			jdbcTemplate.execute(deleteSQL);
			
			//====新增数据
			String[] ids = StringUtils.split(busIds, "_");
			for(String id : ids) {
				if(StringUtils.isNotBlank(id)) {
					String insertSQL = "insert into UNIM_CHANNEL_MAP_MONITOR(agent_id,map_id) values("+agtId+","+id+")";
					jdbcTemplate.execute(insertSQL);
				}
			}		
		}
		return null;
	}
}