package com.ulane.running.model.qucon;

public class UserExtractRuleToSQL extends ExtractRuleToSQL{
	@Override
	public String toSQL() {
		String sql = "select target.#1 from #2 target " +
				"where target.#3 = #4 order by target.#3";
		String rs = sql.replace("#1", rem.getIdColumnName())
				.replace("#2", rem.getTableName())
				.replace("#3", rem.getUserColumnName())
				.replace("#4", er.getRuleTypeId().toString());
		return rs;
	}
	@Override
	public String getHelperSQL() {
			return null;
	}

	public static void main(String[] args) {
		RandomExtractModel rem = new RandomExtractModel();
		rem.setTableName("CON_HIS");
		rem.setIdColumnName("CON_HIS_ID");
		rem.setUserColumnName("OWNER_ID");
		ExtractRule er = new ExtractRule();
		er.setRuleTypeId(323L);
		er.setRuleValue(QcChkRul.RULE_GROUP);
		UserExtractRuleToSQL test = new UserExtractRuleToSQL();
		test.setDataSource(rem, er);
		System.out.println(test.toSQL());
	}
}
