const bcrypt = require('bcrypt');

// Вот хэширование и сравнение. Хэширование с солью, так что должно защиты хватить

exports.cryptPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) reject(err)

            bcrypt.hash(password, salt, function(err, hash) {
                if (err) reject(err)
                else resolve(hash)
            })
        })
    })
}

exports.comparePassword = (plainPass, hashword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainPass, hashword, (err, isPasswordMatch) => {   
            if (err) reject(err)
            else resolve(isPasswordMatch)
        });
    })
};