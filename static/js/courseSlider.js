function scrollSlider(direction) {
  const slider = document.getElementById('slider');
  const scrollAmount = 300;
  slider.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}
