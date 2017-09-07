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
  deleteSaved: (id) => {
		console.log('>>> API delete');
		return axios({
			method: 'delete',
			url: 'http://localhost:5000/api/saved',
			data: {
				_id: id
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			// 	'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
			}
		})
  },
};