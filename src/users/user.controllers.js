const uuid = require('uuid')
const {comparePassword, hashPassword} = require('../tools/crypt.js')
const userDB = [{
    "id": "b16cc778-f48f-428f-a01c-dd602a5dc07a",
    "first_name": "Anibal",
    "last_name": "Cahfardet",
    "password": "$2b$10$fK.6jBlLl05sjTIFtCod/e5tZAdqBCljJEZPijHj73LjzdtxrOq/e",
    "email": "anibal@example.com",
    "phone": "04142990601",
    "birthday_date": "18/12/2000",
    "profile_img": "",
    "contry": "Venezuela",
    "is_active": true,
    "verified": false
  }, {
    "id": "18ddcae2-be9e-45af-991f-72ece4dd75c2",
    "first_name": "Marco",
    "last_name": "peres",
    "password": "$2b$10$6YHXSPumHxJzDyMZLYO2VuUqb116/yEJ2.D0GAxibJB1hVXDj0bDi",
    "email": "Subarachipanqueque@gmail.com",
    "phone": "",
    "birthday_date": "20/9/2000",
    "profile_img": "",
    "contry": "Argentina",
    "is_active": true,
    "verified": false
  }]

const getAllUsers = () => {
    return userDB
    //select * from users
}

const getUserById = (id) => {
    const data = userDB.filter(item => item.id === id)
    return data.length ? data[0] : false
    //select * from users where id = ${id};
}

const createUser = (data) => {
    const NewUser = {
        id: uuid.v4(), //Obligatorio y unico
        first_name: data.first_name,//Obligatorio
        last_name: data.last_name,//Obligatorio
        password: hashPassword(data.password),//Obligatorio
        email: data.email,//Obligatorio y unico
        phone: data.phone ? data.phone : '',//unico
        birthday_date: data.birthday_date,//Obligatorio
        rol:'normal',//Obligatorio y por defecto normal
        profile_img: data.profile_img ? data.profile_img : '',
        contry: data.contry ,
        is_active: true, //Obligatorio y por defecto true
        verified: false //Obligatorio y por defecto false
    }
    userDB.push(NewUser)
    return NewUser
}

const editUser = (id, data) => {
    const index = userDB.findIndex(e => e.id === id)
    if(index !== -1){
        userDB[index] = {
            id: id,
            first_name: data.first_name,
            last_name: data.last_name,
            password: userDB[index].password,
            email: data.email,
            phone: data.phone ? data.phone : '',
            birthday_date: data.birthday_date,
            rol: userDB[index].rol,
            profile_img: data.profile_img ? data.profile_img : userDB[index].profile_img,
            contry: data.contry,
            is_active: data.is_active,
            verified: false 
    };
        return userDB[index]
    }else{
        return createUser(data)
    }
}

const deleteUser = (id) =>{
    const index = userDB.findIndex(e => e.id === id)
    if( index !== -1){
        userDB.splice(index, 1)
        return true
    }else{
        return false
    }
}

const getUserByEmail = (email) => {
    const data = userDB.filter(item => item.email === email)
    return data.length ? data[0] : false
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    editUser,
    deleteUser,
    getUserByEmail
}
