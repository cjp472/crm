/**
 * @author cf0666@gmail.com
 * @createtime
 * @class AchievementsFormCount.js
 * @extends Ext.Window
 * @description QcCheck表单
 * @company 优创融联科技
 */
AchievementsFormCount = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		AchievementsFormCount.superclass.constructor.call(this, {
					id : 'AchievementsFormCountWin',
					layout : 'fit',
					items : [{
								xtype : 'grid',
								store : new Ext.data.SimpleStore({
											fields : ['id', 'name'],
											data : [['1', '第1行'], ['2', '第2行']]
										}),
								colModel : new Ext.grid.ColumnModel({
											columns : [{
														header : "周/日",
														width : 120,
														dataIndex : 'id'
													}, {
														header : "姓名",
														width : 120,
														dataIndex : 'name'
													}, {
														header : "工号",
														width : 120,
														dataIndex : 'name'
													}, {
														header : "考核时间",
														width : 120,
														dataIndex : 'name'
													}, {
														header : "分数",
														width : 120,
														dataIndex : 'name'
													}, {
														header : "权重",
														width : 120,
														dataIndex : 'name'
													}, {
														header : "分数",
														width : 120,
														dataIndex : 'name'
													}, {
														header : "权重",
														width : 120,
														dataIndex : 'name'
													}, {
														header : "小计",
														width : 120,
														dataIndex : 'name'
													}],
											defaultSortable : true,
											rows : [[{}, {}, {}, {}, {
														header : '指标1',
														colspan : 2,
														align : 'center'
													}, {
														header : '指标2',
														colspan : 2,
														align : 'center'
													}, {}

											]]
										}),
								enableColumnMove : false,
								viewConfig : {
									forceFit : true
								},
								plugins : [new Ext.ux.plugins.GroupHeaderGrid()]
							}],
					modal : true,
					height : 400,
					width : 500,
					maximizable : true,
					title : '绩效详细信息',
					buttonAlign : 'center'
				});
	}
});