// ═══════════════════════════════════════════════════════════
// progress.js — İlerleme takibi (localStorage)
// "Bu Bölümü Tamamladım" butonu, sidebar nav işaretleri, % bar
// ═══════════════════════════════════════════════════════════

const PROGRESS_KEY = 'unityakademi_progress';
const TOTAL_SECTIONS = 27; // 27 ana bölüm

const Progress = {
  getCompleted() {
    try {
      const data = localStorage.getItem(PROGRESS_KEY);
      const arr = data ? JSON.parse(data) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  },

  isCompleted(id) {
    return this.getCompleted().includes(id);
  },

  markCompleted(id) {
    const list = this.getCompleted();
    if (!list.includes(id)) {
      list.push(id);
      this._save(list);
    }
    this.updateUI();
  },

  unmarkCompleted(id) {
    const list = this.getCompleted().filter(x => x !== id);
    this._save(list);
    this.updateUI();
  },

  toggle(id) {
    if (this.isCompleted(id)) {
      this.unmarkCompleted(id);
      return false;
    } else {
      this.markCompleted(id);
      return true;
    }
  },

  reset() {
    if (confirm('Tüm ilerlemen silinecek. Emin misin?')) {
      localStorage.removeItem(PROGRESS_KEY);
      this.updateUI();
    }
  },

  _save(list) {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn('localStorage kayıt başarısız:', e);
    }
  },

  getPercent() {
    return Math.round((this.getCompleted().length / TOTAL_SECTIONS) * 100);
  },

  updateUI() {
    const completed = this.getCompleted();
    const percent = this.getPercent();
    const count = completed.length;

    // Progress bar
    const fill = document.getElementById('progress-fill');
    const value = document.getElementById('progress-value');
    if (fill) fill.style.width = percent + '%';
    if (value) value.textContent = `${count}/${TOTAL_SECTIONS}`;

    // Sidebar nav işaretleri (✓ ikon)
    document.querySelectorAll('.nav-link').forEach(link => {
      const id = link.dataset.section;
      if (id && completed.includes(id)) {
        link.classList.add('completed');
      } else {
        link.classList.remove('completed');
      }
    });

    // "Bu Bölümü Tamamladım" butonu (hem .complete-btn hem .btn-complete destekle)
    document.querySelectorAll('.complete-btn, .btn-complete').forEach(btn => {
      const id = btn.dataset.section;
      if (!id) return;
      if (completed.includes(id)) {
        btn.classList.add('completed', 'done');
        btn.innerHTML = '<i class="ti ti-check"></i> Bu Bölümü Tamamladın';
      } else {
        btn.classList.remove('completed', 'done');
        btn.innerHTML = '<i class="ti ti-flag-check"></i> Bu Bölümü Tamamladım';
      }
    });
  },

  _attachClickHandlers() {
    // Tüm complete butonlarına click handler bağla (idempotent)
    document.querySelectorAll('.complete-btn, .btn-complete').forEach(btn => {
      if (btn.dataset.attached === '1') return;
      btn.dataset.attached = '1';
      btn.addEventListener('click', () => {
        const id = btn.dataset.section;
        if (!id) return;
        const nowCompleted = this.toggle(id);
        if (nowCompleted) {
          // Küçük bir başarı animasyonu
          btn.classList.add('just-completed');
          setTimeout(() => btn.classList.remove('just-completed'), 1500);
        }
      });
    });
  }
};

window.Progress = Progress;

function initProgress() {
  Progress.updateUI();
  Progress._attachClickHandlers();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProgress);
} else {
  initProgress();
}
