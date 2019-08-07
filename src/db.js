import mongoose from 'mongoose';
/**
  *@description Function to connect to MongoDB
  *@param  {string} url
  *@returns {object} - new mongoDB connection
  */
const connectToDatabase = ({ url }) => {
  try {
    const defaultOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
    };
    return mongoose.createConnection(url, defaultOptions);
  } catch (error) {
    throw error;
  }
};
export default connectToDatabase;
