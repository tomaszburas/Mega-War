import * as express from "express";
import * as cookieParser from "cookie-parser";
import { json } from "express";
import { join } from "path";
import { PORT } from "./config";
import { mainRouter } from "./routes/main";
import { appRouter } from "./routes/app";
import { handleError } from "./utils/errors";
import "./db/mongoose";
const app = express();
app.use(json());
app.use(cookieParser());
app.use(express.static(join(__dirname, '../client')));
app.use('/', mainRouter);
app.use('/app', appRouter);
app.use(handleError);
app.listen(PORT, () => console.log('Server has started.'));
//# sourceMappingURL=server.js.map