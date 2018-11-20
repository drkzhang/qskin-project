const winston = require('winston')
require('winston-daily-rotate-file')
import config from '../config/config'

const infoFile = new winston.transports.DailyRotateFile({
	name: 'info-logger',
	filename: config.logger.path + "info.log",
	datePattern: '.yyyy-MM-dd',
	level: 'info'
})

const errorFile = new winston.transports.DailyRotateFile({
	name: 'error-logger',
	filename: config.logger.path + "error.log",
	datePattern: '.yyyy-MM-dd',
	level: 'error'
})

const logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(),
		infoFile,
		errorFile
	]
})

module.exports = {
	info : function(message) {
		const prefix = '[INFO: ' + new Date().toISOString() + '] '
		logger.info(prefix + message)
	},

	error : function(message) {
		const prefix = '[ERROR: ' + new Date().toISOString() + '] '
		logger.error(prefix + message)
	}
}