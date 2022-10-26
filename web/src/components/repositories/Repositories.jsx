import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RepositoriesList from './RepositoriesList';
import './Repositories.scss';
import LanguageBtns from './LanguageBtns';

const expressAPI = process.env.REACT_APP_EXPRESS_API;

function Repositories() {
  const [data, setData] = useState();
  const [languageOptions, setLanguageOptions] = useState();
  const [displayedLanguage, setDisplayedLanguage] = useState('All');

  const compareDates = (date1, date2) => {
    return new Date(date2.created_at) - new Date(date1.created_at);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${expressAPI}/repos`);
        setData(response.data.sort(compareDates));
      } catch (err) {
        console.log(`Error! Error message: ${err.message}`);
      }
    };

    const getLanguageOptions = () => {
      const options = [];
      data.map(
        (repo) =>
          !options.includes(repo.language) && options.push(repo.language)
      );
      setLanguageOptions(options);
    };

    if (!data) {
      getData();
    } else {
      getLanguageOptions();
    }
  }, [data]);

  return (
    <div className="Repositories">
      <h1>Repositories</h1>
      {languageOptions && (
        <LanguageBtns
          languageOptions={languageOptions}
          setDisplayedLanguage={setDisplayedLanguage}
        />
      )}
      {data && (
        <RepositoriesList data={data} displayedLanguage={displayedLanguage} />
      )}
    </div>
  );
}

export default Repositories;
