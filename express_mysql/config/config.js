require('dotenv').config()
let CONFIG = {} //Make this global to use all over the application

CONFIG.app = 'dev'
CONFIG.port = '3000'

CONFIG.db_dialect = 'mysql'
CONFIG.db_host = 'localhost'
CONFIG.db_port = '3306'
CONFIG.db_name = 'demo_rest_api'
CONFIG.db_user = 'root'
CONFIG.db_password = 'dainguyen'

CONFIG.jwt_encryption = 'euqwdnscn12390asd'
CONFIG.jwt_expiration = '10000'
module.exports = CONFIG