import '../../component/hero-section';
import '../../component/restaurant-list';
import '../../component/gallery-list';
import RestaurantSource from '../../data/restaurant-source';

const Home = {
  async render() {
    const html = `
      <loading-element></loading-element>  
      <hero-section></hero-section>
        <section id="maincontent" class="explores">
            <div class="container">
                <h2>Explore Restaurant</h2>
                <restaurant-list></restaurant-list>
            </div>
        </section>
        <gallery-list></gallery-list>
    `;
    return html;
  },
  async afterRender() {
    const loadingElement = document.querySelector('loading-element');
    loadingElement.style.display = 'block';

    try {
      const restaurantListElement = document.querySelector('restaurant-list');
      const { restaurants } = await RestaurantSource.listRestaurants();

      restaurants.forEach((restaurant) => {
        restaurantListElement.addRestaurantItem(restaurant);
      });
    } catch (error) {
      console.error('Error fetching restaurant list:', error);
    } finally {
      setTimeout(() => {
        loadingElement.style.display = 'none';
      }, 400);
    }
  },
};

export default Home;
