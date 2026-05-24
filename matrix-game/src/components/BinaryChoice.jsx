function BinaryChoice({ legend, name, onChange, options, value }) {
  return (
    <fieldset className="binary-choice">
      <legend className="binary-choice__legend">{legend}</legend>

      <div className="binary-choice__options">
        {options.map((option) => {
          const optionId = `${name}-${option.value}`;
          const isSelected = value === option.value;

          return (
            <label
              className={`binary-choice__option${
                isSelected ? ' binary-choice__option--selected' : ''
              }`}
              htmlFor={optionId}
              key={option.value}
            >
              <input
                checked={isSelected}
                className="binary-choice__input"
                id={optionId}
                name={name}
                onChange={() => onChange(option.value)}
                type="radio"
                value={option.value}
              />
              <span className="binary-choice__label">{option.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default BinaryChoice;
