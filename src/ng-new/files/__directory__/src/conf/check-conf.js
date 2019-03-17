const fs        = require('fs');
const configure = require('../conf/instrument');

const envFile = './src/environments/environment.ts';

// Generate a default conf for simplicity.
// Avoid after a git clone to force `yarn configure`
if(!fs.existsSync(envFile)) configure();
