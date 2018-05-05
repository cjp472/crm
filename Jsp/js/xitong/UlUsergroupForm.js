/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class UlUsergroupForm
 * @extends Ext.Window
 * @description UlUsergroup表单
 * @company 优创融联科技
 */

var UlUsergroupForm = function(_title,_pkUsergroupId,_groupParentId,_isEdit) {
	return this.setup(_title,_pkUsergroupId,_groupParentId,_isEdit);
};


UlUsergroupForm.prototype.setup = function(_title,_pkUsergroupId,_groupParentId,_isEdit) {
	
		if(_groupParentId!=null){
			Ext.Ajax.request({
				url : __ctxPath + '/xitong/getParentNameUlUsergroup.do',
				async:true,
				scope:this,
				params : {pkUsergroupId : _groupParentId},
				method : 'post',
				success : function(response) {
					var result = Ext.util.JSON.decode(response.responseText);
					if(result==null||result=="null"||result=='undefine')
						Ext.getCmp('folderSelectorGroup').setValue("UniCC");
					else{
						var usergroupName = result.usergroupName;
						Ext.getCmp('folderSelectorGroup').setValue(usergroupName);
					}
	            }
			});
		}
		var _url = __ctxPath + '/xitong/treeLoadUlUsergroup.do';// 不把根目录显示出来
		var folderSelectorGroup = new UsergroupTreeSelector('folderSelectorGroup',
				_url, '上级组', 'ulUsergroup.parentId', false, '100%',
				_groupParentId != null ? true : false);

		checkOrgName = function(val){
		 var usergroupName = Ext.get('ulUsergroup.usergroupName').dom.value;
		 var pkUsergroupId = Ext.get('ulUsergroup.pkUsergroupId').dom.value;
		 Ext.Ajax.request({
		    url : __ctxPath + '/xitong/listUlUsergroup.do',
		    params : {
		     'Q_usergroupName_S_EQ' : usergroupName,
			 'Q_pkUsergroupId_L_NEQ' : pkUsergroupId
		    },
		       success : function(form, action) {
		       	if(val.length<=0){
		       		Ext.getCmp('ulUsergroup.usergroupName').markInvalid('名称不能为空!');
		       		Ext.getCmp('btnSave').disable();
		       	} else {
				    var info = Ext.decode(form.responseText);
					if(info.totalCounts>0){
				    	Ext.getCmp('ulUsergroup.usergroupName').markInvalid('名称不能重复!');
				    	Ext.getCmp('btnSave').disable();
					}else{
				     	Ext.getCmp('ulUsergroup.usergroupName').clearInvalid(true);
				     	Ext.getCmp('btnSave').enable();
					}
		       	}
			   }
		   });
	}
	
	var usersSelectPanel = ugUserSelector.getView(function(){},false,false,false,_pkUsergroupId);
	var userGrid = usersSelectPanel.findByType('editorgrid')[1];
	
	var footToolbar = this.initFooterToolbar(_pkUsergroupId,userGrid);
	
	var ugroupform = new Ext.form.FormPanel({
				reader : new Ext.data.JsonReader({
					root : 'data'
				}, 
				[{
					name : 'ulUsergroup.pkUsergroupId',
					mapping : 'pkUsergroupId'
				}, {
					name : 'ulUsergroup.usergroupName',
					mapping : 'usergroupName'
				}, {
					name : 'ulUsergroup.parentId',
					mapping : 'parentId'
				}, {
					name : 'ulUsergroup.comment',
					mapping : 'comment'
				}, {
					name : 'ulUsergroup.usergroupLevel',
					mapping : 'usergroupLevel'
				}, {
					name : 'ulUsergroup.path',
					mapping : 'path'
				}
				]),
		id : 'UlUsergroupForm',
		title : _title,
		border : false,
		autoScroll : true,
		bodyStyle : "background-color: transparent;",
		labelAlign : "right",
		tbar : footToolbar,
		defaults : {
			anchor : '98%,100%',
			xtype : 'panel'
		},
		url : __ctxPath + '/xitong/saveUlUsergroup.do',
		layout : 'form',
		items : [{
		autoHeight : true,
		border : false,
		defaults : {
			anchor : '100%,100%'
		},
			items : [{
				xtype : 'panel',
				border : false,
				layout : 'hbox',
				layoutConfig : {
					padding : '5',
					align : 'middle'
				},
				defaults : {
					style : 'padding:0px 5px 0px 5px;',
					anchor : '99%,98%',
					height : 130,
					width : '100%'
				},
				items : [{
					id : 'ulUserGroupInfo',
					xtype : "panel",
					labelWidth : 50,
					defaults : {
						anchor : '98%,98%'
					},
					bodyStyle : 'padding:5px;',
					layout : 'form',
					defaultType : "textfield",
					labelAlign : "right",
					border : false,
					hideLabels : false,
					items : [{
						name : 'ulUsergroup.pkUsergroupId',
						id : 'ulUsergroup.pkUsergroupId',
						xtype : 'hidden',
						value : this._pkUsergroupId == null ? '' : this._pkUsergroupId
					}, {
						
						xtype : 'container',
						layout : 'column',
						flex : 1,
						items : [{
							columnWidth : .50, 
							xtype : 'container',
							layout : 'form',
							items : [{
								fieldLabel : '名称',
								name : 'ulUsergroup.usergroupName',
								id : 'ulUsergroup.usergroupName',
								xtype : 'textfield',
								allowBlank : false,
								anchor : '100%',
								validator : checkOrgName,
								maxLength : 20
							}]},{
								columnWidth : .50, 
								xtype : 'container',
								layout : 'form',
								items : [ folderSelectorGroup , {
									fieldLabel : '上级组',
									name : 'ulUsergroup.parentId',
									xtype : 'hidden',
									id : 'ulUsergroup.parentId'
								}]}
//								,{
//									columnWidth : .34, 
//									xtype : 'container',
//									layout : 'form',
//									hidden : true,
//									items : [{
//										fieldLabel : '状态',
//										hiddenName : 'ulUsergroup.usergroupLevel',
//										allowBlank : false,
//										xtype : 'mtdiccombo',
//										editable : true,
//										anchor : '100%',
//										lazyInit : false,
//										forceSelection : false,
//										itemKey : 'UG001'
//								}]
//								}
							]
					}, {
						fieldLabel : '备注',
						name : 'ulUsergroup.comment',
						id : 'ulUsergroup.comment',
						xtype : 'textarea',
						anchor : '98%',
						maxLength : 1000
					}]
				}]
			}]
		}, {
				xtype : 'fieldset',
				id : 'rolesFieldset',
				columnWidth : 0.5,
				title : "角色信息",
//				collapsed : true,
				collapsible : true,
				autoHeight : true,
				defaults : {
					anchor : '100%,100%'
				},
				items : {
					xtype : 'panel',
					height : 220,
					border : false,
	
					items : [{
						xtype : 'itemselector',
						id : 'UsergroupRoles',
						name : 'UsergroupRoles',
						fromLegend : '',
						flex : 1,
						imagePath : __ctxPath + '/ext3/ux/images/',
						defaults : {
							anchor : '100%,100%'
						},
						layout : {
							type : 'hbox',
							align : 'stretch'
						},
						multiselects : [{
							id : 'chooseRoles',
							title : '可选角色',
							height : 220,
							width : Ext.getCmp('centerTabPanel').getInnerWidth()
									/ 2,
							autoWidth : true,
							store : new Ext.data.SimpleStore({
								autoLoad : true,
								baseParams : {
									pkUsergroupId : _pkUsergroupId
								},
								url : __ctxPath
										+ '/xitong/chooseRolesUlUsergroup.do',
								fields : ['roleId', 'roleName']
							}),
							displayField : 'roleName',
							valueField : 'roleId'
						}, {
							id : 'selectedRoles',
							name : 'selectedRoles',
							title : '已有角色',
							height : 220,
							width : Ext.getCmp('centerTabPanel').getInnerWidth()
									/ 2,
							store : new Ext.data.SimpleStore({
								autoLoad : true,
								baseParams : {
									pkUsergroupId : _pkUsergroupId
								},
								url : __ctxPath + '/xitong/selectedRolesUlUsergroup.do',
								fields : ['roleId', 'roleName']
							}),
							tbar : [{
								text : '清除所选',
								handler : function() {
									Ext.getCmp('UlUsergroupForm').getForm()
											.findField('UsergroupRoles').reset();
								}
							}],
							displayField : 'roleName',
							valueField : 'roleId'
					}]
				}]
			}
		}]
		
		
	});
	return ugroupform;
}

