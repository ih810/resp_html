var nav = document.querySelector('nav');

window.addEventListener('scroll', function(){
  if(window.pageYOffset > 100){
    nav.classList.add('bg-dark', 'shadow');
  } else {
    nav.classList.remove('bg-dark', 'shadow');
  }
})

const navbarN = document.body.querySelector('#navbarN');
if (navbarN) {
  new bootstrap.ScrollSpy (document.body, {
    target: '#navbarN',
    offset: 74,
  })
}