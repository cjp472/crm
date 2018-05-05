/**
 * 请传递  cusId 客户id cusNo 客户编号 comId 活动id 可以不传
 * @class YXtaskproDingDanForm
 * @extends Ext.Panel
 */
YXtaskproDingDanForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		//更改传参方式
		 var arr = ['',''];
		if (_cfg == [Object , Object]){
		arr = ['',''];
		}
		else{
		arr = _cfg.split(',');
		} 
		if(this.cusNo == undefined || this.cusNo == null || this.cusNo == '' || this.cusNo == -1 || this.cusNo == 'undefined'){
            this.cusNo = arr[1];
        }
         if(this.cusId == undefined || this.cusId == null || this.cusId == '' || this.cusId == -1 || this.cusId == 'undefined'){
           	this.cusId = arr[0];
        }
        if(this.comId == undefined || this.comId == null || this.comId == '' || this.comId == -1 || this.comId == 'undefined'){
           	this.comId = arr[2];
        }

		// 必须先初始化组件
        if(this.cusNo == undefined || this.cusNo == null || this.cusNo == '' || this.cusNo == -1 || this.cusNo == 'undefined'){
            Ext.ux.Toast.msg('操作信息', '下订单时需要客户编号.');
            return;
        }
        if(this.cusId == undefined || this.cusId == null || this.cusId == '' || this.cusId == -1 || this.cusId == 'undefined'){
            Ext.ux.Toast.msg('操作信息', '下订单时需要客户Id');
            return;
        }
        var cusNo = this.cusNo;
        Ext.ns('YXtask.getCur');
        YXtask.getCur.ulr = AppUtil.proxyURL + '/getCustInfo';
        YXtask.getCur.getCusPara = { 
	        'cust_id' : cusNo
	    };
	    AppUtil.copy(AppUtil.interfaceBase, YXtask.getCur.getCusPara);
	    
	    YXtask.getCur.getCusPara__ = {
	        wsUrl : YXtask.getCur.ulr,
	        jsonData_ : Ext.util.JSON.encode(YXtask.getCur.getCusPara)
	    };
	    
	    YXtask.getCur.result = AppUtil.synchroAjax(__ctxPath + '/system/proxyRestfulWSProxy.do', 
	        YXtask.getCur.getCusPara__).result;
        if(YXtask.getCur.result == "" || YXtask.getCur.result == null){
            Ext.ux.Toast.msg('操作信息', '获取客户信息失败!');
            return;
        }
        this.cus = YXtask.getCur.result[0];
        this.cus.customerId = this.cusId;
        this.cus.customerNo = this.cusNo;
        var cus_ = this.cus;
        
		this.initUIComponents();
       
		YXtaskproDingDanForm.superclass.constructor.call(this, {
			id : 'YXtaskproDingDanFormWin',
			layout : 'fit',
			items : this.formPanel,
			modal : true,
			height : 400,
			width : 500,
			maximizable : true,
			title : '下订单',
			buttons : [{
	//								text : '暂存',
	//								iconCls : 'btn-save',
	//								handler : function() {
	//									DDcreate.zancun(this.cus.Id);
	//								}
	//							}, {
				text : '结算',
				iconCls : 'menu-assets',
				handler : function() {
					DDcreate.jieSuan(cus_);
				}
			}],
			buttonAlign : 'center'
		});
	},// end of the constructor
	
	initUIComponents : function() {
	    // TODO 订单页信息
		this.rel_know_grid = new HT.GridPanel({
			region : 'center',
			title : '相关知识',
			id : 'faq_dindan_grid',
			height:200,
			layout:'fit',
			url : __ctxPath + "/supply/getRelKnowScGoods.do",
			fields : [{
						name : 'knowId',
						type : 'long'
					}, 'tiTle'],
			columns : [{
						header : 'id',
						dataIndex : 'knowId',
						hidden : true
					}, {
						header : '标题',
						dataIndex : 'tiTle',
						sortable : true
					}]
		});
		this.rel_know_grid.addListener('rowdblclick', function(grid, rowindex, e) {
			grid.getSelectionModel().each(function(record) {
				new UkSysKnowShow_win({
					knowId : record.data.knowId
				}).show();
			});
		});

        var grid = DDgoods.getGridPanel_goods(this.comId);
        
        //订单信息
	    this.formPanel = new Ext.Panel({
				border:false,
				autoScroll:true,
				defaults : {
					border : false,
					anchor : '98.5%,98.5%'
				},
				items:[grid, DDcreate(this.cus), {
                xtype:'fieldset',
                title:'<div style="width:150px;height:25px;" >相关知识</div>',
                collapsible : true,
                collapsed : true,
                items:[this.rel_know_grid]
//                },{
//					xtype:'tabpanel',
//					height:200,
//					activeTab:0,
//					items:[{
////						title:'活动促销',
////						items:[this.cuxiao_grid]
////					},{
//						title:'加价购',
//						items:[]//new DDgoods().gridPanel_sub]
//					}
////                    ,{
////						title:'相关知识',
////						items:[this.rel_know_grid]
////					}
//                    ]
				}]
			})
    }// end of the initcomponents
});