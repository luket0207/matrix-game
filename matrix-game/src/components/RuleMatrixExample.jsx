const labels = {
  english: {
    big: 'Big',
    cute: 'Cute',
    scary: 'Scary',
    small: 'Small',
  },
  japanese: {
    big: '大きい',
    cute: 'かわいい',
    scary: 'こわい',
    small: '小さい',
  },
};

function RuleMatrixExample({ language }) {
  const currentLabels = labels[language];

  return (
    <figure className="rule-matrix">
      <div className="rule-matrix__x-axis">
        <span>{currentLabels.small}</span>
        <span>{currentLabels.big}</span>
      </div>
      <div className="rule-matrix__y-label rule-matrix__y-label--top">
        {currentLabels.scary}
      </div>
      <div className="rule-matrix__grid" aria-label="Example easy matrix">
        {Array.from({ length: 9 }, (_, index) => {
          const number = index + 1;

          return (
            <div
              className={`rule-matrix__cell${
                number === 3 ? ' rule-matrix__cell--secret' : ''
              }`}
              key={number}
            >
              {number}
            </div>
          );
        })}
      </div>
      <div className="rule-matrix__y-label rule-matrix__y-label--bottom">
        {currentLabels.cute}
      </div>
    </figure>
  );
}

export default RuleMatrixExample;
