<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
    <head> 
		  <base href="<%=basePath%>"/>
		    <title></title>
		    <link rel="stylesheet" href="css/common.css" type="text/css" />
		    <link rel="stylesheet" href="css/jquery.Jcrop.css" type="text/css" />
		    <script type="text/javascript" src="js/jquery-1.3.2-min.js"></script>
		    <script type="text/javascript" src="js/jquery.Jcrop.js"></script>
		    <style type="text/css">
		       .crop_preview{position:absolute; left:430px;top:0; width:200px; height:200px;margin:40px; overflow:hidden;}
		       .rel{width:0px;height:0px; overflow: hidden;margin:40px;overflow: hidden;}
		    </style>
		       
		  <script >	
		      var flag1=0; 
		      var flag2=0;
				 function getRadioBoxValue(){//校验上传的类型  
				           var check = document.getElementById("radio1"); 
				           var radio2 = document.getElementById("radio2");
				          
						 if(check.checked){
							     flag1=1;
								if(document.getElementById("file1").style.display="none"){
									 document.getElementById("file1").style.display="";
								}else{
									  document.getElementById("file1").style.display ="none";
								}
					    }else if(radio2.checked){
					             flag1=2;
							  if(document.getElementById("file1").style.display="none"){
								 document.getElementById("file1").style.display="";
							  }else{
							     document.getElementById("file1").style.display ="none";
							  }
									
						}else{
							 
						   alert("未选中");
							  
				        }					    
				 }
				 
		      function demo(obj){   
					    var str="";
					    var sourceP_W=""; 
					    var sourceP_h="";
					    var ImgFileSize="";
					    var  image=new Image();
					    $("#PImag").width();
					    //alert("$(#PImag).width()"+$("#PImag").width()+$("#PImag").height());
					    str=document.getElementById("file").value;
					    if(str==""){
					      // alert("str"+str);
					      
					       $('#file').attr("disabled",false);
					      //ss $('#crop_submit').attr("disabled",true);
					      //document.getElementById("crop_submit").disabled=true;
					     }else{
					     //  alert("str"+str);
					      //str.readOnly = true;
					      $('#file').attr("disabled",true);
					     // document.getElementById("crop_submit").disabled=false;
					      //$('#crop_submit').attr("disabled",false);
					     }
					    var str2 = str.split(".");
					    //alert("str2"+str2);
					    var str3 = str2[str2.length-1];//截取的上传文件的后缀名
					    
					    if(str3.toUpperCase()=='jpg'||str3.toUpperCase()=='JPG'|| 
					      str3.toUpperCase()=='gif'||str3.toUpperCase()=='GIF' ||
					      str3.toUpperCase()=='png'||str3.toUpperCase()=='PNG' ||
					      str3.toUpperCase()=='bmp'||str3.toUpperCase()=='BMP' || 
					      str3.toUpperCase()=='jpeg'||str3.toUpperCase()=='JPEG'){    
				        //源文件图片的长，宽
                         image.src=str;//
                         sourceP_W=image.width;
                         sourceP_h=image.height;
                         var div_width=Math.round(image.width*420/image.height);
                         var div_height=Math.round(image.height*500/image.width);
                          //document.getElementById("PImag").style.height =image.width+ "px";
                         //alert("div_width"+div_width+"div_height"+div_height);
                          
                         ImgFileSize=Math.round(image.fileSize/1024*100)/100;//取得图片文件的大小 
                         if(image.width<369 && image.height<360 && image.fileSize<20480){
                              alert("不需要裁剪");
                              flag2=1;
                              /***Jcrop("#aa").disable();
	                          $.Jcrop("#aa").release();
				              $.Jcrop("#aa").destroy();**/
				              document.getElementById('aa').src = "";
				              document.getElementById('aa').src = document.getElementById("file").value;
				             // alert("$(#aa).width()"+$("#aa").width()+$("#aa").height());
				            if(div_width>500){
                                div_width=500;
                                
	                        }else{
	                           document.getElementById("PImag").style.width=div_width+"px";
	                           document.getElementById("PImag").style.height=div_height+"px";
	                        }
                          if(div_height>420){
                                div_height=420;
                                
	                        }else{
	                           document.getElementById("PImag").style.width=div_width+"px";
	                           document.getElementById("PImag").style.height=div_height+"px";
	                        }
				           
                         }else if(image.width<369 && image.height<360 && image.fileSize>20480){
                              alert("不需要裁剪");
                              flag2=1;
                                /*** $.Jcrop("#aa").disable();
	                          $.Jcrop("#aa").release();
				              $.Jcrop("#aa").destroy();**/
				              document.getElementById('aa').src = "";
				              document.getElementById('aa').src = document.getElementById("file").value;
				               if(div_width>500){
                                div_width=500;
                                
	                        }else{
	                           document.getElementById("PImag").style.width=div_width+"px";
	                           document.getElementById("PImag").style.height=div_height+"px";
	                        }
                          if(div_height>420){
                                div_height=420;
                                
	                        }else{
	                           document.getElementById("PImag").style.width=div_width+"px";
	                           document.getElementById("PImag").style.height=div_height+"px";
	                        }
                              // alert("$(#aa).width()"+$("#aa").width()+$("#aa").height());
	                      }else{//需要进行裁剪
	                          flag2=2;
	                          alert("需要裁剪");
	                          var ErrMsg="";
	                          if(image.width>305){
	                              ErrMsg= ErrMsg+ "\n图片宽度超过限制。请上传宽度小于"+305+ "px的文件，当前图片宽度为" + image.width + "px";
	                               //alert(ErrMsg);
	                          }
	                          if(image.height>369){
	                              ErrMsg=ErrMsg+ "\n图片高度超过限制。请上传高度小于" + 369 + "px的文件，当前图片高度为" + image.height + "px";
	                              
	                          }
	                          alert(ErrMsg);
	                          /*** $.Jcrop("#aa").disable();
	                          $.Jcrop("#aa").release();
				              $.Jcrop("#aa").destroy();**/
				              document.getElementById('aa').src = " ";
				                
				              document.getElementById('aa').src = document.getElementById("file").value;
				               if(div_width>500){
                                div_width=500;
                                
	                        }else{
	                           document.getElementById("PImag").style.width=div_width+"px";
	                           document.getElementById("PImag").style.height=div_height+"px";
	                        }
                          if(div_height>420){
                                div_height=420;
                                
	                        }else{
	                           document.getElementById("PImag").style.width=div_width+"px";
	                           document.getElementById("PImag").style.height=div_height+"px";
	                        }
				               // alert("$(#aa).width()"+$("#aa").width()+$("#aa").height());
	                      }          
				       
			    }else{
			      alert('上传格式只支持(jpg/JPG,gif/GIF,png/PNG,bmp/BMP，jpeg/JPEG)！');
			      return false;
			    }    
		          
		        // 图片的大小显示，如果图片长和宽超过某区域去做裁剪，小于或者是等于某个值，则不需要直接上传图片								
		        if(flag1==1){//座席照片
		        
		          // $.Jcrop("#aa").enable();
		            $("#aa").Jcrop({
						onChange:showCoords,
						onSelect:showCoords,
						 minSize:[20,54],
						 maxSize:[303,291]
						//setSelect:[120,132,120,132],
						//allowResize: false //初始化选中区域  
					});
		        }else{//其他
		         $.Jcrop("#aa").enable();
		            $("#aa").Jcrop({
						onChange:showCoords,
						onSelect:showCoords
						 //minSize:[20,54],
						 //maxSize:[305,369]
						//setSelect:[120,132,120,132],
						//allowResize: false //初始化选中区域  
					});
		        }
			    //记得放在jQuery(window).load(...)内调用，否则Jcrop无法正确初始化    	    
	              //简单的事件处理程序，响应自onChange,onSelect事件，按照上面的Jcrop调用
	              	//alert("选中");
	            //$("#aa").Jcrop().setImage(document.getElementById("file").value);
			   function showCoords(obj){
					$("#x").val(obj.x);
					$("#y").val(obj.y);
					$("#w").val(obj.w);
					$("#h").val(obj.h);
					if(parseInt(obj.w) > 0){
						//计算预览区域图片缩放的比例，通过计算显示区域的宽度(与高度)与剪裁的宽度(与高度)之比得到
						var rx = $("#preview_box").width() / obj.w; 
						var ry = $("#preview_box").height() / obj.h;
						//通过比例值控制图片的样式与显示
						$("#crop_preview").css({
							//预览图片宽度为计算比例值与原图片宽度的乘积
							width:Math.round(rx * $("#aa").width()) + "px",
							//预览图片高度为计算比例值与原图片高度的乘积
							height:Math.round(rx * $("#aa").height()) + "px",
							marginLeft:"-" + Math.round(rx * obj.x) + "px",
							marginTop:"-" + Math.round(ry * obj.y) + "px"
						});
					}
				}
					
				
			$("#crop_submit").click(function(){
			     $('#file').attr("disabled",false);

				      if(flag2==2){//需要裁剪
					       if(parseInt($("#x").val())){
							//alert("1");   
						   //$("#crop_form").action="file-upload-new";
						   var x=document.getElementById('x').value;
						   var y=document.getElementById('y').value;
						   var w=document.getElementById('w').value;
						   var h=document.getElementById('h').value;
						   //alert("x="+x+"\ny="+y+"\nw="+w+"\nh="+h);
						   document.myform.action ="file-upload-new?type=2&xx="+x+"&yy="+y+"&ww="+w+"&hh="+h+
						   "&S_W="+$("#aa").width()+"&S_H="+$("#aa").height()+"&div_width="+div_width+"&div_height="+div_height;
						   //alert(document.myform.action);
						   //alert("2");
						   document.myform.submit(function(){return false;});
						   //$("#crop_form").submit();
						    //window.open(__ctxPath + "/js/Photos.jsp");
						}else{
							   alert("要先在图片上划一个选区再单击确认剪裁的按钮哦！");
						}

			       }else{//不需要裁剪
			           var x=document.getElementById('x').value;
					   var y=document.getElementById('y').value;
					   var w=document.getElementById('w').value;
					   var h=document.getElementById('h').value;
					  // alert("x"x);
					   //document.myform.action ="file-upload-new?type=1&xx="+x+"&yy="+y+"&ww="+w+"&hh="+h;
					   document.myform.action ="file-upload-new?type=1&xx="+x+"&yy="+y+"&ww="+w+"&hh="+h+
					   "&S_W="+$("#aa").width()+"&S_H="+$("#aa").height()+"&div_width="+div_width+"&div_height="+div_height;
					   document.myform.submit(function(){return false;});
			         
			       }
			       
			       
			       
			
		   });		
	  }
		  
        </script>
    </head>
		<body  >
		<form id="crop_form" name="myform" action="" enctype="multipart/form-data" method="post" >  	   
		        <td width="102" ><div align="center"> <h1>请选择类型:</h1></div></td>
                <td width="199" >
		        <input type="radio" name="test1" id="radio1"    onclick=" getRadioBoxValue()"/>座席照片
		        <input type="radio" name="test1"  id="radio2"   onclick=" getRadioBoxValue()"/>其他
                </td>
                <!--  <input type="radio" name="ssh" id="radio1" value="1" onclick="getRadioBoxValue()"/>座席照片
				 <input type="radio" name="ssh" value="2"/>其他--> 
				 <span id="file1" style="display:none">		 
	                 <input type="file" name="pic" id="file"  onChange="demo(this)" /> 
	                 <input type="button" value="确认裁剪 "   id="crop_submit"  width="50px" height="200px" />
                 </span>
               
				<div  id="PImag" class="rel">
				 <img id="aa" src="" width="100%"  style="background-color:GRAY;"/>
				<span id="preview_box" class="crop_preview"> 
			    <!-- <img id="crop_preview" src="" width="100%"/></span>-->
			   
			   </div> 
			    <!-- <input type="button" value=" 确 认裁剪 "   id="crop_submit"  width="50px" height="50px" />-->
			    <input type="hidden" id="x" name="xx" value="x"/>
				<input type="hidden" id="y" name="yy" value="y" />
				<input type="hidden" id="w" name="ww" value="w" />
				<input type="hidden" id="h" name="hh" value="h" />
				<p></p>
			</form>
		     
		</body> 	
	   
</html>

