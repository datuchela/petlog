# stuff to do:

1. [ ] _BUG04_ addPet page doesn't navigate you to homepage on success, has to do with isSuccess itself.
2. [ ] _BUG03_ refreshToken expires, you still get to add pets, might be related to _BUG02_
3. [ ] add "reminders" cache on useQuery hook
4. [ ] Should provide axiosPrivate from useAxiosPrivate on methods.js somehow. (currently supplying it down through App.jsx as a Route) - Can be done by creating useReducer custom hook for api calls.
5. [x] _BUG01_ Registering doesn't authenticate you (it just sets User)
6. [x] _BUG02_ You shouldn't be getting data after refreshToken expires.
7. [x] Log out when refresh token expires
8. [ ] Use CRON jobs to update upcoming date in reminders

# features to implement:

1. [ ] TanStack/Router
2. [ ] TanStack/Form
