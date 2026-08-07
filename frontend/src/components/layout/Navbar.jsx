import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useSearch } from "../../context/SearchContext";
import { FiSearch } from "react-icons/fi";
import {
  FaChevronDown,
  FaBars,
  FaTimes
} from "react-icons/fa";


function Navbar() {


  const [activeMenu, setActiveMenu] = useState(null);

  const [mobileOpen, setMobileOpen] = useState(false);

  const navbarRef = useRef();
  const { openSearch } = useSearch();


  // DROPDOWN MENU ROUTES

  const dropdownRoutes = {

    ABOUT: [

      {
        name:"About Us",
        path:"/about"
      },

      {
        name:"4 Reasons to Choose Us",
        path:"/about/mission"

      },

      {
        name:"Testimonials",
        path:"/about/testimonials"
      },

    ],



    ADMISSIONS:[

      {
        name:"Admissions",
        path:"/admissions"
      },

      {
        name:"Apply Online",
        path:"/admissions/applyOnline"
      },

      {
        name:"Accept Admission",
        path:"/admissions/acceptAdmission"
      }

    ],



    CURRICULUM:[

      {
        name:"Curriculum",
        path:"/curriculum"
      },

      {
        name:"Awareness Curriculum",
        path:"/curriculum/awarenessCurriculum"
      },

    ],



    NEWS:[

      {
        name:"News & Events",
        path:"/news"
      },

      {
        name:"Upcoming Events",
        path:"/news/UpcomingEvents"
      }

    ]

  };




  const normalRoutes = {

    "PAY FEES":"/fees",

    "FACILITIES":"/facilities",

    "ALUMNI":"/alumni",

    "CONTACT":"/contact"

  };





  // CLOSE DROPDOWN WHEN CLICKING OUTSIDE

  useEffect(()=>{


    const handleOutsideClick=(e)=>{


      if(
        navbarRef.current &&
        !navbarRef.current.contains(e.target)
      ){

        setActiveMenu(null);

      }


    };



    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );



    return()=>{


      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );


    };


  },[]);






  const toggleMenu=(menu)=>{


    setActiveMenu(

      activeMenu === menu

      ?

      null

      :

      menu

    );


  };






return (

<header

ref={navbarRef}

className="
sticky
top-0
z-50
"

>


{/* PORTAL BAR */}

<div

className="
bg-sky-200
text-center
py-2
font-poppins
text-sm
"

>

<Link

to="/portal"

className="
cursor-pointer
hover:text-[#d4a017]
transition
"

>

PORTAL

</Link>


</div>


{/* MOBILE LOGO + MENU ROW */}

<div className="lg:hidden w-full bg-sky-100">

  <div className="w-full flex items-center justify-between pl-6 pr-10">

    {/* MOBILE LOGO */}
    <Link 
      to="/"
      className="flex items-center gap-3 cursor-pointer"
    >

      <img
        src={logo}
        alt="Sound Peace International Schools"
        className="w-160 h-30 md:w-160 md:h-30 object-contain"
      />

    </Link>


{/* MOBILE MENU ICON */}
<button
  onClick={() => setMobileOpen(!mobileOpen)}
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '55px',
    height: '55px',
    color: '#000000',
    cursor: 'pointer',
    paddingRight: '24px', // <-- this adds space on the right side
    background: 'none',
    border: 'none'
  }}
  aria-label="Toggle menu"
>
  {mobileOpen ? (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      style={{ width: '20px', height: '20px' }} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      strokeWidth={3.5}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M6 18L18 6M6 6l12 12" 
      />
    </svg>
  ) : (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      style={{ width: '24px', height: '24px' }} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      strokeWidth={3.5}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M4 6h16M4 12h16M4 18h16" 
      />
    </svg>
  )}
</button>

  </div>

</div>



{/* DESKTOP LOGO SECTION - UNCHANGED */}

<div className="hidden lg:block w-full bg-sky-100">


<div

className="
flex
items-center
justify-start
pt-16
pb-16
pl-20
"

>

<img

src={logo}

alt="Sound Peace International Schools"

className="w-160 "

/>


</div>


</div>





{/* NAVIGATION AREA */}

<nav

className="
bg-sky-200
relative
py-6
lg:py-12
style={{paddingTop: '40px', paddingBottom: '40px'}}
"


>


{/* DESKTOP NAVIGATION */}

<div
style={{
  paddingTop: "15px",
  paddingBottom: "15px",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  gap: "30px"
}}
className="
hidden
lg:flex
"
>

{/* HOME */}

<NavLink

to="/"
style={{
  paddingTop: "12px",
  paddingBottom: "12px",
  paddingLeft: "14px",
  paddingRight: "14px"
}}
className={({isActive})=>

`
group
relative
cursor-pointer
text-[#0f1a3a]
px-4
py-3
font-poppins
font-medium
tracking-wide
uppercase
transition-colors
duration-300

${isActive 
? "text-[#d4a017]" 
: ""
}

hover:text-[#d4a017]

`

}

>


HOME


<span

