﻿/**
 * 系统导入的模块js，主要用于后加载方式，需要使用某些js时，需要在此指定加载哪一些。
 */
Ext.ns("App");
App.importJs = {
	MenuView : [__ctxPath + '/js/system/MenuView.js',
			__ctxPath + '/js/system/MenuForm.js',
			__ctxPath + '/js/system/MenuFunctionForm.js',
			__ctxPath + '/js/system/MenuUrlForm.js',
			__ctxPath + '/js/system/IconSelector.js'],
	UserJobView : [__ctxPath + '/js/system/UserJobView.js',
			__ctxPath + '/js/system/UserJobForm.js',
			__ctxPath + '/js/system/RelativeJobView.js',
			__ctxPath + '/js/system/RelativeJobForm.js',
			__ctxPath + '/js/system/RelativeUserView.js',
			__ctxPath + '/js/system/RelativeUserForm.js',
			__ctxPath + '/js/system/DepartmentForm.js',
			__ctxPath + '/js/system/UserJobDetailForm.js',
			__ctxPath + '/js/system/JobForm.js',
			__ctxPath + '/js/selector/UserSelector.js',
			__ctxPath + '/js/selector/JobSelector.js',
			__ctxPath + '/js/selector/DepSelector.js'],
	AppRoleView : [__ctxPath + '/js/system/AppRoleView.js',
			__ctxPath + '/ext3/ux/CheckTreePanel.js',
			__ctxPath + '/js/system/RoleGrantRightView.js',
			__ctxPath + '/js/system/AppRoleForm.js'],
	UserSubView : [__ctxPath + '/js/system/UserSubView.js',
			__ctxPath + '/js/system/UserSubForm.js',
			__ctxPath + '/js/selector/UserSubSelector.js'],
	PersonalDocumentView : [__ctxPath + '/js/document/PersonalDocumentView.js',
			__ctxPath + '/js/document/DocumentView.js',
			__ctxPath + '/js/document/DocumentForm.js',
			__ctxPath + '/js/document/DocumentSharedForm.js',
			__ctxPath + '/js/document/DocFolderForm.js',
			__ctxPath + '/js/selector/RoleSelector.js'],
	DocumentSharedView : [__ctxPath + '/js/document/DocumentSharedView.js',
			__ctxPath + '/js/document/DocumentSharedDetail.js'],
	DocFolderSharedView : [
			__ctxPath + '/js/document/FindPublicDocumentView.js',
			__ctxPath + '/js/document/DocFolderView.js',
			__ctxPath + '/js/document/DocFolderForm.js',
			__ctxPath + '/js/document/DocFolderSharedView.js',
			__ctxPath + '/js/document/DocFolderSharedForm.js',
			__ctxPath + '/js/document/DocPrivilegeForm.js',
			__ctxPath + '/js/document/DocPrivilegeView.js',
			__ctxPath + '/ext3/ux/CheckColumn.js'],
	FindPublicDocumentView : [
			__ctxPath + '/js/document/FindPublicDocumentView.js',
			__ctxPath + '/js/document/PublicDocumentView.js',
			__ctxPath + '/js/document/PublicDocumentDetail.js',
			__ctxPath + '/js/document/NewPublicDocumentForm.js',
			__ctxPath + '/js/document/DocFolderSelector.js'],
	NewPublicDocumentForm : [
			__ctxPath + '/js/document/NewPublicDocumentForm.js',
			__ctxPath + '/js/document/DocFolderSelector.js'],
	DocFolderMoveForm : [__ctxPath + '/js/document/DocFolderMoveForm.js',
			__ctxPath + '/js/document/PersonalDocFolderSelector.js'],
	NoticeView : [__ctxPath + '/js/info/NoticeView.js',
			__ctxPath + '/js/info/NoticeForm.js',
			__ctxPath + '/js/selector/SectionSelector.js'],
	ReportTemplateView : [__ctxPath + '/js/system/ReportTemplateView.js',
			__ctxPath + '/js/system/ReportTemplateForm.js',
			__ctxPath + '/js/system/ReportParamForm.js',
			__ctxPath + '/js/system/ReportParamView.js',
			__ctxPath + '/js/system/ReportTemplatePreview.js',
			__ctxPath + '/ext3/ux/ext-basex.js'],
	MessageView : [__ctxPath + '/js/info/MessageView.js',
			__ctxPath + '/js/info/MessageForm.js',
			__ctxPath + '/js/info/MessageWin.js'],
	MessageManageView : [__ctxPath + '/js/info/MessageManageView.js',
	        __ctxPath + '/js/selector/UserRoleSelector.js',
			__ctxPath + '/js/info/MessageForm.js',
			__ctxPath + '/js/info/MessageDetailInfo.js'

	],
	PhoneBookView : [__ctxPath + '/js/communicate/PhoneBookView.js',
			__ctxPath + '/js/communicate/PhoneGroupForm.js',
			__ctxPath + '/js/communicate/PhoneBookForm.js'],
	DepartmentView : [__ctxPath + '/js/system/DepartmentView.js',
			__ctxPath + '/js/system/DepartmentForm.js',
			__ctxPath + '/js/system/AppUserView.js',
			__ctxPath + '/ext3/ux/ItemSelector.js',
			__ctxPath + '/ext3/ux/MultiSelect.js',
			__ctxPath + '/js/system/AppUserForm.js',
			__ctxPath + '/js/system/RelativeUserView.js',
			__ctxPath + '/js/system/RelativeUserForm.js',
			__ctxPath + '/js/system/RelativeJobView.js',
			__ctxPath + '/js/system/RelativeJobForm.js',
			__ctxPath + '/js/system/DepUsersForm.js',
			__ctxPath + '/js/system/DepUsersDetailForm.js'],
	AppUserView : [
			__ctxPath + '/js/system/AppUserView.js',
			__ctxPath + '/js/system/AppUserForm.js',
			__ctxPath + '/js/selector/UlEmployeeSelector.js',
			__ctxPath + '/js/selector/ResetPwd.js',
			// __ctxPath + '/js/myTestJs/combo_emp.js',
			__ctxPath + '/ext3/ux/ItemSelector.js',
			__ctxPath + '/ext3/ux/MultiSelect.js',
			__ctxPath + '/js/system/DynamicPwdForm.js',
			__ctxPath + '/js/system/ResetPasswordForm.js',
			__ctxPath + '/js/system/setPasswordForm.js'],
	// ProductView : [__ctxPath + '/js/product/ProductView.js',
	// __ctxPath + '/js/product/ProductForm.js'],
	ProfileForm : [__ctxPath + '/js/system/ProfileForm.js',
			__ctxPath + '/js/system/ResetPasswordForm.js'],
	NewsView : [__ctxPath + '/js/info/NewsView.js',
			__ctxPath + '/js/info/NewsForm.js',
			__ctxPath + '/js/selector/SectionSelector.js'],
	CompanyView : [__ctxPath + '/js/system/CompanyView.js'],
	FileAttachView : [__ctxPath + '/js/system/FileAttachView.js',
			__ctxPath + '/js/system/FileAttachDetail.js'],
	DiaryView : [__ctxPath + '/js/system/DiaryView.js',
			__ctxPath + '/js/system/DiaryForm.js'],
	MySubUserDiaryView : [__ctxPath + '/js/system/MySubUserDiaryView.js',
			__ctxPath + '/js/system/DiaryDetail.js'],
	PersonalMailBoxView : [
			__ctxPath + '/js/communicate/PersonalMailBoxView.js',
			__ctxPath + '/js/communicate/MailView.js',
			__ctxPath + '/js/communicate/MailForm.js',
			__ctxPath + '/js/communicate/MailFolderForm.js',
			__ctxPath + '/ext3/ux/RowExpander.js'],
	MailForm : [__ctxPath + '/js/communicate/MailForm.js'],
	PersonalPhoneBookView : [__ctxPath + '/js/selector/UlEmployeeSelectors.js',
			__ctxPath + '/js/communicate/PersonalPhoneBookView.js',
			__ctxPath + '/js/communicate/PhoneBookView.js',
			__ctxPath + '/js/communicate/PhoneGroupForm.js',
			__ctxPath + '/js/communicate/MailView.js',
			__ctxPath + '/js/communicate/MailForm.js',
			__ctxPath + '/js/info/MessageForm.js',
			__ctxPath + '/js/communicate/PhoneBookForm.js'],
	SharedPhoneBookView : [
			__ctxPath + '/js/communicate/SharedPhoneBookView.js',
			__ctxPath + '/js/communicate/SharedPhoneBookWin.js'],
	FlowManagerView : [
			__ctxPath + '/js/flow/ProTypeForm.js',
			__ctxPath + '/js/selector/GlobalTypeSelector.js',
			__ctxPath + '/js/system/GlobalTypeForm.js',
			__ctxPath + '/js/flow/ProDefRightsForm.js',
			__ctxPath + '/js/flow/ProDefinitionForm.js',
			__ctxPath + '/js/flow/ProDefinitionView.js',
			__ctxPath + '/js/flow/FlowManagerView.js',
			__ctxPath + '/js/flow/ProDefinitionDetail.js',
			// __ctxPath+'/js/flow/ProcessRunStart.js',
			__ctxPath + '/js/flow/ProDefinitionSetting.js',
			__ctxPath + '/js/flow/MyTaskView.js',
			__ctxPath + '/js/flow/ProcessNextForm.js',
			__ctxPath + '/js/flow/FormDesignWindow.js',
			__ctxPath + '/js/flow/FormEditorWindow.js',
			__ctxPath + '/js/flowDesign/FlowDesignerWindow.js',
			__ctxPath + '/js/selector/FormDefSelector.js',
			__ctxPath + '/js/flow/FormDefForm.js',
			__ctxPath + '/js/flow/FormDefDetailForm.js',
			__ctxPath + '/js/selector/JobSelector.js',
			__ctxPath + '/js/flow/FieldRightsForm.js',
			__ctxPath + '/js/flow/TaskSignForm.js',
			__ctxPath + '/js/selector/RoleSelector.js',
			__ctxPath + '/js/selector/RelativeJobSelector.js'

	],
	AllFlowManagerView : [__ctxPath + '/js/flow/AllFlowManagerView.js',
			__ctxPath + '/js/flow/ProDefinitionDetail.js',
			__ctxPath + '/js/flow/TaskDueDateWindow.js',
			__ctxPath + '/js/flow/TaskHandlerWindow.js',
			__ctxPath + '/js/flow/TaskNeedsDateWindow.js',
			__ctxPath + '/js/flow/TaskChargeWindow.js',
			__ctxPath + '/js/flow/ProcessNextForm.js',
			__ctxPath + '/js/flow/PathChangeWindow.js',
			__ctxPath + '/js/know/UkKnowApplyFlowForm.js',
			__ctxPath + '/js/know/UkKnowApproveFlowForm.js',
			__ctxPath + '/js/customer/ConBwListFlowForm.js',
			__ctxPath + '/js/customer/CsOrderFlowForm.js',
			__ctxPath + '/js/customer/CsOrderYWFlowForm.js'],
	MyAllFlowManagerView : [__ctxPath + '/js/flow/MyAllFlowManagerView.js',
			__ctxPath + '/js/flow/ProDefinitionDetail.js',
			__ctxPath + '/js/flow/TaskDueDateWindow.js',
			__ctxPath + '/js/flow/TaskHandlerWindow.js',
			__ctxPath + '/js/flow/TaskNeedsDateWindow.js',
			__ctxPath + '/js/flow/TaskChargeWindow.js',
			__ctxPath + '/js/flow/ProcessNextForm.js',
			__ctxPath + '/js/flow/PathChangeWindow.js',
			__ctxPath + '/js/know/UkKnowApplyFlowForm.js',
			__ctxPath + '/js/know/UkKnowApproveFlowForm.js',
			__ctxPath + '/js/customer/ConBwListFlowForm.js',
			__ctxPath + '/js/customer/CsOrderFlowForm.js',
			__ctxPath + '/js/customer/CsOrderYWFlowForm.js'],
	ToDoFlowManagerView : [__ctxPath + '/js/flow/ToDoFlowManagerView.js',
			__ctxPath + '/js/flow/ProDefinitionDetail.js',
			__ctxPath + '/js/flow/TaskDueDateWindow.js',
			__ctxPath + '/js/flow/TaskHandlerWindow.js',
			__ctxPath + '/js/flow/TaskNeedsDateWindow.js',
			__ctxPath + '/js/flow/TaskChargeWindow.js',
			__ctxPath + '/js/flow/ProcessNextForm.js',
			__ctxPath + '/ext3/ux/GroupHeaderPlugin.js',
			__ctxPath + '/js/flow/PathChangeWindow.js',
			__ctxPath + '/js/flow/ChangeTaskView.js',
			__ctxPath + '/js/selector/UlEmployeeSelector.js',
			__ctxPath + '/js/flow/ProcessNextForm.js',
			__ctxPath + '/js/know/UkKnowApplyFlowForm.js',
			__ctxPath + '/js/know/UkKnowApproveFlowForm.js',
			__ctxPath + '/js/customer/ConBwListFlowForm.js',
			__ctxPath + '/js/customer/CsOrderFlowForm.js',
			__ctxPath + '/js/customer/CsOrderYWFlowForm.js'],
	MonThatView : [
	__ctxPath + '/js/outb/MonThatView.js',
		__ctxPath + '/js/selector/UlEmployeeSelector.js'
	],
	MyToDoFlowManagerView : [__ctxPath + '/js/flow/MyToDoFlowManagerView.js',
			__ctxPath + '/js/flow/ProDefinitionDetail.js',
			__ctxPath + '/js/flow/TaskDueDateWindow.js',
			__ctxPath + '/js/flow/TaskHandlerWindow.js',
			__ctxPath + '/js/flow/TaskNeedsDateWindow.js',
			__ctxPath + '/js/flow/TaskChargeWindow.js',
			__ctxPath + '/js/flow/ProcessNextForm.js',
			__ctxPath + '/js/flow/PathChangeWindow.js',
			__ctxPath + '/js/flow/ChangeTaskView.js',
			__ctxPath + '/js/flow/ProcessNextForm.js',
			__ctxPath + '/js/know/UkKnowApplyFlowForm.js',
			__ctxPath + '/js/know/UkKnowApproveFlowForm.js',
			__ctxPath + '/js/customer/ConBwListFlowForm.js',
			__ctxPath + '/js/customer/CsOrderFlowForm.js',
			__ctxPath + '/js/customer/CsOrderYWFlowForm.js'],
	ExpiredFlowManagerView : [__ctxPath + '/js/flow/ExpiredFlowManagerView.js',
			__ctxPath + '/js/flow/ProDefinitionDetail.js',
			__ctxPath + '/js/flow/TaskDueDateWindow.js',
			__ctxPath + '/js/flow/TaskHandlerWindow.js',
			__ctxPath + '/js/flow/TaskNeedsDateWindow.js',
			__ctxPath + '/js/flow/TaskChargeWindow.js',
			__ctxPath + '/js/flow/ProcessNextForm.js',
			__ctxPath + '/js/flow/PathChangeWindow.js',
			__ctxPath + '/js/flow/ChangeTaskView.js',
			__ctxPath + '/js/flow/ProcessNextForm.js',
			__ctxPath + '/js/know/UkKnowApplyFlowForm.js',
			__ctxPath + '/js/know/UkKnowApproveFlowForm.js',
			__ctxPath + '/js/customer/ConBwListFlowForm.js',
			__ctxPath + '/js/customer/CsOrderFlowForm.js',
			__ctxPath + '/js/customer/CsOrderYWFlowForm.js'],
	MyExpiredFlowManagerView : [__ctxPath + '/js/flow/MyExpiredFlowManagerView.js',
			__ctxPath + '/js/flow/ProDefinitionDetail.js',
			__ctxPath + '/js/flow/TaskDueDateWindow.js',
			__ctxPath + '/js/flow/TaskHandlerWindow.js',
			__ctxPath + '/js/flow/TaskNeedsDateWindow.js',
			__ctxPath + '/js/flow/TaskChargeWindow.js',
			__ctxPath + '/js/flow/ProcessNextForm.js',
			__ctxPath + '/js/flow/PathChangeWindow.js',
			__ctxPath + '/js/flow/ChangeTaskView.js',
			__ctxPath + '/js/flow/ProcessNextForm.js',
			__ctxPath + '/js/know/UkKnowApplyFlowForm.js',
			__ctxPath + '/js/know/UkKnowApproveFlowForm.js',
			__ctxPath + '/js/customer/ConBwListFlowForm.js',
			__ctxPath + '/js/customer/CsOrderFlowForm.js',
			__ctxPath + '/js/customer/CsOrderYWFlowForm.js'],
	TaskManager : [__ctxPath + '/js/flow/TaskDueDateWindow.js',
			__ctxPath + '/js/flow/TaskHandlerWindow.js',
			__ctxPath + '/js/flow/TaskNeedsDateWindow.js',
			__ctxPath + '/js/flow/TaskChargeWindow.js',
			__ctxPath + '/js/flow/TaskManager.js',
			__ctxPath + '/js/flow/ProcessNextForm.js',
			__ctxPath + '/js/flow/PathChangeWindow.js',
			__ctxPath + '/js/flow/ChangeTaskView.js',
			__ctxPath + '/js/flow/ProcessNextForm.js'],
	NewProcess : [__ctxPath + '/js/flow/NewProcess.js',
			__ctxPath + '/js/flow/ProDefinitionDetail.js',
			__ctxPath + '/js/flow/ProDefinitionView.js',
			__ctxPath + '/js/flow/ChangeTaskView.js',
			__ctxPath + '/js/flow/ProcessNextForm.js'
	// __ctxPath+'/js/flow/ProcessRunStart.js'
	],
	ProcessRunView : [__ctxPath + '/js/flow/ProcessRunView.js',
			__ctxPath + '/js/flow/ProcessRunDetail.js',
			__ctxPath + '/js/flow/ChangeTaskView.js',
			__ctxPath + '/js/flow/ProcessNextForm.js'
	// __ctxPath+'/js/flow/ProcessRunStart.js'
	],
	MyTaskView : [__ctxPath + '/js/flow/MyTaskView.js',
			__ctxPath + '/js/flow/ChangeTaskView.js',
			__ctxPath + '/js/flow/ProcessNextForm.js',
			__ctxPath + '/js/flow/ChangeTaskView.js',
			__ctxPath + '/js/flow/ProcessNextForm.js'],

	ProcessRunFinishView : [__ctxPath + '/js/flow/ProcessRunFinishView.js',
			__ctxPath + '/js/flow/ProcessRunDetail.js',
			__ctxPath + '/js/flow/ChangeTaskView.js',
			__ctxPath + '/js/flow/ProcessNextForm.js'],

	BookManageView : [__ctxPath + '/js/admin/BookManageView.js',
			__ctxPath + '/js/admin/BookView.js',
			__ctxPath + '/js/admin/BookForm.js',
			__ctxPath + '/js/admin/BookTypeForm.js',
			__ctxPath + '/js/admin/BookBorrowForm.js',
			__ctxPath + '/js/admin/BookAmountForm.js',
			__ctxPath + '/js/selector/BookSelector.js'],
	BookTypeView : [__ctxPath + '/js/admin/BookTypeView.js',
			__ctxPath + '/js/admin/BookTypeForm.js'],
	BookBorrowView : [__ctxPath + '/js/admin/BookBorrowView.js',
			__ctxPath + '/js/admin/BookBorrowForm.js',
			__ctxPath + '/js/admin/BookReturnForm.js',
			__ctxPath + '/js/selector/BookSelector.js'],
	BookReturnView : [__ctxPath + '/js/admin/BookReturnView.js',
			__ctxPath + '/js/admin/BookReturnForm.js',
			__ctxPath + '/js/selector/BookSelector.js'],
	OfficeGoodsManageView : [__ctxPath + '/js/admin/OfficeGoodsManageView.js',
			__ctxPath + '/js/admin/OfficeGoodsTypeForm.js',
			__ctxPath + '/js/admin/OfficeGoodsView.js',
			__ctxPath + '/js/admin/OfficeGoodsForm.js'],
	InStockView : [__ctxPath + '/js/admin/InStockView.js',
			__ctxPath + '/js/admin/InStockForm.js',
			__ctxPath + '/js/selector/GoodsSelector.js'],
	GoodsApplyView : [__ctxPath + '/js/admin/GoodsApplyView.js',
			__ctxPath + '/js/admin/GoodsApplyForm.js',
			__ctxPath + '/js/admin/GoodsCheckForm.js',
			__ctxPath + '/js/selector/GoodsSelector.js'],
	CarView : [__ctxPath + '/js/admin/CarView.js',
			__ctxPath + '/js/admin/CarForm.js'],
	CartRepairView : [__ctxPath + '/js/admin/CartRepairView.js',
			__ctxPath + '/js/admin/CartRepairForm.js',
			__ctxPath + '/js/selector/CarSelector.js'],
	CarApplyView : [__ctxPath + '/js/admin/CarApplyView.js',
			__ctxPath + '/js/admin/CarApplyForm.js',
			__ctxPath + '/js/admin/CarCheckForm.js',
			__ctxPath + '/js/selector/CarSelector.js'],
	AppointmentView : [__ctxPath + '/js/task/AppointmentView.js',
			__ctxPath + '/js/task/AppointmentForm.js'],
	CalendarPlanView : [__ctxPath + '/js/task/CalendarPlanView.js',
			__ctxPath + '/js/task/CalendarPlanForm.js',
			__ctxPath + '/js/task/CalendarPlanFinishForm.js',
			__ctxPath + '/js/task/CalendarPlanHandleForm.js',
			__ctxPath + '/js/task/addCalendarPlanForm.js',
			__ctxPath + '/js/task/CalendarPlanFormView.js'],
	ToDoPlanView : [__ctxPath + '/js/task/ToDoPlanView.js',
			__ctxPath + '/js/task/CalendarPlanForm.js',
			__ctxPath + '/js/task/CalendarPlanHandleForm.js',
			__ctxPath + '/js/task/addCalendarPlanForm.js',
			__ctxPath + '/js/selector/UserSelector.js',
			__ctxPath + '/js/selector/CusPersonalSelector.js'],
	ExpiredPlanView : [__ctxPath + '/js/task/ExpiredPlanView.js',
			__ctxPath + '/js/task/CalendarPlanForm.js',
			__ctxPath + '/js/task/CalendarPlanFinishForm.js',
			__ctxPath + '/js/task/CalendarPlanHandleForm.js',
			__ctxPath + '/js/task/CalendarPlanFormView.js'
			],
	MyPlanTaskView : [__ctxPath + '/js/task/CalendarPlanView.js',
			__ctxPath + '/js/task/CalendarPlanForm.js',
			__ctxPath + '/js/task/CalendarPlanFinishForm.js',
			__ctxPath + '/ext3/ux/caltask/e2cs_zh_CN.js',
			__ctxPath + '/ext3/ux/caltask/calendar.gzjs',
			__ctxPath + '/ext3/ux/caltask/scheduler.gzjs',
			__ctxPath + '/ext3/ux/caltask/monthview.gzjs',
			__ctxPath + '/ext3/ux/caltask/weekview.gzjs',
			__ctxPath + '/ext3/ux/caltask/dayview.gzjs',
			__ctxPath + '/ext3/ux/caltask/task.gzjs',
			__ctxPath + '/js/task/MyPlanTaskView.gzjs',
			__ctxPath + '/js/task/CalendarPlanDetailView.js'],
	PlanTypeView : [__ctxPath + '/js/task/PlanTypeView.js',
			__ctxPath + '/js/task/PlanTypeForm.js'],
	WorkPlanView : [__ctxPath + '/js/task/WorkPlanView.js',
			__ctxPath + '/js/task/NewWorkPlanForm.js',
			__ctxPath + '/ext3/ux/Ext.ux.IconCombob.js'

	],
	PersonalWorkPlanView : [__ctxPath + '/js/task/PersonalWorkPlanView.js',
			__ctxPath + '/js/task/PersonalWorkPlanForm.js',
			__ctxPath + '/js/task/WorkPlanDetail.js',
			__ctxPath + '/js/task/PersonalPlanTypeForm.js',
			__ctxPath + '/ext3/ux/Ext.ux.IconCombob.js'],
	NewWorkPlanForm : [__ctxPath + '/js/task/NewWorkPlanForm.js',
			__ctxPath + '/ext3/ux/Ext.ux.IconCombob.js'],
	DepWorkPlanView : [__ctxPath + '/js/task/DepWorkPlanView.js',
			__ctxPath + '/js/selector/GlobalTypeSelector.js',
			__ctxPath + '/js/task/DepWorkPlanForm.js',
			__ctxPath + '/js/task/WorkPlanDetail.js',
			__ctxPath + '/ext3/ux/Ext.ux.IconCombob.js'],
	CustomerView : [__ctxPath + '/js/customer/CustomerView.js',
			__ctxPath + '/js/customer/CustomerForm.js',
			__ctxPath + '/js/customer/CusLinkmanForm.js',
			__ctxPath + '/js/customer/SendMailForm.js',
			__ctxPath + '/js/selector/CustomerSelector.js'],
	CusLinkmanView : [__ctxPath + '/js/customer/CusLinkmanView.js',
			__ctxPath + '/js/customer/CusLinkmanForm.js',
			__ctxPath + '/js/selector/CustomerSelector.js']
	// start: Generated for CusPersonal From Template: App.import.js.vm
	,
	CusPersonalView : [__ctxPath + '/js/customer/CusPersonalView.js',
			__ctxPath + '/js/customer/CusPersonalForm.js',
			__ctxPath + '/js/xitong/BeanColumnsExtForm.js']
	// end: Generated for CusPersonal From Template: App.import.js.vm
	,
	CusPersonalForm : [__ctxPath + '/js/customer/CusPersonalForm.js',
		__ctxPath + '/js/xitong/BeanColumnsExtForm.js']
	,
	MyCusPersonalView : [__ctxPath + '/js/customer/MyCusPersonalView.js',
			__ctxPath + '/js/customer/CusPersonalForm.js']
	// start: Generated for CusCompany From Template: App.import.js.vm
	,
	CusCompanyView : [__ctxPath + '/js/customer/CusCompanyView.js',
			__ctxPath + '/js/customer/CusLinkmanForm.js',
			__ctxPath + '/js/customer/CusCompanyForm.js']

	// end: Generated for CusCompany From Template: App.import.js.vm
	,
	CusPersonalViewCallin : [
			__ctxPath + '/js/customer/CusPersonalViewCallin.js',
			__ctxPath + '/js/customer/CusPersonalFormCallin.js',
			__ctxPath + '/js/customer/CustomerForm.js'],
	CusPersonalViewMediain : [
			__ctxPath + '/js/customer/CusPersonalViewMediain.js',
			__ctxPath + '/js/customer/CusPersonalFormMediain.js']
	// end: Generated for CusPersonal From Template: App.import.js.vm
	,
	CusPersonalFormCallin : [
			__ctxPath + '/js/customer/CusPersonalFormCallin.js',
//			__ctxPath + '/js/customer/ConViewForm.js',
//			__ctxPath + '/js/customer/CustomerForm.js',
			__ctxPath + '/js/customer/ConServiceRequestForm.js',
//			__ctxPath + '/softphone/spaic/1.0.3/spjs/spext.js',
			__ctxPath + '/js/customer/ConWeichuliFormJiaRuHMD.js',
//			__ctxPath + '/js/core/TreeSelector.js',
			__ctxPath + '/js/selector/ScBizOrderSalesSelector.js',
//			 __ctxPath + '/js/outb/YXtaskproDingDanForm.js',
            __ctxPath + '/js/dingdan/DDhistory.js',
//            __ctxPath + '/js/dingdan/DDgoods.js',
//            __ctxPath + '/js/dingdan/DDcreate.js',
            __ctxPath + '/js/customer/ConHisForm.js',
            __ctxPath + '/js/task/CalendarPlanFormView.js',
            __ctxPath + '/js/selector/CusPersonalSelector.js',
            __ctxPath + '/js/task/addCalendarPlanForm.js',
             __ctxPath + '/js/customer/CustomerDetailForm.js'
            ],
      YXtaskproDingDanForm:[
    	  __ctxPath + '/js/outb/YXtaskproDingDanForm.js',
//            __ctxPath + '/js/dingdan/DDhistory.js',
            __ctxPath + '/js/dingdan/DDgoods.js',
            __ctxPath + '/js/dingdan/DDcreate.js'
    	  ],
	CusPersonalFormMediain : [
			__ctxPath + '/js/customer/CusWeichuliFormLingYong.js',
			__ctxPath + '/js/selector/CustomerSelector.js']

	,
	MyCusCompanyView : [__ctxPath + '/js/customer/MyCusCompanyView.js',
			__ctxPath + '/js/customer/CusLinkmanForm.js',
			__ctxPath + '/js/customer/CusCompanyForm.js']
	// start: Generated for CusEmployee From Template: App.import.js.vm
	,
	CusEmployeeView : [__ctxPath + '/js/customer/CusEmployeeView.js',
			__ctxPath + '/js/customer/CusEmployeeForm.js']

	// end: Generated for CusEmployee From Template: App.import.js.vm
	// start: Generated for CusSupplies From Template: App.import.js.vm
	,
	
	CusSuppliesView : [__ctxPath + '/js/customer/CusSuppliesView.js',
			__ctxPath + '/js/customer/CusSuppliesForm.js']

	// end: Generated for CusSupplies From Template: App.import.js.vm
	// start: Generated for CusSells From Template: App.import.js.vm
	,
	CusSellsView : [__ctxPath + '/js/customer/CusSellsView.js',
			__ctxPath + '/js/customer/CusSellsForm.js']

	// end: Generated for CusSells From Template: App.import.js.vm
	// start: Generated for CusContact From Template: App.import.js.vm
	,
	CusContactView : [__ctxPath + '/js/customer/CusContactView.js',
			__ctxPath + '/js/customer/CusContactForm.js']

	// end: Generated for CusContact From Template: App.import.js.vm
	// start: Generated for CusHis From Template: App.import.js.vm
	,
	CusHisView : [__ctxPath + '/js/customer/CusHisView.js',
			__ctxPath + '/js/customer/CusHisForm.js']

	// end: Generated for CusHis From Template: App.import.js.vm
	,
	FixedAssetsManageView : [__ctxPath + '/js/admin/FixedAssetsManageView.js',
			__ctxPath + '/js/admin/FixedAssetsView.js',
			__ctxPath + '/js/admin/FixedAssetsForm.js',
			__ctxPath + '/js/admin/AssetsTypeForm.js',
			__ctxPath + '/js/admin/DepreWin.js',
			__ctxPath + '/js/admin/WorkGrossWin.js'],
	DepreTypeView : [__ctxPath + '/js/admin/DepreTypeForm.js',
			__ctxPath + '/js/admin/DepreTypeView.js'],
	DepreRecordView : [__ctxPath + '/js/admin/DepreRecordForm.js',
			__ctxPath + '/js/admin/DepreRecordView.js'],
	CusConnectionView : [__ctxPath + '/js/customer/CusConnectionView.js',
			__ctxPath + '/js/customer/CusConnectionForm.js',
			__ctxPath + '/js/selector/CustomerSelector.js'],
	ProjectView : [__ctxPath + '/js/customer/ProjectView.js',
			__ctxPath + '/js/customer/ProjectForm.js',
			__ctxPath + '/js/customer/ContractForm.js',
			__ctxPath + '/js/customer/ContractConfigView.js',
			__ctxPath + '/ext3/ux/RowEditor.js',
			__ctxPath + '/js/selector/CustomerSelector.js',
			__ctxPath + '/js/selector/ProjectSelector.js'],
	ContractView : [__ctxPath + '/js/customer/ContractView.js',
			__ctxPath + '/js/customer/ContractForm.js',
			__ctxPath + '/js/customer/ContractConfigView.js',
			__ctxPath + '/ext3/ux/RowEditor.js',
			__ctxPath + '/js/selector/ProjectSelector.js'],
	ProductView : [__ctxPath + '/js/customer/ProductView.js',
			__ctxPath + '/js/customer/ProductForm.js',
			__ctxPath + '/js/selector/ProviderSelector.js'],
	ProviderView : [__ctxPath + '/js/customer/ProviderView.js',
			__ctxPath + '/js/customer/ProviderForm.js',
			__ctxPath + '/js/customer/SendMailForm.js'],
	// -------------personal moduels------------------------
	HolidayRecordView : [__ctxPath + '/js/personal/HolidayRecordView.js',
			__ctxPath + '/js/personal/HolidayRecordForm.js'],
	DutySectionView : [__ctxPath + '/js/personal/DutySectionView.js',
			__ctxPath + '/js/personal/DutySectionForm.js'],
	DutySystemView : [__ctxPath + '/js/personal/DutySystemView.js',
			__ctxPath + '/js/personal/DutySystemForm.js',
			__ctxPath + '/js/selector/DutySectionSelector.js'],
	SignInOffView : [__ctxPath + '/js/personal/SignInOffView.js'],
	DutyRegisterPersonView : [__ctxPath
			+ '/js/personal/DutyRegisterPersonView.js'],
	DutyRegisterView : [__ctxPath + '/js/personal/DutyRegisterView.js',
			__ctxPath + '/js/personal/DutyRegisterForm.js'],
	ErrandsRegisterView : [__ctxPath + '/js/personal/ErrandsRegisterView.js',
			__ctxPath + '/js/personal/ErrandsRegisterDetail.js',
			__ctxPath + '/js/personal/ErrandsRegisterForm.js',
			__ctxPath + '/js/flow/ProcessNextForm.js'],
	ErrandsRegisterOutView : [
			__ctxPath + '/js/personal/ErrandsRegisterOutView.js',
			__ctxPath + '/js/personal/ErrandsRegisterOutForm.js'],
	SysConfigView : [__ctxPath + '/js/system/SysConfigView.js',
			__ctxPath + '/js/communicate/SmsMobileForm.js'],
	// -------------personal moduels------------------------
	// -------------Home Message Detail moduels-------------
	NoticeDetail : [__ctxPath + '/js/info/NoticeDetail.js'],
	NoticeDetailWin : [__ctxPath + '/js/info/NoticeDetailWin.js'],
	NewsDetail : [__ctxPath + '/js/info/NewsDetail.js'],
	NewsDetailWin : [__ctxPath + '/js/info/NewsDetailWin.js'],
	PublicDocumentDetail : [__ctxPath + '/js/document/PublicDocumentDetail.js'],
	MailDetail : [__ctxPath + '/js/communicate/MailDetail.js',
			__ctxPath + '/js/communicate/MailForm.js'],
	CalendarPlanDetail : [__ctxPath + '/js/task/CalendarPlanDetail.js'],
	AppointmentDetail : [__ctxPath + '/js/task/AppointmentDetail.js'],
	// -------------Home Message Detail moduels-------------
	// -------------Search moduels--------------------------
	SearchNews : [__ctxPath + '/js/search/SearchNews.js',
			__ctxPath + '/js/info/NewsDetail.js'],
	SearchMail : [__ctxPath + '/js/search/SearchMail.js',
			__ctxPath + '/ext3/ux/RowExpander.js',
			__ctxPath + '/js/communicate/MailView.js',
			__ctxPath + '/js/communicate/MailForm.js'],
	SearchNotice : [__ctxPath + '/js/search/SearchNotice.js'],
	SearchDocument : [__ctxPath + '/js/search/SearchDocument.js',
			__ctxPath + '/js/document/PublicDocumentDetail.js'],
	HireIssueView : [__ctxPath + '/js/hrm/HireIssueView.js',
			__ctxPath + '/js/hrm/HireIssueForm.js',
			__ctxPath + '/js/hrm/HireIssueCheckWin.js'],
	ResumeView : [__ctxPath + '/js/hrm/ResumeView.js',
			__ctxPath + '/js/hrm/ResumeForm.js'],
	// -------------Search moduels--------------------------
	NewsCommentView : [__ctxPath + '/js/info/NewsCommentView.js',
			__ctxPath + '/ext3/ux/RowExpander.js'],
	DictionaryView : [__ctxPath + '/js/system/DictionaryView.js',
			__ctxPath + '/js/system/DictionaryForm.js'],
	SalaryItemView : [__ctxPath + '/js/hrm/SalaryItemForm.js',
			__ctxPath + '/js/hrm/SalaryItemView.js'],
	StandSalaryForm : [__ctxPath + '/js/hrm/StandSalaryForm.js',
			__ctxPath + '/js/hrm/StandSalaryItemView.js',
			__ctxPath + '/js/selector/SalaryItemSelector.js'],
	StandSalaryView : [__ctxPath + '/js/hrm/StandSalaryView.js',
			__ctxPath + '/js/hrm/StandSalaryForm.js',
			__ctxPath + '/js/hrm/StandSalaryItemView.js',
			__ctxPath + '/js/hrm/CheckStandSalaryForm.js',
			__ctxPath + '/js/hrm/CheckStandSalaryItemView.js',
			__ctxPath + '/js/selector/SalaryItemSelector.js'],
	JobChangeForm : [__ctxPath + '/js/hrm/JobChangeForm.js',
			__ctxPath + '/js/selector/EmpProfileSelector.js'],
	JobChangeView : [__ctxPath + '/js/hrm/JobChangeView.js',
			__ctxPath + '/js/hrm/JobChangeForm.js',
			__ctxPath + '/js/selector/EmpProfileSelector.js',
			__ctxPath + '/js/hrm/CheckJobChangeWin.js'],
	EmpProfileForm : [__ctxPath + '/js/hrm/EmpProfileForm.js'],
	EmpProfileView : [__ctxPath + '/js/hrm/EmpProfileView.js',
			__ctxPath + '/js/hrm/EmpProfileForm.js',
			__ctxPath + '/js/hrm/CheckEmpProfileForm.js',
			__ctxPath + '/js/hrm/RecoveryProfileWin.js'],
	SalaryPayoffForm : [__ctxPath + '/js/hrm/SalaryPayoffForm.js',
			__ctxPath + '/js/selector/EmpProfileSelector.js'],
	SalaryPayoffView : [__ctxPath + '/js/hrm/SalaryPayoffForm.js',
			__ctxPath + '/js/selector/EmpProfileSelector.js',
			__ctxPath + '/js/hrm/CheckSalaryPayoffForm.js',
			__ctxPath + '/js/hrm/SalaryPayoffView.js'],
	PersonalSalaryView : [__ctxPath + '/js/personal/PersonalSalaryView.js',
			__ctxPath + '/ext3/ux/RowExpander.js'],
	SystemLogView : [__ctxPath + '/js/system/SystemLogView.js'],
	MyProcessRunView : [__ctxPath + '/js/flow/MyProcessRunView.js',
			__ctxPath + '/js/flow/ProcessRunDetail.js'],
	MyRunningTaskView : [__ctxPath + '/js/flow/MyRunningTaskView.js',
			__ctxPath + '/js/flow/ProcessRunDetail.js'],
	PersonalTipsView : [__ctxPath + '/js/info/PersonalTipsView.js'],

	OutMailUserSetingForm : [__ctxPath
			+ '/js/communicate/OutMailUserSetingForm.js'],
	OutMailBoxView : [__ctxPath + '/js/communicate/OutMailBoxView.js',
			__ctxPath + '/js/communicate/OutMailView.js',
			__ctxPath + '/js/communicate/OutMailForm.js',
			__ctxPath + '/js/communicate/OutMailFolderForm.js',
			__ctxPath + '/js/selector/EMailSelector.js',
			__ctxPath + '/ext3/ux/RowExpander.js'],
	OutMailForm : [__ctxPath + '/js/communicate/OutMailForm.js',
			__ctxPath + '/js/selector/EMailSelector.js'],
	SmsMobileView : [__ctxPath + '/js/communicate/SmsMobileView.js',
			__ctxPath + '/js/communicate/SmsMobileForm.js'],
	GlobalTypeManager : [__ctxPath + '/js/system/GlobalTypeManager.js',
			__ctxPath + '/js/system/GlobalTypeForm.js',
			__ctxPath + '/js/system/TypeKeyForm.js'],
	PrivateDocumentView : [__ctxPath + '/js/document/PrivateDocumentView.js',
			__ctxPath + '/js/document/DocumentForm.js',
			__ctxPath + '/js/document/DocFolderForm.js',
			__ctxPath + '/js/document/DocumentSharedForm.js',
			__ctxPath + '/js/document/FileDetailShowWin.js',
			__ctxPath + '/js/selector/RoleSelector.js'],
	KnowledgeManageView : [__ctxPath + '/js/document/KnowledgeManageView.js',
			__ctxPath + '/js/document/KnowledgeForm.js',
			__ctxPath + '/js/document/DocFolderForm.js',
			__ctxPath + '/js/document/DocFolderSelector.js',
			__ctxPath + '/js/document/FileDetailShowWin.js',
			__ctxPath + '/js/document/DocumentDetailWin.js',
			__ctxPath + '/js/document/KnowledgePrivilegeWin.js',
			__ctxPath + '/js/document/DocFolderSharedForm.js',
			__ctxPath + '/ext3/ux/CheckColumn.js',
			__ctxPath + '/js/selector/RoleSelector.js'],
	SuggestBoxView : [__ctxPath + '/js/info/SuggestBoxView.js',
			__ctxPath + '/js/info/SuggestBoxForm.js',
			__ctxPath + '/js/info/SuggestBoxReplyForm.js',
			__ctxPath + '/js/info/SuggestBoxDisplay.js'],
	GoodsCheckView : [__ctxPath + '/js/admin/GoodsCheckView.js',
			__ctxPath + '/js/admin/GoodsCheckForm.js'],
	CarCheckView : [__ctxPath + '/js/admin/CarCheckView.js',
			__ctxPath + '/js/admin/CarCheckForm.js'],
	PublicPhoneBookView : [
			__ctxPath + '/js/communicate/PublicPhoneBookView.js',
			__ctxPath + '/js/communicate/PublicPhoneGroupForm.js',
			__ctxPath + '/js/communicate/PhoneBookForm.js'],
	RegulationView : [__ctxPath + '/js/admin/RegulationForm.js',
			__ctxPath + '/js/admin/RegulationView.js',
			__ctxPath + '/js/admin/RegulationScanWin.js',
			__ctxPath + '/js/selector/GlobalTypeSelector.js'],
	RegulationScanView : [__ctxPath + '/js/admin/RegulationScanView.js',
			__ctxPath + '/js/admin/RegulationScanWin.js'],
	LeaveManageView : [__ctxPath + '/js/personal/LeaveManageView.js',
			__ctxPath + '/js/personal/LeaveManageWin.js'],
	OnlineDocumentManageView : [
			__ctxPath + '/js/document/OnlineDocumentManageView.js',
			__ctxPath + '/js/document/OnlineDocumentForm.js',
			__ctxPath + '/js/core/ntkoffice/NtkOfficePanel.js',
			__ctxPath + '/js/selector/SealSelector.js',
			__ctxPath + '/js/selector/PaintTemplateSelector.js',
			__ctxPath + '/js/document/DocFolderForm.js',
			__ctxPath + '/ext3/ux/CheckColumn.js',
			__ctxPath + '/js/document/DocFolderSharedForm.js',
			__ctxPath + '/js/document/DocFolderSelector.js',
			__ctxPath + '/js/document/FileDetailShowWin.js',
			__ctxPath + '/js/document/KnowledgePrivilegeWin.js',
			__ctxPath + '/js/document/OnlineDocumentDetail.js',
			__ctxPath + '/js/selector/RoleSelector.js'],
	PaintTemplateView : [__ctxPath + '/js/document/PaintTemplateView.js',
			__ctxPath + '/js/document/PaintTemplateForm.js',
			__ctxPath + '/js/core/ntkoffice/NtkOfficePanel.js',
			__ctxPath + '/js/document/DocumentTemplateForm.js',
			__ctxPath + '/js/selector/SealSelector.js',
			__ctxPath + '/js/selector/PaintTemplateSelector.js'],
	SealView : [__ctxPath + '/js/document/SealView.js',
			__ctxPath + '/js/document/SealForm.js',
			__ctxPath + '/js/core/ntkosign/NtkoSignPanel.js',
			__ctxPath + '/js/document/MakeSealForm.js',
			__ctxPath + '/js/document/SealShowPanel.js'],
	SectionList : [__ctxPath + '/js/info/SectionList.js',
			__ctxPath + '/js/info/SectionForm.js',
			__ctxPath + '/js/selector/SectionSelector.js'],
	SectionView : [__ctxPath + '/ext3/ux/Portal.js',
			__ctxPath + '/ext3/ux/PortalColumn.js',
			__ctxPath + '/ext3/ux/Portlet.js',
			__ctxPath + '/js/info/SectionView.js',
			__ctxPath + '/js/info/SectionForm.js',
			__ctxPath + '/js/selector/SectionSelector.js'

	],
	FormDefView : [__ctxPath + '/js/flow/FormDefView.js',
			__ctxPath + '/js/flow/FormDefForm.js',
			__ctxPath + '/js/fckdesign/Fckdesigner.js',
			__ctxPath + '/js/fckdesign/FormDesignPanelForm.js',
			__ctxPath + '/js/flow/FormDefDetailWin.js'],
	FlowFormProsView : [
			__ctxPath + '/js/flow/FlowFormProsView.js',
			// __ctxPath + '/js/flow/FlowFormQueryView.js',
			__ctxPath + '/js/flow/FlowFormQueryForms.js',
			__ctxPath + '/js/flow/FlowFormQueryEntity.js',
			__ctxPath + '/js/flow/FlowFormEntityView.js'],
	OutMailSetView : [__ctxPath + '/js/system/OutMailSetForm.js',
			__ctxPath + '/js/system/OutMailSetView.js'],
	ProInstanceMgr : [__ctxPath + '/js/flow/ProInstanceMgr.js',
			__ctxPath + '/js/flow/ProInstanceView.js',
			__ctxPath + '/js/flow/ProInstanceDetail.js',
			__ctxPath + '/js/flow/PathChangeWindow.js',
			__ctxPath + '/js/flow/ProcessRunDetail.js',
			__ctxPath + '/js/flow/ProcessNextForm.js',
			__ctxPath + '/js/flow/TaskHandlerWindow.js',
			__ctxPath + '/js/flow/TaskDueDateWindow.js'],
	JforumView : [__ctxPath + '/js/info/JforumView.js'],
	MyFileAttachView : [__ctxPath + '/js/system/MyFileAttachView.js'],
	ReportTemplateMenu : [__ctxPath + '/js/system/ReportTemplateMenu.js',
			__ctxPath + '/js/system/ReportTemplatePreview.js'],
	DutyView : [__ctxPath + '/js/personal/DutyView.js',
			__ctxPath + '/js/personal/DutyForm.js'],
	ComIndexPage : [__ctxPath + '/ext3/ux/Portal.js',
			__ctxPath + '/ext3/ux/PortalColumn.js',
			__ctxPath + '/ext3/ux/Portlet.js',
			__ctxPath + '/js/info/ComIndexPage.js'],
	AppHome : [__ctxPath + '/ext3/ux/Portal.js',
			__ctxPath + '/ext3/ux/PortalColumn.js',
			__ctxPath + '/ext3/ux/Portlet.js', 
			__ctxPath + '/js/App.home.js'
			],
	DicManager : [
	        __ctxPath + '/ext3/ux/treefilter/JsonTreeLoader.js',
			__ctxPath + '/ext3/ux/treefilter/PinyinFilter.js',
			__ctxPath + '/ext3/ux/treefilter/TreeCombo.js',
			__ctxPath + '/ext3/ux/TreeCombox.js',
			__ctxPath + '/ext3/ux/treefilter/TreeFilter.js',
			__ctxPath + '/js/system/GlobalTypeForm.js',
			__ctxPath + '/js/system/DicManager.js',
			__ctxPath + '/js/system/DicTypeChangeWin.js',
			__ctxPath + '/js/system/DictionaryEditForm.js',
			__ctxPath + '/js/system/DictionaryForm.js'],
	DicManagerBusi : [  __ctxPath + '/ext3/ux/treefilter/JsonTreeLoader.js',
			__ctxPath + '/ext3/ux/treefilter/PinyinFilter.js',
			__ctxPath + '/ext3/ux/treefilter/TreeCombo.js',
			__ctxPath + '/ext3/ux/treefilter/TreeFilter.js',
			__ctxPath + '/js/system/GlobalTypeForm.js',
			__ctxPath + '/js/system/DicManagerBusi.js',
			__ctxPath + '/js/system/DicTypeChangeWin.js',
			__ctxPath + '/js/system/DictionaryEditForm.js',
			__ctxPath + '/js/system/DictionaryForm.js'],
	BoardRooView : [__ctxPath + '/js/admin/BoardRooView.js',
			__ctxPath + '/js/admin/BoardRooForm.js'],
	BoardTypeView : [__ctxPath + '/js/admin/BoardTypeView.js',
			__ctxPath + '/js/admin/BoardTypeForm.js'],
	AddConfSummaryView : [__ctxPath + '/js/admin/AddConfSummaryView.js',
			__ctxPath + '/js/selector/ConferenceSelector.js'],
	AddConferenceView : [__ctxPath + '/js/admin/AddConferenceView.js'],
	ConfSummaryView : [__ctxPath + '/js/admin/ConfSummaryView.js',
			__ctxPath + '/js/admin/ConfSummaryForm.js',
			__ctxPath + '/js/admin/ConfSummaryDetailForm.js'],
	MyJoinConferenceView : [__ctxPath + '/js/admin/MyJoinConferenceView.js',
			__ctxPath + '/js/admin/ConferenceForm.js',
			__ctxPath + '/js/admin/ConferenceDetailForm.js'],
	MyJoinedConferenceView : [
			__ctxPath + '/js/admin/MyJoinedConferenceView.js',
			__ctxPath + '/js/admin/ConferenceForm.js',
			__ctxPath + '/js/admin/ConferenceDetailForm.js'],
	ZanCunConferenceView : [__ctxPath + '/js/admin/ZanCunConferenceView.js',
			__ctxPath + '/js/admin/ConferenceDetailForm.js',
			__ctxPath + '/js/admin/ConferenceForm.js'],
	YiKaiConferenceView : [__ctxPath + '/js/admin/YiKaiConferenceView.js',
			__ctxPath + '/js/admin/ConferenceDetailForm.js',
			__ctxPath + '/js/admin/ConferenceForm.js'],
	DaiKaiConferenceView : [__ctxPath + '/js/admin/DaiKaiConferenceView.js',
			__ctxPath + '/js/admin/ConferenceDetailForm.js',
			__ctxPath + '/js/admin/ConferenceForm.js'],
	DaiConfApplyView : [__ctxPath + '/js/admin/DaiConfApplyView.js',
			__ctxPath + '/js/admin/ConfApplyForm.js'],
	ConfApplyView : [__ctxPath + '/js/admin/ConfApplyView.js'],

	// 档案管理
	ArchFondView : [__ctxPath + '/js/arch/ArchFondView.js',
			__ctxPath + '/js/arch/ArchFondForm.js',
			__ctxPath + '/js/system/GlobalTypeForm.js'],

	ArchRollView : [__ctxPath + '/js/arch/ArchRollView.js',
			__ctxPath + '/js/arch/ArchRollForm.js',
			__ctxPath + '/js/system/GlobalTypeForm.js'],
	RollFileView : [__ctxPath + '/js/arch/RollFileView.js',
			__ctxPath + '/js/arch/RollFileForm.js',
			__ctxPath + '/js/system/GlobalTypeForm.js',
			__ctxPath + '/js/arch/RollFileListView.js',
			// __ctxPath + '/js/arch/RollFileListForm.js',//屏蔽查看附件明细
			__ctxPath + '/js/arch/ViewFileWindow.js'],
	TidyFileView : [
			__ctxPath + '/js/arch/TidyFileView.js',
			// __ctxPath + '/js/arch/RollFileForm.js',//屏蔽增加
			__ctxPath + '/js/arch/TidyFileForm.js',
			// __ctxPath + '/js/system/GlobalTypeForm.js',//屏蔽增加分类
			__ctxPath + '/js/arch/ViewFileWindow.js',
			__ctxPath + '/js/arch/MyBorrowFileViewWindow.js',
			__ctxPath + '/js/arch/MyBorrowFileSlaveListGrid.js',
			__ctxPath + '/ext3/ux/PagingMemoryProxy.js',
			__ctxPath + '/ext3/ux/PagingStore.js',
			__ctxPath + '/js/core/ux/TreeCombo.js'],
	NewBorrowRecordFormPan : [__ctxPath + '/js/arch/NewBorrowRecordFormPan.js',
			__ctxPath + '/ext3/ux/PagingStore.js',
			__ctxPath + '/js/arch/BorrowFileListView.js',
			__ctxPath + '/js/arch/SelectFondWindow.js',
			__ctxPath + '/js/arch/SelectRollWindow.js',
			__ctxPath + '/js/arch/SelectFileWindow.js'

	],
	CheckBorrowRecordView : [
			__ctxPath + '/js/arch/CheckBorrowRecordView.js',
			__ctxPath + '/js/arch/CheckBorrowRecordForm.js',
			// __ctxPath + '/js/arch/CheckBorrowFileListView.js',
			__ctxPath + '/js/arch/MyBorrowFilePanel.js',
			__ctxPath + '/js/arch/MyBorrowFileTypePanel.js',
			__ctxPath + '/js/arch/MyBorrowFileListPanel.js',
			__ctxPath + '/js/arch/ViewFileWindow.js',

			__ctxPath + '/js/arch/MyBorrowFileViewWindow.js',
			__ctxPath + '/js/arch/MyBorrowFileSlaveListGrid.js'

	],
	MyBorrowRecordView : [
			__ctxPath + '/js/arch/MyBorrowRecordView.js',
			__ctxPath + '/js/arch/MyBorrowFilePanel.js',
			__ctxPath + '/js/arch/MyBorrowFileTypePanel.js',
			__ctxPath + '/js/arch/MyBorrowFileListPanel.js',
			__ctxPath + '/js/arch/ViewFileWindow.js',

			__ctxPath + '/js/arch/MyBorrowFileViewWindow.js',
			__ctxPath + '/js/arch/MyBorrowFileSlaveListGrid.js',
			/** ********************************************** */
			__ctxPath + '/js/arch/BorrowRecordForm.js',
			__ctxPath + '/js/arch/BorrowFileListView.js',
			__ctxPath + '/js/arch/SelectFondWindow.js',
			__ctxPath + '/js/arch/SelectRollWindow.js',
			__ctxPath + '/js/arch/SelectFileWindow.js'],
	StatisticsArchYearReportPanel : [__ctxPath
			+ '/js/arch/StatisticsArchYearReportPanel.js'],
	StatisticsArchRollReportPanel : [__ctxPath
			+ '/js/arch/StatisticsArchRollReportPanel.js'],
	StatisticsArchFileReportPanel : [__ctxPath
			+ '/js/arch/StatisticsArchFileReportPanel.js'],
	archSetingManager : [__ctxPath + '/js/arch/archSetingManager.js',
			// __ctxPath + '/js/system/GlobalTypeForm.js',
			// __ctxPath + '/js/system/DicTypeChangeWin.js',
			__ctxPath + '/js/system/DictionaryForm.js'],
	ArchiveTypeTempView : [__ctxPath + '/js/archive/ArchiveTypeTempView.js',
			__ctxPath + '/js/system/GlobalTypeForm.js',
			__ctxPath + '/js/archive/ArchTemplateView.js',
			__ctxPath + '/js/archive/ArchTemplateForm.js',
			__ctxPath + '/js/archive/OfficeTemplateView.js',
			__ctxPath + '/js/selector/GlobalTypeSelector.js',
			__ctxPath + '/js/core/ntkoffice/NtkOfficePanel.js'],
	ArchFlowConfView : [__ctxPath + '/js/archive/ArchFlowConfView.js',
			__ctxPath + '/js/selector/FlowSelector.js'],
	ArchivesSignView : [__ctxPath + '/js/archive/ArchivesSignView.js',
			__ctxPath + '/js/archive/ArchivesDetailWin.js'],
	ArchivesMonitor : [__ctxPath + '/js/archive/ArchivesMonitor.js',
			__ctxPath + '/js/archive/ArchivesDetailWin.js',
			__ctxPath + '/js/archive/ArchHastenForm.js',
			__ctxPath + '/js/flow/ProcessNextForm.js',
			__ctxPath + '/js/flow/ProcessRunDetail.js']

	// start: Generated for ProcessModule From Template: App.import.js.vm
	,
	ProcessModuleView : [__ctxPath + '/js/flow/ProcessModuleView.js',
			__ctxPath + '/js/flow/ProcessModuleForm.js',
			__ctxPath + '/js/selector/FlowSelector.js']

	// end: Generated for ProcessModule From Template: App.import.js.vm

	// start: Generated for UlBbsHuati From Template: App.import.js.vm
	,
	UlBbsHuatiView : [__ctxPath + '/js/xitong/UlBbsHuatiView.js',
			__ctxPath + '/js/xitong/UlBbsHuatiForm.js',
			__ctxPath + '/js/selector/UserSelector.js',
			__ctxPath + '/js/selector/knowledgeSelector.js',
			__ctxPath + '/js/selector/UkSysKnowSelector.js']
	,UkKnowZhiShiQiuSuoView: [__ctxPath + '/js/know/UkKnowZhiShiQiuSuoView.js',
							  __ctxPath + '/js/know/UkKnowHuiFuQiuSuoView.js',
                              __ctxPath + '/js/know/UkSysKnowShow_win.js',
                              __ctxPath + '/js/selector/knowledgeSelector.js']
	// end: Generated for UlBbsHuati From Template: App.import.js.vm
	// start: Generated for UlBbsJieshou From Template: App.import.js.vm
	,
	UlBbsJieshouView : [__ctxPath + '/js/xitong/UlBbsJieshouView.js',
			__ctxPath + '/js/xitong/UlBbsJieshouForm.js']

	// end: Generated for UlBbsJieshou From Template: App.import.js.vm
	// start: Generated for UlBbsHuifu From Template: App.import.js.vm
	,
	UlBbsHuifuView : [__ctxPath + '/ext3/ux/Portal.js',
			__ctxPath + '/ext3/ux/PortalColumn.js',
			__ctxPath + '/ext3/ux/Portlet.js',
			// __ctxPath + '/js/info/SectionView.js',
			__ctxPath + '/js/xitong/UlBbsHuifuView.js',
			__ctxPath + '/js/xitong/UlBbsHuifuForm.js'],

	HuiFuDetail : [__ctxPath + '/js/xitong/HuiFuDetail.js']
	// end: Generated for UlBbsHuifu From Template: App.import.js.vm
	// start: Generated for UlUgroupRole From Template: App.import.js.vm
	,
	UlUgroupRoleView : [__ctxPath + '/js/xitong/UlUgroupRoleView.js',
			__ctxPath + '/js/xitong/UlUgroupRoleForm.js']

	// end: Generated for UlUgroupRole From Template: App.import.js.vm
	// start: Generated for UlUgroupUser From Template: App.import.js.vm
	,
	UlUgroupUserView : [__ctxPath + '/js/xitong/UlUgroupUserView.js',
			__ctxPath + '/js/xitong/UlUgroupUserForm.js']

	// end: Generated for UlUgroupUser From Template: App.import.js.vm
	// start: Generated for UlUsergroup From Template: App.import.js.vm
	,
	UlUsergroupView : [__ctxPath + '/js/xitong/UlUsergroupView.js',
			__ctxPath + '/js/selector/ugUserSelector.js',
			__ctxPath + '/js/xitong/UlUsergroupForm.js']

	// end: Generated for UlUsergroup From Template: App.import.js.vm
	// start: Generated for UlDepartment From Template: App.import.js.vm
	,
	UlDepartmentView : [__ctxPath + '/js/xitong/UlDepartmentView.js',
			__ctxPath + '/js/xitong/UlDepartmentForm.js',
			__ctxPath + '/js/xitong/UlContactDepForm.js']

	// end: Generated for UlDepartment From Template: App.import.js.vm
	// start: Generated for UlDepEmployee From Template: App.import.js.vm
	,
	UlDepEmployeeView : [__ctxPath + '/js/xitong/UlDepEmployeeView.js',
			__ctxPath + '/js/xitong/UlDepEmployeeForm.js']

	// end: Generated for UlDepEmployee From Template: App.import.js.vm
	// start: Generated for UlEmployee From Template: App.import.js.vm
	,
	UlEmployeeView : [__ctxPath + '/js/xitong/UlEmployeeView.js',
			__ctxPath + '/js/xitong/UlEmployeeForm.js',
			__ctxPath + '/js/selector/UlEmployeeSelector.js',
			__ctxPath + '/js/selector/BankTypeSelector.js',
			__ctxPath + '/js/system/AppUserForm.js',
			__ctxPath + '/js/selector/UlPersonChargeSelector.js',
			__ctxPath + '/js/selector/ULempEquipSelector.js',
			__ctxPath + '/js/xitong/UlContactEmplForm.js']

	// end: Generated for UlEmployee From Template: App.import.js.vm
	// start: Generated for UlNewsReceive From Template: App.import.js.vm
	,
	UlNewsReceiveView : [__ctxPath + '/js/info/UlNewsReceiveView.js',
			__ctxPath + '/js/info/UlNewsReceiveForm.js']

	// end: Generated for UlNewsReceive From Template: App.import.js.vm
	,
	MTFormDefView : [__ctxPath + '/js/formdesign/MTFormDefView.js',
			__ctxPath + '/js/formdesign/MTFormDefForm.js',
			__ctxPath + '/js/fckdesign/Fckdesigner.js',
			__ctxPath + '/js/formdesign/MTFormDesignPanelForm.js',
			__ctxPath + '/js/flow/FormDefDetailWin.js']
	// start: Generated for UlContactEmpl From Template: App.import.js.vm
	,
	UlContactEmplView : [__ctxPath + '/js/know/UlContactEmplView.js',
			__ctxPath + '/js/know/UlContactEmplForm.js']

	// end: Generated for UlContactEmpl From Template: App.import.js.vm
	,
	RegionView : [__ctxPath + '/js/system/RegionView.js',
			__ctxPath + '/js/system/RegionForm.js']

	// start: Generated for UkKnowApply From Template: App.import.js.vm
	,
	UkKnowApplyView : [__ctxPath + '/js/know/UkKnowApplyFlowForm.js',
			__ctxPath + '/js/know/UkKnowApplyView.js',
			__ctxPath + '/js/know/UkKnowApplyForm.js',
			__ctxPath + '/js/know/UkKnowApplyNewForm.js',
			__ctxPath + '/js/know/UkKnowApplyFlowView.js',
			__ctxPath + '/js/know/KnowTmpForm.js',
			__ctxPath + '/js/flow/TaskChargeWindow.js',
			__ctxPath + '/js/know/UkKnowApplyCollectFlowForm.js',
			__ctxPath + '/js/know/UkKnowCollectImport.js',
			__ctxPath + '/js/know/UkKnowCollectView.js',
			__ctxPath + '/js/know/UkKnowCollectForm.js',
			__ctxPath + '/js/selector/UkKnowKeywordSelector.js',
			__ctxPath + '/js/selector/UkSysKnowSelector.js',
			__ctxPath + '/ext3/ux/TreeCombox.js',
			__ctxPath + '/js/selector/knowledgeSelector.js',
			__ctxPath + '/js/selector/UlPersonChargeSelector.js',
			__ctxPath + '/js/selector/UkKnowDimensionalitySelector.js',
			__ctxPath + '/ext3/ux/TreeCombox.js']

	// end: Generated for UkKnowApply From Template: App.import.js.vm
	// start: Generated for UkKnowApprove From Template: App.import.js.vm
	,
	UkKnowApproveView : [__ctxPath + '/js/know/UkKnowApproveFlowForm.js',
			__ctxPath + '/js/know/UkKnowApproveFlowView.js',
			__ctxPath + '/js/know/UkKnowApplyItemView.js',
			__ctxPath + '/js/know/UkKnowApplyNoItemView.js',
			__ctxPath + '/js/know/UkKnowApproveView.js',
			__ctxPath + '/js/know/UkKnowApproveForm.js'],
	UkKnowApproveFlowView : [__ctxPath + '/js/know/UkKnowApproveFlowForm.js',
			__ctxPath + '/js/know/UkKnowApproveFlowView.js',
			__ctxPath + '/js/know/UkKnowApplyItemView.js',
			__ctxPath + '/js/know/UkKnowApplyNoItemView.js',
			__ctxPath + '/js/know/UkKnowApproveView.js',
			__ctxPath + '/js/know/UkKnowApproveForm.js']
	// end: Generated for UkKnowApprove From Template: App.import.js.vm
	// start: Generated for UkKnowDianping From Template: App.import.js.vm
	,
	UkKnowDianpingView : [__ctxPath + '/js/know/UkKnowDianpingView.js',
			__ctxPath + '/js/know/UkKnowDianpingForm.js',
			__ctxPath + '/js/know/UkKnowDianpingDetail.js']

	// end: Generated for UkKnowDianping From Template: App.import.js.vm
	// start: Generated for UkKnowDingyue From Template: App.import.js.vm
	,
	UkKnowDingyueView : [__ctxPath + '/js/know/UkKnowDingyueView.js',
			__ctxPath + '/js/know/UkKnowDingyueForm.js',
			__ctxPath + '/js/selector/UkKnowTypeSelector.js',
			__ctxPath + '/js/selector/KnowKeywordPanleSelector.js',
			__ctxPath + '/js/know/UkPerKnowGridPanel.js']

	// ,UkKnowDingyueManageView : [
	// __ctxPath+'/js/know/UkKnowDingyueManageView.js',
	// __ctxPath+'/js/know/UkKnowDingyueManageForm.js',
	// __ctxPath+'/js/know/UkKnowDingyueTree.js',
	// __ctxPath + '/ext3/ux/CheckTreePanel.js',
	// __ctxPath+'/js/know/TreeCheckNodeUI.js'
	// ]

	// end: Generated for UkKnowDingyue From Template: App.import.js.vm
	// start: Generated for UkKnowFankui From Template: App.import.js.vm
	,
	UkKnowFankuiView : [__ctxPath + '/js/know/UkKnowFankuiView.js',
			__ctxPath + '/js/know/UkKnowFankuiForm.js',
			__ctxPath + '/js/know/UkKnowFankuiDetail.js']

	// end: Generated for UkKnowFankui From Template: App.import.js.vm
	// start: Generated for UkKnowKeyword From Template: App.import.js.vm
	,
	UkKnowKeywordView : [__ctxPath + '/js/know/UkKnowKeywordView.js',
			__ctxPath + '/js/know/UkKnowKeywordForm.js',
			__ctxPath + '/js/know/UkKnowKeywordTypeForm.js',
			__ctxPath + '/js/selector/UserGroupAllTreeSelector.js'],
	UkKnowRecommendView : [__ctxPath + '/js/know/UkKnowRecommendView.js',
			__ctxPath + '/js/know/UkKnowRecommendMyView.js',
			__ctxPath + '/js/know/UkKnowRecommendDaily.js'],
	UkKnowRecommendMyView : [__ctxPath + '/js/know/UkKnowRecommendView.js',
			__ctxPath + '/js/know/UkKnowRecommendMyView.js']

	// end: Generated for UkKnowKeyword From Template: App.import.js.vm
	// start: Generated for UkKnowTemplate From Template: App.import.js.vm
	,
	UkKnowTemplateView : [__ctxPath + '/js/know/UkKnowTemplateView.js',
			__ctxPath + '/js/know/UkKnowTemplateForm.js',
			__ctxPath + '/js/know/UkKnowTemplateShowForm.js',
			__ctxPath + '/js/know/TemplateFormDesignWindow.js']

	// end: Generated for UkKnowTemplate From Template: App.import.js.vm
	// start: Generated for UkKnowType From Template: App.import.js.vm
	,
	UkKnowTypeView : [__ctxPath + '/js/know/UkKnowTypeView.js',
			__ctxPath + '/js/know/UkKnowTypeForm.js',
			__ctxPath + '/ext3/ux/fileuploadfield/FileUploadField.js']

	// end: Generated for UkKnowType From Template: App.import.js.vm
	// start: Generated for UkPerKnow From Template: App.import.js.vm
	,
	UkPerKnowView : [__ctxPath + '/js/know/UkPerKnowView.js',
			__ctxPath + '/js/know/UkPerKnowForm.js']

	// end: Generated for UkPerKnow From Template: App.import.js.vm
	// start: Generated for UkSysKnow From Template: App.import.js.vm
	,
	UkSysKnowView : [__ctxPath + '/js/know/UkSysKnowView.js',
			__ctxPath + '/js/know/UkSysKnowForm.js',
			__ctxPath + '/js/selector/UkKnowKeywordSelector.js'
	// TODO
	]

	// end: Generated for UkSysKnow From Template: App.import.js.vm
	// start: Generated for UkRelativeKnow From Template: App.import.js.vm
	,
	UkRelativeKnowView : [__ctxPath + '/js/know/UkRelativeKnowView.js',
			__ctxPath + '/js/know/UkRelativeKnowForm.js']

	// end: Generated for UkRelativeKnow From Template: App.import.js.vm

	,
	UkNewSysKnowView : [__ctxPath + '/js/know/UkNewSysKnowView.js'],
	UkPastSysKnowView : [__ctxPath + '/js/know/UkPastSysKnowView.js',
			__ctxPath + '/js/know/UkSetValidityTimeForm.js',
			__ctxPath + '/js/know/RubbishForm.js'],
	UkRubbishSysKnowView : [__ctxPath + '/js/know/UkRubbishSysKnowView.js'],
	UkTopSysKnowView : [__ctxPath + '/js/know/UkTopSysKnowView.js',
            __ctxPath + '/js/selector/UkSysKnowSelector.js'],
	UkDianPingSysKnowView : [__ctxPath + '/js/know/UkDianPingSysKnowView.js',
			__ctxPath + '/js/selector/UkSysKnowSelector.js',
            __ctxPath + '/js/know/UkSysKnowForm.js'],
	UkKnowwodeshoucangView : [__ctxPath + '/js/know/UkKnowwodeshoucangView.js',
			__ctxPath + '/js/know/UkSysKnowForm.js',
			__ctxPath + '/js/know/UkKnowCollectTypeForm.js',
            __ctxPath + '/js/selector/UkSysKnowSelector.js',
			__ctxPath + '/js/know/UkPerKnowGridPanel.js']

	,
	UkKnowCollectView : [__ctxPath + '/js/know/UkKnowApplyFlowView.js',
			__ctxPath + '/js/know/KnowTmpForm.js',
			__ctxPath + '/js/know/UkKnowApplyCollectFlowForm.js',
			__ctxPath + '/js/know/UkKnowApplyFlowForm.js',
			__ctxPath + '/js/know/UkKnowCollectImport.js',
			__ctxPath + '/js/know/UkKnowCollectView.js',
			__ctxPath + '/js/know/UkKnowCollectForm.js',
			__ctxPath + '/js/know/UkKnowApproveForm.js',
			__ctxPath + '/js/selector/UkKnowKeywordSelector.js',
			__ctxPath + '/js/selector/UkSysKnowSelector.js',
			__ctxPath + '/js/know/RubbishForm.js',
			__ctxPath + '/js/selector/UkKnowDimensionalitySelector.js',
			__ctxPath + '/ext3/ux/TreeCombox.js'],
	UkKnowCollectForm : [__ctxPath + '/js/know/UkKnowApplyFlowView.js',
			__ctxPath + '/js/know/KnowTmpForm.js',
			__ctxPath + '/js/know/UkKnowApplyCollectFlowForm.js',
			__ctxPath + '/js/know/UkKnowApplyFlowForm.js',
			__ctxPath + '/js/know/UkKnowCollectImport.js',
			__ctxPath + '/js/know/UkKnowCollectView.js',
			__ctxPath + '/js/know/UkKnowCollectForm.js',
			__ctxPath + '/js/selector/UkKnowKeywordSelector.js'],
	UkSysKnowMap : [__ctxPath + '/js/know/UkSysKnowMap.js',
			__ctxPath + '/js/know/UkSysKnowForm.js',
			__ctxPath + '/ext3/ux/CheckTreePanel.js',
			__ctxPath + '/js/know/TreeCheckNodeUI.js']
		,
	UkKnowSiYouView :[__ctxPath + '/js/know/UkKnowSiYouView.js',
		__ctxPath + '/js/know/UkKnowCollectForm.js'],
	UkKnowMineView :[__ctxPath + '/js/know/UkKnowMineView.js']
	// start: Generated for ConHis From Template: App.import.js.vm
	,UkKnowQiuSuoView:[__ctxPath + '/js/know/UkKnowQiuSuoView.js',
		__ctxPath + '/js/know/UkKnowMineHuiFuView.js',
		__ctxPath + '/js/know/UkKnowHuiFuQiuSuoView.js',
        __ctxPath + '/js/selector/knowledgeSelector.js'],
	ConHisView : [__ctxPath + '/js/customer/ConHisView.js'
			,
			__ctxPath + '/js/customer/ConHisForm.js',
			__ctxPath + '/js/customer/ConHisMaxWindow.js',
			__ctxPath + '/js/customer/ConWeichuliFormJiaRuHMD.js',
//			__ctxPath + '/ext3/ux/Ext.form.DisplayField.js',  ------此js文件影响了视频显示问题，去掉暂时没发现任何异常，如有异常待调整；
			__ctxPath + '/js/sound/niftyplayer.js'
			]
	,MachineSelfView : [__ctxPath + '/js/customer/MachineSelfView.js',
								__ctxPath + '/js/customer/MachineSelfForm.js']

	//---------------------------------------坐席报表js文件---------------------------------------------
	,AgentReport : [__ctxPath + '/js/system/AgentReport.js'] 
	,EveryDayReport : [__ctxPath + '/js/system/EveryDayReport.js'] 
	  //----------------------补录报表 wkj                
    ,EveryExamineReport : [
                           __ctxPath+'/js/system/EveryExamineReport.js'
	                        ] 	
	                        
	  //----------------------质检考核 wkj                  
	,EverySysWorkattendanceReport : [
	                        __ctxPath+'/js/system/EverySysWorkattendanceReport.js'
	                       ] 	                      
	                        
	                        
	                          
	,
	ConHushouView : [__ctxPath + '/js/customer/ConHushouView.js',
			__ctxPath + '/js/customer/ConHushouForm.js',
			__ctxPath + '/js/system/AppUserForm.js',
			__ctxPath + '/js/selector/UserSelector.js']
	// end: Generated for ConHushou From Template: App.import.js.vm
	,
	ConHuSunHuiFangView : [__ctxPath + '/js/customer/ConHuSunHuiFangView.js',
			__ctxPath + '/js/customer/ConhusunhuifangForm.js',
			__ctxPath + '/js/customer/ConHuSunHuiFangDelForm.js'],
	ConLaJiXiangView : [__ctxPath + '/js/customer/ConLaJiXiangView.js']

	// start: Generated for ConWeichuli From Template: App.import.js.vm
	,
	ConWeichuliView : [__ctxPath + '/js/customer/ConWeichuliView.js',
			__ctxPath + '/js/customer/ConWeichuliForm.js',
			__ctxPath + '/js/customer/ConWeichuliFormLingYong.js',
			__ctxPath + '/js/customer/ConWeichuliFormJiaRuHMD.js',
			__ctxPath + '/js/customer/ConMoveToRubbishForm.js',
			__ctxPath + '/js/selector/CustomerSelector.js']

	// end: Generated for ConWeichuli From Template: App.import.js.vm
	// start: Generated for ConLanjie From Template: App.import.js.vm
	,
	ConLanjieView : [__ctxPath + '/js/customer/ConLanjieView.js',
			__ctxPath + '/js/customer/ConLanjieForm.js',
			__ctxPath + '/js/customer/ConMoveLanjieForm.js']

	// end: Generated for ConLanjie From Template: App.import.js.vm
	// start: Generated for ConBwListTimeRul From Template: App.import.js.vm
	,
	ConBwListTimeRulView : [__ctxPath + '/js/customer/ConBwListTimeRulView.js',
			__ctxPath + '/js/customer/ConBwListTimeRulForm.js']

	// end: Generated for ConBwListTimeRul From Template: App.import.js.vm
	// start: Generated for ConBwListBusRul From Template: App.import.js.vm
	,
	ConBwListBusRulView : [__ctxPath + '/js/customer/ConBwListBusRulView.js',
			__ctxPath + '/js/customer/ConBwListBusRulForm.js']

	// end: Generated for ConBwListBusRul From Template: App.import.js.vm
	// start: Generated for ConBwList From Template: App.import.js.vm
	,
	ConBwListView : [__ctxPath + '/js/customer/ConBwListView.js',
			__ctxPath + '/js/customer/ConBwListFormDaoRu.js',
			__ctxPath + '/js/customer/ConBwListShow.js',
			__ctxPath + '/js/customer/ConBwListWindow.js',
			__ctxPath + '/js/customer/ConBwlistApproveForm.js',
			__ctxPath + '/js/customer/ConWeichuliFormJiaRuHMD.js',
			__ctxPath + '/js/selector/CustomerSelector.js'

	],
	ConBwListDaishenpiView : [__ctxPath + '/js/customer/ConBwListDaishenpiView.js',
			__ctxPath + '/js/customer/ConBwListFormDaoRu.js',
			__ctxPath + '/js/customer/ConBwListShow.js',
			__ctxPath + '/js/customer/ConBwListAudting.js'
	],
	ConWwListView : [__ctxPath + '/js/customer/ConWwListView.js',
			__ctxPath + '/js/customer/ConWwListFormDaoRu.js',
			__ctxPath + '/js/customer/ConWwListFormJiaRuHMD.js',
			__ctxPath + '/js/selector/CusPersonalSelector.js'

	]

	// end: Generated for ConBwList From Template: App.import.js.vm
	,
	HasChargeBillView : [__ctxPath + '/js/serve/HasChargeBillView.js',
			__ctxPath + '/js/know/UkSysKnowForm.js'],
	CompAccountingView : [__ctxPath + '/js/serve/CompAccountingView.js'],
	BillView : [__ctxPath + '/js/serve/BillView.js'],
	AmountAvailableView : [__ctxPath + '/js/serve/AmountAvailableView.js'],
	NotABillView : [__ctxPath + '/js/serve/NotABillView.js'],
	PreLicensingDealView : [__ctxPath + '/js/serve/PreLicensingDealView.js'],
	TodaysConsumerView : [__ctxPath + '/js/serve/TodaysConsumerView.js'],
	ModifyBbillAddressView : [__ctxPath + '/js/serve/ModifyBbillAddressView.js'],
	ModifyCustomerInformationView : [__ctxPath
			+ '/js/serve/ModifyCustomerInformationView.js'],
	CardStatusManagementView : [__ctxPath
			+ '/js/serve/CardStatusManagementView.js'],
	CardholderRelationshipView : [__ctxPath
			+ '/js/serve/CardholderRelationshipView.js'],
	LossLiftingView : [__ctxPath + '/js/serve/LossLiftingView.js'],
	CancelAccountLiftingView : [__ctxPath
			+ '/js/serve/CancelAccountLiftingView.js'],
	LockUnlockView : [__ctxPath + '/js/serve/LockUnlockView.js'],
	ReplacementCardView : [__ctxPath + '/js/serve/ReplacementCardView.js'],
	CreditLimitAdjustmentsView : [__ctxPath
			+ '/js/serve/CreditLimitAdjustmentsView.js'],
	RedeemView : [__ctxPath + '/js/serve/RedeemView.js'],
	AutomaticRepaymentSetView : [__ctxPath
			+ '/js/serve/AutomaticRepaymentSetView.js'],
	InstallmentsApplyRevocationView : [__ctxPath
			+ '/js/serve/InstallmentsApplyRevocationView.js'],
	InformationRequestView : [__ctxPath + '/js/serve/InformationRequestView.js'],
	SendBillView : [__ctxPath + '/js/serve/SendBillView.js'],
	AnnualFeeWaiverView : [__ctxPath + '/js/serve/AnnualFeeWaiverView.js'],
	ProgressApplicationsView : [__ctxPath
			+ '/js/serve/ProgressApplicationsView.js'],
	CardFlowView : [__ctxPath + '/js/serve/CardFlowView.js'],
	OpenCardView : [__ctxPath + '/js/serve/OpenCardView.js'],
	SetPasswordView : [__ctxPath + '/js/serve/SetPasswordView.js']

	,
	RMBCunKuanView : [__ctxPath + '/js/serve/RMBCunKuanView.js'

	],
	RMBDaiKuanView : [__ctxPath + '/js/serve/RMBDaiKuanView.js'

	],
	WBCunKuanView : [__ctxPath + '/js/serve/WBCunKuanView.js'

	],
	WHPaiJiaView : [__ctxPath + '/js/serve/WHPaiJiaView.js'

	],
	YeWuFeiLvView : [__ctxPath + '/js/serve/YeWuFeiLvView.js'

	],
	HangMingHangHaoView : [__ctxPath + '/js/serve/HangMingHangHaoView.js'

	],
	JiGouView : [__ctxPath + '/js/serve/JiGouView.js'

	],
	// 个人业务
	xinjiukahaohuchaView : [__ctxPath + '/js/serve/xinjiukahaohuchaView.js'],
	ZhangHuXinxiView : [__ctxPath + '/js/serve/ZhangHuXinXiView.js'],
	ZhangHuYuEView : [__ctxPath + '/js/serve/ZhangHuYuEView.js'],
	GeRenKaiHuHangView : [__ctxPath + '/js/serve/GeRenKaiHuHangView.js'],
	huoqizhanghujiaoyiView : [__ctxPath + '/js/serve/huoqizhanghujiaoyiView.js'],
	zhanghukoutouguashiView : [__ctxPath
			+ '/js/serve/zhanghukoutouguashiView.js'],
	mimaxiugaiView : [__ctxPath + '/js/serve/mimaxiugaiView.js'],
	mimachongzhiView : [__ctxPath + '/js/serve/mimachongzhiView.js'],
	gerendaikuanmingxiView : [__ctxPath + '/js/serve/gerendaikuanmingxiView.js'],
	// 对公业务
	cunkuanzhanghuyueView : [__ctxPath + '/js/serve/cunkuanzhanghuyueView.js'],
	cunkuanzhanghumingxiView : [__ctxPath
			+ '/js/serve/cunkuanzhanghumingxiView.js'],
	baozhengjindingqicunkuanView : [__ctxPath
			+ '/js/serve/baozhengjindingqicunkuanView.js'],
	xieyicunkuanzhanghuView : [__ctxPath
			+ '/js/serve/xieyicunkuanzhanghuView.js'],
	tongzhicunkuanzhanghuView : [__ctxPath
			+ '/js/serve/tongzhicunkuanzhanghuView.js'],
	baozhengjinhuoqicunkuanView : [__ctxPath
			+ '/js/serve/baozhengjinhuoqicunkuanView.js'],
	daikuanxinxiView : [__ctxPath + '/js/serve/daikuanxinxiView.js'],

	// 基金交易查询
	jijinzhanghukaihuView : [__ctxPath + '/js/serve/jijinzhanghukaihuView.js'],
	jijinzhanghuView : [__ctxPath + '/js/serve/jijinzhanghuView.js'],
	jijinzhanghuguashiView : [__ctxPath + '/js/serve/jijinzhanghuguashiView.js'],
	tongzhicunkuanzhanghuView : [__ctxPath
			+ '/js/serve/tongzhicunkuanzhanghuView.js'],
	jijinzhanghujieguaView : [__ctxPath + '/js/serve/jijinzhanghujieguaView.js'],
	jijinzhanghububanView : [__ctxPath + '/js/serve/jijinzhanghububanView.js'],
	jijinrengouView : [__ctxPath + '/js/serve/jijinrengouView.js'],
	jijinshengouView : [__ctxPath + '/js/serve/jijinshengouView.js'],
	jijinshuhuiView : [__ctxPath + '/js/serve/jijinshuhuiView.js'],
	jijinjiaoyimingxiView : [__ctxPath + '/js/serve/jijinjiaoyimingxiView.js']
	// start: Generated for CusBusiInvoke From Template: App.import.js.vm
	,
	CusBusiInvokeView : [__ctxPath + '/js/customer/CusBusiInvokeView.js',
			__ctxPath + '/js/customer/CusBusiInvokeForm.js']

	// end: Generated for CusBusiInvoke From Template: App.import.js.vm
	// start: Generated for CusSpeEve From Template: App.import.js.vm
	,
	CusSpeEveView : [__ctxPath + '/js/customer/CusSpeEveView.js',
			__ctxPath + '/js/customer/CusSpeEveForm.js'],
	tongxunlu : [__ctxPath + '/js/selector/UlEmployeeSelector.js',
			__ctxPath + '/js/info/tongxunluView.js',
			__ctxPath + '/js/info/tongxunluForm.js',
			__ctxPath + '/js/info/tongxunluTypeForm.js'],
	zhishifabu : [__ctxPath + '/js/system/AppUserForm.js',
			__ctxPath + '/js/selector/UserSelector.js',
			__ctxPath + '/js/know/zhishifabuView.js'

	],
	zhishichaxun : [__ctxPath + '/js/know/zhishichaxunView.js',
					__ctxPath + '/js/know/RubbishForm.js',
					__ctxPath + '/js/know/UkKnowApplyFlowView.js',
			__ctxPath + '/js/know/KnowTmpForm.js',
			__ctxPath + '/js/know/UkKnowApplyCollectFlowForm.js',
			__ctxPath + '/js/know/UkKnowApplyFlowForm.js',
			__ctxPath + '/js/know/UkKnowCollectImport.js',
			__ctxPath + '/js/know/UkKnowCollectView.js',
			__ctxPath + '/js/know/UkKnowCollectForm.js',
			__ctxPath + '/js/know/UkKnowApproveForm.js',
			__ctxPath + '/js/selector/UkKnowKeywordSelector.js',
			__ctxPath + '/js/selector/UkSysKnowSelector.js',
			__ctxPath + '/js/know/RubbishForm.js',
			__ctxPath + '/js/selector/UkKnowDimensionalitySelector.js',
			__ctxPath + '/ext3/ux/TreeCombox.js'
	],
	UkGuiDangView : [__ctxPath + '/js/know/UkGuiDangView.js',
					__ctxPath + '/js/know/RubbishForm.js'
	]
	// end: Generated for CusSpeEve From Template: App.import.js.vm
	// start: Generated for QcCheck From Template: App.import.js.vm
	,
	QcCheckView : [__ctxPath + '/js/qucon/QcCheckView.js',
			__ctxPath + '/js/qucon/QcCheckForm.js',
			__ctxPath + '/js/selector/UserSelector.js'],
	QcCheckViewPerson : [__ctxPath + '/js/qucon/QcCheckViewPerson.js',
			__ctxPath + '/js/qucon/QcCheckForm.js',
			__ctxPath + '/js/selector/UserSelector.js',
			__ctxPath + '/js/selector/UsergroupTreeSelector.js',
			__ctxPath + '/js/qucon/QcHelpFuDaoForm.js',
			__ctxPath + '/js/selector/knowledgeSelector.js',
			__ctxPath + '/js/qucon/QcHelpForm.js',
			__ctxPath + '/js/qucon/QCAuditForm.js'],
	QcHelpView : [__ctxPath + '/js/selector/UserSelector.js'],
	QcHelpView : [__ctxPath + '/js/qucon/QcHelpView.js',
			__ctxPath + '/js/qucon/QcHelpView.js',
			__ctxPath + '/js/selector/UsergroupTreeSelector.js',
			__ctxPath + '/js/qucon/QcHelpFuDaoForm.js',
			__ctxPath + '/js/selector/knowledgeSelector.js'],
	// end: Generated for QcCheck From Template: App.import.js.vm
	// start: Generated for QcCheckDetail From Template: App.import.js.vm
	AchievementsRuleView : [__ctxPath + '/js/qucon/AchievementsRuleView.js',
			__ctxPath + '/js/qucon/AchievementsRuleForm.js'],
	AchievementsView : [
			__ctxPath + '/ext3/resources/css/GroupHeaderPlugin.css',
			__ctxPath + '/js/qucon/AchievementsView.js',
			__ctxPath + '/js/qucon/AchievementsForm.js',
			__ctxPath + '/js/qucon/AchievementsFormCount.js',
			__ctxPath + '/ext3/ux/CheckTreePanel.js',
			__ctxPath + '/ext3/ux/GroupHeaderPlugin.js'],
	QcCheckDetailView : [__ctxPath + '/js/qucon/QcCheckDetailView.js',
			__ctxPath + '/js/qucon/QcCheckDetailForm.js']

	// end: Generated for QcCheckDetail From Template: App.import.js.vm
	// start: Generated for QcChkBasis From Template: App.import.js.vm
	,
	QcChkBasisView : [__ctxPath + '/js/qucon/QcChkBasisView.js',
			__ctxPath + '/js/qucon/QcChkBasisForm.js']

	// end: Generated for QcChkBasis From Template: App.import.js.vm
	// start: Generated for QcScoreOpt From Template: App.import.js.vm
	,
	QcScoreOptView : [__ctxPath + '/js/qucon/QcScoreOptView.js',
			__ctxPath + '/js/qucon/QcScoreOptForm.js']

	// end: Generated for QcScoreOpt From Template: App.import.js.vm
	// start: Generated for QcTarCat From Template: App.import.js.vm
	,
	QcTarCatView : [__ctxPath + '/js/qucon/QcTarCatView.js',
			__ctxPath + '/js/qucon/QcTarCatForm.js']

	// end: Generated for QcTarCat From Template: App.import.js.vm
	// start: Generated for QcTemplate From Template: App.import.js.vm
	,
	QcTemplateView : [__ctxPath + '/js/qucon/QcTemplateView.js',
			__ctxPath + '/js/qucon/QcTemplateForm.js',
			__ctxPath + '/js/qucon/QcTemplateAddForm.js',
			__ctxPath + '/js/qucon/QcTargetView.js',
			__ctxPath + '/js/qucon/QcTemplateDesignForm.js',
			__ctxPath + '/js/qucon/QcTemplateDesignTargetView.js',
			__ctxPath + '/js/qucon/QcTempChapcterForm.js',
			__ctxPath + '/js/selector/QcTargetSelector.js',
			__ctxPath + '/js/qucon/QCShowTempForm.js',
			__ctxPath + '/js/selector/PublishSelector.js'],
	QcRuleView : [__ctxPath + '/js/qucon/QcRuleView.js',
			__ctxPath + '/js/qucon/QcRuleForm.js',
			__ctxPath + '/js/selector/UsergroupTreeSelector.js',
			__ctxPath + '/js/selector/UserSelector.js'],
	QCReviewView : [__ctxPath + '/js/qucon/QCReviewView.js',
			__ctxPath + '/js/qucon/QCReviewForm.js',
			__ctxPath + '/js/qucon/QCAuditForm.js',
			__ctxPath + '/js/selector/QcTemplateSelector.js']
	// end: Generated for QcTemplate From Template: App.import.js.vm
	// start: Generated for QcTempChapcter From Template: App.import.js.vm
	,
	QcTempChapcterView : [__ctxPath + '/js/qucon/QcTempChapcterView.js',
			__ctxPath + '/js/qucon/QcTempChapcterForm.js']

	// end: Generated for QcTempChapcter From Template: App.import.js.vm
	// start: Generated for QcTarget From Template: App.import.js.vm
	,
	QcTargetView : [__ctxPath + '/js/qucon/QcTargetView.js',
			__ctxPath + '/js/qucon/QcTargetView.js',
			__ctxPath + '/js/qucon/QcTargetForm.js',
			__ctxPath + '/js/qucon/QcTargetAddForm.js',
			__ctxPath + '/js/qucon/QcTargetPreviewForm.js',
			// __ctxPath+'/js/qucon/QcTarCatView.js',
			__ctxPath + '/js/qucon/QcTarCatForm.js']

	// end: Generated for QcTarget From Template: App.import.js.vm
	// start: Generated for QcTempRelease From Template: App.import.js.vm
	,
	QcTempReleaseView : [__ctxPath + '/js/qucon/QcTempReleaseView.js',
			__ctxPath + '/js/qucon/QcTempReleaseForm.js']

	// end: Generated for QcTempRelease From Template: App.import.js.vm
	// start: Generated for QcTempReObj From Template: App.import.js.vm
	,
	QcTempReObjView : [__ctxPath + '/js/qucon/QcTempReObjView.js',
			__ctxPath + '/js/qucon/QcTempReObjForm.js']

	// end: Generated for QcTempReObj From Template: App.import.js.vm
	// start: Generated for QcTempTar From Template: App.import.js.vm
	,
	QcTempTarView : [__ctxPath + '/js/qucon/QcTempTarView.js',
			__ctxPath + '/js/qucon/QcTempTarForm.js']

	// end: Generated for QcTempTar From Template: App.import.js.vm
	// start: Generated for CtScrAnsDetail From Template: App.import.js.vm
	,
	CtScrAnsDetailView : [__ctxPath + '/js/comtech/CtScrAnsDetailView.js',
			__ctxPath + '/js/comtech/CtScrAnsDetailForm.js']

	// end: Generated for CtScrAnsDetail From Template: App.import.js.vm
	// start: Generated for CtScrAnsSummary From Template: App.import.js.vm
	,
	CtScrAnsSummaryView : [__ctxPath + '/js/comtech/CtScrAnsSummaryView.js',
			__ctxPath + '/js/comtech/CtScrAnsSummaryForm.js']

	// end: Generated for CtScrAnsSummary From Template: App.import.js.vm
	// start: Generated for CtScrCat From Template: App.import.js.vm
	,
	CtScrCatView : [__ctxPath + '/js/comtech/CtScrCatView.js',
			__ctxPath + '/js/comtech/CtScrCatForm.js']

	// end: Generated for CtScrCat From Template: App.import.js.vm
	// start: Generated for CtScrChapcter From Template: App.import.js.vm
	,
	CtScrChapcterView : [__ctxPath + '/js/comtech/CtScrChapcterView.js',
			__ctxPath + '/js/comtech/CtScrChapcterForm.js']

	// end: Generated for CtScrChapcter From Template: App.import.js.vm
	// start: Generated for CtScrQue From Template: App.import.js.vm
	,
	CtScrQueView : [__ctxPath + '/js/comtech/CtScrQueView.js',
			__ctxPath + '/js/comtech/CtScrQueForm.js']

	// end: Generated for CtScrQue From Template: App.import.js.vm
	// start: Generated for CtScrQueOpt From Template: App.import.js.vm
	,
	CtScrQueOptView : [__ctxPath + '/js/comtech/CtScrQueOptView.js',
			__ctxPath + '/js/comtech/CtScrQueOptForm.js']

	// end: Generated for CtScrQueOpt From Template: App.import.js.vm
	// start: Generated for CtScrRelease From Template: App.import.js.vm
	,
	CtScrReleaseView : [__ctxPath + '/js/comtech/CtScrReleaseView.js',
			__ctxPath + '/js/comtech/CtScrReleaseForm.js']

	// end: Generated for CtScrRelease From Template: App.import.js.vm
	// start: Generated for CtScrReleaseObj From Template: App.import.js.vm
	,
	CtScrReleaseObjView : [__ctxPath + '/js/comtech/CtScrReleaseObjView.js',
			__ctxPath + '/js/comtech/CtScrReleaseObjForm.js']

	// end: Generated for CtScrReleaseObj From Template: App.import.js.vm
	// start: Generated for CtScrTemplate From Template: App.import.js.vm
	,
	CtScrTemplateView : [__ctxPath + '/js/comtech/CtScrTemplateView.js',
			__ctxPath + '/js/comtech/CtScrTemplateForm.js']

	// end: Generated for CtScrTemplate From Template: App.import.js.vm
	// start: Generated for CtScrTemGotoRule From Template: App.import.js.vm
	,
	CtScrTemGotoRuleView : [__ctxPath + '/js/comtech/CtScrTemGotoRuleView.js',
			__ctxPath + '/js/comtech/CtScrTemGotoRuleForm.js']

	// end: Generated for CtScrTemGotoRule From Template: App.import.js.vm
	// start: Generated for CtScrTemQue From Template: App.import.js.vm
	,
	CtScrTemQueView : [__ctxPath + '/js/comtech/CtScrTemQueView.js',
			__ctxPath + '/js/comtech/CtScrTemQueForm.js']

	// end: Generated for CtScrTemQue From Template: App.import.js.vm
	// start: Generated for PapAnsDetail From Template: App.import.js.vm
	,
	PapAnsDetailView : [__ctxPath + '/js/pap/PapAnsDetailView.js',
			__ctxPath + '/js/pap/PapAnsDetailForm.js']

	// end: Generated for PapAnsDetail From Template: App.import.js.vm
	// start: Generated for PapAnsSummary From Template: App.import.js.vm
	,
	PapAnsSummaryView : [__ctxPath + '/js/pap/PapAnsSummaryView.js',
			__ctxPath + '/js/pap/PapAnsSummaryForm.js']

	// end: Generated for PapAnsSummary From Template: App.import.js.vm
	// start: Generated for PapCat From Template: App.import.js.vm
	,
	PapCatView : [__ctxPath + '/js/pap/PapCatView.js',
			__ctxPath + '/js/pap/PapCatForm.js']

	// end: Generated for PapCat From Template: App.import.js.vm
	// start: Generated for PapChapcter From Template: App.import.js.vm
	,
	PapChapcterView : [__ctxPath + '/js/pap/PapChapcterView.js',
			__ctxPath + '/js/pap/PapChapcterForm.js']

	// end: Generated for PapChapcter From Template: App.import.js.vm
	// start: Generated for PapQue From Template: App.import.js.vm
	,
	PapQueView : [__ctxPath + '/js/pap/PapQueView.js',
			__ctxPath + '/js/pap/PapQueForm.js']

	// end: Generated for PapQue From Template: App.import.js.vm
	// start: Generated for PapQueOpt From Template: App.import.js.vm
	,
	PapQueOptView : [__ctxPath + '/js/pap/PapQueOptView.js',
			__ctxPath + '/js/pap/PapQueOptForm.js']

	// end: Generated for PapQueOpt From Template: App.import.js.vm
	// start: Generated for PapRelease From Template: App.import.js.vm
	,
	PapReleaseView : [__ctxPath + '/js/pap/PapReleaseView.js',
			__ctxPath + '/js/pap/PapReleaseForm.js']

	// end: Generated for PapRelease From Template: App.import.js.vm
	// start: Generated for PapReleaseObj From Template: App.import.js.vm
	,
	PapReleaseObjView : [__ctxPath + '/js/pap/PapReleaseObjView.js',
			__ctxPath + '/js/pap/PapReleaseObjForm.js']

	// end: Generated for PapReleaseObj From Template: App.import.js.vm
	// start: Generated for PapTemplate From Template: App.import.js.vm
	,
	PapTemplateView : [__ctxPath + '/js/pap/PapTemplateView.js',
			__ctxPath + '/js/pap/PapTemplateForm.js']

	// end: Generated for PapTemplate From Template: App.import.js.vm
	// start: Generated for PapTemGotoRule From Template: App.import.js.vm
	,
	PapTemGotoRuleView : [__ctxPath + '/js/pap/PapTemGotoRuleView.js',
			__ctxPath + '/js/pap/PapTemGotoRuleForm.js']

	// end: Generated for PapTemGotoRule From Template: App.import.js.vm
	// start: Generated for PapTemQue From Template: App.import.js.vm
	,
	PapTemQueView : [__ctxPath + '/js/pap/PapTemQueView.js',
			__ctxPath + '/js/pap/PapTemQueForm.js']
	// end: Generated for PapTemQue From Template: App.import.js.vm

	,
	AgentMap : [__ctxPath + '/js/qucon/AgentMap.js']
	// start: Generated for ObCallbatch From Template: App.import.js.vm
	,
	ObCalllistView : [__ctxPath + '/js/outb/ObCalllistView.js',
			__ctxPath + '/js/outb/ObCalllistForm.js',
			__ctxPath + '/js/outb/ObCallListWindow.js',
			__ctxPath + '/js/selector/ObProjectSelector.js',
			__ctxPath + '/js/selector/ObZuZhiJiGouSelector.js',
			__ctxPath + '/js/outb/ObCallListClearnWindow.js',
			__ctxPath + '/js/outb/ObCallbatchFormDaoRu.js']

	// end: Generated for ObCallbatch From Template: App.import.js.vm
	// start: Generated for ObCallbatchAss From Template: App.import.js.vm
	,
	ObCallbatchView : [__ctxPath + '/js/outb/ObCallbatchView.js',
			__ctxPath + '/js/outb/ObCallbatchForm.js',
			__ctxPath + '/js/outb/ObCallbatchWindow.js',
			__ctxPath + '/js/selector/ObProjectSelector.js',
			__ctxPath + '/js/outb/ObCallListClearnWindow.js',
			__ctxPath + '/js/selector/ObCallNameSelector.js',
			__ctxPath + '/ext3/ux/AddressEditor.js',
			__ctxPath + '/js/outb/ObCalllistCQForm.js'],
	ObCallListClearnView : [__ctxPath + '/js/outb/ObCallListClearnView.js',
			__ctxPath + '/js/outb/ObCallListClearnWindow.js',
			__ctxPath + '/js/selector/ObProjectSelector.js',
			__ctxPath + '/js/outb/ObCallListClearnForm.js'

	],
	ObCallbatchAssView : [__ctxPath + '/js/outb/ObCallbatchAssView.js',
			__ctxPath + '/js/outb/ObCallbatchAssForm.js']

	// end: Generated for ObCallbatchAss From Template: App.import.js.vm
	// start: Generated for ObCallbatchHis From Template: App.import.js.vm
	,
	ObCallbatchHisView : [__ctxPath + '/js/outb/ObCallbatchHisView.js',
			__ctxPath + '/js/outb/ObCallbatchHisForm.js']

	// end: Generated for ObCallbatchHis From Template: App.import.js.vm
	// start: Generated for ObCallbatchImpTmp From Template: App.import.js.vm
	,
	ObCallbatchImpTmpView : [__ctxPath + '/js/outb/ObCallbatchImpTmpView.js',
			__ctxPath + '/js/outb/ObCallbatchImpTmpForm.js'],

	// end: Generated for ObCallbatchImpTmp From Template: App.import.js.vm
	// start: Generated for ObCalllist From Template: App.import.js.vm

	ObComView : [__ctxPath + '/ext3/ux/treefilter/JsonTreeLoader.js',
			__ctxPath + '/ext3/ux/treefilter/PinyinFilter.js',
			__ctxPath + '/ext3/ux/treefilter/TreeCombo.js',
			__ctxPath + '/ext3/ux/treefilter/TreeFilter.js',
			__ctxPath + '/ext3/ux/RangeField.js',
			__ctxPath + '/js/selector/ObProjectSelector.js',
			__ctxPath + '/js/selector/ObCallNameSelector.js',
			__ctxPath + '/js/selector/ObZuZhiJiGouSelector.js',
			__ctxPath + '/js/selector/ObProductNameSelector.js',
			__ctxPath + '/js/selector/ObCtScrNameSelector.js',
			__ctxPath + '/js/selector/ObPapReleaseNameSelector.js',
			__ctxPath + '/js/selector/ObUserGroupNameSelector.js',
			__ctxPath + '/js/selector/UlPersonChargeSelector.js',
			__ctxPath + '/js/outb/ObComView.js',
			__ctxPath + '/js/outb/ObComForm.js',
			__ctxPath + '/js/outb/ObComDelForm.js'],
	ObComSalerulView : [__ctxPath + '/js/outb/ObComSalerulView.js',
			__ctxPath + '/js/outb/ObComSalerulForm.js']

	// end: Generated for ObComSalerul From Template: App.import.js.vm

	// start: Generated for ObConCalllist From Template: App.import.js.vm
	,
	ObConCalllistView : [__ctxPath + '/js/outb/ObConCalllistView.js',
			__ctxPath + '/js/outb/ObConCalllistForm.js'],
	ObCalllistMFeipeiView : [__ctxPath + '/js/outb/ObCalllistMFeipeiView.js',
			__ctxPath + '/js/outb/ObCalllistMFeipeiForm.js',
			__ctxPath + '/js/outb/ObCalllistMForm.js',
			__ctxPath + '/js/selector/ObProjectSelector.js',
			__ctxPath + '/ext3/ux/AddressEditor.js',
			__ctxPath + '/js/outb/ObCalllistMHuishouForm.js'],
	ObCalllistJFeipeiView : [__ctxPath + '/js/outb/ObCalllistJFeipeiView.js',
			__ctxPath + '/js/outb/ObCalllistJFeipeiForm.js',
			__ctxPath + '/js/outb/ObCalllistMForm.js',
			__ctxPath + '/ext3/ux/AddressEditor.js',
			__ctxPath + '/js/outb/ObCalllistMHuishouForm.js'],
	ObCalllistZFeipeiView : [__ctxPath + '/js/outb/ObCalllistZFeipeiView.js',
			__ctxPath + '/js/outb/ObCalllistZFeipeiForm.js',
			__ctxPath + '/js/outb/ObCalllistMForm.js',
			__ctxPath + '/ext3/ux/AddressEditor.js',
			__ctxPath + '/js/outb/ObCalllistMHuishouForm.js'],
	ObCalllistHuishouView : [__ctxPath + '/js/outb/ObCalllistHuishouView.js',
			__ctxPath + '/js/selector/ObProjectSelector.js',
			__ctxPath + '/ext3/ux/AddressEditor.js',
			__ctxPath + '/js/outb/ObCalllistHuishouForm.js'], 
	ObCalllistChouquView : [__ctxPath + '/js/outb/ObCalllistChouquView.js',
			__ctxPath + '/js/selector/ObProjectSelector.js',
			__ctxPath + '/js/selector/ObCallNameSelector.js',
			__ctxPath + '/js/outb/ObCalllistChouquForm.js',
			__ctxPath + '/js/outb/ObConCalllistForm.js',
			__ctxPath + '/ext3/ux/AddressEditor.js'],
	ObCalllistChouquUserView : [
			__ctxPath + '/js/outb/ObCalllistChouquUserView.js',
			__ctxPath + '/js/selector/ObProjectSelector.js',
			__ctxPath + '/js/outb/ObCalllistChouquUserForm.js'],
	YXtaskView : [__ctxPath + '/js/outb/YXtaskView.js',
			__ctxPath + '/js/outb/ObComTaskDelForm.js',
			__ctxPath + '/ext3/ux/TreeCombox.js',
			__ctxPath + '/js/outb/YXtaskForm.js',
			__ctxPath + '/js/outb/YXtaskDetailForm.js',
			__ctxPath + '/js/dingdan/DDhistory.js',
			__ctxPath + '/js/outb/YXtaskActionDetailForm.js',
			__ctxPath + '/js/outb/YXtaskActionForm.js',
			__ctxPath + '/js/outb/HeiMingDan.js',
			__ctxPath + '/js/outb/SendmailForm.js',
			__ctxPath + '/js/customer/CustomerDetailForm.js',
			__ctxPath + '/js/selector/ScBizOrderSalesSelector.js',
			__ctxPath + '/js/task/addCalendarPlanForm.js'
//			__ctxPath + '/js/outb/YXtaskproDingDanForm.js',
//			__ctxPath + '/js/selector/CusPersonalSelector.js',
//			__ctxPath + '/js/customer/CustomerDetailForm.js',
			
	],
	MonRuleManagerView : [__ctxPath + '/js/outb/MonRuleManagerView.js',
			__ctxPath + '/js/outb/MonRuleManagerForm.js',
			__ctxPath + '/js/selector/ObZuZhiJiGouSelector.js',
			__ctxPath + '/js/selector/UsergroupTreeSelector.js',
			__ctxPath + '/js/selector/ObGuiZeShiYongDuiXiangSelector.js',
			__ctxPath + '/js/selector/UserSelector.js'],
	MontargetwManagerView : [
		
		__ctxPath + '/js/selector/UlFuZeRenSelector.js',
		__ctxPath + '/js/selector/UlPersonChargeSelector.js',
		__ctxPath + '/js/outb/MontargetManagerView.js',
		
			__ctxPath + '/js/outb/MontargetManagerForm.js'],
	MonshowView : [__ctxPath + '/js/outb/MonshowView.js',
				   __ctxPath + '/js/outb/MonThatView.js',
				    __ctxPath + '/js/core/Ext.ux.GoogleChart.js'],
	MonmytargetView : [__ctxPath + '/js/outb/MonmytargetView.js'],
	MonmyshowView : [__ctxPath + '/js/outb/MonmyshowView.js',
					 __ctxPath + '/js/outb/MonThatView.js',
					 __ctxPath + '/js/outb/MonmyshowFuYiView.js',
					 __ctxPath + '/js/core/Ext.ux.GoogleChart.js',
					  __ctxPath + '/js/outb/MonmyshowShenHeView.js'],
	ObCalllistHistoryView : [__ctxPath + '/js/outb/ObCalllistHistoryView.js']
	// end: Generated for ObConCalllist From Template: App.import.js.vm
	// start: Generated for ObProject From Template: App.import.js.vm
	,
	ObProjectView : [__ctxPath + '/js/outb/ObProjectView.js',
			__ctxPath + '/js/selector/UlPersonChargeSelector.js',
			__ctxPath + '/js/selector/ObZuZhiJiGouSelector.js',
			__ctxPath + '/js/outb/ObProjectForm.js',
			__ctxPath + '/js/outb/ObProjectDelForm.js',
			__ctxPath + '/js/outb/ObProjectApplyForm.js',
			__ctxPath + '/ext3/ux/TreeCombox.js'
			]

	// end: Generated for ObProject From Template: App.import.js.vm
	// start: Generated for ObSaletask From Template: App.import.js.vm
	,
	ObSaletaskView : [__ctxPath + '/js/outb/ObSaletaskView.js',
			__ctxPath + '/js/outb/ObSaletaskForm.js']

	// end: Generated for ObSaletask From Template: App.import.js.vm
	// start: Generated for ObSaletaskBo From Template: App.import.js.vm
	,
	ObSaletaskBoView : [__ctxPath + '/js/outb/ObSaletaskBoView.js',
			__ctxPath + '/js/outb/ObSaletaskBoForm.js']

	// end: Generated for ObSaletaskBo From Template: App.import.js.vm
	// start: Generated for ObCallbatchCus From Template: App.import.js.vm
	,
	ObCallbatchCusView : [__ctxPath + '/js/outb/ObCallbatchCusView.js',
			__ctxPath + '/js/outb/ObCallbatchCusForm.js']

	// end: Generated for ObCallbatchCus From Template: App.import.js.vm
	// start: Generated for QcChkList From Template: App.import.js.vm
	,
	QcChkListView : [__ctxPath + '/js/qucon/QcChkListView.js',
			__ctxPath + '/js/qucon/QcChkListForm.js']

	// end: Generated for QcChkList From Template: App.import.js.vm
	// start: Generated for QcChkRul From Template: App.import.js.vm
	,
	QcChkRulView : [__ctxPath + '/js/qucon/QcChkRulView.js',
			__ctxPath + '/js/qucon/QcChkRulForm.js']

	// end: Generated for QcChkRul From Template: App.import.js.vm
	// start: Generated for QcChkRulDetail From Template: App.import.js.vm
	,
	QcChkRulDetailView : [__ctxPath + '/js/qucon/QcChkRulDetailView.js',
			__ctxPath + '/js/qucon/QcChkRulDetailForm.js']

	// end: Generated for QcChkRulDetail From Template: App.import.js.vm
	// start: Generated for QcChkGuid From Template: App.import.js.vm
	,
	QcChkGuidView : [__ctxPath + '/js/qucon/QcChkGuidView.js',
			__ctxPath + '/js/qucon/QcChkGuidForm.js']

	// end: Generated for QcChkGuid From Template: App.import.js.vm
	// start: Generated for QcChkGuidFile From Template: App.import.js.vm
	,
	QcChkGuidFileView : [__ctxPath + '/js/qucon/QcChkGuidFileView.js',
			__ctxPath + '/js/qucon/QcChkGuidFileForm.js']

	// end: Generated for QcChkGuidFile From Template: App.import.js.vm
	// start: Generated for SysTemType From Template: App.import.js.vm
	,
	SysTemTypeView : [__ctxPath + '/js/xitong/SysTemTypeView.js',
			__ctxPath + '/js/xitong/SysTemTypeForm.js']

	// end: Generated for SysTemType From Template: App.import.js.vm
	// start: Generated for ServiceWsdlManager From Template: App.import.js.vm
	,
	ServiceWsdlManagerView : [
		__ctxPath + '/js/xitong/ServiceWsdlManagerView.js',
		__ctxPath + '/js/xitong/ServiceWsdlManagerForm.js']

	// end: Generated for ServiceWsdlManager From Template: App.import.js.vm
	// start: Generated for ServiceWsdlMethod From Template: App.import.js.vm
	,
	ServiceWsdlMethodView : [
		__ctxPath + '/js/xitong/ServiceWsdlMethodView.js',
		__ctxPath + '/js/xitong/ServiceWsdlMethodForm.js']

	// end: Generated for ServiceWsdlMethod From Template: App.import.js.vm
	// start: Generated for BeanObject From Template: App.import.js.vm
	,
	BeanObjectView : [
		__ctxPath + '/js/xitong/BeanObjectView.js',
		__ctxPath + '/js/xitong/BeanObjectForm.js',
		__ctxPath + '/js/xitong/BeanColumnsExtForm.js']

	// end: Generated for BeanObject From Template: App.import.js.vm
	// start: Generated for BeanObjectColumns From Template: App.import.js.vm
	,
	BeanObjectColumnsView : [
		__ctxPath + '/js/xitong/BeanObjectColumnsView.js',
		__ctxPath + '/js/xitong/BeanObjectColumnsForm.js']
	// end: Generated for BeanObjectColumns From Template: App.import.js.vm

	// start: Generated for ObCallbatchImpWash From Template: App.import.js.vm
	,
	ObCallbatchImpWashView : [
		__ctxPath + '/js/outb/ObCallbatchImpWashView.js',
		__ctxPath + '/js/outb/ObCallbatchImpWashForm.js'],
	SysParaView : [
		__ctxPath + '/js/info/SysParaView.js',
		__ctxPath + '/js/info/SysParaForm.js'],
	DDallView:[
		__ctxPath + '/js/dingdan/DDallView.js',
		__ctxPath + '/js/dingdan/DDDetail.js'
	],
	DDgenzongView:[
		__ctxPath + '/js/dingdan/DDgenzongView.js'
	],
	DDjieanView:[
		__ctxPath + '/js/dingdan/DDjieanView.js',
		__ctxPath + '/js/dingdan/DDDetail.js',
        __ctxPath + '/js/selector/ScBizOrderSalesSelector.js'
	],
	DDmyView:[
		__ctxPath + '/js/dingdan/DDmyView.js'
	],
	DDmygenzongView:[
		__ctxPath + '/js/dingdan/DDmygenzongView.js',
		__ctxPath + '/js/dingdan/DDDetail.js'
	],
	
	DDmyjieanView:[
		__ctxPath + '/js/dingdan/DDmyjieanView.js',
		__ctxPath + '/js/dingdan/DDDetail.js'
	]
	,	
	// start: Generated for ConServiceRequest From Template: App.import.js.vm
	ConServiceRequestView : [
		__ctxPath + '/js/customer/ConServiceRequestView.js',
		__ctxPath + '/js/customer/ConServiceRequestForm.js',
		__ctxPath + '/js/customer/ConServiceRequestAddForm.js',
		__ctxPath + '/js/selector/CusPersonalSelector.js',
		__ctxPath + '/js/task/CalendarPlanFormView.js',
		__ctxPath + '/js/customer/CustomerDetailForm.js'],
	WantServiceView : [
		__ctxPath + '/js/customer/WantServiceView.js',
		__ctxPath + '/js/customer/ConServiceRequestForm.js',
		__ctxPath+'/js/task/addCalendarPlanForm.js',
    	__ctxPath+'/js/customer/ConHisForm.js',
		__ctxPath + '/js/selector/CusPersonalSelector.js',
		__ctxPath + '/js/task/CalendarPlanFormView.js',
		__ctxPath + '/js/customer/CustomerDetailForm.js'],
	HaveOverServiceView:[
		__ctxPath + '/js/customer/HaveOverServiceView.js',
		__ctxPath + '/js/customer/ConServiceRequestForm.js',
		__ctxPath+'/js/task/addCalendarPlanForm.js',
    	__ctxPath+'/js/customer/ConHisForm.js',
		__ctxPath + '/js/selector/CusPersonalSelector.js',
		__ctxPath + '/js/task/CalendarPlanFormView.js',
		__ctxPath + '/js/customer/CustomerDetailForm.js'],
	MyServiceView:[
		__ctxPath + '/js/customer/MyServiceView.js',
		__ctxPath + '/js/customer/ConServiceRequestForm.js',
		__ctxPath+'/js/task/addCalendarPlanForm.js',
    	__ctxPath+'/js/customer/ConHisForm.js',
		__ctxPath + '/js/selector/CusPersonalSelector.js',
		__ctxPath + '/js/task/CalendarPlanFormView.js',
		__ctxPath + '/js/customer/CustomerDetailForm.js'],
	MyWantServiceView:[
		__ctxPath + '/js/customer/MyWantServiceView.js',
		__ctxPath + '/js/customer/ConServiceRequestForm.js',
		__ctxPath+'/js/task/addCalendarPlanForm.js',
    	__ctxPath+'/js/customer/ConHisForm.js',
		__ctxPath + '/js/selector/CusPersonalSelector.js',
		__ctxPath + '/js/task/CalendarPlanFormView.js',
		__ctxPath + '/js/customer/CustomerDetailForm.js'
	],
	MyHaveOverServiceView:[
		__ctxPath + '/js/customer/MyHaveOverServiceView.js',
		__ctxPath + '/js/customer/ConServiceRequestForm.js',
		__ctxPath+'/js/task/addCalendarPlanForm.js',
    	__ctxPath+'/js/customer/ConHisForm.js',
		__ctxPath + '/js/selector/CusPersonalSelector.js',
		__ctxPath + '/js/task/CalendarPlanFormView.js',
		__ctxPath + '/js/customer/CustomerDetailForm.js']
	// end: Generated for ConServiceRequest From Template: App.import.js.vm

//  start:  Generated for ScBizOrderFee From Template: App.import.js.vm
,ScBizOrderFeeView : [
    	__ctxPath+'/js/supply/ScBizOrderFeeView.js',
    	__ctxPath+'/js/supply/ScBizOrderFeeForm.js'
]

//  end:  Generated for ScBizOrderFee From Template: App.import.js.vm
//  start:  Generated for ScBizOrderPurchase From Template: App.import.js.vm
,ScBizOrderPurchaseView : [
    	__ctxPath+'/js/purchase/ScBizOrderPurchaseView.js',
    	__ctxPath+'/js/purchase/ScBizOrderPurchaseForm.js'
]

//  end:  Generated for ScBizOrderPurchase From Template: App.import.js.vm
//  start:  Generated for ScBizOrderRelated From Template: App.import.js.vm
,ScBizOrderRelatedView : [
    	__ctxPath+'/js/supply/ScBizOrderRelatedView.js',
    	__ctxPath+'/js/supply/ScBizOrderRelatedForm.js'
]

//  end:  Generated for ScBizOrderRelated From Template: App.import.js.vm
//  start:  Generated for ScBizOrderSales From Template: App.import.js.vm
,ScBizOrderSalesView : [
    	__ctxPath+'/js/sales/ScBizOrderSalesView.js',
    	__ctxPath+'/js/sales/ScBizOrderSalesForm.js',
    	__ctxPath+'/js/sales/ScBizOrderSalesFlowForm.js'
]

//  end:  Generated for ScBizOrderSales From Template: App.import.js.vm
//  start:  Generated for ScBizOrderStock From Template: App.import.js.vm
,ScBizOrderStockView : [
    	__ctxPath+'/js/stock/ScBizOrderStockView.js',
    	__ctxPath+'/js/stock/ScBizOrderStockForm.js'
]

//  end:  Generated for ScBizOrderStock From Template: App.import.js.vm
//  start:  Generated for ScBizRelationType From Template: App.import.js.vm
,ScBizRelationTypeView : [
    	__ctxPath+'/js/supply/ScBizRelationTypeView.js',
    	__ctxPath+'/js/supply/ScBizRelationTypeForm.js'
]

//  end:  Generated for ScBizRelationType From Template: App.import.js.vm
//  start:  Generated for ScBizSalesClassify From Template: App.import.js.vm
,ScBizSalesClassifyView : [
    	__ctxPath+'/js/sales/ScBizSalesClassifyView.js',
    	__ctxPath+'/js/sales/ScBizSalesClassifyForm.js'
]

//  end:  Generated for ScBizSalesClassify From Template: App.import.js.vm
//  start:  Generated for ScBizSalesDetail From Template: App.import.js.vm
,ScBizSalesDetailView : [
    	__ctxPath+'/js/sales/ScBizSalesDetailView.js',
    	__ctxPath+'/js/sales/ScBizSalesDetailForm.js'
]

//  end:  Generated for ScBizSalesDetail From Template: App.import.js.vm
//  start:  Generated for ScBoPurchaseClassify From Template: App.import.js.vm
,ScBoPurchaseClassifyView : [
    	__ctxPath+'/js/purchase/ScBoPurchaseClassifyView.js',
    	__ctxPath+'/js/purchase/ScBoPurchaseClassifyForm.js'
]

//  end:  Generated for ScBoPurchaseClassify From Template: App.import.js.vm
//  start:  Generated for ScBoPurchaseDetail From Template: App.import.js.vm
,ScBoPurchaseDetailView : [
    	__ctxPath+'/js/purchase/ScBoPurchaseDetailView.js',
    	__ctxPath+'/js/purchase/ScBoPurchaseDetailForm.js'
]

//  end:  Generated for ScBoPurchaseDetail From Template: App.import.js.vm
//  start:  Generated for ScBoStockClassify From Template: App.import.js.vm
,ScBoStockClassifyView : [
    	__ctxPath+'/js/stock/ScBoStockClassifyView.js',
    	__ctxPath+'/js/stock/ScBoStockClassifyForm.js'
]

//  end:  Generated for ScBoStockClassify From Template: App.import.js.vm
//  start:  Generated for ScBoStockDetail From Template: App.import.js.vm
,ScBoStockDetailView : [
    	__ctxPath+'/js/stock/ScBoStockDetailView.js',
    	__ctxPath+'/js/stock/ScBoStockDetailForm.js'
]

//  end:  Generated for ScBoStockDetail From Template: App.import.js.vm
//  start:  Generated for ScComboProduct From Template: App.import.js.vm
,ScComboProductView : [
    	__ctxPath+'/js/goods/ScComboProductView.js',
    	__ctxPath+'/js/goods/ScComboProductForm.js'
]

//  end:  Generated for ScComboProduct From Template: App.import.js.vm
//  start:  Generated for ScGoods From Template: App.import.js.vm
,ScGoodsView : [
    	__ctxPath+'/js/goods/ScGoodsView.js',
    	__ctxPath+'/js/goods/ScGoodsForm.js'
]

//  end:  Generated for ScGoods From Template: App.import.js.vm
//  start:  Generated for ScGoodsPrice From Template: App.import.js.vm
,ScGoodsPriceView : [
    	__ctxPath+'/js/goods/ScGoodsPriceView.js',
    	__ctxPath+'/js/goods/ScGoodsPriceForm.js'
]

//  end:  Generated for ScGoodsPrice From Template: App.import.js.vm
//  start:  Generated for ScGoodsPriceHis From Template: App.import.js.vm
,ScGoodsPriceHisView : [
    	__ctxPath+'/js/goods/ScGoodsPriceHisView.js',
    	__ctxPath+'/js/goods/ScGoodsPriceHisForm.js'
]

//  end:  Generated for ScGoodsPriceHis From Template: App.import.js.vm
//  start:  Generated for ScGoodsPriceRule From Template: App.import.js.vm
,ScGoodsPriceRuleView : [
    	__ctxPath+'/js/goods/ScGoodsPriceRuleView.js',
    	__ctxPath+'/js/goods/ScGoodsPriceRuleForm.js'
]

//  end:  Generated for ScGoodsPriceRule From Template: App.import.js.vm
//  start:  Generated for ScGoodsPriceVersion From Template: App.import.js.vm
,ScGoodsPriceVersionView : [
    	__ctxPath+'/js/goods/ScGoodsPriceVersionView.js',
    	__ctxPath+'/js/goods/ScGoodsPriceVersionForm.js'
]

//  end:  Generated for ScGoodsPriceVersion From Template: App.import.js.vm
//  start:  Generated for ScGoodsStock From Template: App.import.js.vm
,ScGoodsStockView : [
    	__ctxPath+'/js/stock/ScGoodsStockView.js',
    	__ctxPath+'/js/stock/ScGoodsStockForm.js'
]

//  end:  Generated for ScGoodsStock From Template: App.import.js.vm
//  start:  Generated for ScPriceVersion From Template: App.import.js.vm
,ScPriceVersionView : [
    	__ctxPath+'/js/goods/ScPriceVersionView.js',
    	__ctxPath+'/js/goods/ScPriceVersionForm.js'
]

//  end:  Generated for ScPriceVersion From Template: App.import.js.vm
//  start:  Generated for ScProduct From Template: App.import.js.vm
,ScProductView : [
    	__ctxPath+'/js/goods/ScProductView.js',
    	__ctxPath+'/js/goods/ScProductForm.js',
    	__ctxPath + '/ext3/ux/treefilter/PinyinFilter.js',
		__ctxPath + '/ext3/ux/treefilter/TreeFilter.js',
		__ctxPath + '/js/core/ux/TreeCombo.js'
]
,ScProductSearchView : [
    	__ctxPath+'/js/goods/ScProductSearchView.js',
    	__ctxPath + '/ext3/ux/treefilter/PinyinFilter.js',
		__ctxPath + '/ext3/ux/treefilter/TreeFilter.js',
		__ctxPath + '/js/core/ux/TreeCombo.js'
]
//  end:  Generated for ScProduct From Template: App.import.js.vm
//  start:  Generated for ScProductAttr From Template: App.import.js.vm
,ScProductAttrView : [
    	__ctxPath+'/js/goods/ScProductAttrView.js',
    	__ctxPath+'/js/goods/ScProductAttrForm.js'
]

//  end:  Generated for ScProductAttr From Template: App.import.js.vm
//  start:  Generated for ScProductAttrVal From Template: App.import.js.vm
,ScProductAttrValView : [
    	__ctxPath+'/js/goods/ScProductAttrValView.js',
    	__ctxPath+'/js/goods/ScProductAttrValForm.js'
]

//  end:  Generated for ScProductAttrVal From Template: App.import.js.vm
//  start:  Generated for ScProductClassify From Template: App.import.js.vm
,ScProductClassifyView : [
    	__ctxPath+'/js/goods/ScProductClassifyView.js',
    	__ctxPath+'/js/goods/ScProductClassifyForm.js',
    	__ctxPath + '/ext3/ux/treefilter/PinyinFilter.js',
		__ctxPath + '/ext3/ux/treefilter/TreeFilter.js',
		__ctxPath + '/js/core/ux/TreeCombo.js'
]

//  end:  Generated for ScProductClassify From Template: App.import.js.vm
//  start:  Generated for ScProductInst From Template: App.import.js.vm
,ScProductInstView : [
    	__ctxPath+'/js/goods/ScProductInstView.js',
    	__ctxPath+'/js/goods/ScProductInstForm.js'
]

//  end:  Generated for ScProductInst From Template: App.import.js.vm
//  start:  Generated for ScProductInstNote From Template: App.import.js.vm
,ScProductInstNoteView : [
    	__ctxPath+'/js/goods/ScProductInstNoteView.js',
    	__ctxPath+'/js/goods/ScProductInstNoteForm.js'
]

//  end:  Generated for ScProductInstNote From Template: App.import.js.vm
//  start:  Generated for ScPurchasePrice From Template: App.import.js.vm
,ScPurchasePriceView : [
    	__ctxPath+'/js/goods/ScPurchasePriceView.js',
    	__ctxPath+'/js/goods/ScPurchasePriceForm.js'
]

//  end:  Generated for ScPurchasePrice From Template: App.import.js.vm
//  start:  Generated for ScPurpriceVersion From Template: App.import.js.vm
,ScPurpriceVersionView : [
    	__ctxPath+'/js/goods/ScPurpriceVersionView.js',
    	__ctxPath+'/js/goods/ScPurpriceVersionForm.js'
]

//  end:  Generated for ScPurpriceVersion From Template: App.import.js.vm
//  start:  Generated for ScThresholdLevel From Template: App.import.js.vm
,ScThresholdLevelView : [
    	__ctxPath+'/js/stock/ScThresholdLevelView.js',
    	__ctxPath+'/js/stock/ScThresholdLevelForm.js'
]

//  end:  Generated for ScThresholdLevel From Template: App.import.js.vm
//  start:  Generated for ScWarehouse From Template: App.import.js.vm
,ScWarehouseView : [
    	__ctxPath+'/js/stock/ScWarehouseView.js',
    	__ctxPath+'/js/stock/ScWarehouseForm.js'
]

//  end:  Generated for ScWarehouse From Template: App.import.js.vm
//  start:  Generated for CusPurchaseCompany From Template: App.import.js.vm
,CusPurchaseCompanyView : [
    	__ctxPath+'/js/customer/CusPurchaseCompanyView.js',
    	__ctxPath+'/js/customer/CusPurchaseCompanyForm.js'
]

//  end:  Generated for CusPurchaseCompany From Template: App.import.js.vm
//  start:  Generated for SysPara From Template: App.import.js.vm
,SysParaView : [
    	__ctxPath+'/js/customer/SysParaView.js',
    	__ctxPath+'/js/customer/SysParaForm.js'
]

//  end:  Generated for SysPara From Template: App.import.js.vm
//  start:  Generated for SysParaOpt From Template: App.import.js.vm
,SysParaOptView : [
    	__ctxPath+'/js/customer/SysParaOptView.js',
    	__ctxPath+'/js/customer/SysParaOptForm.js'
]

//  end:  Generated for SysParaOpt From Template: App.import.js.vm
//  start:  Generated for ConServiceRequest From Template: App.import.js.vm
,ConServiceRequestView : [
    	__ctxPath+'/js/customer/ConServiceRequestView.js',
    	__ctxPath+'/js/customer/ConServiceRequestForm.js',
    	__ctxPath+'/js/customer/ConServiceRequestAddForm.js',
    	__ctxPath+'/js/task/addCalendarPlanForm.js',
    	__ctxPath+'/js/customer/ConHisForm.js',
		__ctxPath + '/js/selector/CusPersonalSelector.js',
		__ctxPath + '/js/task/CalendarPlanFormView.js',
		__ctxPath + '/js/customer/CustomerDetailForm.js']
//  end:  Generated for ConServiceRequest From Template: App.import.js.vm
//  start:  Generated for ObFee From Template: App.import.js.vm
,ObFeeView : [
    	__ctxPath+'/js/fee/ObFeeView.js',
    	__ctxPath+'/js/fee/ObFeeForm.js'
]

//  end:  Generated for ObFee From Template: App.import.js.vm
//  start:  Generated for ObFeeIndex From Template: App.import.js.vm
,ObFeeIndexView : [
    	__ctxPath+'/js/fee/ObFeeIndexView.js',
    	__ctxPath+'/js/fee/ObFeeIndexForm.js'
]

//  end:  Generated for ObFeeIndex From Template: App.import.js.vm
//  start:  Generated for ObFeeIndexLevel From Template: App.import.js.vm
,ObFeeIndexLevelView : [
    	__ctxPath+'/js/fee/ObFeeIndexLevelView.js',
    	__ctxPath+'/js/fee/ObFeeIndexLevelForm.js'
]

//  end:  Generated for ObFeeIndexLevel From Template: App.import.js.vm
//  start:  Generated for ObFeeIndexProject From Template: App.import.js.vm
,ObFeeIndexProjectView : [
    	__ctxPath+'/js/fee/ObFeeIndexProjectView.js',
    	__ctxPath+'/js/fee/ObFeeIndexProjectForm.js'
]

//  end:  Generated for ObFeeIndexProject From Template: App.import.js.vm
//  start:  Generated for ObFeeRule From Template: App.import.js.vm
,ObFeeRuleView : [
    	__ctxPath+'/js/fee/ObFeeRuleView.js',
    	__ctxPath+'/js/fee/ObFeeRuleForm.js'
]

//  end:  Generated for ObFeeRule From Template: App.import.js.vm
//  start:  Generated for ObFeeRuleValue From Template: App.import.js.vm
,ObFeeRuleValueView : [
    	__ctxPath+'/js/fee/ObFeeRuleValueView.js',
    	__ctxPath+'/js/fee/ObFeeRuleValueForm.js'
]

//  end:  Generated for ObFeeRuleValue From Template: App.import.js.vm
//  start:  Generated for ConBwlistApprove From Template: App.import.js.vm
,ConBwlistApproveView : [
    	__ctxPath+'/js/customer/ConBwlistApproveView.js',
    	__ctxPath+'/js/customer/ConBwlistApproveForm.js',
    	__ctxPath+'/js/customer/ConBwListFlowForm.js'
]

//  end:  Generated for ConBwlistApprove From Template: App.import.js.vm
//  start:  Generated for CusRelationship From Template: App.import.js.vm
,CusRelationshipView : [
    	__ctxPath+'/js/customer/CusRelationshipView.js',
    	__ctxPath+'/js/customer/CusRelationshipForm.js'
]

//  end:  Generated for CusRelationship From Template: App.import.js.vm
//  start:  Generated for CsOrder From Template: App.import.js.vm
,CsOrderView : [
    	__ctxPath+'/js/customer/CsOrderView.js',
    	__ctxPath+'/js/customer/CsOrderForm.js'
]

//  end:  Generated for CsOrder From Template: App.import.js.vm
//  start:  Generated for CusDelivery From Template: App.import.js.vm
,CusDeliveryView : [
    	__ctxPath+'/js/customer/CusDeliveryView.js',
    	__ctxPath+'/js/customer/CusDeliveryForm.js'
]

//  end:  Generated for CusDelivery From Template: App.import.js.vm
//  start:  Generated for CsOrderTime From Template: App.import.js.vm
,CsOrderTimeView : [
    	__ctxPath+'/js/customer/CsOrderTimeView.js',
    	__ctxPath+'/js/customer/CsOrderTimeForm.js'
]

//  end:  Generated for CsOrderTime From Template: App.import.js.vm
//start:  Generated for UnimAgent From Template: App.import.js.vm
,UnimAgentView : [
    	__ctxPath+'/js/unim/UnimAgentView.js',
    	__ctxPath+'/js/unim/UnimAgentForm.js',
    	__ctxPath + '/js/selector/UserSelector.js'
]
,UnimAgentManagerView : [
              	__ctxPath+'/js/unim/UnimAgentManagerView.js',
  	__ctxPath+'/js/unim/UnimAgentManagerForm.js'
  ]

//  end:  Generated for UnimAgent From Template: App.import.js.vm
//  start:  Generated for UnimAgentloginlog From Template: App.import.js.vm
,UnimAgentloginlogView : [
    	__ctxPath+'/js/unim/UnimAgentloginlogView.js',
    	__ctxPath+'/js/unim/UnimAgentloginlogForm.js'
]

//  end:  Generated for UnimAgentloginlog From Template: App.import.js.vm
//  start:  Generated for UnimAgentMap From Template: App.import.js.vm
,UnimAgentMapView : [
		__ctxPath+'/js/selector/UnimMaptSelector.js',
    	__ctxPath+'/js/unim/UnimAgentMapView.js',
    	__ctxPath+'/js/unim/UnimAgentMapForm.js'
]

//  end:  Generated for UnimAgentMap From Template: App.import.js.vm
//  start:  Generated for UnimCategory From Template: App.import.js.vm
,UnimCategoryView : [
    	__ctxPath+'/js/unim/UnimCategoryView.js',
    	__ctxPath+'/js/unim/UnimCategoryForm.js'
],
UnimshowbusyView:[
              	__ctxPath+'/js/unim/UnimshowbusyView.js',
            	__ctxPath+'/js/unim/UnimshowbusyForm.js'
        ]
,UnimhandupView:[
              	__ctxPath+'/js/unim/UnimhandupView.js',
            	__ctxPath+'/js/unim/UnimhandupForm.js'
        ],
UnimJianKongFaZhiView : [
			    	__ctxPath+'/js/unim/UnimJianKongFaZhiView.js',
            	__ctxPath+'/js/unim/UnimJianKongFaZhiForm.js'
	],
BusiQuDaoView : [
		__ctxPath+'/js/unim/BusiQuDaoView.js',
            	__ctxPath+'/js/unim/BusiQuDaoForm.js'
	],
BusiMapView : [
	__ctxPath+'/js/selector/UnimYWMaptSelector.js',
	__ctxPath+'/js/unim/BusiMapView.js',
            	__ctxPath+'/js/unim/BusiMapForm.js'
	],
BusiZhiBiaoView : [
	__ctxPath+'/js/unim/BusiZhiBiaoView.js',
            	__ctxPath+'/js/unim/BusiZhiBiaoForm.js'
	],
BusiCanShuView : [
		__ctxPath+'/js/unim/BusiCanShuView.js',
            	__ctxPath+'/js/unim/BusiCanShuForm.js'
	],
BusiFaZhiView : [
			    	__ctxPath+'/js/unim/BusiFaZhiView.js',
            	__ctxPath+'/js/unim/BusiFaZhiForm.js'
	],
AssetLeiXingView : [
			__ctxPath+'/js/unim/AssetLeiXingView.js',
            	__ctxPath+'/js/unim/AssetLeiXingForm.js'
	],
AssetGuanLiView : [
	__ctxPath+'/js/unim/AssetGuanLiView.js',
	__ctxPath + '/js/selector/UserSelector.js',
    __ctxPath+'/js/unim/AssetGuanLiForm.js'
	],
AssetMapView : [
	__ctxPath+'/js/selector/UnimZCMaptSelector.js',
	__ctxPath+'/js/unim/AssetMapView.js',
            	__ctxPath+'/js/unim/AssetMapForm.js'
	],
AssetLeiBieView : [
		__ctxPath+'/js/unim/AssetLeiBieView.js',
            	__ctxPath+'/js/unim/AssetLeiBieForm.js'
	],
AssetZhuangTaiView : [
		__ctxPath+'/js/unim/AssetZhuangTaiView.js',
            	__ctxPath+'/js/unim/AssetZhuangTaiForm.js'
	],
AssetZhiBiaoView : [
		__ctxPath+'/js/unim/AssetZhiBiaoView.js',
            	__ctxPath+'/js/unim/AssetZhiBiaoForm.js'
	],
AssetCanShuView : [
		__ctxPath+'/js/unim/AssetCanShuView.js',
            	__ctxPath+'/js/unim/AssetCanShuForm.js'
	],
AssetFaZhiView : [
		__ctxPath+'/js/unim/AssetFaZhiView.js',
            	__ctxPath+'/js/unim/AssetFaZhiForm.js'
	]
,UnimextensionstateView:[
				__ctxPath+'/js/unim/UnimextensionstateView.js',
				__ctxPath+'/js/unim/UnimextensionstateForm.js'
                    ]
//  end:  Generated for UnimCategory From Template: App.import.js.vm
//  start:  Generated for UnimExtension From Template: App.import.js.vm
,UnimExtensionView : [
    	__ctxPath+'/js/unim/UnimExtensionView.js',
    	__ctxPath+'/js/unim/UnimExtensionForm.js'
]

//  end:  Generated for UnimExtension From Template: App.import.js.vm
//  start:  Generated for UnimMapNavigation From Template: App.import.js.vm
,UnimMapNavigationView : [
    	__ctxPath+'/js/unim/UnimMapNavigationView.js',
    	__ctxPath+'/js/unim/UnimMapNavigationForm.js'
]

//  end:  Generated for UnimMapNavigation From Template: App.import.js.vm
//  start:  Generated for UnimServerConfig From Template: App.import.js.vm
,UnimServerConfigView : [
    	__ctxPath+'/js/unim/UnimServerConfigView.js',
    	__ctxPath+'/js/unim/UnimServerConfigForm.js'
]

//  end:  Generated for UnimServerConfig From Template: App.import.js.vm
//  start:  Generated for UnimSkillgroup From Template: App.import.js.vm
,UnimSkillgroupView : [
    	__ctxPath+'/js/unim/UnimSkillgroupView.js',
    	__ctxPath+'/js/unim/UnimSkillgroupForm.js'
]

//  end:  Generated for UnimSkillgroup From Template: App.import.js.vm
//  start:  Generated for UnimThrlevl From Template: App.import.js.vm
,UnimThrlevlView : [
    	__ctxPath+'/js/unim/UnimThrlevlView.js',
    	__ctxPath+'/js/unim/UnimThrlevlForm.js'
]
//  start:  Generated for ObCallbatchExtract From Template: App.import.js.vm
,ObCallbatchExtractView : [
    	__ctxPath+'/js/outb/ObCallbatchExtractView.js',
    	__ctxPath+'/js/outb/ObCallbatchExtractForm.js'
]

//  end:  Generated for ObCallbatchExtract From Template: App.import.js.vm
//  start:  Generated for UkKnowDimensionality From Template: App.import.js.vm
,UkKnowDimensionalityView : [
    	__ctxPath+'/js/know/UkKnowDimensionalityView.js',
    	__ctxPath+'/js/know/UkKnowDimensionalityForm.js',
		__ctxPath + '/js/selector/UkKnowDimensionalitySelector.js',
		__ctxPath+'/js/selector/UkKnowDimenTreeSelector.js'
]

//  end:  Generated for UkKnowDimensionality From Template: App.import.js.vm
//  start:  Generated for UkQiusuo From Template: App.import.js.vm
,UkQiusuoView : [
    	__ctxPath+'/js/know/UkQiusuoView.js',
    	__ctxPath+'/js/know/UkQiusuoForm.js'
]

//  end:  Generated for UkQiusuo From Template: App.import.js.vm
//  start:  Generated for UkQiusuoHuifu From Template: App.import.js.vm
,UkQiusuoHuifuView : [
    	__ctxPath+'/js/know/UkQiusuoHuifuView.js',
    	__ctxPath+'/js/know/UkQiusuoHuifuForm.js'
]

//  end:  Generated for UkQiusuoHuifu From Template: App.import.js.vm
//  start:  Generated for UkKnowCollectType From Template: App.import.js.vm
,UkKnowCollectTypeView : [
    	__ctxPath+'/js/know/UkKnowCollectTypeView.js',
    	__ctxPath+'/js/know/UkKnowCollectTypeForm.js'
]

//  end:  Generated for UkKnowCollectType From Template: App.import.js.vm
//  start:  Generated for UkPersonKnowType From Template: App.import.js.vm
,UkPersonKnowTypeView : [
    	__ctxPath+'/js/know/UkPersonKnowTypeView.js',
    	__ctxPath+'/js/know/UkPersonKnowTypeForm.js'
]

//  end:  Generated for UkPersonKnowType From Template: App.import.js.vm
//  start:  Generated for UnimChannelMap From Template: App.import.js.vm
,UnimChannelMapView : [
    	__ctxPath+'/js/unim/UnimChannelMapView.js',
    	__ctxPath+'/js/unim/UnimChannelMapForm.js'
]

//  end:  Generated for UnimChannelMap From Template: App.import.js.vm
//  start:  Generated for UnimChannelNavigation From Template: App.import.js.vm
,UnimChannelNavigationView : [
    	__ctxPath+'/js/unim/UnimChannelNavigationView.js',
    	__ctxPath+'/js/unim/UnimChannelNavigationForm.js'
]

//  end:  Generated for UnimChannelNavigation From Template: App.import.js.vm
//  start:  Generated for UnimChannel From Template: App.import.js.vm
,UnimChannelView : [
    	__ctxPath+'/js/unim/UnimChannelView.js',
    	__ctxPath+'/js/unim/UnimChannelForm.js'
]

//  end:  Generated for UnimChannel From Template: App.import.js.vm
//  start:  Generated for UnimChannelTarget From Template: App.import.js.vm
,UnimChannelTargetView : [
    	__ctxPath+'/js/unim/UnimChannelTargetView.js',
    	__ctxPath+'/js/unim/UnimChannelTargetForm.js'
]

//  end:  Generated for UnimChannelTarget From Template: App.import.js.vm
//  start:  Generated for UnimChaTarPar From Template: App.import.js.vm
,UnimChaTarParView : [
    	__ctxPath+'/js/unim/UnimChaTarParView.js',
    	__ctxPath+'/js/unim/UnimChaTarParForm.js'
]

//  end:  Generated for UnimChaTarPar From Template: App.import.js.vm
//  start:  Generated for UnimChaTarThrlevl From Template: App.import.js.vm
,UnimChaTarThrlevlView : [
    	__ctxPath+'/js/unim/UnimChaTarThrlevlView.js',
    	__ctxPath+'/js/unim/UnimChaTarThrlevlForm.js'
]

//  end:  Generated for UnimChaTarThrlevl From Template: App.import.js.vm
//  start:  Generated for UnimAssetsMap From Template: App.import.js.vm
,UnimAssetsMapView : [
    	__ctxPath+'/js/unim/UnimAssetsMapView.js',
    	__ctxPath+'/js/unim/UnimAssetsMapForm.js'
]

//  end:  Generated for UnimAssetsMap From Template: App.import.js.vm
//  start:  Generated for UnimAssetsNavigation From Template: App.import.js.vm
,UnimAssetsNavigationView : [
    	__ctxPath+'/js/unim/UnimAssetsNavigationView.js',
    	__ctxPath+'/js/unim/UnimAssetsNavigationForm.js'
]

//  end:  Generated for UnimAssetsNavigation From Template: App.import.js.vm
//  start:  Generated for UnimAssCategory From Template: App.import.js.vm
,UnimAssCategoryView : [
    	__ctxPath+'/js/unim/UnimAssCategoryView.js',
    	__ctxPath+'/js/unim/UnimAssCategoryForm.js'
]

//  end:  Generated for UnimAssCategory From Template: App.import.js.vm
//  start:  Generated for UnimAssets From Template: App.import.js.vm
,UnimAssetsView : [
    	__ctxPath+'/js/unim/UnimAssetsView.js',
    	__ctxPath+'/js/unim/UnimAssetsForm.js'
]

//  end:  Generated for UnimAssets From Template: App.import.js.vm
//  start:  Generated for UnimAssType From Template: App.import.js.vm
,UnimAssTypeView : [
    	__ctxPath+'/js/unim/UnimAssTypeView.js',
    	__ctxPath+'/js/unim/UnimAssTypeForm.js'
]

//  end:  Generated for UnimAssType From Template: App.import.js.vm
//  start:  Generated for UnimAssStatus From Template: App.import.js.vm
,UnimAssStatusView : [
    	__ctxPath+'/js/unim/UnimAssStatusView.js',
    	__ctxPath+'/js/unim/UnimAssStatusForm.js'
]

//  end:  Generated for UnimAssStatus From Template: App.import.js.vm
//  start:  Generated for UnimAssetsTarget From Template: App.import.js.vm
,UnimAssetsTargetView : [
    	__ctxPath+'/js/unim/UnimAssetsTargetView.js',
    	__ctxPath+'/js/unim/UnimAssetsTargetForm.js'
]

//  end:  Generated for UnimAssetsTarget From Template: App.import.js.vm
//  start:  Generated for UnimAssTarPar From Template: App.import.js.vm
,UnimAssTarParView : [
    	__ctxPath+'/js/unim/UnimAssTarParView.js',
    	__ctxPath+'/js/unim/UnimAssTarParForm.js'
]

//  end:  Generated for UnimAssTarPar From Template: App.import.js.vm
//  start:  Generated for UnimAssTarThrlevl From Template: App.import.js.vm
,UnimAssTarThrlevlView : [
    	__ctxPath+'/js/unim/UnimAssTarThrlevlView.js',
    	__ctxPath+'/js/unim/UnimAssTarThrlevlForm.js'
]

//  end:  Generated for UnimAssTarThrlevl From Template: App.import.js.vm

,HTGenZongView : [
    	__ctxPath+'/js/dingdan/HTGenZongView.js',
    	__ctxPath+'/js/dingdan/HTGuanBiForm.js',
    	__ctxPath+'/js/dingdan/HTGuiDangForm.js',
    	__ctxPath+'/js/dingdan/HTYanQiForm.js',
    	__ctxPath+'/js/dingdan/HTLuRuForm.js',
    	__ctxPath+'/js/dingdan/HTChuLiForm.js'
    	
],
HTGuiDangView : [
		__ctxPath+'/js/dingdan/HTGuiDangView.js',
    	__ctxPath+'/js/dingdan/HTChuLiForm.js'
	],
HTChaXunView : [
		__ctxPath+'/js/dingdan/HTChaXunView.js',
    	__ctxPath+'/js/dingdan/HTChuLiForm.js'
	],
JHGenZongView : [
	__ctxPath+'/js/dingdan/JHGenZongView.js',
	__ctxPath+'/js/dingdan/BJLuRuForm.js',
	__ctxPath+'/js/dingdan/DDLuRuForm.js',
	__ctxPath+'/js/dingdan/JHGuanBiForm.js',
	__ctxPath+'/js/dingdan/JHZhuanYiForm.js',
	__ctxPath+'/js/dingdan/JHLuRuForm.js',
	__ctxPath+'/js/dingdan/JHChaKanForm.js',
	 __ctxPath + '/js/customer/CustomerDetailForm.js'
	
	],
JHGuanLiView : [
	__ctxPath+'/js/dingdan/JHGuanLiView.js',
	__ctxPath+'/js/dingdan/JHGuanBiForm.js',
	__ctxPath+'/js/dingdan/JHZhuanYiForm.js',
	__ctxPath+'/js/dingdan/JHLuRuForm.js',
	__ctxPath+'/js/dingdan/JHChaKanForm.js',
	 __ctxPath + '/js/customer/CustomerDetailForm.js'
	],	
JHChaXunView : [
	__ctxPath+'/js/dingdan/JHChaXunView.js',
	__ctxPath+'/js/dingdan/JHGuanBiForm.js',
	__ctxPath+'/js/dingdan/JHZhuanYiForm.js',
	__ctxPath+'/js/dingdan/JHChaKanForm.js',
	 __ctxPath + '/js/customer/CustomerDetailForm.js'
	],
BJGenZongView : [
	__ctxPath+'/js/dingdan/BJGenZongView.js',
	__ctxPath+'/js/dingdan/BJLuRuForm.js',
	__ctxPath+'/js/dingdan/HTLuRuForm.js',
	__ctxPath+'/js/dingdan/DDLuRuForm.js',
	__ctxPath+'/js/dingdan/BJChaKanForm.js',
	__ctxPath+'/js/dingdan/BJGuanBiForm.js',
	 __ctxPath + '/js/customer/CustomerDetailForm.js'
	],
BJChaXunView :[
	__ctxPath+'/js/dingdan/BJChaXunView.js',
	__ctxPath+'/js/dingdan/BJChaKanForm.js',
	 __ctxPath + '/js/customer/CustomerDetailForm.js'
	],
DDShenHeView :[
	__ctxPath+'/js/dingdan/DDShenHeView.js',
	__ctxPath+'/js/dingdan/DDShenHeForm.js',
	__ctxPath+'/js/dingdan/DDLuRuForm.js',
	__ctxPath+'/js/dingdan/DDFuWuDanForm.js'
	],
DDgenzongNewView :[
	__ctxPath+'/js/dingdan/DDgenzongNewView.js',
	__ctxPath+'/js/dingdan/DDXuanZeForm.js',
	__ctxPath+'/js/dingdan/DDLuRuForm.js',
	__ctxPath+'/js/dingdan/DDFuWuDanForm.js',
	__ctxPath+'/js/dingdan/DDGuanBiForm.js'
	],
DDHuiFangView : [
	__ctxPath+'/js/dingdan/DDHuiFangView.js',
	__ctxPath+'/js/dingdan/DDHuiFangForm.js',
	__ctxPath+'/js/dingdan/DDLuRuForm.js',
	__ctxPath+'/js/dingdan/DDFuWuDanForm.js',
	__ctxPath+'/js/dingdan/DDHuiFangDetailForm.js',
	 __ctxPath + '/js/customer/CustomerDetailForm.js',
	  __ctxPath + '/js/dingdan/DDhistory.js'
	],
DDChaXunView : [
	__ctxPath+'/js/dingdan/DDChaXunView.js',
	__ctxPath+'/js/dingdan/DDLuRuForm.js',
	__ctxPath+'/js/dingdan/DDFuWuDanForm.js',
	__ctxPath+'/js/dingdan/DDHuiFangForm.js'
	]
,TestUkSysKnowForm :[
	__ctxPath+'/js/know/TestUkSysKnowForm.js'
	],
	TestUkSysKnowShowForm:[__ctxPath+'/js/know/TestUkSysKnowShowForm.js']
	
//  start:  Generated for ShBugRepaire From Template: App.import.js.vm
,ShBugRepaireView : [
    	__ctxPath+'/js/shhq/ShBugRepaireView.js',
    	__ctxPath+'/js/shhq/ShBugRepaireForm.js'
]

//  end:  Generated for ShBugRepaire From Template: App.import.js.vm
//  start:  Generated for ShBugReport From Template: App.import.js.vm
,ShBugReportView : [
    	__ctxPath+'/js/shhq/ShBugReportView.js',
    	__ctxPath+'/js/shhq/ShBugReportForm.js'
]

//  end:  Generated for ShBugReport From Template: App.import.js.vm
//  start:  Generated for ShBugRepStuff From Template: App.import.js.vm
,ShBugRepStuffView : [
    	__ctxPath+'/js/shhq/ShBugRepStuffView.js',
    	__ctxPath+'/js/shhq/ShBugRepStuffForm.js'
]

//  end:  Generated for ShBugRepStuff From Template: App.import.js.vm
//  start:  Generated for ShBuilderAccept From Template: App.import.js.vm
,ShBuilderAcceptView : [
    	__ctxPath+'/js/shhq/ShBuilderAcceptView.js',
    	__ctxPath+'/js/shhq/ShBuilderAcceptForm.js'
]

//  end:  Generated for ShBuilderAccept From Template: App.import.js.vm
//  start:  Generated for ShBuilderApply From Template: App.import.js.vm
,ShBuilderApplyView : [
    	__ctxPath+'/js/shhq/ShBuilderApplyView.js',
    	__ctxPath+'/js/shhq/ShBuilderApplyForm.js'
]

//  end:  Generated for ShBuilderApply From Template: App.import.js.vm
//  start:  Generated for ShBuilderControl From Template: App.import.js.vm
,ShBuilderControlView : [
    	__ctxPath+'/js/shhq/ShBuilderControlView.js',
    	__ctxPath+'/js/shhq/ShBuilderControlForm.js'
]

//  end:  Generated for ShBuilderControl From Template: App.import.js.vm
//  start:  Generated for ShBuilderMethod From Template: App.import.js.vm
,ShBuilderMethodView : [
    	__ctxPath+'/js/shhq/ShBuilderMethodView.js',
    	__ctxPath+'/js/shhq/ShBuilderMethodForm.js'
]

//  end:  Generated for ShBuilderMethod From Template: App.import.js.vm
//  start:  Generated for ShBuilderTime From Template: App.import.js.vm
,ShBuilderTimeView : [
    	__ctxPath+'/js/shhq/ShBuilderTimeView.js',
    	__ctxPath+'/js/shhq/ShBuilderTimeForm.js'
]
,EquipmentView : [
	__ctxPath+'/js/xitong/EquipmentView.js',
	//修改机构部门管理的选择器2015-03-13
	__ctxPath + '/js/selector/BankTypeSelector.js',
	__ctxPath+'/js/xitong/EquipmentForm.js',
	__ctxPath+'/js/selector/EquipmentULempSelector.js'
]

//2014-12-17
		,BankTypeView: [
          	__ctxPath+'/js/customer/BankTypeView.js',	
        	__ctxPath+'/js/customer/BankTypeForm.js'	
        ],
        QJContractRecordView: [
            __ctxPath+'/js/system/QJContractRecordView.js'	
        ],
        QJTransferAccountsView: [
           __ctxPath+'/js/system/QJTransferAccountsView.js'	
        ],
        QJAddCardView: [
           __ctxPath+'/js/system/QJAddCardView.js',
           __ctxPath+'/js/system/QJAddCardForm.js'
        ],
        QJIssueCardView: [
           __ctxPath+'/js/system/QJIssueCardView.js'	
        ],
        QJContractRecord: [
           __ctxPath+'/js/system/QJContractRecord.js',
           __ctxPath+'/js/system/QJContractRecordView.js',
           __ctxPath + '/js/customer/ConHisForm.js'
        ],
        QJPrintReport :  [
            __ctxPath+'/js/system/QJPrintReport.js'	
        ],                 
        ReportSystemView : [
        	__ctxPath + '/js/system/ReportSystemView.js',
            __ctxPath + '/js/system/ReportSystemForm.js'
            
        ]
};