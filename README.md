## NS8 User Tracking Rest API


## Installation

- inside of the base `ns8` directory, run `npm install`
- run `npm start` in a terminal window
- to run tests, run `npm test` in a separate terminal window while the server is running


## Submission Comments

- I used Express for a web framework here and Mocha / Chai for a test harness and assertion library.
- Due to time constraints, there are no middleware validation. As a general practice, I put validation of request, query and post body parameters inside middleware to keep the route handlers clean, and mostly dedicated to handling the response data in a successful case.
- There are user and event store tests as well as route tests for each core use case.
- I prefix test files with 'test.' and put them along side the code they test, so the `UserStore` test will be in `src/store/test.UserStore.ts`

## API Overview

Documentation for NS8 API User Tracking Event API

### Base URL

`http://localhost:3000/api`

### User Endpoints

+ get   '/users'
+ get   '/users/:userId',
+ post  '/users'
+ get   '/users/:userId/events'

### Event Endpoints

+ get  '/events'
+ post '/events'
+ get  '/events/:eventId'
+ post '/events/:userId'
+ post '/events?start=<UNIX_TIME_STAMP>'

## Considerations for Further Improvement

### Password Handling

Passwords should never be stored as-is in a data store. Instead, they should be stored as hashed and salted versions of the original string supplied on the POST to `/users`, using a secret key only known to the server. This greatly reduces the probability of an attacker programmatically hacking the user's password.

### Authenticated Routes

There currently is no notion of a valid user nor of ownership of resources in this app, so events and user data can be viewed, updated and deleted by users who didn't create them. An obvious improvement would be to add an authentication mechanism to ensure that any user of the API is a valid user.  To complement this, it would be best to implement an authorization mechanism so that users can only view/modify certain data (i.e., events that they create -- and even in that case, we might not want to allow modification of some of those events at all for auditing purposes). Both authentication and authorization could be facilitated by a `/login` endpoint where a user could supply their password, the server could hash and salt it and compare it with what's in the database, and then if the result is identical to what is in the database, issues a JWT token to the user, so that the user can access protected routes on the API until the JWT token expires. For any route that requires a specific user id, the JWT payload should at least contain this user id so it can be used to allow or deny a user's access to specific routes.  Important to note that, because the payload is only base 64 encoded, a JTW authz/authn scheme should be served over HTTPS.


### Persistence Layer

I would use an RDBMS like PostgreSQL or MySQL to persist the user event data more securely as well as to provide transaction mechanisms for safe concurrent read and write capability.

### Login Event Type

If there is a finite list of events that could be created, it might be good to standardize a list of these and keep them in an enum on the server.  If an event comes in with an event type that doesn't match that, return a 400 bad request.
