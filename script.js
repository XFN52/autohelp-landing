// MECHANIC52 - Pure Vanilla JS Script
document.addEventListener('DOMContentLoaded', function () {
  
  // 1. Live Clock for "работаем прямо сейчас, HH:MM"
  var clockEl = document.getElementById('liveClock');
  
  function updateLiveClock() {
    if (!clockEl) return;
    var now = new Date();
    var hours = String(now.getHours()).padStart(2, '0');
    var minutes = String(now.getMinutes()).padStart(2, '0');
    clockEl.textContent = hours + ':' + minutes;
  }
  
  updateLiveClock();
  setInterval(updateLiveClock, 30000); // update every 30 sec

  // 2. Smooth Scroll for Symptoms Anchor Links
  var anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 3. Smart Sticky Call Bar (shows ONLY when no main call button is in viewport)
  var stickyBar = document.querySelector('.sticky-call-bar');
  var allButtons = document.querySelectorAll('.btn:not(.sticky-call-bar)');

  if (stickyBar && allButtons.length > 0) {
    function checkVisibility() {
      var isAnyButtonInViewport = false;
      var windowHeight = window.innerHeight || document.documentElement.clientHeight;

      for (var i = 0; i < allButtons.length; i++) {
        var rect = allButtons[i].getBoundingClientRect();
        if (rect.top < (windowHeight - 10) && rect.bottom > 10) {
          isAnyButtonInViewport = true;
          break;
        }
      }

      if (!isAnyButtonInViewport) {
        stickyBar.classList.add('sticky-active');
      } else {
        stickyBar.classList.remove('sticky-active');
      }
    }

    // Run check immediately on load and on scroll/resize
    checkVisibility();
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });
  }

});
