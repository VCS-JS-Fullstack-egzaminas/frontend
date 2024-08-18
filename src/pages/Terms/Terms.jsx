import React from 'react'
import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import "./Terms.css";


const Terms = () => {
  return (
    <div>
      <Navbar />
        <div className="termsBox">
            <h2>
1. Introduction
Welcome to VCS Rentals. These Terms and Conditions govern your use of our car rental services. By renting a vehicle from us, you agree to comply with and be bound by these terms.

</h2>
<h2>
2. Rental Agreement
2.1 Eligibility: 
Renters must be at least 21 years old and possess a valid driver's license. Additional age restrictions may apply for certain vehicle categories.
</h2>
<h2>
2.2 Rental Period:
 The rental period is specified in the rental agreement. Late returns may incur additional charges.
 </h2>
 <h2>
2.3 Vehicle Condition:
The vehicle must be returned in the same condition as it was rented, excluding normal wear and tear. Any damage or excessive dirtiness may result in additional charges.

</h2>
<h2>
3. Payment
3.1 Rates: Rental rates are determined by the type of vehicle, rental period, and any additional services selected. Rates are subject to change without notice.

3.2 Payment Method: Payment must be made using a valid credit card. A security deposit may be required at the time of rental.

3.3 Additional Charges: Additional charges may apply for late returns, fuel, tolls, parking violations, and other fees as specified in the rental agreement.
</h2>
<h2>

4. Insurance and Liability
4.1 Insurance Coverage: Basic insurance coverage is included in the rental rate. Additional insurance options are available for purchase.

4.2 Accidents and Damage: In the event of an accident or damage to the vehicle, the renter must notify VCS Rentals immediately and follow the procedures outlined in the rental agreement.

4.3 Liability: The renter is responsible for any damage to the vehicle, loss of use, and any third-party claims arising from the use of the vehicle, except as covered by insurance.

</h2>
<h2>
5. Use of Vehicle
5.1 Authorized Drivers: Only the renter and any additional drivers listed in the rental agreement are authorized to drive the vehicle.

5.2 Prohibited Uses: The vehicle may not be used for illegal activities, off-road driving, towing, or any other activities that may cause damage to the vehicle.

5.3 Mileage Limitations: The rental agreement may specify mileage limitations. Excess mileage may incur additional charges.

</h2>
<h2>
6. Cancellation and Refunds
6.1 Cancellation Policy: Cancellations must be made at least 24 hours before the scheduled rental time to avoid a cancellation fee.

6.2 Refunds: Refunds for early returns are not guaranteed and are subject to the terms of the rental agreement.
</h2>
<h2>
7. Privacy Policy
7.1 Data Collection: We collect personal information necessary for the rental process. This information is used in accordance with our Privacy Policy.

7.2 Data Security: We take reasonable measures to protect your personal information from unauthorized access or disclosure.
</h2>
<h2>
8. Governing Law
These Terms and Conditions are governed by and construed in accordance with the laws of the jurisdiction in which VCS Rentals operates.
</h2>
<h2>
9. Amendments
VCS Rentals reserves the right to amend these Terms and Conditions at any time. Any changes will be effective immediately upon posting on our website.</h2>
        </div>

      <Footer />
    </div>
  )
}

export default Terms
