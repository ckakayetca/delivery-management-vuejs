const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 5

const roles = ['driver', 'admin']

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [5, 'Password should be at least 5 characters!'],
    },
    role: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return roles.includes(v)
            },
            message: (v) => `Invalid role!`,
        },
    },
    tel: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    reports: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Report',
        },
    ],
})

userSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, saltRounds)

    this.password = hash
})

const User = mongoose.model('User', userSchema)

User.seed = async () => {
    process.stdout.write('Seeding users...... ')

    await User.collection.drop()
    // create first user if none exists
    let users = await User.find()
    if (!users.length) {
        await User.create({
            username: 'admin',
            name: 'Super Admin',
            role: 'admin',
            password: 'admin',
            tel: '0877000000',
        })
    }

    process.stdout.write('Done!\n')
}

module.exports = User
