const router = require('express').Router();
const { isAuth, auth } = require('../middlewares/auth');
const {
	register,
	login,
	getInfo,
	editInfo,
	verifyToken
} = require('../managers/userManager');

// verify jwt

router.get('/', async (req, res) => {
	const token = req.cookies['auth']
	if (!token) {
		console.log('no token')
		res.status(200).send({ message: 'No token!' });
	} else {
		let verify = verifyToken(token);
		console.log(verify)
		res.status(200).json(verify)
	}
})

// login

router.post('/login', async (req, res) => {
	try {
		const { username, password } = req.body;

		const [token, user] = await login({ username, password });

		res.cookie('auth', token, { httpOnly: false });
		res.status(200).json(user);
	} catch (error) {
		console.log(error)
		res.status(401).json({ message: error.message });
	}
});

// register

router.post('/register', async (req, res) => {
	try {
		console.log('register')
		const { username, password, role, tel, name } = req.body;

		await register({ username, password, role, tel, name });

		res.status(200).json({
			message: 'Успешна регистрация!',
		})
	} catch (error) {
		console.log(error)
		res.json({ message: error.message });
	}
});

// logout

router.get('/logout', (req, res) => {
	try {
		res.clearCookie('auth').status(200).json({ message: 'Logged out!' });
	} catch (error) {
		res.json({ message: error });
	}
});

// get profile info

router.get('/profile', async (req, res) => {
	console.log(req.user, 'here')
	const id = req.user?._id;
	console.log(id)
	try {
		let user = await getInfo(id);
		console.log(user, 'userController get profile')
		res.status(200).json(user);
	} catch (error) {
		console.log(error.message)
		console.log('response is UNDEFINED')
		res.send(undefined);
	}
});

// edit profile info

router.put('/profile', isAuth, async (req, res) => {
	const id = req.user._id;
	const { username, password, role } = req.body;
	console.log('PUT /PROFILE');
	try {
		let newUser = await editInfo(id, { username, password, role });

		res.status(200).json(newUser);
	} catch (error) {
		res.status(401).json({ message: error });
	}
});


module.exports = router;
