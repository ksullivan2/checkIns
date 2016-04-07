var React = require('react');
var ReactDOM = require('react-dom');
var Room = require('./Room');

var App = React.createClass({
  render: function () {
    return (
      <div id='App'>
        App
        <Room />
      </div>
    )
  }
});

module.exports = App;

ReactDOM.render(<App />, document.getElementById('main-container'));
