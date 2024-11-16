import Auth from '../utils/auth';

const retrieveUsers = async () => {  // async function that retrieves users
  try {
    const response = await fetch('/api/users', {  // fetch() is a function that retrieves data from a URL
      headers: {  // headers is an object that contains the headers of the request
        'Content-Type': 'application/json',  // 'Content-Type' is a header that specifies the media type of the resource
        Authorization: `Bearer ${Auth.getToken()}`  // 'Authorization' is a header that specifies the credentials for authenticating the client with the server
      }
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid user API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

export { retrieveUsers };
