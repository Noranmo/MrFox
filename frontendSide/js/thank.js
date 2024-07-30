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
		let timeSave = 'expires=Thu, 01 Jan 1970 00:00:00 GMT'
		cookieValue =
			'listCart=' + JSON.stringify(listCart) + '; ' + timeSave + '; path=/;'
	}

	checkCart()
	document.cookie = 'listCart='
}
