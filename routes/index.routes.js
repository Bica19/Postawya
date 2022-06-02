const indexRouter = require('express').Router()
const indexModel = require('../models/index.model')
const postsModel = require('../models/posts.model')
const controller=require('../controllers/index.controller')
const posts=require('../controllers/posts.controller')
const validation=require('../controllers/validation.controller')
const isLoggedIn=require('../middleware/auth')
indexRouter.get('/',controller.signup )
indexRouter.get('/signup',controller.signup )
indexRouter.post('/handleSignUp',validation.signupValidation,controller.handleSignUp )
indexRouter.get('/signin',controller.signin )
indexRouter.post('/handleSignin',controller.handleSignin )
indexRouter.get('/home',isLoggedIn,controller.home )
indexRouter.post('/addPost',isLoggedIn,posts.addPost )
indexRouter.get('/profile',isLoggedIn,controller.profile )
indexRouter.get('/acount_setting',isLoggedIn,controller.accSetting )
indexRouter.post('/handleSetting',isLoggedIn,validation.changePass,controller.handleSetting )
indexRouter.get('/logout',controller.logout )
indexRouter.get('*',controller.notfound )




module.exports = indexRouter