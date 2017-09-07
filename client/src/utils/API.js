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
  deleteSaved: (id,title) => {
		console.log('>>> API delete');
		let identifier;
		if (!id) {
			identifier = {
				title: title
			}
		}
		else {
			identifier = {
				_id: id
			}
		}
		return axios({
			method: 'delete',
			url: 'http://localhost:5000/api/saved',
			data: identifier,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			// 	'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
			}
		})
  },
};