className="
absolute
-bottom-1
left-0
w-0
h-[2px]
bg-[#d4a017]
transition-all
duration-300
group-hover:w-full
"

></span>


</NavLink>







{/* DROPDOWN MENUS */}

{

Object.keys(dropdownRoutes).map((menu)=>(


<div

key={menu}

className="
relative
group
"


>


<button

onClick={()=>toggleMenu(menu)}

className="
cursor-pointer
flex
items-center
gap-2
text-[#0f1a3a]
font-poppins
font-medium
text-[15px]
tracking-wide
uppercase
transition-colors
duration-300
hover:text-[#d4a017]
"


>


{menu}



<FaChevronDown

className={`
text-[10px]
transition-transform
duration-300

${
activeMenu === menu
?
"rotate-180"
:
""
}

`}

/>


</button>






{/* DROPDOWN CONTENT */}

{

activeMenu === menu &&


<div

className="
absolute
top-full
left-0
mt-3
w-56
bg-white
shadow-xl
border
border-gray-100
z-50
"

>


{


dropdownRoutes[menu].map((item,index)=>(


<NavLink


key={item.name}


to={item.path}


onClick={()=>setActiveMenu(null)}


className={({isActive})=>

`

block
cursor-pointer
px-5
py-3
font-poppins
text-[14px]
transition-all
duration-200


${
isActive

?

"bg-[#fff9e6] text-[#d4a017]"

:

"text-[#4a5568] hover:bg-[#fff9e6] hover:text-[#d4a017] hover:pl-6"

}

`

}


>


{item.name}


</NavLink>


))


}



</div>


}


</div>


))


}









{/* NORMAL NAV LINKS */}


{

Object.keys(normalRoutes).map((item)=>(


<NavLink


key={item}


to={normalRoutes[item]}


className={({isActive})=>

`

group
relative
cursor-pointer
text-[#0f1a3a]
font-poppins
font-medium
text-[15px]
tracking-wide
uppercase
transition-colors
duration-300

${

isActive

?

"text-[#d4a017]"

:

""

}

hover:text-[#d4a017]

`

}


>


{item}



<span

className="
absolute
-bottom-1
left-0
w-0
h-[2px]
bg-[#d4a017]
transition-all
duration-300
group-hover:w-full
"

></span>


</NavLink>


))


}







{/* SEARCH ICON */}

{/* <FaSearch

className="
text-[#0f1a3a]
cursor-pointer
hover:text-[#d4a017]
transition-colors
duration-300
"

/> */}

<button
  onClick={openSearch}
  className="
    flex
    items-center
    justify-center
    w-10
    h-10
    rounded-full
    cursor-pointer
    transition
    hover:bg-blue-100
  "
  aria-label="Open Search"
>

  <FiSearch
    size={22}
    className="text-[#0B3D91]"
  />

</button>

</div>




{/* MOBILE MENU */}

{

mobileOpen &&


<div

className="
lg:hidden
absolute
top-full
left-0
w-full
bg-white
border-t
border-gray-100
z-50
"

>

<div style={{paddingTop: '2rem', paddingRight: '2rem', paddingLeft: '2rem', paddingBottom: '4.5rem'}} className="w-full px-12">


<div

className="
flex
flex-col
gap-6
"

>





{/* HOME */}

<NavLink

to="/"

onClick={()=>setMobileOpen(false)}

className={({isActive})=>

`

group
block
cursor-pointer
text-[#0f1a3a]
font-poppins
font-semibold
text-[15px]
tracking-wide
uppercase
transition-all
duration-300

${

isActive

?

"text-[#d4a017]"

:

""

}

hover:text-[#d4a017]

`

}

>


<span

className="
group-hover:translate-x-2
transition-transform
duration-300
block
"

>

HOME

</span>


</NavLink>







{/* MOBILE DROPDOWNS */}


{

Object.keys(dropdownRoutes).map((menu)=>(


<div

key={menu}

className="
flex
flex-col
gap-4
"

>


<button

onClick={()=>toggleMenu(menu)}

className="
cursor-pointer
flex
justify-between
items-center
text-[#0f1a3a]
font-poppins
font-medium
text-[15px]
tracking-wide
uppercase
transition-all
duration-300
hover:text-[#d4a017]
"

>


<span

className="
group-hover:translate-x-2
transition-transform
duration-300
"

>

{menu}

</span>



<FaChevronDown

className={`

text-xs
transition-transform
duration-300

${
activeMenu === menu

?

"rotate-180 text-[#d4a017]"

:

""

}

`}

/>


</button>







{

activeMenu === menu &&


<div

className="
ml-5
flex
flex-col
gap-4
pt-2
"

>


{

dropdownRoutes[menu].map((item)=>(


<NavLink


key={item.name}


to={item.path}


onClick={()=>{

setMobileOpen(false);

setActiveMenu(null);

}}


className={({isActive})=>

`

cursor-pointer
text-[#4a5568]
font-poppins
text-[14px]
transition-all
duration-300

${

isActive

?

"text-[#d4a017]"

:

""

}

hover:text-[#d4a017]
hover:translate-x-2

`

}


>


— {item.name}


</NavLink>


))


}



</div>


}



</div>


))


}









{/* NORMAL MOBILE LINKS */}


{

Object.keys(normalRoutes).map((item)=>(


<NavLink


key={item}


to={normalRoutes[item]}


onClick={()=>setMobileOpen(false)}


className={({isActive})=>

`

group
block
cursor-pointer
text-[#0f1a3a]
font-poppins
font-medium
text-[15px]
tracking-wide
uppercase
transition-all
duration-300

${

isActive

?

"text-[#d4a017]"

:

""

}

hover:text-[#d4a017]

`

}


>


<span

className="
group-hover:translate-x-2
transition-transform
duration-300
"

>

{item}

</span>


</NavLink>


))


}







{/* MOBILE PORTAL BUTTON */}


<Link

to="/portal"

onClick={()=>setMobileOpen(false)}

className="
cursor-pointer
px-5
py-3
bg-[#d4a017]
text-white
font-poppins
font-semibold
text-center
transition
hover:bg-[#b8860b]
"

>

PORTAL

</Link>





</div>


</div>


</div>


}


</nav>


</header>


);


}


export default Navbar;