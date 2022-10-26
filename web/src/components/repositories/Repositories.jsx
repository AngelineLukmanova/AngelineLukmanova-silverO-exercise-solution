import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RepositoriesList from './RepositoriesList';
import './Repositories.scss';

const expressAPI = process.env.REACT_APP_EXPRESS_API;

function Repositories() {
  const [data, setData] = useState();

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

    if (!data) {
      getData();
    }
  }, [data]);

  return (
    <div className="Repositories">
      <h1>Repositories</h1>
      <RepositoriesList data={data} />
    </div>
  );
}

export default Repositories;
