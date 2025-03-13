// 基础职位列表（清空原有列表）
const jobs = [];

// 职位类型列表（更通俗易懂的版本）
const positions = [
    "人工智能开发", "产品运营", "数据分析",
    "用户体验设计", "移动端开发", "云计算开发",
    "大数据开发", "游戏开发", "视频技术",
    "电商技术", "支付技术", "系统运维"
];

// 大厂公司列表
const bigCompanies = [
    { name: "腾讯", type: "社招", url: "https://hr.tencent.com" },
    { name: "阿里巴巴", type: "校招", url: "https://job.alibaba.com" },
    { name: "百度", type: "社招", url: "https://talent.baidu.com" },
    { name: "字节跳动", type: "校招", url: "https://job.bytedance.com" },
    { name: "华为", type: "社招", url: "https://career.huawei.com" },
    { name: "京东", type: "校招", url: "https://campus.jd.com" },
    { name: "小米", type: "社招", url: "https://hr.xiaomi.com" },
    { name: "美团", type: "校招", url: "https://zhaopin.meituan.com" },
    { name: "快手", type: "社招", url: "https://school.kuaishou.com" },
    { name: "拼多多", type: "校招", url: "https://hr.pinduoduo.com" },
    { name: "苏宁", type: "社招", url: "https://hr.suning.com" },
    { name: "中国移动", type: "校招", url: "https://job.10086.cn" },
    { name: "中国联通", type: "社招", url: "https://www.chinaunicom.com.cn/46/menu01/528/column06" },
    { name: "中国电信", type: "校招", url: "https://job.chinatelecom.com.cn/wt/TELE/web/index#/" },
    { name: "招商银行", type: "社招", url: "https://career.cmbchina.com/home" },
    { name: "工商银行", type: "校招", url: "https://job.icbc.com.cn/pc/index.html#/main/school/home/post" },
    { name: "中兴", type: "社招", url: "https://job.zte.com.cn/cn/" },
    { name: "海尔", type: "校招", url: "https://www.haier.com/careers" },
    { name: "美的集团", type: "社招", url: "https://www.midea.com/careers" },
    { name: "比亚迪", type: "校招", url: "https://career.byd.com" },
    { name: "网易", type: "社招", url: "https://hr.163.com" },
    { name: "哔哩哔哩", type: "校招", url: "https://jobs.bilibili.com" },
    { name: "小红书", type: "社招", url: "https://hr.xiaohongshu.com" },
    { name: "滴滴", type: "校招", url: "https://talent.didiglobal.com" },
    { name: "搜狗", type: "社招", url: "https://www.sogou.com/docs/jobs/jobs_tech_04.htm" },
    { name: "OPPO", type: "校招", url: "https://career.oppo.com" },
    { name: "Vivo", type: "社招", url: "https://hr.vivo.com/home" },
    { name: "360", type: "校招", url: "https://hr.360.cn/hr/" },
    { name: "中国外运", type: "社招", url: "https://sinotrans.zhiye.com/custom/social?hideAll=true&ky=&c1=&c2=&c=" },
    { name: "新东方教育集团", type: "校招", url: "https://zhaopin.xdf.cn/campus/jobs" }
];

