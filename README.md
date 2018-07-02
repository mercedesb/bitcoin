# The Bitcoin Arbitrage App

## Current Features
 - The main page has a description of cryptocurrency arbitrage as well as a general introduction to the topic.
 - The final sale is the two tiered subscription status. The first allows access to the /coins route, which provides arbitrage opportunities. The second provides more direct access with an API route. 
 - Bot notification systems are also accessible to the top tier services.
 
 ## Advanced Features
  - https://crypto-arbitrage-api.herokuapp.com/cards 
  --This route is accessible to those who know its URL. It has not been protected at this time
  - https://crypto-arbitrage-api.herokuapp.com/api/cards
  --This route is *not* accessible to those who know its URL. It has to be provided an authorization token. To register for this route, the following must be done: POST request to /api/auth/register which is x-www-form-urlencoded. Three keys: x-access-token: "username", email: "email@something.com", password: "password". After creating this user, you will be provided a response with an auth token. This token must be added as a header of type "x-access-token" to access the API data. A script must be written to automatically authorize users when they sign up for the premium membership and provide them with their API x-access-tokens. 

## Future Plans
Here we have some developments we are planning on implementing in the future.
### AI Bots
 - Discord
 - Telegram

## Advanced Authentication
Our authentication servers reside on both Firebase and MongoDB, the first protecting the HTML /Cards route, the second protecting the /API/Cards route. This is where the data is processed and output, and this is the part of the program that is potentially worth a subscription service.
