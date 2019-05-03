# express-redirect-to-https
Express middleware for redirecting `http` requests to `https` url path.

## Usage

```js
var express = require('express');
var redirectToHttps = require('express-redirect-to-https');

var app = express();
```

```js
app.use(redirectToHttps());

// OR

app.use(redirectToHttps({
    httpPort: 3000,
    httpsPort: 4000
}));

// OR

app.use(redirectToHttps({
    httpPort: 3000,
    httpsPort: 4000,
    redirectStatus: 307 // Default redirect status is 301
}));
```
