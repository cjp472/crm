//********************************************************************
// $author: Eric Chan
// $Revision: 1.10 $, $Date: 2008/03/31 01:48:21 $
//******************************************************************** 
function $(s){return document.getElementById(s);}
 var result="";	
 
 var webAppName = "ulink";
 try{
 	if(top.getWebAppName()){
 			webAppName = top.getWebAppName();
 	}
 }catch(Ex){}
/**
 */
function goNextPage(targetUrl) {
    document.location.href = targetUrl;
}

/**
 */
 function timecheck(begintime,endtime,form,actionUrl,str,ontime,str2){
   	//modified by tengshuang 2007-12-11 for weblogic bug 248  
   	//modified by tengshuang 2008-1-14 for unicall2.2.2 bug 268  
	 var beginTime = document.getElementById(begintime);
	 var endTime = document.getElementById(endtime);
	 var onTime = document.getElementById(ontime);
	 if (typeof actionUrl != "undefined" && actionUrl != "") {
	    
        form.action = actionUrl;
        
     }
     if(onTime == null || onTime.value >=beginTime.value || onTime.value=='');
     else{
     	alert(str2);
        return;
     }  
     if(endTime.value >=beginTime.value || endTime.value==''){
     	 
          form.submit();
      }
      else{
        	alert(str);
          return;
       }
 }
 
 
/**
 */
function submitForm(form, actionUrl) {
    if (typeof actionUrl != "undefined" && actionUrl != "") {
        form.action = actionUrl;
    }    
    //alert(form.action);
    form.submit();
}

/**
 */
function validator(infId,form,str){
   
	 var input = document.getElementById(infId);
	  
	 l=input.value.length;
	 
	
      for (i=0;i<l;i++){
     	sChar=input.value.charAt(i)
     	if (sChar>="0" && sChar<="9"){
            continue;  
       	}
     	else{
        	alert(str);
           return;
       }
    }
   
      submitForm(form);
 }

/**
 * 
 
 function timecheck(begintime,endtime,form){
	 var beginTime = document.getElementById("begintime");
	 var endTime = document.getElementById("endtime");
	 
     if(endTime.value >=beginTime.value || endTime.value==''){
     	   alert(form);
           submitForm(form);
      }
      else{
        	alert("");
          return;
        }
 }
*/

/**
  */
function confirmSubmit(form, targetUrl, message) {
    if (!message) {
        message = "";
    }
    if (confirm(message)) {
		submitForm(form, targetUrl);
	} else {
		return;
	}
}    

//added by tengshuang for unicall 2.2.2-2 bug 130 2008-1-21
function haveChecked(checkboxNam, message){
	var checkBoxs = document.getElementsByName(checkboxNam);
	for (var i = 0 ; i < checkBoxs.length; i ++)
		{
			if(checkBoxs[i].checked)
		{
			return true;
		}			   
	}	
	alert(message);
	return false;	
}


/**
 * check all the checkboxes in the form
 * 
 * @param checkboxName
 */
function checkAll(checkboxName) {
    var checkboxes = document.getElementsByName(checkboxName);
    if (!checkboxes) {
        return;
    }
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = true;
    }
}

/**
 * decheck all the checkboxes in the form
 * 
 * @param checkboxName
 */
function checkNone(checkboxName) {
    var checkboxes = document.getElementsByName(checkboxName);
    if (!checkboxes) {
        return;
    }
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
}

/**
 * set all checkboxes's value with all element  
 * @param all
 * @param checkboxName
 */
function setCheckboxes(all, checkboxName) {
    var value = all.checked;
    var checkboxes = document.getElementsByName(checkboxName);
    if (!checkboxes) {
        return;
    }
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = value;
    }
}

function getSelectedCheckboxValues(checkBoxName) {
    var selectedCheckboxIds = "";
    if (!checkBoxName) {
        return;
    }       
    var checkBox = document.getElementsByName(checkBoxName);
    for (var i = 0; i < checkBox.length; i++) {
        if (checkBox[i].checked && checkBox[i].value != "") {
            selectedCheckboxIds += checkBox[i].value + ",";
        }           
    }
    return selectedCheckboxIds.substring(0, selectedCheckboxIds.length - 1);
}

