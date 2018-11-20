const config = {
	db: {
	   username: "post_user",
	   password: "Futu432018!",
	   database: "posts",
	   host: "127.0.0.1",
	   port: "3306",
	   dialect: "mysql",
	   operatorsAliases: false,
	   seederStorage: "sequelize",
	   define: {
		   underscored: true
	   }
   },
   baseUrl: "http://localhost:8080",
   appUrl: "/posts",
   logger: {
	   path: __dirname + '../../../logs/'
   },
   env: 'production'
}

export default config