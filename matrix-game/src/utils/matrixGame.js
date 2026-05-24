export function getMatrixSize(difficulty) {
  if (difficulty === 'hard') {
    return 5;
  }

  if (difficulty === 'medium') {
    return 4;
  }

  return 3;
}

export function getMaxSecretNumber(difficulty) {
  const matrixSize = getMatrixSize(difficulty);
  return matrixSize * matrixSize;
}

export function getGridNumbers(difficulty) {
  const maxSecretNumber = getMaxSecretNumber(difficulty);

  return Array.from({ length: maxSecretNumber }, (_, index) => index + 1);
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function pickRandomCategory(categories) {
  return categories[getRandomInt(categories.length)];
}

export function pickTwoDifferentScales(category) {
  const firstIndex = getRandomInt(category.scales.length);
  let secondIndex = getRandomInt(category.scales.length);

  while (secondIndex === firstIndex) {
    secondIndex = getRandomInt(category.scales.length);
  }

  return {
    xAxisScale: category.scales[firstIndex],
    yAxisScale: category.scales[secondIndex],
  };
}

export function createTurnData(categories, difficulty) {
  const category = pickRandomCategory(categories);
  const { xAxisScale, yAxisScale } = pickTwoDifferentScales(category);
  const secretNumber = getRandomInt(getMaxSecretNumber(difficulty)) + 1;

  return {
    category,
    secretNumber,
    xAxisScale,
    yAxisScale,
  };
}

export function getNextPlayerIndex(currentPlayerIndex, playerCount) {
  return (currentPlayerIndex + 1) % playerCount;
}
