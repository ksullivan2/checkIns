var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, './../')));
var PORT = process.env.PORT || 3000;

//OAUTH STUFF
var credentials = {
 clientID: "34470edff3fc9aac0c6895b6c0fab87e27f026c33bf8a2015b2dc51905032012",
 clientSecret: "8fe080b72de0b753613d3c6397aadce961ca8f524068480eec8dbf42f607b1e9",
 site: "http://recurse.com",
 redirect_uri: 'https://rccheckins.herokuapp.com/callback'
}

var oauth = require('simple-oauth2')(credentials)

// Authorization oauth2 URI
var authorization_uri = oauth.authCode.authorizeURL({
  redirect_uri: credentials.redirect_uri
  // scope: '<scope>',
  // state: '<state>'
});

// Initial page redirecting
app.get('/auth', function (req, res) {
	console.log("/auth")
    res.redirect(authorization_uri);
})


var token; 

// Callback service parsing the authorization token and asking for the access token
app.get('/callback', function (req, res) {
	console.log("/callback")
  var code = req.query.code;

  oauth.authCode.getToken({
    code: code,
    redirect_uri: credentials.redirect_uri
  }, saveToken);

  function saveToken(error, result) {
    if (error) { console.log('Access Token Error', error.message); }
    token = oauth.accessToken.create(result);
    console.log("TOKEN IS ",oauth.accessToken)
  }

  res.send("TEST")
});


app.get('/', function (req, res) {
	console.log("what GET SHOULD be fetching")
  res.send('Hello<br><a href="/auth">Log in with RC</a>');
});

// app.get('/', function(req,res) {
//   console.log("IN COMMMENT")
//   res.sendFile('/index.html');
// });

app.listen(PORT, function() {
  console.log('Server is listening on port '+ PORT);
});
