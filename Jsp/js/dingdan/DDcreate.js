DDcreate.addAddressUrl = AppUtil.proxyURL + '/addCustAddr';
DDcreate.getDaiJinQuanUrl = AppUtil.proxyURL + '/getCoupus';
DDcreate.huodongUrl = AppUtil.proxyURL + '/getAreaActivityList';
DDcreate.dingdanUrl = AppUtil.proxyURL + '/addOrder';
DDcreate.ulr_yunfei = AppUtil.proxyURL + '/getTotalFreight';

/**
 * TODO 入口
 */
function DDcreate(cus) {
	if (cus == undefined || cus == null) {
        Ext.ux.Toast.msg('操作信息', '订单需要客户信息!');
        return;
    }
        
	var lijin_all = cus.liJins;
    var lijin_all_filter = [];
    if(lijin_all != null){
	    for(var t = 0; t < lijin_all.length; t++){
	        if(lijin_all[t].overdue == 'N'){
		        lijin_all_filter.push([ lijin_all[t].event_nm + '-' + lijin_all[t].lj_amt + '元', {
	                id : lijin_all[t].lj_seq,
	                value : lijin_all[t].lj_amt
	                }
	            ]);
	        }
	    }
    }
    
	var HuoDongs = [['无可参加活动', {
        id : '0',
        value : '-1'
    }]];
	var ddxxDel = new Ext.FormPanel({
		//layout : 'border',
		border : false,
		//height : 350,
		id : 'ddxx_fp',
		style:'padding:20px 10px',
		buttonAlign : 'center',
		items : [{
			//region : 'center',
			layout : 'form',
			border:false,
			labelWidth : 70,
			labelAlign : 'right',
			items : [{
				layout : 'column',
				border : false,
				items : [{
							columnWidth : .9,
							border : false,
							layout : 'form',
							labelWidth : 70,
							items : [{
										xtype : 'textarea',
										fieldLabel : '地址',
										id : 'address_now',
										height : 40,
										anchor : '100%',
										autoScroll : true
									}, {
										id : 'address_now_id',
										xtype : 'hidden'
									},{
                                        id : 'address_now_seq',
                                        xtype : 'hidden'
                                    }]
						}, {
							columnWidth : .1,
							border : false,
							items : [{
										xtype : 'button',
										text : '',
										iconCls : 'btn-add',
										handler : function() {
											DDcreate.getAddressWin(cus);
										}
									}]

						}]
			}, {
				xtype : 'combo',
				fieldLabel : '参与活动',
				anchor : '90%',
				store : new Ext.data.ArrayStore({
                            fields : [{
                                        name : 'desc'
                                    }, {
                                        name : 'value'
                                    }]
                        }),
				triggerAction : 'all',// 不然就只能选择一个
				displayField : 'desc',
				valueField : 'value',
				mode : 'local',
				id : 'useHuoDong',
				editable : false
			}, {
				xtype : 'fieldset',
				title : '支付信息',
				collapsible : true,
				collapsed : false,
				items : [{
					layout : 'column',
					border : false,
					items : [{
								columnWidth : .333,
								border : false,
								labelWidth : 70,
								labelAlign : 'right',
								layout : 'form',
								items : [{
											xtype : 'textfield',
											fieldLabel : '商品金额',
											id : 'allGoodsSum',
											anchor : '100%',
											readOnly : true,
											value : Number(0).toFixed(2)
										}, {
											xtype : 'textfield',
											fieldLabel : '可用积分',
											anchor : '100%',
											id : 'canUseJiFen',
											readOnly : true,
											value : Number(cus.poss_accm_amt).toFixed(2)
										}, {
											xtype : 'numberfield',
											fieldLabel : '使用积分',
											anchor : '100%',
//											allowDecimals:false,
//											allowNegative: false,
											regex : /^[0-9]*[1-9][0-9]*$/,   											
											id : 'useJiFen'
										}, {
											xtype : 'combo',
											fieldLabel : '使用礼金',
											anchor : '100%',
											store : new Ext.data.ArrayStore({
					                            fields : [{
					                                        name : 'name'
					                                    }, {
					                                        name : 'value'
					                                    }]
					                        }),
											mode : 'local',
											id : 'useLiJIn',
                                            displayField : 'name',
                                            valueField : 'value'
										}]
							}, {
								columnWidth : .333,
								border : false,
								labelWidth : 70,
								layout : 'form',
								labelAlign : 'right',
								items : [{
									xtype : 'textfield',
									fieldLabel : '运费',
									anchor : '100%',
									id : 'yunFei',
                                    readOnly : true,
                                    value : Number(0).toFixed(2)
								}, {
									xtype : 'textfield',
									fieldLabel : '暂存款',
									anchor : '100%',
									readOnly : true,
									id : 'zanCunKuan',
									value : Number(cus.poss_crdt_amt).toFixed(2)
								}, {
									layout : 'column',
									border : false,
									items : [{
												columnWidth : .8,
												border : false,
												labelWidth : 70,
												layout : 'form',
												items : [{
															xtype : 'numberfield',
															fieldLabel : '使用暂存款',
															anchor : '100%',
															id : 'useZanCunKuan',
															readOnly : true
														}]
											}, {
												columnWidth : .1,
												xtype : 'button',
												iconCls : 'menu-url',
												handler : function() {
													DDcreate.zancunkuanWin.show()
												}
											}]
								}, {
                                    
                                    layout : 'column',
                                    border : false,
                                    items : [{
                                                columnWidth : .8,
                                                border : false,
                                                labelWidth : 70,
                                                layout : 'form',
                                                items : [{
                                                            xtype : 'textfield',
                                                            fieldLabel : '使用代金券',
                                                            anchor : '100%',
                                                            id : 'useDaiJinQuan',
                                                            //value:'点击按钮获取代金券金额',
                                                            readOnly : true
                                                        }]
                                            }, {
                                                columnWidth : .1,
                                                xtype : 'button',
                                                text : '获取代金券金额',
                                                //iconCls : 'menu-url',
                                                handler : function() {
                                                    DDcreate.daiJinQuanWinShow();
                                                }
                                            }, {
		                                        id : 'daijinquan_hid',
		                                        xtype : 'hidden',
                                                value : {
                                                    id : '0',
                                                    value : '-1' 
                                                }
                                            }]
                                }]
							}, {
								columnWidth : .333,
								border : false,
								layout : 'form',
								labelWidth : 70,
								labelAlign : 'right',
								items : [{
											xtype : 'textfield',
											fieldLabel : '消费总额',
											anchor : '100%',
											readOnly : true,
											value : 0,
											id : 'allSum',
                                            value : Number(0).toFixed(2)
										}, {
											xtype : 'textfield',
											fieldLabel : '储值金',
											anchor : '100%',
											readOnly : true,
											id : 'chuZhiJin',
											value : Number(cus.poss_ppc_amt).toFixed(2)
										}, {
											layout : 'column',
											border : false,
											items : [{
												columnWidth : .8,
												border : false,
												labelWidth : 70,
												layout : 'form',
												items : [{
															xtype : 'numberfield',
															fieldLabel : '使用储值金',
															anchor : '100%',
															id : 'useChuZhiJin',
															readOnly : true
														}]
											}, {
												columnWidth : .1,
												xtype : 'button',
												iconCls : 'menu-url',
												handler : function() {
													DDcreate.chuzhijinWin.show()
												}
											}]
										}]
							}]
				}, {
					layout : 'column',
					border : false,
					items : [{
								columnWidth : .66,
								border : false,
								layout : 'form',
								items : [{
											xtype : 'radiogroup',
											anchor : '100%',
                                            id : 'zhifuFangshi',
											fieldLabel : '支付方式',
											items : [{
														boxLabel : 'COD',
														name : 'rb-auto',
														inputValue : 30,
														checked : true
													}, {
														boxLabel : '预付款',
														inputValue : 10,
														name : 'rb-auto'
													}, {
														boxLabel : '在线支付',
														inputValue : 3,
														name : 'rb-auto'
													}]
										}]
							}, {
								columnWidth : .33,
								border : false,
								labelWidth : 70,
								layout : 'form',
								items : [{
											xtype : 'textfield',
											fieldLabel : '支付金额',
											readOnly : true,
                                            //hidden : true,
											anchor : '100%',
											id : 'zhifujine',
                                            value : Number(0).toFixed(2)
										}]
							}]
				}]
			}, {
				xtype : 'textarea',
				fieldLabel : '备注',
				labelWidth : 40,
				id : 'scBizOrderSales.salesDesc',
				height : 40,
				anchor : '96%'
			}, {
				xtype : 'hidden',
				name : 'preHandler',
				value : 'scBizOrderSalesService.saveHeadId'
			}, {
				xtype : 'hidden',
				name : 'afterHandler',
				value : 'scBizOrderSalesService.saveRunId'
			}, {
				xtype : 'hidden',
				name : 'flowType',
				value : 'ScBizOrderSalesFlowView'
			}, {
				xtype : 'hidden',
				name : 'defId',
				id : 'YXtaskdefId',
				value : '10240'
			}, {
				xtype : 'hidden',
				id : 'YXtaskDestName',
				name : 'destName'
			}, {
				xtype : 'hidden',
				name : 'startFlow',
				value : true
			}, {
				xtype : 'hidden',
				id : 'YXtaskAssignId',
				name : 'flowAssignId'
			}, {
				xtype : 'hidden',
				name : 'useTemplate',
				value : true
			}]
		}
//		, {
//			region : 'east',
//			width : 200,
//			height : 300,
//			border : false,
//			items : [this.rel_know_grid]
//		}
		]
	});
    var huodong_com = Ext.getCmp('useHuoDong');
    huodong_com.store.loadData(HuoDongs);
    var LiJin_com = Ext.getCmp('useLiJIn');
    if(lijin_all_filter.length == 0){
        var data_zero = [['无可用礼金',{
                id : '0',
                value : '-1'
                }]];
        LiJin_com.store.loadData(data_zero);
    }else{
        LiJin_com.store.loadData(lijin_all_filter);
    }
	return ddxxDel;
}

