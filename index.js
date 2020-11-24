const server = require('./server');

server.listen(5000, () => {
    console.log('\n*** Server is Running on http://localhost:5000 ***\n');
});