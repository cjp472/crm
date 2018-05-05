/**
 * @author:cf0666@gmail.com
 * @class QcTemplateDesignForm
 * @extends Ext.Panel
 * @description [QcTemplate]管理
 * @company 优创融联科技
 * @createtime:
 */
var clickedChap;
QcTemplateDesignForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
//		java.lang.System.out.println("hhaha");
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		QcTemplateDesignForm.superclass.constructor.call(this, {
			id : 'QcTemplateDesignFormWin',
			title : '考核模板设计',
			region : 'center',
			layout : 'border',
			items : [this.treePanel, this.gridPanel]
		});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var tmpData = this.template;
		var tmpId = this.template.tmpId;
		this.treePanel = new Ext.tree.TreePanel({
					region : 'west',
					id : 'ChapcterTreePanel',
					title : '章节列表',// __ukKnowTypeListHeading,
					collapsible : true,
					autoScroll : true,
					split : true,
					height : 800,
					width : 180,
					loader : new Ext.tree.TreeLoader({
								url : __ctxPath + '/qucon/listQcTempChapcter.do?id='+tmpId
							}),
					root : new Ext.tree.AsyncTreeNode({
								expanded : true
							}),
					rootVisible : false,
					listeners : {
						//'click' : this.clickNode()不对，this理解错误
						'click' : QcTemplateDesignForm.clickNode
					}
				});
		if (isGranted('_DepartmentAdd') || isGranted('_DepartmentEdit')
				|| isGranted('_DepartmentDel')) {
			// 树的右键菜单
			this.treePanel.on('contextmenu', contextmenu, this.treePanel);
		}
		function contextmenu(node, e) {
			selected = new Ext.tree.TreeNode({
						id : node.id,
						text : node.text
					});
			// 创建右键菜单
			var treeMenu = new Ext.menu.Menu({
						// id : 'DepartmentTreeMenu',
						items : []
					});
			treeMenu.clearMons();
			if (isGranted('_DepartmentAdd')) {
				treeMenu.add({
							text : '添加章节',
							iconCls : 'btn-add',
							scope : this,
							handler : createNode
						});
			}
			if (isGranted('_DepartmentEdit')) {
				treeMenu.add({
							text : '修改章节',
							iconCls : 'btn-edit',
							scope : this,
							handler : editNode
						});
			}
			if (isGranted('_DepartmentDel')) {
				treeMenu.add({
							text : '删除章节',
							iconCls : 'btn-delete',
							scope : this,
							handler : deteleNode
						});

			}
			treeMenu.showAt(e.getXY());
		}
		/**
		 * 菜单事件
		 */
		function createNode() {
			var nodeId = selected.id;
			if(nodeId != 0){
				Ext.ux.Toast.msg('警告', '只能在模版下建立章节！');
			}else{
				new QcTempChapcterForm({
					//传递模版的id
					tempId : tmpId
				}).show();
			}
		}
		function deteleNode() {
			var nodeId = selected.id;
			if (nodeId != 0) {
				Ext.Msg.confirm('删除操作', '你要删除该章节吗？删除后，章节下的指标都被停用！', function(btn) {
					if (btn == 'yes') {
						Ext.Ajax.request({
							url : __ctxPath + '/qucon/delQcTempChapcter.do?id='+nodeId+
								'&templateId='+tmpId,
							success : function(result, request) {
								var res = Ext.util.JSON.decode(result.responseText);
								if (res.success == false) {
									Ext.ux.Toast.msg('操作信息', '删除失败');
								} else {
									Ext.ux.Toast.msg('操作信息', __operationsuccess);
								}
								Ext.getCmp('ChapcterTreePanel').root.reload();
							},
							failure : function(result, request) {
								Ext.ux.Toast.msg('操作信息', __operationFailed);
							}
						});
					}
				});
			} else {
				Ext.ux.Toast.msg('警告', '模版不可以删除！');
			}
		}
		function editNode() {
			var nodeId = selected.id;
			if (nodeId != 0) {
				var chapcterForm = Ext.getCmp('QcTempChapcterForm');
				if (chapcterForm == null) {//如果框不存在，则生成一个，然后获取它
					new QcTempChapcterForm({
						id : nodeId,
						tmpId : tmpId
					}).show();
					chapcterForm = Ext.getCmp('QcTempChapcterForm');
				}
				chapcterForm.show();
				Ext.getCmp('ChapcterTreePanel').root.reload();
			} else {
				Ext.ux.Toast.msg('警告', '模版不可修改！');
			}

		}
		

		
		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : __ctxPath + '/qucon/listQcTempTarQcTemplate.do?Q_qcTemplate.tmpId_L_EQ='+this.template.tmpId
					}),
			reader : new Ext.data.JsonReader({
						root : 'result',
						totalProperty : 'totalCounts',
						fields : [{
									name : 'tmpTarId',
									type : 'long'
								}, 'qcTarget', 'designHTML','qcTempChapcter', 'maxScore','minScore','disorder']
					}),
			remoteSort : true
		});
		store.setDefaultSort('tmpTarId', 'desc');
		store.load();
		
		this.topbar = new Ext.Toolbar({
					items : ['->', {
								iconCls : 'btn-add',
								// text : __create+'[QcTemplate]',
								text : __create,
								xtype : 'button',
								scope : this,
								handler : function() {
									var scope_d = this;
									if(clickedChap == undefined){
										Ext.ux.Toast.msg('警告', '请选择一个章节后添加指标！');
										return;
									}
									Ext.Ajax.request({
										url : __ctxPath + '/qucon/getQcTempChapcter.do?tempCatId=' + clickedChap.id,
										method : 'post',
										success : function(response) {
											var result = Ext.util.JSON.decode(response.responseText);
											var type = 'yiban';
											if(result.data.type == 3){
												type = 'yanzhong';  
											} 
											QcTargetSelector.getView({
												scope : scope_d,
												callback : function(data){
													//TODO 新增指标
													var grid = Ext.getCmp('targetGrid');
													for(var i = 0; i < data.length; i++){
														var tar = {
															tarId : data[i].tarId,
															tarTopic : data[i].tarTopic,
															tarContent : data[i].tarContent,
															remark : data[i].remark
														};
														var chap = {tempCatId: clickedChap.id,
																type : result.data.type };
														var tmp, score;
														if(type == 'yiban'){
															tmp = tmpData.allHTML.replace(/scoreOpt_/g, 'scoreOpt_'+data[i].tarId+'_');
															score = 0;
														}else{
															tmp = '严重错误章节,选项无效!';
															score = -1;
														}
														var data_rec = {
																qcTarget : tar,
																maxScore : score,
																minScore : score,
			 													disorder : 0,
																qcTempChapcter : chap,
																designHTML : tmp
														};
														var newRecord = new store.recordType(data_rec);
														grid.stopEditing();
														store.add(newRecord);
														this.saveChap.call(this);
													} 
												}
											}, false, false, null).show();
										}
									});
								}
							}, {
								iconCls : 'btn-del',
								// text : __delete+'[QcTemplate]',
								text : __delete,
								xtype : 'button',
								scope : this,
								handler :function(){
									if(clickedChap == undefined){
										Ext.ux.Toast.msg('警告', '请选择一个章节后添加指标！');
										return;
									}
									this.removeSelRs.call(this);
								}
								
							},{
								iconCls : 'btn-save',
								// text : __delete+'[QcTemplate]',
								text : '保存当前章节',
								xtype : 'button',
								scope : this,
								handler : this.saveChap
							},
							{
								iconCls : 'btn-save',
								// text : __delete+'[QcTemplate]',
								text : '预览当前模版',
								xtype : 'button',
								scope : this,
								handler : this.showTemplate
							}
							]
				});
		var sm = new Ext.grid.CheckboxSelectionModel();
		var cm = new Ext.grid.ColumnModel({
					columns : [sm,{
								header : "评分指标编号",
								dataIndex : 'tmpTarId',
								hidden : true
							},{
								header : "指标编号",
								dataIndex : 'qcTarget',
								hidden : true,
								renderer:function(value){
									return value.tarId;
								}
							},{
								header : "章节",
								dataIndex : 'qcTempChapcter',
								hidden : true,
								renderer:function(value){
									return value.tempCatId;
								}
							},{
								header : "章节类型",
								dataIndex : 'qcTempChapcter',
								hidden : true,
								renderer:function(value){
									return value.type;
								}
							},{
								header : '指标',
								dataIndex : 'qcTarget',
								renderer:function(value){
									return value.tarTopic;
								}
							},{
								header : '描述',
								dataIndex : 'qcTarget',
								renderer:function(value){
									return value.tarContent;
								}
							},{
								header : '备注',
								dataIndex : 'qcTarget',
								renderer:function(value){
									return value.remark;
								}
							}, {
								header : '评选项',
								dataIndex : 'designHTML'
							}, {
								header : '最大分数',
								width:40,
								dataIndex : 'maxScore',
								editor : new Ext.form.TextField({
								}),
								renderer:function(value){
									if(Number(value) < 0)
										return '严重错误章节,选项无效!';
									return value;
								}
							}, {
								header : '最小分数',
								width:40,
								dataIndex : 'minScore',
								editor : new Ext.form.TextField({
								}),
								renderer:function(value){
									if(Number(value) < 0)
										return '严重错误章节,选项无效!';
									return value;
								}
							},{
								header : '序号',
								width:40,
								dataIndex : 'disorder',
								editor : new Ext.form.TextField({
										})
							}]
		});
	
		this.gridPanel = new Ext.grid.EditorGridPanel({
			id : 'targetGrid',
			store : store,
			shim : true,
			height : 380,
			autocroll : true,
			tbar : this.topbar,
			region:'center',
			trackMouseOver : true,
			disableSelection : false,
			loadMask : true,
			cm : cm,
			sm : sm,
			viewConfig : {
				forceFit : true,
				enableRowBody : false,
				showPreview : false
			}
		});
		if(tmpData.chkTypeId == 2){
			this.gridPanel.getColumnModel().setHidden(9,true);
			this.gridPanel.getColumnModel().setHidden(10,true);
		}else{
			this.gridPanel.getColumnModel().setHidden(8,true);
		}

	},
	// GridPanel行点击处理事件
	rowClick : function(grid, rowindex, e) {
		grid.getSelectionModel().each(function(rec) {
					new QcTemplateForm({
								tmpId : rec.data.tmpId
							}).show();
				});
	},
	// 创建记录
	createRs : function() {
		// new QcTemplateForm().show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('QcTemplateForm');
		if (aForm != null) {
			tabs.remove('QcTemplateForm');
		}
		aForm = new QcTemplateForm();
		tabs.add(aForm);
		tabs.activate(aForm);

	},
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
					url : __ctxPath + '/qucon/multiDelQcTemplate.do',
					ids : id,
					grid : this.gridPanel
				});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$delGridRs({
					url : __ctxPath + '/qucon/delMyTargetQcTempChapcter.do',
					grid : this.gridPanel,
					idName : 'tmpTarId'
				});
	},
	// 保存当前章节
	saveChap : function() {
		if(clickedChap == undefined){
			Ext.ux.Toast.msg('警告', '请指定章节！');
			return;
		}
		var store = Ext.getCmp('targetGrid').getStore();

		if(this.template.qcScoreOpts.length == 0){//非评分项模版
			for(var x = 0; x < store.getCount(); x++){
				var max = Number(store.getAt(x).data.maxScore);
				var min = Number(store.getAt(x).data.minScore);
				var disorder = Number(store.getAt(x).data.disorder);
				if(store.getAt(x).data.qcTempChapcter.type != 3) {//非严重错误章节
					if(isNaN(max) || isNaN(min) || isNaN(disorder)){
						Ext.ux.Toast.msg('警告', '分值和序号必须为数字');
						return;
					}
					if(min > max){
						Ext.ux.Toast.msg('警告', '最小值必须小于最大值');
						return;
					}
				}else{
					if(isNaN(disorder)){
						Ext.ux.Toast.msg('警告', '序号必须为数字');
						return;
					}
				}
			}
		}else{
			for(var x = 0; x < store.getCount(); x++){
				var disorder = Number(store.getAt(x).data.disorder);
				if(isNaN(disorder)){
					Ext.ux.Toast.msg('警告', '序号必须为数字');
					return;
				}
			}
		}
		var rows = [];
		var checked = '';
		// store.getCount()为store的长度 ，即当前章节下的指标数。在评分项类型的指标时，拼凑勾选结果值
		for (var i = 0; i < store.getCount(); i++) {
			// 将每一行store的值放入row数组里
		
			var tarId = store.getAt(i).data.qcTarget.tarId;
			if(Number(store.getAt(i).data.minScore) >  0){//如果不为严重章节，则计算其选择值
				for(var j = 0; j < this.template.qcScoreOpts.length; j++){
					var scoreOpt = this.template.qcScoreOpts[j];
					var node_so = document.getElementById('scoreOpt_'+ tarId +'_'+scoreOpt.scoreOptId);
					if(node_so.checked){
						checked += scoreOpt.scoreOptId + '@' + tarId + ',';
					}
				}
//			}else{
//				store.getAt(i).data.minScore = -1;
//				store.getAt(i).data.maxScore = -1;
			}
			rows.push(store.getAt(i).data);
		}
		if (store.getCount() > 0) {
			Ext.Ajax.request({
				url : __ctxPath + '/qucon/saveMyQcTargetQcTempChapcter.do',
				params : {
					data : Ext.encode(rows),
					checked : Ext.encode(checked)
				},
				method : 'post',
				success : function(response) {
					var store = Ext.getCmp('targetGrid').getStore();
					store.url = __ctxPath + '/qucon/listQcTempTarQcTemplate.do';
					var paramObj = {
						start : 0,
						limit : 25
					};
					if (node != null) {
						paramObj['Q_qcTempChapcter.tempCatId_L_EQ'] = clickedChap.id;
					}
					store.reload({
								params : paramObj
					});
					Ext.ux.Toast.msg('操作信息', '保存成功！');
				}
			});
		} else {
			Ext.ux.Toast.msg('操作信息', '请至少添加一个指标！');
		}
		
//		$delGridRs({
//					url : __ctxPath + '/qucon/multiDelQcTemplate.do',
//					grid : this.gridPanel,
//					idName : 'tmpId'
//				});
	},
	showTemplate : function() {
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('QCShowTempFormWin');
		if (aForm != null) {
			tabs.remove('QCShowTempFormWin');
		}
		aForm = new QCShowTempForm({
			tmpId : this.template.tmpId
		});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 编辑Rs
	editRs : function(record) {
		// new QcTemplateForm({
		// tmpId : record.data.tmpId
		// }).show();
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp('QcTemplateForm');
		if (aForm != null) {
			tabs.remove('QcTemplateForm');
		}
		aForm = new QcTemplateForm({
					tmpId : record.data.tmpId
				});
		tabs.add(aForm);
		tabs.activate(aForm);
	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.tmpId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			default :
				break;
		}
	}
});
/*
 * 点击章节事件
 */
QcTemplateDesignForm.clickNode = function(node){
	clickedChap = node;
	var store = Ext.getCmp('targetGrid').getStore();
	store.url = __ctxPath + '/qucon/listQcTempTarQcTemplate.do';
	var paramObj = {
		start : 0,
		limit : 25
	};
	if (node != null) {
		paramObj['Q_qcTempChapcter.tempCatId_L_EQ'] = node.id;
	}
	store.reload({
				params : paramObj
	});
}
