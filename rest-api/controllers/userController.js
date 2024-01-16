const router = require('express').Router();
const { isAuth } = require('../middlewares/auth');
const {
	register,
	login,
	getInfo,
	editInfo,
} = require('../managers/userManager');

// login

router.post('/login', async (req, res) => {
	try {
		const { username, password } = req.body;

		const [token, user] = await login({ username, password });

		res.cookie('auth', token, { httpOnly: false });
		res.status(200).json(user);
	} catch (error) {
		res.status(401).send({ message: error.message });
	}
});

// register

router.post('/register', async (req, res) => {
	try {
		console.log('register')
		const { username, password, role, tel, name} = req.body;

		let user = await register({ username, password, role, tel, name });
		res.status(200).json(user)
	} catch (error) {
		console.log(error)
		res.send({ message: error.message });
	}
});

// logout

router.get('/logout', (req, res) => {
	try {
		res.clearCookie('auth').status(204).send({ message: 'Logged out!' });
	} catch (error) {
		res.send(error);
	}
});

// get profile info

router.get('/profile', async (req, res) => {
	const id = req.user?._id;

	try {
		let user = await getInfo(id);
		console.log(user)
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
		res.send(error);
	}
});

module.exports = router;
