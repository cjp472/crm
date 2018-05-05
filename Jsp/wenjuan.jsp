<%@page pageEncoding="UTF-8"%>
<%@page import="com.htsoft.core.util.AppUtil"%>
<%@page import="com.opensymphony.xwork2.ActionContext"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<html>
	<head>
		<title>系统已有样式表362</title>
		
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/login.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/admin.css" />
	</head>
	<body style="overflow-y:auto">
	<table width="85%" cellspacing="0" cellpadding="0" border="0" align="center">
	<tbody>
	<tr>
	<td height="28" class="hei14b">1.“ZOL/中关村在线”的页面设计，您是否满意？</td></tr>
	<tr>
	<td height="28"><input type="radio" req_hint="请选择１、“ZOL/中关村在线”的页面设计，您是否满意？!" req_type="check" name="q36" value="非常满意" title="１、“ZOL/中关村在线”的页面设计，您是否满意？"> 非常满意 <input type="radio" req_hint="请选择１、“ZOL/中关村在线”的页面设计，您是否满意？!" req_type="check" name="q36" value="满意" title="１、“ZOL/中关村在线”的页面设计，您是否满意？"> 满意 <input type="radio" req_hint="请选择１、“ZOL/中关村在线”的页面设计，您是否满意？!" req_type="check" name="q36" value="一般" title="１、“ZOL/中关村在线”的页面设计，您是否满意？"> 一般 <input type="radio" req_hint="请选择１、“ZOL/中关村在线”的页面设计，您是否满意？!" req_type="check" name="q36" value="不满意" title="１、“ZOL/中关村在线”的页面设计，您是否满意？"> 不满意 &nbsp;</td></tr>
	<tr>
	<td height="28">（请给出您保贵的意见，说明对哪些方面不满，这将有利于我们改进设计，吸引更多网友，增加对您投放广告的点击率）</td></tr>
	<tr>
	<td height="28"><input name="q37" size="60" title="（请给出您保贵的意见，说明对哪些方面不满，这将有利于我们改进设计，吸引更多网友，增加对您投放广告的点" class="tf2"> &nbsp;</td></tr>
	<tr>
	<td height="40" class="hei14b">2.请问您对“ZOL/中关村在线”的页面架构和广告位设置是否了解?</td></tr>
	<tr>
	<td height="28"><input type="radio" req_hint="请选择２、请问您对“ZOL/中关村在线”的页面架构和广告位设置是否了解?!" req_type="check" name="q38" value="非常了解" title="２、请问您对“ZOL/中关村在线”的页面架构和广告位设置是否了解?"> 非常了解 <input type="radio" req_hint="请选择２、请问您对“ZOL/中关村在线”的页面架构和广告位设置是否了解?!" req_type="check" name="q38" value="了解" title="２、请问您对“ZOL/中关村在线”的页面架构和广告位设置是否了解?"> 了解 <input type="radio" req_hint="请选择２、请问您对“ZOL/中关村在线”的页面架构和广告位设置是否了解?!" req_type="check" name="q38" value="不了解" title="２、请问您对“ZOL/中关村在线”的页面架构和广告位设置是否了解?"> 不了解 &nbsp;</td></tr>
	<tr>
	<td height="40" class="hei14b">3.您对我们提供的广告资源了解吗？</td></tr>
	<tr>
	<td height="28"><input type="radio" req_hint="请选择３、您对我们提供的广告资源了解吗？!" req_type="check" name="q39" value="非常了解" title="３、您对我们提供的广告资源了解吗？"> 非常了解 <input type="radio" req_hint="请选择３、您对我们提供的广告资源了解吗？!" req_type="check" name="q39" value="了解" title="３、您对我们提供的广告资源了解吗？"> 了解 <input type="radio" req_hint="请选择３、您对我们提供的广告资源了解吗？!" req_type="check" name="q39" value="不了解" title="３、您对我们提供的广告资源了解吗？"> 不了解 &nbsp;</td></tr>
	<tr>
	<td height="40" class="hei14b">4.您已经选择的广告形式有：（复选）</td></tr>
	<tr>
	<td height="28"><input type="checkbox" req_hint="请选择４、您已经选择的广告形式有：（复选）!" req_type="check" name="q43[]" value="通栏" title="４、您已经选择的广告形式有：（复选）" id="q43"> 通栏 <input type="checkbox" req_hint="请选择４、您已经选择的广告形式有：（复选）!" req_type="check" name="q43[]" value="banner" title="４、您已经选择的广告形式有：（复选）" id="q43"> banner <input type="checkbox" req_hint="请选择４、您已经选择的广告形式有：（复选）!" req_type="check" name="q43[]" value="button" title="４、您已经选择的广告形式有：（复选）" id="q43"> button <input type="checkbox" req_hint="请选择４、您已经选择的广告形式有：（复选）!" req_type="check" name="q43[]" value="文字" title="４、您已经选择的广告形式有：（复选）" id="q43"> 文字 <input type="checkbox" req_hint="请选择４、您已经选择的广告形式有：（复选）!" req_type="check" name="q43[]" value="包装条" title="４、您已经选择的广告形式有：（复选）" id="q43"> 包装条 <input type="checkbox" req_hint="请选择４、您已经选择的广告形式有：（复选）!" req_type="check" name="q43[]" value="对联" title="４、您已经选择的广告形式有：（复选）" id="q43"> 对联 <input type="checkbox" req_hint="请选择４、您已经选择的广告形式有：（复选）!" req_type="check" name="q43[]" value="擎天柱" title="４、您已经选择的广告形式有：（复选）" id="q43"> 擎天柱 <input type="checkbox" req_hint="请选择４、您已经选择的广告形式有：（复选）!" req_type="check" name="q43[]" value="流媒体" title="４、您已经选择的广告形式有：（复选）" id="q43"> 流媒体 <input type="checkbox" req_hint="请选择４、您已经选择的广告形式有：（复选）!" req_type="check" name="q43[]" value="画中画" title="４、您已经选择的广告形式有：（复选）" id="q43"> 画中画 <input type="checkbox" req_hint="请选择４、您已经选择的广告形式有：（复选）!" req_type="check" name="q43[]" value="焦点大图" title="４、您已经选择的广告形式有：（复选）" id="q43"> 焦点大图 <input type="checkbox" req_hint="请选择４、您已经选择的广告形式有：（复选）!" req_type="check" name="q43[]" value="全屏广告" title="４、您已经选择的广告形式有：（复选）" id="q43"> 全屏广告 <input type="checkbox" req_hint="请选择４、您已经选择的广告形式有：（复选）!" req_type="check" name="q43[]" value="背投广告" title="４、您已经选择的广告形式有：（复选）" id="q43"> 背投广告 <input type="checkbox" req_hint="请选择４、您已经选择的广告形式有：（复选）!" req_type="check" name="q43[]" value="下拉半屏广告" title="４、您已经选择的广告形式有：（复选）" id="q43"> 下拉半屏广告 <input type="checkbox" req_hint="请选择４、您已经选择的广告形式有：（复选）!" req_type="check" name="q43[]" value="视频广告" title="４、您已经选择的广告形式有：（复选）" id="q43"> 视频广告&nbsp;</td></tr>
	<tr>
	<td height="40" class="hei14b">5.您还想选择的广告形式有：（复选）</td></tr>
	<tr>
	<td height="28"><input type="checkbox" req_hint="请选择５、您还想选择的广告形式有：（复选）!" req_type="check" name="q45[]" value="通栏" title="５、您还想选择的广告形式有：（复选）" id="q45"> 通栏 <input type="checkbox" req_hint="请选择５、您还想选择的广告形式有：（复选）!" req_type="check" name="q45[]" value="banner" title="５、您还想选择的广告形式有：（复选）" id="q45"> banner <input type="checkbox" req_hint="请选择５、您还想选择的广告形式有：（复选）!" req_type="check" name="q45[]" value="button" title="５、您还想选择的广告形式有：（复选）" id="q45"> button <input type="checkbox" req_hint="请选择５、您还想选择的广告形式有：（复选）!" req_type="check" name="q45[]" value="文字" title="５、您还想选择的广告形式有：（复选）" id="q45"> 文字 <input type="checkbox" req_hint="请选择５、您还想选择的广告形式有：（复选）!" req_type="check" name="q45[]" value="包装条" title="５、您还想选择的广告形式有：（复选）" id="q45"> 包装条 <input type="checkbox" req_hint="请选择５、您还想选择的广告形式有：（复选）!" req_type="check" name="q45[]" value="对联" title="５、您还想选择的广告形式有：（复选）" id="q45"> 对联 <input type="checkbox" req_hint="请选择５、您还想选择的广告形式有：（复选）!" req_type="check" name="q45[]" value="擎天柱" title="５、您还想选择的广告形式有：（复选）" id="q45"> 擎天柱 <input type="checkbox" req_hint="请选择５、您还想选择的广告形式有：（复选）!" req_type="check" name="q45[]" value="流媒体" title="５、您还想选择的广告形式有：（复选）" id="q45"> 流媒体 <input type="checkbox" req_hint="请选择５、您还想选择的广告形式有：（复选）!" req_type="check" name="q45[]" value="画中画" title="５、您还想选择的广告形式有：（复选）" id="q45"> 画中画 <input type="checkbox" req_hint="请选择５、您还想选择的广告形式有：（复选）!" req_type="check" name="q45[]" value="焦点大图" title="５、您还想选择的广告形式有：（复选）" id="q45"> 焦点大图 <input type="checkbox" req_hint="请选择５、您还想选择的广告形式有：（复选）!" req_type="check" name="q45[]" value="全屏广告" title="５、您还想选择的广告形式有：（复选）" id="q45"> 全屏广告 <input type="checkbox" req_hint="请选择５、您还想选择的广告形式有：（复选）!" req_type="check" name="q45[]" value="背投广告" title="５、您还想选择的广告形式有：（复选）" id="q45"> 背投广告 <input type="checkbox" req_hint="请选择５、您还想选择的广告形式有：（复选）!" req_type="check" name="q45[]" value="下拉半屏广告" title="５、您还想选择的广告形式有：（复选）" id="q45"> 下拉半屏广告 <input type="checkbox" req_hint="请选择５、您还想选择的广告形式有：（复选）!" req_type="check" name="q45[]" value="视频广告" title="５、您还想选择的广告形式有：（复选）" id="q45"> 视频广告 &nbsp;</td></tr>
	<tr>
	<td height="40" class="hei14b">6.您觉得“ZOL/中关村在线”广告资源开发的是否令您满意？</td></tr>
	<tr>
	<td height="28"><input type="radio" req_hint="请选择６、您觉得“ZOL/中关村在线”广告资源开发的是否令您满意？!" req_type="check" name="q46" value="非常满意" title="６、您觉得“ZOL/中关村在线”广告资源开发的是否令您满意？"> 非常满意 <input type="radio" req_hint="请选择６、您觉得“ZOL/中关村在线”广告资源开发的是否令您满意？!" req_type="check" name="q46" value="满意" title="６、您觉得“ZOL/中关村在线”广告资源开发的是否令您满意？"> 满意 <input type="radio" req_hint="请选择６、您觉得“ZOL/中关村在线”广告资源开发的是否令您满意？!" req_type="check" name="q46" value="一般" title="６、您觉得“ZOL/中关村在线”广告资源开发的是否令您满意？"> 一般 <input type="radio" req_hint="请选择６、您觉得“ZOL/中关村在线”广告资源开发的是否令您满意？!" req_type="check" name="q46" value="不满意" title="６、您觉得“ZOL/中关村在线”广告资源开发的是否令您满意？"> 不满意 &nbsp;</td></tr>
	<tr>
	<td height="28">（您还需要什么样的资源，我们会尽力实现）</td></tr>
	<tr>
	<td height="28"><input name="q47" size="60" title="（您还需要什么样的资源，我们会尽力实现）" class="tf2"> &nbsp;</td></tr>
	<tr>
	<td height="40" class="hei14b">7.您在“ZOL/中关村在线”的广告投放量占您全年广告投放量的多少？</td></tr>
	<tr>
	<td height="28"><input type="radio" req_hint="请选择７、您在“ZOL/中关村在线”的广告投放量占您全年广告投放量的多少？!" req_type="check" name="q48" value="８０%以上" title="７、您在“ZOL/中关村在线”的广告投放量占您全年广告投放量的多少？"> ８０%以上 <input type="radio" req_hint="请选择７、您在“ZOL/中关村在线”的广告投放量占您全年广告投放量的多少？!" req_type="check" name="q48" value="５０%－８０%" title="７、您在“ZOL/中关村在线”的广告投放量占您全年广告投放量的多少？"> ５０%－８０% <input type="radio" req_hint="请选择７、您在“ZOL/中关村在线”的广告投放量占您全年广告投放量的多少？!" req_type="check" name="q48" value="２０%－５０%" title="７、您在“ZOL/中关村在线”的广告投放量占您全年广告投放量的多少？"> ２０%－５０% <input type="radio" req_hint="请选择７、您在“ZOL/中关村在线”的广告投放量占您全年广告投放量的多少？!" req_type="check" name="q48" value="不到２０%" title="７、您在“ZOL/中关村在线”的广告投放量占您全年广告投放量的多少？"> 不到２０% &nbsp;</td></tr>
	<tr>
	<td height="40" class="hei14b">8.您认为“ZOL/中关村在线”的销售人员的业务素质如何？</td></tr>
	<tr>
	<td height="28"><input type="radio" req_hint="请选择８、您认为“ZOL/中关村在线”的销售人员的业务素质如何？!" req_type="check" name="q49" value="非常专业" title="８、您认为“ZOL/中关村在线”的销售人员的业务素质如何？"> 非常专业 <input type="radio" req_hint="请选择８、您认为“ZOL/中关村在线”的销售人员的业务素质如何？!" req_type="check" name="q49" value="专业" title="８、您认为“ZOL/中关村在线”的销售人员的业务素质如何？"> 专业 <input type="radio" req_hint="请选择８、您认为“ZOL/中关村在线”的销售人员的业务素质如何？!" req_type="check" name="q49" value="一般" title="８、您认为“ZOL/中关村在线”的销售人员的业务素质如何？"> 一般 <input type="radio" req_hint="请选择８、您认为“ZOL/中关村在线”的销售人员的业务素质如何？!" req_type="check" name="q49" value="不专业" title="８、您认为“ZOL/中关村在线”的销售人员的业务素质如何？"> 不专业 &nbsp;</td></tr>
	<tr>
	<td height="40" class="hei14b">9.您和我们的销售人员的个人情感能概括为以下哪种？</td></tr>
	<tr>
	<td height="28"><input type="radio" req_hint="请选择９、您和我们的销售人员的个人情感能概括为以下哪种？!" req_type="check" name="q50" value="知心朋友" title="９、您和我们的销售人员的个人情感能概括为以下哪种？"> 知心朋友 <input type="radio" req_hint="请选择９、您和我们的销售人员的个人情感能概括为以下哪种？!" req_type="check" name="q50" value="朋友" title="９、您和我们的销售人员的个人情感能概括为以下哪种？"> 朋友 <input type="radio" req_hint="请选择９、您和我们的销售人员的个人情感能概括为以下哪种？!" req_type="check" name="q50" value="良好的商业伙伴&#12288;" title="９、您和我们的销售人员的个人情感能概括为以下哪种？"> 良好的商业伙伴&#12288; <input type="radio" req_hint="请选择９、您和我们的销售人员的个人情感能概括为以下哪种？!" req_type="check" name="q50" value="能不见就不见" title="９、您和我们的销售人员的个人情感能概括为以下哪种？"> 能不见就不见 &nbsp;</td></tr>
	<tr>
	<td height="40" class="hei14b">10.我们的销售人员是否会站在您的立场上给您建议？</td></tr>
	<tr>
	<td height="28"><input type="radio" req_hint="请选择１０、我们的销售人员是否会站在您的立场上给您建议!" req_type="check" name="q51" value="总是如此" title="１０、我们的销售人员是否会站在您的立场上给您建议"> 总是如此 <input type="radio" req_hint="请选择１０、我们的销售人员是否会站在您的立场上给您建议!" req_type="check" name="q51" value="一般情况下" title="１０、我们的销售人员是否会站在您的立场上给您建议"> 一般情况下 <input type="radio" req_hint="请选择１０、我们的销售人员是否会站在您的立场上给您建议!" req_type="check" name="q51" value="很少" title="１０、我们的销售人员是否会站在您的立场上给您建议"> 很少 <input type="radio" req_hint="请选择１０、我们的销售人员是否会站在您的立场上给您建议!" req_type="check" name="q51" value="从来没有" title="１０、我们的销售人员是否会站在您的立场上给您建议"> 从来没有 &nbsp;</td></tr>
	<tr>
	<td height="40" class="hei14b">11.您对本公司销售人员精神面貌的综合评价是：（复选）</td></tr>
	<tr>
	<td height="28"><input type="checkbox" req_hint="请选择１１、您对本公司销售人员精神面貌的综合评价是：（复选）!" req_type="check" name="q52[]" value="诚信" title="１１、您对本公司销售人员精神面貌的综合评价是：（复选）" id="q52"> 诚信 <input type="checkbox" req_hint="请选择１１、您对本公司销售人员精神面貌的综合评价是：（复选）!" req_type="check" name="q52[]" value="热情" title="１１、您对本公司销售人员精神面貌的综合评价是：（复选）" id="q52"> 热情 <input type="checkbox" req_hint="请选择１１、您对本公司销售人员精神面貌的综合评价是：（复选）!" req_type="check" name="q52[]" value="友善" title="１１、您对本公司销售人员精神面貌的综合评价是：（复选）" id="q52"> 友善 <input type="checkbox" req_hint="请选择１１、您对本公司销售人员精神面貌的综合评价是：（复选）!" req_type="check" name="q52[]" value="高效" title="１１、您对本公司销售人员精神面貌的综合评价是：（复选）" id="q52"> 高效 <input type="checkbox" req_hint="请选择１１、您对本公司销售人员精神面貌的综合评价是：（复选）!" req_type="check" name="q52[]" value="懒散" title="１１、您对本公司销售人员精神面貌的综合评价是：（复选）" id="q52"> 懒散 <input type="checkbox" req_hint="请选择１１、您对本公司销售人员精神面貌的综合评价是：（复选）!" req_type="check" name="q52[]" value="消极" title="１１、您对本公司销售人员精神面貌的综合评价是：（复选）" id="q52"> 消极 <input type="checkbox" req_hint="请选择１１、您对本公司销售人员精神面貌的综合评价是：（复选）!" req_type="check" name="q52[]" value="浮躁" title="１１、您对本公司销售人员精神面貌的综合评价是：（复选）" id="q52"> 浮躁 <input type="checkbox" req_hint="请选择１１、您对本公司销售人员精神面貌的综合评价是：（复选）!" req_type="check" name="q52[]" value="冷漠" title="１１、您对本公司销售人员精神面貌的综合评价是：（复选）" id="q52"> 冷漠 &nbsp;</td></tr>
	<tr>
	<td height="40" class="hei14b">12.您对我们的售后服务满意吗？</td></tr>
	<tr>
	<td height="28"><input type="radio" req_hint="请选择１２、您对我们的售后服务满意吗？!" req_type="check" name="q53" value="非常满意" title="１２、您对我们的售后服务满意吗？"> 非常满意 <input type="radio" req_hint="请选择１２、您对我们的售后服务满意吗？!" req_type="check" name="q53" value="满意" title="１２、您对我们的售后服务满意吗？"> 满意 <input type="radio" req_hint="请选择１２、您对我们的售后服务满意吗？!" req_type="check" name="q53" value="一般" title="１２、您对我们的售后服务满意吗？"> 一般 <input type="radio" req_hint="请选择１２、您对我们的售后服务满意吗？!" req_type="check" name="q53" value="不满意" title="１２、您对我们的售后服务满意吗？"> 不满意 &nbsp;</td></tr>
	<tr>
	<td height="40">（请给出您保贵的意见，说明对那些方面不满）</td></tr>
	<tr>
	<td height="28"><input name="q54" size="60" title="（请给出您保贵的意见，说明对那些方面不满）" class="tf2"> &nbsp;</td></tr>
	<tr>
	<td height="40" class="hei14b">13.我们的销售、客服人员是否对您进行过售后回访？</td></tr>
	<tr>
	<td height="28"><input type="radio" req_hint="请选择１３、我们的销售、客服人员是否对您进行过售后回访？!" req_type="check" name="q55" value="经常" title="１３、我们的销售、客服人员是否对您进行过售后回访？"> 经常 <input type="radio" req_hint="请选择１３、我们的销售、客服人员是否对您进行过售后回访？!" req_type="check" name="q55" value="不经常" title="１３、我们的销售、客服人员是否对您进行过售后回访？"> 不经常 <input type="radio" req_hint="请选择１３、我们的销售、客服人员是否对您进行过售后回访？!" req_type="check" name="q55" value="根本没有" title="１３、我们的销售、客服人员是否对您进行过售后回访？"> 根本没有 &nbsp;</td></tr>
	<tr>
	<td height="40" class="hei14b">14.您认为本公司处理您提出的问题、需求的响应时间如何？</td></tr>
	<tr>
	<td height="28"><input type="radio" req_hint="请选择１４、您认为本公司处理您提出的问题、需求的响应时间如何？!" req_type="check" name="q56" value="非常及时" title="１４、您认为本公司处理您提出的问题、需求的响应时间如何？"> 非常及时 <input type="radio" req_hint="请选择１４、您认为本公司处理您提出的问题、需求的响应时间如何？!" req_type="check" name="q56" value="及时" title="１４、您认为本公司处理您提出的问题、需求的响应时间如何？"> 及时 <input type="radio" req_hint="请选择１４、您认为本公司处理您提出的问题、需求的响应时间如何？!" req_type="check" name="q56" value="不够及时" title="１４、您认为本公司处理您提出的问题、需求的响应时间如何？"> 不够及时 <input type="radio" req_hint="请选择１４、您认为本公司处理您提出的问题、需求的响应时间如何？!" req_type="check" name="q56" value="非常慢" title="１４、您认为本公司处理您提出的问题、需求的响应时间如何？"> 非常慢 &nbsp;</td></tr>
	<tr>
	<td height="40" class="hei14b">15.您对本公司在服务过程中出现问题后的处理流程的评价是（复选）</td></tr>
	<tr>
	<td height="28"><input type="checkbox" req_hint="请选择１５、您对本公司在服务过程中出现问题后的处理流程的评价是（复选）!" req_type="check" name="q57[]" value="专业" title="１５、您对本公司在服务过程中出现问题后的处理流程的评价是（复选）" id="q57"> 专业 <input type="checkbox" req_hint="请选择１５、您对本公司在服务过程中出现问题后的处理流程的评价是（复选）!" req_type="check" name="q57[]" value="顺畅" title="１５、您对本公司在服务过程中出现问题后的处理流程的评价是（复选）" id="q57"> 顺畅 <input type="checkbox" req_hint="请选择１５、您对本公司在服务过程中出现问题后的处理流程的评价是（复选）!" req_type="check" name="q57[]" value="公正" title="１５、您对本公司在服务过程中出现问题后的处理流程的评价是（复选）" id="q57"> 公正 <input type="checkbox" req_hint="请选择１５、您对本公司在服务过程中出现问题后的处理流程的评价是（复选）!" req_type="check" name="q57[]" value="尊重" title="１５、您对本公司在服务过程中出现问题后的处理流程的评价是（复选）" id="q57"> 尊重 <input type="checkbox" req_hint="请选择１５、您对本公司在服务过程中出现问题后的处理流程的评价是（复选）!" req_type="check" name="q57[]" value="谨慎" title="１５、您对本公司在服务过程中出现问题后的处理流程的评价是（复选）" id="q57"> 谨慎 <input type="checkbox" req_hint="请选择１５、您对本公司在服务过程中出现问题后的处理流程的评价是（复选）!" req_type="check" name="q57[]" value="敷衍" title="１５、您对本公司在服务过程中出现问题后的处理流程的评价是（复选）" id="q57"> 敷衍 <input type="checkbox" req_hint="请选择１５、您对本公司在服务过程中出现问题后的处理流程的评价是（复选）!" req_type="check" name="q57[]" value="拖沓" title="１５、您对本公司在服务过程中出现问题后的处理流程的评价是（复选）" id="q57"> 拖沓 <input type="checkbox" req_hint="请选择１５、您对本公司在服务过程中出现问题后的处理流程的评价是（复选）!" req_type="check" name="q57[]" value="偏私" title="１５、您对本公司在服务过程中出现问题后的处理流程的评价是（复选）" id="q57"> 偏私 &nbsp;</td></tr>
	<tr>
	<td height="40" class="hei14b">16.您感觉我们的服务有待改进的地方是：（复选）</td></tr>
	<tr>
	<td height="28"><input type="checkbox" req_hint="请选择１６、您感觉我们的服务有待改进的地方是：（复选）!" req_type="check" name="q58[]" value="服务方便性" title="１６、您感觉我们的服务有待改进的地方是：（复选）" id="q58"> 服务方便性 <input type="checkbox" req_hint="请选择１６、您感觉我们的服务有待改进的地方是：（复选）!" req_type="check" name="q58[]" value="服务响应速度" title="１６、您感觉我们的服务有待改进的地方是：（复选）" id="q58"> 服务响应速度 <input type="checkbox" req_hint="请选择１６、您感觉我们的服务有待改进的地方是：（复选）!" req_type="check" name="q58[]" value="服务态度" title="１６、您感觉我们的服务有待改进的地方是：（复选）" id="q58"> 服务态度 <input type="checkbox" req_hint="请选择１６、您感觉我们的服务有待改进的地方是：（复选）!" req_type="check" name="q58[]" value="服务效果" title="１６、您感觉我们的服务有待改进的地方是：（复选）" id="q58"> 服务效果 <input type="checkbox" req_hint="请选择１６、您感觉我们的服务有待改进的地方是：（复选）!" req_type="check" name="q58[]" value="服务水平" title="１６、您感觉我们的服务有待改进的地方是：（复选）" id="q58"> 服务水平 <input type="checkbox" req_hint="请选择１６、您感觉我们的服务有待改进的地方是：（复选）!" req_type="check" name="q58[]" value="其他" title="１６、您感觉我们的服务有待改进的地方是：（复选）" id="q58"> 其他 &nbsp;</td></tr>
	<tr>
	<td height="40">您的建议：</td></tr>
	<tr>
	<td height="28"><input name="q59" size="60" title="您的建议：" class="tf2"> &nbsp;</td></tr>
	<tr>
	<td height="40" class="hei14b">17.您知道本公司有一部对网友服务的热线“400-678-0068”吗？</td></tr>
	<tr>
	<td height="28"><input type="radio" req_hint="请选择１７、您知道本公司有一部对网友服务的热线“400-678-0068”吗？!" req_type="check" name="q60" value="知道" title="１７、您知道本公司有一部对网友服务的热线“400-678-0068”吗？"> 知道 <input type="radio" req_hint="请选择１７、您知道本公司有一部对网友服务的热线“400-678-0068”吗？!" req_type="check" name="q60" value="不知道" title="１７、您知道本公司有一部对网友服务的热线“400-678-0068”吗？"> 不知道&nbsp;</td></tr>
	<tr>
	<td height="40" class="hei14b">18.是否有网友通过我们的这部热线找到你们？</td></tr>
	<tr>
	<td height="28"><input type="radio" req_hint="请选择１８、是否有网友通过我们的这部热线找到你们？!" req_type="check" name="q61" value="经常" title="１８、是否有网友通过我们的这部热线找到你们？"> 经常 <input type="radio" req_hint="请选择１８、是否有网友通过我们的这部热线找到你们？!" req_type="check" name="q61" value="偶尔" title="１８、是否有网友通过我们的这部热线找到你们？"> 偶尔 <input type="radio" req_hint="请选择１８、是否有网友通过我们的这部热线找到你们？!" req_type="check" name="q61" value="不清楚" title="１８、是否有网友通过我们的这部热线找到你们？"> 不清楚 <input type="radio" req_hint="请选择１８、是否有网友通过我们的这部热线找到你们？!" req_type="check" name="q61" value="没有" title="１８、是否有网友通过我们的这部热线找到你们？"> 没有 &nbsp;</td></tr>
	<tr>
	<td height="40" class="hei14b">19.您对“ZOL/中关村在线”最满意的部分是（复选）</td></tr>
	<tr>
	<td height="28"><input type="checkbox" req_hint="请选择１９、您对“ZOL/中关村在线”最满意的部分是（复选）!" req_type="check" name="q62[]" value="网站建设及开发" title="１９、您对“ZOL/中关村在线”最满意的部分是（复选）" id="q62"> 网站建设及开发 <input type="checkbox" req_hint="请选择１９、您对“ZOL/中关村在线”最满意的部分是（复选）!" req_type="check" name="q62[]" value="销售人员" title="１９、您对“ZOL/中关村在线”最满意的部分是（复选）" id="q62"> 销售人员 <input type="checkbox" req_hint="请选择１９、您对“ZOL/中关村在线”最满意的部分是（复选）!" req_type="check" name="q62[]" value="服务态度" title="１９、您对“ZOL/中关村在线”最满意的部分是（复选）" id="q62"> 服务态度 <input type="checkbox" req_hint="请选择１９、您对“ZOL/中关村在线”最满意的部分是（复选）!" req_type="check" name="q62[]" value="业务流程" title="１９、您对“ZOL/中关村在线”最满意的部分是（复选）" id="q62"> 业务流程 <input type="checkbox" req_hint="请选择１９、您对“ZOL/中关村在线”最满意的部分是（复选）!" req_type="check" name="q62[]" value="整合营销" title="１９、您对“ZOL/中关村在线”最满意的部分是（复选）" id="q62"> 整合营销 <input type="checkbox" req_hint="请选择１９、您对“ZOL/中关村在线”最满意的部分是（复选）!" req_type="check" name="q62[]" value="服务质量" title="１９、您对“ZOL/中关村在线”最满意的部分是（复选）" id="q62"> 服务质量 <input type="checkbox" req_hint="请选择１９、您对“ZOL/中关村在线”最满意的部分是（复选）!" req_type="check" name="q62[]" value="服务的跟踪处理" title="１９、您对“ZOL/中关村在线”最满意的部分是（复选）" id="q62"> 服务的跟踪处理 <input type="checkbox" req_hint="请选择１９、您对“ZOL/中关村在线”最满意的部分是（复选）!" req_type="check" name="q62[]" value="投诉处理状况" title="１９、您对“ZOL/中关村在线”最满意的部分是（复选）" id="q62"> 投诉处理状况 <input type="checkbox" req_hint="请选择１９、您对“ZOL/中关村在线”最满意的部分是（复选）!" req_type="check" name="q62[]" value="解决问题速度" title="１９、您对“ZOL/中关村在线”最满意的部分是（复选）" id="q62"> 解决问题速度 &nbsp;</td></tr>
	<tr>
	<td height="40" class="hei14b">20.您对“ZOL/中关村在线”最不满意的部分是（复选）</td></tr>
	<tr>
	<td height="28"><input type="checkbox" req_hint="请选择２０、您对“ZOL/中关村在线”最不满意的部分是（复选）!" req_type="check" name="q63[]" value="网站建设及开发" title="２０、您对“ZOL/中关村在线”最不满意的部分是（复选）" id="q63"> 网站建设及开发 <input type="checkbox" req_hint="请选择２０、您对“ZOL/中关村在线”最不满意的部分是（复选）!" req_type="check" name="q63[]" value="销售人员" title="２０、您对“ZOL/中关村在线”最不满意的部分是（复选）" id="q63"> 销售人员 <input type="checkbox" req_hint="请选择２０、您对“ZOL/中关村在线”最不满意的部分是（复选）!" req_type="check" name="q63[]" value="服务态度" title="２０、您对“ZOL/中关村在线”最不满意的部分是（复选）" id="q63"> 服务态度 <input type="checkbox" req_hint="请选择２０、您对“ZOL/中关村在线”最不满意的部分是（复选）!" req_type="check" name="q63[]" value="业务流程" title="２０、您对“ZOL/中关村在线”最不满意的部分是（复选）" id="q63"> 业务流程 <input type="checkbox" req_hint="请选择２０、您对“ZOL/中关村在线”最不满意的部分是（复选）!" req_type="check" name="q63[]" value="整合营销" title="２０、您对“ZOL/中关村在线”最不满意的部分是（复选）" id="q63"> 整合营销 <input type="checkbox" req_hint="请选择２０、您对“ZOL/中关村在线”最不满意的部分是（复选）!" req_type="check" name="q63[]" value="服务质量" title="２０、您对“ZOL/中关村在线”最不满意的部分是（复选）" id="q63"> 服务质量 <input type="checkbox" req_hint="请选择２０、您对“ZOL/中关村在线”最不满意的部分是（复选）!" req_type="check" name="q63[]" value="服务的跟踪处理" title="２０、您对“ZOL/中关村在线”最不满意的部分是（复选）" id="q63"> 服务的跟踪处理 <input type="checkbox" req_hint="请选择２０、您对“ZOL/中关村在线”最不满意的部分是（复选）!" req_type="check" name="q63[]" value="投诉处理状况" title="２０、您对“ZOL/中关村在线”最不满意的部分是（复选）" id="q63"> 投诉处理状况 <input type="checkbox" req_hint="请选择２０、您对“ZOL/中关村在线”最不满意的部分是（复选）!" req_type="check" name="q63[]" value="解决问题速度" title="２０、您对“ZOL/中关村在线”最不满意的部分是（复选）" id="q63"> 解决问题速度&nbsp;</td></tr>
	<tr>
	<td height="40" class="hei14b">21.您对“ZOL/中关村在线”客户服务的建议或意见？（您的意见和建议对我们非常重要！）</td></tr>
	<tr>
	<td height="28"><input req_hint="请正确填写２１、您对“ZOL/中关村在线”客户服务的建议或意见？（您的意见和建议对我们非常重要！）!" req_type="char" name="q64" size="60" title="２１、您对“ZOL/中关村在线”客户服务的建议或意见？（您的意见和建议对我们非常重要！）" class="tf2"> &nbsp;</td></tr>
	<tr>
	<td height="40" class="hei14b">22.您对“ZOL/中关村在线”的评价和需求？（您的评价和需求有助于我们提高服务质量，帮肋您更快更好的创造财富）</td></tr>
	<tr>
	<td height="28"><input req_hint="请正确填写２２、您对“ZOL/中关村在线”的评价和需求？（您的评价和需求有助于我们提高服务质量，帮肋您更快更好的创造财富）!" req_type="char" name="q65" size="60" title="２２、您对“ZOL/中关村在线”的评价和需求？（您的评价和需求有助于我们提高服务质量，帮肋您更快更好的创" class="tf2"> &nbsp;</td></tr>
	<tr>
	<td>&nbsp;</td></tr>
	<tr>
	<td>&#12288;&#12288;到此，您已经填完了整张问卷，我们再次衷心的感谢您对我们网站的支持。我们一定会根据您对我们的意见和建议，把我们对您的服务做得更好。愿我们能陪伴您在事业上取得更大的成就！</td></tr>
	<tr>
	<td height="50" align="center"><input type="hidden" name="surveyid" value="556"> <input type="hidden" name="q_num" value="65"> <input type="submit" name="submit" value="提交"> &nbsp;&nbsp;<input type="reset" name="reset" value="重写">&nbsp;</td></tr></tbody></table>
	</body>
</html>