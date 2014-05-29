// node examples/post.js
// testardo --host=0.0.0.0 --mirror=7457 examples/post.js
if (typeof process !== 'undefined') {
  require('http').createServer(function (req, res) {
    res.writeHead(200, {
		'Content-Type': 'text/html',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': '*',
		'Access-Control-Request-Method': '*'
	});
	if (req.method == "GET") {
		res.end([
			'<!DOCTYPE html>',
			'<form method="post" action="?post">',
				'<input name="test" value="',
					Math.random(),
				'">',
				'<input id="submit" type="submit">',
			'</form>'
		].join(''));
	} else {
		console.log(req.method);
		console.log(req.url);
		var reqBody = "";
		req.on("data", function(data) {
			console.log("Received data:");
			console.log(data.toString());
			reqBody += data.toString();
		});
		req.on("end", function() {
			console.log("Request body:");
			console.log(reqBody);
			res.end(req.method + " " + reqBody);
		});
	}
  }).listen(7457, '0.0.0.0');
} else {
  module.exports = {
    path: '/',
    test: function(sandbox, window, document) {
      sandbox.onload = function (sandbox, window, document) {
        if (!/POST test/.test(document.documentElement.innerHTML)) {
          throw 'did NOT post';
        }
        sandbox.done();
      };
	  sandbox.dispatch('#submit', 'click');
    }
  };
}
