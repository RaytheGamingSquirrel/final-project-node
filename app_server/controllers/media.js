var request = require('request');
var apiOptions = {
    server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "http://localhost:3000/api/media";
}
var requestOptions = {
    url: "http://localhost:3000/api/media",
    json: {}
};
request(requestOptions, function (err, response, body) {
    if (err) {
        console.log(err);
    } else if (response.statusCode === 200) {
        console.log(body);
    } else {
        console.log(response.statusCode);
    }
});
var renderMedia = function (req, res, responseBody) {
    res.render('media', { title: 'Media',
        media:responseBody} );
};
/*GET media page */
module.exports.media = function (req, res) {
    var requestOptions, path;
    path = '/api/media';
    requestOptions = {
        url: apiOptions.server + path,
        json: {}
    };
    request (
        requestOptions,
        function (err, response, body) {
            renderMedia(req, res, body);
        }
    );
};