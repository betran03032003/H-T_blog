// Filter Js
$(document).ready(function () {
    $('.filter-item').click(function () {
        const value = $(this).attr('data-filter') /*Lấy giá trị */
        if (value == 'all') {
            $('.post-box').show('1000')
        } else {
            $('.post-box').not('.' + value).hide('1000')
            $('.post-box').filter('.' + value).show('1000')
        }
    })
    // Add active to btn 
    $('.filter-item').click(function(){
        $(this).addClass("active-filter").siblings().removeClass("active-filter");
    })
})



//Header background change on scroll
let header =document.querySelector('header')

window.addEventListener('scroll',()=>{
    header.classList.toggle('shadow',window.scrollY > 0)
})
/* Change Color Name Blog*/
var textColor = document.querySelector('.home-title');
setInterval(() => {
    textColor.classList.toggle('blue')
},3000)
/* Open and Close menuBar */
const menuBar = document.querySelector(".nav > i")
const closeBtn = document.querySelector(".nav ul i" )
menuBar.addEventListener("click",function() {
    document.querySelector(".nav ul").style.transform = "translateX(0%)"
})
closeBtn.addEventListener("click",function() {
    document.querySelector(".nav ul").style.transform = "translateX(100%)"
})
