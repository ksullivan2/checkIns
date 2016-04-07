var React = require('react');
var Person = require("./Person")


var CheckInTime = React.createClass({
  getInitialState: function(){
  	return {people: [], topic: ""}
  },

  handleClick: function(){
  	this.state.people.push("test")
  	this.setState({people: this.state.people})
  },

  changeTopic: function(value){
    this.setState({topic: value})
  },



  render: function () {
    return (
      <div className='Room__CheckInTime' >
        <h4>{this.props.time}</h4>
        
          <input type="text" defaultValue="Random Topic" onChange={this.changeTopic} />
       
        <button onClick={this.handleClick}>Join this check-in.</button>
        {this.state.people.map(function(person, index){
        	return <Person key={index} person={person}/>
        })}

      </div>
    )
  }
});

module.exports = CheckInTime;


