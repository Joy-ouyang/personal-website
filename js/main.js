// ============================================
// Personal Portfolio - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function () {
  initMobileNav();
  initActiveNav();
  initProjectModal();
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

/* --- Project Detail Modal --- */
function initProjectModal() {
  var projectData = [
    {
      icon: '🧠',
      title: 'AI 赋能课程开发',
      description: '一个关于应用大语言AI模型去生成大纲，加速内容写作速度，并批量运用AI翻译/配音的项目。通过组合不同常见的功能，以较低的成本/较快的速度实现了400余门课程的开发与制作。最终人力工时节约+视频制作费用，实现约200W+经费节省。',
      tags: ['AI大语言模型', 'AI语音生成', 'Prompt提示技术', '赋能业务部门运用AI技术']
    },
    {
      icon: '📊',
      title: '人力实时Dashboard',
      description: '自学Fine BI，通过捞取人力数据库的实时数据借助BI独立开发可视化仪表盘。同时，看板支持多种数据源接入和自定义图表配置，具备可持续的开发延展性。现看板已正式上线，有效帮助领导/相关职能同时快速洞察人力变化趋势及异常情况，做出应对响应。',
      tags: ['Fine BI', '可视化仪表盘', '人力观测指标构建', '自主学习运用新工具']
    },
    {
      icon: '🛒',
      title: '印尼培训体系从0到1搭建',
      description: '负责印尼工厂首批赴中国种子选手培养，及印尼培训本地化建设。推动印尼在线学习平台建设上线，并与本地HR配合优化在线平台。同时主导入职培训、上岗培养等基础的员工培养课程/资料/标准体系在印尼的本地化，并成功培养印尼本地培训专员1位，为印尼工厂的运营提供了强有力的支持。',
      tags: ['海外培训体系搭建', '技能人才培养本地化', '在线学习平台建设及学习地图搭建', '赋能本地专员']
    },
    {
      icon: '🤖',
      title: '北美出海人员合规管理标准制定',
      description: '基于北美项目进展动态测算人力需求，助力工程师及专业技术人员出海前往项目支持。负责项目人员招募/签证办理/入境/在美合规/离境等全流程管理工作，并制定标准管理推行实施。通过宜搭低代码开发工具，联通Fine BI搭建看板，系统性监测出入境人员动向及滞留风险，保障了500余伙伴的顺利出海。',
      tags: ['人员出入境管理', '签证管理', '合规管理', '数智化工具运用']
    }
  ];

  var cards = document.querySelectorAll('.project-card');
  var overlay = document.getElementById('modalOverlay');
  var modal = document.getElementById('projectModal');
  var closeBtn = document.getElementById('modalClose');
  var modalIcon = document.getElementById('modalIcon');
  var modalTitle = document.getElementById('modalTitle');
  var modalDescription = document.getElementById('modalDescription');
  var modalTech = document.getElementById('modalTech');

  function openModal(index) {
    var data = projectData[index];
    if (!data) return;

    modalIcon.textContent = data.icon;
    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;

    modalTech.innerHTML = '';
    data.tags.forEach(function (tag) {
      var span = document.createElement('span');
      span.className = 'project-tag';
      span.textContent = tag;
      modalTech.appendChild(span);
    });

    overlay.classList.add('open');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('open');
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Click card to open
  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      var index = parseInt(this.getAttribute('data-project'));
      openModal(index);
    });
  });

  // Close button
  closeBtn.addEventListener('click', closeModal);

  // Click overlay to close
  overlay.addEventListener('click', closeModal);

  // ESC key to close
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
}
