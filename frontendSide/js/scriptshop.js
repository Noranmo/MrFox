//----Shopping bag & shop section

let contentBag = document.querySelector('.mainPage__card')
let openBag = document.querySelector('.bag-popup')
let closeBag = document.querySelector('.close-bag')

let total = document.querySelector('.suma')
let quantity = document.querySelector('.quantity')
let quantityBag = document.querySelector('.quantityBag')

openBag.addEventListener('click', () => {
	contentBag.classList.add('active')
	lock.classList.add('lock')
})

closeBag.addEventListener('click', () => {
	contentBag.classList.remove('active')
	lock.classList.remove('lock')
})

let products = null
fetch('../products.json')
	.then(response => {
		return response.json()
	})
	.then(data => {
		products = data
		addDataToHTML()
	})

let listProductNew = document.querySelector('.shop__rawbest')
//let listNew = document.querySelector('.shop__rawbest')
let listProductBest = document.querySelector('.shop__rawbest_2')
let listProductOld = document.querySelector('.shop__rawbest_3')

function addDataToHTML() {
	listProductNew.innerHTML = ''
	listProductBest.innerHTML = ''
	listProductOld.innerHTML = ''

	if (products != null) {
		let productsNew = products.filter(product => {
			return product.collection === 'New Collection'
		})
		productsNew.forEach(product => {
			let newProduct = document.createElement('div')
			newProduct.classList.add('item')
			newProduct.innerHTML = `
							<div class="shop__item item-shop">
								<a href="html/shopitem.html?id=${product.id}&${product.collection}" class="item-shop__image">
									<img src="img/products/${product.image}" alt="" />
								</a>
								<div class="item-shop__info">
									<div class="item-shop__text">
										<div class="item-shop__title">
											${product.name}
										</div>
										<div class="item-shop__price">${product.price} zl</div>
									</div>
									<span id ='item__collection'>${product.collection}</span>
									<button onclick='addToCardNew(${product.id})' class="item-shop__button">Do koszyka</button>
								</div>
							</div>`
			listProductNew.appendChild(newProduct)
			if (!product.collection == 'New Collection') {
				newProduct.style.display = 'none'
			}
		})
		let productsBest = products.filter(product => {
			return product.collection === 'Best Collection'
		})
		productsBest.forEach(product => {
			let newProduct = document.createElement('div')
			newProduct.classList.add('item')
			newProduct.innerHTML = `
							<div class="shop__item item-shop">
								<a href="html/shopitem.html?id=${product.id}&${product.collection}" class="item-shop__image">
									<img src="img/products/${product.image}" alt="" />
								</a>
								<div class="item-shop__info">
									<div class="item-shop__text">
										<div class="item-shop__title">
											${product.name}
										</div>
										<div class="item-shop__price">${product.price} zl</div>
									</div>
									<span id ='item__collection'>${product.collection}</span>
									<button onclick='addToCardNew(${product.id})' class="item-shop__button">Do koszyka</button>
								</div>
							</div>`
			listProductBest.appendChild(newProduct)
		})
		let productsOld = products.filter(product => {
			return product.collection === 'Old Collection'
		})
		productsOld.forEach(product => {
			let newProduct = document.createElement('div')
			newProduct.classList.add('item')
			newProduct.innerHTML = `
							<div class="shop__item item-shop">
								<a href="html/shopitem.html?id=${product.id}&${product.collection}" class="item-shop__image">
									<img src="img/products/${product.image}" alt="" />
								</a>
								<div class="item-shop__info">
									<div class="item-shop__text">
										<div class="item-shop__title">
											${product.name}
										</div>
										<div class="item-shop__price">${product.price} zl</div>
									</div>
									<span id ='item__collection'>${product.collection}</span>
									<button onclick='addToCardNew(${product.id})' class="item-shop__button">Do koszyka</button>
								</div>
							</div>`
			listProductOld.appendChild(newProduct)
		})
	}
}

let listCart = []

//get the cookie data
function checkCart() {
	let cookieValue = document.cookie
		.split('; ')
		.find(row => row.startsWith('listCart='))
	if (cookieValue) {
		listCart = JSON.parse(cookieValue.split('=')[1])
	}
}
checkCart()
function addToCardNew($idProduct) {
	let productCopy = JSON.parse(JSON.stringify(products))
	// if this product is not in the cart
	if (!listCart[$idProduct]) {
		let dataProduct = productCopy.filter(product => product.id == $idProduct)[0]
		// add data prodcut in cart
		listCart[$idProduct] = dataProduct
		listCart[$idProduct].quantity = 1
	} else {
		// If the object in cart already I increased the quantity
		listCart[$idProduct].quantity++
	}
	//Save the datas in cookie
	let timeSave = 'expires=Thu, 31 Dec 2025 23:59:59 UTC'
	document.cookie =
		'listCart=' + JSON.stringify(listCart) + '; ' + timeSave + '; path=/;'
	addCardToHTML()
}
addCardToHTML()
function addCardToHTML() {
	// clear the default data

	let listCartHTML = document.querySelector('.card__list')
	listCartHTML.innerHTML = ''
	let count = 0
	let totalPrice = 0

	if (listCart) {
		listCart.forEach(product => {
			if (product) {
				let newCart = document.createElement('div')
				newCart.classList.add('item')
				newCart.innerHTML = `
								<div class="card__item">
									<div class="card__image">
										<img src="../img/products/${product.image}" alt="" />
									</div>
									<div class="card__details">
										<div class="card__itemTitle">${product.collection}</div>
										<div class="card__itemSize-Color">${product.name}</div>
										<div class="card__itemCounter">
											<button onclick="changeQuantity(${product.id}, '-')">-</button>
											<div class="item__counter">Liczba: ${product.quantity}</div>
											<button onclick="changeQuantity(${product.id}, '+')">+</button>
										</div>
									</div>
									<div class="card__itemPrice">
										<span>${product.price * product.quantity} zl</span>
									</div>
								</div>`
				listCartHTML.appendChild(newCart)

				totalPrice = totalPrice + product.price * product.quantity
				count = count + product.quantity
			}
		})
	}
	total.innerText = totalPrice + ` zl`
	quantity.innerText = count
	quantityBag.innerText = count
}

function changeQuantity($idProduct, $type) {
	switch ($type) {
		case '+':
			listCart[$idProduct].quantity++
			break
		case '-':
			listCart[$idProduct].quantity--
			if (listCart[$idProduct].quantity <= 0) {
				delete listCart[$idProduct]
			}
			break

		default:
			break
	}
	//Save new data in cookie
	let timeSave = 'expires=Thu, 31 Dec 2025 23:59:59 UTC'
	document.cookie =
		'listCart=' + JSON.stringify(listCart) + '; ' + timeSave + '; path=/;'

	//reload the list card
	addCardToHTML()
}
