var https = require('https');

const loginUrl = "https://login.bolha.com/auth.php";

// Build the post string from an object
var post_data = "username=" + process.argv[2] + "&password=" + process.argv[3] + "&rememberMe=false";

// An object of options to indicate where to post to
var post_options = {
  host: 'login.bolha.com',
  port: '443',
  path: '/auth.php',
  method: 'POST',
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(post_data),
      'X-Site': 'http://www.bolha.com/',
      'Origin': 'http://www.bolha.com',
	  'Referer': 'http://www.bolha.com/'
  }
};

// Set up the request
var post_req = https.request(post_options, function(res) {
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
      //console.log('Response: ' + chunk);
  });
  res.on('end', function() {
    console.log('ended ok');
  });
  console.log("COOKIE " + res.headers['set-cookie']);
  res.on('response', response => {
    //console.log(response.statusCode);        
    //console.log(response.headers);
    console.log(response.headers['set-cookie']);
    //response.on('data', chunk => { fullResponse.body += chunk; });
  });
});

// post the data
post_req.write(post_data);
post_req.end()