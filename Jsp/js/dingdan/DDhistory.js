Ext.ns('DDhistory.getList');
DDhistory.getList.url = AppUtil.proxyURL + '/getOrderList';

function DDhistory(cusNo){
    if(cusNo == undefined || cusNo == null){
        Ext.ux.Toast.msg('操作信息', '历史订单需要客户ID!');
    }

    DDhistory.getList.getCusPara = { 
        'cust_id' : cusNo
    };
    AppUtil.copy(AppUtil.interfaceBase, DDhistory.getList.getCusPara);
    
    this.getStore = new Ext.data.JsonStore({
	    url : __ctxPath + '/system/proxyRestfulWSProxy.do',
	    root : 'result',
	    totalProperty : 'count',
        baseParams : {
            start : 0,
            limit : 5,
            'wsUrl' : DDhistory.getList.url,
            'jsonData_' : Ext.util.JSON.encode(DDhistory.getList.getCusPara)    
        },
	    remoteSort : true,
	    fields : [{
	        name : 'ord_id',
	        type : 'long'
	        }, 'medi', 'pre_aft_pay_cd', 'dlv_cd','create_date',
	        'ord_appr_mthd_cd', 'dlv_addr_seq', 'ord_stat_cd',
	        'invc_id', 'last_stat_date','confirm_pay', 'prc']
	});
                    
    this.gridPanel = new HT.GridPanel({
        printable : false,
        exportable : false,
        lazyLoad : true,
        showPaging : true,
        showSm : false,
        layout : 'fit',
        id : 'gridPanel_ddls',
        store : this.getStore,
        columns : [
                {
                    header : '订单号',
                    dataIndex : 'ord_id',
                    isExp : false
                },{
                    header : '订单类型',
                    dataIndex : 'pre_aft_pay_cd',
                    renderer :function(value){
                        return PRE_AFT_PAY_CD.get(value);
                    },
                    isExp : false
                },{
                    header : '来源',
                    dataIndex : 'medi',
                    isExp : false
                },  {
                    header : '下单日期',
                    dataIndex : 'create_date',
                    isExp : false
                },{
                    header : '金额',
                    dataIndex : 'prc',
                    renderer : function(value){
                        return Number(value).toFixed(2);
                    }
                },  {
                    header : '付款方式',
                    dataIndex : 'ord_appr_mthd_cd',
                    renderer : function(value){
                        return ORD_APPR_MTHD_CD.get(value);
                    },
                    isExp : false
                }, {
                    header : '送货地址',
                    dataIndex : 'dlv_addr_seq',
                    isExp : false
                }, {
                    header : '订单状态',
                    dataIndex : 'ord_stat_cd',
                    renderer :function(value){
                        return ORD_STAT_CD.get(value);
                    },
                    isExp : false
                }, {
                    header : '配送方式',
                    dataIndex : 'dlv_cd',
                    renderer : function(value){
                        return DLV_CD.get(value);
                    },
                    isExp : false
                }, {
                    header : '运送单号',
                    dataIndex : 'invc_id',
                    isExp : false
                }, {
                    header : '入款状态',
                    dataIndex : 'confirm_pay',
                    renderer : function(value){
                        if(value == 'Y'){
                            return '是';                        
                        }else{
                            return '否';                        
                        }                        
                    },
                    isExp : false
                }]
    });
    
    this.title = '历史订单';
    this.layout = 'fit';
    this.height = 450;
    this.defaults = {
        anchor : '100%,100%'
    };
    this.id = 'dd-history';
    
    this.items = [this.gridPanel];
}

DDhistory.load = function(cusNo){
    var store = Ext.getCmp('gridPanel_ddls').getStore();
    if(cusNo == undefined){
	    store.load({
	        params : {
	            start : 0,
	            limit : 5
	        }
	    });
    }else{
	    DDhistory.getList.getCusPara = { 
	        'cust_id' : cusNo
	    };
	    AppUtil.copy(AppUtil.interfaceBase, DDhistory.getList.getCusPara);
	   
	    store.baseParams['jsonData_'] = Ext.util.JSON.encode(DDhistory.getList.getCusPara);
        store.load({
            params : {
                start : 0,
                limit : 5
            }
        });  
    }
} 