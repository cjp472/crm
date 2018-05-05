// Decompiled by Jad v1.5.8e2. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://kpdus.tripod.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   DataImpServlet.java

package com.htsoft.core.web.servlet;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.htsoft.core.util.DateUtil;
import com.oreilly.servlet.multipart.FilePart;
import com.oreilly.servlet.multipart.MultipartParser;
import com.oreilly.servlet.multipart.Part;

// Referenced classes of package com.unihub.unicall.faq.action:
//            Const

public class ImportCalllistFileServlet extends HttpServlet
{

//	String uploadFold = "C:/ulinktemp";
	
//	private static final String CONTENT_TYPE = "text/html; charset=GBK";
//
//	private String ErrorMsg = "=======Exception :ImportCalllistFileServlet";

	private int MaxByte = 500;

	public void init() throws ServletException {
	}

	// Process the HTTP Get request
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("gb2312");
		MultipartParser mp = new MultipartParser(request, MaxByte * 1024 * 1024);
		mp.setEncoding("gb2312");
		Part part = null;
		int intRows = 0;
	
	
	    int fileUploadResult=-1;//0=成功 1=文件未上传 2=文件路径未找到 3=不是excel文件 4=Excel文件的列数为0
	    String fileUploadMsg=""; 
	    
//		String uploadPath = request.getParameter("uploadPath");
//
//		System.out.println("uploadPath="+uploadPath);
//		
//		if(uploadPath==null || uploadPath.trim().equals(""))
//        {
//        	fileUploadResult = 2;
//    		fileUploadMsg = "文件路径未找到,请重新操作!";
//        }else {
//	        uploadPath = uploadPath.trim();
//	        String fileType = uploadPath.substring(uploadPath.lastIndexOf(".") + 1).trim();
//	        if(!"xls".equals(fileType))
//	        {
//	        	fileUploadResult = 3;
//	    		fileUploadMsg = "不是excel文件,充重新选择文件!";
//	        }
//        }
		String newfileName = null;
		if(fileUploadResult<=0){
			int c = 0;
			while ((part = mp.readNextPart()) != null) {
				System.out.println("part="+part);
				if(!part.isFile()) continue;
				if(c>0) break;
					c++;
			    	fileUploadResult = 0;
					fileUploadMsg = "文件上传成功!";
	
					File file = null;
					String fileFileName = null;
					
					FilePart fp = (FilePart) part;
					if ((fileFileName=fp.getFileName()) != null) {
//						InputStream in = null;
//						Workbook wb = null;
						try {
//							// 取得EXCEL文件
//							in = fp.getInputStream();
//							wb = Workbook.getWorkbook(in);
//	
//							// 取得第一个sheet
//							Sheet[] sheet = wb.getSheets();
//	
//							for (int ss = 0; ss < sheet.length; ss++) {
//								intRows = sheet[ss].getRows();
//								int intColumns = sheet[ss].getColumns();
//								System.out.println("lieshu = " + intColumns);
//								if (intColumns > 0) {
//									
//								} else { // 列数不匹配
//									fileUploadResult = 4;
//									fileUploadMsg = "Excel文件的列数为0，请检查文件！";
//								}
//							}

							//新文件名
							newfileName = fileFileName;
							String extension = "";
							int pos = newfileName.lastIndexOf("."); // 原文件扩展名
							if (pos != -1) {
								extension = newfileName.substring(pos);
							}
							newfileName = DateUtil.getSerialNo() + extension; // 生成随机字串作为文件名
//
//					        FtpBase ftpBase=(FtpBase)ContainerManager.getComponent("ftpBase");
//					        String uploadFold = ftpBase.getCalllistImpRealPath();
							String uploadFold = System.getProperty("user.dir"); 
							//String 	uploadFold="D:/program/ulane-tomcat-7.0.12/bin";	
					        
							File localFile = new File(uploadFold, newfileName);
							if (!localFile.exists()) {
								localFile.createNewFile();
							}
							fp.writeTo(localFile);
							
//							
//						} catch (BiffException be) {
//							fileUploadResult = 3;
//							fileUploadMsg = "导入文件格式有误！";
//							//request.setAttribute(GlobalTokens.REQUEST_PROMPT_INFO,"导入文件格式有误！");
//							//ResultPage="/common/prompt.jsp";	
//							be.printStackTrace();
						}catch (Exception e) {
							e.printStackTrace();
						} finally {
//							if (wb != null) {
//								wb.close();
//							}
//							if (in != null) {
//								in.close();
//							}
	
						}
						
						
					}
				}
				if(c==0) {
		    		fileUploadResult = 1;
		    		fileUploadMsg = "文件未上传成功,请重新操作!";
				}
		}
		
    	System.out.println("fileUploadResult="+fileUploadResult);
    	System.out.println("fileUploadMsg="+fileUploadMsg);
    	System.out.println("newfileName="+newfileName);
    	System.out.println("rowCount="+(intRows - 1));

		request.setAttribute("fileUploadResult", fileUploadResult);
		request.setAttribute("fileUploadMsg", fileUploadMsg);
		request.setAttribute("newfileName", newfileName);
		request.setAttribute("rowCount", "" + (intRows - 1));
		
    	
		HttpSession session = request.getSession(true);
		
        StringBuffer sb=new StringBuffer("{success:true,filename:'");
        sb.append(newfileName);
        sb.append("'}");
        response.setContentType("text/html;charset=UTF-8");
		PrintWriter writer = response.getWriter();
		writer.println(sb.toString());		
		response.getWriter().flush();   
		
		// 转向的查询结果页面
		// response.setContentType(CONTENT_TYPE);
		// RequestDispatcher rd = request.getRequestDispatcher(ResultPage);
		// rd.forward(request, response);

	}
	


	// Process the HTTP Post request
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

	// Clean up resources
	public void destroy() {
	}

}
