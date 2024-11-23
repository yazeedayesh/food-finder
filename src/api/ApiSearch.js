const ApiSearch = async (url, options = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer YOUR_API_KEY`,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error('Error Details:', errorDetails);
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Fetch Error:', error.message);
    throw error;
  }
};

export default ApiSearch;
