import React from 'react'
import {Helmet} from 'react-helmet';

const Meta = () => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <meta name='viewport' content='content="width=device-width, initial-scale=1"' />
      <meta name="description" content="Consult a doctor homepage. About, features, and sign-up" />
      <title>Consult a doctor - Homepage</title>
    </Helmet>
  )
}

export default Meta