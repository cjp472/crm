/**
 * 系统导入的模块js，主要用于后加载方式，需要使用某些js时，需要在此指定加载哪一些。
 */
Ext.ns("App");
App.importJsf = {
	UkKnowApplyFlowView : [
	        __ctxPath + '/js/know/UkKnowApplyFlowView.js',
			__ctxPath + '/js/know/UkKnowApplyCollectFlowForm.js',
			__ctxPath + '/js/know/KnowTmpForm.js',
			__ctxPath + '/js/know/UkKnowCollectForm.js',
			__ctxPath + '/js/selector/UkKnowKeywordSelector.js',
			__ctxPath + '/js/know/UkKnowApplyFlowForm.js',
			__ctxPath + '/js/know/UkKnowCollectImport.js',
			__ctxPath + '/js/know/UkKnowCollectView.js'

	],
	UkKnowApproveFlowView : [
	                         __ctxPath+'/js/know/UkKnowApproveFlowView.js',
						__ctxPath+'/js/know/UkKnowApplyItemView.js',
						__ctxPath+'/js/know/UkKnowApplyNoItemView.js',
                     	__ctxPath+'/js/know/UkKnowApproveFlowForm.js',
                     	__ctxPath+'/js/know/UkKnowApproveView.js',
                     	__ctxPath+'/js/know/UkKnowApproveForm.js'
                     	
	                     	
	    	]
};