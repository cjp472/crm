package com.ulane.running.model.qucon;

public class UserGroupExtractRuleToSQL extends ExtractRuleToSQL{
	@Override
	public String toSQL() {
		String sql = "select target.#1 from #2 target " +
				"left join  #3 tmp on tmp.#4 = target.#5 " +
				"left join #6 tmp2 on tmp2.#7 = tmp.#8 "+
				"where tmp2.#9 like '%#0%' order by target.#5";
		String rs = sql.replace("#1", rem.getIdColumnName())
				.replace("#2", rem.getTableName())
				.replace("#3", "ul_ugroup_user")
				.replace("#4", "USERID")
				.replace("#5", rem.getUserColumnName())
				.replace("#6", "UL_USERGROUP")
				.replace("#7", "PK_USERGROUP_ID" )
				.replace("#8", "PK_USERGROUP_ID")
				.replace("#9", "PATH")
				.replace("#0", er.getRuleTypeId().toString());
		return rs;
	}
	@Override
	public String getHelperSQL() {
		// TODO Auto-generated method stub
		if(er.getRuleValue().equals(QcChkRul.RULE_GROUP)){
			return null;
		}else{
			String sql = "select count(target.#1) from #2 target " +
					"left join  #3 tmp on tmp.#4 = target.#5 " +
					"left join #6 tmp2 on tmp2.#7 = tmp.#8 "+
					"where tmp2.#9 like '%#0%' group by #5 order by target.#5";
			String rs = sql.replace("#1", rem.getIdColumnName())
					.replace("#2", rem.getTableName())
					.replace("#3", "ul_ugroup_user")
					.replace("#4", "USERID")
					.replace("#5", rem.getUserColumnName())
					.replace("#6", "UL_USERGROUP")
					.replace("#7", "PK_USERGROUP_ID" )
					.replace("#8", "PK_USERGROUP_ID")
					.replace("#9", "PATH")
					.replace("#0", er.getRuleTypeId().toString());
			return rs;
		}
	}

	public static void main(String[] args) {
		RandomExtractModel rem = new RandomExtractModel();
		rem.setTableName("CON_HIS");
		rem.setIdColumnName("CON_HIS_ID");
		rem.setUserColumnName("OWNER_ID");
		ExtractRule er = new ExtractRule();
		er.setRuleType(QcChkRul.OBJECT_TYPE_USERGROUP);
		er.setRuleTypeId(323L);
		er.setExtractType(QcChkRul.TYPE_AMOUNT);
		er.setExtractTypeValue(10L);
		er.setRuleValue(QcChkRul.RULE_GROUP);
		UserGroupExtractRuleToSQL test = new UserGroupExtractRuleToSQL();
		test.setDataSource(rem, er);
		System.out.println(test.toSQL());
		System.out.println(test.getHelperSQL());
	}
}
