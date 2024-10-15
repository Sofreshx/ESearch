const isLocal = process.env.REACT_APP_ENV === 'local';
const isDev = process.env.NODE_ENV === 'development';
const config = {
    apiUrl: !isDev ? 
    process.env.API_URL_PROD : 
    isLocal ? process.env.API_URL_DEV_LOCAL : process.env.API_URL_DEV,
    
    endpoints : {
        companies : "companies"
    }
  };
  
export default config;

//REACT_APP_ENV=local npm start