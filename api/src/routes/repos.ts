import { Router, Request, Response } from 'express';
import axios from 'axios';
import reposFromFile from '../../data/repos.json';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  //add filtered repositories from JSON file to result
  const result = reposFromFile.filter((repository) => !repository.fork);

  try {
    const reposFromAPI = await axios({
      url: 'https://api.github.com/users/silverorange/repos',
      method: 'get',
    });

    //add filtered repositories from github API to result
    result.push(
      ...reposFromAPI.data.filter(
        (repository: Record<string, any>) => !repository.fork
      )
    );
  } catch (err) {
    res.status(500).json({ message: err });
  }

  res.status(200).json(result);
});
