package com.htsoft.core.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFClientAnchor;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;

import com.htsoft.core.util.worksheet.ExcelWorkSheet;

/**
 * 开源组件POI处理工具类
 * @author huchao
 * poi version：3.8
 * 描述：Excel的导入导出，包括样式设置等功能，需注意的是，如果
 * 		数据量超过约1500行记录，应尽量减少样式的设置
 */
public class ExcelOutUtil<T> {
	public static final Logger logger = Logger.getLogger(ExcelOutUtil.class);

	public void exportExcel(Collection<T> dataset, OutputStream out) {
		exportExcel("ULane报表文档", null, dataset, out, "yyyy-MM-dd");
	}

	public void exportExcel(String[] headers, Collection<T> dataset,OutputStream out) {
		exportExcel("ULane文档", headers, dataset, out, "yyyy-MM-dd");
	}

	public void exportExcel(String[] headers, Collection<T> dataset,OutputStream out, String pattern) {
		exportExcel("ULane报表文档", headers, dataset, out, pattern);
	}
   @SuppressWarnings("unchecked")
   public void exportExcel(String title, String[] headers,Collection<T> dataset, OutputStream out, String pattern) {
      HSSFWorkbook workbook = new HSSFWorkbook();			      	// 声明一个工作薄
      HSSFSheet sheet = workbook.createSheet(title);				// 生成一个表格
      sheet.setDefaultColumnWidth((short) 15);						// 设置表格默认列宽度为15个字节
      
//      HSSFCellStyle style = workbook.createCellStyle();				// 生成一个样式
//      style.setFillForegroundColor(HSSFColor.SKY_BLUE.index);		// 设置样式
//      style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
//      style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
//      style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
//      style.setBorderRight(HSSFCellStyle.BORDER_THIN);
//      style.setBorderTop(HSSFCellStyle.BORDER_THIN);
//      style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
//      
//      HSSFFont font = workbook.createFont();						// 生成一个字体
//      font.setColor(HSSFColor.VIOLET.index);
//      font.setFontHeightInPoints((short) 12);
//      font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
//      style.setFont(font);											// 把字体应用到当前的样式
//      HSSFCellStyle style2 = workbook.createCellStyle();			// 生成并设置另一个样式
//      style2.setFillForegroundColor(HSSFColor.LIGHT_YELLOW.index);
//      style2.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
//      style2.setBorderBottom(HSSFCellStyle.BORDER_THIN);
//      style2.setBorderLeft(HSSFCellStyle.BORDER_THIN);
//      style2.setBorderRight(HSSFCellStyle.BORDER_THIN);
//      style2.setBorderTop(HSSFCellStyle.BORDER_THIN);
//      style2.setAlignment(HSSFCellStyle.ALIGN_CENTER);
//      style2.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
//      
//      HSSFFont font2 = workbook.createFont();					
//      font2.setBoldweight(HSSFFont.BOLDWEIGHT_NORMAL);
//      style2.setFont(font2);									
//      
//      HSSFPatriarch patriarch = sheet.createDrawingPatriarch();		// 声明一个画图的顶级管理器
//      HSSFComment comment = patriarch.createComment(new HSSFClientAnchor(0, 0, 0, 0, (short) 4, 2, (short) 6, 5));// 定义注释的大小和位置,详见文档
//      comment.setString(new HSSFRichTextString("注释！"));			// 设置注释内容
//      comment.setAuthor("注释作者");									// 设置注释作者，当鼠标移动到单元格上是可以在状态栏中看到该内容.

      HSSFRow row = sheet.createRow(0);
      for (short i = 0; i < headers.length; i++) {
         HSSFCell cell = row.createCell(i);
//         cell.setCellStyle(style);
         HSSFRichTextString text = new HSSFRichTextString(headers[i]);
         cell.setCellValue(text);
      }
 

      Iterator<T> it = dataset.iterator();
      int index = 0;
      while (it.hasNext()) {
         index++;
         row = sheet.createRow(index);
         T t = (T) it.next();
         Field[] fields = t.getClass().getDeclaredFields();
         for (short i = 0; i < fields.length; i++) {
            HSSFCell cell = row.createCell(i);
//            cell.setCellStyle(style2);
            Field field = fields[i];
            String fieldName = field.getName();
            String getMethodName = "get"
                   + fieldName.substring(0, 1).toUpperCase()
                   + fieldName.substring(1);
            try {
                Class tCls = t.getClass();
                Method getMethod = tCls.getMethod(getMethodName,new Class[] {});
                Object value = getMethod.invoke(t, new Object[] {});
                //判断值的类型后进行强制类型转换
                String textValue = null;
              if (value instanceof Integer) {			//整型
                 int intValue = (Integer) value;
                 cell.setCellValue(intValue);
              } else if (value instanceof Float) {		//浮点型
                 float fValue = (Float) value;
                 textValue = new HSSFRichTextString(String.valueOf(fValue)).toString();
                 cell.setCellValue(textValue);
              } else if (value instanceof Double) {		//双精度
                 double dValue = (Double) value;
                 textValue = new HSSFRichTextString(String.valueOf(dValue)).toString();
                 cell.setCellValue(textValue);
              } else if (value instanceof Long) {		//长整形
                 long longValue = (Long) value;
                 cell.setCellValue(longValue);
              } 
                if (value instanceof Boolean) {
                   boolean bValue = (Boolean) value;
                   textValue = "男";
                   if (!bValue) {
                      textValue ="女";
                   }
                } else if (value instanceof Date) {
                   Date date = (Date) value;
                   SimpleDateFormat sdf = new SimpleDateFormat(pattern);
                    textValue = sdf.format(date);
                }  else if (value instanceof byte[]) {
                   row.setHeightInPoints(60);								// 有图片时，设置行高为60px;
                   sheet.setColumnWidth(i, (short) (35.7 * 80));			// 设置图片所在列宽度为80px,注意这里单位的一个换算
                   // sheet.autoSizeColumn(i);
                   byte[] bsValue = (byte[]) value;
                   HSSFClientAnchor anchor = new HSSFClientAnchor(0, 0,1023, 255, (short) 6, index, (short) 6, index);
                   anchor.setAnchorType(2);
//                   patriarch.createPicture(anchor, workbook.addPicture(bsValue, HSSFWorkbook.PICTURE_TYPE_JPEG));
                } else{
                   textValue = String.valueOf(value);							// 其它数据类型都当作字符串简单处理
                }
                if(textValue!=null){										//如果不是图片数据，就利用正则表达式判断textValue是否全部由数字组成
                   Pattern p = Pattern.compile("^//d+(//.//d+)?$");   
                   Matcher matcher = p.matcher(textValue);
                   if(matcher.matches()){
                      cell.setCellValue(Double.parseDouble(textValue));		 //是数字当作double处理
                   }else{
                   /*   HSSFRichTextString richString = new HSSFRichTextString(textValue);
                      HSSFFont font3 = workbook.createFont();
                      font3.setColor(HSSFColor.BLUE.index);
                      richString.applyFont(font3);
                      cell.setCellValue(richString);*/
                	   cell.setCellValue(textValue);
                   }
                }
            } catch (SecurityException e) {
                e.printStackTrace();
                logger.error("EXCEL文档导出，异常类型：SecurityException \n"+"异常信息："+e.getMessage());
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
                logger.error("EXCEL文档导出，异常类型：NoSuchMethodException \n"+"异常信息："+e.getMessage());
            } catch (IllegalArgumentException e) {
                e.printStackTrace();
                logger.error("EXCEL文档导出，异常类型：IllegalArgumentException \n"+"异常信息："+e.getMessage());
            } catch (IllegalAccessException e) {
                e.printStackTrace();
                logger.error("EXCEL文档导出，异常类型：IllegalAccessException \n"+"异常信息："+e.getMessage());
            } catch (InvocationTargetException e) {
                e.printStackTrace();
                logger.error("EXCEL文档导出，异常类型：InvocationTargetException \n"+"异常信息："+e.getMessage());
            } finally {
                //清理资源
            }
         }
      }
      try {
         workbook.write(out);
      } catch (IOException e) {
         e.printStackTrace();
         logger.error("EXCEL文档导出，异常类型：IOException \n"+"异常信息："+e.getMessage());
      }
 

   }
 

//   public static void main(String[] args) {
//      // 测试学生
//      ExcelOutUtil<Student> ex = new ExcelOutUtil<Student>();
//      String[] headers = { "学号", "姓名", "年龄", "性别", "出生日期" };
//      List<Student> dataset = new ArrayList<Student>();
//      dataset.add(new Student(10000001, "张三", 20, true, new Date()));
//      dataset.add(new Student(20000002, "李四", 24, false, new Date()));
//      dataset.add(new Student(30000003, "王五", 22, true, new Date()));
//      try {
//         OutputStream out = new FileOutputStream("D://a.xls");
//         ex.exportExcel(headers, dataset, out);
//         out.close();
//         JOptionPane.showMessageDialog(null, "导出成功!");
//         System.out.println("excel导出成功！");
//      } catch (FileNotFoundException e) {
//         e.printStackTrace();
//      } catch (IOException e) {
//         e.printStackTrace();
//      }
//   }
   
