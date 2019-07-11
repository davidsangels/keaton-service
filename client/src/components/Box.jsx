import React from "react";

class Box extends React.Component {
  constructor() {
    super()

    this.state = {
      value: '',
    }
  }

  render() {
    return (
      <div className='box'>
        <div className='price'>
          <span style={{fontSize:'25px'}}><b>$69</b></span> per night
        </div>
        <div className='reviews'>
          *****
        </div>
      </div>
    )
  }
}

export default Box;