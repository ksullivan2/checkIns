import React from 'react';
import reactDOM from 'react-dom';

var Room = require("./components/Room")

console.log("Hey this worked, wow");

reactDOM.render(
	<Room />,
	document.getElementById('root')
)