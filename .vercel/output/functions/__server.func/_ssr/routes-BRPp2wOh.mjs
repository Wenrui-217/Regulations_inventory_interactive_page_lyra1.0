import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, o as DialogTitle, r as DialogContent, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { n as parseCorpus, t as assertPublicHttps } from "./corpus-DT9GgDqB.mjs";
import { i as ExternalLink, r as Search, t as X } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BRPp2wOh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var bi_lockup_default = "/assets/bi-lockup-YK6H0Med.png";
var life_forward_default = "/assets/life-forward-D_lgQGU1.png";
var MONITOR_SITES = [
	{
		name: "PICS",
		url: "https://picscheme.org/rss/general_en.rss",
		note: "英文 RSS。每轮只核对最新 10 条，标题需命中行业文件、检查员文件、Annex、ICH、Publication of 等关键词。"
	},
	{
		name: "PICS Publications",
		url: "https://picscheme.org/en/publications?tri=date#zone",
		note: "按发布日期排序。核对最前 15 个 /docview/ 链接；该链接直接返回 PDF。"
	},
	{
		name: "上海药监-药品法规",
		url: "https://yjj.sh.gov.cn/fg-yp/index.html",
		note: "列表最新 10 条。正文按中英分流落盘。"
	},
	{
		name: "上海药监-综合法规",
		url: "https://yjj.sh.gov.cn/fg-zh/index.html",
		note: "列表最新 10 条。"
	},
	{
		name: "上海药监-行政法规",
		url: "https://yjj.sh.gov.cn/xzfg/index.html",
		note: "列表最新 10 条。"
	},
	{
		name: "上海药监-部门规章",
		url: "https://yjj.sh.gov.cn/bmgz/index.html",
		note: "列表最新 10 条。"
	},
	{
		name: "CFDI",
		url: "https://www.cfdi.org.cn/cfdi/index?module=A001&nty=D06",
		note: "标题含「公开征求」「通告」或「公告」，且长于 10 个字。网页附件一并下载。"
	}
];
var LIBRARY_LABEL = {
	monitor: "监控库",
	relevant: "相关文件"
};
function libraryLabel(library) {
	return LIBRARY_LABEL[library];
}
var SUGGESTIONS = [
	"制药用水",
	"数据可靠性",
	"无菌",
	"Annex 1",
	"追溯",
	"计算机化系统",
	"验证",
	"中药"
];
var SEED = [
	{
		id: "nmpa-74-2020",
		title: "国家药监局关于发布《药品记录与数据管理要求（试行）》的公告（2020年第74号）",
		source: "国家药监局",
		library: "relevant",
		language: "zh",
		docType: "网页",
		publishedAt: "2020-07-01",
		capturedAt: "2026-11-01",
		summary: "规范药品研制、生产、经营、使用中的记录与数据管理，要求信息真实、准确、完整、可追溯。这是检索「数据可靠性」时的基础文件，自 2020 年 12 月 1 日起施行。",
		detail: "为贯彻落实《药品管理法》《疫苗管理法》，国家药监局组织制定《药品记录与数据管理要求（试行）》，自 2020 年 12 月 1 日起施行。\n\n文件覆盖纸质与电子记录，强调数据应当真实、准确、完整、可追溯，并与药品研制、生产、经营、使用活动相对应。质量管理、记录保存、数据审核和偏差处理，是现场检查里判断数据可靠性的主要依据。\n\n适用场景：计算机化系统、实验室数据、批记录、审计追踪相关的差距分析，可与 PIC/S 计算机化系统附录、文件管理章节对照阅读。",
		keywords: [
			"数据可靠性",
			"数据完整性",
			"记录",
			"可追溯",
			"ALCOA"
		],
		originalUrl: "https://www.nmpa.gov.cn/xxgk/fgwj/xzhgfxwj/20200701110301645.html",
		fileUrl: "https://www.nmpa.gov.cn/xxgk/fgwj/xzhgfxwj/20200701110301645.html",
		fileLabel: "公告原文"
	},
	{
		id: "nmpa-chp-2025",
		title: "国家药监局、国家卫生健康委关于颁布 2025 年版《中华人民共和国药典》的公告（2025年第29号）",
		source: "国家药监局",
		library: "relevant",
		language: "zh",
		docType: "网页",
		publishedAt: "2025-03-25",
		capturedAt: "2026-11-01",
		summary: "2025 年版《中国药典》自 2025 年 10 月 1 日起施行。凡例与通则的更新，直接影响纯化水、注射用水等制药用水的质量标准与检验方法。",
		detail: "根据《药品管理法》，2025 年版《中国药典》经第十二届药典委员会执行委员会全体会议审议通过，自 2025 年 10 月 1 日起施行。公告附一部至四部目录。\n\n对生产质量而言，制药用水不是孤立文件：纯化水、注射用水、灭菌注射用水的定义、制备和检验，以药典通则和通用技术要求为准。水系统监测项目、限度和取样，需要回到现行药典，而不是沿用旧版方法。\n\n进一步核对时，打开国家药监局公告页，并对照企业现行质量标准中的制药用水章节。",
		keywords: [
			"制药用水",
			"中国药典",
			"纯化水",
			"注射用水",
			"质量标准"
		],
		originalUrl: "https://www.nmpa.gov.cn/xxgk/fgwj/gzwj/gzwjyp/20250325183810122.html",
		fileUrl: "https://www.nmpa.gov.cn/xxgk/fgwj/gzwj/gzwjyp/20250325183810122.html",
		fileLabel: "公告与目录"
	},
	{
		id: "nmpa-water-2016",
		title: "国家药监局关于发布《医疗器械工艺用水质量管理指南》的通告（2016年第14号）",
		source: "国家药监局",
		library: "relevant",
		language: "zh",
		docType: "网页",
		publishedAt: "2016-01-29",
		capturedAt: "2026-11-01",
		summary: "工艺用水以饮用水为源水，包括药典纯化水、注射用水和灭菌注射用水。指南说明制备、储存、分配和监测如何避免微生物与内毒素风险。",
		detail: "指南所称工艺用水，是医疗器械产品实现过程中使用或接触的水，以饮用水为源水，主要包括符合《中国药典》的纯化水、注射用水和灭菌注射用水，也包括体外诊断试剂用纯化水、血液透析及相关治疗用水、分析实验室用水。\n\n用途覆盖：作为产品组成成分、配制试剂、清洁零部件和包装、检验、洁净环境及工装清洁。制备和输送系统应防止微生物滋生。药品生产企业做制药用水差距分析时，可把它当作相邻行业的管理对照，法定标准仍以药典和药品 GMP 为准。",
		keywords: [
			"制药用水",
			"工艺用水",
			"纯化水",
			"注射用水",
			"微生物"
		],
		originalUrl: "https://www.nmpa.gov.cn/ylqx/ylqxggtg/20160129163601719.html",
		fileUrl: "https://www.nmpa.gov.cn/ylqx/ylqxggtg/20160129163601719.html",
		fileLabel: "指南正文"
	},
	{
		id: "sh-trace-85",
		title: "国家药监局关于进一步加强药品信息化追溯管理工作的公告（2026年第85号）",
		source: "上海药监-药品法规",
		library: "relevant",
		language: "zh",
		docType: "网页",
		publishedAt: "2026-09-01",
		capturedAt: "2026-11-10",
		summary: "要求全品种赋码、全链条扫码。持有人须备案药品标识码，并完成与商品条码、本位码、医保编码的关联。原料药、医用氧、医疗机构制剂除外，中药饮片另行规定。",
		detail: "上海市药监局转载。发布日期 2026-09-01，来源为国家药监局网站。\n\n公告要求压实持有人、境内责任人、生产企业、经营企业、使用单位和追溯系统运营单位的责任，实现全品种赋码、应赋尽赋，全链条扫码、见码必扫。\n\n持有人、境内责任人应通过国家药品追溯协同服务平台，及时、准确、完整备案药品标识码，完成多码关联。发码机构和追溯系统运营单位也应备案，保证追溯码唯一。生产环节按「一物一码、物码同追」，在上市销售前完成赋码激活。原料药、医用氧、医疗机构制剂除外，中药饮片追溯要求另行制定。\n\n数据安全部分要求运营单位遵守《数据安全法》，对可能包含的个人隐私和商业秘密保密。",
		keywords: [
			"追溯",
			"追溯码",
			"一物一码",
			"药品标识码",
			"数据安全"
		],
		originalUrl: "https://yjj.sh.gov.cn/qtgzwj/20260901/ad6710acfa03492f9c2e4048476f9d89.html",
		fileUrl: "",
		fileLabel: ""
	},
	{
		id: "sh-ordinance",
		title: "中华人民共和国药品管理法实施条例",
		source: "上海药监-行政法规",
		library: "relevant",
		language: "zh",
		docType: "网页",
		publishedAt: "2026-01-27",
		capturedAt: "2026-11-10",
		summary: "国务院令第 828 号公布修订后的实施条例，自 2026 年 5 月 15 日起施行。总则强调以人民健康为中心，全面防控风险，并支持临床价值导向的创新与中药传承。",
		detail: "上海市药监局行政法规栏目收录。页面标注发布日期 2026-01-27。\n\n《中华人民共和国药品管理法实施条例》已经 2025 年 12 月 31 日国务院第 76 次常务会议修订通过，2026 年 1 月 16 日国务院令第 828 号公布，自 2026 年 5 月 15 日起施行。\n\n第一条说明本条例根据《药品管理法》制定。第二条要求研制、生产、经营、使用和监督管理坚持以人民健康为中心，遵循科学规律和伦理原则，全面防控风险。第三条要求完善药品创新体系，促进中药传承创新和仿制药质量疗效提升。\n\n这是判断下位公告是否适用的上位依据，检索具体主题后再回到本条例核对授权条款。",
		keywords: [
			"药品管理法",
			"实施条例",
			"风险管理",
			"中药",
			"上市许可持有人"
		],
		originalUrl: "https://yjj.sh.gov.cn/xzfg/20220228/ae6d36fd8d6c4d66b807f8b217b49f09.html",
		fileUrl: "",
		fileLabel: ""
	},
	{
		id: "sh-tcm-97",
		title: "国家药监局关于加强中药品种保护工作的公告（2026年第97号）",
		source: "上海药监-药品法规",
		library: "monitor",
		language: "zh",
		docType: "网页",
		publishedAt: "2026-10-09",
		capturedAt: "2026-11-10",
		summary: "持有人可对符合规定的中药品种申请保护。省级局须核查上市后临床、药学和药理毒理资料的真实性；补充资料需在 80 个工作日内一次性提交。",
		detail: "上海市药监局转载，发布日期 2026-10-09。\n\n公告依据《药品管理法》《中药品种保护条例》和《药品注册管理办法》。持有人向国家药监局提出保护申请，向国家中药品种保护审评委员会提交研究资料。\n\n省级药监局收到受理通知后，组织对上市后临床、药学研究和药理、毒理资料的真实性进行核查。已做过药品注册核查的资料可不再核查。临床机构核查至少包括组长单位，并结合风险选择 2 家以上医疗机构；不足 3 家的全部核查。\n\n需要补充资料时一次性告知，申请人在 80 个工作日内一次性提交，该时间不计入审评时限。",
		keywords: [
			"中药",
			"品种保护",
			"核查",
			"真实性",
			"持有人"
		],
		originalUrl: "https://yjj.sh.gov.cn/qtgzwj/20261009/c292d2341dae4cb4be03bba9e2092f20.html",
		fileUrl: "",
		fileLabel: ""
	},
	{
		id: "sh-port-93",
		title: "国家药监局、海关总署关于增设广西壮族自治区钦州港口岸为药材进口边境口岸的公告（2026年第93号）",
		source: "上海药监-药品法规",
		library: "monitor",
		language: "zh",
		docType: "网页",
		publishedAt: "2026-10-23",
		capturedAt: "2026-11-10",
		summary: "增设钦州港口岸为药材进口边境口岸。与进口药材通关、边境口岸资质相关，通常不直接改变生产质量管理，除非企业涉及药材进口。",
		detail: "来自上海药监药品法规栏目最新列表，发布信息见监管机构原文页。\n\n公告事项是口岸增设，不是生产工艺或检验标准的修订。质量与法规事务检索时，若主题是进口药材、边境口岸或通关，应打开原文确认施行日期和适用口岸；若主题是制剂生产或公用工程，一般可标为不相关。",
		keywords: [
			"药材",
			"进口",
			"口岸",
			"海关"
		],
		originalUrl: "https://yjj.sh.gov.cn/qtgzwj/20261023/6d69198e47ed4eba9bcd42ac3dcbf408.html",
		fileUrl: "",
		fileLabel: ""
	},
	{
		id: "sh-be-86",
		title: "国家药监局关于开展化学药品其他剂型仿制药质量和疗效一致性评价工作的公告（2026年第86号）",
		source: "上海药监-药品法规",
		library: "monitor",
		language: "zh",
		docType: "网页",
		publishedAt: "2026-09-02",
		capturedAt: "2026-11-10",
		summary: "一致性评价扩展到口服固体制剂和注射剂以外的化学药品其他剂型。与注册策略、参比制剂和药学研究相关。",
		detail: "上海药监药品法规栏目收录的国家药监局公告（2026年第86号）。\n\n此前一致性评价主要覆盖口服固体制剂和注射剂。本公告把工作扩到其他化学药品剂型。是否相关，取决于持有产品是否属于该范围。打开原文核对剂型名单、时限和申报路径后再决定是否转入相关文件。",
		keywords: [
			"一致性评价",
			"仿制药",
			"化学药品",
			"剂型"
		],
		originalUrl: "https://yjj.sh.gov.cn/qtgzwj/20260902/1f1dee66f03b4d4bb3083b6e8f112d56.html",
		fileUrl: "",
		fileLabel: ""
	},
	{
		id: "cfdi-adc",
		title: "关于公开征求《抗体偶联药物生产质量管理指南（征求意见稿）》意见的通知",
		source: "CFDI",
		library: "monitor",
		language: "zh",
		docType: "附件",
		publishedAt: "2026-10-19",
		capturedAt: "2026-11-10",
		summary: "核查中心就抗体偶联药物生产质量管理指南征求意见，反馈截止 2026 年 11 月 20 日。附件为指南征求意见稿和意见反馈表。",
		detail: "国家药监局核查中心 2026 年 10 月 19 日发布。目的是指导抗体偶联药物生产企业的生产质量管理，并供监督检查参考。\n\n请于 2026 年 11 月 20 日前将意见反馈表发送至 jianchasanchu@cfdi.org.cn，邮件标题注明「抗体偶联药物生产质量管理指南（征求意见稿）」。\n\n页面附件：\n1. 抗体偶联药物生产质量管理指南（征求意见）.docx\n2. 意见反馈表.docx\n\n爬虫会把这类附件下载到本地，再由 Power Automate 同步到 SharePoint。导入本平台时，把附件的 SharePoint 链接填进 fileUrl。",
		keywords: [
			"抗体偶联",
			"ADC",
			"生产质量",
			"征求意见",
			"GMP"
		],
		originalUrl: "https://www.cfdi.org.cn/cfdi/resource/news/16912.html",
		fileUrl: "https://www.cfdi.org.cn/cfdi/resource/news/16912.html",
		fileLabel: "通知与附件入口"
	},
	{
		id: "cfdi-ai-md",
		title: "关于公开征求《人工智能医疗器械检查要点（征求意见稿）》意见的通知",
		source: "CFDI",
		library: "monitor",
		language: "zh",
		docType: "网页",
		publishedAt: "2026-10-08",
		capturedAt: "2026-11-10",
		summary: "核查中心就人工智能医疗器械检查要点征求意见。与药品计算机化系统和数据可靠性不是同一文件，但检查思路可对照。",
		detail: "CFDI 通知公告，发布日期 2026-10-08。文件对象是人工智能医疗器械的现场检查要点，不是药品 GMP 附录。\n\n如果产线不涉及医疗器械软件或人工智能器械，通常留在监控库。如果质量体系同时覆盖器械软件，或需要对照计算机化系统的检查提问，再标为相关并打开原文。",
		keywords: [
			"人工智能",
			"医疗器械",
			"检查要点",
			"征求意见"
		],
		originalUrl: "https://www.cfdi.org.cn/cfdi/resource/news/16899.html",
		fileUrl: "",
		fileLabel: ""
	},
	{
		id: "pics-pi058",
		title: "PI 058-1 Interpretation of the most important changes in Annex 1 (Manufacture of Sterile Products)",
		source: "PICS-Publications",
		library: "relevant",
		language: "en",
		docType: "PDF",
		publishedAt: "2026-10-28",
		capturedAt: "2026-11-10",
		summary: "PIC/S、EMA 与 WHO 联合工作组对 2022 年版无菌附录重大变化的解释，文件号 PI 058-1。无菌工艺、污染控制策略和检查口径以这份建议为入口。",
		detail: "Geneva, 28 October 2026. PIC/S published Recommendation PI 058-1, Interpretation of the most important changes in the Annex 1 on the Manufacture of Sterile Products (2022).\n\nThe document was prepared by a sub-group of the PIC/S-EMA-WHO Joint Implementation Working Group (A1IWG). The group was set up in January 2024 after revised Annex 1 entered into force on 25 August 2023.\n\n中文检索「无菌」「Annex 1」会命中本条。PDF 在 Publications 的 /docview/11495，爬虫会直接保存二进制 PDF。接入 SharePoint 后，把「原文件」换成文件夹里的 PDF 链接。",
		keywords: [
			"Annex 1",
			"无菌",
			"PI 058",
			"CCS",
			"无菌工艺",
			"PIC/S"
		],
		originalUrl: "https://picscheme.org/en/news/150/adoption-and-entry-into-force-of-pics-recommendation-pi-058",
		fileUrl: "https://picscheme.org/docview/11495",
		fileLabel: "PI 058-1 PDF"
	},
	{
		id: "pics-pe009-annex",
		title: "PIC/S GMP Guide (PE 009-18) Annexes",
		source: "PICS-Publications",
		library: "relevant",
		language: "en",
		docType: "PDF",
		publishedAt: "2026-09-23",
		capturedAt: "2026-11-10",
		summary: "PE 009-18 附件合集。修订重点在 Annex 19 留样；合集仍包含无菌药品附录 Annex 1。无菌附录对污染控制策略和制药用水系统（含注射用水）提出要求。",
		detail: "PIC/S 于 2026-09-23 发布 PE 009-18。相对 PE 009-17，本次修订主要是 Annex 19（Reference and Retention Samples）第 9 节：平行进口、平行分销和平行贸易产品的对照样与留样。PE 009-17 中「第 9 节仅在当地立法覆盖此类产品时适用」的注释予以保留。\n\n附件 PDF 是完整附录，不只是 Annex 19。检索无菌、Annex 1、制药用水时打开该 PDF，在无菌附录的水系统条款中核对纯化水与注射用水的设计、消毒和监测。\n\n同日发布的还有 Introduction、Part I、Part II，链接见监测说明中的 Publications 页面。",
		keywords: [
			"Annex 1",
			"无菌",
			"制药用水",
			"注射用水",
			"PE 009",
			"留样",
			"GMP"
		],
		originalUrl: "https://picscheme.org/en/news/149/revision-of-pics-gmp-guide-pe-009-18",
		fileUrl: "https://picscheme.org/docview/11333",
		fileLabel: "PE 009-18 Annexes PDF"
	},
	{
		id: "pics-pe009-news",
		title: "Revision of PIC/S GMP Guide (PE 009-18)",
		source: "PICS",
		library: "monitor",
		language: "en",
		docType: "网页",
		publishedAt: "2026-09-23",
		capturedAt: "2026-11-10",
		summary: "RSS 新闻：GMP 指南修订为 PE 009-18，纳入修订后的 Annex 19。正文较短，PDF 以 Publications 的 docview 为准。",
		detail: "来源为 PIC/S 英文 RSS 最新条目。Geneva, 23 September 2026.\n\nThe PIC/S GMP Guide has been revised to include revised Annex 19 (Reference and Retention Samples). The change is mainly Section 9, on reference and retention samples for parallel imported, parallel distributed and parallel traded products.\n\n新闻页适合确认生效说明；条款对照请打开 PE 009-18 Annexes PDF。",
		keywords: [
			"PE 009",
			"Annex 19",
			"留样",
			"GMP",
			"PIC/S"
		],
		originalUrl: "https://picscheme.org/en/news/149/revision-of-pics-gmp-guide-pe-009-18",
		fileUrl: "",
		fileLabel: ""
	},
	{
		id: "pics-annex11",
		title: "Draft guidelines: Revised Annex 11 — Computerised systems",
		source: "PICS-Publications",
		library: "relevant",
		language: "en",
		docType: "PDF",
		publishedAt: "2025-07-07",
		capturedAt: "2026-11-10",
		summary: "计算机化系统附录的修订草案。数据可靠性、审计追踪、权限和供应商管理是正文核心，可与中国 2020 年第 74 号公告对照。",
		detail: "PIC/S Publications 列出的行业文件草案，日期 2025-07-07，分类 Documents for Industry。\n\n修订对象是 GMP Annex 11 Computerised systems。检查和差距分析里，它对应电子记录、审计追踪、权限分级、备份和计算机化系统验证。中文团队检索「数据可靠性」「计算机化系统」应同时打开国家药监局 2020 年第 74 号公告。\n\n本条在演示库中标为相关文件。正式环境里，以 SharePoint「相关文件」文件夹中的 PDF 链接替换 fileUrl。",
		keywords: [
			"数据可靠性",
			"计算机化系统",
			"Annex 11",
			"审计追踪",
			"数据完整性"
		],
		originalUrl: "https://picscheme.org/en/publications?tri=date#zone",
		fileUrl: "https://picscheme.org/docview/9714",
		fileLabel: "Annex 11 草案 PDF"
	},
	{
		id: "pics-ch4",
		title: "Draft guidelines: Revised Chapter 4 — Documentation",
		source: "PICS-Publications",
		library: "relevant",
		language: "en",
		docType: "PDF",
		publishedAt: "2025-07-07",
		capturedAt: "2026-11-10",
		summary: "文件管理章节修订草案，与记录控制、数据可靠性和计算机化系统附录同一批征求意见文本。",
		detail: "PIC/S Publications，2025-07-07，Documents for Industry。\n\nChapter 4 规定文件的编制、批准、发放和记录。电子记录场景下，它和 Annex 11、中国《药品记录与数据管理要求》一起构成数据可靠性的文件基础。\n\n同日还有 Chapter 1 质量体系草案，以及新附录 Annex 22 Artificial intelligence。",
		keywords: [
			"数据可靠性",
			"文件管理",
			"记录",
			"Chapter 4",
			"Documentation"
		],
		originalUrl: "https://picscheme.org/en/publications?tri=date#zone",
		fileUrl: "https://picscheme.org/docview/9713",
		fileLabel: "Chapter 4 草案 PDF"
	},
	{
		id: "pics-annex22",
		title: "Draft guidelines: New annex 22 — Artificial intelligence",
		source: "PICS-Publications",
		library: "monitor",
		language: "en",
		docType: "PDF",
		publishedAt: "2025-07-07",
		capturedAt: "2026-11-10",
		summary: "拟新增的人工智能附录草案。与模型生命周期、数据治理和 GMP 决策中的 AI 使用相关，尚未作为现行正文。",
		detail: "PIC/S Publications 草案，2025-07-07。文件定位是新的 Annex 22 Artificial intelligence，不是现行检查条款。\n\n若质量体系已使用模型做偏差聚类、视觉检测或文件生成，建议保留在监控库并指定专人跟踪定稿。未使用 AI 的生产场地，可维持待审。",
		keywords: [
			"人工智能",
			"Annex 22",
			"数据治理",
			"GMP"
		],
		originalUrl: "https://picscheme.org/en/publications?tri=date#zone",
		fileUrl: "https://picscheme.org/docview/9715",
		fileLabel: "Annex 22 草案 PDF"
	},
	{
		id: "pics-pi006",
		title: "PIC/S Recommendations on Qualification and Validation (PI 006-4)",
		source: "PICS-Publications",
		library: "monitor",
		language: "en",
		docType: "PDF",
		publishedAt: "2026-10-01",
		capturedAt: "2026-11-10",
		summary: "确认与验证建议更新为 PI 006-4，面向检查员。水系统、灭菌工艺和计算机化系统的验证策略会引用这类文本。",
		detail: "Publications 表格日期 2026-10-01，栏目 Documents for Inspectors，文件号 PI 006-4。\n\nRSS 同日前后有「Revision of PIC/S Recommendations on Qualification and Validation (PI 006-4)」新闻。确认与验证的生命周期、方案和再确认，是制药用水系统与无菌工艺变更后需要回看的部分。\n\n打开 PDF 核对修订范围后，再决定是否转入相关文件。",
		keywords: [
			"验证",
			"确认",
			"PI 006",
			"Qualification",
			"水系统"
		],
		originalUrl: "https://picscheme.org/en/publications?tri=date#zone",
		fileUrl: "https://picscheme.org/docview/11277",
		fileLabel: "PI 006-4 PDF"
	},
	{
		id: "pics-annex15",
		title: "Concept paper on the revision of EU-PIC/S GMP Annex 15 (Qualification and validation)",
		source: "PICS",
		library: "monitor",
		language: "en",
		docType: "网页",
		publishedAt: "2026-07-15",
		capturedAt: "2026-11-10",
		summary: "Annex 15 确认与验证修订概念文件，含勘误。仍是立项说明，不是已生效附录。",
		detail: "PIC/S RSS：Concept paper on the revision of EU-PIC/S GMP Annex 15 (Qualification and validation)，随后发布了 Corrigendum。Publications 中对应 2026-07-15 的概念文件勘误。\n\n在附录定稿前，现行确认与验证仍以现行 GMP 附录和企业已批准的验证主计划为准。本条保留在监控库，便于跟踪何时从概念文件变为草案或正式文本。",
		keywords: [
			"验证",
			"Annex 15",
			"确认",
			"概念文件"
		],
		originalUrl: "https://picscheme.org/en/news/143/concept-paper-on-the-revision-of-eu-pics-gmp-annex-15-qualif-143",
		fileUrl: "https://picscheme.org/docview/11269",
		fileLabel: "概念文件勘误 PDF"
	}
];
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var fetchRemoteCorpus = createServerFn({ method: "POST" }).validator((input) => {
	const url = typeof input === "object" && input && "url" in input ? String(input.url ?? "") : "";
	return { url: assertPublicHttps(url) };
}).handler(createSsrRpc("ba8b18e8fba3a271f505c44e3c4c7e69ee64340e32381867c507452a839e6584"));
function queryTokens(query) {
	return query.trim().split(/[\s,，、;；]+/).map((token) => token.trim()).filter(Boolean);
}
function splitHighlight(text, tokens) {
	if (!text) return [];
	if (tokens.length === 0) return [{
		text,
		hit: false
	}];
	const lower = text.toLowerCase();
	const ranges = [];
	for (const token of tokens) {
		const needle = token.toLowerCase();
		if (!needle) continue;
		let from = 0;
		while (from < lower.length) {
			const at = lower.indexOf(needle, from);
			if (at < 0) break;
			ranges.push([at, at + needle.length]);
			from = at + needle.length;
		}
	}
	if (ranges.length === 0) return [{
		text,
		hit: false
	}];
	ranges.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
	const merged = [];
	for (const range of ranges) {
		const last = merged[merged.length - 1];
		if (!last || range[0] > last[1]) merged.push(range);
		else last[1] = Math.max(last[1], range[1]);
	}
	const parts = [];
	let cursor = 0;
	for (const [start, end] of merged) {
		if (cursor < start) parts.push({
			text: text.slice(cursor, start),
			hit: false
		});
		parts.push({
			text: text.slice(start, end),
			hit: true
		});
		cursor = end;
	}
	if (cursor < text.length) parts.push({
		text: text.slice(cursor),
		hit: false
	});
	return parts;
}
function blob(doc) {
	return [
		doc.title,
		doc.source,
		doc.summary,
		doc.detail,
		doc.keywords.join(" "),
		doc.fileLabel
	].join("\n").toLowerCase();
}
function scoreDocument(doc, tokens) {
	if (tokens.length === 0) return 1;
	const haystack = blob(doc);
	if (!tokens.every((token) => haystack.includes(token.toLowerCase()))) return 0;
	let score = 0;
	for (const token of tokens) {
		const needle = token.toLowerCase();
		if (doc.title.toLowerCase().includes(needle)) score += 50;
		if (doc.keywords.some((keyword) => keyword.toLowerCase().includes(needle))) score += 30;
		if (doc.summary.toLowerCase().includes(needle)) score += 16;
		if (doc.detail.toLowerCase().includes(needle)) score += 8;
		if (doc.source.toLowerCase().includes(needle)) score += 6;
	}
	const phrase = tokens.join(" ").toLowerCase();
	if (tokens.length > 1 && doc.title.toLowerCase().includes(phrase)) score += 24;
	const published = Date.parse(doc.publishedAt);
	if (!Number.isNaN(published)) score += Math.max(0, (published - Date.parse("2016-01-01")) / 864e5) / 400;
	return score;
}
function searchDocuments(docs, query, sort) {
	const tokens = queryTokens(query);
	const ranked = docs.map((doc) => ({
		doc,
		score: scoreDocument(doc, tokens)
	})).filter((item) => item.score > 0);
	ranked.sort((a, b) => {
		if (sort === "date" || tokens.length === 0) return b.doc.publishedAt.localeCompare(a.doc.publishedAt) || b.score - a.score;
		return b.score - a.score || b.doc.publishedAt.localeCompare(a.doc.publishedAt);
	});
	return ranked.map((item) => item.doc);
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var STORAGE_KEY = "fagui-liaowang-v1";
function useCorpus() {
	const [imported, setImported] = (0, import_react.useState)([]);
	const [hideSeed, setHideSeed] = (0, import_react.useState)(false);
	const [overrides, setOverrides] = (0, import_react.useState)({});
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) {
				const parsed = JSON.parse(raw);
				if (Array.isArray(parsed.imported)) setImported(parsed.imported);
				setHideSeed(Boolean(parsed.hideSeed));
				if (parsed.overrides && typeof parsed.overrides === "object") setOverrides(parsed.overrides);
			}
		} catch {}
		setReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		const payload = {
			imported,
			hideSeed,
			overrides
		};
		localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
	}, [
		imported,
		hideSeed,
		overrides,
		ready
	]);
	return {
		docs: (0, import_react.useMemo)(() => {
			const map = /* @__PURE__ */ new Map();
			if (!hideSeed) for (const doc of SEED) map.set(doc.id, doc);
			for (const doc of imported) map.set(doc.id, doc);
			return [...map.values()].map((doc) => overrides[doc.id] ? {
				...doc,
				library: overrides[doc.id]
			} : doc);
		}, [
			imported,
			hideSeed,
			overrides
		]),
		hideSeed,
		setImported,
		setHideSeed,
		setOverrides,
		ready
	};
}
function Highlight({ text, tokens }) {
	return splitHighlight(text, tokens).map((part, index) => part.hit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mark", { children: part.text }, index) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: part.text }, index));
}
function downloadJson(filename, data) {
	const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = filename;
	link.click();
	URL.revokeObjectURL(url);
}
var TEMPLATE = { documents: [{
	title: "法规名称",
	source: "上海药监-药品法规",
	library: "相关文件",
	language: "zh",
	docType: "PDF",
	publishedAt: "2026-09-01",
	capturedAt: "2026-11-10",
	summary: "卡片上展示的进一步信息，两三句话说明这条法规管什么。",
	detail: "点开后看到的进一步信息。可以放正文摘录，或 SharePoint 里文本文件的内容。",
	keywords: ["制药用水", "数据可靠性"],
	originalUrl: "https://yjj.sh.gov.cn/fg-yp/index.html",
	fileUrl: "https://contoso.sharepoint.com/sites/regulations/Shared%20Documents/example.pdf",
	fileLabel: "SharePoint 原文件"
}] };
function RegApp() {
	const corpus = useCorpus();
	const [view, setView] = (0, import_react.useState)("library");
	const [query, setQuery] = (0, import_react.useState)("");
	const [library, setLibrary] = (0, import_react.useState)("all");
	const [source, setSource] = (0, import_react.useState)("all");
	const [lang, setLang] = (0, import_react.useState)("all");
	const [sort, setSort] = (0, import_react.useState)("relevance");
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const [notice, setNotice] = (0, import_react.useState)("");
	const [remoteUrl, setRemoteUrl] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const tokens = queryTokens(query);
	const sources = (0, import_react.useMemo)(() => [...new Set(corpus.docs.map((doc) => doc.source))].sort((a, b) => a.localeCompare(b, "zh")), [corpus.docs]);
	const results = (0, import_react.useMemo)(() => {
		return searchDocuments(corpus.docs.filter((doc) => {
			if (library !== "all" && doc.library !== library) return false;
			if (source !== "all" && doc.source !== source) return false;
			if (lang !== "all" && doc.language !== lang) return false;
			return true;
		}), query, sort);
	}, [
		corpus.docs,
		library,
		source,
		lang,
		query,
		sort
	]);
	const selected = corpus.docs.find((doc) => doc.id === selectedId) ?? null;
	const relevantCount = corpus.docs.filter((doc) => doc.library === "relevant").length;
	const monitorCount = corpus.docs.length - relevantCount;
	(0, import_react.useEffect)(() => {
		if (selectedId && !selected) setSelectedId(null);
	}, [selectedId, selected]);
	function applyImport(documents, errors, mode) {
		if (documents.length === 0) {
			setNotice(errors[0] ?? "没有可导入的条目。");
			return;
		}
		if (mode === "replace") {
			corpus.setHideSeed(true);
			corpus.setImported(documents);
			corpus.setOverrides({});
		} else corpus.setImported((current) => {
			const map = new Map(current.map((doc) => [doc.id, doc]));
			for (const doc of documents) map.set(doc.id, doc);
			return [...map.values()];
		});
		const tail = errors.length ? `另有 ${errors.length} 条未导入。` : "";
		setNotice(mode === "replace" ? `已用 ${documents.length} 条替换演示库。${tail}` : `已并入 ${documents.length} 条。${tail}`);
		setView("library");
		setQuery("");
	}
	async function onFile(file) {
		if (!file) return;
		try {
			const parsed = parseCorpus(JSON.parse(await file.text()));
			applyImport(parsed.documents, parsed.errors, "replace");
		} catch {
			setNotice("这个文件不是合法的 JSON。");
		}
	}
	async function onRemote() {
		setBusy(true);
		setNotice("");
		try {
			const parsed = await fetchRemoteCorpus({ data: { url: remoteUrl } });
			applyImport(parsed.documents, parsed.errors, "replace");
		} catch (error) {
			setNotice(error instanceof Error ? error.message : "同步失败。");
		} finally {
			setBusy(false);
		}
	}
	function toggleLibrary(doc) {
		const next = doc.library === "relevant" ? "monitor" : "relevant";
		corpus.setOverrides((current) => ({
			...current,
			[doc.id]: next
		}));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: bi_lockup_default,
							alt: "Boehringer Ingelheim",
							className: "h-10 w-auto"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: life_forward_default,
							alt: "Life forward",
							className: "h-6 w-auto"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-medium tracking-tight text-fg",
							children: "法规信息检索"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 max-w-xl text-sm text-muted",
							children: "监控到的法规更新放在一起检索。点开看到进一步信息，并回到监管机构原文或文件夹里的原文件。"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "flex gap-2",
							"aria-label": "栏目",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabButton, {
									active: view === "library",
									onClick: () => setView("library"),
									children: "检索"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabButton, {
									active: view === "sites",
									onClick: () => setView("sites"),
									children: "监测站点"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabButton, {
									active: view === "connect",
									onClick: () => setView("connect"),
									children: "接入数据"
								})
							]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[16rem_minmax(0,1fr)]",
				children: [view === "library" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "hidden space-y-5 lg:sticky lg:top-4 lg:block lg:self-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterGroup, {
							label: "资料库",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segment, {
								value: library,
								onChange: setLibrary,
								options: [
									{
										id: "all",
										label: "全部"
									},
									{
										id: "relevant",
										label: "相关"
									},
									{
										id: "monitor",
										label: "待审"
									}
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterGroup, {
							label: "文种",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segment, {
								value: lang,
								onChange: setLang,
								options: [
									{
										id: "all",
										label: "全部"
									},
									{
										id: "zh",
										label: "中文"
									},
									{
										id: "en",
										label: "英文"
									}
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterGroup, {
							label: "来源",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: source,
								onChange: (event) => setSource(event.target.value),
								className: "h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "all",
									children: "全部来源"
								}), sources.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: item,
									children: item
								}, item))]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "grid grid-cols-3 gap-2 lg:grid-cols-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "在库",
									value: corpus.docs.length
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "相关文件",
									value: relevantCount
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "待审",
									value: monitorCount
								})
							]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", { className: "hidden lg:block" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "min-w-0",
					children: [
						view === "library" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LibraryView, {
							query,
							setQuery,
							tokens,
							sort: tokens.length === 0 ? "date" : sort,
							setSort,
							results,
							hideSeed: corpus.hideSeed,
							onOpen: setSelectedId,
							library,
							setLibrary,
							lang,
							setLang,
							source,
							setSource,
							sources
						}),
						view === "sites" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SitesView, {}),
						view === "connect" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectView, {
							notice,
							remoteUrl,
							setRemoteUrl,
							busy,
							hideSeed: corpus.hideSeed,
							count: corpus.docs.length,
							onFile: (file) => void onFile(file),
							onRemote: () => void onRemote(),
							onExport: () => downloadJson("法规信息检索-资料.json", { documents: corpus.docs }),
							onTemplate: () => downloadJson("法规信息检索-导入模板.json", TEMPLATE),
							onReset: () => {
								corpus.setImported([]);
								corpus.setHideSeed(false);
								corpus.setOverrides({});
								setNotice("已恢复演示库。");
							}
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: Boolean(selected),
				onOpenChange: (open) => !open && setSelectedId(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-40 bg-bg-deep/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
					className: "fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col border-l border-line bg-surface outline-none",
					children: selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
						doc: selected,
						tokens,
						onToggle: () => toggleLibrary(selected)
					})
				})] })
			})
		]
	});
}
function TabButton({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("min-h-11 rounded-sm px-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent", active ? "bg-accent text-ink" : "bg-surface text-fg"),
		children
	});
}
function FilterGroup({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-2 text-xs font-medium tracking-wide text-muted",
		children: label
	}), children] });
}
function Segment({ value, onChange, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-3 gap-1 rounded-md bg-bg-deep p-1",
		children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onChange(option.id),
			className: cn("min-h-11 rounded-sm text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent", value === option.id ? "bg-accent text-ink" : "text-muted"),
			children: option.label
		}, option.id))
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-line bg-surface px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "font-display text-2xl tabular-nums text-fg",
			children: value
		})]
	});
}
function LibraryView({ query, setQuery, tokens, sort, setSort, results, hideSeed, onOpen, library, setLibrary, lang, setLang, source, setSource, sources }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "relative block",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "关键词"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: query,
					onChange: (event) => setQuery(event.target.value),
					placeholder: "检索法规名称或关键词，例如制药用水",
					className: "h-12 w-full rounded-md border border-line bg-surface pr-4 pl-10 text-base text-fg placeholder:text-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex gap-2 overflow-x-auto pb-1",
			children: SUGGESTIONS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setQuery(item),
				className: cn("min-h-11 shrink-0 rounded-sm border px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent", query === item ? "border-accent bg-accent text-ink" : "border-line text-muted"),
				children: item
			}, item))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 space-y-3 lg:hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segment, {
					value: library,
					onChange: setLibrary,
					options: [
						{
							id: "all",
							label: "全部"
						},
						{
							id: "relevant",
							label: "相关"
						},
						{
							id: "monitor",
							label: "待审"
						}
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: source,
					onChange: (event) => setSource(event.target.value),
					"aria-label": "来源",
					className: "h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "all",
						children: "全部来源"
					}), sources.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: item,
						children: item
					}, item))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segment, {
					value: lang,
					onChange: setLang,
					options: [
						{
							id: "all",
							label: "全部"
						},
						{
							id: "zh",
							label: "中文"
						},
						{
							id: "en",
							label: "英文"
						}
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				"aria-live": "polite",
				children: [
					tokens.length === 0 ? "最新更新" : `「${query.trim()}」`,
					" · ",
					results.length,
					" 条",
					hideSeed ? " · 已替换为导入数据" : " · 含演示库"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex rounded-md bg-bg-deep p-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setSort("relevance"),
					className: cn("min-h-11 rounded-sm px-3 text-sm", sort === "relevance" ? "bg-surface-2 text-fg" : "text-muted"),
					children: "相关度"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setSort("date"),
					className: cn("min-h-11 rounded-sm px-3 text-sm", sort === "date" ? "bg-surface-2 text-fg" : "text-muted"),
					children: "发布日期"
				})]
			})]
		}),
		results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 rounded-xl border border-line bg-surface px-4 py-8 text-sm text-muted",
			children: "没有命中。换一个词，或到「接入数据」导入 SharePoint 导出的 JSON。多个词按空格分开，需要同时出现。"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 space-y-3",
			children: results.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-xl border border-line bg-surface p-4 transition-colors duration-150 hover:border-accent",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onOpen(doc.id),
						className: "block w-full text-left",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2 text-xs text-muted",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-sm bg-bg-deep px-2 py-1 text-accent",
										children: doc.source
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-sm bg-bg-deep px-2 py-1",
										children: libraryLabel(doc.library)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular-nums",
										children: doc.publishedAt
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: doc.docType })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 text-xl leading-snug font-medium text-fg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, {
									text: doc.title,
									tokens
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-6 text-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, {
									text: doc.summary,
									tokens
								})
							})
						]
					}),
					doc.keywords.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 flex flex-wrap gap-2 text-xs text-subtle",
						children: doc.keywords.slice(0, 5).join(" · ")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextLink, {
								href: doc.originalUrl,
								children: "监管机构原文"
							}),
							doc.fileUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextLink, {
								href: doc.fileUrl,
								children: doc.fileLabel || "原文件"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => onOpen(doc.id),
								className: "min-h-11 px-1 text-sm text-fg underline decoration-line underline-offset-4",
								children: "进一步信息"
							})
						]
					})
				]
			}) }, doc.id))
		})
	] });
}
function TextLink({ href, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href,
		target: "_blank",
		rel: "noreferrer",
		className: "inline-flex min-h-11 items-center gap-1 text-sm text-accent underline decoration-line underline-offset-4",
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
			className: "size-3.5",
			"aria-hidden": "true"
		})]
	});
}
function Detail({ doc, tokens, onToggle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start justify-between gap-3 border-b border-line px-5 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted",
				children: [
					doc.source,
					" · ",
					libraryLabel(doc.library),
					" · ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						children: doc.publishedAt
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "mt-2 text-2xl leading-snug font-medium text-fg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, {
					text: doc.title,
					tokens
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "inline-flex size-11 shrink-0 items-center justify-center rounded-sm text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "关闭"
			})]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-0 flex-1 overflow-y-auto px-5 py-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm font-medium text-accent",
				children: "进一步信息"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 space-y-3 text-sm leading-7 text-fg",
				children: doc.detail.split("\n").filter(Boolean).map((paragraph, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, {
					text: paragraph,
					tokens
				}) }, index))
			}),
			doc.keywords.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-5 text-sm text-muted",
				children: ["关键词：", doc.keywords.join("、")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: doc.originalUrl,
					target: "_blank",
					rel: "noreferrer",
					className: "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-accent px-4 text-sm font-medium text-ink",
					children: ["打开监管机构原文", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
						className: "size-4",
						"aria-hidden": "true"
					})]
				}), doc.fileUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: doc.fileUrl,
					target: "_blank",
					rel: "noreferrer",
					className: "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-line px-4 text-sm font-medium text-fg",
					children: [doc.fileLabel || "打开原文件", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
						className: "size-4",
						"aria-hidden": "true"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "这条暂无单独原文件。接入 SharePoint 后，把文件夹链接填进 fileUrl。"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onToggle,
				className: "mt-4 min-h-11 text-sm text-muted underline decoration-line underline-offset-4",
				children: doc.library === "relevant" ? "移回待审监控库" : "在本机标为相关文件"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs leading-5 text-subtle",
				children: "这个标记只留在当前浏览器，不会写回 SharePoint。正式相关与否，仍以「相关文件」文件夹为准。"
			})
		]
	})] });
}
function SitesView() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-2xl font-medium",
			children: "监测站点"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-2xl text-sm leading-6 text-muted",
			children: "与现有爬虫一致：列表只核对最新若干条，命中后抓正文；英文页只保留网址，中文页保留正文。PICS Publications 的 docview 链接直接存成 PDF。文件再由 Power Automate 同步到 SharePoint，人工确认相关后转入「相关文件」。"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-5 space-y-3",
			children: MONITOR_SITES.map((site) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-xl border border-line bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-baseline justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-medium text-fg",
						children: site.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: site.url,
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex min-h-11 items-center gap-1 text-sm text-accent",
						children: ["打开列表", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
							className: "size-3.5",
							"aria-hidden": "true"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm leading-6 text-muted",
					children: site.note
				})]
			}, site.name))
		})
	] });
}
function ConnectView({ notice, remoteUrl, setRemoteUrl, busy, hideSeed, count, onFile, onRemote, onExport, onTemplate, onReset }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-medium",
				children: "接入 SharePoint 资料"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-6 text-muted",
				children: "平台不直接登录 SharePoint。沿用现有审批流：爬虫落盘，Power Automate 同步到监控文件夹，相关条目再移到「相关文件」。把这两个文件夹导出成 JSON，上传到这里即可检索。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "mt-4 space-y-2 text-sm leading-6 text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "1. 在 Power Automate 里读取两个文档库的文件名、链接和正文摘录。" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "2. 监控文件夹的 library 写成「监控库」，相关文件夹写成「相关文件」。" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "3. originalUrl 放监管机构原网页，fileUrl 放 SharePoint 文件链接。" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "4. 生成 JSON 后上传，或把 JSON 放到一个无需登录的 https 地址再同步。" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "inline-flex min-h-11 cursor-pointer items-center rounded-sm bg-accent px-4 text-sm font-medium text-ink",
						children: ["上传 JSON 并替换", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							accept: "application/json,.json",
							className: "sr-only",
							onChange: (event) => onFile(event.target.files?.[0])
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onTemplate,
						className: "min-h-11 rounded-sm border border-line px-4 text-sm text-fg",
						children: "下载模板"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onExport,
						className: "min-h-11 rounded-sm border border-line px-4 text-sm text-fg",
						children: [
							"导出当前 ",
							count,
							" 条"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onReset,
						className: "min-h-11 px-3 text-sm text-muted",
						children: "恢复演示库"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-5",
				onSubmit: (event) => {
					event.preventDefault();
					onRemote();
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-sm text-muted",
					htmlFor: "remote-url",
					children: "或从 https 链接同步 JSON"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-col gap-2 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "remote-url",
						value: remoteUrl,
						onChange: (event) => setRemoteUrl(event.target.value),
						placeholder: "https://.../regulations.json",
						className: "h-12 min-w-0 flex-1 rounded-md border border-line bg-surface px-3 text-sm text-fg placeholder:text-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: busy || remoteUrl.trim().length < 8,
						className: "min-h-12 rounded-sm bg-surface-2 px-4 text-sm font-medium text-fg disabled:opacity-50",
						children: busy ? "正在同步" : "同步"
					})]
				})]
			}),
			notice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-accent",
				children: notice
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-xs leading-5 text-subtle",
				children: [hideSeed ? "演示库已隐藏，当前是导入的数据。" : "当前混有演示库，便于先试用检索。", "导入内容保存在这台浏览器。SharePoint 需要登录的链接无法被远程同步直接读取，请上传文件，或由流程把 JSON 放到可公开读取的地址。"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 overflow-x-auto rounded-xl border border-line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[32rem] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-bg-deep text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-3 font-medium",
							children: "字段"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-3 font-medium",
							children: "含义"
						})] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "text-fg",
						children: [
							["title", "法规名称，卡片标题"],
							["summary", "进一步信息，显示在标题下方"],
							["detail", "点开后的进一步信息"],
							["originalUrl", "监管机构原网页"],
							["fileUrl", "SharePoint 或附件原文件"],
							["library", "监控库，或相关文件"],
							["source", "如 PICS、上海药监-药品法规、CFDI"],
							["keywords", "关键词数组，或用顿号分隔的字符串"],
							["publishedAt", "发布日期，YYYY-MM-DD"]
						].map(([field, meaning]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-line",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 font-medium text-accent",
								children: field
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 text-muted",
								children: meaning
							})]
						}, field))
					})]
				})
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegApp, {});
}
//#endregion
export { Home as component };
