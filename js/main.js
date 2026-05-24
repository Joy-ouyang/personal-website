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
      icon: '🧬',
      title: 'AI 赋能课程开发',
      background: '海外新工厂建设在即，如何快速培育本地人才助力运营？成了亟需解决的问题。在确定关键岗位核心能力要求后及业务需求时间后，要快速开发大量课程用于构建系统化学习地图，助力本地人才培养，传统人工开发模式耗时长、成本高，难以满足业务急切需求，因而探索利用AI技术提升课程开发效率的可行路径。',
      task: '应用大语言AI模型自动生成课程大纲，加速内容写作；批量运用AI翻译和AI语音合成，完成英文课程制作。通过组合多种AI能力，以最低成本和最快速度实现规模化课程产出。',
      effect: '成功实现400余门课程的快速开发与制作，累计节约人力工时及视频制作费用约200W+，大幅提升了交付效率。<br><br>关于AI应用的思考：<a href="https://zhuanlan.zhihu.com/p/2041869543098902220" target="_blank" rel="noopener">知乎文章链接</a>',
      tags: ['AI大语言模型', 'AI语音生成', 'Prompt提示技术', '赋能业务部门运用AI技术']
    },
    {
      icon: '📊',
      title: '人力实时Dashboard',
      background: '当前人力数据及指标分散在多个系统中，管理层无法实时掌握人力变化趋势，决策依赖人工汇总报表，效率低且易滞后。',
      task: '自学Fine BI工具，从数据库实时捞取分布于不同系统的多维度人力数据，独立设计并开发可视化仪表盘。支持多数据源接入和自定义图表配置，确保看板具备良好的扩展性。',
      effect: 'Dashboard已正式上线，帮助管理层及相关职能快速洞察人力变化趋势及异常情况，及时做出应对响应，显著提升了人力数据驱动的决策效率。',
      tags: ['Fine BI', '可视化仪表盘', '人力观测指标构建', '自主学习运用新工具'],
      image: 'dashboard-case.jpg',
      imageCaption: 'Dashboard 效果参考，源自其他个人练习项目'
    },
    {
      icon: '🏗️',
      title: '印尼培训体系从0到1搭建',
      background: '印尼工厂投产在即，本地员工入职后的培养体系尚未形成，急需建立完整的本地培训体系以保障工厂运营。',
      task: '负责印尼工厂首批赴中国种子选手的培养，推动印尼在线学习平台的建设与上线。主导入职培训、上岗培养等基础课程/资料/标准体系在印尼的本地化，并培养本地培训专员。',
      effect: '成功搭建印尼本地培训体系，并培养印尼本地培训专员，为印尼工厂运营提供了强有力的人才支持和保障。',
      tags: ['海外培训体系搭建', '技能人才培养本地化', '在线学习平台建设及学习地图搭建', '赋能本地专员']
    },
    {
      icon: '🤖',
      title: '北美出海人员合规管理标准制定',
      background: '北美项目进展需要大量工程师及专业技术人员出海支持，人员出入境涉及签证、合规等多环节，管理复杂度高、风险大。',
      task: '基于项目进展动态测算人力需求，统筹人员招募/签证办理/入境/在美合规/离境全流程管理。并利用宜搭低代码工具搭建填报入口。并结合Fine BI搭建捞取填报数据建立看板，系统性监测人员动向及滞留风险。',
      effect: '制定并推行了标准管理流程，保障了500余位伙伴顺利出海，有效控制了合规风险，提升了人员出入境管理效率。',
      tags: ['人员出入境管理', '签证管理', '合规管理', '数智化工具运用']
    }
  ];

  var cards = document.querySelectorAll('.project-card');
  var overlay = document.getElementById('modalOverlay');
  var modal = document.getElementById('projectModal');
  var closeBtn = document.getElementById('modalClose');
  var modalIcon = document.getElementById('modalIcon');
  var modalTitle = document.getElementById('modalTitle');
  var modalBackground = document.getElementById('modalBackground');
  var modalTask = document.getElementById('modalTask');
  var modalEffect = document.getElementById('modalEffect');
  var modalTech = document.getElementById('modalTech');
  var modalImageWrap = document.getElementById('modalImageWrap');
  var modalImage = document.getElementById('modalImage');
  var modalImageCaption = document.getElementById('modalImageCaption');

  function openModal(index) {
    var data = projectData[index];
    if (!data) return;

    modalIcon.textContent = data.icon;
    modalTitle.textContent = data.title;
    modalBackground.textContent = data.background;
    modalTask.textContent = data.task;
    modalEffect.innerHTML = data.effect;

    // 案例图片
    if (data.image) {
      modalImage.src = './assets/images/' + data.image;
      modalImageCaption.textContent = data.imageCaption || '';
      modalImageWrap.classList.add('show');
    } else {
      modalImageWrap.classList.remove('show');
    }

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
