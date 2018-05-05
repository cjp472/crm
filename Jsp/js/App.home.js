/**
 * @author YungLocke
 * @panel AppHome
 */
// 我的绩效
//MyPowerPanelView = Ext.extend(Ext.ux.Portlet, {
//			tools : null,
//			constructor : function(_cfg) {
//				Ext.applyIf(this, _cfg);
//				this.initTool();
//				MyPowerPanelView.superclass.constructor.call(this, {
//							id : 'MyPowerPanelView',
//							title : '我的绩效',
//							iconCls : 'menu-diary',
//							tools : this.tools,
//							autoLoad : {
//								url : __ctxPath
//										+ '/system/displayDiary.do?start=0&limit=8',
//								scripts : true
//							}
//						});
//			},
//			initTool : function() {
//				this.tools = [{
//					id : 'refresh',
//					handler : function() {
//						Ext
//								.getCmp('MyPowerPanelView')
//								.getUpdater()
//								.update(__ctxPath
//										+ '/system/displayDiary.do?start=0&limit=8');
//					}
//				}, {
//					id : 'close',
//					handler : function(e, target, panel) {
//						Ext.Msg.confirm('提示信息', '确认删除此模块吧？', function(btn) {
//									if (btn == 'yes') {
//										panel.ownerCt.remove(panel, true);
//									}
//								});
//					}
//				}];
//			}
//
//		});
// 我的佣金
MyMoneryPanelView = Ext.extend(Ext.ux.Portlet, {
			tools : null,
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				this.initTool();
				MyMoneryPanelView.superclass.constructor.call(this, {
							id : 'MyMoneryPanelView',
							title : '我的佣金',
							iconCls : 'menu-diary',
							tools : this.tools,
							autoLoad : {
								url : __ctxPath
										+ '/system/displayDiary.do?start=0&limit=8',
								scripts : true
							}
						});
			},
			initTool : function() {
				this.tools = [{
					id : 'refresh',
					handler : function() {
						Ext
								.getCmp('MyMoneryPanelView')
								.getUpdater()
								.update(__ctxPath
										+ '/system/displayDiary.do?start=0&limit=8');
					}
				}, {
					id : 'close',
					handler : function(e, target, panel) {
						Ext.Msg.confirm('提示信息', '确认删除此模块吧？', function(btn) {
									if (btn == 'yes') {
										panel.ownerCt.remove(panel, true);
									}
								});
					}
				}];
			}

		});
// 我的培训
//MyTrinPanelView = Ext.extend(Ext.ux.Portlet, {
//			tools : null,
//			constructor : function(_cfg) {
//				Ext.applyIf(this, _cfg);
//				this.initTool();
//				MyTrinPanelView.superclass.constructor.call(this, {
//							id : 'MyTrinPanelView',
//							title : '我的培训',
//							iconCls : 'menu-diary',
//							tools : this.tools,
//							autoLoad : {
//								url : __ctxPath
//										+ '/system/displayDiary.do?start=0&limit=8',
//								scripts : true
//							}
//						});
//			},
//			initTool : function() {
//				this.tools = [{
//					id : 'refresh',
//					handler : function() {
//						Ext
//								.getCmp('MyTrinPanelView')
//								.getUpdater()
//								.update(__ctxPath
//										+ '/system/displayDiary.do?start=0&limit=8');
//					}
//				}, {
//					id : 'close',
//					handler : function(e, target, panel) {
//						Ext.Msg.confirm('提示信息', '确认删除此模块吧？', function(btn) {
//									if (btn == 'yes') {
//										panel.ownerCt.remove(panel, true);
//									}
//								});
//					}
//				}];
//			}
//
//		});
// 我的考试
//MyTexamPanelView = Ext.extend(Ext.ux.Portlet, {
//	tools : null,
//	constructor : function(_cfg) {
//		Ext.applyIf(this, _cfg);
//		this.initTool();
//		MyTexamPanelView.superclass.constructor.call(this, {
//					id : 'MyTexamPanelView',
//					title : '我的考试',
//					iconCls : 'menu-diary',
//					style : 'background:url("images/split_panel.png") repeat-x;',
//					tools : this.tools,
//					autoLoad : {
//						url : __ctxPath
//								+ '/system/displayDiary.do?start=0&limit=8',
//						scripts : true
//					}
//				});
//	},
//	initTool : function() {
//		this.tools = [{
//			id : 'refresh',
//			handler : function() {
//				Ext.getCmp('MyTexamPanelView').getUpdater().update(__ctxPath
//						+ '/system/displayDiary.do?start=0&limit=8');
//			}
//		}, {
//			id : 'close',
//			handler : function(e, target, panel) {
//				Ext.Msg.confirm('提示信息', '确认删除此模块吧？', function(btn) {
//							if (btn == 'yes') {
//								panel.ownerCt.remove(panel, true);
//							}
//						});
//			}
//		}];
//	}
//
//});
// 部门计划
DepPlanPanelView = Ext.extend(Ext.ux.Portlet, {
	tools : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initTool();
		DepPlanPanelView.superclass.constructor.call(this, {
					id : 'DepPlanPanelView',
					title : '部门计划',
					iconCls : 'menu-diary',
					style : 'background:url("images/split_panel.png") repeat-x;',
					tools : this.tools,
					autoLoad : {
						url : __ctxPath
								+ '/system/displayDiary.do?start=0&limit=8',
						scripts : true
					}
				});
	},
	initTool : function() {
		this.tools = [{
			id : 'refresh',
			handler : function() {
				Ext.getCmp('DepPlanPanelView').getUpdater().update(__ctxPath
						+ '/system/displayDiary.do?start=0&limit=8');
			}
		}, {
			id : 'close',
			handler : function(e, target, panel) {
				Ext.Msg.confirm('提示信息', '确认删除此模块吧？', function(btn) {
							if (btn == 'yes') {
								panel.ownerCt.remove(panel, true);
							}
						});
			}
		}];
	}

});
// 新增知识
NewKnowPanelView = Ext.extend(Ext.ux.Portlet, {
	tools : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initTool();
		NewKnowPanelView.superclass.constructor.call(this, {
			id : 'NewKnowPanelView',
			title : '新增知识',
			// baseCls : 'x-panel-header',//设置透明FORM 嵌入页面
			//headerCssClass : 'x-panel-header-red',
			// style : 'background:url("images/split_panel.png") repeat-x;',
			iconCls : 'menu-flowWait',
			tools : this.tools,
			autoLoad : {
				url : __ctxPath
						+ '/know/displayUkSysKnow.do?start=0&limit=10&status=5&isNew=true',
				scripts : true
			}
		});
	},
	initTool : function() {
		this.tools = [{
			id : 'refresh',
			handler : function() {
				Ext
						.getCmp('NewKnowPanelView')
						.getUpdater()
						.update(__ctxPath
								+ '/know/displayUkSysKnow.do?start=0&limit=8&status=5&isNew=true');
			}
		}, {
			id : 'close',
			handler : function(e, target, panel) {
				Ext.Msg.confirm('提示信息', '确认删除此模块吧？', function(btn) {
							if (btn == 'yes') {
								panel.ownerCt.remove(panel, true);
							}
						});
			}
		}];
	}

});
// 热点知识
HotknowPanelView = Ext.extend(Ext.ux.Portlet, {
	tools : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initTool();
		HotknowPanelView.superclass.constructor.call(this, {
			id : 'HotknowPanelView',
			title : '热点知识',
			iconCls : 'menu-dictionary',
			// style : 'background:url("images/split_panel.png") repeat-x;',
			tools : this.tools,
			autoLoad : {
				url : __ctxPath
						+ '/know/displayUkSysKnow.do?start=0&limit=10&status=5&isViewCount=true',
				scripts : true
			}
		});
	},
	initTool : function() {
		this.tools = [{
			id : 'refresh',
			handler : function() {
				Ext
						.getCmp('HotknowPanelView')
						.getUpdater()
						.update(__ctxPath
								+ '/know/displayUkSysKnow.do?start=0&limit=8&status=5&isViewCount=true');
			}
		}, {
			id : 'close',
			handler : function(e, target, panel) {
				Ext.Msg.confirm('提示信息', '确认删除此模块吧？', function(btn) {
							if (btn == 'yes') {
								panel.ownerCt.remove(panel, true);
							}
						});
			}
		}];
	}

});
// 专题知识
CusionKnowPanelView = Ext.extend(Ext.ux.Portlet, {
			tools : null,
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				this.initTool();
				CusionKnowPanelView.superclass.constructor.call(this, {
							id : 'CusionKnowPanelView',
							title : '求索知识',
							iconCls : 'mod-arch',
							tools : this.tools,
							autoLoad : {
								url : __ctxPath
										+ '/xitong/displayUlBbsHuati.do?start=0&limit=10',
								scripts : true
							}
						});
			},
			initTool : function() {
				this.tools = [{
					id : 'refresh',
					handler : function() {
						Ext
								.getCmp('CusionKnowPanelView')
								.getUpdater()
								.update(__ctxPath
										+ '/xitong/displayUlBbsHuati.do?start=0&limit=10');
					}
				}, {
					id : 'close',
					handler : function(e, target, panel) {
						Ext.Msg.confirm('提示信息', '确认删除此模块吧？', function(btn) {
									if (btn == 'yes') {
										panel.ownerCt.remove(panel, true);
									}
								});
					}
				}];
			}

		});


