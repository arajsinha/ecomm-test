import React from "react";
import firebaseConfig from "../lib/firebase";
import { initializeApp } from "firebase/app";
import { getAuth, updateProfile, signOut, updateEmail, listUsers } from "firebase/auth";

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);

import { useEffect, useState } from "react";
// import { getAuth, listUsers } from 'firebase/auth';

const UserList = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      if (user) {
        const auth = getAuth();
        listUsers(auth)
          .then((listUsersResult) => {
            setUsers(listUsersResult.users);
          })
          .catch((error) => {
            console.log('Error listing users:', error);
          });
      }
    }, [user]);
  
    return (
      <div>
        <h2>User List</h2>
        <ul>
          {users.map((user) => (
            <li key={user.uid}>{user.email}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default UserList;