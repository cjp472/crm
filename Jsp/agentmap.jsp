<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
  		<style type="text/css">
<!--
.allReady {	
	border:1px solid #7ac589;
	background-color:#f0fef2;
	padding:5px;
	height:70px;
	cursor:pointer;
}
.allReadyOver {	
	border:1px solid #7ac589;
	background-color:#ccfbd2;
	padding:5px;
	height:70px;
	cursor:pointer;
}
.allReadyDown {	
	border:2px outset #17a200;
	background-color:#ccfbd2;
	padding:5px;
	height:70px;
	cursor:pointer;
}
.partReady {	
	border:1px solid #5f94e0;
	background-color:#eff6ff;
	padding:5px;height:70px;
	cursor:pointer;
}
.partReadyOver {	
	border:1px solid #5f94e0;
	background-color:#d4e3fe;
	padding:5px;height:70px;
	cursor:pointer;
}
.partReadyDown {	
	border:2px outset #1d78d8;
	background-color:#d4e3fe;
	padding:5px;height:70px;
	cursor:pointer;
}
.busy {	
	border:1px solid #debe5c;
	background-color:#fffbf2;
	padding:5px;height:70px;
	cursor:pointer;
}
.busyOver {	
	border:1px solid #debe5c;
	background-color:#fceed2;
	padding:5px;height:70px;
	cursor:pointer;
}
.busydown {	
	border:2px outset #ffae00;
	background-color:#fceed2;
	padding:5px;height:70px;
	cursor:pointer;
}
.offLine {	
	border:1px solid #ff4f4f;
	background-color:#fff1f2;
	padding:5px;height:70px;
	cursor:pointer;
}
.offLineOver {	
	border:1px solid #ff4f4f;
	background-color:#fcd8db;
	padding:5px;height:70px;
	cursor:pointer;
}
.offLineDown {	
	border:2px outset #ff0000;
	background-color:#fcd8db;
	padding:5px;height:70px;
	cursor:pointer;
}
.noAgent {	
	border:1px solid #dddddd;
	background-color:#fbfbfb;
	padding:5px;height:70px;
	cursor:default;
}
.leftTree {
	margin: 0px;
	border: none;
	overflow:auto;
	background-color: #fbfbfb;
}
button{
	width:60px;
	height:20px
}
-->
</style>
  </head>
  <body>
  	
  	<div style="padding:10px;overflow:hidden">
  		<div class="deltitle" >
  		<div class="floatleft">
  			<select style="width:180px">
  				<option>全部座席组</option>
  				<option>座席组1</option>
  				<option>座席组2</option>
  				<option>座席组3</option>
  				<option>座席组4</option>
  			</select>
  		</div>
	  		<div class="floatleft">
		  				排序
		  				<select>
		  					<option>姓名</option>
		  					<option>座席ID</option>
		  					<option>DN</option>
		  					<option>登录时长</option>
		  					<option>通话时长</option>
		  				</select>
		  				<select>
		  					<option>升序</option>
		  					<option>降序</option>
		  				</select>
		  			</div>
	  		<div class="floatright operation">
	  			
	  			<div class="floatright cursorhand" style="margin-right:10px"><button style="width:60px;height:20px">强拆</button></div>
	  			<div class="floatright cursorhand" style="margin-right:10px"><button style="width:60px;height:20px">强插</button></div>
	  			<div class="floatright cursorhand" style="margin-right:10px"></div><button style="width:60px;height:20px">挂断</button></div>
	  			<div class="floatright cursorhand" style="margin-right:10px"><button style="width:60px;height:20px">监听</button></div>
	  			<div class="floatright cursorhand" style="margin-right:10px;"><button style="width:80px;height:20px">列表显示</button></div>
	  		</div>
	  		<div class="clearboth"></div>
	  	</div>
	  	<div class="clearboth"></div>
