calculateLabelFromValue = (
  value,
  labels,
  minValue,
  maxValue,
  perLevelDegree,
  useCustomRange
) => {
  const degreeValue = value * (180 / (maxValue - minValue));
  var label;

  const valueCheck = degreeValue / 180;
  let currentDeg;
  console.log("perLevelDegree type: " + typeof perLevelDegree);

  if (!useCustomRange) {
    let currentIndex = 0;
    currentDeg = perLevelDegree;
    // Algortihm for searching the label index
    while (currentDeg <= 180) {
      let degreeCheck = currentDeg / 180;
      if (valueCheck < degreeCheck) {
        label = labels[currentIndex];
        break;
      } else {
        currentDeg += perLevelDegree;
        currentIndex++;
      }
    }
  } else {
    for (i = 0; i < perLevelDegree.length; i++) {
      currentDeg = perLevelDegree[i];
      let degreeCheck = currentDeg / 180;
      if (valueCheck < degreeCheck) {
        label = labels[i];
        break;
      }
    }
  }

  // const labelPrint = Object.values(label);
  return label;
};

export default calculateLabelFromValue;
