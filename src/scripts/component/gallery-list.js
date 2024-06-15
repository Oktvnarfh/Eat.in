class GalleryList extends HTMLElement {
  constructor() {
    super();
    this._style = document.createElement('style');
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
        .gallery-container {
            max-width: 1200px;
            margin: 100px auto;
            padding: 0 20px;
      
        .gallery-title{
            font-size: 32px;
            text-align: center; 
            margin-bottom: 50px;
        }
      
        .gallery-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            grid-gap: 20px;
        }

        .gallery-item {
            overflow: hidden;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .gallery-item img {
            width: 100%;
            height: auto;
            display: block;
            transition: transform 0.3s ease;
        }
        
        .gallery-item img:hover {
            transform: scale(1.05);
        }

        @media (max-width:940px) {
            .gallery-container .h2{
            font-size: 24px;
          }
        }
      }
          `;
  }

  render() {
    this.updateStyle();
    this.innerHTML = `
    ${this._style.outerHTML}
    <section class="gallery-container">
        <h2 class="gallery-title">Restaurant Gallery</h2>
        <div class="gallery-list">
            <div class="gallery-item">
                <picture>
                    <source media="(max-width: 600px)" data-srcset="hero-image/hero-image_1-small.jpg">
                    <img class="lazyload" width="373" height="248" data-src="hero-image/hero-image_1-large.jpg" alt="">
                </picture>
            </div>
            <div class="gallery-item">
                <picture>
                    <source media="(max-width: 600px)" data-srcset="hero-image/hero-image_3-small.jpg">
                    <img class="lazyload" width="373" height="248" data-src="hero-image/hero-image_3-large.jpg" alt="">
                 </picture>
            </div>
            <div class="gallery-item">
                <picture>
                    <source media="(max-width: 600px)" data-srcset="hero-image/hero-image_4-small.jpg">
                    <img class="lazyload" width="373" height="248" data-src="hero-image/hero-image_4-large.jpg" alt="">
                </picture>
            </div>
            <div class="gallery-item">
                <picture>
                    <source media="(max-width: 600px)" data-srcset="hero-image/hero-image_3-small.jpg">
                    <img class="lazyload" width="373" height="248" data-src="hero-image/hero-image_3-large.jpg" alt="">
                </picture>
            </div>
            <div class="gallery-item">
                <picture>
                    <source media="(max-width: 600px)" data-srcset="hero-image/hero-image_4-small.jpg">
                    <img class="lazyload" width="373" height="248" data-src="hero-image/hero-image_4-large.jpg" alt="">
                </picture>
            </div>
            <div class="gallery-item">
                <picture>
                    <source media="(max-width: 600px)" data-srcset="hero-image/hero-image_1-small.jpg">
                    <img class="lazyload" width="373" height="248" data-src="hero-image/hero-image_1-large.jpg" alt="">
                </picture>
            </div>
        </div>
    </section>
          `;
    this.appendChild(this._style);
  }
}

customElements.define('gallery-list', GalleryList);
