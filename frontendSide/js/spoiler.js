$(document).ready(function () {
	//----Spoiler

	document.querySelectorAll('.qna__question').forEach(el => {
		el.addEventListener('click', () => {
			let content = el.nextElementSibling
			let question = el
			let block = el.parentNode

			if (content.style.maxHeight) {
				document
					.querySelectorAll('.qna__answer')
					.forEach(el => (el.style.maxHeight = null))

				document
					.querySelectorAll('.qna__question')
					.forEach(el => el.classList.remove('active'))
				document
					.querySelectorAll('.qna__block')
					.forEach(el => el.classList.remove('active'))
			} else {
				document
					.querySelectorAll('.qna__answer')
					.forEach(el => (el.style.maxHeight = null))
				content.style.maxHeight = content.scrollHeight + 'px'

				document
					.querySelectorAll('.qna__question')
					.forEach(el => el.classList.remove('active'))
				question.classList.add('active')
				document
					.querySelectorAll('.qna__block')
					.forEach(el => el.classList.remove('active'))
				block.classList.add('active')
			}
		})
	})

	document.querySelectorAll('.firma__question').forEach(el => {
		el.addEventListener('click', () => {
			let content = el.nextElementSibling
			let question = el
			let block = el.parentNode

			if (content.style.maxHeight) {
				document
					.querySelectorAll('.firma__answer')
					.forEach(el => (el.style.maxHeight = null))

				document
					.querySelectorAll('.firma__question')
					.forEach(el => el.classList.remove('active'))
				document
					.querySelectorAll('.firma__block')
					.forEach(el => el.classList.remove('active'))
			} else {
				document
					.querySelectorAll('.firma__answer')
					.forEach(el => (el.style.maxHeight = null))
				content.style.maxHeight = content.scrollHeight + 'px'

				document
					.querySelectorAll('.firma__question')
					.forEach(el => el.classList.remove('active'))
				question.classList.add('active')
				document
					.querySelectorAll('.firma__block')
					.forEach(el => el.classList.remove('active'))
				block.classList.add('active')
			}
		})
	})
})
