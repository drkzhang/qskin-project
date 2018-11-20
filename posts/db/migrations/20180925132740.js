module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.sequelize.query(
            'ALTER TABLE posts.users ADD UNIQUE (uuid);'
        )
        .then(function() {
            return queryInterface.sequelize.query(
                'ALTER TABLE posts.posts DROP FOREIGN KEY posts_ibfk_1;'
            )
        })
        .then(function() {
            return queryInterface.changeColumn(
                'posts',
                'user_id',
                {
                    type: Sequelize.STRING(45),
                }
            )
        })
        .then(function() {
            return queryInterface.sequelize.query(
                'ALTER TABLE posts.posts ADD CONSTRAINT posts_ibfk_1 FOREIGN KEY (user_id) REFERENCES posts.users(uuid);'
            )
        })
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.sequelize.query(
            'ALTER TABLE posts.posts DROP FOREIGN KEY posts_ibfk_1;'
        )
        .then(function() {
            return queryInterface.sequelize.query(
                'ALTER TABLE posts.users DROP INDEX uuid;'
            )
        })
        .then(function() {
            return queryInterface.changeColumn(
                'posts',
                'user_id',
                {
                    type: Sequelize.INTEGER(11),
                }
            )
        })
        .then(function() {
            return queryInterface.sequelize.query(
                'ALTER TABLE posts.posts ADD CONSTRAINT posts_ibfk_1 FOREIGN KEY (user_id) REFERENCES posts.users(id);'
            )
        })

    }
}