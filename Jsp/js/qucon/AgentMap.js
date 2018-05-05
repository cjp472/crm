/**
 * @author:cf0666@gmail.com
 * @class QcCheckView
 * @extends Ext.Panel
 * @description [QcCheck]管理
 * @company 优创融联科技
 * @createtime:
 */
AgentMap = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 调用父类构造
				AgentMap.superclass.constructor.call(this, {
							id : 'AgentMapWin',
							title : '座席监控',
							region : 'center',
							layout : 'border',
							autoLoad:{
								url:  __ctxPath + '/agentmap.jsp',
			                    callback: this,
			                    scope: this,
			                    discardUrl: true,
			                    nocache: false,
			                    text: "Loading...",
			                    timeout: 30,
			                    scripts: true 
							}
						});
			}
		});
