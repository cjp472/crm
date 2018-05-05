/*
 * 对音频的处理
 */

function dealSound() {

}

/**
 * @author cf0666@gmail.com
 * @createtime
 * @class QCAuditForm
 * @extends Ext.Window
 * @description ConHis表单
 * @company 优创融联科技
 */
QCAuditForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		QCAuditForm.superclass.constructor.call(this, {
					id : 'QCAuditFormWin',
					layout : 'fit',
					items : this.panel,
					modal : true,
					// frame:true,
					// height : 400,
					autoHeigh : true,
					maximizable : true,
					title : '质检考核',
					buttonAlign : 'center',
					buttons : [{
								text : '确定',
								iconCls : 'btn-showDetail',
								scope : this,
								id : 'btn_save',
								handler : function() {
									if(validateAll()){
//										Ext.getCmp('QCAuditFormWin').addListener('removed',function(){
//											var form = document.getElementById('kaohe');
//											form.action = __ctxPath+'/qucon/saveQcCheck.do';
//											form.submit();
//											Ext.ux.Toast.msg('操作信息', '提交成功!');
//											return true;
//										});
										var form = document.getElementById('kaohe');
										form.action = __ctxPath+'/qucon/saveQcCheck.do';
										alert(this.toUseid);
										Ext.Ajax.request({
											form : 'kaohe',
											params : {
												toUseId : this.toUseid,
												tempReleId : this.tempReleId
											},
											success : function(){
												var tabs = Ext.getCmp('centerTabPanel');
												tabs.remove('QCReviewFormWin');
												tabs.remove('QCAuditFormWin');
												tabs.activate('QCReviewViewWin');
												Ext.ux.Toast.msg('操作信息', '提交成功!');
											}
										});
//										form.submit();
//										Ext.getCmp('btn_save').disable();
//										tabs.hide('QCAuditFormWin'); 
//										this.remove();
//										this.destroy();
									}
								}
							}, {
								text : __cancel,
								iconCls : 'btn-cancel',
								scope : this,
								handler : this.cancel
							}]
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		this.panel = new Ext.Panel({
			autoLoad:{
//				url:  __ctxPath+'/qucon/showCheckQcCheck.do?id=121',
				url:  __ctxPath+'/qucon/showTemplateQcTemplate.do?id='+this.tempId,
//              callback: disInput,
                scope: this,
                discardUrl: true,
                nocache: false,
                text: "Loading...",
                timeout: 30,
                scripts: true 
			}
		})
	},// end of the initcomponents

	/**
	 * 重置
	 * 
	 * @param {}
	 *            formPanel
	 */
	reset : function() {
		this.formPanel.getForm().reset();
	},
	/**
	 * 取消
	 * 
	 * @param {}
	 *            window
	 */
	cancel : function() {
		var tabs = Ext.getCmp('centerTabPanel');// 获得tab
		tabs.remove('QCAuditFormWin');// 移除创建的窗口
		// QCAuditForm.close();
	},
	/**
	 * 保存记录
	 */
	save : function() {
		$postForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/customer/saveConHis.do',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('ConHisGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						// this.close();
					}
				});
	}// end of save

});
function disInput(){
	var dis = document.getElementById("disable").value;
	if(dis == 'true'){
		var inputList = document.getElementsByTagName("input");
		for(var t = 0; t < inputList.length; t++){
			inputList[t].disabled = true;
		}
		var areaList = document.getElementsByTagName("textarea");
		for(t = 0; t < areaList.length; t++){
			areaList[t].disabled = true;
		}
	}
}
var yanzhong = false;
function validateAndCala(id){
	var max_all = Number(document.getElementById('max').innerHTML);
	var min_all = Number(document.getElementById('min').value);
	var score_rs = document.getElementById('score');
	var rs = Number(score_rs.innerHTML);
	
	var type = document.getElementById('type').value;    
	var min = document.getElementById('min_'+id).value;
	var max = document.getElementById('max_'+id).value;
	var score = document.getElementById('score_'+id);
	var oNum = Number(score.value);

	if(isNaN(oNum)){
   		Ext.ux.Toast.msg('操作信息', '你填写的必须为数字!');
		return false;
  	}

	if(oNum < min){
		Ext.ux.Toast.msg('操作信息', '你填写的分数小于最小值!');
		return false;
	}
	if(oNum > max){
		Ext.ux.Toast.msg('操作信息', '你填写的分数大于最大值!');
		return false;
	}
	if(yanzhong){//如果严重错误选中，则不计算分数
		return;
	}
	var ids = document.getElementById('ids').value;
	var ids_array = ids.split(',');
	for(var i = 0; i < ids_array.length-1; i++){
		var type_one = ids_array[i].substring(ids_array[i].indexOf("@")+1);
		var id_one = ids_array[i].substring(0, ids_array[i].indexOf("@"));
		if(id_one == id){
			if(type_one == '+'){
				rs += oNum;
			}else{
				rs -= oNum;
			}
		}
	}
	
	if(rs > max_all){
//		Ext.ux.Toast.msg('操作信息', '当前分数大于最大值，分数自动转化为最大值!');
		rs = max_all;
	}
	if(rs < min_all){
//		Ext.ux.Toast.msg('操作信息', '当前分数大于最小值，分数自动转化为最小值!');
		rs = min_all;
	}
	score_rs.innerHTML = rs;
	return true;
};
function yanzhong_input(e){
	var src = e.target || window.event.srcElement;  
	var min = Number(document.getElementById('min').value);
	if(src.checked){//严重项被勾选
		document.getElementById("score").innerHTML = min;
		yanzhong = true;
	}else{
		var ids = document.getElementById('ids').value;
		var ids_array = ids.split(',');
		for(var i = 0; i < ids_array.length-1; i++){
			var type_one = ids_array[i].substring(ids_array[i].indexOf("@")+1);
			var id_one = ids_array[i].substring(0, ids_array[i].indexOf("@"));
			var score = document.getElementById('score_'+id_one);
			var oNum = Number(score.value);
			var score_rs = document.getElementById('score');
			var rs = Number(score_rs.innerHTML);
			if(!isNaN(oNum)){
				if(type_one == '+'){
					rs += oNum;
				}else{
					rs -= oNum;
				}
			}
		}
		if(rs > max_all){
//			Ext.ux.Toast.msg('操作信息', '当前分数大于最大值，分数自动转化为最大值!');
			rs = max_all;
		}
		if(rs < min_all){
//			Ext.ux.Toast.msg('操作信息', '当前分数大于最小值，分数自动转化为最小值!');
			rs = min_all;
		}
		score_rs.innerHTML = rs;
	} 
}
function calc(){
	if(yanzhong){
		return;
	}
	var max = Number(document.getElementById('max').innerHTML);
	var min = Number(document.getElementById('min').value);
	var rs = Number(document.getElementById('basic').value);
	
	var ids = document.getElementById('ids').value;
	var ids_array = ids.split(',');
	for(var i = 0; i < ids_array.length-1; i++){
		var type_one = ids_array[i].substring(ids_array[i].indexOf("@")+1);
		var id_one = ids_array[i].substring(0, ids_array[i].indexOf("@"));
		var score_one = document.getElementsByName('score_'+id_one);
		for(var j = 0; j < score_one.length; j++){
			if(score_one[j].checked){
				if(type_one == '+'){
					rs += Number(score_one[j].value);
				}else{
					rs -= Number(score_one[j].value);
				}
			}
		}
	}
	if(rs > max){
//		Ext.ux.Toast.msg('操作信息', '当前分数大于最大值，分数自动转化为最大值!');
		rs = max;
	}
	if(rs < min){
//		Ext.ux.Toast.msg('操作信息', '当前分数小于最小值，分数自动转化为最小值!');
		rs = min;
	}
	document.getElementById("score").innerHTML = rs;
};
function yanzhong_opt(e){
	var src = e.target || window.event.srcElement;  
	var min = Number(document.getElementById('min').value);
	if(src.checked){//严重项被勾选
		document.getElementById("score").innerHTML = min;
		yanzhong = true;
	}else{
		calc();
	} 
}
function validateAll(){
	var ids = document.getElementById('ids').value;
	var ids_array = ids.split(',');
	var type = document.getElementById('type').value;  
	
	type = type.replace(/(^\s*)|(\s*$)/g, "");//正则表达式去除空格
	
	if(type == 'opt'){
		for(var i = 0; i < ids_array.length-1; i++){
			//验证一个评分项是否填写
			var id_one = ids_array[i].substring(0, ids_array[i].indexOf("@"));
			var type_one = ids_array[i].substring(ids_array[i].indexOf("@")+1);
			if(type_one != '#'){//检查非严重项是否填写
				var score_one = document.getElementsByName('score_' + id_one);
				var rs_one = false;
				for(var j = 0; j < score_one.length; j++){
					if(score_one[j].checked){
						rs_one = true;
					}
				}
				if(rs_one == false){
					Ext.ux.Toast.msg('操作信息', '尚有评分项未填写，请填写后提交!');
					return false;
				}
			}
		}
	}else{
		for(var j = 0; j < ids_array.length-1; j++){
			var id_one = ids_array[j].substring(0, ids_array[j].indexOf("@"));
			var type_one = ids_array[j].substring(ids_array[j].indexOf("@")+1);
			if(type_one != '#'){
				if(validateAndCala(id_one) == false){
					Ext.ux.Toast.msg('操作信息', '填写有误，请修改后提交!');
					return false;
				}
			}
		}
	}
	var rs = document.getElementById('score').innerHTML;
	document.getElementById('chkResult').value = rs;
	return true;
};