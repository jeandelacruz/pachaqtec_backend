import '@config/env';
import Mailgun from 'mailgun-js';

type NormalizePort = (val: number | string) => number | string | boolean;

export class HelperClass {
    public normalizePort: NormalizePort = port => {
        const portNumber: number = typeof port === 'string' ? parseInt(port, 10) : port;
        switch (true) {
            case isNaN(portNumber):
                return port;
            case portNumber >= 0:
                return portNumber;
            default:
                return false;
        }
    };

    public mailGun() {
        return new Mailgun({
            apiKey: process.env.MAILGUN_KEY,
            domain: process.env.MAILGUN_DOMAIN,
        });
    };

    public onError(error: NodeJS.ErrnoException) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind =
            typeof process.env.APP_PORT === 'string' ? 'Pipe ' + process.env.APP_PORT : 'Port ' + process.env.APP_PORT;
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
}