// 个人营销任务
PersonSalePanelView = Ext.extend(Ext.ux.Portlet, {
			tools : null,
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				this.initTool();
				PersonSalePanelView.superclass.constructor.call(this, {
							id : 'PersonSalePanelView',
							title : '我的营销',
							iconCls : 'menu-subDiary',
							tools : this.tools,
							autoLoad : {
								url : __ctxPath + '/outb/homeDisplayTaskObSaletask.do?start=0&limit=8',
								scripts : true
							}
						});
			},
			initTool : function() {
				this.tools = [{
					id : 'refresh',
					handler : function() {
						Ext.getCmp('PersonSalePanelView').getUpdater()
								.update(__ctxPath + '/outb/homeDisplayTaskObSaletask.do?start=0&limit=8');
					}
				}, {
					id : 'close',
					handler : function(e, target, panel) {
						Ext.Msg.confirm('提示信息', '确认删除此模块吧？', function(btn) {
									if (btn == 'yes') {
										panel.ownerCt.remove(panel, true);
									}
								});
					}
				}];
			}

		});
// 我的排班
//MyCountPanelView = Ext.extend(Ext.ux.Portlet, {
//			tools : null,
//			constructor : function(_cfg) {
//				Ext.applyIf(this, _cfg);
//				this.initTool();
//				MyCountPanelView.superclass.constructor.call(this, {
//							id : 'MyCountPanelView',
//							title : '我的排班',
//							iconCls : 'menu-dutySetting',
//							tools : this.tools,
//							autoLoad : {
//								url : __ctxPath
//										+ '/system/displayDiary.do?start=0&limit=8',
//								scripts : true
//							}
//						});
//			},
//			initTool : function() {
//				this.tools = [{
//					id : 'refresh',
//					handler : function() {
//						Ext
//								.getCmp('MyCountPanelView')
//								.getUpdater()
//								.update(__ctxPath
//										+ '/system/displayDiary.do?start=0&limit=8');
//					}
//				}, {
//					id : 'close',
//					handler : function(e, target, panel) {
//						Ext.Msg.confirm('提示信息', '确认删除此模块吧？', function(btn) {
//									if (btn == 'yes') {
//										panel.ownerCt.remove(panel, true);
//									}
//								});
//					}
//				}];
//			}
//
//		});
// 我的客户
MyPersonPanelView = Ext.extend(Ext.ux.Portlet, {
			tools : null,
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				this.initTool();
				MyPersonPanelView.superclass.constructor.call(this, {
							id : 'MyPersonPanelView',
							title : '我的客户',
							iconCls : 'menu-diary',
							tools : this.tools,
							autoLoad : {
								url : __ctxPath
										+ '/system/displayDiary.do?start=0&limit=8',
								scripts : true
							}
						});
			},
			initTool : function() {
				this.tools = [{
					id : 'refresh',
					handler : function() {
						Ext.getCmp('MyPersonPanelView').getUpdater().update(__ctxPath + '/system/displayDiary.do?start=0&limit=8');
					}
				}, {
					id : 'close',
					handler : function(e, target, panel) {
						Ext.Msg.confirm('提示信息', '确认删除此模块吧？', function(btn) {
							if (btn == 'yes') {
								panel.ownerCt.remove(panel, true);
							}
						});
					}
				}];
			}

		});

