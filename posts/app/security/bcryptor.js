import bcrypt from 'bcryptjs'

/* 
Securely hash an input content with 12 bits salt.
*/
export function hash(content) {
	return bcrypt.hashSync(content, bcrypt.genSaltSync(12))
}

/* 
Compare an input plain content with a previously hashed record.
*/
export function compare(content, record) {
	return bcrypt.compareSync(content, record)
}