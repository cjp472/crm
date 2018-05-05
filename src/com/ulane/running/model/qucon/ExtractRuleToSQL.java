package com.ulane.running.model.qucon;

public abstract class ExtractRuleToSQL {
	
	protected ExtractRule er;
	@SuppressWarnings("unused")
	protected RandomExtractModel rem;
	
	public ExtractRuleToSQL(){}
	
	public void setDataSource(RandomExtractModel rem, ExtractRule er){
		this.er = er;
		this.rem = rem;
	}
	
	public abstract String toSQL();
	
	public abstract String getHelperSQL();
	
	/**
	 * 获取要抽取的记录数
	 * @param sourceSize 源数据的记录数
	 * @return
	 */
	public int getExtractSize(int sourceSize){
		//按照数量抽取 如果源的记录数小于抽取记录数，返回源的记录数
		if(er.getExtractType().equals(QcChkRul.TYPE_AMOUNT)){
			if(er.getExtractTypeValue().intValue()  > sourceSize){
				return sourceSize;
			}else{
				return er.getExtractTypeValue().intValue();
			}
		}
		//按照百分比抽取 不足1时，补为1
		if(er.getExtractType().equals(QcChkRul.TYPE_PERCENT)){
			Long tmp = sourceSize * er.getExtractTypeValue();
			int rs = (int) (tmp/100);
			if(tmp % 100 != 0){
				rs++;
			}
			return rs;
		}
		return 0;
	}
}
