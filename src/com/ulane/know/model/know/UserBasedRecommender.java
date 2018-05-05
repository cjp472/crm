package com.ulane.know.model.know;

import java.util.Collection;
import java.util.List;

import javax.sql.DataSource;

import org.apache.mahout.cf.taste.common.Refreshable;
import org.apache.mahout.cf.taste.common.TasteException;
import org.apache.mahout.cf.taste.impl.neighborhood.NearestNUserNeighborhood;
import org.apache.mahout.cf.taste.impl.recommender.CachingRecommender;
import org.apache.mahout.cf.taste.impl.recommender.GenericUserBasedRecommender;
import org.apache.mahout.cf.taste.impl.similarity.AveragingPreferenceInferrer;
import org.apache.mahout.cf.taste.impl.similarity.PearsonCorrelationSimilarity;
import org.apache.mahout.cf.taste.model.DataModel;
import org.apache.mahout.cf.taste.neighborhood.UserNeighborhood;
import org.apache.mahout.cf.taste.recommender.IDRescorer;
import org.apache.mahout.cf.taste.recommender.RecommendedItem;
import org.apache.mahout.cf.taste.recommender.Recommender;
import org.apache.mahout.cf.taste.similarity.UserSimilarity;

/**
 * 基于用户相似度的推荐实现
 * 
 * @author Administrator
 * 
 */
public class UserBasedRecommender implements Recommender {

	private final Recommender recommender;

	/**
	 * <p>
	 * Alternate constructor that takes a {@link DataModel} argument, which
	 * allows this {@link Recommender} to be used with the
	 * {@link org.apache.mahout.cf.taste.eval.RecommenderEvaluator} framework.
	 * </p>
	 * 
	 * @param dataModel
	 *            data model
	 * @throws TasteException
	 *             if an error occurs while initializing this
	 *             {@link GroupLensRecommender}
	 */
	public UserBasedRecommender(DataSource dataSource) throws TasteException {
		DataModel model_keyword = new UkSysKnowKeywordModel(dataSource);

		UserSimilarity u_keyword = new PearsonCorrelationSimilarity(
				model_keyword);

		u_keyword.setPreferenceInferrer(new AveragingPreferenceInferrer(
				model_keyword));

		DataModel model_type = new UkSysKnowKeywordModel(dataSource);

		UserSimilarity u_type = new PearsonCorrelationSimilarity(model_type);

		u_type.setPreferenceInferrer(new AveragingPreferenceInferrer(model_type));

		UserSimilarity userSimilarity = new MinUserSimilarity(u_keyword, u_type);

		DataModel model = new UkSysKnowDataModel(dataSource);
		UserNeighborhood neighborhood = new NearestNUserNeighborhood(3,
				userSimilarity, model);

		recommender = new CachingRecommender(new GenericUserBasedRecommender(
				model, neighborhood, userSimilarity));
	}

	// 对外提供的推荐的接口，参数为用户标识和推荐项的个数
	public List<RecommendedItem> recommend(long userID, int howMany)
			throws TasteException {
		return recommender.recommend(userID, howMany);
	}

	public List<RecommendedItem> recommend(long userID, int howMany,
			IDRescorer rescorer) throws TasteException {
		return recommender.recommend(userID, howMany, rescorer);
	}

	// 以下方法都是实现 Recommender 的接口
	public float estimatePreference(long userID, long itemID)
			throws TasteException {
		return recommender.estimatePreference(userID, itemID);
	}

	public void setPreference(long userID, long itemID, float value)
			throws TasteException {
		recommender.setPreference(userID, itemID, value);
	}

	public void removePreference(long userID, long itemID)
			throws TasteException {
		recommender.removePreference(userID, itemID);
	}

	public DataModel getDataModel() {
		return recommender.getDataModel();
	}

	public void refresh(Collection<Refreshable> alreadyRefreshed) {
		recommender.refresh(alreadyRefreshed);
	}

	public String toString() {
		return "UserBasedRecommender[recommender:" + recommender + ']';
	}

}
