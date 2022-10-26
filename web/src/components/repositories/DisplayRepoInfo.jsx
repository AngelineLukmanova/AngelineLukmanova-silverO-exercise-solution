import React from 'react';
import ReactMarkdown from 'react-markdown';

function DisplayRepoInfo({ openedRepo, setOpenedRepo }) {
  if (
    openedRepo.latestCommit === 'empty' &&
    openedRepo.readmeFile === 'empty'
  ) {
    return (
      <section className="Repositories__openedRepo">
        <div>Sorry! Nothing to display</div>
        <button type="button" onClick={() => setOpenedRepo(null)}>
          Close
        </button>
      </section>
    );
  }
  return (
    <section className="Repositories__openedRepo">
      <div className="Repositories__openedRepo-latestCommit">
        {openedRepo.latestCommit !== 'empty' && (
          <>
            <span>{`Date: ${openedRepo.latestCommit?.commit?.author?.date}`}</span>
            <span>{`Author: ${openedRepo.latestCommit?.commit?.author?.name}`}</span>
            <span>{`Message: ${openedRepo.latestCommit?.commit?.message}`}</span>
          </>
        )}
        {openedRepo.readmeFile !== 'empty' && (
          <ReactMarkdown children={openedRepo.readmeFile} />
        )}
      </div>
      <button type="button" onClick={() => setOpenedRepo(null)}>
        Close
      </button>
    </section>
  );
}

export default DisplayRepoInfo;
