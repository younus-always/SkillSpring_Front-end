import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { app } from "../Firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

const auth = getAuth(app);
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);
      const googleProvider = new GoogleAuthProvider();
      const axiosPublic = useAxiosPublic();

      // create a new user
      const signUp = (email, password) => {
            setLoading(true);
            return createUserWithEmailAndPassword(auth, email, password);
      };

      // login a user
      const signIn = (email, password) => {
            setLoading(true);
            return signInWithEmailAndPassword(auth, email, password);
      };

      // login with google
      const googleLogin = () => {
            setLoading(true);
            return signInWithPopup(auth, googleProvider);
      };

      // update user profile
      const updateUserProfile = (name, photo) => {
            return updateProfile(auth.currentUser, {
                  displayName: name,
                  photoURL: photo
            });
      };

      // log out user
      const logOut = () => {
            setLoading(true);
            return signOut(auth)
                  .then(() => {
                        // Sign-out successful.
                        setUser(null);
                  }).catch(err => console.log(err))
      };

      // Observer listener authentication state of the user in real time.
      useEffect(() => {
            const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
                  console.log('current user:', currentUser)
                  setUser(currentUser);

                  if (currentUser?.email) {
                        const user = { email: currentUser.email };
                        axiosPublic.post('/jwt', user)
                              .then(res => {
                                    setLoading(false);
                              })
                  }
                  else {
                        axiosPublic.post("/logout", {})
                              .then(res => {
                                    setLoading(false);
                              })
                  }
            });
            // Cleanup the subscription on component unmount
            return () => unSubscribe();
      }, [axiosPublic])

      const authInfo = {
            user,
            signIn,
            signUp,
            updateUserProfile,
            loading,
            setLoading,
            logOut,
            googleLogin
      };

      return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>

}

export default AuthProvider