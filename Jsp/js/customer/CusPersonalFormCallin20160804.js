﻿//二期修改章程内容  赋值给成员变量  （以便动态显示不同章程）
var textCont_PY = "A",textCont_SJ = "B",textCont_call = "C",textCont_qucall = "D",textCont_YB = "E",textCont_EM = "F",textCont_DW = "J",textCont_XX = "H";
//开卡章程
var OpenCardBus = "<div style='overflow-y:auto;line-height:28px'>第一条 北京银行股份有限公司（下称“本行”）为发展银行卡业务，规范本行与借记卡持卡人及其他相关当事方的权利义务关系，根据相关法律法规，制定本章程。办理本行借记卡业务的本行分支机构、与本行借记卡业务有关的特约商户及其他合作单位、借记卡的申请人及其代办机构和代办人、借记卡的持卡人均须遵守本章程。北京银行借记卡系列下的各卡种，若根据需要特别订立自有章程的，应同时受自有章程及本章程的规范。"
					+ "<br>第二条 本章程所称借记卡是本行面向个人客户发行的没有透支功能，需先存款后才能进行消费、取现等行为的银行卡。联名（认同）借记卡是本行与联名单位合作发行的借记卡。主题借记卡是发卡银行针对特定客户群发行、具有一定主题内涵的借记卡。"
					+ "<br>第三条 借记卡按卡片介质分为磁条卡和芯片卡，其中，芯片卡按是否带有磁条分为磁条芯片复合卡和纯芯片卡，按读取方式分为接触式芯片卡、非接触式芯片卡以及双界面芯片卡。借记卡按客户类型分为京卡借记卡、京卡郁金香卡、京卡贵宾卡、京卡名士卡等卡种。"
					+ "<br>第四条 本行根据客户类型向不同卡种持卡人提供相应的增值服务，联名（认同）卡借记卡持卡人还可享受联名单位提供的附加服务。"
					+ "<br>第五条 凡符合本行确定及不时调整的申领条件的个人，均可申办借记卡。申请人申办借记卡时，应到本行指定的分支机构办理申办手续，应使用实名，填写并提交申请表，并向本行提供个人身份信息、身份证明文件以及本行要求提供的其他信息、文件和材料；申请人保证其所提供的上述申请表和信息、文件、材料均真实、完整、合法且有效。申请人委托他人代为申办借记卡的，应当经本行同意，并且除须提供上述申请人需提供的资料外，还应当提供经本行认可的授权文件、代办人的身份信息、身份证明文件以及本行要求提供的其他信息、文件和资料。申请人和代办人共同保证代办人提供的全部信息、文件和材料均真实、完整、合法且有效。对于采取单位批量开卡方式办理借记卡的，单位应对员工身份的真实性承担责任，且须员工本人按照北京银行规定办理激活手续。申请联名（认同）卡时，还应遵守联名单位的相关规定。本行有权对持卡人申领规则进行限制，并可酌情调整限制规则。"
					+ "<br>第六条 为满足银行风险管理的需要，或为核实申请人、代办人或持卡人的身份信息之目的，本行可向有关方面查询、了解、收集与上述人士的身份或风险有关的信息。本行根据审核结果自主决定是否核准同意发卡，无论最终是否核准发卡及卡账户是否终止使用，有关申请资料信息均不予退还。本行对于申请人、代办人、持卡人的个人隐私和商业秘密将依法予以保密（但本章程另有规定的，以及依照中国法令的规定或者司法/行政机关、征信机构、本行股票/债券上市的证券交易所的要求而进行查询或做出适当披露的情形除外）。"
					+ "<br>第七条 办卡申请经本行核准同意后，申请人（或其代办人）应在签收时检查借记卡卡片的完好性，有密码函的还应检查密码函的完好性，对于破损的借记卡卡片或者发生破损、已被拆封、密封不完全等不安全现象的密码函申请人（或其代办人）有权且应当拒收。"
					+ "<br>第八条 申请人收到借记卡后，应立即在卡片背面的签名栏签名（无签名栏卡种除外）并妥善保管，需要持卡人进行银行卡交易的签字确认时，持卡人应以相同式样签名进行签署确认。同时，持卡人均应在收到银行卡卡片后，立即通过本行提供的渠道设置支付密码及电子银行密码；在密码设置完成前，持卡人不应使用卡片进行资金收付或其他交易，否则由此引起的损失和不利后果由持卡人承担。"
					+ "<br>第九条 借记卡（纯电子现金芯片卡除外）卡内包含人民币活期结算账户，并可开立人民币定期储蓄账户、外币活期和定期储蓄账户，具有人民币的储蓄、消费、转账结算、现金存取、账户余额查询及外币的储蓄等功能。卡内存款（芯片卡电子现金除外）按照本行依法确定的存款利率和计息办法计付存款利息，本行有权依法代扣代缴利息税。持卡人应确保存入卡账户的资金是其个人的合法收入或是属于其个人可以合法持有的资金。借记卡不允许透支，持卡人须在账户中足额存入款项后方可进行消费、提现、转账等交易。持卡人与特约商户、收单机构或/及银行卡交易涉及的其他当事人发生交易纠纷时，应由持卡人自行解决，本行不承担法律责任。"
					+ "<br>第十条 磁条卡不设有效期，芯片卡有效期以卡面记载的有效期为准。持卡人使用消费功能（芯片卡电子现金交易除外）在适用区域内消费交易确认时，需要输入其支付密码并在交易凭证上签名。特约商户及本行核验签字时按照行业通行的一般识别标准执行。"
					+ "<br>第十一条 持卡人可持具备电子现金功能的芯片卡办理电子现金业务，电子现金业务是指本行根据持卡人要求将现金或账户存款转至芯片内储存，交易时直接从芯片内扣款的业务，芯片卡电子现金视同现金管理，不计息，不挂失，电子现金账户仅支持人民币结算，余额上限遵循监管机构相关规定。电子现金不设交易密码，凡使用芯片卡电子现金进行的交易均视为持卡人本人所为，持卡人因芯片卡保管不善造成的损失，北京银行不承担责任。"
					+ "<br>第十二条 持卡人可以现金或转账方式向" +
					"芯片卡电子现金账户圈存资金。芯片卡电子现金账户内的资金只可用于小额脱机消费，在消费时不需要提供密码。电子现金账户内的资金交易不可以撤销。"
					+ "<br>第十三条 带有“银联”等银行卡组织标识的借记卡，可使用该银行卡组织的相关服务。持卡人在带有“银联”等银行卡组织标识的机具上进行消费、取现及其它交易时，须遵守中国银联等银行卡组织、本行、收单银行的有关规定。使用联名（认同）借记卡时还应遵守联名单位的相关规定。"
					+ "<br>第十四条 借记卡只限本人使用，不得转借、转让、出租或以其他方式供他人使用。持卡人仅可将卡片和账户用于本行以及中国银联等银行卡组织允许的合法及正当交易，且须遵守本行有关借记卡或个人银行结算账户的业务管理规定、中国法令以及使用地的法律法规，不得利用卡片或账户进行或协助他人进行洗钱、恐怖融资或其他非法活动；对于本行有合理理由怀疑涉及洗钱、恐怖融资或其他非法活动的交易，本行有权暂缓处理、拒绝处理或撤销已处理的交易，持卡人应积极配合本行的相关调查。"
					+ "<br>第十五条 持卡人凭卡在自助机具上办理业务时，因操作失误或机器故障等任何原因造成吞卡的，持卡人应立即与自助机具所属银行联系并在该行要求的期限内（本行自助机具吞卡的应在磁条卡吞卡日起七日内、芯片卡吞卡日起二十日内）到该行办理领卡手续，逾期未领的，该行（本行自助机具吞卡的情况下为本行）有权自行处理卡片；除本行存在故意或重大过失的情形以外，因持卡人遗忘等任何原因造成卡片被他人利用的，其损失和不利后果由持卡人承担。"
					+ "<br>第十六条 为控制风险之目的，本行有权对持卡人在一定时间内通过特定渠道进行特定类别交易的次数或/及最高金额进行限制，并可酌情调整限制规则；具体以届时本行公布施行的为准。"
					+ "<br>第十七条 持卡人使用、更换、挂失、注销卡片以及开立账户、撤销账户、使用账户办理业务时，应遵守本行的业务规定并按本行规定标准缴纳有关费用，本行可自行从持卡人的账户中扣收持卡人应缴费用。"
					+ "<br>申请更换或注销卡片时如芯片损坏，原卡电子现金账户资金30天后转入主帐户中。"
					+ "<br>第十八条 持卡人持有或使用借记卡而已经形成的债权债务关系不因卡片的毁损、更换、收回或销户而消灭或改变。"
					+ "<br>第十九条 凡使用借记卡的密码或本行核发的动态密码、数字证书等本行认可的身份认证工具进行的交易，均视为持卡人本人所为；本行依据密码、数字证书等数据电文信息处理交易而产生的交易记录均为该项交易的有效证据。持卡人在自助机具上进行交易，因操作失误或机器故障引起的差错，应于24小时内（节假日顺延）与本行取得联系，本行将根据有关资料做出处理。"
					+ "<br>第二十条 重要安全事项：（1）持卡人应妥善保管身份证件以及借记卡的卡片、卡号、密码、动态密码、数字证书、身份信息、联系方式以及申请资料信息等敏感信息，信息如有变更应及时通知本行，否则，由此产生的后果和责任将由持卡人承担，本行不承担任何责任；在本行认为必要的情况下，本行将凭借核对部分敏感信息的方式来确认卡片或卡账户的使用者是否为持卡人。（2）持卡人应亲自妥善保管及谨慎使用借记卡的卡片及密码、动态密码、数字证书等身份认证工具，卡片丢失、被盗抢、毁损或者卡片密码、动态密码、数字证书等身份认证工具泄露后，持卡人应及时致电本行客户服务热线或到本行指定网点或通过本行认可的其他渠道办理挂失（芯片卡电子现金除外）或注销手续，手续办妥后挂失或注销即时生效；持卡人对于挂失或注销生效前他人使用卡片、利用密码、数字证书等所形成的风险和损失自行承担责任。持卡人办理口头挂失手续的，应当在口头挂失有效期内及时到本行营业网点办理书面挂失手续，否则有效期满后口头挂失自动失效，由此造成的损失由持卡人自行承担；电话银行、网上银行等电子渠道受理的挂失视为口头挂失。（3）对于非因本行故意或重大过失原因导致银行卡被非法/不当使用或者卡号、卡片密码、动态密码、数字证书等敏感信息泄露而引起的错误和损失，本行不承担责任；持卡人在互联网、公共场所、自助终端等环境使用银行卡时应采取必要的安全防范措施。（4）本行有权依照法律的规定协助国家司法机关或其他有权机关对持卡人的借记卡或账户进行查询、冻结、止付、扣划，并为保障持卡人账户资金安全，本行在发现持卡人的借记卡存在被他人冒用等风险时，有权暂时对该账户进行止付。"
					+ "<br>第二十一条 本行有权依据国家有关规定及业务需要对服务内容、收费项目、费率标准等内容进行调整，并正式对外公告一定时期后执行并适用于本协议，无需另行通知持卡人。借记卡的服务内容、收费项目及标准等内容，均以本行最新公告为准。"
					+ "<br>第二十二条 借记卡卡片的所有权归本行所有。持卡人使用卡片卡账户时违反本章程或者中国法令的有关规定的，本行可采取停止用卡、停止交易等措施，并可自行或授权有关单位收回卡片。"
					+ "<br>第二十三条北京银行或其合作单位可以为借记卡持卡人提供相关的服务、优惠和便利，持卡人享受服务、优惠和便利时应遵守相关的活动规则，如有纠纷应与具体服务、优惠和便利的最终提供方解决，本章程涉及的其他各方不承担责任。持卡人因不符合活动规则或者其他原因不能享有本行（或本行合作单位）提供的服务、优惠或便利的，本行不承担责任。"
					+ "<br>第二十四条 因不可抗力或供电、通讯、系统故障等原因导致借记卡暂时无法使用的，本行将视情况协助持卡人解决或提供必要的帮助，但不承担相关责任。"
					+ "<br>第二十五条 本章程以及有关借记卡的一切事宜适用指中华人民共和国的法律、行政法规、最高人民法院的司法解释以及中国人民银行、中国银行业监督管理委员会及国家外汇管理局的规章、规定和命令（在本章程中简称为“中国法令”），未尽事宜依据本行业务规定及银行业惯例办理。有关本章程的一切争议，若未能由争议各方通过友好协商解决，则应提交本行总行所在地的人民法院诉讼解决。"
					+ "<br>第二十六条 本章程自2013年2月5日起生效。对本章程的修改由本行做出，经本行以本行官方网站公告、营业网点公告、电话银行、服务热线等任一方式公布后，于本行确定的实施日期正式生效，即对所有当事人均具有约束力。在不违反中国法令的强制性规定的前提下，本行保留对本章程的解释权。</div>";

//综合章程
var zongHeBus = "<div style='overflow-y:auto;line-height:28px'>为明确客户（下称“甲方”）与北京银行股份有限公司（下称“乙方”）之间的权利和义务，规范双方业务行为，双方本着平等互利的原则，就个人客户电子银行服务相关事宜达成本协议。"
					+ "<br>第一条 定义"
					+ "<br>下列用语在本协议中的含义："
					+ "<br>（一）“电子银行”是指乙方通过互联网为甲方提供自助金融服务的虚拟银行。根据交易渠道不同，可分为网上银行服务和手机银行服务。"
					+ "<br>（二）“数字证书”指由第三方数字证书认证中心颁发的，用于存放甲方身份标识，对甲方发送的网上银行交易信息进行数字签名的电子文件，目前乙方提供移动型数字证书，存储介质为USB Key。"
					+ "<br>（三）“密码”指甲方确认身份的数字或字符信息，分为静态密码和动态密码。静态密码在甲方申办账户服务时由乙方系统随机配置或者由甲方通过乙方营业网点、自助终端、电子银行等渠道设置和修改，具体包括但不限于登录密码、支付密码、电子银行密码等；动态密码服务由甲方向乙方申请开通，密码信息由乙方以手机短信的方式发送到甲方指定的手机号码上。"
					+ "<br>（四）“业务指令”指甲方凭账/卡号、密码及乙方系统要求的其他信息，通过乙方网上银行系统或/及手机银行系统向乙方发出的查询、转账、投资、消费等要求。"
					+ "<br>第二条 服务内容"
					+ "<br>乙方提供的电子银行服务内容以乙方在其网站当时发布的《北京银行电子银行章程（个人）》及交易规则的规定为准，甲方办理电子银行业务须遵守该章程及交易规则。根据该章程及交易规则的规定，部分业务需要事先向乙方申请并在乙方营业网点柜台签署相关业务协议后才可以办理。"
					+ "<br>甲方具体办理的电子银行业务以其按乙方规定在个人网上银行系统或个人手机银行系统选择的业务为准。"
					+ "<br>第三条 甲方的权利和义务"
					+ "<br>（一）甲方自愿申请注册乙方电子银行，自主选择交易渠道。经乙方同意后，有权根据不同的交易方式享受不同的服务。"
					+ "<br>（二）甲方在本协议有效期内有权办理电子银行注销手续。"
					+ "<br>（三）甲方对乙方电子银行服务如有疑问、建议或意见时，可进行咨询或投诉。"
					+ "<br>（四）甲方办理网上银行业务，必须遵守当时有效的《北京银行网上银行章程（个人）》、乙方在网站上公布的交易规则以及乙方的有关业务规定。"
					+ "<br>（五）为安全起见，乙方提醒甲方：甲方应直接登录乙方网站http://www.bankofbeijing.com.cn 办理网上银行业务，甲方应按照乙方公布的下载方式下载手机银行客户端，不要通过邮件或其他网站提供的链接使用电子银行。"
					+ "<br>（六）甲方到乙方的营业网点办理电子银行申请、变更、注销等手续，应提供相关资料和信息，填写相关申请表，并签名确认。甲方向乙方提交的业务申请表是本协议不可分割的组成部分，甲方应保证所填写并签署的申请表和所提交资料、信息的真实性、准确性、合法性、完整性和有效性，对于因甲方填写、签署的申请表或提供的资料、信息不真实、不准确、不合法、不完整或者无效所造成的一切风险和损失由甲方承担责任。甲方通过电子银行办理业务，应遵循相应的金额限制规定。"
					+ "<br>（七）甲方必须妥善保管本人使用电子银行的客户信息、账户信息、登录ID、各类密码、相关介质及其他安全要素，因上述任何安全要素丢失、被盗抢、毁损、泄露等造成的后果和责任由甲方承担。在乙方认为必要的情况下，乙方将凭借核对部分或全部安全要素的方式来确认电子银行的使用者是否为甲方本人，且甲方应对通过部分或全部安全要素完成的金融交易负责；除非乙方系统明确许可并提供撤销操作，否则甲方已发出业务指令后，不得要求变更或撤销。"
					+ "<br>（八）甲方应尽量避免使用姓名、生日、电话号码等与本人明显相关的信息作为密码，不得将本人各类密码提供给除法律规定外的任何人。甲方应采取合理的措施，防止本人密码被窃取，因密码泄露造成的后果和责任由甲方承担。"
					+ "<br>（九）在本协议有效期内发生数字证书损毁、遗失、被盗抢或密码泄露的，甲方应及时按照乙方规定的程序和要求办理挂失、更换、重置等手续，办妥上述手续之前所产生的一切后果和责任由甲方承担。 "
					+ "<br>（十）甲方在使用电子银行服务过程中，所提供的注册信息如有更改，应及时按照乙方规定办理有关手续。"
					+ "<br>（十一）甲方可以通过乙方电子银行办理下挂账/卡的紧急挂失，挂失即时生效，有效期限为5天，有效期届满后自动解除挂失，甲方应在紧急挂失有效期内到乙方营业网点办理书面挂失手续，否则因紧急挂失自动解除后发生的风险和损失由甲方自行承担。 "
					+ "<br>（十二）甲方应保证办理电子支付业务的账/卡状态正常且可用余额充足，并严格遵守支付结算业务的相关法律法规。"
					+ "<br>（十三）甲方不得有意诋毁、损害乙方声誉或恶意攻击乙方电子银行系统。"
					+ "<br>（十四）甲方办理电子银行业务时，如其使用的服务功能涉及到乙方其他业务规定或规则，应同时遵守。 "
					+ "<br>（十五）甲方长期不使用电子银行，应主动申请办理注销手续。 "
					+ "<br>（十六）甲方使用电子银行办理个人外汇业务，应自觉遵守我国外汇管理的法律法规、金融规章和监管要求，并须按照外汇管理政策及乙方要求提供相关文件、资料和信息；不得有以分拆等任何方式逃避限额监管、提供/使用虚假或误导性的信息等违反法律法规、金融规章或监管要求的行为，否则乙方有权采取关闭甲方通过电子银行办理相关个人外汇业务的权限、向监管部门报告及其他法律法规、金融规章或监管要求允许采用的措施。 "
					+ "<br>（十七）甲方应当遵循法律法规、金融规章、监管要求和乙方的反洗钱相关规定和要求，按照乙方的要求提供相关资料和信息。"
					+ "<br>第四条 乙方的权利和义务"
					+ "<br>（一）乙方有权根据甲方资信等情况，自行决定是否受理甲方的注册申请。"
					+ "<br>（二）乙方有权在不违反有关法律法规规定及金融规章的前提下制定或者变更电子银行业务收费标准，并在乙方官方网站或营业网点进行公布，一经公布即对甲方具有约束力，甲方不同意有关收费标准的，应停止办理相关的电子银行业务。"
					+ "<br>（三）乙方有权对电子银行系统进行升级、改造。"
					+ "<br>（四）对甲方未按规定支付有关费用、不遵守乙方有关业务规定或存在恶意操作、诋毁、损害乙方声誉等行为的，乙方有权单方终止向甲方提供电子银行服务，并保留追究甲方责任的权利。甲方利用乙方电子银行从事违反国家法律法规活动的，乙方将按照有关法规或相关部门的要求停止为其办理电子银行业务并追究其责任。"
					+ "<br>（五）乙方根据甲方的电子银行业务指令处理业务,对所有使用甲方账/卡号、密码或/及证书等全部或者部分安全要素进行的操作均视为甲方所为，该操作所产生的电子信息记录均为乙方处理电子银行业务的有效凭据。"
					+ "<br>（六）乙方因以下任一情况而未能正确执行甲方提交的电子银行业务指令的，不承担责任："
					+ "<br>1．乙方接收到的指令信息不明、存在乱码、不完整等；"
					+ "<br>2．甲方账户内资金因已被依法冻结或扣划，或其他原因导致可用余额不足；"
					+ "<br>3．甲方未能按照乙方的有关业务规定正确操作；"
					+ "<br>4．甲方的行为出于欺诈或其他非法目的。"
					+ "<br>5．乙方遇到不可抗力、计算机黑客袭击、系统故障、通讯故障、网络拥堵、供电系统故障、电脑病毒、恶意程序攻击及其它不可归因于乙方的情况。 "
					+ "<br>（七）本协议终止或电子银行服务发生中止期间，乙方不退回甲方已支付的有关费用。 "
					+ "<br>（八）在乙方系统正常运行情况下，乙方负责按甲方的选择提供相应的电子银行服务，及时准确地处理甲方正确发送的电子银行业务指令，并及时向甲方提供查询交易记录、资金余额、账户状态等服务。"
					+ "<br>（九）乙方对甲方提供的申请资料和其他信息有保密的义务，但法律法规另有规定、监管机构或有权机关或乙方上市的交易所另有要求或在甲方授权范围内使用/披露的除外。"
					+ "<br>（十）因乙方工作失误导致支付结算处理延误，乙方按中国人民银行《支付结算办法》的有关规定赔偿。 "
					+ "<br>第五条 协议的生效和效力"
					+ "<br>如甲方选择的交易方式需前往乙方营业网点柜台办理注册手续，本协议经甲方签署且乙方在《北京银行个人电子银行业务受理表》上加盖受理印章后，自上述受理表“银行打印”栏打印日期起生效；如甲方选择电子渠道自行注册，本协议自甲方通过乙方的电子银行系统办理业务前，阅读并点击同意本协议之时生效。 "
					+ "<br>本协议的任何条款如因任何原因而被确认无效或者被撤销，都不影响本协议其他条款的效力。"
					+ "<br>第六条 协议的中止与终止 "
					+ "<br>乙方提供的电子银行服务受甲方使用的账户状态的制约，如该账户处于非正常状态，相关电子银行服务自动中止。该账户状态恢复正常时，乙方重新提供相应服务。 "
					+ "<br>本协议自甲方在乙方营业网点办理注销手续之日起终止，如甲方选择的交易方式无需注销，本协议自甲方使用的电子银行账户注销之日起终止。此外，对于网上银行证书用户，在证书过期后本协议自动终止。 "
					+ "<br>甲方违反本协议规定或其他乙方业务规定的情况下，乙方有权中止或终止本协议。"
					+ "<br>协议中止或终止并不意味着中止或终止前所发生的未完成交易指令的撤销，双方在中止或终止前发生的交易、操作及相关的权利义务依然有效。"
					+ "<br>第七条 法律适用条款与争议解决 "
					+ "<br>本协议的成立、生效、履行、终止和解释，均适用中华人民共和国法律；中国法律无明文规定的，可参考国内通行的金融行业电子银行惯例。"
					+ "<br>有关本协议的一切争议，应首先协商解决，协商不成的，应提交乙方所在地的人民法院诉讼解决。"
					+ "<br>第八条 其它条款"
					+ "<br>《北京银行电子银行章程（个人）》及交易规则是本协议的组成部分，乙方修改章程及交易规则的，一经公布后即对甲方具有约束力，甲方不同意的，应停止使用电子银行并办理注销手续。"
					+ "<br>乙方对甲方的任何通知，经乙方网站或者营业网点公告后视为甲方已经收到。"
					+ "<br></div>";

//----------------------------------------------------
var customerInfo = "";

var conhisid_DTMM_SQ = "";  //动态密码申请
var conhisid_DTMM_XG = "";  //动态密码修改
var conhisid_DTMM_JS = "";  //动态密码解锁
var conhisid_SJYH_SQ = "";  //手机银行申请
var conhisid_SJYH_TJ = "";  //手机银行添加下挂账户
var conhisid_SJYH_CZ = "";  //手机银行重置登录密码
var conhisid_SJYH_ZZ = "";  //手机银行转账支付
var conhisid_SJYH_ZX = "";  //手机银行注销
var conhisid_DZYH_SQ = "";  //电子银行密码管理申请
var conhisid_DZYH_CZ = "";  //电子银行密码管理重置
var conhisid_DZYH_XG = "";  //电子银行密码管理修改
var conhisid_DHYH_SQ = "";  //电话银行密码管理申请
var conhisid_DHYH_CZ = "";  //电话银行密码管理重置
var conhisid_DHYH_XG = "";  //电话银行密码管理修改

//WYZS_code 2014/08/08
var conhisid_WYZS_SQ = "";  //网银证书 申请
var conhisid_WYZS_TJ = "";  //   添加下挂账户
var conhisid_WYZS_GS = "";  //   电子密盾开机密码挂失
var conhisid_WYZS_XE = "";  //   修改最高转账限额
var conhisid_WYZS_HFQY = "";  //恢复启用网银
var conhisid_WYZS_HFYZ = "";  //恢复电子密盾验证

var conhisid_TZLC = "";   //投资理财
var conhisid_JJGS = "";   //借记卡挂失
var conhisid_DZQD = "";   //借记卡挂失
var conhisid_KJJK = "";   //开借记卡
var conhisid_FUND = "";   //开借记卡
//----------------------------------------------------


var savePicIndex = 0;

var agentprints = "";

var EBankPDFpath = "";

var ZYW_DTWY_OK = 0;
var ZYW_SJYH_OK = 0;
var ZYW_DZMM_OK = 0;
var ZYW_DHMM_OK = 0;
var ZYW_WYZS_OK = 0;  //判断网银证书业务是否提交  2014/7/8 WYZS_code

var dtmm_sq = "";
var dtmm_xg = "";
var dtmm_js = "";

var sjyh_sq = "";
var sjyh_tj = "";
var sjyh_cz = "";
var sjyh_zz = "";
var sjyh_zx = "";

// 2014/7/9 WYZS_code
var wyzs_sq = "";
var wyzs_xg = "";
var wyzs_gs = "";
var wyzs_xe = "";   //限额变量
var wyzs_hfqy = ""; //恢复启用
var wyzs_hfyz = ""; //恢复密盾验证


//判断C#form中选择的业务类型   2014/08/26
var BussChoicType = "";
var WF_FUND_LC = "";

var dzyh_sq = false;
var dzyh_xg = false;
var dzyh_cz = false;
var dhyh_sq = false;
var dhyh_xg = false;
var dhyh_cz = false;

var goNextYN = 0;  //次变量用来判断是否有没有填写的问卷题目

var checkbox_KJJK = false;
var checkbox_DZQD = false;
var checkbox_TZLC = false;
var checkbox_JJGS = false;
var checkbox = 0;

//----专业版网银证书单选按钮变量！-- 2014/7/8 WYZS_code--
var checkbox_money_1 = false;
var checkbox_money_2 = false;
var checkbox_money_3 = false;
var checkbox_money_4 = false;
var checkbox = 0;

var arrUserNames = "";  //用于记录始终 授权坐席用户名


// 2013-04-22 优化弹屏速度
// 2012-12-31.去掉所有url = ctxpath + ""。 测试环境websphere已调试，不再报空指针错误
var cardpath = __ctxPath + "/images/bkcards/";// 指定使用的北京银行卡片存放路径。
var nowBusinessType = "";   //当前业务类型的变量

var WJpage = 0;
var WJXX = 0;


//记录相应子业务类型的conhisid
//var conhisid_bus;

var isConn = 0;// 是否连接中，1：是，0：否
var isCheckID = 0;// 是否刷过身份证。0：否，1：是
var videoip = "";
// videoip = "192.168.1.4";
// videoip = "192.168.30.129

// 初始化是的坐席号、坐席使用的电话号、坐席端站点。弹屏传入参数
var agentno, agcallno, agsite , phoneNum;
var termno, termsite;

var agentName = "";

//--------------------
var totalBussines = "one";  //得知 一期Term  还是二期Term
//--------------------


var checkSF = 0; //是否点击身份核查按钮  0：未点击   1：已点击
var savepicDir;// 截图路径
// 第一个视频的变量值
var tmid, site, videoip, port;

var callinId = "";// 软电话callid

//办理综合页面时显示对应的卡号str
//var str_Cards_1 = "";  //卡1 str 
//var str_Cards_2 = "";  //卡2 str 
var card = "";         //总显示

//记录是否经过扫描客户的证件过程
var rememberBuss = 0 ;
var rememberScanCard = 0;   //记住是否扫描了身份证
//记录是否是第一次呼入进来插入后台数据记录 主要是操作： conhisid++
var fristBusiness = 0;

//txt身份核查文件路径
var textTXT = "";
//当前业务的卡号
var cardNumber = "";

// 系统使用的
var globalcurpage = 0;
var isManaged = 1;// 0：坐席没获得权限，1：坐席获得权限
var closecallflag = 0;// 0弹屏后未关闭软电话；1弹屏后已关闭软电话 ; 2电话通话中状态
var isSavepic = 0;// 0未拍照；1已拍照

// 统一封装alert
var dev_mode = false;

var scanPeCard = 0;  //记录二期需求中：随时可以扫描客户的证件信息变量
var showPrintpic = 0;//记录二期需求中：金博会 中 打印回收之后弹窗显示扫描的结果
var button_rem = 0;  //记住客户是否点击了子业务页面中的‘确认’按钮

//-------用于身份核查生成txt文件字段属性------
var SF_name=""; //用户姓名
var SF_cardID="";//用户身份证号码
var SF_result="";//核对结果
var SF_dName="";//业务名称
var SF_wangID="";//网点号
var SF_cp=""; //操作员
var SF_year="";//日期
var SF_time="";//时间
//----------------------------------------


var DTMM_counts=0;  	//动态密码勾选索引判断值       
var SJYH_counts=0;  	//手机银行..... 
var DZYH_counts=0;  	//电子银行密码.....
var DHYH_counts=0;  	//电话银行密码.....

var checkPwdType="";	//验证校验密码的类型
var checkClick = false;   //判断是否点击了核查结果
var checkERROR = false;    //判断核查结果是否是ERROR
var clickFlag = false;    //判断是否选择了核查结果类型，并确认保存text文件
var saveTakeImg = "";     //拍照图片变量

var NotPaper = "True";

var MessageCheckCode_TimeOut = 0;
var TimeOut_flag;
var sjyh_phone_checkcode = "";
var saveClearWav = "";  //标记高清录音路径变量


//-----------------------------------查看核查结果信息的页面--------------------------------
showCheckFuncInfo = function(scanInfo,checkInfo,PZImg) {
	jsLog(logStrMsg("参数1：scanInfo = " + scanInfo,"INFO")); //记录日志
	jsLog(logStrMsg("参数2：checkInfo = " + checkInfo,"INFO")); //记录日志
	jsLog(logStrMsg("参数3：PZImg = " + PZImg,"INFO")); //记录日志
	//huyang|性别|民族|出生地|住址|公民身份证号|签发机关|有效期|image
	/**
	    {参数1：scanInfo = 胡杨&1&汉&19930104&河北省保定市北市区天鹅中路151号&500224199301041430&保定市公安局北市分局&20101209-20201209&D:\BOBRVA\tempfile\TT002201508181605.bmp} end
 		{参数2：checkInfo = 张馨月&452502199411258265&此项暂不返回核查结果&00&D:\BOBRVA\idpic\93538.jpg} end
		{参数3：PZImg = D:\BOBRVA\tempfile\CT002201508181605_0.bmp} end
	 */
	var a = scanInfo.split("&")[0];
	var b = scanInfo.split("&")[1];
	var c = scanInfo.split("&")[2];
	var d = scanInfo.split("&")[3];
	var e = scanInfo.split("&")[4];
	var f = scanInfo.split("&")[5];
	var g = scanInfo.split("&")[6];
	var h = scanInfo.split("&")[7];
	var img = '<div style="width:400px;text-align:left"><img src="' + PZImg + '" style="width:380px;"/></div>';
	//huyang|50022|保定北市|00|C:\\
	var aa = checkInfo.split("&")[0];
	var bb = checkInfo.split("&")[1];
	var cc = checkInfo.split("&")[2];
	var dd = checkInfo.split("&")[3];
	var ee = checkInfo.split("&")[4];
	//jsLog(logStrMsg("img="+img,"INFO")); //记录日志
	//Ext.getCmp('cus_idpic_1').setValue("123123");
	//jsLog(logStrMsg("img0000000000000","INFO")); //记录日志
	//Ext.getCmp('cus_idpic_1').setValue(img);
	jsLog(logStrMsg("渲染照片后","INFO")); //记录日志
	formPanel = new Ext.FormPanel({
				layout : 'form',
				border : true,    //909090
				labelAlign : 'right',
				frame : true,
				buttonAlign : 'center',
				items:[{
					layout : 'column',
					autoWidth : true,
					border : true,
					items:[{
							columnWidth : .4,
							xtype : 'fieldset',
							layout : 'form',
							style : 'margin-left:5px',
							// collapsible : true,
							title : '身份信息',
							height : 330,
							items : [{
								layout : 'column',
								border : true,
								items : [{
									layout : 'form',
									columnWidth : .55,
									labelWidth : 40,
									border : true,
									items : [{
												fieldLabel : '姓名',
												xtype : 'displayfield',
												id : 'cus_nameck_1',
												value : a
											}, {
												layout : 'column',
												border : false,
												items : [{
													layout : 'form',
													border : true,
													labelWidth : 40,
													columnWidth : .5,
													items : [{
																fieldLabel : '性别',
																xtype : 'displayfield',
																id : 'cus_sexck_1',
																value : b
															}]
												}, {
													layout : 'form',
													border : true,
													columnWidth : .5,
													labelWidth : 40,
													items : [{
																fieldLabel : '民族',
																xtype : 'displayfield',
																id : 'cus_minzuck_1',
																value : c
															}]
												}]
											}, {
												fieldLabel : '出生',
												xtype : 'displayfield',
												id : 'cus_birthck_1',
												value : d
											}]
								},{
									layout : 'form',
									columnWidth : .45,
									labelWidth : 40,
									border : true,
									items : [{
										xtype : 'displayfield',
										style : 'margin-top:3px;',
										value : '<div style="text-align:center"><img src="' + scanInfo.split("&")[8] + '" style="width:80px;margin-left:20px"/></div>' 
									}]
								}]

							}, {
								fieldLabel : '住址',
								xtype : 'displayfield',
								id : 'cus_addrck_1',
								value : e
							}, {
								fieldLabel : '公民身份证号',
								xtype : 'displayfield',
								id : 'cus_idck_1',
								value : f
							}, {
								fieldLabel : '签发机关',
								xtype : 'displayfield',
								id : 'cus_jiguanck_1',
								value : g
							}, {
								fieldLabel : '有效期限',
								xtype : 'displayfield',
								id : 'cus_rangeck_1',
								value : h
							}]
						},{
							columnWidth : .6,
							border : true,
							layout : 'form',
							items : [{
								xtype : 'displayfield',
								anchor : '100%',
								id : 'BL_pic_1',
								//html : '<div style="width:100px;text-align:center"><img src="C:\OFFICE_WORK\agent.jpg" style="width:80px;margin-left:20px"/></div>'
								value : img

							}]
						}
					]
				},
				{
					xtype : 'fieldset',
					style : 'padding:10px',
					layout : 'form',
					title : '返回信息',
					items : [{
						layout : 'column',
						border : false,
						items : [{
							layout : 'form',
							border : false,
							labelWidth : 200,
							labelAlign : 'right',
							columnWidth : .5,
							items : [{
										fieldLabel : '姓名',
										xtype : 'textfield',
										id : 'BL_check_name',
										name : 'BL_check_name',
										anchor : '100%',
										readOnly : true,
										value : aa

									}, {
										fieldLabel : '身份证号',
										xtype : 'textfield',
										anchor : '100%',
										id : 'BL_check_cerno',
										name : 'B_check_cerno',
										readOnly : true,
										value : bb

									}]
						}, {
							layout : 'form',
							border : false,
							columnWidth : .5,
							labelAlign : 'right',
							height : 100,
							labelWidth : 1,
							items : [{
								xtype : 'displayfield',
								anchor : '100%',
								id : 'BL_checkid_pic',
								html : '<div style="width:100px;text-align:center"><img src="' + ee + '" style="width:80px;margin-left:20px"/></div>',
								value : '<div style="width:100px;text-align:center"><img src="' + ee + '" style="width:80px;margin-left:20px"/></div>'

							}]
						}]
					}, {
						layout : 'column',
						border : false,
						items : [{
							layout : 'form',
							border : false,
							labelAlign : 'right',
							labelWidth : 200,
							columnWidth : .8,
							items : [{
										fieldLabel : '签发机关',
										xtype : 'textfield',
										anchor : '100%',
										readOnly : true,
										id : 'BL_check_jiguan',
										name : 'BL_check_jiguan',
										value : cc

									}]
						}]
					}, {
						layout : 'column',
						border : false,
						items : [{
							layout : 'form',
							border : false,
							labelWidth : 200,
							labelAlign : 'right',
							columnWidth : .6,
							items : [{
								fieldLabel : '号码与姓名一致,与反馈照片核对',
								anchor : '100%',
								xtype : 'combo',
								mode : 'local',
								lazyInit : false,
								id : 'BL_check_picaaa',
								name : 'BL_check_picaaa',
								valueField : 'desc',
								hiddenName : 'BL_check_picaaa_code',
								displayField : 'desc',
								triggerAction : 'all',
								store : new Ext.data.SimpleStore({
											fields : ['code','desc'],
											data : [['00', '公民身份号码与姓名一致，且存在照片'],
													['01', '公民身份号码与姓名一致，但不存在照片'],
													['02', '公民身份号码存在，但与姓名不匹配'],
													['03', '公民身份号码不存在'],
													['04', '其他错误'],
													['05', '输入的参数错误']],
											autoLoad : true
										}),
								editable : false,
								value : '',
								listeners : {
									select : function(combobox,record, index) {
										//checkret(Ext.get("check_picaaa_code").getValue());
									}
								}
							}]
						}]
					}, {
						layout : 'column',
						border : false,
						items : [{
							layout : 'form',
							border : false,
							labelWidth : 200,
							labelAlign : 'right',
							columnWidth : .6,
							items : [{
								fieldLabel : '交易结果',
								xtype : 'textfield',
								anchor : '100%',
								id : 'BL_check_deal',
								name : 'BL_check_deal',
								readOnly : true,
								value : dd
							}]
						}]
					}]
				}],
				buttons : [ {
				text : '确认核查补录一致并保存文件',
				handler : function() {
					SF_result = Ext.get("BL_check_picaaa_code").getValue();
					//alert(SF_result);
					//showCheckInfo.close();
					if(Ext.get("BL_check_picaaa_code").getValue() != ""){
						jsLog(logStrMsg("POP Windows -> click SaveORSure Button","INFO   ")); //记录日志
						clickFlag = true;
						SF_result = Ext.get("BL_check_picaaa_code").getValue();
						jsLog(logStrMsg("POP Windows -> SF_result = " + SF_result,"INFO   ")); //记录日志
						SF_cp = agentno;
						var str = "dName="+SF_dName+"\npName="+SF_name+"\nID="+SF_cardID+"\nresult="+SF_result+"\nwangID="+SF_wangID+"\ncp="+SF_cp+"\nyearMD="+SF_year+"\ntime="+SF_time+"\nagentName="+agentName;
						jsLog(logStrMsg("POP Windows -> str = " + str,"INFO")); //记录日志
						//-----------------测试假设数据-------------------
						textTXT = savepicDir + "X" + dealno + ".html";
						/**
							待调曲晓接口，存储‘身份核查’txt文件  agentSetPersonalCheckInfo("","","","");
							需要参数
							@Param1:  dealno （流水号）
							@Param2：  str （文本txt里面显示内容） 
							@Param3:  "X" + dealno + ".txt" (文件上传的名称)
							@param4:  ""  传空字符串,
						*/
//						jsLog(logStrMsg("待调曲晓接口，存储‘身份核查’txt文件  agentSetPersonalCheckInfo('','','','');","INFO   ")); //记录日志
//						jsLog(logStrMsg("@Param1:  dealno （流水号）","INFO   "));											  //记录日志
//						jsLog(logStrMsg("@Param2： str （文本txt里面显示内容）","INFO   ")); 									  //记录日志
//						jsLog(logStrMsg("@Param3:  'X' + dealno + '.txt' (文件上传的名称)","INFO   "));					      //记录日志
//						jsLog(logStrMsg("@param4:  ''  传空字符串,","INFO   ")); 										      //记录日志
//						myocx.agentSetPersonalCheckInfo(dealno,str,"X" + dealno + ".txt","");    //曲晓接口： 上传txt身份核查 文件
//						jsLog(logStrMsg("POP Windows -> myocx.agentSetPersonalCheckInfo","INFO   ")); //记录日志
						
						if(BussChoicType != "KJJK"){
							saveSomeFile(returnConhisID(), '99', '2', textTXT,agentno, cusname, cerno);  //存储一个txt文件的路径 --> 只确定一次存储联网核查文件路径即可（无论是否核查都存储）
							jsLog(logStrMsg("POP Windows -> Save Txt OK","INFO   ")); //记录日志
						}
						
						var line_head = "<HTML>\n<head>\n<meta http-equiv='Content-Type' content='charset=utf-8' />\n<title>身份核查信息</title>\n</head>";
						var line_Table = "<body>\n<table width='778' height='195' border='1' align='center' >" +
				                         "<tr>\n<td width='381' height='37' align='right'>业务名称：</td>\n" +
				                         "<td width='381'>" + SF_dName + "</td>\n</tr>\n" +
				                         "<tr>\n<td height='36' align='right'>核对人姓名：</td>\n" +
				                         "<td>" + SF_name + "</td>\n</tr>\n" +
				                         "<tr>\n<td height='36' align='right'>身份证号：</td>\n" +
				                         "<td>" + SF_cardID + "</td>\n</tr>\n" +
				                         "<tr>\n<td height='36' align='right'>核对结果：</td>\n" +
				                         "<td>" + SF_result + "</td>\n</tr>\n" +
				                         "<tr>\n<td height='36' colspan='2' align='center'>网点号：" + 
				                         SF_wangID + " 座席员号:" + agentName + " 操作员号:" 
				                         + SF_cp + " 日期:" + SF_year + " 时间: " + SF_time + 
				                         "</td>\n</tr>\n" + 
				                         "</table>\n</body>\n</HTML>";
						var fso = new ActiveXObject("Scripting.FileSystemObject");
						var fh = fso.OpenTextFile(textTXT, 8, true);			//只读=1，只写=2 ，追加=8 等权限
						fh.WriteLine(line_head);
						fh.WriteLine(line_Table);
						fh.Close();
						jsLog(logStrMsg("--------------->保存html文件成功<------------------")); //记录日志
						
						alert("保存核查文件成功");
						showCheckInfo.close();
						//Ext.getCmp("bulu").setDisabled(true);
						
						if(BussChoicType == "FUND"){
							myocx.InvokeBusinessForm(8,"",983,"");   //调用弹窗
							jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe] 983：弹出指定Form","INFO"));
						}else{
							if(BussChoicType != "KJJK"){
								//打开C#弹窗 CheckSignForm 
								myocx.InvokeBusinessForm(4,"",2,"OK");   //调用弹窗
								jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[CheckSignForm.exe] 2：弹出","INFO"));
							}
							
						}
						
						//告诉C#已经不用查看身份核查结果！
						myocx.InvokeBusinessForm(10,"",102,"");
						
					}else{
						alert("‘反馈信息’选择框不能为空！");
					}
				}
			}]
			});

	var showCheckInfo = new Ext.Window({
		title : '身份核查返回结果',
		width : 920,
		height : 720,
		modal : true,
		layout : 'anchor',
		bodyStyle : 'padding:5px;',
		buttonAlign : 'center',
		maximizable : true,
		autoScroll : true,
		items : [formPanel],
		closable : false,
		buttons : [ {
			text : '关闭',
			iconCls : 'btn-cancel',
			handler : function() {
				if(clickFlag){
					jsLog(logStrMsg("POP Windows -> Close Button","INFO")); //记录日志
					showCheckInfo.close();
				}else{
					alert("请保存核查结果！");
				}
					
			}
		}]
	});
	showCheckInfo.show();
};




function prn(str) {
	if (dev_mode)
		alert(str);
}

/**********************************************************
 * 按钮提示信息
 * */
function butInfoShow(str){
 	var data = new Date().format('yyyy-MM-dd hh:mm:ss');
 	var butString = data + ">>[" + str + "]";
 	return butString;
}

/**
 * 恢复打印凭条按钮
 */
function resetButton(str){
	Ext.getCmp(str).setDisabled(false);
}


/********
 *   
 * 据审核通过判断客户选择的对应业务  将分类存储在后台，并分类明细
 * 业务类型： 1->动态网银(申)  2->动态网银(修)   3->动态网银(解锁)
 * 			4->手机银行(申)  5->手机银行(下挂)  6->手机银行(重置)
 * 			7->手机银行(设)  8->手机银行(注销)  10->电子渠道(总)
 * 			11->投资理财     12->密码挂失....
 * 			13->电子银行密码(申) 14->电子银行密码(修) 15->电子银行密码(重)
 * 		    16->电话银行密码(申) 17->电话银行密码(修) 18->电话银行密码(重)
 * */

/***
 *  conhisid_DTMM_JS = "19138";
	conhisid_SJYH_ZX = "19139";
	conhisid_DZYH_XG = "19140";
 */


/***********************************************************
 *  在同意章程之后判断选择的业务调整显示 相应的界面
 */
function ReadZCChoice(){
	//----------判断二级菜单的业务是否选中，没选择将进入综合页面disabled掉对应的业务项-------------
	if(BussChoicType == "KJJK"){
		jsLog(logStrMsg("CHANG THE PAGE <synWithTerm(5,1)> OPENCARD WRITE","INFO"));
		synWithTerm(5,1); 			//跳转到开借记卡的资料信息录入页面
		
//		if(BussChoicType != "KJJK"){
//			//2014/10/14  打开C#窗体  SetCustomerInfo.exe程序
//			jsLog(logStrMsg("调用InvokeBusinessForm之前确认customerInfo变量的值：" + customerInfo,"INFO"));
//			//myocx.InvokeBusinessForm(6,"",0,customerInfo);   //调用弹窗
//			jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[SetCustomerInfo.exe]","INFO"));
//		}
		
		updateHisBusType(conhisid_KJJK , '0');   //修改业务类型为开卡业务 0
	}else if(BussChoicType == "DZQD"){
		Ext.getCmp("101309").setVisible(false);  //隐藏坐席输入按钮
		//判断是否经过了开卡完成的业务过程  0 没经过： 那么就在阅读章程之后提示客户是否插卡 1、 已经过 ：那么阅读章程之前就已经通知客户插卡读取卡号了
		jsLog(logStrMsg("TAKE PAGE NEXT <synWithTerm(18,1)> PROMPT INSERT CARDS","INFO"));
		if(fristBusiness == 0){updateHisBusType(conhisid_DZQD , '10');jsLog(logStrMsg("修改当前业务类型为：电子渠道","INFO"));}
		//updateConHis('10');   //客户同意章程之后就修改该业务的类型10(电子渠道)
		synWithTerm(18,1);  //提示插卡
		jsLog(logStrMsg("ReadZCChoice_  同意章程..  BussChoicType = " + BussChoicType + " --- cardNumber = " + cardNumber,"INFO   "));
		//20141029  打开读取卡号 EXE 程序
		myocx.InvokeBusinessForm(7,"",0,cardNumber);
		jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[ReadCardNumPage.exe]","INFO"));
		if(cardNumber != ""){
			//Ext.getCmp("goNext").setVisible(true);   //8080
		}
		
		//20141029  打开读取卡号 EXE 程序
		//myocx.InvokeBusinessForm(7,"",0,cardNumber);
		
	}else if(BussChoicType == "FUND"){
		//基金业务   告诉C#跳转winform程序 到读取卡号页面
		jsLog(logStrMsg("同意章程后，准备告诉C#程序 跳转到读取卡号页面 cardNumber="+cardNumber,"INFO"));
		if(cardNumber == ""){   //判断是否有卡号，有卡号将卡号传给WinForm
			myocx.InvokeBusinessForm(8,"",104,"*NotPaper:"+NotPaper);   //打开 读取卡号 Form	
			jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe]","INFO"));
		}else{
			myocx.InvokeBusinessForm(8,"",104,cardNumber+"*NotPaper:"+NotPaper);   //打开 读取卡号 Form
			jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe]","INFO"));
		}
		updateHisBusType(conhisid_FUND , '12');
		jsLog(logStrMsg("修改当前业务类型为：基金签约","INFO"));
		
		//判断是否是该电话的第一笔业务，若大于0表示 已经过身份核查并且办理其他业务完成后返回首页办理的基金，此时同意章程后需存储相应的 业务记录(图片、扫描件、录音...)
		if(fristBusiness > 0){
			setTimeout("takeSaveSomeFiles(" + conhisid_FUND + ")", 3000);
			//takeSaveSomeFiles(conhisid_FUND);//存储相应的资料文件
		}
		if(WF_FUND_LC == "YES"){   //证明是通过理财办理完成后 跳转到基金的章程页面   //此处 同意章程后需要修改新增的记录的业务类型 “基金”
			updateHisBusType(conhisid_FUND , '12');  //修改业务类型为基金类型
			//延时3秒  在新增后台数据
			setTimeout("takeSaveSomeFiles(" + conhisid_FUND + ")", 3000);
		}
		
	}else {
		//-------------- 还有一个密码挂失的页面待最后开发  ------------------
		//updateHisBusType(conhisid_JJGS , '10');
	}
}



/**
 * 读取日志文件判断是否发送了这条消息
 * @return {TypeName} 
 */
function readLog(){
		try{
			var fso = new ActiveXObject("Scripting.FileSystemObject"); 
			//node=node16&nodeip=192.168.10.16&device=ph-sip-1-node16&agent=5001&pwd=5001
			var f = fso.OpenTextFile(tfile,1);//只读
			var line; 
			while (!f.AtEndOfStream){
				line = f.ReadLine();
			}
			f.Close();
		}catch(ex){
			jsLog(logStrMsg("读取配置文件"+tfile+"失败!","INFO"));
			//alert("读取配置文件"+tfile+"失败!");
			return false;
		}
		return line;
	}


/*************************************
 * 身份核查
 */
var data = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",""];
var cus_name = "";
var cus_cerno = "";
var username = "";// agent

// 核查结果事件、审核照片缓存
var arrCheck = new Array(2);// 缓存索引。

function getDealno(filePath) {
	var node, min, max, cur;
	try {
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		// node=node16&nodeip=192.168.10.16&device=ph-sip-1-node16&agent=5001&pwd=5001
		var f = fso.OpenTextFile(filePath, 1, true);// 只读
		var line;
		while (!f.AtEndOfStream) {
			line = f.ReadLine();
			if (line.indexOf('node=') == 0) {
				node = line.substring('node='.length, line.length);
			}
			if (line.indexOf('min=') == 0) {
				min = line.substring('min='.length, line.length);
			}
			if (line.indexOf('max=') == 0) {
				max = line.substring('max='.length, line.length);
			}
			if (line.indexOf('cur=') == 0) {
				cur = line.substring('cur='.length, line.length);
			}
		}
		// alert(max +"|" + min + "|" + cur);
		if (parseInt(cur) < parseInt(max)) {
			cur++;
		} else {
			cur = min;
		}
		// alert(cur < max);
		if (!node || !min || !max || !cur) {
			alert("流水号配置文件c:\\bobdealno.txt缺少数据！");
			return -1;
		}

		f.Close();

		var fh = fso.OpenTextFile(filePath, 2, true);	// 只读=1 ，只写=2 ，追加=8 等权限
		fh.WriteLine("node=" + node);
		fh.WriteLine("min=" + min);
		fh.WriteLine("max=" + max);
		fh.WriteLine("cur=" + cur);
		fh.Close();

	} catch (ex) {
		jsLog(logStrMsg("读取配置文件" + filePath + "失败!"+ ex,"ERROR"));
		//alert("读取配置文件" + filePath + "失败!" + ex);
		return -1;
	}
	// alert("current dealno is:" + cur);
	return cur;
}
function win_load() {
	//Ext.getCmp("check_huji").setDisabled(true);
//	Ext.getCmp("check_province").setDisabled(true);
//	Ext.getCmp("check_city").setDisabled(true);
//	Ext.getCmp("check_phone").setDisabled(true);
//	Ext.getCmp("check_mobile").setDisabled(true);
//
//	Ext.getCmp("check_circs").setDisabled(true);
//	Ext.getCmp("check_zuoz").setDisabled(true);
//	Ext.getCmp("check_other").setDisabled(true);
//	Ext.getCmp("check_giveup").setDisabled(true);
//	Ext.getCmp("check_real").setDisabled(true);
//	Ext.getCmp("check_police").setDisabled(true);

}

//隐藏确认页面的信息以及清空值对应的
function visibledSomePage(type){
	//2014/7/10  WYZS_code_CK 还原确认页面-隐藏  cardpanel
	//Ext.getCmp("1015").clear();
	Ext.getCmp("ZH_WYZS_CK_shenqing").setVisible(false);  
	Ext.getCmp("ZH_WYZS_CK_xiagua").setVisible(false);  
	Ext.getCmp("ZH_WYZS_CK_guashi").setVisible(false);  
	Ext.getCmp("ZH_WYZS_CK_zhuanzhang").setVisible(false);  
	Ext.getCmp("ZH_WYZS_CK_hfqy").setVisible(false);  
	Ext.getCmp("ZH_WYZS_CK_hfyz").setVisible(false); 
//	Ext.getCmp("ZH_WYZS_CK_shenqing").hide();  
//	Ext.getCmp("ZH_WYZS_CK_xiagua").hide();  
//	Ext.getCmp("ZH_WYZS_CK_guashi").hide();  
//	Ext.getCmp("ZH_WYZS_CK_zhuanzhang").hide();  
//	Ext.getCmp("ZH_WYZS_CK_hfqy").hide();  
//	Ext.getCmp("ZH_WYZS_CK_hfyz").hide();
	Ext.getCmp("ZH_WYZS_CK").setVisible(false);  //网银证书
	//2014/7/11  WYZS_code_over 
	
	Ext.getCmp("over_WYZS_SQ").setVisible(false);
	Ext.getCmp("over_WYZS_XG").setVisible(false);
	Ext.getCmp("over_WYZS_GS").setVisible(false);
	Ext.getCmp("over_WYZS_XE").setVisible(false);
	Ext.getCmp("over_WYZS_HFQY").setVisible(false);
	Ext.getCmp("over_WYZS_HFYZ").setVisible(false);
//	Ext.getCmp("over_WYZS_SQ").setVisible(false);
//	Ext.getCmp("over_WYZS_XG").hide();
//	Ext.getCmp("over_WYZS_GS").hide();
//	Ext.getCmp("over_WYZS_XE").hide();
//	Ext.getCmp("over_WYZS_HFQY").hide();
//	Ext.getCmp("over_WYZS_HFYZ").hide();
	Ext.getCmp("over_WYZS").setVisible(false);
	
	
	Ext.getCmp("ZH_DTMM_CK_xiugai").setVisible(false);
	Ext.getCmp("ZH_DTMM_CK_jiesuo").setVisible(false);
	Ext.getCmp("ZH_DTMM_CK_shenqing").setVisible(false);
//	Ext.getCmp("ZH_DTMM_CK_xiugai").hide();
//	Ext.getCmp("ZH_DTMM_CK_jiesuo").hide();
//	Ext.getCmp("ZH_DTMM_CK_shenqing").hide();
	Ext.getCmp("ZH_DTMM_CK").setVisible(false);
	
	Ext.getCmp("ZH_SJYH_CK_SQ").setVisible(false);
	Ext.getCmp("ZH_SJYH_CK_TJ").setVisible(false);
	Ext.getCmp("ZH_SJYH_CK_CZ").setVisible(false);
	Ext.getCmp("ZH_SJYH_CK_ZZ").setVisible(false);
	Ext.getCmp("ZH_SJYH_CK_ZX").setVisible(false);
//	Ext.getCmp("ZH_SJYH_CK_SQ").hide();
//	Ext.getCmp("ZH_SJYH_CK_TJ").hide();
//	Ext.getCmp("ZH_SJYH_CK_CZ").hide();
//	Ext.getCmp("ZH_SJYH_CK_ZZ").hide();
//	Ext.getCmp("ZH_SJYH_CK_ZX").hide();
	Ext.getCmp("ZH_SJYH_CK").setVisible(false);
	
	Ext.getCmp("ZH_DZMM_CK").setVisible(false);
	Ext.getCmp("ZH_DHMM_CK").setVisible(false);
	Ext.getCmp("over_WY").setVisible(false);
	Ext.getCmp("over_WY_XG").setVisible(false);
	Ext.getCmp("over_WY_JS").setVisible(false);
	Ext.getCmp("over_WY_SQ").setVisible(false);
	Ext.getCmp("over_SJ").setVisible(false);
	Ext.getCmp("over_SJ_SQ").setVisible(false);
	Ext.getCmp("over_SJ_TJ").setVisible(false);
	Ext.getCmp("over_SJ_CZ").setVisible(false);
	Ext.getCmp("over_SJ_ZZ").setVisible(false);
	Ext.getCmp("over_SJ_ZX").setVisible(false);
	Ext.getCmp("over_dzmm").setVisible(false);
	Ext.getCmp("over_dhmm").setVisible(false);
	//Ext.getCmp("tow_KJJK").setValue(false);	Ext.getCmp("tow_DZQD").setValue(false);
	//Ext.getCmp("tow_TZLC").setValue(false);	Ext.getCmp("tow_JJGS").setValue(false);
	checkbox_KJJK = false; checkbox_DZQD = false; checkbox_TZLC = false; checkbox_JJGS = false;
	if(type == 0){
		c1=0; c2=0; c3=0; c4=0;c5 = 0;
		//dtmm_sq = ""; dtmm_xg = ""; dtmm_js = "";
	 	//sjyh_sq = ""; sjyh_tj = ""; sjyh_cz = ""; sjyh_zz = ""; sjyh_zx = "";
	 	huiFuSJYHTextFile("clear");
	 	huiFuDTMMTextFile("clear");
	 	huiFuWYZSTextFile("clear");
	 	Ext.getCmp("dzyh_shenqing").setValue(false);
		Ext.getCmp("dzyh_chongzhi").setValue(false);
		Ext.getCmp("dzyh_xiugai").setValue(false);
		Ext.getCmp("dhyh_shenqings").setValue(false);
		Ext.getCmp("dhyh_chongzhi").setValue(false);
		Ext.getCmp("dhyh_xiugai").setValue(false);
		conhisid_DTMM_SQ = ""; conhisid_DTMM_XG = ""; conhisid_DTMM_JS = "";
		conhisid_SJYH_SQ = ""; conhisid_SJYH_TJ = ""; conhisid_SJYH_CZ = ""; conhisid_SJYH_ZZ = "";  conhisid_SJYH_ZX = "";
		conhisid_DZYH_SQ = ""; conhisid_DZYH_CZ = ""; conhisid_DZYH_XG = ""; 
		conhisid_DHYH_SQ = ""; conhisid_DHYH_CZ = ""; conhisid_DHYH_XG = "";
		// WYZS_code  2014/08/08
		conhisid_WYZS_SQ = ""; conhisid_WYZS_TJ = ""; conhisid_WYZS_GS = "";conhisid_WYZS_XE = ""; conhisid_WYZS_HFQY = ""; conhisid_WYZS_HFYZ = "";
		agentprints = "";
		Ext.getCmp("101307").setDisabled(false);
		Ext.getCmp("101309").setVisible(false);
		Ext.getCmp("101308").setVisible(true);
		Ext.getCmp("101310").setVisible(true);
		Ext.getCmp("101310").setDisabled(true);
	}
}

function getNull(src, len, str) {
	// str = getByteLen(src);
	var tmp = "";
	// alert(src + ":length:" + str);
	for (var a = 0; a < len - src.length; a++) {
		tmp += str;
	}
	return tmp + src;
}
function checkFunc() {
	jsLog(logStrMsg("Agent Click CheckIndentity Button !" ,"INFO"));
	SF_year = new Date().format('yyyy/MM/dd');
	SF_time = new Date().format('hh:mm:ss')
	checkSF = 1;
	//var ret = "error" ;
	//setTimeout("parseXmlFunc('error')",60000);   //模拟测试 ，延迟1分钟后自动给一个参数   赋值身份核查页面
	//暂时模拟身份核查的事件
	myocx.BankIDCardVeryfication("00301", getNull(getDealno("c:\\checkidcard.txt") + "", 6, "0"), "3v4","0000", cus_name, cus_cerno);
}
function parseXml(xml) {

}
var checkretInfo = "";  //核查返回的结果拼接字符串
function parseXmlFunc(xml) {
	var jiguan = "";
	var pic = "";   //核查返回照片的地址
	
	//模拟测试 联网核查
//	xml =   "<RETCODE>90000</RETCODE>"+
//			"<RETMSG></RETMSG>"+
//			"<OUT>"+
//			"<RESULT>00</RESULT>"+
//			"<JYLSH>20140522000008866308</JYLSH>"+
//			"<ISSUEOFFICE>此项暂不返回核查结果</ISSUEOFFICE>"+
//			"<NAME>金卫忠</NAME>"+
//			"<ID>330621196906253193</ID>"+
//			"<PHOTO>D:\BOBRVA\idpic\ 90718.jpg</PHOTO>"+
//			"</OUT>";
	
	
	var test;
	test = xml;
	jsLog(logStrMsg("  parseXmlFunc(xml): " + test,"INFO   "));
	test = test.split("<RESULT>")[1].split("</RESULT>");
	
	// $("input[name=check_deal]").attr("value", test[0]);
	//Ext.getCmp("check_deal").setValue(test[0]);
	test = test[1].split("<ISSUEOFFICE>")[1].split("</ISSUEOFFICE>");
	// $("input[name=check_jiguan]").attr("value", test[0]);
	jiguan = test[0];  //模拟测试
	//Ext.getCmp("check_jiguan").setValue(test[0]);
	test = test[1].split("<NAME>")[1].split("</NAME>");
	SF_name = test[0];
	// $("input[name=check_name]").attr("value", test[0]);
	//Ext.getCmp("check_name").setValue(test[0]);
	cus_name = test[0]; 
	test = test[1].split("<ID>")[1].split("</ID>");
	SF_cardID = test[0];
	// $("input[name=check_cerno]").attr("value", test[0]);
	//Ext.getCmp("check_cerno").setValue(test[0]);
	cus_cerno = test[0];
	test = test[1].split("<PHOTO>")[1].split("</PHOTO>");
	
	var idpic = '<div style="width:100px;text-align:center"><img src="'
			+ test[0] + '" style="width:80px;margin-left:20px"/></div>';
	//Ext.getCmp('checkid_pic').setValue(idpic);

	// $("img[name=check_pic]").attr("src", test[0]);
	//huyang|500223|保定北市|00|C:\\sdsd
	checkretInfo = SF_name+"&"+SF_cardID+"&"+jiguan+"&00"+"&"+test[0];
	jsLog(logStrMsg("Check Indentity(身份) StringBuffer->[checkretInfo] Value = "+ checkretInfo,"INFO"));
	
	if(BussChoicType == "FUND"){
		myocx.InvokeBusinessForm(8,"",997,checkretInfo);   //打开扫描证件Form
		jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe]","INFO"));
	}
}
function checkret(value) {
	//data[3] = Ext.getCmp('check_picaaa').getValue();
	// alert(Ext.getCmp('check_picaaa').getValue() + "||" +
	// Ext.get('check_picaaa_code').getValue());
	arrCheck[0] = value;
	checkAll();
}
function checkpic(value) {
	//data[5] = Ext.getCmp("check_pic").getValue();
	arrCheck[1] = value;
	checkAll();
}
function checkAll(){
	if (arrCheck[0] == "00" && arrCheck[1] == "2") {
		try {

			//Ext.getCmp("check_huji").setDisabled("");
			//Ext.getCmp("check_phone").setDisabled("");
			//Ext.getCmp("check_mobile").setDisabled("");
			//Ext.getCmp("check_circs").setDisabled("");

		} catch (e) {
			jsLog(logStrMsg("checkAll() method try catch info : " + e,"ERROR"));
			//alert("checkAll()：" + e);
		}

	} else {

		//Ext.getCmp("check_huji").setDisabled(true);
		//Ext.getCmp("check_province").setDisabled(true);
		//Ext.getCmp("check_city").setDisabled(true);

		//Ext.getCmp("check_phone").setDisabled(true);
		//Ext.getCmp("check_mobile").setDisabled(true);

		//Ext.getCmp("check_circs").setDisabled(true);
		//Ext.getCmp("check_zuoz").setDisabled(true);
		//Ext.getCmp("check_other").setDisabled(true);
		//Ext.getCmp("check_giveup").setDisabled(true);
		//Ext.getCmp("check_real").setDisabled(true);
		
		//Ext.getCmp("check_police").setDisabled(true);
	}
}
/**
 * @param:
 * @param {Object} value
 */
function checkhuji(value) {
	data[6] = value;
	if (value == "5") {

//		Ext.getCmp("check_province").setDisabled("");
//		Ext.getCmp("check_city").setDisabled("");
//		Ext.getCmp("check_province").focus();
	} else if (value == "") {
		alert("户籍必输！");
	} else {
//		Ext.getCmp("check_province").setDisabled(true);
//		Ext.getCmp("check_city").setDisabled(true);
//		Ext.getCmp("check_phone").focus();
	}
}

function saveData(value, index) {
	data[index] = value;
}

function checkphone(value, id) {
	try {
		if (value == "" && (document.getElementById(id).value) == "") {
			alert("联系电话和手机不能同时为空!");
		}
	} catch (e) {
		jsLog(logStrMsg("checkphone() method try catch info : "+e,"ERROR"));
		//alert("checkphone:" + e);
	}

}
function checkphoneAny() {
	return Ext.getCmp("check_phone").getValue() != ""
			|| Ext.getCmp("check_mobile").getValue() != "";
}

function checkNull(id) {
	if (Ext.getCmp(id).getValue() == "") {
		Ext.getCmp(id).focus();
	}
}

function selected() {// 需要查找jquery中过滤select选中的方法。
	if (data[3] == "00") {
		return "公民身份号码与姓名一致，且存在照片";
	} else if (data[3] == "01") {
		return "公民身份号码与姓名一致，但不存在照片";
	} else if (data[3] == "02") {
		return "公民身份号码存在，但与姓名不匹配";
	} else if (data[3] == "03") {
		return "公民身份号码不存在";
	} else if (data[3] == "04") {
		return "其他错误";
	} else if (data[3] == "05") {
		return "输入的参数错误";
	}
}

function checkPSResult(info) {// 需要查找jquery中过滤select选中的方法。
	if (info == "00") {
		return "公民身份号码与姓名一致，且存在照片";
	} else if (info == "01") {
		return "公民身份号码与姓名一致，但不存在照片";
	} else if (info == "02") {
		return "公民身份号码存在，但与姓名不匹配";
	} else if (info == "03") {
		return "公民身份号码不存在";
	} else if (info == "04") {
		return "其他错误";
	} else if (info == "05") {
		return "输入的参数错误";
	}
}


function makePrintFile() {
	// var dealno = "T00120120101";//终端传入的本次业务流水号
	// var filepath = "c:\\" + dealno + "checkRetFile.txt";
	var filepath = savepicDir + "/H" + dealno + "checkRetFile.txt";
	var txt = "\n\n\n\n\n\n\n" + "\n				业务名称：		单笔核对交易结果" + "\n				核对人姓名： 	"
			+ data[0] + "\n				身份证号：		" + data[1] + "\n				核对结果：		"
			+ selected() + "\n\n" + "\n		网点号：" + agsite + "		操作员：" + agentno
			+ "	日期：" + new Date().format('yyyyMMdd') + "	时间"
			+ new Date().format('hhmmss');
	try {
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		var fh = fso.OpenTextFile(filepath, 2, true);// 只读=1，只写=2 ，追加=8 等权限
		fh.WriteLine("\n\n\n\n\n\n\n");
		fh.WriteLine("\n	业务名称：	单笔核对交易结果");
		fh.WriteLine("\n	核对人姓名：	" + data[0]);
		fh.WriteLine("\n	身份证号：	" + data[1]);
		fh.WriteLine("\n	核对结果：	" + data[3]);
		fh.WriteLine("\n\n\n    网点号：00501    操作员：608    日期："
				+ new Date().format('yyyyMMdd') + "    时间："
				+ new Date().format('hhmmss'));

		fh.Close();
	} catch (e) {
		//alert("makePrintFile:" + e);
		jsLog(logStrMsg("makePrintFile:" + e,"ERROR"));
	}

}

function showPage() {
	makePrintFile();
	// alert($("#check_circs").attr("value"));
	// $("#check_zuoz").attr("disabled", true);
	// $("#check_other").attr("disabled", true);
	// $("#check_giveup").attr("disabled", "");
	// $("#check_real").attr("disabled", "");
	// $("#check_police").attr("disabled", "");
	// alert(data[12]);
	// var ret = "";
	// for(var a in data){
	// ret += "--" + a;
	// }
	// alert(ret);
	// var ret = "";
	// for(var a=0; a<data.length; a++){
	// ret += "--" + data[a];
	// }
	// alert(ret);
}

// 表单数据缓存
var cus_Map = new Map();
function agentParam() {
	try {
		jsLog(logStrMsg("开始读取agentParam配置文件","INFO"));
		var fso = new ActiveXObject("scripting.filesystemobject");
		var txtstream = fso.openTextFile('c:\\agent.config');
		while (!txtstream.atEndOfLine) {
			var line = txtstream.ReadLine();
			if (line.indexOf('agentno=') == 0) {// var agentno, agcallno,
				// agsite;
				agentno = line.substring('agentno='.length, line.length);
				jsLog(logStrMsg("agentno="+agentno,"INFO"));
			} else if (line.indexOf('agentcallno=') == 0) {
				agcallno = line.substring('agentcallno='.length, line.length);
				jsLog(logStrMsg("agcallno="+agcallno,"INFO"));
			} else if (line.indexOf('agentsite=') == 0) {
				agsite = line.substring('agentsite='.length, line.length);
				jsLog(logStrMsg("agsite="+agsite,"INFO"));
			} else if (line.indexOf('savepicDir=') == 0) {
				savepicDir = line.substring('savepicDir='.length, line.length);
				jsLog(logStrMsg("savepicDir="+savepicDir,"INFO"));
			} else if (line.indexOf('videoIndex0=') == 0) {
				videoIndex[0] = line.substring('videoIndex0='.length,
						line.length);
				jsLog(logStrMsg("videoIndex[0]="+videoIndex[0],"INFO"));
			} else if (line.indexOf('videoIndex1=') == 0) {
				videoIndex[1] = line.substring('videoIndex1='.length,
						line.length);
				jsLog(logStrMsg("videoIndex[1]="+videoIndex[1],"INFO"));
			}

		}
		txtstream.close();
		txtstream = null;
		fso = null;
	} catch (e) {
		jsLog(logStrMsg("read C:\\agent.config loss try catch info : " + e,"ERROR"));
		
	}
}
//2015-11-09 新增方法，读取elvish.properties文件
function readElvish(){
	try {
		jsLog(logStrMsg("开始读取elvish配置文件","INFO"));
		var fso = new ActiveXObject("scripting.filesystemobject");
		var txtstream = fso.openTextFile('c:\\elvish.properties');
		while (!txtstream.atEndOfLine) {
			var line = txtstream.ReadLine();
			if (line.indexOf('phoneNum=') == 0) {// var agentno, agcallno,
				phoneNum = line.substring('phoneNum='.length, line.length);
				jsLog(logStrMsg("phoneNum="+phoneNum,"INFO"));
			}
		}
		txtstream.close();
		txtstream = null;
		fso = null;
	} catch (e) {
		jsLog(logStrMsg("read C:\\elvish.properties loss try catch info : " + e,"ERROR"));
	}
}

var arr;
var videoIndex = [1, 0];
// 声明视频组件
// var varmyocx = '<object classid="clsid:CD3641E8-CF1F-40CC-ACA3-0C25A0DD7486"
// id="myocx" name="myocx" ' + 'class="testOCX.ocx" height="0" width="0"
// VIEWASTEXT ID=Object1>' + '</object>';
// var varvideoocx = '<div style="text-align:center;width:100%;"><object 
// classid="clsid:E25AFF08-CAB8-47B4-82C0-704BE1585431" name="videoocx"' +
// 'class="VideoOCX.ocx" height="750" width="350" VIEWASTEXT ID=Object1>' +
// '</object></div>';

function videoinit() {
	//alert("videoinit function begin ...");
	myocx.VideoInitEx1(agentno, agsite, 2, 6006);
	jsLog(logStrMsg("调用myocx.VideoInitEx1接口完成 Path：agentno="+agentno+"//agsite="+agsite,"INFO"));
}
function videosetpara() {
	// tmid, site, videoip, port
	myocx.VideoAgentSetParaEx1(tmid, site, videoip, port, 0);
	myocx.VideoAgentSetParaEx1(tmid, site, videoip, port, 1);
	// videoocx.VideoAgentSetParaEx1("T001","S002","10.160.4.51",6005,0);
	// videoocx.VideoAgentSetParaEx1("T001","S002","10.160.4.51",6005,1);
	jsLog(logStrMsg("videosetpara()-->tmid="+tmid+"//site="+site+"//videoip="+videoip+"//port="+port,"VIDEO"));
}

function videostartvedio() {
	jsLog(logStrMsg("videostartvedio()-->videoIndex[0] = "+videoIndex[0],"VIDEO"));
	myocx.VideoStartConferenceEx2(0, 12345, 0, 1, "", videoIndex[0], 0, 0,320, 240);
}
function videostopvedio() {
	jsLog(logStrMsg("videostopvedio()-->videoIndex[0] = "+videoIndex[0],"VIDEO"));
	try {
		myocx.VideoStopConferenceEx(0, 12345, 0, videoIndex[0]);
	} catch (e) {
		jsLog(logStrMsg(e,"VIDEOERROR"));	
	}
	
}
function videosavepic() {

	var picpath = // savepicDir + new Date().format("yyMdhms") + ".bmp";
	savepicDir + "C" + dealno + ".bmp";
	// alert("save picpath :" + picpath);
	// picpath = "D:\liqi.bmp";//这里传入的参数不接受
	myocx.VideoSaveVideoFrameEx(picpath, videoIndex[0]);
	jsLog(logStrMsg("videosavepic()-->myocx.VideoSaveVideoFrameEx(picpath, videoIndex[0])","INFO"));
	// showcuspic(picpath);
	return picpath;
}
function videoexit() {
	myocx.VideoExit();
}
function videorate1() {
	var rate = myocx.VideoGetRateEx(videoIndex[0]);
}

function videostartvedio1() {
	jsLog(logStrMsg("videostartvedio1() videoIndex[1] = "+videoIndex[1],"VIDEO"));
	myocx.VideoStartConferenceEx2(0, 12345, 0, 1, "", videoIndex[1], 0, 0,320, 240);
}
function videostopvedio1() {
	jsLog(logStrMsg("videostopvedio1() videoIndex[1] = "+videoIndex[1],"VIDEO"));
	myocx.VideoStopConferenceEx(0, 12345, 0, videoIndex[1]);
}
// function
// videosavepic1(){videoocx.VideoSaveVideoFrameEx("D:\\1234.bmp",videoIndex[0]);}
function videorate2() {
	var rate = myocx.VideoGetRateEx(videoIndex[1]);
}

function VideoSetDealno(str) {
	myocx.VideoSetBusinessCode(str);
}// 视频文件名接口
// 脚本
function agentinit() {
	if (isConn == 0) {
		//alert("agentinit function begin ...");
		 agentParam();
		 readElvish();
		jsLog(logStrMsg("agentinit()函数调用videoInit();","INFO")); //记录日志
		videoinit();
		myocx.AgentInitEX(agentno, agcallno, agsite);
		jsLog(logStrMsg("调用myocx.AgentInitEX接口完成 Path：agentno="+agentno+"//agcallno="+agcallno+"//agsite="+agsite,"INFO"));
	} else {
		prn("isconn:" + isConn);
	}
	// myocx.AgentInitEX("A001", "6001", "S001");

	
	
}
function agentmakecall(t,s){
	jsLog(logStrMsg("agentmakecall()","INFO"));
	if (isConn == 0) {
		// alert("agent makecall!");
		// termno ,termsite
		// alert("termno:" + termno);
		// alert("termsite:" + termsite);
		// myocx.AgentMakeCall("T001", "S002", 123456, 654321, 1, 1, 15000);
		// alert("agent makecall ok!");
		/** 参数化 */
		myocx.AgentMakeCall(t, s, 123456, 654321, 1, 1, 15000);
		// alert("agent makecall ok!");
	} else {// 请求连接时，发现已连接，先断开，再连接
		// alert(isConn);
		//agenthangup();
		// myocx.AgentMakeCall("T001", "S002", 123456, 654321, 1, 1, 15000);
		myocx.AgentMakeCall(t, s, 123456, 654321, 1, 1, 15000);
	}
}
function agentanswer() {
	myocx.AgentAcceptCallEx();
}
// function savepic() {
// myocx.AgentSaveVedioFrame("D:\\123.bmp");
// }
function agentexit() {
	myocx.AgentExit();
}
function getvideo() {
	var a = myocx.AgentGetVideoInfoEx();
	// 格式：终端编号,IP地址,端口号，IP地址和端口号用于视频控件
	var videoPm = a.split(",");
	if (videoPm.length != 3) {
		prn("获取视频信息失败！此级别是否停止办理业务？");// TODO 此级别是否停止办理业务？
	} else {
		tmid = videoPm[0];
		site = videoPm[1];
		videoip = videoPm[2];
		port = videoPm[3];
	}
}

function posPlay() {
	myocx.AgentSendMessage(1, 2, "qqqqqqqqqqqqqqqq");
}
//对应相应的事件函数 RegAgentEvtScanResult(lScanResult, strScanFilePath)
function scandoc() {
	prn('agent scandoc');
	if (cus_cerno == null || cus_cerno == undefined) {
		alert("扫描签字文件时，发现客户的证件号不存在，请确认是否存在此问题!");
		cus_cerno = "Agent has checked that var is not null";
	} else {
		myocx.AgentScanDoc(cerno + "bob.jpg", 0);// 调用此接口，传入文件名无意义？
	}
}

function confirmCusInfos(){
	if(totalBussines == "one"){//判断是否是一期的Term
		jsLog(logStrMsg("SENDMESSAGE:lObjectID:1,lItemID:1,message:isCheckID","MESSAGE")); 
		myocx.AgentSendMessage(1, 1, 'isCheckID');
	}
	//myocx.AgentSendMessage(1, 1, 'isCheckID');	// 这里可以传入isCheckID，并通知客户端isCheckID
	jsLog(logStrMsg("FUNCTION confirmCusInfos() TAKE Agent Go PAGE","INFO"));
	if(BussChoicType == "KJJK" || BussChoicType == "DZQD"){   //如果不是投资理财就跳转到章程页面
		synWithTerm(4, 1);	// 跳转下一页，章程
	}else{
		// 投资理财 和 借记卡挂失 都没有章程，直接跳转到插卡提示页面
		synWithTerm(18,1);  
		jsLog(logStrMsg("confirmCusInfos_  ..  BussChoicType = " + BussChoicType + " --- cardNumber = " + cardNumber,"INFO   "));
		if(cardNumber != ""){
			//Ext.getCmp("goNext").setVisible(true);   8080 
		}
		//20141029  打开读取卡号 EXE 程序
		myocx.InvokeBusinessForm(7,"",0,cardNumber);
		jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[ReadCardNumPage.exe]","INFO"));
	}
}

function showprotocol() {
	// prn("刷完idcard，推送章程给客户！");
	myocx.AgentSendMessage(1, 2, "这是章程，展示给客户的！");
}
// 控制权,code:被控对象id，flag:是否被控制（可编辑）。只有填单页1005、1006才控制
function manage(code, flag) {
	Ext.getCmp(code).setDisabled(flag);// 坐席端是否被控制:flag
	//jsLog(logStrMsg("SENDMESSAGE:lObjectID:1,lItemID:"+flag ? 0 : 1+",message:editmyself","MESSAGE"));
	myocx.AgentSendMessage(1, flag ? 0 : 1, 'editmyself');   // Ext.getCmp().getValue() function showTable(){}
}
// 控制客户端。释放坐席端
// function
var cus_sheng = "";  //缓存数据
var cus_city = "";
var cus_qu = "";
var cus_addinfo = ""; 
var addr2 = "";     //总体的地址信息
var cus_sheng_key = ""; //缓存省的id
var cus_sheng_key_ts="";  //对特殊直辖市的消息传送保证无误
var cus_city_key = "";


function sysn(name) {
//	if (name == 'cus_call' || name == 'cus_callquhao') {// 固定电话特殊cus_callquhao +
//		myocx.AgentSendMessage(1, 2, "0511309|cus_call|" + Ext.getCmp(name + 'quhao').getValue() + "-" + Ext.getCmp(name).getValue());
//	}else{
//		if(name == 'cus_addInfo'){
//			cus_addinfo = Ext.get(name).getValue();
//			addr2 =  cus_sheng + cus_city + cus_qu + cus_addinfo;
//		}
//		myocx.AgentSendMessage(1, 2, "0511309|" + name + "|" + Ext.getCmp(name).getValue());
//	}
//	jsLog(logStrMsg("SENDMESSAGE:lObjectID:1,lItemID:2,message:0511309|"+name+ "|" + Ext.getCmp(name).getValue(),"MESSAGE"));
}

//同步地址信息
function sysAdd(name,id){
		//由于数据库存储地方编码数据类型问题，只有取出赋值
		if(id=="1"){
			id="A00000";
		}else if(id=="2"){
			id="B00000";
		}else if(id=="3"){
			id="C00000";
		}else if(id=="4"){
			id="D00000";
		}
		//Ext.getCmp("schemaVersion").value //取到的是valueField 的值  
		//Ext.get('schemaVersion').dom.value //取到的是displayField 的值   
		if(name == 'cus_sheng'){
			addr2=" ";
			cus_city=" ";
			cus_qu=" ";
			//cus_addinfo=" ";
			//Ext.getCmp("cus_addInfo").setValue("");
			cus_sheng_key_ts=id;
			cus_sheng = Ext.get(name).getValue();
			cus_sheng = cus_sheng.replace(/(^\s*)|(\s*$)/g, "");//去掉地址信息前后空格
		}
		if(name == 'cus_city'){
			addr2=" ";
			cus_qu = " ";
			//cus_addinfo=" ";
			cus_city = Ext.get(name).getValue();
			id = cus_sheng_key_ts+"-"+id;
			//Ext.getCmp("cus_addInfo").setValue("");
			cus_city =cus_city.replace(/(^\s*)|(\s*$)/g, "");//去掉地址信息前后空格
		}
		if(name == 'cus_qu'){
			jsLog(logStrMsg("发送消息区，市的值为：|"+cus_city+"|","MESSAGE"));
			jsLog(logStrMsg("发送消息区，市的key为：|"+getGTIndex(cus_city.replace(/(^\s*)|(\s*$)/g,""))+"|","MESSAGE"));
			//cus_addinfo=" ";
			cus_qu = Ext.get(name).getValue();
			//Ext.getCmp("cus_addInfo").setValue("");
			id = cus_sheng_key_ts+"-"+getGTIndex(cus_city.replace(/(^\s*)|(\s*$)/g,""))+"-"+id;
			cus_qu =cus_qu.replace(/(^\s*)|(\s*$)/g, "");  //去掉地址信息前后空格
		}
		addr2 = cus_sheng + cus_city + cus_qu;  
		//Ext.getCmp('cus_vocationfm').setValue(Ext.get('cus_addrfm').dom.value);
		//alert("传到终端之前的addr2" + addr2);
		jsLog(logStrMsg("SENDMESSAGE:lObjectID:1,lItemID:2,message:0511309|" + name + "|" + Ext.get(name).getValue()+"|" + id + "|" + addr2,"MESSAGE"));
		//myocx.AgentSendMessage(1, 2, "0511309|" + name + "|" + Ext.get(name+"_code").dom.value + "|" + Ext.get(name).getValue());
		myocx.AgentSendMessage(1, 2, "0511309|" + name + "|" + Ext.get(name).getValue()+"|" + id + "|" + addr2);
		
		
	
}

//测试 挂失业务填写页面省市县显示传值‘
function GS_sysAdd(name , id){
	if(id=="1"){
		id="A00000";
	}else if(id=="2"){
		id="B00000";
	}else if(id=="3"){
		id="C00000";
	}else if(id=="4"){
		id="D00000";
	}
	if(name == "GS_sheng"){
		getMsgBody4G2("M0206","P033",2,"","Loss_Province:"+Ext.get(name).getValue());
	}else if(name == "GS_city"){
		getMsgBody4G2("M0206","P033",2,"","Loss_City:"+Ext.get(name).getValue());
	}else if(name == "GS_qu"){
		getMsgBody4G2("M0206","P033",2,"","Loss_Town:"+Ext.get(name).getValue());
	}
}

//保存三个地址段
function saveaddrcm() {
	addr2 =  cus_sheng + cus_city + cus_qu + cus_addinfo;
	//给坐席端的确认页面赋值
	//Ext.getCmp('cus_addrfm').setValue(addr2);
	
//	var addrcm =
//  Ext.get('cus_addr').dom.value + Ext.get('cus_addr1').dom.value +
//	Ext.getCmp('cus_addr2').getValue();
//	Ext.getCmp('cus_addrfm').setValue(addrcm);
}

function combosysn(name, itemid, value) {
	// 0511409|cus_vocation|1G|生产工作，运输工作和部分体力劳动者
	//alert("name"+name+"itemid"+itemid+"value"+value);
	jsLog(logStrMsg("SENDMESSAGE:lObjectID:1,lItemID:2,message:0511409|" + name + "|" + itemid + "|" + value,"MESSAGE"));
	myocx.AgentSendMessage(1, 2, "0511409|" + name + "|" + itemid + "|" + value);
	
}

function rel() {
	jsLog(logStrMsg("SENDMESSAGE:lObjectID:1,lItemID:2,message:051166","MESSAGE"));
	myocx.AgentSendMessage(1, 2, "0511666");
}

function agenthangup() {
	myocx.Agentstopconferenceex();
}
function printidcard(str) {
	// myocx.AgentCheckID("D:\\123.bmp");
	if(str == "888"){
		getMsgBody4G2("M0888","P888",4,"",""); 
	}else{
		myocx.AgentCheckID("123.bmp"); //传参调用发送消息
		// 点击扫描证件 发送消息后 将扫描证件按钮灰掉  并提示请坐席确认客户证件是否放好？
		//Ext.getCmp("scanIndentity").setDisabled(true);
		//Ext.getCmp("100201").setValue("证件扫描中，请等待...（若等待时间过长请确认客户是否正确放好证件）");
	}
	
	// myocx.AgentSendMessage(1, 1, "isCheckID");//通知我已点击了
}
// 同步select
function sysVoc(name, index) {
	// var mysel = document.getElementById("cus_vocation");
	var mysel = Ext.getCmp(name);
	mysel.setValue(index);
}
// 封装弹出框
// function myAlert(title, content, autoclose){//autoclose : boolean
function myAlert(title, content) {// autoclose : boolean
	// Ext.Msg.alert('<font style="color:#bf1919">测试友情提示：</font>','<font
	// style="font-size:28px;color:#bf1919"> 客户已接受服务章程，请进行下一步操作！</font>');
	var win = new Ext.Window({
		width : 500,
		title : title,
		height : 200,
		html : content,
		buttonAlign : 'center',
		buttons : [{
					text : '<font style="font-size:16px;margin-top:0px">确定</font>',
					width : 60,
					height : 30,
					handler : function() {
						win.close();
					}

				}]
	});
	win.show();
}
function myConfirm(title, content, fn_ok, fn_no) {
	// Ext.Msg.alert('<font style="color:#bf1919">测试友情提示：</font>','<font
	// style="font-size:28px;color:#bf1919"> 客户已接受服务章程，请进行下一步操作！</font>');
	var win = new Ext.Window({
		width : 500,
		title : title,
		height : 200,
		html : content,
		modal : true,
		buttonAlign : 'center',
		buttons : [{
					text : '<font style="font-size:16px;margin-top:0px">确定</font>',
					width : 60,
					height : 30,
					handler : fn_ok(this)
				}, {
					text : '<font style="font-size:16px;margin-top:0px">取消</font>',
					width : 60,
					height : 30,
					handler : fn_no
				}]
	});
	win.show();
}

/**
 * ‘友情提示’弹窗专用
 */
function friendShipMsg(mes){
	var win = new Ext.Window({
			width : 500,
			title : '友情提示',
			height : 200,
			html : '<font style="font-size:28px;color:red"><br>&nbsp;&nbsp;&nbsp;&nbsp'+mes+'</font>',
			modal : true,
			buttonAlign : 'center',
			buttons : [{
				text : '<font style="font-size:16px;margin-top:0px">确定</font>',
				width : 60,
				height : 30,
				handler : function() {
					jsLog(logStrMsg("关闭友情提示->输出关键变量：globalcurpage="+globalcurpage+"，BussChoicType="+BussChoicType,"INFO"));
					win.close();
					if(globalcurpage == 0 && BussChoicType != "FUND"){  //证明在首页
						//myocx.InvokeBusinessForm(1,"",2,"");
						jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[agentIndexPage.exe] 2：弹出","INFO"));
					}else if(globalcurpage == 7 && BussChoicType != "FUND"){  //证明在签字页面
						//myocx.InvokeBusinessForm(2,"",2,"");
						myocx.InvokeBusinessForm(4,"",2,"ERROR");
						jsLog(logStrMsg("调用winform->弹出BusinessForm[CheckSignForm]程序","INFO"));
					}else if(globalcurpage == 8 && BussChoicType != "FUND"){
						myocx.InvokeBusinessForm(4,"",2,"ERROR");
						jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[CheckSignPage.exe] 2：弹出","INFO"));
					}else if(BussChoicType == "FUND"){
						myocx.InvokeBusinessForm(8,"",985,"");   //将之前处于当前Form的页面打开
						jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe] 985：打开指定的form","INFO"));
					}else if(globalcurpage == 18 && (BussChoicType == "TZLC" || BussChoicType == "DZQD")){
						myocx.InvokeBusinessForm(7,"",2,"");   //将之前处于当前Form的页面打开
						jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[ReadCardNumPage.exe] 2：弹出","INFO"));
					}
				}
			}]
		});
		win.show();
}

/**
 * ‘友情提示2’弹窗专用2
 */
function friendShipMsg_1(mes){
	var win = new Ext.Window({
			width : 500,
			title : '友情提示',
			height : 200,
			html : '<font style="font-size:28px;color:red"><br>&nbsp;&nbsp;&nbsp;&nbsp'+mes+'</font>',
			modal : true,
			buttonAlign : 'center',
			buttons : [{
				text : '<font style="font-size:16px;margin-top:0px">确定</font>',
				width : 60,
				height : 30,
				handler : function() {
					win.close();
					
				}
			}]
		});
		win.show();
}



/**
 * 超3张专用弹窗
 */
function outOfThreeCards(mes){
	var win = new Ext.Window({
			width : 500,
			title : '友情提示',
			height : 200,
			html : '<font style="font-size:28px;color:red"><br>&nbsp;&nbsp;&nbsp;&nbsp'+mes+'</font>',
			modal : true,
			buttonAlign : 'center',
			buttons : [{
				text : '<font style="font-size:16px;margin-top:0px">返回视频页</font>',
				width : 60,
				height : 30,
				handler : function() {
					//返回视频首页消息
					synWithTerm(0,1);
					getMsgBody4G2("M0101","P004",1,"P004","");
					//Ext.getCmp("tow_TZLC").setValue(false);	Ext.getCmp("tow_JJGS").setValue(false);Ext.getCmp("tow_KJJK").setValue(false);	Ext.getCmp("tow_DZQD").setValue(false);
					BussChoicType == "";
					visibledSomePage(1);
					win.close();
					
					//myocx.InvokeBusinessForm(1,"",0,YesOrNo_FUND);
					myocx.InvokeBusinessForm(10,"",101,"");
					jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm [agentIndexPage.exe]","INFO"));
					
				}
			}]
		});
		win.show();
}



/**
 * ‘电子渠道’电子银行密码输错3次弹窗专用   cus_dzyhpwd',cus_checkpwdinfo
 */
function transactionReturnMsg(mes){
	var win = new Ext.Window({
			width : 500,
			title : '友情提示',
			height : 200,
			//html : '<font style="font-size:28px;color:red"><br>&nbsp;&nbsp;&nbsp;&nbsp'+mes+'</font>',
			html : '<font style="font-size:28px;color:red"><br>&nbsp;&nbsp;&nbsp;&nbsp'+mes+'</font>',
			modal : true,
			buttonAlign : 'center',
			buttons : [{
				text : '<font style="font-size:16px;margin-top:0px">返回视频页</font>',
				width : 60,
				height : 30,
				handler : function() {
					//Ext.getCmp("101902").setValue("已有客户卡号，等待客户确认卡号并进行下一步");
					//并且发送消息告诉曲晓跳转到视频通话页面
					getMsgBody4G2("M0202","P034",1,"P004",""); 
					fristBusiness ++;
					synWithTerm(0,1);
					visibledSomePage(0);
					//Ext.getCmp("tow_TZLC").setValue(false);	Ext.getCmp("tow_JJGS").setValue(false);Ext.getCmp("tow_KJJK").setValue(false);	Ext.getCmp("tow_DZQD").setValue(false);
					BussChoicType == "";
					win.close();
					
					//myocx.InvokeBusinessForm(1,"",0,YesOrNo_FUND);
					myocx.InvokeBusinessForm(10,"",101,"");
					jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[AgentModuleChoice.exe]","INFO"));
				}
			},{
				text : '<font style="font-size:16px;margin-top:0px">返回综合填写页</font>',
				width : 60,
				height : 30,
				handler : function() {
					 //并且告诉VTM返回到填写页面
					//visibledSomePage(0);
					getMsgBody4G2("M0202","P034",1,"P012","");
					visibledSomePage(1);
					synWithTerm(12,1);
					win.close();
				}
			},{
				text : '<font style="font-size:16px;margin-top:0px">继续输入密码</font>',
				width : 60,
				height : 30,
				handler : function() {
					//发送消息让VTM继续输入密码环节
					getMsgBody4G2("M0202","P034",1,"P018","");
					Ext.getCmp("cus_dzyhpwd").setValue("");
					Ext.getCmp("cus_checkpwdinfo").setValue("");
					win.close();
				}
			}]
		});
		win.show();
}


//支付密码输错3次以及电子银行密码输错6次锁定
function ZForDZsixError(mes , YWtype){
	var win = new Ext.Window({
			width : 500,
			title : '友情提示',
			height : 200,
			html : '<font style="font-size:28px;color:red"><br>&nbsp;&nbsp;&nbsp;&nbsp'+mes+'</font>',
			modal : true,
			buttonAlign : 'center',
			buttons : [{
				text : '<font style="font-size:16px;margin-top:0px">返回视频页</font>',
				width : 60,
				height : 30,
				handler : function() {
					//Ext.getCmp("101902").setValue("已有客户卡号，等待客户确认卡号并进行下一步");
					getMsgBody4G2(YWtype,"P034",1,"P004","");
					fristBusiness ++;
					synWithTerm(0,1);
					if(YWtype == "M0202"){
						visibledSomePage(0);
					}
					//Ext.getCmp("tow_TZLC").setValue(false);	Ext.getCmp("tow_JJGS").setValue(false);Ext.getCmp("tow_KJJK").setValue(false);	Ext.getCmp("tow_DZQD").setValue(false);
					BussChoicType == "";
					win.close();
					//myocx.InvokeBusinessForm(1,"",0,YesOrNo_FUND);
					myocx.InvokeBusinessForm(10,"",101,"");
					jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[AgentModuleChoice.exe]","INFO"));
				}
			}]
		});
		win.show();
}


function DHYHWrithError(mes , YWtype){
	var win = new Ext.Window({
			width : 600,
			title : '友情提示',
			height : 200,
			html : '<font style="font-size:28px;color:red"><br>&nbsp;&nbsp;&nbsp;&nbsp'+mes+'</font>',
			modal : true,
			buttonAlign : 'center',
			buttons : [{
				text : '<font style="font-size:16px;margin-top:0px">返回综合填写页</font>',
				width : 60,
				height : 30,
				handler : function() {
				 //并且告诉VTM返回到填写页面
					getMsgBody4G2(YWtype,"P034",1,"P012","");
					synWithTerm(12,1);
					win.close();
				}
			}]
		});
		win.show();
}



function backToindex_ok(btn) {
	jsLog(logStrMsg("SENDMESSAGE:lObjectID:1,lItemID:1,message:backToindex","MESSAGE"));
	myocx.AgentSendMessage(1, 1, "backToindex");//
}
function backToindex_cancle(btn) {
}
// 日志变量
var begindate, enddate, actioninfos;
Date.prototype.format = function(format) // author: meizz
{
	var o = { 
		"M+" : this.getMonth() + 1, // month
		"d+" : this.getDate(), // day
		"h+" : this.getHours(), // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
		"S" : this.getMilliseconds()
		// millisecond
	};
	if (/(y+)/.test(format))
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4
						- RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1
							? o[k]
							: ("00" + o[k]).substr(("" + o[k]).length));
	return format;
};
// 注册ocx事件
function Regagentalert(strCallMessage) {
	// prn("agent:有客户请求连接" + strCallMessage);
	// begindate = new Date().format("yyyy-MM-dd hh:mm:ss");
	// actioninfos = begindate + " agent:有客户请求连接\n";
}
// 发起连接超时AgentEvtMakeCallTimeoutEx(long
// lReason)、被连接超时AgentEvtAcceptCallTimeout(lReason)
function RegAgentCallTimeout(lReason) {// 发起呼叫，对方应答超时
	alert("AgentEvtMakeCallTimeoutEx:" + lReason);
}
function RegAgentAcceptCallTimeout(lReason) {// 被客户端连接时，才用
	alert("AgentEvtAcceptCallTimeout:" + lReason);
}

function Regagentconn_1(strCallMessage){
	jsLog(logStrMsg("Regagentconn_1(strCallMessage)  @Param:strCallMessage="+strCallMessage,"INFO")); //记录日志
	jsLog(logStrMsg("坐席员的照片路径 -> 111","INFO")); //记录日志
	jsLog(logStrMsg("坐席员的照片路径 -> ("+curagent.user.photo+");","INFO")); //记录日志
	
	myocx.AgentSendMessage(1, 8989, curagent.user.photo == null
					? "images/photo_01.jpg"
					: curagent.user.photo);
	myocx.AgentSendMessage(1, 8990, curagent.user.gonghao == null
					? "G001"
					: curagent.user.gonghao);
	
	
	
	//jsLog(logStrMsg("strCallMessage_1已经得到值 = "+strCallMessage_1,"INFO")); //记录日志
	// 初始化禁用表单。坐席先输入，屏蔽
	// manage('100501', true);//通信有bug
	// Ext.getCmp('100501').setDisabled(true);
	isConn = 1;
	// alert("agent:客户已连接" + strCallMessage);
	// 记录客户连接开始时间
	begindate = new Date().format("yyyy-MM-dd hh:mm:ss");
	actioninfos = begindate + "agent:客户已连接\n";
	// 获得strTerminalNo,strSiteID,lLogNo,lCallID,lBusinessType,lSubType,lResult
	// 设置设备号strTerminalNo和所属机构strSiteID
	//T002|S002|10.160.4.153|6006|0|0|0
	var stringArray = new Array();
	//stringArray = strCallMessage.split("|");
	// for(var tmp=0; tmp < stringArray.length; tmp++){
	// prn(stringArray[tmp]);
	// }TODO
	if (stringArray.length < 3) {
		Ext.getCmp('strTerminalNo').setValue('设备异常！未连接...');
		Ext.getCmp('strSiteID').setValue('设备异常！未连接...');
		return;
	}
//	Ext.getCmp('strTerminalNo').setValue(stringArray[0]);
//	Ext.getCmp('strSiteID').setValue(stringArray[1]);
	Ext.getCmp('call_date').setValue(begindate);
	if (curagent.user.photo == null || curagent.user.photo == "") {
		alert("坐席员的照片为空！请上传照片！");
	} else if (curagent.user.gonghao == null || curagent.user.gonghao == "") {
		alert("坐席员的工号为空！请联系管理员！");
	}
	//cifangfa shi zuo xi yuan no money no more 
	
	jsLog(logStrMsg("dealno[" + dealno + "]  siteNo["+ agsite+"]   agentNo["+agentno+"]   agcallno["+agcallno+"]","INFO")); //记录日志
	// videostartvedio();
}


function CallIn(){
	//打开CallIn页面；
	App.clickTopTab("CusPersonalFormCallin",_cfg_1,function() {},function(){
		var tid = window.setInterval(function(){
			jsLog(logStrMsg("经过手动延时一秒打开cusPersonalFormCallin弹屏js","INFO"));
			if(typeof(CusPersonalFormCallin) != 'undefined'){
				//CusPersonalFormCallin.initPanel(customerId);
				window.clearInterval(tid);
			}
		},1000)
	},function() {
		//alert("createHisConHis  _cfg:" + _cfg);
		//alert("customerId:" + customerId);
		//alert("CALLINNO:" + CALLINNO);
		//alert("customerNo:" + customerNo);
		jsLog(logStrMsg("CusPersonalFormCallin.initData(customerId,CALLINNO,customerNo);","INFO"));
		CusPersonalFormCallin.initData(customerId,CALLINNO,customerNo);
		var arr = _cfg_1.split(',');
		cusId = arr[0];
		CusPersonalFormCallnumber = arr[1];
		cusNo = arr[5];
		if (cusId == 'null') {
			cusId = -1;
		}
	});
}

//打开C#form窗口
function BusFormShow(){
	//myocx.InvokeBusinessForm(1,"",0,YesOrNo_FUND);
	myocx.InvokeBusinessForm(10,"",101,"");
	jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[AgentModuleChoice.exe]","INFO"));
}
//关闭C#form窗口
function BusFormClose(){
	jsLog(logStrMsg("BusFormClose -> form接口","INFO"));
	myocx.InvokeBusinessForm(2,"",1,"");
	myocx.InvokeBusinessForm(3,"",1,"");
	myocx.InvokeBusinessForm(4,"",1,"");
	myocx.InvokeBusinessForm(5,"",1,"");
	myocx.InvokeBusinessForm(6,"",1,"");
	myocx.InvokeBusinessForm(7,"",1,"");
	myocx.InvokeBusinessForm(8,"",777,"");
	jsLog(logStrMsg("BusFormClose -> 成功杀掉所有WinForm exe程序","INFO"));
	//if(globalcurpage == 0){
		//jsLog(logStrMsg("挂断电话 -> 当前页在<业务选择首页>，可以调用关闭form接口","INFO"));
	//myocx.InvokeBusinessForm(1,"",1,"");
	
	//}else 
//	if(globalcurpage == 7){
//		jsLog(logStrMsg("挂断电话 -> 当前页在<签字页面>，可以调用关闭form接口","INFO"));
//		myocx.InvokeBusinessForm(2,"",1,"");
//	}else if(globalcurpage == 6){
//		//jsLog(logStrMsg("挂断电话 -> 当前页在<审核资料页面>，可以调用关闭form接口","INFO"));  //221445909
//		//myocx.InvokeBusinessForm(3,"",1,"");
//	}else if(globalcurpage == 8){
//		jsLog(logStrMsg("挂断电话 -> 当前页在<查看扫描件页面>，可以调用关闭form接口","INFO"));  //20140923
//		myocx.InvokeBusinessForm(4,"",1,"");
//	}else if(globalcurpage == 19){
//		jsLog(logStrMsg("挂断电话 -> 当前页在<理财结果页>，可以调用关闭form接口","INFO"));  //20140923
//		myocx.InvokeBusinessForm(5,"",1,"");
//	}else if(globalcurpage == 5){
////		jsLog(logStrMsg("挂断电话 -> 当前页在<客户信息编辑页>，可以调用关闭form接口","INFO"));  //20140923
////		myocx.InvokeBusinessForm(6,"",1,"");
//	}
//	//if(BussChoicType == "FUND"){
//		jsLog(logStrMsg("挂断电话 -> 当前页在<整个基金签约EXE>，可以调用关闭form接口","INFO"));  //20140923
//		myocx.InvokeBusinessForm(8,"",777,"");
//	//}
//	if(globalcurpage == 18){
//		jsLog(logStrMsg("挂断电话 -> 当前页在<读取卡号页>，可以调用关闭form接口","INFO"));  //20140923
//		myocx.InvokeBusinessForm(7,"",1,"");
//		jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[ReadCardNumPage.exe] 1：关闭","INFO"));
//	}
	setTimeout("closeCMP_FORM()",5000);
	
}

function closeCMP_FORM(){
	myocx.InvokeBusinessForm(9,"",777,"");
}
function Regagentconn(strCallMessage) {
	//jsLog(logStrMsg("Regagentconn(strCallMessage)  @Param:strCallMessage="+strCallMessage,"INFO   ")); //记录日志
	//myocx.InvokeBusinessForm(1,"",0,YesOrNo_FUND);  //打开首页选择业务程序
	//myocx.InvokeBusinessForm(10,"",0,"");
//	myocx.InvokeBusinessForm(9,"",0,"");  //打开消息弹窗程序
	//jsLog(logStrMsg("调用winform-> 成功打开agentIndexPage.exe和CPM_Message_Form.exe程序","INFO   "));
	// 连接成功后，初始化视频信息，开启视频
	//jsLog(logStrMsg("Regagentconn()函数调用videoInit();","INFO   ")); //记录日志
	//videoinit();
	//var a = myocx.AgentGetVideoInfoEx();
	//jsLog(logStrMsg("调用接口myocx.AgentGetVideoInfoEx()","INFO   ")); //记录日志
	// 格式：终端编号,IP地址,端口号，IP地址和端口号用于视频控件
//	var videoPm = a.split(",");
	//if (videoPm.length != 4) {
		//alert("获取视频信息失败！此级别是否停止办理业务？");// TODO 此级别是否停止办理业务？
		// exit（）
	//} else {
		//tmid = videoPm[0];
		//site = videoPm[1];
		//videoip = videoPm[2];
		//port = videoPm[3];
		// tmid = "T001";
		// site = "S002";
		// videoip = "10.10.142.188";
		// videoip = "192.168.30.129";
		// port = 6005;
		//videosetpara();
		// alert('video info:' + a);
		//jsLog(logStrMsg("发送消息myocx.AgentSendMessage(1, 1, videoinitok);","INFO")); //记录日志
		//myocx.AgentSendMessage(1, 1, "videoinitok");
	//}
	//strCallMessage_1 = strCallMessage;
//	jsLog(logStrMsg("setTimeOut","INFO")); //记录日志
	//setTimeout("CallIn()",2000);
//	jsLog(logStrMsg("setTimeOut_1","INFO")); //记录日志
	//CallIn();
	//setTimeOut('',3000);
	
	//Regagentconn_1(strCallMessage);
}
var idinfos = '';
var cusname = "", cerno = "", savepic = "" ,cus_oldName="" ,cus_oldCardID ="" ;
var picpath_copy="";
var checkName = "";  //核查时需要核对的信息，将扫描证件返回的信息拼接字符串保存
var cusName_1 = "";
function RegIDCardResult(lScanResult, strCardInfo) {
	//Ext.getCmp("scanIndentity").setDisabled(false);   //证明扫面事件响应， 显示扫描证件按钮
	jsLog(logStrMsg("Come in RegIDCardReslt(IScanResult,strCardInfo) Funciont","INFO")); //记录日志
	//updateHisBusType(conhisid_DZQD , '10');jsLog(logStrMsg("修改当前业务类型为：电子渠道","INFO"));
	// AgentEvtIDCardResult：[XXX,1,汉族,19790719,XX省XXXXXX区XXX小区XXX号楼X单元X号
	// ,370611XXXX07yy40xx,XXX市公安局XXX分局
	// ,20080201,20280201,,D:\tempfile\id.bmp,0]
	// 测试阶段数据
	var testIDcard = "XXX,1,汉族,19790719,XX省XXXXXX区XXX小区XXX号楼X单元X号          ,370611XXXX07yy40xx,XXX市公安局XXX分局     ,20080201,20280201,,E:\tempfile\id.bmp,0"; // 12个
	testIDcard = strCardInfo;
	prn("扫描结果:[" + lScanResult + "]" + testIDcard);
	jsLog(logStrMsg("RegIDCardResult info：" + testIDcard,"INFO")); //记录日志
	
	var idInfoS_1 = testIDcard.split(",");

	var path = idInfoS_1[10];

	
	checkName = idInfoS_1[0]+"&"+(idInfoS_1[1] == 1 ? '男' : '女')+"&"+idInfoS_1[2]+
	                         "&"+idInfoS_1[3]+"&"+idInfoS_1[4]+"&"+idInfoS_1[5]+
	                         "&"+idInfoS_1[6]+"&"+idInfoS_1[7]+"-"+idInfoS_1[8]+
	                         "&"+idInfoS_1[10];
	jsLog(logStrMsg("Scanner IndentityCard StringBuffer Result -> " + checkName,"INFO")); //记录日志
	
	var img = '<img src="'+ path + '"style="width:80px;margin-left:10px"/>';
	
	if (lScanResult == 0) {
		rememberScanCard = 1;
		if(scanPeCard == 0){  //如果当前扫描的是在开卡或者电子渠道流程中扫描证件就要存储相应信息
			idinfos = testIDcard.split(",");
			cusname = idinfos[0];
			cus_name = cusname;
			cerno = idinfos[5];
			cus_cerno = cerno;
			cusName_1 = idinfos[0];
			// 填单页面的基本信息
			
			
			//=========给<电子渠道>的三证信息赋值=========
			Ext.getCmp('zhonghe_cardID_ck').setValue(idinfos[5]);//身份证
			Ext.getCmp('zonghe_cardtype_ck').setValue('第二代居民身份证');  //证件类型
			Ext.getCmp('zonghe_name_ck').setValue(idinfos[0]);	//姓名
			Ext.getCmp('zhonghe_cardID').setValue(idinfos[5]);//身份证
			Ext.getCmp('zonghe_cardtype').setValue('第二代居民身份证');  //证件类型
			Ext.getCmp('zonghe_name').setValue(idinfos[0]);	//姓名
			//=======================================
			
			// 身份基本信息
			
			// 转义传入的路径名，解决路径解析错误问题。
			var num = idinfos.length;// 身份证的信息中带有代码，截取倒数第二个；10号
			var idpicarr = idinfos[num - 1].split('\\');
			var picpath = idpicarr[0];
			prn(idpicarr);
			for (var a = 1; a < idpicarr.length; a++) {
				picpath += '\\' + idpicarr[a];
			}
			// alert('pickpath' + picpath);
			// var idpic = '<img src="' + picpath + '" style="width:100px;"/>';
			var idpic = '<div style="width:100px;text-align:center"><img src="'
					+ picpath + '" style="width:80px;margin-left:20px"/></div>';
			
			
				
			prn('ag' + globalcurpage);
			globalcurpage = 2;// 身份识别
			
			if(BussChoicType == "FUND"){
				//打开WinForm程序 并将值传入CheckIndentity_Form.cs
				myocx.InvokeBusinessForm(8,"",102,strCardInfo);   //打开扫描证件Form
				jsLog(logStrMsg("此处不用打开->myocx.InvokeBusinessForm[FundBusinessFlow.exe] 102：拍照Form SHOW","INFO"));
			}else{
				//synWithTerm(3,1);
			}
			
			cus_oldName = idinfos[0];
			cus_oldCardID = idinfos[5];
		}else{
			setTimeout("", 500); 
			//showScanPeopleCard(idInfoS_1,img);  //弹出随时都可以扫描的窗体  setTimeout("sendactepp(" + lObjectID + "," + lItemID + ")", 500);
			//setTimeout("showScanPeopleCard(" + idInfoS_1 + "," + img + ")", 2000);
		}

	} else {
		jsLog(logStrMsg("RegIDCardResult lose info ：[ " + lScanResult +" ]","INFO")); //记录日志
		// 这里依据提供的错误编码，提示对应信息。
		// Ext.MessageBox.confirm('扫描证件消息', lScanResult != 0
		// ? '扫描客户证件失败！'
		// : '扫描证件超时！', scancustid); 
		// myConfirm('扫描证件消息', lScanResult != 0
		// ? '扫描客户证件失败！'
		// : '扫描证件超时！', scancustid, backToindex_cancle);
//		var win = new Ext.Window({
//			width : 500,
//			title : '扫描证件消息',
//			height : 200,
//			html : '<font style="font-size:28px;color:#bf1919"><br>&nbsp;&nbsp;&nbsp;&nbsp'
//					+ (lScanResult != 0 ? '扫描客户证件失败！' : '扫描证件超时！') + '</font>',
//			modal : true,
//			buttonAlign : 'center',
//			buttons : [{
//						text : '<font style="font-size:16px;margin-top:0px">确定</font>',
//						width : 60,
//						height : 30,
//						handler : function() {
//							scanPeCard = 0;   //扫描失败原变量标记
//							win.close();
//						}
//					},{
//						text : '<font style="font-size:16px;margin-top:0px">取消</font>',
//						width : 60,
//						height : 30,
//						handler : function() {
//							myocx.AgentSendMessage(1, 1, "sys_error");
//							win.close();
//						}
//					}]
//		});
//		win.show();
	}
}
var isfirstIdcard = 0;
function agentMGfirst() {// managed by agent first.
	isManaged = 1;
	//manage('100501', false);
//	Ext.getCmp('100502').setVisible(false);
//	Ext.getCmp('100503').setVisible(true);
//	Ext.getCmp('100504').setVisible(true);
}
//2014/7/8 WYZS_code
function agentSetDisabled(name,type) {// 封装所有关于灰掉按钮/控件等操作
	Ext.getCmp(name).setDisabled(type);
}

/********
 * 2014/08/13  Mr SeaBreeze
 * 扫描完身份证后，VTM做查询客户信息交易时，弹窗阻挡座席拍照，返回后即可进行拍照审核；
 * */
function checkCBOD(type){
	var win = "";
	if(type == 0){
		jsLog(logStrMsg("CBOD windows show !","MESSAGE"));
	    win = new Ext.Window({
				width : 500,
				title : '友情提示',
				id :'cbodWin',
				height : 150,
				closable : false,
				html : '<font style="font-size:28px;color:red"><br>&nbsp;&nbsp;&nbsp;&nbsp机具正在做交易，请等待...</font>',
				modal : true
			});
		win.show();
	}else{
		jsLog(logStrMsg("CBOD windows  hide !","MESSAGE"));
		Ext.getCmp('cbodWin').hide();
		jsLog(logStrMsg("CBOD windows  hide ! -> OK","MESSAGE"));
		///win.close();
	}
		
}


// 同步页面方法，0终端同步,1坐席页内自同步
function synWithTerm(curpage, flag) {
	var card = Ext.getCmp('cardpanel');
	var t = parseInt(curpage) + 0;
	// 程媛媛修改导致页码变动+1
	// prn(card);
	if (card != null) {
		if (flag == 0) {
			// 写死对应页码。
			if (curpage == 1) {// 返回、卡选择页面
				// t = isfirstIdcard == 0 ? 1 : 0;//对应客户端页面
				t = 0;
			} else if (curpage == 4) {// 填单页,1
				//agentMGfirst();// 坐席端先输入
				//t = 4;
				t = 5;  //测试-> 由于新增了一个viewpanl页签往后移动一位
				
			} else if (curpage == 5) {// 停留在客户信息审核页面，客户继续则展示审核按钮。
				jsLog(logStrMsg("SENDMESSAGE:lObjectID:1,lItemID:1,message:cus051109","MESSAGE"));
				myocx.AgentSendMessage(1, 1, "cus051109");// 避免两端同时点击按钮造成的客户被控制bug
				t = 4;// 跳过附加业务

			} else if (curpage == 6) {//
				t = 5;
			} else if (curpage == 7) {// 停留在客户信息审核页面，客户继续则展示审核按钮。
				t = 6;//
				
			} else if (curpage == 8) {
				  t = 7;
				//t = 6;// 测试 先去掉
				// 开启第二个视频，这里由于视频ocx把视频做在了一起，不能在客户签字页展示。
				//prn("注意两个视频在一起!客户签字视频  未开启");
				//jsLog(logStrMsg("准备调用第二个视频videostartvedio1()", "MESSAGE"));
				//videostartvedio1();// 第二个视频。
				//发送C#消息形式，告诉WinForm程序来调打开第二个视频
				//myocx.InvokeBusinessForm(10,"",103,"");
				//jsLog(logStrMsg("INFO:(发送C#消息形式，告诉WinForm程序来调打开第二个视频...)","MESSAGE"));
			} else if (curpage == 9) {
				t = 7;// 由于坐席端缺少页面，导致需要修改对应页码
				
			} else if (curpage == 10) {
				t = 8;// 由于坐席端缺少页面，导致需要修改对应页码
				
			} else if (curpage == 11) {
				t = 10;// 由于坐席端缺少页面，导致需要修改对应页码
				
			} else if (curpage == 12) {
				t = 11;// 由于坐席端缺少页面，导致需要修改对应页码
				// 更新联络历史状态为成功。1001
			}else if(curpage == 13){
				t = 11;
			}else if(curpage == 14){    //----------↓ 都是 暂时测试
				t = 12;
			}else if(curpage == 15){
				t = 13;
			}else if(curpage == 16){
				t = 14;
			}else if(curpage == 17){
				t = 15;
			}else if(curpage == 18){
				t = 16;
			}else if(curpage == 19){
				t = 17;
			}else if(curpage == 20){
				t = 18;
			}else if(curpage == 21){
				t = 19; 				 //---------- ↑ ----------
			} else {
				prn('curpage:' + curpage);
			}
			globalcurpage = t;// 保存当前坐席端的页码。
			card.getLayout().setActiveItem(globalcurpage);
		} else {
			globalcurpage = t;// 保存当前坐席端的页码。  102111
			card.getLayout().setActiveItem(globalcurpage);
		}
	}
}

function testforscan() {
	var picpath = "d:\\tempfile\\bob.bmp";
	var pic = '<div style="width:800;height:700;overflow:auto;text-align:center"><img style="width:600;height:670;padding:10px;text-align:center" src="'
			+ picpath + '" /></div>';
	// var pic = '<div style="width:750;height:800;text-align:center"><img
	// style="width:600;padding:10px;text-align:center" src="'+ picpath +'"
	// /></div>';
	//Ext.getCmp('cusscaninforet').setValue(pic);
}
function showcuspic(picpath) {
	showPrintpic = 0 ; //恢复变量 --> 回收成功之后弹窗
	// var pichtml = '<html><center><img src="' + picpath +
	// '"/></center></html>';
	var picwin = new Ext.Window({
				id : "win",
				title : "扫描件",
				width : Ext.getBody().getViewSize().width,
				height : Ext.getBody().getViewSize().height,
				maximizable : true,
				autoScroll : true,
				html : '<div style="text-align:center;"><img style="width:900" src="'
						+ picpath + '"/></div>',
				buttons : [{
							text : '关闭',
							handler : function() {
								picwin.close();
							}
						}]
			});
	picwin.show();
}
var s = "";
/**
 * 随时都能扫描客户证件
 */
function showScanPeopleCard(PInfo,img) {
	scanPeCard = 0;  //恢复扫描
	//alert(img);
	//var img = "D:\\zhangziyi.png";
	//PInfo = ["章子怡","女","1990年01月01日","汗","河北省保定市高碑店白沟国际商贸城","500224199001011443","河北省保定市北市区","2001-2021"];
	var picwin = new Ext.Window({
				id : "win",
				title : "扫描证件",
				width :600,
				height : 400,
				modal : true,
				maximizable : true,
				autoScroll : true,
				html : '<div align="center"><table width="580" height="300" border="1" style="font-size:18px"><tr>' 
											+'<td align="left" width="480" id="nnname">姓名：'+PInfo[0]+'</td><td width="100" align="left" rowspan="8">'
											+ img
											+ '</td> </tr><tr><td align="left">性别：'+(PInfo[1] == 1 ? '男' : '女')+'</td> <td align="left">'
											+ '</td></tr><tr><td align="left">出生：'+PInfo[3]+'</td><td align="left">'
											+ '</td></tr><tr><td align="left">民族：'+PInfo[2]+'</td><td align="left">'
											+ '</td></tr><tr><td align="left">住址：'+PInfo[4]+'</td><td align="left">'
											+ '</td></tr><tr><td align="left">公民身份证号：'+PInfo[5]+'</td><td align="left">'
											+ '</td></tr><tr><td align="left">签发机关：'+PInfo[6]+'</td><td align="left">'
											+ '</td></tr><tr><td align="left">有效期限：'+PInfo[7] + " - " + ((PInfo[8].substring(0, 4) - PInfo[7].substring(0, 4)) >= 50 ? "99991231" : PInfo[8])+'</td><td align="left">'
											+ '</td></tr><tr align="center" style="color:red" ><td colspan="2">姓名：' + cus_oldName
											+ '&nbsp;&nbsp;&nbsp;&nbsp;证件号：' + cus_oldCardID
											+'</td></tr></table></div>',
				buttons : [{
							text : '关闭',
							iconCls : 'btn-cancel',
							handler : function() {
								picwin.close();
							}
						}]
			});
		picwin.show();
}

//客户在确认页面点击返回按钮  清空变量
var c1 = 0 ;
var c2 = 0 ;
var c3 = 0 ;
var c4 = 0 ;
var c5 = 0 ;   //2014/7/10 WYZS_code

/***
 * 赋值确认业务项
 */
function setSurePage(){
	//Ext.getCmp("1015").clear();
	jsLog(logStrMsg("动态网银选项的值：" + Ext.getCmp("DTMM_ZIYW").getValue() , "MESSAGE"));
	jsLog(logStrMsg("手机银行选项的值：" + Ext.getCmp("SJYH_ZIYW").getValue() , "MESSAGE"));
	jsLog(logStrMsg("电子银行密码管理-->申请：" + Ext.getCmp("dzyh_shenqing").getValue()+"/修改："+Ext.getCmp("dzyh_xiugai").getValue()+"/重置："+Ext.getCmp("dzyh_chongzhi").getValue() , "MESSAGE"));
	jsLog(logStrMsg("电话银行交易密码-->申请：" + Ext.getCmp("dhyh_shenqings").getValue()+"/修改："+Ext.getCmp("dhyh_xiugai").getValue()+"/重置："+Ext.getCmp("dhyh_chongzhi").getValue() , "MESSAGE"));
	
	//-----------判断填写时显示对应确认业务项----------over_WY-over_WY_SQ
	if(Ext.getCmp("DTMM_ZIYW").getValue() == "01"){
		c1=1;
		Ext.getCmp("ZH_DTMM_CK_shenqing_BDphone").setValue(Ext.getCmp("DTMM_phoneNum").getValue());
		Ext.getCmp("over_WY_SQ_phonenum").setValue(Ext.getCmp("DTMM_phoneNum").getValue());
		Ext.getCmp("ZH_DTMM_CK").setVisible(true);
		Ext.getCmp("ZH_DTMM_CK_shenqing").setVisible(true);
		Ext.getCmp("over_WY").setVisible(true);
		Ext.getCmp("over_WY_SQ").setVisible(true);
	}else if(Ext.getCmp("DTMM_ZIYW").getValue() == "02"){
		c1=1;
		Ext.getCmp("ZH_DTMM_CK_xiugai_oldPhone").setValue(Ext.getCmp("DTMM_oldPhone").getValue());
		Ext.getCmp("ZH_DTMM_CK_xiugai_newPhone").setValue(Ext.getCmp("DTMM_newPhone").getValue());
		Ext.getCmp("over_WY_XG_oldnumber").setValue(Ext.getCmp("DTMM_oldPhone").getValue());//结束页面赋值
		Ext.getCmp("over_WY_XG_newnumber").setValue(Ext.getCmp("DTMM_newPhone").getValue());
		Ext.getCmp("ZH_DTMM_CK").setVisible(true);
		Ext.getCmp("ZH_DTMM_CK_xiugai").setVisible(true);
		Ext.getCmp("over_WY").setVisible(true);
		Ext.getCmp("over_WY_XG").setVisible(true);
	}else if(Ext.getCmp("DTMM_ZIYW").getValue() == "03"){
		c1=1;
		Ext.getCmp("ZH_DTMM_CK_jiesuo_BDPhone").setValue(Ext.getCmp("DTMM_phoneNum").getValue());
		Ext.getCmp("over_WY_JS_phonenum").setValue(Ext.getCmp("DTMM_phoneNum").getValue());
		Ext.getCmp("ZH_DTMM_CK").setVisible(true);
		Ext.getCmp("ZH_DTMM_CK_jiesuo").setVisible(true);
		Ext.getCmp("over_WY").setVisible(true);
		Ext.getCmp("over_WY_JS").setVisible(true);
	}
	if(Ext.getCmp("SJYH_ZIYW").getValue() == "01"){	 //手机银行申请业务
		c2=1;
		Ext.getCmp("ZH_SJYH_CK").setVisible(true);
		Ext.getCmp("ZH_SJYH_CK_SQ").setVisible(true);
		Ext.getCmp("over_SJ").setVisible(true);
		Ext.getCmp("over_SJ_SQ").setVisible(true);
		Ext.getCmp("ZH_SJYH_CK_SQ_phonenum").setValue(Ext.getCmp("SJ_phoneNum").getValue()); //确认页
		//Ext.getCmp("ZH_SJYH_CK_SQ_LoginID").setValue(Ext.getCmp("SJ_loginID").getValue());  
		Ext.getCmp("over_SJ_SQ_phonenum").setValue(Ext.getCmp("SJ_phoneNum").getValue());    //业务办理完毕结束页
		//Ext.getCmp("over_SJ_SQ_LoginID").setValue(Ext.getCmp("SJ_loginID").getValue());
		if(Ext.getCmp("SJ_zhifu").getValue() == "01"){   	  //确认页面的转账支付显示
			Ext.getCmp("ZH_SJYH_CK_SQ_ZF").setValue("开通");
			Ext.getCmp("over_SJ_SQ_ZF").setValue("开通");      //业务办理完毕结束页
		}else{
			Ext.getCmp("ZH_SJYH_CK_SQ_ZF").setValue("关闭");
			Ext.getCmp("over_SJ_SQ_ZF").setValue("关闭");      //业务办理完毕结束页
		}
		if(Ext.getCmp("SJ_zhuanzhang").getValue() == "01"){
			Ext.getCmp("ZH_SJYH_CK_SQ_ZZ").setValue("开通");
			Ext.getCmp("over_SJ_SQ_ZZ").setValue("开通");      //业务办理完毕结束页
		}else{
			Ext.getCmp("ZH_SJYH_CK_SQ_ZZ").setValue("关闭");
			Ext.getCmp("over_SJ_SQ_ZZ").setValue("关闭");      //业务办理完毕结束页   
		}
	}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "02"){	  //手机银行添加下挂业务
		c2=1;
		Ext.getCmp("ZH_SJYH_CK").setVisible(true);
		Ext.getCmp("ZH_SJYH_CK_TJ").setVisible(true);
		Ext.getCmp("over_SJ").setVisible(true);
		Ext.getCmp("over_SJ_TJ").setVisible(true);
		if(Ext.getCmp("SJ_zhifu").getValue() == "01"){   
			Ext.getCmp("ZH_SJYH_CK_TJ_ZF").setValue("开通"); 
			Ext.getCmp("over_SJ_TJ_ZF").setValue("开通");     
		}else{
			Ext.getCmp("ZH_SJYH_CK_TJ_ZF").setValue("关闭");
			Ext.getCmp("over_SJ_TJ_ZF").setValue("关闭");     
		}
		if(Ext.getCmp("SJ_zhuanzhang").getValue() == "01"){
			Ext.getCmp("ZH_SJYH_CK_TJ_ZZ").setValue("开通");
			Ext.getCmp("over_SJ_TJ_ZZ").setValue("开通");     
		}else{
			Ext.getCmp("ZH_SJYH_CK_TJ_ZZ").setValue("关闭");
			Ext.getCmp("over_SJ_TJ_ZZ").setValue("关闭");        
		}
	}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "03"){ 	 //手机银行重置业务
		c2=1;
		Ext.getCmp("ZH_SJYH_CK").setVisible(true);
		Ext.getCmp("ZH_SJYH_CK_CZ").setVisible(true);
		Ext.getCmp("over_SJ").setVisible(true);
		Ext.getCmp("over_SJ_CZ").setVisible(true);
	}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "04"){ 	 //手机银行设置转账/支付业务
		c2=1;
		Ext.getCmp("ZH_SJYH_CK").setVisible(true);
		Ext.getCmp("ZH_SJYH_CK_ZZ").setVisible(true);
		Ext.getCmp("over_SJ").setVisible(true);
		Ext.getCmp("over_SJ_ZZ").setVisible(true);
		if(Ext.getCmp("SJ_zhifu").getValue() == "01"){   
			Ext.getCmp("ZH_SJYH_CK_ZZ_ZF").setValue("开通");
			Ext.getCmp("over_SJ_ZZ_ZF").setValue("开通");     
		}else{
			Ext.getCmp("ZH_SJYH_CK_ZZ_ZF").setValue("关闭");
			Ext.getCmp("over_SJ_ZZ_ZF").setValue("关闭");     
		}
		if(Ext.getCmp("SJ_zhuanzhang").getValue() == "01"){
			Ext.getCmp("ZH_SJYH_CK_ZZ_ZZ").setValue("开通");
			Ext.getCmp("over_SJ_ZZ_ZZ").setValue("开通");     
		}else{
			Ext.getCmp("ZH_SJYH_CK_ZZ_ZZ").setValue("关闭");
			Ext.getCmp("over_SJ_ZZ_ZZ").setValue("关闭");        
		}
	}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "05"){ 	 //手机银行注销业务
		c2=1;
		Ext.getCmp("ZH_SJYH_CK").setVisible(true);
		Ext.getCmp("ZH_SJYH_CK_ZX").setVisible(true);        //ZH_SJYH_CK_ZX_phonenum
		Ext.getCmp("over_SJ").setVisible(true);
		Ext.getCmp("over_SJ_ZX").setVisible(true);
		Ext.getCmp("ZH_SJYH_CK_ZX_phonenum").setValue(Ext.getCmp("SJ_phoneNum").getValue());   //确认页面注销子业务的手机号；
		Ext.getCmp("ZH_SJYH_CK_ZX_loginID").setValue(Ext.getCmp("SJ_loginID").getValue());     //确认页面注销子业务的手机号；
		Ext.getCmp("over_SJ_ZX_phonenum").setValue(Ext.getCmp("SJ_phoneNum").getValue());      //结束页面复制
		Ext.getCmp("over_SJ_ZX_loginID").setValue(Ext.getCmp("SJ_loginID").getValue());     
	}
	//对密码管理的业务进行赋值  dzmmgl_value
	if(Ext.getCmp("dzyh_shenqing").getValue()){
		c3=1;
		Ext.getCmp("dzmmgl_value").setValue("申请");
		Ext.getCmp("over_dzmmgl_value").setValue("申请");
		Ext.getCmp("ZH_DZMM_CK").setVisible(true);
		Ext.getCmp("over_dzmm").setVisible(true);
	}else if(Ext.getCmp("dzyh_xiugai").getValue()){
		c3=1;
		Ext.getCmp("dzmmgl_value").setValue("修改");
		Ext.getCmp("over_dzmmgl_value").setValue("修改");
		Ext.getCmp("ZH_DZMM_CK").setVisible(true);
		Ext.getCmp("over_dzmm").setVisible(true);
	}else if(Ext.getCmp("dzyh_chongzhi").getValue()){
		c3=1;
		Ext.getCmp("dzmmgl_value").setValue("重置");
		Ext.getCmp("over_dzmmgl_value").setValue("重置");
		Ext.getCmp("ZH_DZMM_CK").setVisible(true);
		Ext.getCmp("over_dzmm").setVisible(true);
	}
	if(Ext.getCmp("dhyh_shenqings").getValue()){
		c4=1;
		Ext.getCmp("dhmmgl_value").setValue("申请");
		Ext.getCmp("over_dhmmgl_value").setValue("申请");
		Ext.getCmp("ZH_DHMM_CK").setVisible(true);
		Ext.getCmp("over_dhmm").setVisible(true);
	}else if(Ext.getCmp("dhyh_xiugai").getValue()){
		c4=1;
		Ext.getCmp("dhmmgl_value").setValue("修改");
		Ext.getCmp("over_dhmmgl_value").setValue("修改");
		Ext.getCmp("ZH_DHMM_CK").setVisible(true);
		Ext.getCmp("over_dhmm").setVisible(true);
	}else if(Ext.getCmp("dhyh_chongzhi").getValue()){
		c4=1;
		Ext.getCmp("dhmmgl_value").setValue("重置");
		Ext.getCmp("over_dhmmgl_value").setValue("重置");
		Ext.getCmp("ZH_DHMM_CK").setVisible(true);
		Ext.getCmp("over_dhmm").setVisible(true);
 	}
	
	//网银盾证书  确认页赋值； 2014/7/10 WYZS_code_CK  or  WYZS_code_over
	if(Ext.getCmp("WYZS_ZIYW").getValue() == "01"){    // 赋值字段： 手机号、转账功能、限额（元）
		jsLog(logStrMsg("MESSAGE:(网银盾证书-申请-渲染-确认页面)"),"INFO");
		c5=1;
		Ext.getCmp("ZH_WYZS_CK").setVisible(true);
		Ext.getCmp("ZH_WYZS_CK_shenqing").setVisible(true);
		Ext.getCmp("over_WYZS").setVisible(true);
		Ext.getCmp("over_WYZS_SQ").setVisible(true);
		Ext.getCmp("ZH_WYZS_CK_shenqing_phoneNum").setValue(Ext.getCmp("WYZS_phoneNum").getValue());
		Ext.getCmp("over_WYZS_SQ_phoneNum").setValue(Ext.getCmp("WYZS_phoneNum").getValue());
		if(Ext.getCmp("WYZS_zhuanzhang").getValue() == "01"){
			Ext.getCmp("ZH_WYZS_CK_shenqing_zhuanzhang").setValue("开通");
			Ext.getCmp("over_WYZS_SQ_zhuanzhang").setValue("开通");
			if(Ext.getCmp("WYZS_1").getValue()){
				Ext.getCmp("ZH_WYZS_CK_shenqing_xe").setValue("100万");Ext.getCmp("over_WYZS_SQ_xe").setValue("100万");
			}else if(Ext.getCmp("WYZS_2").getValue()){
				Ext.getCmp("ZH_WYZS_CK_shenqing_xe").setValue("500万");Ext.getCmp("over_WYZS_SQ_xe").setValue("500万");
			}else if(Ext.getCmp("WYZS_3").getValue()){
				Ext.getCmp("ZH_WYZS_CK_shenqing_xe").setValue("5000万");Ext.getCmp("over_WYZS_SQ_xe").setValue("5000万");
			}else{
				Ext.getCmp("ZH_WYZS_CK_shenqing_xe").setValue("无限额");Ext.getCmp("over_WYZS_SQ_xe").setValue("无限额");
			}
		}else{
			Ext.getCmp("ZH_WYZS_CK_shenqing_zhuanzhang").setValue("关闭");
			Ext.getCmp("over_WYZS_SQ_zhuanzhang").setValue("关闭");
			Ext.getCmp("ZH_WYZS_CK_shenqing_xe").setValue("-");  
			Ext.getCmp("over_WYZS_SQ_xe").setValue("-");
		}  
		
		
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "02"){   // 赋值字段： 转账功能、限额（元）
		jsLog(logStrMsg("MESSAGE:(网银盾证书-下挂账户-渲染-确认页面)"),"INFO");
		c5=1;
		Ext.getCmp("ZH_WYZS_CK").setVisible(true);
		Ext.getCmp("ZH_WYZS_CK_xiagua").setVisible(true);
		Ext.getCmp("over_WYZS").setVisible(true);
		Ext.getCmp("over_WYZS_XG").setVisible(true);
		if(Ext.getCmp("WYZS_zhuanzhang").getValue() == "01"){
			Ext.getCmp("ZH_WYZS_CK_xiagua_zhuanzhang").setValue("开通");
			Ext.getCmp("over_WYZS_XG_zhuanzhang").setValue("开通");
			if(Ext.getCmp("WYZS_1").getValue()){
				Ext.getCmp("ZH_WYZS_CK_xiagua_xe").setValue("100万");Ext.getCmp("over_WYZS_XG_xe").setValue("100万");
			}else if(Ext.getCmp("WYZS_2").getValue()){
				Ext.getCmp("ZH_WYZS_CK_xiagua_xe").setValue("500万");Ext.getCmp("over_WYZS_XG_xe").setValue("500万");
			}else if(Ext.getCmp("WYZS_3").getValue()){
				Ext.getCmp("ZH_WYZS_CK_xiagua_xe").setValue("5000万");Ext.getCmp("over_WYZS_XG_xe").setValue("5000万");
			}else{
				Ext.getCmp("ZH_WYZS_CK_xiagua_xe").setValue("无限额");Ext.getCmp("over_WYZS_XG_xe").setValue("无限额");
			}
		}else{
			Ext.getCmp("ZH_WYZS_CK_xiagua_zhuanzhang").setValue("关闭");
			Ext.getCmp("over_WYZS_XG_zhuanzhang").setValue("关闭");
			Ext.getCmp("ZH_WYZS_CK_xiagua_xe").setValue("-");   
			Ext.getCmp("over_WYZS_XG_xe").setValue("-");
		}  
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "03"){  // 赋值字段： Ukey编号
		jsLog(logStrMsg("MESSAGE:(网银盾证书-电子密盾开机密码挂失-渲染-确认页面)"),"INFO");
		c5=1;
		Ext.getCmp("ZH_WYZS_CK").setVisible(true);
		Ext.getCmp("ZH_WYZS_CK_guashi").setVisible(true);
		Ext.getCmp("ZH_WYZS_CK_guashi_dzmdNum").setValue(Ext.getCmp("WYZS_dzmdNum").getValue());
		Ext.getCmp("over_WYZS").setVisible(true);
		Ext.getCmp("over_WYZS_GS").setVisible(true);
		Ext.getCmp("over_WYZS_GS_dzmdNum").setValue(Ext.getCmp("WYZS_dzmdNum").getValue());
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "04"){  // 赋值字段： 转账功能、限额（元）
		jsLog(logStrMsg("MESSAGE:(网银盾证书-修改最高转账限额-渲染-确认页面)"),"INFO");
		c5=1;
		Ext.getCmp("ZH_WYZS_CK").setVisible(true);
		Ext.getCmp("over_WYZS").setVisible(true);
		Ext.getCmp("ZH_WYZS_CK_zhuanzhang").setVisible(true);
		Ext.getCmp("over_WYZS_XE").setVisible(true);
		if(Ext.getCmp("WYZS_zhuanzhang").getValue() == "01"){
			Ext.getCmp("ZH_WYZS_CK_zhuanzhang_zhuanzhang").setValue("开通");
			Ext.getCmp("over_WYZS_XE_zhuanzhang").setValue("开通");
			if(Ext.getCmp("WYZS_1").getValue()){
				Ext.getCmp("ZH_WYZS_CK_zhuanzhang_xe").setValue("100万");Ext.getCmp("over_WYZS_XE_xe").setValue("100万");
			}else if(Ext.getCmp("WYZS_2").getValue()){
				Ext.getCmp("ZH_WYZS_CK_zhuanzhang_xe").setValue("500万");Ext.getCmp("over_WYZS_XE_xe").setValue("500万");
			}else if(Ext.getCmp("WYZS_3").getValue()){
				Ext.getCmp("ZH_WYZS_CK_zhuanzhang_xe").setValue("5000万");Ext.getCmp("over_WYZS_XE_xe").setValue("5000万");
			}else{
				Ext.getCmp("ZH_WYZS_CK_zhuanzhang_xe").setValue("无限额");Ext.getCmp("over_WYZS_XE_xe").setValue("无限额");
			}
		}else{
			Ext.getCmp("ZH_WYZS_CK_zhuanzhang_zhuanzhang").setValue("关闭");
			Ext.getCmp("over_WYZS_XE_zhuanzhang").setValue("关闭");
			Ext.getCmp("ZH_WYZS_CK_zhuanzhang_xe").setValue("-");   //隐藏限额值
			Ext.getCmp("over_WYZS_XE_xe").setValue("-");
		}
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "05"){  // 赋值字段： 手机号、UKey编号
		jsLog(logStrMsg("MESSAGE:(网银盾证书-恢复启用网银-渲染-确认页面)"),"INFO");
		c5=1;
		Ext.getCmp("ZH_WYZS_CK").setVisible(true);
		Ext.getCmp("over_WYZS").setVisible(true);
		Ext.getCmp("ZH_WYZS_CK_hfqy").setVisible(true);
		Ext.getCmp("over_WYZS_HFQY").setVisible(true); 
		Ext.getCmp("ZH_WYZS_CK_hfqy_phoneNum").setValue(Ext.getCmp("WYZS_phoneNum").getValue());
		Ext.getCmp("over_WYZS_HFQY_phoneNum").setValue(Ext.getCmp("WYZS_phoneNum").getValue());
		Ext.getCmp("ZH_WYZS_CK_hfqy_dzmdNum").setValue(Ext.getCmp("WYZS_dzmdNum").getValue());
		Ext.getCmp("over_WYZS_HFQY_dzmdNum").setValue(Ext.getCmp("WYZS_dzmdNum").getValue());
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "06"){   // 赋值字段： UKey编号
		jsLog(logStrMsg("MESSAGE:(网银盾证书-恢复电子密盾验证-渲染-确认页面)"),"INFO");
		c5=1;
		Ext.getCmp("ZH_WYZS_CK").setVisible(true);
		Ext.getCmp("over_WYZS").setVisible(true);
		Ext.getCmp("ZH_WYZS_CK_hfyz").setVisible(true);
		Ext.getCmp("over_WYZS_HFYZ").setVisible(true);
		Ext.getCmp("ZH_WYZS_CK_hfyz_dzmdNum").setValue(Ext.getCmp("WYZS_dzmdNum").getValue());
		Ext.getCmp("over_WYZS_HFYZ_dzmdNum").setValue(Ext.getCmp("WYZS_dzmdNum").getValue());
	}
	
	
	//对‘手机银行的测试判断’
	//------------------------------------------------
}

/** 判断投资理财问卷是否都已填答案；
 * @param {Object} type
 * @return {TypeName}    1:4   2:5   3:4   4:4   5:5   6:4    7:4    8:4    9:3    10:5
 * DA_1_A DA_1_B DA_1_C DA_1_D  
 * DA_2_A DA_2_B DA_2_C DA_2_D DA_2_E
 */
function goNextYesNo(){
	
	return true;
}

/**
 *	校验手机文本框等等的一些数据   ①  ②
 */
function checkOutText(type){
	if(type == "01"){   //验证动态网银银行申请
		var str = Ext.getCmp("DTMM_phoneNum").getValue();
		if(str.length != 11){
			Ext.getCmp("check_ZH_info").setValue("① 手机号码必须为11位,无效手机号!");
			return false;
		}else if(!str.match("^[0-9]*$")){
			Ext.getCmp("check_ZH_info").setValue("① 手机号码必须位数字,无效手机号!");
			return false;
		}//非数字的校验
		return true; 
	}else if(type == "02"){  // 'DTMM_newphone',DTMM_phoneNum DTMM_oldphone DTMM_newphoneRepeat
		var newNum = Ext.getCmp("DTMM_newPhone").getValue();
		var oldNum = Ext.getCmp("DTMM_oldPhone").getValue();
		var mes = "";
		if(newNum.length != 11 || !newNum.match("^[0-9]*$")){mes += "  [新手机号码必须11位,且必须为数字!]";}
		if(oldNum.length != 11 || !oldNum.match("^[0-9]*$")){mes += "  [原手机号码必须11位,且必须为数字!]";}
		Ext.getCmp("check_ZH_info").setValue(mes);
		if(mes == ""){return true;}else{return false;}
	}else if(type == "04"){  //验证手机银行申请   以及  注销  业务重用！！
		var str1 = Ext.getCmp("SJ_phoneNum").getValue(); 
		var str2 = Ext.getCmp("SJ_loginID").getValue();
		var mess = "";
		if(str1.length != 11 || !str1.match("^[0-9]*$")){mess +="  [手机号码必须为11位,且必须为数字!]";}
		//if(str2 == "" || (str2.length < 3 || str2.length > 12)){mess += "  && [登录ID的长度在3-12位之间,且不能为空!]";}
		if(str2.indexOf("!")>=0||str2.indexOf("#")>=0||str2.indexOf("%")>=0||str2.indexOf("^")>=0||str2.indexOf("&")>=0||str2.indexOf("*")>=0||str2.indexOf("(")>=0||str2.indexOf(")")>=0||str2.indexOf("-")>=0||str2.indexOf("+")>=0||str2.indexOf("\\")>=0||str2.indexOf("/")>=0||str2.indexOf(">")>=0||str2.indexOf("<")>=0||str2.indexOf("?")>=0||str2.indexOf("~")>=0||str2.indexOf("[")>=0||str2.indexOf("]")>=0||str2.indexOf("/")>=0||str2.indexOf("{")>=0||str2.indexOf("}")>=0||str2.indexOf(",")>=0||str2.indexOf(".")>=0){
			mess += "  && [登录ID不能为包含特殊字符,无效登录ID!]";
		}
		
		//if(str2.match("[a-zA-Z0-9+-*\%]")){mess += "  && [登录ID不能为包含特殊字符,无效登录ID!]";}
		//alert(mess);
		Ext.getCmp("check_ZH_info").setValue(mess);  			//("[^?!@#$%\\^&*()]+"); 特殊字符正则表达式
		if(mess == ""){return true;}else{return false;}
	}else if(type == "08"){
		var _str = Ext.getCmp("SJ_phoneNum").getValue();
		if(_str.length != 11 || _str == "" || !_str.match("^[0-9]*$")){
			Ext.getCmp("check_ZH_info").setValue("① 手机号码必须为数字,并且11位,且不能为空!!");
			return false;
		}
		return true;
	}else if(type == "09"){    //WYZS_code   2014/08/11
		var pNum = Ext.getCmp("WYZS_phoneNum").getValue();
		var sbNum = Ext.getCmp("WYZS_dzmdNum").getValue();
		var mes = "";
		if(pNum.length != 11 || !pNum.match("^[0-9]*$")){mes += "  [手机号码必须11位,且必须为数字!]";}
		if(sbNum == ""){mes += "  [设备编号不能为空！]";}
		Ext.getCmp("check_ZH_info").setValue(mes);
		if(mes == ""){return true;}else{return false;}
	}else if (type == "10"){   //单独校验手机号
		var _str = Ext.getCmp("WYZS_phoneNum").getValue();
		if(_str.length != 11 || _str == "" || !_str.match("^[0-9]*$")){
			Ext.getCmp("check_ZH_info").setValue("① 手机号码必须为数字,并且11位,且不能为空!!");
			return false;
		}
		return true;
	}else if(type == "11"){    //单独校验设备号
		var sbNum = Ext.getCmp("WYZS_dzmdNum").getValue();
		if(sbNum == ""){
			Ext.getCmp("check_ZH_info").setValue("  [设备编号不能为空！]");
			return false;
		}
		return true;
	}
}

//-------------------------金博会暂时使用-------------------------
function showCusInfo(str){
	var picwin = new Ext.Window({
				id : "win",
				title : "客户信息",
				width :500,
				height : 400,
				modal : true,
				maximizable : true,
				autoScroll : true,
				html : '<div align="center"><table width="480" height="240" border="1" style="font-size:18px"><tr>' 
											+'<td align="left" width="480" id="nnname">卡号：'+str[0]+'</td></tr><tr><td align="left">姓名：'+str[1]+'</td> <td align="left">'
											+ '</td></tr><tr><td align="left">证件号码：'+str[2]+'</td><td align="left">'
											+ '</td></tr><tr><td align="left">证件地址：'+str[3]+'</td><td align="left">'
											+ '</td></tr></table></div>',
				buttons : [{
							text : '关闭',
							iconCls : 'btn-cancel',
							handler : function() {
								picwin.close();
							}
						}]
			});
		picwin.show();
}
//--------------------------------------------------------------
/**
 * 往曲晓控件里存储流水号 和 版本号
 */
function setMyocxInfo(type,info){
	if(type == 0){
		myocx.SetAgentLoginID(info,"");
	}else{
		myocx.SetVersionNo(info);
	}
}
/**
 * 读取控件里存储流水号 和 版本号
 */
function getMyocxInfo(type){
	if(type == 0){
		return myocx.GetDealNo();
	}else{
		return myocx.GetVersionNo();
	}
}


function Regagentdisconn(){
	jsLog(logStrMsg("Regagentdisconn()","INFO"));
	// prn("agent:客户断开连接");
	enddate = new Date().format("yyyy-MM-dd hh:mm:ss");
	actioninfos += enddate + " agent:客户断开连接\n";
	// prn(actioninfos);
	isConn = 0;// 重置连接标志
	isCheckID = 0;// 是否刷过身份证。0：否，1：是

	//videostopvedio();
	//videostopvedio1();

	//friendShipMsg_1("请注意：和客户端连接断开！");
	myocx.InvokeBusinessForm(9,"",222,"请注意：和客户端连接断开！");  //消息弹窗程序
}
function check_datafuncTest() {
	var info = "徐涛,X TA,男,中国,身份证,1980年1月1日,2000/8~2016/8,110102198001011234,2011年1月1日,2012年12月31,1391021102,010-66066666,企业事业单位负责人,北京市东城区建外大街甲66号,北京金宇集团有限公司,本人,100005";
	
	check_datafunc(info);
}


var phone_fm = "";
var call_fm = "";

//校验通过之后给确认页面赋值
//function fmSetValue(info){
//		var strM = info.split(",");
//		Ext.getCmp("cus_pinyinfm").setValue(strM[1]);
//		Ext.getCmp("cus_phonefm").setValue(strM[10]);
//		Ext.getCmp("cus_enddatefm").setValue(strM[9]);
//		Ext.getCmp("cus_vocationfm").setValue(strM[12]);
//	  	Ext.getCmp("cus_addrfm").setValue(strM[13]+"  "+strM[14]+"  "+strM[15]+"  "+strM[16]);
//		Ext.getCmp("cus_comfm").setValue(strM[17]);
//		Ext.getCmp("cus_postcodefm").setValue(strM[19]);
//		Ext.getCmp("cus_emailfm").setValue(strM[23]);
//		Ext.getCmp("cus_callfm").setValue(strM[11]);
//}

/**
 * 
 * @param {Object} page  表示页数
 * @param {Object} sma	 表示行数索引 小
 * @param {Object} max	 表示行数索引 大
 */
function hiddenLiCaiPage(page,sma,max){
	WJXX = page;
	var s = sma;  //第一页  22行
	//alert(sma);
	//表示页面要发生跳转  hiddenLiCaiPage(1,1,22);  hiddenLiCaiPage(2,23,38);  hiddenLiCaiPage(3,39,59);
	for(var i = 0 ; 58 >= i ; i++){
		Ext.getCmp("WJ_"+(i+1)+"").setVisible(false); //隐藏 
	}
	for(var i = 0 ; (max-sma) >= i ; i++){
		Ext.getCmp("WJ_"+s+"").setVisible(true);   //显示
		s+=1;
	}
}

function check_datafunc(info) {
	Ext.Ajax.request({
				url : __ctxPath + '/customer/checkdataConHis.do',
				method : 'post',
				params : {
					datas : info
				},
				success : function(response, options) {
					// alert('checkdata ok!' + response.responseText);
					//陈娜,CHEN NA,女,中国,第二代居民身份证,19810105,有期限,420502198101050029,20070228,20270228,15988277260,-,不便分类的其他从业人员,湖北省,宜昌市,西陵区,常刘路23-5-105号,,本人,312000,T011201411161136,T011,_000zD,774517975@qq.com,end
					phone_fm = info.split(",")[10];
					call_fm = info.split(",")[11];
					if ((response.responseText).trim() == "SUCC") {//
//						if(BussChoicType != "KJJK"){
//							myocx.InvokeBusinessForm(6,"",5,"checkDataOK");   //show 调用弹窗
//							Ext.getCmp("check_info").setValue('<font style="color:green">[数据校验通过]</font>');
//						}
						
						synWithTerm(6, 1);   // 坐席下一页
						
						jsLog(logStrMsg("后台校验客户信息后，跳转审核资料也。参数：info="+info,"INFO"));
						//后台校验客户信息后，跳转下一页，调用控件，弹窗form
						if(BussChoicType != "KJJK"){
							//myocx.InvokeBusinessForm(3,"",0,info);
							//jsLog(logStrMsg("调用myocx.InvokeBusinessForm(3,,0,)成功","INFO"));
						}
						//2014/10/14  打开C#窗体  SetCustomerInfo.exe 程序
//						jsLog(logStrMsg("客户资料校验成功后隐藏 客户资料同步WinForm...","INFO"));
//						if(BussChoicType != "KJJK"){
//							//myocx.InvokeBusinessForm(6,"",4,"");   //show 调用弹窗
//							jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[SetCustomerInfo.exe] 4：隐藏","INFO"));
//						}
						
						
						jsLog(logStrMsg("SENDMESSAGE:lObjectID:1,lItemID:6,message:051109next","MESSAGE"));
						//myocx.AgentSendMessage(1, 6, "051109next");// 同步客户端，6
						//给坐席端确认页面赋值
						//fmSetValue(info);
						// 如果校验通过，则释放控制权。
						//Ext.getCmp('100502').setVisible(true);
						//Ext.getCmp('100503').setVisible(false);
						//Ext.getCmp('100504').setVisible(false);
						//manage('100501', true);
						isManaged = 0;
						
					} else {
						//response.responseText
						jsLog(logStrMsg("INFO:check_datafunc() 校验信息 = " + response.responseText,"INFO"));
						//Ext.getCmp("check_info").setValue('<font style="color:red">[' + response.responseText + "]</font>");
						//myocx.InvokeBusinessForm(6,"",5,"checkDataNO:"+response.responseText);   //show 调用弹窗
						jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[SetCustomerInfo.exe] 5：show button","INFO"));
					}
				},
				failure : function(response, options) {
					// alert('checkdata fail!' + response.responseText); 
					//Ext.getCmp("check_info").setValue("数据校验fail!" + response.responseText);
				}
			});
}

function cusprintinfo(ret) {   
	if (ret == 0) {
		//prn('审核信息通过，调用打印接口开始！');
		printdoc();
	} else {
		prn('gloval:' + globalcurpage);
		jsLog(logStrMsg("SENDMESSAGE:lObjectID:1,lItemID:5,message:needsyn","MESSAGE"));
		myocx.AgentSendMessage(1, 5, 'needsyn');
		synWithTerm(5, 1);
		
//		if(BussChoicType != "KJJK"){
//			//2014/10/14  打开C#窗体  SetCustomerInfo.exe程序
//			jsLog(logStrMsg("座席点击审核不通过，需要返回页面 显示SetCutomerInfo.exe","INFO"));
//			myocx.InvokeBusinessForm(6,"",2,"");   //show 调用弹窗
//			jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[SetCustomerInfo.exe] 2：弹窗","INFO"));
//		}
	}
}

function printdoc() {// 打印功能待开发********************************
	//Ext.getCmp("HSbutton").setVisible(true); //显示表单回收按钮
	if(BussChoicType == "KJJK"){
		jsLog(logStrMsg("SENDMESSAGE:lObjectID:1,lItemID:2,message:termprintdoc","MESSAGE"));
		myocx.AgentSendMessage(1, 2, "termprintdoc");// 修改为消息控制
	}else if(BussChoicType == "DZQD"){
		getMsgBody4G2("M0202","P022",1,"P019","termprintdoc");
	}else if(BussChoicType == "TZLC"){
		getMsgBody4G2("M0204","P022",1,"P019","termprintdoc");  
	}else if(BussChoicType == "JJGS"){
		getMsgBody4G2("M0206","P022",1,"P019","termprintdoc");
	}else if(BussChoicType == "FUND"){
		getMsgBody4G2("M0208","P022",1,"P019","termprintdoc");
	}
	if(BussChoicType != "FUND"){
		//打开C#窗口
		myocx.InvokeBusinessForm(2,"",0,"");
		myocx.InvokeBusinessForm(2,"",222,"NotPaper:"+NotPaper);
		jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[SignPage.exe] 0：打开","INFO"));
	}
	
	
	//myocx.AgentSendMessage(1, 2, "termprintdoc");// 修改为消息控制
	//prn('agent printdoc!');
}

/** strScanFilePath格式： E:\aaa\b.txt|E:/aaa/b.txt 其实这样比较复杂啊 */
var scanfp = "";// "E:\\tempfile\\411325198712205037bob.bmp";
function RegAgentEvtScanResult(lScanResult, strScanFilePath) {
	// lScanResult = 0;//测试数据
	jsLog(logStrMsg("GETMESSAGE RegAgentEvtScanResult lScanResult:" + lScanResult , "MESSAGE"));
	if (lScanResult == 0) {// 如果扫描成功
		//Ext.getCmp("HSbutton").setVisible(true); //显示该按钮
		var tmp = strScanFilePath.split('|');
		var idpicarr = tmp[0].split('\\');
		var picpath = idpicarr[0];
		for (var a = 1; a < idpicarr.length; a++){
			picpath += '\\' + idpicarr[a];
		}
		scanfp = picpath;
		jsLog(logStrMsg("INFOMESSAGE RegAgentEvtScanResult picpath:" + picpath , "MESSAGE"));
		
		var pic = '<div style="width:800px;height:700px;overflow:auto;text-align:center"><img style="width:600px;height:600px;padding:10px;text-align:center" src="' + picpath + '" /></div>';

		if(BussChoicType == "DZQD"){
			//savePrintDoc();
		}else if(BussChoicType == "TZLC"){
			saveSomeFile(conhisid_TZLC, '2', '2', picpath, agentno, cusname, cerno);
		}else if(BussChoicType == "KJJK"){
			//saveSomeFile(conhisid_KJJK, '2', '2', picpath, agentno, cusname, cerno);
		}else if(BussChoicType == "FUND"){
			saveSomeFile(conhisid_FUND, '2', '2', picpath, agentno, cusname, cerno);
		}else if(BussChoicType == "JJGS"){
			saveSomeFile(conhisid_JJGS, '2', '2', picpath, agentno, cusname, cerno);
		}
		// 同步客户端页面至等待坐席审核客户签字页面
		globalcurpage = 7;// 审核签字
		prn('scandoc ' + 7);
		//synWithTerm(7, 1);
		//目前先暂时在这里进行判断 ,,  之后考虑别处是否会出现隐患
		if(showPrintpic == 0){
			if(BussChoicType == "KJJK"){
				jsLog(logStrMsg("SENDMESSAGE:lObjectID:1,lItemID:11,message:051109next","MESSAGE"));
				myocx.AgentSendMessage(1, 11, "051109next");
				synWithTerm(8, 1); 
			}else if(BussChoicType == "DZQD"){
				getMsgBody4G2("M0202","P019",1,"P022","");  //发送消息-->使VTM填出跳转到正在审核页面
				synWithTerm(8, 1); //测试  ==> 二期
			}else if(BussChoicType == "JJGS"){
				synWithTerm(8, 1); //测试  ==> 二期
				loginarr(userInfo);
				getMsgBody4G2("M0206","P019",1,"P022","");  //发送消息-->使VTM填出跳转到正在审核页面
			}else if(BussChoicType == "TZLC"){
				synWithTerm(8,1);
				getMsgBody4G2("M0204","P019",1,"P022","");  //发送消息-->使VTM填出跳转到正在审核页面
			}else if(BussChoicType == "FUND"){

				getMsgBody4G2("M0208","P019",1,"P022","");  //发送消息-->使VTM填出跳转到正在审核页面

				myocx.InvokeBusinessForm(8,"",110,picpath);
				myocx.InvokeBusinessForm(8,"",982,checkERROR);
				jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe] 110、982","INFO"));
			}
			
			if(BussChoicType != "FUND"){
				//隐藏C#窗口
				if(BussChoicType != "KJJK"){
					
					myocx.InvokeBusinessForm(2,"",1,"");
					jsLog(logStrMsg("Hidden WinForm[SignPage.exe] -> OK","INFO   "));
					myocx.InvokeBusinessForm(4,"",0,"NotPaper:"+NotPaper);
					jsLog(logStrMsg("Hidden WinForm[SignPage.exe] -> OOOOOKKKKK   checkClick="+checkClick+" , clickFlag="+clickFlag+" , picpath="+picpath,"INFO   "));
					myocx.InvokeBusinessForm(4,"",0,"checkClick:"+checkClick+"|clickFlag:"+clickFlag+"|path="+picpath);
					jsLog(logStrMsg("Hidden WinForm[SignPage.exe] -> Over","INFO   "));
				}
				//立马显示查看扫描件页面 Form    //最后一个参数 -> 路径  
				
				jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[CheckSignForm.exe] 0：打开","INFO"));
			}
			
			
		}else{
			//直接弹窗出显示扫描结果
			showcuspic(scanfp);
			getMsgBody4G2("","",5,"P004","");  //告诉VTM 跳转到业务选择页
			videostopvedio1();  //关闭第二个视频
		}
		// card.getLayout().setActiveItem(globalcurpage);
		
	}else{
		myocx.InvokeBusinessForm(9,"",222,"扫描失败");  //消息弹窗程序
		
		jsLog(logStrMsg("INFO:将要隐藏签字页面form","INFO"));
		if(globalcurpage == 7){  //证明在首页
			//myocx.InvokeBusinessForm(2,"",3,"");
			jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[SignPage.exe] 3：隐藏","INFO"));
		}else if(BussChoicType == "FUND"){
			myocx.InvokeBusinessForm(8,"",986,"");
			jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe] 986：隐藏Form","INFO"));
		}
	}
}
function sendactepp(lObjectID, lItemID) {
	jsLog(logStrMsg("SENDMESSAGE:lObjectID:"+lObjectID+",lItemID:"+lItemID+",message:activeEpp","MESSAGE"));
	myocx.AgentSendMessage(lObjectID, lItemID, "activeEpp");
}
var ClickCheckCodeBtn = 0;
var CheckCode ; //在全局 定义验证码  
function getCheckCode(){
	CheckCode = new Array();
	var codeLength = 6;//验证码的长度
	var selectChar = new Array(0,1,2,3,4,5,6,7,8,9);
	for(var i = 0 ; i < codeLength ; i++) {
	   var charIndex = Math.floor(Math.random()*10);
	   CheckCode += selectChar[charIndex];
	}
	//Ext.getCmp("SJ_CheckCode").setValue(CheckCode);
	var phone = Ext.getCmp("SJ_phoneNum").getValue();
	jsLog(logStrMsg("getCheckCode(),SJ_phoneNum = " + phone,"INFO"));
	if(Ext.getCmp("SJ_phoneNum").getValue() == ""){
		 Ext.getCmp("check_ZH_info").setValue("请先填写绑定手机号!");   //修改手机号后，需要重新获取验证码
		 jsLog(logStrMsg("getCheckCode(),请先填写绑定手机号!","MESSAGE"));
		 Ext.getCmp("CheckCode_btn").setDisabled(false);
	}else if(!phone.match("^[0-9]*$") || phone.length != 11){
		Ext.getCmp("check_ZH_info").setValue("手机号格式有误，请重新确认!");
		jsLog(logStrMsg("getCheckCode(),手机号格式有误，请重新确认!","MESSAGE"));
		Ext.getCmp("CheckCode_btn").setDisabled(false);
	}else{
		Ext.getCmp("check_ZH_info").setValue("");
		myocx.AgentSendMessage(888,888,phone+","+CheckCode);
		ClickCheckCodeBtn ++;
		jsLog(logStrMsg("getCheckCode(),myocx.AgentSendMessage(888,888,"+phone+","+CheckCode+");","MESSAGE"));
	}
	TimeOut_flag = setTimeout("checkMes_TimeOut()",60000);
	
	//发消息告诉控件   Ext.getCmp("check_ZH_info").setValue(mess);
}

function checkMes_TimeOut(){
	jsLog(logStrMsg("->延时60s函数：checkMes_TimeOut() MessageCheckCode_TimeOut=" + MessageCheckCode_TimeOut,"MESSAGE"));
	if(MessageCheckCode_TimeOut == 0){
		myocx.InvokeBusinessForm(9,"",222,"获取手机验证码超时，请稍后重试!");
		Ext.getCmp("CheckCode_btn").setDisabled(false);
	}
}

//------------------------------------------------------------------------------------------------------
/********************************<<二期消息格式定义>>*************************************
 * 二期消息格式定义  
 * @param strBusType,strCurPage,strFlagGo,strGoId,strMsg
 *        业务类型，当前页面id，是否跳转0/1，下一页id，消息内容str 
 */
function getMsgBody4G2(strBusType,strCurPage,strFlagGo,strGoId,strMsg){
	var str="";
	str += new Date().format("yyyy-MM-dd hh:mm:ss") + "|";//时间戳
	str += agentno + "|";							  	  //终端号
	str += agsite + "|";								  //站点号agentno, agcallno, agsite;
	str += agcallno + "|"; 								  //呼入id
	str += dealno + "|";								  //流水号
	str += strBusType + "|";							  //业务类型
	str += strCurPage + "|";							  //当前页ID
	str += strFlagGo + "|";								  //是否跳转页面
	str += strGoId + "|";								  //要跳转的页面ID
	str += strMsg;										  //消息内容<strMessage>
	jsLog(logStrMsg("SENDMESSAGE:" + str , "MESSAGE"));
	myocx.AgentSendMessage(999,999,str); 				  // Agent发送消息<二期消息格式>
}
/****************************************************
 * 恢复动态密码版网银的textFile填选项
 */
function huiFuDTMMTextFile(type){
	if(type == "choice"){
		Ext.getCmp("DTMM_oldPhone").setDisabled(false);
		Ext.getCmp("DTMM_newPhone").setDisabled(false);
		Ext.getCmp("DTMM_phoneNum").setDisabled(false);
		//Ext.getCmp("DTMM_newphoneRepeat").setDisabled(false);
	}else if(type == "clear"){
		Ext.getCmp("DTMM_oldPhone").setDisabled(true);
		Ext.getCmp("DTMM_newPhone").setDisabled(true);
		Ext.getCmp("DTMM_phoneNum").setDisabled(true);
		//Ext.getCmp("DTMM_newphoneRepeat").setDisabled(true);
		Ext.getCmp("DTMM_ZIYW").setValue("请选择");
		Ext.getCmp("check_ZH_info").setValue("");
		Ext.getCmp("DTMM_phoneNum").setValue("");
		Ext.getCmp("DTMM_oldPhone").setValue("");
		Ext.getCmp("DTMM_newPhone").setValue("");
	}else {
		alert("error huiFuDTMMTextFile(type)");
	}
}

/****************************************************
 * 2014/7/8 WYZS_code
 * 恢复网银证书业务的textFile填选项
 */
function huiFuWYZSTextFile(type){
	if(type == "choice"){
		Ext.getCmp("WYZS_phoneNum").setDisabled(false);
		Ext.getCmp("WYZS_zhuanzhang").setDisabled(false);
		Ext.getCmp("WYZS_dzmdNum").setDisabled(false);
		Ext.getCmp("radio_money").setVisible(false);
		Ext.getCmp("WYZS_1").setDisabled(false);
		Ext.getCmp("WYZS_1").setValue(true);
		Ext.getCmp("WYZS_2").setDisabled(false);
		Ext.getCmp("WYZS_3").setDisabled(false);
		Ext.getCmp("WYZS_4").setDisabled(false);
	}else if(type == "clear"){
		Ext.getCmp("WYZS_ZIYW").setValue("请选择");
		Ext.getCmp("WYZS_phoneNum").setDisabled(true);
		Ext.getCmp("WYZS_phoneNum").setValue("");
		Ext.getCmp("WYZS_zhuanzhang").setDisabled(true);
		Ext.getCmp("WYZS_zhuanzhang").setValue("01");
		Ext.getCmp("radio_money").setVisible(true);
		Ext.getCmp("WYZS_dzmdNum").setDisabled(true);
		Ext.getCmp("WYZS_dzmdNum").setValue("");
		Ext.getCmp("check_ZH_info").setValue("");
		Ext.getCmp("WYZS_1").setDisabled(true);
		Ext.getCmp("WYZS_1").setValue(true);
		Ext.getCmp("WYZS_2").setDisabled(true);
		Ext.getCmp("WYZS_3").setDisabled(true);
		Ext.getCmp("WYZS_4").setDisabled(true);
	}
}

														
/****************************************************
 * 恢复手机银行的textFile填选项
 */
function huiFuSJYHTextFile(type){
	if(type == "choice"){
		Ext.getCmp("SJ_phoneNum").setDisabled(false);
		Ext.getCmp("SJ_loginID").setDisabled(false);
		Ext.getCmp("SJ_zhuanzhang").setDisabled(false);
		Ext.getCmp("SJ_zhifu").setDisabled(false);
		Ext.getCmp("SJ_CheckCode").setDisabled(false);
		
		Ext.getCmp("CheckCode_btn").setDisabled(true); //屏蔽获取验证码按钮
	}else if(type == "clear"){
		Ext.getCmp("SJYH_ZIYW").setValue("请选择");
		Ext.getCmp("SJ_phoneNum").setDisabled(true);
		Ext.getCmp("SJ_loginID").setDisabled(true);
		Ext.getCmp("SJ_zhuanzhang").setDisabled(true);
		Ext.getCmp("SJ_zhifu").setDisabled(true);
		Ext.getCmp("SJ_phoneNum").setValue("");
		Ext.getCmp("SJ_loginID").setValue("");
		Ext.getCmp("SJ_zhifu").setValue("01");
		Ext.getCmp("SJ_zhuanzhang").setValue("01");
		Ext.getCmp("check_ZH_info").setValue("");
		Ext.getCmp("SJ_CheckCode").setValue("");
		Ext.getCmp("SJ_CheckCode").setDisabled(true);
	}else{
		alert("error huiFuSJYHTextFile(type)");
	}
}

function setCardNumber(cardnum){
	jsLog(logStrMsg("给所有页面的卡号赋值cardnum="+cardnum, "MESSAGE"));
	//Ext.getCmp("101903").setValue("卡号：" + cardnum);  		//读卡页面赋值
	Ext.getCmp("card_Number_dhyh").setValue(cardnum); 		//综合电子银行卡号赋值
	Ext.getCmp("card_Number_dzyh").setValue(cardnum); 		//综合电话银行卡号赋值
	Ext.getCmp("card_Number_dtmm").setValue(cardnum); 		//综合动态密码卡号赋值
	//Ext.getCmp("card_Number_sjyh").setValue(cardNumber); 		//综合手机银行卡号赋值
	//2014/7/8 WYZS_code_CK
	Ext.getCmp("card_Number_wyzs").setValue(cardNumber); 		//综合网银证书卡号赋值
	Ext.getCmp("ZH_WYZS_CK_shenqing_cardNum").setValue(cardnum);      //确认页面卡号赋值
	Ext.getCmp("ZH_WYZS_CK_xiagua_cardNum").setValue(cardnum);      //确认页面卡号赋值
	Ext.getCmp("ZH_WYZS_CK_guashi_cardNum").setValue(cardnum);      //确认页面卡号赋值
	Ext.getCmp("ZH_WYZS_CK_zhuanzhang_cardNum").setValue(cardnum);      //确认页面卡号赋值
	Ext.getCmp("ZH_WYZS_CK_hfqy_cardNum").setValue(cardnum);      //确认页面卡号赋值
	Ext.getCmp("ZH_WYZS_CK_hfyz_cardNum").setValue(cardnum);      //确认页面卡号赋值
	//2014//11 WYZS_code_over   处理结果页面渲染卡号
	Ext.getCmp("over_WYZS_SQ_cardnum").setValue(cardNumber);
	Ext.getCmp("over_WYZS_XG_cardnum").setValue(cardNumber);
	Ext.getCmp("over_WYZS_GS_cardnum").setValue(cardNumber);
	Ext.getCmp("over_WYZS_XE_cardnum").setValue(cardNumber);
	Ext.getCmp("over_WYZS_HFQY_cardnum").setValue(cardNumber);
	Ext.getCmp("over_WYZS_HFYZ_cardnum").setValue(cardNumber);
	
	Ext.getCmp("ZH_DTMM_CK_shenqing_cardNum").setValue(cardnum);      //确认页面卡号赋值
	Ext.getCmp("ZH_DTMM_CK_xiugai_cardNum").setValue(cardnum);        //-------------为空或不是对象-----------
	Ext.getCmp("ZH_DTMM_CK_jiesuo_cardNum").setValue(cardnum);
	Ext.getCmp("ZH_SJYH_CK_TJ_cardnum").setValue(cardnum);
	Ext.getCmp("ZH_SJYH_CK_CZ_cardnum").setValue(cardnum);
	Ext.getCmp("ZH_SJYH_CK_ZZ_cardnum").setValue(cardnum);
	Ext.getCmp("ZH_SJYH_CK_ZX_cardnum").setValue(cardnum);
	Ext.getCmp("ZH_SJYH_CK_SQ_cardnum").setValue(cardnum);   //手机银行 '申请' 业务   ',
	Ext.getCmp("over_WY_XG_cardnum").setValue(cardnum); 		//结束页面卡号赋值   ZH_SJYH_CK_TJ_cardnum
	Ext.getCmp("over_WY_JS_cardnum").setValue(cardnum) ; 
	Ext.getCmp("over_WY_SQ_cardnum").setValue(cardnum);     
	Ext.getCmp("over_SJ_SQ_cardnum").setValue(cardnum);	   //成功页面的手机银行子业务对应卡号显示
	Ext.getCmp("over_SJ_TJ_cardnum").setValue(cardnum);
	Ext.getCmp("over_SJ_CZ_cardnum").setValue(cardnum);
	Ext.getCmp("over_SJ_ZZ_cardnum").setValue(cardnum);
	Ext.getCmp("over_SJ_ZX_cardnum").setValue(cardnum);     //------------上-------------
	Ext.getCmp("ZH_card_Number_dzmmgl").setValue(cardnum);
	Ext.getCmp("ZH_card_Number_dhmmgl").setValue(cardnum);
	Ext.getCmp("over_card_Number_dzmmgl").setValue(cardnum);
	Ext.getCmp("over_card_Number_dhmmgl").setValue(cardnum);
	
	//挂失业务页面的卡号复赋值 GS_number
	Ext.getCmp("GS_number").setValue(cardnum);
}


/**
 * 设置新的密码类型函数 发送消息 逻辑判断
 * @param {Object} index    P025:1
 * P023 电子银行  p024电话银行  p025手机银行
 */
function setNewPWDPage(){
	var phoneBankSQ = Ext.getCmp("SJYH_ZIYW").getValue();
	if(phoneBankSQ == "01" || phoneBankSQ == "03" || Ext.getCmp("dzyh_shenqing").getValue() || Ext.getCmp("dzyh_chongzhi").getValue() || Ext.getCmp("dzyh_xiugai").getValue() || Ext.getCmp("dhyh_shenqings").getValue() || Ext.getCmp("dhyh_chongzhi").getValue() || Ext.getCmp("dhyh_xiugai").getValue()){
		if(BussChoicType != "KJJK"){
			myocx.InvokeBusinessForm(4,"",4,"");
		}
		
		jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[CheckSignForm.exe] 4：隐藏","INFO"));
		synWithTerm(16,1);
	}
	if(Ext.getCmp("dzyh_shenqing").getValue() || Ext.getCmp("dzyh_chongzhi").getValue() || Ext.getCmp("dzyh_xiugai").getValue()){
		Ext.getCmp("101601").setValue("设置新的电子银行密码");
	}
}

/**
 * 校验要验证的密码  
 * 电子银行/电话银行/支付密码
 */
function checkPwdmethod(){
	jsLog(logStrMsg("DZMM:" + checkPwdType.indexOf("YESDZMM") + "_____DHMM:"+checkPwdType.indexOf("YESDHMM") + "_____ZFMM:"+checkPwdType.indexOf("YESZFMM"), "MESSAGE"));
	if(checkPwdType == ""){
		synWithTerm(7,1);    // 跳转打印表单页面
		getMsgBody4G2("M0202","P013",1,"P019","termprintdoc");   //问取消 收到这个消息 P019就判断开始打印相应的合约 ？
		//显示C#窗口
		//myocx.InvokeBusinessForm(2,"",0,"");
		//myocx.InvokeBusinessForm(2,"",222,"NotPaper:"+NotPaper);
		//jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[SignPage.exe] 0：打开","INFO"));
		//videostartvedio1();  //调用第二个视频
		//发送C#消息形式，告诉WinForm程序来调打开第二个视频
//		myocx.InvokeBusinessForm(10,"",103,"");
		//jsLog(logStrMsg("INFO:(发送C#消息形式，告诉WinForm程序来调打开第二个视频...)","MESSAGE"));
		saveBusTypeConHis();
		setTimeout("updateHis()", 2000);	 //修改相应的业务类型;
		jsLog(logStrMsg("INFOMESSAGE:(updateHis-->OK)","INFO"));
		setTimeout("takeSomeFiles()", 4000); //存储相应的somefile文件;
		jsLog(logStrMsg("INFOMESSAGE:(takeSomeFiles-->OK)","INFO"));
		agentprints = "over";
	}else if(checkPwdType.indexOf("YESDZMM") >= 0 && (checkPwdType.indexOf("YESZFMM") < 0 && checkPwdType.indexOf("YESDHMM") < 0)){
		Ext.getCmp("cus_checkpwdinfo").setValue("");
		Ext.getCmp("cus_dzyhpwd").setValue("");
		Ext.getCmp("101600").setValue("验证电子银行密码");
		synWithTerm(15,1);
		getMsgBody4G2("M0202","P013",1,"P018","P018");  //发送VTM跳转到填写页面 （目前金博会值涉及到验证"电子银行密码"）
	}else if(checkPwdType.indexOf("YESZFMM") >= 0 && (checkPwdType.indexOf("YESDZMM") < 0) && checkPwdType.indexOf("YESDHMM") < 0){
		Ext.getCmp("cus_checkpwdinfo").setValue("");
		Ext.getCmp("cus_dzyhpwd").setValue("");
		Ext.getCmp("101600").setValue("验证取款密码");
		synWithTerm(15,1);
		getMsgBody4G2("M0202","P013",1,"P017","P017");  //发送VTM跳转到填写页面 （目前金博会值涉及到验证"支付密码"）
	}else if(checkPwdType.indexOf("YESDHMM") >= 0 && (checkPwdType.indexOf("YESDZMM") < 0) && checkPwdType.indexOf("YESZFMM") < 0){
		Ext.getCmp("cus_checkpwdinfo").setValue("");
		Ext.getCmp("cus_dzyhpwd").setValue("");
		Ext.getCmp("101600").setValue("验证电话银行交易密码");
		synWithTerm(15,1);
		getMsgBody4G2("M0202","P013",1,"P017","P028");  //发送VTM跳转到填写页面 （目前金博会值涉及到验证"电话银行密码"）
	}else if((checkPwdType.indexOf("YESDHMM") >= 0 && checkPwdType.indexOf("YESDZMM") >= 0) && checkPwdType.indexOf("YESZFMM") < 0 ){
		Ext.getCmp("cus_checkpwdinfo").setValue("");
		Ext.getCmp("cus_dzyhpwd").setValue("");
		Ext.getCmp("101600").setValue("验证电子银行密码");
		synWithTerm(15,1);
		getMsgBody4G2("M0202","P013",1,"P017","P018,P028");
	}else if((checkPwdType.indexOf("YESDHMM") >= 0 && checkPwdType.indexOf("YESZFMM") >= 0) && checkPwdType.indexOf("YESDZMM") < 0){
		Ext.getCmp("cus_checkpwdinfo").setValue("");
		Ext.getCmp("cus_dzyhpwd").setValue("");
		Ext.getCmp("101600").setValue("验证取款密码");
		synWithTerm(15,1);
		getMsgBody4G2("M0202","P013",1,"P017","P017,P028");
	}else if((checkPwdType.indexOf("YESDZMM") >= 0 && checkPwdType.indexOf("YESZFMM") >= 0) && checkPwdType.indexOf("YESDHMM") < 0){
		Ext.getCmp("cus_checkpwdinfo").setValue("");
		Ext.getCmp("cus_dzyhpwd").setValue("");
		Ext.getCmp("101600").setValue("验证取款密码");
		synWithTerm(15,1);
		getMsgBody4G2("M0202","P013",1,"P017","P017,P018");
	}else if(checkPwdType.indexOf("YESZFMM") >= 0 && checkPwdType.indexOf("YESDZMM") >= 0 && checkPwdType.indexOf("YESDHMM") >= 0){
		//两个密码都要验证：先跳转到验证支付密码再验证电子密码
		Ext.getCmp("cus_checkpwdinfo").setValue("");
		Ext.getCmp("cus_dzyhpwd").setValue("");
		Ext.getCmp("101600").setValue("验证取款密码");
		synWithTerm(15,1);
		getMsgBody4G2("M0202","P013",1,"P017","P017,P018,P028");
	}else if(checkPwdType.indexOf("YESZFMM") >= 0 && checkPwdType.indexOf("YESDZMM") >= 0){
		
	}
}

/****************
 * 对子业务选择进行相应的操作 (动态密码办网银、手机银行)
 */
function makeBusiness(index,type,type_1){
	Ext.getCmp("101310").setDisabled(true);  //修改相应的子业务就要将 继续 按钮毁掉
	if(type == "DTMM"){		//选择动态密码办网银子业务时
		if(index == 0){
			huiFuDTMMTextFile("choice");
			Ext.getCmp("DTMM_oldPhone").setDisabled(true);
			Ext.getCmp("DTMM_oldPhone").setValue("");
			Ext.getCmp("DTMM_newPhone").setDisabled(true);
			Ext.getCmp("DTMM_newPhone").setValue("");
			Ext.getCmp("DTMM_phoneNum").setValue("");
			//Ext.getCmp("DTMM_newphoneRepeat").setDisabled(true);
			//Ext.getCmp("DTMM_newphoneRepeat").setValue("");
			if(type_1 == 1){
				getMsgBody4G2("M0202","P012",1,"P01201","");  //发送消息-->使VTM填出 ‘申请’明细填写界面
			}
			if(dtmm_sq != ""){
				Ext.getCmp("DTMM_phoneNum").setValue(dtmm_sq);
			}
		}else if(index == 1){
			huiFuDTMMTextFile("choice");
			Ext.getCmp("DTMM_phoneNum").setDisabled(true);
			Ext.getCmp("DTMM_phoneNum").setValue("");
			if(type_1 == 1){
				getMsgBody4G2("M0202","P012",1,"P01202","");  //发送消息-->使VTM填出 ‘修改’明细填写界面
			}
			if(dtmm_xg != ""){
				var a = dtmm_xg.split("|")[0];  //原手机号吗
				var b = dtmm_xg.split("|")[1];  //新手机号码
				//var c = dtmm_xg.split("|")[2];  //确认新手机
				Ext.getCmp("DTMM_oldPhone").setValue(a);
				Ext.getCmp("DTMM_newPhone").setValue(b);
				//Ext.getCmp("DTMM_phoneNum").setValue("");
			}
		}else{
			huiFuDTMMTextFile("choice");
			Ext.getCmp("DTMM_newPhone").setDisabled(true);
			Ext.getCmp("DTMM_newPhone").setValue("");
			Ext.getCmp("DTMM_oldPhone").setDisabled(true);
			Ext.getCmp("DTMM_oldPhone").setValue("");
			Ext.getCmp("DTMM_phoneNum").setValue("");
			//Ext.getCmp("DTMM_newphoneRepeat").setDisabled(true);
			//Ext.getCmp("DTMM_newphoneRepeat").setValue("");
			if(type_1 == 1){
				getMsgBody4G2("M0202","P012",1,"P01203","");  //发送消息-->使VTM填出 ‘解锁’明细填写界面
			}
			if(dtmm_js != ""){
				Ext.getCmp("DTMM_phoneNum").setValue(dtmm_js);
			}
		}
	}else if(type == "SJYH"){   //选择手机银行子业务时
		if(index == 0){
			huiFuSJYHTextFile("choice");
			Ext.getCmp("SJ_zhifu").setValue("01");
			Ext.getCmp("SJ_zhuanzhang").setValue("01");
			Ext.getCmp("SJ_phoneNum").setValue("");
			Ext.getCmp("SJ_loginID").setValue("");
			Ext.getCmp("SJ_loginID").setDisabled(true);
			Ext.getCmp("CheckCode_btn").setDisabled(false);
			if(type_1 == 1){
				getMsgBody4G2("M0202","P012",1,"P01204","");  //发送消息-->使VTM弹出 手机银行 ‘申请’明细填写界面
			}
			if(sjyh_sq != ""){
				var a = sjyh_sq.split("|")[0];
				var b = sjyh_sq.split("|")[1];
				var c = sjyh_sq.split("|")[2];
				var d = sjyh_sq.split("|")[3];
				Ext.getCmp("SJ_phoneNum").setValue(a);
				Ext.getCmp("SJ_loginID").setValue(b);
				Ext.getCmp("SJ_zhifu").setValue(d);
				Ext.getCmp("SJ_zhuanzhang").setValue(c);
			}
		}else if(index == 1){
			huiFuSJYHTextFile("choice");
			if(type_1 == 1){
				getMsgBody4G2("M0202","P012",1,"P01205","");  //发送消息-->使VTM弹出 手机银行 ‘添加下挂’明细填写界面
			}
			Ext.getCmp("SJ_loginID").setDisabled(true);
			Ext.getCmp("SJ_loginID").setValue("");
			Ext.getCmp("SJ_phoneNum").setDisabled(true);
			Ext.getCmp("SJ_phoneNum").setValue("");
			Ext.getCmp("SJ_zhuanzhang").setValue("01");
			Ext.getCmp("SJ_zhifu").setValue("01");
			Ext.getCmp("SJ_CheckCode").setDisabled(true);
			Ext.getCmp("SJ_CheckCode").setValue("");
			if(sjyh_tj != ""){
				var a = sjyh_tj.split("|")[0];
				var b = sjyh_tj.split("|")[1];
				Ext.getCmp("SJ_zhuanzhang").setValue(a);
				Ext.getCmp("SJ_zhifu").setValue(b);
			}
		}else if(index == 2){
		    huiFuSJYHTextFile("choice");
		    if(type_1 == 1){
				getMsgBody4G2("M0202","P012",1,"P01206","");  //发送消息-->使VTM弹出 手机银行 ‘重置密码’明细填写界面
		    }
			Ext.getCmp("SJ_zhifu").setDisabled(true);
			Ext.getCmp("SJ_zhuanzhang").setDisabled(true);
			Ext.getCmp("SJ_zhifu").setValue("01");
			Ext.getCmp("SJ_zhuanzhang").setValue("01");
			Ext.getCmp("SJ_loginID").setDisabled(true);
			Ext.getCmp("SJ_phoneNum").setDisabled(true);
			Ext.getCmp("SJ_loginID").setValue("");
			Ext.getCmp("SJ_phoneNum").setValue("");
			Ext.getCmp("SJ_CheckCode").setDisabled(true);
			Ext.getCmp("SJ_CheckCode").setValue("");
		}else if(index == 3){
			huiFuSJYHTextFile("choice");
			if(type_1 == 1){
				getMsgBody4G2("M0202","P012",1,"P01207","");  //发送消息-->使VTM弹出 手机银行 ‘设置转/支’明细填写界面
			}
			Ext.getCmp("SJ_loginID").setDisabled(true);
			Ext.getCmp("SJ_phoneNum").setDisabled(true);
			Ext.getCmp("SJ_loginID").setValue("");
			Ext.getCmp("SJ_phoneNum").setValue("");
			Ext.getCmp("SJ_zhuanzhang").setValue("01");
			Ext.getCmp("SJ_zhifu").setValue("01");
			Ext.getCmp("SJ_CheckCode").setDisabled(true);
			Ext.getCmp("SJ_CheckCode").setValue("");
			if(sjyh_zz != ""){
				var a = sjyh_zz.split("|")[0];
				var b = sjyh_zz.split("|")[1];
				Ext.getCmp("SJ_zhuanzhang").setValue(a);
				Ext.getCmp("SJ_zhifu").setValue(b);
			}
		}else{
			huiFuSJYHTextFile("choice");
			if(type_1 == 1){
				getMsgBody4G2("M0202","P012",1,"P01208","");  //发送消息-->使VTM弹出 手机银行 ‘注销’明细填写界面
			}
			//Ext.getCmp("SJ_loginID").setDisabled(true);
			Ext.getCmp("SJ_zhuanzhang").setDisabled(true);
			Ext.getCmp("SJ_zhifu").setDisabled(true);
			Ext.getCmp("SJ_loginID").setValue("");
			Ext.getCmp("SJ_phoneNum").setValue("");
			Ext.getCmp("SJ_zhuanzhang").setValue("01");
			Ext.getCmp("SJ_zhifu").setValue("01");
			Ext.getCmp("SJ_CheckCode").setDisabled(true);
			Ext.getCmp("SJ_CheckCode").setValue("");
			if(sjyh_zx != ""){
				var a = sjyh_zx.split("|")[0];
				var b = sjyh_zx.split("|")[1];
				Ext.getCmp("SJ_phoneNum").setValue(a);
				Ext.getCmp("SJ_loginID").setValue(b);
			}
		}
	//2014/7/8 WYZS_code
	}else if(type == "WYZS"){   //选择网银证书业务时
		if(index == 0){
			jsLog(logStrMsg("选择（提交）网银证书业务->申请","INFO"));
			huiFuWYZSTextFile("choice");
			if(type_1 == 1){
				getMsgBody4G2("M0202","P012",1,"P01215","");  //发送消息-->使VTM弹出 网银证书业务 ‘申请’明细填写界面
			}
			agentSetDisabled("WYZS_dzmdNum",true);
			Ext.getCmp("WYZS_dzmdNum").setValue("");
			Ext.getCmp("WYZS_phoneNum").setValue("");
			Ext.getCmp("WYZS_zhuanzhang").setValue("01");
			Ext.getCmp("radio_money").setVisible(true);
			if(wyzs_sq != ""){
				//jsLog(logStrMsg("------","INFO"));
				Ext.getCmp("WYZS_zhuanzhang").setValue(wyzs_sq.split("|")[1]);
				Ext.getCmp("WYZS_phoneNum").setValue(wyzs_sq.split("|")[0]);
				if(Ext.getCmp("WYZS_zhuanzhang").getValue() == "01"){
					Ext.getCmp("radio_money").setVisible(true);
					if(wyzs_sq.split("|")[2] == "100万"){Ext.getCmp("WYZS_1").setValue(true);}
					else if(wyzs_sq.split("|")[2] == "500万"){Ext.getCmp("WYZS_2").setValue(true);}
					else if(wyzs_sq.split("|")[2] == "5000万"){Ext.getCmp("WYZS_3").setValue(true);}
					else {Ext.getCmp("WYZS_4").setValue(true);}
				}else{
					Ext.getCmp("radio_money").setVisible(false);
				}
			}
			//判断自定义的变量是否存在值，如果之前提交过值，则再次选中该项时，会将提交最后提交过的值自动复制到文本框中；
			//....
		}else if(index == 1){
			jsLog(logStrMsg("选择（提交）网银证书业务->添加下挂","INFO"));
			huiFuWYZSTextFile("choice");
			if(type_1 == 1){
				getMsgBody4G2("M0202","P012",1,"P01216","");  //发送消息-->使VTM弹出 网银证书业务 ‘添加下挂’明细填写界面
			}
			agentSetDisabled("WYZS_phoneNum",true);
			Ext.getCmp("WYZS_phoneNum").setValue("");
			Ext.getCmp("WYZS_zhuanzhang").setValue("01");
			Ext.getCmp("radio_money").setVisible(true);   //显示单选按钮
			agentSetDisabled("WYZS_dzmdNum",true);
			Ext.getCmp("WYZS_dzmdNum").setValue("");
			if(wyzs_xg != ""){
				jsLog(logStrMsg("选择（提交）网银证书业务->添加下挂  wyzs_xg-->"+wyzs_xg,"INFO"));
				Ext.getCmp("WYZS_zhuanzhang").setValue(wyzs_xg.split("|")[0]);
				if(Ext.getCmp("WYZS_zhuanzhang").getValue() == "01"){
					Ext.getCmp("radio_money").setVisible(true);
					if(wyzs_xg.split("|")[1] == "100万"){Ext.getCmp("WYZS_1").setValue(true);jsLog(logStrMsg(" wyzs_xg-->100","INFO"));}
					else if(wyzs_xg.split("|")[1] == "500万"){Ext.getCmp("WYZS_2").setValue(true);jsLog(logStrMsg(" wyzs_xg--500>","INFO"));}
					else if(wyzs_xg.split("|")[1] == "5000万"){Ext.getCmp("WYZS_3").setValue(true);jsLog(logStrMsg(" wyzs_xg--5000>","INFO"));}
					else {Ext.getCmp("WYZS_4").setValue(true);jsLog(logStrMsg(" wyzs_xg->无","INFO"));}
				}else{
					jsLog(logStrMsg("else","INFO"));
					Ext.getCmp("radio_money").setVisible(false);
				}
			}
		}else if(index == 2){
			jsLog(logStrMsg("选择（提交）网银证书业务->电子密盾开机挂失","INFO"));
			huiFuWYZSTextFile("choice");
			if(type_1 == 1){
				getMsgBody4G2("M0202","P012",1,"P01217","");  //发送消息-->使VTM弹出 网银证书业务 ‘电子密盾开机挂失’明细填写界面
			}
			agentSetDisabled("WYZS_phoneNum",true);
			Ext.getCmp("WYZS_phoneNum").setValue("");
			agentSetDisabled("WYZS_zhuanzhang",true);
			Ext.getCmp("WYZS_zhuanzhang").setValue("01");
			Ext.getCmp("radio_money").setVisible(true);   //显示单选按钮
			agentSetDisabled("radio_money",true);
			if(wyzs_gs != ""){
				Ext.getCmp("WYZS_dzmdNum").setValue(wyzs_gs);
			}
		}else if(index == 3){
			jsLog(logStrMsg("选择（提交）网银证书业务->修改最高转账限额","INFO"));    
			huiFuWYZSTextFile("choice");
			if(type_1 == 1){
				getMsgBody4G2("M0202","P012",1,"P01218","");     //发送消息-->使VTM弹出 网银证书业务 ‘修改最高转账限额’明细填写界面
			}
			agentSetDisabled("WYZS_phoneNum",true);
			Ext.getCmp("WYZS_phoneNum").setValue("");
			agentSetDisabled("WYZS_dzmdNum",true);
			Ext.getCmp("WYZS_dzmdNum").setValue("");
			Ext.getCmp("WYZS_zhuanzhang").setValue("01");
			Ext.getCmp("radio_money").setVisible(true);   //显示单选按钮
			if(wyzs_xe != ""){
				Ext.getCmp("WYZS_zhuanzhang").setValue(wyzs_xe.split("|")[0]);
				if(Ext.getCmp("WYZS_zhuanzhang").getValue() == "01"){
					Ext.getCmp("radio_money").setVisible(true);
					if(wyzs_xe.split("|")[1] == "100万"){Ext.getCmp("WYZS_1").setValue(true);}
					else if(wyzs_xe.split("|")[1] == "500万"){Ext.getCmp("WYZS_2").setValue(true);}
					else if(wyzs_xe.split("|")[1] == "5000万"){Ext.getCmp("WYZS_3").setValue(true);}
					else {Ext.getCmp("WYZS_4").setValue(true);}
				}else{
					Ext.getCmp("radio_money").setVisible(false);
				}
			}
		}else if(index == 4){
			jsLog(logStrMsg("选择（提交）网银证书业务->恢复启用网银","INFO"));
			huiFuWYZSTextFile("choice");
			if(type_1 == 1){
				getMsgBody4G2("M0202","P012",1,"P01219","");  //发送消息-->使VTM弹出 网银证书业务 ‘恢复启用网银’明细填写界面
			}
			agentSetDisabled("WYZS_zhuanzhang",true);
			agentSetDisabled("radio_money",true);
			Ext.getCmp("radio_money").setVisible(true);
			Ext.getCmp("WYZS_zhuanzhang").setValue("01");
			if(wyzs_hfqy != ""){
				Ext.getCmp("WYZS_phoneNum").setValue(wyzs_hfqy.split("|")[0]);
				Ext.getCmp("WYZS_dzmdNum").setValue(wyzs_hfqy.split("|")[1]);
			}
		}else{
			jsLog(logStrMsg("选择（提交）网银证书业务->恢复电子密盾验证","INFO"));
			huiFuWYZSTextFile("choice");
			if(type_1 == 1){
				getMsgBody4G2("M0202","P012",1,"P01220","");  //发送消息-->使VTM弹出 网银证书业务 ‘恢复电子密盾验证’明细填写界面
			}
			agentSetDisabled("WYZS_phoneNum",true);
			Ext.getCmp("WYZS_phoneNum").setValue("");
			agentSetDisabled("WYZS_zhuanzhang",true);
			Ext.getCmp("WYZS_zhuanzhang").setValue("01");
			agentSetDisabled("radio_money",true);
			Ext.getCmp("radio_money").setVisible(true);
			if(wyzs_hfyz != ""){
				Ext.getCmp("WYZS_dzmdNum").setValue(wyzs_hfyz);
			}
		}
	}
}


//--form事件相应---
function RegFormMessageEvt(IFormID,strFormName,strFormMessage){
	jsLog(logStrMsg("GETMESSAGE:(" + IFormID + ","+ strFormName + "," + strFormMessage + ")","MESSAGE"));
	if(IFormID == 1){
		if(strFormMessage == "1"){
			BussChoicType = "KJJK";
		}else if(strFormMessage == "2"){
			BussChoicType = "DZQD";
		}else if(strFormMessage == "3"){
			BussChoicType = "TZLC";
		}else if(strFormMessage == "4"){
			BussChoicType = "FUND";
		}else if(strFormMessage == "5"){
			BussChoicType = "TZLC";
			Ext.getCmp("102103").setVisible(true);//显示‘继续办理基金业务’按钮
		}
		
		jsLog(logStrMsg("INFO:(BussChoicType = "+BussChoicType+")","MESSAGE"));
		
		if(getMyocxInfo(1) == "version2" || getMyocxInfo(1) == "version2.1"){
			totalBussines = "two";
			YWchoicePlay();
			Ext.getCmp("ZH_WYZS").setVisible(false);//隐藏网银盾业务
		}else if(getMyocxInfo(1) == "version1"){
			totalBussines = "one";
			if(!Ext.getCmp("tow_KJJK").getValue()){
				//friendShipMsg("终端是一期业务,请选择开卡业务！");
				myocx.InvokeBusinessForm(9,"",222,"终端是一期业务,请选择开卡业务！");  //消息弹窗程序
			}else{
				YWchoicePlay();
				//synWithTerm(22,1);  //测试使用最好页面
			}
			Ext.getCmp("ZH_WYZS").setVisible(false);//隐藏网银盾业务
		}else {
			jsLog(logStrMsg(" version3 存在网银盾业务 ","INFO"));
			totalBussines = "two";
			YWchoicePlay();
			
		}
		Ext.getCmp("SJ_zhuanzhang").setValue("01");   //转账下拉框设置初始值  '01'
		Ext.getCmp("SJ_zhifu").setValue("01");		  //支付下拉框设置初始值  '01'
		Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("办理业务")+"</h1></font>");
			
	}
	
	if(IFormID == 3){
		jsLog(logStrMsg("INFO:(收到IFormId == 3 , strFormMessage = "+strFormMessage+") ","MESSAGE"));
		if(strFormMessage == "1"){
			jsLog(logStrMsg("myocx.AgentSendMessage(1, 2, termprintdoc); ","MESSAGE"));
			//审核通过
			//myocx.AgentSendMessage(1, 2, "termprintdoc");// 修改为消息控制
			cusprintinfo(0);
			Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("审核通过")+"</h1></font>");
		}else if(strFormMessage == "2"){
			jsLog(logStrMsg("myocx.AgentSendMessage(1, 5, needsyn);","MESSAGE"));
			//审核不通过
			//myocx.AgentSendMessage(1, 5, 'needsyn');
			cusprintinfo(1);
			//synWithTerm(5, 1);
			Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("审核不通过")+"</h1></font>");
		}
	}
	
	
		
	//审核签字页面 C#消息， [CheckSignForm]
	if(IFormID == 4){
		jsLog(logStrMsg("INFO:(收到IFormId == 4 , strFormMessage = "+strFormMessage+") ","MESSAGE"));
		//座席端点击WinForm的审核通过
		if(strFormMessage == "checkOK_KJJK"){
			videostopvedio1();    //关闭签字视频
			globalcurpage = 8;
			if(BussChoicType != "KJJK"){
				myocx.InvokeBusinessForm(4,"",4,"");
			}
			
			jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[CheckSignForm.exe] 4：隐藏","INFO"));
			synWithTerm(9,1);  
			prn('审核通过');
			Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("审核通过")+"</h1></font>");
		}else if(strFormMessage == "checkOK_DZQD"){
			videostopvedio1();    //关闭签字视频
			globalcurpage = 8;
			jsLog(logStrMsg("VIDEO_2 Path : " + videofilePath ,"INFO"));
			saveVideo_tow();
			// 目前测试 发送3个要设置的新密码(电子银行密码，电话银行密码，手机银行登录密码)
			setNewPWDPage();
			Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("审核通过")+"</h1></font>");
		}else if(strFormMessage == "checkOK_TZLC"){
			videostopvedio1();    //关闭签字视频
			globalcurpage = 8;
			jsLog(logStrMsg(" FormMessageEvt 事件 ： 理财不需要跳转，需受到消息跳转" ,"INFO"));
			Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("审核通过")+"</h1></font>");
		}
		//点击WinForm的重新打印
		if(strFormMessage == "printagin"){
			jsLog(logStrMsg("[AGENT] click printagin Button ...","MESSAGE"));
			prn('重新打印，调用打印接口，最后开发');
			printdoc();//
			Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("重新打印")+"</h1></font>");
		}else if(strFormMessage == "check_indentity_info"){
			//受到C#消息  点击查看核查结果按钮
			jsLog(logStrMsg("Click ChecPersonal Result Button -> checkERROR="+checkERROR,"INFO   "));
			jsLog(logStrMsg("查看扫描件页面-> 联网核查输出字符串checkretInfo="+checkretInfo,"INFO   "));
			checkClick = true;    //暂时放此处，去调整;
			//判断核查返回的结果是否是ERROR 则弹窗核查

			if(checkERROR)
			{
				//jsLog(logStrMsg("ERROR 1111111111111","INFO   "));
//				alert("联网核查返回ERROR，可以事后进行补录！");
				friendShipMsg("联网核查返回ERROR，可以事后进行补录！");
				//myocx.InvokeBusinessForm(9,"",222,"联网核查返回ERROR，可以事后进行补录！");  //消息弹窗程序
				//jsLog(logStrMsg("ERROR 2222222222222","INFO   "));
				//Ext.getCmp("bulu").setDisabled(true);
				//myocx.InvokeBusinessForm(4,"",2,"ERROR");
			}
			else
			{
				if(checkretInfo == "")
				{
					if(BussChoicType == "KJJK"){
						jsLog(logStrMsg("已经过联网核查，但未返回结果，并且该笔[开借记卡]业务办理已通过拍照页面，需要进行补录"+conhisid_KJJK,"INFO   "));
						setTimeout("updateCheckPersonal("+conhisid_KJJK+",'NEEDCHECK')",3000);
					}else if(BussChoicType == "DZQD"){
						jsLog(logStrMsg("已经过联网核查，但未返回结果，并且该笔[电子渠道]业务办理已通过拍照页面，需要进行补录"+conhisid_DZQD,"INFO   "));
						setTimeout("updateCheckPersonal("+conhisid_DZQD+",'NEEDCHECK')",3000);
					}else if(BussChoicType == "TZLC"){
						jsLog(logStrMsg("已经过联网核查，但未返回结果，并且该笔[投资理财]业务办理已通过拍照页面，需要进行补录"+returnConhisID(),"INFO   "));
						setTimeout("updateCheckPersonal("+returnConhisID()+",'NEEDCHECK')",3000);
					}
					friendShipMsg("联网核查暂未返回结果，可以事后进行补录！");
					//myocx.InvokeBusinessForm(9,"",222,"联网核查暂未返回结果，可以事后进行补录！");  //消息弹窗程序
					//Ext.getCmp("bulu").setDisabled(true);
					//myocx.InvokeBusinessForm(4,"",2,"ERROR");
				}
				else
				{
					jsLog(logStrMsg("Open showCheckFuncInfo Window -> saveTakeImg="+saveTakeImg,"INFO   "));
					//showCheckFuncInfo(checkName,checkretInfo,"C:\\CT002201403111749.bmp");   //查看核查返回的信息
					showCheckFuncInfo(checkName,checkretInfo,saveTakeImg);   //查看核查返回的信息
				}
			}
		}
	}
	
	//投资理财 问卷结果页面 C#消息， [TZLCResultForm]
	if(IFormID == 5){
		jsLog(logStrMsg("INFO:(收到IFormId == 5 , strFormMessage = "+strFormMessage+") ","MESSAGE"));
		//座席端点击WinForm的继续按钮
		if(strFormMessage == "clickNextBut"){
			synWithTerm(7,1);
			jsLog(logStrMsg("[问卷评估结果页] -> 座席点击继续按钮，并sysnWithTerm7,1","INFO"));
			getMsgBody4G2("M0204","P027",1,"P019","");   //发送消息-->
			//开启第二个视频
			//videostartvedio1();
			//发送C#消息形式，告诉WinForm程序来调打开第二个视频
			myocx.InvokeBusinessForm(10,"",103,"");
			jsLog(logStrMsg("INFO:(发送C#消息形式，告诉WinForm程序来调打开第二个视频...)","MESSAGE"));
			jsLog(logStrMsg("[问卷评估结果页] -> 开启第二个视频","INFO"));
			
			//关闭C# TZLCResultForm 窗口
			//myocx.InvokeBusinessForm(5,"",4,"");
			
			//显示C#窗口
			myocx.InvokeBusinessForm(2,"",0,"");
			myocx.InvokeBusinessForm(2,"",222,"NotPaper:"+NotPaper);
			jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[SignPage.exe] 0：打开","INFO"));
		}
	}
	
	
	//投资理财 读取卡号页面， [ReadCardNumPage]
	if(IFormID == 7){
		jsLog(logStrMsg("INFO:(收到IFormId == 7 , strFormMessage = "+strFormMessage+") ","MESSAGE"));
		//座席端点击WinForm的继续按钮
		if(strFormMessage.split(':')[0] == "ReadCardPage"){
			if(strFormMessage.split(':')[1] == "go_Next"){          //继续进行下一步
				if(BussChoicType == "TZLC"){
					Ext.getCmp("101402").setDisabled(true);
				    //隐藏掉客户输入按钮 -- 默认为 跳转后客户来选择相应问卷题目
					Ext.getCmp("222").setVisible(false);
					Ext.getCmp("000").setVisible(false);
					Ext.getCmp("uppage").setDisabled(true);   //将上一页下一页两个按钮给灰调
					Ext.getCmp("downpage").setDisabled(true);
					getMsgBody4G2("M0204","P014",0,"","terminalChoice");
					//需要验证客户的支付密码;
					Ext.getCmp("cus_checkpwdinfo").setValue("");
					Ext.getCmp("cus_dzyhpwd").setValue("");
					Ext.getCmp("101600").setValue("验证取款密码");
					//synWithTerm(15,1);
					getMsgBody4G2("M0204","P011",1,"P017","");
					//synWithTerm(13,1);   //问卷页面
					//getMsgBody4G2("M0204","P011",1,"P01401","");   //发送消息-->跳转填写问卷页面第一页
					if(fristBusiness > 0){
						//takeSaveSomeFiles(conhisid_TZLC);//存储相应的资料文件
						jsLog(logStrMsg("INFO:(ConHisId  = "+conhisid_TZLC+") ","MESSAGE"));
						setTimeout("takeSaveSomeFiles(" + conhisid_TZLC + ")", 3000);
					}
				}else if(BussChoicType == "DZQD"){
					//synWithTerm(12,1);   //综合填写页面
					getMsgBody4G2("M0202","P011",1,"P012","");     //跳转电子渠道页面
					
				}
			}else if(strFormMessage.split(':')[1] == "go_Index"){   //返回首页视频页
				//返回视频首页消息
				fristBusiness ++;
				synWithTerm(0,1);
				//visibledSomePage(1);
				getMsgBody4G2("M0101","P004",1,"P004","");
//				Ext.getCmp("goBackVideo").setVisible(false);
//				Ext.getCmp("ReadCard").setDisabled(false);
//				Ext.getCmp("EjectCard").setDisabled(false);
				//Ext.getCmp("tow_TZLC").setValue(false);	Ext.getCmp("tow_JJGS").setValue(false);Ext.getCmp("tow_KJJK").setValue(false);	Ext.getCmp("tow_DZQD").setValue(false);
				BussChoicType == "";
				//myocx.InvokeBusinessForm(1,"",0,YesOrNo_FUND);
				myocx.InvokeBusinessForm(10,"",101,"");
				jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[agentIndexPage.exe] 0：打开","INFO"));
			}
			
		}
	}
	
	//基金签约业务所有页面  FundBussinessFlow.exe
	if(IFormID == 8){
		jsLog(logStrMsg("INFO:(收到IFormId == 8 , strFormMessage = "+strFormMessage+") ","MESSAGE"));
		if(strFormMessage.split(':')[0] == "scanPCard_Form"){   //当前EXE程序在扫描证件 画面；
			jsLog(logStrMsg("INFO:(IFormId == 8 , 当前EXE程序在扫描证件画面) ","MESSAGE"));
			if(strFormMessage.split(':')[1] == "takeBtnScan"){
				jsLog(logStrMsg("INFO:(IFormId == 8 , 点击扫描证件按钮) ","MESSAGE"));
				Ext.getCmp("butInfo").setValue("<font style='color:blue'><h1>"+butInfoShow("证件扫描")+"</h1></font>");
				printidcard("");
			}
		}else if(strFormMessage.split(':')[0] == "CheckIndentity_Form"){   //当前EXE程序在身份核查画面
			jsLog(logStrMsg("INFO:(IFormId == 8 , 当前EXE程序在身份核查画面) ","MESSAGE"));
			if(strFormMessage.split(':')[1] == "takePhoto"){   //点击拍照按钮
				isSavepic = 1;
				videosavepic();
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("拍照")+"</h1></font>");
	
			}else if(strFormMessage.split(':')[1] == "CheckInfo"){  //点击身份核查
				var hour = new Date().pattern('HH');
				var minute = new Date().pattern('mm');
				if(hour=="08"||hour=="09"||hour=="10"||hour=="11"||hour=="12"||hour=="13"||hour=="14"||hour=="15"||hour=="16"||hour=="17"||hour=="18"||hour=="19"){
					if(hour=="19"){
						if(minute == "00"){
							//Ext.getCmp('indentityCheck').setDisabled(true);
							checkFunc();
							
						}else{
							alert("该时间段无法进行联网核查，请继续办理业务，并事后进行补录！");
						}
					}else{
						//Ext.getCmp('indentityCheck').setDisabled(true);
						checkFunc();
					}
				}else{
					alert("该时间段无法进行联网核查，请继续办理业务，并事后进行补录！");
				}
			}else if(strFormMessage.split(':')[1] == "FUND_zhangcheng"){
				
				jsLog(logStrMsg(" WinForm程序选择的核查结果 combox框的值为："+strFormMessage.split(':')[2],"INFO   ")); //记录日志
				isSavepic = 0;
				rememberBuss = 1;   //作为标记证明此次通话已扫描过客户证件
				clickFlag = true;
				//不为空的话就直接在点击确认的时候将所有的存储
				SF_result = strFormMessage.split(':')[2];
				jsLog(logStrMsg("反馈照片信息 -> ConsoleCode need Update ...","INFO   ")); //记录日志
				SF_cp = agentno;
				var str = "dName="+SF_dName+"\npName="+SF_name+"\nID="+SF_cardID+"\nresult="+checkPSResult(SF_result)+"\nwangID="+SF_wangID+"\ncp="+SF_cp+"\nyearMD="+SF_year+"\ntime="+SF_time+"\nagentName="+agentName;
				jsLog(logStrMsg("反馈照片信息 -> str = " + str,"INFO   ")); //记录日志
				//-----------------数据-------------------
				textTXT = savepicDir + "X" + dealno + ".html";
				
				/**
				jsLog(logStrMsg("待调曲晓接口，存储‘身份核查’txt文件  agentSetPersonalCheckInfo('','','','');","INFO   ")); //记录日志
				jsLog(logStrMsg("@Param1:  dealno （流水号）","INFO   ")); //记录日志
				jsLog(logStrMsg("@Param2:  str （文本txt里面显示内容）","INFO   ")); //记录日志
				jsLog(logStrMsg("@Param3:  'X' + dealno + '.txt' (文件上传的名称)","INFO   ")); //记录日志
				jsLog(logStrMsg("@param4:  ''  传空字符串,","INFO   ")); //记录日志
				myocx.agentSetPersonalCheckInfo(dealno,str,"X" + dealno + ".txt","");    //曲晓接口： 上传txt身份核查 文件
				jsLog(logStrMsg("反馈照片信息 -> myocx.agentSetPersonalCheckInfo...","INFO   ")); //记录日志
				saveSomeFile(returnConhisID(), '99', '2', textTXT,agentno, cusname, cerno);  //存储一个txt文件的路径 --> 只确定一次存储联网核查文件路径即可（无论是否核查都存储）
				jsLog(logStrMsg("反馈照片信息 -> Save Txt OK _","INFO")); //记录日志
				jsLog(logStrMsg("反馈照片信息 -> Look CheckIn... Disabled : true ","INFO   ")); //记录日志

				*/
				
				var line_head = "<HTML>\n<head>\n<meta http-equiv='Content-Type' content='charset=utf-8' />\n<title>身份核查信息</title>\n</head>";
				var line_Table = "<body>\n<table width='778' height='195' border='1' align='center' >" +
		                         "<tr>\n<td width='381' height='37' align='right'>业务名称：</td>\n" +
		                         "<td width='381'>" + SF_dName + "</td>\n</tr>\n" +
		                         "<tr>\n<td height='36' align='right'>核对人姓名：</td>\n" +
		                         "<td>" + SF_name + "</td>\n</tr>\n" +
		                         "<tr>\n<td height='36' align='right'>身份证号：</td>\n" +
		                         "<td>" + SF_cardID + "</td>\n</tr>\n" +
		                         "<tr>\n<td height='36' align='right'>核对结果：</td>\n" +
		                         "<td>" + SF_result + "</td>\n</tr>\n" +
		                         "<tr>\n<td height='36' colspan='2' align='center'>网点号：" + 
		                         SF_wangID + " 座席员号:" + agentName + " 操作员号:" 
		                         + SF_cp + " 日期:" + SF_year + " 时间: " + SF_time + 
		                         "</td>\n</tr>\n" + 
		                         "</table>\n</body>\n</HTML>";
				var fso = new ActiveXObject("Scripting.FileSystemObject");
				var fh = fso.OpenTextFile(textTXT, 8, true);			//只读=1，只写=2 ，追加=8 等权限
				fh.WriteLine(line_head);
				fh.WriteLine(line_Table);
				fh.Close();
				jsLog(logStrMsg("--------------->保存html文件成功<------------------")); //记录日志
				
				saveSomeFile(returnConhisID(), '2', '2', savepic,agentno, cusname, cerno);//点击确定，将拍照图片路径存储在数据库
				
				ReadZC(0);
				//告诉C#已经不用查看身份核查结果！
				myocx.InvokeBusinessForm(10,"",102,"");
				
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("确定")+"</h1></font>");
			}else if(strFormMessage.split(':')[1] == "GO_ON"){
					rememberBuss = 1;   //作为标记证明此次通话已扫描过客户证件
					isSavepic = 0;
					ReadZC(0);
					jsLog(logStrMsg("未经过联网核查，并且该笔[投资理财]业务办理已通过拍照页面，需要进行补录"+returnConhisID(),"INFO   "));
					setTimeout("updateCheckPersonal("+returnConhisID()+",'NEEDCHECK')",3000);
					checkClick = true;
					jsLog(logStrMsg("Take Photo Click Sure_Button show -> checkClick="+checkClick,"INFO   ")); //记录日志
					jsLog(logStrMsg("[No CheckIndentity]Ready Save Pic -> begin  _ savepic = "+savepic,"INFO   ")); //记录日志
					saveSomeFile(returnConhisID(), '2', '2', savepic,agentno, cusname, cerno);//拍完照片立即将路径存储在数据库
					jsLog(logStrMsg("[No CheckIndentity]Save Pic OK -> Over  _ savepic = "+savepic,"INFO   ")); //记录日志
			}else if(strFormMessage.split(':')[1] == "FUND_BULU"){
				jsLog(logStrMsg("联网核查未返回结果，暂时继续办理业务，告诉终端跳转画面！","INFO   "));
				isSavepic = 0;
				rememberBuss = 1;   //作为标记证明此次通话已扫描过客户证件
				ReadZC(0);
			}
		}else if(strFormMessage.split(':')[0] == "Rule_Form"){   //当前EXE程序在阅读章程画面
			jsLog(logStrMsg("INFO:(IFormId == 8 , 当前EXE程序在阅读章程画面) ","MESSAGE"));
			//ReadZC(0);
		}else if(strFormMessage.split(':')[0] == "ReadCard_Form"){   //当前EXE程序在读取卡号画面
			jsLog(logStrMsg("INFO:(IFormId == 8 , 当前EXE程序在读取卡号画面) ","MESSAGE"));
			if(strFormMessage.split(':')[1] == "WinForm_goNext"){ //点击下一步
				getMsgBody4G2("M0208","P010",1,"P017","");   //告诉Terminal 跳转到验证取款密码画面
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("下一步")+"</h1></font>");
			}
			
		}else if(strFormMessage.split(':')[0] == "CheckPWD_Form"){   //当前EXE程序在验证支付密码画面
			jsLog(logStrMsg("INFO:(IFormId == 8 , 当前EXE程序在验证支付密码画面) ","MESSAGE"));
			
		}else if(strFormMessage.split(':')[0] == "MainFundInfo_Form"){   //当前EXE程序在基金问卷填写画面
			jsLog(logStrMsg("INFO:(IFormId == 8 , 当前EXE程序在基金问卷填写画面) ","MESSAGE"));
			if(strFormMessage.split(':')[1] == "customerChoice"){  //customerChoice
				getMsgBody4G2("M0208","P041",0,"","terminalChoice");
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("客户选择")+"</h1></font>");
			}else if(strFormMessage.split(':')[1] == "agentChoice"){
				getMsgBody4G2("M0208","P041",0,"","agentChoice");
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("座席选择")+"</h1></font>");
			}else if(strFormMessage.split(':')[1] == "choiceOK"){
				getMsgBody4G2("M0208","P041",1,"P043","");
				getMsgBody4G2("M0208","P043",0,"","terminalChoice");    //告诉终端  默认客户输入
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("提交")+"</h1></font>");
			}else if(strFormMessage.split(':')[1] == "show-1"){  //显示第一页
				getMsgBody4G2("M0208","P04102",1,"P04101","");
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("上一页")+"</h1></font>");
			}else if(strFormMessage.split(':')[1] == "1-show-2"){  //显示第二页
				getMsgBody4G2("M0208","P04101",1,"P04102","");
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("下一页")+"</h1></font>");
			}else if(strFormMessage.split(':')[1] == "3-show-2"){  //显示第二页
				getMsgBody4G2("M0208","P04103",1,"P04102","");
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("上一页")+"</h1></font>");
			}else if(strFormMessage.split(':')[1] == "show-3"){  //显示第三页
				getMsgBody4G2("M0208","P04102",1,"P04103","");
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("下一页")+"</h1></font>");
			}
		}else if(strFormMessage.split(':')[0] == "CusInfo_Form"){   //当前EXE程序在客户资料填写画面
			jsLog(logStrMsg("INFO:(IFormId == 8 , 当前EXE程序在客户资料填写画面) ","MESSAGE"));
			if(strFormMessage.split(':')[1] == "GoNext_Form"){//GoNext_Form
				getMsgBody4G2("M0208","P043",0,"P042","");
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("继续")+"</h1></font>");
			}else if(strFormMessage.split(':')[1] == "agentChoice"){   //坐席输入
				getMsgBody4G2("M0208","P043",0,"","agentChoice");
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("坐席输入")+"</h1></font>");
			}else if(strFormMessage.split(':')[1] == "customerChoice"){
				getMsgBody4G2("M0208","P043",0,"","terminalChoice");
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("客户输入")+"</h1></font>");
			}
		}else if(strFormMessage.split(':')[0] == "FundResultInfo_Form"){   //当前EXE程序在基金问卷结果画面
			jsLog(logStrMsg("INFO:(IFormId == 8 , 当前EXE程序在基金问卷结果画面) ","MESSAGE"));
			if(strFormMessage.split(':')[1]  == "FundGoNext"){  //FundGoNext
				getMsgBody4G2("M0208","P042",1,"P019","");   //发送消息-->跳转到 打印表单页面
				//videostartvedio1();
				//发送C#消息形式，告诉WinForm程序来调打开第二个视频
				myocx.InvokeBusinessForm(10,"",103,"");
				jsLog(logStrMsg("INFO:(发送C#消息形式，告诉WinForm程序来调打开第二个视频...)","MESSAGE"));
				jsLog(logStrMsg("INFO:发送消息完毕，并开启第二个视频","MESSAGE"));
				//隐藏当前 C#画面，显示打印表单 4个按钮换面  signPageForm
				myocx.InvokeBusinessForm(8,"",109,"");
				jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe] 109：审核签字Form","INFO"));
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("继续")+"</h1></font>");
			}
		}else if(strFormMessage.split(':')[0] == "SignPage_Form"){   //当前EXE程序在表单签字画面
			jsLog(logStrMsg("INFO:(IFormId == 8 , 当前EXE程序在表单签字画面) ","MESSAGE"));
			if(strFormMessage.split(':')[1] == "BDHS"){   //表单回收按钮
				getMsgBody4G2("M0208","P019",1,"P021","scandoc");   //
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("表单回收")+"</h1></font>");
			}else if(strFormMessage.split(':')[1] == "QZDH"){
				getMsgBody4G2("M0208","P019",1,"P020","");   //
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("签字动画")+"</h1></font>");
			}else if(strFormMessage.split(':')[1] == "HSDH"){
				getMsgBody4G2("M0208","P019",1,"P021","");   //
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("回收动画")+"</h1></font>");
			}else if(strFormMessage.split(':')[1] == "CXDY"){
				getMsgBody4G2("M0208","P022",1,"P019","termprintdoc");   //
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("重新打印")+"</h1></font>");
			}
		}else if(strFormMessage.split(':')[0] == "CheckSignInfo_Form"){   //当前EXE程序在审核表单签字画面
			jsLog(logStrMsg("INFO:(IFormId == 8 , 当前EXE程序在审核表单签字画面) ","MESSAGE"));
			if(strFormMessage.split(':')[1] == "printagin"){
				jsLog(logStrMsg("[AGENT] click printagin Button ...","MESSAGE"));
				prn('重新打印，调用打印接口，最后开发');
				printdoc();//
				//videostartvedio1();  //调用第二个视频
				//发送C#消息形式，告诉WinForm程序来调打开第二个视频
				myocx.InvokeBusinessForm(10,"",103,"");
				jsLog(logStrMsg("INFO:(发送C#消息形式，告诉WinForm程序来调打开第二个视频...)","MESSAGE"));
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("重新打印")+"</h1></font>");
			}else if(strFormMessage.split(':')[1] == "checkOK_FUND"){ //checkOK_FUND
				getMsgBody4G2("M0208","P022",1,"P029","");   //发送消息-->告诉终端去做交易，成功后跳转
				videostopvedio1();    //关闭签字视频
				globalcurpage = 8;
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("审核通过")+"</h1></font>");
			}
			jsLog(logStrMsg("INFO:(strmessage =  " + strFormMessage.split(':')[1],"MESSAGE"));
			 if(strFormMessage.split(':')[1] == "check_indentity"){   //基金业务点击查看核查结果
				Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("查看核查结果")+"</h1></font>");
				//受到C#消息  点击查看核查结果按钮
				jsLog(logStrMsg("Click ChecPersonal Result Button -> checkERROR="+checkERROR,"INFO   "));
				jsLog(logStrMsg("查看扫描件页面-> 联网核查输出字符串checkretInfo="+checkretInfo,"INFO   "));
				//checkClick = true;    //暂时放此处，去调整;
	
				if(checkERROR)
				{
					alert("联网核查返回ERROR，可以事后进行补录！");
					myocx.InvokeBusinessForm(8,"",983,"");   //调用弹窗
					jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe] 983：CheckSignInfo_Form SHOW","INFO"));
				}else{
					if(checkretInfo == "")
					{
						setTimeout("updateCheckPersonal("+returnConhisID()+",'NEEDCHECK')",3000);
						alert("联网核查暂未返回结果，可以事后进行补录！");
						myocx.InvokeBusinessForm(8,"",983,"");   //调用弹窗
						jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe] 983：CheckSignInfo_Form SHOW","INFO"));
					}
					else
					{
						jsLog(logStrMsg("[FUND Busniess] : Open showCheckFuncInfo Window -> saveTakeImg="+saveTakeImg,"INFO   "));
						showCheckFuncInfo(checkName,checkretInfo,saveTakeImg);   //查看核查返回的信息
					}
				}
			}
			
		}else if(strFormMessage.split(':')[0] == "Result_Form"){   //当前EXE程序在最终交易结果画面
			jsLog(logStrMsg("INFO:(IFormId == 8 , 当前EXE程序在最终交易结果画面) ","MESSAGE"));
			if(strFormMessage.split(':')[1] == "fromToVideoPage"){   //WinForm点击继续办理业务按钮
				jsLog(logStrMsg("INFO:(IFormId == 8 ,fromToVideoPage 准备跳转到视频首页) ","MESSAGE"));
				getMsgBody4G2("M0208","P029",1,"P004","");   // 返回视频页面
				BussChoicType == "";
				fristBusiness ++;
				//调用控件 show 首页的 form   BussChoicType != "KJJK"
				//myocx.InvokeBusinessForm(1,"",0,YesOrNo_FUND);
				myocx.InvokeBusinessForm(10,"",101,"");  //打开首页公共代码Form
				jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[agentIndexPage.exe] 0：打开","INFO"));
			}
		}
		
	}
	
	
	//AgentModuleChoice
	if(IFormID == 10){
		//jsLog(logStrMsg("INFO:(IFormId == 10 , setMyocxInfo(0,AgentName = "+agentName+")) ","MESSAGE"));
		if(strFormMessage.split(':')[0] == "VideoInitOK"){
			////VideoInitOK:DealNO=T000031231,Version=version2.1,NotPaper=True
			dealno = strFormMessage.split('=')[1].split(',')[0];
			setMyocxInfo(1,strFormMessage.split('=')[2].split(',')[0]);  //赋值VersionNO版本号
			NotPaper = strFormMessage.split('=')[3];
			jsLog(logStrMsg("INFO:(dealno == 10 , VersionNO = "+getMyocxInfo(1)+" , NotPaper = "+NotPaper+") ","MESSAGE"));
			if(getMyocxInfo(1) == "version2" || getMyocxInfo(1) == "version2.1"){
				totalBussines = "two";
				//YWchoicePlay();
				Ext.getCmp("ZH_WYZS").setVisible(false);//隐藏网银盾业务
			}
			
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的videoinitOK后 赋值流水号： dealno = "+dealno+"，成功后Softphone延时10秒调用SaveWav(); ) ","MESSAGE"));
			//jsLog(logStrMsg("INFO:(IFormId == 10 , saveWavpath = "+saveWavpath+" , starT = "+startT+" , Mes = "+strFormMessage.split('=')[1]+") ","MESSAGE"));
			//saveWav(saveWavpath,startT);
			var object = Ext.util.JSON.decode(userInfo);
			// 取得当前登录用户的相关信息，包括权限
			var user = object.user;
			var curUserInfo = new UserInfo(user);
			agentName = curUserInfo.username;
			setMyocxInfo(0,agentName);
			jsLog(logStrMsg("INFO:(IFormId == 10 , setMyocxInfo(0,AgentName = "+agentName+")) ","MESSAGE"));
		}
		//
		if(strFormMessage.split(':')[0] == "IDCardScandResult"){
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的IDCardScandResult扫描身份证的消息，准备存储照片路径... ) ","MESSAGE"));
			rememberScanCard = 1;  //用来标记已扫描证件，
			var Str = strFormMessage.split('=')[1];
			picpath_copy = Str.split(',')[0];
			cusname = Str.split(',')[1];
			cerno = Str.split(',')[2];
			jsLog(logStrMsg("INFO:(IFormId == 10 , , picpath_copy = "+picpath_copy+" , cusname = "+cusname+" , cerno = "+cerno+") ","MESSAGE"));
			saveSomeFile(returnConhisID(), '2', '2', picpath_copy, agentno, cusname, cerno);
		}
		if(strFormMessage.split(':')[0] == "Video_SnapShot"){// 拍照
			rememberBuss = 1;   //作为标记证明此次通话已扫描过客户证件
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的Video_SnapShot拍照返回的消息，准备存储照片路径... ) ","MESSAGE"));
			savepic = strFormMessage.split('=')[1];
			saveSomeFile(returnConhisID(), '2', '2', savepic, agentno, cusname, cerno);
		}
		if(strFormMessage.split(':')[0] == "Video_groupPhoto"){// 合影消息
			//rememberBuss = 1;   //作为标记证明此次通话已扫描过客户证件
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的Video_groupPhoto合影拍照返回的消息，准备存储照片路径... ) ","MESSAGE"));
			var path = strFormMessage.split('=')[1];
			saveSomeFile(returnConhisID(), '77', '2', path, agentno, cusname, cerno);
		}
		if(strFormMessage.split(':')[0] == "DocScan_Resp"){  //表单回收 存储路径
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的DocScan_Resp扫描表单返回的消息，准备存储路径... ) ","MESSAGE"));
			scanfp = strFormMessage.split('=')[1];
			saveSomeFile(returnConhisID(), '2', '2', scanfp, agentno, cusname, cerno);
		}
		if(strFormMessage.split(':')[0] == "SaveText"){  ///保存身份核查文件路径
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的 SaveText 保存身份核查文件路径... ) ","MESSAGE"));
			textTXT = strFormMessage.split('=')[1];
			saveSomeFile(returnConhisID(), '99', '2', textTXT,agentno, cusname, cerno);  //存储一个txt文件的路径 --> 只确定一次存储联网核查文件路径即可（无论是否核查都存储）
			myocx.InvokeBusinessForm(8,"",981,"");   //通知基金C#流程，将查看核查结果按钮 灰掉
		}
		if(strFormMessage.split(':')[0] == "Clear_SaveWav"){//C#发送消息 -> 存储高清录音文件
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的 Clear_SaveWav 存储高清录音文件路径... ) ","MESSAGE"));
			saveClearWav = strFormMessage.split('=')[1];
			saveSomeFile(returnConhisID(), '88', '1', strFormMessage.split('=')[1], agentno, cusname, cerno);
		}
		if(strFormMessage.split(':')[0] == "StartVideo_Success"){//StartVideo_Success
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的 StartVideo_Success 准备存储'主/签字'视频路径... ) ","MESSAGE"));
			var index = strFormMessage.split('=')[1].split(',')[0];
			if(index == 0){
				videofilePath = strFormMessage.split('=')[1].split(',')[1];
				saveSomeFile(returnConhisID(), '5', '1', videofilePath, agentno, "", "");
				jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的 StartVideo_Success 存储'主视频'录像路径路径 videofilePath="+videofilePath+"... ) ","MESSAGE"));
			}else{
				strVideoFilePath_copy = strFormMessage.split('=')[1].split(',')[1];
				saveSomeFile(returnConhisID(), '5', '1', strVideoFilePath_copy, agentno, "", "");
				jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的 StartVideo_Success 存储'签字视频'录像路径路径 strVideoFilePath_copy="+strVideoFilePath_copy+"... ) ","MESSAGE"));
			}
		}
		if(strFormMessage.split(':')[0] == "0511P_SavePDF"){//0511P_SavePDF  存储 PDF 路径消息
			if(NotPaper == "False"){
				jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的 0511P_SavePDF 存储 PDF 路径消息... ) ","MESSAGE"));
				saveSomeFile(returnConhisID(), '13', '2', strFormMessage.split('=')[1],agentno, cusname, cerno);
			}
		}
		if(strFormMessage == "UpdateStatus_SUCC"){  //开卡交易成功，修改后台记录为 1001状态
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的 UpdateStatus_SUCC 开卡交易成功，修改后台记录为 1001状态... ) ","MESSAGE"));
			updateDealStaId(returnConhisID(), '1001');
		}
		if(strFormMessage.split(':')[0] == "WinForm_CardNum"){ //座席点击 ‘继续办理’ 收到卡号消息
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的 WinForm_CardNum 座席点击 ‘继续办理’ 收到卡号消息 cardNum = "+strFormMessage.split(':')[1]+"... ) ","MESSAGE"));
			fristBusiness++; 	//记录fristBusiness变量已经不是第一次呼入了;
			setCardNumber(strFormMessage.split(':')[1]);   //给电子渠道页面 赋值已有的卡号
			cardNumber = strFormMessage.split(':')[1];
			BussChoicType == "";  
		}
		
		if(strFormMessage.split(':')[0] == "Page_Go_BUSS"){//跳转到 指定画面
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的 Page_Go_BUSS 跳转到 相关业务 指定画面... ) ","MESSAGE"));
			if(strFormMessage.split(':')[1].split('|')[0] == "DZQD"){
				BussChoicType = "DZQD";
			}else if(strFormMessage.split(':')[1].split('|')[0] == "TZLC"){
				BussChoicType = "TZLC";
			}else if(strFormMessage.split(':')[1].split('|')[0] == "FUND"){
				BussChoicType = "FUND";
			}
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的 Page_Go_BUSS 当前业务是： "+BussChoicType+"... ) ","MESSAGE"));
			ReadZC(fristBusiness);
			if(BussChoicType == "FUND"){
				myocx.InvokeBusinessForm(8,"",103,checkName);   //打开阅读章程 Form
			}else{
				confirmCusInfos();
			}
				
			rememberBuss = 1;   //作为标记证明此次通话已扫描过客户证件
			//不为空的话就直接在点击确认的时候将所有的存储
			jsLog(logStrMsg("INFO:(IFormId == 10 , 判断clickFlag = "+strFormMessage.split(':')[2]+") ","MESSAGE"));
			if(strFormMessage.split(':')[2] == "true"){
				
				clickFlag = true;
			}
			//clickFlag = true;
		}
		
		if(strFormMessage.split('+')[0] == "CheckID_Info"){ // 方便其他业务 查看核查结果
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的 CheckID_Info 方便其他业务 查看核查结果 ... ) ","MESSAGE"));
			
			//CheckID_Info:Info=
			//胡杨&1&汉&19930104&河北省保定市北市区天鹅中路151号&500224199301041430&保定市公安局北市分局&20101209-20201209&D:\BOBRVA\tempfile\TT002201505191710.bmp,
			//张馨月&452502199411258265&此项暂不返回核查结果&00&D:\BOBRVA\idpic\93538.jpg,
			//D:\BOBRVA\tempfile\1
			//*CheckERROR=False
			var checkinfo = strFormMessage.split('+')[1].split('*')[0].split('=')[1];
			jsLog(logStrMsg("INFO:(checkinfo = "+checkinfo+") ","MESSAGE"));
			checkName = checkinfo.split(',')[0];
			jsLog(logStrMsg("INFO:(checkName = "+checkName+") ","MESSAGE"));
			checkretInfo = checkinfo.split(',')[1];
			jsLog(logStrMsg("INFO:(checkretInfo = "+checkretInfo+") ","MESSAGE"));
			saveTakeImg = checkinfo.split(',')[2];
			jsLog(logStrMsg("INFO:(saveTakeImg = "+saveTakeImg+") ","MESSAGE"));
			//checkERROR = strFormMessage.split('*')[1].split('=')[1];
			//jsLog(logStrMsg("INFO:(checkERROR = "+checkERROR+") ","MESSAGE"));
			if(strFormMessage.split('*')[1].split('=')[1] == "True"){
				checkERROR = true;
				setTimeout("updateCheckPersonal("+returnConhisID()+",'NEEDCHECK')",3000);
			}else{
				checkERROR = false;
			}
			jsLog(logStrMsg("INFO:(checkERROR = "+checkERROR+") ","MESSAGE"));
			if(checkretInfo != ""){
				jsLog(logStrMsg("INFO:(-->checkretInfo="+checkretInfo+") ","MESSAGE"));
				checkClick = true;
				if(BussChoicType == "FUND"){
					myocx.InvokeBusinessForm(8,"",981,"");   //通知基金C#流程，将查看核查结果按钮 灰掉
				}
			}
			jsLog(logStrMsg("INFO:(IFormId == 10 , checkName = "+checkinfo.split(',')[0]+" , checkretInfo = "+checkinfo.split(',')[1]+" , saveTakeImg = "+checkinfo.split(',')[2]+" , checkERROR = "+checkERROR+" ... ) ","MESSAGE"));
			//myocx.InvokeBusinessForm(4,"",0,"checkClick:"+checkClick+"|clickFlag:"+clickFlag+"|path="+picpath);
		}
		if(strFormMessage.split(':')[0] == "UpdateStatus_NeedCheck"){	//  身份核查返回ERROR 或 未联网核查，需补录
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的 UpdateStatus_NeedCheck 身份核查返回ERROR 或 未联网核查，需补录 ... ) ","MESSAGE"));
			checkClick = true;
			setTimeout("updateCheckPersonal("+returnConhisID()+",'NEEDCHECK')",3000);
			jsLog(logStrMsg("INFO:(IFormId == 10 , 经过updateCheckPersonal-> "+returnConhisID()+"  改为 NEEDCHECK ... ) ","MESSAGE"));
		}
		//WinFormClickCheckBtn
		if(strFormMessage.split(':')[0] == "WinFormClickCheckBtn"){	//  收到C#的消息，是否点击身份核查
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的 WinFormClickCheckBtn 收到C#的消息，是否点击身份核查 ... ) ","MESSAGE"));
			if(strFormMessage.split(':')[1] == "false"){   //没有点击身份核查
				myocx.InvokeBusinessForm(8,"",981,"");   //通知基金C#流程，将查看核查结果按钮 灰掉
			}
		}
		
		
		//WinFormPDFResult返回PDF路径
		if(strFormMessage.split('=')[0] == "WinFormPDFResult"){
			jsLog(logStrMsg("INFO:(IFormId == 10 , 收到C#程序发送的 WinFormPDFResult  PDF 返回路径 BussChoicType = "+BussChoicType+"... ) ","MESSAGE"));
			var PDFpath = strFormMessage.split('=')[1];
			if(BussChoicType == "DZQD"){
				savePrintDoc(PDFpath);
			}else if(BussChoicType == "TZLC"){
				saveSomeFile(conhisid_TZLC, '13', '2', PDFpath, agentno, cusname, cerno);
			}else if(BussChoicType == "KJJK"){
				if(NotPaper == "True"){
					saveSomeFile(conhisid_KJJK, '13', '2', PDFpath, agentno, cusname, cerno);
				}
				//saveSomeFile(conhisid_KJJK, '13', '2', picpath, agentno, cusname, cerno);
			}else if(BussChoicType == "FUND"){
				saveSomeFile(conhisid_FUND, '13', '2', PDFpath, agentno, cusname, cerno);
				
				jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe] 110、982","INFO"));
			}
			
		}
		if(strFormMessage.split('=')[0] == "OpenCheckSignForm"){
			//隐藏C#窗口  System.out.printLn
			jsLog(logStrMsg("INFO:(IFormId == 10 , OpenCheckSignForm : "+strFormMessage+")","INFO"));
			if(strFormMessage.split('=')[1] != "FUND"){
				myocx.InvokeBusinessForm(2,"",1,"");
				jsLog(logStrMsg("Hidden WinForm[SignPage.exe] -> OK","INFO   "));
				myocx.InvokeBusinessForm(4,"",0,"NotPaper:"+NotPaper);
				jsLog(logStrMsg("Open WinForm[SignPage.exe] -> OOOOOKKKKK   checkClick="+checkClick + " , clickFlag="+clickFlag ,"INFO   "));
				myocx.InvokeBusinessForm(4,"",202,"checkClicks:"+checkClick+"|clickFlag:"+clickFlag);
				jsLog(logStrMsg("Open WinForm[SignPage.exe] -> Over","INFO   "));
				
				jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[CheckSignForm.exe] 0：打开","INFO"));
			}else{
				jsLog(logStrMsg("IFormId == 10  并且当前业务是基金业务,发送  982 checkERROR="+checkERROR,"INFO"));
				myocx.InvokeBusinessForm(8,"",982,checkERROR);
			}
		}
		
		
		if(strFormMessage == "WinForm_Exit"){   //关闭 所有WinForm流程的exe
			fristBusiness ++;
			BusFormClose();
		}
	}
}


/************************
 * 判断章程页消息传送
 */
function ReadZC(type){
	//只有开卡的状态时发送消息给VTM一个章程
	if(BussChoicType == "KJJK"){
		//getMsgBody4G2("M0201","P005",1,"P007","KK");  //告诉VTM端放入证件页面  显示的章程只有一个
		//setTimeout("updateHisBusType(" + returnConhisID() + ",'0')", 500);
		
		updateHisBusType(conhisid_KJJK , '0');   //修改业务类型为开卡业务 0
	}else if(BussChoicType == "DZQD" || BussChoicType == "TZLC"){   //理财和电子渠道都输入  <<综合章程>>
		if(BussChoicType == "DZQD"){
			//------------------------------------------------------------
			Ext.getCmp("zonghe_callPhone").setValue(phone_fm);  //手机号   
			Ext.getCmp("zonghe_callPhone_ck").setValue(phone_fm);  //手机号   
			Ext.getCmp("zonghe_callguhua").setValue(call_fm);  //固话号
			Ext.getCmp("zonghe_callguhua_ck").setValue(call_fm);  //固话号
			//------------------------------------------------------------
		}
		if(BussChoicType == "TZLC"){
			//修改当前业务的类型 修改成‘投资理财’业务
			updateHisBusType(conhisid_TZLC , '11');
			jsLog(logStrMsg("修改当前业务类型为：投资理财","INFO"));
			//setTimeout("updateConHis('11')",1000); 
			getMsgBody4G2("M0204","P005",1,"P010",""); 
			//Ext.getCmp("111").setVisible(false);  //隐藏坐席输入按钮
		}else{
			if(type == 0){
				getMsgBody4G2("M0202","P005",1,"P008","ZH"); 
			}else if(type == 1){
				getMsgBody4G2("M0202","P004",1,"P008","ZH"); 
			}
		}
	}else if(BussChoicType == "FUND"){
		updateHisBusType(conhisid_FUND , '12');   //  基金业务类型定义为  12
		jsLog(logStrMsg("修改当前业务类型为：基金签约","INFO"));
		//setTimeout("updateConHis('11')",1000); 
		myocx.InvokeBusinessForm(8,"",103,checkName);   //打开阅读章程 Form
		jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe] 103：章程画面","INFO"));
		getMsgBody4G2("M0208","P005",1,"P00801","FUND");
	}else {  // 密码挂失
		updateHisBusType(conhisid_JJGS , '12');
		jsLog(logStrMsg("修改当前业务类型为：借记卡挂失","INFO"));
		//setTimeout("updateConHis('12')",1000); //修改后台次交易记录的业务类型
		
		getMsgBody4G2("M0206","P005",1,"P010","");
	}
}



/*******
 * 业务办理根据选择的业务判断跳转页面处理
 * */
function YWchoicePlay(){
	jsLog(logStrMsg("YWchoicePlay rememberBuss="+rememberBuss+"//rememberScanCard="+rememberScanCard,"BUTTON"));
	//判断是否选择了一级业务项  "开借记卡" "电子渠道" "投资理财" "借记卡挂失"
	if(BussChoicType == ""){
		Regagentmsg("",8899,"您还未选择业务项，请选择业务！");
	}else{
			if(BussChoicType == "KJJK"){
				conhisid_KJJK = returnConhisID();
			}else if(BussChoicType == "DZQD"){
				Ext.getCmp("flexoButton").setText("查询客户");
				conhisid_DZQD = returnConhisID();
			}else if(BussChoicType == "TZLC"){
				Ext.getCmp("flexoButton").setText("签约查询");
				conhisid_TZLC = returnConhisID();
			}else if(BussChoicType == "JJGS"){
				Ext.getCmp("flexoButton").setText("挂失查询");
				conhisid_JJGS = returnConhisID();
			}else if(BussChoicType == "FUND"){
				conhisid_FUND = returnConhisID();
			}
		//添加新的通话记录
		if(fristBusiness > 0){
			if(BussChoicType == "KJJK"){
				conhisid_KJJK = callInsertData(_callinno);
				setTimeout("takeSaveSomeFiles(" + conhisid_KJJK + ")", 4000);
				
			}else if(BussChoicType == "DZQD"){
				//conhisid_DZQD = callInsertData(_callinno);   //电子渠道 在后面分细的存储相应的业务
				//setTimeout("takeSaveSomeFiles(" + conhisid_DZQD + ")", 2000);
			}else if(BussChoicType == "TZLC"){
				conhisid_TZLC = callInsertData(_callinno);
			}else if(BussChoicType == "JJGS"){
				conhisid_JJGS = callInsertData(_callinno);
			}else if(BussChoicType == "FUND"){
				conhisid_FUND = callInsertData(_callinno);
			}
			//popupCustomerPageByCallin(_callinno,_eduDatasAll);   //测试数据 ‘来电’	
			
		}
		/*************后台修改交易的‘业务类型****************
		 * <<此函数应该放在最后的所有交易成功之后判断修改业务类型>>
		 **/
		//*******************判断选择的业务来进行js页面的索引跳转******************
		if(BussChoicType == "KJJK"){
			//Ext.getCmp("bjyh_zc").setTitle("北京银行京卡借记卡开卡章程");
			//Ext.getCmp("100401").setValue(OpenCardBus);
			synWithTerm(1,1);				 //跳转到开借记卡页面
			jsLog(logStrMsg("跳转到开借记卡页面  synWithTerm(1,1)","INFO"));
		}else if(BussChoicType == "DZQD" || BussChoicType == "TZLC"){
			Ext.getCmp("bjyh_zc").setTitle("北京银行电子银行个人客户服务协议");
			Ext.getCmp("100401").setValue(zongHeBus);
			hiddenLiCaiPage(1,1,22);  //测试直接先显示1-4页问卷问题
			if(rememberBuss == 0 && rememberScanCard == 0){   		//第一笔直接办理投资理财业务
				synWithTerm(2,1); 			//跳转到综合页面办理业务流程进行身份证扫描
				if(BussChoicType == "TZLC"){
					getMsgBody4G2("M0204","P004",1,"P005","");
					updateHisBusType(conhisid_TZLC , '11');
					jsLog(logStrMsg("修改当前业务类型为：投资理财","INFO"));
				}else{
					getMsgBody4G2("M0202","P004",1,"P005","");
				}
			}else if(rememberBuss == 0 && rememberScanCard == 1){
				synWithTerm(3,1); 			//跳转到综合页面办理业务流程进行身份证扫描
				if(BussChoicType == "TZLC"){
					getMsgBody4G2("M0204","P004",1,"P005","");
					updateHisBusType(conhisid_TZLC , '11');
					jsLog(logStrMsg("修改当前业务类型为：投资理财","INFO"));
				}else{
					getMsgBody4G2("M0202","P004",1,"P005","");
				}
			}else{
				confirmCusInfos();//跳转到度章程页面
				ReadZC(1);
			}
		}else if(BussChoicType == "FUND" || BussChoicType == "FUND_OR_LC"){
			//当前业务是基金签约。。。
			if(rememberBuss == 0 && rememberScanCard == 0){  //呼入电话 第一步基金业务
				getMsgBody4G2("M0208","P004",1,"P005","");   //告诉终端跳转到扫描身份证页面  
				//座席端页面不跳转， 打开FundBussinessFlow.exe（C#基金业务流程） 程序
				
				//不用打开基金页面的扫描证件
				//myocx.InvokeBusinessForm(8,"",101,"");    //打开扫描证件Form
				
				jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe] 101：打开扫描证件Form","INFO"));
			}else{
				myocx.InvokeBusinessForm(8,"",103,checkName);   //打开阅读章程 Form
				jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe] 103：章程画面","INFO"));
				getMsgBody4G2("M0208","P004",1,"P00801","FUND");  //发送消息告诉终端跳转到章程画面
			}
		//----------------- 还有一个密码挂失的页面待最后开发 ------------------
		}else{
			if(rememberBuss == 0 && rememberScanCard == 0){   		//第一笔直接办理借记卡挂失业务
				synWithTerm(2,1); 			//办理业务流程进行身份证扫描
				getMsgBody4G2("M0206","P004",1,"P005","");    // 提示Term放身份证
			}else if(rememberBuss == 0 && rememberScanCard == 1){
				synWithTerm(3,1); 			//办理业务流程进行身份证扫描
				getMsgBody4G2("M0206","P004",1,"P005","");    // 提示Term放身份证
			}else{
				confirmCusInfos();//跳转到度章程页面
				ReadZC(1);
			}
		}
	}
	
	
	var object = Ext.util.JSON.decode(userInfo);
	// 取得当前登录用户的相关信息，包括权限
	var user = object.user;
	var curUserInfo = new UserInfo(user);
	agentName = curUserInfo.username;
	jsLog(logStrMsg("Now Agent ID : "+agentName,"INFO"));
	
	
	
}



//--------------------------------------------------startmessage----------------------------------------------------
var count = 0;
function Regagentmsg(lObjectID, lItemID, strMessage) {
	// prn(lObjectID + "|" + lItemID + "|" + strMessage);
	if (strMessage.indexOf('enddeal') >= 0) {
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		//Ext.getCmp("tow_DZQD").setDisabled(false);
		synWithTerm(12, 0);
		var cardno = strMessage.split("|")[1];
		//Ext.getCmp('cus_cardnoend').setValue(cardno);
		setCardNumber(cardno);
		if(totalBussines == "one"){
			Ext.getCmp("101201").setDisabled(true); 	//灰掉 开卡成功页面的‘继续’按钮
			Ext.getCmp("101204").setDisabled(true);
		}else{
			//Ext.getCmp("ReadCard").setDisabled(true);
			//Ext.getCmp("EjectCard").setDisabled(true);
			//Ext.getCmp("goNext").setVisible(true); 8080
		}
		cardNumber = strMessage.split("|")[1];
		//updateDealStaId(conhisid_KJJK, '1001');
		//jsLog(logStrMsg("updateDealStaId("+conhisid_KJJK+",1001);","INFO"));
	}
	// 激活epp
	if (strMessage == 'activeEpp') {
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		setTimeout("sendactepp(" + lObjectID + "," + lItemID + ")", 500);
	}

	if (lItemID == 511606) {
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		//胡兆虎,HU ZHAOHU,男,中国,第二代居民身份证,19850122,有期限,430203198501224018,20070605,20170605,,111-12312323,国家机关、党群组织、企业、事业单位负责人,内蒙古自治区,赤峰市,巴林右旗,DSFDF11100胡杨杜0,gg十,本人,123122,T002201411131527,T002,_000aB,XXXXX,end
		//strMessage = 
		
		check_datafunc(strMessage);
		//--------如果固定电话每天去掉确认页面“-”符号---------
//		var ms=strMessage.split(',');
//		if(ms.length == 25){
//			var info=ms[11].split('-');
//			if(info[0]=="" || info[1]==""){
//				//Ext.getCmp("cus_callfm").setValue(" ");
//			}
//			check_datafunc(strMessage);
//		}else{
//			check_datafunc(strMessage);
//		}
		// check_datafuncTest(strMessage);//测试模式
	}
	if (strMessage == '3cards') {
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		//friendShipMsg("[警告]客户已开卡数量超3张限制！");
		
		myocx.InvokeBusinessForm(9,"",222,"[警告]客户已开卡数量超3张限制！");  //消息弹窗程序
	}

	// 提示消息444
	if (lItemID == 8899) {
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		//friendShipMsg(strMessage);
		if(BussChoicType != "KJJK"){
			myocx.InvokeBusinessForm(9,"",222,strMessage);  //消息弹窗程序
		}
		
		jsLog(logStrMsg("INFO:将要隐藏首页form","INFO"));
		if(globalcurpage == 0){  //证明在首页
			jsLog(logStrMsg("INFO:已经隐藏首页form","INFO"));
			//myocx.InvokeBusinessForm(1,"",3,"");
			jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[agentIndexPage.exe] 3：最小化","INFO"));
		}
	}
	// 提示消息444
	if (lItemID == 444) {
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		if (lObjectID == 1001) {
			jsLog(logStrMsg("SENDMESSAGE:lObjectID:1,lItemID:6,message:051109next","MESSAGE"));
			myocx.AgentSendMessage(1, 6, "051109next");// 同步客户端，6
		}
		if(strMessage.indexOf("超3张") >= 0){	
			outOfThreeCards(strMessage);
			//Ext.getCmp("tow_KJJK").setDisabled(true);
			
		}else if(strMessage.indexOf("[IC卡警告]") >= 0){
			jsLog(logStrMsg("INFO:(IC卡警告弹窗)","MESSAGE"));
			outOfThreeCards(strMessage);
			//Ext.getCmp("tow_KJJK").setDisabled(true);
		}else{
//			jsLog(logStrMsg("INFO:将要隐藏首页form","MESSAGE"));
//			if(globalcurpage == 0){  //证明在首页
//				jsLog(logStrMsg("INFO:已经隐藏首页form","MESSAGE"));
//				//myocx.InvokeBusinessForm(1,"",3,"");
//				jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[agentIndexPage.exe] 3：最小化","INFO"));
//			}else if(globalcurpage == 8){
//				jsLog(logStrMsg("INFO:可以隐藏查看扫描件Form页面","MESSAGE"));
//				//myocx.InvokeBusinessForm(4,"",3,"");
//				jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[CheckSignForm.exe] 3：最小化","INFO"));
//			}
//			if(BussChoicType == "FUND"){
//				//myocx.InvokeBusinessForm(8,"",986,"");
//				jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe] 986：隐藏","INFO"));
//			}
			//friendShipMsg(strMessage);
			if(BussChoicType != "KJJK"){
				myocx.InvokeBusinessForm(9,"",222,strMessage);  //消息弹窗程序
			}
			
			
		}
	}

	if (strMessage.indexOf('videoinitok') >= 0) {
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		if(strMessage.split("|").length > 2){
			setMyocxInfo(1,"version2");
			jsLog(logStrMsg("setmyocxinfo() --> setVersion = version2","INFO"));
			if(strMessage.split("|")[2] == "Version3"){
				setMyocxInfo(1,"version3");
				jsLog(logStrMsg("setmyocxinfo() --> setVersion = 网银盾版本","INFO"));
			}
			if(strMessage.split("|")[2] == "Version2.1"){
				setMyocxInfo(1,"version2.1");
				jsLog(logStrMsg("setmyocxinfo() --> setVersion = version2.1","INFO"));
			}
		}else{
			setMyocxInfo(1,"version1");
			jsLog(logStrMsg("setmyocxinfo() --> setVersion = version1","INFO"));
			//Ext.getCmp("tow_DZQD").setDisabled(true);
			//Ext.getCmp("tow_TZLC").setDisabled(true);
			//Ext.getCmp("tow_JJGS").setDisabled(true);
		}
		dealno = strMessage.split("|")[1];
		setMyocxInfo(0,dealno);    //把流水号放入曲晓控件里；
		jsLog(logStrMsg("setmyocxinfo() --> setDealNo = "+dealno,"TEXT"));
		jsLog(logStrMsg("INFO:(getMessage - videoinitok - > dealno="+dealno+")","MESSAGE"));
		jsLog(logStrMsg("INFO:(getMessage - videoinitok - > saveWavfail="+saveWavfail+")","MESSAGE"));
		if(saveWavfail == "true"){
			jsLog(logStrMsg("INFo:(保存录音文件方法)","MESSAGE"));
			saveWav(saveWavpath,new Date().format('yyyy-MM-dd hh:mm:ss'));
		}
		VideoSetDealno(dealno);
		// videostartvedio();
		// videostartvedio1();
		// 在两边initok后，坐席端先开启视屏，通知终端开启终端视频
		jsLog(logStrMsg("SENDMESSAGE:lObjectID:1,lItemID:9,message:videostart","MESSAGE"));
		myocx.AgentSendMessage(1, 9, "videostart");
		//videostartvedio();
		// 获取当前用户的photo，并告诉终端。

	}
	if (strMessage.indexOf('agentscanidcard') >= 0) {// 接受agentscanidcard|card_title
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		// prn('select card id:' + lItemID);
		// 保存申请卡的种类cus_applycardfm
		prn('lItemID:' + lItemID);
		// 坐席端依据cardid同步显示客户选择的卡

		// Ext.getCmp('cus_applycardfm').setValue(strMessage.split('|')[1]);//做映射
		Ext.getCmp('cus_applycardfm').setValue("京卡借记卡");// 做映射

		synWithTerm(1, 1);// 同步至等待客户放入身份证
		// printidcard();//需要坐席主动点击。
	}
	var ZCcount=0;
	/***********************<<接受章程>>***************************
	 * protocolchecked终端接受章程
	 * */
	if (strMessage.indexOf('protocolchecked') >= 0) {// 跳转到下一页：1004填单，同时引导终端到下一页。暂时不提供
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		if(totalBussines == "two"){
			ZCcount = 1;  //只要同意了章程就 +1;
			//synWithTerm(4, 0);
			//=========================>这里需要判断客户选择的业务是否包含‘综合业务’和‘开卡ti业务’以及‘挂失业务’<=========================
			var str="";
			var strSplit=strMessage.split('|')[9];
			if(strSplit.split(',')[1] == "KK"){
				jsLog(logStrMsg("CUSTOMER AGREE KK STATUS","INFO"));
			}else if(strSplit.split(',')[1] == "ZH"){
				jsLog(logStrMsg("CUSTOMER AGREE ZH STATUS","INFO"));
			}else if(strSplit.split(',')[1] == "GS"){
				jsLog(logStrMsg("CUSTOMER AGREE GS STATUS","INFO"));
			}else if(strSplit.split(',')[1] == "FUND"){
				jsLog(logStrMsg("CUSTOMER AGREE FUND STATUS","INFO"));
			}
			if(strSplit.split(',')[2] == "0"){
				ReadZCChoice();//读完章程就要跳转页签
			}
			// myocx.AgentSendMessage(1, 1005, "nextpage");
		}else{
			updateHisBusType(conhisid_KJJK , '0');   //修改业务类型为开卡业务 0
			synWithTerm(5,1); //跳转到开借记卡的资料信息录入页面
		}
		//friendShipMsg("客户已接受章程，请进行下一步操作！");
		return;
	}
	
/*****************************<<拒绝章程>>************************************
 * refusechecked终端拒绝章程
 * 收到的消息格式将为二期的格式定义：(999,999,"|||||||||refusechecked,KK,0")
 * */
	if(strMessage.indexOf('refusechecked') >= 0){
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		var str = "";
		var strSplit=strMessage.split('|')[9];   
		if(strSplit.split(',')[2] == "0" && ZCcount == 0){  //表示这是最后一个章程，后面没有章程可阅读，通知坐席返回首页结束流程
			jsLog(logStrMsg("Customer refuse All status","INFO"));
			str = "客户拒绝所有的章程，不能办理业务，让客户端返回首页！";
		}else{
			//--------更改流程定义之后，这种方式需要更改，待确认客户是否有<同意> <拒绝> 章程的操作按钮--------
			if(strSplit.split(',')[1] == "KK"){
				//将开卡的业务勾选去掉  暂时测试用这方法看是否行通；
				Ext.getCmp("tow_KJJK").el.dom.checked = false;  //变为未被选中 
				jsLog(logStrMsg("Customer refuse OpenCards status","INFO"));
				str = "《开卡章程》"; 
			}else if(strSplit.split(',')[1] == "ZH"){
				Ext.getCmp("tow_DZQD").el.dom.checked = false;  
				Ext.getCmp("tow_TZLC").el.dom.checked = false;  //变为未被选中
				jsLog(logStrMsg("Customer refuse ZongHe status","INFO"));
				str = "《综合章程》";
			}else if(strSplit.split(',')[1] == "GS"){
				Ext.getCmp("tow_JJGS").el.dom.checked = false;
				jsLog(logStrMsg("Customer refuse loss of status","INFO"));
				str = "《挂失章程》";
			}
			ReadZCChoice();//读完章程就要跳转页签
		}
		//friendShipMsg("客户拒绝了"+str);
		myocx.InvokeBusinessForm(9,"",222,"客户拒绝了"+str);  //消息弹窗程序
	}
	// if (strMessage == '051109info') {// 跳转到下一页：1004填单，同时引导终端到下一页。暂时不提供
	// // synWithTerm(3);
	// // myocx.AgentSendMessage(1, 1005, "nextpage");
	// alert("客户确认了信息，正在等待您的审核！");
	// return;
	// }
	if (strMessage == 'pError') {// 打印失败
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		// synWithTerm(3);
		// myocx.AgentSendMessage(1, 1005, "nextpage");
		// Ext.Msg.alert('<font style="color:#bf1919">友情提示：</font>','<font
		// style="font-size:28px;color:#bf1919"> 客户端打印失败，请点击[重新打印]！</font>');
		//friendShipMsg_1("客户端打印失败，请点击[重新打印]！");
		myocx.InvokeBusinessForm(9,"",222,"客户端打印失败，请点击[重新打印]！");  //消息弹窗程序
		return;
	}

	// 客户申请协助
	if (strMessage == 'applyhelp'){
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		Ext.MessageBox.confirm('客户消息', lItemID == 0 ? '客户请求协助！' : '客户请求停止协助！',
				go);
		// Ext.MessageBox.confirm('标题', '消息' , go);
		function go(btn) {
			if (btn == 'yes') {
				if (lItemID == 0) {// 请求协助
					// prn('客户申请协助！');
					//manage('100501', false);
					jsLog(logStrMsg("SENDMESSAGE:lObjectID:1,lItemID:1,message:applyhelp","MESSAGE"));
					myocx.AgentSendMessage(1, 1, "applyhelp");//TODO 
				} else {
					// prn('客户申请释放协助！');
					//manage('100501', true);
					jsLog(logStrMsg("SENDMESSAGE:lObjectID:1,lItemID:0,message:applyhelp","MESSAGE"));
					myocx.AgentSendMessage(1, 0, "applyhelp");//
				}
			} else {
				// manage('100501', true);
				// myocx.AgentSendMessage(1,0,"applyhelp");//
			}
		}

		// if(lItemID == 0){//请求协助
		// // prn('客户申请协助！');
		// manage('1004', false);
		// myocx.AgentSendMessage(1,1,"applyhelp");//
		// } else {
		// // prn('客户申请释放协助！');
		// manage('1004', true);
		// myocx.AgentSendMessage(1,0,"applyhelp");//
		// }
	}

	if (strMessage.indexOf('0511P') >= 0) {// makepdf ok：通知坐席，展示”审核通过“和”审核不通过“
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		jsLog(logStrMsg("收到0511P消息显示两个按钮","INFO"));
		//Ext.getCmp('100601').setVisible(true);
		//Ext.getCmp('100602').setVisible(true);
		try {
			//需要判断是一期的程序还是二期的程序
			//saveSomeFile(returnConhisID(), '13', '2', strMessage.split('|')[1],agentno, cusname, cerno);
			//saveSomeFile(conhisid_KJJK, '13', '2', strMessage.split('|')[1],agentno, cusname, cerno);
			//jsLog(logStrMsg("StrMessage[0511P] saveSomeFile Save:PDF path : " + strMessage.split('|')[1]+"///returnConhisID() value:"+returnConhisID() ,"MESSAGE"));
		} catch (e) {
			//jsLog(logStrMsg("StrMessage[0511P] try catch info : " + e,"ERROR"));
			//alert("文件检索-->保存capdf路径出错:" + e);
		}
	}
	if (strMessage.indexOf('511') < 0) {
		// prn("AgentMessage" + lObjectID + lItemID + strMessage);
	}
	if (strMessage.indexOf('DealFail') >= 0) {// makepdf
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		//if(getMyocxInfo(1) == "version2.1"){
		//	checkCBOD(1);
		//}
		// ok：通知坐席，展示”审核通过“和”审核不通过“
		if (lItemID == 1173 && lObjectID == 1) {
			//friendshipMsg("查询客户数据失败！"+ strMessage.split("|")[1]);  //弹窗提示
			myocx.InvokeBusinessForm(9,"",222,"查询客户数据失败！"+ strMessage.split("|")[1]);  //消息弹窗程序
		} else {
			var win = new Ext.Window({
				width : 500,
				title : '友情提示',
				height : 200,
				html : '<font style="font-size:28px;color:red"><br>&nbsp;&nbsp;&nbsp;&nbsp银行交易失败| ' + strMessage.split("|")[1] + '。请终止当前业务并让客户端返回首页！</font>',
				modal : true,
				buttonAlign : 'center',
				buttons : [{
					text : '<font style="font-size:16px;margin-top:0px">确定</font>',
					width : 60,
					height : 30,
					handler : function() {
						//myocx.AgentSendMessage(1, 1, "backToindex");//
						win.close();
					}
				}]
			});
			win.show();
		}
	}

	if (strMessage.indexOf('ulane') >= 0) {
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		var curpage = strMessage.substring(5, strMessage.length);
		synWithTerm(curpage, 0);
	}
	if (strMessage == 'cusprintinfo') {// 坐席等待客户审核信息。本页不跳转，显示出打印按钮
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		// Ext.getCmp('cusprintinfo').setVisible(true);
	}
	if (strMessage == 'cusscaninfo') {// 坐席等待客户审核信息。本页不跳转，显示出打印按钮
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		prn('cusscaninfo' + lItemID);// 9
		synWithTerm(lItemID, 0);
	}

	// if(lObjectID == 511){//接受终端发送的身份证扫描信息。
	// prn(strMessage);
	// Ext.getCmp('terminalHead').setValue('<img src="' + strMessage + '"
	// style="width:80px"/>');
	// }

	if (strMessage == '0511777') {// 接受终端发送的身份证扫描信息。
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		// prn(lObjectID + "|" + strMessage);
		synWithTerm(lObjectID, 0);
	}
	// if(strMessage == "已放身份证，实际上是坐席能看到刷了没有")
	// prn(strMessage);
	// 知道客户点击了某种卡，发起刷身份提示
	if (strMessage == "选择了这个卡！") {
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		myocx.AgentSendMessage(1, 2, "刷身份证！");
	};
	// 判断是否接受章程，下一步填单
	if (strMessage == "客户确定章程") {
		jsLog(logStrMsg("SENDMESSAGE:lObjectID:1,lItemID:2,message:请填写表单","MESSAGE"));
		myocx.AgentSendMessage(1, 2, "请填写表单");
	}
	
	//新客户关闭阻拦交易弹窗
	if (lItemID == "666666") {
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		//if(getMyocxInfo(1) == "version2.1"){
		//checkCBOD(1);
		//jsLog(logStrMsg("GETMESSAGE:(关闭座席端阻挡窗口)","MESSAGE"));
		//}
		if(strMessage == "NewCustomer" && BussChoicType == "KJJK"){
			//如果是新客户，需要弹窗提示先开卡；
			if(BussChoicType == "DZQD"){
				outOfThreeCards("该客户是新客户，需先办理开卡后才能办理电子渠道业务！");
			}else if(BussChoicType == "TZLC"){
				outOfThreeCards("该客户是新客户，需先办理开卡后才能办理理财签约业务！");
			}else if(BussChoicType == "FUND"){
				myocx.InvokeBusinessForm(8,"",998,"");   //关闭CBOD 弹窗
				jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe] 998：关闭弹窗","INFO"));
			}
		}
		customerInfo = "NewCustomer&" + checkName;
		jsLog(logStrMsg("GETMESSAGE:(关闭座席端阻挡窗口)","MESSAGE"));
	}
	
	if (lItemID == "777777") {// 只提供交易的数据对坐席的同步。
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		customerInfo = strMessage + "&" + checkName;
		//if(getMyocxInfo(1) == "version2.1"){
		if(BussChoicType == "FUND"){
			jsLog(logStrMsg("GETMESSAGE:(基金业务，关闭WinForm弹窗  .. 000)","MESSAGE"));
			//myocx.InvokeBusinessForm(8,"",998,"");   //	
			jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe] 998：关闭弹窗","INFO"));
		}else{
			//checkCBOD(1);	
		}
		
		
		//	jsLog(logStrMsg("GETMESSAGE:(终端版本是version2.1版本，关闭交易阻挡弹窗-成功)","MESSAGE"));
		//}
		var tmp = strMessage.split(",");
//		cus_sheng=getGPInfo(tmp[5]);
//		cus_sheng_key_ts = tmp[5];
//		if(tmp[5]=="A00000"){
//			cus_sheng_key = "1";
//		}else if(tmp[5]=="B00000"){
//			cus_sheng_key = "2";
//		}else if(tmp[5]=="C00000"){
//			cus_sheng_key = "3";
//		}else if(tmp[5]=="D00000"){
//			cus_sheng_key = "4";
//		}else if(tmp[5] == ""){
//			cus_sheng_key = 6;  //如果查询出来用户是新客户，没有地址信息就要给cus_sheng_key 随便赋值一个数据库里没有的parenid
//		}else{
//			cus_sheng_key = tmp[5];
//		}
//		cus_city = getGTInfo(tmp[6]);
//		if(tmp[6] == ""){
//			cus_city_key = 6;
//		}else{
//			cus_city_key = tmp[6];
//		}
//		cus_qu=getGCInfo(tmp[7]);
//		cus_addinfo=tmp[8];
//		Ext.getCmp("cus_pinyin").setValue(tmp[0]);
//		Ext.getCmp("cus_phone").setValue(tmp[1]);
//		Ext.getCmp("cus_callquhao").setValue(tmp[2]);
//		Ext.getCmp("cus_call").setValue(tmp[3]);
//		Ext.getCmp("cus_vocation").setValue(tmp[4]);
//		Ext.getCmp("ulEmployee.hujisheng_combo").setValue(getGPInfo(tmp[5])) ;
//		Ext.getCmp("ulEmployee.hujishi_combo").setValue(getGTInfo(tmp[6])) ;
//		Ext.getCmp("ulEmployee.hujiqu_combo").setValue(getGCInfo(tmp[7])) ;
//    	Ext.getCmp("cus_addInfo").setValue(tmp[8].replace(/(^\s*)|(\s*$)/g, ""));
//		Ext.getCmp("cus_com").setValue(tmp[9]);
//		Ext.getCmp("cus_postcode").setValue(tmp[10]);
//		Ext.getCmp("cus_email").setValue(tmp[11]);
//		//确认页面赋值
//		Ext.getCmp("cus_pinyinfm").setValue(tmp[0]);
//		Ext.getCmp("cus_phonefm").setValue(tmp[1]);
//		Ext.getCmp("cus_vocationfm").setValue(tmp[4]);
//	  	Ext.getCmp("cus_addrfm").setValue(getGPInfo(tmp[5])+getGTInfo(tmp[6])+getGCInfo(tmp[7])+tmp[8]);
//		Ext.getCmp("cus_comfm").setValue(tmp[9]);
//		Ext.getCmp("cus_postcodefm").setValue(tmp[10]);
//		Ext.getCmp("cus_emailfm").setValue(tmp[11]);
//		Ext.getCmp("cus_callfm").setValue(tmp[2] + "-" + tmp[3]);
		//给电子渠道 页面赋值  以及确认页面
		
		//---------------------------
		//记录日志
		jsLog(logStrMsg("that message type 777777 Info : cus_pinyin:"+tmp[0]+"","MESSAGE"));
		jsLog(logStrMsg("that message type 777777 Info : cus_phone:"+tmp[1]+"","MESSAGE"));
		jsLog(logStrMsg("that message type 777777 Info : cus_callquhao:"+tmp[2]+"","MESSAGE"));
		jsLog(logStrMsg("that message type 777777 Info : cus_call:"+tmp[3]+"","MESSAGE"));
		jsLog(logStrMsg("that message type 777777 Info : cus_vocation:"+tmp[4]+"","MESSAGE"));
		jsLog(logStrMsg("that message type 777777 Info : sheng:"+tmp[5]+"","MESSAGE"));
		jsLog(logStrMsg("that message type 777777 Info : shi:"+tmp[6]+"","MESSAGE")); //cus_city
		jsLog(logStrMsg("that message type 777777 Info : shi:info-->"+cus_city+"","MESSAGE"));
		jsLog(logStrMsg("that message type 777777 Info : qu:"+tmp[7]+"","MESSAGE"));
		jsLog(logStrMsg("that message type 777777 Info : cus_addInfo:"+tmp[8]+"","MESSAGE"));
		jsLog(logStrMsg("that message type 777777 Info : cus_com:"+tmp[9]+"","MESSAGE"));
		jsLog(logStrMsg("that message type 777777 Info : cus_postcode:"+tmp[10]+"","MESSAGE"));
		jsLog(logStrMsg("that message type 777777 Info : cus_email:"+tmp[11]+"","MESSAGE"));
		phone_fm = tmp[1];
		call_fm = tmp[2] + "-" + tmp[3];
		Ext.getCmp("zonghe_callPhone").setValue(phone_fm);  //手机号
		Ext.getCmp("zonghe_callPhone_ck").setValue(phone_fm);  //手机号
		Ext.getCmp("zonghe_callguhua").setValue(call_fm);  //固话号
		Ext.getCmp("zonghe_callguhua_ck").setValue(call_fm);  //固话号
		
	}
	// 两边填表数据同步code:309   lObjectID, lItemID,
	if (strMessage.indexOf('0511309') >= 0) {
        
	}
	
	if (strMessage == 'eppstsError') {// epp status error
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		// prn("next:" + lItemID);
		if (lItemID == 4) {
			var win = new Ext.Window({
				width : 500,
				title : '友情提示',
				height : 200,
				html : '<font style="font-size:28px;color:red"><br>&nbsp;&nbsp;&nbsp;&nbsp密码键盘出错[4]，是否尝试重启密码键盘！</font>',
				modal : true,
				buttonAlign : 'center',
				buttons : [{
					text : '<font style="font-size:16px;margin-top:0px">确定</font>',
					width : 60,
					height : 30,
					handler : function() {
						jsLog(logStrMsg("SENDMESSAGE:lObjectID:1,lItemID:1,message:eppRestart","MESSAGE"));
						myocx.AgentSendMessage(1, 1, "eppRestart");//
						win.close();
					}
				}, {
					text : '<font style="font-size:16px;margin-top:0px">放弃</font>',
					width : 60,
					height : 30,
					handler : function() {
						jsLog(logStrMsg("SENDMESSAGE:lObjectID:1,lItemID:1,message:backToindex","MESSAGE"));
						myocx.AgentSendMessage(1, 1, "backToindex");//
						win.close();
					}
				}]
			});
			win.show();
		} else {
			var win = new Ext.Window({
				width : 500,
				title : '友情提示',
				height : 200,
				html : '<font style="font-size:28px;color:red"><br>&nbsp;&nbsp;&nbsp;&nbsp密码键盘出错，无法继续进行，将返回首页！'
						+ lItemID + '</font>',
				modal : true,
				buttonAlign : 'center',
				buttons : [{
					text : '<font style="font-size:16px;margin-top:0px">确定</font>',
					width : 60,
					height : 30,
					handler : function() {
						jsLog(logStrMsg("SENDMESSAGE:lObjectID:1,lItemID:1,message:backToindex","MESSAGE"));
						myocx.AgentSendMessage(1, 1, "backToindex");		
						
						win.close();
					}
				}]
			});
			win.show();
		}
	}
	if (strMessage == '051109next') {
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		// prn("next:" + lItemID);
		synWithTerm(lItemID, 0);
	}

	if (lItemID == 8991) {
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		
	}
	if (strMessage == "pwdsynlen") {// index,curepplen,"pwdsynlen" ---->
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		// lObjectID, lItemID, strMessage
		// 此逻辑可以优化。直接传送密码串pwdpwd，然后这里只判断index，然后赋值，避免运算pwdpwd。
		var pwdpwd = '', pwdindex = lObjectID;
		curepplen = lItemID;
		prn("len" + curepplen);
		for (var a = 0; a < curepplen && a < 6; a++) {
			pwdpwd += "*";
		}
		
		if (pwdindex == 1) {
			
		} else if (pwdindex == 2) {
			
		} else if (pwdindex == 3) {
			
		} else if (pwdindex == 4) {
			
		} else {
			
		}
	}
	//-----------------------------------------------
	if(strMessage == "您输入的密码不足6位！"){
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		var pwdindex = lObjectID;
		if(pwdindex == 1){
			///Ext.getCmp("cus_pwd").setValue('');
		}else if(pwdindex == 2){
			//Ext.getCmp("cus_pwdck").setValue('');
		}else if(pwdindex == 3){
			//Ext.getCmp("cus_pwd2").setValue('');
		}else if(pwdindex == 4){
			//Ext.getCmp("cus_pwd2ck").setValue('');
		}
	}
	//-----------------------------------------------
	if (strMessage == "pwdnotmatch") {// index,curepplen,"pwdsynlen" ---->
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		// lObjectID, lItemID, strMessage
		;
		var pwdindex = lObjectID;
		if (pwdindex == 1) {
			
		} else if (pwdindex == 3) {
			
		} else {
			
		}
	}
	//密码过于简单问题
	if(strMessage == "pwdSoEasy"){
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		// lObjectID, lItemID, strMessage
		
		var pwdindex = lObjectID;
		if (pwdindex == 1) {
			
		} else if(pwdindex == 3) {
			
		}
	}
	if (strMessage == "pwdtmatch") {// index,curepplen,"pwdsynlen" ---->
		jsLog(logStrMsg("GETMESSAGE" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		// lObjectID, lItemID, strMessage
		
	}
	if (strMessage.indexOf('0511409') >= 0) {// 0511409
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		// lItemID，已输入密码长度
		prn(lItemID);// 同步
		// Ext.getCmp("cus_vocation")
		//var stringArray = strMessage.split("|");
		// sysVoc(stringArray[1], stringArray[2]);//同步下拉框
		//Ext.getCmp("cus_vocation").setValue(stringArray[2]);
		//Ext.getCmp("cus_vocationfm").setValue(stringArray[2]);
	}
	if (strMessage.indexOf('0511509') >= 0) {// cus_addr
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		// lItemID，已输入密码长度
		prn(lItemID);// 同步
		// Ext.getCmp("cus_vocation")
		var stringArray = strMessage.split("|");
		prn(strMessage + "|" + stringArray[1]);
		sysVoc(stringArray[1], lItemID);// 同步下拉框
		saveaddrcm();// 同步确认页地址。
	}

	if (lItemID == 9999) {// 开卡同步
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		// alert(strMessage);cus_cardnoend
		//Ext.getCmp('cus_nameend').setValue(cusName_1);
		var cardno = strMessage.split("|");
		//Ext.getCmp('cus_cardnoend').setValue(cardno[1]);
		if (cardno.length != 2) {
			jsLog(logStrMsg("SENDMESSAGE:lObjectID:1,lItemID:1,message:errortip","MESSAGE"));
			myocx.AgentSendMessage(1, 1, "errortip");
		}

		// synWithTerm(12, 0);//跳转开卡页12--10
		// card.getLayout().setActiveItem(10);
		//Ext.getCmp('cus_cardnoend').setValue(cardno[1]);
	}

	// 同步提示坐席客户的发卡进度
	if (strMessage.indexOf("FKJstatus") >= 0) {
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		var cardmsg = strMessage.split("|");
		// Ext.Msg.alert('<font style="color:#bf1919">友情提示：</font>','<font
		// style="color:#bf1919"> 提示坐席：' + cardmsg[1] + '</font>');//10月12号
//		var cur_msg = Ext.getCmp('cus_FKJstatus').getValue();
//		Ext.getCmp('cus_FKJstatus').setValue('<font style="font-size:14px">'
//				+ cur_msg + cardmsg[1] + "</font>");
		jsLog(logStrMsg("cardmsg[1] = "+cardmsg[1],"INFO"));
		/**只要开卡交易成功就存储后台开卡1001成功记录*/
		if(cardmsg[1].indexOf('开卡交易成功') >= 0){
			jsLog(logStrMsg("准备存储后台为成功数据1001","INFO"));
			updateDealStaId(conhisid_KJJK, '1001');
			jsLog(logStrMsg("存储后台成功状态Success("+conhisid_KJJK+",1001);","INFO"));
		}
		/** 不知道为什么有cardno的日志，但是没进入逻辑判断，这里换种方式。 */
		// Ext.getCmp('cus_cardnoend').setValue(cardmsg[2]);
		// alert("FKJstatus cardno:" + cardmsg[2]);
	}
	
	/**********************	OMG|SeaBreeze  二期坐席端接收消息的判断**********************
	 * annotation  
	 * 二期坐席端接收消息的判断
	 */
	//整个消息是电子渠道业务
	//if(strMessage.split("|")[5] == "M0202"){
		//此消息是VTM发送的消息是否是跳转的 1 or 0 
		if(strMessage.split("|")[7] == "1"){   			//跳转的消息
				jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
				myocx.InvokeBusinessForm(10,"",104,strMessage.split("|")[6]);
				// 综合页面选择子业务
				if(strMessage.split("|")[8] == "P01201"){
					Ext.getCmp("DTMM_ZIYW").setValue("01");			//下拉框赋值  申请
					makeBusiness(0,"DTMM",0);
				}else if(strMessage.split("|")[8] == "P01202"){
					Ext.getCmp("DTMM_ZIYW").setValue("02");			//下拉框赋值  修改
					makeBusiness(1,"DTMM",0);
				}else if(strMessage.split("|")[8] == "P01203"){
					Ext.getCmp("DTMM_ZIYW").setValue("03");			//下拉框赋值  解锁
					makeBusiness(2,"DTMM",0);
				}else if(strMessage.split("|")[8] == "P01204"){
					Ext.getCmp("SJYH_ZIYW").setValue("01");			//下拉框赋值  （手机银行）申请
					makeBusiness(0,"SJYH",0);
				}else if(strMessage.split("|")[8] == "P01205"){
					Ext.getCmp("SJYH_ZIYW").setValue("02");			//下拉框赋值  （手机银行）添加下挂
					makeBusiness(1,"SJYH",0);
				}else if(strMessage.split("|")[8] == "P01206"){
					Ext.getCmp("SJYH_ZIYW").setValue("03");			//下拉框赋值  （手机银行）重置
					makeBusiness(2,"SJYH",0);
				}else if(strMessage.split("|")[8] == "P01207"){
					Ext.getCmp("SJYH_ZIYW").setValue("04");			//下拉框赋值  （手机银行）设置‘转/支’
					makeBusiness(3,"SJYH",0);
				}else if(strMessage.split("|")[8] == "P01208"){
					Ext.getCmp("SJYH_ZIYW").setValue("05");			//下拉框赋值  （手机银行）注册
					makeBusiness(4,"SJYH",0);
				}else if(strMessage.split("|")[8] == "P01209"){
					Ext.getCmp("dzyh_shenqing").setValue(true);		//单选框  申请 （电子银行）
				}else if(strMessage.split("|")[8] == "P01210"){
					Ext.getCmp("dzyh_chongzhi").setValue(true);		//单选框  修改
				}else if(strMessage.split("|")[8] == "P01211"){
					Ext.getCmp("dzyh_xiugai").setValue(true);		//单选框  重置
				}else if(strMessage.split("|")[8] == "P01212"){
					Ext.getCmp("dhyh_shenqings").setValue(true);		//单选框  申请 （电话银行）
				}else if(strMessage.split("|")[8] == "P01213"){
					Ext.getCmp("dhyh_chongzhi").setValue(true);		//单选框  修改
				}else if(strMessage.split("|")[8] == "P01214"){
					Ext.getCmp("dhyh_xiugai").setValue(true);		//单选框  重置
				
				//2014/7/8 WYZS_code
				}else if(strMessage.split("|")[8] == "P01215"){    //===========>收消息，同步选择框!  网银证书版
					Ext.getCmp("WYZS_ZIYW").setValue("01");			
					makeBusiness(0,"WYZS",0);
				}else if(strMessage.split("|")[8] == "P01216"){    //===========>收消息，同步选择框!  网银证书版
					Ext.getCmp("WYZS_ZIYW").setValue("02");			
					makeBusiness(1,"WYZS",0);
				}else if(strMessage.split("|")[8] == "P01217"){    //===========>收消息，同步选择框!  网银证书版
					Ext.getCmp("WYZS_ZIYW").setValue("03");			
					makeBusiness(2,"WYZS",0);
				}else if(strMessage.split("|")[8] == "P01218"){    //===========>收消息，同步选择框!  网银证书版
					Ext.getCmp("WYZS_ZIYW").setValue("04");			
					makeBusiness(3,"WYZS",0);
				}else if(strMessage.split("|")[8] == "P01219"){    //===========>收消息，同步选择框!  网银证书版
					Ext.getCmp("WYZS_ZIYW").setValue("05");			
					makeBusiness(4,"WYZS",0);
				}else if(strMessage.split("|")[8] == "P01220"){    //===========>收消息，同步选择框!  网银证书版
					Ext.getCmp("WYZS_ZIYW").setValue("06");			
					makeBusiness(5,"WYZS",0);
				}
				/*
				 * 客户到综合确认页面中 点击‘确定’和‘返回’两个按钮的消息操作
				 **/
				if(strMessage.split("|")[8] == "P016"){   //客户确认资料之后  VTM跳转到 正在审核页面
					//根据2013/10/24上午孙总提出,将业务资料里面的业务类型分成明细的具体业务,一个明确的子业务为一个请求，一条记录,同一个流水号
					//--------------------------------------------------------------------------------------------------------
					//friendShipMsg("客户已确认信息，正在等待您处理相应的业务信息！");  //提示坐席客户确认了信息
					myocx.InvokeBusinessForm(9,"",222,"客户已确认信息，正在等待您处理相应的业务信息！");  //消息弹窗程序
					//显示101502 、 101503 审核通过 按钮
					Ext.getCmp("101502").setVisible(true);
					Ext.getCmp("101503").setVisible(true);
	
				}else if(strMessage.split("|")[8] == "P012" && strMessage.split("|")[6] == "P013"){//客户返回之后  跳转到 
					visibledSomePage(1);
					//返回到综合页面填写；
					synWithTerm(12,1);
				}
				if(strMessage.split("|")[8] == "P012" && strMessage.split("|")[6] == "P011"){ //交易查询成功之后跳转到资料填写页面
					//Ext.getCmp("goNext").setDisabled(false); //将下一步制亮  8080
					//jsLog(logStrMsg("INFOMESSAGE:(将goNext下一步按钮致亮)","MESSAGE"));
					myocx.InvokeBusinessForm(7,"",4,"");
					jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[ReadCardNumPage.exe] 4：隐藏","INFO"));
					synWithTerm(12,1);
					jsLog(logStrMsg("跳转到电子渠道综合业务选择画面 -> ZYW_DTWY_OK="+ZYW_DTWY_OK+"/ZYW_SJYH_OK="+ZYW_SJYH_OK+"/ZYW_DZMM_OK="+ZYW_DZMM_OK+"/ZYW_DHMM_OK="+ZYW_DHMM_OK+"/ZYW_WYZS_OK="+ZYW_WYZS_OK,"INFO"));	
					
				}
				//电子银行密码输错3次时返回 P012页面
				if(strMessage.split("|")[8] == "P012" && strMessage.split("|")[6] == "P018"){//客户返回之后  跳转到 
					visibledSomePage(1);
					//返回到综合页面填写；
					synWithTerm(12,1);
				}
				//电子银行密码输错3次时返回 P012页面
				if(strMessage.split("|")[8] == "P012" && strMessage.split("|")[6] == "P028"){//客户返回之后  跳转到 
					visibledSomePage(1);
					//返回到综合页面填写；
					synWithTerm(12,1);
				}
				//输错3次支付密码返回首页
				if(strMessage.split("|")[6] == "P004" && strMessage.split("|")[8] == "P004"){
					fristBusiness ++;
					synWithTerm(0,1);
					//Ext.getCmp("101902").setValue("已有客户卡号，等待客户确认卡号并进行下一步");
//					Ext.getCmp("tow_TZLC").setValue(false);	Ext.getCmp("tow_JJGS").setValue(false);Ext.getCmp("tow_KJJK").setValue(false);	Ext.getCmp("tow_DZQD").setValue(false);
					BussChoicType == "";
					visibledSomePage(1);
					//唤起C#程序 Agentmodule 业务选择
					if(BussChoicType != "KJJK"){
						//myocx.InvokeBusinessForm(1,"",0,YesOrNo_FUND);
						//jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[agentIndexPage.exe] 0：弹出","INFO"));
					}
					
				}
				/*t
				 * 接收消息 跳转验证密码页面  (在需要验证两个密码的情况下)
				 * getMsgBody4G2("M0202","P017",1,"P018","P017,P018");  //发送  VTM跳转到填写页面   模拟发送两个密码验证页面
				 **/
				if(strMessage.split("|")[8] == "P018"){   //该验证电子银行密码  
					Ext.getCmp("101600").setValue("验证电子银行密码");
					Ext.getCmp("cus_checkpwdinfo").setValue(" ");
					Ext.getCmp("cus_dzyhpwd").setValue(" ");
				}
				if(strMessage.split("|")[8] == "P028"){
					Ext.getCmp("101600").setValue("验证电话银行密码");
					Ext.getCmp("cus_checkpwdinfo").setValue(" ");
					Ext.getCmp("cus_dzyhpwd").setValue(" ");
				}
				if(strMessage.split("|")[8] == "P019"){   //跳转到打印表单的页面
					synWithTerm(7,1);  //测试==> 跳转打印表单页面
					//videostartvedio1();  //调用第二个视频
					//发送C#消息形式，告诉WinForm程序来调打开第二个视频
					myocx.InvokeBusinessForm(10,"",103,"");
					jsLog(logStrMsg("INFO:(发送C#消息形式，告诉WinForm程序来调打开第二个视频...)","MESSAGE"));
					jsLog(logStrMsg("INFO:(此业务电子渠道///agentprints="+agentprints+")","MESSAGE"));
					if(BussChoicType == "DZQD" && agentprints == ""){
						saveBusTypeConHis();
						setTimeout("updateHis()", 2000);//修改相应的业务类型;
						jsLog(logStrMsg("INFOMESSAGE:(updateHis-->OK)","INFO"));
						setTimeout("takeSomeFiles()", 4000);//存储相应的somefile文件;
						jsLog(logStrMsg("INFOMESSAGE:(takeSomeFiles-->OK)","INFO"));
						agentprints = "over";
					}
					
					//显示C#窗口
					if(BussChoicType != "KJJK"){
						myocx.InvokeBusinessForm(2,"",0,"");
						myocx.InvokeBusinessForm(2,"",222,"NotPaper:"+NotPaper);
						jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[SignPageForm.exe] 0：弹出","INFO"));
					}
					
					
//					//测试暂时放在此处
//					popupCustomerPageByCallin(_callinno,_eduDatasAll); //存储后台明细
//					setTimeout("updateConHis('4')",5000);
//					setTimeout("takeSomeFile()",10000);
				}
				
				if(strMessage.split("|")[8] == "P023"){
					Ext.getCmp("101601").setValue("设置新的电子银行密码");
					Ext.getCmp("cus_newdzyhpwd").setValue(" ");
					Ext.getCmp("cus_newdzyhpwd2").setValue(" ");
					Ext.getCmp("cus_pwdNewInfo").setValue(" ");
				}
				//接收消息 跳转到设置新的电话银行密码
				if(strMessage.split("|")[8] == "P024"){
					Ext.getCmp("101601").setValue("设置新的电话银行密码");
					Ext.getCmp("cus_newdzyhpwd").setValue(" ");
					Ext.getCmp("cus_newdzyhpwd2").setValue(" ");
					Ext.getCmp("cus_pwdNewInfo").setValue(" ");
				}
				//接收消息 跳转到设置新的手机银行密码
				if(strMessage.split("|")[8] == "P025"){
					Ext.getCmp("101601").setValue("设置新的手机银行登录密码");
					Ext.getCmp("cus_newdzyhpwd").setValue(" ");
					Ext.getCmp("cus_newdzyhpwd2").setValue(" ");
					Ext.getCmp("cus_pwdNewInfo").setValue(" ");
				}
				//设置新的支付密码 --> 业务是：借记卡挂失
				//接收消息 跳转到设置新的手机银行密码
				//---------------------------------
				//所有电子渠道的业务办理完成！！
				if(strMessage.split("|")[8] == "P026"){
					if(BussChoicType != "KJJK"){
						myocx.InvokeBusinessForm(4,"",4,"");
						jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[CheckSignForm.exe] 4：隐藏","INFO"));
					}
					
					insertLog();		//记日志
					// P025|1|P026|P01201:1,P01204:0
					if(strMessage.split("|")[9].indexOf("P01201:1") >= 0){
						Ext.getCmp("over_WY_SQ_result").setValue("成功");
						updateDealStaId(conhisid_DTMM_SQ, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01202:1") >= 0){
						Ext.getCmp("over_WY_XG_result").setValue("成功");
						updateDealStaId(conhisid_DTMM_XG, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01203:1") >= 0){
						Ext.getCmp("over_WY_JS_result").setValue("成功");
						updateDealStaId(conhisid_DTMM_JS, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01204:1") >= 0){
						Ext.getCmp("over_SJ_SQ_result").setValue("交易成功");
						updateDealStaId(conhisid_SJYH_SQ, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01205:1") >= 0){
						Ext.getCmp("over_SJ_TJ_result").setValue("成功");
						updateDealStaId(conhisid_SJYH_TJ, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01206:1") >= 0){
						Ext.getCmp("over_SJ_CZ_result").setValue("成功");
						updateDealStaId(conhisid_SJYH_CZ, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01207:1") >= 0){
						Ext.getCmp("over_SJ_ZZ_result").setValue("成功");
						updateDealStaId(conhisid_SJYH_ZZ, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01208:1") >= 0){
						Ext.getCmp("over_SJ_ZX_result").setValue("成功");
						updateDealStaId(conhisid_SJYH_ZX, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01209:1") >= 0){
						Ext.getCmp("over_result_dzmmgl").setValue("成功");
						updateDealStaId(conhisid_DZYH_SQ, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01210:1") >= 0){
						Ext.getCmp("over_result_dzmmgl").setValue("成功");
						updateDealStaId(conhisid_DZYH_CZ, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01211:1") >= 0){
						Ext.getCmp("over_result_dzmmgl").setValue("成功");
						updateDealStaId(conhisid_DZYH_XG, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01212:1") >= 0){
						Ext.getCmp("over_result_dhmmgl").setValue("成功");
						updateDealStaId(conhisid_DHYH_SQ, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01213:1") >= 0){
						Ext.getCmp("over_result_dhmmgl").setValue("成功");
						updateDealStaId(conhisid_DHYH_CZ, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01214:1") >= 0){
						Ext.getCmp("over_result_dhmmgl").setValue("成功");
						updateDealStaId(conhisid_DHYH_XG, '1001');
					}
					//--------------2014/7/11 WYZS_code_over -------------
					if(strMessage.split("|")[9].indexOf("P01215:1") >= 0){
						Ext.getCmp("over_WYZS_SQ_result").setValue("交易成功");
						updateDealStaId(conhisid_WYZS_SQ, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01215:0") >= 0){
						Ext.getCmp("over_WYZS_SQ_result").setValue("交易失败");
					}
					if(strMessage.split("|")[9].indexOf("P01216:1") >= 0){
						Ext.getCmp("over_WYZS_XG_result").setValue("成功");
						updateDealStaId(conhisid_WYZS_TJ, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01217:1") >= 0){
						Ext.getCmp("over_WYZS_GS_result").setValue("成功");
						updateDealStaId(conhisid_WYZS_GS, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01218:1") >= 0){
						Ext.getCmp("over_WYZS_XE_result").setValue("成功");
						updateDealStaId(conhisid_WYZS_XE, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01219:1") >= 0){
						Ext.getCmp("over_WYZS_HFQY_result").setValue("成功");
						updateDealStaId(conhisid_WYZS_HFQY, '1001');
					}
					if(strMessage.split("|")[9].indexOf("P01220:1") >= 0){
						Ext.getCmp("over_WYZS_HFYZ_result").setValue("成功");
						updateDealStaId(conhisid_WYZS_HFYZ, '1001');
					}
					//----------------------------------------
					
					synWithTerm(17,1);
					//----------------暂时这样区别相应的业务结果 成功 或者 失败---------------------
					/**
					 * 修改当前业务办理的状态 为成功 如果办理两个业务(网银/手银) 我首先是将第一个数据改为网银(申请)所以如果两个都成功；
					 * 		网银的id = conhisid - 1
					 * 		手银的id = conhisid;(当前的最新id即可)
					 *       S|S|S|S|S|S|P025|1|P026|P01201:1,P01204:1
					 */
//					if(strMessage.split("|")[9].split(":").length > 2){
//						if(strMessage.split("|")[9].indexOf("P01201:1") >= 0 && strMessage.split("|")[9].indexOf("P01204:1") >= 0){
//							updateDealStaId(returnConhisID(), '1001');
//							jsLog(logStrMsg("updateDealStaId("+returnConhisID()+", 1001);","INFO"));               //日志
//							updateDealStaId(conhisid_bus, '1001');
//							jsLog(logStrMsg("updateDealStaId("+conhisid_bus+", 1001);","INFO"));   //日志
//						}else if(strMessage.split("|")[9].indexOf("P01201:0") >= 0 && strMessage.split("|")[9].indexOf("P01204:1") >= 0){
//							updateDealStaId(returnConhisID(), '1001');
//							jsLog(logStrMsg("updateDealStaId("+returnConhisID()+", 1001);","INFO")); 
//						}else if(strMessage.split("|")[9].indexOf("P01201:1") >= 0 && strMessage.split("|")[9].indexOf("P01204:0") >= 0){
//							updateDealStaId(conhisid_bus, '1001');
//							jsLog(logStrMsg("updateDealStaId("+parseInt(returnConhisID())-1+", 1001);","INFO"));   //日志
//						}
//					}else{
//						if(strMessage.split("|")[9].indexOf("P01201:1") >= 0){  		//只办理了网银申请 并成功
//							updateDealStaId(returnConhisID(), '1001');
//							jsLog(logStrMsg("updateDealStaId("+returnConhisID()+", 1001);","INFO"));
//						}if(strMessage.split("|")[9].indexOf("P01204:1") >= 0){  		//只办理了手机银行申请 并成功
//							updateDealStaId(returnConhisID(), '1001');
//							jsLog(logStrMsg("updateDealStaId("+returnConhisID()+", 1001);","INFO"));
//						}
//					}
				}
				//收到Button_OK消息之后锁定 对应的文本框，使坐席不能输入   
				if(strMessage.split("|")[9] == "Button_OK"){
					if(strMessage.split("|")[8] == "P012"){  //客户确认子业务填写信息
						ZYW_DZMM_OK = 0; ZYW_DHMM_OK = 0; 
						ZYW_WYZS_OK = 0;  //2014/7/10 WYZS_code
						//friendShipMsg("客户已确认填写内容!");
						myocx.InvokeBusinessForm(9,"",222,"客户已确认填写内容!");  //消息弹窗程序
						jsLog(logStrMsg("MESSAGE:(alert:客户已确认填写内容)","INFO"));
					}
					if(strMessage.split("|")[6] == "P01201"){   //如果是网银(申请业务) disabled掉文本框
						dtmm_sq = Ext.getCmp("DTMM_phoneNum").getValue();
						makeBusiness(0,"DTMM",0);
						Ext.getCmp("DTMM_phoneNum").setDisabled(true);
						Ext.getCmp("check_ZH_info").setValue("");  //校验显示错误文字区域清空
						dtmm_xg = ""; dtmm_js = ""; ZYW_DTWY_OK = 0;
					}else if(strMessage.split("|")[6] == "P01202"){
						dtmm_xg = Ext.getCmp("DTMM_oldPhone").getValue()+"|"+ Ext.getCmp("DTMM_newPhone").getValue();
						makeBusiness(1,"DTMM",0);
						Ext.getCmp("DTMM_oldPhone").setDisabled(true);
						Ext.getCmp("DTMM_newPhone").setDisabled(true);
						Ext.getCmp("check_ZH_info").setValue("");
						dtmm_sq = ""; dtmm_js = ""; ZYW_DTWY_OK = 0;
					}else if(strMessage.split("|")[6] == "P01203"){
						dtmm_js = Ext.getCmp("DTMM_phoneNum").getValue(); 
						makeBusiness(2,"DTMM",0);
						dtmm_xg = ""; dtmm_sq = ""; ZYW_DTWY_OK = 0;
						Ext.getCmp("DTMM_phoneNum").setDisabled(true);
						Ext.getCmp("check_ZH_info").setValue("");
					}
					if(strMessage.split("|")[6] == "P01204"){  //如果是手机银行(申请业务)
						sjyh_sq = Ext.getCmp("SJ_phoneNum").getValue()+"|"+Ext.getCmp("SJ_loginID").getValue()+"|"+Ext.getCmp("SJ_zhuanzhang").getValue()+"|"+Ext.getCmp("SJ_zhifu").getValue();
						makeBusiness(0,"SJYH",0);
						sjyh_tj = ""; sjyh_zz = ""; sjyh_zx = ""; ZYW_SJYH_OK = 0; sjyh_cz = "";
						Ext.getCmp("check_ZH_info").setValue("");  //校验显示错误文字区域清空
						Ext.getCmp("SJ_phoneNum").setDisabled(true);
						Ext.getCmp("SJ_loginID").setDisabled(true);
						Ext.getCmp("SJ_zhuanzhang").setDisabled(true);
						Ext.getCmp("SJ_zhifu").setDisabled(true);
						Ext.getCmp("SJ_CheckCode").setDisabled(true);
					}else if(strMessage.split("|")[6] == "P01205" || strMessage.split("|")[6] == "P01207"){
						if(strMessage.split("|")[6] == "P01205"){
							sjyh_tj = Ext.getCmp("SJ_zhuanzhang").getValue()+"|"+Ext.getCmp("SJ_zhifu").getValue();
							sjyh_sq = ""; sjyh_zz = ""; sjyh_zx = "";  ZYW_SJYH_OK = 0; sjyh_cz = "";
							makeBusiness(1,"SJYH",0);
						}else {
							sjyh_zz = Ext.getCmp("SJ_zhuanzhang").getValue()+"|"+Ext.getCmp("SJ_zhifu").getValue();
							sjyh_tj = ""; sjyh_sq = ""; sjyh_zx = "";  ZYW_SJYH_OK = 0; sjyh_cz = "";
							makeBusiness(3,"SJYH",0);
						}
						Ext.getCmp("SJ_zhuanzhang").setDisabled(true);
						Ext.getCmp("SJ_zhifu").setDisabled(true);
					}else if(strMessage.split("|")[6] == "P01206"){
						sjyh_cz = "OK";
						sjyh_sq = ""; sjyh_zz = ""; sjyh_zx = ""; sjyh_tj = "";  ZYW_SJYH_OK = 0;
						makeBusiness(2,"SJYH",0);
					}else if(strMessage.split("|")[6] == "P01208"){
						//makeBusiness(4,"SJYH",0);
						sjyh_zx = Ext.getCmp("SJ_phoneNum").getValue()+"|"+Ext.getCmp("SJ_loginID").getValue();
						makeBusiness(4,"SJYH",0);
						sjyh_tj = ""; sjyh_zz = "";	 sjyh_sq = "";  sjyh_cz = ""; ZYW_SJYH_OK = 0;
						Ext.getCmp("check_ZH_info").setValue("");
						Ext.getCmp("SJ_phoneNum").setDisabled(true);
						Ext.getCmp("SJ_loginID").setDisabled(true);
					}
					if(strMessage.split("|")[6] == "P01209"){
						dzyh_sq = true; dzyh_cz = false; dzyh_xg = false;
					}else if(strMessage.split("|")[6] == "P01210"){
						dzyh_cz = true; dzyh_sq = false; dzyh_xg = false;
					}else if(strMessage.split("|")[6] == "P01211"){
						dzyh_xg = true; dzyh_sq = false;  dzyh_cz = false;
					}
					if(strMessage.split("|")[6] == "P01212"){
						dhyh_sq = true; dhyh_cz = false; dhyh_xg = false;
					}else if(strMessage.split("|")[6] == "P01213"){
						dhyh_cz = true; dhyh_sq = false; dhyh_xg = false;
					}else if(strMessage.split("|")[6] == "P01214"){
						dhyh_xg = true; dhyh_cz = false; dhyh_sq = false;
					}
					//网银证书 点击提交后 进入该方法   2014/7/8 WYZS_code
					if(strMessage.split("|")[6] == "P01215"){
						var wyzs_sq_money = "";
						if(Ext.getCmp("WYZS_1").getValue()){wyzs_sq_money = "100万";}
						else if(Ext.getCmp("WYZS_2").getValue()){wyzs_sq_money = "500万";}
						else if(Ext.getCmp("WYZS_3").getValue()){wyzs_sq_money = "5000万";}
						else {wyzs_sq_money = "无限额";}
						wyzs_sq = Ext.getCmp("WYZS_phoneNum").getValue()+"|"+Ext.getCmp("WYZS_zhuanzhang").getValue()+"|"+wyzs_sq_money;
						jsLog(logStrMsg("变量->wyzs_sq->"+wyzs_sq,"INFO"));
						Ext.getCmp("check_ZH_info").setValue("");  //校验显示错误文字区域清空
						makeBusiness(0,"WYZS",0);
						Ext.getCmp("WYZS_phoneNum").setDisabled(true);
						Ext.getCmp("WYZS_zhuanzhang").setDisabled(true);
						Ext.getCmp("radio_money").setDisabled(true);
						wyzs_xg = "";wyzs_gs = "";wyzs_xe = "";wyzs_hfqy = "";wyzs_hfyz = "";
					}else if(strMessage.split("|")[6] == "P01216"){
						var wyzs_xg_money = "";
						if(Ext.getCmp("WYZS_1").getValue()){wyzs_xg_money = "100万";}
						else if(Ext.getCmp("WYZS_2").getValue()){wyzs_xg_money = "500万";}
						else if(Ext.getCmp("WYZS_3").getValue()){wyzs_xg_money = "5000万";}
						else {wyzs_xg_money = "无限额";}
						wyzs_xg = Ext.getCmp("WYZS_zhuanzhang").getValue()+"|"+wyzs_xg_money;
						jsLog(logStrMsg("变量->wyzs_xg->"+wyzs_xg,"INFO"));
						Ext.getCmp("check_ZH_info").setValue("");  //校验显示错误文字区域清空
						makeBusiness(1,"WYZS",0);
						Ext.getCmp("WYZS_zhuanzhang").setDisabled(true);
						Ext.getCmp("radio_money").setDisabled(true);
						wyzs_sq = "";wyzs_gs = "";wyzs_xe = "";wyzs_hfqy = "";wyzs_hfyz = "";
					}else if(strMessage.split("|")[6] == "P01217"){
						wyzs_gs = Ext.getCmp("WYZS_dzmdNum").getValue();
						jsLog(logStrMsg("变量->wyzs_gs->"+wyzs_gs,"INFO"));
						Ext.getCmp("check_ZH_info").setValue("");
						makeBusiness(2,"WYZS",0);
						Ext.getCmp("WYZS_dzmdNum").setDisabled(true);
						wyzs_xg = "";wyzs_sq = "";wyzs_xe = "";wyzs_hfqy = "";wyzs_hfyz = "";
					}else if(strMessage.split("|")[6] == "P01218"){
						var wyzs_xe_money = "";
						if(Ext.getCmp("WYZS_1").getValue()){wyzs_xe_money = "100万";}
						else if(Ext.getCmp("WYZS_2").getValue()){wyzs_xe_money = "500万";}
						else if(Ext.getCmp("WYZS_3").getValue()){wyzs_xe_money = "5000万";}
						else {wyzs_xe_money = "无限额";}
						wyzs_xe = Ext.getCmp("WYZS_zhuanzhang").getValue()+"|"+wyzs_xe_money;
						jsLog(logStrMsg("变量->wyzs_xe->"+wyzs_xe,"INFO"));
						Ext.getCmp("check_ZH_info").setValue("");  //校验显示错误文字区域清空
						makeBusiness(3,"WYZS",0);
						Ext.getCmp("WYZS_zhuanzhang").setDisabled(true);
						Ext.getCmp("radio_money").setDisabled(true);
						wyzs_xg = "";wyzs_gs = "";wyzs_sq = "";wyzs_hfqy = "";wyzs_hfyz = "";
					}else if(strMessage.split("|")[6] == "P01219"){
						wyzs_hfqy = Ext.getCmp("WYZS_phoneNum").getValue() + "|" + Ext.getCmp("WYZS_dzmdNum").getValue();
						jsLog(logStrMsg("变量->wyzs_hfqy->"+wyzs_hfqy,"INFO"));
						makeBusiness(4,"WYZS",0);
						Ext.getCmp("WYZS_phoneNum").setDisabled(true);
						Ext.getCmp("WYZS_dzmdNum").setDisabled(true);
						wyzs_xg = "";wyzs_gs = "";wyzs_xe = "";wyzs_sq = "";wyzs_hfyz = "";
					}else if(strMessage.split("|")[6] == "P01220"){
						wyzs_hfyz = Ext.getCmp("WYZS_dzmdNum").getValue();
						jsLog(logStrMsg("变量->wyzs_hfyz->"+wyzs_hfyz,"INFO"));
						makeBusiness(5,"WYZS",0);
						Ext.getCmp("WYZS_dzmdNum").setDisabled(true);
						wyzs_xg = "";wyzs_gs = "";wyzs_xe = "";wyzs_hfqy = "";wyzs_sq = "";
					}
					
				}
				//收到Button_Return消息之后清楚客户 以及坐席输入的框(对应的业务的文本框) Button_Return->
				if(strMessage.split("|")[9] == "Button_Return"){
//					jsLog(logStrMsg("GETMESSAGE:([dtmm_sq："+dtmm_sq+"])","MESSAGE"));
//					jsLog(logStrMsg("GETMESSAGE:([dtmm_xg："+dtmm_xg+"])","MESSAGE"));
//					jsLog(logStrMsg("GETMESSAGE:([dtmm_js："+dtmm_js+"])","MESSAGE"));
//					jsLog(logStrMsg("GETMESSAGE:([sjyh_sq："+sjyh_sq+"])","MESSAGE"));
//					jsLog(logStrMsg("GETMESSAGE:([sjyh_tj："+sjyh_tj+"])","MESSAGE"));
//					jsLog(logStrMsg("GETMESSAGE:([sjyh_cz："+sjyh_cz+"])","MESSAGE"));
//					jsLog(logStrMsg("GETMESSAGE:([sjyh_zz："+sjyh_zz+"])","MESSAGE"));
//					jsLog(logStrMsg("GETMESSAGE:([sjyh_zx："+sjyh_zx+"])","MESSAGE"));
					if(strMessage.split("|")[6] == "P01201" || strMessage.split("|")[6] == "P01202" || strMessage.split("|")[6] == "P01203"){    //如果是网银(申请业务)
						ZYW_DTWY_OK = 0;
						huiFuDTMMTextFile("clear");
						if(strMessage.split("|")[6] == "P01201"){dtmm_sq = "";}
						if(strMessage.split("|")[6] == "P01202"){dtmm_xg = "";}
						if(strMessage.split("|")[6] == "P01203"){dtmm_js = "";}
						if(dtmm_sq != ""){
							//jsLog(logStrMsg("GETMESSAGE:(“DTMM申请：”"+dtmm_sq+")","MESSAGE"));
							Ext.getCmp("DTMM_phoneNum").setValue(dtmm_sq);
							Ext.getCmp("DTMM_ZIYW").setValue("01");
						}else if(dtmm_xg != ""){
							//jsLog(logStrMsg("GETMESSAGE:(“DTMM修改：”"+dtmm_xg+")","MESSAGE"));
							Ext.getCmp("DTMM_oldPhone").setValue(dtmm_xg.split("|")[0]);
							Ext.getCmp("DTMM_newPhone").setValue(dtmm_xg.split("|")[1]);
							Ext.getCmp("DTMM_ZIYW").setValue("02");
						}else if(dtmm_js != ""){
							//jsLog(logStrMsg("GETMESSAGE:(“DTMM解锁：”"+dtmm_js+")","MESSAGE"));
							Ext.getCmp("DTMM_phoneNum").setValue(dtmm_js);
							Ext.getCmp("DTMM_ZIYW").setValue("03");
						}
					}
					if(strMessage.split("|")[6] == "P01204" || strMessage.split("|")[6] == "P01205" || strMessage.split("|")[6] == "P01206" || strMessage.split("|")[6] == "P01207" || strMessage.split("|")[6] == "P01208"){    //如果是手机银行(申请业务)
						ZYW_SJYH_OK = 0;
						huiFuSJYHTextFile("clear");
						if(strMessage.split("|")[6] == "P01204"){sjyh_sq = "";}
						if(strMessage.split("|")[6] == "P01205"){sjyh_tj = "";}
						if(strMessage.split("|")[6] == "P01206"){sjyh_cz = "";}
						if(strMessage.split("|")[6] == "P01207"){sjyh_zz = "";}
						if(strMessage.split("|")[6] == "P01208"){sjyh_zx = "";}
						if(sjyh_sq != ""){
							//jsLog(logStrMsg("GETMESSAGE:(“SJYH申请：”"+sjyh_sq+")","MESSAGE"));
							Ext.getCmp("SJ_phoneNum").setValue(sjyh_sq.split("|")[0]);
							Ext.getCmp("SJ_loginID").setValue(sjyh_sq.split("|")[1]);
							Ext.getCmp("SJ_zhifu").setValue(sjyh_sq.split("|")[3]);
							Ext.getCmp("SJ_zhuanzhang").setValue(sjyh_sq.split("|")[2]);
							Ext.getCmp("SJYH_ZIYW").setValue("01");
						}else if(sjyh_tj != ""){
							Ext.getCmp("SJYH_ZIYW").setValue("02");
							//jsLog(logStrMsg("GETMESSAGE:(“SJYH添加：”"+sjyh_tj+")","MESSAGE"));
							Ext.getCmp("SJ_zhuanzhang").setValue(sjyh_tj.split("|")[0]);
							Ext.getCmp("SJ_zhifu").setValue(sjyh_tj.split("|")[1]);
						}else if(sjyh_cz != ""){
							Ext.getCmp("SJYH_ZIYW").setValue("03");
						}else if(sjyh_zz != ""){
							Ext.getCmp("SJYH_ZIYW").setValue("04");
							//jsLog(logStrMsg("GETMESSAGE:(“SJYH转支：”"+sjyh_zz+")","MESSAGE"));
							Ext.getCmp("SJ_zhuanzhang").setValue(sjyh_zz.split("|")[0]);
							Ext.getCmp("SJ_zhifu").setValue(sjyh_zz.split("|")[1]);		
						}else if(sjyh_zx != ""){
							Ext.getCmp("SJYH_ZIYW").setValue("05");
							//jsLog(logStrMsg("GETMESSAGE:(“SJYH注销：”"+sjyh_zx+")","MESSAGE"));
							Ext.getCmp("SJ_phoneNum").setValue(sjyh_zx.split("|")[0]);
							Ext.getCmp("SJ_loginID").setValue(sjyh_zx.split("|")[1]);
						}
					}
					//button_return清空电子银行密码管理以及电话银行密码管理的子业务选项;
					if(strMessage.split("|")[6] == "P01209" || strMessage.split("|")[6] == "P01210" || strMessage.split("|")[6] == "P01211"){
						ZYW_DZMM_OK = 0;
						Ext.getCmp("dzyh_shenqing").setValue(false);
						Ext.getCmp("dzyh_chongzhi").setValue(false);
						Ext.getCmp("dzyh_xiugai").setValue(false);
						if(strMessage.split("|")[6] == "P01209"){dzyh_sq = false;}
						else if(strMessage.split("|")[6] == "P01210"){dzyh_cz = false;}
						else if(strMessage.split("|")[6] == "P01211"){dzyh_xg = false;}
						if(dzyh_sq){
							Ext.getCmp("dzyh_shenqing").setValue(true);
						}else if(dzyh_xg){
							Ext.getCmp("dzyh_xiugai").setValue(true);
						}else if(dzyh_cz){
							Ext.getCmp("dzyh_chongzhi").setValue(true);
						}
					}else if(strMessage.split("|")[6] == "P01212" || strMessage.split("|")[6] == "P01213" || strMessage.split("|")[6] == "P01214"){
						ZYW_DHMM_OK = 0;
						Ext.getCmp("dhyh_shenqings").setValue(false);
						Ext.getCmp("dhyh_chongzhi").setValue(false);
						Ext.getCmp("dhyh_xiugai").setValue(false);
						if(strMessage.split("|")[6] == "P01212"){dhyh_sq = false;}
						else if(strMessage.split("|")[6] == "P01213"){dhyh_cz = false;}
						else if(strMessage.split("|")[6] == "P01214"){dhyh_xg = false;}
						if(dhyh_sq){
							Ext.getCmp("dhyh_shenqings").setValue(true);
						}else if(dhyh_xg){
							Ext.getCmp("dhyh_xiugai").setValue(true);
						}else if(dhyh_cz){
							Ext.getCmp("dhyh_chongzhi").setValue(true);
						}
					}
					
					//2014/7/9 WYZS_code
					if(strMessage.split("|")[6] == "P01215" || strMessage.split("|")[6] == "P01216" || strMessage.split("|")[6] == "P01217" || strMessage.split("|")[6] == "P01218" || strMessage.split("|")[6] == "P01219" || strMessage.split("|")[6] == "P01220"){
						jsLog(logStrMsg("GETMESSAGE:(进入清空的消息中！)","MESSAGE"));
						ZYW_WYZS_OK = 0 ;
						huiFuWYZSTextFile("clear");
						jsLog(logStrMsg("GETMESSAGE:(开始判断清空条件)","MESSAGE"));
						if(strMessage.split("|")[6] == "P01215"){wyzs_sq = "";}
						if(strMessage.split("|")[6] == "P01216"){wyzs_xg = "";}
						if(strMessage.split("|")[6] == "P01217"){wyzs_gs = "";}
						if(strMessage.split("|")[6] == "P01218"){wyzs_xe = "";}
						if(strMessage.split("|")[6] == "P01219"){wyzs_hfqy = "";}
						if(strMessage.split("|")[6] == "P01220"){wyzs_hfyz = "";}
						if(wyzs_sq != ""){
							jsLog(logStrMsg("MESSAGE:(清空的业务是申请业务)","MESSAGE"));
							Ext.getCmp("WYZS_phoneNum").setValue(wyzs_sq.split("|")[0]);
							Ext.getCmp("WYZS_zhuanzhang").setValue(wyzs_sq.split("|")[1]);   //转账功能
							Ext.getCmp("WYZS_ZIYW").setValue("01");
							if(wyzs_sq.split("|")[1] == "01"){	
								if(wyzs_sq.split("|")[2] == "100万"){Ext.getCmp("WYZS_1").setValue(true);}
								else if(wyzs_sq.split("|")[2] == "500万"){Ext.getCmp("WYZS_2").setValue(true);}
								else if(wyzs_sq.split("|")[2] == "5000万"){Ext.getCmp("WYZS_3").setValue(true);}
								else {Ext.getCmp("WYZS_4").setValue(true);}
							}else{
								Ext.getCmp("radio_money").setVisible(false); 
							}
							
						}else if(wyzs_xg != ""){
							jsLog(logStrMsg("MESSAGE:(清空的业务是网银盾-下挂账户业务)","MESSAGE"));
							Ext.getCmp("WYZS_zhuanzhang").setValue(wyzs_xg.split("|")[0]);   //转账功能
							Ext.getCmp("WYZS_ZIYW").setValue("02");
							if(wyzs_xg.split("|")[1] == "01"){
								if(wyzs_xg.split("|")[2] == "100万"){Ext.getCmp("WYZS_1").setValue(true);}
								else if(wyzs_xg.split("|")[2] == "500万"){Ext.getCmp("WYZS_2").setValue(true);}
								else if(wyzs_xg.split("|")[2] == "5000万"){Ext.getCmp("WYZS_3").setValue(true);}
								else {Ext.getCmp("WYZS_4").setValue(true);}
							}else{
								Ext.getCmp("radio_money").setVisible(false); 
							}
						}else if(wyzs_gs != ""){
							jsLog(logStrMsg("MESSAGE:(清空的业务是网银盾-电子密盾开机密码挂失)","MESSAGE"));
							Ext.getCmp("WYZS_dzmdNum").setValue(wyzs_gs);
							Ext.getCmp("WYZS_ZIYW").setValue("03");
						}else if(wyzs_xe != ""){
							jsLog(logStrMsg("MESSAGE:(清空的业务是网银盾-设置转账最高限额)","MESSAGE"));
							Ext.getCmp("WYZS_zhuanzhang").setValue(wyzs_xe.split("|")[0]);   //转账功能
							Ext.getCmp("WYZS_ZIYW").setValue("04");
							if(wyzs_xe.split("|")[1] == "01"){
								if(wyzs_xe.split("|")[2] == "100万"){Ext.getCmp("WYZS_1").setValue(true);}
								else if(wyzs_xe.split("|")[2] == "500万"){Ext.getCmp("WYZS_2").setValue(true);}
								else if(wyzs_xe.split("|")[2] == "5000万"){Ext.getCmp("WYZS_3").setValue(true);}
								else {Ext.getCmp("WYZS_4").setValue(true);}
							}else{
								Ext.getCmp("radio_money").setVisible(false);
							}
						}else if(wyzs_hfqy != ""){
							jsLog(logStrMsg("MESSAGE:(清空的业务是网银盾-恢复启用网银)","MESSAGE"));
							Ext.getCmp("WYZS_ZIYW").setValue("05");
							Ext.getCmp("WYZS_phoneNum").setValue(wyzs_hfqy.split("|")[0]);
							Ext.getCmp("WYZS_dzmdNum").setValue(wyzs_hfqy.split("|")[1]);
						}else if(wyzs_hfyz != ""){
							jsLog(logStrMsg("MESSAGE:(清空的业务是网银盾-恢复启用电子密盾验证)","MESSAGE"));
							Ext.getCmp("WYZS_ZIYW").setValue("06");
							Ext.getCmp("WYZS_dzmdNum").setValue(wyzs_hfyz);
						}
					}
					
					
				}
				//客户自己来选择程序中已有的卡号
				if(strMessage.split("|")[8] == "P015"){
					Ext.getCmp("EjectCard").setDisabled(true);
					Ext.getCmp("ReadCard").setDisabled(true);
				}
				//客户返回了自己选择卡号 
				if(strMessage.split("|")[8] == "P010" && strMessage.split("|")[6] == "P008"){
					Ext.getCmp("EjectCard").setDisabled(false);
					Ext.getCmp("ReturnCard").setDisabled(false);
					Ext.getCmp("ReadCard").setDisabled(false);
					//cardNumber
					if(cardNumber != ""){
						//Ext.getCmp("goNext").setVisible(true);   8080
					}
					synWithTerm(18,1);//跳转到选择卡号或者读取卡号;
					jsLog(logStrMsg("收消息 - ..  BussChoicType = " + BussChoicType + " --- cardNumber = " + cardNumber,"INFO   "));
					//20141029  打开读取卡号 EXE 程序
					myocx.InvokeBusinessForm(7,"",0,cardNumber);
					jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[ReadCardNumPage.exe] 0：弹出","INFO"));
					//20141029  打开读取卡号 EXE 程序
					//myocx.InvokeBusinessForm(7,"",0,cardNumber);
				}
				if(strMessage.split("|")[9].indexOf("EjectCard") >= 0){
					if(strMessage.split("|")[9].split(",")[1] == "1" && cardNumber != ""){
						//Ext.getCmp("goNext").setVisible(true);  8080
						
					}
				}
				
				//输错密码次数的情况判断  弹窗提示坐席
				/**
				 *  01,支付密码输错次数三次
					02,支付密码输错次数超限
					03,电子银行密码输错次数三次
					04,电子银行密码输错次数超限
				 */
				if(strMessage.split("|")[8] == "P034"){
					if(strMessage.split("|")[9].indexOf("01") >= 0 ||strMessage.split("|")[9].indexOf("02") >= 0 || strMessage.split("|")[9].indexOf("04") >= 0){
						if(BussChoicType == "FUND"){
							myocx.InvokeBusinessForm(8,"",987,"");  //终端告诉坐席端页面跳转  到验证支付密码页面	
							jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe] 987：密码错误超次","INFO"));
						}
						ZForDZsixError(strMessage.split("|")[9].split(",")[1] , strMessage.split("|")[5]);
					}else if(strMessage.split("|")[9].indexOf("03") >= 0){
						transactionReturnMsg(strMessage.split("|")[9].split(",")[1]);
					}else if(strMessage.split("|")[9].indexOf("05") >= 0){
						DHYHWrithError(strMessage.split("|")[9].split(",")[1] , strMessage.split("|")[5]);
					}
//					else if(strMessage.split("|")[9].indexOf("04") >= 0){
//						ZForDZsixError(strMessage.split("|")[9].split(",")[1] , strMessage.split("|")[5]);
//					}
				}

		}
		
		if(strMessage.split("|")[7] == "0"){  			 //不跳转的消息
			jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
			//交易检查是否可以跳转
			if(strMessage.split("|")[6] == "P012" && strMessage.split("|")[9] == "Check_OK"){
				Ext.getCmp("101310").setDisabled(false);
				Ext.getCmp("101311").setDisabled(false);
				Ext.getCmp("101310").setVisible(true);
			}
			if(strMessage.split("|")[9].indexOf("FinacialCheck") >= 0 && strMessage.split("|")[6] == "P010"){
				//Ext.getCmp("goNext").setVisible(true);  8080
			}else if(strMessage.split("|")[9].indexOf("FundCheck") >= 0){
				jsLog(logStrMsg("GETMESSAGE:(收到消息 告诉C#跳转到验证支付密码页面)","MESSAGE"));
				myocx.InvokeBusinessForm(8,"",105,"");  //终端告诉坐席端页面跳转  到验证支付密码页面
				jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe] 105：验证支付密码","INFO"));
					
			}
			/***
			 * 读取卡号之后收到VTM读出的卡号赋值在页面
			 * 例：消息strMessage ：20130925 10:00:01|||||M0202|P008|0||ReadCard,6006 8888 8888 8888<<< end
			 **/
			if(strMessage.split("|")[9].indexOf("ReadCardSucc") >= 0 || strMessage.split("|")[9].indexOf("SelectCard") >= 0){
				if(strMessage.split("|")[9].indexOf("SelectCard") >= 0){
					//Ext.getCmp("101902").setValue("客户已选择卡号!");  		//读卡页面赋值
					///Ext.getCmp("goNext").setVisible(true);
				}
				Ext.getCmp("flexoButton").setDisabled(false);
				//Ext.getCmp("goNext").setVisible(true);   //显示下一步按钮
				cardNumber = strMessage.split("|")[9].split(",")[1];
				jsLog(logStrMsg("CardNumber = "+cardNumber,"INFO"));
				setCardNumber(cardNumber);
				if(BussChoicType == "FUND"){
					//告诉C# 显示卡号！
					myocx.InvokeBusinessForm(8,"",996,cardNumber);
					jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe] 996：读卡","INFO"));
				}else if(BussChoicType == "TZLC" || BussChoicType == "DZQD"){
					//告诉C# 显示卡号！
					jsLog(logStrMsg("开始调用invokebusinessForm 7  _>cardNumber = " + cardNumber,"INFO"));
					myocx.InvokeBusinessForm(7,"",0,cardNumber);
					jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[ReadCardNumPage.exe] 0：弹出","INFO"));
				}
			}else if(strMessage.split("|")[9].indexOf("ReturnCard") >= 0){
				if(strMessage.split("|")[9].split(",")[1] == "0"){
					//friendShipMsg("回收卡失败！"); //通过消息弹窗提示坐席端
					myocx.InvokeBusinessForm(9,"",222,"回收卡失败！");  //消息弹窗程序
				}
			}
			//读取卡号失败提示坐席重新读卡
			if(strMessage.split("|")[6] == "P010" && strMessage.split("|")[9].indexOf("ReadCardFailure") >= 0){
				//friendShipMsg(strMessage.split("|")[9].split(",")[1]); //通过消息弹窗提示坐席端
				myocx.InvokeBusinessForm(9,"",222,strMessage.split("|")[9].split(",")[1]);  //消息弹窗程序
				//Ext.getCmp("ReadCard").setDisabled(false);
			}
			
			//读取卡号超时消息；
			if(strMessage.split("|")[6] == "P010" && strMessage.split("|")[9].indexOf("ReadCardOverTime") >= 0){
				//friendShipMsg(strMessage.split("|")[9].split(",")[1]); //通过消息弹窗提示坐席端
				myocx.InvokeBusinessForm(9,"",222,strMessage.split("|")[9].split(",")[1]);  //消息弹窗程序
				Ext.getCmp("ReadCard").setDisabled(false);
			}
			
			/*
			 * 客户选择卡号之后发送卡号消息
			 * 例：消息strMessage ： 20130925 10:00:01|||||M0202|P008|0||SelectCard,6006 8888 8888 8888<<< end
			 **/
			
			//受到PullCard消息将下一步按钮显示
			if(strMessage.split("|")[9].indexOf("PullCard") >= 0){
				//Ext.getCmp("ReadCard").setDisabled(false);//退卡成功之后  将‘读取卡号’制亮
				jsLog(logStrMsg("MESSAGE:客户卡号为："+cardNumber,"INFO"));
				if(cardNumber != ""){
					//Ext.getCmp("goNext").setVisible(true);
					//只有收到pullCard消息才能将下一步按钮制亮！
					Ext.getCmp("goNext").setDisabled(false);    
					jsLog(logStrMsg("INFOMESSAGE:(将goNext下一步按钮致亮) BussChoicType="+BussChoicType,"INFO"));
				}
				if(BussChoicType == "FUND"){
					//显示下一步按钮
					myocx.InvokeBusinessForm(8,"",995,"");
					jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe] 995：显示下一步","INFO"));
				}else if(BussChoicType == "TZLC" || BussChoicType == "DZQD"){
					jsLog(logStrMsg("流程 -> 将制亮WinForm程序的下一步按钮 777","INFO"));
					myocx.InvokeBusinessForm(7,"",777,"");
					jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[ReadCardNumPage.exe] 777：显示下一步","INFO"));
				}
//					if(strMessage.split("|")[9].split(",")[1] == "1" && cardNumber != ""){
//						//Ext.getCmp("goNext").setVisible(true);
//					}
			}
			
			// 2014/7/14 WYZS_code_ukey   over_WYZS_SQ_result
			//if(strMessage.split("|")[6].indexOf("P026") >= 0){
			if(strMessage.split("|")[9].indexOf("EjectUKey") >= 0){
				jsLog(logStrMsg("MESSAGE:已吐出U盾","INFO"));
				//显示Ukey 发出网银盾设备 的文字
				Ext.getCmp("over_WYZS_SQ_result").setValue(Ext.getCmp("over_WYZS_SQ_result").getValue()+"->已吐出U盾");
				Ext.getCmp("over_SJ_SQ_result").setValue(Ext.getCmp("over_SJ_SQ_result").getValue()+"->已吐出U盾");
			}
			if(strMessage.split("|")[9].indexOf("PullUKey") >= 0){
				jsLog(logStrMsg("MESSAGE:客户已取走U盾","INFO"));
				Ext.getCmp("over_WYZS_SQ_result").setValue(Ext.getCmp("over_WYZS_SQ_result").getValue()+"->客户取走U盾");
				Ext.getCmp("over_SJ_SQ_result").setValue(Ext.getCmp("over_SJ_SQ_result").getValue()+"->客户取走U盾");
			}
			if(strMessage.split("|")[9].indexOf("RetainUKey") >= 0){
				jsLog(logStrMsg("MESSAGE:U盾已回收到回收箱","INFO"));
				Ext.getCmp("over_WYZS_SQ_result").setValue(Ext.getCmp("over_WYZS_SQ_result").getValue()+"->已回收到回收箱");
				Ext.getCmp("over_SJ_SQ_result").setValue(Ext.getCmp("over_SJ_SQ_result").getValue()+"->已回收到回收箱");
			}
			if(strMessage.split("|")[9].indexOf("TimeOut4UKey") >= 0){
				jsLog(logStrMsg("MESSAGE:客户未取U盾，超时回收","INFO"));
				Ext.getCmp("over_WYZS_SQ_result").setValue(Ext.getCmp("over_WYZS_SQ_result").getValue()+"->客户未取U盾->超时回收");
				Ext.getCmp("over_SJ_SQ_result").setValue(Ext.getCmp("over_SJ_SQ_result").getValue()+"->客户未取U盾->超时回收");
			}
			//jsLog(logStrMsg("MESSAGE:发Ukey状态消息："+Ext.getCmp("over_WYZS_SQ_result").getValue(),"INFO"));
			///}
//			if(strMessage.split("|")[9] == "" && strMessage.split("|")[6] == "P043"){
//				jsLog(logStrMsg("INFO: 当前页是基金业务 客户资料信息页面，证明此消息字段校验成功，告诉终端跳转画面致结果页","INFO"));
//				getMsgBody4G2("M0208","P043",1,"P042","");  //告诉终端跳转
//				myocx.InvokeBusinessForm(8,"",108,"");
//			}
		}
		
		if(strMessage.split("|")[7] == "2"){    //专属文本框传值消息
			jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
			if(strMessage.split("|")[5] == "M0202"){
				//动态密码版网银的消息同步
				if((strMessage.split("|")[9].indexOf("phoneNum") >= 0 && strMessage.split("|")[6] == "P01201") || (strMessage.split("|")[9].indexOf("phoneNum") >= 0 && strMessage.split("|")[6] == "P01203")){
					Ext.getCmp("DTMM_phoneNum").setValue(strMessage.split("|")[9].split(":")[1]);
				//判断是oldPhone 并且当前子业务页 是‘修改手机号’业务
				}else if(strMessage.split("|")[9].indexOf("oldPhone:") >= 0){
					//alert(strMessage.split("|")[9].split(":")[1]);
					//alert(Ext.getCmp("DTMM_oldPhone").getValue());
					Ext.getCmp("DTMM_oldPhone").setValue(strMessage.split("|")[9].split(":")[1]);
				}else if(strMessage.split("|")[9].indexOf("newPhone:") >= 0){
					Ext.getCmp("DTMM_newPhone").setValue(strMessage.split("|")[9].split(":")[1]);
				}
	//			else if(strMessage.split("|")[9].indexOf("newPhoneRepeat:") >= 0){
	//				Ext.getCmp("DTMM_newphoneRepeat").setValue(strMessage.split("|")[9].split(":")[1]);
	//			}
				//手机银行的文本框消息
				if(strMessage.split("|")[9].indexOf("SJ_phoneNum") >= 0){
					Ext.getCmp("SJ_phoneNum").setValue(strMessage.split("|")[9].split(":")[1]);
				}else if(strMessage.split("|")[9].indexOf("SJ_loginID") >= 0){
					Ext.getCmp("SJ_loginID").setValue(strMessage.split("|")[9].split(":")[1]);
				}else if(strMessage.split("|")[9].indexOf("SJ_zhuanzhang") >= 0){
					Ext.getCmp("SJ_zhuanzhang").setValue(strMessage.split("|")[9].split(":")[1]);
				}else if(strMessage.split("|")[9].indexOf("SJ_zhifu") >= 0){
					Ext.getCmp("SJ_zhifu").setValue(strMessage.split("|")[9].split(":")[1]);
				}
				/**
				 * 网银证书(WYZS)的文本框消息 
				 * 2014/7/8 WYZS_code
				 */
				//手机号文本框消息内容判断      申请、恢复启用网银这两笔子业务都涉及到手机号的消息；
				if(strMessage.split("|")[9].indexOf("WYZS_phoneNum") >= 0 ){
					Ext.getCmp("WYZS_phoneNum").setValue(strMessage.split("|")[9].split(":")[1]);
				//网银正书的设值转账功能消息
				}else if(strMessage.split("|")[9].indexOf("WYZS_zhuanzhang") >= 0){
					Ext.getCmp("WYZS_zhuanzhang").setValue(strMessage.split("|")[9].split(":")[1]);
					if(strMessage.split("|")[9].split(":")[1] == "02"){
						jsLog(logStrMsg("GETMESSAGE:(隐藏单选按钮)","MESSAGE"));
						Ext.getCmp("radio_money").setVisible(false);   //隐藏单选按钮
					}else{
						jsLog(logStrMsg("GETMESSAGE:(显示单选按钮)","MESSAGE"));
						Ext.getCmp("radio_money").setVisible(true);   //显示单选按钮
					}
					//|T002|S002|6001|T002201406301920|M0202|P01215|2||WYZS_TransferLimit:500
				}else if(strMessage.split("|")[9].indexOf("WYZS_TransferLimit") >= 0){  //转账限额WYZS_TransferLimit
					if(strMessage.split("|")[9].split(":")[1]== "100"){
						jsLog(logStrMsg("GETMESSAGE: terminal choice : 100","MESSAGE"));
						Ext.getCmp("WYZS_1").setValue(true);
					}else if(strMessage.split("|")[9].split(":")[1] == "500"){
						jsLog(logStrMsg("GETMESSAGE: terminal choice : 500","MESSAGE"));
						Ext.getCmp("WYZS_2").setValue(true);
					}else if(strMessage.split("|")[9].split(":")[1] == "5000"){
						jsLog(logStrMsg("GETMESSAGE: terminal choice : 5000","MESSAGE"));
						Ext.getCmp("WYZS_3").setValue(true);
					}else{
						jsLog(logStrMsg("GETMESSAGE: terminal choice : 无限额","MESSAGE"));
						Ext.getCmp("WYZS_4").setValue(true);
					}
				}else if(strMessage.split("|")[9].indexOf("WYZS_dzmdNum") >= 0){
					Ext.getCmp("WYZS_dzmdNum").setValue(strMessage.split("|")[9].split(":")[1]);
				}
				
			}
			//投资理财输入手机号时发送的消息
			if(strMessage.split("|")[5] == "M0204"){
				if(strMessage.split("|")[9].indexOf("phoneNum") >= 0 && strMessage.split("|")[6] >= "P032"){
					Ext.getCmp("tzlc_phonenum").setValue(strMessage.split("|")[9].split(":")[1]);
				}
			}
			// 基金签约输入客户信息消息；
			if(strMessage.split("|")[5] == "M0208"){
				if(strMessage.split("|")[6] == "P043"){
					myocx.InvokeBusinessForm(8,"",988,strMessage.split("|")[9]);
					jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe] 988：填写资料","INFO"));
				}
			}
		}
		//专属字段校验消息
		if(strMessage.split("|")[7] == "4"){
			jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
			if(strMessage.split("|")[6] == "P01201"){    	 //错误信息提示  (网银 申请)
				Ext.getCmp("check_ZH_info").setValue(strMessage.split("|")[9].split(":")[1]);
			}else if(strMessage.split("|")[6] == "P01202"){
				Ext.getCmp("check_ZH_info").setValue(strMessage.split("|")[9].split(":")[1]);
			}else if(strMessage.split("|")[6] == "P01203"){
				Ext.getCmp("check_ZH_info").setValue(strMessage.split("|")[9].split(":")[1]);
			}
			if(strMessage.split("|")[6] == "P01204" || strMessage.split("|")[6] == "P01208"){  //错误信息提示  (手银 申请)
				if(strMessage.split("|")[9].split(":").length > 2){
					Ext.getCmp("check_ZH_info").setValue(strMessage.split("|")[9].split("1:")[1]);
				}else{
					Ext.getCmp("check_ZH_info").setValue(strMessage.split("|")[9].split(":")[1]);
				}
			}
			if(strMessage.split("|")[6] == "P032"){
				jsLog(logStrMsg("GETMESSAGE:(手机号码校验错误！ 开始渲染js页面错误信息)","MESSAGE"));
				Ext.getCmp("check_phone_info").setValue(strMessage.split("|")[9].split(":")[1]);
			}
			// 2014/7/10 WYZS_code  显示校验信息
			if(strMessage.split("|")[6] == "P01215" || strMessage.split("|")[6] == "P01219"){
				Ext.getCmp("check_ZH_info").setValue(strMessage.split("|")[9].split(":")[1]);
			}
			// 基金业务中 客户信息错误校验信息
			if(strMessage.split("|")[6] == "P043"){
				//将错误信息 发送给C#程序
				myocx.InvokeBusinessForm(8,"",993,strMessage.split("|")[9]);
				jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe] 993：显示校验的错误信息","INFO"));
			}
			
		}
		//专用于弹窗交易提示信息
		if(strMessage.split("|")[7] == "7"){
			jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
			//if(getMyocxInfo(1) == "version2.1"){
			jsLog(logStrMsg("BusschoicType = "+BussChoicType + " <-> globalcurpage = "+globalcurpage,"MESSAGE"));
			if(BussChoicType == "FUND"){
				//myocx.InvokeBusinessForm(8,"",986,"");   //关闭    
				jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe] 986：关闭交易弹窗","INFO"));
			}else if((BussChoicType == "TZLC" || BussChoicType == "DZQD") && globalcurpage == 18){
				if(strMessage.split("|")[9].indexOf("已签约") < 0){
					//myocx.InvokeBusinessForm(7,"",333,"");	
					jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[ReadCardNumPage.exe] 333：最小化","INFO"));
				}else{
					myocx.InvokeBusinessForm(7,"",3,"");	
					jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[ReadCardNumPage.exe] 3：最小化并显示‘返回视频页’","INFO"));
				}
			}else{
				//checkCBOD(1);	
			}
			
			//}
			//Ext.getCmp("goNext").setDisabled(false); //将下一步制亮
			//jsLog(logStrMsg("INFOMESSAGE:(将goNext下一步按钮致亮)","MESSAGE"));
			Ext.getCmp("101311").setDisabled(false); //将电子渠道中的交易检查按钮制亮  
			if(strMessage.split("|")[9].indexOf("FinacialCheck") >= 0){
				//friendShipMsg(strMessage.split("|")[9].split(",")[1]); //通过消息弹窗提示坐席端
				myocx.InvokeBusinessForm(9,"",222,strMessage.split("|")[9].split(",")[1]);  //消息弹窗程序
				if(strMessage.split("|")[9].indexOf("已签约") >= 0 && strMessage.split("|")[5] == "M0204"){
				 	//Ext.getCmp("goBackVideo").setVisible(true);   //显示返回视频页 按钮
					Ext.getCmp("ReturnCard").setDisabled(true);   //毁掉下一步ReadCard
				}
				
			}else{
				//myocx.InvokeBusinessForm(3,"",99,"客户确认了信息，正在等待您的审核！");
				jsLog(logStrMsg("当前页ID ： globalcurpage = "+globalcurpage,"MESSAGE"));
				if(globalcurpage == 6){
					jsLog(logStrMsg("GETMESSAGE:(js调用 invokeBusinessForm接口，传递弹窗提示消息！)","MESSAGE"));
					if(BussChoicType != "KJJK"){
						//myocx.InvokeBusinessForm(3,"",99,strMessage.split("|")[9]);
						//jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[CheckDataForm.exe] 99：弹窗提示","INFO"));
					}
					myocx.InvokeBusinessForm(9,"",222,strMessage.split("|")[9]);
				}else{
					jsLog(logStrMsg("else","MESSAGE"));
					customerInfo = "NewCustomer&" + checkName;
					//friendShipMsg(strMessage.split("|")[9]); //通过消息弹窗提示坐席端
					if(BussChoicType != "KJJK"){
						myocx.InvokeBusinessForm(9,"",222,strMessage.split("|")[9]);  //消息弹窗程序
					}
					
				}
			}
			if(strMessage.split("|")[9].indexOf("持卡张数") >= 0){
				myocx.InvokeBusinessForm(9,"",222,strMessage.split("|")[9]);  //消息超三张提示
			}
//			//测试添加
//			if(strMessage.split("|")[9].indexOf("打印PDF合约文件失败") >= 0){
//				synWithTerm(7,1)
//			}
		}
		//--------二期用来传递密码的消息--------
		if(strMessage.split("|")[7] == "6"){   		 // 6: 表示输入的是密码信息
			jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
			myocx.InvokeBusinessForm(10,"",104,strMessage.split("|")[6]);
			if(strMessage.split("|")[6] == "P018" || strMessage.split("|")[6] == "P017" || strMessage.split("|")[6] == "P028"){        //验证电子银行密码
				if(parseInt(strMessage.split("|")[9].split(",")[1]) >= 1 ){ //收到密码长度是1 表示开始输入密码
					if(BussChoicType == "FUND"){
						jsLog(logStrMsg("GETMESSAGE:(准备发送994消息类型告诉C#来显示客户输入密码位数，用*表示)","MESSAGE"));
						myocx.InvokeBusinessForm(8,"",994,strMessage.split("|")[9]);
					}else {
						var pwd="";
						Ext.getCmp("cus_checkpwdinfo").setValue("客户正在输入验证密码");
						for(var i =0 ;i < parseInt(strMessage.split("|")[9].split(",")[1]) ; i++){
							pwd += "*";
						}
						Ext.getCmp("cus_dzyhpwd").setValue(pwd);
					}
					
				}else if(parseInt(strMessage.split("|")[9].split(",")[1]) == 0 ){
					if(BussChoicType == "FUND"){
						jsLog(logStrMsg("GETMESSAGE:(准备发送994消息类型告诉C#来显示输入密码时 错误提示！)","MESSAGE"));
						myocx.InvokeBusinessForm(8,"",994,strMessage.split("|")[9]);
						jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe] 994：显示密码*","INFO"));
					}else{
						//输入的密码错误时 给予提示
						Ext.getCmp("cus_checkpwdinfo").setValue(strMessage.split("|")[9].split(",")[2]);
						Ext.getCmp("cus_dzyhpwd").setValue("");
					}
					
				}
			}
			/***
			 * 设置新的密码  P023电子银行密码、P024电话银行密码、P025手机银行登录密码   以及P030借记卡挂失都设置新的支付密码
			 *  [SPOOL {ON|OFF}] [PRE[FORMAT] {ON|OFF}]
			 */
			//目前将3个密码综合起来判断,
			if(strMessage.split("|")[6] == "P023" || strMessage.split("|")[6] == "P024" || strMessage.split("|")[6] == "P025" || strMessage.split("|")[6] == "P030"){
				if(parseInt(strMessage.split("|")[9].split(",")[0]) == 1 ){  		 //输入的是第一个 密码
					if(parseInt(strMessage.split("|")[9].split(",")[1]) >= 1 ){
						Ext.getCmp("cus_pwdNewInfo").setValue("客户正在输入新密码");
						var pwd1="";
						for(var i = 0; i < parseInt(strMessage.split("|")[9].split(",")[1]); i++ ){
							pwd1 += "*";
						}
						Ext.getCmp("cus_newdzyhpwd").setValue(pwd1);
					}else if(parseInt(strMessage.split("|")[9].split(",")[1]) == 0 ){  //输入第一个密码时长度问题
						if(strMessage.split("|")[9].split(",")[2] == "pwdsynlen"){  //第一个密码框的长度不足六位时
							Ext.getCmp("cus_pwdNewInfo").setValue("密码长度不足6位");
							Ext.getCmp("cus_newdzyhpwd").setValue("");
						}else if(strMessage.split("|")[9].split(",")[2] == "clear"){  //清空第一个密码框
							Ext.getCmp("cus_newdzyhpwd").setValue("");
						}
					}
				}else if(parseInt(strMessage.split("|")[9].split(",")[0]) == 2){     //输入的是第二个确认 密码
					if(parseInt(strMessage.split("|")[9].split(",")[1]) >= 1 ){
						Ext.getCmp("cus_pwdNewInfo").setValue("客户正在输入新密码[确认]");
						var pwd2="";
						for(var i = 0; i < parseInt(strMessage.split("|")[9].split(",")[1]); i++){
							pwd2 += "*";
						}
						Ext.getCmp("cus_newdzyhpwd2").setValue(pwd2);
					}else if(parseInt(strMessage.split("|")[9].split(",")[1]) == 0 ){  //输入第二个密码时长度问题
						if(strMessage.split("|")[9].split(",")[2] == "pwdnotmatch"){
							Ext.getCmp("cus_pwdNewInfo").setValue("两次密码不一致");
							Ext.getCmp("cus_newdzyhpwd").setValue("");
							Ext.getCmp("cus_newdzyhpwd2").setValue("");
						}else if(strMessage.split("|")[9].split(",")[2] == "pwdSoEasy"){
							Ext.getCmp("cus_pwdNewInfo").setValue("密码过于简单");
							Ext.getCmp("cus_newdzyhpwd").setValue("");
							Ext.getCmp("cus_newdzyhpwd2").setValue("");
						}else if(strMessage.split("|")[9].split(",")[2] == "pwdsynlen"){
							Ext.getCmp("cus_pwdNewInfo").setValue("密码长度不足6位");
							Ext.getCmp("cus_newdzyhpwd2").setValue(" ");
						}else if(strMessage.split("|")[9].split(",")[2] == "clear"){   //清空第二个密码框
							Ext.getCmp("cus_newdzyhpwd2").setValue("");
						}
					}
				}
			}
		}
		//专属生成PDF文件消息 存储后台路径
		if(strMessage.split("|")[7] == "8"){
			jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
			jsLog(logStrMsg("StrMessage[999-type] saveSomeFile Save:PDF path : " + strMessage.split("|")[9] ,"MESSAGE"));
			EBankPDFpath = strMessage.split("|")[9];
			if(NotPaper == "False"){
				if(BussChoicType == "DZQD"){
					if(fristBusiness == 0){
						saveSomeFile(conhisid_DZQD, '13', '2', strMessage.split("|")[9],agentno, cusname, cerno);	
					}
				}else if(BussChoicType == "TZLC"){
					saveSomeFile(conhisid_TZLC, '13', '2', strMessage.split("|")[9],agentno, cusname, cerno);
				}else if(BussChoicType == "FUND"){
					saveSomeFile(conhisid_FUND, '13', '2', strMessage.split("|")[9],agentno, cusname, cerno);
				}else if(BussChoicType == "JJGS"){
					saveSomeFile(conhisid_JJGS, '13', '2', strMessage.split("|")[9],agentno, cusname, cerno);
				}
			}
		}
		
		//随时监视终端当前页面在哪一页？
		if(strMessage.split("|")[7] == "9"){
			jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
			if(strMessage.split("|")[9] == "P012"){   //验证客户是否在子业务填写过程中...
				/**
				 * 就目前金博会来看  将判断输入密码的类型用简便的方法来实现：checkPwdType
				 */
				if(Ext.getCmp("SJYH_ZIYW").getValue() == "01" || Ext.getCmp("SJYH_ZIYW").getValue() == "02"
					|| Ext.getCmp("SJYH_ZIYW").getValue() == "04" || Ext.getCmp("DTMM_ZIYW").getValue() == "01"
					|| Ext.getCmp("DTMM_ZIYW").getValue() == "02" || Ext.getCmp("DTMM_ZIYW").getValue() == "03"
					|| Ext.getCmp("WYZS_ZIYW").getValue() == "01" || Ext.getCmp("WYZS_ZIYW").getValue() == "02"
					|| Ext.getCmp("WYZS_ZIYW").getValue() == "03" || Ext.getCmp("WYZS_ZIYW").getValue() == "04"
					|| Ext.getCmp("WYZS_ZIYW").getValue() == "06" || Ext.getCmp("WYZS_ZIYW").getValue() == "05"){
					checkPwdType = "-YESDZMM";
				}else{
					checkPwdType = "";
				}
				//暂时只考虑选择电子银行 和 电话银行密码管理这两个夜业务
				if(Ext.getCmp("dzyh_shenqing").getValue() || Ext.getCmp("dzyh_chongzhi").getValue()){
					//电子银行申请业务，需要验证支付密码
					checkPwdType += "-YESZFMM";
				}else if(Ext.getCmp("dzyh_xiugai").getValue()){
					checkPwdType += "-YESDZMM";
				}
				if(Ext.getCmp("dhyh_shenqings").getValue() || Ext.getCmp("dhyh_chongzhi").getValue()){
					//电话银行申请业务，需要验证支付密码
					checkPwdType += "-YESZFMM";
				}else if(Ext.getCmp("dhyh_xiugai").getValue()){
					checkPwdType += "-YESDHMM";
				}
				
				if(Ext.getCmp("dzyh_shenqing").getValue() || Ext.getCmp("dzyh_xiugai").getValue() || Ext.getCmp("dzyh_chongzhi").getValue()){
		    		if(Ext.getCmp("DTMM_ZIYW").getValue() == "请选择" && Ext.getCmp("SJYH_ZIYW").getValue() == "请选择"){
		    			//Ext.getCmp("101311").setDisabled(false);
		    			getMsgBody4G2("M0202","P012",0,"P013","");
		    		}else{
		    			//friendShipMsg("电子银行密码管理需单独办理!");
		    			myocx.InvokeBusinessForm(9,"",222,"电子银行密码管理需单独办理!");
		    			Ext.getCmp("101311").setDisabled(false);
		    		}
		    	}else{
		    		//Ext.getCmp("101311").setDisabled(true);
		    		getMsgBody4G2("M0202","P012",0,"P013","");
		    	}
				//getMsgBody4G2("M0202","P012",0,"P013","");
			}else{
				//friendShipMsg("还未提交相应子业务,不能继续!");
				myocx.InvokeBusinessForm(9,"",222,"还未提交相应子业务,不能继续!");
				Ext.getCmp("101311").setDisabled(false); //将 电子渠道中的交易检查按钮制亮
			}
		}
		
		// 结束页面处理结果  类型 10  ----  ||9||P01201:电子银行88211错误
		if(strMessage.split("|")[7] == "10"){
			jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
			if(strMessage.split("|")[9].indexOf("P01201:") >= 0){
				Ext.getCmp("over_WY_SQ_result").setValue(strMessage.split("|")[9].split("01201:")[1]);
			}
			if(strMessage.split("|")[9].indexOf("P01202:") >= 0){
				Ext.getCmp("over_WY_XG_result").setValue(strMessage.split("|")[9].split("01202:")[1]);
			}
			if(strMessage.split("|")[9].indexOf("P01203:") >= 0){
				Ext.getCmp("over_WY_JS_result").setValue(strMessage.split("|")[9].split("01203:")[1]);
			}
			if(strMessage.split("|")[9].indexOf("P01204:") >= 0){
				Ext.getCmp("over_SJ_SQ_result").setValue(strMessage.split("|")[9].split("01204:")[1]);
			}
			if(strMessage.split("|")[9].indexOf("P01205:") >= 0){
				Ext.getCmp("over_SJ_TJ_result").setValue(strMessage.split("|")[9].split("01205:")[1]);
			}
			if(strMessage.split("|")[9].indexOf("P01206:") >= 0){
				Ext.getCmp("over_SJ_CZ_result").setValue(strMessage.split("|")[9].split("01206:")[1]);
			}
			if(strMessage.split("|")[9].indexOf("P01207:") >= 0){
				Ext.getCmp("over_SJ_ZZ_result").setValue(strMessage.split("|")[9].split("01207:")[1]);
			}
			if(strMessage.split("|")[9].indexOf("P01208:") >= 0){
				Ext.getCmp("over_SJ_ZX_result").setValue(strMessage.split("|")[9].split("01208:")[1]);
			}
			//密码管理
			if(strMessage.split("|")[9].indexOf("P01209:") >= 0 || strMessage.split("|")[9].indexOf("P01210:") >= 0 || strMessage.split("|")[9].indexOf("P01211:") >= 0){
				Ext.getCmp("over_result_dzmmgl").setValue(strMessage.split("|")[9].split("P012")[1]);
			}
			if(strMessage.split("|")[9].indexOf("P01212:") >= 0 || strMessage.split("|")[9].indexOf("P01213:") >= 0 || strMessage.split("|")[9].indexOf("P01214:") >= 0){
				Ext.getCmp("over_result_dhmmgl").setValue(strMessage.split("|")[9].split("P012")[1]);
			}
			//20140822   WYZS_code 
			if(strMessage.split("|")[9].indexOf("P01208:") >= 0){
				Ext.getCmp("over_SJ_ZX_result").setValue(strMessage.split("|")[9].split("01208:")[1]);
			}
			
		}
		//具体的值得变量
	//}  Ext.getCmp("goNext").setVisible(true);
	//受到此消息使坐席端读卡页面‘下一步’按钮制亮
	if(strMessage.split("|")[7] == "11"){
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		//Ext.getCmp("goNext").setDisabled(false);
		//friendShipMsg(strMessage.split("|")[9]);
		myocx.InvokeBusinessForm(9,"",222,strMessage.split("|")[9]);  //消息弹窗程序
		if(BussChoicType == "FUND"){
			//myocx.InvokeBusinessForm(8,"",986,"");
			jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe] 986：隐藏所有Form","INFO"));
		}else if((BussChoicType == "TZLC" || BussChoicType == "DZQD") && globalcurpage == 18){
			//myocx.InvokeBusinessForm(7,"",333,"");
			jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[ReadCardNumPage.exe] 333：最小化","INFO"));
		}
		//jsLog(logStrMsg("INFOMESSAGE:(将goNext下一步按钮致亮)","MESSAGE"));
	}
	/**
	 * 所有的投资理财业务消息
	 */
	if(strMessage.split("|")[5] == "M0204"){
		if(strMessage.split("|")[7] == "0"){
			//问卷选择消息
			//消息类型 : M0204|P014|0||4-C
			if(strMessage.split("|")[6] == "P014"){
				jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
				var a = strMessage.split("|")[9].split("-")[0];
				var b = strMessage.split("|")[9].split("-")[1];
				var data = "DA_"+a+"_"+b;
				Ext.getCmp(data).setValue(true);
				//bug 客户选择到第10题时应该将提交按钮 亮起来    --> Ext.getCmp("222").setDisabled(false);
				//。。。。
			}
		}
		//表示页面要发生跳转  hiddenLiCaiPage(1,1,21);  hiddenLiCaiPage(2,22,37);  hiddenLiCaiPage(3,38,52);
		if(strMessage.split("|")[7] == "1"){
			jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
			if(strMessage.split("|")[8] == "P01401" && strMessage.split("|")[6] == "P017"){
				synWithTerm(13,1);   
			}
			if(strMessage.split("|")[6] == "P01401" && strMessage.split("|")[8] == "P01402"){
				hiddenLiCaiPage(2,23,38);  //第一页->第二页
			}
			if(strMessage.split("|")[6] == "P01402" && strMessage.split("|")[8] == "P01403"){
				hiddenLiCaiPage(3,38,59);  //第二页->第三页
			}
			if(strMessage.split("|")[6] == "P01403" && strMessage.split("|")[8] == "P01402"){
				hiddenLiCaiPage(2,23,38);  //第三页->第二页
			}
			if(strMessage.split("|")[6] == "P01402" && strMessage.split("|")[8] == "P01401"){
				hiddenLiCaiPage(1,1,22);   //第二页->第一页
			}
			if(strMessage.split("|")[8] == "P027" && strMessage.split("|")[6] == "P032"){  //跳转到问卷评估结果页面并复制类型
				//Ext.getCmp("1020_result").setValue("客户评估问卷的结果："+strMessage.split("|")[9]);
				synWithTerm(19,1);
				//调用才C# TZLCResultFrom  并将问卷评估结果传入参数
				myocx.InvokeBusinessForm(5,"",0,strMessage.split("|")[9]);
				jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[TZLCResultForm.exe] 0：打开","INFO"));
			}
			if(strMessage.split("|")[6] == "P022" && strMessage.split("|")[8] == "P029"){
				if(BussChoicType == "FUND"){
					jsLog(logStrMsg("跳转到基金签约结果页面" ,"INFO   "));
					videostopvedio1();  //关闭签字视频
					if(strMessage.split("|")[9].indexOf("success") >= 0){
						
						updateDealStaId(conhisid_FUND, '1001');  //测试  将后台记录修改为:成功
						myocx.InvokeBusinessForm(8,"",111,"您已成功签约我行基金业务，可以随时在我行购买基金。");
						jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe] 111：打开基金结果页面","INFO"));
					}else{
						myocx.InvokeBusinessForm(8,"",111,strMessage.split("|")[9].split("lure:")[1]);
						jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe] 111：打开基金结果页面","INFO"));
					}
				}else{
					if(BussChoicType != "KJJK"){
						myocx.InvokeBusinessForm(4,"",4,"");
					}
					
					jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[CheckSignForm.exe] 4：隐藏","INFO"));
					synWithTerm(20,1);  //测试跳转到 投资理财 办理成功页面 
					if(strMessage.split("|")[9].indexOf("success") >= 0){
						updateDealStaId(conhisid_TZLC, '1001');  //测试  将后台记录修改为:成功
						Ext.getCmp("102111").setValue("您已成功开通我行投资理财业务！");
					}else{
						Ext.getCmp("102111").setValue(strMessage.split("|")[9].split("lure:")[1]);
					}
				}
				
			}//synWithTerm(15,1);
			
			if((strMessage.split("|")[8] == "P017" && strMessage.split("|")[6] == "P011") || (strMessage.split("|")[8] == "P017" && strMessage.split("|")[6] == "P010")){  //理财签约 检查交易成功之后 跳转页面
				//Ext.getCmp("goNext").setDisabled(false); //将下一步制亮
				//jsLog(logStrMsg("INFOMESSAGE:(将goNext下一步按钮致亮)","MESSAGE"));
				myocx.InvokeBusinessForm(7,"",4,"");
				synWithTerm(15,1);
			}
			//投资理财交易返回的结果；
//			if(strMessage.split("|")[6] == "P029" && strMessage.split("|")[8] == "P029"){
//				if(strMessage.split("|")[9].indexOf("success") >= 0 || strMessage.split("|")[9].indexOf("failure") >= 0){
//					Ext.getCmp("102111").setValue(strMessage.split("|")[9].split(":")[1]);
//				}
//				synWithTerm(20,1);
//			}
			if(strMessage.split("|")[8] == "P032"){   //弹窗填写手机号
				Ext.getCmp("1022222").setDisabled(true);
				synWithTerm(21,1);
			}
		}
	}
	//金额，开户日期
	if(strMessage.split("|")[5] == "M0206"){
		if(strMessage.split("|")[7] == "1"){
			if(strMessage.split("|")[8] == "P033" && strMessage.split("|")[6] == "P011"){
				//将挂失业务中所对应非文本框的辅助    姓名：cusname 身份证号： cerno
				//Ext.getCmp("goNext").setDisabled(false); //将下一步制亮
				jsLog(logStrMsg("INFOMESSAGE:(将goNext下一步按钮致亮)","MESSAGE"));
				Ext.getCmp("GS_username").setValue(cusname);
				Ext.getCmp("GS_SQ_username").setValue(cusname);
				Ext.getCmp("GS_userID").setValue(cerno);
				var time = strMessage.split("|")[9].split(",")[1];
				var money = strMessage.split("|")[9].split(",")[0];
				Ext.getCmp("GS_KH_Time").setValue(time);
				Ext.getCmp("GS_Money").setValue(money);
				//Ext.getCmp("goNext").setDisabled(false); //将下一步制亮
				synWithTerm(22,1);  //跳转到新增页面 jjgs 资料填写页面
			}
			if(strMessage.split("|")[8] == "P019"){
				synWithTerm(7,1);
				//videostartvedio1();
				//发送C#消息形式，告诉WinForm程序来调打开第二个视频
				myocx.InvokeBusinessForm(10,"",103,"");
				jsLog(logStrMsg("INFO:(发送C#消息形式，告诉WinForm程序来调打开第二个视频...)","MESSAGE"));
				//显示C#窗口
				myocx.InvokeBusinessForm(2,"",0,"");
			}
			if(strMessage.split("|")[8] == "P031"){
				if(strMessage.split("|")[9].indexOf("failure") >= 0 ){
					Ext.getCmp("102111").setValue(strMessage.split("|")[9].split("lure:")[1]);
				}else{
					Ext.getCmp("102111").setValue("您的密码挂失及改密业务办理成功！");
					if(fristBusiness > 0){
						updateDealStaId(conhisid_JJGS, '1001');  //测试  将后台记录修改为:成功
					}else{
						updateDealStaId(returnConhisID(), '1001');
					}
				}
				synWithTerm(20,1);  //跳转到最后成功页面   借记卡密码挂失
			}
		}
		//交易在打印合约之前的消息
		if(strMessage.split("|")[7] == "0"){
			if(strMessage.split("|")[8] == "P019"){
				if(strMessage.split("|")[9].indexOf("failure") >= 0){
					//friendShipMsg(strMessage.split("|")[9].split(":")[1]);
					myocx.InvokeBusinessForm(9,"",222,strMessage.split("|")[9].split(":")[1]);  //消息弹窗程序
				}
			}
		}
		//文本框赋值
		if(strMessage.split("|")[7] == "2"){
			if(strMessage.split("|")[6] == "P033"){
				if(strMessage.split("|")[9].indexOf("Loss_PhoneNumber") >= 0){
					Ext.getCmp("GS_PhoneNum").setValue(strMessage.split("|")[9].split(":")[1]);
				}
				if(strMessage.split("|")[9].indexOf("LossReason") >= 0){
					Ext.getCmp("GS_B_INFO").setValue(strMessage.split("|")[9].split(":")[1]);
				}
				if(strMessage.split("|")[9].indexOf("Loss_Address") >= 0){
					Ext.getCmp("GS_addinfo").setValue(strMessage.split("|")[9].split(":")[1]);
				}
			}
		}
		if(strMessage.split("|")[7] == "6"){
			if(strMessage.split("|")[6] == "P030"){
				if(parseInt(strMessage.split("|")[9].split(",")[0]) == 1 ){   //cus_pwd',cus_pwdinfos  cus_pwdck
					if(parseInt(strMessage.split("|")[9].split(",")[1]) >= 1 ){ //收到密码长度是1 表示开始输入密码
						var pwd="";
						//Ext.getCmp("cus_pwdinfos").setValue("正在输入借记卡密码");
						for(var i =0 ;i < parseInt(strMessage.split("|")[9].split(",")[1]) ; i++){
							pwd += "*";
						}
						//Ext.getCmp("cus_pwd").setValue(pwd);
					}else if(parseInt(strMessage.split("|")[9].split(",")[1]) == 0 ){
					//输入的密码错误时 给予提示
						//Ext.getCmp("cus_pwdinfos").setValue(strMessage.split("|")[9].split(",")[2]);
						//Ext.getCmp("cus_pwd").setValue("");
					}
				}else{
					if(parseInt(strMessage.split("|")[9].split(",")[1]) >= 1 ){ //收到密码长度是1 表示开始输入密码
						var pwd1="";
						//Ext.getCmp("cus_pwdinfos").setValue("正在确认借记卡密码");
						for(var i =0 ;i < parseInt(strMessage.split("|")[9].split(",")[1]) ; i++){
							pwd1 += "*";
						}
						//Ext.getCmp("cus_pwdck").setValue(pwd1);
					}else if(parseInt(strMessage.split("|")[9].split(",")[1]) == 0 ){
					//输入的密码错误时 给予提示
						//Ext.getCmp("cus_pwdinfos").setValue(strMessage.split("|")[9].split(",")[2]);
						//Ext.getCmp("cus_pwdck").setValue("");
					}
				}
			}
		}
	}
	
	/**
	 * 基金签约业务 选择添问卷的消息  WinForm程序
	 * @param {Object} conhisid
	 */
	if(strMessage.split("|")[5] == "M0208"){
		//jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		if(strMessage.split("|")[7] == "1"){
			if(strMessage.split("|")[6] == "P017" && strMessage.split("|")[8] == "P04101"){
				jsLog(logStrMsg("GETMESSAGE:(打开 WinForm程序的基金问卷填写页面)","MESSAGE"));
				myocx.InvokeBusinessForm(8,"",106,"");   //打开 WinForm程序的基金问卷填写页面
			}else if((strMessage.split("|")[6] == "P04101" && strMessage.split("|")[8] == "P04102") || (strMessage.split("|")[8] == "P04102" && strMessage.split("|")[6] == "P04103")){
				jsLog(logStrMsg("GETMESSAGE:(打开问卷第二页)","MESSAGE"));
				myocx.InvokeBusinessForm(8,"",992,"");   //打开问卷第二页
			}else if(strMessage.split("|")[6] == "P04102" && strMessage.split("|")[8] == "P04103"){
				jsLog(logStrMsg("GETMESSAGE:(打开问卷第三页)","MESSAGE"));
				myocx.InvokeBusinessForm(8,"",991,"");   //打开问卷第三页
			}else if(strMessage.split("|")[8] == "P04101" && strMessage.split("|")[6] == "P04102"){
				jsLog(logStrMsg("GETMESSAGE:(打开问卷第一页)","MESSAGE"));
				myocx.InvokeBusinessForm(8,"",990,"");   //打开问卷第一页
			}
			
			if(strMessage.split("|")[6] == "P041" && strMessage.split("|")[8] == "P043"){   
				//跳转到填写客户资料页
				myocx.InvokeBusinessForm(8,"",107,"");   //打开问卷第一页
			}
			if(strMessage.split("|")[6] == "P043" && strMessage.split("|")[8] == "P042"){   
				//跳转到基金问卷结果页面
				myocx.InvokeBusinessForm(8,"",108,strMessage.split("|")[9]);  
			}
			
			if(strMessage.split("|")[6] == "P022" && strMessage.split("|")[8] == "P029"){
				jsLog(logStrMsg("跳转到基金签约结果页面" ,"INFO   "));
				videostopvedio1();  //关闭签字视频
				if(strMessage.split("|")[9].indexOf("success") >= 0){
					updateDealStaId(conhisid_FUND, '1001');  //测试  将后台记录修改为:成功
					myocx.InvokeBusinessForm(8,"",111,"您已成功签约我行基金业务，可以随时在我行购买基金。");
				}else{
					myocx.InvokeBusinessForm(8,"",111,strMessage.split("|")[9].split("lure:")[1]);
				}
			}
			
			
		}
		if(strMessage.split("|")[7] == "0"){
			if(strMessage.split("|")[6] == "P041" && strMessage.split("|")[9] != "ShowSubmitButton"){
				//jsLog(logStrMsg("GETMESSAGE:(选择问卷答卷) ：" + strMessage.split("|")[9],"MESSAGE"));
				myocx.InvokeBusinessForm(8,"",989,strMessage.split("|")[9]);   //打开问卷第一页
			}else{  //当前消息表示  基金问卷已经填完10道题目，将提交按钮制亮、
				myocx.InvokeBusinessForm(8,"",984,strMessage.split("|")[9]);   //打开问卷第一页
			}
		}
		//P041
	}
	
	
	if(strMessage.split("|")[5] == "M0101"){
		jsLog(logStrMsg("GETMESSAGE:(ERROR: IS NOT M0101" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
	}
	
	
	/**
	 * 拍照 返回消息
	 * lObjectID, lItemID ,strMessage
	 */
	if(lObjectID == 8007 && lItemID == 8007){
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		saveTakeImg = strMessage;
		savepic = strMessage;
		var aa = Ext.getCmp('pic_cur');
		Ext.DomHelper.overwrite(aa.body,'<div style="margin-right:30px;margin-top:10px;"><img src="' + strMessage + '" style="width:100%;"/></div>');
		//if(savePicIndex == 0){ 
		//savepic = strMessage;
			//saveSomeFile(returnConhisID(), '2', '2', strMessage,agentno, cusname, cerno);//拍完照片立即将路径存储在数据库
			//jsLog(logStrMsg("点击拍照，后台存储图片路径成功，path:" + strMessage ,"INFO"));
			//savePicIndex ++ ;
		//}
//		if(BussChoicType == "FUND"){
//			myocx.InvokeBusinessForm(8,"",102,strMessage);   //将图片路径传输给C#
//		}
		jsLog(logStrMsg("play take a picture imgPath : " + strMessage ,"INFO"));
	}
	
	/**
	 * 联网核查异步： 返回消息
	 * lObjectID, lItemID ,strMessage
	 */
	if(lObjectID == 8008 && lItemID == 8008){
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		if(strMessage == "ERROR" || strMessage == ""){
			//checkPersonal = "needcheck";
			//核查返回ERROR...
			//需要进行补录
			if(BussChoicType == "KJJK"){
				jsLog(logStrMsg("已经过联网核查，但核查返回error，并且该笔[开借记卡]业务办理已通过拍照页面，需要进行补录"+conhisid_KJJK,"INFO   "));
				setTimeout("updateCheckPersonal("+conhisid_KJJK+",'NEEDCHECK')",3000);
			}else if(BussChoicType == "DZQD"){
				jsLog(logStrMsg("已经过联网核查，但核查返回error，并且该笔[电子渠道]业务办理已通过拍照页面，需要进行补录"+conhisid_DZQD,"INFO   "));
				setTimeout("updateCheckPersonal("+conhisid_DZQD+",'NEEDCHECK')",3000);
			}else if(BussChoicType == "TZLC"){
				jsLog(logStrMsg("已经过联网核查，但核查返回error，并且该笔[投资理财]业务办理已通过拍照页面，需要进行补录"+returnConhisID(),"INFO   "));
				setTimeout("updateCheckPersonal("+returnConhisID()+",'NEEDCHECK')",3000);
			}else if(BussChoicType == "FUND"){
				jsLog(logStrMsg("已经过联网核查，但核查返回error，并且该笔[基金签约]业务办理已通过拍照页面，需要进行补录"+returnConhisID(),"INFO   "));
				setTimeout("updateCheckPersonal("+returnConhisID()+",'NEEDCHECK')",3000);
			}
			checkERROR = true;
			jsLog(logStrMsg("Internation Check Indentity(身份) -> ERROR" ,"INFO   "));
			//告诉C#已经不用查看身份核查结果！
			myocx.InvokeBusinessForm(10,"",102,"");
		}else{
			//返回核查结果...
			jsLog(logStrMsg("Internation Check Indentity(身份) -> OK  Result:" + strMessage ,"INFO"));
			parseXmlFunc(strMessage);
		}
	}
	
	if(lItemID == 8888){
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		jsLog(logStrMsg("GETMESSAGE:("+strMessage+")","MESSAGE"));
		if(strMessage.split("|")[0] == "ukeyno"){
			//赋值ukey编号  over_WYZS_SQ_SBNum
			jsLog(logStrMsg("GETMESSAGE:(-----ukeyno2----->手机银行也新增设备号显示信息："+strMessage.split("|")[1]+")","MESSAGE"));
			Ext.getCmp("over_WYZS_SQ_SBNum").setValue(strMessage.split("|")[1]);
			Ext.getCmp("over_SJ_SQ_MACHINENUM").setValue(strMessage.split("|")[1]);
			jsLog(logStrMsg("GETMESSAGE:(-----ukeyno2----->手机银行也新增设备号显示信息："+strMessage.split("|")[1]+")OVER","MESSAGE"));
		}
	}
	
	if(lItemID == 8010){
//		if(count == 0){
			jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
			if(BussChoicType != "KJJK"){
				saveSomeFile(returnConhisID(), '88', '1', strMessage, agentno, cusname, cerno);
				jsLog(logStrMsg("INFo : 存储高清录音成功！conhisid="+returnConhisID(),"MESSAGE"));
			}
			
			
//			count = 1;
//		}
		
	}
	
	if(lItemID == 888 && lObjectID == 888){
		jsLog(logStrMsg("GETMESSAGE:(" + lObjectID + ","+ lItemID + "," + strMessage + ")","MESSAGE"));
		clearTimeout(TimeOut_flag);
		MessageCheckCode_TimeOut ++;
		if(strMessage.split(',')[0] == "SUCCESS"){
			jsLog(logStrMsg("GETMESSAGE:(验证码发送成功，请客户查收!)","MESSAGE"));
			myocx.InvokeBusinessForm(9,"",222,"验证码发送成功，请客户查收!");
		}else{
			jsLog(logStrMsg("GETMESSAGE:(验证码发送失败，错误代码："+strMessage.split(',')[1]+")","MESSAGE"));
			myocx.InvokeBusinessForm(9,"",222,"验证码发送失败，错误代码："+strMessage.split(',')[1]);
		}
		Ext.getCmp("CheckCode_btn").setDisabled(false);
	}
}
//  --   endmessage   --

/**
 * 文件检索相关
 */
var conHisId;// 联络历史ID
function saveSomeFile(conhisid, filetype, filesource, filepath, createby,cusname, crednum) {
//	alert("come in SaveSomeFile");
	try {
		// alert("saveSomeFile:" + conhisid + ","+ filetype + ","+ filesource +   B870F42B5E36
		// ","+ filepath + ","+ createby + ","+ cusname + ","+ crednum);
		Ext.Ajax.request({
					url : __ctxPath + '/customer/updateHisAndFileConHis.do',
					method : 'post',
					//async: false,
					params : {
						conHisId : conhisid,
						fileType : filetype,
						fileSource : filesource,
						filePath : filepath,
						createBy : createby,
						cusName : cusname,
						credNum : crednum,
						serialNum : dealno,
						terminalId : termno
					},
					success : function(response, options){
						jsLog(logStrMsg("SAVE-存储文件成功，输出当前座席名称：" + agentName ,"INFO"));
					},
					failure : function(response, options){
						jsLog(logStrMsg("SAVESOMEFILE ERROR FAIL THE PATH :" + filepath ,"ERROR"));
					}
				});
	} catch (e) {
		jsLog(logStrMsg("Exception happened in saveSomeFile: " + e,"ERROR"));
	}
}
/** 最后开卡成功时修改状态为conhis.dealStaId=1001 */
function updateDealStaId(conhisid, dealStaId) {
	try {
		Ext.Ajax.request({
					url : __ctxPath + '/customer/updateHisStateConHis.do',
					method : 'post',
					params : {
						conHisId : conhisid,
						dealStaId : dealStaId
					},
					success : function(response, options) {
						jsLog(logStrMsg("UpdateDealStaId — Result SUCCESS conhisid="+conhisid+"\\\dealStaid=" + dealStaId,"INFO"));
					},
					failure : function(response, options) {
						alert('update conhis fail!#id=' + conhisid);
					}
				});
	} catch (e) {
		jsLog(logStrMsg("updateDealStaId() come /customer/updateHisStateConHis.do try catch info : " + e,"ERROR"));
		//alert("Exception happened in saveSomeFile:" + e);
	}
}
/** 最后挂断电话时，将电话结束时间 */
function updateConHisETime(conhisid) {
	try {
		Ext.Ajax.request({
					url : __ctxPath + '/customer/updateETimeConHis.do',
					method : 'post',
					params : {
						conHisId : conhisid
					},
					success : function(response, options) {
						jsLog(logStrMsg("updateConHisETime — Result SUCCESS conhisid="+conhisid,"INFO"));
					},
					failure : function(response, options) {
						alert('update conhis fail!#id=' + conhisid);
					}
				});
	} catch (e) {
		jsLog(logStrMsg("updateDealStaId() come /customer/updateHisStateConHis.do try catch info : " + e,"ERROR"));
		//alert("Exception happened in saveSomeFile:" + e);
	}
}

/**
 * 身份核查补录信息，更新后台数据库
 * @param {Object}  
 * 2014/05/23  -> 07/23(实)
 * Mr.Hu
 */
function updateCheckPersonal(conhisid, remarks) {
	//alert("-----"+conhisid+"++++++"+remarks);
	try {
		Ext.Ajax.request({
					url : __ctxPath + '/customer/updateCheckPersonalConHis.do',
					method : 'post',
					//async: true,
					params : {
						conHisId : conhisid,
						remarks : remarks
					},
					success : function(response, options) {
						jsLog(logStrMsg("Console System Update CheckIndentity SUCCESS! ->conhisid="+conhisid ,"INFO   "));
					},
					failure : function(response, options) {
						jsLog(logStrMsg("Console System Update CheckIndentity Failure! ->conhisid="+conhisid ,"INFO   "));
					}
				});
	} catch (e) {
		jsLog(logStrMsg("updateCheckPersonal() catch info : " + e,"ERROR  "));
	}
}



/** 最后修改此次的业务是和类型(开卡、电子渠道：1、投资理财:2、借记卡挂失：3)*/
function updateHisBusType(conhisid, bustypeid) {
	try {
		Ext.Ajax.request({
					url : __ctxPath + '/customer/updateHisBusTypeConHis.do',
					method : 'post',
					params : {
						conHisId : conhisid,
						busTypeId : bustypeid
					},
					success : function(response, options) {
						jsLog(logStrMsg("updateHisBusType() 修改业务类型函数返回成功 conhisid=" + conhisid,"INFO"));
					},
					failure : function(response, options) {
						alert(' updateHisBusType  update conhis fail!#id=' + conhisid);
					}
				});
	} catch (e) {
		jsLog(logStrMsg("updateHisBusType() come /customer/updateHisStateConHis.do try catch info : " + e,"ERROR"));
		//alert("Exception happened in saveSomeFile:" + e);
	}

}

///**
// *  存储高清录影文件 saveWavAttach
// * 	Fernando Hu
// * 2015/3/4
// */
//function saveWavAttach(conhisid,filepath,agentid){
//	try {
//	Ext.Ajax.request({
//				url : __ctxPath + '/customer/saveWavAttachConHis.do',
//				method : 'post',
//				params : {
//					conHisId : conhisid,
//					filePath : filepath,
//					agentId : agentid
//				},
//				success : function(response, options) {
//					jsLog(logStrMsg("前台返回saveWavAttach存储高清录音文件成功 conhisid="+conhisid,"INFO"));
//				},
//				failure : function(response, options) {
//					jsLog(logStrMsg("前台返回saveWavAttach存储高清录音文件失败","INFO"));
//				}
//			});
//	} catch (e) {
//		jsLog(logStrMsg("saveWavAttach() come /customer/saveWavAttachConHis.do try catch info : " + e,"ERROR"));
//	}
//	
//}

/**
 * 存储表单回收的文件，分类存储；
 * @param {Object} id
 */
function savePrintDoc(path){
	//insertLog();
	if(Ext.getCmp("DTMM_ZIYW").getValue() == "01"){
		saveSomeFile(conhisid_DTMM_SQ, '13', '2', path, agentno, cusname, cerno);
	}else if(Ext.getCmp("DTMM_ZIYW").getValue() == "02"){
		saveSomeFile(conhisid_DTMM_XG, '13', '2', path, agentno, cusname, cerno);
	}else if(Ext.getCmp("DTMM_ZIYW").getValue() == "03"){
		saveSomeFile(conhisid_DTMM_JS, '13', '2', path, agentno, cusname, cerno);
	}
	if(Ext.getCmp("SJYH_ZIYW").getValue() == "01"){
		saveSomeFile(conhisid_SJYH_SQ, '13', '2', path, agentno, cusname, cerno);
	}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "02"){  
		saveSomeFile(conhisid_SJYH_TJ, '13', '2', path, agentno, cusname, cerno);
	}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "03"){
		saveSomeFile(conhisid_SJYH_CZ, '13', '2', path, agentno, cusname, cerno);
	}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "04"){
		saveSomeFile(conhisid_SJYH_ZZ, '13', '2', path, agentno, cusname, cerno);
	}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "05"){ 
		saveSomeFile(conhisid_SJYH_ZX, '13', '2', path, agentno, cusname, cerno);
	}
	if(Ext.getCmp("dzyh_shenqing").getValue()){
		saveSomeFile(conhisid_DZYH_SQ, '13', '2', path, agentno, cusname, cerno);
	}else if(Ext.getCmp("dzyh_xiugai").getValue()){
		saveSomeFile(conhisid_DZYH_XG, '13', '2', path, agentno, cusname, cerno);
	}else if(Ext.getCmp("dzyh_chongzhi").getValue()){
		saveSomeFile(conhisid_DZYH_CZ, '13', '2', path, agentno, cusname, cerno);
	}
	if(Ext.getCmp("dhyh_shenqings").getValue()){
		saveSomeFile(conhisid_DHYH_SQ, '13', '2', path, agentno, cusname, cerno);
	}else if(Ext.getCmp("dhyh_xiugai").getValue()){
		saveSomeFile(conhisid_DHYH_XG, '13', '2', path, agentno, cusname, cerno);
	}else if(Ext.getCmp("dhyh_chongzhi").getValue()){
		saveSomeFile(conhisid_DHYH_CZ, '13', '2', path, agentno, cusname, cerno);
	}
	// WYZS_code 2014/08/08
	if(Ext.getCmp("WYZS_ZIYW").getValue() == "01"){ 
		saveSomeFile(conhisid_WYZS_SQ, '13', '2', path, agentno, cusname, cerno);
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "02"){  
		saveSomeFile(conhisid_WYZS_TJ, '13', '2', path, agentno, cusname, cerno);
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "03"){
		saveSomeFile(conhisid_WYZS_GS, '13', '2', path, agentno, cusname, cerno);
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "04"){
		saveSomeFile(conhisid_WYZS_XE, '13', '2', path, agentno, cusname, cerno);
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "05"){ 
		saveSomeFile(conhisid_WYZS_HFQY, '13', '2', path, agentno, cusname, cerno);
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "06"){ 
		saveSomeFile(conhisid_WYZS_HFYZ, '13', '2', path, agentno, cusname, cerno);
	}
}


function saveVideo_tow(){
	if(Ext.getCmp("DTMM_ZIYW").getValue() == "01"){
		if(fristBusiness > 0){saveSomeFile(conhisid_DTMM_SQ, '5', '1', videofilePath, agentno, cusname, cerno);}              	 	 //放此处存储第一个视频路径
	}else if(Ext.getCmp("DTMM_ZIYW").getValue() == "02"){
		if(fristBusiness > 0){saveSomeFile(conhisid_DTMM_XG, '5', '1', videofilePath, agentno, cusname, cerno);}              	 	 //放此处存储第一个视频路径
	}else if(Ext.getCmp("DTMM_ZIYW").getValue() == "03"){
		if(fristBusiness > 0){saveSomeFile(conhisid_DTMM_JS, '5', '1', videofilePath, agentno, cusname, cerno);}              	 	 //放此处存储第一个视频路径
	}
	if(Ext.getCmp("SJYH_ZIYW").getValue() == "01"){
		if(c1 > 0 || fristBusiness > 0){saveSomeFile(conhisid_SJYH_SQ, '5', '1', videofilePath, agentno, cusname, cerno);}
	}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "02"){
		if(c1 > 0 || fristBusiness > 0){saveSomeFile(conhisid_SJYH_TJ, '5', '1', videofilePath, agentno, cusname, cerno);}              	 	 //放此处存储第一个视频路径
	}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "03"){
		if(c1 > 0 || fristBusiness > 0){saveSomeFile(conhisid_SJYH_CZ, '5', '1', videofilePath, agentno, cusname, cerno);}          	 	 //放此处存储第一个视频路径	
	}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "04"){
		if(c1 > 0 || fristBusiness > 0){saveSomeFile(conhisid_SJYH_ZZ, '5', '1', videofilePath, agentno, cusname, cerno);}              	 	 //放此处存储第一个视频路径	
	}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "05"){
		if(c1 > 0 || fristBusiness > 0){saveSomeFile(conhisid_SJYH_ZX, '5', '1', videofilePath, agentno, cusname, cerno);}              	 	 //放此处存储第一个视频路径	
	}
	if(Ext.getCmp("dzyh_shenqing").getValue()){
		if(c1 > 0 || c2 > 0 || fristBusiness > 0){saveSomeFile(conhisid_DZYH_SQ, '5', '1', videofilePath, agentno, cusname, cerno);}              	 	 //放此处存储第一个视频路径
	}else if(Ext.getCmp("dzyh_xiugai").getValue()){
		if(c1 > 0 || c2 > 0 || fristBusiness > 0){saveSomeFile(conhisid_DZYH_XG, '5', '1', videofilePath, agentno, cusname, cerno);}              	 	 //放此处存储第一个视频路径
	}else if(Ext.getCmp("dzyh_chongzhi").getValue()){
		if(c1 > 0 || c2 > 0 || fristBusiness > 0){saveSomeFile(conhisid_DZYH_CZ, '5', '1', videofilePath, agentno, cusname, cerno);}              	 	 //放此处存储第一个视频路径
	}
	if(Ext.getCmp("dhyh_shenqings").getValue()){
		if(c1 > 0 || c2 > 0 || c3 > 0 || fristBusiness > 0){saveSomeFile(conhisid_DHYH_SQ, '5', '1', videofilePath, agentno, cusname, cerno);}              	 	 //放此处存储第一个视频路径
	}else if(Ext.getCmp("dhyh_xiugai").getValue()){
		if(c1 > 0 || c2 > 0 || c3 > 0 || fristBusiness > 0){saveSomeFile(conhisid_DHYH_XG, '5', '1', videofilePath, agentno, cusname, cerno);}              	 	 //放此处存储第一个视频路径
	}else if(Ext.getCmp("dhyh_chongzhi").getValue()){
		if(c1 > 0 || c2 > 0 || c3 > 0 || fristBusiness > 0){saveSomeFile(conhisid_DHYH_CZ, '5', '1', videofilePath, agentno, cusname, cerno);}              	 	 //放此处存储第一个视频路径
	}
	
	//WYZS_code 2014/08/08
	if(Ext.getCmp("WYZS_ZIYW").getValue() == "01"){
		if(c1 > 0 || c2 > 0 || c3 > 0 || c4 > 0 || fristBusiness > 0){saveSomeFile(conhisid_WYZS_SQ, '5', '1', videofilePath, agentno, cusname, cerno);}
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "02"){
		if(c1 > 0 || c2 > 0 || c3 > 0 || c4 > 0 || fristBusiness > 0){saveSomeFile(conhisid_WYZS_TJ, '5', '1', videofilePath, agentno, cusname, cerno);}              	 	 //放此处存储第一个视频路径
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "03"){
		if(c1 > 0 || c2 > 0 || c3 > 0 || c4 > 0 || fristBusiness > 0){saveSomeFile(conhisid_WYZS_GS, '5', '1', videofilePath, agentno, cusname, cerno);}          	 	 //放此处存储第一个视频路径	
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "04"){
		if(c1 > 0 || c2 > 0 || c3 > 0 || c4 > 0 || fristBusiness > 0){saveSomeFile(conhisid_WYZS_XE, '5', '1', videofilePath, agentno, cusname, cerno);}              	 	 //放此处存储第一个视频路径	
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "05"){
		if(c1 > 0 || c2 > 0 || c3 > 0 || c4 > 0 || fristBusiness > 0){saveSomeFile(conhisid_WYZS_HFQY, '5', '1', videofilePath, agentno, cusname, cerno);}              	 	 //放此处存储第一个视频路径	
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "06"){
		if(c1 > 0 || c2 > 0 || c3 > 0 || c4 > 0 || fristBusiness > 0){saveSomeFile(conhisid_WYZS_HFYZ, '5', '1', videofilePath, agentno, cusname, cerno);}              	 	 //放此处存储第一个视频路径	
	}
	//saveSomeFile(id, '5', '1', videofilePath, agentno, cusname, cerno);
}
/**
 * 存储每一通电话 共同的文件路径
 */
function takeSaveSomeFiles(id){

	jsLog(logStrMsg("takeSaveSomeFiles() saveWavpath = " + saveWavpath ,"INFO"));
	jsLog(logStrMsg("takeSaveSomeFiles() picpath_copy = " + picpath_copy ,"INFO"));
	jsLog(logStrMsg("takeSaveSomeFiles() strVideoFilePath_copy = " + strVideoFilePath_copy ,"INFO"));
	jsLog(logStrMsg("takeSaveSomeFiles() savepic = " + savepic ,"INFO"));
	jsLog(logStrMsg("takeSaveSomeFiles() textTXT = " + textTXT ,"INFO"));
	
	saveSomeFile(id, '1', '1', "M" + dealno + "," + saveWavpath, agentno, cusname, cerno);	 //保存音频文件softphone
	saveSomeFile(id, '2', '2', picpath_copy, agentno, cusname, cerno);			          	 //照片
	saveSomeFile(id, '5', '1', strVideoFilePath_copy, agentno, cusname, cerno);          	 //存储第二个视频路径
	saveSomeFile(id, '2', '2', savepic,agentno, cusname, cerno);				             //照片
	saveSomeFile(id, '88', '1', saveClearWav, agentno, cusname, cerno);
	if(textTXT != ""){
		saveSomeFile(id, '99', '2', textTXT,agentno, cusname, cerno);  //判断不为空的时候，才存储核查文件
	}
	if(BussChoicType == "DZQD"){
		saveSomeFile(id, '13', '2', EBankPDFpath ,agentno, cusname, cerno);	
	}
	jsLog(logStrMsg("takeSaveSomeFiles() SUCCESS FOR conHisId:" + id ,"INFO"));
}

function insertLog(){
	jsLog(logStrMsg("CONHISID:动态密码申请:"+conhisid_DTMM_SQ ,"INFO"));//
	jsLog(logStrMsg("CONHISID:动态密码修改:"+conhisid_DTMM_XG ,"INFO"));//
	jsLog(logStrMsg("CONHISID:动态密码解锁:"+conhisid_DTMM_JS ,"INFO"));//
	jsLog(logStrMsg("CONHISID:手机银行申请:"+conhisid_SJYH_SQ ,"INFO"));//
	jsLog(logStrMsg("CONHISID:手机银行下挂:"+conhisid_SJYH_TJ ,"INFO"));//
	jsLog(logStrMsg("CONHISID:手机银行重置:"+conhisid_SJYH_CZ ,"INFO"));//
	jsLog(logStrMsg("CONHISID:手机银行转支:"+conhisid_SJYH_ZZ ,"INFO"));//
	jsLog(logStrMsg("CONHISID:手机银行注销:"+conhisid_SJYH_ZX ,"INFO"));//
	jsLog(logStrMsg("CONHISID:电子密码申请:"+conhisid_DZYH_SQ ,"INFO"));//
	jsLog(logStrMsg("CONHISID:电子密码重置:"+conhisid_DZYH_CZ ,"INFO"));//
	jsLog(logStrMsg("CONHISID:电子密码修改:"+conhisid_DZYH_XG ,"INFO"));//
	jsLog(logStrMsg("CONHISID:电话密码申请:"+conhisid_DHYH_SQ ,"INFO"));//
	jsLog(logStrMsg("CONHISID:电话密码重置:"+conhisid_DHYH_CZ ,"INFO"));//
	jsLog(logStrMsg("CONHISID:电话密码修改:"+conhisid_DHYH_XG ,"INFO"));//
	jsLog(logStrMsg("CONHISID:网银证书申请:"+conhisid_WYZS_SQ ,"INFO"));//
	jsLog(logStrMsg("CONHISID:网银证书下挂:"+conhisid_WYZS_TJ ,"INFO"));//
	jsLog(logStrMsg("CONHISID:网银证书挂失:"+conhisid_WYZS_GS ,"INFO"));//
	jsLog(logStrMsg("CONHISID:网银证书设置限额:"+conhisid_WYZS_XE ,"INFO"));//
	jsLog(logStrMsg("CONHISID:网银证书恢复启用:"+conhisid_WYZS_HFQY ,"INFO"));//
	jsLog(logStrMsg("CONHISID:网银证书恢复电子密盾验证:"+conhisid_WYZS_HFYZ ,"INFO"));//


}
/**
 * updateHisBusType(_conHisId , type);   //updateConHis
 */
function updateHis(){
	insertLog();//及日志所有子业务对应的conhisid
	if(Ext.getCmp("DTMM_ZIYW").getValue() == "01"){
		updateHisBusType(conhisid_DTMM_SQ , "1");
	}else if(Ext.getCmp("DTMM_ZIYW").getValue() == "02"){
		updateHisBusType(conhisid_DTMM_XG , "2");
	}else if(Ext.getCmp("DTMM_ZIYW").getValue() == "03"){
		updateHisBusType(conhisid_DTMM_JS , "3");
	}
	if(Ext.getCmp("SJYH_ZIYW").getValue() == "01"){
		updateHisBusType(conhisid_SJYH_SQ , "4");
	}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "02"){
		updateHisBusType(conhisid_SJYH_TJ , "5");
	}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "03"){
		updateHisBusType(conhisid_SJYH_CZ , "6");
	}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "04"){
		updateHisBusType(conhisid_SJYH_ZZ , "7");
	}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "05"){
		updateHisBusType(conhisid_SJYH_ZX , "8");
	}
	if(Ext.getCmp("dzyh_shenqing").getValue()){
		updateHisBusType(conhisid_DZYH_SQ , "13");
	}else if(Ext.getCmp("dzyh_xiugai").getValue()){
		updateHisBusType(conhisid_DZYH_XG , "14");
	}else if(Ext.getCmp("dzyh_chongzhi").getValue()){
		updateHisBusType(conhisid_DZYH_CZ , "15");
	}
	if(Ext.getCmp("dhyh_shenqings").getValue()){
		updateHisBusType(conhisid_DHYH_SQ , "16");
	}else if(Ext.getCmp("dhyh_xiugai").getValue()){
		updateHisBusType(conhisid_DHYH_XG , "17");
	}else if(Ext.getCmp("dhyh_chongzhi").getValue()){
		updateHisBusType(conhisid_DHYH_CZ , "18");
	}
	//WYZS_code  2014/08/08 
	if(Ext.getCmp("WYZS_ZIYW").getValue() == "01"){
		updateHisBusType(conhisid_WYZS_SQ , "111");
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "02"){
		updateHisBusType(conhisid_WYZS_TJ , "222");
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "03"){
		updateHisBusType(conhisid_WYZS_GS , "333");
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "04"){
		updateHisBusType(conhisid_WYZS_XE , "444");
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "05"){
		updateHisBusType(conhisid_WYZS_HFQY , "555");
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "06"){
		updateHisBusType(conhisid_WYZS_HFYZ , "666");
	}
	
	//takeSaveSomeFiles(_conHisId);
}

/**
 * takeSaveSomeFiles(_conHisId);
 */
function takeSomeFiles(){
	if(Ext.getCmp("DTMM_ZIYW").getValue() == "01"){
		if(fristBusiness > 0){takeSaveSomeFiles(conhisid_DTMM_SQ);}
	}else if(Ext.getCmp("DTMM_ZIYW").getValue() == "02"){
		if(fristBusiness > 0){takeSaveSomeFiles(conhisid_DTMM_XG);}
	}else if(Ext.getCmp("DTMM_ZIYW").getValue() == "03"){
		if(fristBusiness > 0){takeSaveSomeFiles(conhisid_DTMM_JS);}
	}
	if(Ext.getCmp("SJYH_ZIYW").getValue() == "01"){
		if(c1 > 0 || fristBusiness > 0){
			takeSaveSomeFiles(conhisid_SJYH_SQ);
		}
	}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "02"){
		if(c1 > 0 || fristBusiness > 0){
			takeSaveSomeFiles(conhisid_SJYH_TJ);
		}
	}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "03"){
		if(c1 > 0 || fristBusiness > 0){
			takeSaveSomeFiles(conhisid_SJYH_CZ);	
		}
	}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "04"){
		if(c1 > 0 || fristBusiness > 0){
			takeSaveSomeFiles(conhisid_SJYH_ZZ);	
		}
	}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "05"){
		if(c1 > 0 || fristBusiness > 0){
			takeSaveSomeFiles(conhisid_SJYH_ZX);	
		}
	}
	if(Ext.getCmp("dzyh_shenqing").getValue()){
		if(c1 > 0 || c2 > 0 || fristBusiness > 0){
			takeSaveSomeFiles(conhisid_DZYH_SQ);
		}
	}else if(Ext.getCmp("dzyh_xiugai").getValue()){
		if(c1 > 0 || c2 > 0 || fristBusiness > 0){
			takeSaveSomeFiles(conhisid_DZYH_XG);
		}
	}else if(Ext.getCmp("dzyh_chongzhi").getValue()){
		if(c1 > 0 || c2 > 0 || fristBusiness > 0){
			takeSaveSomeFiles(conhisid_DZYH_CZ);
		}
	}
	if(Ext.getCmp("dhyh_shenqings").getValue()){
		if(c1 > 0 || c2 > 0 || c3 > 0 || fristBusiness > 0){
			takeSaveSomeFiles(conhisid_DHYH_SQ);
		}
	}else if(Ext.getCmp("dhyh_xiugai").getValue()){
		if(c1 > 0 || c2 > 0 || c3 > 0 || fristBusiness > 0){
			takeSaveSomeFiles(conhisid_DHYH_XG);
		}
	}else if(Ext.getCmp("dhyh_chongzhi").getValue()){
		if(c1 > 0 || c2 > 0 || c3 > 0 || fristBusiness > 0){
			takeSaveSomeFiles(conhisid_DHYH_CZ);
		}
	}
	
	//WYZS_code  2014/08/08
	if(Ext.getCmp("WYZS_ZIYW").getValue() == "01"){
		if(c1 > 0 || c2 > 0 || c3 > 0 || c4 > 0 || fristBusiness > 0){
			takeSaveSomeFiles(conhisid_WYZS_SQ);
		}
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "02"){
		if(c1 > 0 || c2 > 0 || c3 > 0 || c4 > 0 || fristBusiness > 0){
			takeSaveSomeFiles(conhisid_WYZS_TJ);
		}
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "03"){
		if(c1 > 0 || c2 > 0 || c3 > 0 || c4 > 0 || fristBusiness > 0){
			takeSaveSomeFiles(conhisid_WYZS_GS);	
		}
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "04"){
		if(c1 > 0 || c2 > 0 || c3 > 0 || c4 > 0 || fristBusiness > 0){
			takeSaveSomeFiles(conhisid_WYZS_XE);	
		}
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "05"){
		if(c1 > 0 || c2 > 0 || c3 > 0 || c4 > 0 || fristBusiness > 0){
			takeSaveSomeFiles(conhisid_WYZS_HFQY);	
		}
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "06"){
		if(c1 > 0 || c2 > 0 || c3 > 0 || c4 > 0 || fristBusiness > 0){
			takeSaveSomeFiles(conhisid_WYZS_HFYZ);	
		}
	}
}


/**    
 * 据审核通过判断客户选择的对应业务  将分类存储在后台，并分类明细
 * 业务类型：  1->动态网银(申)  2->动态网银(修)   3->动态网银(解锁)
 * 		   4->手机银行(申)  5->手机银行(重置)  6->手机银行(下挂)
 * 		   7->手机银行(修)  8->手机银行(注销)  10->电子渠道(总)
 * 		   11->投资理财     12->密码挂失....
 * 		   13->电子银行密码(申) 14->电子银行密码(修) 15->电子银行密码(重)
 * 		   16->电话银行密码(申) 17->电话银行密码(修) 18->电话银行密码(重)
 */
function saveBusTypeConHis(){
	jsLog(logStrMsg("SAVEBUSTYPECONHIS METHOD COME IN C1="+c1+"|C2="+c2+"|C3="+c3+"|C4="+c4+"|C5="+c5 ,"INFO"));
	if(Ext.getCmp("DTMM_ZIYW").getValue() == "01"){
		if(fristBusiness > 0){
			conhisid_DTMM_SQ = callInsertData(_callinno);
			//conhisid_DTMM_SQ = conhisid_DZQD;
		}else{
			conhisid_DTMM_SQ = returnConhisID();	
		}
	}else if(Ext.getCmp("DTMM_ZIYW").getValue() == "02"){
		if(fristBusiness > 0){
			conhisid_DTMM_XG = callInsertData(_callinno);
			//conhisid_DTMM_XG = conhisid_DZQD;
		}else{
			conhisid_DTMM_XG = returnConhisID();
		}
	}else if(Ext.getCmp("DTMM_ZIYW").getValue() == "03"){
		if(fristBusiness > 0){
			conhisid_DTMM_JS = callInsertData(_callinno);
			//conhisid_DTMM_JS = conhisid_DZQD;
		}else{
			conhisid_DTMM_JS = returnConhisID();	
		}
	}
	if(Ext.getCmp("SJYH_ZIYW").getValue() == "01"){
		if(c1 == 0 && fristBusiness == 0){ 
			conhisid_SJYH_SQ = returnConhisID();
			c1 = 0;
		}else{
			conhisid_SJYH_SQ = callInsertData(_callinno);
			//conhisid_SJYH_SQ = conhisid_DZQD;
		}
	}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "02"){
		if(c1 == 0 && fristBusiness == 0){
			conhisid_SJYH_TJ = returnConhisID();
			c1 = 0;
		}else{
			conhisid_SJYH_TJ = callInsertData(_callinno);
			//conhisid_SJYH_TJ = conhisid_DZQD;
		}
	}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "03"){
		if(c1 == 0 && fristBusiness == 0){
			conhisid_SJYH_CZ = returnConhisID();
			c1 = 0;
		}else{
			conhisid_SJYH_CZ = callInsertData(_callinno);
			//conhisid_SJYH_CZ = conhisid_DZQD;
		}
	}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "04"){
		if(c1 == 0 && fristBusiness == 0){
			conhisid_SJYH_ZZ = returnConhisID();
			c1 = 0;
		}else{
			conhisid_SJYH_ZZ = callInsertData(_callinno);
			//conhisid_SJYH_ZZ = conhisid_DZQD;
		}
	}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "05"){
		if(c1 == 0 && fristBusiness == 0){
			conhisid_SJYH_ZX = returnConhisID();
			c1 = 0;
		}else{
			conhisid_SJYH_ZX = callInsertData(_callinno);
			//conhisid_SJYH_ZX = conhisid_DZQD;
		}
	}
	if(Ext.getCmp("dzyh_shenqing").getValue()){ //对电子银行密码管理选中的值判断
		if(c1 == 0 && c2 == 0 && fristBusiness == 0){
			conhisid_DZYH_SQ = returnConhisID();
			c2 = 0;
		}else{
			conhisid_DZYH_SQ = callInsertData(_callinno);
			//conhisid_DZYH_SQ = callInsertData(_callinno);
		}
	}else if(Ext.getCmp("dzyh_xiugai").getValue()){
		if(c1 == 0 && c2 == 0 && fristBusiness == 0){
			conhisid_DZYH_XG = returnConhisID();
			c2 = 0;
		}else{
			conhisid_DZYH_XG = callInsertData(_callinno);
			//conhisid_DZYH_XG = callInsertData(_callinno);
		}
	}else if(Ext.getCmp("dzyh_chongzhi").getValue()){
		if(c1 == 0 && c2 == 0 && fristBusiness == 0){
			conhisid_DZYH_CZ = returnConhisID();
		}else{
			conhisid_DZYH_CZ = callInsertData(_callinno);
			//conhisid_DZYH_CZ = callInsertData(_callinno);
		}
	}
	if(Ext.getCmp("dhyh_shenqings").getValue()){ //对电子银行密码管理选中的值判断
		if(c1 == 0 && c2 == 0 && c3 == 0 && fristBusiness == 0){
			conhisid_DZYH_SQ = returnConhisID();
		}else{
			conhisid_DHYH_SQ = callInsertData(_callinno);
			//conhisid_DHYH_SQ = callInsertData(_callinno);
		}
	}else if(Ext.getCmp("dhyh_xiugai").getValue()){
		if(c1 == 0 && c2 == 0 && c3 == 0 && fristBusiness == 0){
			conhisid_DHYH_XG = returnConhisID();
		}else{
			conhisid_DHYH_XG = callInsertData(_callinno);
			//conhisid_DHYH_XG = callInsertData(_callinno);
		}
	}else if(Ext.getCmp("dhyh_chongzhi").getValue()){
		if(c1 == 0 && c2 == 0 && c3 == 0 && fristBusiness == 0){
			conhisid_DHYH_CZ = returnConhisID();
		}else{
			conhisid_DHYH_CZ = callInsertData(_callinno);
			//conhisid_DHYH_CZ = callInsertData(_callinno);
		}
	}
	// WYZS_code  2014/08/08
	if(Ext.getCmp("WYZS_ZIYW").getValue() == "01"){ //对电子银行密码管理选中的值判断
		if(c1 == 0 && c2 == 0 && c3 == 0 && c4 == 0 && fristBusiness == 0){
			conhisid_WYZS_SQ = returnConhisID();
		}else{
			conhisid_WYZS_SQ = callInsertData(_callinno);
		}
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "02"){
		if(c1 == 0 && c2 == 0 && c3 == 0 && c4 == 0  && fristBusiness == 0){
			conhisid_WYZS_TJ = returnConhisID();
		}else{
			conhisid_WYZS_TJ = callInsertData(_callinno);
		}
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "03"){
		if(c1 == 0 && c2 == 0 && c3 == 0 && c4 == 0  && fristBusiness == 0){
			conhisid_WYZS_GS = returnConhisID();
		}else{
			conhisid_WYZS_GS = callInsertData(_callinno);
		}
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "04"){
		if(c1 == 0 && c2 == 0 && c3 == 0 && c4 == 0 && fristBusiness == 0){
			conhisid_WYZS_XE = returnConhisID();
		}else{
			conhisid_WYZS_XE = callInsertData(_callinno);
		}
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "05"){
		if(c1 == 0 && c2 == 0 && c3 == 0 && c4 == 0 && fristBusiness == 0){
			conhisid_WYZS_HFQY = returnConhisID();
		}else{
			conhisid_WYZS_HFQY = callInsertData(_callinno);
		}
	}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "06"){
		if(c1 == 0 && c2 == 0 && c3 == 0 && c4 == 0 && fristBusiness == 0){
			conhisid_WYZS_HFYZ = returnConhisID();
		}else{
			conhisid_WYZS_HFYZ = callInsertData(_callinno);
		}
	}
	
	return;
}

function changeCallflag(flag,endTime,callid) {
	jsLog(logStrMsg("座席挂断电话输出gchangecallflag() --> callID = "+callid,"INFO"));
	closecallflag = flag;
	myocx.AgentSetVoiceReleaseInfo(endTime);   	//告诉曲晓挂断事件
}

var saveWavpath="";
var startT = "";
var saveWavfail="false";
function saveWav(filepath,starTime) {   //此处弹屏慢时会导致收不到消息 Video -> 调用曲晓控件
	jsLog(logStrMsg("INFo:(111 saveWav --> filepath = "+filepath,"MESSAGE"));
	if(saveWavfail == "false"){
		if(filepath.indexOf("wav") >= 0){
			jsLog(logStrMsg("INFo:(录音文件已经存在wav后缀名，无需添加...)","MESSAGE"));
		}else{
			jsLog(logStrMsg("INFo:(录音文件没有后缀名wav需添加...)","MESSAGE"));
			filepath = filepath + ".wav";
		}
		//将后缀名更改为MP3格式
		filepath = filepath.split('.wav')[0] + ".mp3";
	}
	
	jsLog(logStrMsg("C# --> getDealNo = "+dealno,"TEXT"));
	jsLog(logStrMsg("INFo:(saveWav --> dealno"+dealno+"filepath = "+filepath,"MESSAGE"));
	saveWavpath = filepath;
	startT = starTime;
	//alert("dealno:"+dealno);
	//alert("filepath"+filepath);
	saveWavfail="false";
	jsLog(logStrMsg("***phoneNum = " +phoneNum　+ "   username = " + curUserInfo_1.username,"MESSAGE"));
	if(dealno ==""){
		saveWavpath=filepath;
		saveWavfail="true";
	}else{
		try {
			//alert("filepath"+filepath);
			myocx.AgentSetVoiceInfo(startT + "," + dealno + "," + callinId + "," + filepath + "," + phoneNum + "," + curUserInfo_1.username); 			 // 传给曲晓.
			jsLog(logStrMsg("INFo:(myocx.AgentSetVoiceInfo)","MESSAGE"));
		} catch (e) {
			jsLog(logStrMsg("SaveWav method try catch of [dealno:"+dealno+"] [callinId:"+callinId+"] [filepath:"+filepath+"]","ERROR"));
			//alert(dealno + "," + callinId + "," + filepath + "\n" + e);
		}
		jsLog(logStrMsg("INFo:(dealno 存储录音前的流水号："+dealno+"filepath = "+filepath+")","MESSAGE"));
		saveSomeFile(returnConhisID(), '1', '1', "M" + dealno + "," + filepath, agentno, cusname, cerno);// 保存音频文件softphone
		jsLog(logStrMsg("INFo:(保存录音文件方法成功)","MESSAGE"));
	}
}

/** 弹屏时没客户信息，所以暂时不存。刷身份证后存储 */
var videofilePath = "";
var strVideoFilePath_copy="";
function Regvideofilesucc(lCamaraIndex, strVideoFilePath) {
	jsLog(logStrMsg(" Regvideofilesucc(lCamaraIndex="+lCamaraIndex+", strVideoFilePath="+strVideoFilePath+")","INFO"));
	if(strVideoFilePath.split("_")[6].split(".")[0] == "1"){strVideoFilePath_copy = strVideoFilePath;}
	if(strVideoFilePath.split("_")[6].split(".")[0] == "0"){videofilePath = strVideoFilePath;}
	if(BussChoicType != "KJJK"){
		saveSomeFile(returnConhisID(), '5', '1', strVideoFilePath, agentno, cusname, cerno);
		jsLog(logStrMsg("SAVE VIDEO OK FILES FRIST conhisid : " + returnConhisID() +"  path : " + strVideoFilePath,"INFO"));
	}
	
	//parseInt - 1 
}

function Regvideofilefail(lCamaraIndex, strVideoFilePath) {
	jsLog(logStrMsg(" Regvideofilefail(lCamaraIndex="+lCamaraIndex+", strVideoFilePath="+strVideoFilePath+")","INFO"));
}
// 自动触发
function VtmAgentInit(t,s) {

	jsLog(logStrMsg("VTM AgentInit Begin , param (t="+t+",s="+s+")","INFO"));
	if(t == "T022"){
		jsLog(logStrMsg("判断当前呼入的VTM设备是否是T022？若是T022便将基金业务按钮变为可选择","INFO"));
		YesOrNo_FUND = "yes";
	}
	/** 视频控件 */
	if (!dev_mode) {
		//alert("VtmAgentInit function begin ...");
		agentinit();// 初始化连接server
		//放入此处视频存储方法
		jsLog(logStrMsg("如果allOcxInclude等于1将存储第一个主视频! allOcxInclude="+allOcxInclude,"INFO"));
		if (allOcxInclude == 1) {
			
		}
		allOcxInclude++;
		agentmakecall(t,s);// 初始化连接终端
	}
}

/**************************************清空数据***********************************************
 * 但关闭弹屏页面之后将所有要清空的数据在此函数中清除 空 
 * @class CusPersonalFormCallin
 * @extends Ext.Panel
 */
function resetData(){
	globalcurpage = 0;
	YesOrNo_FUND = "";   //是否是基金业务？
	count = 0;			//重置关闭做、index.jsp中的左侧栏函数
	closecallflag = 0;  //重置
	checkSF = 0 ;       //点击身份核查按钮记录  重置
	totalBussines = "one";
	card = "";          //总显示
	rememberBuss = 0;   //清空--变量
	rememberScanCard = 0;
	checkPwdType = "";  //清空验证密码类型
	fristBusiness = 0;  //重置是否是第一次呼入业务
	checkbox_KJJK = false;
	checkbox_DZQD = false;
	checkbox_TZLC = false;
	checkbox_JJGS = false;
	
	NotPaper = "True";
	
	dtmm_sq = ""; dtmm_xg = ""; dtmm_js = "";
	sjyh_sq = ""; sjyh_tj = ""; sjyh_cz = ""; sjyh_zz = ""; sjyh_zx = "";
	dzyh_sq = false; dzyh_xg = false; dzyh_cz = false; 
	dhyh_sq = false; dhyh_xg = false; dhyh_cz = false; 
	c1 = 0 ;
	c2 = 0 ;
	c3 = 0 ;
	c4 = 0 ;
	c5 = 0 ;
	goNextYN = 0;  //次变量用来判断是否有没有填写的问卷题目
	agentprints = ""; 
	cardNumber = "";  //清空卡号变量
	strCallMessage_1 = "";
	savePicIndex = 0;
	
	textCont_PY = "A";
	textCont_SJ = "B";
	textCont_call = "C";
	textCont_qucall = "D";
	textCont_YB = "E";
	textCont_EM = "F";
	textCont_DW = "J";
	textCont_XX = "H";

	wyzs_sq = "";
	wyzs_xg = "";
	wyzs_gs = "";
	wyzs_xe = "";   //限额变量
	wyzs_hfqy = ""; //恢复启用
	wyzs_hfyz = "";
	
	checkretInfo = "";   //清空身份核查的返回的字符串值
	checkClick = false;  //将查看审核结果 按钮标记事件还原
	checkERROR = false;  //将联网核查是否是ERROR还原
	clickFlag = false; 
	saveTakeImg = "";
	
	textTXT = ""; // 身份核查txt文件路径 - 清空
	
	conhisid_DTMM_SQ = ""; conhisid_DTMM_XG = ""; conhisid_DTMM_JS = "";
	conhisid_SJYH_SQ = ""; conhisid_SJYH_TJ = ""; conhisid_SJYH_CZ = ""; conhisid_SJYH_ZZ = "";  conhisid_SJYH_ZX = "";
	conhisid_DZYH_SQ = ""; conhisid_DZYH_CZ = ""; conhisid_DZYH_XG = ""; 
	conhisid_DHYH_SQ = ""; conhisid_DHYH_CZ = ""; conhisid_DHYH_XG = "";
	conhisid_WYZS_SQ = ""; conhisid_WYZS_TJ = ""; conhisid_WYZS_GS = "";conhisid_WYZS_XE = ""; conhisid_WYZS_HFQY = ""; conhisid_WYZS_HFYZ = "";
	
	//----2016/1/25 重置变量----
	ZYW_DTWY_OK = 0; ZYW_SJYH_OK = 0; ZYW_DZMM_OK = 0; ZYW_DHMM_OK = 0; ZYW_WYZS_OK = 0;
}

//***************************************************************************************** //TODO 成员变量和局部变量的分界线

CusPersonalFormCallin = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		
		Ext.applyIf(this, _cfg);
		arr = _cfg.split(',');
		//alert(arr[2]);
		isConn = 0;
		isCheckID = 0;

		agentno = "";
		agcallno = "";
		agsite = "";

		termno = "";
		termsite = "";

		savepicDir = "";
		tmid = "";
		site = "";
		videoip = "";
		port = "";

		dealno = "";
		callinId = 0;

		globalcurpage = 0;
		isManaged = 0;
		closecallflag = 0;
		isSavepic = 0;


		data = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "","", ""];
		arrCheck = new Array(2);// 缓存索引。;
		idinfos = '';
		cusname = "";
		cerno = "";
		savepic = "";
		scanfp = "";// "E:\\tempfile\\411325198712205037bob.bmp";

		this.customerId = arr[0];
		this.numberPhone = arr[1];
		/**
		 * *依据电话号码映射终端设备号，替换头为T。2001--> T001。注意在弹屏时生成conhis，那里也保存了termno = "T" +
		 * (arr[1] + "").substring(1);
		 */
		// alert("T" + "2001".substring(1));
		termno = "T" + (arr[1] + "").substring(1);
		termsite = "S" + (arr[1] + "").substring(1);
		callinId = arr[6];
		// alert(_cfg, callinId);
		conHisId = arr[2];
		agentParam();// 配置文件中获取坐席参数
		if (this.customerId == 'null') {
			this.customerId = -1;
		}
		// 必须先初始化组件
		this.initUIComponents();
		// alert("init end!");
		CusPersonalFormCallin.superclass.constructor.call(this,{
					id : 'CusPersonalFormCallinWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					region : 'center',
					title : '来电弹屏',
					iconCls : 'server_go',
					listeners : {
						'beforeclose' :  function(p){
							if(closecallflag == 0) {
								alert("请先挂断电话！");
								return false;
							} else if(closecallflag == 1){
//								if(!window.confirm("确认关闭弹屏页面吗?")){
//									return false;
//								}else{
//									setMyocxInfo(1,"");setMyocxInfo(0,"");
//									resetData(); //重置数据变量
//									jsLog(logStrMsg("结束业务办理  totalBussines : " + totalBussines ,"MAIN"));
//									return true;
//								}
								
								setMyocxInfo(1,"");setMyocxInfo(0,"");
								resetData(); //重置数据变量
								updateConHisETime(returnConhisID());
								jsLog(logStrMsg("结束业务办理  totalBussines : " + totalBussines ,"MAIN"));
								return true;
							}
						}
					}
				});
		//  自动触发视频初始化连接操作。
		// setTimeout("win_l                oad()", 2500);
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		// 联系方式
		this.gridPanel_contact = new HT.EditorGridPanel({
			region : 'center',
			showPaging : false,
			showSm : false,
			clicksToEdit : 1,
			showNum : false,
			tbar : ['->', {
				iconCls : 'btn-save',
				text : '保存',
				xtype : 'button',
				scope : this,
				handler : function() {
					var params = [];
					var grid = this.gridPanel_contact;
					var store = grid.getStore();
					for (var i = 0; i < store.getCount(); i += 1) {
						var record = store.getAt(i);
						if (record.dirty) {
							params.push(record.data);
						}
					}
					if (params.length == 0) {
						Ext.ux.Toast.msg('信息', '没有对数据进行任何更改');
						return ;
					}
					Ext.Ajax.request({
								method : 'post',
								url : __ctxPath
										+ '/customer/mulSaveCusContact.do?customerId='
										+ this.customerId,
								params : {
									data : Ext.encode(params),
									customerId:this.customerId
								},
								success : function(request){
									Ext.ux.Toast.msg('操作信息', '成功设置');
									store.reload();
									// this.gridPanel_contact.getStore().reload();
								},
								failure : function(request) {
									Ext.ux.Toast.msg('操作信息', '设置出错，请联系管理员!');
								}
							});
				}
			}, '->', {
				iconCls : 'btn-add',
				text : '添加',
				xtype : 'button',
				scope : this,
				handler : this.createRs_contact
			}],
			autoHeight : false,
			height : 150,
			id : 'UlContactGrid_empl',
			url : __ctxPath + "/customer/listByCusIdCusContact.do?customerId="
					+ this.customerId,
			fields : [{
						name : 'contactId',
						type : 'int'
					}, 'cusContact', 'contactTypeId', 'contactSubTypeId',
					'preContactNum', 'mainContactNum', 'lastContactNum',
					'isDefault', 'isChecked', 'contactRemarks', 'createTime',
					'lastUpdateTime', 'statusId'],
			columns : [{
						header : '内码',
						dataIndex : 'contactId',
						hidden : true
					},{
						header : '联络方式',
						dataIndex : 'contactTypeId',
						editor : new Ext.form.ComboBox({
							name : 'cusContact.contactTypeId',
							allowBlank : false,
							id : 'cusContact.contactTypeId',
							displayField : 'itemName',
							valueField : 'itemId',
							mode : 'local',
							triggerAction : 'all',
							forceSelection : false,
							hiddenName : 'cusContact.contactTypeId',
							store : new Ext.data.SimpleStore({
								url : __ctxPath
										+ '/system/loadItemDictionary.do',
								baseParams : {
									itemName : '联络方式'
								},
								fields : ['itemId', 'itemName'],
								autoLoad : true,
								method : "post",
								listeners : {
									load : function(){
										var combo = Ext.getCmp('cusContact.contactTypeId');  
										var store = combo.getStore();
										var rows = [];// 定义数组
										for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
											if (store.getAt(i).data['itemId'] == combo.getValue()) {
												combo.setValue(store.getAt(i).data['itemName']);
												break;
											}
										}
									}
								}
							})
						}),
						renderer : function(value) {
							if (value != null) {
								return LXFS001.get(value);
							} else {
								return ' ';
							}
						}
					}, {
						header : '地址/号码',
						dataIndex : 'mainContactNum',
						editor : new Ext.form.TextField({
									allowBlank : false,
									id : 'mainContactNum'
								})
					}, {
						header : '状态',
						dataIndex : 'statusId',
						editor : new Ext.form.ComboBox({
							name : 'cusPersonal.statusId',
							allowBlank : false,
							id : 'cusPersonal.statusId',
							displayField : 'itemName',
							valueField : 'itemId',
							mode : 'local',
							triggerAction : 'all',
							forceSelection : false,
							hiddenName : 'cusPersonal.statusId',
							store : new Ext.data.SimpleStore({
								url : __ctxPath
										+ '/system/loadItemDictionary.do',
								baseParams : {
									itemName : '是否'
								},
								fields : ['itemId', 'itemName'],
								autoLoad : true,
								method : "post",
								listeners : {
									load : function() {
										var combo = Ext.getCmp('cusPersonal.statusId');
										var store = combo.getStore();
										var rows = [];// 定义数组
										for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
											if (store.getAt(i).data['itemId'] == combo.getValue()) {
												combo.setValue(store.getAt(i).data['itemName']);
												break;
											}
										}
									}
								}
							})
						}),
						renderer : function(value) {
							if (value != null) {
								return YorN.get(value);
							} else {
								return ' ';
							}
						}
					}]
				// end of columns
		});

		// 联络历史
		this.gridPanel_contacthistory = new HT.EditorGridPanel({
			region : 'center',
			autoHeight : false,
			id : 'gridPanel_contacthistoryPanel',
			clicksToEdit : 1,
			url : __ctxPath
					+ "/customer/listConHis.do?Q_customer.customerId_L_EQ="
					+ this.customerId,
			fields : [{
						name : 'conHisId',
						type : 'int'
					},'contactTypeId', 'dirId', 'staTime', 'ownerId',
					'busTypId', 'conResId', 'dealStaId'],
			columns : [{
						header : '内码',
						dataIndex : 'conHisId',
						hidden : true
					 },{
						header : '联络方式',
						dataIndex : 'contactTypeId',
						editor : new Ext.form.ComboBox({
							name : 'cusContact.contactTypeId',
							allowBlank : false,
							id : 'cusContact.contactTypeId',
							displayField : 'itemName',
							valueField : 'itemId',
							mode : 'local',
							triggerAction : 'all',
							forceSelection : false,
							hiddenName : 'cusContact.contactTypeId',
							store : new Ext.data.SimpleStore({
								url : __ctxPath
										+ '/system/loadItemDictionary.do',
								baseParams : {
									itemName : '联系方式'
								},
								fields : ['itemId', 'itemName'],
								autoLoad : true,
								method : "post",
								listeners : {
									load : function() {
										var combo = Ext.getCmp('cusContact.contactTypeId');
										var store = combo.getStore();
										var rows = [];// 定义数组
										for (var i = 0; i < store.getCount(); i++) { // store.getCount()为store的长度
											if (store.getAt(i).data['itemId'] == combo.getValue()) {
												combo.setValue(store.getAt(i).data['itemName']);
												break;
											}
										}

									}
								}
							})
						}),
						renderer : function(value) {
							if (value != null) {
								return LXFS001.get(value);
							} else {
								return ' ';
							}
						}
					}, {
						header : '方向',
						dataIndex : 'dirId',
						renderer : function(value) {
							return CONFX002.get(value);
						}

					}, {
						header : '联络时间',
						dataIndex : 'staTime',
						editor : new Ext.form.TextField({
									allowBlank : false,
									id : 'createTime'
								})
					}, {
						header : '负责人',
						dataIndex : 'ownerId'
					}, {
						header : '联络事项',
						dataIndex : 'busTypId',
						renderer : function(value) {
							return CONLLSX.get(value);
						}
					}, {
						header : '联络结果',
						dataIndex : 'conResId',
						renderer : function(value) {
							return CONLLJG.get(value);
						}
					}, {
						header : '联络状态',
						dataIndex : 'dealStaId',
						renderer : function(value) {
							return CONCLZT.get(value);
						}
					}]
				// end of columns
		});
		// 服务历史
		this.gridPanel_fuwuhistory = new HT.GridPanel({
			id : 'gridPanel_fuwuhistoryPanel',
			region : 'center',
			autoHeight : false,
			url : __ctxPath
					+ "/customer/listServiceRequestConServiceRequest.do",
			baseParams : {
				'customerId' : this.customerId
			},
			fields : [{
						name : 'serviceRequestId',
						type : 'int'
					}, 'type', 'source', 'starttime', 'accept', 'accept',
					'customer.customerName', 'status', 'endtime'],
			columns : [{
						header : '服务类型',
						dataIndex : 'type',
						renderer : function(value) {
							return CR_TYPE.get(value);
						}
					}, {
						header : '来源',
						dataIndex : 'source',
						renderer : function(value) {
							return CONLYLB.get(value);
						}
					}, {
						header : '处理时间',
						dataIndex : 'starttime',
						editor : new Ext.form.TextField({
									allowBlank : false,
									id : 'starttime'
								})
					}, {
						header : '处理人',
						dataIndex : 'accept'
					}, {
						header : '处理对象',
						dataIndex : 'customer.customerName'
					}, {
						header : '状态',
						dataIndex : 'status',
						renderer : function(value) {
							return CONTPCLJG.get(value);
						}
					}, {
						header : '完成时间',
						dataIndex : 'endtime'
					}]
				// end of columns
			});

		// 开卡设定
		var i = 0;

		function cardHandler(direction) {
			i = isConn == 1 ? globalcurpage : i;  //从当前也开始上下移动。
			if (direction == -1) {
				i--;
				if (i < 0) {
					i = 0;
				}
			}
			if (direction == 1) {
				i++;
			}
			globalcurpage = i;
			this.cardActionPanel.getLayout().setActiveItem(i);
		};

		this.buttongrps = new Ext.ButtonGroup({
					title : 'btns',
					items : [{
								xtype : 'button',
								text : '上一步',
								handler : cardHandler
										.createDelegate(this, [-1])
							}, {
								xtype : 'button',
								text : '下一步',
								handler : cardHandler.createDelegate(this, [1])
							}, {
								xtype : 'button',
								text : '坐席输入',
								handler : function() {
									//manage('100501', false);
								}

							}, {
								xtype : 'button',
								text : '客户输入',
								handler : function() {
									//manage('100501', true);
								}
							}]
				});
		
				this.viewPanl = new Ext.Panel({     	//TODO viewpanl业务办理菜单
							title:'<font style="color:#bf1919">业务办理菜单</font>>卡选择>身份核实>开户章程>客户资料>客户签字>审核客户资料>附加设置>开卡完成',
							layout:"column",
							id : '1000',// 页码标签从1000开始
							width:1000,
							height:100,
							autoScroll : true,
							items:[]  
						});
				
				this.viewPanl2 = new Ext.Panel({     	//TODO viewpanl2业务办理菜单
							title:'<font style="color:#bf1919">业务办理菜单</font>>卡选择>身份核实>开户章程>客户资料>客户签字>审核客户资料>附加设置>开卡完成',
							layout:"column",
							id : '1008',// 页码标签从1000开始
							width:1000,
							height:100,
							autoScroll : true,
							items:[]  
						});
				//title:'<font style="color:#bf1919">业务办理菜单</font>>卡选择>身份核实>开户章程>客户资料>客户签字>审核客户资料>附加设置>开卡完成',




/********
 * 是否点击”身份核查“按钮函数
 * */
function checkSFyesorno(){
	var win = new Ext.Window({
			width : 500,
			title : '友情提示',
			height : 200,
			html : '<font style="font-size:28px;color:red"><br>&nbsp;&nbsp;&nbsp;&nbsp您还未进行联网核查，是否继续？</font>',
			modal : true,
			buttonAlign : 'center',
			buttons : [{
				text : '<font style="font-size:16px;margin-top:0px">继续</font>',
				width : 60,
				height : 30,
				handler : function() {
					rememberBuss = 1;   //作为标记证明此次通话已扫描过客户证件
					//synWithTerm(12,1);
					isSavepic = 0;
					if(BussChoicType != "FUND"){
						confirmCusInfos();
					}
					if(totalBussines == "two"){
						ReadZC(0);
					}
					
					//证明该笔业务没有点击联网核查，需要修改-〉补录标记   Check_Indentity  2014/7/24
					if(BussChoicType == "KJJK"){
						jsLog(logStrMsg("未经过联网核查，并且该笔[开借记卡]业务办理已通过拍照页面，需要进行补录"+conhisid_KJJK,"INFO   "));
						setTimeout("updateCheckPersonal("+conhisid_KJJK+",'NEEDCHECK')",3000);
					}else if(BussChoicType == "DZQD"){
						jsLog(logStrMsg("未经过联网核查，并且该笔[电子渠道]业务办理已通过拍照页面，需要进行补录"+conhisid_DZQD,"INFO   "));
						setTimeout("updateCheckPersonal("+conhisid_DZQD+",'NEEDCHECK')",3000);
					}else if(BussChoicType == "TZLC"){
						jsLog(logStrMsg("未经过联网核查，并且该笔[投资理财]业务办理已通过拍照页面，需要进行补录"+returnConhisID(),"INFO   "));
						setTimeout("updateCheckPersonal("+returnConhisID()+",'NEEDCHECK')",3000);
					}else if(BussChoicType == "FUND"){
						jsLog(logStrMsg("未经过联网核查，并且该笔[投资理财]业务办理已通过拍照页面，需要进行补录"+returnConhisID(),"INFO   "));
						setTimeout("updateCheckPersonal("+returnConhisID()+",'NEEDCHECK')",3000);
					}
					//-------------------------------------
					//Ext.getCmp("bulu").setDisabled(true);
					checkClick = true;
					jsLog(logStrMsg("Take Photo Click Sure_Button show -> checkClick="+checkClick,"INFO   ")); //记录日志
					
					jsLog(logStrMsg("[No CheckIndentity]Ready Save Pic -> begin  _ savepic = "+savepic,"INFO   ")); //记录日志
					saveSomeFile(returnConhisID(), '2', '2', savepic,agentno, cusname, cerno);//拍完照片立即将路径存储在数据库
					jsLog(logStrMsg("[No CheckIndentity]Save Pic OK -> Over  _ savepic = "+savepic,"INFO   ")); //记录日志
					
					win.close();
				}
			},{
				text : '<font style="font-size:16px;margin-top:0px">取消</font>',
				width : 60,
				height : 30,
				handler : function() {
					if(BussChoicType == "FUND"){
						myocx.InvokeBusinessForm(8,"",985,"");   //打开当前所在的WinForm流程
					}
					win.close();
				}
			}]
		});
		win.show();
}







/**********************************<<校验综合页面文本框信息>>*******************************
 * @param1: str 内容
 * @param2: type 内容类型  1:表示手机号数字类型； 2：字符串类型;
 * @param3: busType 业务类型；
 * @param4: suBusType 子业务选择项
 */
function check_zh_date(str,type,busType,suBusType){
	if(busType == "DTMM"){
		if(suBusType == ""){
			Ext.getCmp("check_ZH_info").setValue("请选择子业务项...");
		}else if(suBusType == "01"){
			if(str.split("|")[0].length != 11){
				Ext.getCmp("check_ZH_info").setValue("绑定手机号必须为11位");
			}else{
				Ext.getCmp("check_ZH_info").setValue("");
			}
		}else if(suBusType == "02"){
			if(str.split("|")[1].length != 11 && str.split("|")[2].length != 11){
				Ext.getCmp("check_ZH_info").setValue("原手机号必须为11位!//新手机号必须为11位!");
			}else if(str.split("|")[1].length != 11){
				Ext.getCmp("check_ZH_info").setValue("原手机号必须为11位!");
			}else if(str.split("|")[2].length != 11){
				Ext.getCmp("check_ZH_info").setValue("新手机号必须为11位!");
			}else{
				Ext.getCmp("check_ZH_info").setValue("");
			}
		}else if(suBusType == "03"){
			if(str.split("|")[1].length != 11){
				Ext.getCmp("check_ZH_info").setValue("原手机号必须为11位!");
			}else{
				Ext.getCmp("check_ZH_info").setValue("");
			}
		}
	}else if(busType == "SJYH"){
		if(suBusType == ""){
			Ext.getCmp("check_ZH_info").setValue("请选择子业务项...");	
		}else if(suBusType == "01" || suBusType == "02"){
			if(str.toString().length != 11){
				Ext.getCmp("check_ZH_info").setValue("绑定手机号必须为11位!");
			}else{
				Ext.getCmp("check_ZH_info").setValue("");
			}
		}
	}
}


/**************************<<提交校验的数据.友情提示>>*********************************
 * 提交校验的数据
 */
function takePrintYN(msg){
	var win = new Ext.Window({
				width : 520,
				title : '友情提示',
				height : 180,
				html : '<font style="font-size:24px;color:red;"><br>&nbsp;&nbsp;&nbsp;&nbsp是否确定打印《'+msg+'》？</font>',
				modal : true,
				buttonAlign : 'center',
				buttons : [{
					text : '<font style="font-size:16px;margin-top:0px">是</font>',
					width : 60,
					height : 30,
					handler : function() {
						/***
						//提交当前的数据之后，设计方案是否存入一个变量里面，发送消息给VTM端；但是当两张卡，每个卡选择业务不一致时，就会考虑到是否用两个变量，这样增加了代码负重；
						//首先判断提交的数据是‘动态密码’的数据还是‘手机银行’的数据
						//动态密码 ：1：两个卡号办理同样的业务；发送一个字符串消息“str|busType(业务类型)|phoneNum|oldNum|newNum”
						//手机银行 : 
						if(Ext.getCmp("check_" + type).getValue() == ""){
							//会判断传入的type是DTMM还是SJYH；将分别记录对应的数据
							Ext.ux.Toast.msg('操作信息', '提交信息成功!');
						}else{
							Ext.ux.Toast.msg('操作信息', '您提交的数据有误，请确认后提交!');  
						}
						*/
						     if(Ext.getCmp("leixin").getValue() == "01" || Ext.getCmp("leixin").getValue() == "理财问卷"){
								getMsgBody4G2("","",5,"","LC");
							}else if(Ext.getCmp("leixin").getValue() == "02"){
								getMsgBody4G2("","",5,"","JJ");
							}else if(Ext.getCmp("leixin").getValue() == "0201"){
								getMsgBody4G2("","",5,"P019","type_JJ_Result");
								videostartvedio1();// 第二个视频。
							}else if(Ext.getCmp("leixin").getValue() == "03"){
								getMsgBody4G2("","",5,"P019","type_JJ");
								videostartvedio1();// 第二个视频。
							}else if(Ext.getCmp("leixin").getValue() == "04"){
								getMsgBody4G2("","",5,"P019","type_JQ");
								videostartvedio1();// 第二个视频。
							}else if(Ext.getCmp("leixin").getValue() == "05"){
								getMsgBody4G2("","",5,"P019","type_PH");
								videostartvedio1();// 第二个视频。
							}else if(Ext.getCmp("leixin").getValue() == "06"){
								getMsgBody4G2("","",5,"P019","type_WJ");
								videostartvedio1();// 第二个视频。
							}else if(Ext.getCmp("leixin").getValue() == "07"){
								getMsgBody4G2("","",5,"P019","type_JS");
								videostartvedio1();// 第二个视频。
							}else{
								alert("请选择打印内容!");
							}
						win.close();
					}
				},{
					text : '<font style="font-size:16px;margin-top:0px">否</font>',
					width : 60,
					height : 30,
					handler : function() {
						win.close();
					}
				}]
			});
			win.show();
}		
		jsLog(logStrMsg("开始加载callIn页面中this.cardActionPanel元素","INFO"));
//========================================= CARD总面板 =========================================
		this.cardActionPanel = new Ext.Panel({
			layout : 'card',
			border : false,
			activeItem : 0,
			id : 'cardpanel',
			heigth : 540,
			tbar : [{
					xtype : 'combo',
					mode : 'local',
					hidden : false,
					editable : false,
					triggerAction : 'all',
					store : [['01', '[恢复主视频]'],
							 ['02', '[恢复签字视频]'],
							 ['03', '[停止签字视频]'],
							 ['04', '[恢复自我视频]'],
							 ['05', '[停止自我视频]']],
					width : 140,
					id :'videoMySelf',
					value : '处理视频类型',
					listeners : {select : function(combobox,record, index){
									if(index == 0){
										myocx.AgentVideoRecover(0,"CheckVideoApp");
										myocx.VideoRecover(0,"");
										jsLog(logStrMsg("myocx.VideoRecover恢复主视频","INFO"));
									}else if(index == 1){
										myocx.VideoRecover(1,"");
										jsLog(logStrMsg("myocx.VideoRecover恢复签字视频","INFO"));
									}else if(index == 2){
										myocx.VideoRecover(2,"");
										jsLog(logStrMsg("myocx.VideoRecover停止签字视频","INFO"));
									}else if(index == 3){
										myocx.AgentVideoRecover(0,"");
										jsLog(logStrMsg("myocx.AgentVideoRecover恢复本方视频","INFO"));
									}else if(index == 4){
										myocx.AgentVideoRecover(2,"");
										jsLog(logStrMsg("myocx.AgentVideoRecover停止本方视频","INFO"));
									}
								}
							}
					},{
					xtype : 'combo',
					mode : 'local',
					hidden : true,
					editable : false,
					disabled : true ,
					triggerAction : 'all',
					store : [['01', '理财问卷'],
							 ['02', '基金问卷'],
							 ['0201', '基金问卷结果'],
							 ['03', '理财评估结果：激进型'],
							 ['04', '理财评估结果：进取型'],
							 ['05', '理财评估结果：平衡型'],
							 ['06', '理财评估结果：稳健型'],
							 ['07', '理财评估结果：谨慎型']],
					width : 200,
					id :'leixin',
					hiddenName : 'businss',
					value : '理财问卷',
					listeners : {select : function(combobox,record, index){}}
					},{
						id : 'printSome',
						text : '打印',
						disabled : true ,
						hidden : true,
						iconCls : 'btn-print',
						handler : function () {
							var msg = "";
							if(Ext.getCmp("leixin").getValue() == "理财问卷"){
								msg ="理财问卷";
							}else if(Ext.getCmp("leixin").getValue() == "01"){
								msg ="理财问卷";
							}else if(Ext.getCmp("leixin").getValue() == "02"){
								msg ="基金问卷";
							}else if(Ext.getCmp("leixin").getValue() == "0201"){
								msg ="基金问卷结果";
							}else if(Ext.getCmp("leixin").getValue() == "03"){
								msg ="理财评估结果：激进型";
							}else if(Ext.getCmp("leixin").getValue() == "04"){
								msg ="理财评估结果：进取型";
							}else if(Ext.getCmp("leixin").getValue() == "05"){
								msg ="理财评估结果：平衡型";
							}else if(Ext.getCmp("leixin").getValue() == "06"){
								msg ="理财评估结果：稳健型";
							}else if(Ext.getCmp("leixin").getValue() == "07"){
								msg ="理财评估结果：谨慎型";
							}
							takePrintYN(msg);  //提示是否确定打印 
						}
					},{
						id : 'returnSome',
						text : '回收',
						disabled : true ,
						hidden : true,
						iconCls : 'btn-collapse',
						handler : function(){
							showPrintpic = 1;
							getMsgBody4G2("","",5,"","recycle");
						}
					},
					
					'->'
					,{
						id : 'cusInfo',
						text : '客户信息',
						disabled : false ,
						hidden : false,
						iconCls : '',
						handler : function(){
							//var str = [cardNumber,cusname,cus_oldCardID,Ext.getCmp('cus_addrck').getValue()];
							//str = ["6226 8888 8888 8888","胡杨","11011011011","110-12011911011"]
							//showCusInfo(str);
							showScanPeopleCard(idinfos,"");
						}
					},{
						id : 'scanCard',
						text : '扫描证件',
						disabled : true ,
						iconCls : '',
						handler : function(){
								var win = new Ext.Window({
								width : 300,
								title : '友情提示',
								height : 150,
								html : '<font style="font-size:24px;color:red;padding-left:50px"><br>&nbsp;&nbsp;&nbsp;&nbsp是否扫描证件？</font>',
								modal : true,
								buttonAlign : 'center',
								buttons : [{
									text : '<font style="font-size:16px;margin-top:0px">是</font>',
									width : 60,
									height : 30,
									handler : function() {
										scanPeCard = 1;
										printidcard("888");//扫描证件
										win.close();
									}
								},{
									text : '<font style="font-size:16px;margin-top:0px">否</font>',
									width : 60,
									height : 30,
									handler : function() {
										win.close();
									}
								}]
							});
							win.show();
						}
					}
					, {
						id : 'thanks_do_',
						text : '显示感谢使用',
						handler : function (){
							Ext.getCmp("100401").setValue(OpenCardBus);
							//测试    2014/09/15
							//friendShipMsg("ushgadglasjkgl就132312312312312312312312");
							//Regagentmsg("8888","8888","ukeyno|0104201309000007");
							showCheckFuncInfo("huyang|性别|民族|出生地|住址3333333333333333|公民身份证号244444|签发机关2222211|有效期|C:\\TT002201405081108.bmp","huyang|500223|保定北市|00|C:\\TT002201403111749.bmp","C:\\CT002201403111749.bmp");   //查看核查返回的信息
							Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("显示感谢使用")+"</h1></font>");
							getMsgBody4G2("M0207","",5,"","type_Thanks"); //发送此消息让VTM跳转到是否插卡页面，提示客户
						}
					}, {
						id : 'tbarmove-prev',
						//text : '上一步',
						hidden : true,
						iconCls : 'btn-top',
						handler : cardHandler.createDelegate(this, [-1])
					}, {
						id : 'tbarmove-next',
						//text : '下一步',
						hidden : false,
						iconCls : 'btn-down',
						handler : cardHandler.createDelegate(this, [1])
					}, {
						id : 'zxsq',
						text : '坐席授权',
						hidden : true,
						handler : function(){
						
							var object = Ext.util.JSON.decode(userInfo);
							// 取得当前登录用户的相关信息，包括权限
							var user = object.user;
							curUserInfo = new UserInfo(user);
							alert(curUserInfo.username);
							loginarr(userInfo);			
						}
					}
			],
			items : [
			  this.viewPanl,  //综合选择菜单
			  {
				border : false,
				title : '<font style="color:#bf1919">卡选择</font>>身份核实>业务章程>客户资料>客户签字>审核客户资料>附加设置>开卡完成',
				layout : 'border',
				name : '借记卡申请首页',// 展示各种类型卡
				id : '1001',// 页码标签从1001开始
				items : [{
					region : 'center',
					border : false,
					layout : 'border',
					buttonAlign : 'center',
					style : 'background-color:#fff',
					items : [{
						region : 'center',
						layout : 'column',
						border : false,
						items : []
					}]
				}]
			}, {
				border : false,
				layout : 'border',
				title : '业务选择><font style="color:#bf1919">身份核实</font>>业务章程>客户资料>客户签字>审核客户资料>附加设置',
				name : '客户信息识别页',
				id : '1002',//
				buttonAlign : 'center', 
				items : [{
					region : 'center',
					border : false,
					layout : 'form',
					autoScroll : true,
					items : [{
							region : 'center',
							xtype : 'displayfield',
							hideLabel : true,
							id : '100201',
							style : 'width:100%;text-align:center;color:#686868;font-weight:bold;font-size:28px;margin-top:200px',
							html : '请等待...'
						}]
				}]
			}, {
				border : false,
				title : '业务选择><font style="color:#bf1919">身份核实</font>>业务章程>客户资料>客户签字>审核客户资料>附加设置>开卡完成',
				id : '1003',
				autoScroll : true,
				layout : 'border',
				items : [{
					style : 'background-color:#fff',
					border : false,
					region : 'center',
					autoScroll : true,  //---------------------
					items : []
				}]
			}, {
				border : false,
				title : '业务选择>身份核实><font style="color:#bf1919">业务章程</font>>客户资料>客户签字>审核客户资料>附加设置>开卡完成',
				name : '展示章程',
				id : '1004',
				style : 'background-color:#fff',
				layout : 'border',
				items : [{
						region:"center",
						border : false,
						//autoHeight : true,
						autoScroll : true,
						items:[{
								title:'北京银行京卡借记卡业务章程',
								id:'bjyh_zc',
								layout : 'form',
								border : false,
								items:[{
										xtype : 'displayfield',
										hideLabel : true,
										id : '100401',
										html : ""
								}]
							}] 
					}]
			}, {
				layout : 'border',
				border : false,
				title : '业务选择>身份核实>业务章程><font style="color:#bf1919">客户资料</font>>客户签字>审核客户资料>附加设置>开卡完成',
				name : '客户基础信息填单页',
				autoScroll : true,
				id : '1005',
				labelWidth : 100,
				labelAlign : 'right',
				items : [{
					region : 'center',
					border : false,
					labelAlign : 'right',
					id : '100501',
					layout : 'form',
					bodyStyle : 'padding-top:370px',
					items : []
				}]
			}
			, {
				layout : 'border',
				border : false,
				title : '业务选择>身份核实>业务章程><font style="color:#bf1919">客户资料</font>>客户签字>审核客户资料>附加设置>开卡完成',
				name : '客户资料审核页',
				id : '1006',
				labelWidth : 100,
				labelAlign : 'right',
				defaults : {
				},
				items : [{
					region : 'center',
					border : false,
					labelAlign : 'right',
					layout : 'form',
					style : 'background-color:#fff',
					items : [{
						layout : 'column',
						border : false,
						style : 'padding-top:40px;padding-bottom:150px',
						bodyStyle : 'padding-bottom:150px',
						buttonAlign : 'center',
						items : []
					}]
				}]
			}, 

			this.viewPanl2
			, {
				layout : 'border',
				border : false,
				title : '业务选择>身份核实>业务章程>客户资料>客户签字><font style="color:#bf1919">审核客户资料</font>>附加设置>开卡完成',
				name : '客户基础信息填单页',
				autoScroll : true,
				id : '1009',
				labelWidth : 100,
				labelAlign : 'right',
				defaults : {
				// disabled : true
				},
				items : [{
					region : 'center',
					border : false,
					labelAlign : 'right',
					id : '100901',
					layout : 'form',
					buttonAlign : 'center',
					style : 'padding:10px;background-color:#fff',
					disabledClass : 'y-item-disabled',
					items : []
				}]
			},{
				border : false,
				layout : 'border',
				title : '业务选择>身份核实>业务章程>客户资料>客户签字>审核客户资料><font style="color:#bf1919">附加设置</font>>开卡完成',
				name : '客户信息识别页',
				id : '1010',
				items : [{
					region : 'center',
					border : false,
					items : []
				}]
			}, {
				border : false,
				layout : 'border',
				id : '1011',
				title : '业务选择>身份核实>业务章程>客户资料>客户签字>审核客户资料><font style="color:#bf1919">附加设置</font>>开卡完成',
				name : '客户信息识别页',
				items : [{
					region : 'center',
					border : false,
					items : []
				}]
			}, {
				border : false,
				layout : 'border',
				autoScroll : true,
				id : '1012',
				title : '业务选择>身份核实>业务章程>客户资料>客户签字>审核客户资料>附加设置><font style="color:#bf1919">开卡完成</font>',
				name : '客户信息识别页',
				items : [{
					region : 'center',
					border : false,
					items : []
				}]
			}
			//====================== 二期开发新增的模块二js代码 ====================== 			TODO 二期开发新增的模块二js代码
			, {
				title : '业务选择>身份核实>业务章程><font style="color:#bf1919">客户资料</font>>客户签字>审核客户资料>附加设置>办理完成',
				layout : 'border',
				autoScroll : true,
				labelWidth : 100,
				labelAlign : 'right',
				border : false,
				id : '1013',
				name : '客户业务功能项',
				items : [{
					region : 'center',
					border : false,
					labelAlign : 'right',
					autoScroll : true,
					layout : 'form',
					items : [{
						layout : 'column',
						id : '101307',
						autoWidth : true, 
						border : false,
						items : [{
							columnWidth : .5,
							border : false,
							layout : 'form',
							//id : 'resetAllData',
							style: 'margin-top:10px;',
							items : [{
										xtype : 'displayfield',
										fieldLabel : '姓名',
										id : 'zonghe_name',
										name : 'zonghe_name',
										anchor : '100%',
										value : ''
									},{
										xtype : 'displayfield',
										fieldLabel : '手机号码',
										id : 'zonghe_callPhone',
										name : 'zonghe_callPhone',
										anchor : '100%',
										value : ''
									},{
										xtype : 'displayfield',
										fieldLabel : '固定电话',
										id : 'zonghe_callguhua',
										name : 'zonghe_callguhua',
										anchor : '100%',
										value : ''
									}]
							},{
							columnWidth : .5,
							border : false,
							layout : 'form',
							style: 'margin-top:10px;',
							items : [{
										xtype : 'displayfield',
										fieldLabel : '证件类型',
										id : 'zonghe_cardtype',
										name : 'zonghe_cardtype',
										anchor : '100%',
										value : ''
									},{
										xtype : 'displayfield',
										fieldLabel : '证件号码',
										id : 'zhonghe_cardID',
										name : 'zhonghe_cardID',
										anchor : '100%',
										value : ''
									}]
							},
							//------------2014/7/8 WYZS_code--------专业版网银------------------
							{
				            	columnWidth: 1,
								xtype : 'fieldset',
								title: '<font style="color:#033;font-size:18px"><h1>网上银行证书版</h1></font>',  //TODO 网上银行证书版
				                style: 'margin-top:10px;',
				                animCollapse : true,
								collapsed : false,
								border : true ,
								id : 'ZH_WYZS',
								layout : 'form',
								items : [{
									xtype : 'container',
									style : 'padding-bottom:3px;padding-left:180px;',
									layout : 'column',
									items : [{
												xtype : 'label',
												style : 'font-weight:bold;',
												text : '卡号:',
												width : 40
											}, {
												xtype : 'displayfield',
												fieldLabel : '',
												id : 'card_Number_wyzs',
												value : ''
											}, {
												xtype : 'label',
												style : 'font-weight:bold;padding-left:10px;',
												width : 70,
												html : '子业务项'
											},{
												xtype : 'combo',
												mode : 'local',
												editable : false,
												triggerAction : 'all',
												store : [['01', '申请'], 
														 ['02', '添加下挂账户'],
														 ['03', '电子密盾开机密码挂失'],
														 ['04', '修改最高转账限额'],
														 ['05', '恢复启用网银'],
														 ['06', '恢复电子密盾验证']
														 ],
												width : 200,
												id :'WYZS_ZIYW',
												hiddenName : 'businss',
												value : '请选择',
												listeners : {
														select : function(combobox,record, index) {
															//...
															if(index == 2){
																Ext.getCmp("WYZS_ZIYW").setValue("请选择");
															}else{
																jsLog(logStrMsg("新增日志，观察最近无法选择子业务问题("+ZYW_DZMM_OK+","+ZYW_SJYH_OK+","+ZYW_DHMM_OK+","+ZYW_DTWY_OK+")","INFO"));
																if(ZYW_DZMM_OK > 0 || ZYW_SJYH_OK > 0 || ZYW_DHMM_OK > 0|| ZYW_DTWY_OK > 0){
																	//friendShipMsg("请提交或清空相应的业务");
																	myocx.InvokeBusinessForm(9,"",222,"请提交或清空相应的业务");  //消息弹窗程序
																	jsLog(logStrMsg("请提交或清空相应的业务","INFO"));
																	Ext.getCmp("WYZS_ZIYW").setValue("请选择");
																}else{
																	makeBusiness(index,"WYZS",1);
																	ZYW_WYZS_OK ++;
																}
															}
															
													  	}
													}
											},{
												xtype : 'label',
												style : 'font-weight:bold;padding-left:30px;',
												html : ''
											},{
												xtype : 'button',
												text : '提交',
												width : 50,
												hidden : false,
												handler : function (){
													//之前首先要校验9090
													//...
													jsLog(logStrMsg("点击提交","INFO"));
													if(ZYW_DZMM_OK > 0 || ZYW_SJYH_OK > 0 || ZYW_DHMM_OK > 0|| ZYW_DTWY_OK > 0){ //2014/7/8 WYZS_code
														//friendShipMsg("请提交或清空相应的业务");
														myocx.InvokeBusinessForm(9,"",222,"请提交或清空相应的业务");  //消息弹窗程序
													}else{
														jsLog(logStrMsg("进行判断","INFO"));
														if(Ext.getCmp("WYZS_ZIYW").getValue() == "01"){  //申请
															jsLog(logStrMsg(" 01  申请业务","INFO"));
															//需要进行校验判断，暂是不添加
															if(checkOutText("10")){
																getMsgBody4G2("M0202","P01215",1,"P012","YES");
																Regagentmsg("6666","6666","s|s|s|s|s|M0202|P01215|1|s|Button_OK");
															}
														}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "02"){  //下挂
															jsLog(logStrMsg(" 02  下挂账户业务","INFO"));
															//需要进行校验判断，暂是不添加
															getMsgBody4G2("M0202","P01216",1,"P012","YES");
															Regagentmsg("6666","6666","s|s|s|s|s|M0202|P01216|1|s|Button_OK");
														}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "03"){  //开机密码挂失
															jsLog(logStrMsg(" 03  电子密盾开机密码挂失","INFO"));
															//需要进行校验判断，暂是不添加
															getMsgBody4G2("M0202","P01217",1,"P012","YES");
															Regagentmsg("6666","6666","s|s|s|s|s|M0202|P01217|1|s|Button_OK");
														}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "04"){  //修改转账限额
															jsLog(logStrMsg(" 04  设置最高转账限额","INFO"));
															//需要进行校验判断，暂是不添加
															getMsgBody4G2("M0202","P01218",1,"P012","YES");
															Regagentmsg("6666","6666","s|s|s|s|s|M0202|P01218|1|s|Button_OK");
														}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "05"){  //恢复网银盾
															  jsLog(logStrMsg(" 05  恢复启用网银","INFO"));
															//需要进行校验判断，暂是不添加
															if(checkOutText("09")){  
																getMsgBody4G2("M0202","P01219",1,"P012","YES");
																Regagentmsg("6666","6666","s|s|s|s|s|M0202|P01219|1|s|Button_OK");
															}
														}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "06"){  //恢复电子密盾验证
															jsLog(logStrMsg(" 06  恢复电子密盾验证","INFO"));
															//需要进行校验判断，暂是不添加
															if(checkOutText("11")){
																getMsgBody4G2("M0202","P01220",1,"P012","YES");
																Regagentmsg("6666","6666","s|s|s|s|s|M0202|P01220|1|s|Button_OK");
															}
														}
														
														//ZYW_WYZS_OK 指 0
														ZYW_WYZS_OK = 0;
														
														//重置限额的单选按钮
														checkbox_money_1 = false;
														checkbox_money_2 = false;
														checkbox_money_3 = false;
														checkbox_money_4 = false;
													}
													
												}
											},{
												xtype : 'label',
												style : 'font-weight:bold;padding-left:30px;',
												html : ''
											},{
												xtype : 'button',
												text : '取消',
												width : 50,
												hidden : false,
												handler : function (){
													//...
													if(ZYW_DZMM_OK > 0 || ZYW_SJYH_OK > 0 || ZYW_DHMM_OK > 0|| ZYW_DTWY_OK > 0){ //2014/7/9 WYZS_code
														//friendShipMsg("请提交或清空相应的业务");
														myocx.InvokeBusinessForm(9,"",222,"请提交或清空相应的业务");  //消息弹窗程序
													}else{
														//ZYW_WYZS_OK = 0;
														Ext.getCmp("101310").setDisabled(true);  //毁掉继续按钮  Button_Return->
														if(Ext.getCmp("WYZS_ZIYW").getValue() == "01"){
															wyzs_sq = "";
															getMsgBody4G2("M0202","P01215",1,"P012","NO");
															Regagentmsg("6666","6666","s|s|s|s|s|s|P01215|1|s|Button_Return");
														}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "02"){
															wyzs_xg = "";
															getMsgBody4G2("M0202","P01216",1,"P012","NO");
															Regagentmsg("6666","6666","s|s|s|s|s|s|P01216|1|s|Button_Return");
														}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "03"){
															wyzs_gs = "";
															getMsgBody4G2("M0202","P01217",1,"P012","NO");
															Regagentmsg("6666","6666","s|s|s|s|s|s|P01217|1|s|Button_Return");
														}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "04"){
															wyzs_xe = "";
															getMsgBody4G2("M0202","P01218",1,"P012","NO");
															Regagentmsg("6666","6666","s|s|s|s|s|s|P01218|1|s|Button_Return");
														}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "05"){
															wyzs_hfqy = "";
															getMsgBody4G2("M0202","P01219",1,"P012","NO");
															Regagentmsg("6666","6666","s|s|s|s|s|s|P01219|1|s|Button_Return");
														}else if(Ext.getCmp("WYZS_ZIYW").getValue() == "06"){
															wyzs_hfyz = "";
															getMsgBody4G2("M0202","P01220",1,"P012","NO");
															Regagentmsg("6666","6666","s|s|s|s|s|s|P01220|1|s|Button_Return");
														}
														//重置限额的单选按钮
														checkbox_money_1 = false;
														checkbox_money_2 = false;
														checkbox_money_3 = false;
														checkbox_money_4 = false;
													}
												}
											},{
												xtype : 'label',
												style : 'font-weight:bold;padding-left:30px;',
												html : ''
											}]
									},{
										xtype : 'container',
										layout : 'column',
										items : [{
											columnWidth : .5,
											border : false,
											layout : 'form',
											items : [{
												xtype : 'textfield',
												fieldLabel : '手机号',
												disabled : true ,
												anchor : '100%',
												id : 'WYZS_phoneNum',
												name : 'WYZS_phoneNum',
												value : '',
												enableKeyEvents : 'true',
												listeners : {
													keyup : function() {
														//...
														if(Ext.getCmp("WYZS_ZIYW").getValue()=="01"){
															getMsgBody4G2("M0202","P01215",2,"","WYZS_phoneNum:"+Ext.getCmp("WYZS_phoneNum").getValue());  //发送消息-->
														}else if(Ext.getCmp("WYZS_ZIYW").getValue()=="05"){
															getMsgBody4G2("M0202","P01219",2,"","WYZS_phoneNum:"+Ext.getCmp("WYZS_phoneNum").getValue());  //发送消息-->															
														}
													},
													change : function(a, value, c) {
														
													}
												}
											},{      
													xtype : 'combo',
													mode : 'local',
													id : 'WYZS_zhuanzhang',
													editable : false,
													disabled : true ,
													fieldLabel : '转账功能',
													triggerAction : 'all',
													store : [['01', '开通'], 
															 ['02', '关闭']],
													width : 320,
													hiddenName : 'businss',
													value : '开通',
													listeners : {
														select : function(combobox,record, index) {
															//..
															if(index == 0){
																Ext.getCmp("radio_money").setVisible(true);
																if(Ext.getCmp("WYZS_ZIYW").getValue()=="01"){
																	getMsgBody4G2("M0202","P01215",2,"","WYZS_zhuanzhang:01");  //发送消息-->
																}else if(Ext.getCmp("WYZS_ZIYW").getValue()=="02"){
																	getMsgBody4G2("M0202","P01216",2,"","WYZS_zhuanzhang:01");  //发送消息-->
																}else if(Ext.getCmp("WYZS_ZIYW").getValue()=="03"){
																	getMsgBody4G2("M0202","P01217",2,"","WYZS_zhuanzhang:01");  //发送消息-->
																}else{
																	getMsgBody4G2("M0202","P01218",2,"","WYZS_zhuanzhang:01");  //发送消息-->
																}
															}else{
																Ext.getCmp("radio_money").setVisible(false);
																if(Ext.getCmp("WYZS_ZIYW").getValue()=="01"){
																	getMsgBody4G2("M0202","P01215",2,"","WYZS_zhuanzhang:02");  //发送消息-->
																}else if(Ext.getCmp("WYZS_ZIYW").getValue()=="02"){
																	getMsgBody4G2("M0202","P01216",2,"","WYZS_zhuanzhang:02");  //发送消息-->
																}else if(Ext.getCmp("WYZS_ZIYW").getValue()=="03"){
																	getMsgBody4G2("M0202","P01217",2,"","WYZS_zhuanzhang:02");  //发送消息-->
																}else{
																	getMsgBody4G2("M0202","P01218",2,"","WYZS_zhuanzhang:02");  //发送消息-->
																}
																
															}
														}
													}
												}]
										},{
											columnWidth : .5,
											border : false,
											layout : 'form',
											items : [{
												xtype : 'textfield',
												fieldLabel : '电子密盾编号',
												anchor : '100%',
												id : 'WYZS_dzmdNum',
												name : 'WYZS_dzmdNum',
												disabled : true ,
												value : '',
												enableKeyEvents : 'true',
												listeners : {
													keyup : function(){
														//..
														if(Ext.getCmp("WYZS_ZIYW").getValue()=="03"){
															getMsgBody4G2("M0202","P01217",2,"","WYZS_dzmdNum:"+Ext.getCmp("WYZS_dzmdNum").getValue());  //发送消息-->
														}else if(Ext.getCmp("WYZS_ZIYW").getValue()=="05"){
															getMsgBody4G2("M0202","P01219",2,"","WYZS_dzmdNum:"+Ext.getCmp("WYZS_dzmdNum").getValue());  //发送消息-->															
														}else if(Ext.getCmp("WYZS_ZIYW").getValue()=="06"){
															getMsgBody4G2("M0202","P01220",2,"","WYZS_dzmdNum:"+Ext.getCmp("WYZS_dzmdNum").getValue());  //发送消息-->															
														}
													},
													change : function(a, value, c) {
													}
												}
											},{
												xtype : 'container',
												layout : 'column',
												items : [{
														columnWidth : 1,
														style : 'padding:0px 10px',
														border : false,
														layout : 'form',
														id : 'radio_money',
														xtype:'radiogroup',
														hidden : false,
														disabled : true ,
														anchor : '100%',
														items:[{
															
															//labelAlign : 'left',
															border : false,
															xtype : 'radio',
															boxLabel:'100万',
															name:'wyzsChoice',
															inputValue:'WYZS',
															checked : true,
															id : 'WYZS_1',
															onClick : function (){
																//..判断子业务来发送不同消息...
																/**
																 * checkbox_money_1
																 */
																jsLog(logStrMsg("Agent choice 100万，checkbox_money_1="+checkbox_money_1 +"  当前子业务项是："+Ext.getCmp("WYZS_ZIYW").getValue(),"INFO"));
																if(!checkbox_money_1){
																	//发送消息 ...(别忘记在关闭弹屏时还原变量)
																	if(Ext.getCmp("WYZS_ZIYW").getValue()=="01"){
																		getMsgBody4G2("M0202","P01215",2,"","WYZS_TransferLimit:100");  //发送消息-->
																	}else if(Ext.getCmp("WYZS_ZIYW").getValue()=="02"){
																		getMsgBody4G2("M0202","P01216",2,"","WYZS_TransferLimit:100");  //发送消息-->
																	}else if(Ext.getCmp("WYZS_ZIYW").getValue()=="04"){
																		getMsgBody4G2("M0202","P01218",2,"","WYZS_TransferLimit:100");  //发送消息-->
																	}
																	checkbox_money_1 = true;
																}else{
																	checkbox_money_2 = false;
																	checkbox_money_3 = false;
																	checkbox_money_4 = false;
																}
																//getMsgBody4G2("M0202","P01217",2,"","WYZS_zhuanzhang:01");  //发送消息-->
															}
														},{
															border : false,
															xtype : 'radio',
															boxLabel:'500万',
															name:'wyzsChoice',
															inputValue:'WYZS',
															checked : false,
															id : 'WYZS_2',
															onClick : function (){
																jsLog(logStrMsg("Agent choice 500万，checkbox_money_2="+checkbox_money_2 +"  当前子业务项是："+Ext.getCmp("WYZS_ZIYW").getValue(),"INFO"));
																if(!checkbox_money_2){
																	//发送消息 ...(别忘记在关闭弹屏时还原变量)
																	if(Ext.getCmp("WYZS_ZIYW").getValue()=="01"){
																		getMsgBody4G2("M0202","P01215",2,"","WYZS_TransferLimit:500");  //发送消息-->
																	}else if(Ext.getCmp("WYZS_ZIYW").getValue()=="02"){
																		getMsgBody4G2("M0202","P01216",2,"","WYZS_TransferLimit:500");  //发送消息-->
																	}else if(Ext.getCmp("WYZS_ZIYW").getValue()=="04"){
																		getMsgBody4G2("M0202","P01218",2,"","WYZS_TransferLimit:500");  //发送消息-->
																	}
																	checkbox_money_2 = true;
																}else{
																	checkbox_money_1 = false;
																	checkbox_money_3 = false;
																	checkbox_money_4 = false;
																}
															}
														},{
															border : false,
															xtype : 'radio',
															boxLabel:'5000万',
															name:'wyzsChoice',
															inputValue:'WYZS',
															checked : false,
															id : 'WYZS_3',
															onClick : function (){
																jsLog(logStrMsg("Agent choice 5000万，checkbox_money_3="+checkbox_money_3 +"  当前子业务项是："+Ext.getCmp("WYZS_ZIYW").getValue(),"INFO"));
																if(!checkbox_money_3){
																	//发送消息 ...(别忘记在关闭弹屏时还原变量)
																	if(Ext.getCmp("WYZS_ZIYW").getValue()=="01"){
																		getMsgBody4G2("M0202","P01215",2,"","WYZS_TransferLimit:5000");  //发送消息-->
																	}else if(Ext.getCmp("WYZS_ZIYW").getValue()=="02"){
																		getMsgBody4G2("M0202","P01216",2,"","WYZS_TransferLimit:5000");  //发送消息-->
																	}else if(Ext.getCmp("WYZS_ZIYW").getValue()=="04"){
																		getMsgBody4G2("M0202","P01218",2,"","WYZS_TransferLimit:5000");  //发送消息-->
																	}
																	checkbox_money_3 = true;
																}else{
																	checkbox_money_2 = false;
																	checkbox_money_1 = false;
																	checkbox_money_4 = false;
																}
															}
														},{
																border : false,
																xtype : 'radio',
																boxLabel:'无限额',
																name:'wyzsChoice',
																inputValue:'WYZS',
																checked : false,
																id : 'WYZS_4',
																onClick : function (){
																	jsLog(logStrMsg("Agent choice 无限额，checkbox_money_4="+checkbox_money_4 +"  当前子业务项是："+Ext.getCmp("WYZS_ZIYW").getValue(),"INFO"));
																	if(!checkbox_money_4){
																		//发送消息 ...(别忘记在关闭弹屏时还原变量)
																		if(Ext.getCmp("WYZS_ZIYW").getValue()=="01"){
																			getMsgBody4G2("M0202","P01215",2,"","WYZS_TransferLimit:0");  //发送消息-->
																		}else if(Ext.getCmp("WYZS_ZIYW").getValue()=="02"){
																			getMsgBody4G2("M0202","P01216",2,"","WYZS_TransferLimit:0");  //发送消息-->
																		}else if(Ext.getCmp("WYZS_ZIYW").getValue()=="04"){
																			getMsgBody4G2("M0202","P01218",2,"","WYZS_TransferLimit:0");  //发送消息-->
																		}
																		checkbox_money_4 = true;
																	}else{
																		checkbox_money_2 = false;
																		checkbox_money_3 = false;
																		checkbox_money_1 = false;
																	}
																}
															}]
													}]
											} ]
									},{
										columnWidth : 1,
										border : false,
										layout : 'form',
										style : 'padding-left:20px;color:red;',
										items : [{
												xtype : 'displayfield',
												hideLabel : true,
												id : 'check_WYZS',
												html : ''
											}]
										}
									]
								}]
							}
							//---------------------------------------------
							
							,{
				            	columnWidth: 1,
								xtype : 'fieldset',
								title: '<font style="color:#033;font-size:18px"><h1>网上银行动态密码版</h1></font>',  //TODO 动态密码版网银
				                style: 'margin-top:10px;',
				                //collapsible : true,
				                animCollapse : true,
								collapsed : false,
								border : true ,
								id : 'ZH_DTMM',
								layout : 'form',
								items : [{
									xtype : 'container',
									style : 'padding-bottom:3px;padding-left:180px;',
									layout : 'column',
									items : [{
												xtype : 'label',
												style : 'font-weight:bold;',
												text : '卡号:',
												width : 40
											}, {
												xtype : 'displayfield',
												fieldLabel : '',
												id : 'card_Number_dtmm',
												value : ''
											}, {
												xtype : 'label',
												style : 'font-weight:bold;padding-left:10px;',
												width : 70,
												html : '子业务项'
											},{
												xtype : 'combo',
												mode : 'local',
												editable : false,
												triggerAction : 'all',
												store : [['01', '申请'], 
														 ['02', '修改手机号码'],
														 ['03', '解锁']
														 ],
												width : 200,
												id :'DTMM_ZIYW',
												hiddenName : 'businss',
												value : '请选择',
												listeners : {
														select : function(combobox,record, index) {
															jsLog(logStrMsg("新增日志，观察最近无法选择子业务问题("+ZYW_DZMM_OK+","+ZYW_SJYH_OK+","+ZYW_DHMM_OK+","+ZYW_WYZS_OK+")","INFO"));
															if(ZYW_DZMM_OK > 0 || ZYW_SJYH_OK > 0 || ZYW_DHMM_OK > 0|| ZYW_WYZS_OK > 0){ //2014/7/8 WYZS_code
																//friendShipMsg("请提交或清空相应的业务");
																myocx.InvokeBusinessForm(9,"",222,"请提交或清空相应的业务");  //消息弹窗程序
																Ext.getCmp("DTMM_ZIYW").setValue("请选择");
															}else{
																makeBusiness(index,"DTMM",1);
																ZYW_DTWY_OK ++;
															}
													  	}
													}
											},{
												xtype : 'label',
												style : 'font-weight:bold;padding-left:30px;',
												html : ''
											},{
												xtype : 'button',
												text : '提交',
												width : 50,
												hidden : false,
												handler : function (){
													//之前首先要校验
													if(ZYW_DZMM_OK > 0 || ZYW_SJYH_OK > 0 || ZYW_DHMM_OK > 0|| ZYW_WYZS_OK > 0){ //2014/7/8 WYZS_code
														//friendShipMsg("请提交或清空相应的业务");
														myocx.InvokeBusinessForm(9,"",222,"请提交或清空相应的业务");  //消息弹窗程序
													}else{
														if(Ext.getCmp("DTMM_ZIYW").getValue() == "01"){
															if(checkOutText("01")){
																dtmm_sq = Ext.getCmp("DTMM_phoneNum").getValue();
																dtmm_xg = ""; dtmm_js = "";
																getMsgBody4G2("M0202","P01201",1,"P012","YES");
																Regagentmsg("6666","6666","s|s|s|s|s|M0202|P01201|1|s|Button_OK");
																ZYW_DTWY_OK = 0;
															}
														}else if(Ext.getCmp("DTMM_ZIYW").getValue() == "02"){
															if(checkOutText("02")){
																dtmm_xg = Ext.getCmp("DTMM_oldPhone").getValue()+"|"+ Ext.getCmp("DTMM_newPhone").getValue();
																dtmm_sq = ""; dtmm_js = "";
																getMsgBody4G2("M0202","P01202",1,"P012","YES");
																Regagentmsg("6666","6666","s|s|s|s|s|M0202|P01202|1|s|Button_OK");
																ZYW_DTWY_OK = 0;
															}
														}else if(Ext.getCmp("DTMM_ZIYW").getValue() == "03"){
															if(checkOutText("01")){   //校验信息和申请业务一样
																dtmm_js = Ext.getCmp("DTMM_phoneNum").getValue(); 
																dtmm_xg = ""; dtmm_sq = "";
																getMsgBody4G2("M0202","P01203",1,"P012","YES");
																Regagentmsg("6666","6666","s|s|s|s|s|M0202|P01203|1|s|Button_OK");
																ZYW_DTWY_OK = 0;
															}
														}
													}
												}
											},{
												xtype : 'label',
												style : 'font-weight:bold;padding-left:30px;',
												html : ''
											},{
												xtype : 'button',
												text : '取消',
												width : 50,
												hidden : false,
												handler : function (){
													if(ZYW_DZMM_OK > 0 || ZYW_SJYH_OK > 0 || ZYW_DHMM_OK > 0|| ZYW_WYZS_OK > 0){  //2014/7/8 WYZS_code
														//friendShipMsg("请提交或清空相应的业务");
														myocx.InvokeBusinessForm(9,"",222,"请提交或清空相应的业务");  //消息弹窗程序
													}else{
														ZYW_DTWY_OK = 0;
														Ext.getCmp("101310").setDisabled(true);  //毁掉继续按钮
														if(Ext.getCmp("DTMM_ZIYW").getValue() == "01"){
															dtmm_sq = "";
															getMsgBody4G2("M0202","P01201",1,"P012","NO");
															Regagentmsg("6666","6666","s|s|s|s|s|s|P01201|1|s|Button_Return");
														}else if(Ext.getCmp("DTMM_ZIYW").getValue() == "02"){
															dtmm_xg = "";
															getMsgBody4G2("M0202","P01202",1,"P012","NO");
															Regagentmsg("6666","6666","s|s|s|s|s|s|P01202|1|s|Button_Return");
														}else if(Ext.getCmp("DTMM_ZIYW").getValue() == "03"){
															dtmm_js = "";
															getMsgBody4G2("M0202","P01203",1,"P012","NO");
															Regagentmsg("6666","6666","s|s|s|s|s|s|P01203|1|s|Button_Return");
														}
													}
												}
											},{
												xtype : 'label',
												style : 'font-weight:bold;padding-left:30px;',
												html : ''
											},{
												xtype : 'button',
												text : '重置子业务',
												iconCls : 'btn-reset',
												hidden : true,
												width : 70,
												handler : function (){
													 var e=Ext.getCmp("SJYH_ZIYW").getValue();
													 //初次方法，变量赋值的方案
													 huiFuDTMMTextFile("clear");
													 getMsgBody4G2("M0202","",3,"","clearData_DTMM");
												}
											}]
									},{
										xtype : 'container',
										layout : 'column',
										items : [{
											columnWidth : .5,
											border : false,
											layout : 'form',
											items : [{
												xtype : 'textfield',
												fieldLabel : '原手机号',
												disabled : true ,
												anchor : '100%',
												id : 'DTMM_oldPhone',
												name : 'DTMM_oldPhone',
												value : '',
												enableKeyEvents : 'true',
												listeners : {
													keyup : function() {
														//判断如果选择的子业务是修改，发送消息的当前页码就为'P01202'  如果是解锁 就为'P01203'
														if(Ext.getCmp("DTMM_ZIYW").getValue()=="02"){
															getMsgBody4G2("M0202","P01202",2,"","oldPhone:"+Ext.getCmp("DTMM_oldPhone").getValue());  //发送消息-->
														}else if(Ext.getCmp("DTMM_ZIYW").getValue()=="03"){
															getMsgBody4G2("M0202","P01203",2,"","oldPhone:"+Ext.getCmp("DTMM_oldPhone").getValue());  //发送消息-->															
														}
													},
													change : function(a, value, c) {
													}
												}
											}]
										},{
											columnWidth : .5,
											border : false,
											layout : 'form',
											items : [{
												xtype : 'textfield',
												fieldLabel : '绑定手机号',
												anchor : '100%',
												id : 'DTMM_phoneNum',
												name : 'DTMM_phoneNum',
												disabled : true ,
												value : '',
												enableKeyEvents : 'true',
												listeners : {
													keyup : function(){
														if(Ext.getCmp("DTMM_ZIYW").getValue() == "01"){
															getMsgBody4G2("M0202","P01201",2,"","phoneNum:"+Ext.getCmp("DTMM_phoneNum").getValue());  //发送消息-->	
														}else if(Ext.getCmp("DTMM_ZIYW").getValue() == "03"){
															getMsgBody4G2("M0202","P01203",2,"","phoneNum:"+Ext.getCmp("DTMM_phoneNum").getValue());  //发送消息-->
														}
													},
													change : function(a, value, c) {
													}
												}
											}]
										},{
											columnWidth : .5,
											border : false,
											layout : 'form',
											items : [{
												xtype : 'textfield',
												fieldLabel : '新手机号',
												disabled : true ,
												anchor : '100%',
												id : 'DTMM_newPhone',
												name : 'DTMM_newPhone',
												value : '',
												enableKeyEvents : 'true',
												listeners : {
													keyup : function() {
														getMsgBody4G2("M0202","P01202",2,"","newPhone:"+Ext.getCmp("DTMM_newPhone").getValue());  //发送消息-->
													},
													change : function(a, value, c) {
													}
												}
											}]
										}
										,{
											columnWidth : .5,
											border : false,
											layout : 'form',
											hidden : true,
											items : [{
												xtype : 'textfield',
												fieldLabel : '再次输入新手机号',
												disabled : true ,
												anchor : '100%',
												id : 'DTMM_newphoneRepeat',
												name : 'DTMM_newphoneRepeat',
												value : '',
												enableKeyEvents : 'true',
												listeners : {
													keyup : function() {
														getMsgBody4G2("M0202","P01202",2,"","newPhoneRepeat:"+Ext.getCmp("DTMM_newphoneRepeat").getValue());  //发送消息-->
													},
													change : function(a, value, c) {
													}
												}
											}]
										},{
										columnWidth : 1,
										border : false,
										layout : 'form',
										style : 'padding-left:20px;color:red;',
										items : [{
												xtype : 'displayfield',
												hideLabel : true,
												id : 'check_DTMM',
												html : ''
											}]
										}
									]
								}]
							},{
				            	columnWidth: 1,
								xtype : 'fieldset',
								title: '<font style="color:#033;font-size:18px"><h1>手机银行</h1></font>',
				                style: 'margin-top:10px;',
				                animCollapse : true,
								collapsed : false,
								width : 450,
								id : 'ZH_SJYH',
								layout : 'form',
								items : [{
									xtype : 'container',
									style : 'padding-bottom:3px;padding-left:180px;',
									layout : 'column',
									items : [
//									         {
//												xtype : 'label',
//												style : 'font-weight:bold;',
//												text : '卡号:',
//												width : 40
//											}, {
//												xtype : 'displayfield',
//												fieldLabel : '',
//												id : 'card_Number_sjyh',
//												value : ''
//											}
											{
												xtype : 'label',
												style : 'font-weight:bold;',
												text : '验证码：',
												width : 60
											},
											{
												xtype : 'textfield',
												disabled : true ,
												//anchor : '100%',
												width : 80,
												id : 'SJ_CheckCode',
												name : 'SJ_CheckCode',
												value : '',
												//enableKeyEvents : 'true',
												listeners : {
													keyup : function() {
														
													},
													change : function(a, value, c) {
													}
												}
											}
											, {
												xtype : 'label',
												style : 'font-weight:bold;padding-left:10px;',
												width : 70,
												html : '子业务项'
											},{
												xtype : 'combo',
												mode : 'local',
												editable : false,
												triggerAction : 'all',
												store : [['01', '申请'], 
														 ['02', '添加下挂账户'],
														 ['03', '重置登录密码'],     //不需要验证电pwd
														 ['04', '设置转账/支付功能'],
														 ['05', '注销']],         //不需要验证电pwd
												width : 200,
												id : 'SJYH_ZIYW',
												hiddenName : 'businss',
												value : '请选择',
												listeners : {
														select : function(combobox,record, index) {
															jsLog(logStrMsg("新增日志，观察最近无法选择子业务问题("+ZYW_DZMM_OK+","+ZYW_DTWY_OK+","+ZYW_DHMM_OK+","+ZYW_WYZS_OK+")","INFO"));
															if(ZYW_DZMM_OK > 0 || ZYW_DTWY_OK > 0 || ZYW_DHMM_OK > 0|| ZYW_WYZS_OK > 0){  //2014/7/8 WYZS_code
																//friendShipMsg("请提交或清空相应的业务");
																myocx.InvokeBusinessForm(9,"",222,"请提交或清空相应的业务");  //消息弹窗程序
																Ext.getCmp("SJYH_ZIYW").setValue("请选择");
															}else{
																ZYW_SJYH_OK ++;
																makeBusiness(index,"SJYH",1);
															}
														}
													}
											},{
												xtype : 'label',
												style : 'font-weight:bold;padding-left:30px;',
												html : ''
											},{
												xtype : 'button',
												text : '提交',
												width : 50,
												hidden : false,
												handler : function (){
													if(ZYW_DZMM_OK > 0 || ZYW_DTWY_OK > 0 || ZYW_DHMM_OK > 0|| ZYW_WYZS_OK > 0){  //2014/7/8 WYZS_code
														//friendShipMsg("请提交或清空相应的业务");
														myocx.InvokeBusinessForm(9,"",222,"请提交或清空相应的业务");  //消息弹窗程序
													}else{
														if(Ext.getCmp("SJYH_ZIYW").getValue() == "01"){
															if(checkOutText("04")){
																jsLog(logStrMsg("点击提交，ClickCheckCodeBtn=" + ClickCheckCodeBtn + ", CheckCode="+CheckCode,"INFO"));
																jsLog(logStrMsg("Ext.getCmp(SJ_phoneNum).getValue()=" + Ext.getCmp("SJ_phoneNum").getValue() + ", sjyh_phone_checkcode="+sjyh_phone_checkcode,"INFO"));
																if(sjyh_phone_checkcode != Ext.getCmp("SJ_phoneNum").getValue() && sjyh_phone_checkcode != ""){
																	myocx.InvokeBusinessForm(9,"",222,"手机号已修改，请重新发送验证码!");
																}else{
																	if(ClickCheckCodeBtn >= 1 && Ext.getCmp("SJ_CheckCode").getValue() == CheckCode){  //p判断是否核对了验证码
																		sjyh_phone_checkcode = Ext.getCmp("SJ_phoneNum").getValue();
																		sjyh_sq = Ext.getCmp("SJ_phoneNum").getValue()+"|"+Ext.getCmp("SJ_loginID").getValue()+"|"+Ext.getCmp("SJ_zhuanzhang").getValue()+"|"+Ext.getCmp("SJ_zhifu").getValue();
																		sjyh_tj = ""; sjyh_zz = ""; sjyh_zx = ""; sjyh_cz = ""; 
																		getMsgBody4G2("M0202","P01204",1,"P012","YES");
																		Regagentmsg("6666","6666","s|s|s|s|s|M0202|P01204|1|s|Button_OK");
																		ZYW_SJYH_OK = 0;
																		Ext.getCmp("CheckCode_btn").setDisabled(true);
																	}else{
																		if(Ext.getCmp("SJ_CheckCode").getValue() == ""){
																			myocx.InvokeBusinessForm(9,"",222,"请先填写验证码后提交!");
																		}else{
																			myocx.InvokeBusinessForm(9,"",222,"验证码输入错误，请重新输入!");
																		}
																	}	
																}
															}
															
														}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "02"){
																sjyh_tj = Ext.getCmp("SJ_zhuanzhang").getValue()+"|"+Ext.getCmp("SJ_zhifu").getValue();
																sjyh_sq = ""; sjyh_zz = ""; sjyh_zx = ""; sjyh_cz = "";
																getMsgBody4G2("M0202","P01205",1,"P012","YES");
																Regagentmsg("6666","6666","s|s|s|s|s|M0202|P01205|1|s|Button_OK");
																ZYW_SJYH_OK = 0;
														}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "03"){
																sjyh_cz = "OK";
																sjyh_sq = ""; sjyh_zz = ""; sjyh_zx = ""; sjyh_tj = "";
																getMsgBody4G2("M0202","P01206",1,"P012","YES");	
																Regagentmsg("6666","6666","s|s|s|s|s|M0202|P01206|1|s|Button_OK");
																ZYW_SJYH_OK = 0;
														}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "04"){
																sjyh_zz = Ext.getCmp("SJ_zhuanzhang").getValue()+"|"+Ext.getCmp("SJ_zhifu").getValue();
																sjyh_tj = ""; sjyh_sq = ""; sjyh_zx = ""; sjyh_cz = "";
																getMsgBody4G2("M0202","P01207",1,"P012","YES");	
																Regagentmsg("6666","6666","s|s|s|s|s|M0202|P01207|1|s|Button_OK");
																ZYW_SJYH_OK = 0;
														}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "05"){
															if(checkOutText("04")){
																sjyh_zx = Ext.getCmp("SJ_phoneNum").getValue()+"|"+Ext.getCmp("SJ_loginID").getValue();
																sjyh_tj = ""; sjyh_zz = ""; sjyh_sq = ""; sjyh_cz = "";
																getMsgBody4G2("M0202","P01208",1,"P012","YES");
																Regagentmsg("6666","6666","s|s|s|s|s|M0202|P01208|1|s|Button_OK");
																ZYW_SJYH_OK = 0;
															}
														}
													}
												}
											},{
												xtype : 'label',
												style : 'font-weight:bold;padding-left:15px;',
												html : ''
											},{
												xtype : 'button',
												text : '取消',
												width : 50,
												hidden : false,
												handler : function (){
													if(ZYW_DZMM_OK > 0 || ZYW_DTWY_OK > 0 || ZYW_DHMM_OK > 0|| ZYW_WYZS_OK > 0){   //2014/7/8 WYZS_code
														//friendShipMsg("请提交或清空相应的业务");
														myocx.InvokeBusinessForm(9,"",222,"请提交或清空相应的业务");  //消息弹窗程序
													}else{
														ClickCheckCodeBtn = 0;
														ZYW_SJYH_OK = 0;
														Ext.getCmp("101310").setDisabled(true);  //毁掉继续按钮
														if(Ext.getCmp("SJYH_ZIYW").getValue() == "01"){
															Ext.getCmp("CheckCode_btn").setDisabled(true);
															sjyh_phone_checkcode = "";
															sjyh_sq = "";
															getMsgBody4G2("M0202","P01204",1,"P012","NO");
															Regagentmsg("6666","6666","s|s|s|s|s|M0202|P01204|1|s|Button_Return");
														}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "02"){
															sjyh_tj = "";
															getMsgBody4G2("M0202","P01205",1,"P012","NO");
															Regagentmsg("6666","6666","s|s|s|s|s|M0202|P01205|1|s|Button_Return");
														}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "03"){
															sjyh_cz = "";
															getMsgBody4G2("M0202","P01206",1,"P012","NO");
															Regagentmsg("6666","6666","s|s|s|s|s|M0202|P01206|1|s|Button_Return");
														}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "04"){
															sjyh_zz = "";
															getMsgBody4G2("M0202","P01207",1,"P012","NO");
															Regagentmsg("6666","6666","s|s|s|s|s|M0202|P01207|1|s|Button_Return");
														}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "05"){
															sjyh_zx = "";
															getMsgBody4G2("M0202","P01208",1,"P012","NO");
															Regagentmsg("6666","6666","s|s|s|s|s|M0202|P01208|1|s|Button_Return");
														}
													}
												}
											},{
												xtype : 'label',
												style : 'font-weight:bold;padding-left:15px;',
												html : ''
											},{
												xtype : 'button',
												text : '获取验证码',
												width : 90,
												disabled : true,
												id : 'CheckCode_btn',
												handler : function (){
													MessageCheckCode_TimeOut = 0;
													sjyh_phone_checkcode = Ext.getCmp("SJ_phoneNum").getValue();
													Ext.getCmp("SJ_CheckCode").setValue("");
													Ext.getCmp("CheckCode_btn").setDisabled(true);
													getCheckCode();
												}
											},{
												xtype : 'label',
												style : 'font-weight:bold;padding-left:30px;',
												html : ''
											},{
												xtype : 'button',
												text : '重置子业务',
												iconCls : 'btn-reset',
												hidden :true,
												width : 70,
												handler : function (){
													 var e=Ext.getCmp("DTMM_ZIYW").getValue();
													 huiFuSJYHTextFile("clear");
													 //Ext.getCmp("SJYH_ZIYW").setValue("请选择");
													 Ext.getCmp("check_ZH_info").setValue("");
													 Ext.getCmp("SJ_phoneNum").setValue("");
													 Ext.getCmp("SJ_loginID").setValue("");
													 Ext.getCmp("SJ_zhifu").setValue("01");
													 Ext.getCmp("SJ_zhuanzhang").setValue("01");
													 getMsgBody4G2("M0202","",3,"","clearData_SJYH");  //发送消息--> 
												}
											}]
									},{
										xtype : 'container',
										style : 'padding-bottom:3px;padding-left:10px;',
										layout : 'column',
										items : [{
											columnWidth : .5,
											border : false,
											layout : 'form',
											items : [{
												xtype : 'textfield',
												fieldLabel : '绑定手机号',
												disabled : true ,
												anchor : '100%',
												id : 'SJ_phoneNum',
												name : 'SJ_phoneNum',
												value : '',
												enableKeyEvents : 'true',
												listeners : {
													keyup : function() {
														if(Ext.getCmp("SJYH_ZIYW").getValue() == "01"){
															getMsgBody4G2("M0202","P01204",2,"","SJ_phoneNum:"+Ext.getCmp("SJ_phoneNum").getValue());	
														}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "05"){
															getMsgBody4G2("M0202","P01208",2,"","SJ_phoneNum:"+Ext.getCmp("SJ_phoneNum").getValue());
														}
													},
													change : function(a, value, c) {
													}
												}
											},{     //strBusType,strCurPage,strFlagGo,strGoId,strMsg 
													xtype : 'combo',
													mode : 'local',
													id : 'SJ_zhuanzhang',
													editable : false,
													disabled : true ,
													fieldLabel : '转账功能',
													triggerAction : 'all',
													store : [['01', '开通'], 
															 ['02', '关闭']],
													width : 320,
													hiddenName : 'businss',
													value : '',
													listeners : {
														select : function(combobox,record, index) {
															if(Ext.getCmp("SJYH_ZIYW").getValue() == "01"){
																getMsgBody4G2("M0202","P01204",2,"","SJ_zhuanzhang:" + Ext.getCmp("SJ_zhuanzhang").getValue());	
															}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "02"){
																getMsgBody4G2("M0202","P01205",2,"","SJ_zhuanzhang:" + Ext.getCmp("SJ_zhuanzhang").getValue());
															}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "04"){
																getMsgBody4G2("M0202","P01207",2,"","SJ_zhuanzhang:" + Ext.getCmp("SJ_zhuanzhang").getValue());
															}
														}
													}
												}]
										},{
											columnWidth : .5,
											border : false,
											layout : 'form',
											items : [{
												xtype : 'textfield',
												fieldLabel : '登录ID',
												disabled : true ,
												anchor : '100%',
												id : 'SJ_loginID',
												name : 'SJ_loginID',
												value : '',
												enableKeyEvents : 'true',
												listeners : {
													keyup : function(){
														if(Ext.getCmp("SJYH_ZIYW").getValue() == "01"){
															getMsgBody4G2("M0202","P01204",2,"","SJ_loginID:"+Ext.getCmp("SJ_loginID").getValue());	
														}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "05"){
															getMsgBody4G2("M0202","P01208",2,"","SJ_loginID:"+Ext.getCmp("SJ_loginID").getValue());
														}
														
													},
													change : function(a, value, c){
													}
												}
											},{
													xtype : 'combo',
													mode : 'local',
													editable : false,
													disabled : true ,
													id : 'SJ_zhifu',
													fieldLabel : '支付功能',
													triggerAction : 'all',
													store : [['01', '开通'], 
															 ['02', '关闭']],
													width : 320,
													hiddenName : 'businss',
													value : '',
													listeners : {
														select : function(combobox,record, index) {
															if(Ext.getCmp("SJYH_ZIYW").getValue() == "01"){
																getMsgBody4G2("M0202","P01204",2,"","SJ_zhifu:" + Ext.getCmp("SJ_zhifu").getValue());	
															}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "02"){
																getMsgBody4G2("M0202","P01205",2,"","SJ_zhifu:" + Ext.getCmp("SJ_zhifu").getValue());
															}else if(Ext.getCmp("SJYH_ZIYW").getValue() == "04"){
																getMsgBody4G2("M0202","P01207",2,"","SJ_zhifu:" + Ext.getCmp("SJ_zhifu").getValue());
															}
														}
													}
												}]
										},{
											columnWidth : 1,
											border : false,
											layout : 'form',
											style : 'padding-left:10px;color:red;',
											items : [{
													xtype : 'displayfield',
													hideLabel : true,
													id : 'check_SJYH',
													html : ''
											}]
										}]
								}]
							},{
				            	columnWidth: .5,
								xtype : 'fieldset',
								title: '<font style="color:#033;font-size:18px"><h1>电子银行密码管理</h1></font>',	
				                style: 'margin-top:10px;',
				                animCollapse : true,
								collapsed : false,
								disabled : false,
								width : 450,
								id : 'ZH_DZMM',
								layout : 'form',
								items : [{
									xtype : 'container',
									style : 'padding-bottom:3px;padding-left:130px;',
									layout : 'column',
									items : [{
												xtype : 'label',
												style : 'font-weight:bold;',
												text : '卡号:',
												width : 40
											}, {
												xtype : 'displayfield',
												fieldLabel : '',
												id : 'card_Number_dzyh',
												value : ''
											}]
									},{
										xtype : 'container',
										style : 'padding-bottom:3px;padding-left:10px;',
										layout : 'column',
										items : [{
											columnWidth : .6,
											border : true,
											layout : 'form',
											id : 'dzyh_radioChoice' ,
											xtype:'radiogroup',
											items : [{
												border : true,
												boxLabel:'<font style="color:#033;font-size:12px">申请</font>',
												id : 'dzyh_shenqing',
												name:'dzyhChoice_1',
												inputValue:'dzyh_shenqing',
												onClick : function (){
													jsLog(logStrMsg("新增日志，观察最近无法选择子业务问题("+ZYW_DTWY_OK+","+ZYW_SJYH_OK+","+ZYW_DHMM_OK+","+ZYW_WYZS_OK+")","INFO"));
													if(ZYW_DTWY_OK > 0 || ZYW_SJYH_OK > 0 || ZYW_DHMM_OK > 0|| ZYW_WYZS_OK > 0){  //2014/7/8 WYZS_code
														//friendShipMsg("请提交或清空相应的业务");
														myocx.InvokeBusinessForm(9,"",222,"请提交或清空相应的业务");  //消息弹窗程序
														Ext.getCmp("dzyh_shenqing").setValue(false);
													}else{
														//makeBusiness(index,"SJYH",1);
														 Ext.getCmp("101310").setDisabled(true);  //毁掉继续按钮
														 if(!(readLog().indexOf("DZYH_SQ")>=0)){
													 		getMsgBody4G2("M0202","P012",1,"P01209","DZYH_SQ");  //发送消息-->使VTM弹出 电子银行密码管理  ‘申请’明细填写界面
													 		ZYW_DZMM_OK ++;
													 	 }
													}
													 
												}
											},{
												border : true,
												boxLabel:'<font style="color:#033;font-size:12px">重置</font>',
												id : 'dzyh_chongzhi',
												name:'dzyhChoice_1',  
												inputValue:'dzyh_chongzhi',
												onClick : function (){
													jsLog(logStrMsg("新增日志，观察最近无法选择子业务问题("+ZYW_DTWY_OK+","+ZYW_SJYH_OK+","+ZYW_DHMM_OK+","+ZYW_WYZS_OK+")","INFO"));
													 if(ZYW_DTWY_OK > 0 || ZYW_SJYH_OK > 0 || ZYW_DHMM_OK > 0|| ZYW_WYZS_OK > 0){  //2014/7/8 WYZS_code
														//friendShipMsg("请提交或清空相应的业务");
														 myocx.InvokeBusinessForm(9,"",222,"请提交或清空相应的业务");  //消息弹窗程序
														Ext.getCmp("dzyh_chongzhi").setValue(false);
													}else{
														 Ext.getCmp("101310").setDisabled(true);  //毁掉继续按钮
														 if(!(readLog().indexOf("DZYH_CZ")>=0)){
													 		getMsgBody4G2("M0202","P012",1,"P01210","DZYH_CZ"); 
															ZYW_DZMM_OK ++;
													 	 }
													 }
												}
											},{
												border : true,
												boxLabel:'<font style="color:#033;font-size:12px">修改</font>',
												id : 'dzyh_xiugai',
												name:'dzyhChoice_1',
												inputValue:'dzyh_xiugai',
												onClick : function (){
													jsLog(logStrMsg("新增日志，观察最近无法选择子业务问题("+ZYW_DTWY_OK+","+ZYW_SJYH_OK+","+ZYW_DHMM_OK+","+ZYW_WYZS_OK+")","INFO"));
													if(ZYW_DTWY_OK > 0 || ZYW_SJYH_OK > 0 || ZYW_DHMM_OK > 0|| ZYW_WYZS_OK > 0){  //2014/7/8 WYZS_code
														//friendShipMsg("请提交或清空相应的业务");
														myocx.InvokeBusinessForm(9,"",222,"请提交或清空相应的业务");  //消息弹窗程序
														Ext.getCmp("dzyh_xiugai").setValue(false);
													}else{
													     Ext.getCmp("101310").setDisabled(true);  //毁掉继续按钮
														 if(!(readLog().indexOf("DZYH_XG")>=0)){		
													 		getMsgBody4G2("M0202","P012",1,"P01211","DZYH_XG");  
													 		ZYW_DZMM_OK ++;
													 	 }
													 }
												}
											}]
										},{
											columnWidth : .2,
											border : false,
											layout : 'form',
											items : [{
													xtype : 'button',
													text : '提交',
													width : 70,
													handler : function (){
														if(ZYW_SJYH_OK > 0 || ZYW_DTWY_OK > 0 || ZYW_DHMM_OK > 0|| ZYW_WYZS_OK > 0){  //2014/7/8 WYZS_code
															//friendShipMsg("请提交或清空相应的业务");
															myocx.InvokeBusinessForm(9,"",222,"请提交或清空相应的业务");  //消息弹窗程序
														}else{
															if(Ext.getCmp("dzyh_shenqing").getValue()){
																dzyh_sq = true; dzyh_cz = false; dzyh_xg = false;
																getMsgBody4G2("M0202","P01209",1,"P012","YES");   //清空单选按钮
																ZYW_DZMM_OK = 0;
															}else if(Ext.getCmp("dzyh_chongzhi").getValue()){
																dzyh_cz = true; dzyh_sq = false; dzyh_xg = false;
																getMsgBody4G2("M0202","P01210",1,"P012","YES");   //清空单选按钮
																ZYW_DZMM_OK = 0;
															}else if(Ext.getCmp("dzyh_xiugai").getValue()){
																dzyh_xg = true; dzyh_sq = false; dzyh_cz = false;
																getMsgBody4G2("M0202","P01211",1,"P012","YES");   //清空单选按钮
																ZYW_DZMM_OK = 0;
															}
														}
													}
												}]
										},{
											columnWidth : .2,
											border : false,
											layout : 'form',
											items : [{
													xtype : 'button',
													text : '取消',
													width : 70,
													handler : function (){
														if(ZYW_SJYH_OK > 0 || ZYW_DTWY_OK > 0 || ZYW_DHMM_OK > 0|| ZYW_WYZS_OK > 0){  //2014/7/8 WYZS_code
															//friendShipMsg("请提交或清空相应的业务");
															myocx.InvokeBusinessForm(9,"",222,"请提交或清空相应的业务");  //消息弹窗程序
														}else{
															ZYW_DZMM_OK = 0;
															Ext.getCmp("101310").setDisabled(true);  //毁掉继续按钮
															if(Ext.getCmp("dzyh_shenqing").getValue()){
																dzyh_sq = false;
																getMsgBody4G2("M0202","P01209",1,"P012","NO");   //清空单选按钮
																Regagentmsg("6666","6666","s|s|s|s|s|s|P01209|1|s|Button_Return");
															}else if(Ext.getCmp("dzyh_chongzhi").getValue()){
																dzyh_cz = false;
																getMsgBody4G2("M0202","P01210",1,"P012","NO");   //清空单选按钮
																Regagentmsg("6666","6666","s|s|s|s|s|s|P01210|1|s|Button_Return");
															}else if(Ext.getCmp("dzyh_xiugai").getValue()){
																dzyh_xg = false;
																getMsgBody4G2("M0202","P01211",1,"P012","NO");   //清空单选按钮
																Regagentmsg("6666","6666","s|s|s|s|s|s|P01211|1|s|Button_Return");
															}
														}
													}
												}]
										}]
								}]
							},{
				            	columnWidth: .5,
								xtype : 'fieldset',
								title: '<font style="color:#033;font-size:18px"><h1>电话银行交易密码管理</h1></font>',
				                style: 'margin-top:10px;',
				                animCollapse : true,
								collapsed : false,
								disabled : false,
								width : 450,
								id : 'ZH_DHMM',
								layout : 'form',
								items : [{
									xtype : 'container',
									style : 'padding-bottom:3px;padding-left:130px;',
									layout : 'column',
									items : [{
											xtype : 'label',
											style : 'font-weight:bold;',
											text : '卡号:',
											width : 40
										 },{
											xtype : 'displayfield',
											fieldLabel : '',
											id : 'card_Number_dhyh',
											value : ''
										}]
									},{
										xtype : 'container',
										style : 'padding-bottom:3px;padding-left:10px;',
										layout : 'column',
										items : [{
											columnWidth : .6,
											border : true,
											layout : 'form',
											id : 'dhyh_radioChoice' ,
											xtype:'radiogroup',
											items : [{
												border : true,
												boxLabel:'<font style="color:#033;font-size:12px">申请</font>',
												name:'dhyhChoice_2',
												id　: 'dhyh_shenqings',
												inputValue:'dhyh_shenqings',
												onClick : function (){
													jsLog(logStrMsg("新增日志，观察最近无法选择子业务问题("+ZYW_DTWY_OK+","+ZYW_SJYH_OK+","+ZYW_DZMM_OK+","+ZYW_WYZS_OK+")","INFO"));
													if(ZYW_DTWY_OK > 0 || ZYW_SJYH_OK > 0 || ZYW_DZMM_OK > 0 || ZYW_WYZS_OK > 0){  //2014/7/8 WYZS_code
														//friendShipMsg("请提交或清空相应的业务");
														myocx.InvokeBusinessForm(9,"",222,"请提交或清空相应的业务");  //消息弹窗程序
														Ext.getCmp("dhyh_shenqings").setValue(false);
													}else{
														 Ext.getCmp("101310").setDisabled(true);  //毁掉继续按钮
														 if(!(readLog().indexOf("DHYH_SQ")>=0)){
													 		getMsgBody4G2("M0202","P012",1,"P01212","DHYH_SQ");  
													 		ZYW_DHMM_OK ++ ;
													 	 }	
													 }
												}
											},{
												border : true,
												boxLabel:'<font style="color:#033;font-size:12px">重置</font>',
												name:'dhyhChoice_2',
												id　: 'dhyh_chongzhi',
												inputValue:'dhyh_chongzhi',
												onClick : function (){
													jsLog(logStrMsg("新增日志，观察最近无法选择子业务问题("+ZYW_DTWY_OK+","+ZYW_SJYH_OK+","+ZYW_DZMM_OK+","+ZYW_WYZS_OK+")","INFO"));
													if(ZYW_DTWY_OK > 0 || ZYW_SJYH_OK > 0 || ZYW_DZMM_OK > 0 || ZYW_WYZS_OK > 0){  //2014/7/8 WYZS_code
														//friendShipMsg("请提交或清空相应的业务");
														myocx.InvokeBusinessForm(9,"",222,"请提交或清空相应的业务");  //消息弹窗程序
														Ext.getCmp("dhyh_chongzhi").setValue(false) 
													}else{
														Ext.getCmp("101310").setDisabled(true);  //毁掉继续按钮
												 		if(!(readLog().indexOf("DHYH_CZ")>=0)){
													 		getMsgBody4G2("M0202","P012",1,"P01213","DHYH_CZ"); 
													 		ZYW_DHMM_OK ++;
													 	}
												 	 }
												}
											},{
												border : true,
												boxLabel:'<font style="color:#033;font-size:12px">修改</font>',
												name:'dhyhChoice_2',
												id　: 'dhyh_xiugai',
												inputValue:'dhyh_xiugai',
												onClick : function (){
													jsLog(logStrMsg("新增日志，观察最近无法选择子业务问题("+ZYW_DTWY_OK+","+ZYW_SJYH_OK+","+ZYW_DZMM_OK+","+ZYW_WYZS_OK+")","INFO"));
													if(ZYW_DTWY_OK > 0 || ZYW_SJYH_OK > 0 || ZYW_DZMM_OK > 0|| ZYW_WYZS_OK > 0){  //2014/7/8 WYZS_code
														//friendShipMsg("请提交或清空相应的业务");
														myocx.InvokeBusinessForm(9,"",222,"请提交或清空相应的业务");  //消息弹窗程序
														Ext.getCmp("dhyh_xiugai").setValue(false)
													}else{
														 Ext.getCmp("101310").setDisabled(true);  //毁掉继续按钮
														 if(!(readLog().indexOf("DHYH_XG")>=0)){
													 		getMsgBody4G2("M0202","P012",1,"P01214","DHYH_XG"); 
													 		ZYW_DHMM_OK ++;
													 	 }
													 }
												}
											}]
										},{
											columnWidth : .2,
											border : false,
											layout : 'form',
											items : [{
													xtype : 'button',
													text : '提交',
													//iconCls : 'btn-reset',
													width : 70,
													handler : function (){
														if(ZYW_SJYH_OK > 0 || ZYW_DTWY_OK > 0 || ZYW_DZMM_OK > 0|| ZYW_WYZS_OK > 0){ //2014/7/8 WYZS_code
															//friendShipMsg("请提交或清空相应的业务");
															myocx.InvokeBusinessForm(9,"",222,"请提交或清空相应的业务");  //消息弹窗程序
														}else{
															if(Ext.getCmp("dhyh_shenqings").getValue()){
																dhyh_sq = true; dhyh_cz = false; dhyh_xg = false;
																getMsgBody4G2("M0202","P01212",1,"P012","YES");   //清空单选按钮
																ZYW_DHMM_OK = 0;
															}else if(Ext.getCmp("dhyh_chongzhi").getValue()){
																dhyh_cz = true; dhyh_sq = false; dhyh_xg = false;
																getMsgBody4G2("M0202","P01213",1,"P012","YES");   //清空单选按钮
																ZYW_DHMM_OK = 0;
															}else if(Ext.getCmp("dhyh_xiugai").getValue()){
																dhyh_xg = true; dhyh_sq = false; dhyh_cz = false;
																getMsgBody4G2("M0202","P01214",1,"P012","YES");   //清空单选按钮
																ZYW_DHMM_OK = 0;
															}
														}
													}
												}]
										},{
											columnWidth : .2,
											border : false,
											layout : 'form',
											items : [{
													xtype : 'button',
													text : '取消',
													width : 70,
													handler : function (){
														if(ZYW_SJYH_OK > 0 || ZYW_DTWY_OK > 0 || ZYW_DZMM_OK > 0|| ZYW_WYZS_OK > 0){  //2014/7/8 WYZS_code
															//friendShipMsg("请提交或清空相应的业务");
															myocx.InvokeBusinessForm(9,"",222,"请提交或清空相应的业务");  //消息弹窗程序
														}else{
															ZYW_DHMM_OK =0;
															Ext.getCmp("101310").setDisabled(true);  //毁掉继续按钮
															if(Ext.getCmp("dhyh_shenqings").getValue()){
																dhyh_sq = false;
																getMsgBody4G2("M0202","P01212",1,"P012","NO");   //清空单选按钮
																Regagentmsg("6666","6666","s|s|s|s|s|s|P01212|1|s|Button_Return");
															}else if(Ext.getCmp("dhyh_chongzhi").getValue()){
																dhyh_cz = false;
																getMsgBody4G2("M0202","P01213",1,"P012","NO");   //清空单选按钮
																Regagentmsg("6666","6666","s|s|s|s|s|s|P01213|1|s|Button_Return");
															}else if(Ext.getCmp("dhyh_xiugai").getValue()){
																dhyh_xg = false;
																getMsgBody4G2("M0202","P01214",1,"P012","NO");   //清空单选按钮
																Regagentmsg("6666","6666","s|s|s|s|s|s|P01214|1|s|Button_Return");
															}
														}
													}
												}]
										}]
								}]
							}]
						},{
							xtype : 'displayfield',
							hideLabel : true,
							style : 'padding-left:10px;padding-top:20px;color:red;',
							id : 'check_ZH_info',
							html : ''
						}]
						},{
					            layout : 'border',
								border : false,
								autoScroll : true,
								labelWidth : 100,
								region:"south",
								style : 'background-color:#FFF',
					            buttonAlign : 'center',
								buttons : [{
										xtype : 'button',
										width : 100,
										id : '101308',
										height : 40,
										text : '<font style="font-size:16px;margin-top:0px">客户输入</font>',
										style : 'margin-top:5px',
										handler : function() {
											if(Ext.getCmp("SJYH_ZIYW").getValue() == "01" && Ext.getCmp("DTMM_ZIYW").getValue() == "请选择" && Ext.getCmp("WYZS_ZIYW").getValue() == "请选择"){
												jsLog(logStrMsg("抱歉：[手机银行申请]无法切换客户输入!","INFO"));
												myocx.InvokeBusinessForm(9,"",222,"抱歉：[手机银行申请]无法切换客户输入!");  //消息弹窗程序
											}else{
												getMsgBody4G2("M0202","P012",0,"","terminalInput");   //清空单选按钮
												Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("客户输入")+"</h1></font>");
												Ext.getCmp("101308").setVisible(false);
												Ext.getCmp("101310").setVisible(false);   //客户unguarded消息通知的时间是如何实现的
												Ext.getCmp("101309").setVisible(true);
												Ext.getCmp("101307").setDisabled(true);
											}
											
										}
									},{
										xtype : 'button',
										width : 100,
										id : '101309',
										hidden : true,
										height : 40,
										text : '<font style="font-size:16px;margin-top:0px">坐席输入</font>',
										style : 'margin-top:5px',
										handler : function() {
											getMsgBody4G2("M0202","P012",0,"","agentInput");   //清空单选按钮
											Ext.getCmp("101307").setDisabled(false);
											Ext.getCmp("101309").setVisible(false);
											Ext.getCmp("101308").setVisible(true);
											Ext.getCmp("101310").setVisible(true);
											Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("坐席输入")+"</h1></font>");
										}
									},{
										xtype : 'button',
										width : 100,
										id : '101311',
										height : 40,
										text : '<font style="font-size:16px;margin-top:0px">交易检查</font>',
										style : 'margin-top:5px',    //dzyh_shenqing
										handler : function() {
											if(Ext.getCmp("SJYH_ZIYW").getValue() == "01" && sjyh_phone_checkcode != Ext.getCmp("SJ_phoneNum").getValue() && sjyh_phone_checkcode != ""){
												jsLog(logStrMsg("手机号已修改，请重新发送验证码!","INFO"));
												myocx.InvokeBusinessForm(9,"",222,"交易检查错误：[客户将手机号已修改，请重新校验短信验证码!]");
											}else{
												Ext.getCmp("101310").setDisabled(true);
											    if(Ext.getCmp("WYZS_ZIYW").getValue() == "请选择" && Ext.getCmp("DTMM_ZIYW").getValue() == "请选择" && Ext.getCmp("SJYH_ZIYW").getValue() == "请选择" && !Ext.getCmp("dzyh_shenqing").getValue()  && !Ext.getCmp("dzyh_xiugai").getValue() && !Ext.getCmp("dzyh_chongzhi").getValue() && !Ext.getCmp("dhyh_shenqings").getValue() && !Ext.getCmp("dhyh_xiugai").getValue() && !Ext.getCmp("dhyh_chongzhi").getValue()){
											    	//friendShipMsg("请选择相应的业务!");
											    	myocx.InvokeBusinessForm(9,"",222,"请提交或清空相应的业务");  //消息弹窗程序
											    }else{
											    	if(Ext.getCmp("dzyh_shenqing").getValue() || Ext.getCmp("dzyh_xiugai").getValue() || Ext.getCmp("dzyh_chongzhi").getValue()){
											    		if(Ext.getCmp("DTMM_ZIYW").getValue() == "请选择" && Ext.getCmp("WYZS_ZIYW").getValue() == "请选择" && Ext.getCmp("SJYH_ZIYW").getValue() == "请选择"){
											    			Ext.getCmp("101311").setDisabled(true);
											    			getMsgBody4G2("M0202","",9,"","");
											    		}else{
											    			//friendShipMsg("电子银行密码管理需单独办理!");
											    			myocx.InvokeBusinessForm(9,"",222,"电子银行密码管理需单独办理!");  //消息弹窗程序
											    		}
											    	}else{
											    		Ext.getCmp("101311").setDisabled(true);
											    		getMsgBody4G2("M0202","",9,"","");
											    	}
											    	
											    }
												Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("交易检查")+"</h1></font>");
											}
										}
									},{
										xtype : 'button',
										width : 100,
										id : '101310',
										height : 40,
										disabled : true,
										text : '<font style="font-size:16px;margin-top:0px">继续</font>',
										style : 'margin-top:5px',
										handler : function() {
//											getMsgBody4G2("M0202","",9,"","");
											//将发送消息V-->VTM跳转到确认页面，在此需要先判断所有校验通过才跳转；(以及如何与Terminal相对应确认页的业务信息，待与曲晓沟通)
											getMsgBody4G2("M0202","P012",1,"P013","");   //发送消息-->跳转电子渠道确认页面 
											setSurePage(); //给确认页面 赋值函数
											synWithTerm(14,1);   //测试=>点击继续跳转到综合业务确认页面
											Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("继续")+"</h1></font>");
										}
									}]
				            	
				           	 }]
			},{
				//--------------------------------------------- ↓ 理财风险评估问卷 begin ↓ -------------------------------------------
				layout : 'border',
				autoScroll : true,
				labelWidth : 100,
				labelAlign : 'right',
				border : false,
				id : '1014',
				title : '业务选择>身份核实>业务章程><font style="color:#bf1919">评估问卷</font>>客户资料>客户签字>审核客户资料>附加设置>办理完成',
				name : 'TZLC',
				items : [{
					region : 'center',
					border : false,
					labelAlign : 'right',
					id : '101401',
					layout : 'form',
					bodyStyle : 'padding-top:30px',
					autoScroll : true,
					items : [{
						layout : 'column',
						id : '101402',
						autoWidth : true, 
						border : false,
						items : [{
							 columnWidth : 1,
							 border : false,
							 layout : 'form',
							 items : [{
						 		   xtype : 'displayfield',
						  		   hideLabel : true,
						 		   html : '<div style="font-size:18px;font-weight:bold;color:green;text-align:center">个人客户电子渠道理财风险评估问卷<div>'
							    }]
							 },{
								columnWidth : 1,
								border : true,
								id : 'WJ_1',
								layout : 'form',
								items : [{
									border : true,
									xtype : 'displayfield',
									hideLabel : true,
									html : '<font style="color:#22097B;font-weight:bold">1、您的年龄是？</font>'
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_2',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(A)18-25岁',
									name:'111',
									id : 'DA_1_A',
									checked : false,
									inputValue:'111_A',
									onClick : function (){
									     goNextYN = 0;
									     goNextYN+=1;
										if(!(readLog().indexOf("1-A")>=0)){  //去读日志文件最后一样是否是发送了1-A的信息；
											getMsgBody4G2("M0204","P014",0,"","1-A");   //发送消息--> VTM 填写问卷										
										}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								layout : 'form',
								id : 'WJ_3',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(B)26-50岁',
									name:'111',
									id : 'DA_1_B',
									inputValue:'111_B',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=1;
										if(!(readLog().indexOf("1-B")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","1-B");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								layout : 'form',
								id : 'WJ_4',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(C)51-60岁',
									id : 'DA_1_C',
									name:'111',
									inputValue:'111_C',
									onClick : function (){
									     goNextYN = 0;
									     goNextYN+=1;
										if(!(readLog().indexOf("1-C")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","1-C");   //发送消息--> VTM 填写问卷
									 	}
									}								
								}]
							},{
								columnWidth : 1,
								border : true,
								layout : 'form',
								id : 'WJ_5',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(D)61-65岁',
									id : 'DA_1_D',
									name:'111',
									inputValue:'111_D',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=1;
										 checkbox ++;
									 	if(!(readLog().indexOf("1-D")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","1-D");   //发送消息--> VTM 填写问卷
									 	}
									}								
								}]
							},{
								columnWidth : 1,
								border : true,
								layout : 'form',
								id : 'WJ_6',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(E)高于65岁',
									id : 'DA_1_E',
									name:'111',
									inputValue:'111_E',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=1;
										 checkbox ++;
									 	if(!(readLog().indexOf("1-D")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","1-D");   //发送消息--> VTM 填写问卷
									 	}
									}								
								}]
							},{
							columnWidth : 1,
							border : true,
							id : 'WJ_7',
							layout : 'form',
							items : [{
									xtype : 'displayfield',
									hideLabel : true,
									html : '<font style="color:#22097B;font-weight:bold">2.	您的家庭总资产净值为（折合人民币）？（不包括自用住宅和私营企业等实业投资，包括储蓄、保险、金融投资、实物投资，并需扣除未结清贷款、信用卡账单等债务）</font>'
								}]
							},{
								columnWidth : 1,
								border : true,
								layout : 'form',
								id : 'WJ_8',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(A)15万元及以下',
									name:'222',
									id : 'DA_2_A',
									inputValue:'222_A',
									onClick : function (){
									     goNextYN = 0;
									     goNextYN+=2;
									 	if(!(readLog().indexOf("2-A")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","2-A");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								layout : 'form',
								id : 'WJ_9',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(B)15（含）-50万元（不含）',
									id : 'DA_2_B',
									name:'222',
									inputValue:'222_B',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=2;
									 	if(!(readLog().indexOf("2-B")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","2-B");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								layout : 'form',
								id : 'WJ_10',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(C)50（含）-100万元（不含）',
									id : 'DA_2_C',
									name:'222',
									inputValue:'222_C',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=2;
									 	if(!(readLog().indexOf("2-C")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","2-C");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_11',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(D)100（含）-1000万元（不含）',
									id : 'DA_2_D',
									name : '222',
									inputValue:'222_D',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=2;
									 	if(!(readLog().indexOf("2-D")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","2-D");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_12',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(E)1000万元以上（含）',
									id : 'DA_2_E',
									name:'222',
									inputValue:'222_E',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=2;
									 	if(!(readLog().indexOf("2-E")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","2-E");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
							columnWidth : 1,
							border : true,
							id : 'WJ_13',
							layout : 'form',
							items : [{
									xtype : 'displayfield',
									hideLabel : true,
									html : '<font style="color:#22097B;font-weight:bold">3.	在您的家庭总资产净值中，可用于金融投资（储蓄存款除外）的比例为？</font>'
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_14',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(A)小于10%',
									id : 'DA_3_A',
									name:'333',
									inputValue:'333_A',
									onClick : function (){ 
										 goNextYN = 0;
									     goNextYN+=3;
									 	if(!(readLog().indexOf("3-A")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","3-A");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								layout : 'form',
								id : 'WJ_15',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(B)10%至25%',
									id : 'DA_3_B',
									name:'333',
									inputValue:'333_B',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=3;
									 	if(!(readLog().indexOf("3-B")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","3-B");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_16',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(C)25%至50%',
									id : 'DA_3_C',
									name:'333',
									inputValue:'333_C',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=3;
									 	if(!(readLog().indexOf("3-C")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","3-C");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								layout : 'form',
								id : 'WJ_17',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(D)大于50%',
									id : 'DA_3_D',
									name:'333',
									inputValue:'333_D',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=3;
									 	if(!(readLog().indexOf("3-D")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","3-D");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
							columnWidth : 1,
							border : true,
							id : 'WJ_18',
							layout : 'form',
							items : [{
									xtype : 'displayfield',
									hideLabel : true,
									html : '<font style="color:#22097B;font-weight:bold">4.	以下哪项最能说明您的投资经验？</font>'
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_19',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(A)除存款、国债外，我几乎不投资其他金融产品',
									id : 'DA_4_A',
									name:'444',
									inputValue:'444_A',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=4;
									 	if(!(readLog().indexOf("4-A")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","4-A");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_20',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(B)大部分投资于存款、国债等，较少投资于股票、基金等风险产品',
									id : 'DA_4_B',
									name:'444',
									inputValue:'444_B',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=4;
									 	if(!(readLog().indexOf("4-B")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","4-B");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_21',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(C)资产均衡地分布于存款、国债、银行理财产品、信托产品、股票、基金等',
									id : 'DA_4_C',
									name:'444',
									inputValue:'444_C',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=4;
									 	if(!(readLog().indexOf("4-C")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","4-C");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_22',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(D)大部分投资于股票、基金、外汇等高风险产品，较少投资于存款、国债',
									id : 'DA_4_D',
									name:'444',
									inputValue:'444_D',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=4;
									 	if(!(readLog().indexOf("4-D")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","4-D");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
							columnWidth : 1,
							border : true,
							id : 'WJ_23',
							layout : 'form',
							items : [{
									xtype : 'displayfield',
									hideLabel : true,
									html : '<font style="color:#22097B;font-weight:bold">5、您有多少年投资股票、基金、外汇、金融衍生产品等风险投资品的经验？</font>'
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_24',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(A)没有经验',
									id : 'DA_5_A',
									name:'555',
									inputValue:'555_A',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=5;
									 	if(!(readLog().indexOf("5-A")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","5-A");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								layout : 'form',
								id : 'WJ_25',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(B)有经验，但少于2年',
									id : 'DA_5_B',
									name:'555',
									inputValue:'555_B',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=5;
									 	if(!(readLog().indexOf("5-B")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","5-B");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_26',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(C)2年至5年',
									id : 'DA_5_C',
									name:'555',
									inputValue:'555_C',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=5;
									 	if(!(readLog().indexOf("5-C")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","5-C");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_27',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(D)5年至8年',
									id : 'DA_5_D',
									name:'555',
									inputValue:'555_D',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=5;
									 	if(!(readLog().indexOf("5-D")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","5-D");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								layout : 'form',
								id : 'WJ_28',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(E)8年以上',
									id : 'DA_5_E',
									name:'555',
									inputValue:'555_E',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=5;
									 	if(!(readLog().indexOf("5-E")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","5-E");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
							columnWidth : 1,
							border : true,
							id : 'WJ_29',
							layout : 'form',
							items : [{
									xtype : 'displayfield',
									hideLabel : true,
									html : '<font style="color:#22097B;font-weight:bold">6、以下哪项描述最符合您的投资态度？</font>'
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_30',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(A)厌恶风险，不希望本金损失，希望获得稳定回报',
									id : 'DA_6_A',
									name:'666',
									inputValue:'666_A',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=6;
									 	if(!(readLog().indexOf("6-A")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","6-A");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								layout : 'form',
								id : 'WJ_31',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(B)保守投资，不希望本金损失，愿意承担一定幅度的收益波动',
									id : 'DA_6_B',
									name:'666',
									inputValue:'666_B',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=6;
									 	if(!(readLog().indexOf("6-B")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","6-B");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								layout : 'form',
								id : 'WJ_32',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(C)寻求资金的较高收益和成长性，愿意为此承担有限本金损失',
									id : 'DA_6_C',
									name:'666',
									inputValue:'666_C',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=6;
									 	if(!(readLog().indexOf("6-C")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","6-C");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								layout : 'form',
								id : 'WJ_33',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(D)希望赚取高回报，能接受为长期间的负面波动，包括本金损失',
									id : 'DA_6_D',
									name:'666',
									inputValue:'666_D',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=6;
									 	if(!(readLog().indexOf("6-D")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","6-D");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_34',
								layout : 'form',
								items : [{
									xtype : 'displayfield',
									hideLabel : true,
									html : '<font style="color:#22097B;font-weight:bold">7、本金100万元，不提供保本承诺的情况下，您会选择哪一种投资机会？</font>'
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_35',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(A)有100%的机会赢取1000元现金，并保证归还',
									id : 'DA_7_A',
									name:'777',
									inputValue:'777_A',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=7;
									 	if(!(readLog().indexOf("7-A")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","7-A");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_36',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(B)有50%的机会赢取5万元现金，并有较高可能性归还本金',
									id : 'DA_7_B',
									name:'777',
									inputValue:'777_B',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=7;
									 	if(!(readLog().indexOf("7-B")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","7-B");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								layout : 'form',
								id : 'WJ_37',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(C)有25%的机会赢取50万元现金，并有一定的可能性损失本金',
									id : 'DA_7_C',
									name:'777',
									inputValue:'777_C',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=7;
									 	if(!(readLog().indexOf("7-C")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","7-C");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_38',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(D)有10%的机会赢取100万元现金，并有较高可能性损失本金',
									id : 'DA_7_D',
									name:'777',
									inputValue:'777_D',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=7;
									 	if(!(readLog().indexOf("7-D")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","7-D");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
							columnWidth : 1,
							border : true,
							id : 'WJ_39',
							layout : 'form',
							items : [{
									xtype : 'displayfield',
									hideLabel : true,
									html : '<font style="color:#22097B;font-weight:bold">8、投资于理财、股票、基金等金融投资品（不含存款和国债）时，您可接受的最长投资期限是多久？</font>'
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_40',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(A)1年（含）以下',
									id : 'DA_8_A',
									name:'888',
									inputValue:'888_A',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=8;
										    if(!(readLog().indexOf("8-A")>=0)){
										 		getMsgBody4G2("M0204","P014",0,"","8-A");   //发送消息--> VTM 填写问卷
										 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_41',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(B)1（不含）-3（含）年',
									id : 'DA_8_B',
									name:'888',
									inputValue:'888_B',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=8;
										 	if(!(readLog().indexOf("8-B")>=0)){
										 		getMsgBody4G2("M0204","P014",0,"","8-B");   //发送消息--> VTM 填写问卷
										 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_42',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(C)3（不含）-5（含）年',
									id : 'DA_8_C',
									name:'888',
									inputValue:'888_C',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=8;
									 	if(!(readLog().indexOf("8-C")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","8-C");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_43',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(D)5年以上',
									id : 'DA_8_D',
									name:'888',
									inputValue:'888_D',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=8;
									 	if(!(readLog().indexOf("8-D")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","8-D");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
							columnWidth : 1,
							border : true,
							id : 'WJ_44',
							layout : 'form',
							items : [{
									xtype : 'displayfield',
									hideLabel : true,
									html : '<font style="color:#22097B;font-weight:bold">9、您的投资目的是？</font>'
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_45',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(A)资产保值',
									id : 'DA_9_A',
									name:'999',
									inputValue:'999_A',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=9;
									 	if(!(readLog().indexOf("9-A")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","9-A");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_46',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(B)资产稳健增值',
									id : 'DA_9_B',
									name:'999',
									inputValue:'999_B',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=9;
									 	if(!(readLog().indexOf("9-B")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","9-B");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_47',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(C)资产迅速增值',
									id : 'DA_9_C',
									name:'999',
									inputValue:'999_C',
									onClick : function (){
										 goNextYN = 0;
									     goNextYN+=9;
									 	if(!(readLog().indexOf("9-C")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","9-C");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
							columnWidth : 1,
							border : true,
							id : 'WJ_48',
							layout : 'form',
							items : [{
									xtype : 'displayfield',
									hideLabel : true,
									html : '<font style="color:#22097B;font-weight:bold">10、您投资产品的价值出现何种程度的波动时，您会呈现明显的焦虑？</font>'
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_49',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(A)本金无损失，但收益未达预期',
									id : 'DA_10_A',
									name:'000',
									inputValue:'000_A',
									onClick : function (){
										 Ext.getCmp("222").setDisabled(false);  //暂时放在此处
										 goNextYN = 0;
									     goNextYN+=10;
									 	if(!(readLog().indexOf("10-A")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","10-A");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_50',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(B)出现轻微本金损失',
									id : 'DA_10_B',
									name:'000',
									inputValue:'000_B',
									onClick : function (){
										 Ext.getCmp("222").setDisabled(false);
										 goNextYN = 0;
									     goNextYN+=10;
									 	if(!(readLog().indexOf("10-B")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","10-B");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_51',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(C)本金10%以内的损失',
									id : 'DA_10_C',
									name:'000',
									inputValue:'000_C',
									onClick : function (){
										 Ext.getCmp("222").setDisabled(false);
										 goNextYN = 0;
									     goNextYN+=10;
									 	if(!(readLog().indexOf("10-C")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","10-C");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_52',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(D)本金20%-50%的损失',
									id : 'DA_10_D',
									name:'000',
									inputValue:'000_D',
									onClick : function (){
										 Ext.getCmp("222").setDisabled(false);
										 goNextYN = 0;
									     goNextYN+=10;
									 	if(!(readLog().indexOf("10-D")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","10-D");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_53',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(E)本金50%以上的损失',
									id : 'DA_10_E',
									name:'000',
									inputValue:'000_E',
									onClick : function (){
										 Ext.getCmp("222").setDisabled(false);
										 goNextYN = 0;
									     goNextYN+=10;
									 	if(!(readLog().indexOf("10-E")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","10-E");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
							columnWidth : 1,
							border : true,
							id : 'WJ_54',
							layout : 'form',
							items : [{
									xtype : 'displayfield',
									hideLabel : true,
									html : '<font style="color:#22097B;font-weight:bold">11、对您而言，保本比高收益更为重要？</font>'
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_55',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(A)非常同意',
									id : 'DA_11_A',
									name:'010',
									inputValue:'010_A',
									onClick : function (){
										 Ext.getCmp("222").setDisabled(false);  //暂时放在此处
										 goNextYN = 0;
									     goNextYN+=10;
									 	if(!(readLog().indexOf("11-A")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","11-A");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_56',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(B)同意',
									id : 'DA_11_B',
									name:'010',
									inputValue:'010_B',
									onClick : function (){
										 Ext.getCmp("222").setDisabled(false);  //暂时放在此处
										 goNextYN = 0;
									     goNextYN+=10;
									 	if(!(readLog().indexOf("11-B")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","11-B");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_57',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(C)无所谓',
									id : 'DA_11_C',
									name:'010',
									inputValue:'010_C',
									onClick : function (){
										 Ext.getCmp("222").setDisabled(false);  //暂时放在此处
										 goNextYN = 0;
									     goNextYN+=10;
									 	if(!(readLog().indexOf("11-C")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","11-C");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_58',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(D)不同意',
									id : 'DA_11_D',
									name:'010',
									inputValue:'010_D',
									onClick : function (){
										 Ext.getCmp("222").setDisabled(false);  //暂时放在此处
										 goNextYN = 0;
									     goNextYN+=10;
									 	if(!(readLog().indexOf("11-D")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","11-D");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							},{
								columnWidth : 1,
								border : true,
								id : 'WJ_59',
								layout : 'form',
								xtype:'radiogroup',
								items : [{
									border : true,
									boxLabel:'(E)非常不同意',
									id : 'DA_11_E',
									name:'010',
									inputValue:'010_E',
									onClick : function (){
										 Ext.getCmp("222").setDisabled(false);  //暂时放在此处
										 goNextYN = 0;
									     goNextYN+=10;
									 	if(!(readLog().indexOf("11-E")>=0)){
									 		getMsgBody4G2("M0204","P014",0,"","11-E");   //发送消息--> VTM 填写问卷
									 	}
									}
								}]
							}
							]
					}],
					buttonAlign : 'center',
					buttons : [{
						xtype : 'button',
						width : 100,
						id : '000',
						region : 'center',
						height : 40,
						text : '<font style="font-size:16px;margin-top:0px">客户选择</font>',
						handler : function() {
							//101402get
							//Ext.getCmp('WJ_1').form.reset();
							//Ext.getCmp("DA_1_A").setValue(false);
							//CusPersonalFormCallin.getForm().getEl().dom.reset();//
							//CusPersonalFormCallin.form.reset();//
							getMsgBody4G2("M0204","P014",0,"","terminalChoice");
							Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("客户选择")+"</h1></font>");
							Ext.getCmp("000").setVisible(false);
							Ext.getCmp("111").setVisible(true);
							Ext.getCmp("222").setVisible(false);
							Ext.getCmp("101402").setDisabled(true);
							Ext.getCmp("uppage").setDisabled(true);   //将上一页下一页两个按钮给灰调
							Ext.getCmp("downpage").setDisabled(true);
						}
					}, {
						xtype : 'button',
						width : 100,
						id : '111',
						height : 40,
						text : '<font style="font-size:16px;margin-top:0px">坐席选择</font>',
						handler : function() {
							getMsgBody4G2("M0204","P014",0,"","agentChoice");
							Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("坐席选择")+"</h1></font>");
							Ext.getCmp("000").setVisible(true);
							Ext.getCmp("111").setVisible(false);
							Ext.getCmp("222").setVisible(true);
							Ext.getCmp("101402").setDisabled(false);
							Ext.getCmp("uppage").setDisabled(false);  
							Ext.getCmp("downpage").setDisabled(false);
						}
					}, {
						xtype : 'button',
						width : 100,
						id : '222',
						height : 40,
						disabled : true,
						text : '<font style="font-size:16px;margin-top:0px">提交</font>',
						handler : function() {
							Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("提交")+"</h1></font>");
							//需要判断 是否有没有选择的题目，则不提交，并提示坐席；
							//if(goNextYN == 10){
								//Ext.getCmp().setDisabled(true);
							//}
							//提交问卷之后发送消息告诉 VTM 跳转到 问卷结果页面
							getMsgBody4G2("M0204","P014",1,"P032","");
							Ext.getCmp("1022222").setDisabled(true);
							synWithTerm(21,1); 
							//发送消息让VTM跳转到评估结果页面
						}
					}
					, {
						xtype : 'button',
						id : 'uppage',
						region : 'right',
						style : 'margin-left:360px',
						text : '<font style="font-size:16px;margin-top:0px">上一页</font>',
						handler : function() {
						//Regagentmsg("6666","6666","s|s|s|s|s|M0204|P014|0||4-C");
							if(WJXX == 3){
								//表示页面要发生跳转  hiddenLiCaiPage(1,1,22);  hiddenLiCaiPage(2,23,38);  hiddenLiCaiPage(3,39,59);
								hiddenLiCaiPage(2,23,38);
								getMsgBody4G2("M0204","P01403",1,"P01402","");
								//Regagentmsg("6666","6666","s|s|s|s|s|M0204|P01403|1|P01402|");
							}else if(WJXX == 2){
								hiddenLiCaiPage(1,1,22);
								getMsgBody4G2("M0204","P01402",1,"P01401","");
								//Regagentmsg("6666","6666","s|s|s|s|s|M0204|P01402|1|P01401|");
							}
						}
					}, {
						xtype : 'button',
						id : 'downpage',
						region : 'right',
						text : '<font style="font-size:16px;margin-top:0px">下一页</font>',
						handler : function() {
							if(WJXX == 1){
								hiddenLiCaiPage(2,23,38);
								getMsgBody4G2("M0204","P01401",1,"P01402","");
								//Regagentmsg("6666","6666","s|s|s|s|s|M0204|P01401|1|P01402|");
							}else if(WJXX = 2){
								hiddenLiCaiPage(3,39,59);	
								getMsgBody4G2("M0204","P01402",1,"P01403","");
								//Regagentmsg("6666","6666","s|s|s|s|s|M0204|P01402|1|P01403|");
							}
						}
					}]
				}]
			}
//------------------------------------------------------ ↑ 评估问卷end ↑ -------------------------------------------------------------
			,{
				title : '业务选择>身份核实>业务章程><font style="color:#bf1919">客户资料</font>>客户签字>审核客户资料>附加设置>办理完成',
				layout : 'border',
				autoScroll : true,
				labelWidth : 100,
				labelAlign : 'right',
				border : false,
				id : '1015',
				name : '客户业务功能确认',
				region : 'center',
				items : [{
					region : 'center',
					border : false,
					labelAlign : 'right',
					id : '101501',
					autoScroll : true,
					layout : 'form',
					items : [{
						layout : 'column',
						autoWidth : true, 
						border : false,
						items : [{
							columnWidth : .55,
							border : false,
							layout : 'form',
							style: 'margin-top:10px;',
							items : [{
										xtype : 'displayfield',
										fieldLabel : '姓名',
										id : 'zonghe_name_ck',
										name : 'zonghe_name_ck',
										anchor : '100%',
										value : ''
									},{
										xtype : 'displayfield',
										fieldLabel : '手机号码',
										id : 'zonghe_callPhone_ck',
										name : 'zonghe_callPhone_ck',
										anchor : '100%',
										value : ''
									},{
										xtype : 'displayfield',
										fieldLabel : '固定电话',
										id : 'zonghe_callguhua_ck',
										name : 'zonghe_callguhua_ck',
										anchor : '100%',
										value : ''
									}]
							},{
							columnWidth : .45,
							border : false,
							layout : 'form',
							style: 'margin-top:10px;',
							items : [{
										xtype : 'displayfield',
										fieldLabel : '证件类型',
										id : 'zonghe_cardtype_ck',
										name : 'zonghe_cardtype_ck',
										anchor : '100%',
										value : ''
									},{
										xtype : 'displayfield',
										fieldLabel : '证件号码',
										id : 'zhonghe_cardID_ck',
										name : 'zhonghe_cardID_ck',
										anchor : '100%',
										value : ''
									}]
							},
							
							//--------------- 2014/7/10 WYZS_code_CK  网银证书确认页面设计------------
							{
				            	columnWidth: 1,
								xtype : 'fieldset',
								title: '<font style="color:#033;font-size:18px"><h1>网上银行证书版</h1></font>',
				                style: 'margin-top:10px;',
				                collapsible : false,
								collapsed : false,
								id : 'ZH_WYZS_CK',
								hidden : true,
								layout : 'form',
								items : [{
										layout : 'column',
										style: 'margin-left:20px;',
										border : false,
										items : [{
								            	columnWidth: 1,
												xtype : 'fieldset',
												title: '申请',
								                collapsible : false,
												collapsed : false,
												hidden : true,
												id : 'ZH_WYZS_CK_shenqing',
												layout : 'form',
												items : [{
															xtype : 'displayfield',
															fieldLabel : '卡/账号',
															id : 'ZH_WYZS_CK_shenqing_cardNum',
															name : 'ZH_WYZS_CK_shenqing_cardNum',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '手机号',
															id : 'ZH_WYZS_CK_shenqing_phoneNum',
															name : 'ZH_WYZS_CK_shenqing_phoneNum',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '转账功能',
															id : 'ZH_WYZS_CK_shenqing_zhuanzhang',
															name : 'ZH_WYZS_CK_shenqing_zhuanzhang',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '限额',
															id : 'ZH_WYZS_CK_shenqing_xe',
															name : 'ZH_WYZS_CK_shenqing_xe',
															value : ''
														}]
											},{	
								            	columnWidth: 1,
												xtype : 'fieldset',
												title: '添加下挂账户',
								                collapsible : false,
												collapsed : false,
												hidden : true,
												id : 'ZH_WYZS_CK_xiagua',
												layout : 'form',
												items : [{
															xtype : 'displayfield',
															fieldLabel : '卡/账号',
															id : 'ZH_WYZS_CK_xiagua_cardNum',
															name : 'ZH_WYZS_CK_xiagua_cardNum',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '转账功能',
															id : 'ZH_WYZS_CK_xiagua_zhuanzhang',
															name : 'ZH_WYZS_CK_xiagua_zhuanzhang',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '限额',
															id : 'ZH_WYZS_CK_xiagua_xe',
															name : 'ZH_WYZS_CK_xiagua_xe',
															value : ''
														}]
											},{
								            	columnWidth: 1,
												xtype : 'fieldset',
												title: '电子密盾开机密码挂失',
								                collapsible : false,
												collapsed : false,
												hidden : true,
												id : 'ZH_WYZS_CK_guashi',
												layout : 'form',
												items : [{
															xtype : 'displayfield',
															fieldLabel : '卡/账号',
															id : 'ZH_WYZS_CK_guashi_cardNum',
															name : 'ZH_WYZS_CK_guashi_cardNum',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '电子密盾编号',
															id : 'ZH_WYZS_CK_guashi_dzmdNum',
															name : 'ZH_WYZS_CK_guashi_dzmdNum',
															value : ''
														}]
											},{
								            	columnWidth: 1,
												xtype : 'fieldset',
												title: '修改最高转账限额',
								                collapsible : false,
												collapsed : false,
												hidden : true,
												id : 'ZH_WYZS_CK_zhuanzhang',
												layout : 'form',
												items : [{
															xtype : 'displayfield',
															fieldLabel : '卡/账号',
															id : 'ZH_WYZS_CK_zhuanzhang_cardNum',
															name : 'ZH_WYZS_CK_zhuanzhang_cardNum',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '转账功能',
															id : 'ZH_WYZS_CK_zhuanzhang_zhuanzhang',
															name : 'ZH_WYZS_CK_zhuanzhang_zhuanzhang',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '限额',
															id : 'ZH_WYZS_CK_zhuanzhang_xe',
															name : 'ZH_WYZS_CK_zhuanzhang_xe',
															value : ''
														}]
											},{
								            	columnWidth: 1,
												xtype : 'fieldset',
												title: '恢复启用网银',
								                collapsible : false,
												collapsed : false,
												hidden : true,
												id : 'ZH_WYZS_CK_hfqy',
												layout : 'form',
												items : [{
															xtype : 'displayfield',
															fieldLabel : '卡/账号',
															id : 'ZH_WYZS_CK_hfqy_cardNum',
															name : 'ZH_WYZS_CK_hfqy_cardNum',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '手机号',
															id : 'ZH_WYZS_CK_hfqy_phoneNum',
															name : 'ZH_WYZS_CK_hfqy_phoneNum',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '电子密盾编号',
															id : 'ZH_WYZS_CK_hfqy_dzmdNum',
															name : 'ZH_WYZS_CK_hfqy_dzmdNum',
															value : ''
														}]
											},{
								            	columnWidth: 1,
												xtype : 'fieldset',
												title: '恢复电子密盾验证',
								                collapsible : false,
												collapsed : false,
												hidden : true,
												id : 'ZH_WYZS_CK_hfyz',
												layout : 'form',
												items : [{
															xtype : 'displayfield',
															fieldLabel : '卡/账号',
															id : 'ZH_WYZS_CK_hfyz_cardNum',
															name : 'ZH_WYZS_CK_hfyz_cardNum',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '电子密盾编号',
															id : 'ZH_WYZS_CK_hfyz_dzmdNum',
															name : 'ZH_WYZS_CK_hfyz_dzmdNum',
															value : ''
														}]
											}]
									}]
							}
							//-------------------------------------
							,{
				            	columnWidth: 1,
								xtype : 'fieldset',
								title: '<font style="color:#033;font-size:18px"><h1>网上银行动态密码版</h1></font>',
				                style: 'margin-top:10px;',
				                collapsible : false,
								collapsed : false,
								id : 'ZH_DTMM_CK',
								hidden : true,
								layout : 'form',
								items : [{
										layout : 'column',
										style: 'margin-left:20px;',
										border : false,
										items : [{
								            	columnWidth: 1,
												xtype : 'fieldset',
												title: '申请',
								                collapsible : false,
												collapsed : false,
												hidden : true,
												id : 'ZH_DTMM_CK_shenqing',
												layout : 'form',
												items : [{
															xtype : 'displayfield',
															fieldLabel : '卡/账号',
															id : 'ZH_DTMM_CK_shenqing_cardNum',
															name : 'ZH_DTMM_CK_shenqing_cardNum',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '绑定手机号',
															id : 'ZH_DTMM_CK_shenqing_BDphone',
															name : 'ZH_DTMM_CK_shenqing_BDphone',
															value : ''
														}]
											},{	
								            	columnWidth: 1,
												xtype : 'fieldset',
												title: '修改',
								                collapsible : false,
												collapsed : false,
												hidden : true,
												id : 'ZH_DTMM_CK_xiugai',
												layout : 'form',
												items : [{
															xtype : 'displayfield',
															fieldLabel : '卡/账号',
															id : 'ZH_DTMM_CK_xiugai_cardNum',
															name : 'ZH_DTMM_CK_xiugai_cardNum',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '原手机号',
															id : 'ZH_DTMM_CK_xiugai_oldPhone',
															name : 'ZH_DTMM_CK_xiugai_oldPhone',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '新手机号',
															id : 'ZH_DTMM_CK_xiugai_newPhone',
															name : 'ZH_DTMM_CK_xiugai_newPhone',
															value : ''
														}]
											},{
								            	columnWidth: 1,
												xtype : 'fieldset',
												title: '解锁',
								                collapsible : false,
												collapsed : false,
												hidden : true,
												id : 'ZH_DTMM_CK_jiesuo',
												layout : 'form',
												items : [{
															xtype : 'displayfield',
															fieldLabel : '卡/账号',
															id : 'ZH_DTMM_CK_jiesuo_cardNum',
															name : 'ZH_DTMM_CK_jiesuo_cardNum',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '绑定手机号',
															id : 'ZH_DTMM_CK_jiesuo_BDPhone',
															name : 'ZH_DTMM_CK_jiesuo_BDPhone',
															value : ''
														}]
											}]
									}]
							},{
				            	columnWidth: 1,
								xtype : 'fieldset',
								title: '<font style="color:#033;font-size:18px"><h1>手机银行</h1></font>',
				                style: 'margin-top:10px;',
				                collapsible : false,
								collapsed : false,
								width : 650,
								hidden :true,
								id : 'ZH_SJYH_CK',
								layout : 'form',
								items : [{
										layout : 'column',
										border : false,
										style: 'margin-left:20px;',
										items : [{
								            	columnWidth: 1,
												xtype : 'fieldset',
												title: '申请',
								                collapsible : false,
												collapsed : false,
												hidden : true,
												id : 'ZH_SJYH_CK_SQ',
												layout : 'form',
												items : [{
															xtype : 'displayfield',
															fieldLabel : '卡/账号',
															id : 'ZH_SJYH_CK_SQ_cardnum',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '绑定手机号',
															id : 'ZH_SJYH_CK_SQ_phonenum',
															value : ''
														}
														//,{
														//	xtype : 'displayfield',
														//	fieldLabel : '登录ID',
														//	id : 'ZH_SJYH_CK_SQ_LoginID',
														//	value : ''
														//}
														,{
															xtype : 'displayfield',
															fieldLabel : '转账功能',
															id : 'ZH_SJYH_CK_SQ_ZZ',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '支付功能',
															id : 'ZH_SJYH_CK_SQ_ZF',
															value : ''
														}]
											},{	
								            	columnWidth: 1,
												xtype : 'fieldset',
												title: '添加下挂账户',
								                collapsible : false,
												collapsed : false,
												hidden : true,
												id : 'ZH_SJYH_CK_TJ',
												layout : 'form',
												items : [{
															xtype : 'displayfield',
															fieldLabel : '卡/账号',
															id : 'ZH_SJYH_CK_TJ_cardnum',
															value : 'ZH_SJYH_CK_TJ_cardnum'
														},{
															xtype : 'displayfield',
															fieldLabel : '转账功能',
															id : 'ZH_SJYH_CK_TJ_ZZ',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '支付功能',
															id : 'ZH_SJYH_CK_TJ_ZF',
															value : ''
														}]
											},{
								            	columnWidth: 1,
												xtype : 'fieldset',
												title: '重置登录密码',
								                collapsible : false,
												collapsed : false,
												hidden : true,
												id : 'ZH_SJYH_CK_CZ',
												layout : 'form',
												items : [{
															xtype : 'displayfield',
															fieldLabel : '卡/账号',
															id : 'ZH_SJYH_CK_CZ_cardnum',
															value : ''
														}]
											},{
								            	columnWidth: 1,
												xtype : 'fieldset',
												title: '设置转账/支付功能',
								                collapsible : false,
												collapsed : false,
												hidden : true,
												id : 'ZH_SJYH_CK_ZZ',
												layout : 'form',
												items : [{
															xtype : 'displayfield',
															fieldLabel : '卡/账号',
															id : 'ZH_SJYH_CK_ZZ_cardnum',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '转账功能',
															id : 'ZH_SJYH_CK_ZZ_ZZ',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '支付功能',
															id : 'ZH_SJYH_CK_ZZ_ZF',
															value : ''
														}]
											},{
								            	columnWidth: 1,
												xtype : 'fieldset',
												title: '注销',
								                collapsible : false,
												collapsed : false,
												hidden : true,
												id : 'ZH_SJYH_CK_ZX',
												layout : 'form',
												items : [{
															xtype : 'displayfield',
															fieldLabel : '卡/账号',
															id : 'ZH_SJYH_CK_ZX_cardnum',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '登录ID',
															id : 'ZH_SJYH_CK_ZX_loginID',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '绑定手机号',
															id : 'ZH_SJYH_CK_ZX_phonenum',
															value : ''
														}]
											}]
							}]
							},{
				            	columnWidth: .5,
								xtype : 'fieldset',
								title: '<font style="color:#033;font-size:18px"><h1>电子银行密码管理</h1></font>',
				               // style: 'margin-top:10px;',
				                collapsible : false,
								collapsed : false,
								width : 650,
								hidden : true,  //金博会暂时隐藏c
								id : 'ZH_DZMM_CK',
								layout : 'form',
								items : [{
											xtype : 'displayfield',
											fieldLabel : '卡/账号',
											id : 'ZH_card_Number_dzmmgl',
											value : ''
										},{
											xtype : 'displayfield',
											hideLabel : true,
											id : 'dzmmgl_value',
											style : 'font-size:18px;font-weight:bold;margin-left:40px;',
											html : '申请'
										}]
							},{
				            	columnWidth: .5,
								xtype : 'fieldset',
								title: '<font style="color:#033;font-size:18px"><h1>电话银行交易密码管理</h1></font>',
				              //  style: 'margin-top:10px;',
				                collapsible : false,
								collapsed : false,
								width : 650,
								hidden : true,  //金博会暂时隐藏
								id : 'ZH_DHMM_CK',
								layout : 'form',
								items : [{
											xtype : 'displayfield',
											fieldLabel : '卡/账号',
											id : 'ZH_card_Number_dhmmgl',
											value : ''
										},{
											xtype : 'displayfield',
											hideLabel : true,
											id : 'dhmmgl_value',
											style : 'font-size:18px;font-weight:bold;margin-left:40px;',
											html : '申请'
										}] 
							}]
						}]
					},{
						
						layout : 'border',
						border : false,
						autoScroll : true,
						labelWidth : 100,
						region:"south",
						style : 'background-color:#FFF',
					    buttonAlign : 'center',
						buttons : [{
									width : 100,
									xtype : 'button',
									style: 'margin-right:10px;',
									id : '101502',
									hidden : true,
									height : 40,
									// width : 80,
									text : '<font style="font-size:16px;margin-top:0px">审核通过</font>',
									handler : function() {
										jsLog(logStrMsg("电子渠道-座席点击审核通过","INFO"));
										//takeSomeFiles();  //给各个业务的变量赋值conhisid;
										//去存储分类明细的业务信息
										jsLog(logStrMsg("checkPwdType的值为:"+checkPwdType,"INFO"));
										
										setTimeout("checkPwdmethod()",2000);
										//checkPwdmethod();
										Ext.getCmp("101502").setVisible(false);
										Ext.getCmp("101503").setVisible(false);
									}
								}, {
									text : '审核不通过',
									style: 'margin-right:10px;',
									width : 100,
									id : '101503',
									hidden : true,
									height : 40,
									// width : 80,
									text : '<font style="font-size:16px;margin-top:0px">审核不通过</font>',
									xtype : 'button',
									handler : function() {
										jsLog(logStrMsg("电子渠道-座席点击审核不通过","INFO"));
										//发送消息让Terminal跳转到P012综合页面填写页
										synWithTerm(12,1);
										Regagentmsg("6666","6666","s|s|s|s|s|s|P013|1|P012|s");
										getMsgBody4G2("M0202","P013",1,"P012","disagree");  //发送  VTM跳转到填写页面
										//返回到综合页面填写；
										Ext.getCmp("101502").setVisible(false);
										Ext.getCmp("101503").setVisible(false);
									}
								}]
					}]
			},{
				border : false,
				layout : 'border',
				id : '1016',
				title : '业务选择>身份核实>业务章程>客户资料><font style="color:#bf1919">关于密码</font>>客户签字>审核客户资料>附加设置>开卡完成',
				name : '验证密码页',
				items : [{
					region : 'center',
					border : false,
					items : [{
								layout : 'form',
								labelAlign : 'right',
								style : 'padding:220px 180px',
								labelWidth : 150,
								border : false,
								items : [{
											xtype : 'displayfield',
											hideLabel : true,
											id : '101600',
											style : 'text-align:center;font-size:18px;font-weight:bold;color:green;margin-top:20px;',
											html : '验证电子银行密码'
										},{
											xtype : 'displayfield',  
											id : 'cus_checkpwdinfo',
											fieldLabel : '提示',
											style : 'color:#bf1919',
											value : ''
										}, {
											xtype : 'textfield',
											width : 200,
											readOnly : true,
											id : 'cus_dzyhpwd',
											name : 'cus_dzyhpwd',
											fieldLabel : '密码'
										}
										,{
											hidden : true,
											xtype : 'button',
											text : '模拟密码输错3次结果',
											handler : function (){
//												Regagentmsg("6666","6666","S|S|S|S|S|M0202|P025|1|P026|P01201:1,P01204:1");
												//transactionReturnMsg("123");
												//ZForDZsixError("电子银行密码输错6次已被锁定,需要返回首页");
											}
										}
										]
							}]
				}]
			},{
				border : false,
				layout : 'border',
				id : '1017',
				title : '业务选择>身份核实>业务章程>客户资料><font style="color:#bf1919">关于密码</font>>客户签字>审核客户资料>附加设置>开卡完成',
				name : '客户信息密码识别页',
				items : [{
					region : 'center',
					border : false,
					items : [{
							layout : 'form',
							labelAlign : 'right',
							style : 'padding:220px 180px',
							labelWidth : 150,
							border : false,
							items : [{
									xtype : 'displayfield',
									hideLabel : true,
									id : '101601',
									style: 'font-size:18px;font-weight:bold;color:green;margin-top:20px;text-align:center',
									html : '设置新的手机银行登录密码'
								},{
									xtype : 'displayfield',  
									id : 'cus_pwdNewInfo',
									fieldLabel : '提示',
									style : 'color:#bf1919',
									value : ''
								}, {
									xtype : 'textfield',
									width : 150,
									readOnly : true,
									id : 'cus_newdzyhpwd',
									name : 'cus_newdzyhpwd',
									fieldLabel : '输入新密码'
								}, {
									xtype : 'textfield',
									width : 150,
									id : 'cus_newdzyhpwd2',
									name : 'cus_newdzyhpwd2',
									readOnly : true,
									fieldLabel : '确认新密码'
								}
//								,{
//									xtype : 'button',
//									text : '下一步',
//									handler : function (){
//										//跳转到业务办理成功页面  询问是否还继续
//										synWithTerm(17,1);
//									}
//								}
								]
						}]
				}]
			},{
				border : false,
				layout : 'border',
				id : '1018',
				title : '业务选择>身份核实>业务章程>客户资料>关于密码>客户签字>审核客户资料>附加设置><font style="color:#bf1919">业务办理完成</font>',
				name : '客户信息密码识别页',
				items : [{
					region : 'center',
					border : false,
					autoScroll : true,
					items : [{
						layout : 'form',
						labelAlign : 'right',
						labelWidth : 150,
						autoScroll : true,	
						border : false,
						items : [{
							layout : 'column',
							id : '101801',
							autoWidth : true, 
							border : false,
							items : [{
								columnWidth : 1,
								border : true,
								layout : 'form',
								style: 'margin-top:20px;',
								xtype : 'displayfield',
								hideLabel : true,
								style : 'margin-left:280px',
								id : '101802',
								html : '<div style="font-size:22px;font-weight:bold;color:green;margin-top:20px;">业务处理结果如下</div>'
							},
							//----------2014/7/11 网银证书处理结果页面设计   WYZS_code_over-----------
							{
				            	columnWidth: 1,
								xtype : 'fieldset',
								title: '<font style="color:#033;font-size:18px"><h1>网上银行证书版</h1></font>',
				                animCollapse : true,
								collapsed : false,
								style: 'margin-top:10px;',
								width : 300,
								id : 'over_WYZS',
								hidden : true,
								layout : 'form',
								items : [{
										layout : 'column',
										style: 'margin-left:20px;',
										border : false,
										items : [{
								            	columnWidth: .9,
												xtype : 'fieldset',
												title: '申请',
												style: 'margin-left:30px;',
								                collapsible : false,
												collapsed : false,
												hidden : true,
												id : 'over_WYZS_SQ',
												layout : 'form',
												items : [{
															xtype : 'displayfield',
															fieldLabel : '卡/账号',
															id : 'over_WYZS_SQ_cardnum',
															name : 'over_WYZS_SQ_cardnum',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '手机号',
															id : 'over_WYZS_SQ_phoneNum',
															name : 'over_WYZS_SQ_phoneNum',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '设备编号',
															id : 'over_WYZS_SQ_SBNum',
															name : 'over_WYZS_SQ_SBNum',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '转账功能',
															id : 'over_WYZS_SQ_zhuanzhang',
															name : 'over_WYZS_SQ_zhuanzhang',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '最高转账限额',
															id : 'over_WYZS_SQ_xe',
															name : 'over_WYZS_SQ_xe',
															value : ''
														},{
															xtype : 'displayfield',
															style : 'color:red;font-size:18px',
															fieldLabel : '办理结果',
															id : 'over_WYZS_SQ_result',
															name : 'over_WYZS_SQ_result',
															value : ''
														}]
											 },{
								            	columnWidth: .9,
												xtype : 'fieldset',
												title: '添加下挂账户',
								                collapsible : false,
												collapsed : false,
												style: 'margin-left:30px;',
												hidden : true,
												id : 'over_WYZS_XG',
												layout : 'form',
												items : [{
															xtype : 'displayfield',
															fieldLabel : '卡/账号',
															id : 'over_WYZS_XG_cardnum',
															name : 'over_WYZS_XG_cardnum',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '转账功能',
															id : 'over_WYZS_XG_zhuanzhang',
															name : 'over_WYZS_XG_zhuanzhang',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '最高转账限额',
															id : 'over_WYZS_XG_xe',
															name : 'over_WYZS_XG_xe',
															value : ''
														},{
															xtype : 'displayfield',
															style : 'color:red;font-size:18px',
															fieldLabel : '办理结果',
															id : 'over_WYZS_XG_result',
															name : 'over_WYZS_XG_result',
															value : ''
														}]
											},{
								            	columnWidth: .9,
												xtype : 'fieldset',
												title: '电子密盾开机密码挂失',
								                collapsible : false,
												collapsed : false,
												hidden : true,
												style: 'margin-left:30px;',
												id : 'over_WYZS_GS',
												layout : 'form',
												items : [{
													xtype : 'displayfield',
													fieldLabel : '卡/账号',
													id : 'over_WYZS_GS_cardnum',
													name : 'over_WYZS_GS_cardnum',
													value : ''
												 },{
													xtype : 'displayfield',
													fieldLabel : '电子密盾编号',
													id : 'over_WYZS_GS_dzmdNum',
													name : 'over_WYZS_GS_dzmdNum',
													value : ''
												},{
													xtype : 'displayfield',
													style : 'color:red;font-size:18px',
													fieldLabel : '办理结果',
													id : 'over_WYZS_GS_result',
													name : 'over_WYZS_GS_result',
													value : ''
												}]
											},{
								            	columnWidth: .9,
												xtype : 'fieldset',
												title: '修改最高转账限额',
								                collapsible : false,
												collapsed : false,
												hidden : true,
												style: 'margin-left:30px;',
												id : 'over_WYZS_XE',
												layout : 'form',
												items : [{
													xtype : 'displayfield',
													fieldLabel : '卡/账号',
													id : 'over_WYZS_XE_cardnum',
													name : 'over_WYZS_XE_cardnum',
													value : ''
												 },{
													xtype : 'displayfield',
													fieldLabel : '转账功能',
													id : 'over_WYZS_XE_zhuanzhang',
													name : 'over_WYZS_XE_zhuanzhang',
													value : ''
												},{
													xtype : 'displayfield',
													fieldLabel : '最高转账限额',
													id : 'over_WYZS_XE_xe',
													name : 'over_WYZS_XE_xe',
													value : ''
												},{
													xtype : 'displayfield',
													style : 'color:red;font-size:18px',
													fieldLabel : '办理结果',
													id : 'over_WYZS_XE_result',
													name : 'over_WYZS_XE_result',
													value : ''
												}]
											},{
								            	columnWidth: .9,
												xtype : 'fieldset',
												title: '恢复启用网银',
								                collapsible : false,
												collapsed : false,
												hidden : true,
												style: 'margin-left:30px;',
												id : 'over_WYZS_HFQY',
												layout : 'form',
												items : [{
													xtype : 'displayfield',
													fieldLabel : '卡/账号',
													id : 'over_WYZS_HFQY_cardnum',
													name : 'over_WYZS_HFQY_cardnum',
													value : ''
												 },{
													xtype : 'displayfield',
													fieldLabel : '手机号',
													id : 'over_WYZS_HFQY_phoneNum',
													name : 'over_WYZS_HFQY_phoneNum',
													value : ''
												},{
													xtype : 'displayfield',
													fieldLabel : '电子密盾编号',
													id : 'over_WYZS_HFQY_dzmdNum',
													name : 'over_WYZS_HFQY_dzmdNum',
													value : ''
												},{
													xtype : 'displayfield',
													style : 'color:red;font-size:18px',
													fieldLabel : '办理结果',
													id : 'over_WYZS_HFQY_result',
													name : 'over_WYZS_HFQY_result',
													value : ''
												}]
											},{
								            	columnWidth: .9,
												xtype : 'fieldset',
												title: '恢复电子密盾验证',
								                collapsible : false,
												collapsed : false,
												hidden : true,
												style: 'margin-left:30px;',
												id : 'over_WYZS_HFYZ',
												layout : 'form',
												items : [{
													xtype : 'displayfield',
													fieldLabel : '卡/账号',
													id : 'over_WYZS_HFYZ_cardnum',
													name : 'over_WYZS_HFYZ_cardnum',
													value : ''
												 },{
													xtype : 'displayfield',
													fieldLabel : '电子密盾编码',
													id : 'over_WYZS_HFYZ_dzmdNum',
													name : 'over_WYZS_HFYZ_dzmdNum',
													value : ''
												},{
													xtype : 'displayfield',
													style : 'color:red;font-size:18px',
													fieldLabel : '办理结果',
													id : 'over_WYZS_HFYZ_result',
													name : 'over_WYZS_HFYZ_result',
													value : ''
												}]
											}]
									}]
							 }
							//---------------------WYZS_code_over--------------------------
							,{
				            	columnWidth: 1,
								xtype : 'fieldset',
								title: '<font style="color:#033;font-size:18px"><h1>网上银行动态密码版</h1></font>',
				                animCollapse : true,
								collapsed : false,
								style: 'margin-top:10px;',
								width : 300,
								id : 'over_WY',
								hidden : true,
								layout : 'form',
								items : [{
										layout : 'column',
										style: 'margin-left:20px;',
										border : false,
										items : [{
								            	columnWidth: .9,
												xtype : 'fieldset',
												title: '申请',
												style: 'margin-left:30px;',
								                collapsible : false,
												collapsed : false,
												//先隐藏
												hidden : true,
												id : 'over_WY_SQ',
												layout : 'form',
												items : [{
															xtype : 'displayfield',
															fieldLabel : '卡/账号',
															id : 'over_WY_SQ_cardnum',
															name : 'over_WY_SQ_cardnum',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '绑定手机号',
															id : 'over_WY_SQ_phonenum',
															name : 'over_WY_SQ_phonenum',
															value : ''
														},{
															xtype : 'displayfield',
															style : 'color:red;font-size:18px',
															fieldLabel : '办理结果',
															id : 'over_WY_SQ_result',
															name : 'over_WY_SQ_result',
															value : ''
														}]
											 },{
								            	columnWidth: .9,
												xtype : 'fieldset',
												title: '修改',
								                collapsible : false,
												collapsed : false,
												style: 'margin-left:30px;',
												hidden : true,
												id : 'over_WY_XG',
												layout : 'form',
												items : [{
															xtype : 'displayfield',
															fieldLabel : '卡/账号',
															id : 'over_WY_XG_cardnum',
															name : 'over_WY_XG_cardnum',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '原手机号',
															id : 'over_WY_XG_oldnumber',
															name : 'over_WY_XG_oldnumber',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '新手机号',
															id : 'over_WY_XG_newnumber',
															name : 'over_WY_XG_newnumber',
															value : ''
														},{
															xtype : 'displayfield',
															style : 'color:red;font-size:18px',
															fieldLabel : '办理结果',
															id : 'over_WY_XG_result',
															name : 'over_WY_XG_result',
															value : ''
														}]
											},{
								            	columnWidth: .9,
												xtype : 'fieldset',
												title: '解锁',
								                collapsible : false,
												collapsed : false,
												hidden : true,
												style: 'margin-left:30px;',
												id : 'over_WY_JS',
												layout : 'form',
												items : [{
													xtype : 'displayfield',
													fieldLabel : '卡/账号',
													id : 'over_WY_JS_cardnum',
													name : 'over_WY_JS_cardnum',
													value : ''
												 },{
													xtype : 'displayfield',
													fieldLabel : '绑定手机号',
													id : 'over_WY_JS_phonenum',
													name : 'over_WY_JS_phonenum',
													value : ''
												},{
															xtype : 'displayfield',
															style : 'color:red;font-size:18px',
															fieldLabel : '办理结果',
															id : 'over_WY_JS_result',
															name : 'over_WY_JS_result',
															value : ''
														}]
											}]
									}]
							 },{
				            	columnWidth: 1,
								xtype : 'fieldset',
								title: '<font style="color:#033;font-size:18px"><h1>手机银行</h1></font>',
				                style: 'margin-top:10px;',
				                animCollapse : true,
								collapsed : false,
								hidden : true,
								width : 450,
								id : 'over_SJ',
								layout : 'form',
								items : [{
										layout : 'column',
										style: 'margin-left:20px;',
										border : false,
										items : [{
								            	columnWidth: .9,
												xtype : 'fieldset',
												title: '申请',
												style: 'margin-left:30px;',
								                collapsible : false,
												collapsed : false,
												hidden : true,
												id : 'over_SJ_SQ',
												layout : 'form',
												items : [{
															xtype : 'displayfield',
															fieldLabel : '卡/账号',
															id : 'over_SJ_SQ_cardnum',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '绑定手机号',
															id : 'over_SJ_SQ_phonenum',
															value : ''
														}
														//,{
														//	xtype : 'displayfield',
														//	fieldLabel : '登录ID',
														//	id : 'over_SJ_SQ_LoginID',
														//	value : ''
														//}
														,{
															xtype : 'displayfield',
															fieldLabel : '转账功能',
															id : 'over_SJ_SQ_ZZ',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '支付功能',
															id : 'over_SJ_SQ_ZF',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '电子密盾设备编号',
															id : 'over_SJ_SQ_MACHINENUM',
															value : ''
														},{
															xtype : 'displayfield',
															style : 'color:red;font-size:18px',
															fieldLabel : '办理结果',
															id : 'over_SJ_SQ_result',
															name : 'over_SJ_SQ_result',
															value : ''
														}]
											 },{	
								            	columnWidth: .9,
												xtype : 'fieldset',
												title: '添加下挂账户',
								                collapsible : false,
												collapsed : false,
												style: 'margin-left:30px;',
												hidden : true,
												id : 'over_SJ_TJ',
												layout : 'form',
												items : [{
															xtype : 'displayfield',
															fieldLabel : '卡/账号',
															id : 'over_SJ_TJ_cardnum',
															name : 'over_SJ_TJ_cardnum',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '转账功能',
															id : 'over_SJ_TJ_ZZ',
															value : ''
														},{
															xtype : 'displayfield',
															fieldLabel : '支付功能',
															id : 'over_SJ_TJ_ZF',
															value : ''
														},{
															xtype : 'displayfield',
															style : 'color:red;font-size:18px',
															fieldLabel : '办理结果',
															id : 'over_SJ_TJ_result',
															name : 'over_SJ_TJ_result',
															value : ''
														}]
											},{
								            	columnWidth: .9,
												xtype : 'fieldset',
												title: '重置登录密码',
								                collapsible : false,
												collapsed : false,
												hidden : true,
												style: 'margin-left:30px;',
												id : 'over_SJ_CZ',
												layout : 'form',
												items : [{
													xtype : 'displayfield',
													fieldLabel : '卡/账号',
													id : 'over_SJ_CZ_cardnum',
													name : 'over_SJ_CZ_cardnum',
													value : ''
												 },{
													xtype : 'displayfield',
													style : 'color:red;font-size:18px',
													fieldLabel : '办理结果',
													id : 'over_SJ_CZ_result',
													name : 'over_SJ_CZ_result',
													value : ''
												}]
											},{
								            	columnWidth: .9,
												xtype : 'fieldset',
												title: '设置转账/支付功能',
								                collapsible : false,
												collapsed : false,
												hidden : true,
												style: 'margin-left:30px;',
												id : 'over_SJ_ZZ',
												layout : 'form',
												items : [{
													xtype : 'displayfield',
													fieldLabel : '卡/账号',
													id : 'over_SJ_ZZ_cardnum',
													name : 'over_SJ_ZZ_cardnum',
													value : ''
												 },{
													xtype : 'displayfield',
													fieldLabel : '转账功能',
													id : 'over_SJ_ZZ_ZZ',
													value : ''
												},{
													xtype : 'displayfield',
													fieldLabel : '支付功能',
													id : 'over_SJ_ZZ_ZF',
													value : ''
												},{
															xtype : 'displayfield',
															style : 'color:red;font-size:18px',
															fieldLabel : '办理结果',
															id : 'over_SJ_ZZ_result',
															name : 'over_SJ_ZZ_result',
															value : ''
														}]
										},{
								            	columnWidth: .9,
												xtype : 'fieldset',
												title: '注销',
								                collapsible : false,
												collapsed : false,
												hidden : true,
												style: 'margin-left:30px;',
												id : 'over_SJ_ZX',
												layout : 'form',
												items : [{
													xtype : 'displayfield',
													fieldLabel : '卡/账号',
													id : 'over_SJ_ZX_cardnum',
													name : 'over_SJ_ZX_cardnum',
													value : ''
												 },{
													xtype : 'displayfield',
													fieldLabel : '绑定手机号',
													id : 'over_SJ_ZX_phonenum',
													name : 'over_SJ_ZX_phonenum',
													value : ''
												},{
													xtype : 'displayfield',
													fieldLabel : '登录ID',
													id : 'over_SJ_ZX_loginID',
													name : 'over_SJ_ZX_loginID',
													value : ''
												},{
															xtype : 'displayfield',
															style : 'color:red;font-size:18px',
															fieldLabel : '办理结果',
															id : 'over_SJ_ZX_result',
															name : 'over_SJ_ZX_result',
															value : ''
														}]
										}]
										
							}]
							 },{
				            	columnWidth: .5,
								xtype : 'fieldset',
								title: '<font style="color:#033;font-size:18px"><h1>电子银行密码管理</h1></font>',	
				                style: 'margin-top:10px;',
				                animCollapse : true,
								collapsed : false,
								disabled : false,
								hidden : true,
								width : 450,
								id : 'over_dzmm',
								layout : 'form',
								items : [{
											xtype : 'displayfield',
											fieldLabel : '卡/账号',
											id : 'over_card_Number_dzmmgl',
											value : ''
										},{
											xtype : 'displayfield',
											hideLabel : true,
											id : 'over_dzmmgl_value',
											style : 'font-size:18px;font-weight:bold;margin-left:40px;',
											html : '业务类型'
										},{
											xtype : 'displayfield',
											fieldLabel : '结果',
											style : 'color:red;font-size:18px',
											id : 'over_result_dzmmgl',
											value : ''
										}]
							 },{
				            	columnWidth: .5,
								xtype : 'fieldset',
								title: '<font style="color:#033;font-size:18px"><h1>电话银行交易密码管理</h1></font>',
				                style: 'margin-top:10px;',
				                animCollapse : true,
								collapsed : false,
								disabled : false,
								hidden : true,
								width : 450,
								id : 'over_dhmm',
								layout : 'form',
								items : [{
											xtype : 'displayfield',
											fieldLabel : '卡/账号',
											id : 'over_card_Number_dhmmgl',
											value : ''
										},{
											xtype : 'displayfield',
											hideLabel : true,
											id : 'over_dhmmgl_value',
											style : 'font-size:18px;font-weight:bold;margin-left:40px;',
											html : '业务类型'
										},{
											xtype : 'displayfield',
											fieldLabel : '结果',
											style : 'color:red;font-size:18px',
											id : 'over_result_dhmmgl',
											value : ''
										}]
							},{
				            	columnWidth: 1,
				            	border : false,
				                style: 'margin-top:10px;margin-right:330px;',
								width : 650,
								layout : 'form',
								buttons : [{
											xtype : 'button',
											width : 100,
											id : '101803',
											height : 40,
											text : '<font style="font-size:16px;margin-top:0px">继续</font>',
											style : 'margin-top:5px',
											handler : function(){
												//Ext.getCmp('resetAllData').getForm().reset();  //清空页面显示的内容
												visibledSomePage(0);
												//dtmm_sq = ""; dtmm_xg = ""; dtmm_js = "";
	 											//sjyh_sq = ""; sjyh_tj = ""; sjyh_cz = ""; sjyh_zz = ""; sjyh_zx = "";
												//updateDealStaId(conHisId, '1001');
												fristBusiness++; //记录fristBusiness变量已经不是第一次呼入了；
												//Ext.getCmp("101902").setValue("已有客户卡号，等待客户确认卡号并进行下一步");
												Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("继续")+"</h1></font>");
												synWithTerm(0,1);//跳转到提示插卡页面
												//Ext.getCmp("tow_TZLC").setValue(false);	Ext.getCmp("tow_JJGS").setValue(false);Ext.getCmp("tow_KJJK").setValue(false);	Ext.getCmp("tow_DZQD").setValue(false);
												BussChoicType == "";
												getMsgBody4G2("M0202","P026",1,"P004",""); //发送此消息让VTM跳转到首页面，重新办理业务
												
												//myocx.InvokeBusinessForm(1,"",0,YesOrNo_FUND);
												myocx.InvokeBusinessForm(10,"",101,"");
												jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[agentIndexPage.exe]","INFO"));
												
											}
										},{
											xtype : 'button',
											width : 100,
											id : '101804',
											height : 40,
											text : '<font style="font-size:16px;margin-top:0px">打印回单</font>',
											style : 'margin-top:5px;margin-left:30px',
											handler : function() {
												Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("打印回单")+"</h1></font>");
												getMsgBody4G2("M0202","",5,"","type_Receipt"); //发送此消息让VTM跳转到是否插卡页面，提示客户
												Ext.getCmp("101804").setDisabled(true);
												setTimeout("resetButton('101804')",3000);
											}
										},{
											xtype : 'button',
											width : 100,
											id : '101805',
											height : 40,
											hidden : true,
											text : '<font style="font-size:16px;margin-top:0px">显示感谢使用</font>',
											style : 'margin-top:5px;margin-left:30px',
											handler : function() {
												Ext.getCmp("butInfo").setValue("<font style='color:red'><h1>"+butInfoShow("显示感谢使用")+"</h1></font>");
												getMsgBody4G2("M0202","",5,"","type_Thanks"); //发送此消息让VTM跳转到是否插卡页面，提示客户
											}
										}]
							}]
						}]
					}]
				}]
			},{
				border : false,
				layout : 'border',
				title : '业务选择><font style="color:#bf1919">身份核实</font>>业务章程>客户资料>客户签字>审核客户资料>附加设置',
				name : '客户信息识别页',
				id : '1019',//
				buttonAlign : 'center',
				items : [{
					region : 'center',
					border : false,
					id : '101901',
					layout : 'form',
					autoScroll : true,
					items : [{
							xtype : 'displayfield',
							hideLabel : true,
							style : 'width:100%;text-align:center;color:#686868;font-weight:bold;font-size:28px;margin-top:200px',
							id : '101902',
							html : '请稍等，页面正在跳转中...'
						},{
							xtype : 'displayfield',
							hideLabel : true,
							style : 'width:100%;text-align:center;color:#686868;font-weight:bold;font-size:18px',
							id : '101903',
							html : ''
						}]
				}],  //goBackVideo
				buttons : [{
							xtype : 'button',
							height : 40,
							width : 80,
							//disabled : true,
							hidden : true,
							//style : 'margin-left:240px',
							id : 'goBackVideo',
							text : '<font style="font-size:16px;margin-top:0px">返回视频首页</font>',
							handler : function() {}
						},{
							xtype : 'button',
							height : 40,
							width : 80,
							disabled : true,
							hidden : true,
							style : 'margin-left:240px',
							id : 'flexoButton',
							text : '<font style="font-size:16px;margin-top:0px">查询客户</font>',
							handler : function() {}
						},{
							xtype : 'button',
							height : 40,
							width : 80,
							id : 'ReadCard',
							hidden : true,
							text : '<font style="font-size:16px;margin-top:0px">读取卡号</font>',
							handler : function() {}
						},{
							xtype : 'button',
							height : 40,
							width : 80,
							disabled : false,
							hidden : true,
							id : 'EjectCard',
							text : '<font style="font-size:16px;margin-top:0px">退卡</font>',
							handler : function(){}
						},{
							xtype : 'button',
							height : 40,
							width : 80,
							text : '<font style="font-size:16px;margin-top:0px">下一步</font>',
							id : 'goNext',
							hidden  : true,
							disabled : true,  //下一步按钮初始状态为disabled
							handler : function() {}
					},{
							xtype : 'button',
							height : 40,
							width : 80,
							hidden : true,
							style : 'margin-left:250px',
							id : 'ReturnCard',
							text : '<font style="font-size:16px;margin-top:0px">回收卡</font>',
							handler : function(){}
						}]
			},{
				border : false,
				layout : 'border',
				title : '业务选择>身份核实>业务章程>评估问卷><font style="color:#bf1919">评估结果</font>>客户签字>审核客户资料>附加设置>业务办理完成',
				name : '客户信息识别页',
				id : '1020',//
				buttonAlign : 'center',
				items : [{
					region : 'center',
					border : false,
					id : '102000',
					layout : 'form',
					autoScroll : true,
					items : []
				}]
			},{
				border : false,
				layout : 'border',
				title : '业务选择>身份核实>业务章程>评估问卷><font style="color:#bf1919">评估结果</font>>客户签字>审核客户资料>附加设置>业务办理完成',
				name : '客户信息识别页',
				id : '1021',//
				buttonAlign : 'center',
				items : [{
					region : 'center',
					border : false,
					id : '102100',
					layout : 'form',
					autoScroll : true,
					items : [{
							xtype : 'displayfield',
							hideLabel : true,
							style : 'width:100%;text-align:center;color:green;font-weight:bold;font-size:28px;margin-top:200px',
							id : '102111',
							html : '恭喜您，已经成功办理该业务。'
						}]
				}],
				buttons : [{
							region : 'center',
							width : 100,
							xtype : 'button',
							style: 'margin-right:10px;',
							id : '102101',
							hidden : false,
							height : 50,
							text : '<font style="font-size:16px;margin-top:0px">返回视频首页</font>',
							handler : function() {
								visibledSomePage(1);
								agentprints = "";
								fristBusiness++; //记录fristBusiness变量已经不是第一次呼入了；
								synWithTerm(0,1);   // 返回开始首页
								//Ext.getCmp("101902").setValue("已有客户卡号，等待客户确认卡号并进行下一步");
								if(BussChoicType == "TZLC"){
									getMsgBody4G2("M0204","P029",1,"P004","");	
								}else if(BussChoicType == "JJGS"){
									getMsgBody4G2("M0206","P031",1,"P004","");
								}
								//Ext.getCmp("tow_TZLC").setValue(false);	Ext.getCmp("tow_JJGS").setValue(false);Ext.getCmp("tow_KJJK").setValue(false);	Ext.getCmp("tow_DZQD").setValue(false);
								BussChoicType == "";
								
								//myocx.InvokeBusinessForm(1,"",0,YesOrNo_FUND);
								myocx.InvokeBusinessForm(10,"",101,"");
								jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[agentIndexPage.exe]","INFO"));
							}
						}, {
							region : 'center',
							width : 100,
							id : '102102',
							hidden : false,
							height : 50,
							text : '<font style="font-size:16px;margin-top:0px">打印回单</font>',
							xtype : 'button',
							handler : function(){
								if(BussChoicType == "TZLC"){
									getMsgBody4G2("M0204","P029",5,"","type_Receipt"); 
								}else if(BussChoicType == "JJGS"){
									getMsgBody4G2("M0206","P031",5,"","type_Receipt");
								}
								Ext.getCmp("102102").setDisabled(true);
								setTimeout("resetButton('102102')",3000);
							}
						}, {
							region : 'center',
							width : 100,
							id : '102103',
							hidden : true,
							height : 50,
							text : '<font style="font-size:16px;margin-top:0px">继续办理基金业务</font>',
							xtype : 'button',
							handler : function() {
								//点击之后，直接打开C#程序的FundBussinessFlow_MainFundInfo_Form.cs 程序；
								BussChoicType = "FUND";   //点击继续之后，业务变成基金业务类型
								myocx.InvokeBusinessForm(8,"",103,checkName);   //将之前处于当前Form的页面打开
								jsLog(logStrMsg("调用winform->myocx.InvokeBusinessForm[FundBusinessFlow.exe]","INFO"));
								conhisid_FUND = callInsertData(_callinno);   //新增一个基金的业务记录
								synWithTerm(0,1);
								WF_FUND_LC = "YES";
								getMsgBody4G2("M0208","P029",1,"P00801","FUND");
								//Ext.getCmp("102102").setDisabled(true);
								//setTimeout("resetButton('102102')",3000);
							}
						}]
			},{
				border : false,
				layout : 'border',
				id : '1022',
				title : '业务选择>身份核实>业务章程>客户资料><font style="color:#bf1919">关于密码</font>>客户签字>审核客户资料>附加设置>开卡完成',
				name : '输入手机号页面',
				buttonAlign : 'center',
				items : [{
					region : 'center',
					border : false,
					items : [{
								layout : 'form',
								labelAlign : 'right',
								style : 'padding:220px 180px',
								id : '1022222',
								labelWidth : 150,
								border : false,
								items : [{
											xtype : 'displayfield',
											hideLabel : true,
											id : '102200',
											style : 'text-align:center;font-size:18px;font-weight:bold;color:green;margin-top:20px;',
											html : '填写手机号'
										},{
											xtype : 'textfield',
											width : 200,
											//readOnly : true,
											disable : true ,
											id : 'tzlc_phonenum',
											name : 'tzlc_phonenum',
											fieldLabel : '手机号码',
											enableKeyEvents : 'true',
											listeners : {
												keyup : function() {
													getMsgBody4G2("M0204","P032",2,"","phoneNum:"+Ext.getCmp("tzlc_phonenum").getValue());  //发送消息-->
												},
												change : function(a, value, c) {
												}
											}
										},{
											xtype : 'displayfield',
											hideLabel : false,
											style : 'padding-top:10px;color:red;',
											id : 'check_phone_info',
											html : ''
										}]
							}]
				}],
				buttons : [{
							region : 'center',
							width : 100,
							xtype : 'button',
							style: 'margin-right:10px;',
							id : '102201',
							hidden : false,
							height : 50,
							text : '<font style="font-size:16px;margin-top:0px">坐席输入</font>',
							handler : function() {
								getMsgBody4G2("M0204","P032",0,"","agentInput");
								Ext.getCmp("1022222").setDisabled(false);
								Ext.getCmp("102201").setVisible(false);
								Ext.getCmp("102202").setVisible(true);
								Ext.getCmp("102203").setVisible(true);
							}
						},{
							region : 'center',
							//text : '审核不通过',
							//style: 'margin-right:200px;',
							width : 100,
							id : '102202',
							hidden : true,
							height : 50,
							text : '<font style="font-size:16px;margin-top:0px">客户输入</font>',
							xtype : 'button',
							handler : function() {
								getMsgBody4G2("M0204","P032",0,"","terminalInput");
								Ext.getCmp("1022222").setDisabled(true);
								Ext.getCmp("102202").setVisible(false);
								Ext.getCmp("102201").setVisible(true);
								Ext.getCmp("102203").setVisible(false);
							}
						},{
							region : 'center',
							//text : '审核不通过',
							//style: 'margin-rig/ht:200px;',
							width : 100,
							id : '102203',
							hidden : true,
							height : 50,
							text : '<font style="font-size:16px;margin-top:0px">提交</font>',
							xtype : 'button',
							handler : function() {
								var str = Ext.getCmp("tzlc_phonenum").getValue();
								if(str.length != 11 && !str.match("^[0-9]*$")){
									Ext.getCmp("check_phone_info").setValue("手机号必须11位，且必须为数字");
								}else{
									getMsgBody4G2("M0204","P032",1,"P027","YES");
								}
								//getMsgBody4G2("M0204","P027",1,"P01401","");   //发送消息-->跳转填写问卷页面第一页
							}
						}]
			},{
				border : false,
				layout : 'border',
				id : '1023',
				title : '业务选择>身份核实>读卡选择>><font style="color:#bf1919">填写资料</font>>客户签字>审核客户资料>关于密码>挂失完成',
				name : '挂失填写',
				buttonAlign : 'center',
				items : [{
					region : 'center',
					border : false,
					items : [{
								layout : 'form',
								labelAlign : 'right',
								style : 'padding:50px 180px',
								id : '102301',
								labelWidth : 150,
								border : false,
								items : [{
											xtype : 'displayfield',
											fieldLabel : '账号',
											id : 'GS_number',
											name : 'GS_number',
											value : ''
										},{
											xtype : 'displayfield',
											fieldLabel : '户名',
											id : 'GS_username',
											name : 'GS_username',
											value : '胡杨'
										},{
											xtype : 'displayfield',
											fieldLabel : '申请挂失人',
											id : 'GS_SQ_username',
											name : 'GS_SQ_username',
											value : '曲晓'
										},{
											xtype : 'textfield',
											width : 350,
											disable : true ,
											id : 'GS_B_INFO',
											name : 'GS_B_INFO',
											fieldLabel : '挂失原因',
											enableKeyEvents : 'true',
											listeners : {
												keyup : function() {
													//alert(Ext.getCmp("GS_B_INFO").getValue());
													getMsgBody4G2("M0206","P033",2,"","LossReason:"+Ext.getCmp("GS_B_INFO").getValue());  //发送消息-->
												},
												change : function(a, value, c) {
												}
											}
										},{
											xtype : 'displayfield',
											fieldLabel : '金额',
											id : 'GS_Money',
											name : 'GS_Money',
											value : '10,000,000'
										},{
											xtype : 'displayfield',
											fieldLabel : '开户时间',
											id : 'GS_KH_Time',
											name : 'GS_KH_Time',
											value : '2013/12/01'
										},{
											xtype : 'displayfield',
											fieldLabel : '身份证号',
											id : 'GS_userID',
											name : 'GS_userID',
											value : '22211232123123112'
										},{
											xtype : 'textfield',
											width : 350,
											disable : true ,
											id : 'GS_PhoneNum',
											name : 'GS_PhoneNum',
											fieldLabel : '联系电话',
											enableKeyEvents : 'true',
											listeners : {
												keyup : function() {
													getMsgBody4G2("M0206","P033",2,"","Loss_PhoneNumber:"+Ext.getCmp("GS_PhoneNum").getValue());  //发送消息-->
												},
												change : function(a, value, c) {
												}
											}
										},
										{
				                        layout : 'column',
				                        xtype : 'container',
				                        fieldLabel : '常驻或单位地址', 
				                        defaults : { 
				                            border : false
				                        },
				                        items : [{
				                            columnWidth : .33,
				                            layout : "form",
				                            items : [{
				                                id : 'ulEmployee.hujiGSsheng_combo',
				                                name:'GS_sheng',
				                                xtype : 'combo',
				                                hideLabel:true,
				                                lazyInit : false,
				                                mode : 'local',
				                                editable : false,
				                                triggerAction : 'all',
				                                anchor:'100%',
				                                store : AppUtil.address2.getStore_region(0,'ulEmployee.huji', this.huji),
				                                displayField : 'regionName',
				                                valueField : 'regionId',
				                                value :'',
				                                listeners : AppUtil.address2.getListeners_region(0,'ulEmployee.huji','GS_sheng',1)
				                            }]
				                        }, {
				                            columnWidth : .33,
				                            layout : "form",
				                            items : [{
				                                id : 'ulEmployee.hujiGSshi_combo',
				                                name : 'GS_city',
				                                xtype : 'combo',
				                                lazyInit : false,
				                                mode : 'local',
				                                anchor:'100%',
				                                hideLabel:true,
				                                editable : false,
				                                triggerAction : 'all',
				                                store :AppUtil.address2.getStore_region(1,'ulEmployee.huji', this.huji),
				                                displayField : 'regionName',
				                                valueField : 'regionId',
				                                value :'',
				                                listeners : AppUtil.address2.getListeners_region(1,'ulEmployee.huji','GS_city',1)
				                            }]
				                        }, {
				                            columnWidth : .34,
				                            layout : "form",
				                            items : [{
				                                id : 'ulEmployee.hujiGSqu_combo',
				                                name:'GS_qu',
				                                xtype : 'combo',
				                                mode : 'local',
				                                anchor:'100%',
				                                hideLabel:true,
				                                editable : false,
				                                triggerAction : 'all',
				                                store :AppUtil.address2.getStore_region(2,'ulEmployee.huji', this.huji),
				                                displayField : 'regionName',
				                                valueField : 'regionId',
				                                value :'',
				                                listeners : AppUtil.address2.getListeners_region(2,'ulEmployee.huji','GS_qu',1)
				                            }]
				                        }]
				                    },{
											xtype : 'textfield',
											width : 350,
											disable : true ,
											id : 'GS_addinfo',
											name : 'GS_addinfo',
											fieldLabel : '详细地址',
											enableKeyEvents : 'true',
											listeners : {
												keyup : function() {
													getMsgBody4G2("M0206","P033",2,"","Loss_Address:"+Ext.getCmp("GS_addinfo").getValue());  //发送消息-->
												},
												change : function(a, value, c) {
												}
											}
										},{
											xtype : 'displayfield',
											hideLabel : false,
											style : 'padding-top:10px;color:red;',
											id : 'check_GS_info',
											html : ''
										}]
							}]
				}],
				buttons : [{
							region : 'center',
							width : 100,
							xtype : 'button',
							style: 'margin-right:10px;',
							id : '102302',
							hidden : true,
							height : 50,
							text : '<font style="font-size:16px;margin-top:0px">坐席输入</font>',
							handler : function() {
								getMsgBody4G2("M0206","P033",0,"","agentInput");
								Ext.getCmp("102301").setDisabled(false);
								Ext.getCmp("102302").setVisible(false);
								//Ext.getCmp("102304").setVisible(true);
								Ext.getCmp("102303").setVisible(true);
							}
						},{
							region : 'center',
							//text : '审核不通过',
							//style: 'margin-right:200px;',
							width : 100,
							id : '102303',
							hidden : false,
							height : 50,
							text : '<font style="font-size:16px;margin-top:0px">客户输入</font>',
							xtype : 'button',
							handler : function() {
								getMsgBody4G2("M0206","P033",0,"","terminalInput");
								Ext.getCmp("102301").setDisabled(true);
								Ext.getCmp("102303").setVisible(false);
								Ext.getCmp("102302").setVisible(true);
								//Ext.getCmp("102304").setVisible(false);
							}
						}
//						,{
//							region : 'center',
//							//text : '审核不通过',
//							//style: 'margin-rig/ht:200px;',
//							width : 100,
//							id : '102304',
//							hidden : true,
//							height : 50,
//							text : '<font style="font-size:16px;margin-top:0px">提交</font>',
//							xtype : 'button',
//							handler : function() {
////								var str = Ext.getCmp("tzlc_phonenum").getValue();
////								if(str.length != 11){
////									Ext.getCmp("check_phone_info").setValue("手机号必须11位，且必须为数字");
////								}else{
////									getMsgBody4G2("M0204","P032",1,"P027","YES");
////								}
//								//getMsgBody4G2("M0204","P027",1,"P01401","");   //发送消息-->跳转填写问卷页面第一页
//							}
//						}
						]
			}
//=====================================================================================================================
		]
		});// card end
		jsLog(logStrMsg("开始加载this.formPanel元素","INFO"));
		this.formPanel = new Ext.Panel({
			border : false,
			layout : 'border',
			id : 'customerFormPanelWin',
			autoScroll : true,
			items : [{
				layout : 'border',
				region : 'center',
				border : false,
				items : [{
					region : 'center',
					border : false,
					layout : 'border',
					items : [{
						xtype : 'tabpanel',
						activeTab : 0,// 激活第四个panel，柜台交易
						plain : true,
						region : 'center',
						region : 'center',
						bodyStyle : 'padding:5px;',
						autoScroll : true,
						items : [{
							title : '柜台交易',
							border : false,
							layout : 'fit',
							items : [{
								layout : 'border',
								border : false,
								items : [{
									region : 'center',
									layout : 'fit',
									items : [this.cardActionPanel]
								}]
							}]
						}]
					}]
				}]
			},{
				region : 'west',
				autoScroll : true,
				width : 330,
				split : true,
				items : [{
					title : '来电信息',
					collapsible : true,
					collapsed : false,
					border : false,
					layout : 'fit',
					height : 133,
					items : [{
						border : false,
						layout : 'form',
						labelWidth : 55,
						labelAlign : 'left',
						items : [{
							layout : 'form',
							labelAlign : 'right',
							border : false,
							items : [{
										xtype : 'displayfield',
										fieldLabel : '设备号',
										id : 'strTerminalNo',
										style : 'padding-top:1px',
										value : ''
									}, {
										xtype : 'displayfield',
										fieldLabel : '所属机构',
										style : 'padding-top:1px',
										id : 'strSiteID',
										value : ''
									}, {
										xtype : 'displayfield',
										fieldLabel : '来电时间',
										style : 'padding-top:1px',
										// anchor : '100%',
										id : 'call_date',
										value : ''
									}]
						}
						]
					}]
				},{
					title : '视频',
					collapsible : true,
					collapsed : false,
					border : false,
					items : [{
							border : true,
							id : 'video',
							//width : 300,
							height : 500,
							xtype : 'displayfield',
							html : ""
							// 头部视频
						}]
				},{
					title : '提示信息',
					collapsible : true,
					collapsed : false,
					border : false,
					items : [{
						border : false,
						layout : 'form',
						labelWidth : 55,
						// labelAlign : 'left',
						items : [{
							layout : 'form',
							labelAlign : 'right',
							border : false,
							items : [{
									xtype : 'displayfield',
									fieldLabel : '点击按钮提示',
									id : 'butInfo',
									value : ''
									}]
								}]
							}]
					}]
			}]
		});
		jsLog(logStrMsg("调用VtmAgentInit()函数"+TermID+"   "+SiteID,"INFO"));
		// TODO 自动触发视频初始化连接操作。
		VtmAgentInit(TermID,SiteID+","+call_ipAddress);
		jsLog(logStrMsg("调用完Video所有接口并渲染完JS之后查看strCallMessage_1值 = "+strCallMessage_1,"INFO")); //记录日志
		//-------------------给设备号复制----------
		Regagentconn_1(strCallMessage_1);
		//—--------------------------------------
	},// end of the initcomponents

	createRs_contact : function(){
		var store = this.gridPanel_contact.getStore();
		var recordType = store.recordType;
		store.add(new recordType({})); // 添加一行空store
	},

	removeSelRs_contact : function(){
		$delGridRs({
					url : __ctxPath + '/customer/multiDelCusSpeEve.do',
					grid : Ext.getCmp('UlSpecialGrid_empl'),
					idName : 'eveId'
				});
		Ext.getCmp('UlSpecialGrid_empl').getStore().reload();
	},
	dial : function() {
		top.dial('18701575606');
	}

});
