var redirectToHttps = function (options) {
    options = options || {};
    var httpPort = options.httpPort,
        httpsPort = options.httpsPort,
        redirectStatus = options.redirectStatus || 307;
    return function (req, res, next) {
        try {
            if (req.protocol === 'http') {
                var redirectToUrl;
                // http://stackoverflow.com/questions/10183291/how-to-get-the-full-url-in-express/10185427#10185427
                if (httpPort || httpsPort) {
                    redirectToUrl = 'https://' + req.get('host').replace(httpPort + '', httpsPort + '') + req.originalUrl;
                } else {
                    redirectToUrl = 'https://' + req.get('host') + req.originalUrl;
                }
                return res.redirect(redirectStatus, redirectToUrl);
            }
            next();
        } catch (e) {
            console.error(e);
            console.error(
                `Error: Error caught in express-redirect-to-https.` +
                ` req.headers = ${JSON.stringify(req.headers)} ;` +
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
