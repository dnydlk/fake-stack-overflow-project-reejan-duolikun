// Add configuration setting for your server to this file
// uncomment for MONGO_URL for docker
// const MONGO_URL = "mongodb://mongodb:27017/fake_so";
// config for local testing, that is, without docker.
const MONGO_URL = "mongodb://mongodb:27017/fake_so";
const CLIENT_URL = "http://localhost:3000";
const port = 8000;
const JWT_SECRET = "RANDOM-TOKEN";

module.exports = {
    MONGO_URL,
    CLIENT_URL,
    port,
    JWT_SECRET,
};