   /***
	 * 读取excel表中的数据：excel数据格式是：第一行是列名，从第二行起是内容
	 * 读取保存的内容：工作名称，数据列名，数据所有
	 * 保存的对象是：ExcelWorkSheet<T>
	 * @param excelFile	上传的文件
	 * @param sheeetIndex 哪个工作表
 * @throws PMSException 
	 * @lineIndex 列的位置(索引)
	 * @throws IOException 
	 * @throws FileNotFoundException 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static ExcelWorkSheet getExcelWorkSheet(File excelFile,int sheeetIndex,int lineIndex,int begin,int end){
		
		logger.debug("读取excel中所需要的参数：excelFile="+excelFile+" sheeetIndex="+sheeetIndex+" lineIndex="+lineIndex+" begin="+" end"+end);
		
		Sheet sheet=ExcelOutUtil.getSheet(excelFile, sheeetIndex);
		ExcelWorkSheet excelWorkSheet=new ExcelWorkSheet();
		try {
			if(sheet!=null){
				//保存工作单名称
				excelWorkSheet.setSheetName(sheet.getSheetName());
				Row firstRow=sheet.getRow(lineIndex);
				//保存列名
				List<String> cellNames=new ArrayList<String>();
				
				
				Iterator<Cell> itr=firstRow.iterator();//遍历列名行的列
				while(itr.hasNext()){
					cellNames.add(itr.next().getStringCellValue());	//添加列名
				}
				logger.debug("读取excel中的列名");
				excelWorkSheet.setColumns(cellNames);
			}
			
			if(begin<=0 || begin >= sheet.getLastRowNum()){
				begin=1;
			}
			if(end < begin || end >=sheet.getLastRowNum()){
				end=sheet.getLastRowNum();
			}
			//保存行内容
			excelWorkSheet = ExcelOutUtil.getExcelWorkSheet(excelWorkSheet, sheet,begin,end);
		} catch (Exception e) {
			logger.error("读取excel文件失败，请查看导入的数据文件是否合格");
		}
		return excelWorkSheet;

	}
	
	/***
	 * excel内容获取(非列名内容的所有内容：就是去了第一的所有内容获取)
	 * @param excelWorkSheet
	 * @param sheet
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static ExcelWorkSheet getExcelWorkSheet(ExcelWorkSheet excelWorkSheet,Sheet sheet,int begin,int end) throws Exception{
		for (int i = begin; i <= end; i++) {
			Row row=sheet.getRow(i);
			ArrayList al=new ArrayList();//保存每一行的记录
			logger.debug("读取excel中每一行的记录");
			al.add(i);
			for (int j = 0; j < row.getLastCellNum(); j++) {
				if(row.getCell(j)!=null){
					if(row.getCell(j).getCellType()==0){//是否是整型(注意：excel中，日期读出来也是整型)
						if(HSSFDateUtil.isCellDateFormatted(row.getCell(j))){
							al.add(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(row.getCell(j).getDateCellValue()));//日期型保存
						}else{
							al.add(row.getCell(j).getNumericCellValue());	//整型保存
						}
					}else if(row.getCell(j).getCellType()==1){//是否是字符型
						al.add(row.getCell(j).getStringCellValue());//字符型保存
					}else if(row.getCell(j).getCellType()==Cell.CELL_TYPE_BLANK){//是否为空
						al.add(null);
					}else{
						al.add("");
					}
				}
			}
			excelWorkSheet.getData().add(al);
		}

		return excelWorkSheet;
	}

	/***
	 * 根据文件和工作名称索引获取一个工作对象
	 * @param excelFile 文件
	 * @param sheeetIndex 工作名称索引
	 * @return
	 */
	public static Sheet getSheet(File excelFile,int sheeetIndex){
		try {
			if(excelFile!=null){
				Workbook workbook=new HSSFWorkbook(new FileInputStream(excelFile));
				Sheet sheet=workbook.getSheetAt(sheeetIndex);
				return sheet;
			}
		} catch (FileNotFoundException e) {
			logger.error("获取Sheet出现FileNotFoundException异常："+e);
			e.printStackTrace();
		} catch (IOException e) {
			logger.error("获取Sheet出现IOException异常："+e);
			e.printStackTrace();
		}
		return null;
	}

	
	
