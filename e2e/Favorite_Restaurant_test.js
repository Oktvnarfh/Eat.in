/* eslint-disable max-len */
/* eslint-disable no-undef */
const assert = require('assert');

Feature('Favoriting Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty favorited restaurants', ({ I }) => {
  I.amOnPage('/#/favorite');
  I.see('Favorite restaurant still empty', '.favorite-tag');
});
Scenario('should show the favorite button when the restaurant has not been favorited before', async ({ I }) => {
  I.amOnPage('/');

  I.waitForElement('.card', 5);
  I.seeElement('.card');
  // add fav resto
  const cardRestaurant = locate('.card-title a').first();
  I.click(cardRestaurant);

  I.seeElement('#likeButton');
});
Scenario('favoriting one restaurant', async ({ I }) => {
  I.amOnPage('/');

  I.waitForElement('.card');
  I.seeElement('.card');
  const cardRestaurant = locate('.card-title a').first();
  const firstCardRestaurant = await I.grabTextFrom(cardRestaurant);
  I.click(cardRestaurant);

  I.waitForElement('#likeButton');
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.card');
  const favoritedCardRestaurant = await I.grabTextFrom('.card-title a');
  assert.strictEqual(firstCardRestaurant, favoritedCardRestaurant);
});
