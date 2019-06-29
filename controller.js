module.exports.home = (req,res,next)=>{
	var fs = require('fs');
	var paths = fs.readdirSync('/var/www/imgs');
	res.render('gallery', { imgs: paths, layout:false});
};
