import axios from "axios";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default {
  getSaved: () => {
    return axios.get('http://localhost:5000/api/saved');
  },
  postSaved: (postData) => {
		console.log('API postSaved()');
		// return axios.post('http://localhost:5000/api/saved', postData);
		
		// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    return axios({
			method: 'post',
			url: 'http://localhost:5000/api/saved',
			data: postData,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
  },
  deleteSaved: () => {
    return axios.get('http://localhost:5000/api/saved');
  },
};