// TODO zhanh function
DDcreate.addAddr = function(cus) {
    if(! DDcreate.validateAddr()){
        return;
    }
	Ext.getCmp('gridPanel_address').getStore().reload();
	var defaulr_addr = 'N';
	if((Ext.getCmp('DD_default_address').getValue() == true))
	    defaulr_addr = 'Y';
	var addr1 = Ext.getCmp('addressSheng_combo').getRawValue() + 
	    Ext.getCmp('addressShi_combo').getRawValue() + 
        Ext.getCmp('addressQu_combo').getRawValue();    
	var addr2 = Ext.getCmp('addressJiedao_combo').getRawValue();
//    alert(Ext.getCmp('cusDelivery.zip_no_seq').getValue());
	var data_post = {
		ma_addr_yn : defaulr_addr,
		rcver_nm : Ext.getCmp('deliveryName').getValue(),
		addr_2 : addr2,
		addr_1 : addr1,
        lrgn_cd : Ext.getCmp('addressSheng_combo').getValue().areaNo,
        mrgn_cd : Ext.getCmp('addressShi_combo').getValue().areaNo,
        srgn_cd : Ext.getCmp('addressQu_combo').getValue().areaNo,
		zip_no : Ext.getCmp('deliveryPost').getValue(),
		hp_teln : Ext.getCmp('hp_teln').getValue(),
		hp_telh : Ext.getCmp('hp_telh').getValue(),
		hp_teld : Ext.getCmp('hp_teld').getValue(),
	    teld :  Ext.getCmp('teld').getValue(),
	    telh :  Ext.getCmp('telh').getValue(),
	    teln :  Ext.getCmp('teln').getValue(),
	    teli :  Ext.getCmp('teli').getValue(),
	    zip_no_seq : Ext.getCmp('addressJiedao_combo').getValue().areaNo,
	    cust_id : cus.customerNo
	};
	AppUtil.copy(AppUtil.interfaceBase, data_post);
	var data_items__ = {
	    wsUrl : DDcreate.addAddressUrl,
	    jsonData_ : Ext.util.JSON.encode(data_post)
	};
	var Items = AppUtil.synchroAjax(__ctxPath + '/system/proxyRestfulWSProxy.do', 
	    data_items__).result;
    if(Items == null){
        Ext.ux.Toast.msg('操作信息', '新增地址信息失败!请填写必填项!');
        return;
    }
    var phone = Ext.getCmp('hp_teld').getValue() + 
        Ext.getCmp('hp_telh').getValue() + 
        Ext.getCmp('hp_teln').getValue();
    var tel = Ext.getCmp('teld').getValue()
        + Ext.getCmp('telh').getValue()
        + Ext.getCmp('teln').getValue()
        + Ext.getCmp('teli').getValue();
    Ext.Ajax.request({
        url : __ctxPath + '/customer/saveCusDelivery.do',
        params : {
            'cusDelivery.deliveryAddress' : Ext.getCmp('deliveryAddress').getValue(),
            'cusDelivery.deliveryName' : Ext.getCmp('deliveryName').getValue(),
            'cusDelivery.deliveryPhone' : phone,
            'cusDelivery.deliveryPost' : Ext.getCmp('deliveryPost').getValue(),
            'cusDelivery.regionSheng.regionId' : Ext.getCmp('addressSheng_combo').getValue().id,
            'cusDelivery.regionShi.regionId' : Ext.getCmp('addressShi_combo').getValue().id,
            'cusDelivery.regionQu.regionId' : Ext.getCmp('addressQu_combo').getValue().id,
            'cusDelivery.regionJiedao.regionId' : Ext.getCmp('addressJiedao_combo').getValue().id,
            'cusDelivery.customer.customerId' : cus.customerId,
            'cusDelivery.addrSeq' : Items[0].dlv_addr_seq,
            'cusDelivery.tel' : tel
        },
        method : 'post',
        success : function(response) {
           Ext.ux.Toast.msg('操作信息', '保存成功!');
           Ext.getCmp('gridPanel_address').getStore().reload();
        }
    });
};

