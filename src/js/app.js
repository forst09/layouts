import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

'use strict';

document.addEventListener('DOMContentLoaded', function () {

    //check webp
    function testWebP(callback) {
        var webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    };

    testWebP(function (support) {
        if (support) {
            document.querySelector('html').classList.add('webp');
        }
        else {
            document.querySelector('html').classList.add('no-webp');
        }
    });

    //open mobile menu
    let burger = document.getElementById('burger');
    let mobileMenu = document.getElementById('mobileMenu');
    if (burger) {
        burger.addEventListener('click', function () {
            mobileMenu.classList.add('active');
            document.querySelector('body').classList.add('not-scroll');
        });
    }

    //close mobile menu
    let close = document.getElementById('closeMobile');
    if (close) {
        close.addEventListener('click', function () {
            mobileMenu.classList.remove('active');
            document.querySelector('body').classList.remove('not-scroll');
        });
    }

    //accordion
    document.querySelectorAll('.accordion').forEach((item) => {
        item.addEventListener('click', function () {
            if (item.classList.contains('active')) {
                item.classList.remove('active');
            }
            else {
                const parent = item.closest('section');
                const currentAccordions = parent.querySelectorAll('.accordion');
                currentAccordions.forEach((item) => {
                    item.classList.remove('active');
                })
                item.classList.add('active');
            }
        })
    });

    if (window.innerWidth >= 1024) {
        //swiper categories
        const swiperCategories = new Swiper('.categories__swiper', {
            loop: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            spaceBetween: 20,
            navigation: {
                nextEl: '.categories__swiper-next',
                prevEl: '.categories__swiper-prev',
            },
        });
    }

    //gsap 
    if (window.innerWidth >= 1600) {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to('.hero__img img', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'bottom 100%',
                end: 'bottom 10%',
                scrub: 1
            },
            y: '-38%'
        })
    }

});