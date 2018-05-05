<%@page pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
var __allApprovalInfo='<s:property value="%{getText('all.approvalInfo')}"/>';
var __allApprovalStatus='<s:property value="%{getText('all.approvalStatus')}"/>';
var __allStartTask='<s:property value="%{getText('all.startTask')}"/>';
var __allTasks='<s:property value="%{getText('all.tasks')}"/>';
var __menuViewUlNewsReceives='<s:property value="%{getText('menu.viewUlNewsReceives')}"/>';

var __ulNewsReceiveReceiveId='<s:property value="%{getText('ulNewsReceive.receiveId')}"/>';
var __ulNewsReceiveNewsId='<s:property value="%{getText('ulNewsReceive.newsId')}"/>';
var __ulNewsReceiveReceiver='<s:property value="%{getText('ulNewsReceive.receiver')}"/>';
var __ulNewsReceiveReceivetime='<s:property value="%{getText('ulNewsReceive.receivetime')}"/>';
var __ulNewsReceiveReadtime='<s:property value="%{getText('ulNewsReceive.readtime')}"/>';
var __ulNewsReceiveReadstatus='<s:property value="%{getText('ulNewsReceive.readstatus')}"/>';

var __ulNewsReceiveDetailHeading='<s:property value="%{getText('ulNewsReceiveDetail.heading')}"/>';

var __ulNewsReceiveListHeading='<s:property value="%{getText('ulNewsReceiveList.heading')}"/>';
var __ulNewsReceiveListNoulNewsReceives='<s:property value="%{getText('ulNewsReceiveList.noulNewsReceives')}"/>';
var __ulNewsReceiveAdded='<s:property value="%{getText('ulNewsReceive.added')}"/>';
var __ulNewsReceiveDeleted='<s:property value="%{getText('ulNewsReceive.deleted')}"/>';
var __ulNewsReceiveUpdated='<s:property value="%{getText('ulNewsReceive.updated')}"/>';
var __ulNewsReceiveMutiDeleted='<s:property value="%{getText('ulNewsReceive.mutiDeleted')}"/>';

var __menuViewUkKnowApplys='<s:property value="%{getText('menu.viewUkKnowApplys')}"/>';

var __ukKnowApplyApplyId='<s:property value="%{getText('ukKnowApply.applyId')}"/>';
var __ukKnowApplyApplyUserid='<s:property value="%{getText('ukKnowApply.applyUserid')}"/>';
var __ukKnowApplyApplyTime='<s:property value="%{getText('ukKnowApply.applyTime')}"/>';
var __ukKnowApplyApplyTitle='<s:property value="%{getText('ukKnowApply.applyTitle')}"/>';
var __ukKnowApplyApplyDescribe='<s:property value="%{getText('ukKnowApply.applyDescribe')}"/>';
var __ukKnowApplyApplyContent='<s:property value="%{getText('ukKnowApply.applyContent')}"/>';
var __ukKnowApplyApplyComment='<s:property value="%{getText('ukKnowApply.applyComment')}"/>';
var __ukKnowApplyRequireTime='<s:property value="%{getText('ukKnowApply.requireTime')}"/>';
var __ukKnowApplyHoldTime='<s:property value="%{getText('ukKnowApply.holdTime')}"/>';
var __ukKnowApplyBusiType='<s:property value="%{getText('ukKnowApply.busiType')}"/>';
var __ukKnowApplyApplyType='<s:property value="%{getText('ukKnowApply.applyType')}"/>';
var __ukKnowApplyApplyStatus='<s:property value="%{getText('ukKnowApply.applyStatus')}"/>';
var __ukKnowApplyRunid='<s:property value="%{getText('ukKnowApply.runid')}"/>';
var __ukKnowApplyCreateBy='<s:property value="%{getText('ukKnowApply.createBy')}"/>';
var __ukKnowApplyUpdateBy='<s:property value="%{getText('ukKnowApply.updateBy')}"/>';
var __ukKnowApplyCreateDate='<s:property value="%{getText('ukKnowApply.createDate')}"/>';
var __ukKnowApplyUpdateDate='<s:property value="%{getText('ukKnowApply.updateDate')}"/>';

