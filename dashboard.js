document.addEventListener('DOMContentLoaded', function() {
    // 侧边栏切换
    const toggleSidebarBtn = document.getElementById('toggleSidebar');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (toggleSidebarBtn) {
        toggleSidebarBtn.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
        });
    }
    
    // 菜单项点击事件
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 初始化图表
    initVisitsChart();
    
    // 响应式处理
    handleResponsive();
    window.addEventListener('resize', handleResponsive);
});

// 初始化访问统计图表
function initVisitsChart() {
    const ctx = document.getElementById('visitsChart');
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            datasets: [{
                label: '本周访问量',
                data: [1200, 1900, 1500, 2500, 2200, 3000, 2800],
                backgroundColor: 'rgba(13, 110, 253, 0.1)',
                borderColor: 'rgba(13, 110, 253, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }, {
                label: '上周访问量',
                data: [900, 1200, 1400, 1800, 2100, 2500, 2300],
                backgroundColor: 'rgba(173, 181, 189, 0.1)',
                borderColor: 'rgba(173, 181, 189, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// 响应式处理
function handleResponsive() {
    const width = window.innerWidth;
    const sidebar = document.querySelector('.sidebar');
    
    if (width < 992) {
        sidebar.classList.add('collapsed');
    } else {
        sidebar.classList.remove('collapsed');
    }
} 