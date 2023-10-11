import React, { useEffect, useState } from 'react'
import Header from '../../components/shared/Layout/Header'
import API from '../../services/API'
import moment from 'moment';

const Analytics = () => {
    const [data, setData] = useState([])
    const [inventoryData, setInventoryData] = useState([])
    const colors = ['#ECEE81','#8DDFCB','#82A0D8','#EDB7ED','#FF8080','#B4B4B3','#26577C','#E55604']
    //get blood group data

    const getBloodGoupData = async() =>{
        try {
            const {data} = await API.get('/analytics/bloodGroups-data')
            // console.log(data)
            if(data?.success){
                setData(data?.bloodGroupData)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getBloodGoupData()
    },[])
    const getBloodRequest = async () => {
        try {
          const { data } = await API.get("/inventory/get-recent-inventory");
         
          if (data?.success) {
            setInventoryData(data?.inventory);
          }
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getBloodRequest();
      }, []);
  return (
    <>
      <Header />
      <div className="d-flex flex-row flex-wrap">
        {data?.map((record,i) => (
          <div className="card m-2 p-1" key={i} style={{ width: "18rem",backgroundColor:`${colors[i]}` }}>
            <div className="card-body">
              <h1 className="card-title bg-light text-dark text-center mb-3">{record.bloodGroup}</h1>
              <p className="card-text">
                Total In: <b>{record.totalIn} (ml)</b>
              </p>
              <p className="card-text">
                Total Out: <b>{record.totalOut} (ml)</b>
              </p>
              
            </div>
            <div className='card-footer text-light bg-dark text-center'>
                Total Available : <b>{record.availableBlood} (ml)</b>
            </div>
        
          </div>
        ))}
      </div>
      <div className='container'>
        <h2 className='text-center m-4'>Recent Blood Transactions</h2>
        <table className="table table-striped text-center">
            <thead>
              <tr>
                <th scope="col">Blood Group</th>
                <th scope="col">Inventory Type</th>
                <th scope="col">Quantity</th>
                <th scope="col">Email</th>
                <th scope="col">Time & Date</th>
              </tr>
            </thead>
            <tbody >
              {inventoryData?.map((record) => (
                <tr key={record._id}>
                  <td>{record.bloodGroup}</td>
                  <td>{record.inventoryType}</td>
                  <td>{record.quantity} ML</td>
                  <td>{record.email}</td>
                  <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </>
  );
}

export default Analytics