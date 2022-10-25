import React, { useState, useEffect } from 'react';
import axios from 'axios';

const expressAPI = process.env.REACT_APP_EXPRESS_API;

function Repositories() {
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await axios.get(`${expressAPI}/repos`);
      setData(response?.data);
    } catch (err) {
      console.log(`Error! Error message: ${err.message}`);
    }
  };

  useEffect(() => {
    if (!data) {
      getData();
    }
  }, [data]);

  return (
    <div>
      <p>Repositories</p>
    </div>
  );
}

export default Repositories;