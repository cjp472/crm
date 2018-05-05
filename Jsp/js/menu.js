
var entityId;
var currentTabId = "";//operating tabId
var currentMenuId = "";//operating menuId
var defaultMenuId = ""; //default menuid
var isLoaded = false;
var tabCount = 12;
var tabs = new Array(0);//array including all catId
var selectedTabs = new Array(0);// current array less than 10 catIds
var menus = new Array(0);
var selectedMenus = new Array(0);
var maxCatId = 0;


//initialize tab array,the selected's length is 10
function initTabData() {
	tabs = new Array(0);//array including all catId
	selectedTabs = new Array(0);// current array less than 10 catIds
	var data = document.getElementById("menudata");
	var j = 0; //array number
	for (var i = 0; i < data.childNodes.length; i++) {
		var field = data.childNodes[i];
		var parentCatId = field.getAttribute("parentCatId");
		var catId = field.getAttribute("id");
		var catTypeId = field.getAttribute("catTypeId");
		if (entityId == parentCatId && catTypeId == 5) {
			tabs.push(catId);
			if (j < tabCount) {
				selectedTabs.push(catId);
			}
			j++;
		}
	}
}	

//initialize menu array,the selected length is 10;
function initMenuData() {
	higlig = 0;//judge the default dispatcher catId;
	menus = new Array(0);
	selectedMenus = new Array(0);
	var data = document.getElementById("menudata");
	var j = 0;
	for (var i = 0; i < data.childNodes.length; i++) {
		var field = data.childNodes[i];
		var id = field.getAttribute("id");
		if (id > maxCatId) {
			maxCatId = id;
		}
		var parentCatId = field.getAttribute("parentCatId");
		var catTypeId = field.getAttribute("catTypeId");
		var higLig = field.getAttribute("higLig");
		if (currentTabId == parentCatId && catTypeId == 6) {
			if (higLig == 1) {
				defaultMenuId = id;
				//alert(defaultMenuId);
			}
			menus.push(id);
			if (j < tabCount) {
				selectedMenus.push(id);
			}
			j++;
		}
	}
		
	//alert(selectedMenus);
}
function init() {
	var data = document.getElementById("menudata");
	entityId = data.getAttribute("catId");
	var moduleId = data.getAttribute("moduleId");

	//if moduleId =1 ,half window.
	if (parent.SUBMENU) {
		if (moduleId == "1") {
			halfMenu();
		} else {
			maxMenu();
		}
	}
	initData();


	//if exists SUBMENU
	if (parent.SUBMENU) {
		parent.SUBMENU.entityId = currentTabId;
	}
	if (parent.SUBMENU) {
		parent.SUBMENU.initData();
	}	
//	if(parent.SUBMENU)parent.SUBMENU.displayData();
//	
}	
//the function control the two frames display and dispatcher.
function initData() {
	initTabData();
	displayTab();
	initMenuData();
	displayMenu();
	var data = document.getElementById("menudata");
	var isDispatcher = data.getAttribute("isDispatcher");
	if (isDispatcher == "1") {
		dispatcher();
	}
}
function displayTab() {
	var menutabs = document.getElementById("MENUTABS");
	menutabs.innerHTML = getTabHTML();
}
function displayMenu() {
	var menupages = document.getElementById("MENUPAGES");
	menupages.innerHTML = getMenuHTML();	
}
function getTabHTML() {
	var html = "";
	var contextpath = document.getElementById("CONTEXTPATH").getAttribute("value");
	html = html + "<table border=\"0\" align=\"left\" cellpadding=\"0\" cellspacing=\"0\" nowrap> <tr><td width=\"7\">&nbsp;</td>";
	if (tabs[0] != selectedTabs[0]) {
		html = html + "<td valign=bottom><img src=\"" + contextpath + "/images/previouspage.gif\" width=18 height=18  border=0  style=\"cursor:hand;\" onclick=\"appendPreviousPage()\"><img src=\"" + contextpath + "/images/previoustab.gif\" width=18 height=18  border=0  style=\"cursor:hand;\" onclick=\"appendPrevious()\">&nbsp;</td>";
	}
	for (var i = 0; i < selectedTabs.length; i++) {
		var tabId = selectedTabs[i];
		var field = document.getElementById(tabId);
		var catName = field.getAttribute("name");
//		alert(window.name +" currentTabId="+currentTabId);
		if (currentTabId == "") {
			if (i == 0) {
				currentTabId = tabId;
			}
		}
		if (tabId == currentTabId) {
			html = html + "<td width=\"13\"><img src=\"" + contextpath + "/images/table0701_08.gif\" width=\"12\" height=\"23\" alt=\"\"></td>";
			html = html + "<td align=\"center\" background=\"" + contextpath + "/images/table0701_10.gif\"><b class=\"t1\">" + catName + "</b></td>";
			html = html + "<td width=\"8\"><img src=\"" + contextpath + "/images/table0701_12.gif\" width=\"8\" height=\"23\" alt=\"\"></td>";
		} else {
			html = html + "<td width=\"12\" onclick=\"tuneTab('" + tabId + "')\"><img src=\"" + contextpath + "/images/table0701_02_1.gif\" height=\"23\" alt=\"\"></td>";
			html = html + "<td align=\"center\" background=\"" + contextpath + "/images/table0701_04_1.gif\" onclick=\"tuneTab('" + tabId + "')\"><span class=\"t2\" style=\"cursor:hand;\">" + catName + "</span></td>";
			html = html + "<td width=\"13\" onclick=\"tuneTab('" + tabId + "')\"><img src=\"" + contextpath + "/images/table0701_06_1.gif\" width=\"13\" height=\"23\" alt=\"\"></td>";
		}
	}
	if (tabs[tabs.length - 1] != selectedTabs[selectedTabs.length - 1]) {
		html = html + "<td valign=bottom>&nbsp;<img src=\"" + contextpath + "/images/nexttab.gif\" width=18 height=18 border=0 style=\"cursor:hand;\" onclick=\"appendNext()\"><img src=\"" + contextpath + "/images/nextpage.gif\" width=18 height=18 border=0 style=\"cursor:hand;\" onclick=\"appendNextPage()\"></td>";
	}
	html = html + " </tr> </table>";

//	alert(html);
	return html;
}	