var __ukKnowApplyDetailHeading='<s:property value="%{getText('ukKnowApplyDetail.heading')}"/>';
var __ukKnowApplyBasicInfo='<s:property value="%{getText('ukKnowApply.basicInfo')}"/>';
var __ukKnowApplyCollContent='<s:property value="%{getText('ukKnowApply.collContent')}"/>';

var __ukKnowApplyListHeading='<s:property value="%{getText('ukKnowApplyList.heading')}"/>';
var __ukKnowApplyListNoukKnowApplys='<s:property value="%{getText('ukKnowApplyList.noukKnowApplys')}"/>';
var __ukKnowApplyAdded='<s:property value="%{getText('ukKnowApply.added')}"/>';
var __ukKnowApplyDeleted='<s:property value="%{getText('ukKnowApply.deleted')}"/>';
var __ukKnowApplyUpdated='<s:property value="%{getText('ukKnowApply.updated')}"/>';
var __ukKnowApplyMutiDeleted='<s:property value="%{getText('ukKnowApply.mutiDeleted')}"/>';

var __menuViewUkKnowApproves='<s:property value="%{getText('menu.viewUkKnowApproves')}"/>';
var __ukKnowApproveDetailHead='<s:property value="%{getText('ukKnowApproveDetail.heading')}" />';
var __advanceQueryUkKnowApproves='<s:property value="%{getText('ukKnowApprove.advanceQuery')}"/>';
var __ukKnowApproveKnowApproveId='<s:property value="%{getText('ukKnowApprove.knowApproveId')}"/>';
var __ukKnowApproveApplyId='<s:property value="%{getText('ukKnowApprove.applyId')}"/>';
var __ukKnowApproveApproveTitle='<s:property value="%{getText('ukKnowApprove.approveTitle')}"/>';
var __ukKnowApproveApproveComment='<s:property value="%{getText('ukKnowApprove.approveComment')}"/>';
var __ukKnowApproveKnowStatus='<s:property value="%{getText('ukKnowApprove.knowStatus')}"/>';
var __ukKnowApproveRunid='<s:property value="%{getText('ukKnowApprove.runid')}"/>';
var __ukKnowApproveCreateBy='<s:property value="%{getText('ukKnowApprove.createBy')}"/>';
var __ukKnowApproveUpdateBy='<s:property value="%{getText('ukKnowApprove.updateBy')}"/>';
var __ukKnowApproveCreateDate='<s:property value="%{getText('ukKnowApprove.createDate')}"/>';
var __ukKnowApproveUpdateDate='<s:property value="%{getText('ukKnowApprove.updateDate')}"/>';
var __ukKnowApproveUserid='<s:property value="%{getText('ukKnowApprove.userid')}"/>';
var __ukKnowApproveApprovalStatus='<s:property value="%{getText('ukKnowApprove.approvalStatus')}"/>';

var __ukKnowApproveDetailHeading='<s:property value="%{getText('ukKnowApproveDetail.heading')}"/>';

var __ukKnowApproveListHeading='<s:property value="%{getText('ukKnowApproveList.heading')}"/>';
var __ukKnowApproveListNoukKnowApproves='<s:property value="%{getText('ukKnowApproveList.noukKnowApproves')}"/>';
var __ukKnowApproveAdded='<s:property value="%{getText('ukKnowApprove.added')}"/>';
var __ukKnowApproveDeleted='<s:property value="%{getText('ukKnowApprove.deleted')}"/>';
var __ukKnowApproveUpdated='<s:property value="%{getText('ukKnowApprove.updated')}"/>';
var __ukKnowApproveMutiDeleted='<s:property value="%{getText('ukKnowApprove.mutiDeleted')}"/>';

