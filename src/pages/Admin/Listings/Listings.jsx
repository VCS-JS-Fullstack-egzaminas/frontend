import { useEffect, useState } from 'react'
import Button from '../../../components/ui/Button'
import { Link} from 'react-router-dom'
import {getAllListings } from "../../../services/listingsService"

const Listings = () => {
    const [listings, setListings] = useState ([])
 
    useEffect(() => {
            
      const getEntries = async () => {
        try {
          const response = await getAllListings()
          setListings(response.data)
         
        } catch(error) {
          console.error('Error Fetching Entries', error)
        }
          }
          getEntries() },[listings])
  return (
    

    <div>
 
   <div className="App">
      <div className="new-listing-container card">
       <Link to='/admin/new-listing'> <Button style={{backgroundColor :"darkGray"}}>+ New Listing</Button> </Link>
        {listings.length > 0 &&
          listings.map((info) => (
            <div key={info._id} className='listingInfo'>
              <h2><strong>{info.title}</strong></h2>
              <p>Description: {info.description}</p>
              <p>Photo: (kolkas array) {info.photos}</p>
              <p>Price: {info.price}</p>
              <p>Availabilty : {info.available == true ? 'Currently available' : 'Unavailable'}</p>
            <Link to={`${info._id}`}> <Button>Details</Button></Link> 
            </div>
          ))
        }
      </div>
    </div>
  
    </div>
  )
}

export default Listings