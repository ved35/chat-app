const UserRouter = require('express').Router();
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const protect = require('../middleware/protect');

UserRouter.use(protect);

UserRouter.get('/me', userController.getMe);
UserRouter.patch('/updateMe', userController.updateMe);
UserRouter.patch('/updateAvatar', userController.updateAvatar);
UserRouter.patch('/updatePassword', userController.updatePassword);
UserRouter.get('/getUser', userController.getUser);
UserRouter.post('/start-conversation', userController.startConversation);
UserRouter.get('/get-conversations', userController.getConversations);

module.exports = UserRouter;