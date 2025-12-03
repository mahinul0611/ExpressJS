import app from "./app";
import config from "./config";


// Server er code clean hoye gelo : server just listen korteche ...
// sokol kaj app.ts korbe ...
const port = config.port;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});