var __menuViewUkKnowDianpings='<s:property value="%{getText('menu.viewUkKnowDianpings')}"/>';

var __ukKnowDianping='<s:property value="%{getText('ukKnowDianping')}"/>';
var __ukKnowDianpingDianpingId='<s:property value="%{getText('ukKnowDianping.dianpingId')}"/>';
var __ukKnowDianpingKnowId='<s:property value="%{getText('ukKnowDianping.knowId')}"/>';
var __ukKnowDianpingDianpingValue='<s:property value="%{getText('ukKnowDianping.dianpingValue')}"/>';
var __ukKnowDianpingDianpingTime='<s:property value="%{getText('ukKnowDianping.dianpingTime')}"/>';
var __ukKnowDianpingDianpingComment='<s:property value="%{getText('ukKnowDianping.dianpingComment')}"/>';
var __ukKnowDianpingUserid='<s:property value="%{getText('ukKnowDianping.userid')}"/>';
var __ukKnowDianpingKnowStatus='<s:property value="%{getText('ukKnowDianping.knowStatus')}"/>';

var __ukKnowDianpingDetailHeading='<s:property value="%{getText('ukKnowDianpingDetail.heading')}"/>';

var __ukKnowDianpingListHeading='<s:property value="%{getText('ukKnowDianpingList.heading')}"/>';
var __ukKnowDianpingListNoukKnowDianpings='<s:property value="%{getText('ukKnowDianpingList.noukKnowDianpings')}"/>';
var __ukKnowDianpingAdded='<s:property value="%{getText('ukKnowDianping.added')}"/>';
var __ukKnowDianpingDeleted='<s:property value="%{getText('ukKnowDianping.deleted')}"/>';
var __ukKnowDianpingUpdated='<s:property value="%{getText('ukKnowDianping.updated')}"/>';
var __ukKnowDianpingMutiDeleted='<s:property value="%{getText('ukKnowDianping.mutiDeleted')}"/>';

var __menuViewUkKnowDingyues='<s:property value="%{getText('menu.viewUkKnowDingyues')}"/>';

var __ukKnowDingyueDingyueId='<s:property value="%{getText('ukKnowDingyue.dingyueId')}"/>';
var __ukKnowDingyueKnowTypeId='<s:property value="%{getText('ukKnowDingyue.knowTypeId')}"/>';
var __ukKnowDingyueBusiType='<s:property value="%{getText('ukKnowDingyue.busiType')}"/>';
var __ukKnowDingyueDesCribe='<s:property value="%{getText('ukKnowDingyue.desCribe')}"/>';
var __ukKnowDingyueUserid='<s:property value="%{getText('ukKnowDingyue.userid')}"/>';
var __ukKnowDingyueMyDingyue='<s:property value="%{getText('ukKnowDingyue.myDingyue')}"/>';
var __ukKnowDingyueManage='<s:property value="%{getText('ukKnowDingyue.manage')}"/>';
var __ukKnowDingyueKnowDingyue='<s:property value="%{getText('ukKnowDingyue.knowDingyue')}"/>';

var __ukKnowDingyueDetailHeading='<s:property value="%{getText('ukKnowDingyueDetail.heading')}"/>';

var __ukKnowDingyueListHeading='<s:property value="%{getText('ukKnowDingyueList.heading')}"/>';
var __ukKnowDingyueListNoukKnowDingyues='<s:property value="%{getText('ukKnowDingyueList.noukKnowDingyues')}"/>';
var __ukKnowDingyueAdded='<s:property value="%{getText('ukKnowDingyue.added')}"/>';
var __ukKnowDingyueDeleted='<s:property value="%{getText('ukKnowDingyue.deleted')}"/>';
var __ukKnowDingyueUpdated='<s:property value="%{getText('ukKnowDingyue.updated')}"/>';
var __ukKnowDingyueMutiDeleted='<s:property value="%{getText('ukKnowDingyue.mutiDeleted')}"/>';

