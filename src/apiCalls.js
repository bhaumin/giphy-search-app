const apiUrl = "https://api.giphy.com/v1/gifs/search";
const apiKey = "RQ5v71Fx8sK9tnaX8fhkl78q84MYzmXt";

export default {
  async searchGifs(searchTerm, limit, offset) {
    try {
      let apiUrlWithQueryParams = `${apiUrl}?api_key=${apiKey}&q=${searchTerm}`;
      if (limit) {
        apiUrlWithQueryParams += `&limit=${limit}`;
      }
      if (offset) {
        apiUrlWithQueryParams += `&offset=${offset}`;
      }

      const response = await fetch(apiUrlWithQueryParams);
      const responseJSON = await response.json();
      return responseJSON;
    } catch(err) {
      console.error(err);
    }
  }
};

