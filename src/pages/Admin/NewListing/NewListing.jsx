import "./NewListing.css";
import {  useRef, useState} from "react"
import {  useNavigate} from "react-router-dom"
import {createListing } from "../../../services/listingsService"
import ImageUpload from "../../ImageUpload/ImageUpload";


const NewListing = () => {
  const [entryData, setEntryData] = useState('')
  const navigate = useNavigate();
  const titleRef = useRef()
  const descriptionRef = useRef()
  const priceRef = useRef()
  const availableRef = useRef()
  const maxDurationRef = useRef()
  const minDurationRef = useRef()
  const extrasRef = useRef()
  const photosRef = useRef()
 

  const handleSubmit = async (e) =>{
    e.preventDefault(e)
      try{
       
          await createListing (entryData)
            console.log('bando ikelti',entryData)
            alert('Record succesfully added')
          }catch(error){
            console.log(error)
          }
          
          console.log("returning"); 
          navigate('/admin/listings');
        }      


  const handleInputChange =  (e) => {
    e.preventDefault()
     let laikinasTitle =  titleRef.current.value 
     let laikinasDescription =  descriptionRef.current.value
     let laikinasPrice =  priceRef.current.value 
     let laikinasAvailable = availableRef.current.value 
     let laikinasMaxDur = maxDurationRef.current.value 
     let laikinasMinDur =  minDurationRef.current.value 
     let laikinasExtras =  extrasRef.current.value 
     let laikinasPhotos = photosRef.current.value
      let title = laikinasTitle
      let description = laikinasDescription
      let price = laikinasPrice
      let available = laikinasAvailable 
      let min_duration = laikinasMinDur
      let max_duration = laikinasMaxDur
      let extras = laikinasExtras 
      let photos = laikinasPhotos
      setEntryData({...entryData, title,description,price,available,min_duration,max_duration,extras,photos})}

  return (
    <div className="new-listing-container card">
      <h2 className="font-bold text-3xl mb-4">Add New Rental</h2>
      <form onSubmit={handleSubmit} className="new-listing-form gap-1">
     <input className="input-field" ref={titleRef} type="text" onChange={handleInputChange} placeholder="Title"  /> 
     <textarea className="input-field" ref={descriptionRef} type="text" onChange={handleInputChange} placeholder="Description" />
     <input  className="input-field" ref={priceRef} type="number" onChange={handleInputChange} placeholder="Price"  />
     <select  className="input-field" name="pets" id="pet-select" onChange={handleInputChange} ref={availableRef}>
      <option value="true">Available</option>
      <option value="false">Unavailable</option>
      </select>
      <input  placeholder="Photo URLs" className="input-field" ref={photosRef} type="text" onChange={handleInputChange} />
      <ImageUpload/>
     <input placeholder="Min Rental Duration" className="input-field" ref={minDurationRef} type="number" onChange={handleInputChange}  />
     <input  placeholder="Max Rental Duration"  className="input-field" ref={maxDurationRef} type="number" onChange={handleInputChange}  />
     <input  placeholder="Extras" className="input-field" ref={extrasRef} type="text" onChange={handleInputChange} />
      <button type="submit" className="btn btn-primary w-full">
          Add Listing
        </button>
      </form>
    </div>
  );
};



export default NewListing;
