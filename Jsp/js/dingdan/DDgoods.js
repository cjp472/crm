Ext.ns('DDgoods');

DDgoods.ulr_amount = AppUtil.proxyURL + '/getGoodQty';
DDgoods.ulr_zengpin = AppUtil.proxyURL + '/getGoodGiftList';
DDgoods.ulr_jiajiagou = AppUtil.proxyURL + '/getPricePurList';
DDgoods.saleType_main = '主品';
DDgoods.saleType_jiajia = '加价购';
DDgoods.saleType_zengpin = '赠品';
DDgoods.goods_column_alis = new Map();
DDgoods.goods_column_alis.put('ext1', '颜色');
DDgoods.goods_column_alis.put('ext2', '出库物流中心');
DDgoods.goods_column_alis.put('ext3', '产地');
DDgoods.goods_column_alis.put('ext4', '买点');
DDgoods.goods_jianmian = 0;

DDgoods.getGridPanel_goods = function(comId){
    DDgoods.goodsCount = 0;
    var hidden;
    if(comId == undefined){
        hidden = true;
    }else{
        hidden = false;
    }
    
    var grid = new HT.EditorGridPanel({
        printable : false,
        exportable : false,
        region : 'center',
        frame:true,
        height:200,
        autoScroll:true,
        rowActions : true,
        tbar:['->',{
            text : '推荐商品',
            hidden : hidden,
            handler:function(){
                DDgoods.getTuijian(comId);
            }
        },{
            text:'商品搜索',
            handler:function(){
               DDgoods.getSousuo();
            }
        },{
            text:'加价购',
            handler:function(){
               DDgoods.getJiaJiaGou();
            }
        }],
        showPaging : false,
        layout : 'fit',
        id : 'gridPanel_goods',
        fields : ['good', 'amount', 'sum', 'saleType', 'event_id'],
        columns : [{
                    header : 'id',
                    dataIndex : 'good',
                    hidden : true,
                    renderer : function(value){
                        return value.goodsId;
                    }
                }, {
                    header : 'event_id',
                    dataIndex : 'event_id',
                    hidden : true
                },{
                    header : '商品编号',
                    dataIndex : 'good',
                    isExp : false,
                    renderer : function(value) {
                        return value.numbers;
                    }
                }, {
                    header : '商品名',
                    dataIndex : 'good',
                    isExp : false,
                    renderer : function(value) {
                        return value.goodsName;
                    }
                }, {
                    header : '款式',
                    dataIndex : 'good',
                    isExp : false,
                    renderer : function(value) {
                        return GOODS_KS.get(value.style);
                    }
                }, {
                    header : '颜色',
                    dataIndex : 'good',
                    isExp : false,
                    renderer : function(value) {
                        return GOODS_COLOR.get(value.ext1);
                    }
                }, {
                    header : '类型',
                    dataIndex : 'good',
                    isExp : false,
                    renderer : function(value) {
                        return value.scProductClassify.productClassifyName;
                    }
                }, {
                    header : '价格',
                    dataIndex : 'good',
                    isExp : false,
                    renderer : function(value) {
                        return Number(value.scGoodsPrice.retailPrice).toFixed(2);
                    }
                },{
                    header : '销售类型',
                    dataIndex : 'saleType',
                    isExp : false
                }, {
                    header : '数量',
                    dataIndex : 'amount',
                    id : 'amount',
                    isExp : false
                }, {
                    header : '小计',
                    dataIndex : 'sum',
                    isExp : false,
                    renderer : function(value){
                        return Number(value).toFixed(2)    
                    }
                }, new Ext.ux.grid.RowActions({
                    header : __action,
                    width : 100,
                    actions : [{
                                iconCls : 'btn-cancel',
                                qtip : '删除',
                                style : 'margin:0 3px 0 3px'
//                                fn : function(record) {
//                                    var status = record.get('saleType');
//                                    if (status == DDgoods.saleType_main) {
//                                        return true;
//                                    } else {
//                                        return false;
//                                    }
//                                }
                            }],
                    listeners : {
                        scope : this,
                        'action' : function(grid, record, action, row, col) {
                            DDgoods.del(record);
                        }
                    }
                })],
        listeners:{
            'celldblclick' : function(grid ,rowIndex ,columnIndex ,e) {
            	alert(rowIndex);
                var value = grid.getStore().getAt(rowIndex).data.saleType;// 获取商品销售类型
                var col = grid.getColumnModel().getColumnById('amount');
              alert(value+'+'+DDgoods.saleType_main);
                if(value == DDgoods.saleType_main){
                	alert('1');
                    col.setEditor(new Ext.form.NumberField({
	                    listeners : {
	                        'change' : function(forms, news, olds) {
	                        	alert(news);
	                            DDgoods.updateAmount(news);
	                        }
	                    }
                    }));
                }else{
                    col.setEditor(new Ext.form.Label());
                }
            }
        }
    });
    return grid;
}

