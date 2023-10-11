import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/shared/Spinner";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/Modal/Modal";
import API from "../services/API";
import moment from 'moment';
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const [details, setDetails] = useState([]);
  const navigate = useNavigate()
  const getBloodRequest = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
     
      if (data?.success) {
        setDetails(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRequest();
  }, []);

  return (
    <Layout>
      {user?.role === 'admin' && navigate('/admin')}
      {error && <span>{toast.error(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="container">
          <h4
            className="ms-4"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            style={{ cursor: "pointer" }}
          >
            <i className="fa-solid fa-plus text-success py-4"></i>
            Add Inventory
          </h4>
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
              {details?.map((record) => (
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
          <Modal />
        </div>
      )}
    </Layout>
  );
};

export default HomePage;
