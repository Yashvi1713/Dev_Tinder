# DevTinder

- insatlled tailwind, daisuUi
- user react router dom for routing purpose
    => declared child routes within parent routes to keep a structure and remove the need writing repeated code
    => used structure of body and inside that body all common component like header, footer is being called so no need to call them on every page and calling all the pages inside that body file so all the pages have navbar and footer attached to it
- cors: lib is being used inside the backend so that when API is being made from frontend which is from different IP and host backend can recognize that IP address prior and process the API request further
    => Note: Attribite {withcredentials: true } need to be added into payload while sending the req so that backend can know and allow req to be processed from unsecured network as well
    => this lib basically allows us to access the cookies and token inside it in the req without this it won't attach token with the req

- Redux process
    ==> (Setting redux store)
        => installed redux toolkit and react-redux
        => Setup an appStore using configureStore inside where userReducer is listed
        => Setup userSlice which has reducers and actions defined and is being called inside appStore
        - Whole flow: configureStore => Provider => createSlice => add reducer to store
    ==> Disptaching action to reduce store 
        => Basically adding the user data from the login page to the appStore so that user data is accessible from anypage within application
    ==> Subscribing to appStore
        => utilizing useSeletor() hook from react-redux any page can subscribe to the appstore and from there it can get the user data which is present inside the appStore (reference in NavBar.jsx file)
        => After subscribing we can access user data on any page we want
    ==> Navigating within application
        => using useNavigate() hook from react-router-dom we can navigate routes within application
    ==> Centralizing the baseURL inside constant

- Handling the login scenario
    ==> This is added explicitly inside the body.jsx bcz that's the entry point of the app and on it's render first thing it checks is if the user is loggedIn b'cz then only it will have token generated in cookies otherwise it will not have token
    ==> On refresh the user logs out and remains on same page instead on reload if token present it should stay loggedIn and if token is not present it should redirect to login page
        => Handling this in body.jsx file using useEffect() hook which will execute on first reload of page and fetches user which is currently loggedIn & has token present in it which authenticates the user in backend and that result in giving the user details. Once received its being populated inside the redux store.
        => If token is not present inside the payload then it should redirect the user to the login page where it authenticates first and move ahead  

==> Things to keep in mind (Mistakesssssssss not to repeat!!!!!)
    - Arrow function declaration
        - ()=>{} declaring with {} we have to explicitly use keyword "return" inorder return anything to the function
        - ()=>   without {} we don't have to explicitly use keyword "return" and is used when we have just single line to code so function undersatnd on its own returned value
    - Imports conventions from different files
        - { } are for named imports, and names must match exactly.
        - If you want to rename it, use as like import { BASE_URL as base_url }. (ref inside login.jsx file)
        - If you use default export, then you can give it any name (but that's not your case here).
        






