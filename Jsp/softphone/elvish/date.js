 var contextPath;
function autoDateInput(obj){
	var strStyle = "dialogWidth=232px;dialogHeight=282px;status=0;help=0;maximize=0;minimize=0;";
	var MyDialog=obj.value;
	var dateA=new Array();
  dateA[0]=obj.value;
  dateA[1]="date";
	var oldDate=obj.value;
  strTitle =  window.showModalDialog(contextPath+"/common/date.jsp",dateA,strStyle);
  if(strTitle!=null){
    obj.value=strTitle;
  if(oldDate!=strTitle)
    obj.fireEvent("onchange")
  obj.focus();
  }
}

function autoDateTimeInput(obj){
	var strStyle = "dialogWidth=232px;dialogHeight=282px;status=0;help=0;maximize=0;minimize=0;";
	var dateA=new Array();
  dateA[0]=obj.value;
  dateA[1]="datetime";
	var oldDate=obj.value;
  strTitle =  window.showModalDialog(contextPath+"/common/date.jsp",dateA,strStyle);
  if(strTitle!=null){
    obj.value=strTitle;
    if(oldDate!=strTitle)
      obj.fireEvent("onchange")
    obj.focus();
  }
}

function selectDateTime(path,inputName){
	contextPath = path;
	var obj = document.all[inputName];
	autoDateTimeInput(obj);
}

function selectDate(path,inputName){
	contextPath = path;
	var obj = document.all[inputName];
	autoDateInput(obj);
}

//add by ChengYu
function selectMonth(path,inputName){
	//alert("--------------------");
	contextPath = path;
	var obj = document.all[inputName];
	autoMonthInput(obj);
}

function autoMonthInput(obj){
	var strStyle = "dialogWidth=220px;dialogHeight=260px;status=0;help=0;maximize=0;minimize=0;";
	var MyDialog=obj.value;
	var dateA=new Array();
  dateA[0]=obj.value;
  dateA[1]="date";
	var oldDate=obj.value;
  strTitle =  window.showModalDialog(contextPath+"/common/date.jsp",dateA,strStyle);
  if(strTitle!=null){
    obj.value=strTitle.substring(0,7);
  if(oldDate!=strTitle)
    obj.fireEvent("onchange")
  obj.focus();
  }
}

function getCurrentDatetime(){
	var myDate = new Date();
    var year = myDate.getFullYear();   //获取完整的年份(4位,1970-????)
    var month = myDate.getMonth()+1;      //获取当前月份(0-11,0代表1月)
    var day = myDate.getDate();       //获取当前日(1-31)
    var hour = myDate.getHours();      //获取当前小时数(0-23)
    var min = myDate.getMinutes();    //获取当前分钟数(0-59)
    var ss = myDate.getSeconds();    //获取当前秒数(0-59)
    return ''+year
    		+'-'+(month<10?('0'+month):month)
    		+'-'+(day<10?('0'+day):day)
    		+' '+(hour<10?('0'+hour):hour)
    		+':'+(min<10?('0'+min):min)
    		+':'+(ss<10?('0'+ss):ss)
    		;
}

function getCurrentDate(){
	var myDate = new Date();
    var year = myDate.getFullYear();   //获取完整的年份(4位,1970-????)
    var month = myDate.getMonth()+1;      //获取当前月份(0-11,0代表1月)
    var day = myDate.getDate();       //获取当前日(1-31)
    return ''+year
    		+'-'+(month<10?('0'+month):month)
    		+'-'+(day<10?('0'+day):day)
    		;
}

function checkCredNumAndBirthday(credNum,birthday){
    var credNumYY,credNumMM,credNumDD;
    if(credNum.length==16) {
        credNumYY=credNum.substr(6,2);
        credNumMM=credNum.substr(8,2);
        credNumDD=credNum.substr(10,2);
        if(credNumYY<20) {
            credNumYY='20'+credNumYY;
        }else {
            credNumYY='19'+credNumYY;
        }
    }else {
        credNumYY=credNum.substr(6,4);
        credNumMM=credNum.substr(10,2);
        credNumDD=credNum.substr(12,2);
    }
    if(credNumYY+'-'+credNumMM+'-'+credNumDD==birthday) {
        return true;
    } else {
        return false;
    }
}

function getAge(birthday){//2010-07-01
	//alert(birthday);
	var yy = birthday.substr(0,4);
	var mm = birthday.substr(5,2);
	var dd = birthday.substr(8,2);
	var days = new Date();
	var gdate = days.getDate();
	var gmonth = days.getMonth()+1;
	var gyear = days.getYear();
	var age = gyear - yy;
	if((mm == gmonth) && (dd <= parseInt(gdate))) {
		age = age;
	}else if((mm == gmonth) && (dd > parseInt(gdate))) {
		age = age-1;
	}else {
		if(mm < (gmonth)) {
			age = age;
		}else {
			age = age - 1;
		}
	}
	if(age<0) age=0;
	//alert(age);
	return age;
}

function isDate(s){
	var patrn=/\d{4}-\d{2}-\d{2}/; 
	if (!patrn.exec(s)) return false;
	return true;	
}
function isDatetime(s){
	var patrn=/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/; 
	if (!patrn.exec(s)) return false;
	return true;	
}
