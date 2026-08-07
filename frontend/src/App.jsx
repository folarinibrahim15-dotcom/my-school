// import React from "react";
// import PublicRoute from "./routes/PublicRoute";
// import DashboardRoutes from "./routes/DashboardRoutes";
// import Login from "./features/portal/auth/pages/Login";

// function App() {

//     return (

//         <>

//             <PublicRoute />

//             <DashboardRoutes />

//             <Route
//     path="/portal/login"
//     element={<Login />}
// />

//         </>

//     );

// }

// export default App;
import React from "react";
import { Routes, Route } from "react-router-dom";

import PublicRoute from "./routes/PublicRoute";
import DashboardRoutes from "./routes/DashboardRoutes";

function App() {
  return (
    <Routes>

      {/* Public Website */}
      <Route
        path="/*"
        element={<PublicRoute />}
      />

      {/* ERP */}
      <Route
        path="/portal/*"
        element={<DashboardRoutes />}
      />

    </Routes>
  );
}

export default App;