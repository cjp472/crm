/**
 * @description 展示知识的GridPanel
 * @class UkPerKnowGridPanel
 * @author 优创融联科技
 * @updater wangzj
 * @createtime 2012-6-2PM
 */
var UkPerKnowGridPanel = {

	/**
	 * 
	 * @param {}
	 *            gridPanelId panel的ID
	 * @param {}
	 *            url 请求数据的路径
	 * @param {}
	 *            operateTimeField 操作时间列的字段名
	 * @param {}
	 *            tbar panel的tbar
	 * @param {}
	 *            hasRowAction 是否有管理列
	 * @demo
				var rowAction = new Ext.ux.grid.RowActions({
						header : __action,
						width : 100,
						actions : [{
									iconCls : 'btn-del',
									qtip : __delete,
									style : 'margin:0 3px 0 3px'
								}, {
									iconCls : 'btn-edit',
									qtip : __edit,
									style : 'margin:0 3px 0 3px'
								}],
						listeners : {
							scope : this,
							'action' : this.onRowAction
						}
					});
				this.gridPanel = UkSysKnowGridPanel.getView("UkKnowDingyueManageGrid","/know/dingYueListUkPerKnow.do","订阅时间",this.topbar,rowAction);
	 */
	getView : function( gridPanelId, url, operateTimeField,tbar, rowAction) {
		if(tbar == undefined || tbar==null){
			tbar = null;
		}
		if(rowAction == undefined || rowAction==null){
			rowAction = new Ext.ux.grid.RowActions({
				header : __action,
				width : 100,
				hidden : true,
				actions : []
			});
		}

		var gridPanel = new HT.GridPanel({
			region : 'center',
			tbar : ['->',{
				text:'移除',
				iconCls:'btn-del',
				xtype : 'button',
				scope : this,
				handler : function(){
					var nodeId = Ext.getCmp('UkKnowShoucangTypeTree').getSelectionModel().getSelectedNode();
					var gridPanel = Ext.getCmp(gridPanelId);
					var selectRecords = gridPanel.getSelectionModel().getSelections();
					if (selectRecords.length == 0) {
						Ext.ux.Toast.msg("信息", "请选择要移除的记录！");
						return;
					}
					var ids = Array();
					for (var i = 0; i < selectRecords.length; i++) {
						ids.push(selectRecords[i].data.knowId);
					}
					
					if(nodeId == null || nodeId.id == 0){
						Ext.ux.Toast.msg("操作信息", "请先选择根节点下其他节点!");
					}else{
						Ext.Msg.confirm('信息确认', '您确认要移除所选记录吗？', function(btn) {
							if (btn == 'yes') {
								Ext.Ajax.request({
									url : __ctxPath
											+ '/know/removeMyKnowUkKnowCollectType.do',
									params : {
										knowIds : ids,
										knowCollectTypeId : nodeId.id
									},
									method : 'POST',
									success : function(response, options) {
										Ext.ux.Toast.msg('操作信息', '成功移除!');
										gridPanel.getStore().reload();
									},
									failure : function(response, options) {
										Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
									}
								});
							}
						});
					}
				}
			}],
			// 使用RowActions
//			rowActions : true,
			printable : false,
			exportable : false,
			id : gridPanelId,
			url : __ctxPath + url,
			fields : [{
						name : 'knowId',
						type : 'int'
					}, 'ukSysKnow', 'ukSysKnow', 'tiTle', 'busiType',
					'enableTime', 'pastTime', 'sysKnowStatus', 'viewCount',
					'sysKnowComment', 'plus1', 'plus2', 'plus3', 'plus4',
					'plus5', 'plus6', 'plus7', 'plus8', 'sysKnowVersion',
					'createBy', 'updateBy', 'createDate', 'updateDate',
					'userid', 'ukKnowTemplate', 'ukKnowApprove', 'ukKnowTypes',
					'ukKnowKeywords', 'dianpingCount', 'dianpingValue', 'dianpingTime'],
			columns : [{
						header : __ukSysKnowKnowId,// 'knowId',
						dataIndex : 'knowId',
						hidden : true
					}, {
						header : __ukSysKnowTiTle,// '标题',
						isExp : false,
						width:500,
						dataIndex : 'tiTle'
//						,
//						renderer : function(value, metadata, record) {
//							var reVal = '';
//							reVal += '<a href="#" onclick="App.MyDesktopClickTopTab(\'UkKnowDianpingDetail\','
//									+ record.data.knowId + ')">';
//							reVal += value
//							reVal += "</a>";
//							reVal += '&nbsp;&nbsp;';
//							return reVal;
//						}
					}, {
						header : __ukSysKnowSysKnowComment,// '摘要',
						isExp : false,
						hidden : true,
						dataIndex : 'sysKnowComment'
					}, {
						header : '开始时间 ',// '生效时间',
						isExp : false,
						dataIndex : 'enableTime'
					}, {
						header : __ukSysKnowPastTime,// '过期时间',
						isExp : false,
						dataIndex : 'pastTime'
					}, {
						header : '浏览数',// '点评时间',
						isExp : false,
						dataIndex : 'viewCount'
					}, {
					 header : __ukSysKnowSysKnowStatus,//'状态,
					 isExp : false,
					 dataIndex : 'sysKnowStatus',
					 hidden : true,
					 renderer : function(value) {
						 return KNOW_FLOW.get(value);
					 }
					 }, {
					// header : __ukSysKnowViewCount,//'浏览数',
					// isExp : false,
					// dataIndex : 'viewCount'
					// }, {
					// header : '点评数',//'浏览数',
					// isExp : false,
					// dataIndex : 'dianpingCount'
					// // },{
					// // header : __ukSysKnowSysKnowVersion,//'版本号',
					// // isExp : false,
					// // dataIndex : 'sysKnowVersion'
					// }, {
						header : __ukSysKnowCreateBy,// '创建人内码',
						isExp : false,
						hidden : true,
						dataIndex : 'createBy',
						renderer : function(value) {
							if (value == null) {
								return '';
							} else {
								return value.username;
							}
						}
					}
//					new Ext.ux.grid.RowActions({
//								header : __action,
//								actions : [{
//											iconCls : 'btn-readdocument',
//											qtip : '详情',
//											style : 'margin:0 3px 0 3px'
//										}],
//								listeners : {
//									scope : this,
//									'action' : this.onRowAction
//								}
//							})
					]
				// end of columns
		});
		return gridPanel;
	}

};
