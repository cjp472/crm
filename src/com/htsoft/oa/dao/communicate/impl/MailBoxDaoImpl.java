package com.htsoft.oa.dao.communicate.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.io.File;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;

import org.apache.commons.lang.StringUtils;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.htsoft.core.Constants;
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.communicate.MailBoxDao;
import com.htsoft.oa.model.communicate.MailBox;

import  org.apache.lucene.analysis.Analyzer;   
import  org.apache.lucene.analysis.standard.StandardAnalyzer;   
import org.apache.lucene.document.Document;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.index.Term;
import org.apache.lucene.queryParser.MultiFieldQueryParser;
import  org.apache.lucene.queryParser.ParseException;   
import  org.apache.lucene.queryParser.QueryParser;    
import  org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TermQuery;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.apache.lucene.store.SimpleFSDirectory;
import org.apache.lucene.util.Version;


@SuppressWarnings("unchecked")
public class MailBoxDaoImpl extends BaseDaoImpl<MailBox> implements MailBoxDao{

	public MailBoxDaoImpl() {
		super(MailBox.class);
	}

	@Override
	public Long CountByFolderId(Long folderId) {
		String hql = "select count(*) from MailBox where folderId ="+folderId;
		
//		Query query = getSession().createQuery(hql);
		return (Long)getHibernateTemplate().find(hql).get(0);
	}
	
	public List<MailBox> findByFolderId(Long folderId){
		String hql = "from MailBox where folderId = ?";
		return findByHql(hql, new Object[]{folderId});
	}
	
   
    
	@Override
	public List<MailBox> findBySearch(String searchContent, PagingBean pb) {	    
       final String sql = "select distinct ma.MAILID from mail_attach ma where FILEID in (select distinct fa.fileId from file_attach fa where fa.fileName like '%" + searchContent +"%')";
       List<BigDecimal> faId = (List) getHibernateTemplate().execute(new HibernateCallback() {
            public Object doInHibernate(Session session) throws HibernateException, SQLException {
                Query query = session.createSQLQuery(sql);
                return query.list();
            }
        });

	    
	    
	    //查询邮件
		ArrayList params = new ArrayList();
		
		StringBuffer hql = new StringBuffer("select distinct mb from MailBox mb where mb.delFlag = ? and mb.appUser.userId =?");
		params.add(Constants.FLAG_UNDELETED);
		params.add(ContextUtil.getCurrentUserId());
		
		if(StringUtils.isNotEmpty(searchContent)){
			hql.append(" and (mb.mail.subject like ? or mb.mail.content like ? ");
            params.add("%"+searchContent+"%");
            params.add("%"+searchContent+"%");
			if(faId.size()>0){
			    for(BigDecimal id:faId){
			        hql.append(" or mb.mail.mailId = ?");
			        params.add(id.longValue());
//			        System.out.println(id.longValue());
			    }
			}
			hql.append(")");
		}
		
		hql.append(" order by mb.sendTime desc");
		return findByHql(hql.toString(),params.toArray(), pb);
	}
	
	/**
	 * 带lucene查找
	 * uploadPath lucene索引路径
	 * findBySearch(java.lang.String, com.htsoft.core.web.paging.PagingBean, java.lang.String)
	 */
    @Override
    @SuppressWarnings("deprecation")
    public List<MailBox> findBySearch(String searchContent, PagingBean pb,String uploadPath) {
        List<String> ls = new ArrayList<String>();
        File indexDir = new File(uploadPath); 
        try{
            Analyzer analyzer = new StandardAnalyzer(Version.LUCENE_36);
            Directory directory = FSDirectory.open(indexDir,null);
            //简单索引  
            IndexSearcher searcher = new IndexSearcher(directory);  
            String[] fields={"contents"};
            QueryParser qp = new MultiFieldQueryParser(Version.LUCENE_36,fields,analyzer);
            org.apache.lucene.search.Query query = qp.parse(searchContent);
            //获得得分靠前的100个匹配记录  
            ScoreDoc[] docs = searcher.search(query,100).scoreDocs;  
            for(int i = 0; i < docs.length; i++) { 
                String path = searcher.doc(docs[i].doc).get("path");  
                path = path.substring(path.lastIndexOf("\\")+1);
                ls.add(path);
            }              
        }
        catch(Exception e){System.out.println(e);}
        
        final StringBuffer sql = new StringBuffer("select distinct ma.MAILID from mail_attach ma where FILEID in (select distinct fa.fileId from file_attach fa where fa.fileName like '%" + searchContent +"%'");
        for(String s:ls){
            sql.append(" or fa.FILEPATH like '%").append(s).append("'");
        }
        sql.append(")");
        List<BigDecimal> faId = (List) getHibernateTemplate().execute(new HibernateCallback() {
            public Object doInHibernate(Session session) throws HibernateException, SQLException {
                Query query = session.createSQLQuery(sql.toString());
                return query.list();
            }
         });

        
        
        //查询邮件
        ArrayList params = new ArrayList();
        
        StringBuffer hql = new StringBuffer("select distinct mb from MailBox mb where mb.delFlag = ? and mb.appUser.userId =?");
        params.add(Constants.FLAG_UNDELETED);
        params.add(ContextUtil.getCurrentUserId());
        
        if(StringUtils.isNotEmpty(searchContent)){
            hql.append(" and (mb.mail.subject like ? or mb.mail.content like ? ");
            params.add("%"+searchContent+"%");
            params.add("%"+searchContent+"%");
            if(faId.size()>0){
                for(BigDecimal id:faId){
                    hql.append(" or mb.mail.mailId = ?");
                    params.add(id.longValue());
//                  System.out.println(id.longValue());
                }
            }
            hql.append(")");
        }
        
        hql.append(" order by mb.sendTime desc");
        return findByHql(hql.toString(),params.toArray(), pb);
    }

}