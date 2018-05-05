Ext.ux.TreeCheckNodeUI = function() {
	this.checkModel = 'multiple';
	// only leaf can checked
	this.onlyLeafCheckable = false;
	Ext.ux.TreeCheckNodeUI.superclass.constructor.apply(this, arguments);
};

Ext.extend(Ext.ux.TreeCheckNodeUI, Ext.tree.TreeNodeUI, {
			renderElements : function(n, a, targetNode, bulkRender) {
				var tree = n.getOwnerTree();
				this.checkModel = tree.checkModel || this.checkModel;
				this.onlyLeafCheckable = tree.onlyLeafCheckable || false;
				// add some indent caching, this helps performance when
				// rendering a large tree
				this.indentMarkup = n.parentNode ? n.parentNode.ui
						.getChildIndent() : '';
				// var cb = typeof a.checked == 'boolean';
				var cb = (!this.onlyLeafCheckable || a.leaf);
				var checkImg = cb
						? '<img style="margin-bottom:-3px;" src="'+__ctxPath+'/images/'
								+ n.attributes.checked + '.gif">'
						: '';
				var href = a.href ? a.href : Ext.isGecko ? "" : "#";
				var buf = [
						'<li class="x-tree-node"><div ext:tree-node-id="',
						n.id,
						'" class="x-tree-node-el x-tree-node-leaf x-unselectable ',
						a.cls,
						'" unselectable="on">',
						'<span class="x-tree-node-indent">',
						this.indentMarkup,
						"</span>",
						'<img  src="',
						this.emptyIcon,
						'" class="x-tree-ec-icon x-tree-elbow" />',
						'<img src="',
						a.icon || this.emptyIcon,
						'" class="x-tree-node-icon',
						(a.icon ? " x-tree-node-inline-icon" : ""),
						(a.iconCls ? " " + a.iconCls : ""),
						'" unselectable="on" />',
						checkImg,
						'<a hidefocus="on" class="x-tree-node-anchor" href="',
						href,
						'" tabIndex="1" ',
						a.hrefTarget ? ' target="' + a.hrefTarget + '"' : "",
						'><span unselectable="on">',
						n.text,
						"</span></a></div>",
						'<ul class="x-tree-node-ct" style="display:none;"></ul>',
						"</li>"].join('');
				var nel;
				if (bulkRender !== true && n.nextSibling
						&& (nel = n.nextSibling.ui.getEl())) {
					this.wrap = Ext.DomHelper.insertHtml("beforeBegin", nel,
							buf);
				} else {
					this.wrap = Ext.DomHelper.insertHtml("beforeEnd",
							targetNode, buf);
				}
				this.elNode = this.wrap.childNodes[0];
				this.ctNode = this.wrap.childNodes[1];
				var cs = this.elNode.childNodes;
				this.indentNode = cs[0];
				this.ecNode = cs[1];
				this.iconNode = cs[2];
				var index = 3;
				if (cb) {
					this.checkbox = cs[3];
					Ext.fly(this.checkbox).on('click',
							this.onCheck.createDelegate(this, [null]));
					index++;
				}
				this.anchor = cs[index];
				this.textNode = cs[index].firstChild;
				n.on('beforeexpand', function(n) {
							if (n.attributes.checked == 'all') {
								n.ui.childCheck(n, 'all');
							}
						});
			},
			// private
			onCheck : function() {
				var arr = this.node.getOwnerTree().getChecked();
				if (this.checkModel == 'single' && arr.length == 1
						&& arr[0].id != this.node.id) {
					console.log(arr[0]);
					arr[0].ui.check('none');
				}
				this.check(this.toggleCheck(this.node.attributes.checked));
			},
			check : function(checked) {
				var n = this.node;
				var tree = n.getOwnerTree();
				n.attributes.checked = checked;
				tree.fireEvent('check', n, checked);
				this.setNodeIcon(n);
				this.childCheck(n, n.attributes.checked);
				this.parentCheck(n);// 影响父节点的选中状态
			},
			parentCheck : function(node) {
				var currentNode = node;
				// 由当前节点开始，向上递归
				while ((currentNode = currentNode.parentNode) != null) {
					if (!currentNode.getUI().checkbox)
						continue;
					var part = false;
					var sel = 0;// 记录当前节点中被选中的子节点数
					Ext.each(currentNode.childNodes, function(child) {// 如果子节点全部checked
								// ==
								// 'all',父节点也为全选,否则为半选
								if (child.attributes.checked == 'all')
									sel++;
								else if (child.attributes.checked == 'part') {
									part = true;
									return false;
								}
							});
					if (part)
						currentNode.attributes.checked = 'part';
					else {
						var selType = null;
						if (sel == currentNode.childNodes.length) {
							currentNode.attributes.checked = 'all';
							node.getOwnerTree().fireEvent('check', node, 'all');
						} else if (sel == 0) {
							currentNode.attributes.checked = 'none';
						} else {
							currentNode.attributes.checked = 'part';
						}
					}
					this.setNodeIcon(currentNode);
				};
			},
			setNodeIcon : function(n) {
				if (n.getUI() && n.getUI().checkbox)
					n.getUI().checkbox.src = __ctxPath + '/images/' + n.attributes.checked
							+ '.gif';
			},
			// private
			childCheck : function(node, checked) {
				if (node.childNodes)
					Ext.each(node.childNodes, function(child) {
								child.attributes.checked = checked;
								node.getOwnerTree().fireEvent('check', node, checked);
								this.setNodeIcon(child);
								this.childCheck(child, checked);
							}, this);
			},
			expandCheck : function(node) {
				if (node.attributes.checked == 'all') {
					node.ui.childCheck(n, 'all');
				}
			},
			toggleCheck : function(value) {
				return (value == 'all' || value == 'part') ? 'none' : 'all';
			}
		});

Ext.ux.CheckTreePanel = function() {
	Ext.ux.CheckTreePanel.superclass.constructor.apply(this, arguments);
};
Ext.extend(Ext.ux.CheckTreePanel, Ext.tree.TreePanel, {
			/**
			 * etrieve an array of checked nodes
			 */
			getChecked : function(a, startNode) {
				startNode = startNode || this.root;
				var r = [];
				var f = function() {
					if (this.attributes.checked == 'all') {
						r.push(!a ? this : (a == 'id' ? this.getDepth() + '-'
								+ this.id : this.attributes[a]));
						return false;
					}
				};
				startNode.cascade(f);
				return r;
			}
		});

Ext.ux.TreeCheckLoader = function() {
	this.baseAttrs = {
		uiProvider : Ext.ux.TreeCheckNodeUI
	};
	Ext.ux.TreeCheckLoader.superclass.constructor.apply(this, arguments);
};
Ext.extend(Ext.ux.TreeCheckLoader, Ext.tree.TreeLoader);
