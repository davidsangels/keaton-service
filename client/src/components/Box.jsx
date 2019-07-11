import React from "react";
import Calendar from './CalendarExample.jsx';

class Box extends React.Component {
  constructor() {
    super()

    this.state = {
      view: 'noDateSelection',
    }

    this.getServerData = this.getServerData.bind(this);
    this.onCheckIn = this.onCheckIn.bind(this);
  }

  componentDidMount() {
    this.getServerData();
  }

  getServerData() {
    axios.get('/bookings')
    .then((response) => {
      let { price, serviceFee, reviewScore, reviewAmount, maxGuests, maxAdults, maxChildren, maxInfants, minBooking, maxBooking, reservations } = response.data;

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
      })
    })
  }


  onCheckIn() {
    console.log('whattup');
    this.setState({
      view: 'firstDateSelection'
    });
  }


  render() {
    if (this.state.view === 'noDateSelection') {
      return (
        <div className='box'>
          <div className='price'>
            <span style={{fontSize:'25px'}}><b>$69</b></span> per night
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
          <div className='guests-display-wrapper'>
            <div className='guests-display-text'>
              1 guest
            </div>
          </div>

        </div>
      )
    } else if (this.state.view === 'firstDateSelection') {
      return (
        <div className='box'>
          <div className='price'>
            <span style={{fontSize:'25px'}}><b>$69</b></span> per night
          </div>


          <div className='reviews'>
            *****
          </div>


          <div className='datesText'>Dates</div>
          <div className='date-display-wrapper'>
            <div className='date-checkin-wrapper' onClick={this.onCheckIn}>
              <Calendar />
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
          <div className='guests-display-wrapper'>
            <div className='guests-display-text'>
              1 guest
            </div>
          </div>

        </div>
      )
    }
  }
}

export default Box;