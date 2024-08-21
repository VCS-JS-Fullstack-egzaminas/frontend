import React from 'react'
import { Helmet } from "react-helmet";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (

    
    <div>
<Helmet>
    <title>Privacy</title>
  </Helmet>
  <div className="termsBoxas">
      <h2 className="mb-4 font-semibold text-xl">7. Privacy Policy</h2>
        <div className="pl-6">
          <h3 className="mb-2 font-semibold text-lg">7.1 Data Collection</h3>
          <p className="mb-4 pl-8">
            We collect personal information necessary for the rental process.
            This information is used in accordance with our Privacy Policy.
          </p>
        </div>
        <div className="pl-6">
          <h3 className="mb-2 font-semibold text-lg">7.2 Data Security</h3>
          <p className="mb-8 pl-8">
            We take reasonable measures to protect your personal information
            from unauthorized access or disclosure.
          </p>
        </div>
        <h2 className="mb-2 font-semibold text-xl">8. Governing Law</h2>
        <p className="mb-8 pl-6">
          These Terms and Conditions are governed by and construed in accordance
          with the laws of the jurisdiction in which VCS Rentals operates.
        </p>
        <h2 className="mb-2 font-semibold text-xl">9. Amendments</h2>
        <p className="mb-4 pl-6">
          VCS Rentals reserves the right to amend these Terms and Conditions at
          any time. Any changes will be effective immediately upon posting on
          our website.
        </p>
    </div>
    </div> 
  )
}

export default PrivacyPolicy
