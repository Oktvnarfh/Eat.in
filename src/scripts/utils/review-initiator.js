import RestaurantSource from '../data/restaurant-source';
import { createReviewTemplate } from '../views/templates/template-creator';

const ReviewInitiator = {
  async init({ form, container }) {
    this._form = form;
    this._container = container;
    this._addSubmitEventListener();
  },

  _addSubmitEventListener() {
    this._form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const reviewData = this._getReviewDataFromForm();
      try {
        const response = await RestaurantSource.addReview(reviewData);
        if (response.error) {
          throw new Error(response.message);
        } else {
          this._clearForm();
          this._addNewReviewToView(reviewData);
        }
      } catch (error) {
        console.error('Error adding review:', error);
        this._showErrorMessage(error.message);
      }
    });
  },

  _getReviewDataFromForm() {
    const nameInput = this._form.querySelector('#name');
    const messageInput = this._form.querySelector('#message');

    const nameValue = nameInput ? nameInput.value : '';
    const messageValue = messageInput ? messageInput.value : '';

    return {
      id: this._form.querySelector('input[name="id"]').value,
      name: nameValue,
      review: messageValue,
    };
  },

  _clearForm() {
    this._form.reset();
  },

  _addNewReviewToView(reviewData) {
    if (this._container) {
      const reviewElement = createReviewTemplate(reviewData);
      this._container.prepend(reviewElement);
    } else {
      console.error('Container element not found');
    }
  },

  _showErrorMessage(message) {
    console.error(message);
  },

};

export default ReviewInitiator;
