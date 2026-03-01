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

  // إنشاء قناة BroadcastChannel للمزامنة الفورية
const broadcastChannel = new BroadcastChannel('karate-club-updates');

// الاستماع للتحديثات من النوافذ الأخرى
broadcastChannel.onmessage = function(event) {
  const data = event.data;
  if (data.type === 'update') {
    // تحديث البيانات المحلية
    const player = Object.values(playersData).find(p => p.password === data.playerId);
    if (player) {
      player.points = data.points;
      player.absences = data.absences;
      if (data.rank !== undefined) {
        player.rank = data.rank;
      }

      // تحديث الجدول
      populateAdminTable();
    }
  }
};

// متغيرات للطلبات الحالية
let currentModifications = [];

// دالة لحساب الترتيب الديناميكي
function getPlayerRank(playerId) {
  const player = playersData[playerId];
  if (!player || player.isAdmin) return 0;
  const sorted = Object.entries(playersData)
    .filter(([id, p]) => !p.isAdmin)
    .sort(([idA, a], [idB, b]) => {
      if (b.points !== a.points) return b.points - a.points;
      return idA.localeCompare(idB);
    });
  const index = sorted.findIndex(([id]) => id === playerId);
  return index !== -1 ? index + 1 : 0;
}

// تهيئة الجسيمات في الخلفية
document.addEventListener('DOMContentLoaded', function() {
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
      move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" }
      }
    }
  });

  // إضافة تأثير للعناصر عند التحميل
  const inputGroup = document.querySelector('.input-group');
  if (inputGroup) {
    setTimeout(() => {
      inputGroup.classList.add('animate__fadeInUp');
    }, 300);
  }
});

// تسجيل الدخول للمدرب
function adminLogin() {
  const password = document.getElementById('adminPassword').value.trim();

  // التحقق من كلمة المرور للمدربين
  const admin = Object.values(playersData).find(player => player.isAdmin && player.password === password);

  if (admin) {
    // إخفاء شاشة الدخول
    const loginCard = document.getElementById('adminLoginCard');
    loginCard.classList.add('animate__fadeOut');

    setTimeout(() => {
      loginCard.style.display = 'none';

      // عرض لوحة التحكم
      const dashboard = document.getElementById('adminDashboard');
      dashboard.style.display = 'block';
      dashboard.classList.add('animate__fadeIn');

      // ملء الجدول
      populateAdminTable();

      // ملء قائمة اللاعبين
      populatePlayerSelect();

      // تحديث شريط التقدم
      updateAdminProgress();
    }, 300);
  } else {
    showModal('خطأ', 'كلمة المرور غير صحيحة', 'error');
  }
}

// ملء قائمة اللاعبين في الـ select
function populatePlayerSelect() {
  const select = document.getElementById('playerSelect');
  select.innerHTML = '<option value="">اختر اللاعب</option>';

  const sortedPlayers = Object.entries(playersData)
    .filter(([id, player]) => !player.isAdmin)
    .sort(([idA, a], [idB, b]) => {
      if (b.points !== a.points) return b.points - a.points;
      return idA.localeCompare(idB);
    });

  sortedPlayers.forEach(([id, player]) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = `${player.name} (${id})`;
    select.appendChild(option);
  });
}

// ملء جدول اللاعبين (للعرض فقط)
function populateAdminTable() {
  const tableBody = document.getElementById('adminPlayersTable');
  tableBody.innerHTML = '';

  const sortedPlayers = Object.entries(playersData)
    .filter(([id, player]) => !player.isAdmin)
    .sort(([idA, a], [idB, b]) => {
      if (a.rank !== b.rank) return a.rank - b.rank;
      return a.name.localeCompare(b.name);
    });

  sortedPlayers.forEach(([id, player]) => {
    const row = document.createElement('tr');
    row.style.borderBottom = '1px solid #ddd';
    row.style.textAlign = 'center';

    row.innerHTML = `
      <td style="padding: 10px 15px; font-weight: 600;">${id}</td>
      <td style="padding: 10px 15px; font-weight: 600; color: var(--primary-color);">${player.name}</td>
      <td style="padding: 10px 15px; font-weight: 600;">${player.rank}</td>
      <td style="padding: 10px 15px; font-weight: 600;">${player.points}</td>
      <td style="padding: 10px 15px; font-weight: 600; color: var(--error-color);">${player.absences}</td>
    `;

    tableBody.appendChild(row);
  });
}

// إضافة تعديل للطلب الحالي
function addModification() {
  const playerId = document.getElementById('playerSelect').value;
  const modificationType = document.getElementById('modificationType').value;
  const modificationValue = parseInt(document.getElementById('modificationValue').value) || 0;

  if (!playerId) {
    showModal('خطأ', 'يرجى اختيار اللاعب', 'error');
    return;
  }

  if (!modificationType) {
    showModal('خطأ', 'يرجى اختيار نوع التعديل', 'error');
    return;
  }

  if (modificationValue <= 0) {
    showModal('خطأ', 'يرجى إدخال قيمة صحيحة', 'error');
    return;
  }

  const player = playersData[playerId];
  const modification = {
    id: Date.now(),
    playerId: playerId,
    playerName: player.name,
    type: modificationType,
    value: modificationValue,
    timestamp: new Date().toISOString()
  };

  currentModifications.push(modification);
  updateModificationsDisplay();

  // مسح الحقول
  document.getElementById('playerSelect').value = '';
  document.getElementById('modificationType').value = '';
  document.getElementById('modificationValue').value = '';

  showModal('نجاح', 'تم إضافة التعديل للطلب', 'success');
}

