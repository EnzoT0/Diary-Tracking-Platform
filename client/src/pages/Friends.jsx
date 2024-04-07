import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import axios from "axios";

const Columnnames = ["Name", "Email"];

function Friends() {
  const searchParams = new URLSearchParams(location.search);
  const eid = searchParams.get("eid");
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState({
    Name: "",
    Email: "",
    PlaceMet: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/friends", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

      const friendsWithDetails = await Promise.all(
        data.map(async (friend) => {
          const userResponse = await fetch(
            `http://localhost:8080/user?id=${friend.FriendID}`,
            { credentials: "include" }
          );
          const userData = await userResponse.json();
          return {
            ...friend,
            Name: userData.Name,
            Email: userData.Email,
          };
        })
      );

      setFriends(friendsWithDetails);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddFriend = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/friends",
        newFriend,
        {
          withCredentials: true,
        }
      );
      if (response.status !== 200) {
        throw new Error("Failed to add friend");
      }
      setNewFriend((prevState) => ({
        ...prevState,
        Name: "",
        Email: "",
        PlaceMet: "",
      }));
      fetchData();
    } catch (error) {
      alert("User not found");
      console.error("Error adding friend:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFriend((prevFriend) => ({
      ...prevFriend,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Friends</h1>
      <ul>
        {friends.map((friend) => (
          <li key={friend.FriendID}>
            {friend.Name} - {friend.Email} - {friend.PlaceMet}
          </li>
        ))}
      </ul>
      <h2>Add Friend</h2>
      <input
        type="text"
        name="Name"
        value={newFriend.Name}
        onChange={handleChange}
        placeholder="Your Name"
      />
      <input
        type="email"
        name="Email"
        value={newFriend.Email}
        onChange={handleChange}
        placeholder="Your Email"
      />
      <input
        type="text"
        name="PlaceMet"
        value={newFriend.PlaceMet}
        onChange={handleChange}
        placeholder="Place Met"
      />
      <button onClick={handleAddFriend}>Add Friend</button>
    </div>
  );
}

export default Friends;