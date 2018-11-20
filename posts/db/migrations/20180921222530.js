module.exports = {
    up: function(queryInterface, Sequelize) {
        queryInterface.addColumn(
            'users',
            'username',
            {
                type: Sequelize.STRING,
                allowNull: false
            }
        )
    },
    down: function(queryInterface, Sequelize) {
        queryInterface.removeColumn(
            'users',
            'username',
        )
    }
}  