DDcreate.validateAddr = function(){
    var name = Ext.getCmp('deliveryName').getValue();
    if(name == ''){
        Ext.ux.Toast.msg('操作信息', '收货人不能为空!');
        return false;
    }
    
    var hp_teln = Ext.getCmp('hp_teln').getValue();
    var hp_telh = Ext.getCmp('hp_telh').getValue();
    var hp_teld = Ext.getCmp('hp_teld').getValue();
    var has_phone = null;
    if(hp_teln == '' && hp_telh == '' && hp_teld == ''){
        has_phone = false;
    }
    if(hp_teln != '' && hp_telh != '' && hp_teld != ''){
        has_phone = true;
    }
    if(has_phone == null){
        Ext.ux.Toast.msg('操作信息', '手机信息填写不完整!');
        return false;
    }
    
    var teld = Ext.getCmp('teld').getValue();
    var telh = Ext.getCmp('telh').getValue();
    var teln = Ext.getCmp('teln').getValue();
    var has_tel = null;
    if(teld == '' && telh == '' && teln == ''){
        has_tel = false;
    }
    if(teld != '' && telh != '' && teln != ''){
        has_tel = true;
    }
    if(has_tel == null){
        Ext.ux.Toast.msg('操作信息', '电话信息填写不完整!');
        return false;
    }
    if(has_phone == false && has_tel == false){
        Ext.ux.Toast.msg('操作信息', '手机,电话必须填写一个!');
        return false;
    }
    return true;
}

