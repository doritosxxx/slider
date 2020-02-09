document.addEventListener("DOMContentLoaded", function(){
  document.querySelectorAll(".slider").forEach(slider=>{
    slide(
      slider,
      slider.querySelector(".items"),
      slider.querySelector(".prev"),
      slider.querySelector(".next")
      )
  });
});
function slide(wrapper, items, prev, next) {
  let posX1 = 0,
      posX2 = 0,
      posInitial,
      posFinal,
      threshold = 100,
      slides = items.getElementsByClassName('slide'),
      slidesLength = slides.length,
      slideSize = 100;
      firstSlide = slides[0],
      lastSlide = slides[slidesLength - 1],
      cloneFirst = firstSlide.cloneNode(true),
      cloneLast = lastSlide.cloneNode(true),
      index = 0,
      allowShift = true;
  
  // Clone first and last slide
  items.appendChild(cloneFirst);
  items.insertBefore(cloneLast, firstSlide);
  items.style.left = "-100%";
  wrapper.classList.add('loaded');
  
  // Mouse and Touch events
  //items.onmousedown = dragStart;
  
  // Touch events
  /*
  items.addEventListener('touchstart', dragStart);
  items.addEventListener('touchend', dragEnd);
  items.addEventListener('touchmove', dragAction);
  */
  
  // Click events
  prev.addEventListener('click', function () { shiftSlide(-1) });
  next.addEventListener('click', function () { shiftSlide(1) });
  
  // Transition events
  items.addEventListener('transitionend', checkIndex);
  /*
  function dragStart (e) {
    e = e || window.event;
    e.preventDefault();
    posInitial = items.offsetLeft;
    
    
    if (e.type == 'touchstart') {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }

  function dragAction (e) {
    e = e || window.event;
    let width = items.getElementsByClassName('slide')[0].offsetWidth;
    
    if (e.type == 'touchmove') {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }
    items.style.left = (items.offsetLeft - posX2)/width*100 + "%";
  }
  
  function dragEnd (e) {
    let width = items.getElementsByClassName('slide')[0].offsetWidth;
    posFinal = items.offsetLeft/width*100;
    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, 'drag');
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, 'drag');
    } else {
      items.style.left = (posInitial) + "%";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }*/
  
  function shiftSlide(dir, action) {
    items.classList.add('shifting');
    
    if (allowShift) {
      if (!action) { posInitial = parseInt(items.style.left); }

      if (dir == 1) {
        items.style.left = (posInitial - slideSize) + "%";
        index++;      
      } else if (dir == -1) {
        items.style.left = (posInitial + slideSize) + "%";
        index--;      
      }
    };
    
    allowShift = false;
  }
    
  function checkIndex (){
    items.classList.remove('shifting');

    if (index == -1) {
      items.style.left = -(slidesLength * slideSize) + "%";
      index = slidesLength - 1;
    }

    if (index == slidesLength) {
      items.style.left = "-100%";
      index = 0;
    }
    
    allowShift = true;
  }
}

