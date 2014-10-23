//////////////////////////////////////////////////////////////////
// @JS_LONG_COPYRIGHT_BEGIN@
// @JS_LONG_COPYRIGHT_END@
//////////////////////////////////////////////////////////////////

/*
 * Message IDs are formed as CTJZHxxxxY where xxxx is the 4-digit
 * range of the functional component and Y is one of E, W, or I.
 * For the Web UI, the range is 2300-2999.
 */
define(
({ 
	Title: "Tivoli 自助服务站",
	About: "关于",
	Help: "帮助",
	Logout: "注销",
	Welcome: "欢迎",
	// Login widget
	LoginHeading: "Maximo 登录",
	Username: "用户名",
	Password: "密码",
	Login: "登录",
	InvalidLogin: "“用户名”或“密码”不正确。 请重新尝试。",
	NotAuthorized: "您无权使用此应用程序",
	// MyCatalogRequestsGrid widget
	ShowSelectedDetails: "显示选定行的详细信息",
	ApproveSelectedRequest: "核准选定请求",
	RejectSelectedRequest: "拒绝选定请求",
	ShowDetails: "显示详细信息",
	
	SRRequestPodHeading: "我的请求",	
	SRShowMyRequestsLink: "显示我的全部请求...",
	SRMyRequests: "我的请求",
	
	INCIDENTRequestPodHeading: "我的事件",
	INCIDENTShowMyRequestsLink: "显示我的全部事件...",
	INCIDENTMyRequests: "我的事件",
	
	AssetsPodHeading: "我的资产",	
	ShowMyAssetsLink: "显示我的全部资产...",
	MyAssets: "我的资产",
	
	ShowAllRequests: "显示所有请求",
	ShowLastRequests: "显示前 ${0} 个请求",
	ShowAllNews: "显示所有新闻",
	ShowLastNews: "显示前 ${0} 个新闻",
	MyApprovalHeading: "我的核准",	
	Refresh: "刷新",
	// my catalog request grid column headings
	TotalCost: "成本总计",
	StatusDate: "状态时间",
	RequestedBy: "请求者",
	Status: "状态",
	Quantity: "数量",
	UnitCost: "单位成本",
	Description: "描述",
	ItemNum: "请求类型",
	RequestedFor: "使用人",
	ItemSetID: "项目集标识",
	DateEntered: "输入日期",
	MRNum: "物料编号",
	Priority: "优先级",
	SiteID: "地点标识",
	MRLINEID: "MRLINE 标识",
	// MyDeploymentsGrid
	Name: "姓名",
	ServiceOwner: "服务负责人",
	//ChnageDate: "Change Date",
	DueDate: "到期日",
	CreatedDate: "已创建",
	StartDate: "目标开始",
	OfferingDescription: "请求描述",
	Approval: "核准",
	// Catalog Request Creator
	CatalogRequestCreateHeading: "创建新请求",
	CatalogOfferingPrompt: "服务目录产品",
	CreateRequestStatus: "请求已成功提交",
	CreateRequestButtonLabel: "确定",
	CancelButtonLabel: "取消",
	Location: "位置",
	AssetNumber: "资产号",
	Serial: "序列号", 
	IsPrimary: "主要",
	IsUser: "用户",
	IsCustodian: "管理人",		
	RefreshDate: "刷新日期",
	PlannedRefreshDate: "计划的刷新日期",
	ChangeDate: "变更日期",
	AssetActivity: "当前资产",
	
	// Navigator widget
	Home: "主页",
	Back: "返回", 
	Forward: "向前",
	HomeBreadcrumb: "主页",
	Search: "搜索",
	SearchAdjust: "调整搜索",
	SearchResults: "搜索结果",
	Close: "关闭",
	IncidentsLabel: "帮助凭单和支持",
	IncidentsDesc: "打开现有资产或服务的帮助凭单。",
	RequestsLabel: "申请新服务",
	RequestsDesc: "申请新资产或服务。",
    IssuesLabel: "报告问题",
    IssuesDesc: "创建新的服务请求以报告问题。",
    BrowseSolutionsLabel: "浏览解决方案",
    BrowseSolutionsDesc: "查看所有的现有解决方案",
    
	RecentsLabel: "常用请求",
	RecentsDesc: "轻松访问最常请求的服务。",
	HelpFixLabel: "搜索解决方案",
   SearchToolTip: "要基于一个或另一个单词来进行搜索，请使用空格或 OR 运算符。 例如：virus protection，virus OR protection。 要基于多个现有单词进行搜索，请使用 AND 运算符。 示例：lotus AND notes。 对于要完全匹配的搜索，请为单词添加一对双引号。 示例：“lotus notes”。",
	createSRToolTip: "创建新的服务请求以报告问题或申请服务。",
	templateToolTip: "购物车模板",
	
	None: "无",
	NA: "不适用",
	//branch in navigator tree
	Directory: "目录",
	//leaf in navigator tree
	Panel: "面板",
	// DateRange Widget
	DurationLabel: "针对此持续时间",
	MonthsLabel: "月",
	WeeksLabel: "周",
	DaysLabel: "天",
	ForeverLabel: "无限",
	StartDateLabel: "开始日期",
	EndDateLabel: "结束日期",
	StartTime: "开始时间",
	EndTime: "结束时间",
	UntilLabel: "在此日期之前",
	InvalidDurationMessage: "持续时间必须大于 0",
	InvalidDateMessage: "这不是有效日期",
	DateEarlyMessage: "此日期在允许的最早日期 ${0} 之前",
	DateLateMessage: "此日期在允许的最晚日期 ${0} 之后",
	MissingDateMessage: "此日期是必需的",

	Loading: "正在装入...",
	RecentActivity: "最近活动",
	NoRecentActivity: "无最近活动",
    NoAssetsAssigned: "未分配任何资产",
	ManageRequests: "管理请求",
	ManageRequestsLink: "管理请求...",
	ManageApprovalsLink: "管理核准...",
	ManageMyNewsLink: "查看我的新闻...",
	ManageMyNews: "查看我的新闻",
	ManageApprovals: "管理核准",
    CartID: "购物车标识",
	

	//General
	OK : "确定",
	Cancel : "取消",
	Select: "选择",
	Total: "总计",
	TotalLabel: "总计： ",
	ConfirmationProceed: "确定要继续吗？",
	ConfirmationDialogTitle: "必须进行确认",
	
	// error messages
	CTJZH2301E: "CTJZH2301E: 创建此请求的输入表单时出错。",
	CTJZH2302E: "CTJZH2302E: 检索此请求的详细信息时出错。",
	CTJZH2303E: "CTJZH2303E: 必须登录才能创建请求。",
		
	CTJZH2305E: "CTJZH2305E: 您已在字段中输入了无效值。必须更正这些错误，然后才能继续。",
	CTJZH2306E: "CTJZH2306E: 系统已报告在创建此请求时出错。",
	CTJZH2307E: "CTJZH2307E: 登录时出错。",
	CTJZH2308E: "CTJZH2308E: 对不起，当前不支持创建此请求。",
	CTJZH2309E: "CTJZH2309E: 由于发生内部错误，无法继续。",
		
	CTJZH2313E: "CTJZH2313E: 未能检索服务请求列表。",
	CTJZH2360E: "CTJZH2360E: 未能检索资产列表。",
		
	CTJZH2316E: "CTJZH2316E: 要显示的消息为 NULL、未定义或空代码，或者为无效类型。",
	CTJZH2317E: "CTJZH2317E: 密码确认不匹配。", 
	CTJZH2318E: "CTJZH2318E: 最多只能选择 5 个团队。",
	CTJZH2319E: "CTJZH2319E: 用户名已存在。",
	CTJZH2320E: "CTJZH2320E: 最多只能选择 15 个用户。",
	CTJZH2321I: "CTJZH2321I: 此请求没有可供显示的详细信息。",
	CTJZH2322E: "CTJZH2322E: 密码不能以空格开头或结尾。", 
	CTJZH2324E: "CTJZH2324E: 用户名包含空格。",	
	CTJZH2323E: "CTJZH2323E: 无法提交此服务请求，因为未注册此类型的资源池。", 
	CTJZH2325E: "CTJZH2325E: 请求不再可用。",
	CTJZH2328W: "CTJZH2328W: 删除用户的操作无法撤销，将永远不能复用该用户标识", 
	CTJZH2329E: "CTJZH2329E: 指定的用户标识属于已删除的用户，不能复用", 
	CTJZH2331E: "CTJZH2331E: 处理选定请求时失败。",
		
    CTJZH2334E: "CTJZH2334E: 使用提供的数据更新此新服务请求时发生服务器错误",
	CTJZH2335E: "CTJZH2335E: 创建此新服务请求时发生不可恢复的服务器错误",
	CTJZH2336E: "CTJZH2336E: “核准详细信息”输入超过了 50 个字符的最大长度。",	
	CTJZH2337E: "CTJZH2337E: 无法创建新的服务请求，因为您好像未登录",
	CTJZH2338E: "CTJZH2338E: 创建此新服务请求时发生服务器错误",
	CTJZH2339I: "CTJZH2339I: 对不起，找不到任何匹配项。",
	
	CTJZH2342E: "CTJZH2342E: 创建此请求时出错。",
		
	CTJZH2345E: "CTJZH2345E: 不能除去此具有活动项目的团队。",
	CTJZH2346E: "CTJZH2346E: 密码必须至少为 6 个字符的长度",
	
	CTJZH2353I: "CTJZH2353I: 您尝试进行的团队变更数超出此请求中所允许的最大数目（5 个）。要进行 5 个以上的团队变更，请创建更多的“修改团队”请求。",
	CTJZH2354I: "CTJZH2354I: 您尝试进行的用户变更数超出此请求中所允许的最大数目（15 个）。要进行 15 个以上的用户变更，请创建更多的“修改用户”请求。",	
	
	CTJZH2355I: "CTJZH2355I: 搜索索引数据不可用或受损。请再次运行 Cron 任务 PmObjSearchCron。",
	CTJZH2356I: "CTJZH2356I: 必须输入搜索字符串",
	CTJZH2357I: "CTJZH2357I: 搜索索引正在更新。 请稍后再试。",
	CTJZH2358I: "CTJZH2358I: NODICTION",
	CTJZH2361I: "CTJZH2361I: 此用户没有任何可用或活动的“产品”或“模板”。 请检查该用户是否有权访问任何“目录产品”或“凭单模板”。",
	CTJZH2362I: "CTJZH2362I: 要启用 Internet Explorer 中的所有自助服务中心功能部件，请安装 Silverlight 插件：www.microsoft.com/getsilverlight/",

    	
	//String list for user and team
	//Role: "Role",
	//Language: "Language",
	Team: "团队",
	UserTeams: "用户团队",
	
	//UserStatus: "Activate user account",
	LOGINID: "登录标识",
	AccountLegend: "帐户设置",
	PersonalInfoLegend: "个人信息",
	RegionalSettLegend: "地区设置",
	FirstName: "名",
	LastName: "姓",
	DisplayName: "显示名称",
	Email: "电子邮件",
	Telephone: "电话",
	Address: "地址",
	City: "城市",
	State: "省/市/自治区",
	Country: "国家或地区",
	AccountStatus: "活动",
	EmptyString: "               ",
	UserList: "可用用户",
	UserID: "用户标识",
	Role: "角色",
	ConfirmPassword: "确认密码",
	InvalidConfirmPassword: "密码确认不匹配",
	PressToAddTeam: "按 + 键添加团队",
	CreateUserInstruction: "每个请求中可以将某一用户最多添加到 5 个团队。要将用户添加到更多团队中，请创建更多的“修改用户”请求。",
	ModifyUserInstruction: "每个请求中可以将某一用户最多添加到 5 个团队或从中除去。要进行更多变更，请创建更多的“修改用户”请求。",
	// Team Management
	TeamID: "标识",
	TeamName: "姓名",
	TeamDescription: "描述",
	UserList: "可用用户",
	SelectedUserList: "选定用户",
	TeamDetails: "团队详细信息",
	ProjectAccount: "项目帐户",
	QuickFilter: "快速过滤器",
	TeamNameExists: "同名的团队已存在。",
	CreateTeamInstruction: "每个请求中一个团队最多只能包含 15 个用户。要向团队添加更多用户，请创建更多的“修改团队”请求。",
	ModifyTeamInstruction: "每个请求中最多可以向某个团队添加或从中除去 15 个用户。要进行更多变更，请创建更多的“修改团队”请求。",

	Yes: "是",
	No: "否",
	UserExist: "用户已存在",
	MaxTeamsExceed: "超过团队的最大长度",
	PreviewCloseTitle: "关闭部分",
	PreviewOpenTitle: "打开部分",

	/* Service Request details */
	Application: "应用程序",
	CreatedOn: "创建日期",
	Date: "日期",
	Details: "详细信息",
	From: "自",
	Subject: "主题",
	Summary: "摘要",
	FailedStatus: "失败",
	To: "收件人",
	ViewSRDetails: "请求详细信息",
	ViewSRTitle: "查看服务请求",
	ViewSRGeneral: "常规",
	ViewSRGenBannerApproval: "此任务允许您核准或拒绝服务请求",
	ViewSRGenBannerNoApproval: "此任务显示服务请求的详细信息",
	ViewSRLastUpdate: "上次更新日期",
	ViewSRUpdatedBy: "更新者",
	ViewSRWorkLog: "工作日志",
	ViewSRWorkBanner: "服务请求的工作日志。选择表行可查看注释的详细信息。",
	ViewSRNoWorkl: "没有要显示的工作日志",
	ViewSRCommLog: "通信日志",
	ViewSRCommBanner: "服务请求的通信日志。选择表行可查看注释的详细信息。",
	ViewSRNoComml: "没有要显示的通信日志",
    //Venky : new
	ViewSolutionForSRPR: "服务请求和 RR 的解决方案",
	ViewSRNoSol: "没有要显示的解决方案",
	Symptom: "症状",
	Cause: "原因",
	Resolution: "解决方案",
	ViewSRSolDetails: "服务请求解决方案详细信息",
	ViewRRSolDetails: "RR 解决方案详细信息",
	ViewSolutionForSRPRBanner: "服务请求和相关记录的解决方案。",
	InvalidColumn1: "列：",
	InvalidColumn2: "为“我的请求”展舱中的“显示我的全部请求”对话框配置的列不存在。请编辑“自助服务中心”应用程序并更正列属性。",
	/* Bulletin Board */
    MyNewsHeading: "我的新闻",
	Message: "消息",
	PostDate: "发布日期",
	PostBy: "消息发布人",
	ExpireDate: "截止日期",
	ViewBBMessageDetails: "消息详情",
	ViewBBMessageTitle: "我的新闻详细信息",
	ViewBBMessageBanner: "此任务显示消息的详细信息",
	MsgViewed: "已查看？",
	
	/* LiveChat */
    LiveChatHeading: "联系我们",
    LiveChatLink: "立即聊天",
    LiveChatMessage: "<UL STYLE='margin-top:0px;margin-bottom:2px;list-style-type: none;'> <LI> 与代理聊天</LI> <LI> 每天上午 8:30 到下午 6:00（东部标准时间）有空</LI> <LI> <A HREF='http://pic.dhe.ibm.com/infocenter/tivihelp/v58r1/index.jsp' target='blank'>SmartCloud Control Desk 信息</A></LI> </UL>",
     
	
	/* ITM Agent Statuses */
	noAgentState: "无监视器",
	onlineState: "监视器联机",
	offlineState: "监视器脱机",
	toobusyState: "监视器繁忙，不能响应",
	notconfiguredState: "未配置监视器",
	
	/* Approve Request */
	AppRequestBannerTitle: "核准",
	AppRequestBannerDescription: "某个核准正在等待您的输入。您将如何表决？",
	RejectRequest: "我拒绝此请求",
	ApproveRequest: "我核准此请求",
	ApproveSummary: "摘要",
	ApproveDetails: "详细信息",
	
	ContextButtonSetLabelCreate: "创建",
	
	copyright: "License Material - Property of IBM Corp. &copy; IBM Corporation and other(s) 2009. IBM 是 IBM Corporation 在美国和/或其他国家/地区的注册商标。",
	AboutCopyright: "Licensed Materials - Property of IBM Corp. &copy; Copyright IBM Corp. 2009. All Rights Reserved.US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contact with IBM Corp.",	
	

	// TSAM specific messages ------------------------------------------------------------
	MyDeploymentsHeading: "项目",

	//Project Details
	ProjectTitle: "项目",
	ProjectDetails: "项目详细信息",
	ProjectDetailsImage: "",
	ProjectName: "项目名称",
	ProjectDescription: "项目描述",
	ProjectType: "项目类型",
	ProjectStartDate: "开始日期",
	ProjectEndDate: "结束日期",
	ProjectTeamAccess: "团队访问权",
	ProjectsDropDownEmptyLabel: "选择项目",	
	
	//WCA Projects
	WCAProjectTitle: "WebSphere CloudBurst 项目",
	WCAProjectDetails: "WebSphere CloudBurst 项目详细信息",
	WCAProjectPattern: "模式名称",
	WCAServerResourcesLegend: "资源",
	WCAServerVirtualCPU: "虚拟 CPU",
	WCAServerMemory: "主存储器",
	WCAPatternSelection: "选择 CloudBurst 模式",
	
	ServerGridName: "服务器名称",
	ServerGridOS: "操作系统",
	ServerGridStatus: "状态",
	ServerGridMemory: "内存 (%)",
	ServerGridCPU: "CPU (%)",
	ServerGridDisk: "磁盘 (%)",
	ServerGridTotalMemory: "内存",
	ServerGridTotalCPU: "CPU",
	ServerGridTotalDisk: "磁盘",
	ServerGridLastUpdate: "最近一次更新时间",
	ServerGridHypervisor: "系统管理程序",
	WCAServerGridPart: "部件",
	ProjectRequestedServers: "请求的服务器",
	ProjectActiveServers: "活动服务器",
	
	ViewProjectGeneralLegend: "常规",
	ViewProjectName: "姓名",
	ViewProjectDescription: "描述",
	ViewProjectServiceOwner: "服务负责人",
	ViewProjectType: "项目类型",
	ViewProjectStartDate: "开始日期",
	ViewProjectEndDate: "结束日期",
	ViewProjectTeamAccess: "团队访问权",
	ViewProjectRequestedServer: "请求的服务器",
	ViewProjectActiveServers: "活动服务器",
	
	ViewProjectServersLegend: "服务器",
	ViewProjectServersTitle: "服务器",
	ViewProjectMasterImage: "主映像",
	ViewProjectCreateDate: "创建日期",
	ViewProjectCreatedBy: "创建人",
	ViewProjectHypervisor: "系统管理程序",
	ViewProjectServerStatus: "供应状态",
	ViewProjectServerStatusLastUpdate: "上次供应状态更新时间",
	ViewProjectCPU: "CPU",
	ViewProjectVirtual: "虚拟",
	ViewProjectPhysical: "物理",
	ViewProjectMain: "主界面",
	ViewProjectSwap: "交换",
	ViewProjectDisk: "磁盘",
	ViewProjectLocal: "本地",
	ViewProjectAdditionalSoftware: "附加软件",
	ViewProjectMemory: "内存",
	ViewProjectServersTotal: "总计： ",
	ProjectUsed: "项目名称已在使用中。",

	CTJZH2304I: "CTJZH2304I: 必须选择虚拟服务器",
	CTJZH2310E: "CTJZH2310E: 未能显示项目的详细信息。找不到项目标识。",
	CTJZH2311E: "CTJZH2311E: 由于发生内部错误，无法显示项目的详细信息。",
	CTJZH2312E: "CTJZH2312E: 检索项目的详细信息时出错。",
	CTJZH2314E: "CTJZH2314E: 检索此项目的详细信息时出错。",
	CTJZH2315E: "CTJZH2315E: 未能检索项目列表。",
	CTJZH2332E: "CTJZH2332E: 内存的建议值不能小于其最小值。",
    CTJZH2333E: "CTJZH2333E: 建议的物理 CPU 不能小于最小物理 CPU。",
	CTJZH2340W: "CTJZH2340W: 为预定检索可用的开始日期列表失败。",
	CTJZH2341W: "CTJZH2341W: 选定的服务器已具有映像。新映像将替换现有映像。",
	CTJZH2343E: "CTJZH2343E: 某个建议的资源小于相应的最小资源。",
	CTJZH2347E: "CTJZH2347E: 具有这些参数的服务器在这些日期都不可用。",
	CTJZH2348E: "CTJZH2348E: 将取消 {0} 项目。",
	CTJZH2349E: "CTJZH2349E: 将注销映像 {0}。",
	CTJZH2350E: "CTJZH2350E: 将除去用户 {0}。",
	CTJZH2351E: "CTJZH2351E: 将除去团队 {0}。",
	CTJZH2352E: "CTJZH2352E: 将除去服务器 {0}。",
	
	//SRM 721
	HelpFixDesc : "搜索问题的解决方案。如果找不到解决方案，请开出凭单以解决该问题。",
    CTJZH2359I: "CTJZH2359I: 购物车为空",
	CurrentCart:  "当前的购物车",
	More:  "更多",
    Cart:  "购物车",
	CreateSR:  "创建请求",
	CTJZH2360I: "CTJZH2360I: 尚未定义任何模板。",
	CTJZH2363I: "CTJZH2363I: 没有对自助服务中心启用活动解决方案。",

	//Help me fix an issue
	SubmitLabel : "提交",
	SearchTextLabel : "搜索关键字",
	
	//Frequent Requests
	SystemWideFrequentRequest : "系统范围的常用请求",
	MyFrequentRequests : "我的常用请求",
	CTJZH2353E: "CTJZH2353E: 没有要显示的常用请求 ",
	
	CreateSRLabel: "报告问题",
	
	SearchFieldText : "搜索解决方案、产品和快速插入",
	SearchFieldTextNoSol : "搜索产品和快速插入",
	FolderView : "文件夹视图",
	TreeView : "树形视图",
	Maximize : "最大化",
	Minimize : "恢复",
	Folders :  "服务",
	SolutionFolders :  "解决方案",
	
	dummy_: ""
  })
);



