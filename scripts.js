// التبديل بين العرض المتنقل والسطح المكتب
document.addEventListener('DOMContentLoaded', function() {
  // قائمة التنقل المتنقلة
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('show');
      menuToggle.classList.toggle('active');
    });
  }

  // التبديل بين الدفع الشهري والسنوي
  const billingToggle = document.getElementById('billing-toggle');
  if (billingToggle) {
    billingToggle.addEventListener('change', function() {
      updatePricing(this.checked);
    });
  }

  // تطبيق الفلترة على صفحة الدورات
  const searchInput = document.getElementById('search-courses');
  const categoryFilter = document.getElementById('category-filter');
  const difficultyFilter = document.getElementById('difficulty-filter');
  const clearFiltersBtn = document.getElementById('clear-filters');
  const coursesGrid = document.getElementById('courses-grid');
  const noResults = document.getElementById('no-results');

  if (searchInput && categoryFilter && difficultyFilter) {
    // دالة التصفية
    function filterCourses() {
      const searchTerm = searchInput.value.toLowerCase();
      const category = categoryFilter.value;
      const difficulty = difficultyFilter.value;
      
      let visibleCount = 0;
      
      // الحصول على جميع بطاقات الدورات وتطبيق المرشحات
      const courseCards = document.querySelectorAll('.course-card');
      courseCards.forEach(card => {
        const cardTitle = card.querySelector('h3').textContent.toLowerCase();
        const cardDesc = card.querySelector('p').textContent.toLowerCase();
        const cardCategory = card.getAttribute('data-category');
        const cardDifficulty = card.getAttribute('data-difficulty');
        
        // التحقق من تطابق جميع المرشحات
        const matchesSearch = cardTitle.includes(searchTerm) || cardDesc.includes(searchTerm);
        const matchesCategory = category === '' || cardCategory === category;
        const matchesDifficulty = difficulty === '' || cardDifficulty === difficulty;
        
        if (matchesSearch && matchesCategory && matchesDifficulty) {
          card.style.display = 'block';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });
      
      // عرض رسالة عدم وجود نتائج إذا لم يتم العثور على دورات
      if (visibleCount === 0 && courseCards.length > 0) {
        noResults.style.display = 'block';
      } else {
        noResults.style.display = 'none';
      }
    }
    
    // إضافة المستمعين للأحداث
    searchInput.addEventListener('input', filterCourses);
    categoryFilter.addEventListener('change', filterCourses);
    difficultyFilter.addEventListener('change', filterCourses);
    
    // مسح المرشحات
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', function() {
        searchInput.value = '';
        categoryFilter.value = '';
        difficultyFilter.value = '';
        filterCourses();
      });
    }
  }

  // تبديل وحدات الدورة (توسيع/طي)
  window.toggleModule = function(element) {
    const moduleItem = element.closest('.module-item');
    moduleItem.classList.toggle('active');
  };

  // أزرار مخطط التقدم
  const chartButtons = document.querySelectorAll('.chart-btn');
  if (chartButtons.length > 0) {
    chartButtons.forEach(button => {
      button.addEventListener('click', function() {
        // إزالة الفئة النشطة من جميع الأزرار
        chartButtons.forEach(btn => btn.classList.remove('active'));
        // إضافة الفئة النشطة إلى الزر المحدد
        this.classList.add('active');
        
        // في تطبيق حقيقي، ستقوم بتحديث الرسم البياني هنا
        const period = this.getAttribute('data-period');
        updateChart(period);
      });
    });
  }
});

// تحديث أسعار الخطط بناءً على الفوترة الشهرية/السنوية
function updatePricing(isMonthly) {
  const basicPrice = isMonthly ? 29 : Math.round(29 * 0.8);
  const proPrice = isMonthly ? 79 : Math.round(79 * 0.8);
  const businessPrice = isMonthly ? 149 : Math.round(149 * 0.8);
  
  const priceElements = document.querySelectorAll('.amount');
  if (priceElements.length >= 3) {
    priceElements[0].textContent = basicPrice;
    priceElements[1].textContent = proPrice;
    priceElements[2].textContent = businessPrice;
  }
}

// تحديث الرسم البياني (يمكن استبداله برسم بياني حقيقي في التطبيق الفعلي)
function updateChart(period) {
  console.log(`تحديث الرسم البياني ليعرض بيانات: ${period}`);
  // في تطبيق حقيقي، ستقوم هنا بتحميل البيانات وتحديث الرسم البياني
  // باستخدام مكتبة مثل Chart.js
}

// إضافة فئة show لقائمة التنقل على الهواتف المحمولة
document.addEventListener('DOMContentLoaded', function() {
  // إضافة بعض الستايلات الديناميكية لقائمة التنقل المتنقلة
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 767px) {
      .nav-links.show {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: var(--background);
        border-top: 1px solid var(--border);
        border-bottom: 1px solid var(--border);
        padding: 1rem;
        z-index: 100;
      }
      
      .menu-toggle.active i:before {
        content: "\\f00d";
      }
    }
  `;
  document.head.appendChild(style);
});