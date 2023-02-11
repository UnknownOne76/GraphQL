import { RekognitionClient } from "@aws-sdk/client-rekognition";
import { CognitoUserPool } from "amazon-cognito-identity-js";

let poolData = {
	UserPoolId: process.env.POOL_ID as string,
	ClientId: process.env.CLIENT_ID as string,
};

export const userPool = new CognitoUserPool(poolData);

export const client = new RekognitionClient({region: 'ap-northeast-2', credentials: {accessKeyId: process.env.AWS_ACCESS_KEY as string, secretAccessKey: process.env.AWS_SECRET_KEY as string}});