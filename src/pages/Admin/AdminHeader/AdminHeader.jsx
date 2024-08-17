import {  Link} from "react-router-dom"


const AdminHeader = () => {
  return (
    <div>
     <Link to='/admin/listings'> Listings </Link>
     <Link to='/admin/new-listing'> New Listing</Link>
    </div>
  )
}

export default AdminHeader
