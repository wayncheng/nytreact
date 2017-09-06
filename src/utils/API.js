import axios from "axios";

export default {
  getSaved: () => {
    return axios.get('http://localhost:5000/api/saved');
  },
  postSaved: (postData) => {
    // return axios.post('http://localhost:5000/api/saved', postData);
    return axios({
			method: 'post',
			url: 'http://localhost:5000/api/saved',
			data: postData,
		})
  },
  deleteSaved: () => {
    return axios.get('http://localhost:5000/api/saved');
  },
};