DDgoods.getTuijian = function(comId){
    var grid = new HT.GridPanel({
        printable : false,
        exportable : false,
        rowActions : true,
        showPaging : false,
        forceFit : true, 
        region : 'center',
        id : 'gridPanel_tuijian',
        //TODO 推荐来源的活动
        url : __ctxPath + "/supply/productBDNamlistScGoods.do?comId="+ comId,
        fields : [{
                    name : 'goodsId',
                    type : 'long'
                }, 'goodsName', 'numbers', "ext1", "ext2", "salesWay",
                "distribution", "integral", "integralType", "introduction",
                "useMeans", "goodsNote", "afterSales", "characteristics",
                'scProductClassify', 'scGoodsPrice', 'style'],
        columns : [{
                    header : "goodsId",
                    dataIndex : 'goodsId',
                    hidden : true
                }, {
                    header : '商品编号',
                    dataIndex : 'numbers',
                    isExp : false
                }, {
                    header : '商品名',
                    dataIndex : 'goodsName',
                    isExp : false
                }, {
                    header : DDgoods.goods_column_alis.get('ext1'),
                    dataIndex : 'ext1',
                    isExp : false,
                    renderer : function(value) {
                        return GOODS_COLOR.get(value);
                    }
                }, {
                    header : '款式',
                    dataIndex : 'style',
                    isExp : false,
                    renderer : function(value) {
                        return GOODS_KS.get(value);
                    }
                }, {
                    header : '类型',
                    dataIndex : 'scProductClassify',
                    isExp : false,
                    renderer : function(value) {
                        return value.productClassifyName;
                    }
                }, {
                    header : '市场价',
                    dataIndex : 'scGoodsPrice',
                    isExp : false,
                    renderer : function(value) {
                        return value.reportPrice;
                    }
                }, {
                    header : '售价',
                    dataIndex : 'scGoodsPrice',
                    isExp : false,
                    renderer : function(value) {
                        return value.retailPrice;
                    }
                }, {
                    header : DDgoods.goods_column_alis.get('ext2'),
                    dataIndex : 'ext2',
                    isExp : false
                }, {
                    header : '销售方式',
                    dataIndex : 'salesWay',
                    isExp : false,
                    renderer : function(value) {
                        return CONOB_SHFS.get(value);
                    }
                }, {
                    header : '配送方式',
                    dataIndex : 'distribution',
                    isExp : false,
                    renderer : function(value) {
                        return CONBO_PSFS.get(value);
                    }
                }, {
                    header : '积分',
                    dataIndex : 'integral',
                    isExp : false
                }, {
                    header : '积分类别',
                    dataIndex : 'integralType',
                    isExp : false,
                    renderer : function(value) {
                        return COMBO_JFLB.get(value);
                    }
                }, new Ext.ux.grid.RowActions({
                    header : __action,
                    width : 100,
                    actions : [{
//                                iconCls : 'btn-add',
//                                qtip : '购买',
//                                style : 'margin:0 3px 0 3px'
//                            }, {
                                iconCls : 'menu-book',
                                qtip : '查看',
                                style : 'margin:0 3px 0 3px'
                            }],
                    listeners : {
                        scope : this,
                        'action' : function(grid, record, action, row, col) {
                            DDgoods.action(grid, record, action, row, col);
                        }
                    }
                })]
    });  
    var win = new Ext.Window({
        width : 900,
        title : '选择推荐商品',
        buttonAlign : 'center',
        height : 400,
        layout : 'fit',
        items : [grid],
        id : 'tuijian_win',
        buttons:[{
            text:'确定',
            iconCls:'btn-save',
            handler:function(){
                DDgoods.addGoods(Ext.getCmp('gridPanel_tuijian'));
                Ext.getCmp('tuijian_win').close();
            }
        }]
    });
    win.show();
};

