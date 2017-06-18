var mongoose = require('mongoose').set('debug', true);
var main = mongoose.model('Main');
var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}

module.exports.mainListByTitle = function (req, res) {
    main
        .find()
        .exec(function (err, main) {
            if (!main) {
                sendJsonResponse(res, 404, {
                    "message": "mainid not found"
                });
                return;
            } else if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            sendJsonResponse(res, 200, main);
        });
};

module.exports.mainCreate = function (req, res) {
    main.create({
        title: req.body.title,
        postedOn: req.body.postedOn,
        content: req.body.content
    }, function (err, main) {
        if (err) {
            sendJsonResponse(res, 400, err);
        } else {
            sendJsonResponse(res, 201, main);
        }
    });
};

module.exports.mainReadOne = function (req, res) {
    if (req.params && req.params.mainid) {
        main
			.findById(req.params.mainid)
			.exec(function (err, main) {
			    if (!main) {
			        sendJsonResponse(res, 404, {
			            "message": "mainid not found"
			        });
			        return;
			    } else if (err) {
			        sendJsonResponse(res, 404, err);
			        return;
			    }
			    sendJsonResponse(res, 200, main);
			});
    } else {
        sendJsonResponse(res, 404, {
            "message": "No mainid in request"
        });
    }
};

module.exports.mainUpdateOne = function (req, res) {
    if (!req.params.mainid) {
        sendJsonResponse(res, 404, {
            "message": "Not found, mainid is required"
        });
        return;
    }
    main
		.findById(req.params.mainid)
		.exec(
			function (err, main) {
			    if (!main) {
			        sendJsonResponse(res, 404, {
			            "message": "mainid not found"
			        });
			        return;
			    } else if (err) {
			        sendJsonResponse(res, 400, err);
			        return;
			    }
			    main.title = req.body.title;
			    main.postedOn = req.body.postedOn;
			    main.content = req.body.content;

			    main.save(function (err, main) {
			        if (err) {
			            sendJsonResponse(res, 404, err);
			        } else {
			            sendJsonResponse(res, 200, main);
			        }
			    });
			}
		);
};

module.exports.mainDeleteOne = function (req, res) {
    var mainid = req.params.mainid;
    if (mainid) {
        main
			.findByIdAndRemove(mainid)
			.exec(
				function (err, main) {
				    if (err) {
				        sendJsonResponse(res, 404, err);
				        return;
				    } else {
				        sendJsonResponse(res, 204, null);
				    }
				}
			);
    } else {
        sendJsonResponse(res, 404, {
            "message": "No mainid"
        });
    }
};
