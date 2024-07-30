window.onload = () => {
	let listCart = []
	//get data from cookie

	function checkCart() {
		let cookieValue = document.cookie
			.split('; ')
			.find(row => row.startsWith('listCart='))
		if (cookieValue) {
			listCart = JSON.parse(cookieValue.split('=')[1])
		}
	}

	checkCart()
	addCardToHTML()
	function addCardToHTML() {
		// clear data from HTML
		let listCartHTML = document.querySelector('.koszyk__items')
		//listCartHTML.innerHTML = ''

		let totalQuantityHTML = document.querySelector(
			'.podsumowanie__quantitySuma'
		)

		let totalSumaHTML = document.querySelector('.podsumowanie__sumaSuma')
		let sumaTowaru = document.querySelector('.podsumowanie__kosztSuma')

		let sumaMongoDb = document.getElementById('suma')
		let quantityMongoDb = document.getElementById('quantity')

		let totalQuantity = 0
		let totalSuma = 0

		let quantityMongo = 0
		let sumaMongo = 0

		//if we have a product in cart

		if (listCart) {
			let filterProducts = listCart.filter(product => {
				return product != null
			})
			console.log(filterProducts)
			listCart.forEach(filterProduct => {
				if (filterProduct) {
					let newProd = document.createElement('div')
					newProd.classList.add('koszyk__item')
					newProd.classList.add('item-koszyk')
					newProd.innerHTML = `<div class="item-koszyk__image">
											<img src="../img/products/${filterProduct.image}" alt="" />
										</div>
										<div class="item-koszyk__details">
											<div class="item-koszyk__title">${filterProduct.collection}</div>
											<div class="item-koszyk__subtitle">${filterProduct.name}</div>
										</div>
										<div class="item-koszyk__counter">
											<span class="minus">Liczba: </span>
											<span class="number">${filterProduct.quantity}</span>
										</div>
										<div class="item-koszyk__cena">${filterProduct.price}zl</div>`
					console.log(newProd)
					listCartHTML.appendChild(newProd)
					totalQuantity = totalQuantity + filterProduct.quantity
					totalSuma = totalSuma + filterProduct.price * filterProduct.quantity
					quantityMongo = totalQuantity
					sumaMongo = totalSuma
				}
			})
		}
		totalQuantityHTML.innerHTML = totalQuantity
		totalSumaHTML.innerHTML = totalSuma + ' zl'
		sumaTowaru.innerHTML = totalSuma + ' zl'
		sumaMongoDb.value = sumaMongo
		quantityMongoDb.value = quantityMongo
	}
}
