import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/CalendarExample.jsx';
import SecondCalendar from './components/SecondCalendar.jsx';

const element = <h1>whats up C-Rod</h1>

ReactDOM.render(<Calendar date={new Date('August 10 2019')}/>, document.getElementById('app'));