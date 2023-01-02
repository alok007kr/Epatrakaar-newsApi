import express from 'express'
const router = express.Router();
import {registerController, loginController, userController, refreshController} from '../controllers';
import articleController from '../controllers/articleController';
import auth from '../middlewares/auth';
import admin from '../middlewares/admin';

/*
router.post('/register', (req,res,next) => {
    //Register logic write here
})
*/
router.post('/register', registerController.register)
router.post('/login', loginController.login)
router.get('/me', auth, userController.me)
router.post('/refresh', refreshController.refresh)
router.post('/logout', auth, loginController.logout)

// Routes related to the article
router.post('/article', auth, articleController.store)
router.put('/article/:id', [auth, admin], articleController.update)
router.delete('/article/:id', [auth, admin], articleController.destroy)
router.get('/articles', articleController.index)
router.get('/articlefilter', articleController.filter)

export default router;