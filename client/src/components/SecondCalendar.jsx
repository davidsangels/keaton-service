import React from "react";
import dateFns from "date-fns";
import styles from './style.css';

//Check every day after the initial start date of the reservation until you find one that is taken.
//Set start date equal to a date object you got passed in from props

class SecondCalendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentMonth: props.date,
      selectedDate: props.date,
      nextBooking: '',
      takenDates: '',
    };

    this.onDateClick = this.onDateClick.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.findNextBooking = this.findNextBooking.bind(this);
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
    const { currentMonth, selectedDate, takenDates, minBooking, maxBooking } = this.state;
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

    let nextMinBooking = dateFns.addDays(selectedDate, minBooking - 1);
    let nextMaxBooking = dateFns.addDays(selectedDate, maxBooking);

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        const taken = false;

        if (!dateFns.isAfter(day, nextMinBooking)) {
          taken = true;
        }

        if (dateFns.isSameDay(day, selectedDate)) {
          taken = false;
        }

        if (dateFns.isAfter(day, nextMaxBooking)) {
          taken = true;
        }

        if (dateFns.isAfter(day, this.state.nextBooking)) {
          taken = true;
        }


        //Check if current day is before selected date.
          //if it is, then taken = true

        //Not here, but need to somehow lcoate next upcoming taken day

        //Check if current day is after the next upcoming taken day.
          //if it is, then taken = true
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
    this.setState({
      selectedDate: day
    });
    this.props.secondDateSelection(day);
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

  findNextBooking() {
    const { selectedDate, takenDates } = this.state;
    // console.log(selectedDate);
    // console.log(dateFns.addDays(selectedDate, 1))

    let day = selectedDate;
    let count = 0;
    const nextBooking = '';

    while (count < 100) {
      for (let j = 0; j < takenDates.length; j++) {
        if (dateFns.isSameDay(day, takenDates[j])) {
          this.setState({
            nextBooking: day
          })
          return;
        }
      }
      day = dateFns.addDays(day, 1);
      count += 1;
    }
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
    .then(() => this.findNextBooking())
  }

  componentDidMount() {
    this.getServerData();
    this.findNextBooking();
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

export default SecondCalendar;