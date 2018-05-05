
AssetZhuangTaiForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		AssetZhuangTaiForm.superclass.constructor.call(this, {
					id : 'AssetZhuangTaiFormWin',
					layout : 'fit',
					items :this.formPanel,
					modal : true,
					height : 240,
					width : 500,
					maximizable : true,
					title : '资产状态配置',
					buttonAlign : 'center',
					buttons : [{
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
							}]
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
			 var treePanel = new Ext.tree.TreePanel({
     	   	 id:'UnimAssStatus_tree',
             rootVisible: false,                
             border:false,
             anchor:'100%',
             height:200,
             width:350,
             collapsible: false,
             bodyStyle:'padding:5px 0px 0px 0px', 
             autoScroll:true,
             collapseFirst:false,
             animate: true,                       
             loader:new Ext.tree.TreeLoader({
            	 url : __ctxPath + '/unim/listTreeUnimAssStatus.do'
             }),
             root:new Ext.tree.AsyncTreeNode({
             	})                
         });     	  
     	   var selectMenutree = new Ext.menu.Menu({     	
         	  shadow:'frame', 
            items:[treePanel]            
         });
         
         var comboFieldtree = new Ext.form.TriggerField({
            fieldLabel:'选择',
            editable:false,
            id:'UnimAssStatus_treekey',
            allowBlank:false,
            name:'',
            anchor:'100%',	
         	onTriggerClick:function(){
         	     if(this.menu == null){
         	        this.menu = selectMenutree;	
         	     }
         	     this.menu.show(this.el,"tl-bl?");	
         	     treePanel.expandAll();
         	  }           	
         });
         treePanel.on('click',function(node){
         	   selectMenutree.hide();
         	   Ext.getCmp('treeValue').setValue(node.id);
         	   Ext.getCmp('unimAssCategory.catId').setValue(node.id);
         	   comboFieldtree.setValue(node.text);
         });
		var colorS = new Ext.ColorPalette({});
		colorS.on('select', function(p, v) {
					selectMenu.hide();
					Ext.get('colorSel').dom.style.color = '#' + v;
					Ext.getCmp('colorSel').setValue('#' + v);
				});

		var selectMenu = new Ext.menu.Menu({
					shadow : 'frame',
					id : 'selectColor',
					buttonAlign : 'right',
					items : colorS
				});

		var comboField = new Ext.form.TriggerField({
					editable : false,
					id : 'colorSel',
					anchor : '100%',
					name:'unimAssStatus.extend1',
					fieldLabel : '显示颜色',
					width : 150,
					onTriggerClick : function() {
						if (this.menu == null) {
							this.menu = Ext.getCmp('selectColor');
						}
						this.menu.show(this.el, "tl-bl?");
					}
				});
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			region:'center',
			bodyStyle : 'padding:10px;background-color:#fff',
			border : false,
			autoScroll : true,
			labelAlign:'right',
			// id : 'AssetZhuangTaiForm',
			defaults : {
				anchor : '96%,96%'
			},
			buttonAlign:'center',
			items : [{
				layout:'column',
				border:false,
				items:[{
					layout:'form',
					border:false,
					columnWidth:.5,
					items:[{
					layout:'form',
					border:false,
					columnWidth:.5,
					items:[
							{
							id : 'unimAssStatus.statusId',
							xtype : 'hidden',
							value : this.statusId == null ? '': this. statusId
						},
						{
							id : 'unimAssCategory.catId',
							xtype : 'hidden',
							value : this.catId == null ? '': this. catId
						},
						{
						xtype:'textfield',
						fieldLabel:'名称',
						name:'unimAssStatus.statusName',
						anchor:'100%',
						allowBlank:false
					},comboFieldtree,{
						xtype:'hidden',
						id:'treeValue'
					}]
				}]
				},{
					layout:'form',
					border:false,
					columnWidth:.5,
					items:[{
						xtype:'textfield',
						fieldLabel:'编号',
						name:'unimAssStatus.statusCode',
						anchor:'100%',
						allowBlank:false
					},comboField]
				}]
			},{ 
			xtype:'textarea',
			fieldLabel:'备注',
			name:'unimAssStatus.remark',
			anchor:'95%',
			height:50
			}]
		});
		
		// 加载表单对应的数据
		if (this.statusId != null && this.statusId != 'undefined') {
			this.formPanel.loadData({
						url : __ctxPath + '/unim/getUnimAssStatus.do?statusId='
								+ this.statusId,
						root : 'data',
						preName : 'unimAssStatus',
							success : function(response, options) {
							var thisObj = Ext.util.JSON.decode(response.responseText).data;
//							var status=thisObj.status;
							Ext.get('colorSel').dom.style.color = thisObj.extend1;
							Ext.getCmp('colorSel').setValue(thisObj.extend1);
							Ext.getCmp('unimAssCategory.catId').setValue(thisObj.unimAssCategory.catId);
							Ext.getCmp('UnimAssStatus_treekey').setValue(thisObj.ziChanLx);
//							Ext.getCmp("unimMapNavigation_status_Id").setValue(QC_ZBZT.get(status));
						},
						failure : function(response, options) {
						}
					});
		}
	},// end of the initcomponents

	/**
	 * 重置
	 * 
	 * @param {}
	 *            formPanel
	 */
	reset : function() {
		this.formPanel.getForm().reset();
	},
	/**
	 * 取消
	 * 
	 * @param {}
	 *            window
	 */
	cancel : function() {
		this.close();
	},
	/**
	 * 保存记录
	 */
	save : function() {
		
		var catid=Ext.getCmp('unimAssCategory.catId').getValue();
		$postSubForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/unim/saveUnimAssStatus.do',
					msgSuccess : '成功保存该记录！',
					msgFailure : '操作出错，请联系管理员！',
					params : {
			          catid:catid
					},
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('UnimAssStatusGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});