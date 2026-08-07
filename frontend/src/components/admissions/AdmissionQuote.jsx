import React from "react";

function AdmissionQuote() {

  return (

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
           “We can’t solve problems by using the same kind of thinking <br/>
            we used when we created them.” 
          </h2>

          <div style={{ marginTop: '40px' }}>

            <h3
              style={{
                color: '#FFD700',       // exact gold/yellow from img
                fontSize: '20px',
                fontWeight: '500',
                margin: 0,
                lineHeight: '1.6'
              }}
              className="md:text-2xl"
            >
               Albert Einstein (1879-1955)
            </h3>

            <p
              style={{
                margin: '6px 0 0 0',
                color: '#FFD700',       // same gold
                fontSize: '16px'
              }}
            >
              Intellectual genius and greatest scientist of modern times.
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

  );

}

export default AdmissionQuote;