	/////////////////////////////////////

	/**
	 * 
	 * @param excelFile   读取文件对象
	 * @param beginRow 	  读取excel表格从第几行开始
	 * @param endRow  	  读取excel表格结束是那一行
	 * @param workmeter   读取excel表的那个工作空间，就是那个页面的表的数据
	 * @return 
	 * @throws 
	 * @throws IOException
	 */
	public static List<ArrayList<String>> readExcel(File excelFile,int beginRow,int endRow,int workmeter) throws Exception {
		
		logger.debug("读取文件的参数：excelFile="+excelFile+" beginRow="+beginRow+" endRow="+endRow+" workmeter"+workmeter);
		
		// 创建一个list 用来存储读取的内容
		List<ArrayList<String>> list = new ArrayList<ArrayList<String>>();

		//获取工作表对象
		HSSFSheet sheet=getHSSFSheet(excelFile, workmeter);

		int totalRow=0;
		if(endRow > beginRow && endRow <=sheet.getPhysicalNumberOfRows()){
			totalRow=endRow;
		}else{
			totalRow=sheet.getPhysicalNumberOfRows();
		}
		
		if(beginRow<=0 || beginRow > sheet.getPhysicalNumberOfRows()){
			beginRow=1;
		}

		logger.debug("读取文件的内容开始");
		// 遍历工作表行数
		for (int i = beginRow-1; i < totalRow; i++) {
			// 创建一个集合 用来存储一行的每一列的值
			ArrayList<String> strList=new ArrayList<String>();
			strList.add(i+1+"");//行号
			//获取一行的每一个单元的值：并添加到集合
			for (int j = 0; j < sheet.getRow(i).getLastCellNum(); j++) {
				HSSFCell cell = sheet.getRow(i).getCell(j);
				if(cell!=null){
					if(cell.getCellType()==0){//是整型
						if(DateUtil.isCellDateFormatted(cell)){
							strList.add(String.valueOf(cell.getDateCellValue()));
						}else{
							strList.add(String.valueOf(Math.round(cell.getNumericCellValue())));
						}
					}else if(cell.getCellType()==1){//是字符型
						strList.add(cell.getStringCellValue());
					}
				}
			}
			// 把获取的一行，加入的集合
			list.add(strList);
		}
		// 返回值集合
		return list;
	}

