const defaultPlayersData = {
  'iten011': { name: 'إيتن فتحي', points: 15, absences: 0, rank: 1, password: 'iten011' },
  'adam002': { name: 'آدم هاني', points: 14, absences: 1, rank: 2, password: 'adam002' },
  'mohamedsaid021': { name: 'محمد سعيد', points: 13, absences: 0, rank: 3, password: 'mohamedsaid021' },
  'farah013': { name: 'فرح عادل', points: 12, absences: 0, rank: 4, password: 'farah013' },
  'Basma0026': { name: 'بسمه اشرف ', points: 12, absences: 1, rank: 5, password: 'Basma0026' },
  'Afnan022': { name: 'أفنان عادل', points: 11, absences: 0, rank: 6, password: 'Afnan022' },
  'mohamed012': { name: 'محمد عبد التام', points: 11, absences: 0, rank: 7, password: 'mohamed012' },
  'Elsaed025': { name: 'السيد امام', points: 11, absences: 0, rank: 8, password: 'Elsaed025' },
  'yasen000': { name: 'ياسين احمد', points: 11, absences: 0, rank: 9, password: 'yasen000' },
  'remas009': { name: 'ريماس طارق', points: 11, absences: 1, rank: 10, password: 'remas009' },
  'malak010': { name: 'ملك محمود السيد', points: 10, absences: 0, rank: 11, password: 'malak010' },
  'retag004': { name: 'ريتاج أحمد', points: 10, absences: 1, rank: 12, password: 'retag004' },
  'sama016': { name: 'سما وليد', points: 10, absences: 0, rank: 13, password: 'sama016' },
  'nada014': { name: 'ندى أنور', points: 10, absences: 1, rank: 14, password: 'nada014' },
  'noreen015': { name: 'نورين محمود', points: 10, absences: 1, rank: 15, password: 'noreen015' },
  'taha019': { name: 'طه إسلام طه', points: 10, absences: 1, rank: 16, password: 'taha019' },
  'nelly018': { name: 'نيللي محمود', points: 10, absences: 1, rank: 17, password: 'nelly018' },
  'adel020': { name: 'عادل صبري', points: 10, absences: 3, rank: 18, password: 'adel020' },
  'login001': { name: 'لوجين أحمد', points: 9, absences: 3, rank: 19, password: 'login001' },
  'omar005': { name: 'عمر عادل', points: 8, absences: 3, rank: 20, password: 'omar005' },
  'ahmed003': { name: 'أحمد عطية', points: 7, absences: 1, rank: 21, password: 'ahmed003' },
  'Malak0270': { name: 'ملك احمد', points: 6, absences: 5, rank: 22, password: 'Malak0270' },
  'retag006': { name: 'ريتاج محمود', points: 3, absences: 3, rank: 23, password: 'retag006' },
  'judy007': { name: 'جودي محمود', points: 3, absences: 3, rank: 24, password: 'judy007' },
  'Hanen787': { name: 'حنين شوقى', points: 3, absences: 3, rank: 25, password: 'Hanen787' },
  'malak008': { name: 'ملك أيمن', points: 3, absences: 5, rank: 26, password: 'malak008' },
  'rodina017': { name: 'رودينا إسلام', points: 1, absences: 4, rank: 27, password: 'rodina017' },
  'Adam0028': { name: 'ادم عمرو', points: 0, absences: 5, rank: 28, password: 'Adam0028' },
  'Belal': { name: 'بلال محمد', points: 0, absences: 0, rank: 0, isAdmin: true, password: 'Belal' }
};

// استخدام البيانات الافتراضية
let playersData = defaultPlayersData;
let currentPlayer = null;

// إنشاء قناة BroadcastChannel للمزامنة الفورية
const broadcastChannel = new BroadcastChannel('karate-club-updates');

