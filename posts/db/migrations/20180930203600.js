module.exports = {

    up: function (queryInterface, Sequelize) {
        
        return queryInterface.changeColumn(
            'posts',
            'uuid',{
                type:Sequelize.STRING(45),
                allowNull:false
            }
        )
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.changeColumn(
            'posts',
            'uuid',{
                type:Sequelize.STRING(32),
                allowNull:false
            }
        )
}
}