// 中小企业公司列表
const smallCompanies = [
    { name: "豪威科技集团", type: "社招", url: "http://www.hivac.cn/" },
    { name: "浙江精工钢结构", type: "校招", url: "http://www.600496.com/" },
    { name: "天立电机", type: "社招", url: "https://www.job5156.com/comp/zp-815822.html" },
    { name: "重庆中邦药业", type: "校招", url: "http://www.7ahr.com/Company/ListCompany-ehlu51.html" },
    { name: "安徽金辉电子", type: "社招", url: "https://www.qcc.com/firm/dee09a3d66f5d63f902cfae11b62cf76.html" },
    { name: "物元青岛半导体公司", type: "校招", url: "https://www.yingjiesheng.com/job-007-398-306.html" },
    { name: "博鼎集团", type: "社招", url: "http://www.dlypt.net/about" },
    { name: "博创精工科技", type: "校招", url: "https://bozhon3.zhiye.com/campus" },
    { name: "腾盾科创", type: "社招", url: "https://www.tengden.com/" },
    { name: "江苏图南合金股份有限公司", type: "校招", url: "http://www.toland-alloy.com/job.html" },
    { name: "四川九洲投资控股集团有限公司", type: "社招", url: "https://www.jezetek.cc/" },
    { name: "烽火通信科技", type: "校招", url: "https://www.fiberhome.com/joinus.html" },
    { name: "深圳市创梦天地科技有限公司", type: "社招", url: "https://www.idreamsky.com/" },
    { name: "深圳市合元科技有限公司", type: "社招", url: "https://kiem9mgc6h.jobs.feishu.cn/index" },
    { name: "武汉光庭信息技术股份有限公司", type: "社招", url: "https://kotei.zhiye.com/campus/" },
    { name: "MiniMax公司", type: "社招", url: "https://vrfi1sk8a0.jobs.feishu.cn/index" },
    { name: "宇视科技", type: "社招", url: "https://talent.uniview.com/index.html" },
    { name: "石家庄邢森染料有限公司", type: "社招", url: "http://shinedyes.com/" },
    { name: "远大阀门集团有限公司", type: "社招", url: "http://www.100famen.com/index/product/brand/3.html" }
];

const locations = ["北京市", "上海市", "广州市", "深圳市", "杭州市", "成都市", "武汉市", "南京市", "西安市", "苏州市"];

