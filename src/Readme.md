I have made the end-to-end test using postman and a specific db.
The db name is test_flash_cards

First run the command : npm run test_env

to launch the test environment

Then, import the e2e.postman_collection.json in Postman

To do so go into Postman collection and click on Import, then select the file.
Then click on it.

In the top bar on the left, you should see a 'Run' button with an icon, click on it.
Normally the order is good but verify it, you should have :

POST Register
POST Login
POST post_card
GET get_cards

Then you can click on the orange button Run e2e in the bottom.

If the API is running everything should pass.

First request doesn't have any test.

Second one test that login return a token.

Third one test that the post is working by checking if the body return possess the right attributes.

Last one check if the id of the cards create in the third one is found in the list of all cards.
