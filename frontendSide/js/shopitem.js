//---- Change the value of item

let items = null
fetch('../products.json')
	.then(response => {
		return response.json()
	})
	.then(data => {
		items = data
		addDataToHTMLitem()
	})

let itemPlace = document.querySelector('.butItem__body')
let otherItems = document.querySelector('.additional__rawbest')

function addDataToHTMLitem() {
	itemPlace.innerHTML = ''

	let query = window.location.href.split('?')[1]
	let params = query.split('&')
	let paramsValue = params[1]
	let newParams = paramsValue.split('%20').join(' ')

	console.log(newParams)

	let paramValue = window.location.href.split('?')[1].split('=')[1]
	let result = parseInt(paramValue)
	let count = 0
	let totalPrice = 0

	if (items != null) {
		let productsInfo = items.filter(productInfo => {
			return productInfo.id === result
		})
		let productsCollection = items.filter(productCollection => {
			return productCollection.collection === newParams
		})
		productsCollection.forEach(productCollection => {
			let newProduct = document.createElement('div')
			newProduct.classList.add('additional__item')
			newProduct.classList.add('item-additional')
			newProduct.innerHTML = `
								<a href="shopitem.html?id=${productCollection.id}&${productCollection.collection}" class="item-additional__image">
									<img src="../img/products/${productCollection.image}" alt="THE IMAGE" />
								</a>
								<div class="item-additional__info">
									<div class="item-additional__text">
										<div class="item-additional__title">
											${productCollection.name}
										</div>
										<div class="item-additional__price">${productCollection.price} zł</div>
									</div>
									<button onclick='addToCardNew(${productCollection.id})' class="item-shop__button">Do koszyka</button>
								</div>
							`
			otherItems.appendChild(newProduct)
		})
		productsInfo.forEach(productInfo => {
			let newItem = document.createElement('div')
			newItem.classList.add('butItem__body')
			newItem.innerHTML = `
					<div class="butItem__image">
								<img src="../img/products/${productInfo.image}" alt="Item image" />
							</div>
							<div class="butItem__column column-buyItem">
								<div class="column-buyItem__title title">${productInfo.name}</div>
								<div class="column-buyItem__subtitle">
									${productInfo.description}
								</div>
								<div class="column-buyItem__price">
									<span class="price__number">${productInfo.price}</span>
									<span>zl</span>
								</div>
								<div class="column-buyItem__size">
									<div class="column-buyItem__sizeTitle">Size (PL):</div>
									<div class="column-buyItem__sizeRaw">
										<div class="column-buyItem__sizeItem">S(46)</div>
										<div class="column-buyItem__sizeItem">M(48)</div>
										<div class="column-buyItem__sizeItem">L(50)</div>
										<div class="column-buyItem__sizeItem">XL(52)</div>
									</div>
								</div>
								<div class="column-buyItem__countBuy">
									<button onclick='addToCardNew(${productInfo.id})' class="column-buyItem__button draw-border">
										Dodaj Do Koszyka
									</button>
								</div>
							</div>`
			itemPlace.appendChild(newItem)

			counter = productInfo.quantity + counter
			totalPrice = totalPrice + productInfo.price * productInfo.quantity
			count = count + productInfo.quantity
		})
	}
	total.innerText = totalPrice + ` zl`
	quantity.innerText = count
	quantityBag.innerText = count
}

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
