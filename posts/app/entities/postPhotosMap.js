export default function(sequelize, Sequelize) {
    const PostPhotosMap = sequelize.define('PostPhotosMap', {
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            isUnique: true,
            autoIncrement: true, 
        },
        postId: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            field: "post_id"
        },
        photoUrl: {
            type: Sequelize.STRING(100),
            allowNull: false,
            field: "photo_url",
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        }
    }, {
        tableName: 'post_photo_map',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscoredAll: true,
    })

    PostPhotosMap.associate = function(entities) {
        PostPhotosMap.belongsTo(entities.Posts)
    }

    /**above are DB settings of the entity. below are 
	the business logics of Users entity.
    **/   
    PostPhotosMap.new = function(postId, photoUrl) {
		const newPostPhotosMapAction = new Promise((resolve, reject) => {				
			const newPostPhotosMap = {
				postId,
				photoUrl,
				active: true,
			}
            PostPhotosMap.create(newPostPhotosMap)
            .then(function(postPhotosMap) {
                resolve(true)
            }).catch(function(err){
                reject(err)
            })
		})
		return newPostPhotosMapAction
    }
    
    return PostPhotosMap
}