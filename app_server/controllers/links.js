/*GET home page */
module.exports.downloadPage = function (req, res) {
    res.render('download', { title: 'Download Page' });
};
module.exports.commentsPage = function (req, res) {
    res.render('comments', { title: 'Comments Section' });
};
module.exports.aboutPage = function (req, res) {
    res.render('about', { title: 'About Me' });
};