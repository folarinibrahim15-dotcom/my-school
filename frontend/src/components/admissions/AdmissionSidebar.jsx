import React from "react";

function AdmissionSidebar({

  activeMenu,

  setActiveMenu,

  menuItems,

}) {

  return (

        <aside
        style={{
            width: '100%',
            maxWidth: '280px',
            flexShrink: 0,
            paddingTop: '1rem',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            paddingBottom: '1rem',
            
        }}
        className="lg:w-[280px]"
        >

        {/* ONE MENU FOR BOTH MOBILE + DESKTOP */}
        <div
            style={{
            display: 'flex',
            gap: '0.75rem',
            paddingBottom: '1.5rem'
            }}
            className="
            flex-row flex-wrap /* mobile + tablet: horizontal wrap */
            lg:flex-col lg:sticky lg:top-36 /* desktop: vertical sidebar */
            "
        >
            {
            menuItems.map((item) => (
                <button
                key={item}
                onClick={() => setActiveMenu(item)}
                style={{
                    paddingTop: '1rem',
                    paddingBottom: '1.25rem',
                    paddingLeft: '1.5rem',
                    paddingRight: '1.5rem',
                    cursor: 'pointer',
                }}
                className={`
                    rounded-xl
                    font-poppins
                    font-semibold
                    transition-all
                    duration-300
                    border

                    flex-1 basis-[160px] /* mobile+tablet: responsive width */
                    text-center /* mobile+tablet: center text */

                    lg:flex-none lg:w-full lg:text-left lg:basis-auto /* desktop: full width, left text */

                    ${
                    activeMenu === item
                    ? `
                        bg-[#FFD700]
                        border-[#FFD700]
                        text-black
                        shadow-lg
                        lg:scale-[1.02]
                        `
                        : `
                        bg-gray-100
                        border-gray-200
                        text-gray-700
                        hover:bg-yellow-100
                        hover:border-yellow-300
                        lg:hover:translate-x-1
                        `
                    }
                `}
                >
                {item}
                </button>
            ))
            }
        </div>

        </aside>
  );

}

export default AdmissionSidebar;