// 生成大厂职位
for (let company of bigCompanies) {
    const position = positions[Math.floor(Math.random() * positions.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const types = ["校招", "社招", "全招"];
    const type = types[Math.floor(Math.random() * types.length)];
    
    jobs.push({
        title: position,
        company: company.name,
        type: type,
        location: location,
        education: "本科及以上",
        date: "2025-03-10",
        url: company.url,
        category: "大厂"
    });
}

// 生成中小企业职位
for (let company of smallCompanies) {
    const position = positions[Math.floor(Math.random() * positions.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const types = ["校招", "社招", "全招"];
    const type = types[Math.floor(Math.random() * types.length)];
    
    jobs.push({
        title: position,
        company: company.name,
        type: type,
        location: location,
        education: "本科及以上",
        date: "2025-03-10",
        url: company.url,
        category: "中小企业"
    });
}

// 大学生就业招聘平台列表
const graduateServices = [
    {
        name: "中国航天人才网",
        type: "统招",
        url: "https://www.spacetalent.com.cn/zhiweicx.html",
        description: "国家航天事业单位招聘平台"
    },
    {
        name: "中国电建招聘平台",
        type: "统招",
        url: "https://zhaopin.powerchina.cn/xyzp",
        description: "电力建设行业重点企业招聘"
    },
    {
        name: "中国南方电网",
        type: "统招",
        url: "https://zhaopin.powerchina.cn/xyzp",
        description: "电网系统重点企业招聘"
    },
    {
        name: "中国兵器校园招聘平台",
        type: "统招",
        url: "https://zhaopin.nhrdc.cn/campus/jobs.jsp",
        description: "军工行业重点单位招聘"
    },
    {
        name: "中央和国家机关所属事业单位",
        type: "统招",
        url: "https://www.mohrss.gov.cn/SYrlzyhshbzb/fwyd/SYkaoshizhaopin/zyhgjjgsydwgkzp/",
        description: "国家机关事业单位招聘信息"
    },
    {
        name: "人力资源社会保障部事业单位招聘平台",
        type: "统招",
        url: "https://www.sydwgkzp.cn/mohrss/index.html#/login",
        description: "全国事业单位公开招聘服务平台"
    },
    { 
        name: "全国大学生创业服务网", 
        type: "创业服务", 
        url: "https://cy.ncss.cn/",
        description: "专注大学生创业指导与服务"
    },
    { 
        name: "研究生招生信息网", 
        type: "升学服务", 
        url: "https://yz.chsi.com.cn/",
        description: "权威的研究生招生信息发布平台"
    },
    { 
        name: "全国高校毕业生毕业去向登记系统", 
        type: "就业统计", 
        url: "https://dj.ncss.cn/",
        description: "毕业生去向信息统计平台"
    },
    { 
        name: "国际组织实习任职平台", 
        type: "国际就业", 
        url: "https://gj.ncss.cn/",
        description: "国际组织实习与就业机会"
    },
    { 
        name: "新疆籍毕业生就业创业信息平台", 
        type: "区域就业", 
        url: "https://xj.ncss.cn/",
        description: "服务新疆籍毕业生就业创业"
    }
];

// 生成HTML
function generateJobCards() {
    return `
        <div class="page-header">
            <div class="category-buttons-wrapper">
                <div class="category-buttons">
                    <button class="category-btn" data-category="big">大厂</button>
                    <button class="category-btn" data-category="small">中小企业</button>
                    <button class="category-btn" data-category="graduate">大学生就业</button>
                </div>
            </div>
            <div class="header-bottom">
                <div class="search-container">
                    <input type="text" id="searchInput" placeholder="搜索公司..." class="search-input">
                </div>
                <div class="title-wrapper">
                    <h2 class="section-title">职位信息概览</h2>
                </div>
            </div>
        </div>
        <div class="company-container">
            <div class="company-grid big-companies">
                ${generateCompanyGrid(bigCompanies)}
            </div>
            <div class="company-grid small-companies">
                ${generateCompanyGrid(smallCompanies)}
            </div>
            <div class="company-grid graduate-services">
                ${generateGraduateServicesGrid(graduateServices)}
            </div>
        </div>
    `;
}

function generateCompanyGrid(companies) {
    return `
        <div class="grid-container">
            ${companies.map(company => `
                <a href="${company.url}" target="_blank" class="company-card" data-company="${company.name}">
                    <div class="card-header">
                        ${company.type}
                    </div>
                    <div class="card-body">
                        <h3>${company.name}</h3>
                    </div>
                </a>
            `).join('')}
        </div>
    `;
}

function generateGraduateServicesGrid(services) {
    return `
        <div class="grid-container">
            ${services.map(service => `
                <a href="${service.url}" target="_blank" class="company-card graduate-card" data-company="${service.name}">
                    <div class="card-header">
                        ${service.type}
                    </div>
                    <div class="card-body">
                        <h3>${service.name}</h3>
                        <p class="service-description">${service.description}</p>
                    </div>
                </a>
            `).join('')}
        </div>
    `;
}

// 将生成的公司卡片插入到页面中并添加交互
document.addEventListener('DOMContentLoaded', function() {
    const jobCardsContainer = document.querySelector('.job-cards');
    if (jobCardsContainer) {
        jobCardsContainer.innerHTML = generateJobCards();
        
        // 添加标签切换功能
        const buttons = document.querySelectorAll('.category-btn');
        const grids = document.querySelectorAll('.company-grid');

        buttons.forEach(button => {
            button.addEventListener('click', function() {
                buttons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const category = this.dataset.category;
                grids.forEach(grid => {
                    grid.style.display = 'none';
                    if (grid.classList.contains(category + '-companies') || 
                        grid.classList.contains(category + '-services')) {
                        grid.style.display = 'block';
                    }
                });
            });
        });

        // 添加搜索功能
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const cards = document.querySelectorAll('.company-card');
            
            cards.forEach(card => {
                const companyName = card.getAttribute('data-company').toLowerCase();
                if (companyName.includes(searchTerm)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});

// 更新样式
const style = document.createElement('style');
style.textContent = `
    body {
        margin: 0;
        padding: 20px;
        background: #fff5f2;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }

    .page-header {
        max-width: 2560px;
        margin: 0 auto 30px;
        padding: 0 20px;
    }

    .category-buttons-wrapper {
        display: flex;
        justify-content: center;
        margin-bottom: 25px;
    }

    .category-buttons {
        display: flex;
        gap: 20px;
    }

    .header-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .title-wrapper {
        flex-grow: 1;
        display: flex;
        justify-content: center;
    }

    .section-title {
        font-size: 24px;
        color: #ff7043;
        margin: 0;
        font-weight: bold;
    }

    .search-container {
        margin: 0;
        width: 300px;
    }

    .search-input {
        width: 100%;
        height: 50px;
        padding: 0 20px;
        border: 2px solid #ffd3c1;
        border-radius: 25px;
        font-size: 18px;
        color: #ff7043;
        background: white;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(255, 112, 67, 0.1);
    }

    .search-input:focus {
        outline: none;
        border-color: #ff7043;
        box-shadow: 0 6px 12px rgba(255, 112, 67, 0.2);
    }

    .search-input::placeholder {
        color: #ffab91;
    }

    .category-btn {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: none;
        background: #ffd3c1;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 16px;
        font-weight: bold;
        color: #ff7043;
        box-shadow: 0 4px 6px rgba(255, 112, 67, 0.1);
    }

    .category-btn:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 15px rgba(255, 112, 67, 0.2);
    }

    .category-btn.active {
        background: #ff7043;
        color: white;
    }

    .grid-container {
        display: grid;
        grid-template-columns: repeat(4, minmax(300px, 1fr));
        gap: 40px;
        justify-content: space-between;
        width: 100%;
        max-width: 100%;
        margin: 0 auto;
        padding: 0 40px;
    }

    .company-card {
        text-decoration: none;
        color: inherit;
        overflow: hidden;
        transition: all 0.3s ease;
        background: white;
        min-width: 300px;
        height: 364px;
        border-radius: 20px;
        box-shadow: 0 4px 6px rgba(255, 112, 67, 0.1);
        display: flex;
        flex-direction: column;
    }

    .company-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 15px rgba(255, 112, 67, 0.2);
    }

    .card-header {
        background: linear-gradient(135deg, #ff7043, #ff9a76);
        color: white;
        padding: 30px 0;
        text-align: center;
        font-size: 28px;
        font-weight: bold;
        flex: 0 0 auto;
    }

    .card-body {
        padding: 40px 30px;
        background: white;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
    }

    .card-body h3 {
        margin: 0;
        font-size: 32px;
        color: #ff7043;
        line-height: 1.5;
    }

    .company-grid {
        display: none;
        width: 100%;
    }

    .company-grid.active {
        display: block;
    }

    /* 响应式布局调整 */
    @media (max-width: 2400px) {
        .grid-container {
            grid-template-columns: repeat(4, minmax(280px, 1fr));
            gap: 35px;
            padding: 0 35px;
        }
    }

    @media (max-width: 1800px) {
        .grid-container {
            grid-template-columns: repeat(3, minmax(260px, 1fr));
            gap: 30px;
            padding: 0 30px;
        }
        
        .company-card {
            height: 340px;
        }
    }

    @media (max-width: 1400px) {
        .grid-container {
            grid-template-columns: repeat(2, minmax(240px, 1fr));
            gap: 25px;
            padding: 0 25px;
        }
        
        .company-card {
            height: 320px;
        }
    }

    @media (max-width: 900px) {
        .grid-container {
            grid-template-columns: repeat(1, minmax(220px, 1fr));
            gap: 20px;
            padding: 0 20px;
        }
        
        .company-card {
            height: 300px;
        }
        
        .card-header {
            padding: 25px 0;
            font-size: 24px;
        }
        
        .card-body {
            padding: 30px 20px;
        }
        
        .card-body h3 {
            font-size: 28px;
        }
    }

    @media (max-width: 767px) {
        .grid-container {
            padding: 0 15px;
            gap: 20px;
        }
        
        .company-card {
            height: 360px;
        }
        
        .card-header {
            padding: 30px 0;
            font-size: 24px;
        }
        
        .card-body {
            padding: 40px 20px;
        }
        
        .card-body h3 {
            font-size: 28px;
        }
    }

    .graduate-card {
        background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
    }
    
    .graduate-card .card-header {
        background: linear-gradient(135deg, #4b6cb7, #182848);
        color: white;
    }
    
    .graduate-card .card-body h3 {
        color: #4b6cb7;
        font-size: 24px;
        margin-bottom: 10px;
    }
    
    .service-description {
        font-size: 16px;
        color: #666;
        margin-top: 10px;
    }
    
    .graduate-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 15px rgba(75, 108, 183, 0.2);
    }
`;

document.head.appendChild(style);
