import uuid from 'uuid'
import entities from '../entities'

export default function(sequelize, Sequelize) {
	const Posts = sequelize.define('Posts', {
		id: {
			type: Sequelize.INTEGER(11),
			primaryKey: true,
			allowNull: false,
			isUnique: true,
			autoIncrement: true
		},
		uuid: {
			type: Sequelize.STRING(45),
			allowNull: false,
			isUnique: true
		},
		title: {
			type: Sequelize.STRING(100),
			allowNull: false
		},
		content: {
			type: Sequelize.STRING(300),
			allowNull: false
		},
		level:{
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		userId: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			field: "user_id"
		},
		parentPostId: {
			type: Sequelize.INTEGER(11),
			allowNull: true,
			field: "parent_post_id"
		},
		active: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: true
		}
	}, {
		tableName: 'posts',
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		timestamps: true,
		underscoredAll: true
	})

	Posts.associate = function(entities) {
		Posts.belongsTo(entities.Users, {foreignKey: 'user_id'})
		Posts.belongsTo(entities.Posts, {foreignKey: 'parent_post_id'})
		Posts.hasMany(entities.PostPhotosMap)
	}

	/**above are DB settings of the entity. below are 
	the business logics of Users entity.
	**/
	Posts.new = function(title, content, user_id, files) {
		const newPostAction = new Promise((resolve, reject) => {				
			const uuidv4 = uuid.v4()
			console.log(uuidv4)
			const newPost = {
				uuid: uuidv4,
				title,
				content,
				userId: user_id,
				parentPostId: null,
				active: true,
			}
			Posts.create(newPost)
			.then(function(post) {
				if(files){
					let promises = []
					for(let i = 0; i < files.length; i++) {
						promises.push(entities.PostPhotosMap.new(post.id, files[i]))
					}
					Promise.all(promises)
					.then(function(postPhotosMaps){
						resolve(true)	
					})
					.catch(function(err){
						reject(err)
					})
				} else {
					resolve(true)
				}				
			}).catch(function(err){
				reject(err)
			})
		})
		return newPostAction
	}
  
	Posts.reply = function(title, content, userId, parentPostId) {
		const replyAction = new Promise((resolve, reject) => {
			Posts.find({where: {uuid: parentPostId}})
			.then(function(post) {
				if(post){
					const level = level ? level + 1 : 1
					const replyPost = {
						title,
						content,
						userId,
						uuid: uuid.v4(),
						parentPostId: post.id,
						level:level
					}
					Posts.create(replyPost)
					.then(function(){
						resolve(true)
						}).catch(function(err){
									reject(err)
									})
				}			
				else{
					reject(Error('Parent post does not exist'))
				}
			}).catch(function(pErr){
				reject(pErr)
			})
			}
		)
		return replyAction
	}
  
	Posts.list = function() {
		const getPostsList = new Promise((resolve, reject) => {
			Posts.findAll({
				raw: true,
				where: {
					parentPostId: null,
				},
				order: [['created_at', 'DESC']],
			})
			.then(posts => {
				const addUserPromises = posts.map(post => {
					return entities.Users.find({
						raw: true,
						where: {
							uuid: post.userId,
						}
					})
					.then(user => {
						if (!user) {
							reject(new Error('User does not exist.'))
						} else {
							post.user = {
								uuid: user.uuid,
								username: user.username,
							}
							delete post.userId
							delete post.parentPostId
							delete post.user_id
							return post
						}
					})
					.catch(findUserErr => {
						reject(findUserErr)
					})
				})

				Promise.all(addUserPromises)
					   .then(posts => {
							const addPhotoUrlPromises = posts.map(post => {
								return entities.PostPhotosMap.findAll({
									raw: true,
									attributes: ['photoUrl'],
									where: {
										postId: post.id,
										active: true,
									}
								})
								.then(photoUrls => {
									if (photoUrls) {
										const photoUrlsResponse = []
										for (let photoUrl of photoUrls) {
											photoUrlsResponse.push(photoUrl.photoUrl)
										}

										if (photoUrlsResponse.length > 9) {
											photoUrlsResponse.slice(0, 9)
										}
										post.photoUrls = photoUrlsResponse
									}
									delete post.id
									return post
								})
								.catch(findPhotosErr => {
									reject(findPhotosErr)
								})
							})
			
							Promise.all(addPhotoUrlPromises)
								.then(posts => {
									resolve(posts)
								})
								.catch(addPhotosErr => {
									reject(addPhotosErr)
								})
					   })
					   .catch(addUsersErr => {
						   reject(addUsersErr)
					   })
			})
			.catch((findListErr) => {
				reject(findListErr)
			})
		})
		return getPostsList
	}
	return Posts
}