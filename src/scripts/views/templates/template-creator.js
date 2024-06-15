const createReviewTemplate = (reviews) => {
  if (!reviews || typeof reviews !== 'object' || !Array.isArray(reviews.customerReviews) || reviews.customerReviews.length === 0) {
    const html = document.createElement('div');
    html.classList.add('review-container');
    html.innerHTML = '<p>No reviews available.</p>';
    return html;
  }

  const html = document.createElement('div');
  html.classList.add('review-container');
  html.innerHTML = `
      <div class="review-content">
        ${reviews.customerReviews.map((reviewer) => `
          <h3>${reviewer.name}</h3>
          <p class="review-date">${reviewer.date}</p>
          <p class="review-text">${reviewer.review}</p>
        `).join('')}
      </div>
    `;
  return html;
};

const createLikeButtonTemplate = () => `
    <button aria-label="like this restaurant" id="likeButton" class="like">
       <i class="fa fa-heart-o" aria-hidden="true"></i>
    </button>
  `;

const createUnlikeButtonTemplate = () => `
    <button aria-label="unlike this restaurant" id="likeButton" class="like">
      <i class="fa fa-heart" aria-hidden="true"></i>
    </button>
  `;

const createSuccesFavoriteNotif = {
  show() {
    return `
          <div class="fav-notif">
            <p>Success add this restaurant to favorite</p>
          </div>
        `;
  },

  remove() {
    setTimeout(() => {
      const notif = document.querySelector('.fav-notif');
      if (notif)notif.remove();
    }, 2800);
  },
};

const createRemoveFavoriteNotif = {
  show() {
    return `
          <div class="fav-notif">
            <p>Remove this restaurant from favorite</p>
          </div>
        `;
  },

  remove() {
    setTimeout(() => {
      const notif = document.querySelector('.fav-notif');
      if (notif)notif.remove();
    }, 2800);
  },
};

export {
  createReviewTemplate,
  createLikeButtonTemplate,
  createUnlikeButtonTemplate,
  createSuccesFavoriteNotif,
  createRemoveFavoriteNotif,
};