// 首页的设置
// 日志模块
DiaryPanelView = Ext.extend(Ext.ux.Portlet, {
			tools : null,
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				this.initTool();
				DiaryPanelView.superclass.constructor.call(this, {
							id : 'DiaryPanelView',
							title : '我的日志',
							iconCls : 'menu-diary',
							tools : this.tools,
							autoLoad : {
								url : __ctxPath
										+ '/system/displayDiary.do?start=0&limit=8',
								scripts : true
							}
						});
			},
			initTool : function() {
				this.tools = [{
					id : 'refresh',
					handler : function() {
						Ext.getCmp('DiaryPanelView').getUpdater().update(__ctxPath + '/system/displayDiary.do?start=0&limit=8');
					}
				}, {
					id : 'close',
					handler : function(e, target, panel) {
						Ext.Msg.confirm('提示信息', '确认删除此模块吧？', function(btn) {
							if (btn == 'yes') {
								panel.ownerCt.remove(panel, true);
							}
						});
					}
				}];
			}

		});
// 新闻模块
// NewsPanelView = Ext.extend(Ext.ux.Portlet, {
// tools : null,
// constructor : function(_cfg) {
// Ext.applyIf(this, _cfg);
// this.initTool();
// NewsPanelView.superclass.constructor.call(this, {
// id : 'NewsPanelView',
// title : '新闻中心',
// iconCls:'menu-news',
// tools : this.tools,
// autoLoad:{
// url:__ctxPath+ '/pages/indexpages/newsListPage.jsp?sectionId=1'
// }
// });
// },
// initTool : function() {
// this.tools = [{
// id : 'refresh',
// handler : function() {
// Ext.getCmp('NewsPanelView').getUpdater().update(__ctxPath+
// '/info/displayNews.do');
// }
// }];
// }
//
// });
// 个人消息模块
MessagePanelView = Ext.extend(Ext.ux.Portlet, {
			tools : null,
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				this.initTool();
				MessagePanelView.superclass.constructor.call(this, {
					id : 'MessagePanelView',
					title : '消息通知',
					iconCls : 'menu-message',
					tools : this.tools,
					autoLoad : {
						url : __ctxPath + '/info/displayInMessage.do?start=0&limit=10'
					}
				});
			},
			initTool : function() {
				this.tools = [{
					id : 'refresh',
					handler : function() {
						Ext.getCmp('MessagePanelView').getUpdater().update(__ctxPath	+ '/info/displayInMessage.do?start=0&limit=10');
					}
//				}, {
//					id : 'close',
//					handler : function(e, target, panel) {
//						Ext.Msg.confirm('提示信息', '确认删除此模块吧？', function(btn) {
//							if (btn == 'yes') {
//								panel.ownerCt.remove(panel, true);
//							}
//						});
//					}
				}];
			}

		});
// 公告模块
NoticePanelView = Ext.extend(Ext.ux.Portlet, {
			tools : null,
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				this.initTool();
				NoticePanelView.superclass.constructor.call(this, {
					id : 'NoticePanelView',
					title : '新闻公告',
					iconCls : 'menu-notice',
					tools : this.tools,
					autoLoad : {
						url : __ctxPath
								+ '/info/displayNoticeNews.do?start=0&limit=10'
					}
				});
			},
			initTool : function() {
				this.tools = [{
					id : 'refresh',
					handler : function() {
						Ext.getCmp('NoticePanelView').getUpdater().update(__ctxPath	+ '/info/displayNoticeNews.do?start=0&limit=10');
					}
				}, {
					id : 'close',
					handler : function(e, target, panel) {
						Ext.Msg.confirm('提示信息', '确认删除此模块吧？', function(btn) {
							if (btn == 'yes') {
								panel.ownerCt.remove(panel, true);
							}
						});
					}
				}];
			}

		});
// 待办事项
TaskPanelView = Ext.extend(Ext.ux.Portlet, {
	tools : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initTool();
		TaskPanelView.superclass.constructor.call(this, {
			id : 'TaskPanelView',
			title : '待办工单',
			iconCls : 'menu-flowWait',
			tools : this.tools,
			autoLoad : {
				url : __ctxPath
						+ '/flow/displayTask.do?start=0&limit=10&runStatus=1&orderBy=duedate_&taskUser='
						+ curUserInfo.userId,
				scripts : true
			}
		});
	},
	initTool : function() {
		this.tools = [{
			id : 'refresh',
			handler : function() {
				Ext
						.getCmp('TaskPanelView')
						.getUpdater()
						.update(__ctxPath
								+ '/flow/displayTask.do?start=0&limit=10&runStatus=1&orderBy=duedate_&taskUser='
								+ curUserInfo.userId);
			}
		}, {
			id : 'close',
			handler : function(e, target, panel) {
				Ext.Msg.confirm('提示信息', '确认删除此模块吧？', function(btn) {
							if (btn == 'yes') {
								panel.ownerCt.remove(panel, true);
							}
						});
			}
		}];
	}

});
// 我的日程
CalendarPlanPanelView = Ext.extend(Ext.ux.Portlet, {
	tools : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initTool();
		CalendarPlanPanelView.superclass.constructor.call(this, {
					id : 'CalendarPlanPanelView',
					title : '我的日程',
					iconCls : 'menu-cal-plan-view',
					tools : this.tools,
					autoLoad : {
						url : __ctxPath
								+ '/task/displayCalendarPlan.do?start=0&limit=8'
					}
				});
	},
	initTool : function() {
		this.tools = [{
			id : 'refresh',
			handler : function() {
				Ext
						.getCmp('CalendarPlanPanelView')
						.getUpdater()
						.update(__ctxPath
								+ '/task/displayCalendarPlan.do?start=0&limit=8');
			}
		}, {
			id : 'close',
			handler : function(e, target, panel) {
				Ext.Msg.confirm('提示信息', '确认删除此模块吧？', function(btn) {
							if (btn == 'yes') {
								panel.ownerCt.remove(panel, true);
							}
						});
			}
		}];
	}

});
// 我的计划
MyPlanPanelView = Ext.extend(Ext.ux.Portlet, {
			tools : null,
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				this.initTool();
				MyPlanPanelView.superclass.constructor.call(this, {
							id : 'MyPlanPanelView',
							title : '我的计划',
							iconCls : 'menu-myplan',
							tools : this.tools,
							autoLoad : {
								url : __ctxPath
										+ '/task/displayWorkPlan.do?start=0&limit=8',
								scripts : true
							}
						});
			},
			initTool : function() {
				this.tools = [{
					id : 'refresh',
					handler : function() {
						Ext
								.getCmp('MyPlanPanelView')
								.getUpdater()
								.update(__ctxPath
										+ '/task/displayWorkPlan.do?start=0&limit=8');
					}
				}, {
					id : 'close',
					handler : function(e, target, panel) {
						Ext.Msg.confirm('提示信息', '确认删除此模块吧？', function(btn) {
									if (btn == 'yes') {
										panel.ownerCt.remove(panel, true);
									}
								});
					}
				}];
			}

		});

