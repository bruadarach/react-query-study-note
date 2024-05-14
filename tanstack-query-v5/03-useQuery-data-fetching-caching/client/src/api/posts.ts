import axios from "axios";

export function getPosts() {
  return axios
    .get("http://localhost:3000/posts", { params: { _sort: "title" } })
    .then((res) => res.data);
}

export function getPost(id: number) {
  return axios.get(`http://localhost:3000/posts/${id}`).then((res) => res.data);
}
