import { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import axios from 'axios';
import Button from '../../../components/ui/Button';
const Users = () => {
    const [content, setContent] = useState ([])
 
    useEffect(() => {
            
      const getEntries = async () => {
        try {
          const response = await axios.get(
            'http://localhost:3000/api/users/'
          )
          setContent(response.data)
        //   console.log(response.data)
         
        } catch(error) {
          console.error('Error Fetching Entries', error)
        }
          }
          getEntries() },[content])
          return (
    

            <div>
          
           <div className="App">
              <div className="home-content">
                {content.length > 0 &&
                  content.map((info) => (
                    <div key={info._id} className='recordInfo'>
                      
                        <p> <strong>Username:</strong> {info.username}</p>
                        <p><strong>Email:</strong> {info.email}</p>
                        <Link to={`${info._id}`}> <Button>Details</Button></Link> 

                    </div>
                  ))
                }
              </div>

            </div>
             
            </div>
          )
        }

export default Users