// مسح جميع التعديلات
function clearModifications() {
  currentModifications = [];
  updateModificationsDisplay();
  showModal('تنبيه', 'تم مسح جميع التعديلات', 'warning');
}

// تحديث عرض التعديلات الحالية
function updateModificationsDisplay() {
  const container = document.getElementById('modificationsList');

  if (currentModifications.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: var(--text-color); margin: 0;">لا توجد طلبات حالية</p>';
    return;
  }

  let html = '';
  currentModifications.forEach(mod => {
    const typeText = mod.type === 'points' ? 'إضافة نقاط' :
                    mod.type === 'absence' ? 'تسجيل غياب' :
                    mod.type === 'attendance' ? 'تسجيل حضور' : 'تحديد الترتيب';
    const icon = mod.type === 'points' ? 'fas fa-plus' :
                mod.type === 'absence' ? 'fas fa-times' :
                mod.type === 'attendance' ? 'fas fa-check' : 'fas fa-trophy';

    html += `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid var(--border-color);">
        <div style="display: flex; align-items: center; gap: 10px;">
          <i class="${icon}" style="color: var(--primary-color);"></i>
          <div>
            <div style="font-weight: 600; color: var(--primary-color);">${mod.playerName}</div>
            <div style="font-size: 0.9rem; color: var(--text-color);">${typeText}: ${mod.value}</div>
          </div>
        </div>
        <button onclick="removeModification(${mod.id})" style="background: var(--error-color); color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
  });

  container.innerHTML = html;
}

// إزالة تعديل محدد
function removeModification(id) {
  currentModifications = currentModifications.filter(mod => mod.id !== id);
  updateModificationsDisplay();
}

// إرسال الطلب
function sendRequest() {
  if (currentModifications.length === 0) {
    showModal('خطأ', 'لا توجد تعديلات للإرسال', 'error');
    return;
  }

  // تطبيق التعديلات على البيانات المحلية
  currentModifications.forEach(mod => {
    if (mod.type === 'points') {
      playersData[mod.playerId].points += mod.value;
    } else if (mod.type === 'absence') {
      playersData[mod.playerId].absences += mod.value;
    } else if (mod.type === 'attendance') {
      playersData[mod.playerId].absences = Math.max(0, playersData[mod.playerId].absences - mod.value);
    } else if (mod.type === 'rank') {
      playersData[mod.playerId].rank = mod.value;
    }
  });

  // تحديث الجدول
  populateAdminTable();

  // إنشاء كائن الطلب
  const request = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    modifications: currentModifications,
    status: 'pending'
  };

  // تنزيل الطلب كملف JSON
  const dataStr = JSON.stringify(request, null, 2);
  const dataBlob = new Blob([dataStr], {type: 'application/json'});
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `admin_request_${request.id}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  // مسح التعديلات الحالية
  currentModifications = [];
  updateModificationsDisplay();

  showModal('نجاح', 'تم إرسال الطلب بنجاح', 'success');
}

// تحديث شريط التقدم للمدرب
function updateAdminProgress() {
  const progressBar = document.getElementById('adminBeltProgress');
  // حساب تقدم عشوائي للمدرب
  const progress = Math.min(100, Math.random() * 100);
  progressBar.style.width = `${progress}%`;
}

// تسجيل الخروج
function adminLogout() {
  const dashboard = document.getElementById('adminDashboard');
  dashboard.classList.add('animate__fadeOut');

  setTimeout(() => {
    // إعادة توجيه إلى الصفحة الرئيسية
    window.location.href = 'index.html';
  }, 300);
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

// تحديث جدول اللاعبين في لوحة تحكم المدرب مع الرانك الديناميكي
function updateAdminPlayersTable() {
  const tableBody = document.getElementById('adminPlayersTable');
  tableBody.innerHTML = '';

  // ترتيب اللاعبين حسب النقاط (تنازلياً)
  const sortedPlayers = Object.entries(defaultPlayersData)
    .filter(([id, player]) => !player.isAdmin)
    .sort((a, b) => {
      if (b[1].points !== a[1].points) return b[1].points - a[1].points;
      return a[1].name.localeCompare(b[1].name);
    });

  sortedPlayers.forEach(([id, player], index) => {
    const row = document.createElement('tr');

    // عمود المعرف
    const idCell = document.createElement('td');
    idCell.textContent = id;
    row.appendChild(idCell);

    // عمود الاسم
    const nameCell = document.createElement('td');
    nameCell.textContent = player.name;
    row.appendChild(nameCell);

    // عمود الرانك (الترتيب)
    const rankCell = document.createElement('td');
    rankCell.textContent = index + 1;
    row.appendChild(rankCell);

    // عمود النقاط
    const pointsCell = document.createElement('td');
    pointsCell.textContent = player.points;
    row.appendChild(pointsCell);

    // عمود الغيابات
    const absencesCell = document.createElement('td');
    absencesCell.textContent = player.absences;
    row.appendChild(absencesCell);

    tableBody.appendChild(row);
  });
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

