var React = require('react');
var CheckInTime = require("./CheckInTime")


var Room = React.createClass({
  

  render: function () {
    return (
      <div className='Room' onClick={this.handleClick}>
        <h3>{this.props.roomName}</h3>
        <CheckInTime time={"10:30 AM"}/>
        <CheckInTime time={"1:00 PM"}/>

      </div>
    )
  }
});

module.exports = Room;


