/**
 * @author cf0666@gmail.com
 * @createtime
 * @class DDDetail
 * @extends Ext.Window
 * @description ObCallbatch表单
 * @company 优创融联科技
 */
DDDetail = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		DDDetail.superclass.constructor.call(this, {
					id : 'DDDetailWin',
					layout : 'fit',
					items : this.panel,
					modal : true,
					maximizable : true,
					title : '订单信息'
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {

		this.gridPanel = new HT.GridPanel({
			height : 150,
			title : '商品清单',
			showPaging : false,
			scrollHeight : true,
//			clicksToEdit : 1,
//			url : __ctxPath + "/xitong/getContactUlEmployee.do?useid=",
//            store : store,
			fields : [{
						name : 'goodsId',
						type : 'int'
					},'goodsName', 'numbers', 'amount', 'retailPrice'],
			columns : [{
						header : '商品名称',
						dataIndex : 'goodsName'
					}, {
						header : '商品编号',
						dataIndex : 'numbers'
					}, {
						header : '购买价',
						dataIndex : 'retailPrice',
                        renderer : function(value){
                            return Number(value).toFixed(2);                        
                        }
					}, {
						header : '商品数量',
						dataIndex : 'amount'
					}]
				// end of columns
			});
//        alert(this.data_dd.goods.length);
            
        for(var tmp = 0; tmp < this.data_dd.goods.length ; tmp++){
	        var grid = this.gridPanel;
	        var store = grid.getStore();
//            alert(this.data_dd.goods[tmp].goodsName);
	        var newRecord_par = new store.recordType({
                goodsId : this.data_dd.goods[tmp].goodsId,
	            goodsName : this.data_dd.goods[tmp].goodsName,
	            numbers : this.data_dd.goods[tmp].numbers,
	            amount : this.data_dd.goods[tmp].amount,
	            retailPrice : this.data_dd.goods[tmp].scGoodsPrice.retailPrice
	        });
	        grid.stopEditing();
	        store.add(newRecord_par);
        }
        
		this.gridPanel1 = new HT.GridPanel({
			height : 150,
			title : '物流状态',
			showPaging : false,
			scrollHeight : true,
			clicksToEdit : 1,
			url : __ctxPath + "/xitong/getContactUlEmployee.do?useid=",
			fields : [{
						name : 'contactEmplId',
						type : 'int'
					}, 'contactType', 'contactValue'],
			columns : [{
						header : '处理时间',
						dataIndex : 'contactType'
					}, {
						header : '处理信息',
						dataIndex : 'contactType2'
					}, {
						header : '操作人',
						dataIndex : 'contactValue'
					}]
				// end of columns
			});
        
        var show = this.data_dd.data.cusDelivery.regionGuojia.regionName +
            this.data_dd.data.cusDelivery.regionSheng.regionName +
            this.data_dd.data.cusDelivery.regionShi.regionName +
            this.data_dd.data.cusDelivery.regionQu.regionName + 
            this.data_dd.data.cusDelivery.deliveryAddress;
		this.panel = new Ext.Panel({
			border:false,
			bodyStyle : 'overflow-y:auto',
			items : [this.gridPanel,{
						title : '收货信息',
						collapsible : true,
						xtype : 'fieldset',
						collapsed : false,
						items : [{
									xtype : 'displayfield',
									fieldLabel : '收货人',
									value : this.data_dd.data.cusDelivery.deliveryName
								}, {
									xtype : 'displayfield',
									fieldLabel : '地址',
									value : show
								}, {
									xtype : 'displayfield',
									fieldLabel : '联系方式',
									value : this.data_dd.data.cusDelivery.deliveryPhone
								}]
					}, {
						title : '支付及配送状态',
						xtype : 'fieldset',
						collapsible : true,
						collapsed : false,
						items : [{
									xtype : 'displayfield',
									fieldLabel : '支付方式',
									value : '货到付款'
								}, {
									xtype : 'displayfield',
									fieldLabel : '运费',
									value : Number(this.data_dd.data.ext11).toFixed(2)
								}]
					}, {
						title : '发票信息',
						xtype : 'fieldset',
						collapsible : true,
						collapsed : false,
						items : [{
									xtype : 'displayfield',
									fieldLabel : '发票类型',
									value : '不开发票'
								}]
					}, {
						title : '付款信息',
						xtype : 'fieldset',
						collapsible : true,
						collapsed : false,
						items : [{
									layout : 'column',
									border : false,
									items : [{
												layout : 'form',
												border : false,
												columnWidth:.333,
												items : [{
															xtype : 'displayfield',
															fieldLabel : '商品金额',
															value : Number(this.data_dd.data.ext12).toFixed(2)
														},{
															xtype : 'displayfield',
															fieldLabel : '积分',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '储值金',
															value : ''
														}]
											},{
												layout : 'form',
												border : false,
												columnWidth:.333,
												items : [{
															xtype : 'displayfield',
															fieldLabel : '运费',
															value :  Number(this.data_dd.data.ext11).toFixed(2)
														},{
															xtype : 'displayfield',
															fieldLabel : '礼金',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '暂存款',
															value : ''
														}]
											},{
												layout : 'form',
												border : false,
												columnWidth:.333,
												items : [{
															xtype : 'displayfield',
															fieldLabel : '消费金额',
															value : Number(this.data_dd.data.totalInAmount).toFixed(2)
														},{
															xtype : 'displayfield',
															fieldLabel : '代金券',
															value : ''
														}]
											}]
								}]
					}, this.gridPanel1]
		})

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
		$postSubForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/outb/saveObCallbatch.do',
					msgSuccess : '成功删除该记录！',
					msgFailure : '操作出错，请联系管理员！',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('ObCallbatchGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}// end of save

});