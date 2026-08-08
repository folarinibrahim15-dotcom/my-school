import "./config/env.js";

import app from "./app.js";
import connectDB from "./config/db.js";
import { verifyMailConnection } from "./config/mail.js";

const PORT = Number(process.env.PORT) || 5000;

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

app.listen(PORT, "0.0.0.0", () => {
    console.log(
        `🚀 Sound Peace Backend Running on port ${PORT}`
    );
});