var __menuViewUkKnowFankuis='<s:property value="%{getText('menu.viewUkKnowFankuis')}"/>';

var __ukKnowFankuiFankuiId='<s:property value="%{getText('ukKnowFankui.fankuiId')}"/>';
var __ukKnowFankuiKnowId='<s:property value="%{getText('ukKnowFankui.knowId')}"/>';
var __ukKnowFankuiFankuiTitle='<s:property value="%{getText('ukKnowFankui.fankuiTitle')}"/>';
var __ukKnowFankuiFankuiTime='<s:property value="%{getText('ukKnowFankui.fankuiTime')}"/>';
var __ukKnowFankuiFankuiContent='<s:property value="%{getText('ukKnowFankui.fankuiContent')}"/>';
var __ukKnowFankuiUserid='<s:property value="%{getText('ukKnowFankui.userid')}"/>';
var __ukKnowFankuiFileid='<s:property value="%{getText('ukKnowFankui.fileid')}"/>';
var __ukKnowFankuiKnowStatus='<s:property value="%{getText('ukKnowFankui.knowStatus')}"/>';
var __ukKnowFankuiManage='<s:property value="%{getText('ukKnowFankui.manage')}"/>';

var __ukKnowFankuiDetailHeading='<s:property value="%{getText('ukKnowFankuiDetail.heading')}"/>';
var __ukKnowFankuiUploadFiles='<s:property value="%{getText('ukKnowFankui.uploadFiles')}"/>';
var __ukKnowFankuiClearFiles='<s:property value="%{getText('ukKnowFankui.clearFiles')}"/>';

var __ukKnowFankuiListHeading='<s:property value="%{getText('ukKnowFankuiList.heading')}"/>';
var __ukKnowFankuiListNoukKnowFankuis='<s:property value="%{getText('ukKnowFankuiList.noukKnowFankuis')}"/>';
var __ukKnowFankuiAdded='<s:property value="%{getText('ukKnowFankui.added')}"/>';
var __ukKnowFankuiDeleted='<s:property value="%{getText('ukKnowFankui.deleted')}"/>';
var __ukKnowFankuiUpdated='<s:property value="%{getText('ukKnowFankui.updated')}"/>';
var __ukKnowFankuiMutiDeleted='<s:property value="%{getText('ukKnowFankui.mutiDeleted')}"/>';

var __menuViewUkKnowKeywords='<s:property value="%{getText('menu.viewUkKnowKeywords')}"/>';

var __ukKnowKeywordTyperoot       = '<s:property value="%{getText('ukKnowKeywordType.root')}"/>';
var __ukKnowKeywordTyperootMessage= '<s:property value="%{getText('ukKnowKeywordType.rootMessage')}"/>';
var __ukKnowKeywordTypename       = '<s:property value="%{getText('ukKnowKeywordType.name')}"/>';
var __ukKnowKeywordTypecomMent    = '<s:property value="%{getText('ukKnowKeywordType.comMent')}"/>';
var __ukKnowKeywordTypeadd        = '<s:property value="%{getText('ukKnowKeywordType.add')}"/>';
var __ukKnowKeywordTypedel        = '<s:property value="%{getText('ukKnowKeywordType.del')}"/>';
var __ukKnowKeywordTypedelMessage = '<s:property value="%{getText('ukKnowKeywordType.delMessage')}"/>';
var __ukKnowKeywordTypedelResponse = '<s:property value="%{getText('ukKnowKeywordType.delResponse')}"/>';
var __ukKnowKeywordTypeupdate     = '<s:property value="%{getText('ukKnowKeywordType.update')}"/>';