DDgoods.addGoods = function(grid_source){
    var grid_goods = Ext.getCmp('gridPanel_goods');
    var store_goods = grid_goods.getStore();
    var rows = grid_source.getSelectionModel().getSelections();
    if(rows.length > 1){
        Ext.ux.Toast.msg('操作信息', '只能选择一个商品!');
        return;
    }
    //加价购的处理
    if(grid_source.getId() == 'gridPanel_jiajia'){
	    for(var j = 0; j < rows.length; j++){
	        var data_good = {
                good : {
	                id : -1,
	                event_id : rows[j].data.event_id,
	                numbers : rows[j].data.good_id,
	                goodsName : rows[j].data.good_nm,
	                style : rows[j].data.style_id,
	                ext1 : rows[j].data.color_id,
	                scProductClassify : {
	                    productClassifyName : rows[j].data.class_nm
	                },
	                scGoodsPrice : {
	                    retailPrice : rows[j].data.dc_prc
	                }
	            },
	            amount : 1,
	            sum : rows[j].data.dc_prc,
	            saleType : DDgoods.saleType_jiajia
	        }    
	        var newRecord_good = new store_goods.recordType(data_good);
	        grid_goods.stopEditing();
	        store_goods.add(newRecord_good);
            DDgoods.updateFeiYong();
	        return;
	    }
    }
    if(DDgoods.goodsCount >= 1){
        Ext.ux.Toast.msg('操作信息', '只能选择一个主品!');
        return;
    }
    //主品的处理
    for(var i = 0; i < rows.length; i++){
//        AppUtil.showObj(rows[i].data);
        var data_good = {
            good : rows[i].data,
            amount : 1,
            sum : rows[i].data.scGoodsPrice.retailPrice,
            saleType : DDgoods.saleType_main,
            event_id : '-1'
        }
//        alert(rows[i].data.scGoodsPrice.retailPrice);
        var newRecord_good = new store_goods.recordType(data_good);
        grid_goods.stopEditing();
        store_goods.add(newRecord_good);
        //获取赠品
        var data = {
            'good_id' : rows[i].data.numbers,
            'site_no' : rows[i].data.ext2//rows[i].data.numbers
        };
        AppUtil.copy(AppUtil.interfaceBase, data);
        var data_str = Ext.util.JSON.encode(data);
        var data_items = {
            wsUrl : DDgoods.ulr_zengpin,
            jsonData_ : data_str
        };
        var Items = AppUtil.synchroAjax(__ctxPath + '/system/proxyRestfulWSProxy.do', 
            data_items).result;
        for(var j = 0; j < Items.length; j++){
            var data_good_sub_detail = {
                goodsId : rows[i].data.goodsId,//赠品和主品公用一个id
                numbers : Items[j].good_id,
                goodsName : Items[j].good_nm,
                style : Items[j].style_id,
                ext1 : Items[j].color_id,
                scProductClassify : {
                    productClassifyName : Items[j].class_name
                },
                scGoodsPrice : {
                    retailPrice : 0
                }
            };
            var data_good_sub = {
                good : data_good_sub_detail,
                amount : 1,
                sum : 0,
                saleType : '赠品',
                event_id : Items[j].event_id
            };
            var newRecord_good = new store_goods.recordType(data_good_sub);
            grid_goods.stopEditing();
            store_goods.add(newRecord_good);
        }
    }
    DDgoods.goodsCount = DDgoods.goodsCount + 1;
    DDgoods.updateFeiYong();
//    Ext.getCmp('tuijian_win').close();
};

