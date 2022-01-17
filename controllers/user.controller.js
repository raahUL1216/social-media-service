const { user } = require('pg/lib/defaults');
const userHelper = require('../helpers/user.helper');

exports.followUser = async (req, res) => {
	const followableId = req.params.userId,
		followerId = req.userId;

	const isFollowerCreated = await userHelper.followUser(followableId, followerId);

	if (!isFollowerCreated) {
		return res.status(200).json({ message: `You are already following: ${followableId}` });
	}

	return res.status(200).json({ message: `You are now following: ${followableId}` });
}

exports.unfollowUser = async (req, res) => {
	const followableId = req.params.userId,
		followerId = req.userId;

	await userHelper.unfollowUser(followableId, followerId);

	return res.status(200).json({ message: `You have unfollowed: ${followableId}` });
}

exports.getUserProfile = async (req, res) => {
	const userId = req.userId;
	const user = await userHelper.getUserDetails(userId);

	return res.status(200).json({ user: user });
}

exports.createPost = async (req, res) => {
	const postDetails = req.body,
		userId = req.userId;
	const post = await userHelper.createPost(userId, postDetails);

	return res.status(200).json({ post: post });
}


exports.deletePost = async (req, res) => {
	const postId = req.params.postId;
	await userHelper.deletePost(postId);

	return res.status(200).json({ message: `deleted post: ${postId}` });
}

exports.likePost = async (req, res) => {
	const postId = req.params.postId,
		userId = req.userId;

	const postLiked = await userHelper.likePost(userId, postId);

	if (postLiked) {
		return res.status(200).json({ message: `you have already liked post: ${postId}` });
	}

	return res.status(200).json({ message: `you have liked post: ${postId}` });
}

exports.unlikePost = async (req, res) => {
	const postId = req.params.postId,
		userId = req.userId;

	await userHelper.unlikePost(userId, postId);

	return res.status(200).json({ message: `you have unliked post: ${postId}` });
}


exports.commentOnPost = async (req, res) => {
	const comment = req.body.comment,
		postId = req.params.postId,
		userId = req.userId;

	const commentId = await userHelper.commentOnPost(userId, postId, comment);

	return res.status(200).json({ commentId: commentId });
}

exports.getPost = async (req, res) => {
	const postId = req.params.postId;
	const post = await userHelper.getPost(postId);

	return res.status(200).json({ post: post });
}


exports.getAllPost = async (req, res) => {
	const userId = req.userId;

	const posts = await userHelper.getAllPost(userId);

	return res.status(200).json({ posts });
}