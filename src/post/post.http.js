const postControllers = require('./post.controllers')

const getPosts = (req, res) => {
    const data = postControllers.getAllPost()
    res.status(200).json({
        items: data.length,
        users: data
    })
}

const getPost = (req, res) => {
    const id = req.params.id
    const data = postControllers.getPostById(id)
    if(data) {
        res.status(200).json(data)
    }else{
        res.status(404).json({
            message: 'The post with the indicated ID does not exist.'
        })
    }
}

const getMyPosts = (req, res) => {
    const user_id = req.user.id
    const data = postControllers.getPostById(user_id)

    if(data) {
        res.status(200).json(data)
    }else{
        res.status(404).json({
            message: "This user don't have any post or don't exist"
        })
    }
}

const getMyPost = (req, res) => {
    const user_id = req.user.id
    const id = req.params.id
    const data = postControllers.getMyPostById(id, user_id)

    if(data) {
        res.status(200).json(data)
    }else{
        res.status(404).json({
            message: 'The post with the indicated ID does not exist.'
        })
    }
}

const publish = (req, res) => {
    const user_id = req.user.id;
    const data = req.body;
    
    if(!data){
        return res.status(400).json({
            message: 'Missing Data.' 
        })
    }
    else if(
        !data.title,
        !data.content,
        !user_id
    ){
        return res.status(400).json({
            message: 'All fields must be completed and the user loged.',
            fields: {
                "title": "string",
                "content":"string"
            },
        });
    }else{
        const response = postControllers.createPost(user_id, data)
        return res.status(201).json({
            message: `Post created succesfully with id: ${response.id}`,
            user: response
        })
    }
}

const remove = (req, res) => {
    const user_id = req.user.id
    const id = req.params.id

    const data = postControllers.deletePost(id, user_id)
    
    if(data) {
        res.status(204).json()
    }else{
        res.status(400).json({
            message: 'Invalid ID or unauthorized'
        })
    }
}

const edit = (req, res) => {
    const user_id = req.user.id
    const id = req.params.id
    const data = req.body

    if(!Object.keys(data).length){
        return res.status(400).json({
            message: 'Missing Data.' 
        })
    } else if(
        !data.title,
        !data.content,
        !user_id
    ){
        return res.status(400).json({
            message: 'All fields must be completed and the user loged.',
            fields: {
                "title": "string",
                "content":"string"
            },
        });
    }else{
        const response = postControllers.edit(id, user_id, data)
        return res.status(201).json({
            message: `Post edited succesfully`,
            user: response
        })
    }
}


module.exports = {
    getPosts,
    getPost,
    getMyPosts,
    getMyPost,
    publish,
    remove,
    edit,
}