//remove the first from selectedTabs then add to the last
function appendNext() {
	var nextCatId = "";
//get the position of selectedTabs
	for (var i = 0; i < tabs.length; i++) {
		if (tabs[i] == selectedTabs[selectedTabs.length - 1]) {
			break;
		}
	}
	nextCatId = tabs[i + 1]; 
	//the following one expression added by kexianneng 2006-10-30
	if (selectedTabs.length >= tabCount) {
		selectedTabs.shift();
	}//remove the first 
	selectedTabs.push(nextCatId);//add one after the last 
	currentTabId = "";
	currentMenuId = "";
	displayTab();
	initMenuData();
	displayMenu();
	dispatcher();
}	

//remove the first from selectedTabs then add to the last
function appendNextPage() {
	var pos = 0;
	for (var i = 0; i < tabs.length; i++) {
		if (tabs[i] == selectedTabs[selectedTabs.length - 1]) {
			break;
		}
	}
	if (tabs.length <= i + tabCount) {
		pos = tabs.length;
	} else {
		pos = i + tabCount;
	}
	selectedTabs = tabs.slice(i + 1, pos); 
//	alert(tabs+":::::::::::"+selectedTabs);
	currentTabId = "";
	currentMenuId = "";
	displayTab();
	initMenuData();
	displayMenu();
	dispatcher();
}
function appendPrevious() {
	var previousCatId = "";
	//get the position of selectedTabs
	for (var i = 0; i < tabs.length; i++) {
		if (tabs[i] == selectedTabs[0]) {
			break;
		}
	}
	previousCatId = tabs[i - 1];
	selectedTabs.unshift(previousCatId);//add it before the first
	//the following one expression added by kexianneng 2006-10-30
	if (selectedTabs.length >= tabCount) {
		selectedTabs.pop();
	}//remove the last


//	alert(tabs+":::::::::::"+selectedTabs);	
	currentTabId = "";
	currentMenuId = "";
	displayTab();
	initMenuData();
	displayMenu();
	dispatcher();
}
function appendPreviousPage() {
	var pos = 0;
	for (var i = 0; i < tabs.length; i++) {
		if (tabs[i] == selectedTabs[0]) {
			break;
		}
	}
	if (i - tabCount > 0) {
		pos = i - tabCount;
	} else {
		pos = 0;
	}
	selectedTabs = tabs.slice(pos, i); 

//	alert(tabs+":::::::::::"+selectedTabs);	
	currentTabId = "";
	currentMenuId = "";
	displayTab();
	initMenuData();
	displayMenu();
	dispatcher();
}
function getMenuHTML() {
	var contextpath = document.getElementById("CONTEXTPATH").getAttribute("value");
	var html = "&nbsp;";
	for (var i = 0; i < selectedMenus.length; i++) {
		var menuId = selectedMenus[i];
		var field = document.getElementById(menuId);
		var catName = field.getAttribute("name");
		var isAppend = field.getAttribute("isAppend");

		
		//setting the default menu,when higlig=1
		if (currentMenuId == "") {
			if (defaultMenuId == "") {//if no higlig ,the default is catId when i=0
				if (i == 0) {
					currentMenuId = menuId;
				}
			} else {
				currentMenuId = defaultMenuId;
			}
		}
		//alert("currentMenuId:"+currentMenuId);
		if (i > 0) {
			html = html + "&nbsp;<span class=\"unnamed1\">|</span>&nbsp;";
		}
		if (menuId == currentMenuId) {
			html = html + "&nbsp;&nbsp;<b><span class=\"unnamed1\" onclick=\"clickMenu('" + menuId + "')\" style=\"cursor:hand\"> " + catName + "</span></b>&nbsp;&nbsp;";
		} else {
			html = html + "&nbsp;&nbsp;<span class=\"unnamed1\" onclick=\"clickMenu('" + menuId + "')\" style=\"cursor:hand\"> " + catName + "</span>&nbsp;&nbsp;";
		}
				// additional menuId ,added by icon named closewindow
		if (isAppend == 1) {
			html = html + "<img src=\"" + contextpath + "/images/closewindow.gif\" onclick=\"removeMenu('" + menuId + "')\" style=\"cursor:hand\"> ";
		}
	} 
		//alert(html);
//		alert(entityId);
	return html;
}
function load() {
	init();
	/*	
	if(parent.SUBMENU){ //existing child menu
		if(parent.SUBMENU.isLoaded){
			init();
			isLoaded=true;	
		}
	}
	else{//for simplemain.jsp
			init();
			isLoaded=true;	
	}
*/
}

