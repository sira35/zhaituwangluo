// 宅兔网络招聘平台后端服务
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'zhaitu-recruitment-secret-key';

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// 模拟数据库
const users = [];
const verificationCodes = {};
const loginLogs = [];

// 设备绑定检查中间件
const deviceBindingMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ success: false, message: '未授权访问' });
    }

    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = users.find(u => u.id === decoded.userId);
        
        if (!user) {
            return res.status(401).json({ success: false, message: '用户不存在' });
        }
        
        // 检查设备绑定
        if (user.deviceBinding && user.deviceFingerprint) {
            const currentFingerprint = req.headers.devicefingerprint;
            
            if (!currentFingerprint) {
                return res.status(403).json({ success: false, message: '缺少设备信息' });
            }
            
            if (user.deviceFingerprint !== currentFingerprint) {
                // 记录异常登录尝试
                loginLogs.push({
                    userId: user.id,
                    username: user.username,
                    time: new Date(),
                    deviceFingerprint: currentFingerprint,
                    ip: req.ip,
                    success: false,
                    reason: '设备不匹配'
                });
                
                return res.status(403).json({ 
                    success: false, 
                    message: '账号已绑定其他设备，无法在当前设备登录',
                    isDeviceMismatch: true
                });
            }
        }
        
        // 添加用户信息到请求
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: '无效的令牌' });
    }
};

// 路由

// 注册路由
app.post('/api/register', async (req, res) => {
    try {
        const { 
            username, 
            email, 
            password, 
            phone, 
            verificationCode,
            userType,
            deviceBinding,
            deviceFingerprint 
        } = req.body;
        
        // 验证必填字段
        if (!username || !email || !password || !phone || !verificationCode) {
            return res.status(400).json({ success: false, message: '所有字段都是必填的' });
        }
        
        // 验证用户名是否已存在
        if (users.some(u => u.username === username)) {
            return res.status(400).json({ success: false, message: '用户名已被使用' });
        }
        
        // 验证邮箱是否已存在
        if (users.some(u => u.email === email)) {
            return res.status(400).json({ success: false, message: '邮箱已被注册' });
        }
        
        // 验证手机号码是否已存在
        if (users.some(u => u.phone === phone)) {
            return res.status(400).json({ success: false, message: '手机号码已被使用' });
        }
        
        // 验证手机验证码
        if (!verificationCodes[phone] || verificationCodes[phone] !== verificationCode) {
            return res.status(400).json({ success: false, message: '验证码错误或已过期' });
        }
        
        // 密码加密
        const salt = crypto.randomBytes(16).toString('hex');
        const hashedPassword = crypto
            .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
            .toString('hex');
        
        // 创建用户
        const newUser = {
            id: crypto.randomUUID(),
            username,
            email,
            phone,
            passwordHash: hashedPassword,
            salt,
            userType,
            deviceBinding,
            deviceFingerprint: deviceBinding ? deviceFingerprint : null,
            createdAt: new Date(),
            lastLogin: null
        };
        
        // 保存用户
        users.push(newUser);
        
        // 清除验证码
        delete verificationCodes[phone];
        
        // 返回成功响应
        res.status(201).json({ 
            success: true, 
            message: '注册成功',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                userType: newUser.userType
            }
        });
    } catch (error) {
        console.error('注册错误:', error);
        res.status(500).json({ success: false, message: '服务器错误' });
    }
});

// 发送验证码路由
app.post('/api/send-verification-code', (req, res) => {
    try {
        const { phone } = req.body;
        
        if (!phone) {
            return res.status(400).json({ success: false, message: '请提供手机号码' });
        }
        
        // 生成随机6位验证码
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        
        // 在实际应用中，这里应该调用短信服务发送验证码
        console.log(`向 ${phone} 发送验证码: ${code}`);
        
        // 保存验证码 (实际应用中应该设置过期时间)
        verificationCodes[phone] = code;
        
        // 由于这是模拟环境，直接返回验证码以便测试
        res.json({ 
            success: true, 
            message: '验证码已发送',
            code: code // 实际应用中不应该返回验证码
        });
    } catch (error) {
        console.error('发送验证码错误:', error);
        res.status(500).json({ success: false, message: '服务器错误' });
    }
});

