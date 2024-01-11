const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 5;

const roles = ['driver', 'admin']

const userSchema = new mongoose.Schema(
    {
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
            minlength: [5, 'Password should be at least 5 characters!']
        },
        role: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return roles.includes(v)
                },
                message: (v) => `Invalid role!`
            }
        },
        reports: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Report',
            }
        ]
    }
)

userSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, saltRounds);

    this.password = hash;
})

const User = mongoose.model('User', userSchema);

module.exports = User;