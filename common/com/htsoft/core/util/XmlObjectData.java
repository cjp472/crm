package com.htsoft.core.util;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlList;
import javax.xml.bind.annotation.XmlRootElement;


@XmlRootElement(name="root")
public class XmlObjectData<T>
implements Serializable {
	  private boolean success;
	  private String msg;
	  private List<T> dataList = new ArrayList();

	  public XmlObjectData()
	  {
	  }

	  public XmlObjectData(boolean success, String msg, T object)
	  {
	    this.success = success;
	    this.msg = msg;
	    if (object instanceof List)
	      this.dataList = ((List)object);
	    else
	      this.dataList.add(object);
	  }

	  public XmlObjectData(boolean success, String msg, List<T> dataList) {
	    this.success = success;
	    this.msg = msg;
	    this.dataList = dataList;
	  }

	  @XmlElement
	  public boolean isSuccess()
	  {
	    return this.success;
	  }

	  public void setSuccess(boolean success) {
	    this.success = success;
	  }

	  @XmlElement
	  public String getMsg() {
	    return this.msg;
	  }

	  public void setMsg(String msg) {
	    this.msg = msg;
	  }

	  @XmlList
	  public List<T> getDataList()
	  {
	    return this.dataList;
	  }

	  public void setDataList(List<T> dataList) {
	    this.dataList = dataList;
	  }
}
