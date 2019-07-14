import StarRatings from 'react-star-ratings';
import React from 'react';

class Stars extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    // rating = 2;
    const { rating } = this.props;
    return (
      <StarRatings
        rating={this.props.rating}
        starRatedColor="#088488"
        numberOfStars={5}
        starDimension='10px'
        starSpacing='1px'
        name='rating'
      />
    );
  }
}

export default Stars;