/* Function for showing and hiding elements that use 'display:none' to hide */
function toggleDisplay(targetId) {
    if (document.getElementById) {
        target = document.getElementById(targetId);
    	if (target.style.display == "none"){
    		target.style.display = "";
    	} else {
    		target.style.display = "none";
    	}
    }
}

// toggle visibility 
function toggleVisibility(targetId) {
    if (document.getElementById) {
        target = document.getElementById(targetId);
    	if (target.style.visibility == "hidden"){
    		target.style.visibility = "visible";
    	} else {
    		target.style.visibility = "hidden";
    	}
    }
}

/* This function is used to open a pop-up window */
function openWindow(url, winTitle, winParams) {
    if (!winParams) {
        winParams = "width=400,height=400,left=350,top=150,toolbar=no,scrollbars=auto,scrollbars=yes,resizable=yes,status=yes";
    }
	winName = window.open(url, winTitle, winParams);
    winName.focus();
}

//打开固定大小的窗口 
var WinOP = null;
function openCenterWindow(winURL, winTitle, WWidth, WHeight)   //Lock   Size 
{   
	var   WLeft   =   Math.ceil((window.screen.width   -   WWidth)   /   2   );   
	var   WTop   =   Math.ceil((window.screen.height   -   WHeight)   /   2   );   
	var   features   = 
	'width= '     +   WWidth     +   'px, '   + 
	'height= '   +   WHeight     +   'px, '   + 
	'left= '       +   WLeft     +   'px, '   + 
	'top= '         +   WTop     +   'px, '   + 
	'fullscreen=0,toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1, resizable=0 '; 
	if   (WinOP   !=   null)//确保只打开一个窗口 
	{ 
	WinOP.close(); 
	WinOP   =   null; 
	} 
	WinOP   =   window.open(winURL,   winTitle,   features); 
	WinOP.focus();
}

/**
 * separator must be char
 */
function joinString(str1, str2, separator) {
    if (str1 == "" && str2 =="") {
        return "";
    } else if (str2 == "") {
        return str1;
    } else if (str1 == "") {
        return str2;
    } else {
        if (str1.charAt(str1.length-1) == separator) {
            return str1.concat(str2);
        }
        return str1.concat(separator, str2);
    }
}

// This function is for stripping leading and trailing spaces
function trim(str) { 
    if (str != null) {
        var i; 
        for (i=0; i<str.length; i++) {
            if (str.charAt(i)!=" ") {
                str=str.substring(i,str.length); 
                break;
            } 
        } 
    
        for (i=str.length-1; i>=0; i--) {
            if (str.charAt(i)!=" ") {
                str=str.substring(0,i+1); 
                break;
            } 
        } 
        
        if (str.charAt(0)==" ") {
            return ""; 
        } else {
            return str; 
        }
    }
} 

function splitDatetimerange(startInputName,startBegName,startEndName,endInputName,endBegName,endEndName){

		var i;
		if(startInputName){
			var startInput = document.getElementById(startInputName); 
			var startBeg = document.getElementById(startBegName);
			var startEnd = document.getElementById(startEndName);
			var startStr = startInput.value;
			i = startStr.indexOf('/');
			startBeg.value = startStr.substring(0,i);
      startEnd.value = startStr.substring(i+1);	    
		}
		
		if(endInputName){
			var endInput = document.getElementById(endInputName);  
			var endBeg = document.getElementById(endBegName);
			var endEnd = document.getElementById(endEndName);
			var endStr = endInput.value;
			i = endStr.indexOf('/');
			endBeg.value = endStr.substring(0,i);
      endEnd.value = endStr.substring(i+1);			
		}
}

