/**会计科目下拉树工具类  陈峰
 * 用法: new TreeSelector(_id,_url,_label,_field,_isBlank); 返回类型为Ext.form.ComboBox
 * @param {} _id:下拉树的ID
 * @param {} _url:读取下拉树JSON数据的URL,JSON数据的格式是Ext.tree.TreeLoader能接收的数据格式
 * @param {} _label:是该下拉树的fieldLabel
 * @param {} isBlank:是该下拉树是否为必填
 * @param {} _field:修改域的ID,根据此ID把其树结点的id的值赋给该域
 * @return {} Ext.form.ComboBox
 */
var AccountsSelector = function(_id,_url,_label,_field,_isBlank) {
	var config={
		id:_id,
		store : new Ext.data.SimpleStore({
					fields : [],
					data : [[]]
				}),
		editable : false,
		mode : 'local',
		fieldLabel:_label,
		allowBlank:_isBlank==false?false:true,
		triggerAction : 'all',
		maxHeight : 200,
		selectOnFocus:false,
		tpl : "<tpl for='.'><div style='height:200px;'><div id='"+_id+"tree'></div></div></tpl>",
		selectedClass : ''
	};
	var comboxWithTree = new Ext.form.ComboBox(config);
	var root= new Ext.tree.AsyncTreeNode( { id:'0' } );
	var loader= new Ext.tree.TreeLoader( {url: _url});
		loader.on('beforeload',function(loader,node){
                this.baseParams.id=node.id; //通过这个传递参数，这样就可以点一个节点出来它的子节点来实现异步加载
        },loader);

	
	var tree = new Ext.tree.TreePanel({
		id:_id+'Tree',
		height:200,
		autoScroll: true,
		split: true,
		loader: loader,
	    root: root,
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
					}
				}
	});
	
	comboxWithTree.on('expand', function() {
				tree.render(_id+'tree');
	});
	return comboxWithTree
};
