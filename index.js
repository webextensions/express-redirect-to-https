var redirectToHttps = function (options) {
    options = options || {};
    var httpPort = options.httpPort,
        httpsPort = options.httpsPort,
        redirectStatus = options.redirectStatus || 301;
    return function (req, res, next) {
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
    };
};
module.exports = redirectToHttps;
