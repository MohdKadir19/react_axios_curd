import React, { useEffect, useState } from "react";
import { deleteData, getData } from "../services/PostApi";
import { BsGear } from "react-icons/bs";
import Form from "./Form";
const Posts = () => {
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState({});
  const getPostData = async () => {
    const response = await getData();
    //console.log(response.data);
    setData(response.data);
  };
  useEffect(() => {
    getPostData();
  }, []);

  // Function to delete an item
  const handleDeletePost = async (id) => {
    // console.log(id);
    try {
      const res = await deleteData(id);
      //console.log(res);
      if (res.status === 200) {
        const updatedItems = data.filter((item) => item.id !== id);
        setData(updatedItems);
      } else {
        console.log("Failed", res.status);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  // Function to update an item
  const updateItem = (item) => {
    console.log(item);
    setUpdateData(item);
  };
  return (
    <>
      <section className="advertisers-service-sec pt-5 pb-5">
        <div className="container">
          <div className="row mb-3">
            <div className="section-header text-center">
              <h2 className="fw-bold fs-1">
                Our
                <span className="b-class-secondary">Advertiser </span>Services
              </h2>
              <p className="sec-icon">
                <BsGear className="h5" />
              </p>
            </div>
          </div>
          {/* Form components */}
          <Form
            data={data}
            setData={setData}
            updateData={updateData}
            setUpdateData={setUpdateData}
          />

          <div className="row mt-5 mt-md-4 row-cols-1 row-cols-sm-1 row-cols-md-3 justify-content-center">
            {data.map((item) => (
              <div className="col" key={item.id}>
                <div className="service-card">
                  <small className="count">{item.id}</small>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={() => updateItem(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDeletePost(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Posts;
