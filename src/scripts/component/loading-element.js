class LoadingElement extends HTMLElement {
  constructor() {
    super();

    this._style = document.createElement('style');
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
            #loading-element {
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
            z-index: 9999; /* Ensure it appears on top of other elements */
        }
        
        #loading-path {
            fill: none;
            stroke: #fff; /* White stroke color */
            stroke-width: 3; /* Adjust the stroke width as needed */
            animation: rotate 2s linear infinite; /* Adjust the duration here (2 seconds in this example) */
        }
        
        @keyframes rotate {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
            `;
  }

  render() {
    this.updateStyle();
    this.innerHTML = `
            ${this._style.outerHTML}
            <div id="loading-element">
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" stroke="#e6e6e6" stroke-width="20" fill="none" />
                <path id="loading-path" d="M 100 10 A 90 90 0 0 1 100 190 A 90 90 0 0 1 100 10" />
              </svg>
            </div>
          `;
  }
}

// Register the custom element
customElements.define('loading-element', LoadingElement);
