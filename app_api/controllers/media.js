var mongoose = require('mongoose').set('debug', true);
var media = mongoose.model('Media');
var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}

module.exports.mediaListByTitle = function (req, res) {
    media
        .find()
        .exec(function (err, media) {
            if (!media) {
                sendJsonResponse(res, 404, {
                    "message": "mediaid not found"
                });
                return;
            } else if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            sendJsonResponse(res, 200, media);
        });
};

module.exports.mediaCreate = function (req, res) {
    media.create({
        title: req.body.title,
        mediaType: req.body.mediaType,
        media: req.body.media
    }, function (err, media) {
        if (err) {
            sendJsonResponse(res, 400, err);
        } else {
            sendJsonResponse(res, 201, media);
        }
    });
};

module.exports.mediaReadOne = function (req, res) {
    if (req.params && req.params.mediaid) {
        media
			.findById(req.params.mediaid)
			.exec(function (err, media) {
			    if (!media) {
			        sendJsonResponse(res, 404, {
			            "message": "mediaid not found"
			        });
			        return;
			    } else if (err) {
			        sendJsonResponse(res, 404, err);
			        return;
			    }
			    sendJsonResponse(res, 200, media);
			});
    } else {
        sendJsonResponse(res, 404, {
            "message": "No mediaid in request"
        });
    }
};

module.exports.mediaUpdateOne = function (req, res) {
    if (!req.params.mediaid) {
        sendJsonResponse(res, 404, {
            "message": "Not found, mediaid is required"
        });
        return;
    }
    media
		.findById(req.params.mediaid)
		.exec(
			function (err, media) {
			    if (!media) {
			        sendJsonResponse(res, 404, {
			            "message": "mediaid not found"
			        });
			        return;
			    } else if (err) {
			        sendJsonResponse(res, 400, err);
			        return;
			    }
			    media.title = req.body.title;
			    media.mediaType = req.body.mediaType;
			    media.media = req.body.media;

			    media.save(function (err, media) {
			        if (err) {
			            sendJsonResponse(res, 404, err);
			        } else {
			            sendJsonResponse(res, 200, media);
			        }
			    });
			}
		);
};

module.exports.mediaDeleteOne = function (req, res) {
    var mediaid = req.params.mediaid;
    if (mediaid) {
        media
			.findByIdAndRemove(mediaid)
			.exec(
				function (err, media) {
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
            "message": "No mediaid"
        });
    }
};
