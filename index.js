require('dotenv').config();

const connect = require('connect');
const serveStatic = require('serve-static');

const port = process.env.PORT;

connect().use(serveStatic(__dirname)).listen(port, () => {
    console.log(`Server running on ${port}...`);
});
