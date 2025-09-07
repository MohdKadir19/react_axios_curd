import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

//get method
export const getData = () => {
  return api.get("/posts");
};

//delete method
export const deleteData = (id) => {
  return api.delete(`/posts/${id}`);
};

//post method
export const addData = (post) => {
  return api.post("/posts", post);
};

//update method
export const updatePostDataApi = (id, post) => {
  return api.put(`/posts/${id}`, post);
};
