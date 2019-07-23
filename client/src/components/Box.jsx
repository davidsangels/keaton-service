import React from 'react';
import dateFns from 'date-fns';
import Calendar from './CalendarExample.jsx';
import SecondCalendar from './SecondCalendar.jsx';
import Guest from './Guest.jsx';
import axios from 'axios';
import Stars from './Stars.jsx';
import styles from './style.css';

class Box extends React.Component {
  constructor() {
    super();

    this.state = {
      view: 'noDateSelection',
      adults: 1,
      children: 0,
      infants: 0,
      reviewScore: 0,
      reviewAmount: 0,
    };

    this.getServerData = this.getServerData.bind(this);
    this.onCheckIn = this.onCheckIn.bind(this);
    this.firstDateSelection = this.firstDateSelection.bind(this);
    this.secondDateSelection = this.secondDateSelection.bind(this);
    this.onGuestSelectionNoDates = this.onGuestSelectionNoDates.bind(this);
    this.onGuestSelectionWithDates = this.onGuestSelectionWithDates.bind(this);
    this.onGuestSelectionDoneNoDates = this.onGuestSelectionDoneNoDates.bind(this);
    this.adultsDecrement = this.adultsDecrement.bind(this);
    this.adultsIncrement = this.adultsIncrement.bind(this);
    this.childrenDecrement = this.childrenDecrement.bind(this);
    this.childrenIncrement = this.childrenIncrement.bind(this);
    this.infantsDecrement = this.infantsDecrement.bind(this);
    this.infantsIncrement = this.infantsIncrement.bind(this);
  }

  componentDidMount() {
    const pathway = window.location.pathname.split('/')[1];
    this.getServerData(pathway);
  }

  adultsDecrement() {
    let { adults } = this.state;
    adults -= 1;
    this.setState({
      adults
    });
  }

  adultsIncrement() {
    let { adults } = this.state;
    adults += 1;
    this.setState({
      adults
    });
  }

  childrenDecrement() {
    let { children } = this.state;
    children -= 1;
    this.setState({
      children
    });
  }

  childrenIncrement() {
    let { children } = this.state;
    children += 1;
    this.setState({
      children
    });
  }

  infantsDecrement() {
    let { infants } = this.state;
    infants -= 1;
    this.setState({
      infants
    });
  }

  infantsIncrement() {
    let { infants } = this.state;
    infants += 1;
    this.setState({
      infants
    });
  }

  onCheckIn() {
    this.setState({
      view: 'firstDateSelection',
    });
  }

  onGuestSelectionNoDates() {
    this.setState({
      view: 'guestSelectionNoDates',
    });
  }

  onGuestSelectionDoneNoDates(guestNumber, infantNumber) {
    if (!this.state.secondDate) {
      this.setState({
        view: 'guestSelectionDoneNoDates',
        guestNumber,
        infantNumber,
      });
    } else {
      this.setState({
        view: 'datesSelectedWithGuests',
        guestNumber,
        infantNumber,
      });
    }
  }

  onGuestSelectionWithDates() {
    this.setState({
      view: 'guestSelectionWithDates',
    })
  }


  getServerData(pathway) {
    axios.get('/bookings/' + pathway)
      .then((response) => {
        const {
          price,
          serviceFee,
          reviewScore,
          reviewAmount,
          maxGuests,
          maxAdults,
          maxChildren,
          maxInfants,
          minBooking,
          maxBooking,
          reservations,
        } = response.data;

        const parsedReservations = JSON.parse(reservations);

        this.setState({
          price,
          serviceFee,
          reviewScore,
          reviewAmount,
          maxGuests,
          maxAdults,
          maxChildren,
          maxInfants,
          minBooking,
          maxBooking,
          takenDates: parsedReservations,
        });
      });
  }

  firstDateSelection(day) {
    this.setState({
      view: 'secondDateSelection',
      firstDate: day,
    });
  }

  secondDateSelection(day) {
    const { guestNumber } = this.state;
    if (!guestNumber) {
      this.setState({
        view: 'datesSelected',
        secondDate: day,
      });
    } else {
      this.setState({
        view: 'datesSelectedWithGuests',
        secondDate: day,
      });
    }
  }


