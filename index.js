// Handler = index.handler
// Runtime = Node.js 8.10
// Trigger = API gateway

const bwipjs = require('bwip-js');

class BarcodeRequestModel {
	constructor(payload) {
		this.text = payload.queryStringParameters.text;
		this.includetext = (payload.queryStringParameters.includeText === 'true') ? true : false;
		this.height = payload.queryStringParameters.height || 10;
		this.scale = payload.queryStringParameters.scale || 3;
		this.bcid = payload.queryStringParameters.bcid || 'code128';
		this.textxalign = 'center';
	}
}

class BarcodeResponseModel {
	constructor(response) {
    	this.statusCode = 200;
    	this.headers = {
    		"Content-Type": "image/png"
    	};
    	this.isBase64Encoded = true;
    	this.body = response.img;
	}
}

exports.handler = async(event) => {
	
	return new Promise((resolve, reject) => {
		bwipjs.toBuffer(new BarcodeRequestModel(event), function (err, png) {
			if (err) {
				reject(err);
			} else {
				resolve(new BarcodeResponseModel({img: png.toString('base64')}));
			}
		});
	})
};