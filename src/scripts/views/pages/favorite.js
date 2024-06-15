import '../../component/restaurant-list';
import '../../component/empty-favorite';
import '../../component/loading-element';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

const Favorite = {
  async render() {
    // const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    // let listsHtml = '';

    // if (restaurants.length > 0) {
    //   listsHtml = `
    //     <h2>Favorite Restaurant</h2>
    //     <restaurant-list></restaurant-list>
    //   `;
    // } else {
    //   listsHtml = '<empty-favorite></empty-favorite>';
    // }

    const html = `
      <section class="explores">
        <loading-element></loading-element>
        <div class="container">
          <div class="lists" id="lists">
          <restaurant-list></restaurant-list>
          </div>
        </div>
      </section>
    `;
    return html;
  },

  // async afterRender() {
  //   const loadingElement = document.querySelector('loading-element');
  //   loadingElement.style.display = 'block';

  //   try {
  //     const restaurantContainer = document.querySelector('restaurant-list');
  //     const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();

  //     if (restaurants.length > 0) {
  //       restaurants.forEach((restaurant) => {
  //         restaurantContainer.addRestaurantItem(restaurant);
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error fetching favorite restaurants:', error);
  //   } finally {
  //     setTimeout(() => {
  //       loadingElement.style.display = 'none';
  //     }, 400);
  //   }
  // },

  async afterRender() {
    const loadingElement = document.querySelector('loading-element');
    loadingElement.style.display = 'block';

    try {
      const restaurantContainer = document.querySelector('restaurant-list');
      const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
      if (restaurants.length > 0) {
        restaurants.forEach((restaurant) => {
          restaurantContainer.addRestaurantItem(restaurant);
        });
      } else {
        document.querySelector('#lists').innerHTML = '<empty-favorite></empty-favorite>';
      }
    } catch (error) {
      console.error('Error fetching favorite restaurants:', error);
    } finally {
      setTimeout(() => {
        loadingElement.style.display = 'none';
      }, 400);
    }
  },
};

export default Favorite;