// 桌面新闻
// DeskNewsPanelView= Ext.extend(Ext.ux.Portlet, {
// tools : null,
// constructor : function(_cfg) {
// Ext.applyIf(this, _cfg);
// this.initTool();
// DeskNewsPanelView.superclass.constructor.call(this, {
// id : 'DeskNewsPanelView',
// title : '桌面新闻',
// iconCls:'menu-news',
// tools : this.tools,
// border:false,
// height:330,
// autoLoad:{
// url:__ctxPath+'/info/imageNews.do',
// scripts:true
// }
// });
// },
// initTool : function() {
// this.tools = [{
// id : 'refresh',
// handler : function() {
// Ext.getCmp('DeskNewsPanelView').getUpdater().update({url:__ctxPath+'/info/imageNews.do',
// scripts:true});
// }
// }, {
// id : 'close',
// handler : function(e, target, panel) {
// Ext.Msg.confirm('提示信息', '确认删除此模块吧？', function(btn) {
// if (btn == 'yes') {
// panel.ownerCt.remove(panel, true);
// }
// });
// }
// }];
// }
//
// });
// 滚动的公告
// NoticeScollPanelView= Ext.extend(Ext.ux.Portlet, {
// tools : null,
// constructor : function(_cfg) {
// Ext.applyIf(this, _cfg);
// this.initTool();
// NoticeScollPanelView.superclass.constructor.call(this, {
// id : 'NoticeScollPanelView',
// title : '滚动公告栏',
// iconCls:'menu-notice',
// tools : this.tools,
// autoLoad:{
// url:__ctxPath+ '/info/scrollerNotice.do?',
// scripts:true
// }
// });
// },
// initTool : function() {
// this.tools = [
// {
// id : 'refresh',
// handler : function() {
// Ext.getCmp('NoticeScollPanelView').getUpdater().update({url:__ctxPath+
// '/info/scrollerNotice.do',scripts:true});
// }
// },
// {
// id : 'close',
// handler : function(e, target, panel) {
// Ext.Msg.confirm('提示信息', '确认删除此模块吧？', function(btn) {
// if (btn == 'yes') {
// panel.ownerCt.remove(panel, true);
// }
// });
// }
// }];
// }
//
// });

// 个人文档
MyDocumentPanelView = Ext.extend(Ext.ux.Portlet, {
	tools : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initTool();
		MyDocumentPanelView.superclass.constructor.call(this, {
					id : 'MyDocumentPanelView',
					title : '我的文档',
					iconCls : 'menu-document',
					tools : this.tools,
					autoLoad : {
						url : __ctxPath
								+ '/document/displayDocument.do?start=0&limit=8'
					}
				});
	},
	initTool : function() {
		this.tools = [{
			id : 'refresh',
			handler : function() {
				Ext.getCmp('MyDocumentPanelView').getUpdater().update(__ctxPath
						+ '/document/displayDocument.do?start=0&limit=8');
			}
		}, {
			id : 'close',
			handler : function(e, target, panel) {
				Ext.Msg.confirm('提示信息', '确认删除此模块吧？', function(btn) {
							if (btn == 'yes') {
								panel.ownerCt.remove(panel, true);
							}
						});
			}
		}];
	}

});
// 我的邮件
MyMailPanelView = Ext.extend(Ext.ux.Portlet, {
			tools : null,
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				this.initTool();
				MyMailPanelView.superclass.constructor.call(this, {
					id : 'MyMailPanelView',
					title : '我的邮件',
					iconCls : 'menu-mail',
					tools : this.tools,
					autoLoad : {
							url : __ctxPath + '/communicate/displayMail.do?start=0&limit=8'
						}
					});
			},
			initTool : function() {
				this.tools = [{
					id : 'refresh',
						handler : function() {
						 	Ext.getCmp('MyMailPanelView').getUpdater().update(__ctxPath + '/communicate/displayMail.do?start=0&limit=8');
						 }
					}, {
						id : 'close',
						handler : function(e, target, panel) {
							Ext.Msg.confirm('提示信息', '确认删除此模块吧？', function(btn) {
										if (btn == 'yes') {
											panel.ownerCt.remove(panel, true);
										}
									});
						}
				}];
			}

		});
// 部门计划
DepPlanPanelView = Ext.extend(Ext.ux.Portlet, {
			tools : null,
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				this.initTool();
				DepPlanPanelView.superclass.constructor.call(this, {
							id : 'DepPlanPanelView',
							title : '部门计划',
							iconCls : 'menu-depplan',
							tools : this.tools,
							autoLoad : {
								url : __ctxPath + '/task/displayDepWorkPlan.do'// ,scripts:true
							}
						});
			},
			initTool : function() {
				this.tools = [{
					id : 'refresh',
					handler : function() {
						Ext.getCmp('DepPlanPanelView').getUpdater()
								.update(__ctxPath
										+ '/task/displayDepWorkPlan.do');
					}
				}, {
					id : 'close',
					handler : function(e, target, panel) {
						Ext.Msg.confirm('提示信息', '确认删除此模块吧？', function(btn) {
									if (btn == 'yes') {
										panel.ownerCt.remove(panel, true);
									}
								});
					}
				}];
			}

		});

