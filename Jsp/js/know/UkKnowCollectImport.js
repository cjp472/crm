var UkKnowCollectImport = function(){
	
		var idCount = 0;
	var getPanel = function(id){
		var CondPanel = new Ext.Panel({
		layout:'column',
		id:'panel'+id,
		border:false,
		style:'padding-top:3px',
		items:[{
				columnWidth:.3,
				hiddenName : 'conWeichuli.srcTypeId',
				xtype : 'mtdiccombo',
				editable : true,
				lazyInit : false,
				forceSelection : false,
				itemKey : 'CONFX',
				anchor:'100%'
			},{
				hiddenName : 'conWeichuli.srcTypeId',
				xtype : 'mtdiccombo',
				columnWidth:.3,
				editable : true,
				lazyInit : false,
				forceSelection : false,
				itemKey : 'CONFX',
				anchor:'100%'
			},{
				xtype:'textfield',
				columnWidth:.3
			},{
				columnWidth:.1,
				id:'button'+id,
				xtype:'button',
				iconCls:'btn-del',
				handler:function(){
					var ii = this.id.substring(6,this.id.length)
					Ext.getCmp('daorutiaojian').remove('panel'+ii);
					Ext.getCmp('daorutiaojian').doLayout();
				}
			}]
		
	})
	return CondPanel;
	}
	
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/system/listAppUser.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							fields : [{
										name : 'userId',
										type : 'int'
									}, 'username']
						}),
				remoteSort : true
			});
		store.setDefaultSort('userId', 'desc');
		
		store.load();
		var cm = new Ext.grid.ColumnModel({
			columns : [ {
						header : '字段列',
						dataIndex : 'username'
					},{
						header : '文件列',
						dataIndex : '',
						editor:new Ext.form.ComboBox({
								xtype : 'combo',
								editable : false,
								mode : 'local',
								triggerAction : 'all',
								store : [ [ '1', '是' ],[ '0', '否' ] ]
							})
					}]
		});
	
		gridPanel = new Ext.grid.EditorGridPanel({
					store : store,
					shim : true,
					height:380,
					autocroll:true,
					trackMouseOver : true,
					disableSelection : false,
					loadMask : true,
					cm : cm,
					viewConfig : {
						forceFit : true,
						enableRowBody : false,
						showPreview : false
					}
				});
	var win = new Ext.Window({
		title : '导入黑名单',
		height : 500,
		width : 700,
		layout : 'fit',
		buttonAlign:'right',
		buttons:[{
			text:'确定',
			iconCls:'btn-save'
		
		},{
			text:'取消',
			iconCls:'btn-cancel'
		}],
		items : [{
			border : false,
			xtype : 'container',
			defaults : {
				border : false,
				anchor : '100%,100%'
			},
			items : [{
				layout : 'column',
				style : 'padding:10px;background-color:#fff',
				items : [{
					columnWidth : .5,
					border : false,
					items : [{
								layout : 'column',
								border : false,
								style:'margin-bottom:10px',
								items : [{
											columnWidth:.2,
											html : '导入方案：',
											border : false,
											style : 'text-align:right;padding-top:3px'
										}, {
	
											xtype : 'mtdiccombo',
											columnWidth : .8,
											editable : true,
											lazyInit : false,
											forceSelection : false,
											itemKey : 'CONJHLX',
											anchor : '100%'
	
										}]
							},gridPanel]
				},{
					columnWidth:.5,
					border:false,
					items:[{
						xtype:'fieldset',
						title : "导入条件",
						collapsed : false,
						tbar:[{
							text:'添加',
							iconCls:'btn-add',
							handler:function(){
								Ext.getCmp('daorutiaojian').add(getPanel(idCount));
								Ext.getCmp('daorutiaojian').doLayout();
								idCount++;
							}
						}],
						//collapsible : true,
						autoHeight : true,
						//height:260,
						defaults : {
							anchor : '100%,100%'
						},
						items:[{
							border:false,
							height:215,
							id:'daorutiaojian',
							items:[]
							
						}]
					},{
					xtype:'fieldset',
					title : "导入设置",
					collapsed : false,
					//collapsible : true,
					autoHeight : true,
					defaults : {
						anchor : '100%,100%'
					},
					items:[{
						layout:'form',
						labelWidth:70,
						border:false,
						items:[
							{
								fieldLabel : '文件类型',
								hiddenName : 'conWeichuli.srcTypeId',
								xtype : 'mtdiccombo',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'DAORUWJ',
								anchor:'100%'
							},{   
					            xtype: 'textfield',   
					            fieldLabel: '文件路径', 
					            anchor:'80%',
					            name: 'userfile',   
					            inputType: 'file',   
					            allowBlank: false  
					        },{
								fieldLabel : '分隔符',
								hiddenName : 'conWeichuli.srcTypeId',
								xtype : 'mtdiccombo',
								editable : true,
								lazyInit : false,
								forceSelection : false,
								itemKey : 'FENGEFU',
								anchor:'100%'
							}]
					}]
				}]
				}]
	
			}]
		}]
	})
	win.show();
}

//win.show();