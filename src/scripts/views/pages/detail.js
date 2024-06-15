import RestaurantSource from '../../data/restaurant-source';
import UrlParser from '../../routes/url-parser';
import '../../component/detail-item';
import '../../component/loading-element';

const Detail = {
  async render() {
    const html = `
    <section class="explores">
    <loading-element></loading-element>
      <div class="container">
        <h2 class="text-title">Detail Restaurant</h2>
        <detail-item></detail-item>
      </div>
    </section>
        `;
    return html;
  },

  async afterRender() {
    try {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const detailRestaurant = await RestaurantSource.detailRestaurant(url.id);
      const container = document.querySelector('detail-item');
      container.value = detailRestaurant.restaurant;
    } catch (error) {
      console.error('Error fetching restaurant detail:', error);
    } finally {
      // Hapus elemen loading setelah detail restoran selesai dimuat, dengan penundaan 500 ms
      setTimeout(() => {
        const loadingElement = document.querySelector('loading-element');
        if (loadingElement) {
          loadingElement.remove();
        }
      }, 400); // Penundaan 500 milidetik sebelum menghapus elemen loading
    }
  },
};

export default Detail;
