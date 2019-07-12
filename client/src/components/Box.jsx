import React from 'react';
import dateFns from 'date-fns';
import Calendar from './CalendarExample.jsx';
import SecondCalendar from './SecondCalendar.jsx';
import Guest from './Guest.jsx';

class Box extends React.Component {
  constructor() {
    super();

    this.state = {
      view: 'noDateSelection',
    };

    this.getServerData = this.getServerData.bind(this);
    this.onCheckIn = this.onCheckIn.bind(this);
    this.firstDateSelection = this.firstDateSelection.bind(this);
    this.secondDateSelection = this.secondDateSelection.bind(this);
    this.onGuestSelectionNoDates = this.onGuestSelectionNoDates.bind(this);
    this.onGuestSelectionDoneNoDates = this.onGuestSelectionDoneNoDates.bind(this);
  }

  componentDidMount() {
    this.getServerData();
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


  getServerData() {
    axios.get('/bookings')
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

  onGuestSelectionDoneNoDates(guestNumber, infantNumber) {
    if (!this.state.secondDate) {
      this.setState({
        view: 'guestSelectionDoneNoDates',
        guestNumber,
        infantNumber,
      })
    } else {
      this.setState({
        view: 'datesSelectedWithGuests',
        guestNumber,
        infantNumber,
      })
    }
  }


  render() {
    const { price, serviceFee, reviewScore, maxGuests, maxAdults, maxChildren, maxInfants, minBooking, maxBooking } = this.state;
    if (this.state.view === 'noDateSelection') {
      return (
        <div className='box'>
          <div className='price'>
            <span style={{fontSize:'25px'}}><b>${price}</b></span> per night
          </div>


          <div className='reviews'>
            *****
          </div>


          <div className='datesText'>Dates</div>
          <div className='date-display-wrapper'>
            <div className='date-checkin-wrapper' onClick={this.onCheckIn}>
              <div className='date-checkin-text'>Check In</div>
            </div>
            <div className='date-arrow-wrapper'>
              <div className='date-arrow-text'>-->
              </div>
            </div>
            <div className='date-checkout-wrapper'>
              <div className='date-checkout-text'>
                Check Out
              </div>
            </div>
          </div>

          <div className='guests-text'>Guests</div>
          <div className='guests-display-wrapper' onClick={this.onGuestSelectionNoDates}>
            <div className='guests-display-text'>
              1 guest
            </div>
          </div>

          <div className='booking-button'>
            <button type='submit' className='booking' aria-busy='false' date-veloute='book-it-button'>
              <div className='button-text'>Reserve</div>
            </button>
          </div>
          <div className='charge-message'>
            You won't be charged yet
          </div>

        </div>
      )
    } else if (this.state.view === 'firstDateSelection') {
      return (
        <div className='box'>
          <div className='price'>
            <span style={{fontSize:'25px'}}><b>${price}</b></span> per night
          </div>


          <div className='reviews'>
            *****
          </div>


          <div className='datesText'>Select Checkin Date</div>
          <Calendar firstDateSelection={this.firstDateSelection}/>
          </div>
      )
    } else if (this.state.view === 'secondDateSelection') {
      return (
        <div className='box'>
          <div className='price'>
            <span style={{fontSize:'25px'}}><b>${price}</b></span> per night
          </div>


          <div className='reviews'>
            *****
          </div>


          <div className='datesText'>Select Checkout date</div>
          <SecondCalendar date={this.state.firstDate} secondDateSelection={this.secondDateSelection}/>
          </div>
      )
    } else if (this.state.view === 'datesSelected') {
      const dateFormat = "MMM D YYYY"
      const { firstDate, secondDate } = this.state;
      const stayLength = dateFns.differenceInCalendarDays(secondDate, firstDate) + 1;
      const stayPrice = stayLength * price;
      const totalPrice = stayPrice + serviceFee;
      console.log(stayLength);
      return (
        <div className='boxBig'>
          <div className='price'>
            <span style={{fontSize:'25px'}}><b>${price}</b></span> per night
          </div>


          <div className='reviews'>
            *****
          </div>


          <div className='datesText'>Dates</div>
          <div className='date-display-wrapper'>
            <div className='date-checkin-wrapper' onClick={this.onCheckIn}>
              <div className='date-checkin-text'>{dateFns.format(firstDate, dateFormat)}</div>
            </div>
            <div className='date-arrow-wrapper'>
              <div className='date-arrow-text'>-->
              </div>
            </div>
            <div className='date-checkout-wrapper' >
              <div className='date-checkout-text'>
                {dateFns.format(secondDate, dateFormat)}
              </div>
            </div>
          </div>

          <div className='guests-text'>Guests</div>
          <div className='guests-display-wrapper' onClick={this.onGuestSelectionNoDates}>
            <div className='guests-display-text'>
              {this.state.guestNumber || 1} guests
            </div>
          </div>

          <div className='price-calculation-wrapper'>
            <div className='price-calculation'>${price} x {stayLength} nights<span className='result'>${stayPrice}</span></div>
            <div className='price-calculation'>Service fee<span className='result'>${serviceFee}</span></div>
            <div className='total-calculation'><b>Total</b><span className='result'><b>${totalPrice}</b></span></div>
          </div>

          <div className='booking-button'>
            <button type='submit' className='booking' aria-busy='false' date-veloute='book-it-button'>
              <div className='button-text'>Reserve</div>
            </button>
          </div>
          <div className='charge-message'>
            You won't be charged yet
          </div>

        </div>
      )
    } else if (this.state.view === 'guestSelectionNoDates') {
      return (
        <div className='box'>
          <div className='price'>
            <span style={{fontSize:'25px'}}><b>${price}</b></span> per night
          </div>


          <div className='reviews'>
            *****
          </div>


          <div className='datesText'>Dates</div>
          <div className='date-display-wrapper'>
            <div className='date-checkin-wrapper' onClick={this.onCheckIn}>
              <div className='date-checkin-text'>Check In</div>
            </div>
            <div className='date-arrow-wrapper'>
              <div className='date-arrow-text'>-->
              </div>
            </div>
            <div className='date-checkout-wrapper'>
              <div className='date-checkout-text'>
                Check Out
              </div>
            </div>
          </div>
          <Guest maxGuests={maxGuests} onGuestSelectionDoneNoDates={this.onGuestSelectionDoneNoDates}/>
        </div>
      )
    } else if (this.state.view === 'guestSelectionDoneNoDates') {
      return (
        <div className='box'>
          <div className='price'>
            <span style={{fontSize:'25px'}}><b>${price}</b></span> per night
          </div>


          <div className='reviews'>
            *****
          </div>


          <div className='datesText'>Dates</div>
          <div className='date-display-wrapper'>
            <div className='date-checkin-wrapper' onClick={this.onCheckIn}>
              <div className='date-checkin-text'>Check In</div>
            </div>
            <div className='date-arrow-wrapper'>
              <div className='date-arrow-text'>-->
              </div>
            </div>
            <div className='date-checkout-wrapper'>
              <div className='date-checkout-text'>
                Check Out
              </div>
            </div>
          </div>

          <div className='guests-text'>Guests</div>
          <div className='guests-display-wrapper' onClick={this.onGuestSelectionNoDates}>
            <div className='guests-display-text'>
              {this.state.guestNumber} guests
            </div>
          </div>

          <div className='booking-button'>
            <button type='submit' className='booking' aria-busy='false' date-veloute='book-it-button'>
              <div className='button-text'>Reserve</div>
            </button>
          </div>
          <div className='charge-message'>
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
      console.log(stayLength);
      return (
        <div className='boxBig'>
          <div className='price'>
            <span style={{fontSize:'25px'}}><b>${price}</b></span> per night
          </div>


          <div className='reviews'>
            *****
          </div>


          <div className='datesText'>Dates</div>
          <div className='date-display-wrapper'>
            <div className='date-checkin-wrapper' onClick={this.onCheckIn}>
              <div className='date-checkin-text'>{dateFns.format(firstDate, dateFormat)}</div>
            </div>
            <div className='date-arrow-wrapper'>
              <div className='date-arrow-text'>-->
              </div>
            </div>
            <div className='date-checkout-wrapper' >
              <div className='date-checkout-text'>
                {dateFns.format(secondDate, dateFormat)}
              </div>
            </div>
          </div>

          <div className='guests-text'>Guests</div>
          <div className='guests-display-wrapper' onClick={this.onGuestSelectionNoDates}>
            <div className='guests-display-text'>
              {this.state.guestNumber} guests
            </div>
          </div>

          <div className='price-calculation-wrapper'>
            <div className='price-calculation'>${price} x {stayLength} nights<span className='result'>${stayPrice}</span></div>
            <div className='price-calculation'>Service fee<span className='result'>${serviceFee}</span></div>
            <div className='total-calculation'><b>Total</b><span className='result'><b>${totalPrice}</b></span></div>
          </div>

          <div className='booking-button'>
            <button type='submit' className='booking' aria-busy='false' date-veloute='book-it-button'>
              <div className='button-text'>Reserve</div>
            </button>
          </div>
          <div className='charge-message'>
            You won't be charged yet
          </div>

        </div>
      )
    }
  }
}

export default Box;