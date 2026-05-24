function NumberMatrix({
  className = '',
  disabled = false,
  matrixSize,
  numbers,
  onSelect,
  selectedNumber = null,
}) {
  const matrixClassName = ['number-matrix', `number-matrix--${matrixSize}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={matrixClassName}>
      {numbers.map((number) => {
        const isSelected = selectedNumber === number;

        return (
          <button
            className={`number-matrix__cell${
              isSelected ? ' number-matrix__cell--selected' : ''
            }`}
            disabled={disabled}
            key={number}
            onClick={() => onSelect(number)}
            type="button"
          >
            {number}
          </button>
        );
      })}
    </div>
  );
}

export default NumberMatrix;
