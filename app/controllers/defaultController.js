const User = require('../models/User');
const path = require('path');

module.exports = class DefaultController {
	constructor(){}

	async index(){
		this.res.sendFile( path.join(process.cwd(), '/pages/home.html'));
	}

}