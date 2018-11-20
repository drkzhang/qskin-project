module.exports = {

    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable(
            'posts', {
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
                user_id: {
                    type: Sequelize.INTEGER(11),
                    allowNull: false,
                    references: {
                        model: 'users',
                        key: 'id'
                    },
                },
                parent_post_id: {
                    type: Sequelize.INTEGER(11),
                    allowNull: true,
                    references: {
                        model: 'posts',
                        key: 'id'
                    },
                },
                active: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: true
                },

                created_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
                },
                updated_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue:Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
                }
                

        }).then(function() {
            return queryInterface.createTable (
            'post_photo_map', {
                id: {
                    type: Sequelize.INTEGER(11),
                    primaryKey: true,
                    allowNull: false,
                    isUnique: true,
                    autoIncrement: true, 
                },
                post_id: {
                    type: Sequelize.INTEGER(11),
                    allowNull: false,
                    references:{
                        model:'posts',
                        key:'id'
                    }
                },
                photo_url: {
                    type: Sequelize.STRING(100),
                    allowNull: false
                  
                },
                active: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: true,
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
                },
                updated_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue:Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
                }
        })
    })},
    down:function(queryInterface, Sequelize){}
}
    
    