var redirectToHttps = function (options) {
    options = options || {};
    var httpPort = options.httpPort,
        httpsPort = options.httpsPort;

    var redirectStatus = options.redirectStatus;
    if (typeof redirectStatus === 'number' && redirectStatus >= 300 && redirectStatus <= 399) {
        // do nothing
    } else {
        redirectStatus = 307; // Temporary redirect
    }

    return function (req, res, next) {
        try {
            if (req.protocol === 'http') {
                if (typeof req.get('host') === 'string') {
                    var redirectToUrl;
                    // http://stackoverflow.com/questions/10183291/how-to-get-the-full-url-in-express/10185427#10185427
                    if (httpPort || httpsPort) {
                        redirectToUrl = 'https://' + req.get('host').replace(httpPort + '', httpsPort + '') + req.originalUrl;
                    } else {
                        redirectToUrl = 'https://' + req.get('host') + req.originalUrl;
                    }
                    return res.redirect(redirectStatus, redirectToUrl);
                } else { // To reach this "else" condition, try something like: curl -H "host:" 127.0.0.1
                    return res.status(400).send('400 Bad Request - Please access the "https://" version of this website.\n');
                }
            }
            next();
        } catch (e) {
            console.error(e);
            console.error(
                `Error: Error caught in express-redirect-to-https.` +
                ` req.headers = ${JSON.stringify(req.headers)} ;` +
                ` req.get('host') = ${req.get('host')} ;` +
                ` req.host = ${req.host} ;` +
                ` req.hostname = ${req.hostname} ;` +
                ` req.method = ${req.method} ;` +
                ` req.originalUrl = ${req.originalUrl} ;` +
                ` req.path = ${req.path} ;` +
                ` req.protocol = ${req.protocol} ;` +
                ` req.subdomains = ${req.subdomains} ;` +
                ` req.url = ${req.url} ;` +
                ` req._parsedUrl = ${JSON.stringify(req._parsedUrl)} ;`
            );

            throw e;
        }
    };
};
module.exports = redirectToHttps;
