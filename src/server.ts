import "reflect-metadata";
import app from "./app";
import colors from "colors";
import createConnection from "./database";

createConnection();

app.listen(3333, () => {
  console.log(colors.green("[OK] Server is running..."));
});
