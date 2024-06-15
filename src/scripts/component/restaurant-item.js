import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantItem extends HTMLElement {
  constructor() {
    super();
    this._restaurant = {
      id: 0,
      name: 'NEED_NAME',
      description: 'NEED_DESCRIPTION',
      pictureId: 'NEED_PICTURE',
      city: 'NEED_CITY',
      rating: 'NEED_RATING',
    };
    this._style = document.createElement('style');
  }

  setRestaurant(value) {
    this._restaurant.id = value.id;
    this._restaurant.name = value.name;
    this._restaurant.description = value.description;
    this._restaurant.pictureId = value.pictureId;
    this._restaurant.city = value.city;
    this._restaurant.rating = value.rating;

    this.render();
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
                    .card {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        background-color: #fff;
                        box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
                        border-radius: 10px;
                        overflow: hidden;
                    }

                    .card a{
                      text-decoration: none;
                      color: #000;
                    }
        
                    .card-image img {
                        object-fit: cover;
                        width: 100%;
                        height: 200px;
                    }
        
                    .card-content {
                        display: flex;
                        flex-direction: column;
                        padding: 20px;
                        height: 100%;
                    }
        
                    .card-content h2{
                        font-size: 20px;
                    }
        
                    .card-content p {
                        font-size: 12px;
                        margin: 10px 0;
                        max-height: 100px;
                        overflow: hidden;
                        position: relative;
                    }
        
                    .item-thumbnail {
                        object-fit: cover;
                        width: 100%;
                        height: 200px;
                    }
        
                    .item-thumbnail:hover {
                        transform: scale(1.05);
                      }
        
                    .card-title {
                        font-size: 1.5rem;
                    }
        
                    .card-info {
                      display: flex;
                      justify-content: space-between;
                      color: #666;
                      font-size: 12px;
                      margin-bottom: 5px;
                    }
        
                    .card-info i {
                      margin-right: 5px;
                    }
    `;
  }

  render() {
    this.updateStyle();

    this.setAttribute('data-id', this._restaurant.id);

    this.innerHTML = `
      ${this._style.outerHTML}
      <article class="card"> 
          <picture class="card-image">
            <img class="lazyload item-thumbnail" data-src="${API_ENDPOINT.RESTAURANT_IMAGE_SMALL(this._restaurant.pictureId)}" alt="${this._restaurant.name}">
          </picture>
          <div class="card-content">
              <h3 class="card-title"><a href="#/detail/${this._restaurant.id}">${this._restaurant.name}</a></h3>
              <div class="card-info">
                  <address class="card-location">
                      <i class="fas fa-map-marker-alt fa-sm"></i>
                      ${this._restaurant.city}
                  </address>
                  <div class="card-rating">
                      <i class="fas fa-star fa-sm"></i>
                      ${this._restaurant.rating}
                  </div>
              </div>
              <p class="short-description">${this._restaurant.description.substring(0, 100)}...</p>
              <p class="long-description" style="display:none">${this._restaurant.description}</p>
              <span class="read-more">Read more</span>
          </div>
      </article>
    `;
  }
}

customElements.define('restaurant-item', RestaurantItem);
export default RestaurantItem;
