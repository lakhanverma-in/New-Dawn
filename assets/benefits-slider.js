
const initBenefitsSlider = () => {
  const containers = document.querySelectorAll('[class^="section-"].slider-active');
  containers.forEach(container => {
    const track = container.querySelector('.benefits-track');
    const cards = container.querySelectorAll('.benefit-card');
    const nextBtn = container.querySelector('.next');
    const prevBtn = container.querySelector('.prev');
    const dotsContainer = container.querySelector('.benefits-dots');

    if (!track || !cards.length) return;

    const getVisibleCols = () => {
      if (window.innerWidth < 750) return parseInt(track.dataset.mobile);
      if (window.innerWidth < 990) return parseInt(track.dataset.tablet);
      return parseInt(track.dataset.desktop);
    };

    const totalCards = cards.length;
    let visibleCols = getVisibleCols();
    
    // Enable slider logic only if items exceed visible columns
    if (totalCards > visibleCols) {
      container.classList.add('slider-enabled');
    } else {
      container.classList.remove('slider-enabled');
      return;
    }

    let currentIndex = 0;
    const maxIndex = totalCards - visibleCols;

    const updateSlider = () => {
      const cardWidth = cards[0].offsetWidth;
      track.scrollTo({ left: currentIndex * cardWidth, behavior: 'smooth' });
      
      const dots = dotsContainer.querySelectorAll('.dot');
      dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    };

    nextBtn.onclick = () => {
      currentIndex = (currentIndex >= maxIndex) ? 0 : currentIndex + 1;
      updateSlider();
    };

    prevBtn.onclick = () => {
      currentIndex = (currentIndex <= 0) ? maxIndex : currentIndex - 1;
      updateSlider();
    };

    // Build Dots Dynamically
    dotsContainer.innerHTML = '';
    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.onclick = () => { currentIndex = i; updateSlider(); };
      dotsContainer.appendChild(dot);
    }

    // Drag / Swipe Logic
    let isDown = false; let startX; let scrollLeft;
    track.addEventListener('mousedown', (e) => { 
      isDown = true; 
      startX = e.pageX - track.offsetLeft; 
      scrollLeft = track.scrollLeft; 
    });
    track.addEventListener('mouseleave', () => isDown = false);
    track.addEventListener('mouseup', () => isDown = false);
    track.addEventListener('mousemove', (e) => {
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 2;
      track.scrollLeft = scrollLeft - walk;
    });
  });
};

// Handle initial load and Shopify Theme Editor events
document.addEventListener('DOMContentLoaded', initBenefitsSlider);
document.addEventListener('shopify:section:load', initBenefitsSlider);
window.addEventListener('resize', initBenefitsSlider);