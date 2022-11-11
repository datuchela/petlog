# stuff to do:

1. [ ] _BUG04_ addPet page doesn't navigate you to homepage on success, has to do with isSuccess itself.
2. [ ] _BUG05_ Sometimes refreshing token doesn't help with POST requests
3. [ ] _BUG03_ refreshToken expires, you still get to add pets, might be related to _BUG02_
4. [ ] add "reminders" cache on useQuery hook
5. [ ] Should provide axiosPrivate from useAxiosPrivate on methods.js somehow. (currently supplying it down through App.jsx as a Route) - Can be done by creating useReducer custom hook for api calls.
6. [x] _BUG01_ Registering doesn't authenticate you (it just sets User)
7. [x] _BUG02_ You shouldn't be getting data after refreshToken expires.
8. [x] Log out when refresh token expires

# features to implement:

1. [ ] TanStack/Router
2. [ ] TanStack/Form
3. [ ] Use CRON jobs to update upcoming date in reminders
