const express = require('express');
const {userController} = require('../controller')
const { verifyAccessToken } = require('../_helper/jwt_helper')


const router = express.Router();

// router
//   .route('/')
//   .get(userController.getAcency)
//   .post(userController.createUser);

router.get('/view',verifyAccessToken, userController.getUser )
router.post('/create', userController.createUser )
router.patch('/update/:id', userController.updateUser )


router.post('/login', userController.login )
router.delete('/logout', userController.logOut)
router.post('/refresh', userController.refreshToken )


module.exports = router;