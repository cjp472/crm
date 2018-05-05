UkKnowRecommendView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		UkKnowRecommendView.superclass.constructor.call(this, {
			id : 'UkKnowRecommendViewWin',
			title : '知识推荐',
			region : 'center',
			layout : 'border',
			items : [this.panel]
		});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {

		
		this.topbar = new Ext.Toolbar({
			items : [ {
						iconCls : 'btn-dep-sel',
						text : '推荐给我的',
						xtype : 'button',
						scope : this,
						handler : this.tuijian
					}, {
						text : '我推荐的',
						iconCls : 'btn-system-copy',
						handler : this.wodetuijian
					}]
//			items : ['->', {
//						iconCls : 'btn-del',
//						text : '推荐',
//						xtype : 'button',
//						scope : this,
//						handler : this.RecommendtuiJian
//					}, '->', {
//						text : '收藏',
//						iconCls : 'btn-setting',
//						handler : this.RecommendshouCang
//					}]
		});
       this.panel = new Ext.Panel({
         layout:'fit',
         region : 'center',
         tbar : this.topbar,
          id:'centerPan',
          items:[new UkKnowRecommendDaily()]
       });


	},// end of the initComponents()
	// GridPanel行点击处理事件
	rowClick : function(grid, rowindex, e) {
		grid.getSelectionModel().each(function(record) {
			var tabs = Ext.getCmp('centerTabPanel');
			
		});
	},
	tuijian : function(){
		//alert("fsd");
		
		Ext.getCmp('centerPan').removeAll();
	 Ext.getCmp('centerPan').add(new UkKnowRecommendDaily());
	 Ext.getCmp('centerPan').doLayout();
	 var users = Ext.getCmp('UkKnowRecommendViewWin');
	 users.setTitle('推荐给我的');
	},
	wodetuijian: function(){
	 Ext.getCmp('centerPan').removeAll();
	 Ext.getCmp('centerPan').add(new UkKnowRecommendMyView());
	 Ext.getCmp('centerPan').doLayout();
	  var users = Ext.getCmp('UkKnowRecommendViewWin');
	 users.setTitle('我的推荐');
	},
    sysTuijian: function(){
        Ext.Ajax.request({
                    url : __ctxPath + '/know/sysTuijianUkPerKnow.do',
                    method : 'post',
                    success : function(response) {
                    }
                });
    }

});
