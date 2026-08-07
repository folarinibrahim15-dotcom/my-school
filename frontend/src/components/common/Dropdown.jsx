import React from "react";
function Dropdown({
title,
items
}){


return (

<div className="
relative
group
">


<button

className="
uppercase
font-poppins
font-semibold
flex
items-center
gap-1
"

>

{title}

<span>
⌄
</span>


</button>



<div

className="
absolute
top-8
left-0
hidden
group-hover:block
bg-white
shadow-lg
rounded-md
w-48
z-50
"

>


{

items.map(
(item,index)=>(


<a

key={index}

href="#"

className="
block
px-4
py-3
text-sm
hover:bg-gray-100
"

>

{item}

</a>


)

)

}


</div>


</div>

)


}


export default Dropdown;