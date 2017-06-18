var mongoose = require('mongoose').set('debug', true);
var bios = mongoose.model('Bio');
var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}

module.exports.biosListByTitle = function (req, res) {
    bios
        .find()
        .exec(function (err, bio) {
            if (!bio) {
                sendJsonResponse(res, 404, {
                    "message": "bioid not found"
                });
                return;
            } else if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            sendJsonResponse(res, 200, bio);
        });
};

module.exports.biosCreate = function (req, res) {
    bios.create({
        name: req.body.name,
        age: req.body.age,
        favoriteFood: req.body.favoriteFood,
        bio: req.body.bio,
        profilePic: req.body.profilePic
    }, function (err, bio) {
        if (err) {
            sendJsonResponse(res, 400, err);
        } else {
            sendJsonResponse(res, 201, bio);
        }
    });
};

module.exports.biosReadOne = function (req, res) {
    if (req.params && req.params.biosid) {
        bios
			.findById(req.params.biosid)
			.exec(function (err, bio) {
			    if (!bio) {
			        sendJsonResponse(res, 404, {
			            "message": "bioid not found"
			        });
			        return;
			    } else if (err) {
			        sendJsonResponse(res, 404, err);
			        return;
			    }
			    sendJsonResponse(res, 200, bio);
			});
    } else {
        sendJsonResponse(res, 404, {
            "message": "No bioid in request"
        });
    }
};

module.exports.biosUpdateOne = function (req, res) {
    if (!req.params.biosid) {
        sendJsonResponse(res, 404, {
            "message": "Not found, biosid is required"
        });
        return;
    }
    bios
		.findById(req.params.biosid)
		.exec(
			function (err, bios) {
			    if (!bios) {
			        sendJsonResponse(res, 404, {
			            "message": "biosid not found"
			        });
			        return;
			    } else if (err) {
			        sendJsonResponse(res, 400, err);
			        return;
			    }
			    bios.name = req.body.name;
			    bios.age = req.body.age;
			    bios.favoriteFood = req.body.favoriteFood;
			    bios.bio = req.body.bio;
			    bios.profilePic = req.body.profilePic;

			    bios.save(function (err, bio) {
			        if (err) {
			            sendJsonResponse(res, 404, err);
			        } else {
			            sendJsonResponse(res, 200, bio);
			        }
			    });
			}
		);
};

module.exports.biosDeleteOne = function (req, res) {
    var biosid = req.params.biosid;
    if (biosid) {
        bios
			.findByIdAndRemove(biosid)
			.exec(
				function (err, bio) {
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
            "message": "No biosid"
        });
    }
};
