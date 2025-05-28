
let slideIndex = 0;
let i;

function slideShow(){
    const slides = document.getElementsByClassName('slides');
    const dots = document.getElementsByClassName('dot');
    for(i=0;i<slides.length;i++){
        slides[i].style.display = 'none';
    }
    slideIndex++;
    if(slideIndex>slides.length){slideIndex=1}
    //dots 
    for(i=0;i<dots.length;i++){
        dots[i].classList.remove('active');
    }
    slides[slideIndex-1].style.display = 'block';
    dots[slideIndex-1].classList.add('active');
    // for two seconds
    setTimeout(slideShow, 2000);
}

slideShow();