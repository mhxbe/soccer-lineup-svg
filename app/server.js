import express, { json } from 'express';
import LineupRoute from './lineup.route.js';

const app = express();

app
  .use(json()) // formerly body-parser
  .use('/lineup', LineupRoute)
  .listen(9069, () => {
    console.log(`App listening on port http://localhost:9069`);
  });
