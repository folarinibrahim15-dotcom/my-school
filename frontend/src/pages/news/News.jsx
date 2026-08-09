// import React from 'react'

import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import Footer from "../../components/Footer";
import searchData from "../../data/searchData";
import newsContent from "../../data/newsContent";


const menuItems = [
  "News & Events",
  "Latest News",
];



export default function News() {

  const [activeMenu, setActiveMenu] = useState("News & Events");

  const [searchQuery, setSearchQuery] = useState("");

  const [searchNotFound, setSearchNotFound] = useState(false);

  const current = newsContent[activeMenu];

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
  paddingRight: '60px',
}}> 
  
  <p style={{
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    color: '#000000',
    fontFamily: 'candara',
    fontWeight: '500',
    fontSize: '25px',
    lineHeight: '1.8',
    letterSpacing: '-0.6px'
  }}>
   Keep up to date with stories, news and reports about our<br/>
   Sound Peace International Secondary School.
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

                {Object.keys(newsContent).map((item) => (

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

              <h1 style={{
                fontSize: '32px',        
                fontWeight: '700',
                color: '#000',
                marginBottom: '12px',
                lineHeight: '1.2'
                // REMOVED fontFamily so it won't break
              }}
              className="md:text-4xl"
              >
                {current.title}
              </h1>
               {current.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  style={{
                    color: '#374151',      
                    lineHeight: '2',       
                    marginBottom: '24px',  
                    marginTop: '20px',  
                    fontSize: '16px'
                    // REMOVED fontFamily
                  }}
                >
                  {paragraph}
                </p>
              ))}
              <img
                src={current.image}
                alt={current.title}
                style={{
                  marginTop: '20px',         
                  borderRadius: '16px',    
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  width: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
             
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
              paddingRight: '32px'    // BIGGER right padding so it won't hug screen
            }}>

              {/* Search Box - Reduced width for desktop */}
              <div style={{
                display: 'flex',
                border: '1px solid #CCCCCC',
                height: '56px',
                marginBottom: '24px',
                maxWidth: '320px',      // REDUCED LENGTH so it doesn't stretch full
                width: '100%'           // but still responsive
              }}>
                <input
                  type="text"
                  placeholder="search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  style={{
                    flex: 1,
                    backgroundColor: '#F5F5F5',
                    paddingLeft: '20px',    
                    paddingRight: '16px',
                    outline: 'none',
                    border: 'none',
                    fontSize: '16px',
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: '300',
                    color: '#999',
                    minWidth: 0 // prevents overflow on small screens
                  }}
                />

                <button
                  onClick={handleSearch}
                  style={{
                    backgroundColor: '#000',
                    color: '#FFFFFF',
                    paddingLeft: '24px',    // MORE SPACIOUS left
                    paddingRight: '24px',   // MORE SPACIOUS right
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    cursor: 'pointer',
                    flexShrink: 0 // keeps button size on small screens
                  }}
                >
                  <FiSearch size={22} strokeWidth={2.5} />
                </button>
              </div>

              {/* Show not found message */}
              {searchNotFound && (
                <p style={{
                  color: 'red',
                  fontSize: '14px',
                  marginBottom: '16px',
                  textAlign: 'left',
                  fontFamily: 'Arial, sans-serif',
                  maxWidth: '320px'
                }}>
                  Not found
                </p>
              )}

              {/* Quick Contact */}
              <div style={{
                border: '1px solid #DDDDDD',
                borderRadius: '24px',
                paddingTop: '32px',
                paddingBottom: '32px',
                paddingLeft: '28px',
                paddingRight: '28px',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                maxWidth: '320px',      // MATCH search box width
                width: '100%'
              }}>
                <h3 style={{
                  fontFamily: 'candara',
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '24px',
                  color: '#000'
                }}>
                  Quick Contact
                </h3>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '18px',
                  color: '#222',
                  fontSize: '16px',
                  lineHeight: '1.5',
                  fontFamily: 'candara'
                }}>
                  <div>
                    <p style={{margin: 0, fontWeight: '400'}}>Phone:</p>
                    <p style={{margin: '4px 0 0 0', fontWeight: '700', fontSize: '17px'}}>+2348038555951</p>
                  </div>

                  <div>
                    <p style={{margin: 0, fontWeight: '400'}}>Mobile:</p>
                    <p style={{margin: '4px 0 0 0', fontWeight: '700', fontSize: '17px'}}>+2348062265559</p>
                  </div>

                  <div>
                    <p style={{margin: 0, fontWeight: '400'}}>Email:</p>
                    <a
                      href="mailto:soundpeaceinternationalschools@gmail.com"
                      style={{
                        margin: '4px 0 0 0',
                        display: 'block',
                        color: '#000',
                        textDecoration: 'none',
                        fontWeight: '700',
                        fontSize: '17px'
                      }}
                    >
                      Click to email us
                    </a>
                  </div>
                </div>
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
              fontWeight: '400',        // regular like in img
              lineHeight: '1.5',
              margin: 0
            }}
            className="md:text-3xl lg:text-4xl"
          >
            “For all letters are dead even if written by fingers of<br/>
            angels and nibs of stars, and all book knowledge is dead<br/>
            that is not unified with a corresponding life in the reader.” 
          </h2>

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

