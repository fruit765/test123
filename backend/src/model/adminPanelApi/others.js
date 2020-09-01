const User = require("../orm/user")

function getUserById(id) {
    return User.query().withGraphFetched("permission").findById(id)
}

function checkLoginPassword(email, password) { //Проверка на присутствие в базе пары логин/пароль
    return User
        .query()
        .withGraphFetched("permission")
        .first()
        .where("email", email)
        .then(user => {
            return (user && user.verifyPassword(password)) ? user : false
        })
}

exports.checkLoginPassword = checkLoginPassword
exports.getUserById = getUserById
