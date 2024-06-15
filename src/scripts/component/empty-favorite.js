class EmptyFavorite extends HTMLElement {
  constructor() {
    super();
    this._style = document.createElement('style');
  }

  connectedCallback() {
    this._render();
  }

  updateStyle() {
    this._style.textContent = `
    .empty-favorite {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 80vh;
    }
    
    .favorite-icon i {
      font-size: 50px;
      color: #888;
    }
    
    .favorite-tag p {
      color: #222121;
      font-size: 20px;
    }
    `;
  }

  _render() {
    this.updateStyle();
    this.innerHTML = `
    ${this._style.outerHTML}
        <div class="empty-favorite">
            <div class="favorite-icon">
                <i class="far fa-folder-open"></i>
            </div>
            <div class="favorite-tag">
                <p>Favorite restaurant still empty</p>
            </div>
        </div>
        `;
  }
}

customElements.define('empty-favorite', EmptyFavorite);
