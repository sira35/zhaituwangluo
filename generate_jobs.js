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
    { name: "工商银行", type: "校招", url: "https://career.icbc.com.cn" },
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
    { name: "360", type: "校招", url: "https://hr.360.cn/hr/" }
];

// 中小企业公司列表
const smallCompanies = [
    { name: "豪威科技集团", type: "社招", url: "http://www.hivac.cn/" },
    { name: "浙江精工钢结构", type: "校招", url: "http://www.600496.com/" },
    { name: "天立电机", type: "社招", url: "https://www.liepin.com/company/9764437/" },
    { name: "重庆中邦药业", type: "校招", url: "https://www.liepin.com/company/8032362/" },
    { name: "安徽金辉电子", type: "社招", url: "https://www.qcc.com/firm/dee09a3d66f5d63f902cfae11b62cf76.html" },
    { name: "物元半导体", type: "校招", url: "https://www.yingjiesheng.com/job-007-398-306.html" },
    { name: "博鼎集团", type: "社招", url: "http://www.dlypt.net/about" },
    { name: "博创精工科技", type: "校招", url: "https://bozhon3.zhiye.com/campus" },
    { name: "腾盾科创", type: "社招", url: "https://www.tengden.com/" },
    { name: "图南合金", type: "校招", url: "http://www.toland-alloy.com/job.html" }
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

// 生成HTML
function generateJobCards() {
    return `
        <div class="page-header">
            <div class="category-buttons-wrapper">
                <div class="category-buttons">
                    <button class="category-btn active" data-category="big">大厂</button>
                    <button class="category-btn" data-category="small">中小企业</button>
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
            <div class="company-grid big-companies active">
                ${generateCompanyGrid(bigCompanies)}
            </div>
            <div class="company-grid small-companies">
                ${generateCompanyGrid(smallCompanies)}
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

// 将生成的公司卡片插入到页面中并添加交互
document.addEventListener('DOMContentLoaded', function() {
    const jobCardsContainer = document.querySelector('.job-cards');
    if (jobCardsContainer) {
        jobCardsContainer.innerHTML = generateJobCards();
        
        // 添加标签切换功能
        const buttons = document.querySelectorAll('.category-btn');
        const companyGrids = document.querySelectorAll('.company-grid');

        buttons.forEach(button => {
            button.addEventListener('click', function() {
                buttons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const category = this.dataset.category;
                companyGrids.forEach(grid => {
                    grid.classList.remove('active');
                    if (grid.classList.contains(category + '-companies')) {
                        grid.classList.add('active');
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
`;

document.head.appendChild(style);
