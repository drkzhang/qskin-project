module.exports = {

    up: function (queryInterface, Sequelize) {
        return queryInterface.addColumn('posts','level',{
            type:Sequelize.INTEGER(3),
            allowNull: false,
            defaultValue:0
        })},
    down:function(queryInterface, Sequelize){}
}
    
    