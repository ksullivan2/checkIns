var React = require('react');
var ReactDOM = require('react-dom');
var Room = require('./Room');
// var $ = require ('jquery');








var RoomList = ["Djikstra", "Von Neumann", "McCarthy", "Turing", "Lovelace", "Church", "Babbage", "Hopper", "Library"]


var App = React.createClass({
	handleTestClick: function(){
		
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