	/***
	 * 根据一个文件，和一个工作表索引得到一个工作表对象
	 * @param excelFile
	 * @param workmeter
	 * @return
	 */
	public static HSSFSheet getHSSFSheet(File excelFile,int workmeter) throws Exception{
		try {
			logger.debug("excel文件导入时，创建HSSFSheet对象所需的参数：excelFile="+excelFile+" workmeter="+workmeter);
			HSSFWorkbook rwb = null;
			HSSFCell cell = null;
			// 创建输入流
			InputStream stream = new FileInputStream(excelFile);
			// 获取Excel文件对象
			rwb = new HSSFWorkbook(stream);
			// 获取文件的指定工作表 
			HSSFSheet sheet = rwb.getSheetAt(workmeter);
			return sheet;
		} catch (FileNotFoundException e) {
			logger.error("excel导入出现FileNotFoundException异常："+e);
			e.printStackTrace();
		} catch (IOException e) {
			logger.error("excel导入出现IOException异常："+e);
			e.printStackTrace();
		}
		return null;
	}

	/***
	 * 获取excel表中的标题
	 * @param excelFile
	 * @param workmeter
	 * @param tableTopNo
	 * @return
	 */
	public static ArrayList<String> getTableTop(File excelFile,int workmeter,int tableTopNo) throws Exception{
		tableTopNo=tableTopNo-1;
		HSSFSheet sheet=getHSSFSheet(excelFile, workmeter);
		ArrayList<String> al=new ArrayList<String>();
		for (int j = 0; j < sheet.getRow(tableTopNo).getLastCellNum(); j++) {
			HSSFCell cell = sheet.getRow(tableTopNo).getCell(j);
			if(cell.getCellType()==0){//是整型
				al.add(String.valueOf(Math.round(cell.getNumericCellValue())));
			}else if(cell.getCellType()==1){//是字符型
				al.add(cell.getStringCellValue());
			}
		}
		return al;
	}
	
