// let slideIndex = 0;
// // slideShow();
// function slideShow(){
//     let i;
//     const slides = document.getElementsByClassName("slides");
//     const dots = document.getElementsByClassName('dot');
//     for(i=0;i<slides.length;i++){
//         console.log(slides[i]);
//         slides[i].style.display = 'none';;
//     }
//     slideIndex++;
//     if(slideIndex>slides.length){slideIndex = 1};
//     for(i=0; i<dots.length; i++){
//         dots[i].className = dots[i].className.replace(' active', "")
//     }
//     slides[slideIndex-1].style.display = 'block';
//     dots[slideIndex-1].className += " active";
//     setTimeout(slideShow, 2000);

// }
// slideShow();

let slideIndex = 0;
slideShow();

function slideShow(){
    const slides = document.getElementsByClassName("slides");
    const dots = document.getElementsByClassName('dot');

    for(let i = 0; i < slides.length; i++){
        slides[i].style.display = 'none';
    }

    slideIndex++;
    if(slideIndex > slides.length){ slideIndex = 1; }

    for(let i = 0; i < dots.length; i++){
        dots[i].classList.remove("active");
    }

    slides[slideIndex-1].style.display = 'block';
    dots[slideIndex-1].classList.add("active");

    setTimeout(slideShow, 2000);
}