// 登录路由
app.post('/api/login', async (req, res) => {
    try {
        const { username, password, deviceFingerprint, bindDevice } = req.body;
        
        // 查找用户
        const user = users.find(u => u.username === username);
        
        if (!user) {
            return res.status(401).json({ success: false, message: '用户名或密码错误' });
        }
        
        // 验证密码
        const hashedPassword = crypto
            .pbkdf2Sync(password, user.salt, 1000, 64, 'sha512')
            .toString('hex');
        
        if (user.passwordHash !== hashedPassword) {
            return res.status(401).json({ success: false, message: '用户名或密码错误' });
        }
        
        // 检查设备绑定
        if (user.deviceBinding && user.deviceFingerprint) {
            if (user.deviceFingerprint !== deviceFingerprint) {
                // 记录异常登录尝试
                loginLogs.push({
                    userId: user.id,
                    username: user.username,
                    time: new Date(),
                    deviceFingerprint,
                    ip: req.ip,
                    success: false,
                    reason: '设备不匹配'
                });
                
                return res.status(403).json({ 
                    success: false, 
                    message: '账号已绑定其他设备，无法在当前设备登录',
                    isDeviceMismatch: true
                });
            }
        }
        
        // 是否需要绑定设备
        if (bindDevice) {
            user.deviceBinding = true;
            user.deviceFingerprint = deviceFingerprint;
        }
        
        // 更新最后登录时间
        user.lastLogin = new Date();
        
        // 记录登录日志
        loginLogs.push({
            userId: user.id,
            username: user.username,
            time: user.lastLogin,
            deviceFingerprint,
            ip: req.ip,
            success: true
        });
        
        // 生成JWT令牌
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        // 返回成功响应和令牌
        res.json({ 
            success: true, 
            message: '登录成功',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                userType: user.userType
            },
            redirectUrl: '/'
        });
    } catch (error) {
        console.error('登录错误:', error);
        res.status(500).json({ success: false, message: '服务器错误' });
    }
});

// 解绑设备路由 (需要管理员权限或特殊验证)
app.post('/api/unbind-device', deviceBindingMiddleware, async (req, res) => {
    try {
        const { userId, verificationCode } = req.body;
        
        // 检查权限 (简单示例，实际应用中可能需要更复杂的权限检查)
        if (req.user.id !== userId && req.user.userType !== 'admin') {
            return res.status(403).json({ success: false, message: '权限不足' });
        }
        
        // 查找用户
        const user = users.find(u => u.id === userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: '用户不存在' });
        }
        
        // 实际应用中应该验证特殊验证码或二次身份验证
        if (!verificationCode || verificationCode !== 'special-admin-code') {
            return res.status(400).json({ success: false, message: '无效的验证码' });
        }
        
        // 解绑设备
        user.deviceBinding = false;
        user.deviceFingerprint = null;
        
        // 记录操作日志
        console.log(`用户 ${user.username} (ID: ${user.id}) 的设备绑定已解除，操作者: ${req.user.username}`);
        
        // 返回成功响应
        res.json({ 
            success: true, 
            message: '设备绑定已解除'
        });
    } catch (error) {
        console.error('解绑设备错误:', error);
        res.status(500).json({ success: false, message: '服务器错误' });
    }
});

