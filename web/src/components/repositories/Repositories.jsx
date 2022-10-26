import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RepositoriesList from './RepositoriesList';
import LanguageBtns from './LanguageBtns';
import DisplayRepoInfo from './DisplayRepoInfo';
import './Repositories.scss';

const expressAPI = process.env.REACT_APP_EXPRESS_API;

function Repositories() {
  const [data, setData] = useState();
  const [languageOptions, setLanguageOptions] = useState();
  const [displayedLanguage, setDisplayedLanguage] = useState('All');
  const [openedRepo, setOpenedRepo] = useState(null);
  const [error, setError] = useState(null);

  const compareDates = (date1, date2) => {
    return new Date(date2.created_at) - new Date(date1.created_at);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${expressAPI}/repos`);
        setData(response.data.sort(compareDates));
      } catch (err) {
        setError(
          `Error! Error message: ${err.message}. Please try again later!`
        );
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

  const fetchLatestCommit = async (repo) => {
    try {
      const latestCommit = await axios.get(
        `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?per_page=1`
      );
      setOpenedRepo((info) => ({
        ...info,
        latestCommit: latestCommit.data?.[0],
      }));
    } catch (err) {
      console.log(`Error! Error message: ${err.message}`);
    }
  };

  const fetchReadmeFile = async (repo) => {
    try {
      const readmeFile = await axios.get(
        `https://raw.githubusercontent.com/${repo.full_name}/master/README.md`
      );

      setOpenedRepo((info) => ({
        ...info,
        readmeFile: readmeFile.data,
      }));
    } catch (err) {
      console.log(`Error! Error message: ${err.message}`);
    }
  };

  const showFullInfo = (repo) => {
    if (openedRepo?.id !== repo.id) {
      setOpenedRepo({ id: repo.id });
      fetchLatestCommit(repo);
      fetchReadmeFile(repo);
    } else {
      setOpenedRepo(null);
    }
  };

  if (error) {
    return (
      <div className="Repositories">
        <div className="Repositories__error"> {error}</div>
      </div>
    );
  }

  return (
    <div className="Repositories">
      {data ? (
        <>
          <header>
            <h1>GitHub Repositories</h1>
            {languageOptions && (
              <LanguageBtns
                languageOptions={languageOptions}
                setDisplayedLanguage={setDisplayedLanguage}
              />
            )}
          </header>
          <main>
            <RepositoriesList
              data={data}
              displayedLanguage={displayedLanguage}
              showFullInfo={showFullInfo}
            />
            {openedRepo && (
              <DisplayRepoInfo
                openedRepo={openedRepo}
                setOpenedRepo={setOpenedRepo}
              />
            )}
          </main>
        </>
      ) : (
        <div className="Repositories__loader">
          <div id="Repositories-loader"> </div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}

export default Repositories;
