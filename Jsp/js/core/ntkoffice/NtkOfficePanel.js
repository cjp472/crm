/**
 * 集成软航Office在线编辑控件
 * @param {} conf
 * @return {}
 */
NtkOfficePanel=function(conf){
	var isFileOpen=false;
	conf.doctype=conf.doctype?conf.doctype:'doc';
	var fileId=conf.fileId?conf.fileId:'';
	var officeObj = document.createElement('object');
	
	var p=document.createElement("param");
	p.setAttribute('name','Caption');
	p.setAttribute('value','北京优创融联科技有限公司在线Office文档');
	officeObj.appendChild(p);

	p=document.createElement('param');
	p.setAttribute('name','MakerCaption');
	p.setAttribute('value','北京优创融联科技有限公司');
	officeObj.appendChild(p);
	
	p=document.createElement('param');
	p.setAttribute('name','MakerKey');
	p.setAttribute('value','4FEB21F0AE739C7004A114D9B689C9BF5DC465B4');
	officeObj.appendChild(p);
	
	p=document.createElement('param');
	p.setAttribute('name','ProductCaption');
	p.setAttribute('value','北京优创融联科技有限公司');
	officeObj.appendChild(p);
	
	p=document.createElement('param');
	p.setAttribute('name','ProductKey');
	p.setAttribute('value','E48B828D3049F90D44E801C202224CAEF84423A3');
	officeObj.appendChild(p);
	
	officeObj.width = "100%";
	officeObj.height = "100%";
	officeObj.classid= "clsid:A39F1330-3322-4a1d-9BF0-0BA2BB90E970"; 
	officeObj.codebase = __ctxPath+'/js/core/ntkoffice/OfficeControl.cab#version=5,0,1,0';//weboffice_V6.0.4.6.cab#V6,0,4,6
     
	var panelConf={border:false,layout:'fit'};
	
	/**
	 * 保存文档
	 */
	var saveFn=function(config){
		fileId=config.fileId?config.fileId:'';
		var docName=config.docName?config.docName:'未命名';
		officeObj.IsUseUTF8URL=true;
     	officeObj.IsUseUTF8Data=true;
		var result= officeObj.SaveToURL(__fullPath + '/file-upload',"uploadDocument","fileId="+fileId+'&&file_cat=uploadDocument',docName+'.'+conf.doctype,0);
		var obj=Ext.util.JSON.decode(result);
		if(obj&&obj.success){
			fileId=obj.fileId;
		}else{
			obj={success:false};
		}
		return obj;
	};
	alert(officeObj.codebase)
	/**
	 * 是否显示菜单
	 */
	if(conf.unshowMenuBar){
	    officeObj.Menubar=false;
	    officeObj.IsShowEditMenu=false;
	    officeObj.FileNew=false;
	    officeObj.FileOpen=false;
	    officeObj.FileSave=false;
	    officeObj.FileSaveAs=false;
	}
	if(conf.showToolbar){
		var buttons=[];
		if(conf.doctype=='doc'){
            buttons.push({
		               text : '保留修改痕迹',
							iconCls : 'btn-archive-save-trace',
							handler : function() {
								if(isFileOpen){
									officeObj.ActiveDocument.Application.UserName=curUserInfo.fullname;
									officeObj.ActiveDocument.TrackRevisions=true;
							    }
						}
            });
            buttons.push('-');
		}
		if(conf.doctype=='doc'){
		   buttons.push({
						text : '取消保留痕迹',
						iconCls : 'btn-archive-cancel-trace',
						handler : function() {
							alert(officeObj.ActiveDocument.TrackRevisions);
							if(isFileOpen){
								officeObj.ActiveDocument.TrackRevisions=false;
								
							}
						}
					});
			buttons.push('-');
		}
		if(conf.doctype=='doc'){
		   buttons.push({
			   	    text : '清除痕迹',
					iconCls : 'btn-archive-eraser',
					handler : function() {
						if(isFileOpen){
							officeObj.ActiveDocument.AcceptAllRevisions();
						}
					}
			   });
			buttons.push('-');
		}
		if(conf.doctype=='doc'){
		   buttons.push({
		   	        text:'动态套红',
					iconCls:'',
					scope:this,
					handler:function(){
						var strHeader="XXXXXXXXXXXX公司";
						if(!isFileOpen)
						{return;}
						if(officeObj.doctype!=1){
						  return;
						}
						var i,cNum = 30;
						var lineStr = "";
						try
						{
							for(i=0;i<cNum;i++) lineStr += "_";  //生成下划线
							with(officeObj.ActiveDocument.Application)
							{
								Selection.HomeKey(6,0); // go home
								Selection.TypeText(strHeader);
								Selection.TypeParagraph(); 	//换行
								Selection.TypeText(lineStr);  //插入下划线
								// Selection.InsertSymbol(95,"",true); //插入下划线
								Selection.TypeText("★");
								Selection.TypeText(lineStr);  //插入下划线
								Selection.TypeParagraph();
								//Selection.MoveUp(5, 2, 1); //上移两行，且按住Shift键，相当于选择两行
								Selection.HomeKey(6,1);  //选择到文件头部所有文本
								Selection.ParagraphFormat.Alignment = 1; //居中对齐
								with(Selection.Font)
								{
									NameFarEast = "宋体";
									Name = "宋体";
									Size = 12;
									Bold = false;
									Italic = false;
									Underline = 0;
									UnderlineColor = 0;
									StrikeThrough = false;
									DoubleStrikeThrough = false;
									Outline = false;
									Emboss = false;
									Shadow = false;
									Hidden = false;
									SmallCaps = false;
									AllCaps = false;
									Color = 255;
									Engrave = false;
									Superscript = false;
									Subscript = false;
									Spacing = 0;
									Scaling = 100;
									Position = 0;
									Kerning = 0;
									Animation = 0;
									DisableCharacterSpaceGrid = false;
									EmphasisMark = 0;
								}
								Selection.MoveDown(5, 3, 0); //下移3行
							}
						}
						catch(err){
							alert("错误：" + err.number + ":" + err.description);
						}
						finally{
						}
					}
		   });
		  buttons.push('-');
		}
		if(conf.doctype=='doc'){
			buttons.push({
		            text:'模板套红',
					iconCls:'',
					scope:this,
					handler:function(){
						if(isFileOpen){
							new PaintTemplateSelector({callback:function(name,path){
							    this.close();
							    if(path!=''){
							    	var headFileURL=__ctxPath+'/attachFiles/'+path;
								    if(officeObj.doctype!=1)//OFFICE_CONTROL_OBJ.doctype=1为word文档
									{return;}
									try
									{
									   officeObj.ActiveDocument.Application.Selection.HomeKey(6,0);//光标移动到文档开头
									   officeObj.addtemplatefromurl(headFileURL);//在光标位置插入红头文档
									}catch(err){
			//							alert("错误：" + err.number + ":" + err.description);
									}
							    }
							}}).show();
						}
					}
			});
			buttons.push('-');
		}
		if(conf.doctype=='doc'||conf.doctype=='xls'){
		   buttons.push({
		     		text:'手写签名',
					iconCls:'',
					scope:this,
					handler:function(){
						if(isFileOpen){
							try
							{
							   officeObj.DoHandSign2(
										"ntko",//手写签名用户名称
										"ntko",//signkey,DoCheckSign(检查印章函数)需要的验证密钥。
										0,//left
										0,//top
										1,//relative,设定签名位置的参照对象.0：表示按照屏幕位置插入，此时，Left,Top属性不起作用。1：光标位置；2：页边距；3：页面距离 4：默认设置栏，段落（为兼容以前版本默认方式）
										100);
							}catch(err){
	//							alert("错误：" + err.number + ":" + err.description);
							}
						}
					}
		   });
			buttons.push('-');
		}
		
		if(conf.doctype=='doc'||conf.doctype=='xls'){
			buttons.push({
			        text:'盖章',
					iconCls:'',
					scope:this,
					handler:function(){
//						if(isFileOpen){
							new SealSelector({callback:function(name,path,belongName){
								this.close();
								if(path!=''){
									var signUrl=__ctxPath+'/attachFiles/'+path;
									if(officeObj.doctype==1||officeObj.doctype==2)
									{
										try
										{
											officeObj.AddSecSignFromURL(curUserInfo.fullname,//印章的用户名
											signUrl,//印章所在服务器相对url
											0,//左边距
											0,//上边距 根据Relative的设定选择不同参照对象
											"ntko",//调用DoCheckSign函数签名印章信息,用来验证印章的字符串
											1,  //Relative,取值1-4。设置左边距和上边距相对以下对象所在的位置 1：光标位置；2：页边距；3：页面距离 4：默认设置栏，段落
											100,//缩放印章,默认100%
											1);   //0印章位于文字下方,1位于上方
											
										}
										catch(error){}
									}
								}
							}}).show();
//						}else{
//						    alert("错误：文档未打开" );
//						}
						
					}
				});
				buttons.push('-');
		}
		
		
		panelConf.tbar=new Ext.Toolbar({
			items:buttons
		});
	}
	
	Ext.applyIf(panelConf,conf);

	var panel=new Ext.Panel(panelConf);
	panel.on('afterrender',function(){
			panel.body.appendChild(officeObj);
			panel.doLayout();
			if(fileId){
				officeObj.OpenFromURL(__ctxPath+'/file-download?fileId='+fileId);
				isFileOpen=true;
			}else{
				var fileType='';
				switch (conf.doctype)
				{
					case 'doc':
						fileType = "Word.Document";
						fileTypeSimple = "wrod";
						break;
					case 'xls':
						fileType = "Excel.Sheet";
						fileTypeSimple="excel";
						break;
					case 'ppt':
						fileType = "PowerPoint.Show";
						fileTypeSimple = "ppt";
						break;
					case 4:
						fileType = "Visio.Drawing";
						break;
					case 5:
						fileType = "MSProject.Project";
						break;
					case 6:
						fileType = "WPS Doc";
						break;
					case 7:
						fileType = "Kingsoft Sheet";
						break;
					default :
						fileType = "Word.Document";
				}
				try{
					officeObj.CreateNew(fileType);
					isFileOpen=true;
				}catch(err){}
				
			}			
	});
	
	//对外公共方法
	return {
		panel:panel,
		officeObj:officeObj,
		openDoc:function(inFileId){
			fileId=inFileId;
			officeObj.OpenFromURL(__ctxPath+'/file-download?fileId='+fileId);
		},
		setReadOnly:function(){
		   officeObj.SetReadOnly(true,'');
		},
		openDoc2:function(fileId,fileUrl){
		    fileId=fileId;
		    try{
		    officeObj.OpenFromURL(__ctxPath+'/attachFiles/'+fileUrl);
		    isFileOpen=true;
			}catch(err){
				isFileOpen=false;
			}
		},
		/**
		 * return json result is format as below:
		 * {sucess:false} or 
		 * {success:true,fileId:73,fileName:'myDoc.doc',filePath:'others/2010/aaa0393304.doc',message:'upload file success(10229 bytes)'}
		 */
		saveDoc:function(config){
			return saveFn(config);
		},
		closeDoc:function(){
			isFileOpen=false;
			officeObj.Close();
		}
	};
};
