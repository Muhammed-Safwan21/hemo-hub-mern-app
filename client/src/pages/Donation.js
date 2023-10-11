import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { useSelector } from 'react-redux';
import Layout from '../components/shared/Layout/Layout';
import API from '../services/API';

const Donation = () => {

    const [data, setData] = useState([]);
    const {user} = useSelector(state=>state.auth)
    //find donor records
    const getDonation = async() =>{
    try {
        const {data} = await API.post('/inventory/get-inventory-hospital',{
            filters:{
                inventoryType:'in',
                donor:user?._id,
            }
        });
        // console.log("data:",data)
        if(data?.success){
            setData(data?.inventory)
        }
    } catch (error) {
        console.log(error)
    }
   
    }
useEffect(()=>{
  getDonation();
},[]);


return (
<Layout>
    <div className='container mt-4'>
    <table className="table table-striped text-center">
        <thead>
          <tr>
            <th scope="col">Blood Group</th>
            <th scope="col">Inventory Type</th>
            <th scope="col">Qty</th>
            <th scope="col">Email</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody >
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record.bloodGroup}</td>
              <td>{record.inventoryType}</td>
              <td>{record.quantity}</td>
              <td>{record.email}</td>
              <td>{moment(record.createdAt).format("DD/MM/YYYY")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </Layout>
  )
}

export default Donation