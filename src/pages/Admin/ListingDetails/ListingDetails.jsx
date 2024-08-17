import { useEffect, useRef, useState } from "react"
import { useParams, useNavigate} from "react-router-dom"
import axios from 'axios';
import Button from '../../../components/ui/Button'

const ListingDetails = () => {
    const {id} = useParams()
    const [entry, setEntry] = useState ([])
    const [show,setShow] = useState(false) //editinimo slepimui
    const [editData, setEditData] = useState('')

    const navigate = useNavigate();
    const titleRef = useRef()
    const descriptionRef = useRef()
    const priceRef = useRef()
    const availableRef = useRef()
    const maxDurationRef = useRef()
    const minDurationRef = useRef()
    const extrasRef = useRef()
    const photosRef = useRef()
    
  

    useEffect(() => {
    const getEntries = async () => {
          try {
            const response = await axios.get(
              `http://localhost:3000/api/listings/${id}`
            )
          
            setEntry(response.data)
           
          } catch(error) {
            console.error('Error Fetching Entry', error)
          }
            }
            getEntries() },[entry])

            // kad nesikabunciau prie sito delete :(
    const handleDelete = async (e) =>{
      e.preventDefault(e)
        try{
            await axios.delete(`http://localhost:3000/api/listings/${id}`)
              console.log('bando pasalinti',id)
              alert('Record succesfully deleted!')
            }catch(error){
              console.log(error)
            }
            
            console.log("returning"); 
            navigate('/admin/listings');
          }      

const handleUpdate = async (e) => {
  e.preventDefault()
  console.log('cia paprasta', editData)
  try{
      console.log(editData)
    await axios.patch(`http://localhost:3000/api/listings/${id}`,editData)
      console.log('bando atnaujinti',id)
      alert('Record succesfully updated!')
    }catch(error){
      console.log(error)
    }
    
    console.log("returning"); 
    navigate(`/admin/listings`);
    setShow(false)
}   

const handleInputChange =  (e) => {
  // e.preventDefault()
   let laikinasTitle =  titleRef.current.value 
   let laikinasDescription =  descriptionRef.current.value
   let laikinasPrice =  priceRef.current.value 
   let laikinasAvailable = availableRef.current.value 
   let laikinasMaxDur = maxDurationRef.current.value 
   let laikinasMinDur =  minDurationRef.current.value 
   let laikinasExtras =  extrasRef.current.value 
    let laikinasPhotos = photosRef.current.value
    let photos = laikinasPhotos
    let title = laikinasTitle.length > 0 && laikinasTitle != entry.title ? laikinasTitle : entry.title
    let description = laikinasDescription.length > 0 && laikinasDescription != entry.description ? laikinasDescription 
    : entry.description
    let price = laikinasPrice.length > 0 && laikinasPrice !=entry.price ? laikinasPrice : entry.price
    let available = laikinasAvailable != entry.available ? laikinasAvailable : entry.available
    let min_duration = laikinasMinDur > 0 && laikinasMinDur < entry.max_duration && laikinasMinDur != entry.min_duration ? laikinasMinDur : entry.min_duration
    let max_duration = laikinasMaxDur > 0 && laikinasMaxDur > entry.min_duration &&  laikinasMaxDur !=entry.max_duration ? laikinasMaxDur : entry.max_duration
    let extras = laikinasExtras != entry.extras && laikinasExtras.length > 0 ? laikinasExtras : entry.extras
    setEditData({...editData, title,description,price,available,min_duration,max_duration,extras,photos})

    }
 return (
    <div>
  <div className="new-listing-container card">
    <div className="entry">
    <h2>{entry.title}</h2>
              <p>Description: {entry.description}</p>
              <p>Photo: (kolkas array) {entry.photos}</p>
              <p>Price: {entry.price}</p>
              <p>Availabilty : {entry.available == true ? 'Currently available' : 'Unavailable'}</p>
              <p>Min_duration: {entry.min_duration}</p>
              <p>Max_duration: {entry.max_duration}</p>
              <p>Extras included: {entry.extras}</p>
              <h2>Created:{entry.createdAt}</h2>
              <h2>Updated:{entry.updatedAt}</h2>
             

      <div className="entry-controls">
      <Button onClick={() => setShow(true)}>Edit</Button>
      <Button color="secondary" onClick={handleDelete}>Delete</Button>
      {show == true &&
    <form className="new-listing-form"  onSubmit={handleUpdate} >
     <h2>Change information:</h2>
     <label>Change title:</label>
     <input className="input-field" ref={titleRef} type="text" onChange={handleInputChange}  placeholder={entry.title} /> 
     <label>Change description:</label>
     <textarea   className="input-field" ref={descriptionRef} type="text" onChange={handleInputChange} placeholder={entry.description} />
     <label>Change Photos:</label>
     <input className="input-field" ref={photosRef} type="text" onChange={handleInputChange}  placeholder={entry.photos} /> 
     <label>Change price:</label>
     <input className="input-field" ref={priceRef} type="number" onChange={handleInputChange} placeholder={entry.price} />
     <label>Change available:</label>
     <select className="input-field" name="availability"  onChange={handleInputChange} ref={availableRef}>
      <option value="true">Available</option>
      <option value="false">Unavailable</option>
      </select>
  
     <label>Min duration: </label>
     <input className="input-field" ref={minDurationRef} type="number" onChange={handleInputChange} placeholder={entry.min_duration} />
     <label>Max duration: </label>
     <input className="input-field" ref={maxDurationRef} type="number" onChange={handleInputChange} placeholder={entry.max_duration} />
     <label>Add extras:</label>
     <input className="input-field" ref={extrasRef} type="text" onChange={handleInputChange} placeholder={entry.extras} />
     

     <div className="edit-controls">
     <Button type="submit">Submit </Button>
     <Button color="secondary" onClick={() => setShow(false)} style={{backgroundColor:"darkRed"}}>Close</Button>
     </div>
     </form>
    }
      </div>
     
  
     
    </div>

    </div>
    </div>
  )
}

export default ListingDetails
