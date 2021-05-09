require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helloController = require('./controller/helloController');
const accountsController = require('./controller/accountsController');

const { handleError, notFound } = require('./middleware/error');
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use(helloController, accountsController);

app.use(handleError);
app.use(notFound);

app.listen(port, () => {
    var host = getIPAdress();
    console.log('running at http://' + host + ':' + port);
});

///获取本机ip///
function getIPAdress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (
                alias.family === 'IPv4' &&
                alias.address !== '127.0.0.1' &&
                !alias.internal
            ) {
                return alias.address;
            }
        }
    }
}
