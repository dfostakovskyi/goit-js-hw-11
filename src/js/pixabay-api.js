const API_KEY = '46850539-7e4ca2d811908faae801b6294';
const baseURL = "https://pixabay.com/api/";

export function fetchData(userInput, page = 1, per_page = 200) { 
  const params = new URLSearchParams({
    key: API_KEY,
    q: userInput,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page,
    per_page
  });

  const url = `${baseURL}?${params.toString()}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
}

