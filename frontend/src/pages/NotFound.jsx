import React from "react";
import { Link } from "react-router-dom";

export default function NotFound(){

return(

<div className="text-center py-20">


<h1 className="text-5xl font-bold text-red-800">
404
</h1>


<p className="text-xl mt-4">
Page Not Found
</p>



<Link
to="/"
className="
inline-block
mt-6
bg-blue-900
text-white
px-6
py-3
cursor-pointer
"
>

Go Back Home

</Link>


</div>

)

}