//TODO 结算
DDcreate.jieSuan = function(cus) {
    var re=/^[0-9]*[1-9][0-9]*$/;
	if(!re.test(Ext.getCmp('useJiFen').getValue())&&Ext.getCmp('useJiFen').getValue()!='0'&&Ext.getCmp('useJiFen').getValue()!=null&&Ext.getCmp('useJiFen').getValue()!='') {
	    Ext.ux.Toast.msg('操作信息', '使用积分应该为正整数！');	
        return;
	    }		
	// 商品信息封装
	var parentGrid = Ext.getCmp("gridPanel_goods");
	var parentStore = parentGrid.getStore();
	var goods_main = new Array();
    var goods_other = new Array();
	for (var i = 0; i < parentStore.getCount(); i++) {
		var tmp_data = parentStore.getAt(i).data;
		if(tmp_data.saleType == '主品'){
            var good_data_main = {
	            good_id : tmp_data.good.numbers,
	            good_cnt : tmp_data.amount,
	            good_prc : tmp_data.good.scGoodsPrice.retailPrice,
	            color_id : tmp_data.good.ext1,
	            style_id : tmp_data.good.style,
	            dely_fee : 0
            };
            goods_main.push(good_data_main);
        }else{
            var good_data_other = {
	            good_id : tmp_data.good.numbers,
	            good_cnt : tmp_data.amount,
	            good_prc : tmp_data.good.scGoodsPrice.retailPrice,
	            event_id : tmp_data.event_id
            };
            goods_other.push(good_data_other);
        }
	}
	// 支付信息
	var JiFen = Number(Ext.getCmp('useJiFen').getValue());
	var ZanCunKuan = Number(Ext.getCmp('useZanCunKuan').getValue());
	var ChuZhiJin = Number(Ext.getCmp('useChuZhiJin').getValue());
	// var jifen = Number(Ext.getCmp('useJiFen').getValue());
	// var jifen = Number(Ext.getCmp('useJiFen').getValue());
	// alert(DDcreate.jieSuanValidate());
    var seq = Ext.getCmp('address_now_seq').getValue();
	if (!DDcreate.jieSuanValidate(seq, cus)) {
		return;
	}
    var v;
    Ext.getCmp('zhifuFangshi').items.each(function(item) {   
        if ( item.getValue() ) {   
           v = item.getRawValue();   
        }   
    });   
//    alert(v);
    
    var data_dingdan = {
        cust_id : cus.customerNo,
        good_info : goods_main,
        gift_good_info : goods_other,
        coupon_type : DDcreate.youhuiType,
        coupon_id : DDcreate.youhuiId,
        use_coupon_amt : DDcreate.youhuiAmount,
        dlv_addr_seq : Ext.getCmp('address_now_seq').getValue(),
        dlv_amt : Ext.getCmp('yunFei').getValue(),
        use_crdt_amt : Ext.getCmp('useZanCunKuan').getValue(),
        use_accm_amt : Ext.getCmp('useJiFen').getValue(),
        use_ppc_amt : Ext.getCmp('useChuZhiJin').getValue(),
        ord_lvl_cd : '10',
        event_id : Ext.getCmp('useHuoDong').getValue().id,
        pre_aft_pay_cd : v,
        send_bank_cd : 'CD1',
        exterior_accm : '0'
    };
    var data_dingdan__ = {
        wsUrl : DDcreate.dingdanUrl,
        jsonData_ : Ext.util.JSON.encode(data_dingdan)
    };
    var result = AppUtil.synchroAjax(__ctxPath + '/system/proxyRestfulWSProxy.do', 
        data_dingdan__).result;
    if(result != null){
        Ext.ux.Toast.msg('操作信息', '保存成功');
    }else{
        Ext.ux.Toast.msg('操作信息', '保存失败');
    }
    var tabs = Ext.getCmp('centerTabPanel');
    tabs.remove('YXtaskproDingDanFormWin');
//	var defId = Ext.getCmp('YXtaskdefId').getValue();
//	// 加载开始节点后的分支
//	Ext.Ajax.request({
//		url : __ctxPath + '/flow/startTransProcessActivity.do',
//		params : {
//			defId : defId
//		},
//		scope : this,
//		success : function(resp, options) {
//			var object = Ext.decode(resp.responseText);
//			var destName = object.data[0].destination;
//			Ext.getCmp('YXtaskDestName').setValue(destName);
//
//			if (destName != null && destName != '') {
//				Ext.Ajax.request({
//					url : __ctxPath + '/flow/usersProcessActivity.do',
//					scope : this,
//					params : {
//						defId : defId,
//						activityName : destName
//					},
//					success : function(response, options) {
//						var result = Ext.decode(response.responseText);
//						var flowAssignId = '';
//						var destTasks = Ext.getCmp('YXtaskDestName').getValue();
//
//						if (destTasks != '') {
//							flowAssignId = destTasks + '|' + result.userIds;
//						}
//						Ext.getCmp('YXtaskAssignId').setValue(flowAssignId);
//
//						$postForm({
//							formPanel : Ext.getCmp('ddxx_fp'),
//							url : __ctxPath + '/flow/saveProcessActivity.do',
//							params : {
//								'scBizOrderSales.cusDelivery.customer.customerId' : cusId,
//								goods : Ext.encode(goods),
//								'scBizOrderSales.totalInAmount' : Ext
//										.getCmp('allSum').getValue(),
//								'scBizOrderSales.ext12' : Ext
//										.getCmp('allGoodsSum').getValue()
//							},
//							callback : function(fp, action) {
//							}
//						});
//					}
//				});
//			}
//		}
//	});

};

