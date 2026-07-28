document.addEventListener('DOMContentLoaded', () => {
  // 1. Interactive Price Calculator
  const calcState = {
    carType: 'passenger', // passenger, suv, commercial
    service: 'charge',    // charge, tire, repair, fuel, unlock
    location: 'city'     // city, suburb, highway
  };

  const basePrices = {
    charge: 1500,
    tire: 2000,
    repair: 1200,
    fuel: 1500,
    unlock: 2500
  };

  const carMultipliers = {
    passenger: 1.0,
    suv: 1.2,
    commercial: 1.4
  };

  const locationAddons = {
    city: 0,
    suburb: 500,
    highway: 1000
  };

  function updateCalculator() {
    const base = basePrices[calcState.service] || 1500;
    const mult = carMultipliers[calcState.carType] || 1.0;
    const addon = locationAddons[calcState.location] || 0;
    
    const totalPrice = Math.round((base * mult) + addon);

    const priceEl = document.getElementById('calcResultPrice');
    if (priceEl) {
      priceEl.textContent = `${totalPrice.toLocaleString('ru-RU')} ₽`;
    }
  }

  // Handle calculator button clicks
  document.querySelectorAll('.opt-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const group = btn.dataset.group;
      const val = btn.dataset.value;
      if (!group || !val) return;

      // Unselect siblings
      btn.parentElement.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      calcState[group] = val;
      updateCalculator();
    });
  });

  updateCalculator();

  // 2. Services Filtering
  const tabBtns = document.querySelectorAll('.tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      serviceCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 3. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 4. Modal Window Logic
  const modalOverlay = document.getElementById('orderModal');
  const modalClose = document.getElementById('modalClose');
  const modalServiceInput = document.getElementById('modalServiceInput');

  function openModal(serviceName = '') {
    if (modalOverlay) {
      if (modalServiceInput && serviceName) {
        modalServiceInput.value = serviceName;
      }
      modalOverlay.classList.add('active');
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  }

  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.dataset.serviceName || '';
      openModal(service);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // 5. Phone Input Mask Simple Format
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
      if (!x[2]) {
        e.target.value = x[1] ? '+7 (' + x[1] : '';
      } else {
        e.target.value = '+7 (' + x[2] + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
      }
    });
  });

  // 6. Form Submission Simulation
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = '⏳ Диспетчер отправляет экипаж...';
        
        setTimeout(() => {
          alert('✅ Заявка принята! Экипаж автопомощи «Механик 52» выехал к вам. Диспетчер перезвонит в течение 1 минуты.');
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          form.reset();
          closeModal();
        }, 1200);
      }
    });
  });

  // 7. Dynamic Arrival Time Fluctuator
  const arrivalEl = document.getElementById('liveArrivalTime');
  if (arrivalEl) {
    setInterval(() => {
      const minutes = Math.floor(Math.random() * (22 - 15 + 1)) + 15;
      arrivalEl.textContent = `${minutes} мин`;
    }, 15000);
  }
});
