(function() {
    const initSlider = () => {
      const slider = document.getElementById('Slider-{{ section.id }}');
      const nextBtn = document.querySelector('.lp-next-{{ section.id }}');
      const prevBtn = document.querySelector('.lp-prev-{{ section.id }}');
      const controls = document.querySelector('.lp-controls-{{ section.id }}');
      const cardCount = slider.querySelectorAll('.lp-review-card').length;

      if (!slider || !nextBtn || !prevBtn) return;

      const getScrollStep = () => {
        const card = slider.querySelector('.lp-review-card');
        return card ? card.getBoundingClientRect().width + 20 : 300;
      };

      const checkVisibility = () => {
        const isMobile = window.innerWidth < 750;
        if (controls) {
          if ((!isMobile && cardCount <= 3) || (isMobile && cardCount <= 1)) {
            controls.style.display = 'none';
          } else {
            controls.style.display = 'flex';
          }
        }
      };

      nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
      });

      prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
      });

      checkVisibility();
      window.addEventListener('resize', checkVisibility);
    };

    document.addEventListener('DOMContentLoaded', initSlider);
    document.addEventListener('shopify:section:load', initSlider);
  })();