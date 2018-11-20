import entities from '../entities'
import { hash, compare } from '../security/bcryptor'
import uuid from 'uuid'

export default function(sequelize, Sequelize) {
	const Users = sequelize.define('Users', {
		id: {
			type: Sequelize.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			isUnique: true
		},
		password: {
			type: Sequelize.STRING(128),
			allowNull: false
		},
		uuid: {
			type: Sequelize.STRING(45),
			allowNull: false,
			isUnique: true
		},
		firstName: {
			type: Sequelize.STRING(45),
			allowNull: false,
			field: "first_name"
		},
		middleName: {
			type: Sequelize.STRING(45),
			allowNull: false,
			defaultValue: '',
			field: "middle_name"
		},
		lastName: {
			type: Sequelize.STRING(45),
			allowNull: false,
			field: "last_name"
		},
		username: {
			type: Sequelize.STRING(45),
			allowNull: false,
		},
		email: {
			type: Sequelize.STRING(45),
			allowNull: false
		},
		consented: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	}, {
		tableName: 'users',
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		underscoredAll: true
	})

	Users.associate = function(entities) {
		Users.hasMany(entities.UserHistory)
		Users.hasMany(entities.UserSessions)
	}

	/**above are DB settings of the entity. below are 
	the business logics of Users entity.
	**/
	Users.getByEmailAndUUId = function(email, uuid) {
		return Users.find({where: {email: email, uuid: uuid}})
	}

	Users.signup = function(email, username, password, firstName, lastName, consented, middleName) {
		const signupAction = new Promise((resolve, reject) => {	
			Users.find({where: {email}})
			.then(function(user) {
				if (!user) {
					const hashedPassword = hash(password)
					const uuidv4 = uuid.v4()
					const middle = !middleName ? '' : middleName
					const newUser = {
						email,
						password: hashedPassword,
						firstName,
						lastName,
						uuid: uuidv4,
						consented,
						middleName: middle,
						username:username,
					}
					if (middleName !== undefined && middleName !== null) {
						newUser.middle_name = middleName
					}
					Users.create(newUser)
					.then(function(result) {
						entities.AccountActionTypes.get('signup')
						.then(function(aat) {
							entities.UserHistory.add(result.id, aat.id)
							.then(function(uhAddResult) {
								resolve(true)
							}).catch(function(uhErr) {
								reject(uhErr)
							})
						}).catch(function(aatErr) {
							reject(aatErr)
						})
					}).catch(function(err) {
						reject(err)
					})
				} else {
					reject(Error('User with given email already exist.'))
				}
			}).catch(function(uErr) {
				reject(uErr)
			})
		})
		return signupAction
	}

	Users.signin = function(email, password) {
		const signinAction = new Promise((resolve, reject) => {	
			Users.find({where: {email}})
			.then(function(user) {
				if (!user) {
					reject(Error('User with given email does not exist.'))
				} else {
					if(compare(password, user.password)) {
						//password is correct. save a new session record.
						entities.UserSessions.add(user.id, email)
						.then(function(session) {
							entities.AccountActionTypes.get('signin')
							.then(function(aat) {
								entities.UserHistory.add(user.id, aat.id)
								.then(function(uhAddResult) {
									resolve({result:true, session_id: session.sessionId, uuid: user.uuid})
								}).catch(function(uhErr) {
									reject(uhErr)
								})
							}).catch(function(aatErr) {
								reject(aatErr)
							})
						}).catch(function(err) {
							reject(err)
						})
					} else {
						reject(Error("The combination of email and password does not match our record."))
					}
				}
			}).catch(function(uErr) {
				reject(uErr)
			})
		})
		return signinAction
	}

	Users.signout = function(email, uuid, sessionId, logoutAll) {
		const signoutAction = new Promise((resolve, reject) => {
			Users.find({where: {email: email, uuid: uuid}})
			.then(function(user) {
				if(!user) {
					reject(Error('User does not exist.'))
				} else {
					if (logoutAll) {
						entities.UserSessions.deactivateAllSessions(user.id)
						.then(function(){
							resolve(true)
						}).catch(function(err){
							reject(Error(err))
						})
					} else {
						entities.UserSessions.deactivateSession(user.id, sessionId)
						.then(function(){
							resolve(true)
						}).catch(function(err){
							reject(Error(err))
						})
					}
				}
			})
		})
		return signoutAction
	}

	return Users
}