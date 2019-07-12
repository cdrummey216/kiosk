module.exports.home = (req,res,next)=>{
	var fs = require('fs');
	var names = fs.readdirSync('public/images/');
	var paths = [];
	
	for (var i = 0, len = names.length; i < len; i++) {
		var s ='images/'+names[i];
		paths.push(s);
	};
		
	
	res.render('gallery', { imgs: paths, layout:false});
};

