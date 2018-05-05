DicTypeChangeWin=Ext.extend(Ext.Window,{
	constructor:function(config){
		DicTypeChangeWin.superclass.constructor.call(this,{
			modal:true,
			width:400,
			height:100,
			layout:'form',
			title:'数据字典分类转移',
			bodyStyle:'padding:5px',
			items:[
				{
					id:'dicTypeId_hid',
					name:'dicTypeId',
					xtype:'hidden',
					value:''
				},
				{
					id:'dicTypeCombo_win',
					anchor : '99%',
					maxHeight : 300,
					fieldLabel:'选择将转为的分类',
					valId:'dicTypeId',
					url:__ctxPath+'/system/treeGlobalType.do?catKey=DIC',
					allowBlank:false,
					tplId : 'tree_tpl',
					lazyInit : true,
					rootVisible : false,
					forceSelection : false,
					xtype:'treecboType',
					listeners : {
						change : function(node) {
							var typeId = Ext.getCmp('dicTypeCombo_win').getHiddenValue();
							Ext.getCmp('dicTypeId_hid').setValue(typeId);
						}
					}
				}
			],
			buttonAlign:'center',
			buttons:[
				{
					text:'保存',
					iconCls:'btn-save',
					scope:this,
					handler:function(){
						var dicTypeId=Ext.getCmp('dicTypeId_hid');
						var typeId=dicTypeId.getValue();
						if(typeId=='' || typeId==0){
							Ext.ux.Toast.msg('操作信息','请选择将要转化的分类!');
							return;
						}
						Ext.Ajax.request({
							scope:this,
							url:__ctxPath+'/system/typeChangeDictionary.do',
							params:{
								dicIds:config.dicIds,
								dicTypeId:typeId
							},
							method:'POST',
							success:function(response,options){
								Ext.ux.Toast.msg('操作信息','操作成功！');
								if(config.callback){
									config.callback.call(this);
								}
								this.close();
							},
							failure:function(response,options){
								Ext.ux.Toast.msg('操作信息','操作出错，请联系管理员！');
								this.close();
							}
						});
						
					}
				},
				{
					text:'关闭',
					iconCls:'btn-close',
					scope:this,
					handler:function(){
						this.close();
					}
				}
			]
		});
	}	
});