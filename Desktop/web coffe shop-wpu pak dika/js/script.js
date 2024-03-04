// toggle class active
// document query itu artinya carikan saya doc yg idnya
const navbarNav = document.querySelector
('.navbar-nav');

// ketika hamburger menu di klik

document.querySelector('#hamburger-menu').
onclick = () => {
    navbarNav.classList.toggle('active');
};

// klik diluar side Bar untuk menuutup navbar dihamburger
const hamburger = document.querySelector
('#hamburger-menu');
document.addEventListener('click',function(e) {
    if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)){
        navbarNav.classList.remove('active')
    };
})
