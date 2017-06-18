var request = require('request');
var apiOptions = {
    server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "http://localhost:3000/api/main";
}
var requestOptions = {
    url: "http://localhost:3000/api/main",
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
var renderMainpage = function (req, res, responseBody) {
    res.render('index', { title: 'Main Page' ,
       main:responseBody} );
};
/*GET home page */
module.exports.mainPage = function (req, res) {
    var requestOptions, path;
    path = '/api/main';
    requestOptions = {
        url: apiOptions.server + path,
        json: {}
    };
    request (
        requestOptions,
        function (err, response, body) {
            renderMainpage(req, res, body);
        }
    );
};