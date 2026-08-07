import React from "react";
import Navbar from "../components/layout/Navbar";

function MainLayout({children}){


return (

<>


<Navbar/>
{children}


</>

)

}


export default MainLayout;