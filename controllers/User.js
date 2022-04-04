require('dotenv').config();

const axios = require('axios');

module.exports = {
	async getUserInfo(req, res) {
		try {
			const { accessToken } = req.query;
			console.log(accessToken);
			if (!accessToken) return res.status(400).send({ message: 'Access Token cannot be empty!' });

			const response = await axios.get('https://api.linkedin.com/v2/me', {
				headers: { Authorization: `Bearer ${accessToken}` }
			});

			const userInfo = {
				urn: 'urn:li:person:' + response.data.id,
				firstName: response.data.localizedFirstName,
				lastName: response.data.localizedLastName,
			};

			return res.status(200).json(userInfo);
		} catch (err) {
			console.log(err);
			return res.status(400).json(err.response.data);
		}
	},
};