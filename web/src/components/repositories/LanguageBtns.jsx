import React from 'react';

function LanguageBtns({ languageOptions, setDisplayedLanguage }) {
  return (
    <div className="Repositories__languageBtns">
      {languageOptions.map((option) => (
        <button
          id={option}
          key={option}
          onClick={(e) => setDisplayedLanguage(e.target.id)}
        >
          {option}
        </button>
      ))}
      <button id="All" onClick={(e) => setDisplayedLanguage(e.target.id)}>
        All
      </button>
    </div>
  );
}

export default LanguageBtns;