	/***
	 * 数据导入的excel中：每个单元格是值是一个Object对象，通用的输出
	 * @param excelWorkSheet 是一个放excel数据临时的对象
	 * @param fileExcel	文件(你要往哪个文件里面导)
	 * @param sheetName 工作名称
	 */
	@SuppressWarnings("rawtypes")
	public static boolean exportExcel(ExcelWorkSheet excelWorkSheet,OutputStream os,String sheetName){
		try {
			logger.debug("excel导出的数据放在excelWorkSheet里面：excelWorkSheet="+excelWorkSheet+"导出的输入流OutputStream="+os+"参数：sheetName="+sheetName);
			Workbook workbook=new HSSFWorkbook();
			
			CellStyle cellStyle=workbook.createCellStyle();
			
			//创建一个工作表
			Sheet sheet = workbook.createSheet(sheetName);
			Row row = sheet.createRow(0);
			
			//添加前言
			ExcelOutUtil.addPreface(excelWorkSheet, row,sheet,workbook);
			//插入列名
			ExcelOutUtil.addLineName(excelWorkSheet, row,sheet,workbook);
			//插入内容
			boolean contextFlag=ExcelOutUtil.addExcelContext(excelWorkSheet, workbook, sheet, row,cellStyle);
			if(contextFlag){
				workbook.write(os);//写入文件
				return true;
			}
			return false;
		} catch (FileNotFoundException e) {
			logger.error("excel导出FileNotFoundException异常："+e);
			e.printStackTrace();
			return false;
		} catch (IOException e) {
			logger.error("excel导出IOException异常："+e);
			e.printStackTrace();
			return false;
		}
	}

