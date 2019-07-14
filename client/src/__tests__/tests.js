import { shallow, mount, render } from 'enzyme';
import Enzyme from 'enzyme';
import React from 'react';
import Box from '../components/Box.jsx';
import Calendar from '../components/CalendarExample.jsx';
import SecondCalendar from '../components/SecondCalendar.jsx';
import Guest from '../components/Guest.jsx';
import dateFns from "date-fns";
import Stars from '../components/Stars.jsx';

// const wrapper = shallow(<Box />);

Enzyme.configure({ disableLifecycleMethods: true});

describe('<Box />', () => {
  it('renders 1 <Box /> component', () => {
    const component = shallow(<Box />);
    expect(component.exists()).toBe(true);
  });

  it('opens the first calendar on checkin click', () => {
    const component = shallow(<Box />);
    const button = component.find('.date-checkin-wrapper')
    button.simulate('click');
    expect(component.containsMatchingElement(<Calendar />)).toBe(true);
  });
});

describe('Calendar', () => {
  it('renders 1 <Calendar /> component', () => {
    const component = shallow(<Calendar />);
    expect(component.exists()).toBe(true);
  });
});

describe('SecondCalendar', () => {
  it('renders 1 <SecondCalendar /> component', () => {
    const component = shallow(<SecondCalendar />);
    expect(component.exists()).toBe(true);
  });
});

describe('Guest', () => {
  it('renders 1 <Guest /> component', () => {
    const component = shallow(<Guest />);
    expect(component.exists()).toBe(true);
  });
});

describe('Stars', () => {
  it('renders 1 <Stars /> component', () => {
    const component = shallow(<Stars />);
    expect(component.exists()).toBe(true);
  });
});

describe('Box Functions', () => {
  const wrapper = shallow(<Box />);
  it('should properly change view', () => {
    const instance = wrapper.instance();
    instance.onGuestSelectionNoDates();
    expect(wrapper.state('view')).toBe('guestSelectionNoDates');
  });

  it('should properly change view', () => {
    const instance = wrapper.instance();
    instance.onGuestSelectionWithDates();
    expect(wrapper.state('view')).toBe('guestSelectionWithDates');
  });

  it('should properly change view on checkin', () => {
    const instance = wrapper.instance();
    instance.onCheckIn();
    expect(wrapper.state('view')).toBe('firstDateSelection');
  });

  it('should properly change view on guestSelection', () => {
    const instance = wrapper.instance();
    instance.onGuestSelectionDoneNoDates();
    expect(wrapper.state('view')).toBe('guestSelectionDoneNoDates');
  });

  it('should properly change view after after picking first date', () => {
    const instance = wrapper.instance();
    instance.firstDateSelection();
    expect(wrapper.state('view')).toBe('secondDateSelection');
  });

  it('should properly change view after after picking second date', () => {
    const instance = wrapper.instance();
    instance.secondDateSelection();
    expect(wrapper.state('view')).toBe('datesSelected');
  });
});

describe('Calendar Functions', () => {
  const wrapper = shallow(<Calendar />);
  it('should properly add a month', () => {
    const instance = wrapper.instance();
    let month = new Date();
    wrapper.setState({
      currentMonth: month
    });
    instance.nextMonth();
    expect(wrapper.state('currentMonth')).toStrictEqual(dateFns.addMonths(month, 1));
   });

   it('should properly subtract a month', () => {
    const instance = wrapper.instance();
    let month = new Date();
    wrapper.setState({
      currentMonth: month
    });
    instance.prevMonth();
    expect(wrapper.state('currentMonth')).toStrictEqual(dateFns.subMonths(month, 1));
   });
});

describe('SecondCalendar Functions', () => {
  const wrapper = shallow(<SecondCalendar />);
  it('should properly add a month', () => {
    const instance = wrapper.instance();
    let month = new Date();
    wrapper.setState({
      currentMonth: month
    });
    instance.nextMonth();
    expect(wrapper.state('currentMonth')).toStrictEqual(dateFns.addMonths(month, 1));
   });

   it('should properly subtract a month', () => {
    const instance = wrapper.instance();
    let month = new Date();
    wrapper.setState({
      currentMonth: month
    });
    instance.prevMonth();
    expect(wrapper.state('currentMonth')).toStrictEqual(dateFns.subMonths(month, 1));
   });
});

describe('Guest Increment/Decrement Functions', () => {
  const wrapper = shallow(<Box />);
  it('should decrement adults', () => {
    const instance = wrapper.instance();
    wrapper.setState({
      adults: 3
    });
    instance.adultsDecrement();
    expect(wrapper.state('adults')).toStrictEqual(2)
  });

  it('should increment adults', () => {
    const instance = wrapper.instance();
    wrapper.setState({
      adults: 3
    });
    instance.adultsIncrement();
    expect(wrapper.state('adults')).toStrictEqual(4)
  });

  it('should decrement children', () => {
    const instance = wrapper.instance();
    wrapper.setState({
      children: 3
    });
    instance.childrenDecrement();
    expect(wrapper.state('children')).toStrictEqual(2)
  });

  it('should increment children', () => {
    const instance = wrapper.instance();
    wrapper.setState({
      children: 3
    });
    instance.childrenIncrement();
    expect(wrapper.state('children')).toStrictEqual(4)
  });

  it('should decrement infants', () => {
    const instance = wrapper.instance();
    wrapper.setState({
      infants: 3
    });
    instance.infantsDecrement();
    expect(wrapper.state('infants')).toStrictEqual(2)
  });

  it('should increment infants', () => {
    const instance = wrapper.instance();
    wrapper.setState({
      infants: 3
    });
    instance.infantsIncrement();
    expect(wrapper.state('infants')).toStrictEqual(4)
  });
});