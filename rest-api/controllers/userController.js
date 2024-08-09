const router = require('express').Router()
const { isAuth, isAdmin } = require('../middlewares/auth')
const { register, login, getInfo, editInfo, verifyToken, getUsers } = require('../managers/userManager')

// verify jwt

router.get('/', async (req, res) => {
    const token = req.cookies['auth']
    if (!token) {
        res.status(401).send({ message: 'No token!' })
    } else {
        let isValid = verifyToken(token)

        res.status(isValid ? 200 : 401)
    }
})

// get all users

router.get('/all', isAdmin, async (req, res) => {
    try {
        const users = await getUsers()

        res.status(200).json(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

// login

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body

        const [token, user] = await login({ username, password })

        res.cookie('auth', token, { httpOnly: false })
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})

// register

router.post('/register', async (req, res) => {
    try {
        const { username, password, role, tel, name } = req.body

        await register({ username, password, role, tel, name })

        res.status(200).json({
            message: 'Успешна регистрация!',
        })
    } catch (error) {
        console.log(error)
        res.json({ message: error.message })
    }
})

// logout

router.get('/logout', (req, res) => {
    try {
        res.clearCookie('auth').status(200).json({ message: 'Logged out!' })
    } catch (error) {
        res.json({ message: error })
    }
})

// get profile info

router.get('/profile', async (req, res) => {
    const id = req.user?._id
    try {
        let user = await getInfo(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(403).json({ message: error.message })
    }
})

// edit profile info

router.patch('/profile', isAuth, async (req, res) => {
    const id = req.user._id
    const { username, password, role } = req.body

    try {
        let newUser = await editInfo(id, { username, password, role })

        res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

module.exports = router
