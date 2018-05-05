
 

BusiMapForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		BusiMapForm.superclass.constructor.call(this, {
					id : 'BusiMapFormWin',
					layout : 'fit',
					items :this.formPanel,
					modal : true,
					height : 240,
					width : 500,
					maximizable : true,
					title : '监控视图详细信息',
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
     	   	   id:'_tree_sel',
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
            	 url : __ctxPath + '/unim/listUnimChannelNavigation.do'
             }),
             root:new Ext.tree.AsyncTreeNode({
             	})                
         });     	  
     	   var selectMenu = new Ext.menu.Menu({     	
         	  shadow:'frame', 
            items:[treePanel]            
         });
         
         var comboField = new Ext.form.TriggerField({
            fieldLabel:'选择',
            editable:false,
            id:'treekey',
            name:'',
            anchor:'100%',	
         	onTriggerClick:function(){
         	     if(this.menu == null){
         	        this.menu = selectMenu;	
         	     }
         	     this.menu.show(this.el,"tl-bl?");	
         	     treePanel.expandAll();
         	  }           	
         });
         treePanel.on('click',function(node){
         	   selectMenu.hide();
         	   Ext.getCmp('treeValue').setValue(node.id);
         	    Ext.getCmp('unimChannelNavigation.parentid').setValue(node.id);
         	   comboField.setValue(node.text);
         });
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			region:'center',
			bodyStyle : 'padding:10px;background-color:#fff',
			border : false,
			autoScroll : true,
			labelAlign:'right',
			// id : 'BusiMapForm',
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
					items:[
						{
							id : 'unimChannelNavigation.mapNavId',
							xtype : 'hidden',
							value : this.mapNavId == null ? '': this. mapNavId
						},
						{
							id : 'unimChannelNavigation.parentid',
							xtype : 'hidden',
							value : this.parentid == null ? '': this. parentid
						},
						{
							id : 'unimChannelNavigation.mapId',
							xtype : 'hidden'
						},
						{
						xtype:'textfield',
						fieldLabel:'导航名',
						name : 'unimChannelNavigation.navName',
						anchor:'100%',
						allowBlank:false
					},{
						xtype:'textfield',
						fieldLabel:'顺序',
						name:'unimChannelNavigation.orderno',
						anchor:'100%'
					}]
				},{
					layout:'form',
					border:false,
					columnWidth:.5,
					items:[comboField,{
						xtype:'hidden',
						id:'treeValue'
					},
					{
						fieldLabel : '状态',
						allowBlank : false,
						maxLength : 128,
						hiddenName : 'unimChannelNavigation.status',
						id : 'unimChannelNavigation_status_Id',
						xtype : 'mtdiccombo',
						editable : false,
						allowBlank : false,
						triggerAction : 'all',
						forceSelection : false,
						itemKey : 'QC_ZBZT',
						anchor : '100%'

					}
					]
				}]
			},{
				layout:'column',
				border:false,
				items:[{
					layout:'form',
					border:false,
					columnWidth:.9,
					items:[{
						xtype:'textfield',
						name:'unimChannelNavigation.mapNam',
						id:'unimChannelNavigation.mapNam',
						fieldLabel:'监控视图',
						anchor:'100%'
					}]
				}, {
						xtype : 'button',
						columnWidth : .1,
						iconCls : 'btn-search',
						handler : function() {
							UnimYWMaptSelector.getView(function(mapId, mapName, reamrk) {
								Ext.getCmp('unimChannelNavigation.mapId').setValue(mapId);
								Ext.getCmp('unimChannelNavigation.mapNam').setValue(mapName)
								}).show();
						}
					}]
			},{ 
			xtype:'textarea',
			fieldLabel:'备注',
			name:'unimChannelNavigation.remark',
			anchor:'95%',
			height:50
			}]
		});
		
		// 加载表单对应的数据
		if (this.mapNavId != null && this.mapNavId != 'undefined') {
			this.formPanel.loadData({
						url : __ctxPath + '/unim/getUnimChannelNavigation.do?mapNavId='
								+ this.mapNavId,
						root : 'data',
						preName : 'unimChannelNavigation',
//						waitMsg : '正在载入数据...',
						success : function(response, options) {
							var thisObj = Ext.util.JSON.decode(response.responseText).data;
							var status=thisObj.status;
							Ext.getCmp('unimChannelNavigation.parentid').setValue(thisObj.parentid);
							Ext.getCmp('treekey').setValue(thisObj.parentNam);
							Ext.getCmp("unimChannelNavigation_status_Id").setValue(QC_ZBZT.get(status));
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
		var mapid=Ext.getCmp('unimChannelNavigation.mapId').getValue();

		$postSubForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/unim/saveUnimChannelNavigation.do',
					params : {mapid:mapid},
					msgSuccess : '成功添加该记录！',
					msgFailure : '操作出错，请联系管理员！',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('UnimChanneltMapGrid');
								if (gridPanel != null) {
									gridPanel.getStore().reload();
								}
						var tree = Ext.getCmp('ChannelViewSearchPanel');
							tree.root.reload();
						Ext.getCmp('BusiMapFormWin').close();
						}
				});
	}// end of save

});