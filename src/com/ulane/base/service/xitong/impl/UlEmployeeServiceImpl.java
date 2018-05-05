package com.ulane.base.service.xitong.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import org.jbpm.api.RepositoryService;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.system.AppUserDao;
import com.htsoft.oa.model.customer.BankType;
import com.htsoft.oa.model.flow.ProDefinition;
import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.system.AppUserService;
import com.ulane.base.dao.xitong.UlEmployeeDao;
import com.ulane.base.model.xitong.Equipment;
import com.ulane.base.model.xitong.UlEmployee;
import com.ulane.base.model.xitong.UlEmployeeEquipment;
import com.ulane.base.service.xitong.UlEmployeeService;
import com.ulane.customer.model.customer.ConHis;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unused")
public class UlEmployeeServiceImpl extends BaseServiceImpl<UlEmployee> implements UlEmployeeService{

	private UlEmployeeDao dao;
	
	// 2014-3-16
	private AppUserService appUserService;
	private RepositoryService repositoryService;
	private AppUserDao appUserDao;
	
	public UlEmployeeServiceImpl(UlEmployeeDao dao) {
		super(dao);
		System.out.println("======UlEmployeeServiceImpl======="+dao);
		this.dao=dao;
	}
	
	@Override
	public List<UlEmployee> findByDepartment(String path, PagingBean pb) {
		return dao.findByDepartment(path, pb);
	}

	public UlEmployee getEmployeeByUserNo(String userNo) {
		return dao.getEmployeeByUserNo(userNo);
	}

	@Override
	public Integer getEmployeeCount() {
		return dao.getEmployeeCount();
	}
    /* 2014-3-16 
     * */
	@Override
	public void ulEmployeeDel(Long employeeid) {
		//删除AppUser 相关的数据
		//appUserService.removeByDefId(employeeid);
		AppUser au=appUserService.get(employeeid);
		if(au!=null&& au.getEmployeeid()!=null && au.getStatus()==3 || au.getStatus()==5 ){
			 
				 try{
					//删除Jbpm的流程定义
						repositoryService.deleteDeploymentCascade(au.getEmployeeid());
					}catch(Exception ex){
						logger.error(ex);
					}
			 
			
			
			
		}
		//删除流程定义
		appUserService.remove(au);
		
	}
	public void update(AppUser au) {
		// TODO Auto-generated method stub
		dao.update(au);
	}

	@Override
	public AppUser selectSomeOne(Long id) {
		// TODO Auto-method stub
		return dao.selectSomeOne(id);
	} 
	
//	public List<AppUser> selectOnly(Long id) {
//		// TODO Auto-method stub
//		return dao.selectOnly(id);
//	} 
	

	// 查询list 2014-3-24
	public List<UlEmployee> getShowList() {
		// TODO Auto-generated method stub
		System.out.println("service==========");
		return dao.getShowList();
	}
     
	public AppUser selectSomeOne() {
		// TODO Auto-generated method stub
		System.out.println("service=======用户管理查询成功！");
		return null;
	}
	
	/**2014/4/2
	 * 带条件的查询
	 * **/
	@Override
	public List<Equipment> getShowEquipment(String equipmentId,String equipmentName) {
		System.out.println("servic    success");
		return dao.getShowEquipment(equipmentId, equipmentName);
	}
	
	
	/*查询 
	 * 修改时间  2014/4/23
	 * */
	public List<Equipment> getShowEquipment() {
		System.out.println("servic    success");
		return dao.getShowEquipment();
	}
	
	public List<Equipment> getShowEquipment(Integer start, Integer limit) {
		System.out.println("servic    success");
		return dao.getShowEquipment(start,limit);
	}
	
     
	
	/**2014/4/2
	 * 批量删除和单个记录删除
	 * **/
	public void getDelEquipement(Long EId) {
		System.out.println("删除成功");
		dao.getDelEquipment(EId);
		
	}
	/**2014/4/2
	 * 设备管理的添加
	 * **/
	@Override
	public void updateEquipment(Long EId,String equipmentId,String equipmentName) {
		System.out.println("=========updata==");
		 //dao.updateEquipment(EId);
		dao.updateEquipment(EId, equipmentId, equipmentName);
		
		
	}

