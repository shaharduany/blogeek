import config from 'config';
import { MongoClient } from 'mongodb';

const dbURI = config.get('mongoURI');

async function getClient(){
    const client = await MongoClient.connect(dbURI);
    return client;
}

export default getClient;