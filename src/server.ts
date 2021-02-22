import app from "./app";
import colors from "colors";

app.listen(3333, () => {
  console.log(colors.green("[OK] Server is running..."));
});
