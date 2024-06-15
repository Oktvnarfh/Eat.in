/* eslint-disable max-len */
/* eslint-disable arrow-parens */
/* eslint-disable no-promise-executor-return */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars

const textForReview = 'Tidak rekomendasi untuk pelajar!';

Feature('Review Restaurant');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('review one restaurant', async ({ I }) => {
  I.seeElement('restaurant-list');

  await I.waitForElement('restaurant-list article', 5);

  I.click('restaurant-list article .card-title a');

  const url = await I.grabCurrentUrl();
  console.log(`Current URL is [${url}]`);

  await I.waitForElement('.product-detail', 5);

  I.scrollTo('.product-detail');

  I.seeElement('#review-form');

  await I.waitForElement('#review-form', 5);

  I.fillField('Your Name *', 'vi');
  I.fillField('Your Review *', textForReview);

  I.click('#elmBtnsendReview');

  await new Promise(resolve => setTimeout(resolve, 2000));

  I.see(textForReview, '.review-text');
});
