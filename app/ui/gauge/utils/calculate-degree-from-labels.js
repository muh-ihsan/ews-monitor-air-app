calculateDegreeFromLabels = (
  degree,
  labels,
  useCustomRange,
  maxValue,
  minValue
) => {
  let perLevelDegree;
  if (!useCustomRange) {
    perLevelDegree = degree / labels.length;
  } else {
    perLevelDegree = [];
    for (i = 0; i < labels.length; i++) {
      label = labels[i];
      let degreeValue = label.thresholdValue * (180 / (maxValue - minValue));
      perLevelDegree.push(degreeValue);
    }
  }
  return perLevelDegree;
};

export default calculateDegreeFromLabels;
