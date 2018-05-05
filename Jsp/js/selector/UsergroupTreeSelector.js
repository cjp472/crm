/**下拉树工具类
 * 用法: new UsergroupTreeSelector(_id,_url,_label,_field,_isBlank); 返回类型为Ext.form.ComboBox
 * @param {} _id:下拉树的ID
 * @param {} _url:读取下拉树JSON数据的URL,JSON数据的格式是Ext.tree.TreeLoader能接收的数据格式
 * @param {} _label:是该下拉树的fieldLabel
 * @param {} isBlank:是该下拉树是否为必填
 * @param {} _field:修改域的ID,根据此ID把其树结点的id的值赋给该域
 * @return {} Ext.form.ComboBox
 */
var UsergroupTreeSelector = function(_id,_url,_label,_field,_isBlank,_anchor,_readFlag) {
	var config={
		id:_id,
		store : new Ext.data.SimpleStore({
					fields : [],
					data : [[]]
				}),
		editable : false,
		mode : 'local',
		fieldLabel:_label,
		labelWidth : 60,
		allowBlank:_isBlank==false?false:true,
		triggerAction : 'all',
		readOnly : _readFlag,
		anchor : _anchor,
		//maxHeight : 200,
		flex : 1,
		selectOnFocus:false,
		tpl : "<tpl for='.'><div style='height:200px;'><div id='"+_id+"tree'></div></div></tpl>",
		selectedClass : ''
	};
	var comboxWithTree = new Ext.form.ComboBox(config);

	
	var tree = new Ext.tree.TreePanel({
		id:_id+'Tree',
		height:200,
		autoScroll: true,
		split: true,
		loader: new Ext.tree.TreeLoader({url:_url}),
	    root:new Ext.tree.AsyncTreeNode({
	        expanded: true
	    }),
	    rootVisible: false
	});
	
	//用于解决下拉存在二级菜单的时候，点击自动收起的功能
	tree.on('collapsenode',function(node){
		comboxWithTree.expand();
	});
	tree.on('expandnode',function(node){
		comboxWithTree.expand();
	});
	tree.on('click', function(node) {
				tree.clickNodes=true;
				var editField = Ext.getCmp(_field);//根据要修改的域的ID取得该域
				if(node.id!=null&&node.id!=''){
					comboxWithTree.setValue(node.text);
					comboxWithTree.id=node.id;
					comboxWithTree.collapse();
					if(editField !=null){
						editField.setValue(node.id); //把树结点的值赋给要修改的域
					}else if(editField==undefined){
						var getVale = _field.split("@");
						Ext.getCmp(getVale[1]).getSelectionModel().getSelections()[0].set(getVale[0],node.id);
                        Ext.getCmp(getVale[1]).getSelectionModel().getSelections()[0].set('detailType',1);
					}
				}
	});
	
	comboxWithTree.on('expand', function() {
				tree.render(_id+'tree');
	});
	return comboxWithTree
};
