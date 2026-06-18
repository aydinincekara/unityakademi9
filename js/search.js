// UnityAkademi — Site içi arama motoru

const SEARCH_INDEX = [
  // TEMELLER
  { id:'s1', num:'01', cat:'Temeller', title:'Kurulum & İlk Bakış', href:'01-kurulum.html', icon:'ti-download',
    keywords:'kurulum install unity hub indirme yükleme proje açma başlangıç ilk adım editor version 2022.3 lts unity 6 ücretsiz personal license' },
  { id:'s2', num:'02', cat:'Temeller', title:'Editor Arayüzü', href:'02-arayuz.html', icon:'ti-layout-board',
    keywords:'arayüz editor scene game hierarchy inspector project console panel layout window interface ui pencere' },
  { id:'s3', num:'03', cat:'Temeller', title:'GameObject & Component', href:'03-gameobject-component.html', icon:'ti-cube',
    keywords:'gameobject go component bileşen transform prefab nesne hierarchy parent child entity composition' },
  { id:'s4', num:'04', cat:'Temeller', title:'C# Temelleri', href:'04-csharp-temelleri.html', icon:'ti-code',
    keywords:'c# csharp programlama syntax variable değişken int float string bool class sınıf metod fonksiyon if for while switch namespace using' },
  { id:'s5', num:'05', cat:'Temeller', title:'MonoBehaviour Lifecycle', href:'05-monobehaviour-lifecycle.html', icon:'ti-cycle',
    keywords:'monobehaviour mb awake start update fixedupdate lateupdate onenable ondisable ondestroy yaşam döngüsü callback event' },
  { id:'s6', num:'06', cat:'Temeller', title:'Transform & Vector3', href:'06-transform-vector.html', icon:'ti-arrows-move',
    keywords:'transform position rotation scale vector3 quaternion translate rotate local world hareket konum yön dönüş' },
  { id:'s7', num:'07', cat:'Temeller', title:'Input Sistemi', href:'07-input.html', icon:'ti-keyboard',
    keywords:'input getkey getaxis getbutton mouse touch giriş klavye fare dokunmatik kontrolör legacy old' },
  { id:'s8', num:'08', cat:'Temeller', title:'Physics', href:'08-physics.html', icon:'ti-atom',
    keywords:'physics fizik rigidbody collider trigger oncollisionenter ontriggerenter raycast layer fizik motoru kuvvet force gravity yerçekimi' },
  { id:'s9', num:'09', cat:'Temeller', title:'UI Sistemi', href:'09-ui.html', icon:'ti-layout-grid',
    keywords:'ui canvas image button text tmp textmeshpro panel layout group rect transform anchor pivot ugui ui toolkit' },

  // GÖRSEL & ASSET
  { id:'s10', num:'10', cat:'Görsel & Asset', title:'Material & Shader', href:'10-material-shader.html', icon:'ti-palette',
    keywords:'material shader urp universal render pipeline lit unlit pbr metallic roughness albedo normal emission shader graph' },
  { id:'s11', num:'11', cat:'Görsel & Asset', title:'Asset Import', href:'11-asset-import.html', icon:'ti-folder',
    keywords:'asset import fbx png jpg texture model mesh prefab folder klasör hierarchy meta dosya yönetim addressables' },
  { id:'s12', num:'12', cat:'Görsel & Asset', title:'Animation', href:'12-animation.html', icon:'ti-bounce-right',
    keywords:'animation animator state machine clip avatar humanoid mecanim transition parameter blend tree animasyon' },
  { id:'s13', num:'13', cat:'Görsel & Asset', title:'Particle & VFX Graph', href:'13-particle-vfx.html', icon:'ti-sparkles',
    keywords:'particle system vfx graph efekt patlama duman ateş magic burst gpu particle emitter shuriken visual effect' },
  { id:'s14', num:'14', cat:'Görsel & Asset', title:'Lighting', href:'14-lighting.html', icon:'ti-bulb',
    keywords:'light directional point spot area baked realtime mixed gi global illumination probe lightmap reflection işık' },
  { id:'s15', num:'15', cat:'Görsel & Asset', title:'Audio', href:'15-audio.html', icon:'ti-volume',
    keywords:'audio source listener clip mixer 3d sound mono stereo ses müzik müzik ambient sfx ducking spatial' },

  // SİSTEMLER
  { id:'s16', num:'16', cat:'Sistemler', title:'ProBuilder', href:'16-probuilder.html', icon:'ti-3d-cube-sphere',
    keywords:'probuilder mesh editing prototyping cube cylinder geometri vertex edge face extrude bevel level design' },
  { id:'s17', num:'17', cat:'Sistemler', title:'Terrain', href:'17-terrain.html', icon:'ti-mountain',
    keywords:'terrain manzara heightmap brush paint texture tree foliage grass arazi tepe dağ vadiler ekosistem' },
  { id:'s18', num:'18', cat:'Sistemler', title:'Cinemachine', href:'18-cinemachine.html', icon:'ti-camera',
    keywords:'cinemachine virtual camera vcam free look 3rd person follow body aim noise confiner blender kamera sistemi' },
  { id:'s19', num:'19', cat:'Sistemler', title:'Timeline', href:'19-timeline.html', icon:'ti-timeline',
    keywords:'timeline cinematic cutscene track animation playable director clip sahne kesim sinematik' },
  { id:'s20', num:'20', cat:'Sistemler', title:'NavMesh & AI', href:'20-navmesh.html', icon:'ti-route',
    keywords:'navmesh navigation agent bake obstacle path finding ai yapay zeka düşman pathfinding hareket' },

  // İLERİ SEVİYE
  { id:'s21', num:'21', cat:'İleri Seviye', title:'URP, HDRP & Unity 6', href:'21-urp-hdrp.html', icon:'ti-bolt',
    keywords:'urp hdrp built-in render pipeline gpu resident drawer render graph unity 6 post processing volume scriptable' },
  { id:'s22', num:'22', cat:'İleri Seviye', title:'New Input System', href:'22-new-input.html', icon:'ti-device-gamepad-2',
    keywords:'new input system action asset binding callback player input action map gamepad keyboard touch eylem' },
  { id:'s23', num:'23', cat:'İleri Seviye', title:'Save & Menü', href:'23-save-menu.html', icon:'ti-device-floppy',
    keywords:'save kaydet playerprefs json serialization scriptableobject menü main menu pause level select kayıt yükleme' },
  { id:'s24', num:'24', cat:'İleri Seviye', title:'Build & Yayınlama', href:'24-build.html', icon:'ti-package-export',
    keywords:'build profiles player settings windows webgl android ios platform yayınlama derleme paket il2cpp mono' },

  // PROFESYONEL
  { id:'s25', num:'25', cat:'Profesyonel', title:'C# İleri', href:'25-csharp-ileri.html', icon:'ti-brackets-contain',
    keywords:'coroutine event delegate action func scriptable object so generic interface abstract async await task' },
  { id:'s26', num:'26', cat:'Profesyonel', title:'Performance', href:'26-performance.html', icon:'ti-gauge',
    keywords:'performance profiler memory draw call batching gc garbage collection optimizasyon optimization frame rate fps' },
  { id:'s27', num:'27', cat:'Profesyonel', title:'Yol Haritası', href:'27-yol-haritasi.html', icon:'ti-map-2',
    keywords:'yol haritası roadmap asset store github topluluk discord öğrenme kariyer freelance sertifikasyon' },

  // EK KAYNAKLAR
  { id:'x-projects', cat:'Pratik', title:'Projeler', href:'projects.html', icon:'ti-rocket',
    keywords:'proje project pratik antreman antrenman roll-a-ball pong breakout endless runner tower defense platformer survival inventory vr ar arduino mobil 40 proje seviye kategori temel orta gelişmiş entegre' },
  { id:'x-sozluk', cat:'Ek Kaynaklar', title:'Sözlük', href:'sozluk.html', icon:'ti-book-2',
    keywords:'sözlük dictionary terim glossary gameobject prefab scriptableobject unity 6 monobehaviour görsel programlama' },
  { id:'x-cheatsheet', cat:'Ek Kaynaklar', title:'Cheat Sheet', href:'cheatsheet.html', icon:'ti-list-details',
    keywords:'cheat sheet hızlı başvuru kısayollar shortcuts monobehaviour callback api naming convention prefix' },
  { id:'x-sss', cat:'Ek Kaynaklar', title:'SSS', href:'sss.html', icon:'ti-help-circle',
    keywords:'sss sık sorulan sorular faq pc seçimi unity mi unreal mi urp hdrp asset store ücretsiz ticari' },
  { id:'x-arama', cat:'Ek Kaynaklar', title:'Arama', href:'arama.html', icon:'ti-search',
    keywords:'arama search bul find indeks index site içi anahtar kelime' },
  { id:'x-sertifika', cat:'Ek Kaynaklar', title:'Sertifika', href:'sertifika.html', icon:'ti-certificate',
    keywords:'sertifika certificate pdf tamamlanma diploma başarı belge ad isim tarih' },
  { id:'x-kaynaklar', cat:'Ek Kaynaklar', title:'Kaynaklar', href:'kaynaklar.html', icon:'ti-books',
    keywords:'kaynaklar resources dış kaynak unity docs documentation youtube discord asset store github topluluk' },
  { id:'x-iletisim', cat:'Ek Kaynaklar', title:'İletişim', href:'iletisim.html', icon:'ti-mail',
    keywords:'iletişim contact email sosyal medya twitter github destek geribildirim' },
  { id:'x-hakkinda', cat:'Ek Kaynaklar', title:'Hakkında', href:'hakkinda.html', icon:'ti-info-circle',
    keywords:'hakkında about misyon vizyon lisans license proje history' },
];

