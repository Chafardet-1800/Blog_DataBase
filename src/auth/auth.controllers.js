const { comparePassword } = require('../tools/crypt')
const {getUserByEmail} = require('../users/user.controllers.js')

const loginUser = (email, password) => {
    const user = getUserByEmail(email)

    if(user){
        //? user.password Hasheada
        //* passwor texto plano
        const verify_password = comparePassword(password, user.password)

        if(verify_password){
            return user
        }

    }
    
    return false
    
}

module.exports = {
    loginUser
}