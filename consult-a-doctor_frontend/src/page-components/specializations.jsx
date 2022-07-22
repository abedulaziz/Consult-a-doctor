import React from 'react'

import axios from 'axios';

// layout components
import Header from '../layout-components/header';
import Footer from '../layout-components/footer';
import Specialization from '../layout-components/specialization';


const Specializations = () => {

  const [specializations, setSpecializations] = React.useState(null);

  React.useEffect(() => {

    try {
      const getSpecializations = async() => {
  
        const specRqust = await axios.get("/specializations")
  
        console.log(specRqust);
        setSpecializations(specRqust.data.specializations)
  
      }
      getSpecializations()
      
    } catch (err) {
      console.log(err);
    }
  }, [])


  return (
    <>
      <Header />
      <main>
        <div className="specs">
          <div className="container">
            <div className="spec_content">
              
              <div className="heading">
                <h2>Specializations</h2>
                <p>Choose the specialization the doctor you are seeking belongs to</p>
              </div>

              <div className="specs-container">
                <div className="left-side-specs">
                  {specializations && specializations.map((spec, index) => {
                    if (index % 2 === 0) {
                      return <Specialization key={spec.id} specName={spec.name} img={spec.background_image} />
                    }
                  })}
                </div>
                <div className="right-side-specs">
                {specializations && specializations.map((spec, index) => {
                    if (index % 2 !== 0) {
                      return <Specialization key={spec.id} specName={spec.name} img={spec.background_image} />
                    }
                  })}

                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default Specializations