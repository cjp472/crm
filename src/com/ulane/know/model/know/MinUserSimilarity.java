package com.ulane.know.model.know;

import java.util.Collection;

import org.apache.mahout.cf.taste.common.Refreshable;
import org.apache.mahout.cf.taste.common.TasteException;
import org.apache.mahout.cf.taste.similarity.PreferenceInferrer;
import org.apache.mahout.cf.taste.similarity.UserSimilarity;

public class MinUserSimilarity implements UserSimilarity {
	/**
	 * 
	 */
	private static final long serialVersionUID = 4439245289425635925L;
	UserSimilarity u_keyword;
	UserSimilarity u_type;

	public MinUserSimilarity(UserSimilarity u_keyword, UserSimilarity u_type) {
		this.u_keyword = u_keyword;
		this.u_type = u_type;
	}

	public double userSimilarity(long userID1, long userID2)
			throws TasteException {
		double rs_keyword = u_keyword.userSimilarity(userID1, userID2);
		double rs_type = u_type.userSimilarity(userID1, userID2);
		return (rs_keyword + rs_type) / 2;
	}

	@Override
	public void refresh(Collection<Refreshable> alreadyRefreshed) {
		// TODO Auto-generated method stub

	}

	@Override
	public void setPreferenceInferrer(PreferenceInferrer inferrer) {
		// TODO Auto-generated method stub

	}
}
