require('dotenv').config();

const axios = require('axios');
const qs = require('qs');

module.exports = {
	async getAccessToken(req, res) {
		try {
			const { code } = req.body;

			if (!code) return res.status(400).send({ message: 'Authorization Code cannot be empty!' });

			const response = await axios({
				method: 'post',
				url: 'https://www.linkedin.com/oauth/v2/accessToken',
				data: qs.stringify({
					grant_type: 'authorization_code',
					code: req.body.code,
					client_id: process.env.LINKEDIN_CLIENT_ID,
					redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
					client_secret: process.env.LINKEDIN_CLIENT_SECRET
				}),
				headers: {
					'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
				}
			});

			return res.status(200).json({ access_token: response.data.access_token });
		} catch (err) {
			console.log(err);
			return res.status(400).json(err.response.data);
		}
	},
};