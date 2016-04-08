var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, './../')));
var PORT = process.env.PORT || 3000;

//OAUTH STUFF
var credentials = {
 clientID: "6135730e4b5a495af7f6e6596253e475d2aab271c9e7f060df5360fc230c8379",
 clientSecret: "4fdf5d95fe111b2caabf8deea68061ea35fcc1d00a5c3270294965839360a4e8",
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
    res.redirect(authorization_uri);
})


// Callback service parsing the authorization token and asking for the access token
app.get('/callback', function (req, res) {
  var code = req.query.code;

  oauth2.authCode.getToken({
    code: code,
    redirect_uri: 'https://rccheckins.herokuapp.com/callback'
  }, saveToken);

  function saveToken(error, result) {
    if (error) { console.log('Access Token Error', error.message); }
    token = oauth2.accessToken.create(result);
    console.log("TOKEN IS ",token)
  }
});


app.get('/', function (req, res) {
  res.send('Hello<br><a href="/auth">Log in with RC</a>');
});

// app.get('/', function(req,res) {
//   res.sendFile('/index.html');
// });

app.listen(PORT, function() {
  console.log('Server is listening on port '+ PORT);
});
