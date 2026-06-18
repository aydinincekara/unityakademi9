// ═══════════════════════════════════════════════════════════
// toc.js — "Bu Sayfada" widget + Back to top
// Tüm bölüm yapılarını destekler:
//   • .topic-header (eski yapı: 01, 03, 04, 05)
//   • .topic-section (yeni yapı: 02, 26, 27 + ek sayfalar)
//   • h2.section-title (06-25 yapısı)
// ═══════════════════════════════════════════════════════════

(function() {
  'use strict';

  // ─── BACK TO TOP ─────────────────────────────────────────
  const backBtn = document.getElementById('back-to-top');
  if (backBtn) {
    function onScroll() {
      if (window.scrollY > 400) backBtn.classList.add('visible');
      else backBtn.classList.remove('visible');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─── TOC ENTRY'LERİNİ TOPLA ──────────────────────────────
  // Her entry: { id, label, el }
  const entries = [];
  let autoId = 0;
  function nextId(prefix) { return prefix + '-' + (++autoId); }

  // 1) Eski yapı: .topic-header > .topic-number + .topic-title
  document.querySelectorAll('.topic-header').forEach(header => {
    const num = header.querySelector('.topic-number, .topic-num');
    const titleEl = header.querySelector('.topic-title');
    if (!titleEl) return;
    const numText = num ? num.textContent.trim().replace(/\./g, '-') : '';
    const id = header.id || ('t-' + (numText || nextId('h')));
    header.id = id;
    const label = (num ? num.textContent.trim() + ' ' : '') + titleEl.textContent.trim().replace(/^\d+\.\d+\s*/, "");
    entries.push({ id, label, el: header });
  });

  // 2) Yeni yapı: section.topic-section
  document.querySelectorAll('section.topic-section').forEach(section => {
    // Önceki yapıyı tekrarla yakalamadığımızdan emin ol
    if (section.querySelector('.topic-header')) return;
    const marker = section.querySelector('.topic-marker');
    const titleEl = section.querySelector('.topic-title') || section.querySelector('h2');
    if (!titleEl) return;
    const markerText = marker ? marker.textContent.trim() : '';
    const id = section.id || ('t-' + (markerText.replace(/\./g, '-') || nextId('s')));
    section.id = id;
    const titleText = titleEl.textContent.trim().replace(/^\d+\.\d+\s*/, "");
    // İkon karakterlerini sadeleştir (ilk emoji'yi koru)
    const label = (markerText ? markerText + ' ' : '') + titleText;
    entries.push({ id, label, el: section });
  });

  // 3) 06-25 yapısı: h2.section-title (section veya div içinde)
  document.querySelectorAll('h2.section-title').forEach(h2 => {
    const num = h2.querySelector('.section-num');
    // .topic-header gibi diğer yapılarda yakalananı atla
    if (h2.closest('.topic-header') || h2.closest('section.topic-section')) return;
    const id = h2.id || ('t-' + nextId('sn'));
    h2.id = id;
    const numText = num ? num.textContent.trim() : '';
    const titleText = h2.textContent.replace(num ? num.textContent : '', '').trim();
    const label = (numText ? numText + '. ' : '') + titleText;
    entries.push({ id, label, el: h2 });
  });

  // En az 2 başlık varsa TOC oluştur
  if (entries.length < 2) return;

  // ─── TOC WIDGET'INI OLUŞTUR ──────────────────────────────
  const toc = document.createElement('aside');
  toc.className = 'toc-widget';
  toc.setAttribute('aria-label', 'İçindekiler');
  let html = '<div class="toc-widget-title"><i class="ti ti-list"></i> Bu sayfada</div><ul class="toc-widget-list">';
  entries.forEach(e => {
    html += '<li><a href="#' + e.id + '" data-target="' + e.id + '">' + escapeHtml(e.label) + '</a></li>';
  });
  html += '</ul>';
  toc.innerHTML = html;
  document.body.appendChild(toc);

  // ─── AKTİF ÖĞE TAKİBİ (IntersectionObserver) ─────────────
  const tocLinks = toc.querySelectorAll('a');
  const observer = new IntersectionObserver(entriesIO => {
    entriesIO.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tocLinks.forEach(l => l.classList.toggle('active', l.dataset.target === id));
      }
    });
  }, { rootMargin: '-100px 0px -60% 0px' });
  entries.forEach(e => observer.observe(e.el));

  // ─── SMOOTH SCROLL ───────────────────────────────────────
  tocLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.getElementById(this.dataset.target);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', '#' + this.dataset.target);
      }
    });
  });

  // ── Sandwich toggle (dar ekranda "Bu Sayfada"ya erişim) ──
  const tocToggle = document.createElement('button');
  tocToggle.className = 'toc-toggle';
  tocToggle.setAttribute('aria-label', 'Bu sayfada — içindekiler');
  tocToggle.innerHTML = '<i class="ti ti-list-search"></i>';
  document.body.appendChild(tocToggle);

  tocToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toc.classList.toggle('open');
    tocToggle.classList.toggle('active');
  });
  // Bir bağlantıya tıklayınca kapan
  toc.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    toc.classList.remove('open');
    tocToggle.classList.remove('active');
  }));
  // Dışına tıklayınca kapan
  document.addEventListener('click', (e) => {
    if (!toc.contains(e.target) && !tocToggle.contains(e.target)) {
      toc.classList.remove('open');
      tocToggle.classList.remove('active');
    }
  });

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, c => ({
      '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
    }[c]));
  }
})();
