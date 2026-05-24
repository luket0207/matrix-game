export function getRowAndColumn(number, matrixSize) {
  return {
    column: (number - 1) % matrixSize,
    row: Math.floor((number - 1) / matrixSize),
  };
}

export function calculateTurnScore(
  selectedGuess,
  correctSecretNumber,
  matrixSize,
) {
  if (selectedGuess === correctSecretNumber) {
    return 3;
  }

  const selectedPosition = getRowAndColumn(selectedGuess, matrixSize);
  const correctPosition = getRowAndColumn(correctSecretNumber, matrixSize);

  if (
    selectedPosition.row === correctPosition.row ||
    selectedPosition.column === correctPosition.column
  ) {
    return 1;
  }

  return 0;
}
