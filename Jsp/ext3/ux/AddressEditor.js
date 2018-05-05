Ext.ux.AddressEditor = Ext.extend(Ext.form.Field, {
			initComponent : function() {
				Ext.ux.AddressEditor.superclass.initComponent.call(this);
				this.regionList = ['Guojia', 'Sheng', 'Shi', 'Diqu'];
				this.c1 = new Ext.form.ComboBox({
								mode : 'local',
								editable : false,
								id:'c1C',
								triggerAction : 'all',
								valueField:'regionId',
								displayField:'regionName',
								store : new Ext.data.SimpleStore({
									autoLoad : true,
									url : __ctxPath + '/system/listDetailRegion.do?regionId=0',
									fields : ['regionId', 'regionName']
								}),
								listeners:{
									select : function(combo, record, index) {
											Ext.getCmp('c2C').clearValue();
											Ext.Ajax.request({
														url : __ctxPath + '/system/listDetailRegion.do',
														params : {
															regionId : record.data['regionId']
														},
														method : 'post',
														success : function(response) {
															var result = Ext.util.JSON
																	.decode(response.responseText)
															Ext.getCmp('c2C').getStore().loadData(result);
														}
													});
									}
								}
							});
				this.c2 = new Ext.form.ComboBox({
								mode : 'local',
								editable : false,
								valueField:'regionId',
								displayField:'regionName',
								id:'c2C',
								triggerAction : 'all',
								store : new Ext.data.SimpleStore({
									data:[],
									fields : ['regionId', 'regionName']
								})
							});
			},

			// private
			initEvents : function() {
				Ext.ux.AddressEditor.superclass.initEvents.call(this);
			},

			// private
			onRender : function(ct, position) {
				Ext.ux.AddressEditor.superclass.onRender.call(this, ct, position);

				if (!this.wrap) {

					this.el.dom.style.border = '0 none';
					this.el.dom.setAttribute('tabIndex', -1);
					this.el.addClass('x-hidden');

					this.wrap = this.el.wrap({
								cls : 'x-form-rangefield-wrap'
							});

					this.control1 = this.wrap.createChild({
								cls : 'x-form-rangefield-control'
							}, this.el);
					this.sp = this.wrap.createChild({
								cls : 'x-form-rangefield-split'
							}, this.el).update('-');
					this.control2 = this.wrap.createChild({
								cls : 'x-form-rangefield-control'
							}, this.el);

					var w = this.wrap.getComputedWidth();
					var sw = this.sp.getComputedWidth();

					this.control1.setWidth((w - sw) / 2);
					this.control2.setWidth((w - sw) / 2);

					this.c1.render(this.control1);
					this.c2.render(this.control2);

				}

			},
           getLast:function(){
             return this.c2;
           },
			onResize : function(w, h) {
				Ext.ux.AddressEditor.superclass.onResize.apply(this, arguments);
				if (this.wrap) {

					if (typeof w == 'number') {
						var aw = w - this.wrap.getFrameWidth('lr');
						var sw = this.sp.getComputedWidth();

						var fix = 0;
						if (Ext.isIE) { // fix IE 1px bogus margin
							fix = 4;
						}

						this.wrap.setWidth(aw);

						this.control1.setWidth((aw - sw) / 2);
						this.control2.setWidth((aw - sw) / 2);

						this.c1.setWidth((aw - sw) / 2 + fix);
						this.c2.setWidth((aw - sw) / 2 + fix);
					}
				}
			},

			// private
			onEnable : function() {
				Ext.ux.AddressEditor.superclass.onEnable.call(this);
				this.c1.setDisabled(this.disabled);
				this.c2.setDisabled(this.disabled);
			},

			// private
			onDisable : function() {
				Ext.ux.AddressEditor.superclass.onDisable.call(this);
				this.c1.setDisabled(this.disabled);
				this.c2.setDisabled(this.disabled);
			},
			// private
			onDestroy : function() {
				if (this.rendered) {
					Ext.destroy(this.control1, this.sp, this.control2,
							this.wrap);
				}
				Ext.ux.AddressEditor.superclass.onDestroy.call(this);
			},
            destory:function() {
//				if (this.rendered) {
					Ext.destroy(this.control1, this.sp, this.control2,
							this.wrap);
//				}
				Ext.ux.AddressEditor.superclass.onDestroy.call(this);
			},
			setValue : function(v) {
				if(value){
					
					var value = v.split(';')[1].split('-');
	
					if (value.length >= 2 && this.c1 && this.c2) {
						this.c1.setValue(value[0])
						this.c2.setValue(value[1])
					}
				}
			},

			setDisabled : function(v) {
				Ext.ux.AddressEditor.superclass.setDisabled.call(this);

				this["on" + (v ? "Disable" : "Enable")]();
			},

			getValue : function() {
				if (this.c1 && this.c2) {
					return [this.c1.getValue(), this.c2.getValue()]
							.join('-') +';'+ [Ext.get('c1C').dom.value, Ext.get('c2C').dom.value]
							.join('-');
				} else {
					return this.value;
				}
			}

		});

Ext.reg('addresseditor', Ext.ux.AddressEditor);