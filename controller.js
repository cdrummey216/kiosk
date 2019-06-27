module.exports.home = (req,res,next)=>{
	var fs = require('fs');
	var paths = fs.readdirSync('/var/www/imgs');
	var paths = ['images/a.jpg','images/b.jpg','images/c.jpg'];
	res.render('gallery', { imgs: paths, layout:false});
};
