import React from "react";
import dateFns from "date-fns";
import styles from './style.css';

class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentMonth: new Date(),
      selectedDate: '',
      takenDates: ['July 7 2019', 'July 20 2019', 'August 5 2019', 'July 10 2019']
    };

    this.onDateClick = this.onDateClick.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.getServerData = this.getServerData.bind(this);
  }

  renderHeader() {
    const dateFormat = "MMMM YYYY";

    return (
      <div className={[styles.header, styles.row, styles.flexMiddle].join(' ')}>
        <div className={[styles.col, styles.colStart].join(' ')}>
          <div className={styles.icon} onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className={[styles.col, styles.colCenter].join(' ')}>
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className={[styles.col, styles.colEnd].join(' ')} onClick={this.nextMonth}>
          <div className={styles.icon}>chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className={[styles.col, styles.colCenter].join(' ')} key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className={[styles.days, styles.row].join(' ')}>{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate, takenDates } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "D";
    const dateFormat2 = "MMMM YYYY DDDD"
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        const taken = false;
        for (let j= 0; j < takenDates.length; j++) {
          if (dateFns.isSameDay(day, takenDates[j])) {
            taken = true;
          }
        }
        days.push(
          <div
            // className={`col cell ${
            //   (!dateFns.isSameMonth(day, monthStart) ||  taken === true)
            //     ? "disabled"
            //     : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
            // }`}
            className={(!dateFns.isSameMonth(day, monthStart) || taken === true) ? [styles.col, styles.cell, styles.disabled].join(' ') : dateFns.isSameDay(day, selectedDate) ? [styles.col, styles.cell, styles.selected].join(' ') : [styles.col, styles.cell].join(' ')}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className={styles.number}>{formattedDate}</span>
            <span className={styles.bg}>{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className={styles.row} key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className={styles.body}>{rows}</div>;
  }

  onDateClick(day) {
    console.log(day);
    this.setState({
      selectedDate: day
    });
    this.props.firstDateSelection(day);
  };

  nextMonth() {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth() {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

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

  componentDidMount() {
    this.getServerData();
  }

  render() {
    return (
      <div className={styles.calendar}>
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

export default Calendar;