DDgoods.getSousuo = function(){
    var goodType_url = __ctxPath + '/supply/listScProductClassify.do?opt=UlDep';
    var goodTypeSelector = new TreeSelector('goodTypeTreeSelector', goodType_url, '类型', 'scGoods.classifyid_form', true, '100px');
   
    var grid = new HT.GridPanel({
        printable : false,
        exportable : false,
        showPaging : true,
        rowActions : true,
        height : 140,
        id : 'gridPanel_sousuo',
        url : __ctxPath + '/supply/listScGoods.do',
        lazyLoad : true,
        fields : [{
                    name : 'goodsId',
                    type : 'long'
                }, 'goodsName', 'numbers', "ext1", "ext2", "salesWay",
                "distribution", "integral", "integralType", "introduction",
                "useMeans", "goodsNote", "afterSales", "characteristics",
                'scProductClassify', 'scGoodsPrice', 'style'],
        columns : [{
                    header : "goodsId",
                    dataIndex : 'goodsId',
                    hidden : true
                }, {
                    header : '商品编号',
                    dataIndex : 'numbers',
                    isExp : false
                }, {
                    header : '商品名',
                    dataIndex : 'goodsName',
                    isExp : false
                }, {
                    header : DDgoods.goods_column_alis.get('ext1'),
                    dataIndex : 'ext1',
                    isExp : false,
                    renderer : function(value) {
                        return GOODS_COLOR.get(value);
                    }
                },{
                    header : '款式',
                    dataIndex : 'style',
                    isExp : false,
                    renderer : function(value) {
                        return GOODS_KS.get(value);
                    }
                }, {
                    header : '类型',
                    dataIndex : 'scProductClassify',
                    isExp : false,
                    renderer : function(value) {
                        return value.productClassifyName;
                    }
                }, {
                    header : '市场价',
                    dataIndex : 'scGoodsPrice',
                    isExp : false,
                    renderer : function(value) {
                        return value.reportPrice;
                    }
                }, {
                    header : '售价',
                    dataIndex : 'scGoodsPrice',
                    isExp : false,
                    renderer : function(value) {
                        return value.retailPrice;
                    }
                }, {
                    header : DDgoods.goods_column_alis.get('ext2'),
                    dataIndex : 'ext2',
                    isExp : false
                }, {
                    header : '销售方式',
                    dataIndex : 'salesWay',
                    isExp : false,
                    renderer : function(value) {
                        return CONOB_SHFS.get(value);
                    }
                }, {
                    header : '配送方式',
                    dataIndex : 'distribution',
                    isExp : false,
                    renderer : function(value) {
                        return CONBO_PSFS.get(value);
                    }
                }, {
                    header : '积分',
                    dataIndex : 'integral',
                    isExp : false
                }, {
                    header : '积分类别',
                    dataIndex : 'integralType',
                    isExp : false,
                    renderer : function(value) {
                        return COMBO_JFLB.get(value);
                    }
                }, new Ext.ux.grid.RowActions({
                    header : __action,
                    width : 100,
                    actions : [{
//                                iconCls : 'btn-add',
//                                qtip : '购买',
//                                style : 'margin:0 3px 0 3px'
//                            }, {
                                iconCls : 'menu-book',
                                qtip : '查看',
                                style : 'margin:0 3px 0 3px'
                            }],
                    listeners : {
                        scope : this,
                        'action' : function(grid, record, action, row, col) {
                            DDgoods.action(grid, record, action, row, col);
                        }
                    }
                })]
    });
    
    var searchPanel = new Ext.FormPanel({
        layout : 'hbox',
        region : 'north',
        id : 'search',
        height : 35,
        items : [{
                    xtype : 'panel',
                    width : 70,
                    style : 'text-align:right;margin-top:-4px',
                    html : '商品名称：'
                }, {
                    name : 'Q_goodsName_S_LK',
                    xtype : 'textfield'
                }, {
                    xtype : 'panel',
                    width : 70,
                    style : 'text-align:right;margin-top:-4px',
                    html : '商品编号：'
                }, {
                    name : 'Q_numbers_S_LK',
                    xtype : 'textfield'
                }, {
                    xtype : 'panel',
                    width : 40,
                    style : 'text-align:right;margin-top:-4px',
                    html : '类型：'
                }, goodTypeSelector, {
                    xtype : 'button',
                    text : __search,
                    iconCls : 'search',
                    handler : function(){
                        $search({
				            searchPanel : Ext.getCmp('search'),
				            gridPanel : Ext.getCmp('gridPanel_sousuo')
				        });
                    }
                }, {
                    name : 'Q_scProductClassify.productClassifyId_L_EQ',
                    id : 'scGoods.classifyid_form',
                    xtype : 'hidden'
                }],
        layoutConfig : {
            padding : '5',
            align : 'middle'
        },
        defaults : {
            xtype : 'label',
            border : false,
            margins : {
                top : 0,
                right : 4,
                bottom : 4,
                left : 4
            }
        },
        border : false,
        frame : false
    });// end of searchPanel
    
    var panel = new Ext.Panel({
        xtype : 'panel',
        id : 'sousuo',
        height : 400,
        border : false,
        layout : 'border',
        items : [searchPanel, {
                    region : 'center',
                    border : false,
                    layout : 'fit',
                    items : [grid]
                }]
    });
    
    var win = new Ext.Window({
		width : 900,
		height : 400,
		title : '商品搜索',
		items : [panel],
        id : 'sousuo_win',
		buttonAlign : 'center',
		buttons: [{
		    text : '保存',
		    iconCls : 'btn-save',
		        handler : function(){
                     DDgoods.addGoods(Ext.getCmp('gridPanel_sousuo'));
                     Ext.getCmp('sousuo_win').close();
		        }
		    }]
	});
    win.show(); 
}

