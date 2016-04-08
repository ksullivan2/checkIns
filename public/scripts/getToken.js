


var token = null; 

function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}


var code = $_GET("code")
console.log(code)




  // oauth.authCode.getToken({
  //   code: code,
  //   redirect_uri: credentials.redirect_uri
  // }, saveToken);

  
  // function saveToken(error, result) {
  //   if (error) { 
  //     console.log('Access Token Error', error.message); 
  //     res.redirect("/auth")}
  //   token = oauth.accessToken.create(result);
  //   res.redirect("/checkins");
  // }