var __ukKnowKeywordkeywordId     = '<s:property value="%{getText('ukKnowKeyword.keywordId')}"/>';      
var __ukKnowKeywordtype          = '<s:property value="%{getText('ukKnowKeyword.type')}"/>';      
var __ukKnowKeywordkeyWord       = '<s:property value="%{getText('ukKnowKeyword.keyWord')}"/>';      
var __ukKnowKeywordcomMent       = '<s:property value="%{getText('ukKnowKeyword.comMent')}"/>';      
var __ukKnowKeywordlist          = '<s:property value="%{getText('ukKnowKeyword.list')}"/>';
var __ukKnowKeywordadd    		 = '<s:property value="%{getText('ukKnowKeyword.add')}"/>';        
var __ukKnowKeywordaddMessage    = '<s:property value="%{getText('ukKnowKeyword.addMessage')}"/>';      
var __ukKnowKeyworddelMessage    = '<s:property value="%{getText('ukKnowKeyword.delMessage')}"/>';      
var __ukKnowKeywordenableMessage = '<s:property value="%{getText('ukKnowKeyword.enableMessage')}"/>';      

var __menuViewUkKnowTemplates='<s:property value="%{getText('menu.viewUkKnowTemplates')}"/>';
var __advanceQueryUkKnowTemplates='<s:property value="%{getText('menu.viewUkKnowTemplates')}" />';
var __ukKnowTemplate='<s:property value="%{getText('ukKnowTemplate.ukKnowTemplate')}" />';
var __ukKnowTemplateKnowTmpId='<s:property value="%{getText('ukKnowTemplate.knowTmpId')}"/>';
var __ukKnowTemplateTmpName='<s:property value="%{getText('ukKnowTemplate.tmpName')}"/>';
var __ukKnowTemplateTmpDescribe='<s:property value="%{getText('ukKnowTemplate.tmpDescribe')}"/>';
var __ukKnowTemplateBeginTime='<s:property value="%{getText('ukKnowTemplate.beginTime')}"/>';
var __ukKnowTemplateCloseTime='<s:property value="%{getText('ukKnowTemplate.closeTime')}"/>';
var __ukKnowTemplateUpdateTime='<s:property value="%{getText('ukKnowTemplate.updateTime')}"/>';
var __ukKnowTemplateKnowStatus='<s:property value="%{getText('ukKnowTemplate.knowStatus')}"/>';
var __ukKnowTemplateKnowVersion='<s:property value="%{getText('ukKnowTemplate.knowVersion')}"/>';
var __ukKnowTemplateCreateBy='<s:property value="%{getText('ukKnowTemplate.createBy')}"/>';
var __ukKnowTemplateUpdateBy='<s:property value="%{getText('ukKnowTemplate.updateBy')}"/>';
var __ukKnowTemplateCreateDate='<s:property value="%{getText('ukKnowTemplate.createDate')}"/>';
var __ukKnowTemplateUpdateDate='<s:property value="%{getText('ukKnowTemplate.updateDate')}"/>';

var __ukKnowTemplateDetailHeading='<s:property value="%{getText('ukKnowTemplateDetail.heading')}"/>';

var __ukKnowTemplateListHeading='<s:property value="%{getText('ukKnowTemplateList.heading')}"/>';
var __ukKnowTemplateListNoukKnowTemplates='<s:property value="%{getText('ukKnowTemplateList.noukKnowTemplates')}"/>';
var __ukKnowTemplateAdded='<s:property value="%{getText('ukKnowTemplate.added')}"/>';
var __ukKnowTemplateDeleted='<s:property value="%{getText('ukKnowTemplate.deleted')}"/>';
var __ukKnowTemplateUpdated='<s:property value="%{getText('ukKnowTemplate.updated')}"/>';
var __ukKnowTemplateMutiDeleted='<s:property value="%{getText('ukKnowTemplate.mutiDeleted')}"/>';

