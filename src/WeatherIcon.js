import React, { Component } from "react";
import ReactAnimatedWeather from "react-animated-weather";
import PropTypes from "prop-types";

export default class WeatherIcon extends Component {
   static propTypes = { iconName: PropTypes.string.isRequired };

   iconMatching = {
      "01d": "CLEAR_DAY",
      "02d": "PARTLY_CLOUDY_DAY",
      "03d": "CLOUDY",
      "04d": "RAIN",
      "05d": "SLEET",
      "06d": "SNOW",
      "07d": "FOG"
   };

   render() {
      return (
      <ReactAnimatedWeather
         icon={this.iconMatching[this.props.iconName]}
         color="#000"
         size={38}
         animate={true}
      />
      );
   }
}