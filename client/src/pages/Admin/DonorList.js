import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import moment from 'moment';
import API from '../../services/API';
import { toast } from 'react-toastify';

const DonorList = () => {
  const [data, setData] = useState([]);

 
  //find donor records
  const getDonorData = async() =>{
      try {
          const {data} = await API.get('/admin/donor-list');
          console.log("data:",data)
          if(data?.success){
              setData(data?.donorData)
          }
      } catch (error) {
          console.log(error)
      }
     
  }
  useEffect(()=>{
    getDonorData();
},[]);

const handleDelete = async(id) =>{
      try {
        let ans = window.prompt("Are you sure want to delete this donor",'sure')
        if(!ans) return

        const {data} = await API.delete(`/admin/delete-donor/${id}`)
        toast.success(data?.message)
        window.location.reload();
      } catch (error) {
        console.log(error)
      }
}


return (
  <Layout>
      <table className="table table-striped text-center">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody >
            {data?.map((record) => (
              <tr key={record._id}>
                <td>{record.name || record.organizationName + "(ORG)"}</td>
                <td>{record.email}</td>
                <td>{record.phone}</td>
                <td>{moment(record.createdAt).format("DD/MM/YYYY")}</td>
                <td><button className='btn btn-danger' onClick={()=> handleDelete(record._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
    </Layout>
  )
}

export default DonorList