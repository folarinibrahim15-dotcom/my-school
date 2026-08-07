import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Footer from "../../components/Footer";
import missionContent from "../../data/missionContent";
import searchData from "../../data/searchData";
import labImage from "../../assets/images/apply.jpg"; // <-- adjust path

const menuItems = [
  "4 Reasons To Choose Us",
  "Unique Philosophy",
  "Academic Excellence",
  "Islamic Principles",
  "Home Away From Away",
];



export default function Mission() {

  const [activeMenu, setActiveMenu] = useState("4 Reasons To Choose Us");

  const [searchQuery, setSearchQuery] = useState("");

  const [searchNotFound, setSearchNotFound] = useState(false);

  const current = missionContent[activeMenu];

  const navigate = useNavigate();

 const handleSearch = () => {
  if (!searchQuery.trim()) return;

  const keyword = searchQuery.toLowerCase().trim();

  const result = searchData.find((page) =>
    page.title.toLowerCase().includes(keyword) ||
    page.keywords.some((word) =>
      word.toLowerCase().includes(keyword)
    )
  );

  if (result) {
    navigate(result.path);
    setSearchNotFound(false);
  } else {
    setSearchNotFound(true);

    setTimeout(() => {
      setSearchNotFound(false);
    }, 3000);
  }

  setSearchQuery("");
};

  return (
    <>
      {/* ======================================
              TOP YELLOW QUOTE BAR
      ====================================== */}

 <div style={{
  width: '100%',
  backgroundColor: '#FFD700',
  paddingTop: '30px',
  paddingBottom: '30px',
  paddingLeft: '60px',
  paddingRight: '60px'
}}>
  
  <p style={{
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    color: '#000000',
    fontFamily: 'candara',
    fontWeight: '500',
    fontSize: '20px',
    lineHeight: '1.8',
    letterSpacing: '-0.6px'
  }}>
    "Education comes alive when knowledge is transformed into character,
    purpose, and meaningful action. At Sound Peace International Schools,
    we prepare every learner not only for examinations, but for a lifetime
    of excellence and impact."
  </p>

</div>

      {/* ======================================
              ABOUT CONTENT
      ====================================== */}

      <section className="bg-white py-16 px-6 md:px-16 lg:px-20">

        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">



{/* ======================================
                    LEFT SIDEBAR
            ====================================== */}

            <aside style={{ 
              gridColumn: 'span 3 / span 3',
              paddingTop: '20px',     // padding above the whole box
              paddingBottom: '20px',  // padding below the whole box
              paddingLeft: '60px',    // margin from left screen edge
              paddingRight: 'auto'    // breathing room on right too
            }}>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>

                {Object.keys(missionContent).map((item) => (

                  <button
                    key={item}
                    onClick={() => setActiveMenu(item)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      paddingTop: '16px',      // space inside box top
                      paddingBottom: '16px',   // space inside box bottom
                      paddingLeft: '28px',     // space inside box left - text won't hug edge
                      paddingRight: '20px',
                      borderRadius: '0px',
                      fontSize: '16px',
                      fontWeight: '600',
                      fontFamily: 'Poppins, sans-serif',
                      transition: 'all 0.3s ease',
                      border: 'none',
                      cursor: 'pointer',
                      backgroundColor: activeMenu === item ? '#FFD700' : '#F2F2F2',
                      color: '#000000'
                    }}
                    onMouseOver={e => {
                      if(activeMenu !== item) e.currentTarget.style.backgroundColor = '#FFD700'
                    }}
                    onMouseOut={e => {
                      if(activeMenu !== item) e.currentTarget.style.backgroundColor = '#F2F2F2'
                    }}
                  >

                    {item}

                  </button>

                ))}
              </div>
            </aside>

{/* ======================================
                    CENTER CONTENT
            ====================================== */}

            <main style={{ 
              gridColumn: 'span 6 / span 6',
              order: 2,
              paddingTop: '32px',     
              paddingBottom: '32px',  
              paddingLeft: '16px',    
              paddingRight: '16px'    
            }}>
                    <img
                src={current.image}
                alt={current.title}
                style={{
                  marginTop: '4px',            
                  borderRadius: '16px',    
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  width: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />

              <h1 style={{
                fontSize: '32px',        
                fontWeight: '700',
                color: '#000',
                marginTop: '12px',
                lineHeight: '1.2'
                // REMOVED fontFamily so it won't break
              }}
              className="md:text-4xl"
              >
                {current.title}
              </h1>

              <p style={{
                color: '#6B7280',        
                fontSize: '18px',        
                marginBottom: '32px',    
                lineHeight: '1.6'
                // REMOVED fontFamily
              }}>
                {current.subtitle}
              </p>

              {current.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  style={{
                    color: '#374151',      
                    lineHeight: '2',       
                    marginBottom: '24px',  
                    fontSize: '16px'
                    // REMOVED fontFamily
                  }}
                >
                  {paragraph}
                </p>
              ))}



            </main>

{/* ======================================
                    RIGHT SIDEBAR
            ====================================== */}

            <aside style={{ 
              gridColumn: 'span 3 / span 3',
              order: 3,
              paddingTop: '24px',     
              paddingBottom: '24px',  
              paddingLeft: '20px',    
              paddingRight: '32px'    // KEPT SAME
            }}>

              {/* Banner Card */}
              <div style={{
                maxWidth: '320px',      
                width: '100%',
                borderRadius: '0',      
                overflow: 'hidden',
                boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                backgroundColor: '#FFFFFF'
              }}>

                {/* TOP BLUE BAR */}
                <div style={{
                  backgroundColor: '#00008B', 
                  padding: '28px 20px',
                  textAlign: 'center'
                }}>
                  <h2 style={{
                    margin: 0,
                    color: '#FFFFFF',
                    fontSize: '24px',
                    lineHeight: '1.4',
                    fontWeight: '300',
                    fontFamily: 'montserrat',
                    letterSpacing: '0.5px'
                  }}>
                    2026/2027<br/>
                    ACADEMIC<br/>
                    YEAR
                  </h2>
                </div>


            {/* MIDDLE IMAGE */}
            <div style={{
              width: '100%',
              lineHeight: 0 
            }}>
              <img 
                src={labImage}
                alt="Students in computer lab"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover',
                }}
                loading="lazy"
              />
            </div>

                {/* BOTTOM RED BAR - NOW CLICKABLE */}

 
                        <Link to= "/admissions/ApplyOnline"
                style={{
                    backgroundColor: '#8B0000', // DEFAULT: red box
                    padding: '24px 20px',
                    textAlign: 'center',
                    display: 'block',          
                    textDecoration: 'none',
                    cursor: 'pointer',         
                    transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFD700'; // HOVER: gold box
                    e.currentTarget.querySelector('h3').style.color = '#8B0000'; // HOVER: red text
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#8B0000'; // DEFAULT: red box
                    e.currentTarget.querySelector('h3').style.color = '#FFD700'; // DEFAULT: gold text
                }}
                >
                <h3 style={{
                    margin: 0,
                    color: '#FFD700', // DEFAULT: gold text
                    fontSize: '28px',
                    lineHeight: '1.3',
                    fontFamily: 'montserrat',
                    letterSpacing: '0.7px',
                    transition: 'color 0.3s ease' // smooth text color change
                }}>
                    APPLY<br/>
                    NOW
                </h3>
                </Link>
              </div>

            </aside>

          </div>

        </div>

      </section>


      
{/* ======================================
              BLUE QUOTE SECTION
      ====================================== */}

      <section style={{
        width: '100%',
        backgroundColor: '#0b2485', // exact dark blue from img
        paddingTop: '60px',        // MORE top padding
        paddingBottom: '60px',     // MORE bottom padding
        paddingLeft: '24px',
        paddingRight: '24px',
        textAlign: 'center'         // center everything
      }}>

        <div style={{
          maxWidth: '1000px',
          margin: '0 auto'
        }}>

          <h2
            style={{
              color: '#FFFFFF',
              fontSize: '28px',
              lineHeight: '1.5',
              margin: 0
            }}
            className="md:text-3xl lg:text-4xl"
          >
           “Show the light for people to find the way.”  
          </h2>

          <div style={{ marginTop: '40px' }}>

            <h3
              style={{
                color: '#FFD700',       // exact gold/yellow from img
                fontSize: '20px',
                fontWeight: '200',
                margin: 0,
                lineHeight: '1.6'
              }}
              className="md:text-2xl"
            >
              Nnamdi Azikiwe (1904-1996)
            </h3>

            <p
              style={{
                margin: '6px 0 0 0',
                color: '#FFD700',       // same gold
                fontSize: '16px'
              }}
            >
              Father of modern Nigerian nationalism & first president of Nigeria.
            </p>

          </div>

          <div
            style={{
              width: '75%',
              maxWidth: '700px',
              height: '2px',
              backgroundColor: '#FFD700', // gold line like img
              margin: '40px auto 0 auto'
            }}
            className="md:w-2/3"
          />

        </div>

      </section>


    </>
  );
}