//change the tab,redisplay tab and menu.
function tuneTab(tabId) {
//	alert(tabs+"::::"+selectedTabs);
//	alert(window.name);
	currentTabId = tabId;
	//clear current menuId
	currentMenuId = "";
	displayTab();
	initMenuData();
	displayMenu();
	dispatcher();	
	
	//if exists SUBMENU
	if (window.name == "MAINMENU") {
		if (parent.SUBMENU) {
			parent.SUBMENU.entityId = currentTabId;
		}
		if (parent.SUBMENU) {
			parent.SUBMENU.currentTabId = "";
		}
		if (parent.SUBMENU) {
			parent.SUBMENU.currentMenuId = "";
		}
		if (parent.SUBMENU) {
			parent.SUBMENU.initData();
		}
	}
}
/**************************
 * clicking menu,change the menu display and dispatcher.
 *
 **************************/
function clickMenu(menuId) {
	//alert(currentTabId);
	//alert(defaultMenuId);
	currentMenuId = menuId;
	displayMenu();
	dispatcher();
	if (parent.SUBMENU){
	if (window.name == "MAINMENU"){
		if(parent.SUBMENU.currentMenuId!=null)
			parent.SUBMENU.clickMenu(parent.SUBMENU.currentMenuId);
		else
			parent.SUBMENU.clickMenu(parent.SUBMENU.defaultMenuId);
		}
		}
}
function clickSubMenu(){
	if (parent.SUBMENU){
		if (window.name == "MAINMENU"){
			if(parent.SUBMENU.currentMenuId!=null)
				parent.SUBMENU.clickMenu(parent.SUBMENU.defaultMenuId);
			else
				parent.SUBMENU.clickMenu(parent.SUBMENU.defaultMenuId);
			}
		}
}