// 获取用户登录日志 (管理员功能)
app.get('/api/login-logs', deviceBindingMiddleware, async (req, res) => {
    try {
        // 检查是否管理员
        if (req.user.userType !== 'admin') {
            return res.status(403).json({ success: false, message: '权限不足' });
        }
        
        const { userId } = req.query;
        
        let filteredLogs = [...loginLogs];
        
        // 如果指定了用户ID，则筛选
        if (userId) {
            filteredLogs = filteredLogs.filter(log => log.userId === userId);
        }
        
        // 按时间倒序排序
        filteredLogs.sort((a, b) => b.time - a.time);
        
        // 返回日志
        res.json({ 
            success: true, 
            logs: filteredLogs
        });
    } catch (error) {
        console.error('获取登录日志错误:', error);
        res.status(500).json({ success: false, message: '服务器错误' });
    }
});

// 模拟职位数据
const jobs = [
    {
        id: '1',
        title: '前端开发工程师',
        company: '宅兔科技有限公司',
        location: '北京',
        salary: '15000-25000',
        education: '本科',
        experience: '3-5年',
        description: '负责公司产品的前端开发工作，使用Vue.js和React等框架...',
        requirements: [
            '熟悉HTML5、CSS3和JavaScript',
            '熟练掌握至少一种主流前端框架',
            '良好的编码习惯和团队协作能力'
        ],
        tags: ['JavaScript', 'Vue', 'React'],
        publishDate: '2024-03-08',
        views: 126
    },
    {
        id: '2',
        title: '产品经理',
        company: '宅兔网络科技',
        location: '上海',
        salary: '20000-30000',
        education: '本科',
        experience: '5-10年',
        description: '负责公司产品的规划、设计和迭代优化...',
        requirements: [
            '5年以上互联网产品经验',
            '具备良好的产品规划和设计能力',
            '优秀的沟通协调能力'
        ],
        tags: ['互联网产品', '用户增长', '数据分析'],
        publishDate: '2024-03-07',
        views: 98
    }
];

// 获取职位列表路由
app.get('/api/jobs', async (req, res) => {
    try {
        const { keyword, location, industry, salary, experience, education, limit, page } = req.query;
        
        let filteredJobs = [...jobs];
        
        // 实现筛选逻辑
        if (keyword) {
            const lowerKeyword = keyword.toLowerCase();
            filteredJobs = filteredJobs.filter(job => 
                job.title.toLowerCase().includes(lowerKeyword) || 
                job.company.toLowerCase().includes(lowerKeyword) || 
                job.tags.some(tag => tag.toLowerCase().includes(lowerKeyword))
            );
        }
        
        if (location) {
            filteredJobs = filteredJobs.filter(job => job.location === location);
        }
        
        // 分页
        const pageSize = parseInt(limit) || 10;
        const currentPage = parseInt(page) || 1;
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        
        const paginatedJobs = filteredJobs.slice(startIndex, endIndex);
        
        // 返回结果
        res.json({
            success: true,
            total: filteredJobs.length,
            page: currentPage,
            pageSize,
            totalPages: Math.ceil(filteredJobs.length / pageSize),
            jobs: paginatedJobs
        });
    } catch (error) {
        console.error('获取职位列表错误:', error);
        res.status(500).json({ success: false, message: '服务器错误' });
    }
});

// 获取职位详情路由
app.get('/api/jobs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // 查找职位
        const job = jobs.find(j => j.id === id);
        
        if (!job) {
            return res.status(404).json({ success: false, message: '职位不存在' });
        }
        
        // 增加浏览次数
        job.views += 1;
        
        // 返回职位详情
        res.json({
            success: true,
            job
        });
    } catch (error) {
        console.error('获取职位详情错误:', error);
        res.status(500).json({ success: false, message: '服务器错误' });
    }
});

// 路由处理
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/search.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/search.html'));
});

app.get('/companies.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/companies.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/register.html'));
});

app.get('/ai-tools.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/ai-tools.html'));
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`宅兔网络招聘服务器运行在端口 ${PORT}`);
    console.log(`访问 http://localhost:${PORT} 查看网站`);
});

module.exports = app; 