var __ukKnowTypeListheading='<s:property value="%{getText('ukKnowTypeList.heading')}"/>';
var __menuViewUkKnowTypes='<s:property value="%{getText('menu.viewUkKnowTypes')}"/>';
var __ukKnowTingyong ='<s:property value="%{getText('ukKnowType.Tingyong')}"/>';
var __deleteTishi='<s:property value="%{getText('deleteTishi')}"/>';
var __deleteSelectTishi='<s:property value="%{getText('deleteSelectTishi')}"/>';
var __ukKnowTypedeletedfail='<s:property value="%{getText('ukKnowType.deletedfail')}"/>';
var __ukKnowTypeKnowTypeId='<s:property value="%{getText('ukKnowType.knowTypeId')}"/>';
var __ukKnowTypeKnowTmpId='<s:property value="%{getText('ukKnowType.knowTmpId')}"/>';
var __ukKnowTypeName='<s:property value="%{getText('ukKnowType.name')}"/>';
var __ukKnowTypeComMent='<s:property value="%{getText('ukKnowType.comMent')}"/>';
var __ukKnowTypeParentId='<s:property value="%{getText('ukKnowType.parentId')}"/>';
var __ukKnowTypeUpdateTime='<s:property value="%{getText('ukKnowType.updateTime')}"/>';
var __ukKnowTypeUserid='<s:property value="%{getText('ukKnowType.userid')}"/>';
var __ukKnowTypeKnowTypeStatus='<s:property value="%{getText('ukKnowType.knowTypeStatus')}"/>';
var __ukKnowTypeKnowSort='<s:property value="%{getText('ukKnowType.knowSort')}"/>';
var __ukKnowTypeCreateBy='<s:property value="%{getText('ukKnowType.createBy')}"/>';
var __ukKnowTypeUpdateBy='<s:property value="%{getText('ukKnowType.updateBy')}"/>';
var __ukKnowTypeCreateDate='<s:property value="%{getText('ukKnowType.createDate')}"/>';
var __ukKnowTypeUpdateDate='<s:property value="%{getText('ukKnowType.updateDate')}"/>';

var __ukKnowTypeDetailHeading='<s:property value="%{getText('ukKnowTypeDetail.heading')}"/>';

var __ukKnowTypeListHeading='<s:property value="%{getText('ukKnowTypeList.heading')}"/>';
var __ukKnowTypemove='<s:property value="%{getText('ukKnowType.move)}"/>';
var __ukKnowTypecopy='<s:property value="%{getText('ukKnowType.copy)}"/>';

var __ukKnowTypeCopyTishi='<s:property value="%{getText('ukKnowTypeCopyTishi)}"/>';
var __ukKnowTypeListNoukKnowTypes='<s:property value="%{getText('ukKnowTypeList.noukKnowTypes')}"/>';
var __ukKnowTypeAdded='<s:property value="%{getText('ukKnowType.added')}"/>';
var __actioninfo='<s:property value="%{getText('actioninfo')}"/>';
var __ukKnowTypeDeleted='<s:property value="%{getText('ukKnowType.deleted')}"/>';
var __ukKnowTypeUpdated='<s:property value="%{getText('ukKnowType.updated')}"/>';
var __ukKnowTypeMutiDeleted='<s:property value="%{getText('ukKnowType.mutiDeleted')}"/>';

var __menuViewUkPerKnows='<s:property value="%{getText('menu.viewUkPerKnows')}"/>';

var __ukPerKnowPerKnowId='<s:property value="%{getText('ukPerKnow.perKnowId')}"/>';
var __ukPerKnowKnowId='<s:property value="%{getText('ukPerKnow.knowId')}"/>';
var __ukPerKnowUserid='<s:property value="%{getText('ukPerKnow.userid')}"/>';
var __ukPerKnowOperateType='<s:property value="%{getText('ukPerKnow.operateType')}"/>';
var __ukPerKnowOperateTime='<s:property value="%{getText('ukPerKnow.operateTime')}"/>';
var __ukPerKnowStatus='<s:property value="%{getText('ukPerKnow.status')}"/>';
var __ukPerKnowReadTime='<s:property value="%{getText('ukPerKnow.readTime')}"/>';

var __ukPerKnowDetailHeading='<s:property value="%{getText('ukPerKnowDetail.heading')}"/>';

