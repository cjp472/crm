
var UkKnowDingyueTree = function() {
	var dingyueKnowTree = new Ext.ux.tree.CheckTreePanel({
				
				title : __ukKnowDingyueKnowTypeId+__ukKnowDingyueDetailHeading,
				id : 'dingyueKnowTree',
				autoScroll : true,
				animate : true,
				checkModel : 'multiple',
				containerScroll : true,
				lines : true,// 节点之间连接的横竖线
				rootVisible : false,// 是否显示根节点
				collapsible : true,
				split : true,
				cascadeCheck : 'all',
				loader : new Ext.ux.TreeCheckLoader({
			        dataUrl : __ctxPath + '/know/listJsonUkKnowDingyue.do'
			       }),
				root : new Ext.tree.AsyncTreeNode({
							expanded : true
						})
			});
//	dingyueKnowTree.on("check",function(node,checked){alert(node.text+" = "+checked)}); //注册"check"事件  

	dingyueKnowTree.on('load',function(){
		Ext.Ajax.request({
			url : __ctxPath + '/know/getByUseridUkKnowDingyue.do',
			method : 'GET',
			success : function(response, options) {
				var object=Ext.util.JSON.decode(response.responseText);
//				alert(object.data.knowTypeDingyue);
				if(object.data.knowTypeDingyue!=null){
					dingyueKnowTree.setSelectValue(object.data.knowTypeDingyue);
				}
				
			},
			failure : function(response, options) {
				Ext.ux.Toast.msg(__toastMessage, __operationFailed);
			},
			scope : this
		});	
	});
	
	var tbar = new Ext.Toolbar({
		items : [{
			iconCls : 'menu-add',
			xtype : 'button',
			text : __treepanelAll,
			scope : this,
			handler : function() {
				var rootNode = Ext.getCmp('dingyueKnowTree').getRootNode().childNodes[0];
				rootNode.ui.check('all');
			}
		}, '-', {
			iconCls : 'menu-del',
			xtype : 'button',
			text : __treepanelNone,
			scope : this,
			handler : function() {
				var rootNode = Ext.getCmp('dingyueKnowTree').getRootNode().childNodes[0];
				rootNode.ui.check('none');;
			}
		}, '-', {
			iconCls : 'btn-refresh',
			xtype : 'button',
			text : __treepanelRefresh,
			scope : this,
			handler : function() {
				var tree = Ext.getCmp('dingyueKnowTree');
				tree.body.mask(__maskLoading, 'x-mask-loading');
				tree.root.reload();
				tree.root.collapse(true, false);
				tree.root.expand(false, false, function() {
							tree.body.unmask();// 全部展开之后让蒙版消失
						});
			}
		}, '-', {
			xtype : 'button',
			text : __treepanelEpand,
			iconCls : 'btn-expand',
			scope : this,
			handler : function() {
				dingyueKnowTree.expandAll();
			}
		}, '-', {
			xtype : 'button',
			text : __treepanelCollapse,
			iconCls : 'btn-collapse',
			scope : this,
			handler : function() {
				dingyueKnowTree.collapseAll();
			}
		}
	]});
	var dingyueKnowWin = new Ext.Window({
				id : 'dingyueKnowWin',
				title : __create+__ukKnowDingyueKnowDingyue,
				width : 600,
				tbar:tbar,
				height : 450,
				modal : true,
				layout : 'fit',
				plain : true,
				bodyStyle : 'padding:5px;',
				buttonAlign : 'center',
				items : [dingyueKnowTree],
				buttons : [
						{
							text : __save,
							iconCls:'btn-save',
							handler : function() {
//								alert(dingyueKnowTree.getSelectValue());
//								alert(Ext.getCmp('dingyueKnowTree').getChecked());
								Ext.Ajax.request({
									url : __ctxPath + '/know/saveUkKnowDingyue.do',
									method : 'POST',
									params:{knowTypeDingyue:dingyueKnowTree.getSelectValue().toString()},
									success : function(response, options) {
										Ext.ux.Toast.msg(__toastMessage,__ukKnowDingyueKnowDingyue+__success);
										var gridPanel = Ext.getCmp('UkKnowDingyueManageGrid');
										if (gridPanel != null) {
											gridPanel.getStore().reload();
										}
										dingyueKnowWin.close();
									},
									failure : function(response, options) {
										Ext.ux.Toast.msg(__toastMessage, __operationFailed);
									},
									scope : this
								});
							}
						},{
							text : __cancel,
							iconCls:'btn-cancel',
							handler:function(){
								dingyueKnowWin.close();
							}
						}
				]
			});
	dingyueKnowWin.show();

}