function splitDatetimeadd(startInputName,startBegName,startEndName,endInputName,endBegName,endEndName){

		var i;
		if(startInputName){
			var startInput = document.getElementById(startInputName); 
			var startBeg = document.getElementById(startBegName);
			var startEnd = document.getElementById(startEndName);
			var startStr = startInput.value;
			i = startStr.indexOf('/');
			var h=startStr.substring(0,i);
			if (h.length>6)
				startBeg.value = startStr.substring(0,i)+":00";
			else
				startBeg.value = startStr.substring(0,i);
			var m=startStr.substring(i+1);
			if (m.length>6)
				startEnd.value = startStr.substring(i+1)+":59";
			else
				startEnd.value = startStr.substring(i+1);
      		}
		
		if(endInputName){
			var endInput = document.getElementById(endInputName);  
			var endBeg = document.getElementById(endBegName);
			var endEnd = document.getElementById(endEndName);
			var endStr = endInput.value;
			i = endStr.indexOf('/');
			var n=endStr.substring(0,i);
			if (n.length>6)
				endBeg.value = endStr.substring(0,i)+":00";
			else
				endBeg.value = endStr.substring(0,i);
			var z=endStr.substring(i+1);
			if (z.length>6)
				endEnd.value = endStr.substring(i+1)+":59";
			else
				endEnd.value = endStr.substring(i+1);
		}
}

function splitDatetimerange2(onInputName,onBegName,onEndName){

		var i;

		if(onInputName){
			var onInput = document.getElementById(onInputName);  
			var onBeg = document.getElementById(onBegName);
			var onEnd = document.getElementById(onEndName);
			var onStr = onInput.value;
			i = onStr.indexOf('/');
			onBeg.value = onStr.substring(0,i);
      onEnd.value = onStr.substring(i+1);			
		}
}

function centerPopUpWindow(openurl,w,h)
{
	var chasm = screen.availWidth;
	var mount = screen.availHeight;

 window.open(openurl,'','width=' + w + ',height=' + h + ',left=' + ((chasm - w - 10) * .5) + ',top=' + ((mount - h - 30) * .5));

}

/**
 * @author zhangjs
 * @since 2005-10-31
 */
function isChinese(name) 
{
  if(name.length == 0)
  return false;
  for(i = 0; i < name.length; i++) {
  if(name.charCodeAt(i) > 128)
     return true;
  }
  return false;
} 

/*********************************************************
 * as for the parameter "catId" you given,getting its name
 * @authro lisong
 * @since 2006-3-38
 **********************************************************/
function getCatName(catId){
	if(catId=="")return;
	var catName="";
	var cat = document.getElementById(catId);
	if(cat){
		catName=cat.getAttribute("name");	
	}
	
	return catName;
}

function isDigit(s)
{
	var patrn=/^[0-9]{1,20}$/;
	if (!patrn.exec(s)) return false;
	return true;
}

function isMobil(s)
{
	var patrn=/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/; 
	if (!patrn.exec(s)) return false;
	return true;
}

