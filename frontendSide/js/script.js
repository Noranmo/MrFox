//----Slider

$(document).ready(function () {
	setTimeout(function () {
		activePopUp()
	}, 500)

	let productGall__rawbestSmall = document.querySelector(
		'.productGall__rawbest'
	)
	let width = $(window).width()
	if (width >= 664) {
		$('.productGall__rawbest').slick({
			lazyLoad: 'ondemand',
			slidesToShow: 3,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 3000,
		})
		//document.location.reload()
	} else if (width < 664) {
		productGall__rawbestSmall.innerHTML = ''
		productGall__rawbestSmall.innerHTML = `
			<div class="productGall__item item-productGall">
								<a href="/product.html" class="item-productGall__image">
									<img src="img/products/f5.jpg" alt="" />
								</a>
								<div class="item-productGall__info">
									<div class="item-productGall__text">
										<div class="item-productGall__title">SHIRT 3</div>
										<div class="item-productGall__price">500 zł</div>
									</div>
									<a href="/product.html" class="item-productGall__button"
										>Zobacz kolekcje</a
									>
								</div>
							</div>
							<div class="productGall__item item-productGall">
								<a href="/product.html" class="item-productGall__image">
									<img src="img/products/f1.jpg" alt="" />
								</a>
								<div class="item-productGall__info">
									<div class="item-productGall__text">
										<div class="item-productGall__title">SHIRT 1</div>
										<div class="item-productGall__price">220 zł</div>
									</div>
									<a href="/product.html" class="item-productGall__button"
										>Zobacz kolekcje</a
									>
								</div>
							</div>
							<div class="productGall__item item-productGall">
								<a href="/product.html" class="item-productGall__image">
									<img src="img/products/f3.jpg" alt="" />
								</a>
								<div class="item-productGall__info">
									<div class="item-productGall__text">
										<div class="item-productGall__title">SHIRT 2</div>
										<div class="item-productGall__price">300 zł</div>
									</div>
									<a href="/product.html" class="item-productGall__button"
										>Zobacz kolekcje</a
									>
								</div>
							</div>
							<div class="productGall__item item-productGall">
								<a href="/product.html" class="item-productGall__image">
									<img src="img/products/n4.jpg" alt="" />
								</a>
								<div class="item-productGall__info">
									<div class="item-productGall__text">
										<div class="item-productGall__title">SHIRT 4</div>
										<div class="item-productGall__price">240 zł</div>
									</div>
									<a href="/product.html" class="item-productGall__button"
										>Zobacz kolekcje</a
									>
								</div>
							</div>
							<div class="productGall__item item-productGall">
								<a href="/product.html" class="item-productGall__image">
									<img src="img/products/a2.jpg" alt="" />
								</a>
								<div class="item-productGall__info">
									<div class="item-productGall__text">
										<div class="item-productGall__title">SHIRT 6</div>
										<div class="item-productGall__price">350 zł</div>
									</div>
									<a href="/product.html" class="item-productGall__button"
										>Zobacz kolekcje</a
									>
								</div>
							</div>
		`
	}
})
$(window).resize(function () {
	if ($(window).width() > 665 || $(window).width() < 664) this.location.reload()
})

//------ Header
$(document).ready(function () {
	$('.header__burger').click(function (event) {
		$('.header__burger,.header__menu').toggleClass('active')
		$('body').toggleClass('lock')
	})
})

// Login & register page

let wrap = document.querySelector('.loginForm__body')
let loginLink = document.querySelector('.login-link')
let registerLink = document.querySelector('.register-link')

let btnPopup = document.querySelector('.btnLogin-popup')
let btnClose = document.querySelector('.icon-close')
let lock = document.body

btnPopup.addEventListener('click', () => {
	wrap.classList.add('active-popup')
	lock.classList.add('lock')
})

btnClose.addEventListener('click', () => {
	wrap.classList.remove('active-popup')
	lock.classList.remove('lock')
})

function activePopUp() {
	wrap.classList.add('active-popup')
	lock.classList.add('lock')
}
