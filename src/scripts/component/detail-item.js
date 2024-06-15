import API_ENDPOINT from '../globals/api-endpoint';
import UrlParser from '../routes/url-parser';
import RestaurantSource from '../data/restaurant-source';
import LikeButtonPresenter from '../utils/like-button-initiator';
import ReviewInitiator from '../utils/review-initiator';

class DetailItem extends HTMLElement {
  constructor() {
    super();
    this._style = document.createElement('style');
    this._likeButtonPresenter();
    this.openTab = this.openTab.bind(this);
  }

  async connectedCallback() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const detailRestaurant = await RestaurantSource.detailRestaurant(url.id);
    this._data = detailRestaurant.restaurant;
    this.renderDetail(this._data);
    this._likeButtonPresenter();
    this._formInitiator();
  }

  async _likeButtonPresenter() {
    await LikeButtonPresenter.init({
      likeButtonContainer: this.querySelector('#likeButtonContainer'),
      notifContainer: document.querySelector('#notif-favorite-container'),
      restaurant: this._data,
    });
  }

  async _formInitiator() {
    await ReviewInitiator.init({
      form: this.querySelector('#review-form'),
      container: this.querySelector('#review-container'),
    });
  }

  _templateRating() {
    const rate = [];
    const roundedRating = Math.round(this._data.rating);

    for (let i = 0; i < roundedRating; i += 1) {
      rate.push('<i class="fas fa-star rate"></i>');
    }
    return rate.join('');
  }

  updateStyle() {
    this._style.textContent = `
    .product-detail {
      padding: 50px 0;
      align-items: center;
      justify-content: flex-start;
      max-width: 1270px;
      margin: 0 auto;
    }

    .product-options {
      margin-top: 20px;
    }
    .product-image {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 0 auto;
      width: 100%;
      max-height: 450px;
    }
    
    .rate{
      color: #FFD700;
    }

    .product-title {
      font-size: 2.5rem;
      font-weight: bold;
      margin-top: 0;
    }
    .product-description {
      margin-bottom: 20px;
    }

    .product-description h2 {
      font-size: 20px;
    }

    .product-description p{
      padding: 5px;
      font-size: 15px;
    }

    .btn-fav{
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 20px;
          margin: 10px 0px;
          font-size: 1.2rem;
          border: 1px solid #6c757d;
          border-radius: 0;
          background-color: transparent;
          color: #6c757d;
          cursor: pointer;
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
      }

    .btn-fav:hover {
        background-color: #6c757d;
        color: #fff;
        border-color: #6c757d;
    }

    .btn-fav i {
      margin-right: 5px;
    }

    .tab button {
      background-color: #f2f2f2;
      border: none;
      outline: none;
      cursor: pointer;
      padding: 10px 20px;
      transition: background-color 0.3s ease;
    }

    .tab button.active {
      background-color: #ddd;
    }

    .tab-content {
      display: none;
    }

    .tab-content.active {
      display: block;
    }

    .product-options,
    .product-reviews {
      padding: 20px 0;
    }

    .checked {
      color: #ffcc00;
    }

    .review-date {
      margin-top: 5px;
      color: #999;
    }

    .review-text {
      margin-top: 10px;
    }
    .row-content {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -15px;
    }

    .col {
      flex: 1;
      padding: 0 15px;
    }

    .info {
      display: flex;
      flex-direction: column;
    }

    .info > * {
      margin-bottom: 10px;
      font-size: 1rem;
    }

    .info i {
      margin-right: 5px;
    }

    .nav-options {
      justify-content: start;
      border-bottom: 1px solid #6c757d;
      margin-bottom: 20px;
      border-bottom: none;
    }

    .nav-item {
      padding: 10px 15px;
      text-decoration: none;
      color: #000;
      transition: background-color 0.3s;
      border: 1px solid #dee2e6;
      border-bottom: none;
    }

    .nav-item.active:focus,
    .nav-item.active:hover {
      background-color: #6c757d;
      color: #fff;
      border-color: #6c757d;
    }

    .nav-item:focus:not(.active),
    .nav-item:hover:not(.active) {
      background-color: #f8f9fa;
    }

    .line-up{
      margin-top: 10px;
      border: none;
      border-top: 1px solid #6c757d;
      padding: 10px;
    }

    .line-bottom{
      margin-bottom: 4px;
      border: none;
      border-top: 1px solid #dee2e6;
    }

    .menu-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 16px; /* Jarak antara child elements */
    }

    .list-menu {
      margin-top: 20px;
    }

    h4{
      font-size: 20px;
    }
    small{
        color: #495057;
    }
    .rating-content{
        margin: 20px 0;
        display: flex;
    }
    .rating-content p {
        margin-bottom: 0;
        margin-right: 30px;
    }
    .rating-star i{
        font-size: 25px;
    }

    review-head{
      margin-bottom: 20px;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
    }

    .form-group label {
        margin-bottom: 0.5rem;
    }

    .form-group input[type="text"],
    .form-group input[type="email"],
    .form-group textarea {
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }

    .btn-submit{
        padding: 10px 20px;
    }

    @media (max-width: 768px) {
      .product-detail{
        padding: 0;
      }

      .nav-options a{
        font-size: 0.8rem;
      }

      .col {
          flex: 100%;
          margin-top: 20px;
      }

      .product-title {
          font-size: 1.3rem;
          margin-top: 20px;
      }

      .location,
      .rating,
      .city {
          margin: 10px;
          font-size: 0.9rem;
      }
      .product-description p {
          font-size: 1rem;
          margin-top: 10px;
      }

      .btn-fav {
          margin-top: 20px;
      }

      .product-options .container {
          padding: 0 15px;
      }

      .tab {
          flex-direction: column;
          align-items: center;
          margin-bottom: 10px;
      }

      .tab button {
          margin-bottom: 10px;
      }

      .tab-content {
          padding: 0 15px;
          font-size: 0.8rem;
          margin-bottom: 20px;
      }

      .tab-content h2 {
        font-size: 16px;
      }

      .tab-content p {
          font-size: 0.8rem;
      }

      .form-group input[type="text"],
      .form-group textarea {
        padding: 0.275rem 0.5rem;
        font-size: 0.1rem;
        line-height: 1.0;
      }

      .btn-submit{
        padding: 2px 5px;
      }
    }

    @media (max-width: 480px){
      .nav-options {
        margin-bottom: 5px;
      }

      .review-form{
        margin-bottom: 20px;
      }

      .form-group input[type="text"],
      .form-group textarea {
        padding: 0.175rem 0.25rem;
        font-size: 0.7rem;
        line-height: 1.0;
      }

      .btn-submit{
        padding: 2px 5px;
      }
    }
    `;
  }

  openTab(event) {
    const tabName = event.target.getAttribute('data-tab');
    const tabContents = this.querySelectorAll('.tab-content');
    const navItems = this.querySelectorAll('.nav-item');
    tabContents.forEach((content) => {
      content.classList.remove('active');
    });
    navItems.forEach((item) => {
      item.classList.remove('active');
    });
    this.querySelector(`#${tabName}`).classList.add('active');
    event.target.classList.add('active');
  }

  renderDetail(restaurant) {
    this.updateStyle();
    this.innerHTML = `
    ${this._style.outerHTML}
      <section class="product-detail">
        <div id="likeButtonContainer"></div>
          <div id="notif-favorite-container" class="notif-favorite-container"></div>
            <div class="container">
              <div class="row">
                  <div class="col">
                    <img src="${API_ENDPOINT.RESTAURANT_IMAGE_MEDIUM(restaurant.pictureId)}" alt="${restaurant.name}" class="product-image">
                  </div>
                  <div class="col">
                    <h3 class="product-title">${restaurant.name}</h3>
                    <div class="info">
                      <div class="rating">
                        ${this._templateRating()}
                      </div>
                      <address class="location">
                        <i class="fas fa-city fa-sm"></i>
                          ${restaurant.address}
                      </address>
                      <div class="city">
                        <i class="fas fa-map-marker-alt fa-sm"></i>
                          ${restaurant.city}
                      </div>
                    </div>
                    <hr class="line-up">
                  </div>
              </div>
            </div>
            <div class="product-options">
              <div class="container">
                <div class="tab">
                  <div class="nav-options">
                    <a class="nav-item  active" onclick="(event) => this.openTab(event)" data-tab="reviews">Reviews</a>
                    <a class="nav-item" onclick="(event) => this.openTab(event)" data-tab="description">Description</a>
                    <a class="nav-item" onclick="(event) => this.openTab(event)" data-tab="menus">Menus</a>
                    <hr class="line-bottom">
                  </div>
                </div>
                <div id="reviews" class="tab-content active">
                <div class="row-content">
                  <div class="col review-form">
                    <h4>Leave a review</h4>
                    <form role="form" id="review-form">
                      <input type="hidden" name="id" value="${this._data.id}"> 
                        <div class="form-group">
                            <label for="name">Your Name *</label>
                            <input type="text" class="form-control" id="name">
                        </div>
                        <div class="form-group">
                            <label for="message">Your Review *</label>
                            <textarea id="message" cols="30" rows="5" class="form-control"></textarea>
                        </div>
                        <button type="submit" id="elmBtnsendReview" class="btn-submit">Leave Your Review</button>
                    </form>
                  </div>
                  <div class="col">
                    <div class="review-container">
                        <div class="review-content">
                          ${restaurant.customerReviews.map((reviewer) => `
                          <h3>${reviewer.name}</h3>
                          <p class="review-date">${reviewer.date}</p>
                          <p class="review-text">${reviewer.review}</p>`)}
                        </div>
                    </div>  
                  </div>
                </div>
                </div>
                <div id="description" class="tab-content">
                  <h3>Description</h3>
                    ${restaurant.description}
                </div>
                <div id="menus" class="tab-content">
                  <div class="menu-content">
                    <div class="list-menu">
                      <h3>Foods</h3>
                      <ul>
                        ${restaurant.menus.foods.map((food) => `<li class="list">${food.name}</li>`).join('')}
                      </ul>
                    </div>
                    <div class="list-menu">
                      <h3>Drinks</h3>
                      <ul>
                        ${restaurant.menus.drinks.map((drink) => `<li class="list">${drink.name}</li>`).join('')}</p>
                      </ul>
                    </div>
                  </div>
                </div>
            </div>
        </section>
    `;
    const tabButtons = this.querySelectorAll('.nav-item');
    tabButtons.forEach((button) => {
      button.addEventListener('click', this.openTab);
    });
  }
}

customElements.define('detail-item', DetailItem);