DDgoods.getJiaJiaGou = function(){
    var store_main = Ext.getCmp('gridPanel_goods').getStore();
    var goodsId = '';
    for(var i = 0; i < store_main.getCount(); i++){
        var one = store_main.getAt(i).data;
        if(one.saleType == DDgoods.saleType_main){
           goodsId = one.good.numbers;
           break;
        }
    }
    if(goodsId == ''){
        Ext.ux.Toast.msg('操作信息', '没有选择商品,不能选择加价购物品!');
        return;
    }
    var getJiaJiaGouData = { 
        'good_id' : goodsId
    };
    AppUtil.copy(AppUtil.interfaceBase, getJiaJiaGouData);
    var store = new Ext.data.JsonStore({
        url : __ctxPath + '/system/proxyRestfulWSProxy.do',
        root : 'result',
        totalProperty : 'count',
        baseParams : {
            start : 0,
            limit : 5,
            'wsUrl' : DDgoods.ulr_jiajiagou,
            'jsonData_' : Ext.util.JSON.encode(getJiaJiaGouData)    
        },
        remoteSort : true,
        fields : ['event_id', 'good_id', 'good_nm','color_id',
            'style_id', 'color_desc', 'style_desc',
            'dc_prc', 'lmt_qty','ord_qty', 'class_nm']
    });
    store.load();
    var grid = new HT.GridPanel({
        printable : false,
        exportable : false,
        rowActions : true,
        showPaging : true,
        forceFit : true, 
        region : 'center',
        id : 'gridPanel_jiajia',
        store : store,
        fields : ['good_id', 'good_nm', "color_desc", "style_desc",
                "dc_prc", "lmt_qty", "ord_qty", 'event_id'],
        columns : [{
                    header : '活动编号',
                    dataIndex : 'event_id',
                    isExp : false
                },{
                    header : '商品编号',
                    dataIndex : 'good_id',
                    isExp : false
                }, {
                    header : '商品名',
                    dataIndex : 'good_nm',
                    isExp : false
                }, {
                    header : '颜色',
                    dataIndex : 'color_desc',
                    isExp : false, 
                    renderer : function(value) {
                        return GOODS_COLOR.get(value);
                    }
                },{
                    header : '款式',
                    dataIndex : 'style_desc',
                    isExp : false,
                    renderer : function(value) {
                        return GOODS_KS.get(value);
                    }
                }, {
                    header : '类型',
                    dataIndex : 'class_nm',
                    isExp : false
                },{
                    header : '加价价格',
                    dataIndex : 'dc_prc',
                    isExp : false
                }, {
                    header : '限量',
                    dataIndex : 'lmt_qty',
                    isExp : false
                }, {
                    header : '已订购',
                    dataIndex : 'ord_qty',
                    isExp : false
                },new Ext.ux.grid.RowActions({
                    header : __action,
                    width : 100,
                    actions : [{
//                                iconCls : 'btn-add',
//                                qtip : '购买',
//                                style : 'margin:0 3px 0 3px'
//                            }, {
                                iconCls : 'menu-book',
                                qtip : '查看',
                                style : 'margin:0 3px 0 3px'
                            }],
                    listeners : {
                        scope : this,
                        'action' : function(grid, record, action, row, col) {
                            DDgoods.action(grid, record, action, row, col);
                        }
                    }
                })]
    });  
    var win = new Ext.Window({
        width : 900,
        title : '选择加价购商品',
        buttonAlign : 'center',
        height : 400,
        layout : 'fit',
        items : [grid],
        id : 'jiajia_win',
        buttons:[{
            text:'确定',
            iconCls:'btn-save',
            handler:function(){
                DDgoods.addGoods(Ext.getCmp('gridPanel_jiajia'));
                Ext.getCmp('jiajia_win').close();
            }
        }]
    });
    win.show();
};

