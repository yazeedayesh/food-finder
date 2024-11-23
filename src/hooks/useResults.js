import { useEffect, useState } from "react";
import yelp from '../api/yelp';

export default () => {
    const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const searchApi = async (searchTerm) => {
    const API_KEY =
      'F5Sx11DwsfL1qKX0MnYaltnybXjab6APPZ2Ti7d4TRpljeMxTJeQ9uW8R_fqoBRvH_E1cHmCnH5ZpT-fb-DIkTxEgyz-1VTp4BFJojPhLAQlWTDWq9FQbDbulYM8Z3Yx';
    const url = `https://api.yelp.com/v3/businesses/search`;

    try {
      setIsLoading(true); // بدأ التحميل
      const response = await fetch(
        url + `?term=${searchTerm}&location=san+jose&limit=20`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error Details:', errorData);
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setResults(data.businesses);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again later.');
      console.error('Error fetching data from Yelp API:', error.message);
    } finally {
      setIsLoading(false); // إنهاء التحميل
    }
  };

  useEffect(() => {
    searchApi('pasta');
  }, []);
  
  return [isLoading, results, errorMessage];
};