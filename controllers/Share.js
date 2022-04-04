require('dotenv').config();

const axios = require('axios');

module.exports = {
	async create(req, res) {
		try {
			const { accessToken, message, userUrn, visibility } = req.body;

			if (!accessToken) return res.status(400).send({ message: 'Access Token cannot be empty!' });
			if (!message) return res.status(400).send({ message: 'Message cannot be empty!' });
			if (!userUrn) return res.status(400).send({ message: 'User URN cannot be empty!' });

			const response = await axios.post('https://api.linkedin.com/v2/ugcPosts',
				{
					author: userUrn,
					lifecycleState: 'PUBLISHED',
					specificContent: {
						'com.linkedin.ugc.ShareContent': {
							shareCommentary: {
								text: message,
							},
							shareMediaCategory: 'NONE'
						}
					},
					visibility: {
						'com.linkedin.ugc.MemberNetworkVisibility': visibility ? visibility : 'PUBLIC'
					} 
				}, {
					headers: {
						'content-type': 'application/json',
						Authorization: `Bearer ${accessToken}`
					},         
				});

			return res.sendStatus(200).json(response.data);
		} catch (err) {
			return res.status(400).json(err.response.data);
		}
	},
};