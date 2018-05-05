/**
 * @author cf0666@gmail.com
 * @createtime
 * @class QCAuditForm
 * @extends Ext.Window
 * @description ConHis表单
 * @company 优创融联科技
 */
QCShowTempForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		QCShowTempForm.superclass.constructor.call(this, {
					id : 'QCShowTempFormWin',
					layout : 'fit',
					items : this.panel,
					modal : true,
					// frame:true,
					// height : 400,
					autoHeigh : true,
					maximizable : true,
					title : '质检考核模版',
					buttonAlign : 'center'
					
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		this.panel = new Ext.Panel({
			autoLoad:{
				url:  __ctxPath+'/qucon/showTemplateQcTemplate.do?id='+this.tmpId,
                callback: this,
                scope: this,
                discardUrl: true,
                nocache: false,
                text: "Loading...",
                timeout: 30,
                scripts: true 
			}
		})
	}// end of the initcomponents
});
var yanzhong = false;
function validateAndCala(id){
	if(yanzhong){
		return;
	}
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
	}else{
		for(var j = 0; j < ids_array.length-1; j++){
			var id_one = ids_array[j].substring(0, ids_array[j].indexOf("@"));
			if(validateAndCala(ids_array[j]) == false){
				Ext.ux.Toast.msg('操作信息', '填写有误，请修改后提交!');
				return false;
			}
		}
	}
	return true;
}