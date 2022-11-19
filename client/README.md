# petLog

Client side for a simple web app for tracking reminders exclusively for pets.
<br/>_Note: The project is nowhere near finished._

# stuff to do:

1. [ ] _BUG05_ Sometimes refreshing token doesn't help with POST requests
2. [ ] _BUG03_ refreshToken expires, you still get to add pets, might be related to _BUG02_
3. [ ] Add "reminders" cache on useQuery hook
4. [ ] Should provide axiosPrivate from useAxiosPrivate on methods.js somehow. (currently supplying it down through App.jsx as a Route) - Can be done by creating useReducer custom hook for api calls.
5. [x] _BUG06_ Similar to _BUG04_, but when adding reminders.
6. [x] _BUG04_ addPet page doesn't navigate you to homepage on success, has to do with isSuccess itself.
7. [x] _BUG01_ Registering doesn't authenticate you (it just sets User)
8. [x] _BUG02_ You shouldn't be getting data after refreshToken expires.
9. [x] Log out when refresh token expires

# features to implement:

1.  [ ] Edit Pets, Reminders, User
2.  [ ] TanStack/Router
3.  [ ] TanStack/Form
