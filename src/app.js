//*Dependencias
const express = require('express')

//*Archivos de Rutas
const userRouters = require('./users/users.router').router
const authRouters =require('./auth/auth.router').router
const postRouters = require('./post/post.router').router
//*Configuraciones iniciales
const app = express()

//?Esta configuracion es para Habilitar el req.dody
app.use(express.json())


app.get('/', (req, res) => {
    res.status(200).json({mesasge: 'All ok!'})
})

app.use('/api/v1/users', userRouters)
app.use('/api/v1/auth', authRouters)
app.use('/api/v1/post', postRouters)

app.listen(8000, () => {
    console.log('Server started at port 8000')
})

