document.addEventListener('DOMContentLoaded', function() {
    // 模拟加载过程
    setTimeout(function() {
        // 这里可以添加重定向到主页面的代码
        // window.location.href = 'main.html';
        
        // 或者显示登录表单
        showLoginForm();
    }, 3000); // 3秒后执行
});

function showLoginForm() {
    const loadingContainer = document.querySelector('.loading-container');
    
    // 创建登录表单HTML
    const loginFormHTML = `
        <div class="login-content">
            <div class="logo">
                <h1>宅兔网络</h1>
            </div>
            <div class="login-form">
                <h2 class="mb-4">系统登录</h2>
                <form id="loginForm">
                    <div class="mb-3">
                        <div class="input-group">
                            <span class="input-group-text"><i class="fa fa-user"></i></span>
                            <input type="text" class="form-control" id="username" placeholder="用户名" required>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="input-group">
                            <span class="input-group-text"><i class="fa fa-lock"></i></span>
                            <input type="password" class="form-control" id="password" placeholder="密码" required>
                        </div>
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="rememberMe">
                        <label class="form-check-label" for="rememberMe">记住我</label>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">登录</button>
                    <div id="loginError" class="mt-2 text-danger" style="display: none;">
                        用户名或密码错误，请重试
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // 淡出加载内容
    loadingContainer.style.opacity = '0';
    setTimeout(function() {
        // 替换内容
        loadingContainer.innerHTML = loginFormHTML;
        // 淡入登录表单
        loadingContainer.style.opacity = '1';
        
        // 添加表单提交事件
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorElement = document.getElementById('loginError');
            
            // 验证用户名和密码
            if (username === '527494471' && password === '123456abc') {
                // 登录成功
                console.log('登录成功:', username);
                // 跳转到仪表盘页面
                window.location.href = 'dashboard.html';
            } else {
                // 登录失败
                errorElement.style.display = 'block';
                console.log('登录失败:', username);
            }
        });
    }, 500);
} 