//get the current menuId ,dealing with it.
function dispatcher() {
	var data = document.getElementById("menudata");
	var catId = data.getAttribute("catId");
	var field = document.getElementById(currentMenuId);
	if (field) {
		var call = field.getAttribute("call");
		
		var parameter = call.split("?");
		if(parameter.length==2){
			var para = parameter[1];
			var parameters = para.split('&');
			for(var i = 0; i<parameters.length;i++){
				var nameValue = parameters[i].split("=");
				var dollarPos = nameValue[1].indexOf("$");
				var bracketPos = nameValue[1].lastIndexOf("}");
				if(dollarPos != -1 && bracketPos != -1){
					//get parameter's orignial name
					var value = nameValue[1].substring(dollarPos+2,bracketPos);
					try{
						//get parameter value from session
						var sValue = getSessionValue(value);
					}
					catch(err)
					{
						var sValue ="";	
					}
					//replace ${para-name}with session-value
					call=call.replace(nameValue[1],sValue); 
				}else{}
			}
		}
		else{}
		
		var toFrame = field.getAttribute("toFrame");
		var doc = window.document;
		form = doc.createElement("form");
		form.setAttribute("name", "funcform");
		form.setAttribute("method", "post");
		form.setAttribute("target", toFrame);
		form.setAttribute("action", "../" + call);
		doc.appendChild(form);
		input = doc.createElement("input");
		input.setAttribute("type", "hidden");
		input.setAttribute("name", "entityId");
		input.setAttribute("value", catId);
		form.appendChild(input);
		input = doc.createElement("input");
		input.setAttribute("type", "hidden");
		input.setAttribute("name", "currentCatId");
		input.setAttribute("value", currentTabId);
		form.appendChild(input);
		input = doc.createElement("input");
		input.setAttribute("type", "hidden");
		input.setAttribute("name", "menuId");
		input.setAttribute("value", currentMenuId);
		form.appendChild(input);
	//get node's attribute --queryparams,the value is the condition of operation.
		if (field.getAttribute("queryParams")) {
			queryParams = field.getAttribute("queryParams");
			var params = queryParams.split("&");
			for (var i = 0; i < params.length; i++) {
				var param = params[i];
				if (param.length > 0) {
					var namevalue = param.split("=");
					if (namevalue) {
						var name = namevalue[0];
						var value = namevalue[1];
						input = doc.createElement("input");
						input.setAttribute("type", "hidden");
						input.setAttribute("name", name);
						input.setAttribute("value", value);
						form.appendChild(input);
					}
				}
			}
		}
		form.submit();
	}
}

//get session value via Ajax
function getSessionValue(sessionName){
	var id = sessionName;
	var rt;
	var requestUrl = "getSessionValue.action";
	var pars = "sessionName=" + id;
	new Ajax.Request(requestUrl, {parameters:pars, asynchronous:false, onSuccess:function (transport) {
		rt = transport.responseText;
	}});
	return rt;
}


