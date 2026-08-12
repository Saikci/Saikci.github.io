// 滚动到指定区域
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// 导航栏滚动效果
let lastScrollY = window.scrollY;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // 滚动时改变导航栏样式
    if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
});

// 移动端菜单切换
const hamburger = document.getElementById('hamburger');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
    });
}

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
        
        // 关闭移动端菜单
        if (hamburger) {
            hamburger.classList.remove('active');
            document.querySelector('.nav-links')?.classList.remove('active');
        }
    });
});

// 数字动画效果
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2秒
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateNumber = () => {
            current += step;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = target;
            }
        };
        
        updateNumber();
    });
}

// Intersection Observer 用于滚动触发动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // 如果是关于部分，触发数字动画
            if (entry.target.id === 'about') {
                animateNumbers();
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 观察所有需要淡入的部分
document.querySelectorAll('.fade-section').forEach(section => {
    observer.observe(section);
});

// 打字机效果
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let index = 0;
    
    const typeWriter = () => {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // 延迟开始打字效果
    setTimeout(typeWriter, 500);
}

// 表单提交处理
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        
        // 模拟发送成功
        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = '发送中...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert(`谢谢 ${name}！消息已发送，我会尽快回复你。`);
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// 卡片悬停效果增强
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// 技能标签动画
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
    tag.classList.add('fade-in');
});

// 页面加载完成后的初始化
window.addEventListener('load', () => {
    // 添加页面加载动画
    document.body.classList.add('loaded');
    
    // 检查是否在视口中的元素
    document.querySelectorAll('.fade-section').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            section.classList.add('visible');
        }
    });
});

// 性能优化：使用 requestAnimationFrame 处理滚动事件
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            ticking = false;
        });
        ticking = true;
    }
});

console.log('🚀 Saikci 个人网站已加载完成！');
