import "reflect-metadata";
import createConnection from "./index";

const connection = createConnection();

connection.then(r => {
  console.log("Drop Test Database")
  r.dropDatabase()
});
