import React from 'react';

class Guest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      adults: 1,
      children: 0,
      infants: 0,
    }
    this.test = this.test.bind(this);
  }

  test() {
    console.log('asdfsf');
  }

  render() {
    return (
      <div className='guest-container'>
        <div className='adult-container'>
          <b>Adults</b>
          <span className='increment-container'>

            <button onClick={this.test}className='increment-button'><span className='button-content'><svg viewBox="0 0 24 24" role="img" aria-label="subtract" focusable="false" style={{height: '1em', width: '1em', display: 'block', fill: 'currentcolor'}}><rect height={2} rx={1} width={12} x={6} y={11} /><rect height={2} rx={1} width={12} x={6} y={11} /></svg></span></button>

            <span className='guest-counter'>10</span>

            <button onClick={this.test}className='increment-button'><span className='button-content'><svg viewBox="0 0 24 24" role="img" aria-label="add" focusable="false" style={{height: '1em', width: '1em', display: 'block', fill: 'currentcolor'}}><rect height={2} rx={1} width={12} x={6} y={11} /><rect height={12} rx={1} width={2} x={11} y={6} /></svg></span></button>



          </span>
        </div>
      </div>

    );
  }
}

export default Guest;