DDcreate.getAddressWin = function(cus){
    var store = Ext.getCmp('gridPanel_goods').getStore();
    if(store.getCount() == 0){
        Ext.ux.Toast.msg('操作信息', '请选择商品后选择送货地址！');
        return;
    }
    var gridPanel_address = new HT.GridPanel({
                printable : false,
                exportable : false,
                region : 'center',
                layout : 'fit',
                id : 'gridPanel_address',
                url : __ctxPath + "/customer/listOneCusDelivery.do?cusId="
                        + cus.customerId,
                fields : [{
                            name : 'deliveryId',
                            type : 'long'
                        }, 'deliveryAddress', 'deliveryPost', 'deliveryName',
                        'deliveryPhone', 'regionSheng', 'regionJiedao',
                        'regionShi', 'regionQu', 'tel', 'addrSeq'],
                columns : [{
                            header : '序号',
                            dataIndex : 'addrSeq',
                            hidden : true
                        },{
                            header : '省',
                            dataIndex : 'regionSheng',
                            isExp : false,
                            renderer : function(value) {
                                return value.regionName;
                            }
                        }, {
                            header : '市/区',
                            dataIndex : 'regionShi',
                            isExp : false,
                            renderer : function(value) {
                                return value.regionName;
                            }
                        }, {
                            header : '县',
                            dataIndex : 'regionQu',
                            isExp : false,
                            renderer : function(value) {
                                return value.regionName;
                            }
                        }, {
                            header : '街道',
                            dataIndex : 'regionJiedao',
                            isExp : false,
                            renderer : function(value) {
                                if(value == null){
                                    return "";
                                }else{
                                return value.regionName;}
                            }
                        }, {
                            header : '详细信息',
                            dataIndex : 'deliveryAddress',
                            isExp : false
                        }, {
                            header : '邮编',
                            dataIndex : 'deliveryPost',
                            isExp : false
                        }, {
                            header : '收货人',
                            dataIndex : 'deliveryName',
                            isExp : false
                        }, {
                            header : '手机号码',
                            dataIndex : 'deliveryPhone',
                            isExp : false
                        },{
                            header : '联系电话',
                            dataIndex : 'tel',
                            isExp : false
                        }]
            });
            
    gridPanel_address.addListener('rowdblclick', function(grid, rowindex, e) {
        grid.getSelectionModel().each(function(record) {
            var show = record.data.regionSheng.regionName
                    + record.data.regionShi.regionName
                    + record.data.regionQu.regionName + '   邮编'
                    + record.data.deliveryPost;
            Ext.getCmp('address_now').setValue(show);
            Ext.getCmp('address_now_id').setValue(record.data.deliveryId);
            Ext.getCmp('address_now_seq').setValue(record.data.addrSeq);
            Ext.getCmp('address_win').close();
            
            //TODO 库存  运费
            var yunfei = DDcreate.getYunFei(record.data.addrSeq, cus);
            Ext.getCmp('yunFei').setValue(yunfei);
            DDgoods.updateFeiYong();
            DDcreate.getKuCun(record.data.addrSeq, cus);
            
//            alert(record.data.addr_seq);
            var data_gethuodong = {
                'cust_id' : cus.customerNo,
                'dlv_addr_seq' : record.data.addrSeq
            };
            AppUtil.copy(AppUtil.interfaceBase, data_gethuodong);
            var getHuoDong = {
                wsUrl : DDcreate.huodongUrl,
                jsonData_ : Ext.util.JSON.encode(data_gethuodong)
            };
            var HuoDongs = AppUtil.synchroAjax(__ctxPath
                 + '/system/proxyRestfulWSProxy.do', getHuoDong).result;
            // alert(HuoDongs.length);
            if(HuoDongs == null){
                return;
            }
            var huodong_com = Ext.getCmp('useHuoDong');
            var data = [];
            huodong_com.clearValue();
            for (var i = 0; i < HuoDongs.length; i++) {
                data.push([i, HuoDongs[i].act_desc, HuoDongs[i].dis_amt]);
            }
            huodong_com.store.loadData(data);
          })
    });

    var addressWin = new Ext.Window({
        width : 650,
        height : 450,
        layout : 'border',
        id : 'address_win',
        closeAction : 'close',
        items : [gridPanel_address, new Ext.form.FormPanel({
                    region : 'south',
                    id : 'address_formPanel',
                    height : 200,
                    layout : 'form',
                    style : 'padding:10px;background-color:#fff',
                    bodyStyle : 'background-color:#fff',
                    buttonAlign : 'center',
                    buttons : [{
                                text : '保存',
                                iconCls : 'btn-save',
                                handler : function() {
                                    DDcreate.addAddr(cus);
                                }
                            }],
                    labelAlign : 'right',
                    labelWidth : 70,
                    border : false,
                    items : [{
                        layout : 'column',
                        border : false,
                        items : [{
                            columnWidth : .36,
                            layout : "form",
                            border : false,
                            items : [{
                                fieldLabel : '地址', // 国家
                                // name :
                                // 'ulDepartment.gongzuodiSheng',
                                id : 'addressSheng_combo',
                                xtype : 'combo',
                                border : false,
                                lazyInit : false,
                                allowBlank : false,
                                anchor : '100%',
                                mode : 'local',
                                editable : false,
                                triggerAction : 'all',
                                store : AppUtil.address.getStore_region(0, 'address',
                                        null),
                                displayField : 'name',
                                valueField : 'data',
                                listeners : AppUtil.address.getListeners_region(0,
                                        'address')
                            }]
                        }, {
                            columnWidth : .2,
                            layout : "form",
                            border : false,
                            items : [{
                                // name :
                                // 'address.sheng',
                                // // 省
                                id : 'addressShi_combo',
                                // hiddenName :
                                // 'address.sheng',
                                xtype : 'combo',
                                lazyInit : false,
                                hideLabel : true,
                                mode : 'local',
                                border : false,
                                anchor : '100%',
                                allowBlank : false,
                                editable : false,
                                triggerAction : 'all',
                                store : AppUtil.address.getStore_region(1, 'address',
                                        null),
                                displayField : 'name',
                                valueField : 'data',
                                listeners : AppUtil.address.getListeners_region(1,
                                        'address')
                            }]
                        }, {
                            columnWidth : .2,
                            layout : "form",
                            border : false,
                            items : [{
                                // name :
                                // 'address.shi', //
                                // 市
                                id : 'addressQu_combo',
                                // hiddenName :
                                // 'address.shi',
                                xtype : 'combo',
                                anchor : '100%',
                                lazyInit : false,
                                hideLabel : true,
                                mode : 'local',
                                editable : false,
                                allowBlank : false,
                                triggerAction : 'all',
                                store : AppUtil.address.getStore_region(2, 'address',
                                        null),
                                displayField : 'name',
                                valueField : 'data',
                                listeners : AppUtil.address.getListeners_region(2,
                                        'address')

                            }]
                        }, {
                            columnWidth : .2,
                            layout : "form",
                            border : false,
                            items : [{
                                // name :
                                // 'address.qu',
                                id : 'addressJiedao_combo',
                                // hiddenName :
                                // 'address.qu',
                                xtype : 'combo',
                                mode : 'local',
                                anchor : '100%',
                                hideLabel : true,
                                editable : false,
                                allowBlank : false,
                                triggerAction : 'all',
                                store : AppUtil.address.getStore_region(3, 'address',
                                        null),
                                displayField : 'name',
                                valueField : 'data',
                                listeners : AppUtil.address.getListeners_region(3,
                                        'address')
                            }]
                        }]
                    }, {
                        layout : 'column',
                        border : false,
                        items : [{
                                    columnWidth : .8,
                                    border : false,
                                    labelWidth : 70,
                                    layout : 'form',
                                    items : [{
                                                xtype : 'textfield',
                                                fieldLabel : '详细地址',
                                                anchor : '100%',
                                                name : 'cusDelivery.deliveryAddress',
                                                id : 'deliveryAddress'
                                            }]
//                              }, {
//                                  columnWidth : .1,
//                                  xtype : 'button',
//                                  text : '查询邮编',
//                                  iconCls : 'menu-url',
//                                  handler : function() {
//                                     DDcreate.getPost();
//                                  }
                                }]
                    }, {
                        border : false,
                        layout : 'column',
                        items : [{
                                    layout : 'form',
                                    border : false,
                                    columnWidth : .5,
                                    items : [{
                                                xtype : 'textfield',
                                                fieldLabel : '邮编',
                                                anchor : '100%',
                                                readOnly : true,
                                                name : 'cusDelivery.deliveryPost',
                                                id : 'deliveryPost'
                                            }]

                                }, {
                                    layout : 'form',
                                    border : false,
                                    columnWidth : .5,
                                    items : [{
                                                xtype : 'textfield',
                                                fieldLabel : '收货人',
                                                anchor : '100%',
                                                name : 'cusDelivery.deliveryName',
                                                id : 'deliveryName'
                                            }]

                                }]
                    }, {
                        layout : 'column',
                        border : false,
                        items : [{
                            border : false,
                            layout : 'column',
                            columnWidth : .5,
                            items : [{
                                layout : 'form',
                                border : false,
                                columnWidth : .4,
                                items : [{
                                    xtype : 'numberfield',
                                    fieldLabel : '固定电话',
                                    anchor : '100%',
                                    name : 'teld',
                                    id : 'teld',
                                    maxLength : 4,
                                    enableKeyEvents : true,
                                    listeners : {
                                        keyup : function(textField, e) {
                                            var data = new String(Ext
                                                    .getCmp('teld')
                                                    .getValue());
                                            if (Number(data.length) >= 4) {
                                                Ext.getCmp('telh').focus();
                                            }
                                        }
                                    }
                                }]
                            }, {
                                xtype : 'numberfield',
                                hideLabel : true,
                                anchor : '100%',
                                columnWidth : .2,
                                name : 'telh',
                                id : 'telh',
                                maxLength : 4,
                                enableKeyEvents : true,
                                listeners : {
                                    keyup : function(textField, e) {
                                        var data = new String(Ext
                                                .getCmp('telh').getValue());
                                        if (Number(data.length) >= 4) {
                                            Ext.getCmp('teln').focus();
                                        }
                                    }
                                }
                            }, {
                                xtype : 'numberfield',
                                hideLabel : true,
                                anchor : '100%',
                                columnWidth : .2,
                                name : 'teln',
                                id : 'teln',
                                maxLength : 4,
                                enableKeyEvents : true,
                                listeners : {
                                    keyup : function(textField, e) {
                                        var data = new String(Ext
                                                .getCmp('teln').getValue());
                                        if (Number(data.length) >= 4) {
                                            Ext.getCmp('teli').blur();
                                        }
                                    }
                                }
                            }, {
                                xtype : 'numberfield',
                                hideLabel : true,
                                anchor : '100%',
                                columnWidth : .2,
                                id : 'teli',
                                maxLength : 4,
                                name : 'teli',
                                enableKeyEvents : true,
                                listeners : {
                                    keyup : function(textField, e) {
                                        var data = new String(Ext
                                                .getCmp('teli').getValue());
                                        if (Number(data.length) >= 4) {
                                            Ext.getCmp('teli').focus();
                                        }
                                    }
                                }
                            }]
                        }, {
                            border : false,
                            layout : 'column',
                            columnWidth : .5,
                            items : [{
                                layout : 'form',
                                border : false,
                                columnWidth : .4,
                                items : [{
                                    xtype : 'numberfield',
                                    fieldLabel : '手机',
                                    anchor : '100%',
                                    id : 'hp_teld',
                                    name : 'hp_teld',
                                    maxLength : 3,
                                    enableKeyEvents : true,
                                    listeners : {
                                        keyup : function(textField, e) {
                                            var data = new String(Ext
                                                    .getCmp('hp_teld')
                                                    .getValue());
                                            if (Number(data.length) >= 3) {
                                                Ext.getCmp('hp_telh').focus();
                                            }
                                        }
                                    }
                                }]
                            }, {
                                xtype : 'numberfield',
                                hideLabel : true,
                                anchor : '100%',
                                columnWidth : .3,
                                id : 'hp_telh',
                                name : 'hp_telh',
                                maxLength : 4,
                                enableKeyEvents : true,
                                listeners : {
                                    keyup : function(textField, e) {
                                        var data = new String(Ext
                                                .getCmp('hp_telh').getValue());
                                        if (Number(data.length) >= 4) {
                                            Ext.getCmp('hp_teln').focus();
                                        }
                                    }
                                }
                            }, {
                                xtype : 'numberfield',
                                hideLabel : true,
                                anchor : '100%',
                                columnWidth : .3,
                                id : 'hp_teln',
                                maxLength : 4,
                                name : 'hp_teln',
                                enableKeyEvents : true,
                                listeners : {
                                    keyup : function(textField, e) {
                                        var data = new String(Ext
                                                .getCmp('hp_teln').getValue());
                                        if (Number(data.length) >= 4) {
                                            Ext.getCmp('hp_teln').blur();
                                        }
                                    }
                                }
                            }]
                        }]
                    }, {
                        xtype : 'checkbox',
                        boxLabel : '是否设置为默认地址',
                        id : 'DD_default_address'
                    }]
                })]
    });
    addressWin.show();
}

