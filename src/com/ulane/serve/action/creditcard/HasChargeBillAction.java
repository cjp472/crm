package com.ulane.serve.action.creditcard;

import javax.annotation.Resource;

import com.htsoft.core.web.action.BaseAction;
import com.ulane.core.plugin.client.NcSoapClientManager;

public class HasChargeBillAction extends BaseAction {
    @Resource
    private NcSoapClientManager ncSoapClientManager;
    
    public String list(){
        String rowDat= getRequest().getParameter("Q_rowDat_D_EQ");
        String cardNo= getRequest().getParameter("Q_cardNo_N_EQ");
        StringBuffer x = new StringBuffer("{success:true,data:{");
        if(rowDat!=null&&!rowDat.equals("")){
            x.append("\"RowDat\":\"").append(rowDat).append("\",");
        }
        if(cardNo!=null&&!cardNo.equals("")){
            x.append("\"CardNo\":\"").append(cardNo).append("\",");
        }
        if((cardNo!=null&&!cardNo.equals(""))||(rowDat!=null&&!rowDat.equals(""))){
            x.deleteCharAt(x.length()-1);
        }
        x.append("}}");
        jsonString = ncSoapClientManager.getListHasChargeBill(x.toString());
        return SUCCESS;
    }
    
    
    public String listRMBCunKuan(){
        String rowDat= getRequest().getParameter("Q_rowDat_D_EQ");
        String cardNo= getRequest().getParameter("Q_cardNo_N_EQ");
        StringBuffer x = new StringBuffer("{success:true,data:{");
        if(rowDat!=null&&!rowDat.equals("")){
            x.append("\"RowDat\":\"").append(rowDat).append("\",");
        }
        if(cardNo!=null&&!cardNo.equals("")){
            x.append("\"CardNo\":\"").append(cardNo).append("\",");
        }
        if((cardNo!=null&&!cardNo.equals(""))||(rowDat!=null&&!rowDat.equals(""))){
            x.deleteCharAt(x.length()-1);
        }
        x.append("}}");
        jsonString = ncSoapClientManager.getListRMBCunKuan(x.toString());
        return SUCCESS;
    }
    public String listRMBDaiKuan(){
        String rowDat= getRequest().getParameter("Q_rowDat_D_EQ");
        String cardNo= getRequest().getParameter("Q_cardNo_N_EQ");
        StringBuffer x = new StringBuffer("{success:true,data:{");
        if(rowDat!=null&&!rowDat.equals("")){
            x.append("\"RowDat\":\"").append(rowDat).append("\",");
        }
        if(cardNo!=null&&!cardNo.equals("")){
            x.append("\"CardNo\":\"").append(cardNo).append("\",");
        }
        if((cardNo!=null&&!cardNo.equals(""))||(rowDat!=null&&!rowDat.equals(""))){
            x.deleteCharAt(x.length()-1);
        }
        x.append("}}");
        jsonString = ncSoapClientManager.getListRMBDaiKuan(x.toString());
        return SUCCESS;
    }
    public String listWBCunKuan(){
        String rowDat= getRequest().getParameter("Q_rowDat_D_EQ");
        String cardNo= getRequest().getParameter("Q_cardNo_N_EQ");
        StringBuffer x = new StringBuffer("{success:true,data:{");
        if(rowDat!=null&&!rowDat.equals("")){
            x.append("\"RowDat\":\"").append(rowDat).append("\",");
        }
        if(cardNo!=null&&!cardNo.equals("")){
            x.append("\"CardNo\":\"").append(cardNo).append("\",");
        }
        if((cardNo!=null&&!cardNo.equals(""))||(rowDat!=null&&!rowDat.equals(""))){
            x.deleteCharAt(x.length()-1);
        }
        x.append("}}");
        jsonString = ncSoapClientManager.getListWBCunKuan(x.toString());
        return SUCCESS;
    }
    public String listWHPaiJia(){
        String rowDat= getRequest().getParameter("Q_rowDat_D_EQ");
        String cardNo= getRequest().getParameter("Q_cardNo_N_EQ");
        StringBuffer x = new StringBuffer("{success:true,data:{");
        if(rowDat!=null&&!rowDat.equals("")){
            x.append("\"RowDat\":\"").append(rowDat).append("\",");
        }
        if(cardNo!=null&&!cardNo.equals("")){
            x.append("\"CardNo\":\"").append(cardNo).append("\",");
        }
        if((cardNo!=null&&!cardNo.equals(""))||(rowDat!=null&&!rowDat.equals(""))){
            x.deleteCharAt(x.length()-1);
        }
        x.append("}}");
        jsonString = ncSoapClientManager.getListWHPaiJia(x.toString());
        return SUCCESS;
    }
    public String listYeWuFeiLv(){
        String rowDat= getRequest().getParameter("Q_rowDat_D_EQ");
        String cardNo= getRequest().getParameter("Q_cardNo_N_EQ");
        StringBuffer x = new StringBuffer("{success:true,data:{");
        if(rowDat!=null&&!rowDat.equals("")){
            x.append("\"RowDat\":\"").append(rowDat).append("\",");
        }
        if(cardNo!=null&&!cardNo.equals("")){
            x.append("\"CardNo\":\"").append(cardNo).append("\",");
        }
        if((cardNo!=null&&!cardNo.equals(""))||(rowDat!=null&&!rowDat.equals(""))){
            x.deleteCharAt(x.length()-1);
        }
        x.append("}}");
        jsonString = ncSoapClientManager.getListYeWuFeiLv(x.toString());
        return SUCCESS;
    }
    public String listHangMingHangHao(){
        String rowDat= getRequest().getParameter("Q_rowDat_D_EQ");
        String cardNo= getRequest().getParameter("Q_cardNo_N_EQ");
        StringBuffer x = new StringBuffer("{success:true,data:{");
        if(rowDat!=null&&!rowDat.equals("")){
            x.append("\"RowDat\":\"").append(rowDat).append("\",");
        }
        if(cardNo!=null&&!cardNo.equals("")){
            x.append("\"CardNo\":\"").append(cardNo).append("\",");
        }
        if((cardNo!=null&&!cardNo.equals(""))||(rowDat!=null&&!rowDat.equals(""))){
            x.deleteCharAt(x.length()-1);
        }
        x.append("}}");
        jsonString = ncSoapClientManager.getListHangMingHangHao(x.toString());
        return SUCCESS;
    }
    public String listJiGou(){
        String rowDat= getRequest().getParameter("Q_rowDat_D_EQ");
        String cardNo= getRequest().getParameter("Q_cardNo_N_EQ");
        StringBuffer x = new StringBuffer("{success:true,data:{");
        if(rowDat!=null&&!rowDat.equals("")){
            x.append("\"RowDat\":\"").append(rowDat).append("\",");
        }
        if(cardNo!=null&&!cardNo.equals("")){
            x.append("\"CardNo\":\"").append(cardNo).append("\",");
        }
        if((cardNo!=null&&!cardNo.equals(""))||(rowDat!=null&&!rowDat.equals(""))){
            x.deleteCharAt(x.length()-1);
        }
        x.append("}}");
        jsonString = ncSoapClientManager.getListJiGou(x.toString());
        return SUCCESS;
    }

}
