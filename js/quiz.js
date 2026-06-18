// ═══════════════════════════════════════════════════════════
// quiz.js — Bölüm Sonu Sınavı (TEK STANDART YAPI)
// HTML:
//   <article class="quiz-question">
//     <div class="quiz-options">
//       <button class="quiz-option" data-correct="true|false">...</button>
//     </div>
//     <div class="quiz-explanation" hidden>...</div>
//   </article>
// ═══════════════════════════════════════════════════════════

(function() {
  'use strict';

  function init() {
    document.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', handleClick);
    });
  }

  function handleClick(e) {
    const btn = e.currentTarget;
    const question = btn.closest('.quiz-question');
    if (!question) return;

    if (question.classList.contains('answered')) return;

    const isCorrect = btn.dataset.correct === 'true';
    btn.classList.add(isCorrect ? 'correct' : 'wrong');

    // Yanlışsa doğru cevabı da göster
    if (!isCorrect) {
      const correct = question.querySelector('.quiz-option[data-correct="true"]');
      if (correct) correct.classList.add('correct');
    }

    // İşaretle ve disable et
    question.classList.add('answered', isCorrect ? 'is-correct' : 'is-wrong');
    question.querySelectorAll('.quiz-option').forEach(b => { b.disabled = true; });

    // Açıklamayı göster
    const exp = question.querySelector('.quiz-explanation');
    if (exp) {
      exp.removeAttribute('hidden');
      exp.classList.add('show');
    }

    // Tüm sorular cevaplandıysa özet ekle
    const allQs = document.querySelectorAll('.quiz-question');
    const answered = document.querySelectorAll('.quiz-question.answered');
    if (allQs.length > 0 && allQs.length === answered.length) {
      const correctCount = document.querySelectorAll('.quiz-question.is-correct').length;
      const quiz = document.querySelector('.quiz');
      if (quiz && !quiz.querySelector('.quiz-summary')) {
        const pct = Math.round((correctCount / allQs.length) * 100);
        let msg, cls, icon;
        if (pct === 100) { msg = 'Mükemmel! Tüm sorulara doğru cevap verdin.'; cls = 'perfect'; icon = 'trophy'; }
        else if (pct >= 60) { msg = `İyi iş! ${correctCount}/${allQs.length} doğru. Yanlışları gözden geçirip tekrar dene.`; cls = 'good'; icon = 'mood-smile'; }
        else { msg = `${correctCount}/${allQs.length} doğru. Bölümü bir kez daha okumanı öneririm.`; cls = 'low'; icon = 'book-2'; }

        const summary = document.createElement('div');
        summary.className = 'quiz-summary ' + cls;
        summary.innerHTML = `
          <div class="quiz-summary-icon"><i class="ti ti-${icon}"></i></div>
          <div class="quiz-summary-body">
            <div class="quiz-summary-score">${correctCount}/${allQs.length} doğru · %${pct}</div>
            <div class="quiz-summary-msg">${msg}</div>
          </div>
          <button class="quiz-summary-reset" type="button"><i class="ti ti-refresh"></i> Tekrar Çöz</button>
        `;
        quiz.appendChild(summary);
        summary.querySelector('.quiz-summary-reset').addEventListener('click', resetAll);
      }
    }
  }

  function resetAll() {
    document.querySelectorAll('.quiz-question').forEach(q => {
      q.classList.remove('answered', 'is-correct', 'is-wrong');
      q.querySelectorAll('.quiz-option').forEach(b => {
        b.disabled = false;
        b.classList.remove('correct', 'wrong');
      });
      const exp = q.querySelector('.quiz-explanation');
      if (exp) { exp.setAttribute('hidden', ''); exp.classList.remove('show'); }
    });
    const summary = document.querySelector('.quiz-summary');
    if (summary) summary.remove();
    const first = document.querySelector('.quiz-question');
    if (first) first.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
