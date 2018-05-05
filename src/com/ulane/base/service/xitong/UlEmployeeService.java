package com.ulane.base.service.xitong;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.service.BaseService;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.customer.BankType;
import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.Region;

import com.ulane.base.model.xitong.Equipment;
import com.ulane.base.model.xitong.UlEmployee;
import com.ulane.base.model.xitong.UlEmployeeEquipment;
import com.ulane.customer.model.customer.ConHis;
import com.ulane.customer.model.customer.SysWorkattendance;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unused")
public interface UlEmployeeService extends BaseService<UlEmployee>{
	
	public List<UlEmployee> findByDepartment(String path, PagingBean pb);
	public UlEmployee getEmployeeByUserNo(String userNo);
	
	/**
	 *2014-3-16 删除员工的所有的信息，包括与其有相关的关联关系的员工档案的信息
	 * @param defId
	 */
	public void ulEmployeeDel(Long employeeid);
	//03/14
	public AppUser selectSomeOne();
	
	/**
	 * 员工选择器分页总数
	 * @return
	 */
	public Integer getEmployeeCount();
	//2014-3-24 查询list
	public List<UlEmployee> getShowList();
	/*
	 *1 员工档案删除     2014/4/24 
	 * */

	//update 03/21
	public void update(AppUser au);
	public List<AppUser>updateOnly(Long id);
	

	//select 03/21
	public AppUser selectSomeOne(Long id);
	
	public List<AppUser> selectSome(Long id);
	//select 2014/5/5 appuser
	public List<AppUser> selectOnly(Long id);
	//update 2014/5/5 appuser
	public void getUpdateDelAppUser(Long useid);
	/*2014/4/2 设备管理*/
	
    //1 设备管理查询list
	public List<Equipment> getShowEquipment(String equipmentId,String equipmentName);
	public String getShowEquipment(Integer start, Integer limit,String equipmentId,String equipmentName);
	public List<Equipment> getShowEquipment();
	public List<Equipment> getShowEquipment(Integer start, Integer limit);
	
	// 设备管理的删除
	public void getDelEquipement(Long EId);
	// 2014/5/8  设备管理与业务资料
	
	
    
	
     //2014/6/3
     public List<Equipment> getEqName(String id);
     public Equipment getselectEqName(String id)throws Exception;
     // select ConHis 
     public List<ConHis> selectCoHis();
	
	//设备管理 修改
	public void  updateEquipment(Long EId,String equipmentId,String equipmentName);
	
	//设备管理的保存
	public void addEquipment(String newname,String newId);
	
	
	
	//=============================================
	/**
	 * 2014/11/7
	 * 设备管理的查询
	 * （带分页）
	 * nk
	 */
	
	public List<Equipment>  listEquipment(Integer start, Integer limit, String bankname, String branchId,String operatorId);
			
	public Integer listEquipmentCount(String bankname, String branchId,String operatorId);
     public Equipment getByEquipmentId(String equipmentId);
	
	//设备管理的保存
	public void addlistEquipment(String equipmentId,
			String operatorId,String equipmentName,String branchId,
			String curdate,String bankTypeId,String bankTypeName,String ip,String parentId,String address,String parentName);
	//设备管理的编辑
	public void updatelistEquipment(Long EId,String equipmentId,
			String operatorId,String equipmentName,String branchId,
			String curdate,Long bankTypeId,String bankTypeName,String ip,Long parentId,String address,String parentName);
	// 查询角色用户名
	public List<AppRole> getRoleName();
	//保存部门的depid---
	public void updateDepid(Long userid);
	public List<UlEmployee> SelectUlempList(Integer start, Integer limit,
			String fullname, String userNo, String zhiwei);

	public int SelectUlempListCount(String fullname, String userNo,
			String zhiwei);
	public AppRole selectRoleZWName(Long zhiwei);
	public List<AppRole> selectRoleName();
	/****
	根据角色的权限来显示机构部门
	 显示树形列表，实际上是tree()*/
	public List<BankType> findByParentId(Long long1);
	public List<BankType> collectFindByParentIdForRole(Long id);
	public List<BankType> findRoleByParentIdForSql(final int start,final int limit,String path);
	public int findRoleByParentIdForSqlCount(final int start,final int limit,String path);
	public List<AppUser> selectPhoto(Long long1);
	public List<AppUser> selectUserid(Long long1);

	/**
	 * 根据所选的机构查询所有的设备信息
	 * @author wangkaijuan
	 * @param equipmentName 
	 * @return 20151025
	 * */
	public List<Equipment> ulempEquipSelect(Integer start, Integer limit,
			String operatorId, String busTypId, String equipmentName);
	public int ulempEquipSelectCount(String operatorId, String busTypId,String equipmentName);
	public void UlEmployeeEquipmentsave(String userNo, String operatorId ,Long userid, String equipmentId, Long eqEIds);
	public void getDelteULEmpEquip(Long useid);
	public List<UlEmployee> EquipmentULEmploySelect(Integer start,
			Integer limit, String ulEmpBTypeId, String userNo, String fullname);
	public int EquipmentULEmploySelectCount(String ulEmpBTypeId, String userNo, String fullname);
	public void EquipmentUlEmployeesave(String UlEmpEquips, String operatorId,
			Long eid, String equipmentId, Long useid);
	public void getDelteEquip(Long eid);
	public List<UlEmployeeEquipment> selectEquipmentId(String useid);
	public List<UlEmployeeEquipment> selectUlEmployeeId(String useid);
	
	  
	
}


