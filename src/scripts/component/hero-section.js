class HeroSection extends HTMLElement {
  constructor() {
    super();
    this._style = document.createElement('style');
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    const bgPathSmall = '../hero-image/hero-image_2-small.jpg';
    this._style.textContent = `
              .hero-image {
                  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${bgPathSmall}");
                  height: 100vh; 
                  background-position: center;
                  background-repeat: no-repeat;
                  background-size: cover;
                  position: relative;
                  width: 100%; // Setel lebar menjadi full-width secara default
                  max-width: 1000px; // Setel lebar maksimal menjadi 1000px
                  margin: 0 auto; // Pusatkan hero element secara horizontal
                  
              }
              
              .hero-text {
                  text-align: center;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  color: #ddd;
                  font-size: 20px;
              }

              .hero_desc {
                color: #ffffff;
                margin-top: 16px;
                font-size: 30px;
                font-weight: 400;
              }
              
              .hero-text .btn {
                  border: none;
                  outline: 0;
                  display: inline-block;
                  padding: 10px 25px;
                  color: black;
                  background-color: #ddd;
                  text-align: center;
                  cursor: pointer;
                  margin-top: 20px;
                  border-radius: 10px;
              }
  
              .hero-text .btn:hover{
                  color: #3498db;
                  box-shadow: inset -3px -3px 7px #ffffff,
                              inset 3px 3px 5px #ceced1;
              }
  
  
              @media screen and (max-width: 1024px) {
                  .hero-text {
                      font-size: 18px; /* Mengurangi ukuran font pada perangkat sangat kecil */
                  }
              }
  
              /* Media queries untuk responsif di perangkat dengan lebar layar yang berbeda */
              @media screen and (max-width: 768px) {
               
                  .hero-text {
                      font-size: 16px; /* Mengurangi ukuran font pada perangkat sangat kecil */
                  }
                  .hero-text button {
                      padding: 5px 12px;
                  }
              }
  
              @media screen and (max-width: 480px) {
                .hero-image{
                  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${bgPathSmall}");
                }
                  .hero-text {
                      font-size: 13px; /* Mengurangi ukuran font pada perangkat sangat kecil */
                  }
                  .hero-text button {
                      padding: 5px 12px;
                    }
              } 
  
              @media screen and (max-width: 1200px) {
                  .hero-image {
                    width: 100%; /* Setel lebar menjadi full-width ketika ukuran layar kurang dari 1200px */
                    max-width: none; /* Hilangkan batasan lebar maksimal */
                  }
                }
          `;
  }

  render() {
    this.updateStyle();
    this.innerHTML = `
              <section class="hero">
                  <div class="hero-image">
                      <div class="hero-text">
                      <p>Discover Restaurant in Indonesia</p>
                        <button class="btn">Explore Now</button>
                      </div>
                  </div>
              </section>
          `;
    this.appendChild(this._style);
  }
}

customElements.define('hero-section', HeroSection);