DDgoods.updateAmount = function(news){
    var store = Ext.getCmp('gridPanel_goods').getStore();
    var result = new Number(0);
    for(var i = 0; i < store.getCount(); i++){
        var oneRaw = store.getAt(i).data;
        if(oneRaw.saleType == DDgoods.saleType_zengpin){
            store.getAt(i).set('amount', news);    
        }
        
        var onePrice = Number(oneRaw.good.scGoodsPrice.retailPrice);
        var oneAmount = 1;//加价购数量只能为1
        if(oneRaw.saleType == DDgoods.saleType_main){
            oneAmount = Number(news);//主品数量为新修改的值
            store.getAt(i).set('sum', (oneAmount * onePrice).toFixed(2));  
        }
        
        result += oneAmount * onePrice;
       // alert( store.getAt(i).dirty);
        store.getAt(i).dirty = false;
      //  alert( store.getAt(i).dirty);
        store.getAt(i).commit();
    }
    DDgoods.updateFeiYong(result);
}
/**
 * 更新费用
 * @param {} result 商品金额,如果为undefined,则根据gird计算得到值
 */
DDgoods.updateFeiYong = function(result){
    var store = Ext.getCmp('gridPanel_goods').getStore();

    if(result == undefined){
        result = Number(0);
	    for(var i = 0; i < store.getCount(); i++){
	        var oneRaw = store.getAt(i).data;
	        var oneAmount = Number(oneRaw.amount);
	        var onePrice = Number(oneRaw.good.scGoodsPrice.retailPrice);
	        result += oneAmount * onePrice;
	    }
    }
    
    var goodJine = Number(Ext.getCmp('allGoodsSum').getValue());
    var yunfeiJine = Number(Ext.getCmp('yunFei').getValue());
    var allJine = Number(Ext.getCmp('allSum').getValue());
    var zhifuJine = Number(Ext.getCmp('zhifujine').getValue());
    
    Ext.getCmp('allGoodsSum').setValue(Number(result).toFixed(2));
    Ext.getCmp('allSum').setValue(Number(result + yunfeiJine).toFixed(2));
    //TODO 支付费用要减去优惠信息
    Ext.getCmp('zhifujine').setValue(Number(result + yunfeiJine).toFixed(2));
}

DDgoods.showPicDetail = function(src) {
//    alert(src);
    document.getElementById('showPic').src = AppUtil.ulr_showPic + src;
}

DDgoods.getAmount = function(goodId, number, ext1, style){
    if(DDgoods.goods_amount.get(goodId) == undefined){
	    var data_getAmount = {
	        'cust_id' : '1',
	        'dlv_addr_seq' : '1',
	        'goods' : [{
	            good_id : number,
	            color_id : ext1,
	            style_id : style
	        }]
	    };
        AppUtil.copy(AppUtil.interfaceBase, data_getAmount);
	    var getAmount = {
	        wsUrl : DDgoods.ulr_amount,
	        jsonData_ : Ext.util.JSON.encode(data_getAmount)
	    };
	    var goods = AppUtil.synchroAjax(__ctxPath + '/system/proxyRestfulWSProxy.do', 
	        getAmount).result;
	    DDgoods.goods_amount.put(goodId, goods[0].good_qty);
        return goods[0].good_qty;
    }else{
        return DDgoods.goods_amount.get(goodId); 
    }
}

DDgoods.action = function(grid, record, action, row, col) {
    switch (action) {
//        case 'btn-add' :
//        if(DDgoods.getAmount(record.data.goodsId, record.data.numbers, 
//            record.data.ext1, record.data.style) <= 0){
//            Ext.ux.Toast.msg('操作信息', '商品没有库存!');
//            return;
//        }
//        DDgoods.add(record.data.goodsId);
//        DDgood.goods_amount.put(record.data.goodsId, DDgood.goods_amount.get(record.data.goodsId) - 1);
//        break;
        case 'menu-book' :
        DDgoods.showDetail(record.data.goodsId);
        break;
    }
}

