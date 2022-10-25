import { Router, Request, Response } from 'express';
import reposFromFile from '../../data/repos.json';
import axios from 'axios';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  try {
    const reposFromAPI = await axios({
      url: 'https://api.github.com/users/silverorange/repos',
      method: 'get',
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
  res.status(200);

  res.json([]);
});
