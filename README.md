# stuff to do:

1. [ ] Should provide axiosPrivate from useAxiosPrivate on methods.js somehow. (currently supplying it down through App.jsx as a Route) - Can be done by creating useReducer custom hook for api calls.
2. [x] _BUG01_ Registering doesn't authenticate you (it just sets User)
3. [x] _BUG02_ You shouldn't be getting data after refreshToken expires.
4. [x] Log out when refresh token expires
5. [ ] Use CRON jobs to update upcoming date in reminders