<!-------------------------------------状态开始-->
<table width="100%" border="0" cellpadding="4" cellspacing="0">
      <tr><td width="25%" id="agentTD1">
		  <table id="agent1" width="100%" border="0" class="allReady" onMouseOver="this.className='allReadyOver';showPipeStat('agent1pipeStat')" onMouseOut="this.className='allReady';HidePipeStat('agent1pipeStat')"  onMouseDown="this.className='allReadyDown'">
              <tr>
                <td width="70" rowspan="3" align="center">7001<br><img src="../images/agentStat_AllReady.gif" width="22" height="32" border="0" align="absmiddle"><br>
                全部就绪
				</td>
                <td class="nobreak">
					  <div id="agent1pipeStat" style="border:1px solid #cccccc; position:absolute; background-color:#FFFFFF; height:90px; width:150px; display:none">
						<table width="100%"  border="0" cellspacing="0" cellpadding="2">
						  <tr>
							<td>电话</td>
							<td>处理中</td>
						    <td>12'34</td>
						  </tr>
						  <tr>
							<td>E-mail</td>
							<td>就绪</td>
						    <td>05'12</td>
						  </tr>
						  <tr>
							<td>短信</td>
							<td>暂停</td>
						    <td>00'34</td>
						  </tr>
						  <tr>
							<td>传真</td>
							<td>就绪</td>
						    <td>00'25</td>
						  </tr>
						  <tr>
							<td>Chat</td>
							<td>暂停</td>
						    <td>45'12</td>
						  </tr>
						</table>
					  </div>
				kober</td>
              </tr>
              <tr>
                <td> 02:01:00 </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
            </tr>
        </table>
		</td>
        <td width="25%"  id="agentTD2">
		  <table id="agent2" width="100%" border="0" class="allReady" onMouseOver="this.className='allReadyOver';showPipeStat('agent2pipeStat')" onMouseOut="this.className='allReady';HidePipeStat('agent2pipeStat')" onMouseDown="this.className='allReadyDown'">
            <tr>
              <td width="70" rowspan="3" align="center">7001<br>
                  <img src="../images/agentStat_AllReady.gif" width="22" height="32" border="0" align="absmiddle"><br>
      全部就绪</td>
              <td class="nobreak">
			  <div id="agent2pipeStat" style="border:1px solid #cccccc; position:absolute; background-color:#FFFFFF; height:90px; width:150px; display:none">
			    <table width="100%"  border="0" cellspacing="0" cellpadding="2">
						  <tr>
							<td>电话</td>
							<td>处理中</td>
						    <td>12'34</td>
						  </tr>
						  <tr>
							<td>E-mail</td>
							<td>就绪</td>
						    <td>05'12</td>
						  </tr>
						  <tr>
							<td>短信</td>
							<td>暂停</td>
						    <td>00'34</td>
						  </tr>
						  <tr>
							<td>传真</td>
							<td>就绪</td>
						    <td>00'25</td>
						  </tr>
						  <tr>
							<td>Chat</td>
							<td>暂停</td>
						    <td>45'12</td>
						  </tr>
				</table>
			  </div>
			  kober</td>
            </tr>
            <tr>
              <td> 02:01:00 </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
            </tr>
          </table></td>
        <td width="25%"  id="agentTD3">
		  <table id="agent3" width="100%" border="0" class="allReady" onMouseOver="this.className='allReadyOver';showPipeStat('agent3pipeStat')" onMouseOut="this.className='allReady';HidePipeStat('agent3pipeStat')" onMouseDown="this.className='allReadyDown'">
            <tr>
              <td width="70" rowspan="3" align="center">7001<br>
                  <img src="../images/agentStat_AllReady.gif" width="22" height="32" border="0" align="absmiddle"><br>
      全部就绪</td>
              <td class="nobreak">
			  <div id="agent3pipeStat" style="border:1px solid #cccccc; position:absolute; background-color:#FFFFFF; height:90px; width:150px; display:none">
						<table width="100%"  border="0" cellspacing="0" cellpadding="2">
						  <tr>
							<td>电话</td>
							<td>处理中</td>
						    <td>12'34</td>
						  </tr>
						  <tr>
							<td>E-mail</td>
							<td>就绪</td>
						    <td>05'12</td>
						  </tr>
						  <tr>
							<td>短信</td>
							<td>暂停</td>
						    <td>00'34</td>
						  </tr>
						  <tr>
							<td>传真</td>
							<td>就绪</td>
						    <td>00'25</td>
						  </tr>
						  <tr>
							<td>Chat</td>
							<td>暂停</td>
						    <td>45'12</td>
						  </tr>
						</table>
			    </div>
			  kober</td>
            </tr>
            <tr>
              <td> 02:01:00 </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
            </tr>
          </table></td>
        <td width="25%"  id="agentTD4">
		  <table id="agent4" width="100%" border="0" class="offLine" onMouseOver="this.className='offLineOver';showPipeStat('agent4pipeStat')" onMouseOut="this.className='offLine';HidePipeStat('agent4pipeStat')" onMouseDown="this.className='offLineDown'">
            <tr>
              <td width="70" rowspan="3" align="center">5412<br>
                  <img src="../images/agentStat_offline.gif" width="23" height="32" border="0" align="absmiddle"><br>
      离线</td>
              <td class="nobreak">
			  <div id="agent4pipeStat" style="border:1px solid #cccccc; position:absolute; background-color:#FFFFFF; height:90px; width:150px; display:none">
						<table width="100%"  border="0" cellspacing="0" cellpadding="2">
						  <tr>
							<td>电话</td>
							<td>处理中</td>
						    <td>12'34</td>
						  </tr>
						  <tr>
							<td>E-mail</td>
							<td>就绪</td>
						    <td>05'12</td>
						  </tr>
						  <tr>
							<td>短信</td>
							<td>暂停</td>
						    <td>00'34</td>
						  </tr>
						  <tr>
							<td>传真</td>
							<td>就绪</td>
						    <td>00'25</td>
						  </tr>
						  <tr>
							<td>Chat</td>
							<td>暂停</td>
						    <td>45'12</td>
						  </tr>
						</table>
			    </div>
			  kober</td>
            </tr>
            <tr>
              <td>02:01:00 </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
            </tr>
          </table></td>
      </tr>
      <tr>
        <td width="25%"  id="agentTD5">
		<table id="agent5" width="100%" border="0" class="partReady" onMouseOver="this.className='partReadyOver';showPipeStat('agent5pipeStat')" onMouseOut="this.className='partReady';HidePipeStat('agent5pipeStat')" onMouseDown="this.className='partReadyDown'">
          <tr>
            <td width="70" rowspan="3" align="center">3302<br><img src="../images/agentStat_partReady.gif" width="23" height="32" border="0" align="absmiddle"><br>
            部分就绪</td>
            <td class="nobreak">
			<div id="agent5pipeStat" style="border:1px solid #cccccc; position:absolute; background-color:#FFFFFF; height:90px; width:150px; display:none">
						<table width="100%"  border="0" cellspacing="0" cellpadding="2">
						  <tr>
							<td>电话</td>
							<td>处理中</td>
						    <td>12'34</td>
						  </tr>
						  <tr>
							<td>E-mail</td>
							<td>就绪</td>
						    <td>05'12</td>
						  </tr>
						  <tr>
							<td>短信</td>
							<td>暂停</td>
						    <td>00'34</td>
						  </tr>
						  <tr>
							<td>传真</td>
							<td>就绪</td>
						    <td>00'25</td>
						  </tr>
						  <tr>
							<td>Chat</td>
							<td>暂停</td>
						    <td>45'12</td>
						  </tr>
						</table>
			  </div>
			kober</td>
          </tr>
          <tr>
            <td>02:01:00 </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
        </table></td>
        <td width="25%"  id="agentTD6">
		  <table id="agent6" width="100%" border="0" class="allReady" onMouseOver="this.className='allReadyOver';showPipeStat('agent6pipeStat')" onMouseOut="this.className='allReady';HidePipeStat('agent6pipeStat')" onMouseDown="this.className='allReadyDown'">
            <tr>
              <td width="70" rowspan="3" align="center">7001<br>
                  <img src="../images/agentStat_AllReady.gif" width="22" height="32" border="0" align="absmiddle"><br>
      全部就绪</td>
              <td class="nobreak">
			  <div id="agent6pipeStat" style="border:1px solid #cccccc; position:absolute; background-color:#FFFFFF; height:90px; width:150px; display:none">
						<table width="100%"  border="0" cellspacing="0" cellpadding="2">
						  <tr>
							<td>电话</td>
							<td>处理中</td>
						    <td>12'34</td>
						  </tr>
						  <tr>
							<td>E-mail</td>
							<td>就绪</td>
						    <td>05'12</td>
						  </tr>
						  <tr>
							<td>短信</td>
							<td>暂停</td>
						    <td>00'34</td>
						  </tr>
						  <tr>
							<td>传真</td>
							<td>就绪</td>
						    <td>00'25</td>
						  </tr>
						  <tr>
							<td>Chat</td>
							<td>暂停</td>
						    <td>45'12</td>
						  </tr>
						</table>
			    </div>
			  kober</td>
            </tr>
            <tr>
              <td> 02:01:00 </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
            </tr>
          </table></td>
        <td width="25%"  id="agentTD7">
		<table id="agent7" width="100%" border="0" class="busy" onMouseOver="this.className='busyOver';showPipeStat('agent7pipeStat')" onMouseOut="this.className='busy';HidePipeStat('agent7pipeStat')" onMouseDown="this.className='busyDown'">
          <tr>
            <td width="70" rowspan="3" align="center">1234<br><img src="../images/agentStat_busy.gif" width="23" height="32" border="0" align="absmiddle"><br>
            忙碌</td>
            <td class="nobreak">
			<div id="agent7pipeStat" style="border:1px solid #cccccc; position:absolute; background-color:#FFFFFF; height:90px; width:150px; display:none">
						<table width="100%"  border="0" cellspacing="0" cellpadding="2">
						  <tr>
							<td>电话</td>
							<td>处理中</td>
						    <td>12'34</td>
						  </tr>
						  <tr>
							<td>E-mail</td>
							<td>就绪</td>
						    <td>05'12</td>
						  </tr>
						  <tr>
							<td>短信</td>
							<td>暂停</td>
						    <td>00'34</td>
						  </tr>
						  <tr>
							<td>传真</td>
							<td>就绪</td>
						    <td>00'25</td>
						  </tr>
						  <tr>
							<td>Chat</td>
							<td>暂停</td>
						    <td>45'12</td>
						  </tr>
						</table>
			  </div>
			kober</td>
          </tr>
          <tr>
            <td>02:01:00 </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
        </table></td>
        <td width="25%"  id="agentTD8">
		  <table id="agent8" width="100%" border="0" class="offLine" onMouseOver="this.className='offLineOver';showPipeStat('agent8pipeStat')" onMouseOut="this.className='offLine';HidePipeStat('agent8pipeStat')"  onMouseDown="this.className='offLineDown'">
            <tr>
              <td width="70" rowspan="3" align="center">5412<br>
                  <img src="../images/agentStat_offline.gif" width="23" height="32" border="0" align="absmiddle"><br>
      离线</td>
              <td class="nobreak">
			  <div id="agent8pipeStat" style="border:1px solid #cccccc; position:absolute; background-color:#FFFFFF; height:90px; width:150px; display:none">
						<table width="100%"  border="0" cellspacing="0" cellpadding="2">
						  <tr>
							<td>电话</td>
							<td>处理中</td>
						    <td>12'34</td>
						  </tr>
						  <tr>
							<td>E-mail</td>
							<td>就绪</td>
						    <td>05'12</td>
						  </tr>
						  <tr>
							<td>短信</td>
							<td>暂停</td>
						    <td>00'34</td>
						  </tr>
						  <tr>
							<td>传真</td>
							<td>就绪</td>
						    <td>00'25</td>
						  </tr>
						  <tr>
							<td>Chat</td>
							<td>暂停</td>
						    <td>45'12</td>
						  </tr>
						</table>
			    </div>
			  kober</td>
            </tr>
            <tr>
              <td>02:01:00 </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
            </tr>
          </table></td>
      </tr>
      <tr>
        <td width="25%"  id="agentTD9">
		  <table id="agent9" width="100%" border="0" class="allReady" onMouseOver="this.className='allReadyOver';showPipeStat('agent9pipeStat')" onMouseOut="this.className='allReady';HidePipeStat('agent9pipeStat')"  onMouseDown="this.className='allReadyDown'">
            <tr>
              <td width="70" rowspan="3" align="center">7001<br>
                  <img src="../images/agentStat_AllReady.gif" width="22" height="32" border="0" align="absmiddle"><br>
      全部就绪</td>
              <td class="nobreak">
			  <div id="agent9pipeStat" style="border:1px solid #cccccc; position:absolute; background-color:#FFFFFF; height:90px; width:150px; display:none">
						<table width="100%"  border="0" cellspacing="0" cellpadding="2">
						  <tr>
							<td>电话</td>
							<td>处理中</td>
						    <td>12'34</td>
						  </tr>
						  <tr>
							<td>E-mail</td>
							<td>就绪</td>
						    <td>05'12</td>
						  </tr>
						  <tr>
							<td>短信</td>
							<td>暂停</td>
						    <td>00'34</td>
						  </tr>
						  <tr>
							<td>传真</td>
							<td>就绪</td>
						    <td>00'25</td>
						  </tr>
						  <tr>
							<td>Chat</td>
							<td>暂停</td>
						    <td>45'12</td>
						  </tr>
						</table>
			    </div>
			  kober</td>
            </tr>
            <tr>
              <td> 02:01:00 </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
            </tr>
          </table></td>
        <td width="25%"  id="agentTD10">
		  <table id="agent10" width="100%" border="0" class="allReady" onMouseOver="this.className='allReadyOver';showPipeStat('agent10pipeStat')" onMouseOut="this.className='allReady';HidePipeStat('agent10pipeStat')"  onMouseDown="this.className='allReadyDown'">
            <tr>
              <td width="70" rowspan="3" align="center">7001<br>
                  <img src="../images/agentStat_AllReady.gif" width="22" height="32" border="0" align="absmiddle"><br>
      全部就绪</td>
              <td class="nobreak">
			  <div id="agent10pipeStat" style="border:1px solid #cccccc; position:absolute; background-color:#FFFFFF; height:90px; width:150px; display:none">
						<table width="100%"  border="0" cellspacing="0" cellpadding="2">
						  <tr>
							<td>电话</td>
							<td>处理中</td>
						    <td>12'34</td>
						  </tr>
						  <tr>
							<td>E-mail</td>
							<td>就绪</td>
						    <td>05'12</td>
						  </tr>
						  <tr>
							<td>短信</td>
							<td>暂停</td>
						    <td>00'34</td>
						  </tr>
						  <tr>
							<td>传真</td>
							<td>就绪</td>
						    <td>00'25</td>
						  </tr>
						  <tr>
							<td>Chat</td>
							<td>暂停</td>
						    <td>45'12</td>
						  </tr>
						</table>
			    </div>
			  kober</td>
            </tr>
            <tr>
              <td> 02:01:00 </td>
            </tr>
            <tr>
              <td>00:00:</td>
            </tr>
          </table></td>
        <td width="25%"  id="agentTD11">
		  <table id="agent11" width="100%" border="0" class="busy" onMouseOver="this.className='busyOver';showPipeStat('agent11pipeStat')" onMouseOut="this.className='busy';HidePipeStat('agent11pipeStat')"  onMouseDown="this.className='busyDown'">
            <tr>
              <td width="70" rowspan="3" align="center">1234<br>
                  <img src="../images/agentStat_busy.gif" width="23" height="32" border="0" align="absmiddle"><br>
      忙碌</td>
              <td class="nobreak">
			  <div id="agent11pipeStat" style="border:1px solid #cccccc; position:absolute; background-color:#FFFFFF; height:90px; width:150px; display:none">
						<table width="100%"  border="0" cellspacing="0" cellpadding="2">
						  <tr>
							<td>电话</td>
							<td>处理中</td>
						    <td>12'34</td>
						  </tr>
						  <tr>
							<td>E-mail</td>
							<td>就绪</td>
						    <td>05'12</td>
						  </tr>
						  <tr>
							<td>短信</td>
							<td>暂停</td>
						    <td>00'34</td>
						  </tr>
						  <tr>
							<td>传真</td>
							<td>就绪</td>
						    <td>00'25</td>
						  </tr>
						  <tr>
							<td>Chat</td>
							<td>暂停</td>
						    <td>45'12</td>
						  </tr>
						</table>
			    </div>
			  kober</td>
            </tr>
            <tr>
              <td>02:01:00 </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
            </tr>
          </table></td>
        <td width="25%"  id="agentTD12">
          <table id="agent12" width="100%" border="0" class="offLine" onMouseOver="this.className='offLineOver';showPipeStat('agent12pipeStat')" onMouseOut="this.className='offLine';HidePipeStat('agent12pipeStat')"  onMouseDown="this.className='offLineDown'">
            <tr>
              <td width="70" rowspan="3" align="center">5412<br>
                  <img src="../images/agentStat_offline.gif" width="23" height="32" border="0" align="absmiddle"><br>
      离线</td>
              <td class="nobreak">
			  <div id="agent12pipeStat" style="border:1px solid #cccccc; position:absolute; background-color:#FFFFFF; height:90px; width:150px; display:none">
						<table width="100%"  border="0" cellspacing="0" cellpadding="2">
						  <tr>
							<td>电话</td>
							<td>处理中</td>
						    <td>12'34</td>
						  </tr>
						  <tr>
							<td>E-mail</td>
							<td>就绪</td>
						    <td>05'12</td>
						  </tr>
						  <tr>
							<td>短信</td>
							<td>暂停</td>
						    <td>00'34</td>
						  </tr>
						  <tr>
							<td>传真</td>
							<td>就绪</td>
						    <td>00'25</td>
						  </tr>
						  <tr>
							<td>Chat</td>
							<td>暂停</td>
						    <td>45'12</td>
						  </tr>
						</table>
			    </div>
			  kober</td>
            </tr>
            <tr>
              <td>02:01:00 </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
            </tr>
          </table></td>
      </tr>
      <tr>
       <td width="25%"  id="agentTD13">
		  <table id="agent13" width="100%" border="0" class="partReady" onMouseOver="this.className='partReadyOver';showPipeStat('agent13pipeStat')" onMouseOut="this.className='partReady';HidePipeStat('agent13pipeStat')" onMouseDown="this.className='partReadyDown'">
            <tr>
              <td width="70" rowspan="3" align="center">3302<br>
                  <img src="../images/agentStat_partReady.gif" width="23" height="32" border="0" align="absmiddle"><br>
      部分就绪</td>
              <td class="nobreak">
			  <div id="agent13pipeStat" style="border:1px solid #cccccc; position:absolute; background-color:#FFFFFF; height:90px; width:150px; display:none">
						<table width="100%"  border="0" cellspacing="0" cellpadding="2">
						  <tr>
							<td>电话</td>
							<td>处理中</td>
						    <td>12'34</td>
						  </tr>
						  <tr>
							<td>E-mail</td>
							<td>就绪</td>
						    <td>05'12</td>
						  </tr>
						  <tr>
							<td>短信</td>
							<td>暂停</td>
						    <td>00'34</td>
						  </tr>
						  <tr>
							<td>传真</td>
							<td>就绪</td>
						    <td>00'25</td>
						  </tr>
						  <tr>
							<td>Chat</td>
							<td>暂停</td>
						    <td>45'12</td>
						  </tr>
						</table>
			    </div>
			  kober</td>
            </tr>
            <tr>
              <td>02:01:00 </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
            </tr>
          </table></td>
        <td width="25%"  id="agentTD14">
		  <table id="agent14" width="100%" border="0" class="offLine" onMouseOver="this.className='offLineOver';showPipeStat('agent14pipeStat')" onMouseOut="this.className='offLine';HidePipeStat('agent14pipeStat')" onMouseDown="this.className='offLineDown'">
            <tr>
              <td width="70" rowspan="3" align="center">5412<br>
                  <img src="../images/agentStat_offline.gif" width="23" height="32" border="0" align="absmiddle"><br>
      离线</td>
              <td class="nobreak">
			  <div id="agent14pipeStat" style="border:1px solid #cccccc; position:absolute; background-color:#FFFFFF; height:90px; width:150px; display:none">
						<table width="100%"  border="0" cellspacing="0" cellpadding="2">
						  <tr>
							<td>电话</td>
							<td>处理中</td>
						    <td>12'34</td>
						  </tr>
						  <tr>
							<td>E-mail</td>
							<td>就绪</td>
						    <td>05'12</td>
						  </tr>
						  <tr>
							<td>短信</td>
							<td>暂停</td>
						    <td>00'34</td>
						  </tr>
						  <tr>
							<td>传真</td>
							<td>就绪</td>
						    <td>00'25</td>
						  </tr>
						  <tr>
							<td>Chat</td>
							<td>暂停</td>
						    <td>45'12</td>
						  </tr>
						</table>
			    </div>
			  kober</td>
            </tr>
            <tr>
              <td>02:01:00 </td>
            </tr>
            <tr>
              <td>00:00:00 </td>
            </tr>
          </table></td>
        <td width="25%"  id="agentTD15">
		  <table id="agent15" width="100%" border="0" class="offLine" onMouseOver="this.className='offLineOver';showPipeStat('agent15pipeStat')" onMouseOut="this.className='offLine';HidePipeStat('agent15pipeStat')" onMouseDown="this.className='offLineDown'">
            <tr>
              <td width="70" rowspan="3" align="center">5412<br>
                  <img src="../images/agentStat_offline.gif" width="23" height="32" border="0" align="absmiddle"><br>
      离线</td>
              <td class="nobreak">
			  <div id="agent15pipeStat" style="border:1px solid #cccccc; position:absolute; background-color:#FFFFFF; height:90px; width:150px; display:none">
						<table width="100%"  border="0" cellspacing="0" cellpadding="2">
						  <tr>
							<td>电话</td>
							<td>处理中</td>
						    <td>12'34</td>
						  </tr>
						  <tr>
							<td>E-mail</td>
							<td>就绪</td>
						    <td>05'12</td>
						  </tr>
						  <tr>
							<td>短信</td>
							<td>暂停</td>
						    <td>00'34</td>
						  </tr>
						  <tr>
							<td>传真</td>
							<td>就绪</td>
						    <td>00'25</td>
						  </tr>
						  <tr>
							<td>Chat</td>
							<td>暂停</td>
						    <td>45'12</td>
						  </tr>
						</table>
			    </div>
			  kober</td>
            </tr>
            <tr>
              <td>02:01:00 </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
            </tr>
          </table></td>
        <td width="25%"  id="agentTD16">
		  <table id="agent16" width="100%" border="0" class="offLine" onMouseOver="this.className='offLineOver';showPipeStat('agent16pipeStat')" onMouseOut="this.className='offLine';HidePipeStat('agent16pipeStat')" onMouseDown="this.className='offLineDown'">
            <tr>
              <td width="70" rowspan="3" align="center">5412<br>
                  <img src="../images/agentStat_offline.gif" width="23" height="32" border="0" align="absmiddle"><br>
      离线</td>
              <td class="nobreak">
			 <div id="agent16pipeStat" style="border:1px solid #cccccc; position:absolute; background-color:#FFFFFF; height:90px; width:150px; display:none">
					<table width="100%"  border="0" cellspacing="0" cellpadding="2">
						  <tr>
							<td>电话</td>
							<td>处理中</td>
						    <td>12'34</td>
						  </tr>
						  <tr>
							<td>E-mail</td>
							<td>就绪</td>
						    <td>05'12</td>
						  </tr>
						  <tr>
							<td>短信</td>
							<td>暂停</td>
						    <td>00'34</td>
						  </tr>
						  <tr>
							<td>传真</td>
							<td>就绪</td>
						    <td>00'25</td>
						  </tr>
						  <tr>
							<td>Chat</td>
							<td>暂停</td>
						    <td>45'12</td>
						  </tr>
			   </table>
			    </div> 
			  kober</td>
            </tr>
            <tr>
              <td>02:01:00 </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
            </tr>
          </table></td>
      </tr>
      <tr>
        <td width="25%"  id="agentTD17">
		<table id="agent17" width="100%" border="0" class="offLine" onMouseOver="this.className='offLineOver';showPipeStat('agent17pipeStat')" onMouseOut="this.className='offLine';HidePipeStat('agent17pipeStat')" onMouseDown="this.className='offLineDown'">
          <tr>
            <td width="70" rowspan="3" align="center">5412<br><img src="../images/agentStat_offline.gif" width="23" height="32" border="0" align="absmiddle"><br>
      离线</td>
            <td class="nobreak">
			<div id="agent17pipeStat" style="border:1px solid #cccccc; position:absolute; background-color:#FFFFFF; height:90px; width:150px; display:none">
						<table width="100%"  border="0" cellspacing="0" cellpadding="2">
						  <tr>
							<td>电话</td>
							<td>处理中</td>
						    <td>12'34</td>
						  </tr>
						  <tr>
							<td>E-mail</td>
							<td>就绪</td>
						    <td>05'12</td>
						  </tr>
						  <tr>
							<td>短信</td>
							<td>暂停</td>
						    <td>00'34</td>
						  </tr>
						  <tr>
							<td>传真</td>
							<td>就绪</td>
						    <td>00'25</td>
						  </tr>
						  <tr>
							<td>Chat</td>
							<td>暂停</td>
						    <td>45'12</td>
						  </tr>
						</table>
			  </div>
			kober</td>
          </tr>
          <tr>
            <td>02:01:00 </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
        </table></td>
        <td width="25%"  id="agentTD18">
		  <table id="agent18" width="100%" border="0" class="offLine" onMouseOver="this.className='offLineOver';showPipeStat('agent18pipeStat')" onMouseOut="this.className='offLine';HidePipeStat('agent18pipeStat')" onMouseDown="this.className='offLineDown'">
            <tr>
              <td width="70" rowspan="3" align="center">5412<br>
                  <img src="../images/agentStat_offline.gif" width="23" height="32" border="0" align="absmiddle"><br>
      离线</td>
              <td class="nobreak">
			  <div id="agent18pipeStat" style="border:1px solid #cccccc; position:absolute; background-color:#FFFFFF; height:90px; width:150px; display:none">
						<table width="100%"  border="0" cellspacing="0" cellpadding="2">
						  <tr>
							<td>电话</td>
							<td>处理中</td>
						    <td>12'34</td>
						  </tr>
						  <tr>
							<td>E-mail</td>
							<td>就绪</td>
						    <td>05'12</td>
						  </tr>
						  <tr>
							<td>短信</td>
							<td>暂停</td>
						    <td>00'34</td>
						  </tr>
						  <tr>
							<td>传真</td>
							<td>就绪</td>
						    <td>00'25</td>
						  </tr>
						  <tr>
							<td>Chat</td>
							<td>暂停</td>
						    <td>45'12</td>
						  </tr>
						</table>
			    </div>
			  kober</td>
            </tr>
            <tr>
              <td>02:01:00 </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
            </tr>
          </table></td>
         <td width="25%"  id="agentTD19">
		<table id="agent19" width="100%" border="0" class="noAgent" >
          <tr>
            <td><!--input type="button" name="aa" value="添加事件例子" onClick="createAgent('agentTD19','7005','busy','Evan','03:01:00','01:00:00')"--></td>
          </tr>
        </table>
		 </td>
        <td width="25%"  id="agentTD20">
		<table id="agent20" width="100%" border="0" class="noAgent" >
          <tr>
            <td>&nbsp;</td>
          </tr>
        </table>
		</td>
      </tr>
</table>
	 </div>
	 <div class="clearboth"></div>
  </body>
</html>
