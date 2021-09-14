import PropTypes from "prop-types";
import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "22710862-ad31ee603fc8e39b27d5b9240";

function reducingResponseKeys(data) {
  const newArrayImages = data.hits.map((el) => ({
    id: el.id,
    webformatURL: el.webformatURL,
    largeImageURL: el.largeImageURL,
  }));
  return newArrayImages;
}

export default async function FetchApi(data) {
  const { searchName, page } = data;

  try {
    const searchParam = `${searchName}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`;
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${searchParam}`
    );

    return reducingResponseKeys(response.data);
  } catch (error) {
    console.log(error.message);
  }
}

FetchApi.PropTypes = {
  data: PropTypes.object.isRequired,
};
