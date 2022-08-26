const router = require('express').Router()
const passport = require('passport')
const userServices = require('./user.http')
const postServices = require('../post/post.http')
require('../middleware/auth.middleware')(passport)

router.route('/')  //*/api/v1/users
    .get(userServices.getAll)
    .post(userServices.register)

router.route('/me')
    .get(
        passport.authenticate('jwt', {session: false}),
        userServices.getMyUser
    )
    .put(
        passport.authenticate('jwt', {session: false}),
        userServices.editMyUser
    )
    .delete(
        passport.authenticate('jwt', {session: false}),
        userServices.deleteMyUser
    )

router.route('/me/post')
    .get(
        passport.authenticate('jwt', {session: false}),
        postServices.getMyPosts
    )

router.route('/me/post/:id')
    .get(
        passport.authenticate('jwt', {session: false}),
        postServices.getMyPost
    )
    .put(
        passport.authenticate('jwt', {session: false}),
        postServices.edit
    )
    .delete(
        passport.authenticate('jwt', {session: false}),
        postServices.remove
    )

router.route('/:id')
    .get(userServices.getById)
    .delete(userServices.remove)
    .patch(userServices.edit)



exports.router = router