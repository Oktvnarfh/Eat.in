/* eslint-disable no-undef */
const assert = require('assert');

Feature('Unfavorite Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty favorited restaurants', ({ I }) => {
  I.amOnPage('/#/favorite');
  I.see('Favorite restaurant still empty', '.favorite-tag');
});
Scenario('should show the unfavorite button when the restaurant has been favorited before', async ({ I }) => {
  I.amOnPage('/');

  I.waitForElement('.card', 5);
  I.seeElement('.card');
  const cardRestaurant = locate('.card-title a').first();
  const firstCardRestaurant = await I.grabTextFrom(cardRestaurant);
  I.click(cardRestaurant);

  I.waitForElement('#likeButton');
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.card');
  const favoritedCard = locate('.card-title a').first();
  const favoritedCardRestaurant = await I.grabTextFrom(favoritedCard);
  assert.strictEqual(firstCardRestaurant, favoritedCardRestaurant);

  I.click(favoritedCard);
  I.seeElement('#likeButton');
});
Scenario('cancel favoriting one restaurant', async ({ I }) => {
  I.amOnPage('/');

  I.waitForElement('.card', 5);
  I.seeElement('.card');
  const cardRestaurant = locate('.card-title a').first();
  const firstCardRestaurant = await I.grabTextFrom(cardRestaurant);
  I.click(cardRestaurant);

  I.waitForElement('#likeButton');
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.card');
  const favoritedCard = locate('.card-title a').first();
  const favoritedCardRestaurant = await I.grabTextFrom(favoritedCard);
  assert.strictEqual(firstCardRestaurant, favoritedCardRestaurant);

  I.click(favoritedCard);

  I.waitForElement('#likeButton');
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.favorite-tag');

  const empty = await I.grabTextFrom('.favorite-tag');

  assert.strictEqual(empty.trim(), 'Favorite restaurant still empty');
});
