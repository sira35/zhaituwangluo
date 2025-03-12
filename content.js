document.addEventListener('DOMContentLoaded', function() {
    // 菜单展开/收起
    const menuTitle = document.querySelector('.menu-title');
    const subMenu = document.querySelector('.sub-menu');
    
    if (menuTitle) {
        menuTitle.addEventListener('click', function() {
            this.classList.toggle('collapsed');
            const angleIcon = this.querySelector('.fa-angle-down');
            if (angleIcon) {
                angleIcon.classList.toggle('fa-angle-up');
            }
            if (subMenu) {
                subMenu.style.display = subMenu.style.display === 'none' ? 'block' : 'none';
            }
        });
    }

    // 全选/取消全选
    const selectAll = document.querySelector('thead input[type="checkbox"]');
    const selectItems = document.querySelectorAll('tbody input[type="checkbox"]');
    
    if (selectAll) {
        selectAll.addEventListener('change', function() {
            selectItems.forEach(item => {
                item.checked = this.checked;
            });
            updateBatchButtons();
        });
    }

    // 单个选择框变化
    selectItems.forEach(item => {
        item.addEventListener('change', updateBatchButtons);
    });

    // 更新批量操作按钮状态
    function updateBatchButtons() {
        const checkedCount = document.querySelectorAll('tbody input[type="checkbox"]:checked').length;
        const batchButtons = document.querySelectorAll('.toolbar-left .btn');
        
        batchButtons.forEach(btn => {
            if (btn.textContent.includes('批量')) {
                btn.disabled = checkedCount === 0;
            }
        });
    }

    // 表格行悬停效果
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f5f5f5';
        });
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });

    // 搜索功能
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    let jobCards;

    // 等待卡片生成后再获取元素
    setTimeout(() => {
        jobCards = document.querySelectorAll('.job-card');
        // 初始化时显示所有卡片
        jobCards.forEach(card => {
            card.style.display = '';
        });
    }, 100);

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        // 如果搜索词为空，显示所有卡片
        if (!searchTerm) {
            jobCards.forEach(card => {
                card.style.display = '';
            });
            return;
        }

        jobCards.forEach(card => {
            const title = card.dataset.title.toLowerCase();
            const company = card.dataset.company.toLowerCase();
            const type = card.dataset.type.toLowerCase();
            const location = card.dataset.location.toLowerCase();
            
            // 检查所有相关字段
            if (title.includes(searchTerm) || 
                company.includes(searchTerm) || 
                type.includes(searchTerm) || 
                location.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // 监听输入变化
    if (searchInput) {
        searchInput.addEventListener('input', performSearch);
    }

    // 点击搜索按钮
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }

    // 回车搜索
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // 添加职位卡片的点击事件
    setTimeout(() => {
        const cards = document.querySelectorAll('.job-card');
        cards.forEach(card => {
            card.addEventListener('click', function(e) {
                // 获取链接地址
                const href = this.getAttribute('href');
                // 在新窗口中打开链接
                window.open(href, '_blank');
            });
        });
    }, 100);

    // 筛选功能
    const filterSelects = document.querySelectorAll('.filter-section select');
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            applyFilters();
        });
    });

    function applyFilters() {
        const rows = document.querySelectorAll('tbody tr');
        const filters = {
            location: document.querySelector('select:nth-child(1)').value,
            salary: document.querySelector('select:nth-child(2)').value,
            experience: document.querySelector('select:nth-child(3)').value,
            time: document.querySelector('select:nth-child(4)').value
        };

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            let match = true;

            // 检查每个筛选条件
            if (filters.location && !cells[4].textContent.includes(filters.location)) {
                match = false;
            }
            // 其他筛选条件的检查可以根据需要添加

            row.style.display = match ? '' : 'none';
        });
    }

    // 操作按钮提示和事件
    const actionButtons = document.querySelectorAll('.btn-sm');
    actionButtons.forEach(btn => {
        // 删除确认
        if (btn.querySelector('i').className.includes('trash')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                if (confirm('确定要删除这条招聘信息吗？')) {
                    // 这里添加删除逻辑
                    console.log('删除招聘信息');
                }
            });
        }

        // 刷新按钮点击事件
        if (btn.querySelector('i').className.includes('refresh')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                // 这里添加刷新逻辑
                console.log('刷新招聘信息');
                alert('招聘信息已刷新到最前面');
            });
        }
    });

    // 响应式处理
    handleResponsive();
    window.addEventListener('resize', handleResponsive);
});

// 响应式处理函数
function handleResponsive() {
    const width = window.innerWidth;
    const sidebar = document.querySelector('.left-sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (width < 992) {
        sidebar.style.width = '60px';
        mainContent.style.marginLeft = '60px';
    } else {
        sidebar.style.width = '220px';
        mainContent.style.marginLeft = '220px';
    }
} 