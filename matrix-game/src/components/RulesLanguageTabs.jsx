const tabs = [
  { label: 'English', value: 'english' },
  { label: 'Japanese', value: 'japanese' },
];

function RulesLanguageTabs({ onChange, selectedLanguage }) {
  return (
    <div aria-label="Rules language" className="rules-tabs" role="tablist">
      {tabs.map((tab) => {
        const isSelected = selectedLanguage === tab.value;

        return (
          <button
            aria-selected={isSelected}
            className={`rules-tabs__button${
              isSelected ? ' rules-tabs__button--active' : ''
            }`}
            key={tab.value}
            onClick={() => onChange(tab.value)}
            role="tab"
            type="button"
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default RulesLanguageTabs;