	//添加设备2014/4/24
	@Override
	public void addEquipment(String newname, String newId) {
		System.out.println("===============add  service  success");
		dao.addEquipment(newname, newId);
		
	}

	@Override
	public List<AppUser> selectSome(Long id) {
		// TODO Auto-generated method stub
		System.out.println("service     success");
		return dao.selectOnly(id);
	}

	@Override
	public List<AppUser> updateOnly(Long id) {
		// TODO Auto-generated method stub
		System.out.println("service sucess!");
		return dao.selectOnly(id);
	}

	@Override
	public void getUpdateDelAppUser(Long useid) {
		System.out.println("service  appusersucess");
		dao.getUpdateDelAppUser(useid);
		
	}

	@Override
	public List<AppUser> selectOnly(Long id) {
		System.out.println("appUser  service  success");
		return dao.selectOnly(id);
	}

	@Override
	public List<Equipment> getEqName(String id) {
		System.out.println("SUCCESS QUEERYFIRLTER!!!");
		return dao.getEqName(id);
	}

	@Override
	
	public String getShowEquipment(Integer start, Integer limit,
			String equipmentId, String equipmentName) {
		System.out.println("分页查询成功   service！！！！！！！！！！");
		return dao.getShowEquipment(start, limit, equipmentId, equipmentName);
	}

	@Override
	/*
	 * 2014/06/09  设备管理和业务资料
	 * */
	public Equipment getselectEqName(String id)throws Exception {
		// TODO Auto-generated method stub
		System.out.println("实体equipment ！！");
		return dao.getselectEqName(id);
	}

	@Override
	/*
	 * 2014/06/09 select COnHIs
	 * */
	public List<ConHis> selectCoHis() {
	  System.out.println("  select conhis SUCCESS1！！");
		return dao.selectCoHis();
	}
//================================设备管理
	@Override
	public List<Equipment> listEquipment(Integer start, Integer limit,
			String bankname, String branchId,String operatorId) {
		System.out.println("[UlEmployeeServiceImpl]---调用：listEquipment()");
				return dao.listEquipment(start, limit, bankname, branchId, operatorId);
		// TODO Auto-generated method stub
		//return dao.listEquipment(start, limit, equipmentId, bankname, equipmentName);
	}

	@Override
	public Integer listEquipmentCount(String bankname, String branchId,String operatorId) {
		System.out.println("[UlEmployeeServiceImpl]---调用：listEquipmentCount()");
		return dao.listEquipmentCount(bankname, branchId, operatorId);
		// TODO Auto-generated method stub
		//return dao.listEquipmentCount(equipmentId, bankname, equipmentName);
	}

	@Override
	public void addlistEquipment(String equipmentId, String operatorId,
			String equipmentName, String branchId, String curdate,
			String bankTypeId, String bankTypeName, String ip, String parentId,String address,String parentName) {
		System.out.println("[UlEmployeeServiceImpl]---调用：addlistEquipment()");
		//dao.addlistEquipment(equipmentId, operatorId, equipmentName, branchId, curdate, bankTypeId, bankTypeName, ip, parentId,address);
		dao.addlistEquipment(equipmentId, operatorId, equipmentName, branchId, 
				curdate, bankTypeId, bankTypeName, ip, parentId, address, parentName);
	}

	@Override
	public Equipment getByEquipmentId(String equipmentId) {
		System.out.println("[UlEmployeeServiceImpl]---调用：getByEquipmentId()");
		return dao.getByEquipmentId(equipmentId);
	}

	@Override
	public void updatelistEquipment(Long EId, String equipmentId,
			String operatorId, String equipmentName, String branchId,
			String curdate, Long bankTypeId, String bankTypeName, String ip,
			Long parentId,String address,String parentName) {
		System.out.println("[UlEmployeeServiceImpl]---调用：updatelistEquipment()");
		//dao.updatelistEquipment(EId, equipmentId, operatorId, equipmentName, branchId, curdate, bankTypeId, bankTypeName, ip, parentId,address);
		dao.updatelistEquipment(EId, equipmentId, operatorId, equipmentName, branchId, curdate, bankTypeId, bankTypeName, ip, parentId, address, parentName);
	}


