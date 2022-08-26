const router = require('express').Router()
const postServices = require('./post.http')
const passport = require('passport')
require('../middleware/auth.middleware')(passport)

router.route('/')
    .get(postServices.getPosts)
    .post(
        passport.authenticate('jwt', {session: false}),
        postServices.publish
    )

router.route('/:id')
        .get(postServices.getPost)


exports.router = router