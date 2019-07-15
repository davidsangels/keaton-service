import React from 'react';
import styles from './style.css';

class Guest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      adults: 1,
      children: 0,
      infants: 0,
    }
  }



  renderAdults() {
    const { adults, children, adultsDecrement, adultsIncrement } = this.props;
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
      <div className={styles.adultContainer}>
          <b>Adults</b>
          <span className={styles.adultIncrementContainer}>

            <button disabled={lowDisabled} onClick={adultsDecrement} className='increment-button'><span className='button-content'><svg viewBox="0 0 24 24" role="img" aria-label="subtract" focusable="false" style={{height: '1em', width: '1em', display: 'block', fill: 'currentcolor'}}><rect height={2} rx={1} width={12} x={6} y={11} /><rect height={2} rx={1} width={12} x={6} y={11} /></svg></span></button>

            <div className='guest-counter'>{adults}</div>

            <button disabled={highDisabled} onClick={adultsIncrement} className='increment-button'><span className='button-content'><svg viewBox="0 0 24 24" role="img" aria-label="add" focusable="false" style={{height: '1em', width: '1em', display: 'block', fill: 'currentcolor'}}><rect height={2} rx={1} width={12} x={6} y={11} /><rect height={12} rx={1} width={2} x={11} y={6} /></svg></span></button>
          </span>
        </div>
    )
  }

  renderChildren() {
    const { children, adults, childrenDecrement, childrenIncrement } = this.props;
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

            <button disabled={lowDisabled} onClick={childrenDecrement} className='increment-button'><span className='button-content'><svg viewBox="0 0 24 24" role="img" aria-label="subtract" focusable="false" style={{height: '1em', width: '1em', display: 'block', fill: 'currentcolor'}}><rect height={2} rx={1} width={12} x={6} y={11} /><rect height={2} rx={1} width={12} x={6} y={11} /></svg></span></button>

            <div className='guest-counter'>{children}</div>

            <button disabled={highDisabled} onClick={childrenIncrement} className='increment-button'><span className='button-content'><svg viewBox="0 0 24 24" role="img" aria-label="add" focusable="false" style={{height: '1em', width: '1em', display: 'block', fill: 'currentcolor'}}><rect height={2} rx={1} width={12} x={6} y={11} /><rect height={12} rx={1} width={2} x={11} y={6} /></svg></span></button>
          </span>
          <div className='guest-subtext'>Ages 2-12</div>
        </div>
    )
  }

  renderInfants() {
    const { infants, infantsDecrement, infantsIncrement } = this.props;
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

            <button disabled={lowDisabled} onClick={infantsDecrement} className='increment-button'><span className='button-content'><svg viewBox="0 0 24 24" role="img" aria-label="subtract" focusable="false" style={{height: '1em', width: '1em', display: 'block', fill: 'currentcolor'}}><rect height={2} rx={1} width={12} x={6} y={11} /><rect height={2} rx={1} width={12} x={6} y={11} /></svg></span></button>

            <div className='guest-counter'>{infants}</div>

            <button disabled={highDisabled} onClick={infantsIncrement} className='increment-button'><span className='button-content'><svg viewBox="0 0 24 24" role="img" aria-label="add" focusable="false" style={{height: '1em', width: '1em', display: 'block', fill: 'currentcolor'}}><rect height={2} rx={1} width={12} x={6} y={11} /><rect height={12} rx={1} width={2} x={11} y={6} /></svg></span></button>
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