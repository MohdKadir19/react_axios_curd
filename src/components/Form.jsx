import React, { useEffect, useState } from "react";
import { addData, updatePostDataApi } from "../services/PostApi";

const Form = ({ data, setData, updateData, setUpdateData }) => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  //Update data
  useEffect(() => {
    updateData &&
      setFormData({
        title: updateData.title || "",
        body: updateData.body || "",
      });
  }, [updateData]);

  //update button
  const isEmpty = Object.keys(updateData).length === 0;

  // Handle input changes
  const handleInputChange = (e) => {
    //const name = e.target.name;
    //const value = e.target.value;
    //OR
    const { name, value } = e.target;
    setFormData((prev) => {
      console.log(prev);
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  //Add Data in list
  const addPostData = async () => {
    const res = await addData(formData);
    console.log(res);
    if (res.status === 201) {
      setData([...data, res.data]);
    }
    setFormData({
      title: "",
      body: "",
    });
  };
  //Update data in list
  const updatePostData = async () => {
    const res = await updatePostDataApi(updateData.id, formData);
    console.log(res);
    setData((prev) => {
      return prev.map((item) => (item.id === res.data.id ? res.data : item));
    });
    setFormData({
      title: "",
      body: "",
    });
    setUpdateData({});
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const submitter = event.nativeEvent.submitter; //If you have multiple submit buttons and want to know which one was clicked:

    if (submitter.value === "Add") {
      addPostData();
    } else if (submitter.value === "Update") {
      //alert(`Form submitted using: ${submitter.value}`);
      updatePostData();
    }
  };
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-6">
          <form
            onSubmit={handleSubmit}
            className="row form-box gx-3 align-items-center justify-content-center bg-white shadow-sm px-0 py-3"
          >
            <div className="col-auto">
              <label className="visually-hidden" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Add title"
              />
            </div>
            <div className="col-auto">
              <label className="visually-hidden" htmlFor="body">
                Body
              </label>
              <input
                type="text"
                className="form-control"
                id="body"
                name="body"
                value={formData.body}
                onChange={handleInputChange}
                placeholder="Add content"
              />
            </div>
            <div className="col-auto">
              <button
                type="submit"
                className="btn btn-primary"
                value={isEmpty ? "Add" : "Update"}
              >
                {isEmpty ? "Add" : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