// الاستماع للتحديثات من النوافذ الأخرى
broadcastChannel.onmessage = function(event) {
  const data = event.data;
  if (data.type === 'update' && currentPlayer && data.playerId === currentPlayer.password) {
    // تحديث البيانات المحلية
    currentPlayer.points = data.points;
    currentPlayer.absences = data.absences;
    if (data.rank !== undefined) {
      currentPlayer.rank = data.rank;
    }

    // تحديث واجهة المستخدم
    document.getElementById('playerPoints').textContent = currentPlayer.points;
    document.getElementById('playerAbsences').textContent = currentPlayer.absences;
    if (data.rank !== undefined) {
      document.getElementById('playerRank').textContent = currentPlayer.rank;
    }
    updateProgressBars();
  }
};

// تهيئة الجسيمات في الخلفية مع إعدادات متقدمة
document.addEventListener('DOMContentLoaded', function() {
  particlesJS('particles-js', {
    particles: {
      number: {
        value: 60,
        density: {
          enable: true,
          value_area: 1000
        }
      },
      color: {
        value: ["#ffffff", "#3b82f6", "#1e3a8a", "#f97316"]
      },
      shape: {
        type: ["circle", "triangle", "polygon"],
        stroke: {
          width: 0,
          color: "#000000"
        },
        polygon: {
          nb_sides: 6
        }
      },
      opacity: {
        value: 0.6,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 4,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.5,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 120,
        color: "#ffffff",
        opacity: 0.3,
        width: 1,
        shadow: {
          enable: true,
          color: "#ffffff",
          blur: 5
        }
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "bounce",
        bounce: false,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: ["grab", "bubble"]
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 0.8
          }
        },
        bubble: {
          distance: 200,
          size: 6,
          duration: 2,
          opacity: 0.8,
          speed: 3
        },
        repulse: {
          distance: 200,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
  });

  // إضافة عناصر عائمة إضافية للخلفية
  createFloatingElements();

  // إضافة تأثير للعناصر عند التحميل
  const inputGroup = document.querySelector('.input-group');
  setTimeout(() => {
    inputGroup.classList.add('animate__fadeInUp');
  }, 300);
});

// إنشاء عناصر عائمة إضافية للخلفية
function createFloatingElements() {
  const container = document.querySelector('.particles-container');
  const elements = ['◯', '△', '□', '◇', '☆', '⬡', '✦', '✧', '◆', '●'];

  // إنشاء الموجة الأولى من العناصر
  for (let i = 0; i < 20; i++) {
    const element = document.createElement('div');
    element.className = 'floating-element';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * 100 + '%';
    element.style.top = Math.random() * 100 + '%';
    element.style.animationDelay = Math.random() * 15 + 's';
    element.style.animationDuration = (Math.random() * 25 + 25) + 's';
    element.style.fontSize = (Math.random() * 20 + 15) + 'px';
    element.style.opacity = (Math.random() * 0.3 + 0.1);
    container.appendChild(element);
  }

  // إنشاء موجة ثانية من العناصر الأكبر
  for (let i = 0; i < 8; i++) {
    const element = document.createElement('div');
    element.className = 'floating-element-large';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * 100 + '%';
    element.style.top = Math.random() * 100 + '%';
    element.style.animationDelay = Math.random() * 20 + 's';
    element.style.animationDuration = (Math.random() * 30 + 40) + 's';
    container.appendChild(element);
  }

  // إنشاء خطوط متموجة
  for (let i = 0; i < 5; i++) {
    const wave = document.createElement('div');
    wave.className = 'wave-line';
    wave.style.left = Math.random() * 100 + '%';
    wave.style.animationDelay = Math.random() * 10 + 's';
    wave.style.animationDuration = (Math.random() * 15 + 20) + 's';
    container.appendChild(wave);
  }
}

// تسجيل الدخول
function login() {
  const inputPassword = document.getElementById('playerPassword').value.trim();

  // البحث عن اللاعب بكلمة المرور
  let foundPlayer = null;
  let playerId = null;

  for (const [id, player] of Object.entries(playersData)) {
    if (player.password === inputPassword) {
      foundPlayer = player;
      playerId = id;
      break;
    }
  }

  if (foundPlayer) {
    currentPlayer = foundPlayer; // حفظ اللاعب الحالي

    // التحقق من كلمة المرور للمدربين
    if (foundPlayer.isAdmin) {
      // إعادة توجيه بلال إلى صفحة المدرب المنفصلة
      if (playerId === 'Belal') {
        window.location.href = 'admin.html';
        return;
      }
    }

    // إخفاء شاشة الدخول بتأثير
    const loginCard = document.getElementById('loginCard');
    loginCard.classList.add('animate__fadeOut');

    setTimeout(() => {
      loginCard.style.display = 'none';

      // تعبئة بيانات اللاعب
      document.getElementById('playerName').textContent = foundPlayer.name;
      document.getElementById('playerPoints').textContent = foundPlayer.points;
      document.getElementById('playerAbsences').textContent = foundPlayer.absences;

      // استخدام الرتبة المخزنة بدلاً من حسابها ديناميكيًا
      document.getElementById('playerRank').textContent = foundPlayer.rank;

      // إذا كان المدرب أو المسؤول
      if (foundPlayer.isAdmin) {
        showAllPlayersStats();
      } else {
        // عرض شاشة الملف الشخصي العادية بتأثير
        const profileCard = document.getElementById('profileCard');
        profileCard.style.display = 'block';
        profileCard.classList.add('animate__fadeIn');

        // تحريك العناصر بشكل متتابع
        animateElements([
          '.profile-header',
          '.stats-container',
          '.progress-container',
          '.quick-actions',
          '.resources-section',
          '.logout-btn'
        ]);
      }

      // تحديث شريط التقدم
      updateProgressBars();
    }, 300);
  } else {
    showModal('خطأ', 'كلمة المرور غير صحيحة، يرجى المحاولة مرة أخرى', 'error');
  }
}

// عرض إحصائيات جميع اللاعبين للمدربين
function showAllPlayersStats() {
  const profileCard = document.getElementById('profileCard');
  profileCard.style.display = 'block';
  profileCard.classList.add('animate__fadeIn');
  
  // إنشاء جدول لإحصائيات اللاعبين
  let statsHTML = `
    <div class="all-players-stats animate__animated animate__fadeIn">
      <h3><i class="fas fa-users"></i> إحصائيات جميع اللاعبين</h3>
      <div class="stats-table-container">
        <table class="stats-table">
          <thead>
            <tr>
              <th>الترتيب</th>
              <th>الاسم</th>
              <th>النقاط</th>
              <th>الغيابات</th>
            </tr>
          </thead>
          <tbody>
  `;
  
  // ترتيب اللاعبين حسب النقاط (تنازلياً)
  const sortedPlayers = Object.values(playersData)
    .filter(player => !player.isAdmin) // استبعاد المدربين من القائمة
    .sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      return a.name.localeCompare(b.name);
    });
  
  // إضافة بيانات كل لاعب إلى الجدول
  sortedPlayers.forEach((player, index) => {
    statsHTML += `
      <tr>
        <td>${player.rank}</td>
        <td>${player.name}</td>
        <td>${player.points}</td>
        <td>${player.absences}</td>
      </tr>
    `;
  });
  
  statsHTML += `
          </tbody>
        </table>
      </div>
    </div>
  `;
  
  // إضافة الجدول إلى بطاقة الملف الشخصي
  profileCard.innerHTML = `
    <div class="profile-header animate__animated">
      <div class="avatar-container">
        <div class="avatar-circle">
          <i class="fas fa-user-tie"></i>
        </div>
      </div>
      <h2>${currentPlayer.name}</h2>
      <div class="belt-level">
        <div class="belt-progress" id="beltProgress"></div>
        <span>مدرب النظام</span>
      </div>
    </div>
    ${statsHTML}
    <button class="logout-btn animate__animated" onclick="logout()">
      <i class="fas fa-sign-out-alt"></i> تسجيل الخروج
    </button>
  `;
  
  // تحريك العناصر بشكل متتابع
  animateElements([
    '.profile-header',
    '.all-players-stats',
    '.logout-btn'
  ]);
}

