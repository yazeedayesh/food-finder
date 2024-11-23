import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResulsList from '../components/ResultsList';

const SearchScreen = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const searchApi = async (searchTerm) => {
    const API_KEY =
      'F5Sx11DwsfL1qKX0MnYaltnybXjab6APPZ2Ti7d4TRpljeMxTJeQ9uW8R_fqoBRvH_E1cHmCnH5ZpT-fb-DIkTxEgyz-1VTp4BFJojPhLAQlWTDWq9FQbDbulYM8Z3Yx';
    const url = `https://api.yelp.com/v3/businesses/search`;

    try {
      setIsLoading(true); // 
      const response = await fetch(
        url + `?term=${searchTerm}&location=san+jose&limit=50`,
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
      setIsLoading(false);
    }
  };
  
  const filterResultsByPrice = (price) => {
    // price === '$' || '$$' || '$$$'
    return results.filter(result => {
      return result.price === price;
    });
  }

  useEffect(() => {
    searchApi('pasta');
  }, [])

  return (
    <>
      <SearchBar term={term} onTermChange={setTerm} onTermSubmit={() => searchApi(term)} />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      {isLoading && <Text style={styles.loading}>جاري التحميل...</Text>}
      <ScrollView>
            <ResulsList
             results={filterResultsByPrice('$')} 
             tittle="Cost Effective" 
            />
            <ResulsList
             results={filterResultsByPrice('$$')}
              tittle="Bit Pricier"
            />
            <ResulsList
             results={filterResultsByPrice('$$$')}
              tittle="Big Spender"
            />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    flex: 1,
    padding: 10,
  },
  error: {
    color: 'red',
    marginVertical: 10,
    fontSize: 16,
  },
  loading: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginVertical: 10,
  },
  resultText: {
    fontSize: 18,
    marginVertical: 10,
  },
  resultItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SearchScreen;