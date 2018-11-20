import app from '../app/app'
import logger from '../app/utils/logger'

app.listen(8080, function () {
 logger.info('Listening on port 8080:')
})