// تسجيل الخروج
function logout() {
  const profileCard = document.getElementById('profileCard');
  profileCard.classList.add('animate__fadeOut');
  
  setTimeout(() => {
    profileCard.style.display = 'none';
    const loginCard = document.getElementById('loginCard');
    loginCard.style.display = 'block';
    loginCard.classList.remove('animate__fadeOut');
    loginCard.classList.add('animate__fadeIn');
    
    // مسح حقل الإدخال
    document.getElementById('playerId').value = '';
    document.getElementById('playerPassword').value = '';
  }, 300);
}

// إضافة نقاط
function addPoints() {
  if (currentPlayer) {
    currentPlayer.points += 10;
    document.getElementById('playerPoints').textContent = currentPlayer.points;
    updateProgressBars();
    showModal('نجاح', 'تم إضافة 10 نقاط بنجاح', 'success');

    // إرسال تحديث عبر BroadcastChannel
    broadcastChannel.postMessage({
      type: 'update',
      playerId: currentPlayer.password,
      points: currentPlayer.points,
      absences: currentPlayer.absences,
      rank: currentPlayer.rank
    });
  }
}

// إضافة غياب
function addAbsence() {
  if (currentPlayer) {
    currentPlayer.absences += 1;
    document.getElementById('playerAbsences').textContent = currentPlayer.absences;
    updateProgressBars();
    showModal('تنبيه', 'تم تسجيل غياب للاعب', 'warning');

    // إرسال تحديث عبر BroadcastChannel
    broadcastChannel.postMessage({
      type: 'update',
      playerId: currentPlayer.password,
      points: currentPlayer.points,
      absences: currentPlayer.absences,
      rank: currentPlayer.rank
    });
  }
}

