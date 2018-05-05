/**
 * @author
 * @createtime
 * @class DepartmentForm
 * @extends Ext.Window
 * @description DepartmentForm表单
 * @company 优创融联科技
 */
RegionForm = Ext.extend(Ext.Window, {
	// 内嵌FormPanel
	formPanel : null,
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		RegionForm.superclass.constructor.call(this, {
			id : 'RegionFormWin',
			title : '行政区域信息',
			iconCls : 'menu-department',
			layout : 'fit',
			width : 700,
			height : 400,
			items : this.formPanel,
			border : false,
			modal : true,
			plain : true,
			keys : {
				key : Ext.EventObject.ENTER,
				fn : this.save,
				scope : this
			},
			buttonAlign : 'center',
			buttons : [{
						text : '保存',
						iconCls : 'btn-save',
						handler : this.save,
						scope : this
					}, {
						text : '取消',
						iconCls : 'btn-cancel',
						handler : function() {
							Ext.getCmp('RegionFormWin').close();
						}
					}]
		});
        this.formPanel.doLayout();
    },// end of the constructor
	// 初始化组件
	initUIComponents : function() {
        
        var items = [];
        var count_combo = this.typeId - 1;
	    for(var i = 0; i < count_combo; i++){
	        items.push({
                columnWidth : .3,
                border : false,
                layout : "form",
                items : [{
		            id : 'region.' + RegionForm.add_map.get(i + 1),
		            xtype : 'combo',
		            lazyInit : false,
		            hideLabel:true,
		            allowBlank : false,
                    anchor:'100%',
		            mode : 'local',
		            editable : false,
		            triggerAction : 'all',
		            store : RegionForm.getStore_region(i,'region.', this.addres),
		            displayField : 'regionName',
		            valueField : 'regionId',
		            listeners : RegionForm.getListeners_region(i,'region.', count_combo)
                }]
	        });
	    }
        if(count_combo == 0){
            items.push({
                html : '中华人民共和国',
                border : false
            });    
        }
        var address_com = new Ext.Panel({
            layout : 'column',
            fieldLabel : '所属地区', // 国家
            border : false,
            items : items
        });
        address_com.doLayout();
        
		this.formPanel = new Ext.form.FormPanel({
			frame : false,
			id : 'RegionForm',
			bodyStyle : 'padding : 5px;',
			layout : 'form',
            labelAlign:'right',
			defaultType : 'textfield',
			url : __ctxPath + '/system/addRegion.do',
			reader : new Ext.data.JsonReader({
						root : 'data'
					}, [{
							name : 'regionId',
							mapping : 'regionId'
						}, {
							name : 'regionName',
							mapping : 'regionName'
						}, {
							name : 'parentId',
							mapping : 'parentId'
						},{
							name : 'regionType',
							mapping : 'regionType'
						},{
                            name : 'areaNo',
                            mapping : 'areaNo'
                        },{
                            name : 'postCode',
                            mapping : 'postCode'
                        }]),
			defaults : {
				anchor : '95%,95%',
				allowBlank : false,
				selectOnFocus : true,
				msgTarget : 'side'
			},
			items : [{
						xtype : 'hidden',
						name : 'region.regionId',
						id : 'regionId'
					}, {
						xtype : 'hidden',
						name : 'region.path',
						id : 'path'
					}, {
						fieldLabel : '地区名称',
						name : 'region.regionName',
						blankText : '地区名称为必填!',
						id : 'regionName'
					}, {
                        fieldLabel : '地区编号',
                        name : 'region.areaNo',
                        blankText : '地区名称为必填!',
                        id : 'areaNo'
                    },{
                        fieldLabel : '邮政编码',
                        name : 'region.postCode',
                        id : 'postCode',
                        allowBlank : true
                    },{
						fieldLabel : '地区类型',
						name : 'region.regionType',
                        hiddenName : 'region.regionType',
						blankText : '地区类型为必填!',
						id : 'regionType',
						itemKey: 'XZQYLX',
						xtype : 'mtdiccombolocal',
                        readOnly : true,
                        editable : false,
                        value : this.typeId
					}, address_com]
		});
	},
			
	/**
	 * 保存
	 */
	save : function() {
		var tree = Ext.getCmp('RegionTreePanel');
        
//        alert('parentId' + this.getParId());
		if (Ext.getCmp('RegionForm').getForm().isValid()) {
			Ext.getCmp('RegionForm').getForm().submit({
				waitMsg : '正在提交组织机构信息',
                params : {
                    'region.parentId' : this.getParId(),
                    'region.parentName' : this.getParValue()
                },
				success : function(formPanel, o) {
					Ext.ux.Toast.msg('操作信息', '数据操作成功！');
					if (tree != null){
						tree.root.reload();
						Ext.getCmp('RegionView_grid').getStore().reload();
					}
					Ext.getCmp('RegionFormWin').close();
				}
			});
		}
	},
    
    getParId : function(){
        if(this.typeId == 1){
            return 0;
        }
        var id = 'region.' + RegionForm.add_map.get(this.typeId - 1);
        return Ext.getCmp(id).getValue();
    },
    
    getParValue : function(){
        if(this.typeId == 1){
            return '中华人民共和国';
        }
        var id = 'region.' + RegionForm.add_map.get(this.typeId - 1);
        return Ext.getCmp(id).getRawValue();
    }
});

RegionForm.regionList = ['sheng','shi','xian', 'jiedao'];
RegionForm.add_map = new Map();
RegionForm.add_map.put(1,'sheng');
RegionForm.add_map.put(2,'shi');
RegionForm.add_map.put(3,'xian');
RegionForm.add_map.put(4,'jiedao');


RegionForm.getStore_region = function(flag, idText, parentList){
    if(parentList == undefined && flag != 0){//新增时,非第一下拉框,不加载数据
            return new Ext.data.SimpleStore({
                fields : ['regionId', 'regionName']
            });
    }
    var parentId = 0;//默认的父id
    if(parentList != undefined){
        parentList = parentList.split('.');
        parentId = parentList[flag];
    }
    return new Ext.data.SimpleStore({
        autoLoad : true,
        url : __ctxPath + '/system/listDetailNewRegion.do',
        baseParams : {
            regionId : parentId,
            type : flag+1
        },
        fields : ['regionId', 'regionName'],
        listeners : {
            load : function() { // 当store加载数据完成后触发
                if(parentList != undefined){//非新增时,设定值
	                var comId = idText + RegionForm.regionList[flag];
                    Ext.getCmp(comId).setValue(parentList[flag+1]);
                }   
            }
        }
    })
}

RegionForm.getListeners_region = function(flag, idText, count_combo){
    return {
        select : function(combo, record, index) {
            if(flag < count_combo - 1){
                var next = Ext.getCmp(idText + RegionForm.regionList[flag+1]);
                var nextStore = next.getStore();
                Ext.Ajax.request({
                    url : __ctxPath + '/system/listDetailNewRegion.do',
                    params : {
                        regionId : record.data['regionId'],
                        type : flag + 2
                    },
                    method : 'post',
                    success : function(response) {
                        var result = Ext.util.JSON.decode(response.responseText)
                        nextStore.loadData(result);
                        next.clearValue();
                    }
                });
            }
        }
    }
}