// 模板选择器
PanelSelectorWin = Ext.extend(Ext.Window, {
			formPanel : null,
			buttons : null,
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				this.initUI();
				PanelSelectorWin.superclass.constructor.call(this, {
							id : 'PanelSelectorWin',
							title : '选择显示模块',
							layout : 'fit',
							height : 320,
							width : 300,
							modal : true,
							defaults : {
								padding : '5'
							},
							buttons : this.buttons,
							buttonAlign : 'center',
							items : this.formPanel
						});
			},
			initUI : function() {
				this.formPanel = new Ext.FormPanel({
							id : 'PanelSelectorForm',
							layout : 'column',
							items : [{
										layout : 'form',
										columnWidth : .5,
										border : false,
										items : [ {
													xtype : 'checkbox',
													boxLabel : '待办工单',
													hideLabel : true,
													id : 'TaskPanelViewCheckBox',
													name : 'TaskPanelView'
												}, {
													xtype : 'checkbox',
													boxLabel : '我的营销',
													hideLabel : true,
													id : 'PersonSalePanelViewCheckBox',
													name : 'PersonSalePanelView'
												}, {
													xtype : 'checkbox',
													boxLabel : '新闻公告',
													hideLabel : true,
													id : 'NoticePanelViewCheckBox',
													name : 'NoticePanelView'
												}, {
													xtype : 'checkbox',
													boxLabel : '我的邮件',
													hideLabel : true,
													id : 'MyMailPanelViewCheckBox',
													name : 'MyMailPanelView'
												}, {
													xtype : 'checkbox',
													boxLabel : '我的佣金',
													hideLabel : true,
													id : 'MyMoneryPanelViewCheckBox',
													name : 'MyMoneryPanelView'
												}
										// {
										// xtype : 'checkbox',
										// boxLabel : '我的日志',
										// hideLabel : true,
										// id : 'DiaryPanelViewCheckBox',
										// name : 'DiaryPanelView'
										// },
										// {
										// xtype : 'checkbox',
										// hideLabel : true,
										// boxLabel : '我的约会',
										// id : 'AppointmentPanelViewCheckBox',
										// name : 'AppointmentPanelView'
										// }, {
										// xtype : 'checkbox',
										// boxLabel : '我的日程',
										// hideLabel : true,
										// id : 'CalendarPlanPanelViewCheckBox',
										// name : 'CalendarPlanPanelView'
										// }, {
										// xtype : 'checkbox',
										// boxLabel : '部门计划',
										// hideLabel : true,
										// id : 'DepPlanPanelViewCheckBox',
										// name : 'DepPlanPanelView'
										// }, {
										// xtype : 'checkbox',
										// boxLabel : '我的客户',
										// hideLabel : true,
										// id : 'MyPersonPanelViewCheckBox',
										// name : 'MyPersonPanelView'
										// }

										]
									}, {
										layout : 'form',
										columnWidth : .5,
										border : false,
										items : [
												// {
												// xtype : 'checkbox',
												// hideLabel : true,
												// boxLabel : '我的计划',
												// id :
												// 'MyPlanPanelViewCheckBox',
												// name : 'MyPlanPanelView'
												// },
												// {
												// xtype:'checkbox',
												// boxLabel:'桌面新闻',
												// hideLabel:true,
												// id:'DeskNewsPanelViewCheckBox',
												// name:'DeskNewsPanelView'
												// },{
												// xtype:'checkbox',
												// boxLabel:'滚动公告栏',
												// hideLabel:true,
												// id:'NoticeScollPanelViewCheckBox',
												// name:'NoticeScollPanelView'
												// },
												// {
												// xtype : 'checkbox',
												// boxLabel : '我的文档',
												// hideLabel : true,
												// id :
												// 'MyDocumentPanelViewCheckBox',
												// name : 'MyDocumentPanelView'
												// },
												{
											xtype : 'checkbox',
											boxLabel : '新增知识',
											hideLabel : true,
											id : 'NewKnowPanelViewCheckBox',
											name : 'NewKnowPanelView'
										}, {
											xtype : 'checkbox',
											boxLabel : '热点知识',
											hideLabel : true,
											id : 'HotknowPanelViewCheckBox',
											name : 'HotknowPanelView'
										}, {
											xtype : 'checkbox',
											boxLabel : '求索知识',
											hideLabel : true,
											id : 'CusionKnowPanelViewCheckBox',
											name : 'CusionKnowPanelView'
										}]
									}]
						});
				// 将已经显示的PORTALITEM勾上
				var portal = Ext.getCmp('Portal');
				curUserInfo.portalConfig = [];
				var items = portal.items;
				for (var i = 0; i < items.length; i++) {
					var v = items.itemAt(i);
					for (var j = 0; j < v.items.getCount(); j++) {
						var m = v.items.itemAt(j);
						var portalItem = new PortalItem(m.id, i, j);
						curUserInfo.portalConfig.push(portalItem);
					}
				}
				var confs = curUserInfo.portalConfig;
				for (var i = 0; i < confs.length; i++) {
					var panelView = confs[i].panelId;
					var panelCheck = Ext.getCmp(panelView + 'CheckBox');
					if (panelCheck != null) {
						panelCheck.setValue(true);
						panelCheck.disable();
					}
				}

				this.buttons = [{
					xtype : 'button',
					text : '确定',
					iconCls : 'btn-save',
					handler : function() {
						var fd = Ext.getCmp('PortalItem');
						var portal = Ext.getCmp('Portal');
						var array = ['DiaryPanelView', 'TaskPanelView',
								'CalendarPlanPanelView',
								'MyPlanPanelView',
								'MyDocumentPanelView', 'MyMailPanelView',
								'PersonSalePanelView',
								'MyPersonPanelView', 'DepPlanPanelView',
								'NewKnowPanelView', 'HotknowPanelView',
								'CusionKnowPanelView',
								'NoticePanelView',
								'MyMoneryPanelView' ];
						for (var v = 0; v < array.length; v++) {
							var check = Ext.getCmp(array[v] + 'CheckBox');
							if (check != null) {
								if (check.getValue()
										&& Ext.getCmp(array[v]) == null) {
									var panel = eval('new ' + array[v] + '()');
									fd.add(panel);
								}
							}
						}
						fd.doLayout();
						portal.doLayout();
						Ext.getCmp('PanelSelectorWin').close();
					}
				}, {
					xtype : 'button',
					text : '取消',
					iconCls : 'btn-cancel',
					handler : function() {
						Ext.getCmp('PanelSelectorWin').close();
					}
				}]
			}
		});

