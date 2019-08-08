import 'module-alias/register';
import * as http from 'http';
import { createConnection, ConnectionOptions } from 'typeorm';
import App from '@config/express';
import DatabaseConfig from '@config/database';
import { HelperClass } from '@helpers/helper';
import '@config/env';
import 'colors';

const helper = new HelperClass();

createConnection(DatabaseConfig as ConnectionOptions)
    .then(async () => {
        const port = helper.normalizePort(process.env.APP_PORT || 3000);
        App.set('port', port);

        const server = http.createServer(App);

        server.listen(port, () => console.log(`Server started on port ${port}, http://127.0.0.1:${port}`.rainbow));
        server.on('error', helper.onError);
    })
    .catch(error => console.log(error));
