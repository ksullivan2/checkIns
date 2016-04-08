var React = require('react');
var ReactDOM = require('react-dom');
var Room = require('./Room');
var axios = require('axios');








var RoomList = ["Djikstra", "Von Neumann", "McCarthy", "Turing", "Lovelace", "Church", "Babbage", "Hopper", "Library"]


var App = React.createClass({
	getInitialState: function(){
		return {username: null};
	},

	componentDidMount: function(){
		var self = this;

		// fetch('/username')
		// .then(function(response) {
		//   return response.json();
		// }).then (function(json){
		// 	self.setState({username: json.firstName + " "  + json.lastName})
		// })
		
		axios.get('/username')
			.then(function(response){
				self.setState({username: response.data.firstName + " "  + response.data.lastName})
			})
	},


  render: function () {
  	var self = this; 

    return (
      	<div id='App'>

        {RoomList.map(function(room, i){
         return <Room key={room + i} roomName={self.state.username}/>
        	
        })}
      </div>
    )
  }
});

module.exports = App;

ReactDOM.render(<App />, document.getElementById('main-container'));