DDcreate.jieSuanValidate = function(seq, cus) {
	var JiFen = Number(Ext.getCmp('useJiFen').getValue());
	var ZanCunKuan = Number(Ext.getCmp('useZanCunKuan').getValue());
	var ChuZhiJin = Number(Ext.getCmp('useChuZhiJin').getValue());
	// var jifen = Number(Ext.getCmp('useJiFen').getValue());
	// var jifen = Number(Ext.getCmp('useJiFen').getValue());
	// if(isNaN(JiFen) || isNaN(ZanCunKuan) || isNaN(ChuZhiJin)){
	// Ext.ux.Toast.msg('操作信息', '你填写信息错误，金额只能为数字!');
	// return false;
	// }
    
    var huodong = Ext.getCmp('useHuoDong').getValue();
    var lijin = Ext.getCmp('useLiJIn').getValue();
    var daijinquan = Ext.getCmp('daijinquan_hid').getValue();
//    alert(lijin.id + ':' + lijin.value);
	var add = Ext.getCmp('address_now_id').getValue();
	if (add == '') {
		Ext.ux.Toast.msg('操作信息', '请选择一个地址！');
		return false;
	}

    if(DDcreate.getKuCun(seq, cus) == false){
        return false;
    }
    
	var max1 = Number(Ext.getCmp('canUseJiFen').getValue());
	var max2 = Number(Ext.getCmp('zanCunKuan').getValue());
	var max3 = Number(Ext.getCmp('chuZhiJin').getValue());
	if (JiFen > max1 || ZanCunKuan > max2 || ChuZhiJin > max3) {
		Ext.ux.Toast.msg('操作信息', '积分,储值金,暂存款 填写金额超过账户最大可用值!');
		return false;
	}

	var count = 0;
	if (huodong != "" && huodong.id != "-1") {
		count++;
	}
	if (lijin != "" && lijin.id != "-1") {
		count++;
	}
	if (daijinquan.value != '-1') {
		count++;
	}
	if (count > 1) {
		Ext.ux.Toast.msg('操作信息', '选择的优惠方式多于一种!\n 代金券，礼金，活动只能参加一种!');
		return false;
	}
    if(lijin != "" && lijin.id != '-1'){
        DDcreate.youhuiType = 0;
        DDcreate.youhuiId = lijin.id;
        DDcreate.youhuiAmount = lijin.value;
    }
    if(daijinquan != ""){
        DDcreate.youhuiType = 1;
        DDcreate.youhuiId = daijinquan.id;
        DDcreate.youhuiAmount = daijinquan.value;
    }
	return true;
};

