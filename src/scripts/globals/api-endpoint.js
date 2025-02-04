import CONFIG from './config';

const API_ENDPOINT = {
  LIST: `${CONFIG.BASE_URL}/list`,
  DETAIL: (id) => `${CONFIG.BASE_URL}/detail/${id}`,
  SEARCH_RESTAURANT: (query) => `${CONFIG.BASE_URL}/search?q=${query}`,
  ADD_REVIEW: `${CONFIG.BASE_URL}/review`,
  RESTAURANT_IMAGE_SMALL: (pictureId) => `${CONFIG.BASE_URL}/images/small/${pictureId}`,
  RESTAURANT_IMAGE_MEDIUM: (pictureId) => `${CONFIG.BASE_URL}/images/medium/${pictureId}`,
  RESTAURANT_IMAGE_LARGE: (pictureId) => `${CONFIG.BASE_URL}/images/large/${pictureId}`,
};

export default API_ENDPOINT;
