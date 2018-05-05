/**
 * 流程执行下一步总入口,需要传入任务id，当前节点名称
 * 
 * @class ProcessNextForm
 * @extends Ext.Panel
 */
var thisParams;
ProcessNextForm = Ext.extend(Ext.Panel, {
	constructor : function(config) {
		// 若当前任务尚未分配该用户，则该用户进入该任务时，
		// 需要弹出一个对话框架告诉他正在锁定该任务执行
		Ext.applyIf(this, config);
		thisParams = config;
		var flag = false;
		Ext.Ajax.request({
					params : {
						taskId : this.taskId
					},
					async : false,
					scope : this,
					url : __ctxPath + "/flow/checkTask.do",
					success : function(response, options) {
						// 若当前任务已经被其他人员执行或已经执行完成等
						var result = Ext.util.JSON
								.decode(response.responseText);
						if (result.assigned != undefined) {
							if (!result.assigned) {
								Ext.ux.Toast.msg('操作信息', '该任务已经被其他用户锁定执行！');
								flag = true;
							}
							if (result.assigned) {
								Ext.ux.Toast.msg('操作信息', '该任务已经成功锁定!');
							}
						}
					}
				});

		if (flag) {
			var taskPanel = Ext.getCmp('TaskPanelView');
			if (taskPanel != null && taskPanel != undefined) {
				taskPanel.getUpdater().update(__ctxPath
										+ '/flow/displayTask.do?start=0&limit=10&runStatus=1&orderBy=duedate_&taskUser='
										+ curUserInfo.userId);
			}
			ProcessNextForm.superclass.constructor.call(null);
			return;
		}

		// 下一授予任务名
		this.assignTasks = new Array();
		// 下一任务用户名
		this.assignUserIds = new Array();

		this.formPanel = new Ext.FormPanel({
					// layout:'table',
			        labelWidth:100,
					border : false,
					
					//bodyStyle : 'padding-top:-20px;',
					autoHeight : true,
					autoLoad : {
						url : __ctxPath + "/flow/getProcessActivity.do?taskId="
								+ this.taskId,
						nocache : true,
						params : {
							activityName : this.activityName
						},
						scope : this,
						callback : this.getFormHtmlCallback
					}
				});

		// 显示流程审批的表单
		this.flowdetailPanel = new Ext.Panel({
					border : false,
					autoHeight : true,
					autoLoad : {
						url : __ctxPath + '/flow/processRunDetail.do?taskId='
								+ this.taskId,
						nocache : true
					}
				});

		// 用户选择的Panel，为下一节点进行人员选择
		this.userJumpPanel = new Ext.form.FieldSet({
					title : '<div style="width:150px;" >选择下一任务执行人</div>',
					collapsed : true,
					autoHeight : true,
					border : false,
					//hidden : true,
					collapsed : false,
					collapsible : true
//					layout : 'form'
				});

		// 加载跳转的按钮
		this.jumpPanel = new Ext.Panel({
//					border : false,
//					//bodyStyle : 'padding:8px',
//					layout : 'form',
			
			bodyStyle : 'padding:4px 4px 4px 20px',
			autoHeight : true,
			layout : 'form',
			border : false,
			defaults : {
				anchor : '98%,98%'
			},
					items : [
					 this.userJumpPanel
					]
				});

		this.toolbar = new Ext.Toolbar({
					items : [
							// ,'-',{
							// xtype:'checkbox',
							// boxLabel:'发送邮件',
							// scope:this,
							// handler:function(ck,checked){
							// if(checked){
							// this.sendMail=true;
							// }else{
							// this.sendMail=false;
							// }
							// }
							// },{
							// xtype:'checkbox',
							// boxLabel:'发送短信',
							// scope:this,
							// handler:function(ck,checked){
							// if(checked){
							// this.sendMsg=true;
							// }else{
							// this.sendMsg=false;
							// }
							// }
							// }
							'->', {
								text : '返回',
								iconCls : 'btn-cancel',
								scope : this,
								handler : this.cancel
							}, '->', {
								text : '流程图',
								iconCls : 'btn-flow-chart',
								scope : this,
								handler : this.showFlowImage
							}, '->', {
								xtype : 'button',
								text : '提交',
								scope : this,
								iconCls : 'btn-transition',
								handler : this.nextStep
							}
					// ,' ',' ','->',{
					// xtype:'checkbox',
					// boxLabel:'自由跳转',
					// hidden : true,
					// scope:this,
					// handler:this.freeJump
					// }
					]
				});

		this.loadJumpTrans.call(this);

		// 调用构造函数
		ProcessNextForm.superclass.constructor.call(this, {
					tbar : this.toolbar,
					id : 'ProcessNextForm_' + this.taskId,
					iconCls : 'btn-approvalTask',
					title : this.activityName + '--待办事项',
					layout : 'form',
					labelAlign : 'right',
					//labelWidth: 100,
					buttonAlign : 'center',
					bodyStyle : 'padding:5px',
					defaults : {
						margins : '0 5 10 0'
					},
					items : [this.jumpPanel, this.formPanel ,{
								xtype : 'fieldset',
								 title : '流程审批信息',
								// defaultType : 'textfield',
								layout : 'form',
								collapsed : true,
								anchor : '98%',
								
								autoHeight : true,
								collapsed : false,
								collapsible : true,
								defaults : {
									anchor : '100%,100%'
								},
								items : [this.flowdetailPanel]
							}]
				});
	},
	// 加载当前任务节点的跳转路径
	loadJumpTrans : function() {
		// 加载审批表单的功能按钮
		Ext.Ajax.request({
			url : __ctxPath + "/flow/transProcessActivity.do",
			params : {
				taskId : this.taskId
			},
			scope : this,
			success : function(response, options) {
				var object = Ext.decode(response.responseText);
				if (object.preTaskName != undefined && object.preTaskName != '') {
					this.toolbar.insert(3, new Ext.Toolbar.Separator());
					this.toolbar.insert(3, new Ext.Button({
										text : '驳回',
										iconCls : 'btn-back',
										scope : this,
										hidden : true,
										handler : this.backFlow
									}));
					this.unAddBack = true;
					this.preTaskName = object.preTaskName;
				}
				var radioItems = [];
				for (var i = 0; i < object.data.length; i++) {
					radioItems.push({
						boxLabel : object.data[i].destination,
						name : 'jumpPath_' + this.taskId,
						inputValue : object.data[i].name,
						
						destType : object.data[i].destType,
						destName : object.data[i].destination,
						checked : i == 0 ? true : false
							// 缺省第一个选中
						});
				}
				this.jumpRadioGroup = new Ext.form.RadioGroup({
					        anchor : '40%',
							listeners : {
								scope : this,
								'change' : this.jumpRadioCheck
							},
							fieldLabel : '执行路径',
							items : radioItems
						});

				this.jumpPanel.insert(0, this.jumpRadioGroup);
				this.jumpPanel.doLayout();
				// 以加载相应的人员
				this.jumpRadioCheck.call(this);
				// 加上会签的投票

				if (object.isSignTask) {
					this.addSignVoteOpinion.call(this);
				}
			}
		});
	},
	/**
	 * 加上会签意见
	 */
	addSignVoteOpinion : function() {

		this.voteRadioGroup = new Ext.form.RadioGroup({
					columns : [100, 100, 100],
					vertical : true,
					items : [{
								xtype : 'radio',
								name : 'signVoteType',
								boxLabel : '同意',
								inputValue : 1,
								checked : true
							}, {
								name : 'signVoteType',
								xtype : 'radio',
								boxLabel : '拒绝',
								inputValue : 2
							}, {
								xtype : 'radio',
								name : 'signVoteType',
								boxLabel : '弃权',
								inputValue : 0
							}]
				});
		this.voteCmpField = new Ext.form.CompositeField({
					width : 540,
					autoHeight : true,
					fieldLabel : '会签投票意见',
					items : [this.voteRadioGroup]
				});
		// 显示会签情况
		this.voteListPanel = new Ext.Panel({
					border : false,
					autoHeight : true,
					autoLoad : {
						url : __ctxPath
								+ "/flow/signListProcessActivity.do?taskId="
								+ this.taskId,
						nocache : true
					}
				});

		this.voteSignFieldSet = new Ext.form.FieldSet({
					title : '会签情况',
					autoHeight : true,
					layout : 'form',
					items : [this.voteListPanel, this.voteCmpField]
				});
	},

	/**
	 * 单选项按钮点击
	 * 
	 * @param {}
	 *            rd
	 * @param {}
	 *            ckradio
	 */
	jumpRadioCheck : function(radioGp, radio) {

		if (!radioGp) {
			radioGp = this.jumpRadioGroup;
		}
		if (!radio) {
			radio = radioGp.getValue();
		}

		this.getTaskUsers.call(this, radio.destName, radio.destType);

	},
	/**
	 * 取得下一节点对应的处理人员
	 * 
	 * @param {}
	 *            destName 目标节点的名称
	 * @param {}
	 *            destType 目标节点的类型
	 */
	getTaskUsers : function(destName, destType) {
		// 下一节点为分支及fork节点
		if ('decision' == destType || 'fork' == destType || 'join' == destType) {
			this.userJumpPanel.removeAll();
			this.userJumpPanel.show();
			this.genForkDecUserAssign.call(this, destName);
		} else if (destType.indexOf('end') != -1) {// 下一节点为结束节点，需要隐藏下一步的执行人
			this.userJumpPanel.removeAll();
			this.userJumpPanel.hide();
		} else {// 下一节点为普通任务节点
			this.userJumpPanel.removeAll();
			this.userJumpPanel.show();
			this.userJumpPanel
					.add(this.getSingleUserPanel.call(this, destName));
		}
		this.jumpPanel.doLayout();

	},
	/**
	 * 下一步仅有一个任务，即仅需要为一个任务赋予人员
	 * 
	 * @return {}
	 */
	getSingleUserPanel : function(destName) {
		this.flowAssignName = new Ext.form.TextArea({
					width : 400,
					height : 40,
					name : 'flowAssignName'
				});

		var singleUserField = new Ext.form.CompositeField({
			xtype : 'compositefield',
			fieldLabel : '执行人',
			anchor : '92%,92%',
			items : [this.flowAssignName, {
						xtype : 'button',
						scope : this,
						text : '...',
						iconCls : 'btn-users',
						handler : function() {
							var formPanel = this.flowUserFieldPanel;
							UserSelector.getView({
										callback : function(uId, uname) {
											this.flowAssignName.setValue(uname);
											this.assignTasks = [destName];
											this.assignUserIds = [uId];
										},
										scope : this
									}).show();
						}
					}]
		});
		Ext.Ajax.request({
					url : __ctxPath + '/flow/usersProcessActivity.do',
					scope : this,
					params : {
						taskId : this.taskId,
						activityName : destName
					},
					success : function(response, options) {
						var result = Ext.decode(response.responseText);
						this.flowAssignName.setValue(result.userNames);
						this.assignTasks = [destName];
						this.assignUserIds = [result.userIds];
					}
				});

		return singleUserField;
	},

	// 为汇集或分支节点产生自由跳转的人员选择
	genForkDecUserAssign : function(destName) {
		Ext.Ajax.request({
					url : __ctxPath
							+ '/flow/outerTransProcessActivity.do?taskId='
							+ this.taskId,
					params : {
						nodeName : destName
					},
					scope : this,
					success : function(resp, options) {
						// outers数据格式为[{singalName,activityName,destType},...]
						// 如：[["to 总经理审阅","总经理审阅","task","1,2","张三,李四"],["to
						// 财务审核","财务审核","task","1,2","张三,李五"]]
						var outers = Ext.decode(resp.responseText);

						for (var i = 0; i < outers.length; i++) {
							this.userJumpPanel.add(this.genUserFieldSel.call(
											this, outers[i]), i);
						}
						this.userJumpPanel.doLayout();
					}
				});
	},
	// 产生用户选择
	genUserFieldSel : function(outers, idx) {
		// 目标节点名称
		var destName = outers[1];
		this.assignTasks[idx] = destName;
		this.assignUserIds[idx] = outers[3];

		var flowAssignUserName = new Ext.form.TextArea({
					allowBlank : false,
					width : 400,
					height : 40,
					value : outers[4]
				});
		var cmpField = new Ext.form.CompositeField({
			anchor : '92%,92%',
			bodyStyle : "background-color:white;padding:0 0 0 0",
			fieldLabel : destName,
			items : [flowAssignUserName, {
						xtype : 'button',
						text : '...',
						iconCls : 'btn-users',
						scope : this,
						handler : function() {
							UserSelector.getView({
										scope : this,
										callback : function(uIds, uNames) {
											flowAssignUserName.setValue(uNames);
											// 查找该数组中是否已经存在这个目标节点，若存在，则找到其坐标
											var index = this.assignTasks.length;
											for (var i = index - 1; i >= 0; i--) {
												if (this.assignTasks[i] == destName) {
													index = i;
													break;
												}
											}
											this.assignTasks[index] = destName;
											this.assignUserIds[index] = uIds;
										}
									}).show();
						}// end of handler
					}]
		});

		return cmpField;

	},
	/**
	 * 取得下一任务及其对应的人员
	 */
	getFlowAssignId : function() {
		// 返回其格式如下：领导审批:财务审核:...|1,2:3,4:...),也只可为1,2,3(当下一步仅有一任务时）
		var flowAssignId = '';
		var destTasks = '';
		var destUserIds = '';
		for (var i = 0; i < this.assignTasks.length; i++) {
			if (i > 0) {
				destTasks += ':';
				destUserIds += ':';
			}
			destTasks += this.assignTasks[i];
			destUserIds += this.assignUserIds[i];
		}
		if (destTasks != '') {
			flowAssignId = destTasks + '|' + destUserIds;
		}
		return flowAssignId;
	},

	/**
	 * 执行下一步
	 */
	nextStep : function() {
		var isValid = true;
		// 加上对于表单的前置验证，允许在模板中加上自己的验证
		if (this.formExtPanel != null && this.formExtPanel.validate) {
			isValid = this.formExtPanel.validate.call(this.formExtPanel, this);
		}
		isValid = $validForm.call(this);
		if (!isValid)
			return;
		var signalName = '';
		var destName = '';
		var signVoteType = null;
		if (this.isFreeJump) {// 若为自由跳转
			signalName = this.freeTransCombo.getValue();
			var store = this.freeTransCombo.getStore();
			for (var i = 0; i < store.getCount(); i++) {
				var data = store.getAt(i).data;
				if (data.signalName == signalName) {
					destName = data.destName;
					break;
				}
			}
		} else {// 正规按流程线路跳转
			var selectedItem = this.jumpRadioGroup.getValue();
			signalName = selectedItem.getGroupValue();
			destName = selectedItem.destName;
		}

		if (destName == '') {
			Ext.ux.Toast.msg('操作信息', '请选择要跳转的目标任务！');
			return;
		}
		// 是为会签
		if (this.voteRadioGroup) {
			signVoteType = this.voteRadioGroup.getValue().getGroupValue();
		}
		var form = this.formPanel.getForm();
		// modify by lyy start
		/**
		 * @author lyy
		 * @description 取得表单里面的OFFICE控件面板，保存文档，再把文档ID返回给表单字段
		 */
		var officePanel = this.officePanel;
		if (officePanel) {
			var obj = null;
			if (this.fileId != '' && this.fileId != undefined) {
				obj = officePanel.saveDoc({
							docName : 'ProcessDocument',
							fileId : this.fileId,
							doctype : 'doc'
						});
			} else {
				obj = officePanel.saveDoc({
							docName : 'ProcessDocument',
							doctype : 'doc'
						});
			}
			if (obj && obj.success) {
				var fileId = obj.fileId;
				this.hiddenF.setValue(fileId);
			}
		}

		// 设置flowAssignId,用于指定下一任务的执行人
		var flowAssignId = '';
		if (this.formExtPanel != null && this.formExtPanel.getFlowAssignId) {// 若在模板中指定了下一步的执行人员
			flowAssignId = this.formExtPanel.getFlowAssignId.call(
					this.formExtPanel, this);
		} else {
			flowAssignId = this.getFlowAssignId.call(this);
		}

		var baseParams = {
			useTemplate : this.useTemplate,
			signVoteType : signVoteType,
			flowAssignId : flowAssignId,
			taskId : this.taskId,
			signalName : signalName,
			destName : destName,
			sendMsg : this.sendMsg,
			sendMail : this.sendMail
		};

		if (this.detailGrids) {// 适用于多个GRID的
			var grids = this.detailGrids.keys;
			for (var j = 0; j < grids.length; j++) {
				var details = [];
				var detailPanel = this.detailGrids.get(grids[j]);
				var store = detailPanel.getStore();
				for (var i = 0; i < store.getCount(); i++) {
					var record = store.getAt(i);
					var d = HT.encode(record.data);
					details.push(d);
				}
				baseParams[grids[j] + 'details'] = Ext.encode(details);
			}
		}
		var dom = form.getEl().dom;
		// 取得表单里面的子表单
		var forms = dom.getElementsByTagName('form');
		var dv = [];
		var detailsMap = new Ext.util.MixedCollection();
		for (var i = 0; i < forms.length; i++) {
			var belongName = forms[i].getAttribute('belongName');
			var pkName = forms[i].getAttribute('pkName');
			var pkValue = forms[i].getAttribute('pkValue');
			var baseParam2 = Ext.Ajax.serializeForm(forms[i]);
			var deParams = Ext.urlDecode(baseParam2);// 取得了从表里面的数据
			// 进行数据组装
			if (pkName && pkValue) {
				deParams[pkName] = pkValue;
			}
			var dd = HT.encode(deParams);

			var tt = detailsMap.get(belongName);
			if (!tt) {
				var details = [];
				details.push(dd);
				detailsMap.add(belongName, details);
			} else {
				tt.push(dd);
			}
			// var obj={
			// gridName:belongName,
			// details:details
			// };
			// dv.push(obj);
		}

		for (var i = 0; i < detailsMap.keys.length; i++) {
			var keyName = detailsMap.keys[i];
			baseParams[keyName + 'details'] = Ext.encode(detailsMap
					.get(keyName));
		}
		// return;

		if (form.isValid()) {// 是合法有效
			form.submit({
						url : __ctxPath + "/flow/nextProcessActivity.do",
						method : 'post',
						waitMsg : '正在提交处理，请稍等',
						scope : this,
						params : baseParams,
						success : function(fp, action) {
							Ext.ux.Toast.msg('操作信息', '成功保存！');
							AppUtil.removeTab('ProcessNextForm_' + this.taskId);
							var myTaskGrid = Ext.getCmp("MyTaskGrid");
							var flowGrid = Ext.getCmp(this.flowGrid);
							var appHomeTaskGrid = Ext.getCmp('TaskPanelView');
							if (appHomeTaskGrid != null) {
								appHomeTaskGrid.getUpdater().update(__ctxPath
										+ '/flow/displayTask.do');
							}
							if (myTaskGrid != null) {
								myTaskGrid.getStore().reload();
							}
							if (flowGrid != null) {
								flowGrid.getStore().reload();
							}
							if (officePanel) {
								officePanel.closeDoc();
							}
							if(this.gridPanel != undefined){
								this.gridPanel.getStore().reload();
							}
						},
						failure : function(fp, action) {
							Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
						}
					});
		}// end of (form.isValid());

	},// end of next step

	/**
	 * 选中或未选中自由跳转选项
	 * 
	 * @param {}
	 *            ck
	 * @param {}
	 *            checked
	 */
	freeJump : function(ck, checked) {
		if (checked) {
			// 自由跳转
			this.isFreeJump = true;
			this.jumpPanel.remove(this.jumpRadioGroup);
			this.freeTransCombo = new Ext.form.ComboBox({
				fieldLabel : '跳转任务',
				xtype : 'combo',
				allowBlank : false,
				editable : false,
				lazyInit : false,
				// anchor:'96%,96%',
				triggerAction : 'all',
				listeners : {
					scope : this,
					select : function(combo, record, index) {
						var destName = record.data.destName;
						var destType = record.data.destType;
						this.getTaskUsers.call(this, destName, destType);
					}
				},
				store : new Ext.data.ArrayStore({
							autoLoad : true,
							url : __ctxPath
									+ '/flow/freeTransProcessActivity.do?taskId='
									+ this.taskId,
							fields : ['signalName', 'destName', 'destType']
						}),
				displayField : 'destName',
				valueField : 'signalName'
			});
			this.jumpPanel.insert(0, this.freeTransCombo);
			this.jumpPanel.doLayout();
		} else {
			// 非自由跳转
			this.isFreeJump = false;
			this.jumpPanel.remove(this.freeTransCombo);
			this.loadJumpTrans.call(this);
		}
	},
	// 流程退回
	backFlow : function() {
		Ext.Msg.confirm('信息确认', '您确认要回退所选记录吗？', function(btn) {
					if (btn == 'yes') {
						this.formPanel.getForm().submit({
							url : __ctxPath + "/flow/nextProcessActivity.do",
							scope : this,
							params : {
								useTemplate : this.useTemplate,
								taskId : this.taskId,
								destName : this.preTaskName,
								// 回退标志
								back : 'true'
							},
							success : function(response, options) {
								Ext.ux.Toast.msg('操作信息', '成功回退！');
								AppUtil.removeTab('ProcessNextForm_'
										+ this.taskId);
							},
							failture : function(response, options) {
								Ext.ux.Toast.msg('操作信息', '回退失败！');
							}
						});
					}// end if
				},// end of function
				this);
	},
	// 加载流程业务表单回调函数，用于业务数据回调，加上验证，业务字段的权限控制
	getFormHtmlCallback : function() {

		// 加上投票的意见
		if (this.voteSignFieldSet) {
			this.formPanel.add(this.voteSignFieldSet);
		}
		// 加上可以审批的意见
		if(this.activityName!='驳回'){						//为驳回新增判断	如果是驳回就不显示审批意见
			this.formPanel.add(new Ext.form.TextArea({
					name : 'comments',
					anchor : '96%',
					fieldLabel : '审批意见'
				}));
		}
		this.formPanel.doLayout();
		// 使用自定义Ext模板表单
		var formExt = document.getElementById('formTaskExt' + this.taskId);
		if (formExt != null) {
			// 加上标识，表示是使用EXT模板进行
			this.useTemplate = true;
			var valExt = formExt.value;
			valExt = valExt.replace('Ext.form.FormPanel', 'Ext.Panel');
			this.formExtPanel = eval('new (' + valExt + ')();');

			if (this.formExtPanel.afterLoad) {
				this.formExtPanel.afterLoad.call(this.formExtPanel, this);
			}

			this.formPanel.add(this.formExtPanel);
			this.formPanel.doLayout();
			return;
		}
		this.formPanel.doLayout();
		// var formPanel=this.formPanel;
		// //回填数据
		// var form=this.formPanel.getForm().getEl().dom;
		// var fElements = form.elements || (document.forms[form] ||
		// Ext.getDom(form)).elements;
		try {
			var json = document.getElementById('entity_' + this.taskId);
			var rights = document.getElementById('rightstask_' + this.taskId);
			var name, type, value, xtype;
			// 加载JS回调函数
			var callback = function() {
				var entityJson = null;
				if (json != null && json.value) {
					entityJson = Ext.decode(json.value);
				}
				var rightJson = null;
				if (rights != null) {
					rightJson = Ext.decode(rights.value);
				}
				$converDetail.call(this, entityJson, rightJson);
			};
			// 后加载文档的JS
			$ImportSimpleJs(
					[__ctxPath + '/js/core/ntkoffice/NtkOfficePanel.js',
							__ctxPath + '/js/selector/SealSelector.js',
							__ctxPath + '/js/selector/PaintTemplateSelector.js'],
					callback, this);

		} catch (e) {
		}
	},

	/**
	 * 显示流程图
	 */
	showFlowImage : function() {
		var window = new Ext.Window({
					autoScroll : true,
					iconCls : 'btn-flow-chart',
					bodyStyle : 'background-color:white',
					maximizable : true,
					title : '流程示意图',
					width : 600,
					height : 500,
					modal : true,
					layout : 'fit',
					html : '<img src="' + __ctxPath + '/jbpmImage?taskId='
							+ this.taskId + '&rand=' + Math.random() + '"/>'
				});
		window.show();
	},
	/**
	 * 取消
	 * 
	 * @param {}
	 *            window
	 */
	cancel : function() {
		var tabs = Ext.getCmp('centerTabPanel');
		tabs.remove('ProcessNextForm_' + this.taskId);
		this.destroy();
	}
});