var currentUser = null;
// 获取当前用户信息
var getCurrentUser = function() {
	var responsea = Ext.lib.Ajax.getConnectionObject().conn;
	responsea.open("POST", __ctxPath + '/system/getMySelfAppUser.do', false);
	responsea.send(null);
	currentUser = Ext.util.JSON.decode(responsea.responseText);
	// return responsea.responseText;

}

AppHome = Ext.extend(Ext.Panel, {
	portalPanel : null,
	toolbar : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();

		AppHome.superclass.constructor.call(this, {
					title : '个人桌面',
					closable : false,
					id : 'AppHome',
					border : false,
					region : 'center',
					iconCls : 'menu-desktop',
					// layout : 'fit',
					defaults : {
						padding : '0 5 0 0'
					},
					tbar : this.toolbar,
					items : [AppShowGrid(),
							// {
							// xtype : 'fieldset',
							// // title : "用户信息",
							// collapsible : false,
							// height : 150,
							// border : true,
							// layout : 'fit',
							// title : '待办任务',
							// iconCls : 'menu-diary',
							// defaults : {
							// anchor : '90%,100%'
							// },
							// items : []
							// },
							// items : [{
							// height : 150,
							// border : false,
							// layout : 'column',
							// items : [{
							// border : false,
							// columnWidth : .2,
							// bodyStyle :
							// 'background:transparent;text-align:center;padding-top:5px',
							// html : '<img src="'
							// + __ctxPath
							// + (currentUser.user.photo != 'null'
							// ? currentUser.user.photo
							// : '/images/default_image_male.jpg')
							// + '" style="height:140px"/>'
							// }, {
							// border : false,
							// columnWidth : .3,
							// bodyStyle : 'background:transparent;',
							// html : '<div style="padding:10px
							// 0"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;姓名：</span><span>'
							// + currentUser.user.ulEmployee.fullname
							// + '</span></div><div style="padding:10px
							// 0"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类型：</span><span>'
							// + UTP001.get(currentUser.user.userType)
							// + '</span></div><div style="padding:10px
							// 0"><span>&nbsp;&nbsp;&nbsp;&nbsp;所在机构：</span><span>'
							// + currentUser.user.ulEmployee.depname
							// + '</span></div><div style="padding:10px
							// 0"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用户组：</span><span>'
							// + (currentUser.user.usergroupName != undefined
							// ? currentUser.user.usergroupName
							// : "") + '</span></div>'
							// }, {
							// border : false,
							// columnWidth : .25,
							// bodyStyle : 'background:transparent;',
							// html : '<div style="padding:10px
							// 0"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;工号：</span><span>'
							// + currentUser.user.ulEmployee.gonghao
							// + '</span></div><div style="padding:10px
							// 0"><span>&nbsp;&nbsp;&nbsp;&nbsp;开始时间：</span><span
							// id="change_currentUser_beginDate" >'
							// + currentUser.user.beginDate.substr(0, 10)
							// + '</span></div><div style="padding:10px
							// 0"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;职位：</span><span>'
							// + (currentUser.user.ulEmployee.zhiwei != null
							// ? ZW001
							// .get(currentUser.user.ulEmployee.zhiwei)
							// : "")
							// + '</span></div><div style="padding:10px
							// 0"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;角色：</span><span>'
							// + currentUser.user.roleName + '</span></div>'
							// }, {
							// border : false,
							// columnWidth : .25,
							// bodyStyle : 'background:transparent;',
							// html : '<div style="padding:10px
							// 0"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用户名：</span><span>'
							// + currentUser.user.username
							// + '</span></div><div style="padding:10px
							// 0"><span>&nbsp;&nbsp;&nbsp;&nbsp;结束时间：</span><span
							// id="change_currentUser_endDate" >'
							// + currentUser.user.endDate.substr(0, 10)
							// + '</span></div>'
							// }]
							// }]
							// },
							this.portalPanel]
				});
	},
	initUIComponents : function() {
		/*
		 * var user = null; Ext.Ajax.request( { url : __ctxPath +
		 * '/system/getMySelfAppUser.do', method : 'post', async :
		 * false,//同步请求数据 success : function(result,request) {alert('aa'); var
		 * res = Ext.util.JSON.decode(result.responseText); alert(res.success);
		 * if(res.success == true){ user = res; }else{ Ext.ux.Toast.msg('操作提示',
		 * '对不起，加载个人信息失败！'); } }, failure : function() {alert('bb')
		 * Ext.ux.Toast.msg('操作提示', '对不起，加载个人信息失败！'); var aa =
		 * {success:true,user:{"username":"admin","accessionTime":"null","endDate":"2012-08-09
		 * 00:00:00.0","beginDate":"2012-05-11
		 * 00:00:00.0","photo":"null","userType":1,"roleName":"超级管理员","usergroupName":"","ulEmployee":{"fullname":"姚旭","depname":"研发部","gonghao":"43","zhiwei":2}}}
		 * 
		 * user = aa; } });
		 */
		getCurrentUser();
		this.toolbar = new Ext.Toolbar({
			height : 30,

			style : 'background:url("images/split_panel.png") repeat-x;',
			items : [{
						xtype : 'tbitem',
						style : 'margin-left:10px;margin-right:10px;',
						html : '<img src="images/user_logo.png" />'
					},{
						xtype : 'tbtext',
						text : '欢迎您&nbsp;<font color="#0c8000" >'
								+ (currentUser.user.ulEmployee?currentUser.user.ulEmployee.fullname:'')
								+ '</font>'
					}, 
//						{
//						xtype : 'tbtext',
//						style : 'margin-left:10px;margin-right:10px;',
//						text : '上次登录时间:&nbsp;'
//								+ currentUser.user.beginDate.substr(0, 10)
//					},
					{
						xtype : 'tbtext',
						style : 'margin-right:2px;',
						text : '密码过期时间:&nbsp;'
								+ currentUser.user.endDate.substr(0, 10)
					}, {
						tooltip : '密码修改',
						xtype : 'button',
						// icon : 'images/password-change.png',
						// width:32,
						text : '<img style="margin-top:-2px;" src="images/password-change.png" />',
						// iconCls : 'big_icon' ,
						// style:'background:url("images/password-change.png");',
						// scale : 'large',
						handler : function() {
							loginPwdCheck(userInfo, true);
						}
					}, '->', {
						xtype : 'button',
						text : '模块添加',
						iconCls : 'btn-add',
						handler : function() {
							new PanelSelectorWin().show();
						}
					}, '-', {
						xtype : 'button',
						text : '配置保存',
						iconCls : 'btn-save',
						handler : function() {
							var portal = Ext.getCmp('Portal');
							curUserInfo.portalConfig = [];
							var items = portal.items;
							for (var i = 0; i < items.length; i++) {
								var v = items.itemAt(i);
								for (var j = 0; j < v.items.getCount(); j++) {
									var m = v.items.itemAt(j);
									var portalItem = new PortalItem(m.id, i, j);
									curUserInfo.portalConfig.push(portalItem);
								}
							}
							Ext.Ajax.request({
								method : 'post',
								url : __ctxPath + '/system/saveIndexDisplay.do',
								success : function(request) {
									Ext.ux.Toast.msg('操作信息', '保存成功');
								},
								failure : function(request) {
									Ext.MessageBox.show({
												title : '操作信息',
												msg : '信息保存出错，请联系管理员！',
												buttons : Ext.MessageBox.OK,
												icon : 'ext-mb-error'
											});
								},
								params : {
									items : Ext.encode(curUserInfo.portalConfig)
								}
							});
						}
					},{
						tooltip : '授权密码修改',
						xtype : 'button',
						icon : 'images/mod-yonghu.png',
						text : '<img style="margin-top:-2px;" src="images/password-change.png" />',
						handler : function() {
							arrPwdCheck(userInfo, true);
						}
					},{
						tooltip : '测试',
						xtype : 'button',
						//icon : 'images/mod-yonghu.png',
						text : '测试功能',
						handler : function() {
							//arrPwdCheck(userInfo, true);
							lert();
						}
					}]
		});
		
		
/**
 * 
 * HY 2014/3/4
 * 事件录入 测试代码
 */
var lert = function() {
	var formPanel = new Ext.FormPanel({
				//url : __ctxPath + '/system/resetArrpwdAppUser.do',
				layout : 'form',
				id : 'test1',
				frame : true,
				defaults : {
					widht : 400,
					anchor : '97%,97%'
				},
				defaultType : 'textfield',
				items : [{
							fieldLabel : '事件类型',
							id : 'conHisType',
							name : 'CHtype',
							xtype : 'mtdiccombolocal',
							itemKey : 'CONHISTYPE001',
							listeners : {
								select : function(combobox, record, index) {
									if(index == 0){
										Ext.getCmp('conHisBus').setDisabled(false);
									}else{
										Ext.getCmp('conHisBus').setDisabled(true);
										Ext.getCmp('conHisDZQD').setDisabled(true);
										Ext.getCmp('conHisDZQD').reset();
										Ext.getCmp('conHisBus').reset();
									}
								}
							}
						}, {
							fieldLabel : '办理业务',
							disabled : true,
							xtype : 'mtdiccombolocal',
							id : 'conHisBus',
							name : 'CHBus',
							itemKey : 'CONHISTYPE002',
							blankText : '请选择业务',
							listeners : {
								select : function(combobox, record, index) {
									if(index == 1){
										Ext.getCmp('conHisDZQD').setDisabled(false);
									}else{
										Ext.getCmp('conHisDZQD').setDisabled(true);
										Ext.getCmp('conHisDZQD').reset();
									}
								}
							}
						},{
							fieldLabel : '电子渠道',
							disabled : true,
							id : 'conHisDZQD',
							name : 'CHdzqd',
							blankText : '请选择电子渠道',
							xtype : 'mtdiccombolocal',
							itemKey : 'CONHISTYPE003',
							listeners : {
								select : function(combobox, record, index) {
									
								}
							}
						}]
			});

	var setPassword = new Ext.Window({
		title : "事件录入",
		iconCls : 'btn-password',
		width : 300,
		height : 180,
		modal : true,
		layout : 'anchor',
		bodyStyle : 'padding:5px;',
		buttonAlign : 'center',
		items : [formPanel],
		closable : false,
		buttons : [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				if(Ext.get('CHtype').getValue() == '业务办理'){
					if(Ext.get('CHBus').getValue() == ''){
						alert("请选择业务办理类型");
					}else{
						if(Ext.get('CHBus').getValue() == '电子渠道'){
							if(Ext.get('CHdzqd').getValue() == ''){
								alert("请选择电子渠道类型");
							}
						}
					}
				}
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
					setPassword.close();
			}
		}]
	});
	setPassword.show();
};
		
		

		var tools = [{
					id : 'gear',
					handler : function() {
						Ext.Msg.alert('Message',
								'The Settings tool was clicked.');
					}
				}, {
					id : 'close',
					handler : function(e, target, panel) {
						panel.ownerCt.remove(panel, true);
					}
				}];

		var confs = curUserInfo.portalConfig;

		if (confs == null || confs == undefined || confs.length < 1) {
			confs = new Array();
			var p1 = {
				panelId : 'MessagePanelView',
				column : 1,
				row : 0
			};
			var p2 = {
				panelId : 'CalendarPlanPanelView',
				column : 0,
				row : 1
			};
			var p3 = {
				panelId : 'TaskPanelView',
				column : 0,
				row : 0
			};
			confs.push(p3);
//			confs.push(p2);
			confs.push(p1);
		}
		var column0 = [];
		var column1 = [];
		for (var v = 0; v < confs.length; v++) {
			if (confs[v].column == 0) {
				column0.push(eval('new ' + confs[v].panelId + '()'));
			} else {
				column1.push(eval('new ' + confs[v].panelId + '()'));
			}
		}
		this.portalPanel = {
			id : 'Portal',
			xtype : 'portal',
			anchor : '98%,98%',
			autoHeight : true,
			border : false,
			items : [{
						columnWidth : .5,
						style : 'padding:0 0 10px 10px',
						id : 'PortalItem',
						items : column0
					}, {
						columnWidth : .5,
						style : 'padding:0 26px 10px 10px',
						items : column1
					}]
		};

	}

});
AppShowGrid = function() {
	var cm = new Ext.grid.ColumnModel({
		columns : [{
					header : 'planId',
					dataIndex : 'planId',
					hidden : true
				}, {
					header : 'urgent',
					id : 'urgent_form',
					dataIndex : 'urgent',
					hidden : true
				
				}, {
					header : '紧急程度',
					width : 20,
					dataIndex : 'status',
					renderer : function(value, cls, record) {
						var urgent = record.data.urgent
						var completeDate = record.data.completeTime
						var newDate = new Date().format('Y-m-d h:m:s');
						var resultImg;
						if (urgent == 0) {
							resultImg = '<img src="'
									+ __ctxPath
									+ '/images/task/important.gif" title="紧急"/>'
						} else {
							resultImg = '';
						}
						if (completeDate != null && completeDate != undefined
								&& completeDate != '') {
							if (newDate.toString() > completeDate) {
								resultImg += '<img src="'
										+ __ctxPath
										+ '/images/task/reminder.gif" title="过期"/>';
							}
						}
						return resultImg;
					}
				}, {
					header : '任务类型',
					width : 30,
					dataIndex : 'taskType',
					renderer : function(value) {
						if (value != '' || value=='0') {
							return CONFX.get(value);
						} else {
							return ' ';
						}
					}
				}, {
					header : '任务类别',
					width : 30,
					dataIndex : 'taskCategory',
					renderer : function(value) {
						if (value != '' || value=='0') {
							return CONTPJYLX.get(value);
						} else {
							return ' ';
						}

					}
				}, {
					
					header : '任务事项',
					width : 30,
					dataIndex : 'taskBusiType',
					renderer : function(value) {
						if (value != '' || value=='0') {
							return CONTPCLJG.get(value);
						} else {
							return ' ';
						}

					}
				},{
					width : 80,
					header : '标题',
					dataIndex : 'taskTitle'
				
				},  {
					header : '要求完成时间',
					id : 'completeTime_form',
					dataIndex : 'completeTime',
					width : 50,
					format : 'Y-m-d H:i:s'
					
				}, {
					header : '分配人',
					width : 30,
					dataIndex : 'assignerName'
				}
		// ,{
		// header : '状态',
		// width: 60,
		// dataIndex : 'status',
		// renderer:function(value){
		// if(value==0){
		// return "未处理";
		// }else if(value==1){
		// return "处理中";
		// }else if(value==2){
		// return "已完成";
		// }else{
		// return "已取消";
		// }
		// }
		// }
		],
		defaults : {
			sortable : true,
			menuDisabled : false,
			width : 80
		}
	});

	var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
				url : __ctxPath + '/task/listTopPlanCalendarPlan.do?Q_executor_L_EQ='+curUserInfo.userId
			}),
			reader : new Ext.data.JsonReader({
				root : 'result',
				totalProperty : 'totalCounts',
				id : 'id',
				fields : [{
						name : 'planId',
						type : 'int'
					}
					, 'startTime', 'endTime', 'urgent',
					'content', 'status', 'userId', 'fullname',
					'assignerId', 'assignerName', 'feedback',
					'showStyle', 'taskType', 'taskCategory',
					'completeTime', 'taskBusiType', 'taskTitle','dicTaskCategory','dicTaskType','dicBusiType']
			}),
			remoteSort : true
		});
		store.load({
		params : {
			start : 0,
			limit : 25
		}
	});
	var padding;
	if (Ext.isIE) {
		padding = '32px';
	} else {
		padding = '12px';
	}
	var grid = new Ext.grid.GridPanel({
		region : 'center',
		anchor : '100%,96%',
		style : 'padding:10px ' + padding + ' 10px 10px',
		height : 200,
		border : true,
		title : '<img style="height:16px;float:left;" src="images/menus/task/diary.png" /><div style="height:16px;float:left;margin-left:5px;" >待办任务</div><div style="float:right;" ><a onclick="renderToThePointTab(\'addCalendarPlanForm\')" href="#">新建</a>&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="App.clickTopTab(\'ToDoPlanView\')" href="#">更多...</a></div>',
		// iconCls : 'menu-diary',
		// id : 'CalendarPlanGrid',
		// tbar : this.topbar(),
		store : store,
		hideHeaders : false,// 隐藏表头
		trackMouseOver : true,
		disableSelection : false,
		loadMask : true,
		cm : cm,
		viewConfig : {
			forceFit : true,
			enableRowBody : false,
			showPreview : false
		}
	});
	grid.addListener('rowclick', function(grid, rowindex, e) {
		var grid = grid;
		var rowindex = rowindex;
		var e = e;
		$ImportSimpleJs([__ctxPath+ '/js/task/CalendarPlanHandleForm.js'], function() {
			var tabs = Ext.getCmp('centerTabPanel');
			var aForm = Ext.getCmp('CalendarPlanHandleFormWin');
			if (aForm != null) {
				tabs.remove('CalendarPlanHandleFormWin');
			}
			aForm = new CalendarPlanHandleForm({
						planId : grid.getStore().getAt(rowindex).get('planId')
					});
			tabs.add(aForm);
			tabs.activate(aForm);
		}, this);

	});
	// var elments = Ext.select(".x-panel");//.x-grid3-hd
	// elments.each(function(el) {
	// // el.setStyle("background-color", '#CBBC82');// 设置不同的颜色
	// el.setStyle("background-image", 'none');
	// }, this) ;
	return grid;
}

var renderToThePointTab = function(point) {
	$ImportSimpleJs([__ctxPath + '/js/task/addCalendarPlanForm.js'], function() {
		var tabs = Ext.getCmp('centerTabPanel');
		var aForm = Ext.getCmp(point + 'Win');
		if (aForm != null) {
			tabs.remove(point + 'Win');
		}
		aForm = eval('new ' + point + '()');
		tabs.add(aForm);
		tabs.activate(aForm);
	}, this);

}