import "./config/env.js";

import app from "./app.js";
import connectDB from "./config/db.js";
import { verifyMailConnection } from "./config/mail.js";

const PORT = process.env.PORT || 5000;

/*
|--------------------------------------------------------------------------
| Connect Database
|--------------------------------------------------------------------------
*/

await connectDB();

await verifyMailConnection();

/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/

app.listen(PORT, () => {
  console.log(`
===========================================
🚀 Sound Peace Backend Running
===========================================
🌐 Port: ${PORT}
🌍 Environment: ${process.env.NODE_ENV}
===========================================
`);
});