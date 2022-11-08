import i18Obj from './translate.js'

// change photos

let portfolioBtn = document.querySelectorAll('.portfolio-button');
let portfolioBtns = document.querySelector('.portfolio-btn');
let portfolioImages = document.querySelectorAll('.portfolio-item');
let languages = document.querySelector('.languages');
let lngs = document.querySelectorAll('.languages-lang');
let themeBtn = document.querySelector('.theme-button');
let burgerMenu = document.querySelector('.burger');
let nav = document.querySelector('.nav');
let navClose = document.querySelector('.header-nav__close')

function openMenu() {
    nav.classList.add('nav-menu_active')
}

function closeMenu() {
    nav.classList.remove('nav-menu_active')
}

function changeImage(event){
    if(event.target.classList.contains('portfolio-button')){
        portfolioImages.forEach((image, index) => {
             image.src=`assets/images/${event.target.dataset.season}/${index+1}.jpg`;
        })
    }
}

function changeActivaForBtns() {
    portfolioBtn.forEach(btn => {
      btn.addEventListener('click' , () => {
         portfolioBtn.forEach(button => button.classList.remove('active'));
         btn.classList.add('active');
      });
    })
}

//  get translate page

function getTranslatePage(lang){
    const dataAttributes = document.body.querySelectorAll('[data-i18n]')
    let keys = i18Obj[lang];

    dataAttributes.forEach(data => {
        let dataValue = data.dataset.i18n;

        for(let i in keys){
            if(i == dataValue){
                data.textContent =  keys[dataValue];
            }
        }
    })
}

function getLanguage(event){
    if (event.target.classList.contains('languages-lang')){
        getTranslatePage(event.target.textContent);
        localStorage.setItem('language', event.target.textContent);
    }

}

function changeActivaForLngs() {
    lngs.forEach(lng => {
      lng.addEventListener('click' , () => {
         lngs.forEach(language => language.classList.remove('activeln'));
         lng.classList.add('activeln');
      });
    })
}

// change mode to dark and return white mode

function changeTheme() {
    themeBtn.classList.toggle("theme-active");
    
    const sections = document.querySelectorAll('.skills, .portfolio, .video, .price');
    const sectionHeader = document.querySelectorAll('.section-header');
    const sectionTitle = document.querySelectorAll('.section-title');
    
   
    sections.forEach(section =>section.classList.toggle('ligth-theme')) ;
    sectionHeader.forEach(header => header.classList.toggle('ligth-theme'));
    sectionTitle.forEach(title => title.classList.toggle('ligth-theme'));
   
    setTheme()
}    


function setTheme(){
    if(themeBtn.classList.contains('theme-active')){
       localStorage.setItem('theme', 'white')
    } else {
        localStorage.removeItem('theme','dark');
    }
}
   
function getLocalStorage(){
  if(localStorage.getItem('language')){ 
    const chosenlang = localStorage.getItem('language')
    getTranslatePage(chosenlang);
    
  } else {localStorage.getItem('language', 'en');}
}

function getLocalStoragetheme(){

    
    if(localStorage.getItem('theme')){
      const chosentheme = localStorage.getItem('theme')
       changeTheme(chosentheme);
    }  else { localStorage.getItem('theme', 'dark')}
  }
 
  window.addEventListener('load', getLocalStorage);
  window.addEventListener('load', getLocalStoragetheme);
  
burgerMenu.addEventListener('click' , openMenu);
navClose.addEventListener('click' , closeMenu);
languages.addEventListener('click', getLanguage);
changeActivaForLngs();
changeActivaForBtns();
portfolioBtns.addEventListener('click', changeImage);
themeBtn.addEventListener('click', changeTheme);