DDcreate.chuzhijinWin = new Ext.Window({
	width : 300,
	height : 200,
	layout : 'border',
	id : 'chuzhijinWin',
	closeAction : 'hide',
	title : '授权验证',
	items : [new Ext.form.FormPanel({
		region : 'center',
		id : 'validat_chuzhijin_formPanel',
		height : 200,
		layout : 'form',
		style : 'padding:10px;background-color:#fff',
		bodyStyle : 'background-color:#fff',
		buttonAlign : 'center',
		buttons : [{
					text : '确定',
					iconCls : 'btn-save',
					handler : function() {
						DDcreate.validat_chuzhijin();
					}
				}],
		labelAlign : 'right',
		labelWidth : 70,
		border : false,
		items : [{
					xtype : 'textfield',
					fieldLabel : '用户名',
					anchor : '70%',
					name : 'username',
					id : 'username_2'
				}, {
					xtype : 'textfield',
					inputType : 'password',
					fieldLabel : '密码',
					anchor : '70%',
					name : 'password',
					id : 'password_2'
				}, {
					xtype : 'numberfield',
					fieldLabel : '金额',
					anchor : '70%',
					id : 'amount_chuzhijin',
					name : 'amount_chuzhijin'
				}]
	})]
});

DDcreate.validat_chuzhijin = function() {
    var max = Ext.getCmp('chuZhiJin').getValue();
    var now = Ext.getCmp('amount_chuzhijin').getValue();
	if(now > max){
        Ext.ux.Toast.msg('操作信息', '储值金的使用超过限额!');
        return;
    }
    Ext.Ajax.request({
		url : __ctxPath + '/supply/validatChuzhijinScBizOrderSales.do',
		params : {
			username : Ext.getCmp('username_2').getValue(),
			password : Ext.getCmp('password_2').getValue()
		},
		method : 'post',
		success : function(response) {
			var result = Ext.util.JSON.decode(response.responseText)
			if (result.success == true) {
				Ext.getCmp('useChuZhiJin').setValue(Ext
						.getCmp('amount_chuzhijin').getValue());
				Ext.ux.Toast.msg('操作信息', '使用成功');
			} else {
				Ext.ux.Toast.msg('操作信息', result.msg);
			}
			Ext.getCmp('chuzhijinWin').close();
		}
	});
};

DDcreate.zancunkuanWin = new Ext.Window({
	width : 300,
	height : 200,
	layout : 'border',
	id : 'zancunkuanWin',
	closeAction : 'hide',
	title : '授权验证',
	items : [new Ext.form.FormPanel({
		region : 'center',
		id : 'validat_chuzhijin_formPanel',
		height : 200,
		layout : 'form',
		style : 'padding:10px;background-color:#fff',
		bodyStyle : 'background-color:#fff',
		buttonAlign : 'center',
		buttons : [{
					text : '确定',
					iconCls : 'btn-save',
					handler : function() {
						DDcreate.validat_zancunkuan();
					}
				}],
		labelAlign : 'right',
		labelWidth : 70,
		border : false,
		items : [{
					xtype : 'textfield',
					fieldLabel : '用户名',
					anchor : '70%',
					name : 'username',
					id : 'username_1'
				}, {
					xtype : 'textfield',
					inputType : 'password',
					fieldLabel : '密码',
					anchor : '70%',
					name : 'password',
					id : 'password_1'
				}, {
					xtype : 'numberfield',
					fieldLabel : '金额',
					anchor : '70%',
					id : 'amount_zancunkuan',
					name : 'amount_zancunkuan'
				}]
	})]
});
DDcreate.validat_zancunkuan = function() {
    var max = Ext.getCmp('zanCunKuan').getValue();
    var now = Ext.getCmp('amount_zancunkuan').getValue();
    if(now > max){
        Ext.ux.Toast.msg('操作信息', '暂存款的使用超过限额!');
        return;
    }
	Ext.Ajax.request({
				url : __ctxPath + '/supply/validatzancunkuanScBizOrderSales.do',
				params : {
					username : Ext.getCmp('username_1').getValue(),
					password : Ext.getCmp('password_1').getValue()
				},
				method : 'post',
				success : function(response) {
					var result = Ext.util.JSON.decode(response.responseText)
					if (result.success == true) {
						Ext.getCmp('useZanCunKuan').setValue(Ext
								.getCmp('amount_zancunkuan').getValue());
						Ext.ux.Toast.msg('操作信息', '使用成功');
					} else {
						Ext.ux.Toast.msg('操作信息', result.msg);
					}
					Ext.getCmp('zancunkuanWin').close();
				}
			});
};

