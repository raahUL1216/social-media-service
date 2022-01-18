const userHelper = require('../helpers/user.helper');

exports.followUser = async (req, res) => {
	const followableId = req.params.userId,
		followerId = req.userId;

	try {
		const isFollowerCreated = await userHelper.followUser(followableId, followerId);

		if (!isFollowerCreated) {
			return res.status(200).json({ message: `You are already following: ${followableId}` });
		}
	} catch (error) {
		return res.status(500).json({ Error: error.message });
	}

	return res.status(200).json({ message: `You are now following: ${followableId}` });
}

exports.unfollowUser = async (req, res) => {
	const followableId = req.params.userId,
		followerId = req.userId;

	try {
		await userHelper.unfollowUser(followableId, followerId);
	}
	catch (error) {
		return res.status(500).json({ Error: error.message });
	}

	return res.status(200).json({ message: `You have unfollowed user: ${followableId}` });
}

exports.getUserProfile = async (req, res) => {
	let user;

	try {
		user = await userHelper.getUserDetails(req.userId);
	}
	catch (error) {
		return res.status(500).json({ Error: error.message });
	}

	return res.status(200).json(user);
}

exports.createPost = async (req, res) => {
	const postDetails = req.body,
		userId = req.userId;
	let post;

	try {
		post = await userHelper.createPost(userId, postDetails);
	}
	catch (error) {
		return res.status(500).json({ Error: error.message });
	}

	return res.status(200).json(post);
}

exports.deletePost = async (req, res) => {
	const postId = req.params.postId;

	try {
		await userHelper.deletePost(postId);
	}
	catch (error) {
		return res.status(500).json({ Error: error.message });
	}

	return res.status(200).json({ message: `deleted post: ${postId}` });
}

exports.likePost = async (req, res) => {
	const postId = req.params.postId,
		userId = req.userId;
	let postLiked;

	try {
		postLiked = await userHelper.likePost(userId, postId);

		if (postLiked) {
			return res.status(200).json({ message: `you have already liked post: ${postId}` });
		}
	}
	catch (error) {
		return res.status(500).json({ Error: error.message });
	}

	return res.status(200).json({ message: `you have liked post: ${postId}` });
}

exports.unlikePost = async (req, res) => {
	const postId = req.params.postId,
		userId = req.userId;

	try {
		await userHelper.unlikePost(userId, postId);
	}
	catch (error) {
		return res.status(500).json({ Error: error.message });
	}

	return res.status(200).json({ message: `you have unliked post: ${postId}` });
}

exports.commentOnPost = async (req, res) => {
	let commentId;
	const comment = req.body.comment,
		postId = req.params.postId,
		userId = req.userId;

	try {
		commentId = await userHelper.commentOnPost(userId, postId, comment);
	} catch (error) {
		return res.status(500).json({ Error: error.message });
	}

	return res.status(200).json({ commentId: commentId });
}

exports.getPost = async (req, res) => {
	let post;

	try {
		post = await userHelper.getPost(req.params.postId);
	}
	catch (error) {
		return res.status(500).json({ Error: error.message });
	}

	return res.status(200).json(post);
}

exports.getAllPost = async (req, res) => {
	let posts;

	try {
		posts = await userHelper.getAllPost(req.userId);
	}
	catch (error) {
		return res.status(500).json({ Error: error.message });
	}

	return res.status(200).json(posts);
}