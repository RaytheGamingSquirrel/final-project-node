var request = require('request');
var apiOptions = {
    server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "http://localhost:3000/api/bios";
}
var requestOptions = {
    url: "http://localhost:3000/api/bios",
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
var renderBios = function (req, res, responseBody) {
    res.render('bios', { title: 'Bios',
        bios:responseBody} );
};
/*GET home page */
module.exports.bios = function (req, res) {
    var requestOptions, path;
    path = '/api/bios';
    requestOptions = {
        url: apiOptions.server + path,
        json: {}
    };
    request(
        requestOptions,
        function (err, response, body) {
            renderBios(req, res, body);
        }
    );
};