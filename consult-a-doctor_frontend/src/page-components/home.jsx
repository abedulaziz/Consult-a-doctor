import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'

import CheckTwoSqure from '../assets/icons/CheckTwoSquare.svg';

// helper components
import Meta from '../helper-components/meta';

// layout components
import Header from '../layout-components/header';

const Home = () => {
  return (
    <div>
      <Meta />

      <Header />

      <div className="hero">
        <div className="container">
          <div className="hero-content">

            <div className="heading">
              <h1>Reach our doctors <span className='theme-colored'>now!</span></h1>
              <p>Join our community and book a meeting with one of our doctors and discuss your issue.</p>
            </div>

            <ul className="hero_features">
              <li><img src={CheckTwoSqure} /><p>Secret and safe consultants</p></li>
              <li><img src={CheckTwoSqure} /><p>Experienced doctors</p></li>
              <li><img src={CheckTwoSqure} /><p>Low cost meetings</p></li>
            </ul>

          </div>
        </div>
      </div>

      <div className="hero-overlay"></div>
    </div>
  )
}

export default Home