	// 查询角色用户名
	public List<AppRole> getRoleName() {
		return dao.getRoleName();
	}
	//保存部门的depid---
	public void updateDepid(Long userid) {
		dao.updateDepid(userid);
	}

	public List<UlEmployee> SelectUlempList(Integer start, Integer limit,
			String fullname, String userNo, String zhiwei) {
		return dao.SelectUlempList(start, limit, fullname, userNo, zhiwei);
	}

	public int SelectUlempListCount(String fullname, String userNo,
			String zhiwei) {
		return dao.SelectUlempListCount(fullname, userNo, zhiwei);
		
	}
	
	public AppRole selectRoleZWName(Long zhiwei) {
		return dao.selectRoleZWName(zhiwei);
	}
	public List<AppRole> selectRoleName() {
		return dao.selectRoleName();
	}
	/****
	根据角色的权限来显示机构部门
	 显示树形列表，实际上是tree()*/
	public List<BankType> findByParentId(Long long1) {
		return dao.findByParentId(long1);
	}
	public List<BankType> collectFindByParentIdForRole(Long id) {
		return dao.collectFindByParentIdForRole(id);
	}
	public List<BankType> findRoleByParentIdForSql(final int start,final int limit,String path) {
		return dao.findRoleByParentIdForSql(start, limit, path);
	}
	public int findRoleByParentIdForSqlCount(final int start,final int limit,String path) {
		return dao.findRoleByParentIdForSqlCount(start, limit, path);
	}
	public List<AppUser> selectPhoto(Long long1) {
		return dao.selectPhoto(long1);
	}
	public List<AppUser> selectUserid(Long long1) {
		return dao.selectUserid(long1);
	}
	/**
	 * 根据所选的机构查询所有的设备信息
	 * @author wangkaijuan
	 * @return 20151025
	 * */
	public List<Equipment> ulempEquipSelect(Integer start, Integer limit,
			String operatorId, String busTypId,String equipmentName) {
		return dao.ulempEquipSelect(start, limit, operatorId, busTypId,equipmentName);
	}
	public int ulempEquipSelectCount(String operatorId, String busTypId,String equipmentName) {
		return dao.ulempEquipSelectCount(operatorId, busTypId,equipmentName);
	}
	public void UlEmployeeEquipmentsave(String userNo, String operatorId,Long userid,String equipmentId,Long eqEIds) {
		dao.UlEmployeeEquipmentsave(userNo, operatorId,userid, equipmentId,eqEIds);
	}
	public void getDelteULEmpEquip(Long useid) {
		dao.getDelteULEmpEquip(useid);
	}
	public List<UlEmployee> EquipmentULEmploySelect(Integer start,
			Integer limit, String ulEmpBTypeId, String userNo,String fullname) {
		return dao.EquipmentULEmploySelect(start, limit, ulEmpBTypeId, userNo,fullname);
	}
	public int EquipmentULEmploySelectCount(String ulEmpBTypeId, String userNo,String fullname) {
		return dao.EquipmentULEmploySelectCount(ulEmpBTypeId, userNo,fullname);
	}
	public void EquipmentUlEmployeesave(String UlEmpEquips, String operatorId,
			Long eid, String equipmentId,Long useid) {
		dao.EquipmentUlEmployeesave(UlEmpEquips, operatorId, eid, equipmentId,useid);
	}
	public void getDelteEquip(Long eid) {
		dao.getDelteEquip(eid);
	}
	public List<UlEmployeeEquipment> selectEquipmentId(String useid) {
		return dao.selectEquipmentId(useid);
	}
	public List<UlEmployeeEquipment> selectUlEmployeeId(String useid) {
		return dao.selectUlEmployeeId(useid);
	}
	}