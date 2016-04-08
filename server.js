var express = require('express');
var path = require('path');
var app = express();
// app.use(express.static(path.join(__dirname, "/css")));
app.use(express.static(__dirname+"/public/"));

var PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "/LogInIndex.html"));
});



//HEROKU
// var credentials = {
//  clientID: "34470edff3fc9aac0c6895b6c0fab87e27f026c33bf8a2015b2dc51905032012",
//  clientSecret: "8fe080b72de0b753613d3c6397aadce961ca8f524068480eec8dbf42f607b1e9",
//  site: "https://recurse.com",
//  redirect_uri: 'https://rccheckins.herokuapp.com/callback'
// }

//TESTING
var credentials = {
 clientID: "207e556737f394a07703264dc1193bb711538ce24da5ef43b52a322f76e8d47d",
 clientSecret: "398626c53eb32d662c9aa66ad8051b5cef148d155f69be9cb3e3d47fc0eb1004",
 site: "https://recurse.com",
 redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
 tokenPath: "/oauth/token",
 authorizationPath: "/oauth/authorize"
}


//OAUTH------------------------------------------------------------------------------------------------------------------
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
  var code = req.query.code;
  oauth.authCode.getToken({
    code: code,
    redirect_uri: credentials.redirect_uri
  }, saveToken);

  
  function saveToken(error, result) {
    if (error) { 
      console.log('Access Token Error', error.message); 
      res.redirect("/auth")}
    token = oauth.accessToken.create(result);
    res.redirect("/checkins");
  }

  
});

//ONCE LOGGED IN--------------------------------------------------------------------------------------------------------


app.get('/checkins', function(req,res) {
  res.send(token)
  console.log(token)
  // res.sendFile(path.join(__dirname, "/checkInsIndex.html"));
});

app.listen(PORT, function() {
  console.log('Server is listening on port '+ PORT);
});