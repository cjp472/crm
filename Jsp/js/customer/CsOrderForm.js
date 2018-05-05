/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class CsOrderForm
 * @extends Ext.Window
 * @description CsOrder表单
 * @company 优创融联科技
 */
CsOrderForm = Ext.extend(Ext.Panel, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				CsOrderForm.superclass.constructor.call(this, {
							id : 'CsOrderFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : 'CS工单时间设置详细信息',
							buttonAlign : 'center',
							buttons : [
										{
											text : __save,
											iconCls : 'btn-save',
											scope : this,
											handler : this.save
										}, {
											text : __reset,
											iconCls : 'btn-reset',
											scope : this,
											handler : this.reset
										}, {
											text : __cancel,
											iconCls : 'btn-cancel',
											scope : this,
											handler : this.cancel
										}
							         ]
				});
			},//end of the constructor
			//初始化组件
			initUIComponents : function() {
				this.formPanel = new Ext.FormPanel({
					url : __ctxPath + '',
					id : 'jieshouCSpanel',
					style : 'padding-top:10px;background-color:#fff;',
					bodyStyle:'overflow-y:auto',
					border : false,
					height:540,
					labelAlign : 'right',
					labelWidth : 70,
					items : [{
						layout : 'column',
						border : false,
						items : [{
							columnWidth : .333,
							layout : 'form',
							border : false,
							items : [{
								name : 'csOrder.orderId',
								hidden : true
							}]
						}]
					}, {
						layout:'column',
						border:false,
						items:[{
							columnWidth:.33,
							border:false,
							layout:'form',
							labelAlign:'right',
							labelWidth:70,
							items:[{
								xtype:'textfield',
								fieldLabel:'客户姓名',
								name : 'csOrder.customerName',
								id : 'csOrder.customerNameId',
								readOnly : true,
								anchor:'100%'
//							},{
//								fieldLabel:'等级',
//								hiddenName : 'csOrder.cusGraId',
//								id : 'csOrder.cusGraId_form',
//								xtype : 'mtdiccombo',
//								editable : true,
//								lazyInit : false,
//								readOnly : true,
//								forceSelection : false,
//								itemKey : 'CONKHJB',
//								anchor : '100%'
							},{
								xtype:'textfield',
								fieldLabel:'联系方式1',
								name : 'csOrder.contacta',
								anchor:'100%'
							},{
								columnWidth : .5,
								layout : 'form',
								border : false,
								xtype : 'hidden',
								name : 'csOrder.order',
								id : 'csOrder.order_hid'
							},{
								xtype:'combo',
								fieldLabel:'工单类型',
								id : 'csOrder.order_form',
								editable : false,
								lazyInit : false,
								allowBlank : false,
								forceSelection : false,
								triggerAction : 'all',
								store :  new Ext.data.SimpleStore({
									autoLoad : true,
									url : __ctxPath + '/system/comboDictionary.do',
									baseParams : {
										'Q_mapName_S_EQ' : 'TS_GD_LX'
									},
									fields : [ 'dicId', 'itemValue' ]
								}),
								anchor:'100%',
								mode:'local',
								displayField : 'itemValue',
								valueField : 'dicId',
								listeners : {
									scope : this,
									'select' : function(combo, record,index) {
										var dicId = record.get('dicId')
										Ext.getCmp('csOrder.order_hid').setValue(dicId);
										Ext.Ajax.request({
											url : __ctxPath + '/system/comboDictionary.do',
											params : {
												'Q_relDic_L_EQ' : dicId
											},
											method : 'post',
											success : function(response) {
												var result = Ext.util.JSON.decode(response.responseText)
												Ext.getCmp('csOrder.orderProject_form').getStore().loadData(result);
												Ext.getCmp('csOrder.orderProject_form').setValue('');
											}
										});
									}
								}
							} ,{
								columnWidth : .5,
								layout : 'form',
								border : false,
								xtype : 'hidden',
								name : 'csOrder.orderSorce',
								id : 'csOrder.orderSorce_hid'
							},{
								xtype:'combo',
								fieldLabel:'工单来源',
								id : 'csOrder.orderSorce_form',
								editable : false,
								lazyInit : false,
								allowBlank : false,
								forceSelection : false,
								triggerAction : 'all',
								anchor:'100%',
								mode:'local',
								store :  new Ext.data.SimpleStore({
									autoLoad : true,
									url : __ctxPath + '/system/comboDictionary.do',
									baseParams : {
										'Q_mapName_S_EQ' : 'TS_GD_SOURCE'
									},
									fields : [ 'dicId', 'itemValue' ]
								}),
								displayField : 'itemValue',
								valueField : 'dicId',
								listeners : {
									scope : this,
									'select' : function(combo, record,index) {
										var dicId = record.get('dicId')
										Ext.getCmp('csOrder.orderSorce_hid').setValue(dicId);
										Ext.Ajax.request({
											url : __ctxPath + '/system/comboParentIdDictionary.do',
											params : {
												'Q_dicId_L_EQ' : dicId
											},
											method : 'post',
											success : function(response) {
												var result = Ext.util.JSON.decode(response.responseText)
												var arr = new Array();
												arr = result.toString().split(",");
			//									Ext.getCmp('csOrder.level_form').getStore().loadData(result);
												Ext.getCmp('csOrder.level_form').setValue(arr[1]);
												var fm = Ext.getCmp('jieshouCSpanel');
												fm.getCmpByName('csOrder.level').setValue(arr[0]);
											}
										});
									}
								}
							},{
								fieldLabel:'要求响应时间',
								name : 'flowResponseTime',
								id : 'csOrder.responseTime',
								xtype:'datetimefield',
								format:'Y-m-d H:i:s',
								anchor:'100%'
							}]
						},{
							columnWidth:.33,
							border:false,
							layout:'form',
							labelAlign:'right',
							labelWidth:70,
							items:[{
								xtype:'textfield',
								fieldLabel:'客户号码',
								name : 'csOrder.customerNo',
								id : 'csOrder.customerNoId',
								readOnly : true,
								anchor:'100%'
							}, {
								columnWidth : .5,
									layout : 'form',
									border : false,
									xtype : 'hidden',
									name : 'csOrder.region.regionId', // 省隐藏域
									id : 'csOrder.regionId_hid'
								},{
									fieldLabel : '所属地区',       
									id : 'ulEmployees.hujisheng_combo',
									xtype : 'combo',
									lazyInit : false,
									mode : 'local',
									editable : true,
									triggerAction : 'all',
									store : CusPersonalFormCallin.getStore_regions(1,'ulEmployees.huji', this.huji),
									displayField : 'regionName',
									valueField : 'regionId',
									listeners : getDicListeners('ulEmployees.hujisheng_combo','csOrder.regionId'),
									anchor : '100%'
							},{
								xtype:'textfield',
								fieldLabel:'联系方式2',
								name : 'csOrder.contactb',
								anchor:'100%'
							},{
								columnWidth : .5,
								layout : 'form',
								border : false,
								xtype : 'hidden',
								name : 'csOrder.orderProject',
								id : 'csOrder.orderProject_hid'
							},{
								xtype : 'combo',
								fieldLabel:'工单项目',
								id : 'csOrder.orderProject_form',
								editable : false,
								lazyInit : false,
								forceSelection : false,
								triggerAction : 'all',
								store : [['','']],
								anchor:'100%',
								mode:'local',
								listeners : {
									select : function(cbo,record,index) {
										var fm = Ext.getCmp('jieshouCSpanel');
										fm.getCmpByName('csOrder.orderProject').setValue(cbo.value);
									}
								}
							} ,{
								columnWidth : .5,
								layout : 'form',
								border : false,
								xtype : 'hidden',
								name : 'csOrder.level',
								id : 'csOrder.level_hid'
							},{
								xtype:'combo',
								fieldLabel:'投诉等级',
								id : 'csOrder.level_form',
								editable : true,
								lazyInit : false,
								readOnly : true,
								forceSelection : false,
								triggerAction : 'all',
								store : [['','']],
								anchor:'100%',
								mode:'local'
							},{
								fieldLabel:'要求完成时间',
								name : 'flowCompletionTime',
								id : 'csOrder.completionTime',
								xtype:'datetimefield',
								format:'Y-m-d H:i:s',
								anchor:'100%'
							}]
						},{
							columnWidth : .5,
							layout : 'form',
							border : false,
							xtype : 'hidden',
							name : 'csOrder.customerGender',
							id : 'csOrder.customerGender_hid'
						},{
							columnWidth:.33,
							border:false,
							layout:'form',
							labelAlign:'right',
							labelWidth:70,
							items:[{
								xtype : 'mtdiccombo',
								fieldLabel:'性别',
								hiddenName : 'csOrder.customerGender',
								name : 'csOrder.customerGender',
								id : 'csOrder.customerGender_form',
								editable : false,
								lazyInit : false,
								readOnly : true,
								forceSelection : false,
								itemKey : 'XB001',
								anchor:'100%',
								mode:'local',
								listeners : getDicListeners('csOrder.customerGender_form','csOrder.customerGender')
							},{
								border:false,
								height:25
							},{
								border:false,
								height:25
							},{
								border:false,
								height:25
							}, {
								layout : 'form',
								border:false,
								columnWidth : .3,
								items : [{
									xtype : 'container',
									layout : 'form',
									width : '100px',
									items : [depSelector]
								}, {
									name : 'csOrder.ulDepartment.depid',
									id : 'ulEmployee.depid_form',
									xtype : 'hidden'
								}]
							}]
						}]
					
					},{
						xtype:'fieldset',
						collapsible:true,
						collapsed:false,
						title:'订单信息',
						items:[{
							layout:'column',
							border:false,
							items:[{
								columnWidth:.4,
								border:false,
								layout:'form',
								items:[{
									xtype : 'hidden',
									name : 'csOrder.detailId',
									id : 'csOrder.dingdanNumId',
									anchor : '100%'
								}, {
									fieldLabel:'订单编号',
									xtype:'textfield',
									anchor:'100%',
									readOnly : true,
									id : 'csOrder.dingdanNum'
								}]
							},{
								columnWidth:.1,
								border:false,
								xtype:'button',
								iconCls:'btn-search',
								handler : function() {
									ScBizOrderSalesSelector.getView(function(data){
										Ext.getCmp('csOrder.dingdanNumId').setValue(data.bizOrderId);
										Ext.getCmp('csOrder.dingdanNum').setValue(data.bizOrderNumber);
										
										var dingdanStore = Ext.getCmp('gridPanel_CS_goods').getStore();
										dingdanStore.baseParams = {
											'Q_scBizOrderSales.bizOrderId_L_EQ':data.bizOrderId
										}
										dingdanStore.load();
										
									},true).show();
								}
							}]
						},productGrid]
					},{
						xtype:'textarea',
						height:50,
						fieldLabel:'投诉内容',
						name : 'csOrder.content',
						anchor:'100%'
					},{
						xtype:'textarea',
						height:50,
						fieldLabel:'客户诉求',
						name : 'csOrder.noteAppeal',
						anchor:'100%'
					}]
						// form items
				});
				//加载表单对应的数据	
				if (this.orderId != null && this.orderId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/customer/getCsOrder.do?orderId='+ this.orderId,
								root : 'data',
								preName : 'csOrder'
							});
				}
				
			},//end of the initcomponents

			/**
			 * 重置
			 * @param {} formPanel
			 */
			reset : function() {
				this.formPanel.getForm().reset();
			},
			/**
			 * 取消
			 * @param {} window
			 */
			cancel : function() {
				this.close();
			},
			/**
			 * 保存记录
			 */
//			save : function() {
//				$postSubForm({
//						formPanel:this.formPanel,
//						scope:this,
//						url:__ctxPath + '/customer/saveCsOrder.do',
//						msgSuccess : '成功删除该记录！',
//						msgFailure : '操作出错，请联系管理员！',
//						callback:function(fp,action){
//							var gridPanel = Ext.getCmp('CsOrderGrid');
//							if (gridPanel != null) {
//								gridPanel.getStore().reload();
//							}
//							this.close();
//						}
//					}
//				);
//			}//end of save
	validate : function() {
		return true;
	}
});