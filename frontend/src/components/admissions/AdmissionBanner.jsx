import React from "react";

function AdmissionBanner() {
  return (
            <section
              className="
                w-full
                bg-[#FFD700]
              "
            >
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
            fontWeight: '00',
            fontSize: '20px',
            lineHeight: '1.8',
            letterSpacing: '-0.6px'
          }}>
        Let your child learn more. You can apply online and there are
          entrance examination centres nationwide.
          </p>

        </div>

            </section>
  );
}

export default AdmissionBanner;