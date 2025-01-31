import FavoriteRestaurantIdb from '../data/favorite-restaurant-idb';
import {
  createLikeButtonTemplate,
  createUnlikeButtonTemplate,
  createSuccesFavoriteNotif,
  createRemoveFavoriteNotif,
} from '../views/templates/template-creator';

const LikeButtonPresenter = {
  async init({ likeButtonContainer, notifContainer, restaurant }) {
    if (!restaurant || !restaurant.id) {
      console.error('Restaurant atau id-nya undefined atau null');
      return;
    }

    this._likeButtonContainer = likeButtonContainer;
    this._notifContainer = notifContainer;
    this._restaurant = restaurant;

    await this._renderButton(this._restaurant);
  },

  async _renderButton(restaurant) {
    const { id } = restaurant;

    if (await this._restaurantExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _restaurantExist(id) {
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(id);
    return !!restaurant;
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createUnlikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
      this._renderButton(this._restaurant);
      this._notifContainer.innerHTML = createRemoveFavoriteNotif.show();
      createRemoveFavoriteNotif.remove();
    });
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
      this._renderButton(this._restaurant);
      this._notifContainer.innerHTML = createSuccesFavoriteNotif.show();
      createSuccesFavoriteNotif.remove();
    });
  },
};

export default LikeButtonPresenter;
