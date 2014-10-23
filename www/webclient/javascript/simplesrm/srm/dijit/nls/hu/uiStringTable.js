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
	Title: "Tivoli önkiszolgáló állomás",
	About: "A programról",
	Help: "Súgó",
	Logout: "Kijelentkezés",
	Welcome: "Üdvözöljük",
	// Login widget
	LoginHeading: "Maximo bejelentkezés",
	Username: "Felhasználónév",
	Password: "Jelszó",
	Login: "Bejelentkezés",
	InvalidLogin: "A felhasználónév vagy jelszó helytelen. Próbálja újra.",
	NotAuthorized: "Nincs jogosultsága az alkalmazás használatára.",
	// MyCatalogRequestsGrid widget
	ShowSelectedDetails: "Kijelölt sor részleteinek megjelenítése.",
	ApproveSelectedRequest: "Kijelölt kérés jóváhagyása",
	RejectSelectedRequest: "Kijelölt kérés visszautasítása",
	ShowDetails: "Részletek megjelenítése",
	
	SRRequestPodHeading: "Saját kérések",	
	SRShowMyRequestsLink: "Összes saját kérés megjelenítése...",
	SRMyRequests: "Saját kérések",
	
	INCIDENTRequestPodHeading: "Saját incidensek",
	INCIDENTShowMyRequestsLink: "Összes saját incidens megjelenítése...",
	INCIDENTMyRequests: "Saját incidensek",
	
	AssetsPodHeading: "Saját eszközök",	
	ShowMyAssetsLink: "Összes saját eszköz megjelenítése...",
	MyAssets: "Saját eszközök",
	
	ShowAllRequests: "Összes kérés megjelenítése",
	ShowLastRequests: "Legalább ${0} kérés megjelenítése",
	ShowAllNews: "Összes hír megjelenítése",
	ShowLastNews: "Utolsó ${0} hír megjelenítése",
	MyApprovalHeading: "Saját jóváhagyások",	
	Refresh: "Frissítés",
	// my catalog request grid column headings
	TotalCost: "Teljes költség",
	StatusDate: "Státusz időpont",
	RequestedBy: "Igényelte",
	Status: "Státusz",
	Quantity: "Mennyiség",
	UnitCost: "Egységköltség",
	Description: "Leírás",
	ItemNum: "Kéréstípus",
	RequestedFor: "Igénylő",
	ItemSetID: "Cikkhalmaz-azonosító",
	DateEntered: "Rögzítés dátuma",
	MRNum: "MRNUM",
	Priority: "Prioritás",
	SiteID: "Telephely-azonosító",
	MRLINEID: "MRLINE azonosító",
	// MyDeploymentsGrid
	Name: "Név",
	ServiceOwner: "Szolgáltatásgazda",
	//ChnageDate: "Change Date",
	DueDate: "Esedékesség dátuma",
	CreatedDate: "Létrehozva",
	StartDate: "Tervezett kezdés",
	OfferingDescription: "Igénylés leírása",
	Approval: "Jóváhagyás",
	// Catalog Request Creator
	CatalogRequestCreateHeading: "Új kérés létrehozása",
	CatalogOfferingPrompt: "Szolgáltatáskatalógus ajánlat",
	CreateRequestStatus: "Kérés sikeresen elküldve",
	CreateRequestButtonLabel: "OK",
	CancelButtonLabel: "Mégse",
	Location: "Hely",
	AssetNumber: "Eszközszám",
	Serial: "Sorozatszám", 
	IsPrimary: "Elsődleges",
	IsUser: "Felhasználó",
	IsCustodian: "Felügyelő",		
	RefreshDate: "Frissítési dátum",
	PlannedRefreshDate: "Tervezett frissítési dátum",
	ChangeDate: "Módosítás dátuma",
	AssetActivity: "Aktuális eszközök",
	
	// Navigator widget
	Home: "Kezdőlap",
	Back: "Vissza", 
	Forward: "Előre",
	HomeBreadcrumb: "Kezdőlap",
	Search: "Keresés",
	SearchAdjust: "Keresés beállítása",
	SearchResults: "Keresési eredmények",
	Close: "Bezárás",
	IncidentsLabel: "Súgó jegykezelés és támogatás",
	IncidentsDesc: "Súgójegy megnyitása egy meglévő eszközhöz vagy szolgáltatáshoz.",
	RequestsLabel: "Új szolgáltatás létrehozása",
	RequestsDesc: "Új eszköz vagy szolgáltatás kérése.",
    IssuesLabel: "Probléma jelentése",
    IssuesDesc: "Új szolgáltatásigénylés létrehozása probléma jelentéséhez.",
    BrowseSolutionsLabel: "Megoldások tallózása",
    BrowseSolutionsDesc: "Összes meglévő megoldás megjelenítése.",
    
	RecentsLabel: "Gyakori kérések",
	RecentsDesc: "Könnyű hozzáférés a leggyakrabban kért szolgáltatásokhoz.",
	HelpFixLabel: "Megoldások keresése",
   SearchToolTip: "Ha egy szó vagy egy másik alapján akar keresni, akkor használjon szóközt vagy az OR operátort. Például: virus protection, virus OR protection. Ha több meglévő szó alapján akar keresni, akkor használja az AND operátort. Például: lotus AND notes. Pontos egyezés kereséséhez tegye dupla idézőjelbe a szókapcsolatot. Például: \"lotus notes\".",
	createSRToolTip: "Új szolgáltatásigénylés létrehozása probléma jelentéséhez vagy valaminek a kérdéséhez.",
	templateToolTip: "Kosár sablonok",
	
	None: "Egyik sem",
	NA: "N/A",
	//branch in navigator tree
	Directory: "Könyvtár",
	//leaf in navigator tree
	Panel: "Panel",
	// DateRange Widget
	DurationLabel: "Erre az időtartamra",
	MonthsLabel: "Hónap",
	WeeksLabel: "Hét",
	DaysLabel: "Nap",
	ForeverLabel: "Meghatározatlan",
	StartDateLabel: "Kezdő dátum",
	EndDateLabel: "Befejező dátum",
	StartTime: "Kezdő időpont",
	EndTime: "Befejező időpont",
	UntilLabel: "Eddig a dátumig",
	InvalidDurationMessage: "Az időtartamnak nullánál nagyobbnak kell lennie",
	InvalidDateMessage: "Érvénytelen dátum.",
	DateEarlyMessage: "A dátum korábbi, mint ${0}, amely a legkorábbi megengedhető dátum",
	DateLateMessage: "A dátum későbbi, mint ${0}, amely a legkésőbbi megengedhető dátum",
	MissingDateMessage: "Ez a dátum szükséges",

	Loading: "Betöltés...",
	RecentActivity: "Mostani tevékenység",
	NoRecentActivity: "Nincs mostani tevékenység",
    NoAssetsAssigned: "Nincs hozzárendelve eszköz",
	ManageRequests: "Kérések kezelése",
	ManageRequestsLink: "Kérések kezelése...",
	ManageApprovalsLink: "Jóváhagyások kezelése...",
	ManageMyNewsLink: "Saját hírek megjelenítése...",
	ManageMyNews: "Saját hírek megjelenítése",
	ManageApprovals: "Jóváhagyások kezelése",
    CartID: "Kosárazonosító",
	

	//General
	OK : "OK",
	Cancel : "Mégse",
	Select: "Kiválasztás",
	Total: "Összesen",
	TotalLabel: "Összeg: ",
	ConfirmationProceed: "Valóban szeretné folytatni?",
	ConfirmationDialogTitle: "Megerősítés szükséges",
	
	// error messages
	CTJZH2301E: "CTJZH2301E: Hiba történt a kérés bemeneti űrlapjának létrehozásakor.",
	CTJZH2302E: "CTJZH2302E: Hiba történt a kérés részleteinek lekérésekor.",
	CTJZH2303E: "CTJZH2303E: Kérés létrehozásához be kell jelentkeznie.",
		
	CTJZH2305E: "CTJZH2305E: Érvénytelen értéket tartalmazó bemeneti mezőkkel rendelkezik. A folytatás előtt ki kell javítania ezeket a hibákat.",
	CTJZH2306E: "CTJZH2306E: A rendszer hibát jelentett az adott kérés létrehozásában.",
	CTJZH2307E: "CTJZH2307E: Hiba történt a bejelentkezéskor.",
	CTJZH2308E: "CTJZH2308E: Elnézést, de ennek a kérésnek a létrehozása pillanatnyilag nem támogatott.",
	CTJZH2309E: "CTJZH2309E: Egy belső hiba miatt nem lehet folytatni.",
		
	CTJZH2313E: "CTJZH2313E: A szolgáltatásigénylések listájának lekérése meghiúsult.",
	CTJZH2360E: "CTJZH2360E: Az eszközök listájának lekérése meghiúsult.",
		
	CTJZH2316E: "CTJZH2316E: A megjelenítendő üzenet null, meghatározatlan vagy üres kóddal rendelkezik, vagy érvénytelen típusú.",
	CTJZH2317E: "CTJZH2317E: A jelszó megerősítés nem egyezik.", 
	CTJZH2318E: "CTJZH2318E: Legfeljebb 5 csapat választható ki.",
	CTJZH2319E: "CTJZH2319E: A felhasználónév már létezik.",
	CTJZH2320E: "CTJZH2320E: Legfeljebb 15 felhasználó választható ki.",
	CTJZH2321I: "CTJZH2321I: Nincsenek megjelenítendő részletek ehhez a kéréshez.",
	CTJZH2322E: "CTJZH2322E: A jelszó nem kezdődhet vagy végződhet szóközzel.", 
	CTJZH2324E: "CTJZH2324E: A felhasználónév szóközöket tartalmaz.",	
	CTJZH2323E: "CTJZH2323E: A szolgáltatásigénylést nem lehet elküldeni, mert nincs bejegyezve ilyen típusú erőforráskészlet.", 
	CTJZH2325E: "CTJZH2325E: A kérés már nem érhető el.",
	CTJZH2328W: "CTJZH2328W: A felhasználó törlését nem lehet visszavonni, és a felhasználói azonosítót soha nem lehet újrafelhasználni", 
	CTJZH2329E: "CTJZH2329E: A megadott felhasználói azonosító egy törölt felhasználóhoz tartozik, és nem lehet újrafelhasználni", 
	CTJZH2331E: "CTJZH2331E: Hiba történt a kiválasztott kérés feldolgozásakor.",
		
    CTJZH2334E: "CTJZH2334E: Kiszolgáló hiba történt az új szolgáltatásigénylés frissítésekor a biztosított adatokkal",
	CTJZH2335E: "CTJZH2335E: Helyreállíthatatlan kiszolgáló hiba történt az új szolgáltatásigénylés létrehozása közben",
	CTJZH2336E: "CTJZH2336E: A jóváhagyás részleteinek bevitele meghaladta a maximális 50 karaktert.",	
	CTJZH2337E: "CTJZH2337E: Nem lehet új szolgáltatásigénylést létrehozni, mert úgy tűnik, hogy nincs bejelentkezve",
	CTJZH2338E: "CTJZH2338E: Kiszolgáló hiba történt az új szolgáltatásigénylés létrehozásakor",
	CTJZH2339I: "CTJZH2339I: Elnézést, de nem találhatók egyezések",
	
	CTJZH2342E: "CTJZH2342E: Hiba történt az adott kérés létrehozásakor",
		
	CTJZH2345E: "CTJZH2345E: A csapatot nem lehet eltávolítani, miközben aktív projektjei vannak",
	CTJZH2346E: "CTJZH2346E: A jelszónak legalább 6 karakter hosszúnak kell lennie",
	
	CTJZH2353I: "CTJZH2353I: Az adott kérésben engedélyezett maximális csapatmódosításnál (legfeljebb 5) többet próbál végrehajtani. Ötnél több csapatmódosítás végrehajtásához hozzon létre további Csapatmódosítási kéréseket.",
	CTJZH2354I: "CTJZH2354I: Az adott kérésben engedélyezett maximális felhasználómódosításnál (legfeljebb 15) többet próbál végrehajtani. Tizenötnél több felhasználómódosítás végrehajtásához hozzon létre további Felhasználómódosítási kéréseket.",	
	
	CTJZH2355I: "CTJZH2355I: A keresési index adat nem elérhető vagy sérült. Futtassa ismét a Cron feladat PmObjSearchCron alkalmazást.",
	CTJZH2356I: "CTJZH2356I: Be kell írnia egy keresési karaktersorozatot",
	CTJZH2357I: "CTJZH2357I: A keresési index adatai frissítés alatt állnak. Próbálja újra később.",
	CTJZH2358I: "CTJZH2358I: NODICTION",
	CTJZH2361I: "CTJZH2361I: Nincsenek elérhető vagy aktív ajánlatok vagy sablonok a felhasználó számára. Ellenőrizze, hogy a felhasználó jogosult-e katalógusajánlatok vagy jegysablonok elérésére.",
	CTJZH2362I: "CTJZH2362I: Ahhoz, hogy az összes Önkiszolgáló központ szolgáltatás engedélyezett legyen az Internet Explorer böngészőben, telepítse a Silverlight bedolgozót: www.microsoft.com/getsilverlight/",

    	
	//String list for user and team
	//Role: "Role",
	//Language: "Language",
	Team: "Csapat",
	UserTeams: "Felhasználói csapatok",
	
	//UserStatus: "Activate user account",
	LOGINID: "Bejelentkezési azonosító",
	AccountLegend: "Fiók beállítások",
	PersonalInfoLegend: "Személyi információk",
	RegionalSettLegend: "Regionális beállítások",
	FirstName: "Keresztnév",
	LastName: "Vezetéknév",
	DisplayName: "Megjelenő név",
	Email: "E-Mail",
	Telephone: "Telefon",
	Address: "Cím",
	City: "Város",
	State: "Státusz",
	Country: "Ország",
	AccountStatus: "Aktív",
	EmptyString: "               ",
	UserList: "Elérhető felhasználók",
	UserID: "Felhasználói azonosító",
	Role: "Szerep",
	ConfirmPassword: "Jelszó megerősítése",
	InvalidConfirmPassword: "A jelszó megerősítés nem egyezik",
	PressToAddTeam: "Csapat hozzáadásához nyomja meg a + gombot",
	CreateUserInstruction: "Egy felhasználó legfeljebb 5 csapathoz adható hozzá kérésenként. Ha egy felhasználót több csapathoz szeretne hozzáadni, akkor hozzon létre további Felhasználómódosítási kéréseket.",
	ModifyUserInstruction: "Egy felhasználó legfeljebb 5 csapathoz adható hozzá vagy 5 csapatból távolítható el kérésenként. További módosítások végrehajtásához hozzon létre további Felhasználómódosítási kéréseket.",
	// Team Management
	TeamID: "#",
	TeamName: "Név",
	TeamDescription: "Leírás",
	UserList: "Elérhető felhasználók",
	SelectedUserList: "Kijelölt felhasználók",
	TeamDetails: "Csapat részletei",
	ProjectAccount: "Projektfiók",
	QuickFilter: "gyors szűrő",
	TeamNameExists: "Már létezik ilyen nevű csapat.",
	CreateTeamInstruction: "Egy csapat legfeljebb 15 felhasználót tartalmazhat kérésenként.",
	ModifyTeamInstruction: "Egy csapathoz legfeljebb 15 felhasználót adhat hozzá vagy 15 felhasználót távolíthat el belőle kérésenként. További módosítások végrehajtásához hozzon létre további Csapatmódosítási kéréseket.",

	Yes: "Igen",
	No: "Nem",
	UserExist: "A felhasználó már létezik",
	MaxTeamsExceed: "Meghaladja a csapat maximális hosszát",
	PreviewCloseTitle: "Szakasz bezárása",
	PreviewOpenTitle: "Szakasz megnyitása",

	/* Service Request details */
	Application: "Alkalmazás",
	CreatedOn: "Létrehozás ideje",
	Date: "Dátum",
	Details: "Részletek",
	From: "Kezdés",
	Subject: "Tárgy",
	Summary: "Összegzés",
	FailedStatus: "Meghiúsult",
	To: "Címzett",
	ViewSRDetails: "Kérés részletei",
	ViewSRTitle: "Szolgáltatásigénylés megjelenítése",
	ViewSRGeneral: "Általános",
	ViewSRGenBannerApproval: "Ez a feladat lehetővé teszi egy szolgáltatásigénylés jóváhagyását vagy visszautasítását",
	ViewSRGenBannerNoApproval: "Ez a feladat a szolgáltatásigénylés részleteit jeleníti meg",
	ViewSRLastUpdate: "Legutóbbi frissítés",
	ViewSRUpdatedBy: "Frissítette",
	ViewSRWorkLog: "Munkanapló",
	ViewSRWorkBanner: "A szolgáltatásigénylés munkanaplója. Jelölje ki a táblázat egyik sorát a megjegyzés részleteinek megjelenítéséhez.",
	ViewSRNoWorkl: "Nincs megjelenítendő munkanapló",
	ViewSRCommLog: "Kommunikációs napló",
	ViewSRCommBanner: "A szolgáltatásigénylés kommunikációs naplója. Jelölje ki a táblázat egyik sorát a megjegyzés részleteinek megjelenítéséhez.",
	ViewSRNoComml: "Nincs megjelenítendő kommunikációs napló",
    //Venky : new
	ViewSolutionForSRPR: "SR-ek és RR-ek megoldásai",
	ViewSRNoSol: "Nincs megjelenítendő megoldás",
	Symptom: "Tünet",
	Cause: "Ok",
	Resolution: "Megoldás",
	ViewSRSolDetails: "SR megoldás részletei",
	ViewRRSolDetails: "RR megoldás részletei",
	ViewSolutionForSRPRBanner: "Megoldás a szolgáltatásigényléshez és kapcsolódó rekordokhoz.",
	InvalidColumn1: "Oszlopok :",
	InvalidColumn2: "nem létezik beállítva az 'Összes saját kérés megjelenítése' párbeszéd számára a Saját kérések tokjában. Szerkessze az Önkiszolgáló központ alkalmazást és javítsa az oszlopbeállításokat.",
	/* Bulletin Board */
    MyNewsHeading: "Saját hírek",
	Message: "Üzenet",
	PostDate: "Elküldés dátuma",
	PostBy: "Beküldő",
	ExpireDate: "Lejárat dátuma",
	ViewBBMessageDetails: "Üzenet részletei",
	ViewBBMessageTitle: "Saját hírek részletei",
	ViewBBMessageBanner: "Ez a feladat az üzenet részleteit jeleníti meg",
	MsgViewed: "Megjelenítésre került?",
	
	/* LiveChat */
    LiveChatHeading: "Kapcsolat",
    LiveChatLink: "Csevegés most",
    LiveChatMessage: "<UL STYLE='margin-top:0px;margin-bottom:2px;list-style-type: none;'> <LI> Csevegés ügynökkel</LI> <LI> Elérhető naponta - reggel 8:30-tól este 6-ig EST</LI> <LI> <A HREF='http://pic.dhe.ibm.com/infocenter/tivihelp/v58r1/index.jsp' target='blank'>SmartCloud Control Desk információk</A></LI> </UL>",
     
	
	/* ITM Agent Statuses */
	noAgentState: "Nincs figyelő",
	onlineState: "Figyelő online",
	offlineState: "Figyelő offline",
	toobusyState: "A figyelő túl foglalt a válaszhoz",
	notconfiguredState: "A figyelő nincs beállítva",
	
	/* Approve Request */
	AppRequestBannerTitle: "Jóváhagyás",
	AppRequestBannerDescription: "Egy jóváhagyás az Ön bevitelére vár. Hogyan szavaz?",
	RejectRequest: "Visszautasítom ezt a kérést.",
	ApproveRequest: "Jóváhagyom ezt a kérést.",
	ApproveSummary: "Összegzés",
	ApproveDetails: "Részletek",
	
	ContextButtonSetLabelCreate: "Létrehozás",
	
	copyright: "Engedélyköteles anyag - Az IBM Corp. tulajdona &copy; IBM Corporation és mások 2009. Az IBM az IBM Corporation bejegyzett védjegye az Egyesült Államokban és/vagy más országokban.",
	AboutCopyright: "Licenc hatálya alá tartozó anyagok - Az IBM Corp. tulajdona. &copy; Copyright IBM Corp. 2009. Minden jog fenntartva. Az Egyesült Államok kormányzati felhasználóira vonatkozó korlátozott jogok - A felhasználást, másolást vagy információk továbbadását a GSA ADP és az IBM Corp. között létrejött ütemszerződés korlátozza.",	
	

	// TSAM specific messages ------------------------------------------------------------
	MyDeploymentsHeading: "Projektek",

	//Project Details
	ProjectTitle: "Projekt",
	ProjectDetails: "Projekt részletei",
	ProjectDetailsImage: "",
	ProjectName: "Projektnév",
	ProjectDescription: "Projekt leírása",
	ProjectType: "Projekttípus",
	ProjectStartDate: "Kezdő dátum",
	ProjectEndDate: "Befejező dátum",
	ProjectTeamAccess: "Csapat hozzáférés",
	ProjectsDropDownEmptyLabel: "Válasszon ki egy projektet",	
	
	//WCA Projects
	WCAProjectTitle: "WebSphere CloudBurst projekt",
	WCAProjectDetails: "WebSphere CloudBurst projekt részletei",
	WCAProjectPattern: "Minta neve",
	WCAServerResourcesLegend: "Erőforrások",
	WCAServerVirtualCPU: "Virtuális CPU",
	WCAServerMemory: "Főmemória",
	WCAPatternSelection: "Válasszon ki egy CloudBurst mintát",
	
	ServerGridName: "Kiszolgáló neve",
	ServerGridOS: "Operációs rendszer",
	ServerGridStatus: "Státusz",
	ServerGridMemory: "Memória (%)",
	ServerGridCPU: "CPU (%)",
	ServerGridDisk: "Lemez (%)",
	ServerGridTotalMemory: "Memória",
	ServerGridTotalCPU: "CPU",
	ServerGridTotalDisk: "Lemez",
	ServerGridLastUpdate: "Legutóbbi frissítés",
	ServerGridHypervisor: "Hypervisor",
	WCAServerGridPart: "Alkatrész",
	ProjectRequestedServers: "Kért kiszolgáló(k)",
	ProjectActiveServers: "Aktív kiszolgáló(k)",
	
	ViewProjectGeneralLegend: "Általános",
	ViewProjectName: "Név",
	ViewProjectDescription: "Leírás",
	ViewProjectServiceOwner: "Szolgáltatásgazda",
	ViewProjectType: "Projekttípus",
	ViewProjectStartDate: "Kezdő dátum",
	ViewProjectEndDate: "Befejező dátum",
	ViewProjectTeamAccess: "Csapat hozzáférés",
	ViewProjectRequestedServer: "Kért kiszolgálók",
	ViewProjectActiveServers: "Aktív kiszolgálók",
	
	ViewProjectServersLegend: "Kiszolgálók",
	ViewProjectServersTitle: "Server",
	ViewProjectMasterImage: "Elsődleges kép",
	ViewProjectCreateDate: "Létrehozás dátuma",
	ViewProjectCreatedBy: "Létrehozta",
	ViewProjectHypervisor: "Hypervisor",
	ViewProjectServerStatus: "Létesítési státusz",
	ViewProjectServerStatusLastUpdate: "Legutóbbi létesítési státusz frissítés",
	ViewProjectCPU: "CPU",
	ViewProjectVirtual: "Virtuális",
	ViewProjectPhysical: "Fizikai",
	ViewProjectMain: "Fő",
	ViewProjectSwap: "Felcserél",
	ViewProjectDisk: "Lemez",
	ViewProjectLocal: "Helyi",
	ViewProjectAdditionalSoftware: "Kiegészítő szoftver",
	ViewProjectMemory: "Memória",
	ViewProjectServersTotal: "Összeg: ",
	ProjectUsed: "A projektnév már használatban van.",

	CTJZH2304I: "CTJZH2304I: Ki kell választania egy virtuális kiszolgálót.",
	CTJZH2310E: "CTJZH2310E: A projekt részleteit nem sikerült megjeleníteni. A projektazonosító nem található.",
	CTJZH2311E: "CTJZH2311E: A projekt részletei egy belső hiba nem jeleníthetők meg.",
	CTJZH2312E: "CTJZH2312E: Hiba történt a projekt részleteinek lekérésekor.",
	CTJZH2314E: "CTJZH2314E: Hiba történt az adott projekt részleteinek lekérésekor.",
	CTJZH2315E: "CTJZH2315E: A projektek listájának lekérése meghiúsult.",
	CTJZH2332E: "CTJZH2332E: A memória javasolt értéke nem lehet kisebb, mint a minimális érték.",
    CTJZH2333E: "CTJZH2333E: A javasolt fizikai CPU szám nem lehet kisebb, mint a minimális fizikai CPU szám.",
	CTJZH2340W: "CTJZH2340W: A foglalás elérhető indítási dátumainak listájának lekérése meghiúsult.",
	CTJZH2341W: "CTJZH2341W: A kijelölt kiszolgáló már rendelkezik egy képpel. Az új kép le fogja cserélni a meglévőt.",
	CTJZH2343E: "CTJZH2343E: Az egyik javasolt erőforrás kisebb, mint a vonatkozó minimális erőforrás.",
	CTJZH2347E: "CTJZH2347E: Az adott dátumokon nem érhető el kiszolgáló ezekkel a paraméterekkel.",
	CTJZH2348E: "CTJZH2348E: {0} projekt megszakítására készül.",
	CTJZH2349E: "CTJZH2349E: A(z) {0} kép bejegyzésének megszüntetésére készül.",
	CTJZH2350E: "CTJZH2350E: A(z) {0} felhasználó eltávolítására készül.",
	CTJZH2351E: "CTJZH2351E: A(z) {0} csapat eltávolítására készül.",
	CTJZH2352E: "CTJZH2352E: A(z) {0} kiszolgáló eltávolítására készül.",
	
	//SRM 721
	HelpFixDesc : "Keressen egy megoldást a problémájára. Ha nem talál megoldást, akkor nyisson meg egy jegyet a probléma megoldásához.",
    CTJZH2359I: "CTJZH2359I: A bevásárlókosár üres",
	CurrentCart:  "Aktuális kosár",
	More:  "továbbiak",
    Cart:  "Kosár",
	CreateSR:  "Kérés létrehozása",
	CTJZH2360I: "CTJZH2360I: Nincsenek meghatározva sablonok.",
	CTJZH2363I: "CTJZH2363I: Nincsenek aktív megoldások vagy Önkiszolgáló központ támogatással rendelkező megoldások.",

	//Help me fix an issue
	SubmitLabel : "Elküldés",
	SearchTextLabel : "Keresett kulcsszavak",
	
	//Frequent Requests
	SystemWideFrequentRequest : "Rendszerszintű gyakori kérés",
	MyFrequentRequests : "Saját gyakori kérések",
	CTJZH2353E: "CTJZH2353E: Nincsenek megjelenítendő Gyakori kérések ",
	
	CreateSRLabel: "Probléma jelentése",
	
	SearchFieldText : "Megoldások, ajánlatok és gyors beillesztések keresése",
	SearchFieldTextNoSol : "Ajánlatok és gyors beillesztések keresése",
	FolderView : "Mappa nézet",
	TreeView : "Fa nézet",
	Maximize : "Teljes méret",
	Minimize : "Visszaállítás",
	Folders :  "Szolgáltatások",
	SolutionFolders :  "Megoldások",
	
	dummy_: ""
  })
);



