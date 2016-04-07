var React = require('react');


var Person = React.createClass({
  getInitialState: function(){
  	return {people: []}
  },

  handleClick: function(){
  	this.state.people.push("test")
  	this.setState({people: this.state.people})
  },



  render: function () {
    return (
      <div className='Person' onClick={this.handleClick}>
        <p className="Person__name">{this.props.person}</p>
      </div>
    )
  }
});

module.exports = Person;


