import React from 'react'

// layout components
import Header from '../layout-components/header';
import Footer from '../layout-components/footer';
import Specialization from '../layout-components/specialization';

// backgrounds
import CardiologyBackground from '../assets/backgrounds/invasive-cardiology.jpg';
import EarNoseThroatBackground from '../assets/backgrounds/ear-nose-throat.jpg';
import EndocrinologyBackground from '../assets/backgrounds/Endocrinology-2.jpg';
import OncologyBackground from '../assets/backgrounds/medical-concept-cancer-abstract-background-3d-illustration-t-cells-cancer-cells_200694-399.webp';
import DenistryBackground from '../assets/backgrounds/concept-image-dental_43058-70.webp';
import NeurologyBackground from '../assets/backgrounds/Neurology.jpg';
import NephrologyBackground from '../assets/backgrounds/360_F_195435406_vMIYvw5DvHThnIURvIRotx2nPkkvMI18.jpg';

const Specializations = () => {
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
                  <Specialization specName="Cardiology" img={CardiologyBackground} />
                  <Specialization specName="Endocrinology and metabolic disorders" img={EndocrinologyBackground} />
                  <Specialization specName="Denistry" img={DenistryBackground} />
                  <Specialization specName="Nephrology" img={NephrologyBackground} />
                </div>
                <div className="right-side-specs">
                  <Specialization specName="Ear, nose, and throat" img={EarNoseThroatBackground} />
                  <Specialization specName="Oncology" img={OncologyBackground} />
                  <Specialization specName="Neurology" img={NeurologyBackground} />
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