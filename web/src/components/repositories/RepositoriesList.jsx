import React from 'react';

function RepositoriesList({ data, displayedLanguage, showFullInfo }) {
  return (
    <div className="Repositories__list">
      {data?.map(
        (repo) =>
          (displayedLanguage === 'All' ||
            repo.language === displayedLanguage) && (
            <div
              id={repo.id}
              key={repo.id}
              className="Repositories__list-item"
              onClick={() => showFullInfo(repo)}
            >
              <span>{`Name: ${repo.name}`}</span>
              <span>{`Description: ${repo.description}`}</span>
              <span>{`Language: ${repo.language}`}</span>
              <span>{`Forks Count: ${repo.forks_count}`}</span>
            </div>
          )
      )}
    </div>
  );
}

export default RepositoriesList;
