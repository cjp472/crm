/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class CusContactForm
 * @extends Ext.Window
 * @description CusContact表单
 * @company 优创融联科技
 */
CusContactForm = Ext.extend(Ext.Panel, {
		//构造函数
		constructor : function(_cfg) {
			Ext.applyIf(this, _cfg);
			//必须先初始化组件
			this.initUIComponents();
			CusContactForm.superclass.constructor.call(this, {
				id : 'CusContactFormWin',
				layout : 'fit',
				items : this.formPanel,
				modal : true,
				height : 400,
				width : 500,
				maximizable : true,
				title : '详细信息',
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
					layout : 'form',
					bodyStyle : 'padding:10px',
					border : false,
					autoScroll:true,
					//id : 'CusContactForm',
					defaults : {
						anchor : '96%,96%'
					},
					defaultType : 'textfield',
					items : [{
						name : 'cusContact.contactId',
						xtype : 'hidden',
						value : this.contactId == null ? '' : this.contactId
					},{  
						fieldLabel : '客户',	
						hiddenName : 'cusContact.customer.customerId'
						,allowBlank:false
					    ,xtype:'combo'
						,editabel : false
						,lazyInit : false
						,triggerAction : 'all'
						,store : new Ext.data.SimpleStore( {
								autoLoad : true,
								url : __ctxPath + '/customer/comboCusContact.do',
								fields : [ 'customerid', 'customeridName' ],
								listeners : {
									load : function() {
										var combo = Ext.getCmp('cusContact.customerid');
										var store = combo.getStore();
										var rows = [];//定义数组
										for(var i=0;i<store.getCount();i++){ //store.getCount()为store的长度
											if(store.getAt(i).data['customerid']==combo.getValue()){
												combo.setValue(store.getAt(i).data['customeridName']);
												break;
											}
										}
									}
								}
							})
							,displayField : 'customeridName'
							,valueField : 'customerid'
							,id : 'customerid'
					},{  
						fieldLabel : '联系方式',	
						name : 'cusContact.contactTypeId',
						allowBlank:false,
						xtype:'numberfield'
					},{  
						fieldLabel : '家庭电话、办公电话、紧急联系人电话；与联系类型级联',	
						name : 'cusContact.contactSubTypeId',
						xtype:'numberfield'
					},{  
						fieldLabel : '区号/地区号',	
						name : 'cusContact.preContactNum'
						,maxLength: 256
					},{  
						fieldLabel : '号码/详细地址',	
						name : 'cusContact.mainContactNum'
						,allowBlank:false
						,maxLength: 256
					},{  
						fieldLabel : '分机号/邮编',	
						name : 'cusContact.lastContactNum'
		 				,maxLength: 256
					},{  
						fieldLabel : '是否默认',	
						hiddenName : 'cusContact.isDefault'
						,xtype:'combo'
						,editable : false
						,mode : 'local'
						,triggerAction : 'all'
						,store : [['1',__yes],['0',__no]]
					},{
						fieldLabel : '是否核实',	
						hiddenName : 'cusContact.isChecked'
						,xtype:'combo'
						,editable : false
						,mode : 'local'
						,triggerAction : 'all'
						,store : [['1',__yes],['0',__no]]
					},{  																			
						fieldLabel : '备注',	
						name : 'cusContact.contactRemarks'
						,xtype:'textarea',
						maxLength: 2000
					},{  
						fieldLabel : '创建时间',	
						name : 'cusContact.createTime'
						,xtype:'datefield',
						format:'Y-m-d',
						value:new Date()
					},{  
						fieldLabel : '最后修改日期',	
						name : 'cusContact.lastUpdateTime'
			 			,xtype:'datefield',
						format:'Y-m-d',
						value:new Date()
					},{  
						fieldLabel : '状态：0=有效 1=无效',	
						name : 'cusContact.statusId'
						,allowBlank:false
						,xtype:'numberfield'
					}]
				});
				//加载表单对应的数据	
				if (this.contactId != null && this.contactId != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/customer/getCusContact.do?contactId='+ this.contactId,
								root : 'data',
								preName : 'cusContact'
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
			save : function() {
				$postForm({
						formPanel:this.formPanel,
						scope:this,
						url:__ctxPath + '/customer/saveCusContact.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('CusContactGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});