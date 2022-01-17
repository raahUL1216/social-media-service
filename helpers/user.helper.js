const { sequelize, User, UserFollower, Post, PostLikesUnlike, PostComment } = require('../models')

exports.createUser = async (email, password) => {
	let user, created;

	try {
		[user, created] = await User.findOrCreate({
			where: { email: email },
			defaults: {
				email: email,
				password: password
			}
		});
	} catch (error) {
		console.log(error);
		throw new Error('Error while creating user.');
	}

	return user.id;
}

exports.followUser = async (followableId, followerId) => {
	let user, created;

	try {
		[user, created] = await UserFollower.findOrCreate({
			where: { user_id: followableId, follower_id: followerId },
			defaults: {
				user_id: followableId,
				followr_id: followerId
			}
		});
	} catch (error) {
		console.log(error);
		throw new Error('Error while following user.');
	}

	return created;
}

exports.unfollowUser = async (followableId, followerId) => {
	try {
		await UserFollower.destroy({
			where: {
				user_id: followableId,
				follower_id: followerId
			}
		});
	} catch (error) {
		console.log(error);
		throw new Error('Error while unfollowing user.');
	}
}

exports.getUserDetails = async (userId) => {
	let user;

	try {
		user = await User.findByPk(userId, {
			attributes: [['email', 'name']],
			raw: true
		});

		const followers = await UserFollower.count({ col: 'user_id', where: { user_id: userId } });
		const following = await UserFollower.count({ col: 'follower_id', where: { follower_id: userId } });

		user.followersCount = followers;
		user.followingCount = following;
	} catch (error) {
		console.log(error);
		throw new Error('Error while getting user details.');
	}

	return user;
}

exports.createPost = async (userId, postDetails) => {
	let createdPost;

	try {
		let post = {
			title: postDetails.title,
			description: postDetails.description,
			user_id: userId
		};

		createdPost = await Post.create(post, {
			attributes: ['id', 'title', 'description', 'created_time'],
			raw: true
		});
	} catch (error) {
		console.log(error);
		throw new Error('Error while creating post.');
	}
	return createdPost;

}

exports.deletePost = async (postId) => {
	try {
		await Post.destroy({
			where: {
				id: postId,
			}
		});
	} catch (error) {
		console.log(error);
		throw new Error('Error while deleting post.');
	}
}

exports.likePost = async (userId, postId) => {
	let alreadyLiked = false;

	try {
		const isPostLikedBefore = await PostLikesUnlike.findOne({
			where: { post_id: postId, user_id: userId }
		});

		if (isPostLikedBefore) {
			const likeStatus = isPostLikedBefore.liketype;

			if (likeStatus === '0') {
				await isPostLikedBefore.update({ liketype: '1' });
			} else {
				alreadyLiked = true;
			}
		} else {
			await PostLikesUnlike.create({
				post_id: postId,
				user_id: userId,
				liketype: '1'
			});

		}
	} catch (error) {
		console.log(error);
		throw new Error('Error while like post.');
	}

	return alreadyLiked;
}

exports.unlikePost = async (userId, postId) => {
	try {
		await PostLikesUnlike.update(
			{ liketype: '0' },
			{
				where: { post_id: postId, user_id: userId }
			});
	} catch (error) {
		console.log(error);
		throw new Error('Error while unlike post operation.');
	}
}

exports.commentOnPost = async (userId, postId, comment) => {
	let commentId;

	try {
		const createdComment = await PostComment.create({
			post_id: postId,
			comment: comment,
			user_id: userId
		}, {
			row: true
		});

		commentId = createdComment.id;
	} catch (error) {
		console.log(error);
		throw new Error('Error while commenting on post.');
	}

	return commentId;
}

exports.getPost = async (postId) => {
	let post;

	try {
		post = await Post.findOne({
			where: { id: postId },
			attributes: ['id'],
			include: [
				{
					model: PostLikesUnlike,
					required: false,
					attributes: [[sequelize.fn("COUNT", sequelize.col("PostLikesUnlikes.id")), "likesCount"]]
				},
				{
					model: PostComment,
					required: false,
					attributes: ['comment']
				}
			],
			group: ['Post.id', 'PostLikesUnlikes.id', 'PostComments.id'],
		});
	} catch (error) {
		console.log(error);
		throw new Error('Error while getting post.');
	}

	return post;
}

exports.getAllPost = async (userId) => {
	let posts;

	try {
		posts = await User.findAll({
			where: { id: userId },
			attributes: [],
			include: [
				{
					model: Post,
					required: true,
					attributes: ['id', 'title', 'description', 'created_at'],
					include: [
						{
							model: PostLikesUnlike,
							required: false,
							attributes: [[sequelize.fn("COUNT", sequelize.col("Posts->PostLikesUnlikes.id")), "likesCount"]]
						},
						{
							model: PostComment,
							required: false,
							attributes: ['comment']
						}
					],
					group: ['Posts.id', 'Posts->PostLikesUnlikes.id', 'PostComment.id']
				}
			],
			group: ['User.id', 'Posts.id', 'Posts->PostLikesUnlikes.id', 'Posts->PostComments.id'],
		});
	} catch (error) {
		console.log(error);
		throw new Error('Error while getting all user post.');
	}

	return posts;
}