	/***
	 * 添加excel中的前言，数据最上面的信息
	 * 默认只有三行内容
	 * @param excelWorkSheet
	 * @param row
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static boolean addPreface(ExcelWorkSheet excelWorkSheet,Row row,Sheet sheet,Workbook workbook){
		List<ArrayList> preface=excelWorkSheet.getPreface();
		List<String> topList=excelWorkSheet.getColumns();

		logger.debug("添加导出的excel表的前言："+topList);
		
		int topSize=10;
		if(topList!=null){
			topSize=topList.size();
		}
		if(preface!=null && topList!=null){
			//获取字体样式
			CellStyle cellStyle=ExcelOutUtil.getFontSizeCellStyle(workbook);
			
			for (int i = 0; i < preface.size(); i++) {
				row = sheet.createRow(i);
				ArrayList rows=preface.get(i);
				for (int j = 0; j <rows.size() ; j++) {
					Cell cell=row.createCell(j);
					if(i==0){
						cell.setCellValue((String)rows.get(j));
					}else if(i==1){
						sheet.addMergedRegion(new CellRangeAddress(1,1,0,topSize-1));
						row.setHeightInPoints((2*sheet.getDefaultRowHeightInPoints()));
						cell.setCellStyle(cellStyle);
						cell.setCellValue((String)rows.get(j));
					}else if(i==2){
						Cell c=row.createCell(3*j);
						CellStyle style=ExcelOutUtil.getFontCellStyle(workbook);
						sheet.addMergedRegion(new CellRangeAddress(2,2,3*j,3*j+2));
						c.setCellValue((String)rows.get(j));
						c.setCellStyle(style);
					}else{
						cell.setCellValue((String)rows.get(j));
					}
				}
			}
		}

		return true;
	}



	/***
	 * 向excel中添加指定的列名
	 * @param excelWorkSheet
	 * @param row
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static boolean addLineName(ExcelWorkSheet excelWorkSheet,Row row,Sheet sheet,Workbook workbook){
		//获取列头
		List<String> topList=excelWorkSheet.getColumns();
		logger.debug("excel导出添加列名："+topList);
		if(topList!=null){
			List<ArrayList> prefaceSize=excelWorkSheet.getPreface();
			if(prefaceSize!=null){
				row = sheet.createRow(prefaceSize.size());
			}else{
				row = sheet.createRow(0);
			}
			//设计粗体
			CellStyle cellStyle=ExcelOutUtil.getFontCellStyle(workbook);
			for (int i = 0; i < topList.size(); i++) {
				Cell cell=row.createCell((short)i);
				cell.setCellStyle(cellStyle);
				cell.setCellValue(topList.get(i));
			}
		}
		return true;
	}
	
	/***
	 * 字体样式：设计粗体
	 * @param workbook
	 * @return
	 */
	public static CellStyle getFontCellStyle(Workbook workbook){
		CellStyle cellStyle=workbook.createCellStyle();
		Font font=workbook.createFont();
		font.setBoldweight(Font.BOLDWEIGHT_BOLD);
		cellStyle.setFont(font);
		return cellStyle;
	}
	
	/***
	 * 字体样式：粗体，剧中，加大
	 * @param workbook
	 * @return
	 */
	public static CellStyle getFontSizeCellStyle(Workbook workbook){
		CellStyle cellStyle=workbook.createCellStyle();
		Font font=workbook.createFont();
		font.setBoldweight(Font.BOLDWEIGHT_BOLD);
		font.setFontHeightInPoints((short)24);
		cellStyle.setFont(font);
		cellStyle.setAlignment(CellStyle.ALIGN_CENTER_SELECTION);
		return cellStyle;
	}

	/***
	 * 向excel中插入内容(就是除列名，前言的所有数据)
	 * @param excelWorkSheet
	 * @param workbook
	 * @param sheet
	 * @param row
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static boolean addExcelContext(ExcelWorkSheet excelWorkSheet,Workbook workbook,Sheet sheet,Row row,CellStyle cellStyle){
		try {
			cellStyle.setDataFormat(HSSFDataFormat.getBuiltinFormat("m/d/yy h:mm"));
			List<ArrayList> list=excelWorkSheet.getData();
			logger.debug("excel导出添加内容："+list);
			int r=0;
			List<ArrayList> p=excelWorkSheet.getPreface();
			if(p!=null){
				r=p.size();
			}
			
			for (int i = 0; i < list.size(); i++) {
				ArrayList cells=list.get(i);
				row=sheet.createRow(i+1+r);
				for (int j = 0; j < cells.size(); j++) {
					if(cells.get(j) instanceof Date){
						Cell cell=row.createCell((short)j);
						cell.setCellValue((Date)cells.get(j));
						cell.setCellStyle(cellStyle);
					}else if(cells.get(j) instanceof Integer){
						row.createCell(j).setCellValue((Integer)cells.get(j));
					}else if(cells.get(j) instanceof Float){
						row.createCell(j).setCellValue((Float)cells.get(j));
					}else if(cells.get(j) instanceof Double){
						row.createCell(j).setCellValue((Double)cells.get(j));
					}else if(cells.get(j) instanceof String){
						row.createCell(j).setCellValue((String)cells.get(j));
					}else{
						row.createCell(j).setCellValue("");
					}
				}
			}
			return true;
		} catch (Exception e) {
			logger.error("数据导入excel中出现异常："+e);
			e.printStackTrace();
			return false;
		}
	}
	
}

