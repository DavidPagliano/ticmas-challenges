import {App }from "./app";
import { connectDB } from "./database";
import { PORT } from "./config";

async function main() {
  await connectDB();
  //App.listen(PORT);
  console.log("Server on port ", PORT);
  const web =  new App ();
  web.start();
}

main();