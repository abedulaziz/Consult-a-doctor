import React from "react";

import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import axios from "axios";
import Loader from "../helper-components/loader";

// layout components
import Header from "../layout-components/header";
import Footer from "../layout-components/footer";
import Specialization from "../layout-components/specialization";

const Specializations = () => {
  const [specializations, setSpecializations] = React.useState(null);

  const [loader, setLoader] = React.useState(<Loader />);
  const navigate = useNavigate();

  React.useEffect(() => {
    try {
      const getSpecializations = async () => {
        const specRqust = await axios.get("/specializations");

        console.log(specRqust);
        setSpecializations(specRqust.data.specializations);
        setLoader(null)
      };
      getSpecializations();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
    {loader}
      <Header />
      <main>
        <div className="specs">
          <div className="container">
            <div className="spec_content">
              <div className="heading">
                <h2>{t("lang.specializations.header")} </h2>
                <p>{t("lang.specializations.desc")}</p>
              </div>

              <div className="specs-container">
                <div className="left-side-specs">
                  {specializations &&
                    specializations.map((spec, index) => {
                      if (index % 2 === 0) {
                        return <Specialization onClick={() => navigate(`/doctor/${spec.id}/accounts`)} key={spec.id} specName={spec.name} img={spec.background_image} />;
                      }
                    })}
                </div>
                <div className="right-side-specs">
                  {specializations &&
                    specializations.map((spec, index) => {
                      if (index % 2 !== 0) {
                        return <Specialization onClick={() => navigate(`/doctor/${spec.id}/accounts`)} key={spec.id} specName={spec.name} img={spec.background_image} />;
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
  );
};

export default Specializations;
