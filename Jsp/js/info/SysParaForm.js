/**
 * @author cf0666@gmail.com
 * @createtime 
 * @class SysParaForm
 * @extends Ext.Window
 * @description SysPara表单
 * @company 优创融联科技
 */
SysParaForm = Ext.extend(Ext.Panel, {
//构造函数
    constructor : function(_cfg) {
	   Ext.applyIf(this, _cfg);
	   //必须先初始化组件
	   this.initUIComponents();
	   SysParaForm.superclass.constructor.call(this, {
	       id : 'SysParaFormWin',
		   layout : 'fit',
		   items : this.formPanel,
		   modal : true,
		   height : 400,
		   width : 500,
		   maximizable : true,
		   title : '系统参数详细信息',
		   buttonAlign : 'center',
		   buttons : [{
		        text : __save,
			    iconCls : 'btn-save',
				scope : this,
				handler : this.save
			}, {
				text : __reset,
				iconCls : 'btn-reset',
				scope : this,
				handler : this.reset
			}, {
				text : __cancel,
				iconCls : 'btn-cancel',
				scope : this,
				handler : this.cancel
			}]
		});
	},//end of the constructor
	//初始化组件
	initUIComponents : function() {
        var gridPanel_opt = new HT.EditorGridPanel({
	        region : 'center',
	        tbar : this.getTopBar('gridPanel_opt'),
	        height : 150,
	        id : 'gridPanel_opt',
	        scrollHeight : true,
	        clicksToEdit : 1,
	        url : __ctxPath + "/infoSys/getOptSysPara.do?sysParaId="
	           + this.sysParaId,
	        fields : [{
	                    name : 'sysParaOptId',
	                    type : 'long'
	                }, 'sysParaOptName', 'sysParaOptValue'],
	        columns : [{
	                    id : 'sysParaOptId',
	                    dataIndex : 'sysParaOptId',
	                    hidden : true
	                }, {
	                    header : '参数项名称',
	                    dataIndex : 'sysParaOptName',
	                    editor : new Ext.form.TextField({})
	                }, {
	                    header : '参数项值',
	                    dataIndex : 'sysParaOptValue',
	                    editor : new Ext.form.TextField({})
	                }]// end of columns
        });
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			//id : 'SysParaForm',
			defaults : {
				anchor : '96%,96%'
			},
			defaultType : 'textfield',
			items : [{
				name : 'sysPara.sysParaId',
				xtype : 'hidden',
				value : this.sysParaId == null ? ''	: this.sysParaId
			}, {
				fieldLabel : '系统参数名称',
				name : 'sysPara.sysParaName',
				xtype : 'textarea',
				maxLength : 512
			}, {
				fieldLabel : '系统参数键',
				name : 'sysPara.sysParaKey',
				xtype : 'textarea',
				maxLength : 512
			}, {
				fieldLabel : '系统参数值',
				name : 'sysPara.sysParaValue',
				xtype : 'textarea',
				maxLength : 512
			}, gridPanel_opt]
		});
	    //加载表单对应的数据	
		if (this.sysParaId != null && this.sysParaId != 'undefined') {
		    this.formPanel.loadData({
			    url : __ctxPath	+ '/infoSys/getSysPara.do?sysParaId='
				    + this.sysParaId,
				root : 'data',
				preName : 'sysPara'
			});
		}
	},//end of the initcomponents

	/**
	* 重置
	* @param {} formPanel
	*/
	reset : function() {
		this.formPanel.getForm().reset();
	},
	
    getTopBar : function(gridId) {
	    return new Ext.Toolbar({
	                items : ['->', {
	                            iconCls : 'btn-del',
	                            text : '删除',
	                            xtype : 'button',
	                            handler : function() {
	                                var grid = Ext.getCmp(gridId);
	                                var store = grid.getStore();
	                                var sm = grid.getSelectionModel();
	                                var cell = sm.getSelections();
	                                if (cell.length < 1) {
	                                    Ext.ux.Toast.msg('提示信息', '请至少选择一条记录!');
	                                } else {
	                                    store.remove(cell);
	                                }
	                            }
	                        }, '->', {
	                            iconCls : 'btn-add',
	                            text : '添加',
	                            xtype : 'button',
	                            handler : function() {
	                                var grid = Ext.getCmp(gridId);
	                                var store = grid.getStore();
	                                var recordType = store.recordType;
	                                store.add(new recordType({})); // 添加一行空store
	                            }
	                        }]
	            });
	},
	/**
	 * 取消
	 * @param {} window
	 */
	cancel : function() {
		var tabs = Ext.getCmp('centerTabPanel');
        tabs.remove('SysParaFormWin');
        this.destroy();
	},
	/**
	 * 保存记录
	 */
	save : function() {
        if (this.formPanel.getForm().isValid()) {
            var store = Ext.getCmp('gridPanel_opt').getStore();
            var rows = [];
            for (var i = 0; i < store.getCount(); i++) {
                rows.push(store.getAt(i).data);
            }
        }
		$postSubForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/infoSys/saveSysPara.do',
                    params : {
                        opt : Ext.encode(rows)
                    },
					msgSuccess : '成功保存该记录！',
					msgFailure : '操作出错，请联系管理员！',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('SysParaGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.cancel();
					}
				});
	}//end of save

});