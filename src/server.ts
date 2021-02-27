import "reflect-metadata";
import app from "./app";
import colors from "colors";

import "./database";

app.listen(3333, () => {
  console.log(colors.green("[OK] Server is running..."));
});
