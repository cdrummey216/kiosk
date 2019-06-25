var dir = 'http://192.168.0.1/owncloud/index.php/s/B8QddpcHgncQQ6T'

module.exports.home = (req,res,next)=>{
	var walkSync = function(dir, paths) {
	  var fs = fs || require('fs'),
	      files = fs.readdirSync(dir);
	  paths = paths || [];
	  files.forEach(function(file) {
	    if (fs.statSync(dir + '/' + file).isDirectory()) {
	      paths = walkSync(path.join(dir, file), paths);
	    }
	    else {
	      paths.push(file);
	    }
	  });
	  return paths;
	}
	res.render('gallery', { imgs: paths, layout:false});
};
