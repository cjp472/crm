Ext.ns('MonThatView');
/**
 * 我的任务流程
 */
var MonThatView = function(depname,jidu,uname,uno,yongjin,empPerNd,empPerQuarter,ny_quarter_nd) {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + "/customer/listdetailSysEmpPerformance.do?ny_quarter_nd="+ny_quarter_nd
//							params : {
//					           empPerQuarter:empPerQuarter,
//					           ny_quarter_nd:ny_quarter_nd,
//					           empPerNd:empPerNd
//							}
						}),
				// create reader that reads the Topic records
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							fields : ['zhibiaoxiang', 'mubiaozhi', 'wanchengliang',
									'wanchenglv', 'yongjin']
						}),
				remoteSort : true
			});
//	store.setDefaultSort('dbId', 'desc');
	store.load({
				params : {
					start : 0,
					limit : 25
				}
			});
	var cm = new Ext.grid.ColumnModel({
				columns : [new Ext.grid.RowNumberer(), 
					    {
							header : "指标项",
							dataIndex : 'zhibiaoxiang',
							width : 100
//							hidden : true,
//							sortable : true
						}
						, {
							header : '目标值',
							dataIndex : 'mubiaozhi',
							width : 100
						}, {
							header : '完成量',
							dataIndex : 'wanchengliang',
							width : 100
						}, {
							header : '完成率(%)',
							dataIndex : 'wanchenglv',
							width : 100
						}, {
							header : '佣金',
							dataIndex : 'yongjin',
							width : 100
						}]
//				defaults : {
//					sortable : true,
//					menuDisabled : true,
//					width : 100
//				}
			});
	// 显示任务
	var grid = new Ext.grid.GridPanel({
				id : 'MyTasgggggggggggggkGrid',
				closable : true,
				store : store,
				shim : true,
				border : true,
				region : 'center',
				trackMouseOver : true,
				loadMask : true,
				cm : cm,
				viewConfig : {
					forceFit : true,
					showPreview : false
				}
			});
	var stores = new Ext.data.ArrayStore({// 配置数据源
		fields : ['season', 'total'],
		data : [{
					season : '目标值',
					total : 150
				}, {
					season : '完成量',
					total : 245
				}]
	});
	grid.addListener('rowclick', function(grid, rowindex, e) {
				Ext.get('piechart').update('');
				var record = grid.getStore().getAt(rowindex);
//				var pie = new Ext.ux.GoogleChart({
//						    chartType:"pie"
//						    , dataType:"extended",
//						    id:'yongjinChart',
//						      width : 400,
//						      height:170,
//						      style:'padding:10px'
//						    ,chartColors:["f12828", "faf71c"]
//						    ,labels:["目标值","完成量"]
//						});
//				pie.addData("data",[grid.getStore().getAt(rowindex).data.mubiaozhi,grid.getStore().getAt(rowindex).data.wanchengliang]);
				var chart = new FusionCharts(__ctxPath +"/fusioncharts/charts/Pie2D.swf","ChartId",600,160,"0","0");
				chart.setDataXML("<graph showLabels='1' showValues='0' showLegend='1'  legendPosition='RIGHT' chartrightmargin='40' bgcolor='FFFFFF' bgalpha='70' bordercolor='C6D2DF' basefontcolor='2F2F2F' showpercentvalues='1' bgratio='0' startingangle='200' animation='1' showBorder='0'>"+ 
					"<set label='目标值' value='"+record.data.mubiaozhi+"' color='f12828'/> "+
					"<set label='完成量' value='"+record.data.wanchengliang+"' color='faf71c' /> "+
    				"</graph>");
				chart.render("piechart");
			});

	var chartPanel = new Ext.Panel({
				region : 'east',
				layout : 'form',
				anchor : '96%',
				width : 400,
				height : 220,
				border : false,
				items : [{
					border:false,
					html:'<div id="piechart"></div>'
				}]

			});
	// var rightPanel = new Ext.Panel({
	// layout : 'border',
	// border : false,
	// // width : 400,// 配置大小
	// region : 'center',
	// items : [infoPanel,rightPanel]
	// });

	var infoPanel = new Ext.FormPanel({
		layout : 'form',
		border : false,
		height : 180,
        id:'yongjinrenyuan',
		region : 'north',
		labelAlign : 'right',
		defaults : {
			anchor : '96%'
		},
		labelWidth : 80,
		items : [{
			layout : 'column',
			border : false,
			anchor : '96%',
			xtype : 'panel',
			items : [{
				layout : 'form',
				columnWidth : .50,
				xtype : 'panel',
				bodyStyle : 'padding-top:23px;',
				border : false,
				items : [{
							xtype : 'textfield',
							fieldLabel : '姓名',
							name: 'uname',
							style : 'padding-top:5px;',
							anchor : '96%',
							value:uname
						}, {
							xtype : 'textfield',
							fieldLabel : '工号',
							name : 'uno',
							style : 'padding-top:5px;',
							anchor : '96%',
							value:uno
						}, {
							xtype : 'textfield',
							fieldLabel : '所属机构',
							style : 'padding-top:5px;',
							name : 'depname',
							anchor : '96%',
							value:depname
						}, {
							xtype : 'textfield',
							fieldLabel : '月份',
							style : 'padding-top:5px;',
							name:'jidu',
							anchor : '96%',
							value:jidu
						}, {
							xtype : 'textfield',
							fieldLabel : '佣金',
							style : 'padding-top:5px;',
							name:'yongjin',
							anchor : '96%',
							value:yongjin
						}]

			}, {
				layout : 'form',
				columnWidth : .50,
				bodyStyle : 'padding-top:23px;',
				xtype : 'panel',
				border : false,
				items : [chartPanel]

			}]
		}]
	})
//	if (obfee.feeId != null && obfee.feeId != 'undefined') {
//		alert("ddd");
//		
//		var yjpanel=Ext.getCmp('yongjinrenyuan');
//		alert(yjpanel);
//			yjpanel.loadData({
//						url : __ctxPath + '/customer/getObFee.do?feeId='+ obfee.feeId,
//						root : 'data',
//						preName : 'obFee',
//						success : function(response, options) {
//			        	alert("success");
////				            var feeIndexProjectName=  Ext.getCmp('obFeeRule.obFeeIndexProject.feeIndexProjectName').getValue();
////				            var feeIndexProjectId=  Ext.getCmp('obFeeRule.obFeeIndexProject.feeIndexProjectId').getValue();
////				         	var thisObj = Ext.util.JSON.decode(response.responseText).data;
////							Ext.getCmp('obFeeRule_zhibiao_form').setRawValue(feeIndexProjectId);// 活动id
////							Ext.getCmp('obFeeRule_zhibiao_form').setValue(feeIndexProjectName);// 活动名称
//						},
//						failure : function(response, options) {
//								Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
//							}
//					});
//		}
	var panel = new Ext.Panel({
				id : 'MonThatView',
				iconCls : 'menu-flowWait',
				bodyStyle : 'padding:2px 2px 2px 2px',
				layout : 'border',
				region : 'center',
				title : '佣金详情 ',
				autoScroll : true,
				items : [grid, infoPanel]
			});
	return panel;
};
