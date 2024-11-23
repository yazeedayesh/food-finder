  //If you want to use AXIOS this will help you 
import axios from 'axios';

  const yelp = axios.create({
      baseURL: 'https://api.yelp.com/v3/businesses',
      headers: {
          Authorization: 'Bearer F5Sx11DwsfL1qKX0MnYaltnybXjab6APPZ2Ti7d4TRpljeMxTJeQ9uW8R_fqoBRvH_E1cHmCnH5ZpT-fb-DIkTxEgyz-1VTp4BFJojPhLAQlWTDWq9FQbDbulYM8Z3Yx'
      }
  });
  
export default yelp;
  
  