var __ukPerKnowListHeading='<s:property value="%{getText('ukPerKnowList.heading')}"/>';
var __ukPerKnowListNoukPerKnows='<s:property value="%{getText('ukPerKnowList.noukPerKnows')}"/>';
var __ukPerKnowAdded='<s:property value="%{getText('ukPerKnow.added')}"/>';
var __ukPerKnowDeleted='<s:property value="%{getText('ukPerKnow.deleted')}"/>';
var __ukPerKnowUpdated='<s:property value="%{getText('ukPerKnow.updated')}"/>';
var __ukPerKnowMutiDeleted='<s:property value="%{getText('ukPerKnow.mutiDeleted')}"/>';

var __menuViewUkSysKnows='<s:property value="%{getText('menu.viewUkSysKnows')}"/>';
var __menuViewUkKnowCollect='<s:property value="%{getText('menu.viewUkKnowCollect')}"/>';

var __ukSysKnowKnowId='<s:property value="%{getText('ukSysKnow.knowId')}"/>';
var __ukSysKnowKnowTmpId='<s:property value="%{getText('ukSysKnow.knowTmpId')}"/>';
var __ukSysKnowKnowApproveId='<s:property value="%{getText('ukSysKnow.knowApproveId')}"/>';
var __ukSysKnowTiTle='<s:property value="%{getText('ukSysKnow.tiTle')}"/>';
var __ukSysKnowBusiType='<s:property value="%{getText('ukSysKnow.busiType')}"/>';
var __ukSysKnowEnableTime='<s:property value="%{getText('ukSysKnow.enableTime')}"/>';
var __ukSysKnowPastTime='<s:property value="%{getText('ukSysKnow.pastTime')}"/>';
var __ukSysKnowSysKnowStatus='<s:property value="%{getText('ukSysKnow.sysKnowStatus')}"/>';
var __ukSysKnowViewCount='<s:property value="%{getText('ukSysKnow.viewCount')}"/>';
var __ukSysKnowSysKnowComment='<s:property value="%{getText('ukSysKnow.sysKnowComment')}"/>';
var __ukSysKnowPlus1='<s:property value="%{getText('ukSysKnow.plus1')}"/>';
var __ukSysKnowPlus2='<s:property value="%{getText('ukSysKnow.plus2')}"/>';
var __ukSysKnowPlus3='<s:property value="%{getText('ukSysKnow.plus3')}"/>';
var __ukSysKnowPlus4='<s:property value="%{getText('ukSysKnow.plus4')}"/>';
var __ukSysKnowPlus5='<s:property value="%{getText('ukSysKnow.plus5')}"/>';
var __ukSysKnowPlus6='<s:property value="%{getText('ukSysKnow.plus6')}"/>';
var __ukSysKnowPlus7='<s:property value="%{getText('ukSysKnow.plus7')}"/>';
var __ukSysKnowPlus8='<s:property value="%{getText('ukSysKnow.plus8')}"/>';
var __ukSysKnowSysKnowVersion='<s:property value="%{getText('ukSysKnow.sysKnowVersion')}"/>';
var __ukSysKnowCreateBy='<s:property value="%{getText('ukSysKnow.createBy')}"/>';
var __ukSysKnowUpdateBy='<s:property value="%{getText('ukSysKnow.updateBy')}"/>';
var __ukSysKnowCreateDate='<s:property value="%{getText('ukSysKnow.createDate')}"/>';
var __ukSysKnowUpdateDate='<s:property value="%{getText('ukSysKnow.updateDate')}"/>';
var __ukSysKnowUserid='<s:property value="%{getText('ukSysKnow.userid')}"/>';

var __ukSysKnowDetailHeading='<s:property value="%{getText('ukSysKnowDetail.heading')}"/>';