// فتح مصدر تعليمي
function openResource(type) {
  if (type === 'kumite') {
    // Show full screen scrollable videos like TikTok style
    const modal = document.getElementById('modalOverlay');
    const modalBox = document.getElementById('modalBox');
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');

    modalTitle.textContent = 'تمارين الكوميتيه';
    modalIcon.innerHTML = '<i class="fas fa-video"></i>';
    modalIcon.style.backgroundColor = 'rgba(247, 127, 0, 0.1)';
    modalIcon.style.color = 'var(--accent-color)';

    // Embed local videos with lazy loading
    const videoSources = ['leg1.mp4', 'leg2.mp4', 'leg3.mp4', 'leg5.mp4', 'leg6.mp4', 'leg7.mp4', 'leg8.mp4', 'leg9.mp4', 'leg10.mp4','leg11.mp4'];
    modalMessage.innerHTML = `
      <div class="videos-container"
           style="max-height: 400px;
                  overflow-y: scroll;
                  display: flex;
                  flex-direction: column;
                  gap: 10px;
                  padding-right: 10px;">
        ${videoSources.map(src => `
          <div class="video-wrapper" style="position: relative;">
            <video data-src="${src}" controls style="width: 100%; border-radius: 12px; display: none;"></video>
            <div class="video-placeholder" style="width: 100%; height: 200px; background: #f0f0f0; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #666;">
              <i class="fas fa-play-circle" style="font-size: 48px;"></i>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    modal.style.display = 'flex';
    modalBox.classList.remove('animate__fadeOut');
    modalBox.classList.add('animate__bounceIn');

    // Initialize lazy loading for videos
    setTimeout(() => {
      lazyLoadVideos();
    }, 100);
  } else {
    let title = '';
    let message = '';

    switch(type) {
      case 'kata':
        title = 'تمارين الكاتا';
        message = 'سيتم فتح قسم تمارين الكاتا قريباً';
        break;
      case 'kihon':
        title = 'أساسيات الكيهون';
        message = 'سيتم فتح قسم أساسيات الكيهون قريباً';
        break;
      case 'rules':
        title = 'قواعد البطولات';
        message = 'سيتم فتح قسم قواعد البطولات قريباً';
        break;
    }

    showModal(title, message, 'info');
  }
}

