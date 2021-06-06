var nav = document.querySelector('nav');

window.addEventListener('scroll', function(){
  if(window.pageYOffset > 100){
    nav.classList.add('bg-dark', 'shadow');
  } else {
    nav.classList.remove('bg-dark', 'shadow');
  }
})

window.addEventListener(resize, ResizeWindow);

function ResizeWindow( ){
  var dataSpyList = [].slice.call( document.querySelectorAll('[data-spy="scroll"]'));

  dataSpyList.forEach(function(dataSpyElement){
    bootstrap.Scrollspy.getInstance(dataSpyElement).refresh();
  });
}