DDgoods.showDetail = function(id){
    var data_de = "";
    Ext.Ajax.request({
        url : __ctxPath + '/supply/getAllScGoods.do',
        params : {
            goodId : id
        },
        method : 'post',
        success : function(response){
            var result = Ext.util.JSON.decode(response.responseText);
            data_de = result.data;     
            var data_sub = data_de.sub;
            var sub_show = DDgoods.getSubShow();
            var pics =  data_de.parent.fileAttachs;
            var pics_show_html = "";
            for(var t = 0; t < pics.length; t++){
                pics_show_html += ('<img src="' + AppUtil.ulr_showPic + pics[t].filePath + '" ' +
                    'style="height:100px;border:2px solid #ccc" ' +
                    'onclick=DDgoods.showPicDetail(\''+ pics[t].filePath + '\') />');
            }
            if(pics.length != 0){
            pics_show_html = '<div style="text-align:center;overflow:auto">' +
                                    '<img id="showPic" src="' + AppUtil.ulr_showPic +pics[0].filePath+'" ' +
                                            'style="height:400px;border:2px solid #ccc"/>' +
                                '</div>' +
                                '<div style="margin-top:10px">' + pics_show_html +
                                '</div>';
            }else{
                pics_show_html = '暂无图片';
            }
            if(data_sub != null){
                for(var i = 0; i < data_sub.length; i++ ){
                   sub_show += (data_sub[i].introduction+'\r\n');
                }
            }
            
            var faq_grid = new HT.GridPanel({
               region : 'center',
               rowActions : true,
               id : 'faq_grid',
               url : __ctxPath + "/supply/getFAQScGoods.do?id="+data_de.parent.goodsId,
               fields : [{
                           name : 'knowId',
                           type : 'long'
                       }, 'sysKnowComment','tiTle','ukKnowKeywords','knowKeyWords'],
               columns : [{
                            header : 'id',
                            dataIndex : 'knowId',
                            hidden : true
                        },{
                           header : '标题',
                           dataIndex : 'tiTle',
                           sortable : true
                        }, {
                           header : '摘要',
                           dataIndex : 'sysKnowComment'
                        },{
                           header : '关键字',
                           dataIndex : 'knowKeyWords'
//                           ,
//                           renderer : function(value){
//                                var rs = "";
//                                for(var i = 0; i < value.length; i++){
//                                    rs += (value[i].keyWord+",");
//                                }
//                                return rs.substring(0, rs.length-1);
//                           }
                        }, new Ext.ux.grid.RowActions({
                                    header : '管理',
                                    width : 100,
                                    actions : [{
                                                iconCls : 'btn-setting',
                                                qtip : '查看',
                                                style : 'margin:0 3px 0 3px'
                                            }],
                                    listeners : {
                                        scope : this,
                                        'action' : function(grid, record, action, row, col){
//                                            alert(record.data.knowId);
                                            new UkSysKnowShow_win({
                                                knowId : record.data.knowId
                                            }).show();
                                        }
                                    }
                                })]
            });

            var tabDetail = new Ext.TabPanel({
                activeTab : 0,// 激活第一个panel
                plain : true,
                region : 'center',
                defaultType : 'panel',
                bodyStyle : 'padding:5px;',
                items : [{
                    title : '商品概览',
                    layout : 'form',
                    labelAlign : 'right',
                    items : [{
                                layout : 'column',
                                border : false,
                                items : [{
                                            columnWidth : .66,
                                            border : false,
                                            layout : 'form',
                                            items : [{
                                                        xtype : 'displayfield',
                                                        fieldLabel : '商品名称',
                                                        value : data_de.parent.goodsName
                                                    }]
                                        }, {
                                            columnWidth : .34,
                                            border : false,
                                            layout : 'form',
                                            items : [{
                                                        xtype : 'displayfield',
                                                        fieldLabel : '编号',
                                                        value : data_de.parent.numbers
                                                    }]
                                        }]
                            }, {
                                layout : 'column',
                                border : false,
                                items : [{
                                            columnWidth : .33,
                                            border : false,
                                            layout : 'form',
                                            items : [{
                                                        xtype : 'displayfield',
                                                        fieldLabel : '市场价',
                                                        value : data_de.parent.scGoodsPrice.reportPrice
                                                    }]
                                        }, {
                                            columnWidth : .33,
                                            border : false,
                                            layout : 'form',
                                            items : [{
                                                        xtype : 'displayfield',
                                                        fieldLabel : '销售价',
                                                        value : data_de.parent.scGoodsPrice.retailPrice
                                                    }]
                                        }, {
                                            columnWidth : .34,
                                            border : false,
                                            layout : 'form',
                                            items : [{
                                                        xtype : 'displayfield',
                                                        fieldLabel : '产地',
                                                        value : data_de.parent.ext3
        
                                                    }]
                                        }]
                            }, {
                                xtype : 'textarea',
                                fieldLabel : '简介',
                                height : 210,
                                anchor : '100%',
                                value : data_de.parent.introduction
                            }, {
                                xtype : 'textarea',
                                height : 210,
                                anchor : '100%',
                                fieldLabel : '卖点',
                                value : data_de.parent.ext4
                            }]
                }, {
                    title : '包括产品',
                    layout : 'form',
                    items : [{
                        xtype : 'textarea',
                        height : 500,
                        hideLabel : true,
                        anchor : '100%',
                        value : '1.主品：'+data_de.parent.goodsName + '\r\n2.赠品：'+sub_show
                    }]
                }, {
                    title : '特点',
                    layout : 'form',
                    items : [{
                        xtype : 'textarea',
                        height : 500,
                        hideLabel : true,
                        anchor : '100%',
                        value : data_de.parent.characteristics
                    }]
                }, {
                    title : '使用方式',
                    layout : 'form',
                    items : [{
                        xtype : 'textarea',
                        height : 500,
                        hideLabel : true,
                        anchor : '100%',
                        value : data_de.parent.useMeans
                    }]
                }, {
                    title : '注意事项',
                    layout : 'form',
                    items : [{
                                xtype : 'textarea',
                                height : 500,
                                hideLabel : true,
                                anchor : '100%',
                                value : data_de.parent.goodsNote
                            }]
                }, {
                    title : '开箱验货及售后标准',
                    layout : 'form',
                    items : [{
                                xtype : 'textarea',
                                height : 500,
                                hideLabel : true,
                                anchor : '100%',
                                value : data_de.parent.afterSales
                            }]
                }, {
                    title : '图片',
                    items : [{
                        xtype : 'panel',
                        border : false,
                        height : 500,
                        anchor : '100%',
                        html : pics_show_html
                    }]
                }, {
                    title : 'FAQ',
                    layout : 'fit',
                    items : [faq_grid]
                }]
            });
            var win = new Ext.Window({
                        width : 800,
                        title : '商品详细',
                        height : 600,
                        id : 'formpanelDel',
                        autoScroll : true,
                        layout : 'border',
                        items : [tabDetail],
                        buttonAlign : 'center',
                        buttons : [{
                                    text : '关闭',
                                    iconCls : 'btn-delete',
                                    handler : function() {
                                        Ext.getCmp('formpanelDel').close();
                                    }
                                }]
                    });
            win.show();
                  }
            });
};

DDgoods.del = function(record){
    var allGoods = Ext.getCmp('gridPanel_goods');
    if(record.data.saleType == DDgoods.saleType_main){
        allGoods.getStore().removeAll();
        DDgoods.goodsCount = 0;
    }
    if(record.data.saleType == DDgoods.saleType_jiajia){
        allGoods.getStore().remove(record);
    }
    DDgoods.updateFeiYong();
}

DDgoods.getSubShow = function(goodsId, siteNo){
    //获取赠品
    var rs ="";
    var data = {
        'good_id' : goodsId,
        'site_no' : siteNo//rows[i].data.numbers
    };
    AppUtil.copy(AppUtil.interfaceBase, data);
    var data_str = Ext.util.JSON.encode(data);
    var data_items = {
        wsUrl : DDgoods.ulr_zengpin,
        jsonData_ : data_str
    };
    var Items = AppUtil.synchroAjax(__ctxPath + '/system/proxyRestfulWSProxy.do', 
            data_items).result;
    if(Items.length == 0){
        return "无赠品.";
    }
    for(var j = 0; j < Items.length; j++){
        rs +=   Items[j].good_nm + '<br>';
    }
}