  render() {
    const { price, serviceFee, reviewScore, reviewAmount, maxGuests, maxAdults, maxChildren, maxInfants, minBooking, maxBooking, adults, children } = this.state;
    if (this.state.view === 'noDateSelection') {
      return (
        <div className={styles.box}>
          <div className={styles.price}>
            <span style={{fontSize:'25px'}}><b>${price}</b></span> per night
          </div>


          <div className={styles.reviews}>
            <Stars rating={reviewScore}/> <span className={styles.reviewAmount}><b>{reviewAmount}</b></span>
          </div>


          <div className={styles.datesText}>Dates</div>
          <div className={styles.dateDisplayWrapper}>
            <div className={styles.dateCheckinWrapper} onClick={this.onCheckIn}>
              <div className={styles.dateCheckinText}>Check In</div>
            </div>
            <div className={styles.dateArrowWrapper}>
              <div className={styles.dateArrowText}>-->
              </div>
            </div>
            <div className={styles.dateCheckoutWrapper}>
              <div className={styles.dateCheckoutText}>
                Check Out
              </div>
            </div>
          </div>

          <div className={styles.guestsText}>Guests</div>
          <div className={styles.guestsDisplayWrapper} onClick={this.onGuestSelectionNoDates}>
            <div className={styles.guestsDisplayContent}>
              <div className={styles.guestsDisplayText}>{adults + children} guests</div>
              <span className={styles.guestsDropdownButton}><svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style={{height: '16px', width: '16px', display: 'block', fill: 'currentcolor'}}><path d="m16.29 4.3a1 1 0 1 1 1.41 1.42l-8 8a1 1 0 0 1 -1.41 0l-8-8a1 1 0 1 1 1.41-1.42l7.29 7.29z" fillRule="evenodd" /></svg></span>
            </div>
          </div>

          <div className={styles.bookingButton}>
            <button type='submit' className={styles.booking} aria-busy='false' date-veloute='book-it-button'>
              <div className={styles.buttonText}>Reserve</div>
            </button>
          </div>
          <div className={styles.chargeMessage}>
            You won't be charged yet
          </div>

        </div>
      )
    } else if (this.state.view === 'firstDateSelection') {
      const { takenDates } = this.state;
      return (
        <div className={styles.box}>
          <div className={styles.price}>
            <span style={{fontSize:'25px'}}><b>${price}</b></span> per night
          </div>


          <div className={styles.reviews}>
            <Stars rating={reviewScore}/> <span className={styles.reviewAmount}><b>{reviewAmount}</b></span>
          </div>


          <div className={styles.datesText}>Select Checkin Date</div>
          <Calendar takenDates={takenDates} firstDateSelection={this.firstDateSelection}/>
          </div>
      )
    } else if (this.state.view === 'secondDateSelection') {
      const { maxBooking, minBooking, takenDates } = this.state;
      return (
        <div className={styles.box}>
          <div className={styles.price}>
            <span style={{fontSize:'25px'}}><b>${price}</b></span> per night
          </div>


          <div className={styles.reviews}>
            <Stars rating={reviewScore}/> <span className={styles.reviewAmount}><b>{reviewAmount}</b></span>
          </div>


          <div className={styles.datesText}>Select Checkout date</div>
          <SecondCalendar takenDates={takenDates} maxBooking={maxBooking} minBooking={minBooking} date={this.state.firstDate} secondDateSelection={this.secondDateSelection}/>
          </div>
      )
    } else if (this.state.view === 'datesSelected') {
      const dateFormat = "MMM D YYYY"
      const { firstDate, secondDate } = this.state;
      const stayLength = dateFns.differenceInCalendarDays(secondDate, firstDate) + 1;
      const stayPrice = stayLength * price;
      const totalPrice = stayPrice + serviceFee;
      return (
        <div className={styles.boxBig}>
          <div className={styles.price}>
            <span style={{fontSize:'25px'}}><b>${price}</b></span> per night
          </div>


          <div className={styles.reviews}>
            <Stars rating={reviewScore}/> <span className={styles.reviewAmount}><b>{reviewAmount}</b></span>
          </div>


          <div className={styles.datesText}>Dates</div>
          <div className={styles.dateDisplayWrapper}>
            <div className={styles.dateCheckinWrapper} onClick={this.onCheckIn}>
              <div className={styles.dateCheckinText}>{dateFns.format(firstDate, dateFormat)}</div>
            </div>
            <div className={styles.dateArrowWrapper}>
              <div className={styles.dateArrowText}>-->
              </div>
            </div>
            <div className={styles.dateCheckoutWrapper} >
              <div className={styles.dateCheckoutText}>
                {dateFns.format(secondDate, dateFormat)}
              </div>
            </div>
          </div>

          <div className={styles.guestsText}>Guests</div>
          <div className={styles.guestsDisplayWrapper} onClick={this.onGuestSelectionWithDates}>
            <div className={styles.guestsDisplayContent}>
                <div className={styles.guestsDisplayText}>{adults + children} guests</div>
                <span className={styles.guestsDropdownButton}><svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style={{height: '16px', width: '16px', display: 'block', fill: 'currentcolor'}}><path d="m16.29 4.3a1 1 0 1 1 1.41 1.42l-8 8a1 1 0 0 1 -1.41 0l-8-8a1 1 0 1 1 1.41-1.42l7.29 7.29z" fillRule="evenodd" /></svg></span>
              </div>
          </div>

          <div className={styles.priceCalculationWrapper}>
            <div className={styles.priceCalculation}>${price} x {stayLength} nights<span className={styles.result}>${stayPrice}</span></div>
            <div className={styles.priceCalculation}>Service fee<span className={styles.result}>${serviceFee}</span></div>
            <div className={styles.totalCalculation}><b>Total</b><span className={styles.result}><b>${totalPrice}</b></span></div>
          </div>

          <div className={styles.bookingButton}>
            <button type='submit' className={styles.booking} aria-busy='false' date-veloute='book-it-button'>
              <div className={styles.buttonText}>Reserve</div>
            </button>
          </div>
          <div className={styles.chargeMessage}>
            You won't be charged yet
          </div>

        </div>
      )
    } else if (this.state.view === 'guestSelectionNoDates') {
      const { adults, children, infants } = this.state;
      return (
        <div className={styles.box}>
          <div className={styles.price}>
            <span style={{fontSize:'25px'}}><b>${price}</b></span> per night
          </div>


          <div className={styles.reviews}>
            <Stars rating={reviewScore}/> <span className={styles.reviewAmount}><b>{reviewAmount}</b></span>
          </div>


          <div className={styles.datesText}>Dates</div>
          <div className={styles.dateDisplayWrapper}>
            <div className={styles.dateCheckinWrapper} onClick={this.onCheckIn}>
              <div className={styles.dateCheckinText}>Check In</div>
            </div>
            <div className={styles.dateArrowWrapper}>
              <div className={styles.dateArrowText}>-->
              </div>
            </div>
            <div className={styles.dateCheckoutWrapper}>
              <div className={styles.dateCheckoutText}>
                Check Out
              </div>
            </div>
          </div>
          <Guest maxGuests={maxGuests} onGuestSelectionDoneNoDates={this.onGuestSelectionDoneNoDates} adultsDecrement={this.adultsDecrement} adultsIncrement={this.adultsIncrement} adults={adults}
          childrenDecrement={this.childrenDecrement} childrenIncrement={this.childrenIncrement} children={children}
          infantsDecrement={this.infantsDecrement} infantsIncrement={this.infantsIncrement} infants={infants}/>
        </div>
      )
    } else if (this.state.view === 'guestSelectionWithDates') {
      const { adults, children, infants, firstDate, secondDate } = this.state;
      const dateFormat = 'MMM D YYYY';
      return (
        <div className={styles.box}>
          <div className={styles.price}>
            <span style={{fontSize:'25px'}}><b>${price}</b></span> per night
          </div>


          <div className={styles.reviews}>
            <Stars rating={reviewScore}/> <span className={styles.reviewAmount}><b>{reviewAmount}</b></span>
          </div>


          <div className={styles.datesText}>Dates</div>
          <div className={styles.dateDisplayWrapper}>
            <div className={styles.dateCheckinWrapper} onClick={this.onCheckIn}>
              <div className={styles.dateCheckinText}>{dateFns.format(firstDate, dateFormat)}</div>
            </div>
            <div className={styles.dateArrowWrapper}>
              <div className={styles.dateArrowText}>-->
              </div>
            </div>
            <div className={styles.dateCheckoutWrapper}>
              <div className={styles.dateCheckoutText}>
                {dateFns.format(secondDate, dateFormat)}
              </div>
            </div>
          </div>
          <Guest maxGuests={maxGuests} onGuestSelectionDoneNoDates={this.onGuestSelectionDoneNoDates} adultsDecrement={this.adultsDecrement} adultsIncrement={this.adultsIncrement} adults={adults}
          childrenDecrement={this.childrenDecrement} childrenIncrement={this.childrenIncrement} children={children}
          infantsDecrement={this.infantsDecrement} infantsIncrement={this.infantsIncrement} infants={infants}/>
        </div>
      )
    } else if (this.state.view === 'guestSelectionDoneNoDates') {
      const { adults, children, infants } = this.state;
      return (
        <div className={styles.box}>
          <div className={styles.price}>
            <span style={{fontSize:'25px'}}><b>${price}</b></span> per night
          </div>


          <div className={styles.reviews}>
            <Stars rating={reviewScore}/> <span className={styles.reviewAmount}><b>{reviewAmount}</b></span>
          </div>


          <div className={styles.datesText}>Dates</div>
          <div className={styles.dateDisplayWrapper}>
            <div className={styles.dateCheckinWrapper} onClick={this.onCheckIn}>
              <div className={styles.dateCheckinText}>Check In</div>
            </div>
            <div className={styles.dateArrowWrapper}>
              <div className={styles.dateArrowText}>-->
              </div>
            </div>
            <div className={styles.dateCheckoutWrapper}>
              <div className={styles.dateCheckoutText}>
                Check Out
              </div>
            </div>
          </div>

          <div className={styles.guestsText}>Guests</div>
          <div className={styles.guestsDisplayWrapper} onClick={this.onGuestSelectionNoDates}>
            <div className={styles.guestsDisplayContent}>
                <div className={styles.guestsDisplayText}>{adults + children} guests</div>
                <span className={styles.guestsDropdownButton}><svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style={{height: '16px', width: '16px', display: 'block', fill: 'currentcolor'}}><path d="m16.29 4.3a1 1 0 1 1 1.41 1.42l-8 8a1 1 0 0 1 -1.41 0l-8-8a1 1 0 1 1 1.41-1.42l7.29 7.29z" fillRule="evenodd" /></svg></span>
              </div>
          </div>

          <div className={styles.bookingButton}>
            <button type='submit' className={styles.booking} aria-busy='false' date-veloute='book-it-button'>
              <div className={styles.buttonText}>Reserve</div>
            </button>
          </div>
          <div className={styles.chargeMessage}>
            You won't be charged yet
          </div>
        </div>
      )
    } else if (this.state.view === 'datesSelectedWithGuests') {
      const dateFormat = "MMM D YYYY"
      const { firstDate, secondDate } = this.state;
      const stayLength = dateFns.differenceInCalendarDays(secondDate, firstDate) + 1;
      const stayPrice = stayLength * price;
      const totalPrice = stayPrice + serviceFee;
      let { adults, children } = this.state;
      return (
        <div className={styles.boxBig}>
          <div className={styles.price}>
            <span style={{fontSize:'25px'}}><b>${price}</b></span> per night
          </div>


          <div className={styles.reviews}>
            <Stars rating={reviewScore}/> <span className={styles.reviewAmount}><b>{reviewAmount}</b></span>
          </div>


          <div className={styles.datesText}>Dates</div>
          <div className={styles.dateDisplayWrapper}>
            <div className={styles.dateCheckinWrapper} onClick={this.onCheckIn}>
              <div className={styles.dateCheckinText}>{dateFns.format(firstDate, dateFormat)}</div>
            </div>
            <div className={styles.dateArrowWrapper}>
              <div className={styles.dateArrowText}>-->
              </div>
            </div>
            <div className={styles.dateCheckoutWrapper} >
              <div className={styles.dateCheckoutText}>
                {dateFns.format(secondDate, dateFormat)}
              </div>
            </div>
          </div>

          <div className={styles.guestsText}>Guests</div>
          <div className={styles.guestsDisplayWrapper} onClick={this.onGuestSelectionWithDates}>
            <div className={styles.guestsDisplayContent}>
                <div className={styles.guestsDisplayText}>{adults + children} guests</div>
                <span className={styles.guestsDropdownButton}><svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style={{height: '16px', width: '16px', display: 'block', fill: 'currentcolor'}}><path d="m16.29 4.3a1 1 0 1 1 1.41 1.42l-8 8a1 1 0 0 1 -1.41 0l-8-8a1 1 0 1 1 1.41-1.42l7.29 7.29z" fillRule="evenodd" /></svg></span>
              </div>
          </div>

          <div className={styles.priceCalculationWrapper}>
            <div className={styles.priceCalculation}>${price} x {stayLength} nights<span className={styles.result}>${stayPrice}</span></div>
            <div className={styles.priceCalculation}>Service fee<span className={styles.result}>${serviceFee}</span></div>
            <div className={styles.totalCalculation}><b>Total</b><span className={styles.result}><b>${totalPrice}</b></span></div>
          </div>

          <div className={styles.bookingButton}>
            <button type='submit' className={styles.booking} aria-busy='false' date-veloute='book-it-button'>
              <div className={styles.buttonText}>Reserve</div>
            </button>
          </div>
          <div className={styles.chargeMessage}>
            You won't be charged yet
          </div>
        </div>
      )
    }
  }
}

export default Box;