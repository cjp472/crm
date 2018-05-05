/*
 * 文件附件详细
 */
Ext.ns('FileAttachDetail');
FileAttachDetail.show = function(fileId) {
	var window = new Ext.Window( {
		title : '附件详细信息',
		iconCls : 'menu-attachment',
		width : 480,
		height : 253,
		minHeight : 253,
		modal : true,
		layout : 'form',
		buttonAlign : 'center',
		autoLoad : {
			url : __ctxPath + '/fileDetail.do?fileId=' + fileId
		},
		buttons : [ {
			xtype : 'button',
			iconCls : 'btn-close',
			text : '关闭',
			handler : function() {
				window.close();
			}
		} ]
	});
	window.show();
};
FileAttachDetail.removeResumeFile = function(obj, fileId, dataId) {
//    eval('debugger');
    var fileIds = Ext.getCmp(dataId.id);
    var value = fileIds.getValue();
    if (value.indexOf(',') < 0) {// 仅有一个附件
        fileIds.setValue('');
    } else {
        value = value.replace(',' + fileId, '').replace(fileId + ',', '');
        fileIds.setValue(value);
    }
    var el = Ext.get(obj.parentNode);
    el.remove();
};