function normalize(s) {
  return (s || '').toLowerCase()
    .replace(/ı/g, 'i').replace(/İ/g, 'i')
    .replace(/ş/g, 's').replace(/Ş/g, 's')
    .replace(/ğ/g, 'g').replace(/Ğ/g, 'g')
    .replace(/ü/g, 'u').replace(/Ü/g, 'u')
    .replace(/ö/g, 'o').replace(/Ö/g, 'o')
    .replace(/ç/g, 'c').replace(/Ç/g, 'c');
}

function search(query) {
  const q = normalize(query.trim());
  if (!q) return [];
  const words = q.split(/\s+/).filter(w => w.length > 0);
  if (words.length === 0) return [];

  return SEARCH_INDEX.map(item => {
    const haystack = normalize(`${item.title} ${item.cat} ${item.keywords}`);
    const titleN = normalize(item.title);
    let score = 0;
    for (const w of words) {
      if (!haystack.includes(w)) return null;
      score += 1;
      if (titleN.includes(w)) score += 3;
      if (titleN.startsWith(w)) score += 2;
    }
    return { ...item, score };
  }).filter(Boolean).sort((a, b) => b.score - a.score);
}

function highlight(text, query) {
  const words = normalize(query.trim()).split(/\s+/).filter(w => w.length > 0);
  if (words.length === 0) return text;
  let out = text;
  for (const w of words) {
    const re = new RegExp(`(${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    out = out.replace(re, '<mark>$1</mark>');
  }
  return out;
}

function renderResults(results, query) {
  const box = document.getElementById('search-results');
  if (!box) return;

  if (!query || query.length === 0) {
    box.innerHTML = '<div class="search-empty"><i class="ti ti-search" style="font-size: 48px; color: var(--text-tertiary);"></i><p>Aramaya başla — anahtar kelime, bölüm adı veya kavram yaz.</p></div>';
    return;
  }

  if (results.length === 0) {
    box.innerHTML = `<div class="search-empty"><i class="ti ti-mood-empty" style="font-size: 48px; color: var(--text-tertiary);"></i><p>"<strong>${query}</strong>" için sonuç yok. Farklı bir kelime deneyebilir veya <a href="sozluk.html" style="color: var(--accent);">sözlüğe</a> bakabilirsin.</p></div>`;
    return;
  }

  box.innerHTML = results.map(r => `
    <a href="${r.href}" class="search-result">
      <div class="search-result-icon"><i class="ti ${r.icon}"></i></div>
      <div class="search-result-body">
        <div class="search-result-cat">${r.num ? r.num + ' · ' : ''}${r.cat}</div>
        <div class="search-result-title">${highlight(r.title, query)}</div>
        <div class="search-result-href">${r.href}</div>
      </div>
      <div class="search-result-arrow"><i class="ti ti-arrow-right"></i></div>
    </a>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('site-search-input');
  if (!input) return;

  const clearBtn = document.getElementById('search-box-clear');
  function toggleClearBtn() {
    if (!clearBtn) return;
    clearBtn.hidden = !input.value;
  }

  let timer;
  input.addEventListener('input', (e) => {
    clearTimeout(timer);
    toggleClearBtn();
    const q = e.target.value;
    timer = setTimeout(() => {
      renderResults(search(q), q);
    }, 100);
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      toggleClearBtn();
      renderResults([], '');
      input.focus();
    });
  }

  const params = new URLSearchParams(window.location.search);
  const qparam = params.get('q');
  if (qparam) {
    input.value = qparam;
    toggleClearBtn();
    renderResults(search(qparam), qparam);
  } else {
    renderResults([], '');
  }

  toggleClearBtn();
  input.focus();
});
