# Final Team Project for CS5500

Login with your Northeastern credentials and read the project description [here](https://northeastern-my.sharepoint.com/:w:/g/personal/j_mitra_northeastern_edu/ETUqq9jqZolOr0U4v-gexHkBbCTAoYgTx7cUc34ds2wrTA?e=URQpeI).

## List of features

All the features you have implemented.

| Feature                   | Description                                                                                                     | E2E Tests                                | Component Tests          | Jest Tests                               |
| ------------------------- | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ------------------------ | ---------------------------------------- |
| View posts                | Allow users to view all the questions on the platform                                                           | client/cypress/e2e/view-posts.cy.js      | client/cypress/component | server/tests/controller/question.test.js server/tests/utils/question.test.js |
| Create new posts          | This is feature 2.                                                                                              | client/cypress/e2e/create-post.cy.js     | client/cypress/component | server/tests/controller/question.test.js server/tests/utils/question.test.js                             |
| Search for existing posts | Allow users to search for existing posts on the platform                                                        | client/cypress/e2e/search-post.cy.js     | client/cypress/component | server/tests/controller/question.test.js server/tests/utils/question.test.js                             |
| Commenting on posts       | Allows authenticated users to comment on a post                                                                 | client/cypress/e2e/comment-post.cy.js    | client/cypress/component | server/tests/controller/question.test.js server/tests/utils/question.test.js                             |
| Voting on posts           | Allow authenticated users to vote on posts, i.e answer provided to express approval or disapproval              | client/cypress/e2e/voting-on-posts.cy.js | client/cypress/component | server/tests/controller/vote.test.js                             |
| Tagging posts             | Allow users to tag their posts with relevant topics or categories to organize content                           | client/cypress/e2e/tagging-post.cy.js    | client/cypress/component | server/tests/controller/tag.test.js                             |
| User profiles             | Allow users to view and edit their profile page, which includes user information and activities on the platform | client/cypress/e2e/view-profile.cy.js    | client/cypress/component | server/tests/controller/auth.test.js                             |
| Post moderation           | Allow moderators to review and manage posts to ensure it meets the guidelines and standards                     | client/cypress/e2e/post-moderation.cy.js | client/cypress/component | server/tests/controller/question.test.js                             |
| Log in                    | Allow registered users to log in                                                                                | client/cypress/e2e/login.cy.js           | client/cypress/component | server/tests/controller/auth.test.js                             |
| Sign up                   | Allow users to create an account on the platform                                                                | client/cypress/e2e/signup.cy.js          | client/cypress/component | server/tests/controller/auth.test.js                             |

## Instructions to generate and view coverage report

npm install on client folder

$ npx cypress run

$ npx cypress run --component

code coverage report will be located at [client/coverage/lcov-report/index.html](client/coverage/lcov-report/index.html)

## Extra Credit Section (if applicable)
