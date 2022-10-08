// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    let status;
    let body = {}
    try {
        let info = JSON.parse(event.body)
        let a1 = parseInt(info.arg1)
        let a2 = parseInt(info.arg2)
        
        if (isNaN(a1) || isNaN(a2)) {
            status = 400
            body['error'] = 'non-numeric input.'
        } else {
            status = 200
            body['result'] = (a1 + a2).toString()
        }
    } catch (err) {
        status = 400
        body['error'] = err.toString()
    }
    
    response = {
        'statusCode': status,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Methods" : "POST"
        },
        'body': JSON.stringify(body)
    }
    return response
};
