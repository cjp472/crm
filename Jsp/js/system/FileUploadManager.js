/**
 * @description 文件分类上传管理
 * @author YHZ
 * @company www.ulane.cn
 * @datetime 2010-11-15 AM
 */
 
 var fileUrl = '';		//TODO 声明fileUrl全局变量.作为点击树节点时存储当前所点击树节点的ID. 用来做上传的fileType,以便查询.
 
FileUploadManager = Ext.extend(Ext.Window, {
	
	constructor : function(_cfg) {
		Ext.applyIf(this,_cfg);
		this.initUIComponent();
		FileUploadManager.superclass.constructor.call(this, {
			id : 'fileUploadManager',
			layout : 'fit',
			title : '附件分类管理',
			iconCls : 'menu-file',
			width : 720,
			minWidth : 720,
			height : 550,
			minHeight : 550,
			maximizable : true,
			border : false,
			modal : true,
			items : [this.panel],
			buttonAlign : 'center',
			buttons : [{
				text : '确定',
				iconCls : 'btn-ok',
				scope : this,
				handler : this.upLoad
			}, {
				text : '取消',
				iconCls : 'btn-cancel',
				scope : this,
				handler : this.close
			}]
		}); // end of this constructor
	},// 初始化组件

	initUIComponent : function() {
		
		fileType = this.permitted_extensions;//判断附件类型[是否为图片]
		///////////////////////##treePanel##//////////////////////////////
		var imageYes = FileUploadManager.judgeImage(fileType); //判断是否为图片
		
		if(imageYes){
			this.imageTreePanel = new Ext.tree.TreePanel({
				layout : 'form',
				region : 'west',
				id : 'fileUploadManagerImageTreePanel',
				title : '图片分类',
				collapsible : true,
				autoScroll : true,
				split : true,
				width : 180,
				tbar : new Ext.Toolbar({}),
				loader : new Ext.tree.TreeLoader({
					url : __ctxPath + '/system/treeLoadFileAttach.do?type=image'
				}),
				root : new Ext.tree.AsyncTreeNode({
					expanded : true
				}),
				rootVisible : false,
				listeners : {
					'click' : this.imageNodeClick
				}
			});
		}
		
		this.treePanel = new Ext.tree.TreePanel({
			layout : 'form',
			region : 'west',
			id : 'fileUploadManagerFilesTreePanel',
			title : '附件分类',
			collapsible : true,
			autoScroll : true,
			split : true,
			width : 180,
			tbar : new Ext.Toolbar({
				items : [{
					xtype : 'button',
					iconCls : 'btn-refresh',
					text : '刷新',
					scope:this,
					handler : function() {
						this.treePanel.root.reload();
					}
				}, '-', {
					xtype : 'button',
					text : '展开',
					iconCls : 'btn-expand',
					handler : function() {
						//this.treePanel.expandAll();
						Ext.getCmp('fileUploadManagerFilesTreePanel').expandAll();
					}
				}, '-', {
					xtype : 'button',
					text : '收起',
					iconCls : 'btn-collapse',
					handler : function() {
						Ext.getCmp('fileUploadManagerFilesTreePanel').collapseAll();
						//this.treePanel.collapseAll();
					}
				}]
			}),
			loader : new Ext.tree.TreeLoader({
				url : __ctxPath + '/system/treeLoadFileAttach.do'
			}),
			root : new Ext.tree.AsyncTreeNode({
				expanded : true
			}),
			rootVisible : false,
			listeners : {
				'click' : this.nodeClick
			}
		}); // end of this treePanel
		////////////////end of this treePanel//////////////////////////
		
		////////////////////////////##gridPanel##/////////////////////
		var topbar = new Ext.Toolbar({
			height : 30,
			defaultType : 'button',
			items : [{
				text : '上传',
				iconCls : 'btn-upload',
				handler : this.upLoadFile,
				scope : this
			}]
		}); // end of this topbar

		this.gridPanel = new HT.GridPanel({
					id:'fileUploadManagerGridPanel',
					region : 'center',
					tbar : topbar,
					rowActions : true,
					url:__ctxPath + '/system/listFileAttach.do',
					fields : [ { name : 'fileId', type : 'int' }, 
			           {name:'fileName',mapping:'fileName'}, 'ext', 'note',
						'fileType','filePath','createtime','totalBytes'],
					columns : [{
									header : 'fileId',
									dataIndex : 'fileId',
									hidden : true
								}, {
									header : '附件名称',
									dataIndex : 'fileName'
								}, {
									header : '上传时间',
									dataIndex : 'createtime',
									format : 'y-m-d'
								}, {
									header : '大小',
									dataIndex : 'note'
								},
								new Ext.ux.grid.RowActions({
									header : '管理',
									width : 80,
									actions : [ {
										iconCls : 'btn-showDetail',
										qtip : '查看',
										style : 'margin:0 3px 0 3px'
									}, {
										iconCls : 'btn-downLoad',
										qtip : '下载',
										style : 'margin:0 3px 0 3px'
									}],
									listeners : {
											scope : this,
											'action' : this.onRowAction
									}
								})]
						// end of columns
				});
		
		
		this.gridPanel.addListener('rowdblclick', function(grid, rowIndex, e) {
			grid.getSelectionModel().each(function(rec) {
				FileAttachDetail.show(rec.data.fileId);
			});
		});
		/////////////////## end of this gridPanel ##///////////////////////
		
		/////////////////##显示图片的dataView中相关组件     end ##//////////////
		// ##panel##//
		this.panel = new Ext.Panel({
			iconCls : 'menu-find-doc',
			layout : 'border',
			region : 'center',
			border : false
		});
		
		
			
		
		if(!imageYes){//列表展示附件
			this.panel.add(this.treePanel);
			this.panel.add(this.gridPanel); //附件列表
		}else{//图片附件
			/////////////////##显示图片的dataView中相关组件##//////////////
			this.imageStore = new Ext.data.JsonStore({
				url :  __ctxPath + '/system/listFileAttach.do?type=image',
			  	root : 'result',
			  	totalProperty : 'totalCounts',
				id : 'id',
			    fields: [
			    	{name : 'fileId',type:'int'}, 
		    		{name:'fileName',mapping:'fileName'}, 
		    		{name:'filePath',mapping:'filePath'}
			    ]
			});
			//this.imageStore.setDefaultSort('createtime','DESC');
			this.imageStore.load({params : {start : 0,limit : 8}});
		
			this.tpl = new Ext.XTemplate(
				'<tpl for=".">',
					'<div style="width:105px; height : 105px;" class="thumb-wrap" id="{fileId}">',
					'<img align="middle" src="'+__ctxPath+'/attachFiles/{filePath}" style="width:90px;height:90px;margin-left:7px;" title="{fileName}"/>',
					'<center><span style="margin-top:3px;">{fileName}</span><center>',
					'</div>', 
				'</tpl>'
			),
			this.dataView = new Ext.DataView({
				layout : 'form',
				region : 'center',
				store : this.imageStore,
				tpl : this.tpl,
				multiSelect : true,
				overClass : 'x-view-over',
				itemSelector : 'div.thumb-wrap',
				bodyStyle : 'padding:4px',
				emptyText : '目前尚无记录',
				listeners : {
					'dblclick' : {
						fn : this.imageDbClick.createCallback(this),
						scope : this
					}
				}
			}); // end of this dataView
			
			//图片展示,添加显示数据组件
			this.dataPanel = new Ext.Panel({
				layout : 'form',
				region : 'center',
				tbar : topbar,
				layout : 'fit',
				defaults:{
				   anchor:'100%,100%'
				},
				items : this.dataView,
				bbar : new Ext.PagingToolbar({
					pageSize : 15,
					store : this.imageStore,
					displayInfo : true,
					displayMsg : '当前显示从{0}至{1}， 共{2}条记录',
					emptyMsg : "当前没有记录"
				})
			}); // end of this dataPanel

			this.panel.add(this.imageTreePanel);
			this.panel.add(this.dataPanel); //图片展示
		}
		this.panel.doLayout();
	}, // end of this initUIComponent
	
	onRowAction : function(gridPanel, record, action, row, col) {
		switch (action) {
			case 'btn-showDetail' :
				this.showdetail(record.data.fileId);
				break;
			case 'btn-downLoad' :
				this.downLoad(record.data.fileId);
				break;
		}
	},

	/**
	 * 查看详细信息
	 */
	showdetail : function(fileId) {
		FileAttachDetail.show(fileId);
	},

	/**
	 * 下载
	 */
	downLoad : function(fileId) {
		window.open(__ctxPath + "/file-downLoad?fileId="+fileId);
	},

	/**
	 * 文件上传
	 */
	upLoadFile : function() {
		
		var callback=this.callback;
		var dialog = new Ext.ux.UploadDialog.Dialog({
//			file_cat : this.file_cat,						//类型传输有误!修改为fileUrl
			file_cat : fileUrl,
			url : this.url,
			scope:this,
			callback : function(obj){
				if(obj != null && obj.length > 0){
					var gridPanel = Ext.getCmp('fileUploadManagerGridPanel');
					gridPanel.getStore().baseParams = {
						Q_fileType_S_LK : this.file_cat
					};
					gridPanel.getStore().reload({
						params : {
							start : 0,
							limit : 10
						}
					});
					if (callback != null)
						callback.call(this, obj);
				}
				Ext.getCmp('fileUploadManager').close();
			}
		});
		dialog.show('queryWindow');
	},
	
	/**
	 * 上传图片刷新
	 */
	upLoadImage : function(){
		var dialog = App.createUploadDialog2({
			file_cat : this.file_cat,
			callback : function(obj){
				if(obj != null && obj.length>0){
					var store = Ext.getCmp('fileUploadManager').dataView.getStore();
					store.url = __ctxPath + '/system/listFileAttach.do?type=image';
					store.baseParams = {
						Q_fileType_S_LK : this.file_cat
					};
					store.reload({
						params : {
							start : 0,
							limit : 8
						}
					});
				}
				Ext.getCmp('fileUploadManager').close();
			}
		});
		dialog.show('image');
	},

	/**
	 * 确定上传文件
	 */
	upLoad : function() {
		var tab = Ext.getCmp('fileUploadMangerTabPanel');
		var gridPanel = Ext.getCmp('fileUploadManagerGridPanel');
		var records = gridPanel.getSelectionModel().getSelections();
		
		var types = this.permitted_extensions;
		if(FileUploadManager.judgeImage(types)){ //上传image图片
			records = Ext.getCmp('fileUploadManager').dataView.getSelectedRecords();
		}
		var arr = new Array();
		for(var i = 0 ; i < records.length ; i++){
			arr.push(records[i].data);
		}
		if (this.callback != null)
			this.callback.call(this, arr);
		Ext.getCmp('fileUploadManager').close();
	},
	
	/**
	 * 节点单击事件
	 * @param {} node
	 */
	nodeClick : function(node){
		if (node != null) {
			var fileTypeId = '';
			if(node.getDepth() > 1){
				node.bubble(function(node){
					fileTypeId = node.id + '/' + fileTypeId;
				});
				fileTypeId = fileTypeId.substring(12,fileTypeId.length-1);
			}
			fileUrl = fileTypeId;
			var store = Ext.getCmp('fileUploadManagerGridPanel').getStore();
			store.url = __ctxPath + '/system/listFileAttach.do';
			store.reload({
				params : {
					start : 0,
					limit : 20,
					type : 'file',
					fileType : fileTypeId
				}
			});
		}
	},
	
	imageNodeClick : function(node){
		if (node != null) {
			var id = '';
			if(node.getDepth() > 1){
				node.bubble(function(node){
					id = node.id + '/' + id;
				});
				id = id.substring(12,id.length-1);
			}
			fileUrl = id;
			var store = Ext.getCmp('fileUploadManager').dataView.getStore();
			store.url = __ctxPath + '/system/listFileAttach.do?type=image';
			store.reload({
				params : {
					start : 0,
					limit : 20,
					type : 'image',
					fileType : id
				}
			});
		}
	},
	
	/**
	 * Image图片双击事件，显示图片信息
	 */
	imageDbClick : function(self){
		var nodes = self.dataView.getSelectedNodes();
		if(nodes != '' && nodes != null && nodes != 'undefined'){
			FileUploadImageDetailForm.show(nodes[0].id);
		}
	}
});

/**
 * @desription 判断是否为图片，true:图片
 * @remark 图片格式:jpg|gif|jpeg|png|bmp|JPG|GIF|JPEG|PNG|BPM
 * @param {} types
 */
FileUploadManager.judgeImage = function(types){
	//var type = this.permitted_extensions;
	//图片格式:jpg|gif|jpeg|png|bmp|JPG|GIF|JPEG|PNG|BPM
	if(types != null && types != 'undefined'){
		for(var i = 0 ; i < types.length ; i++){
			var type = types[i].toLowerCase();
			if(type=='bmp' || type=='png' || type=='jpeg' || type=='jpg' || type=='tiff' || type=='gif'){ //上传image图片
				return true;
			}
		}
	}
	return false;
};