//set menuId'property High light.
function tuneHighLight(menuId, isSub, isContent) {
	if (window.name == "SUBCONTENT") {
		parent.SUBMENU.currentMenuId = menuId;
		parent.SUBMENU.displayMenu();
	} else {
		
		parent.MAINMENU.currentMenuId = menuId;
		parent.MAINMENU.displayMenu();
	}
}
function saveQueryParams(menuId) {
	if (document.all["encodedQueryParams"]) {
		queryParams = document.all["encodedQueryParams"].value;
	}
	if (document.all["paginationSupport.page"]) {
		queryParams = queryParams + "&paginationSupport.page=" + document.all["paginationSupport.page"].value;
	}
	if (document.all["paginationSupport.sorter.field"]) {
		queryParams = queryParams + "&paginationSupport.sorter.field=" + document.all["paginationSupport.sorter.field"].value;
	}
	if (document.all["paginationSupport.sorter.order"]) {
		queryParams = queryParams + "&paginationSupport.sorter.order=" + document.all["paginationSupport.sorter.order"].value;
	}
	if (window.name == "SUBCONTENT") {
		parent.SUBMENU.loadQueryParams(menuId, queryParams);
	} else {
		parent.MAINMENU.loadQueryParams(menuId, queryParams);
	}
}
function loadQueryParams(menuId, queryParams) {
	var field = document.getElementById(menuId);
	if (typeof (field) != "undefined" && field != null) {
		field.setAttribute("queryParams", queryParams);
	}
}
function addMenu(isSub, menuName, menuAction) {
	var queryParams = "";
	if (document.all["encodedQueryParams"]) {
		queryParams = document.all["encodedQueryParams"].value;
	}
	if (window.name == "SUBCONTENT") {
		parent.SUBMENU.appendMenu(menuName, menuAction, queryParams);
	} else {
		parent.MAINMENU.appendMenu(menuName, menuAction, queryParams);
	}
}
function removeMenu(menuCatId) {
	//remove node from XML
	var data = document.getElementById("menudata");
	var field = document.getElementById(menuCatId);
	var sourceMenuCatId = field.getAttribute("sourceMenuCatId");
	var queryParams = field.getAttribute("queryParams");
	data.removeChild(field);
		// remove from selectedMenus array
	selectedMenus.remove(menuCatId);
		//redisplay menu and diapatch history menuId
	clickMenu(sourceMenuCatId);
}
function appendMenu(menuName, menuAction, queryParams) {
	var toFrame = "MAINCONTENT";
	if (window.name == "SUBMENU") {
		toFrame = "SUBCONTENT";
	}
		
		//var menuCatId = String(parseInt(currentMenuId)+10);
		
	// modified by wangdong 20080408 begin (If maxCatId=3515028011011000000, it can be increased again by parseInt(maxCatId) + 10)
//	maxCatId = parseInt(maxCatId) + 10;	//added by liutt
//	var menuCatId = String(parseInt(maxCatId) + 10);

	maxCatId = maxCatId + 1;
	var menuCatId = maxCatId;
	// modified by wangdong 20080408 end
	
	var field = document.createElement("FIELD");
	field.setAttribute("name", menuName);
	field.setAttribute("id", menuCatId);
	field.setAttribute("parentCatId", currentTabId);
	field.setAttribute("catTypeId", "6");
	field.setAttribute("call", menuAction);
	field.setAttribute("toFrame", toFrame);
	field.setAttribute("higLig", "0");
		//Remark the menu is appended .
	field.setAttribute("isAppend", 1);
	if(currentTabId=="100010"){
		field.setAttribute("sourceMenuCatId", "10001005");
	}
	else{
		field.setAttribute("sourceMenuCatId", String(currentMenuId));
	}
	field.setAttribute("queryParams", queryParams);
	var data = document.getElementById("menudata");
	data.appendChild(field);
	selectedMenus.push(menuCatId);
	clickMenu(menuCatId);
}
Array.prototype.remove = function (s) {
	var result = false;
	for (var i = 0, n = 0; i < this.length; i++) {
		if (this[i] != s) {
			this[n++] = this[i];
		} else {
			result = true;
		}
	}
	if (result) {
		this.length -= 1;
	}
};
function minMenu() {
	var bar = parent.document.getElementById("MENUBAR");
	bar.setAttribute("pos", "0");
	var frameset = parent.document.getElementById("MAINFRAMESET");
	if (frameset == null) {
		return;
	}
	var framename = window.name;
	if (framename == "MAINMENU") {
		frameset.setAttribute("rows", "0,48pt,*");
	} else {
		frameset.setAttribute("rows", "0,*,48pt");
	}
}
function halfMenu() {
	var bar = parent.document.getElementById("MENUBAR");
	bar.setAttribute("pos", "1");
	var frameset = parent.document.getElementById("MAINFRAMESET");
	if (frameset == null) {
		return;
	}
	var framename = window.name;
	if (framename == "MAINMENU") {
		frameset.setAttribute("rows", "0,50%,18pt,*");
	} else {
		frameset.setAttribute("rows", "0,50%,18pt,*");
	}
}
function maxMenu() {
	var bar = parent.document.getElementById("MENUBAR");
	bar.setAttribute("pos", "2");
	var frameset = parent.document.getElementById("MAINFRAMESET");
	if (frameset == null) {
		return;
	}
	var framename = window.name;
	if (framename == "MAINMENU") {
		frameset.setAttribute("rows", "0,*,18pt,48pt");
	} else {
		frameset.setAttribute("rows", "0,48pt,18pt,*");
	}
}