var __ukSysKnowListHeading='<s:property value="%{getText('ukSysKnowList.heading')}"/>';
var __ukSysKnowListNoukSysKnows='<s:property value="%{getText('ukSysKnowList.noukSysKnows')}"/>';
var __ukSysKnowAdded='<s:property value="%{getText('ukSysKnow.added')}"/>';
var __ukSysKnowDeleted='<s:property value="%{getText('ukSysKnow.deleted')}"/>';
var __ukSysKnowUpdated='<s:property value="%{getText('ukSysKnow.updated')}"/>';
var __ukSysKnowMutiDeleted='<s:property value="%{getText('ukSysKnow.mutiDeleted')}"/>';

var __menuViewUlContactEmpls='<s:property value="%{getText('menu.viewUlContactEmpls')}"/>';

var __ulContactEmplContactEmplId='<s:property value="%{getText('ulContactEmpl.contactEmplId')}"/>';
var __ulContactEmplUseid='<s:property value="%{getText('ulContactEmpl.useid')}"/>';
var __ulContactEmplContactType='<s:property value="%{getText('ulContactEmpl.contactType')}"/>';
var __ulContactEmplContactValue='<s:property value="%{getText('ulContactEmpl.contactValue')}"/>';

var __ulContactEmplDetailHeading='<s:property value="%{getText('ulContactEmplDetail.heading')}"/>';

var __ulContactEmplListHeading='<s:property value="%{getText('ulContactEmplList.heading')}"/>';
var __ulContactEmplListNoulContactEmpls='<s:property value="%{getText('ulContactEmplList.noulContactEmpls')}"/>';
var __ulContactEmplAdded='<s:property value="%{getText('ulContactEmpl.added')}"/>';
var __ulContactEmplDeleted='<s:property value="%{getText('ulContactEmpl.deleted')}"/>';
var __ulContactEmplUpdated='<s:property value="%{getText('ulContactEmpl.updated')}"/>';
var __ulContactEmplMutiDeleted='<s:property value="%{getText('ulContactEmpl.mutiDeleted')}"/>';

var __menuViewUkRelativeKnows='<s:property value="%{getText('menu.viewUkRelativeKnows')}"/>';

var __ukRelativeKnowRelativeId='<s:property value="%{getText('ukRelativeKnow.relativeId')}"/>';
var __ukRelativeKnowKnowId='<s:property value="%{getText('ukRelativeKnow.knowId')}"/>';
var __ukRelativeKnowUkKnowId='<s:property value="%{getText('ukRelativeKnow.ukKnowId')}"/>';

var __ukRelativeKnowDetailHeading='<s:property value="%{getText('ukRelativeKnowDetail.heading')}"/>';

var __ukRelativeKnowListHeading='<s:property value="%{getText('__ukRelativeKnowList.heading')}"/>';
var __ukRelativeKnowListNoukRelativeKnows='<s:property value="%{getText('ukRelativeKnowList.noukRelativeKnows')}"/>';
var __ukRelativeKnowAdded='<s:property value="%{getText('ukRelativeKnow.added')}"/>';
var __ukRelativeKnowDeleted='<s:property value="%{getText('ukRelativeKnow.deleted')}"/>';
var __ukRelativeKnowUpdated='<s:property value="%{getText('ukRelativeKnow.updated')}"/>';
var __ukRelativeKnowMutiDeleted='<s:property value="%{getText('ukRelativeKnow.mutiDeleted')}"/>';

var __UkKnowRecommendmyRecommend   = '<s:property value="%{getText('UkKnowRecommend.myRecommend')}"/>';       
var __UkKnowRecommendrecommendDate = '<s:property value="%{getText('UkKnowRecommend.recommendDate')}"/>';       
var __UkKnowRecommendrecommender   = '<s:property value="%{getText('UkKnowRecommend.recommender')}"/>';       
var __UkKnowRecommendaccepter      = '<s:property value="%{getText('UkKnowRecommend.accepter')}"/>';       
var __UkKnowRecommendtoMyRecommend = '<s:property value="%{getText('UkKnowRecommend.toMyRecommend')}"/>';       
var __UkKnowRecommendtitle         = '<s:property value="%{getText('UkKnowRecommend.title')}"/>';       
