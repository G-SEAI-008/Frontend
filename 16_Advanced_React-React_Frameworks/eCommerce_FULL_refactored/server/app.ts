import cors from 'cors';
import express from 'express';

import productsRouter from './products/routes.ts';

const app = express();
const port = Number(process.env.PORT ?? 5000);

app.use(cors());
app.use(express.json());
app.use('/products', productsRouter);

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
