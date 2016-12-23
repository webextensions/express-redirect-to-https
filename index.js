var redirectToHttps = function (options) {
    options = options || {};
    return function (req, res, next) {
        if (req.protocol === 'http') {
            var redirectToUrl;
            // http://stackoverflow.com/questions/10183291/how-to-get-the-full-url-in-express/10185427#10185427
            if (options.httpPort || options.httpsPort) {
                redirectToUrl = 'https://' + req.get('host').replace(options.httpPort + '', options.httpsPort + '') + req.originalUrl;
            } else {
                redirectToUrl = 'https://' + req.get('host') + req.originalUrl;
            }
            return res.redirect(301, redirectToUrl);
        }
        next();
    };
};
module.exports = redirectToHttps;
