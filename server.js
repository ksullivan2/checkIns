var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(__dirname+"/public/"));
var session = require("express-session")({
  secret: "hope and joy",
  resave: true,
  saveUninitialized: true,
  cookie: {httpOnly: false}
});
app.use(session)
var request = require('request');




var PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "/pageIndexes/login.html"));
});



//HEROKU
// var credentials = {
//  clientID: "34470edff3fc9aac0c6895b6c0fab87e27f026c33bf8a2015b2dc51905032012",
//  clientSecret: "8fe080b72de0b753613d3c6397aadce961ca8f524068480eec8dbf42f607b1e9",
//  site: "https://recurse.com",
//  redirect_uri: 'https://rccheckins.herokuapp.com/callback',
// tokenPath: "/oauth/token",
//  authorizationPath: "/oauth/authorize"
// }


// //TESTING
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




// Callback service parsing the authorization token and asking for the access token
app.get('/callback', function (req, res) {
  // res.sendFile(path.join(__dirname, "/pageIndexes/callback.html"));


  var code = req.query.code;
  oauth.authCode.getToken({
    code: code,
    redirect_uri: credentials.redirect_uri
  }, saveToken);

  
  function saveToken(error, result) {
    if (error) { 
      console.log('Access Token Error', error.message); 
      res.redirect("/auth")}

    req.session.token = oauth.accessToken.create(result);
  
   

    request('https://www.recurse.com/api/v1/people/me?access_token=' + req.session.token.token.access_token, 
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
        req.session.user = body

        res.redirect("/checkins");
        
      } else {console.log("FAILED", body)}
    })

    
  }
})



//ONCE LOGGED IN--------------------------------------------------------------------------------------------------------


app.get('/checkins', function(req,res) {
  //check if valid token TO DO
  if (req.session.token){
    res.sendFile(path.join(__dirname, "/pageIndexes/checkins.html"));
  }
  else {res.redirect("/auth")}

});


app.get('/username', function(req,res){
  var user = JSON.parse(req.session.user)
  res.json({firstName: user["first_name"], lastName: user["last_name"]})
})

app.listen(PORT, function() {
  console.log('Server is listening on port '+ PORT);
});
