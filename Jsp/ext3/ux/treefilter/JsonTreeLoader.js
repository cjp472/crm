/**
 * 通过读取JSON串生成树的层次结构,务必保证json数组中父节点index小于子节点！
 * JSON串根节点默认为'list'
 * 父结点id字段为parentcode
 * 结点的id属性对应json中code属性,结点text属性对应json中name属性
 *
 * @author chemzqm@gmail.com
 * 
 */
Ext.ns('Ext.ux.tree');


Ext.ux.tree.JsonTreeLoader = Ext.extend(Ext.tree.TreeLoader, {
    root: 'list',
    paramName: {
        parentcode: 'parentcode',
        id: 'code'
    },
    
    // private override
    processResponse: function(response, node, callback){
        var json = response.responseText;
        var array = Ext.decode(json)[this.root];
        
        try {
            node.beginUpdate();
            node.appendChild(this.parseArray(array));
            node.endUpdate();
            
            if (typeof callback == "function") {
                callback(this, node);
            }
        } 
        catch (e) {
            this.handleFailure(response);
        }
    },
    
    // private
    parseArray: function(array){
        var pnodes = [];
        var nodes = [];
        Ext.each(array, function(o){
            var treeNode = this.createNode(o);
            if (!o[this.paramName.parentcode]) {
                nodes.push(treeNode);
            }
            else {
                for (var i = pnodes.length - 1; i >= 0; i--) {
                    if (pnodes[i].id == o[this.paramName.parentcode]) {
                        pnodes[i].appendChild(treeNode);
                        break;
                    }
                }
            }
            if (!treeNode.leaf) {
                pnodes.push(treeNode);
            }
        }, this);
        return nodes;
    },
    
    // private override node的id是json里面的code字段
    createNode: function(o){	
        var attr = {
            id: o.code,
            text: o.name
        };
        Ext.applyIf(attr, o);
        attr.loaded = true;
        
        this.processAttributes(attr);
        
        return Ext.ux.tree.JsonTreeLoader.superclass.createNode.call(this, attr);
    },
    
    /*
     * Template method intended to be overridden by subclasses that need to provide
     * custom attribute processing prior to the creation of each TreeNode.  This method
     * will be passed a config object containing existing TreeNode attribute name/value
     * pairs which can be modified as needed directly (no need to return the object).
     */
    processAttributes: Ext.emptyFn
});

//backwards compat
Ext.ux.JsonTreeLoader = Ext.ux.tree.JsonTreeLoader;