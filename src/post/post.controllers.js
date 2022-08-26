const uuid = require('uuid')

const postDB = []

const getAllPost = () => {
    return postDB
}

const getPostById = (user_id) => {
    const data = postDB.filter(e => e.user_id === user_id)
    return data.length ? data[0] : false
}

const getAllMyPosts = (user_id) => {
    const data = postDB.filter(e => e.user_id === user_id)
    return data.length ? data[0] : false
}

const getMyPostById = (id, user_id) => {
    const data = postDB.filter(e => e.user_id === user_id)
    const post = data.filter(e => e.id === id)
    return post.length ? post[0] : false
}

const createPost = (user_id, data) => {
    const NewPost = {
        id: uuid.v4(),
        title: data.title,
        content: data.content,
        header_image: data.header_image ? data.header_image : '',
        user_id: user_id,
        published: true
    }

    postDB.push(NewPost)

    return NewPost
}

const edit = (id, user_id, obj) => {
    const data = postDB.filter(e => e.user_id === user_id)
    if(data.length > 0) {
        const index = data.findIndex(e => e.id === id)

        if(index !== -1) {
            data[index] = {
                id: data[index].id,
                title: obj.title ? obj.title : data[index].title,
                content: obj.content ? obj.content : data[index].content,
                header_image: obj.header_image ? obj.header_image : data[index].header_image,
                user_id: data[index].user_id,
                published: obj.published ? obj.published : data[index].published,
            }
        }

        return data[index]
    }

    return false
}

const deletePost = (id, user_id) => {
    if(user_id) {
        const index = postDB.findIndex(e => e.id === id)

        if(index !== -1) {
            postDB.splice(index, 1)
            return true
        }
    }
    return false
}

module.exports = {
    getAllPost,
    getAllMyPosts,
    getPostById,
    getMyPostById,
    createPost,
    edit,
    deletePost
}