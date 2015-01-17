
/*
 * GET home page.
 */
var crypto = require('crypto');

exports.index = function(req, res){

	var id = crypto.randomBytes(20).toString('hex');
	res.render('index', { id: id });
}; 

exports.userView = function(req, res, next){
	res.render('userView');
};

exports.streamView = function(req, res, next){
	if (req.query.userid && req.query.sessionid) {
	  	var uID = req.query.userid
	  	var sID = req.query.sessionid;
	  	res.render('streamView', { id: req.params.id, title: '', userID: uID, sessionID: sID });
	  } else {
	  	console.log("No session and user data found.")
	  	res.redirect("/")
	  }
};