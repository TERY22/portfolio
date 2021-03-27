$(function(){

   $('.header__burger').on('click', function (e) {
      $(this).toggleClass('active');
      $('.menu').toggleClass('active');
   });
   $('.menu__list-link').on('click', function (e) {
      $('.menu, .header__burger').removeClass('active');
   });

   $('.box-progressbar__per').each(function () {
      $this = $(this);
      let per = $(this).attr('per');
      $this.css("width", per + "%");
      $this.find('.box-progressbar__value').text(per + "%").css('opacity', '1');
   });


   $('.works-slider').slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      prevArrow: '<img class="slider-arrows slider-arrows__left" src="img/arrows-left.svg" alt=""></img>',
      nextArrow: '<img class="slider-arrows slider-arrows__right" src="img/arrows-right.svg" alt=""></img>',
      focusOnSelect: true,
      asNavFor: '.slider-dotshead',
      autoplay: true,
      speed: 800,

      responsive: [
         {
            breakpoint: 1366,
            settings: {
               slidesToShow: 1,
               arrows: 1,
            },
            
         },
      ]
   });
   
   $('.slider-dotshead').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: '.works-slider',
   });

   new WOW().init();

   $('.top__arrows').on('click', function (e) {
      $('html,body').stop().animate({ scrollTop: $('#about').offset().top }, 1000);
      e.preventDefault();
   });
   $('._about').on('click', function (e) {
      $('html,body').stop().animate({ scrollTop: $('#about').offset().top }, 1000);
      e.preventDefault();
   });
   $('._skills').on('click', function (e) {
      $('html,body').stop().animate({ scrollTop: $('#skills').offset().top }, 1000);
      e.preventDefault();
   });
   $('._works').on('click', function (e) {
      $('html,body').stop().animate({ scrollTop: $('#works').offset().top }, 1000);
      e.preventDefault();
   });
   $('._contact').on('click', function (e) {
      $('html,body').stop().animate({ scrollTop: $('#contact').offset().top }, 1000);
      e.preventDefault();
   });
   $('.banner__btn').on('click', function (e) {
      $('html,body').stop().animate({ scrollTop: $('#contact').offset().top }, 1000);
      e.preventDefault();
   });
  

});

document.addEventListener('DOMContentLoaded', function () {
   const form = document.getElementById('contact');
   form.addEventListener('submit', formSend);

   async function formSend(e) {
      e.preventDefault();

      let error = formValidate(form);

      let formData = new FormData(document.getElementById("contact"));


      if (error === 0) {
         form.classList.add('_sending');
         
         let response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData
         });
         if(response.ok) {
            let result = await response.json();
            alert(result.messege);
            formPreview.innerHTML = '';
            form.reset();
            form.classList.remove('_sending');
         } else {
            alert("Ошибка");
            form.classList.remove('_sending');
         }
      }else {
         alert("Пожайлуста, заполните все поля.\nВнимание! Github Pages не поддерживает php");
      }


      function formValidate(form) {
         let error = 0;
         let formReq = document.querySelectorAll('._req');

         for (let index = 0; index < formReq.length; index++){
            const input = formReq[index];
            formRemoveError(input);

            if(input.classList.contains('._email')){
               if (emailTest(input)){
                  formAddError(input);
                  error++;
               }
            }else{ 
               if (input.value === '') {
                  formAddError(input);
                  error++;
               }
            }
         }
         return error;
      }

      function formAddError(input) {
         input.parentElement.classList.add('_error');
         input.classList.add('_error');      
      }
      function formRemoveError(input) {
         input.parentElement.classList.remove('_error');
         input.classList.remove('_error');
      }
      function emailTest(input) {
         return !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})+$/.test(input.value);
      }
   }
});