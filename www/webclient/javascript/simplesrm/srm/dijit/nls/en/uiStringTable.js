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
	Title: "Tivoli Self Service Station",
	About: "About",
	Help: "Help",
	Logout: "Logout",
	Welcome: "Welcome",
	// Login widget
	LoginHeading: "Maximo Login",
	Username: "User Name",
	Password: "Password",
	Login: "Login",
	InvalidLogin: "User Name or Password is incorrect. Please try again.",
	NotAuthorized: "You are not authorized to use this application",
	// MyCatalogRequestsGrid widget
	ShowSelectedDetails: "Show details of the selected row",
	ApproveSelectedRequest: "Approve selected request",
	RejectSelectedRequest: "Reject selected request",
	ShowDetails: "Show details",
	
	SRRequestPodHeading: "My Requests",	
	SRShowMyRequestsLink: "Show All My Requests...",
	SRMyRequests: "My Requests",
	
	INCIDENTRequestPodHeading: "My Incidents",
	INCIDENTShowMyRequestsLink: "Show All My Incidents...",
	INCIDENTMyRequests: "My Incidents",
	
	AssetsPodHeading: "My Assets",	
	ShowMyAssetsLink: "Show All My Assets...",
	MyAssets: "My Assets",
	
	ShowAllRequests: "Show all requests",
	ShowLastRequests: "Show last ${0} requests",
	ShowAllNews: "Show all news",
	ShowLastNews: "Show last ${0} news",
	MyApprovalHeading: "My Approvals",	
	Refresh: "Refresh",
	// my catalog request grid column headings
	TotalCost: "Total Cost",
	StatusDate: "Status Time",
	RequestedBy: "Requested By",
	Status: "Status",
	Quantity: "Quantity",
	UnitCost: "Unit Cost",
	Description: "Description",
	ItemNum: "Request Type",
	RequestedFor: "Requested For",
	ItemSetID: "Item Set ID",
	DateEntered: "Date Entered",
	MRNum: "MRNUM",
	Priority: "Priority",
	SiteID: "Site ID",
	MRLINEID: "MRLINE ID",
	// MyDeploymentsGrid
	Name: "Name",
	ServiceOwner: "Service Owner",
	//ChnageDate: "Change Date",
	DueDate: "Due Date",
	CreatedDate: "Created",
	StartDate: "Target Start",
	OfferingDescription: "Request Description",
	Approval: "Approval",
	// Catalog Request Creator
	CatalogRequestCreateHeading: "Create A New Request",
	CatalogOfferingPrompt: "Service Catalog Offering",
	CreateRequestStatus: "Request Submitted Successfully",
	CreateRequestButtonLabel: "OK",
	CancelButtonLabel: "Cancel",
	Location: "Location",
	AssetNumber: "Asset Number",
	Serial: "Serial Number", 
	IsPrimary: "Primary",
	IsUser: "User",
	IsCustodian: "Custodian",		
	RefreshDate: "Refresh Date",
	PlannedRefreshDate: "Planned Refresh Date",
	ChangeDate: "Change Date",
	AssetActivity: "Current Assets",
	
	// Navigator widget
	Home: "Home",
	Back: "Back", 
	Forward: "Forward",
	HomeBreadcrumb: "Home",
	Search: "Search",
	SearchAdjust: "Adjust your Search",
	SearchResults: "Search Results",
	Close: "Close",
	IncidentsLabel: "Help Ticketing and Support",
	IncidentsDesc: "Open a help ticket for an existing asset or service.",
	RequestsLabel: "Request a new Service",
	RequestsDesc: "Request a new asset or service.",
    IssuesLabel: "Report an Issue",
    IssuesDesc: "Create a new Service Request to report an Issue.",
    BrowseSolutionsLabel: "Browse Solutions",
    BrowseSolutionsDesc: "View all existing Solutions.",
    
	RecentsLabel: "Frequent Requests",
	RecentsDesc: "Easy access to the services you most often request.",
	HelpFixLabel: "Search for Solutions",
   SearchToolTip: "To search based on one or another word, use a space or the OR operator. Example: virus protection, virus OR protection. To search based on more than one word existing, use the AND operator. Example: lotus AND notes. For an exact match, use double quotes around the words. Example: \"lotus notes\".",
	createSRToolTip: "Create a new Service Request to report an Issue or request something.",
	templateToolTip: "Cart Templates",
	
	None: "None",
	NA: "N/A",
	//branch in navigator tree
	Directory: "Directory",
	//leaf in navigator tree
	Panel: "Panel",
	// DateRange Widget
	DurationLabel: "For this duration",
	MonthsLabel: "Months",
	WeeksLabel: "Weeks",
	DaysLabel: "Days",
	ForeverLabel: "Indefinite",
	StartDateLabel: "Start Date",
	EndDateLabel: "End Date",
	StartTime: "Start Time",
	EndTime: "End Time",
	UntilLabel: "Until this date",
	InvalidDurationMessage: "Duration must be greater than 0",
	InvalidDateMessage: "This is not a valid date",
	DateEarlyMessage: "This date is before ${0}, the earliest permissible date",
	DateLateMessage: "This date is after ${0}, the latest permissible date",
	MissingDateMessage: "This date is required",

	Loading: "Loading...",
	RecentActivity: "Recent Activity",
	NoRecentActivity: "No recent activity",
    NoAssetsAssigned: "No assets assigned",
	ManageRequests: "Manage Requests",
	ManageRequestsLink: "Manage Requests...",
	ManageApprovalsLink: "Manage Approvals...",
	ManageMyNewsLink: "View My News...",
	ManageMyNews: "View My News",
	ManageApprovals: "Manage Approvals",
    CartID: "Cart ID",
	

	//General
	OK : "OK",
	Cancel : "Cancel",
	Select: "Select",
	Total: "Total",
	TotalLabel: "Total: ",
	ConfirmationProceed: "Are you sure you want to proceed?",
	ConfirmationDialogTitle: "Confirmation required",
	
	// error messages
	CTJZH2301E: "CTJZH2301E: An error occured creating the input form for this request.",
	CTJZH2302E: "CTJZH2302E: An error occured retrieving this request's details.",
	CTJZH2303E: "CTJZH2303E: You must be logged in to create a request.",
		
	CTJZH2305E: "CTJZH2305E: You have input fields with invalid values. You must correct these errors before continuing.",
	CTJZH2306E: "CTJZH2306E: The system reported an error in creating this request.",
	CTJZH2307E: "CTJZH2307E: An error occurred while logging you in.",
	CTJZH2308E: "CTJZH2308E: Sorry, but creating this request is currently not supported.",
	CTJZH2309E: "CTJZH2309E: Cannot proceed due to an internal error.",
		
	CTJZH2313E: "CTJZH2313E: Failed to retrieve the list of service requests.",
	CTJZH2360E: "CTJZH2360E: Failed to retrieve the list of assets.",
		
	CTJZH2316E: "CTJZH2316E: Message to be displayed has null, undefined or empty code, or invalid type.",
	CTJZH2317E: "CTJZH2317E: Password confirmation does not match.", 
	CTJZH2318E: "CTJZH2318E: A maximum of 5 teams can be selected.",
	CTJZH2319E: "CTJZH2319E: Username already exists.",
	CTJZH2320E: "CTJZH2320E: A maximum of 15 users can be selected.",
	CTJZH2321I: "CTJZH2321I: No details to display for this request.",
	CTJZH2322E: "CTJZH2322E: Password cannot start or end with a space.", 
	CTJZH2324E: "CTJZH2324E: Username contains spaces.",	
	CTJZH2323E: "CTJZH2323E: This service request cannot be submitted because there are no resource pools of this type registered.", 
	CTJZH2325E: "CTJZH2325E: The request is no longer available.",
	CTJZH2328W: "CTJZH2328W: Deleting the user cannot be undone and the userid may never be reused", 
	CTJZH2329E: "CTJZH2329E: The specified userid belongs to a user that has been deleted and cannot be reused", 
	CTJZH2331E: "CTJZH2331E: Failed when processing your selected request.",
		
    CTJZH2334E: "CTJZH2334E: A server error occured updating this new service request with the provided data",
	CTJZH2335E: "CTJZH2335E: An unrecoverable server error occured while creating this new service request",
	CTJZH2336E: "CTJZH2336E: Approval Details input exceeded max length of 50 characters.",	
	CTJZH2337E: "CTJZH2337E: Cannot create a new service request because you do not appear to be logged in",
	CTJZH2338E: "CTJZH2338E: A server error occured creating this new service request",
	CTJZH2339I: "CTJZH2339I: Sorry, but no matches were found.",
	
	CTJZH2342E: "CTJZH2342E: An error occurred creating this request.",
		
	CTJZH2345E: "CTJZH2345E: You cannot remove this team while it has active projects.",
	CTJZH2346E: "CTJZH2346E: Password must be at least 6 characters in length",
	
	CTJZH2353I: "CTJZH2353I: You are trying to make more than maximum Team changes (up to 5) that are allowed in this request. To make more than 5 team changes, create additional Modify Team requests.",
	CTJZH2354I: "CTJZH2354I: You are trying to make more than maximum User changes (up to 15) that are allowed in this request. To make more than 15 user changes, create additional Modify User requests.",	
	
	CTJZH2355I: "CTJZH2355I: Search Index data is not available or corrupt. Run Cron Task PmObjSearchCron  again.",
	CTJZH2356I: "CTJZH2356I: You must enter a search string",
	CTJZH2357I: "CTJZH2357I: Search Index data is being updated. Try again later.",
	CTJZH2358I: "CTJZH2358I:NODICTION",
	CTJZH2361I: "CTJZH2361I: There are no Offerings or Templates available or active for this user. Check if the user is authorized to access any Catalog Offerings or Ticket Templates.",
	CTJZH2362I: "CTJZH2362I: To enable all Self Service Center features in Internet Explorer, install the Silverlight plugin: www.microsoft.com/getsilverlight/",

    	
	//String list for user and team
	//Role: "Role",
	//Language: "Language",
	Team: "Team",
	UserTeams: "User Teams",
	
	//UserStatus: "Activate user account",
	LOGINID: "Login ID",
	AccountLegend: "Account Settings",
	PersonalInfoLegend: "Personal Information",
	RegionalSettLegend: "Regional Settings",
	FirstName: "First Name",
	LastName: "Last Name",
	DisplayName: "Display Name",
	Email: "E-Mail",
	Telephone: "Telephone",
	Address: "Address",
	City: "City",
	State: "State",
	Country: "Country",
	AccountStatus: "Active",
	EmptyString: "               ",
	UserList: "Available Users",
	UserID: "User ID",
	Role: "Role",
	ConfirmPassword: "Confirm Password",
	InvalidConfirmPassword: "Password confirmation does not match",
	PressToAddTeam: "Press + to add team",
	CreateUserInstruction: "A user may be added to up to 5 teams per request. To add a user to more teams, create additional Modify User requests.",
	ModifyUserInstruction: "A user may be added to or removed from up to 5 teams per request. To make additional changes, create additional Modify User requests.",
	// Team Management
	TeamID: "ID",
	TeamName: "Name",
	TeamDescription: "Description",
	UserList: "Available Users",
	SelectedUserList: "Selected Users",
	TeamDetails: "Team Details",
	ProjectAccount: "Project Account",
	QuickFilter: "quick filter",
	TeamNameExists: "A team with the same name already exists.",
	CreateTeamInstruction: "A team may include up to 15 users per request. To add more users to a team, create additional Modify Team requests.",
	ModifyTeamInstruction: "You can add or remove up to 15 users to a team per request. To make additional changes, create additional Modify Team requests.",

	Yes: "Yes",
	No: "No",
	UserExist: "User already exists",
	MaxTeamsExceed: "Exceeds maximum length for team",
	PreviewCloseTitle: "Close Section",
	PreviewOpenTitle: "Open Section",

	/* Service Request details */
	Application: "Application",
	CreatedOn: "Created on",
	Date: "Date",
	Details: "Details",
	From: "From",
	Subject: "Subject",
	Summary: "Summary",
	FailedStatus: "Failed",
	To: "To",
	ViewSRDetails: "Request Details",
	ViewSRTitle: "View Service Request",
	ViewSRGeneral: "General",
	ViewSRGenBannerApproval: "This task allows you to approve or reject a service request",
	ViewSRGenBannerNoApproval: "This task displays the details of the service request",
	ViewSRLastUpdate: "Last update",
	ViewSRUpdatedBy: "Updated by",
	ViewSRWorkLog: "Work Log",
	ViewSRWorkBanner: "Work log for the service request. Select the table row to view the details of the note.",
	ViewSRNoWorkl: "No work log to display",
	ViewSRCommLog: "Communication Log",
	ViewSRCommBanner: "Communication log for the service request. Select the table row to view the details of the note.",
	ViewSRNoComml: "No communication log to display",
    //Venky : new
	ViewSolutionForSRPR: "Solutions for SRs and RRs",
	ViewSRNoSol: "No Solution to display",
	Symptom: "Symptom",
	Cause: "Cause",
	Resolution: "Resolution",
	ViewSRSolDetails: "SR Solution Details",
	ViewRRSolDetails: "RR Solution Details",
	ViewSolutionForSRPRBanner: "Solution for the service request and related records.",
	InvalidColumn1: "Columns :",
	InvalidColumn2: "configured for the 'Show All My Requests' dialog in the My Requests Pod do not exist. Edit the Self Service Center application and correct the columns property.",
	/* Bulletin Board */
    MyNewsHeading: "My News",
	Message: "Message",
	PostDate: "Post Date",
	PostBy: "Posted By",
	ExpireDate: "Expiration Date",
	ViewBBMessageDetails: "Message Details",
	ViewBBMessageTitle: "My News Details",
	ViewBBMessageBanner: "This task displays the details for the message",
	MsgViewed: "Viewed?",
	
	/* LiveChat */
    LiveChatHeading: "Contact Us",
    LiveChatLink: "Chat Now",
    LiveChatMessage: "<UL STYLE='margin-top:0px;margin-bottom:2px;list-style-type: none;'> <LI> Chat with an Agent</LI> <LI> Available daily - 8:30 AM to 6 PM EST</LI> <LI> <A HREF='http://pic.dhe.ibm.com/infocenter/tivihelp/v58r1/index.jsp' target='blank'>SmartCloud Control Desk Information </A></LI> </UL>",
     
	
	/* ITM Agent Statuses */
	noAgentState: "No Monitor",
	onlineState: "Monitor online",
	offlineState: "Monitor offline",
	toobusyState: "Monitor too busy to respond",
	notconfiguredState: "Monitor not configured",
	
	/* Approve Request */
	AppRequestBannerTitle: "Approval",
	AppRequestBannerDescription: "An approval is waiting for your input. How do you vote?",
	RejectRequest: "I reject this request",
	ApproveRequest: "I approve this request",
	ApproveSummary: "Summary",
	ApproveDetails: "Details",
	
	ContextButtonSetLabelCreate: "Create",
	
	copyright: "License Material - Property of IBM Corp. &copy; IBM Corporation and other(s) 2009. IBM is a registered trademark of the IBM Corporation in the United States, other countries, or both.",
	AboutCopyright: "Licensed Materials - Property of IBM Corp. &copy; Copyright IBM Corp. 2009. All Rights Reserved. US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contact with IBM Corp.",	
	

	// TSAM specific messages ------------------------------------------------------------
	MyDeploymentsHeading: "Projects",

	//Project Details
	ProjectTitle: "Project",
	ProjectDetails: "Project Details",
	ProjectDetailsImage: "",
	ProjectName: "Project Name",
	ProjectDescription: "Project Description",
	ProjectType: "Project Type",
	ProjectStartDate: "Start Date",
	ProjectEndDate: "End Date",
	ProjectTeamAccess: "Team Access",
	ProjectsDropDownEmptyLabel: "Select a project",	
	
	//WCA Projects
	WCAProjectTitle: "WebSphere CloudBurst Project",
	WCAProjectDetails: "WebSphere CloudBurst Project Details",
	WCAProjectPattern: "Pattern Name",
	WCAServerResourcesLegend: "Resources",
	WCAServerVirtualCPU: "Virtual CPU",
	WCAServerMemory: "Main Memory",
	WCAPatternSelection: "Select a CloudBurst Pattern",
	
	ServerGridName: "Server Name",
	ServerGridOS: "Operating System",
	ServerGridStatus: "Status",
	ServerGridMemory: "Memory (%)",
	ServerGridCPU: "CPU (%)",
	ServerGridDisk: "Disk (%)",
	ServerGridTotalMemory: "Memory",
	ServerGridTotalCPU: "CPU",
	ServerGridTotalDisk: "Disk",
	ServerGridLastUpdate: "Last Update",
	ServerGridHypervisor: "Hypervisor",
	WCAServerGridPart: "Part",
	ProjectRequestedServers: "Requested Server(s)",
	ProjectActiveServers: "Active Server(s)",
	
	ViewProjectGeneralLegend: "General",
	ViewProjectName: "Name",
	ViewProjectDescription: "Description",
	ViewProjectServiceOwner: "Service Owner",
	ViewProjectType: "Project Type",
	ViewProjectStartDate: "Start Date",
	ViewProjectEndDate: "End Date",
	ViewProjectTeamAccess: "Team Access",
	ViewProjectRequestedServer: "Requested Servers",
	ViewProjectActiveServers: "Active Servers",
	
	ViewProjectServersLegend: "Servers",
	ViewProjectServersTitle: "Server",
	ViewProjectMasterImage: "Master Image",
	ViewProjectCreateDate: "Create Date",
	ViewProjectCreatedBy: "Created By",
	ViewProjectHypervisor: "Hypervisor",
	ViewProjectServerStatus: "Provisioning Status",
	ViewProjectServerStatusLastUpdate: "Last provisioning status update",
	ViewProjectCPU: "CPU",
	ViewProjectVirtual: "Virtual",
	ViewProjectPhysical: "Physical",
	ViewProjectMain: "Main",
	ViewProjectSwap: "Swap",
	ViewProjectDisk: "Disk",
	ViewProjectLocal: "Local",
	ViewProjectAdditionalSoftware: "Additional Software",
	ViewProjectMemory: "Memory",
	ViewProjectServersTotal: "Total: ",
	ProjectUsed: "The project name is already in use.",

	CTJZH2304I: "CTJZH2304I: You must choose a virtual server",
	CTJZH2310E: "CTJZH2310E: Failed to display the project's details. Cannot find a project ID.",
	CTJZH2311E: "CTJZH2311E: Cannot display the project's details due to an internal error.",
	CTJZH2312E: "CTJZH2312E: An error has occurred retrieving the project's details.",
	CTJZH2314E: "CTJZH2314E: An error occurred retrieving this project's details.",
	CTJZH2315E: "CTJZH2315E: Failed to retrieve the list of projects.",
	CTJZH2332E: "CTJZH2332E: Recommended value of memory cannot be smaller than its minimum value.",
    CTJZH2333E: "CTJZH2333E: Recommended physical CPUs cannot be smaller than minimum physical CPU.",
	CTJZH2340W: "CTJZH2340W: Failed retrieving the list of available start dates for your reservation.",
	CTJZH2341W: "CTJZH2341W: Selected server already has an image. The new image will replace the existing one.",
	CTJZH2343E: "CTJZH2343E: One of the recommended resources is smaller than the corresponding minimum resource.",
	CTJZH2347E: "CTJZH2347E: No servers with these parameters are available on these dates.",
	CTJZH2348E: "CTJZH2348E: You are about to cancel {0} project.",
	CTJZH2349E: "CTJZH2349E: You are about to unregister image {0}.",
	CTJZH2350E: "CTJZH2350E: You are about to remove user {0}.",
	CTJZH2351E: "CTJZH2351E: You are about to remove team {0}.",
	CTJZH2352E: "CTJZH2352E: You are about to remove server {0}.",
	
	//SRM 721
	HelpFixDesc : "Search for a Solution to your issue. Open a ticket to resolve the issue if a Solution is not found.",
    CTJZH2359I: "CTJZH2359I: The Shopping Cart is empty",
	CurrentCart:  "Current Cart",
	More:  "more",
    Cart:  "Cart",
	CreateSR:  "Create Request",
	CTJZH2360I: "CTJZH2360I: You do not have any templates defined.",
	CTJZH2363I: "CTJZH2363I: There are no active solutions or solutions enabled for the Self Service Center.",

	//Help me fix an issue
	SubmitLabel : "Submit",
	SearchTextLabel : "Search Keywords",
	
	//Frequent Requests
	SystemWideFrequentRequest : "System Wide Frequent Request",
	MyFrequentRequests : "My Frequent Requests",
	CTJZH2353E: "CTJZH2353E: There are no Frequent Requests  to display ",
	
	CreateSRLabel: "Report an Issue",
	
	SearchFieldText : "Search for Solutions, Offering and Quick Inserts",
	SearchFieldTextNoSol : "Search for Offering and Quick Inserts",
	FolderView : "Folder view",
	TreeView : "Tree view",
	Maximize : "Maximize",
	Minimize : "Restore",
	Folders :  "Services",
	SolutionFolders :  "Solutions",
	
	dummy_: ""
  })
);

