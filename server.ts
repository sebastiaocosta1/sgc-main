import app from "./src/app";
require('dotenv').config();
const PORT = process.env.PORT;


app.listen(PORT, () => {
  console.log(`Servidor executando em http://localhost:${PORT}`);
});