// 初始化操作菜单
UlUsergroupForm.prototype.initFooterToolbar = function(_pkUsergroup,userGrid) {

	var toolbar = new Ext.Toolbar({
		id : 'usergroupFormToolbar',
		height : 30,
		items : ['->', {
			text : '取消',
			iconCls : 'btn-del',
			handler : function() {
				var tabs = Ext.getCmp('centerTabPanel');
				tabs.remove('UlUsergroupForm');
			}
		}, '->', {
			text : '保存',
			id : 'btnSave',
			iconCls : 'btn-save',
			handler : function() {
				var ugroupform = Ext.getCmp('UlUsergroupForm');
				//添加用户组
				var userStore = userGrid.getStore();
				var userParams = [];
				var usercnt = userStore.getCount();
				var insertUser = true;
				for (i = 0; i < usercnt; i++) {
					var rec = userStore.getAt(i);
					userParams.push(rec.data.userId);
				}
				if(ugroupform.getForm().isValid()){
					ugroupform.getForm().submit({
						waitMsg : '正在提交用户组信息',
						params : {
							userParams : Ext.encode(userParams)
						},
						success : function(ugroupform, o) {
							Ext.ux.Toast.msg('操作信息', '保存成功！');
							Ext.getCmp('UlUsergroupGrid').getStore().reload();//重新加载list数据
							Ext.getCmp('UlUsergroupTree').root.reload();
							var tabs = Ext.getCmp('centerTabPanel');
							tabs.remove('UlUsergroupForm');
						},
						failure : function(ugroupform, o) {
							Ext.ux.Toast.msg("操作信息", '操作失败');
						}
					});
				}
			}
		}]
	});
	return toolbar;
};