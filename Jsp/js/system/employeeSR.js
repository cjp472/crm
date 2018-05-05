//var employeeSR = function(_title, _userId,_depId,_depName) {
//	return this.setup(_title, _userId,_depId,_depName);
//};
//
//employeeSR.prototype.makeDefaultPwd = function(){
//	
//var dicRecord = Ext.data.Record.create(
//		[ 'dicId','itemValue','itemIndex']
//		);
//
//    	var dicMemoryProxy = new Ext.data.HttpProxy({
//    				url: __ctxPath+ '/system/loadItemRecordDictionary.do'
//    			});
//
//    	var dicJsonReader = new Ext.data.JsonReader(
//    			{  
//    				root:"data",
//    				totalProperty : 'totalCounts',
//    				idProperty : "dicId"},
//    					dicRecord);
//
//
//    	var pwd_store = new Ext.data.Store({
//    				proxy : dicMemoryProxy,
//    				reader : dicJsonReader
//    			});
//
//    	pwd_store.on('beforeload', function(pwd_store) {
//    					pwd_store.baseParams = {
//    							itemName : '密码'
//    				};
//    			});	
//    	pwd_store.load();
//    	alert(pwd_store.getCount());
//    	alert("haha" + pwd_store.getAt(0).data['itemIndex']);
////    	for (var i = 0; i < pwd_store.getCount(); i++) { // store.getCount()为store的长度
////    		if (pwd_store.getAt(i).data['itemName'] == '') {
//////    			combo.setValue(store.getAt(i).data['itemName']);
////    			alert("haha" + pwd_store.getAt(i).data['itemName']);
////    			break;
////    		}
////    	}
//    	return pwd_store.getAt(0).data['itemIndex'];
//}