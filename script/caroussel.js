document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;

  const nextButton = document.getElementById('next');
  const prevButton = document.getElementById('prev');

  const showSlide = (index) => {
      slides.forEach((slide, i) => {
          slide.classList.toggle('active', i === index);
      });

      // Show description of current slide with CSS transition
      slides.forEach(slide => {
          slide.querySelector('.image-description').style.transform = 'translateY(100%)';
      });
      slides[index].querySelector('.image-description').style.transform = 'translateY(0%)';
  };

  const nextSlide = () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
  };

  const prevSlide = () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
  };


  // Optionally, you can add automatic slide change
  setInterval(nextSlide, 5000); // Change slide every 5 seconds

  // Initialize the carousel
  showSlide(currentSlide);
});
