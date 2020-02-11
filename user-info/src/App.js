import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then((response) => {
        console.log("This is the response:", response)
        setUsers(response.data)
      })
      .catch((error) => {
        console.log("This is the error:", error.error_message)
      })
  }, [])

  return (
    <div className="App">
      {
        users.map((user) => {
          return (
            <div key={user.id}>
              <h1> {user.name} </h1>
              <h3> {user.bio} </h3>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