function tuneHighLightSubMenu()
{
	parent.SUBMENU.clickMenu(parent.SUBMENU.currentMenuId);
}
function initRefreshSubMenu(){
	if(window.name=="SUBMENU" ||window.name=="SUBCONTENT")
	 	return;
	else if (parent.SUBMENU)
		parent.MAINMENU.clickSubMenu();
}
function executeAction(menuId,action){
	var url = getCookie("urlCookie");
	if(url==null || url=="")
		return;
	else{
		var parameter=new Array();
		var requestUrl="";
		var para;
		var pars;
		parameter=url.split("?");
		para=parameter[0];
		var urlStr = para.split('/');
		urlStr[urlStr.length-1] = action;
		for(var i=0;i<urlStr.length;i++){
			requestUrl+=urlStr[i];
			if(i!=urlStr.length-1)
				requestUrl+='/';
		}
		pars=parameter[1];
		new Ajax.Request(requestUrl, {
					parameters: pars,
					onSuccess: function(transport) {
				    parent.MAINMENU.clickMenu(menuId);
			    }
	        });	
	    RemoveCookie("urlCookie");	
    }
}
function executeBottomAction(){
	var url = getCookie("urlCookie");
	if(url==null || url=="")
		return;
	else{
		var parameter=new Array();
		var requestUrl="";
		var requestPara="";
		var pars;
		var menuId;
		var tabId;
		var tabType;
		var tabIdStr;
		var parMenuId;
		parameter=url.split("?");
		requestUrl=parameter[0];
		pars=parameter[1];
		parameters = pars.split('&');
		for(var j=0;j<parameters.length;j++){
			var nameValue = parameters[j].split('=');
			if(nameValue[0] =='customerTypeId')
				tabType=nameValue[1];
			if(nameValue[0]=="tabId")
				tabId = nameValue[1];
			if(nameValue[0]=="listMenuId")
				parMenuId = nameValue[1];
			if(nameValue[0]=="detailMenuId")
				menuId = nameValue[1];
		}
		tabId = tabId*1;
		parMenuId = parMenuId*1;
		menuId = menuId*1;
		//alert(tabId+","+parMenuId+","+menuId);
		tabIdStr=tabId.toString(10);
		for(var i=0;i<parameters.length;i++){
			var nameValue = parameters[i].split('=');
			if(nameValue[0]=='isSub')
				nameValue[1] = '0';
			if(nameValue[0]=='menuId')
				nameValue[1] = parMenuId;
			
			requestPara+=nameValue[0]+'='+nameValue[1];
			if(i!=parameters.length-1)
				requestPara+='&';
		}
		new Ajax.Request(requestUrl, {
					parameters: requestPara,
					onSuccess: function(transport) {
					if(parent.MAINMENU.currentTabId!=tabId){
						parent.MAINMENU.tuneTab(tabIdStr);
						}
				    parent.MAINMENU.clickMenu(menuId);
			    }
	        });	
	    RemoveCookie("urlCookie");	
	}
}