function isTel(s)
{
	//var patrn=/^[+]{0,1}(\d){1,3}[ ]?([-]?(\d){1,12})+$/;
	var patrn=/^[+]{0,1}(\d?){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;  //modify by fzf 
	if (!patrn.exec(s)) return false;
	return true;
}

function isTelOrMobil(s){
	return isMobil(s) || isTel(s);
}

function isEmail(s) 
{
 	var patrn= /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	if (!patrn.exec(s)) return false;
	return true;
}

function isZipcode(s){
	if(s.length!=6) return false;
	return IsNumeric(s);
}

function   IsNumeric(tstr) {
	var     re   =   /^[0-9]*$/ 
	rp=tstr.search(re);   
	return (rp!=-1) 
} 

function getStrLength(str)
{ 
	var iLen = 0;

	for(i=0; i<str.length; i++)
	{
		temp = str.charAt(i);
		start = unescape("%00")
		end = unescape("%7f")
		if(temp>end || temp<start)
			iLen ++;
			
		iLen ++;
	}

  return iLen;
}

function isOverLength(str,definedlength)
{
	strlen = getStrLength(str);
	if(strlen > definedlength)
		return false;
	
	return true;
}


	//cookieName:the name of the right cookie
	//paraName:the checkbox name of that page
	//form:the form of the page
	//action:delete action of the page
	//fieldName:fieldName of the page.		
	function DeleteItem(cookieName,paraName,form,action,fieldName){
		var value = getCookie(cookieName);
		var par = "";
		var k = 1;
		var para = document.getElementsByName(paraName);
		var idArray = value.split(",");
		var len = para.length;
		var isChecked=false;//add by Qinchen
		var flag = true;		
	    for (var i = 0; i < para.length; i++) {
	    	if (para[i].checked == true) {
				var id = para[i].value;
				//alert(id);
				isChecked=true;
				for(var j=0;j<idArray.length;j++){
					if(idArray[j]==id){
						idArray[j]='0';
					}
				}
			}
		}
		for (var i=0;i<idArray.length;i++){
			if(idArray[i]!='0'){
				if(k!=1){
					par+="&";
				}
				else{
					par+="?";
				}
				par+=paraName+"="+idArray[i];
			}
			k++;
		}
		par = action+par;
		if(isChecked){//modify by Qinchen
			flag = confirmSubmit(form, par, fieldName);
		}
		//modify by Qinchen
		else{					
			alert("请选择一条记录！");
			return;
		}
		if(flag==true){
			setCookie(cookieName,"");
		}
	}
	
	//options about cookie
	function setCookie(name, value) {
	    document.cookie = name + "=" + escape(value)+ ";";
	}
 
	function getCookie(name) {
	//ȡ��cookie�е�ֵ
	   var search = name + "=";
	   if(document.cookie.length > 0) {
	      var offset = document.cookie.indexOf(search);
	      if(offset != -1) {
	         offset += search.length;
	         var end = document.cookie.indexOf(";", offset);
	         if(end == -1) end = document.cookie.length;
	         return unescape(document.cookie.substring(offset, end));
	      }
	      else return "";
	   }
	}
	

	function setValue(name,chbox){
		var Ids = getCookie(name);
		var id = Ids.split(',');
		var flag = true;
		var checked = getCookie("check");
		
		if(chbox.checked==true){
			for(var i=0;i<id.length;i++){
				if(chbox.value==id[i])
					flag=false;
			}
			if(flag){
				if(Ids=="")
					setCookie(name,Ids+chbox.value);
				else
					setCookie(name,Ids+","+chbox.value);
			}
		}else{
			var nameIndex = Ids.indexOf(chbox.value);
			if(nameIndex!=0)
				setCookie(name,Ids.substring(0,nameIndex-1)+Ids.substring(nameIndex+chbox.value.length,Ids.length));
			else
				setCookie(name,Ids.substring(chbox.value.length+1,Ids.length));
		}
	}
	/**add by Qinchen
  	*
  	* xmlhttp functions
  	* synchronization
  	*/
	
	function textHandler(text){
		result=text;

	}
	
	function getDeleteNoSelectedCheckboxMessage(urlstr){
				var xmlhttp = getXMLHttpRequest();
				var handlerFunction = getReadyStateHandler(xmlhttp,textHandler);
			  xmlhttp.onreadystatechange = handlerFunction;
			  xmlhttp.open("GET", urlstr, false);
			  xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			  xmlhttp.send(null);
			  return result;
	}
	
	function getXMLHttpRequest() {
	  var xmlreq = false;
	  result="";
	  if (window.XMLHttpRequest) {
	    
	    xmlreq = new XMLHttpRequest();
	  } else if (window.ActiveXObject) {
	    
	    try {
	      
	      xmlreq = new ActiveXObject("Msxml2.XMLHTTP");
	    } catch (e1) {
	      
	      try {
	       
	        xmlreq = new ActiveXObject("Microsoft.XMLHTTP");
	      } catch (e2) {
	        
	        
	      }
	    }
	  }
	  return xmlreq;
	}
	function getReadyStateHandler(req,responseTextHandler) {
	  
	  return function () {
	    
	    if (req.readyState == 4) {
	      
	      if (req.status == 200) {
	        
	        responseTextHandler(req.responseText);

	      } else {
	        
	       // alert("HTTP error: "+req.status);
	       return false;
	      }
	    }
	  }
	}  	 	
	
///******************************************************
//	*
//	*used for message and voice dial
//	*******************************************************/
//adde by tengshuang    
		    //var mousePos;
		    var dialMessage;
		    
		    function mouseMove(ev){
  				ev = ev || window.event;
  				var mousePos = mouseCoords(ev);
  				return mousePos;		
			}

			function mouseCoords(ev){
  				if(ev.pageX || ev.pageY){
    				return {x:ev.clientX, y:ev.clientY};
  				}
  				return {x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,y:ev.clientY + document.body.scrollTop - document.body.clientTop};
			}
		  	
		    function layervib(type,menu,state,dmessage){
		    	var E=eval("document.all."+menu+".style");
				if(state=='new'){
					var mousePos = mouseMove(window.onmousemove); 
					E.top=mousePos.y-10;
					E.left=mousePos.x-60;
					dialMessage=dmessage;
				}
		    	if (type=='visible'){
		    		E.visibility='visible';
				}
		    	else E.visibility='hidden';
			}
			
		    function creatDailLayer(voice,message){
		    	document.write("<div id='menu' style='position:absolute; background-color:#ffffff; width:80px; left:0px; top:0px; z-index:2; height: 24px; visibility: hidden;' onmouseover=layervib('visible','menu','','','') onmouseOut=layervib('hidden','menu','')>");
				document.write("<table width='80px' border='1px' cellspacing='2px' cellpadding='2px' bordercolor='#ADBF75' >") 
				document.write("<tr>");
				document.write("<td class='tableCellText-dial'  onclick=addDailMenu(3,'"+voice+"')>"+voice+"</td>");
				document.write("<td class='tableCellText-dial'  onclick=addDailMenu(5,'"+message+"')>"+message+"</td>");
				document.write("</tr>");
				document.write("</table>");
				document.write("</div>"); 
		   }
		   
		   function addDailMenu(tpyeId,type){
			   //alert("click:"+dialMessage);
			   if (tpyeId==3)
			   addMenu(0,type,'dial/dialChannel.action?channelTypeId='+tpyeId+'&'+dialMessage);
			   if (tpyeId==5)
			   addMenu(0,type,'dial/dialChannel.action?channelTypeId='+tpyeId+'&'+dialMessage);
		  }
	//added by lifan
	  
		   function editArea(areaName){
		 
		   var DivRef = document.getElementById("popDiv"); 
			DivRef.style.left=(document.body.offsetWidth/2)-200;
		   var IfrRef = document.getElementById("DivShim"); 
			DivRef.style.display = "block"; 
			IfrRef.style.width = DivRef.offsetWidth; 
			IfrRef.style.height = DivRef.offsetHeight; 
			IfrRef.style.top = DivRef.style.top; 
			IfrRef.style.left = DivRef.style.left; 
			IfrRef.style.zIndex = DivRef.style.zIndex - 1; 
			IfrRef.style.display = "block";  

		   	document.getElementById("editArea").value=document.getElementById(areaName).value;
		   	currentAreaName = areaName;
		}
		function hidden(){		
			var daps = document.getElementById("popDiv"); 
			
			document.getElementById("editArea").value="";
			daps.style.display="none";
			
			document.getElementById("DivShim").style.display="none";
		}
		function submitValue(){
		
			var daps = document.getElementById("popDiv"); 
			//$(currentAreaName).value = $F("editArea");
			
			daps.style.display="none";
			document.getElementById("DivShim").style.display="none";
		}
		
		
		//added by tengshuang for textarea input length restriction 2008-02-15
		//*******start
		
		function doKeyup(textId,maxLen){
			var element=document.getElementById(textId); 
			if(element.getAttribute && element.value.length>maxLen){
			element.blur();
			element.value=element.value.substring(0,maxLen)
			}
		} 
	    function checkPaste(textId, maxLen){
	      var str=document.getElementById(textId).value;
	      var oSR=document.selection.createRange();
	      var strData=clipboardData.getData('text');
	      var iLenPaste=maxLen-str.length+oSR.text.length;
	      oSR.text=strData.substring(0,iLenPaste);
	      return false;
	    }
		//*******end
	
	