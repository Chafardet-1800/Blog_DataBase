const userControllers = require('./user.controllers.js')

const getAll = (req, res) => {
    const data = userControllers.getAllUsers();
    res.status(200).json({
        items: data.length,
        users: data
    })
}

const getById = (req, res) => {
    const id = req.params.id
    const data = userControllers.getUserById(id)

    if(data) {
        res.status(200).json(data)
    }else{
        res.status(404).json({
            message: 'The user with the indicated ID does not exist.'
        })
    }
}

const register = (req, res) => {
    const data = req.body
    
    if(!data){
        return res.status(400).json({
            message: 'Missing Data.' 
        })
    }
    else if(
        !data.first_name ||
        !data.last_name ||
        !data.email ||
        !data.password ||
        !data.birthday_date ||
        !data.contry 
    ){
        return res.status(400).json({
            message: 'All fields must be completed.',
            fields: {
                first_name: 'string',
                last_name: 'string',
                email: 'example@example.com',
                password: 'string',
                birthday_date: 'DD/MM/YYYY',
                contry: 'string',
            },
        });
    }else{
        const response = userControllers.createUser(data)
        return res.status(201).json({
            message: `User created succesfully with id: ${response.id}`,
            user: response
        })
    }
}

const remove = (req, res) => {
    const id = req.params.id;
    const data = userControllers.deleteUser(id);
    
    if(data) {
        res.status(204).json()
    }else{
        res.status(400).json({
            message: 'Invalid ID'
        })
    }
}

const edit = (req, res) => {
    const id = req.params.id;
    const data = req.body;

    if(!Object.keys(data).length){
        return res.status(400).json({
            message: 'Missing Data.' 
        })
    } else if(
        !data.first_name ||
        !data.last_name ||
        !data.email ||
        !data.phone ||
        !data.rol ||
        !data.profile_image ||
        !data. birthday_date ||
        !data.contry ||
        !data.is_active
    ){
        return res.status(400).json({
            message: 'All fields must be completed.',
            fields: {
                first_name: 'string',
                last_name: 'string',
                email: 'example@example.com',
                phone: '+58xxx-xxx-xxxx',
                rol: 'string',
                profile_image: 'string',
                birthday_date: 'DD/MM/YYYY',
                contry: 'string',
                is_active: true
            },
        });
    }else{
        const response = userControllers.editUser(id, data)
        return res.status(201).json({
            message: `User edited succesfully`,
            user: response
        })
    }
}

const editMyUser = (req, res) => {
    const id = req.user.id;
    const data = req.body;

    if(!Object.keys(data).length){
        return res.status(400).json({
            message: 'Missing Data.' 
        })
    } else if(
        !data.first_name ||
        !data.last_name ||
        !data.email ||
        !data.phone ||
        !data. birthday_date ||
        !data.contry ||
        !data.is_active
    ){
        return res.status(400).json({
            message: 'All fields must be completed.',
            fields: {
                first_name: 'string',
                last_name: 'string',
                email: 'example@example.com',
                phone: '+58xxx-xxx-xxxx',
                profile_image: 'string',
                birthday_date: 'DD/MM/YYYY',
                contry: 'string',
                is_active: true
            },
        });
    }else{
        const response = userControllers.editUser(id, data)
        return res.status(201).json({
            message: `User edited succesfully`,
            user: response
        })
    }
}

const getMyUser = (req, res) => {
    const id = req.user.id
    const data = userControllers.getUserById(id)

    if(data) {
        res.status(200).json(data)
    }else{
        res.status(404).json({
            message: 'The user with the indicated ID does not exist.'
        })
    }
}

const deleteMyUser = (req, res) => {
    const id = req.user.id;
    const data = userControllers.deleteUser(id);
    
    if(data) {
        res.status(204).json()
    }else{
        res.status(400).json({
            message: 'Invalid ID'
        })
    }
}

module.exports = {
    getAll,
    getById,
    register,
    remove,
    edit,
    getMyUser,
    editMyUser,
    deleteMyUser
}