DDcreate.daiJinQuanWinShow = function(){
    var win = new Ext.Window({
        width : 300,
        height : 200,
        layout : 'border',
        id : 'daijinqWin',
        closeAction : 'hide',
        title : '使用代金券',
        closeAction : 'close',
        items : [new Ext.form.FormPanel({
	        region : 'center',
	        id : 'validat_chuzhijin_formPanel',
	        height : 200,
	        layout : 'form',
	        style : 'padding:10px;background-color:#fff',
	        bodyStyle : 'background-color:#fff',
	        buttonAlign : 'center',
	        buttons : [{
	                    text : '确定',
	                    iconCls : 'btn-save',
	                    handler : function() {
	                        DDcreate.validat_daijinquan();
	                    }
	                }],
	        labelAlign : 'right',
	        labelWidth : 70,
	        border : false,
	        items : [{
	                    xtype : 'textfield',
	                    fieldLabel : '代金券',
	                    anchor : '70%',
	                    id : 'daiJinQuanNo'
	                }]
	    })]
    });
    win.show();
}

DDcreate.validat_daijinquan = function(){
    var data_post = { 
        coupus_no : Ext.getCmp('daiJinQuanNo').getValue()
    };
    AppUtil.copy(AppUtil.interfaceBase, data_post);
    var getDaiJinQuan = {
        wsUrl : DDcreate.getDaiJinQuanUrl,
        jsonData_ : Ext.util.JSON.encode(data_post)
    };
    var result = AppUtil.synchroAjax(__ctxPath + '/system/proxyRestfulWSProxy.do', 
        getDaiJinQuan).result;
    if(result == null || result == undefined){
        Ext.ux.Toast.msg('操作信息', '礼金券不存在');
        return;
    }
    result = result[0];
    Ext.getCmp('useDaiJinQuan').setValue(result.event_nm);
    Ext.ux.Toast.msg('操作信息', '礼金券: \n' + result.event_nm);
    var all = Ext.getCmp('allSum').getValue();
    if(Number(all)< result.low_amt){
        Ext.ux.Toast.msg('操作信息', '代金券使用金额不足!');
        return;
    } 
    if(result.overdue == 'Y'){
        Ext.ux.Toast.msg('操作信息', '代金券已过期!');
        return;
    }
//    Ext.getCmp('useDaiJinQuan').setValue();
    Ext.getCmp('zhifujine').setValue(Number(all) - Number(result.dis_amt));
    Ext.getCmp('daijinquan_hid').setValue({
        id : Ext.getCmp('daiJinQuanNo').getValue(),
        value : result.dis_amt
    });
//    AppUtil.showObj(result);
}

DDcreate.getKuCun =function(addrSeq, cus){
    var parentGrid = Ext.getCmp("gridPanel_goods");
    var parentStore = parentGrid.getStore();
    var goods = new Array();
    for (var i = 0; i < parentStore.getCount(); i++) {
        var tmp_data = parentStore.getAt(i).data;
        if(tmp_data.saleType == '主品'){//只检查主品的库存
            goods.push({
                good_id : tmp_data.good.numbers,
                color_id : tmp_data.good.ext1,
                style_id : tmp_data.good.style
            });
            var amount_now = tmp_data.amount;
            var name_goods = tmp_data.good.goodsName;
        }
    }
    var data_getAmount = {
        'cust_id' : cus.customerNo,
        'dlv_addr_seq' : addrSeq,
        'goods' : goods
    };
    AppUtil.copy(AppUtil.interfaceBase, data_getAmount);
    var getAmount = {
        wsUrl : DDgoods.ulr_amount,
        jsonData_ : Ext.util.JSON.encode(data_getAmount)
    };
    var goods = AppUtil.synchroAjax(__ctxPath + '/system/proxyRestfulWSProxy.do', 
        getAmount).result;
    if(goods == null){
        goods[0].good_qty = 0;
    }
    if(amount_now > goods[0].good_qty){
        Ext.ux.Toast.msg('操作信息', '商品'+
            name_goods+'库存现在为' + goods[0].good_qty +'.<br> 购买数量超过库存量, 请修改.');
        return false;
    }
}

DDcreate.getYunFei =function(addr_seq, cus){
    var parentGrid = Ext.getCmp("gridPanel_goods");
    var parentStore = parentGrid.getStore();
    var goods = new Array();
    for (var i = 0; i < parentStore.getCount(); i++) {
        var tmp_data = parentStore.getAt(i).data;
        goods.push({
            good_id : tmp_data.good.numbers,
            good_cnt : tmp_data.amount
        });
    }
    var data_getAmount = {
        'cust_id' : cus.customerNo,
        'dlv_addr_seq' : addr_seq,
        'goods' : goods
    };
    AppUtil.copy(AppUtil.interfaceBase, data_getAmount);
    var getAmount = {
        wsUrl : DDcreate.ulr_yunfei,
        jsonData_ : Ext.util.JSON.encode(data_getAmount)
    };
    var result = AppUtil.synchroAjax(__ctxPath + '/system/proxyRestfulWSProxy.do', 
        getAmount).result;
    return result[0].dlv_amt;
}