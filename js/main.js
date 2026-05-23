// ============================================
// Personal Portfolio - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function () {
  initMobileNav();
  initActiveNav();
  initContactForm();
});

/* --- Mobile Navigation Toggle --- */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', function () {
    this.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      toggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', function (e) {
    if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
      toggle.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });
}

/* --- Active Nav Highlight (单页锚点) --- */
function initActiveNav() {
  var currentHash = window.location.hash || '#home';

  function updateActive(hash) {
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === hash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  updateActive(currentHash);

  // 点击导航时更新活跃状态
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      updateActive(this.getAttribute('href'));
    });
  });

  // 滚动时自动高亮当前区域
  var sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', function () {
    var scrollPos = window.scrollY + 100;
    var current = '#home';
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollPos) {
        current = '#' + sec.getAttribute('id');
      }
    });
    updateActive(current);
  });
}

/* --- Contact Form Validation --- */
function initContactForm() {
  var form = document.getElementById('contactForm');
  if (!form) return;

  var nameInput = document.getElementById('name');
  var emailInput = document.getElementById('email');
  var subjectInput = document.getElementById('subject');
  var messageInput = document.getElementById('message');
  var successMessage = document.getElementById('formSuccess');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var isValid = true;

    // Validate name
    if (!nameInput.value.trim()) {
      showError(nameInput, '请输入您的姓名');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Validate email
    if (!emailInput.value.trim()) {
      showError(emailInput, '请输入邮箱地址');
      isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, '请输入有效的邮箱地址');
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Validate subject
    if (!subjectInput.value.trim()) {
      showError(subjectInput, '请输入主题');
      isValid = false;
    } else {
      clearError(subjectInput);
    }

    // Validate message
    if (!messageInput.value.trim()) {
      showError(messageInput, '请输入您的消息');
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      showError(messageInput, '消息内容至少10个字符');
      isValid = false;
    } else {
      clearError(messageInput);
    }

    // If valid, submit
    if (isValid) {
      // Show loading state
      var submitBtn = form.querySelector('.form-submit');
      var originalText = submitBtn.textContent;
      submitBtn.textContent = '发送中...';
      submitBtn.disabled = true;

      // Netlify form submission
      var formData = new FormData(form);

      fetch('/', {
        method: 'POST',
        headers: { 'Accept': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
      .then(function (response) {
        if (response.ok) {
          form.reset();
          form.style.display = 'none';
          successMessage.classList.add('visible');
        } else {
          alert('发送失败，请稍后再试。');
        }
      })
      .catch(function () {
        alert('网络错误，请稍后再试。');
      })
      .finally(function () {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
    }
  });

  // Real-time validation on input
  [nameInput, emailInput, subjectInput, messageInput].forEach(function (input) {
    if (!input) return;
    input.addEventListener('input', function () {
      if (this.classList.contains('error') && this.value.trim()) {
        clearError(this);
      }
    });
  });
}

/* --- Helper Functions --- */
function showError(input, message) {
  input.classList.add('error');
  var errorEl = input.parentElement.querySelector('.form-error');
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add('visible');
  }
}

function clearError(input) {
  input.classList.remove('error');
  var errorEl = input.parentElement.querySelector('.form-error');
  if (errorEl) {
    errorEl.classList.remove('visible');
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


