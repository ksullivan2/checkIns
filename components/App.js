var React = require('react');
var ReactDOM = require('react-dom');
var Room = require('./Room');








var RoomList = ["Djikstra", "Von Neumann", "McCarthy", "Turing", "Lovelace", "Church", "Babbage", "Hopper", "Library"]


var App = React.createClass({
	componentDidMount: function(){
		fetch('/username')
		.then(function(response) {
		  return response.json();
		}).then (function(json){
			console.log(json)
		})
		
	},


  render: function () {
    return (
      	<div id='App'>
        {RoomList.map(function(room, i){
         return <Room key={room + i} roomName={room}/>
        	
        })}
      </div>
    )
  }
});

module.exports = App;

ReactDOM.render(<App />, document.getElementById('main-container'));
