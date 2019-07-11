import React from 'react';

class Guest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      adults: 1,
      children: 0,
      infants: 0,
    }
    this.adultsDecrement = this.adultsDecrement.bind(this);
    this.adultsIncrement = this.adultsIncrement.bind(this);
    this.childrenDecrement = this.childrenDecrement.bind(this);
    this.childrenIncrement = this.childrenIncrement.bind(this);
    this.infantsDecrement = this.infantsDecrement.bind(this);
    this.infantsIncrement = this.infantsIncrement.bind(this);
  }

  adultsDecrement() {
    let adults = this.state.adults;
    adults -= 1;
    this.setState({
      adults
    });
  }

  adultsIncrement() {
    let adults = this.state.adults;
    adults += 1;
    this.setState({
      adults
    });
  }

  childrenDecrement() {
    let children = this.state.children;
    children -= 1;
    this.setState({
      children
    })
  }

  childrenIncrement() {
    let children = this.state.children;
    children += 1;
    this.setState({
      children
    })
  }

  infantsDecrement() {
    let infants = this.state.infants;
    infants -= 1;
    this.setState({
      infants
    })
  }

  infantsIncrement() {
    let infants = this.state.infants;
    infants += 1;
    this.setState({
      infants
    })
  }


  render() {
    return (
      <div className='guest-container'>
        <div className='adult-container'>
          <b>Adults</b>
          <span className='adult-increment-container'>

            <button onClick={this.adultsDecrement}className='increment-button'><span className='button-content'><svg viewBox="0 0 24 24" role="img" aria-label="subtract" focusable="false" style={{height: '1em', width: '1em', display: 'block', fill: 'currentcolor'}}><rect height={2} rx={1} width={12} x={6} y={11} /><rect height={2} rx={1} width={12} x={6} y={11} /></svg></span></button>

            <div className='guest-counter'>{this.state.adults}</div>

            <button onClick={this.adultsIncrement}className='increment-button'><span className='button-content'><svg viewBox="0 0 24 24" role="img" aria-label="add" focusable="false" style={{height: '1em', width: '1em', display: 'block', fill: 'currentcolor'}}><rect height={2} rx={1} width={12} x={6} y={11} /><rect height={12} rx={1} width={2} x={11} y={6} /></svg></span></button>
          </span>
        </div>

        <div className='children-container'>
          <b>Children</b>
          <span className='children-increment-container'>

            <button onClick={this.childrenDecrement}className='increment-button'><span className='button-content'><svg viewBox="0 0 24 24" role="img" aria-label="subtract" focusable="false" style={{height: '1em', width: '1em', display: 'block', fill: 'currentcolor'}}><rect height={2} rx={1} width={12} x={6} y={11} /><rect height={2} rx={1} width={12} x={6} y={11} /></svg></span></button>

            <div className='guest-counter'>{this.state.children}</div>

            <button onClick={this.childrenIncrement}className='increment-button'><span className='button-content'><svg viewBox="0 0 24 24" role="img" aria-label="add" focusable="false" style={{height: '1em', width: '1em', display: 'block', fill: 'currentcolor'}}><rect height={2} rx={1} width={12} x={6} y={11} /><rect height={12} rx={1} width={2} x={11} y={6} /></svg></span></button>
          </span>
          <div className='guest-subtext'>Ages 2-12</div>
        </div>

        <div className='infants-container'>
          <b>Infants</b>
          <span className='infant-increment-container'>

            <button onClick={this.infantsDecrement}className='increment-button'><span className='button-content'><svg viewBox="0 0 24 24" role="img" aria-label="subtract" focusable="false" style={{height: '1em', width: '1em', display: 'block', fill: 'currentcolor'}}><rect height={2} rx={1} width={12} x={6} y={11} /><rect height={2} rx={1} width={12} x={6} y={11} /></svg></span></button>

            <div className='guest-counter'>{this.state.infants}</div>

            <button onClick={this.infantsIncrement}className='increment-button'><span className='button-content'><svg viewBox="0 0 24 24" role="img" aria-label="add" focusable="false" style={{height: '1em', width: '1em', display: 'block', fill: 'currentcolor'}}><rect height={2} rx={1} width={12} x={6} y={11} /><rect height={12} rx={1} width={2} x={11} y={6} /></svg></span></button>
          </span>
          <div className='guest-subtext'>Under 2</div>
        </div>
      </div>

    );
  }
}

export default Guest;