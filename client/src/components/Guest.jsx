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
    this.renderAdults = this.renderAdults.bind(this);
    this.renderChildren = this.renderChildren.bind(this);
    this.renderInfants = this.renderInfants.bind(this);
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

  renderAdults() {
    const { adults, children } = this.state;
    let lowDisabled = false;
    if (adults <= 1) {
      lowDisabled = true;
    } else {
      lowDisabled = false;
    }

    let highDisabled = false;
    if (adults + children >= this.props.maxGuests) {
      highDisabled = true;
    } else {
      highDisabled = false;
    }
    return (
      <div className='adult-container'>
          <b>Adults</b>
          <span className='adult-increment-container'>

            <button disabled={lowDisabled} onClick={this.adultsDecrement}className='increment-button'><span className='button-content'><svg viewBox="0 0 24 24" role="img" aria-label="subtract" focusable="false" style={{height: '1em', width: '1em', display: 'block', fill: 'currentcolor'}}><rect height={2} rx={1} width={12} x={6} y={11} /><rect height={2} rx={1} width={12} x={6} y={11} /></svg></span></button>

            <div className='guest-counter'>{this.state.adults}</div>

            <button disabled={highDisabled} onClick={this.adultsIncrement}className='increment-button'><span className='button-content'><svg viewBox="0 0 24 24" role="img" aria-label="add" focusable="false" style={{height: '1em', width: '1em', display: 'block', fill: 'currentcolor'}}><rect height={2} rx={1} width={12} x={6} y={11} /><rect height={12} rx={1} width={2} x={11} y={6} /></svg></span></button>
          </span>
        </div>
    )
  }

  renderChildren() {
    const { children, adults } = this.state;
    let lowDisabled = false;
    if (children <= 0) {
      lowDisabled = true;
    } else {
      lowDisabled = false;
    }

    let highDisabled = false;
    if (adults + children >= this.props.maxGuests) {
      highDisabled = true;
    } else {
      highDisabled = false;
    }
    return (
      <div className='children-container'>
          <b>Children</b>
          <span className='children-increment-container'>

            <button disabled={lowDisabled} onClick={this.childrenDecrement}className='increment-button'><span className='button-content'><svg viewBox="0 0 24 24" role="img" aria-label="subtract" focusable="false" style={{height: '1em', width: '1em', display: 'block', fill: 'currentcolor'}}><rect height={2} rx={1} width={12} x={6} y={11} /><rect height={2} rx={1} width={12} x={6} y={11} /></svg></span></button>

            <div className='guest-counter'>{this.state.children}</div>

            <button disabled={highDisabled} onClick={this.childrenIncrement}className='increment-button'><span className='button-content'><svg viewBox="0 0 24 24" role="img" aria-label="add" focusable="false" style={{height: '1em', width: '1em', display: 'block', fill: 'currentcolor'}}><rect height={2} rx={1} width={12} x={6} y={11} /><rect height={12} rx={1} width={2} x={11} y={6} /></svg></span></button>
          </span>
          <div className='guest-subtext'>Ages 2-12</div>
        </div>
    )
  }

  renderInfants() {
    const { infants } = this.state;
    let lowDisabled = false;
    if (infants <= 0) {
      lowDisabled = true;
    } else {
      lowDisabled = false;
    }

    let highDisabled = false;
    if (infants >= 5) {
      highDisabled = true;
    } else {
      highDisabled = false;
    }
    return (
      <div className='infants-container'>
          <b>Infants</b>
          <span className='infant-increment-container'>

            <button disabled={lowDisabled} onClick={this.infantsDecrement}className='increment-button'><span className='button-content'><svg viewBox="0 0 24 24" role="img" aria-label="subtract" focusable="false" style={{height: '1em', width: '1em', display: 'block', fill: 'currentcolor'}}><rect height={2} rx={1} width={12} x={6} y={11} /><rect height={2} rx={1} width={12} x={6} y={11} /></svg></span></button>

            <div className='guest-counter'>{this.state.infants}</div>

            <button disabled={highDisabled} onClick={this.infantsIncrement}className='increment-button'><span className='button-content'><svg viewBox="0 0 24 24" role="img" aria-label="add" focusable="false" style={{height: '1em', width: '1em', display: 'block', fill: 'currentcolor'}}><rect height={2} rx={1} width={12} x={6} y={11} /><rect height={12} rx={1} width={2} x={11} y={6} /></svg></span></button>
          </span>
          <div className='guest-subtext'>Under 2</div>
        </div>
    )
  }


  render() {
    const guests = this.state.adults + this.state.children;
    const infants = this.state.infants;
    return (
      <div className='guest-container'>
        {this.renderAdults()}
        {this.renderChildren()}
        {this.renderInfants()}
        <div className='bottom-message'>
          5 guests maximum. Infants don't count toward the number of guests.
        </div>
        <div onClick={() => this.props.onGuestSelectionDoneNoDates(guests, infants)} className='close-guest-box'>
          Close
        </div>
      </div>

    );
  }
}

export default Guest;