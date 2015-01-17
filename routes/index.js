
/*
 * GET home page.
 */
var crypto = require('crypto');

exports.index = function(req, res){
	var id = crypto.randomBytes(20).toString('hex');
	res.render('index', { id: id});
}; 

exports.streamView = function(req, res){
	res.render('stream', { id: req.params.id });
};