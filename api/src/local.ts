import * as dotenv from "dotenv";
import { app } from "./app";

dotenv.config()

app.listen(8888, () => console.log("server listening on port 8888"))