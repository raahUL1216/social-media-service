const router = require('express').Router();
const auth = require('../../middleware/verifyJwt');
const userController = require('../../controllers/user.controller');

router.post('/follow/:userId', auth.verifyToken, userController.followUser);
router.post('/unfollow/:userId', auth.verifyToken, userController.unfollowUser);

router.get('/user', auth.verifyToken, userController.getUserProfile);

router.post('/posts', auth.verifyToken, userController.createPost);
router.delete('/posts/:postId', auth.verifyToken, userController.deletePost);

router.post('/like/:postId', auth.verifyToken, userController.likePost);
router.post('/unlike/:postId', auth.verifyToken, userController.unlikePost);

router.post('/comment/:postId', auth.verifyToken, userController.commentOnPost);

router.get('/posts/:postId', auth.verifyToken, userController.getPost);
router.get('/all_posts', auth.verifyToken, userController.getAllPost);

module.exports = router;
