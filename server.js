const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const User = require('./models/user')
const History = require('./models/shop_history')
const { error } = require('console')

const app = express()

app.set('view engine', 'ejs')

const PORT = 4500

const createPath = page =>
	path.resolve(__dirname, 'frontendSide/html-ejs', `${page}.ejs`)

// Connect the MongoDB
const db =
	'mongodb+srv://Suasti:Dog2484996@mrfox.wyazmjj.mongodb.net/MrFox?retryWrites=true&w=majority'

mongoose
	.connect(db)
	.then(res => console.log('Connected to DB'))
	.catch(error => console.log(error))

app.listen(PORT, 'localhost', error => {
	error ? console.log(error) : console.log(`Listening port: ${PORT}`)
})

app.use(express.urlencoded({ extended: false }))

//Give the right to the browser to get static files (css, js)
app.use(express.static('frontendSide'))

// Navigation
app.get('/', (req, res) => {
	const title = 'Home'
	res.render(createPath('index'), { title })
})

app.get('/contact', (req, res) => {
	const title = 'Contact'
	res.render(createPath('contact'), { title })
})

app.get('/product', (req, res) => {
	const title = 'Products'
	res.render(createPath('product'), { title })
})

app.get('/firma', (req, res) => {
	const title = 'Firma'
	res.render(createPath('firma'), { title })
})

app.get('/review', (req, res) => {
	const title = 'Review'
	res.render(createPath('review'), { title })
})

app.get('/userpage', (req, res) => {
	res.render(createPath('userpage'))
})

app.post('/review', async (req, res) => {
	const title = 'Review'
	const data = {
		username: req.body.username,
		email: req.body.email,
		city: req.body.city,
		zip: req.body.zip,
		quantity: req.body.quantity,
		suma: req.body.suma,
	}
	await History.insertMany([data])

	res.render(createPath('thank'), { title })
})

app.post('/register', async (req, res) => {
	const data = {
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
	}

	try {
		await User.insertMany([data])
	} catch (error) {
		if (error.code === 11000) {
			//Duplicate key
			return res.json({
				status: 'error ',
				error: ' Email or Username already in use',
			})
		}
		throw error
	}

	res.redirect('/')
})
app.post('/login', async (req, res) => {
	try {
		const check = await User.findOne({ email: req.body.email })
		if (check.email === 'admin@admin') {
			const name = check.username
			var username = encodeURIComponent(name)
			res.redirect('/admin?username=' + username)
		} else if (check.password === req.body.password) {
			const name = check.username
			var username = encodeURIComponent(name)
			res.redirect('/user?username=' + username)
		} else {
			res.send('Wrong password')
		}
	} catch {
		res.send('Wrong details')
	}
})

app.get('/product/shopitem', (req, res) => {
	const title = 'ShopItem'
	res.render(createPath('shopitem'), { title })
})

app.get('/login', (req, res) => {
	const title = 'Login'
	res.render(createPath('login'), { title })
})

app.get('/register', (req, res) => {
	const title = 'Register'
	res.render(createPath('register'), { title })
})
app.get('/user', async (req, res) => {
	const title = 'UserPage'
	let queryUsername = req.query.username

	const userInfo = await User.find({ username: queryUsername })
	const historyInfo = await History.find({
		username: queryUsername,
	})

	res.render(createPath('userpage'), {
		title,
		queryUsername,
		user: userInfo,
		history: historyInfo,
	})
})
app.get('/admin', async (req, res) => {
	const title = 'Admin Dashboard'
	let queryUsername = req.query.username
	const userInfoFull = await User.find()
	const historyInfoFull = await History.find()
	res.render(createPath('admin'), {
		title,
		queryUsername,
		users: userInfoFull,
		histories: historyInfoFull,
	})
})

//Redirection
app.get('/index.html', (req, res) => {
	res.redirect('/')
})
app.get('/product.html', (req, res) => {
	res.redirect('/product')
})
app.get('/contact.html', (req, res) => {
	res.redirect('/contact')
})

app.get('/html/product.html', (req, res) => {
	res.redirect('/product')
})

//The order of navigation matters in Node.js and Express

app.use((req, res) => {
	res.status(404).send('PAGE NOT FOUND')
})
