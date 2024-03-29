import React from 'react';

// We're creating a context using the createContext function.\
// A context object as the name states can be shared to other components within the app
// The context object is a different approach to passing information between components and allows easier access by avoiding the use of prop-drilling
const UserContext = React.createContext();


// The "Provider" component allows other components to consume/use the context object and supply the necessary information needed to the context object.
export const UserProvider = UserContext.Provider


export default UserContext