// عرض نافذة التنبيه
function showModal(title, message, type) {
  const modal = document.getElementById('modalOverlay');
  const modalBox = document.getElementById('modalBox');
  const modalIcon = document.getElementById('modalIcon');
  
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalMessage').textContent = message;
  
  // تغيير الأيقونة حسب نوع التنبيه
  modalIcon.className = 'modal-icon';
  switch(type) {
    case 'error':
      modalIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
      modalIcon.style.backgroundColor = 'rgba(230, 57, 70, 0.1)';
      modalIcon.style.color = 'var(--error-color)';
      break;
    case 'success':
      modalIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
      modalIcon.style.backgroundColor = 'rgba(42, 157, 143, 0.1)';
      modalIcon.style.color = 'var(--success-color)';
      break;
    case 'warning':
      modalIcon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
      modalIcon.style.backgroundColor = 'rgba(233, 196, 106, 0.1)';
      modalIcon.style.color = 'var(--warning-color)';
      break;
    case 'info':
      modalIcon.innerHTML = '<i class="fas fa-info-circle"></i>';
      modalIcon.style.backgroundColor = 'rgba(29, 53, 87, 0.1)';
      modalIcon.style.color = 'var(--secondary-color)';
      break;
  }
  
  modal.style.display = 'flex';
  modalBox.classList.add('animate__bounceIn');
}

// إغلاق نافذة التنبيه
function closeModal() {
  const modal = document.getElementById('modalOverlay');
  const modalBox = document.getElementById('modalBox');
  
  modalBox.classList.remove('animate__bounceIn');
  modalBox.classList.add('animate__fadeOut');
  
  setTimeout(() => {
    modal.style.display = 'none';
    modalBox.classList.remove('animate__fadeOut');
  }, 300);
}

// تحريك العناصر بشكل متتابع
function animateElements(selectors) {
  selectors.forEach((selector, index) => {
    const element = document.querySelector(selector);
    if (element) {
      setTimeout(() => {
        element.classList.add('animate__fadeInUp');
      }, index * 100);
    }
  });
}

// تحديث أشرطة التقدم
function updateProgressBars() {
  if (currentPlayer && !currentPlayer.isAdmin) {
    // حساب نسبة التقدم الأسبوعي (عشوائي للتوضيح)
    const weekProgress = Math.min(currentPlayer.points / 100 * 10, 100);
    document.getElementById('weekProgress').style.width = `${weekProgress}%`;

    // حساب تقدم الحزام (عشوائي للتوضيح)
    const beltProgress = Math.min(currentPlayer.points / 500 * 100, 100);
    document.querySelector('.belt-progress').style.width = `${beltProgress}%`;
  }
}

// تحميل الفيديوهات بشكل كسول (Lazy Loading)
function lazyLoadVideos() {
  const videoWrappers = document.querySelectorAll('.video-wrapper');

  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const wrapper = entry.target;
          const video = wrapper.querySelector('video');
          const placeholder = wrapper.querySelector('.video-placeholder');

          if (video && video.dataset.src) {
            video.src = video.dataset.src;
            video.style.display = 'block';
            placeholder.style.display = 'none';
            videoObserver.unobserve(wrapper);
          }
        }
      });
    }, {
      root: document.querySelector('.videos-container'),
      rootMargin: '50px 0px',
      threshold: 0.1
    });

    videoWrappers.forEach(wrapper => {
      videoObserver.observe(wrapper);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    videoWrappers.forEach(wrapper => {
      const video = wrapper.querySelector('video');
      const placeholder = wrapper.querySelector('.video-placeholder');
      if (video && video.dataset.src) {
        video.src = video.dataset.src;
        video.style.display = 'block';
        placeholder.style.display = 'none';
      }
    });
  }
}
