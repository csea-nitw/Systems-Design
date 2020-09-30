# Rate Limiting

* If you don’t rate limit, most likely DoS attack will happen
    * Floods the system with a bunch of traffic
    * The bad actor is clogging the system
    * Return an error for users doing it
* Get a given webpage that is popular by a user
    * Look at headers, authentication to identify the user
    * Score the user at a given IP, region, whole system in a whole
    * 10K requests per minute to avoid spending too much money
    * Run per tests to see the current load of users

* Use Redis for rate-limit as its key-value hash makes it easier to control
    * Redis can run the logic if the user is possible

# Redis Example

* Redis implementation: https://github.com/marcellodesales/redis-rate-limiting-example
