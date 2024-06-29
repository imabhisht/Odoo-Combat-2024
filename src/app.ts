import express, { Request, Response } from 'express';
import cors from 'cors';
import { userRouter } from './routes/user';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/user', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
