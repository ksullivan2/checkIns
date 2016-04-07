var React = require('react');
var Person = require("./Person")


var CheckInTime = React.createClass({
  getInitialState: function(){
  	return {people: []}
  },

  handleClick: function(){
  	this.state.people.push("test")
  	this.setState({people: this.state.people})
  },



  render: function () {
    return (
      <div className='Room__CheckInTime' onClick={this.handleClick}>
        <h4>{this.props.time}</h4>
        {this.state.people.map(function(person, index){
        	return <Person key={index} person={person}/>
        })}
      </div>
    )
  }
});

module.exports = CheckInTime;


