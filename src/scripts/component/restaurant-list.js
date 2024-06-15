import RestaurantItem from './restaurant-item';

class RestaurantList extends HTMLElement {
  constructor() {
    super();
    this._style = document.createElement('style');
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
      restaurant-list {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 16px;

        @media (max-width: 1024px) {
          grid-template-columns: repeat(2, 1fr);
        }

        @media (max-width: 767px) {
          grid-template-columns: 1fr;
        }
      }
    `;
  }

  render() {
    this.updateStyle();
    this.innerHTML = '';
    this.appendChild(this._style);
  }

  addRestaurantItem(restaurant) {
    const restaurantItem = new RestaurantItem();
    restaurantItem.setRestaurant(restaurant);
    this.appendChild(restaurantItem);
  }
}

customElements.define('restaurant-list', RestaurantList);
