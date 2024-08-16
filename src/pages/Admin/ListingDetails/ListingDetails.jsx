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
  e.preventDefault()
   let laikinasTitle = titleRef.current.value 
   let laikinasDescription =  descriptionRef.current.value 
   let laikinasPrice =  priceRef.current.value 
   let laikinasAvailable = availableRef.current.value 
   let laikinasMaxDur = maxDurationRef.current.value 
   let laikinasMinDur =  minDurationRef.current.value 
   let laikinasExtras =  extrasRef.current.value 
 
  // if (laikinasTitle.length > 3  ) {
  //     setEditData({...editData, title: laikinasTitle })
  //   } 
  // if (laikinasDescription > 3) {
  //   setEditData({...editData,description: laikinasDescription})
  // }


}
 return (
    <div>
  <div className="entry-details">
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
    <form  className='add-form' onSubmit={handleUpdate} >
     <h2>Change information:</h2>
     <label>Change title:</label>
     <input ref={titleRef} type="text" onChange={handleInputChange}  placeholder={entry.title} /> 
     <label>Change description:</label>
     <input ref={descriptionRef} type="text" onChange={handleInputChange} placeholder={entry.description} />
     <label>Change price:</label>
     <input ref={priceRef} type="number" onChange={handleInputChange} placeholder={entry.price} />
     <label>Change available:</label>
     <select name="pets" id="pet-select" onChange={handleInputChange} ref={availableRef}>
      <option value="true">Available</option>
      <option value="false">Unavailable</option>
      </select>
  
     <label>Min duration: </label>
     <input ref={minDurationRef} type="number" onChange={handleInputChange} placeholder={entry.min_duration} />
     <label>Max duration: </label>
     <input ref={maxDurationRef} type="number" onChange={handleInputChange} placeholder={entry.max_duration} />
     <label>Add extras:</label>
     <input ref={extrasRef} type="number" onChange={handleInputChange} placeholder={entry.extras} />
     

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
