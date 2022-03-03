import express from "express";
import 'express-async-errors';
import cookieParser from "cookie-parser";

import {json} from "express";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import {PORT} from "./config.js";
import {mainRouter} from "./routes/main.js";
import {appRouter} from "./routes/app.js";
import {handleError} from "./midddleware/errors.js";

import "./db/mongoose.js";

const app = express();

app.use(json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../')));

app.use('/app', appRouter);
app.use('/', mainRouter);

app.use(handleError);

app.listen(PORT, () => console.log('Server has started.'));
