// ============================================
// Personal Portfolio - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function () {
  initMobileNav();
  initActiveNav();
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



