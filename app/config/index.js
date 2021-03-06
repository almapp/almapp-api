const nconf = require('nconf');

const settings = {
  'PRODUCTION': 'app/config/env/production.json',
  'DEVELOPMENT': 'app/config/env/development.json',
  'TEST': 'app/config/env/test.json',
}

const env = process.env.NODE_ENV || 'DEVELOPMENT';
const file = settings[env.toUpperCase()];

if (!file) {
  console.log('Environment settings not found');
}

module.exports = nconf.env().argv().file(file).defaults({
  'port': 3000,
  'mongo': {
    'uri': 'mongodb://localhost:27017/almapp',
  },
  'elasticsearch': {
    'uri': 'localhost:9200',
  }
});
