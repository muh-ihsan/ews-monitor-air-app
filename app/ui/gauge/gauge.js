/* This is an UI Component that's slightly modified from
   https://github.com/pritishvaidya/react-native-speedometer,
   added custom range and reworked the degree calculation
*/

import React, { Component } from "react";
import { Animated, Image, Easing, Text, View } from "react-native";
import PropTypes from "prop-types";

// Utils
import calculateDegreeFromLabels from "./utils/calculate-degree-from-labels";
import calculateLabelFromValue from "./utils/calculate-label-from-value";
import limitValue from "./utils/limit-value";
import validateSize from "./utils/validate-size";

// Style
import style, { width as deviceWidth } from "./style";

class Speedometer extends Component {
  constructor(props) {
    super(props);
    this.speedometerValue = new Animated.Value(props.defaultValue);
  }

  render() {
    const {
      value,
      size,
      minValue,
      maxValue,
      easeDuration,
      allowedDecimals,
      labels,
      needleImage,
      wrapperStyle,
      outerCircleStyle,
      halfCircleStyle,
      imageWrapperStyle,
      imageStyle,
      innerCircleStyle,
      labelWrapperStyle,
      labelStyle,
      labelNoteStyle,
      useNativeDriver,
      useCustomRange,
    } = this.props;
    const degree = 180;
    const perLevelDegree = calculateDegreeFromLabels(
      degree,
      labels,
      useCustomRange,
      maxValue,
      minValue
    );
    const label = calculateLabelFromValue(
      limitValue(value, minValue, maxValue, allowedDecimals),
      labels,
      minValue,
      maxValue,
      perLevelDegree,
      useCustomRange
    );
    Animated.timing(this.speedometerValue, {
      toValue: limitValue(value, minValue, maxValue, allowedDecimals),
      duration: easeDuration,
      easing: Easing.linear,
      useNativeDriver,
    }).start();

    const rotate = this.speedometerValue.interpolate({
      inputRange: [minValue, maxValue],
      outputRange: ["-90deg", "90deg"],
    });

    const currentSize = validateSize(size, deviceWidth - 20);
    return (
      <View
        style={[
          style.wrapper,
          {
            width: currentSize,
            height: currentSize / 2,
          },
          wrapperStyle,
        ]}
      >
        <View
          style={[
            style.outerCircle,
            {
              width: currentSize,
              height: currentSize / 2,
              borderTopLeftRadius: currentSize / 2,
              borderTopRightRadius: currentSize / 2,
            },
            outerCircleStyle,
          ]}
        >
          {labels.map((level, index) => {
            let circleDegree;
            if (!useCustomRange) {
              circleDegree = 90 + index * perLevelDegree;
            } else {
              if (index == 0) {
                circleDegree = 90;
              } else {
                circleDegree = 90 + perLevelDegree[index - 1];
              }
            }
            console.log("circleDegree: " + circleDegree);

            return (
              <View
                key={level.name}
                style={[
                  style.halfCircle,
                  {
                    backgroundColor: level.activeBarColor,
                    width: currentSize / 2,
                    height: currentSize,
                    borderRadius: currentSize / 2,
                    transform: [
                      { translateX: currentSize / 4 },
                      { rotate: `${circleDegree}deg` },
                      { translateX: (currentSize / 4) * -1 },
                    ],
                  },
                  halfCircleStyle,
                ]}
              />
            );
          })}
          <Animated.View
            style={[
              style.imageWrapper,
              {
                top: -(currentSize / 15),
                transform: [{ rotate }],
              },
              imageWrapperStyle,
            ]}
          >
            <Image
              style={[
                style.image,
                {
                  width: currentSize,
                  height: currentSize,
                },
                imageStyle,
              ]}
              source={needleImage}
            />
          </Animated.View>
          <View
            style={[
              style.innerCircle,
              {
                width: currentSize * 0.6,
                height: (currentSize / 2) * 0.6,
                borderTopLeftRadius: currentSize / 2,
                borderTopRightRadius: currentSize / 2,
              },
              innerCircleStyle,
            ]}
          />
        </View>
        <View style={[style.labelWrapper, labelWrapperStyle]}>
          <Text style={[style.label, labelStyle]}>
            {limitValue(value, minValue, maxValue, allowedDecimals)}
          </Text>
          <Text
            style={[
              style.labelNote,
              { color: label.labelColor },
              labelNoteStyle,
            ]}
          >
            {label.name}
          </Text>
        </View>
      </View>
    );
  }
}

Speedometer.defaultProps = {
  defaultValue: 50,
  minValue: 0,
  maxValue: 100,
  easeDuration: 500,
  allowedDecimals: 0,
  labels: [
    {
      name: "Pathetically weak",
      labelColor: "#ff2900",
      activeBarColor: "#ff2900",
    },
    {
      name: "Very weak",
      labelColor: "#ff5400",
      activeBarColor: "#ff5400",
    },
    {
      name: "So-so",
      labelColor: "#f4ab44",
      activeBarColor: "#f4ab44",
    },
    {
      name: "Fair",
      labelColor: "#f2cf1f",
      activeBarColor: "#f2cf1f",
    },
    {
      name: "Strong",
      labelColor: "#14eb6e",
      activeBarColor: "#14eb6e",
    },
    {
      name: "Unbelievably strong",
      labelColor: "#00ff6b",
      activeBarColor: "#00ff6b",
    },
  ],
  needleImage: require("./images/speedometer-needle.png"),
  wrapperStyle: {},
  outerCircleStyle: {},
  halfCircleStyle: {},
  imageWrapperStyle: {},
  imageStyle: {},
  innerCircleStyle: {},
  labelWrapperStyle: {},
  labelStyle: {},
  labelNoteStyle: {},
  useNativeDriver: true,
  useCustomRange: false,
};

Speedometer.propTypes = {
  value: PropTypes.number.isRequired,
  defaultValue: PropTypes.number,
  size: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  easeDuration: PropTypes.number,
  allowedDecimals: PropTypes.number,
  labels: PropTypes.array,
  needleImage: PropTypes.any,
  wrapperStyle: PropTypes.object,
  outerCircleStyle: PropTypes.object,
  halfCircleStyle: PropTypes.object,
  imageWrapperStyle: PropTypes.object,
  imageStyle: PropTypes.object,
  innerCircleStyle: PropTypes.object,
  labelWrapperStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  labelNoteStyle: PropTypes.object,
  useNativeDriver: PropTypes.bool,
  useCustomRange: PropTypes.bool,
};

export default Speedometer;
