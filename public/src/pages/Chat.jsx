import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoutes } from "../utils/APIRoutes";

function Chat() {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState;
  undefined;
  //useEffect will be executed in order wise
  //so try to write useEffects in order

  //If there is no user in local storage
  useEffect(async () => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
    //if any user is present then setcurrent user
    else {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
    }
  }, []);

  //run this hook whenever there is a current user
  useEffect(async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoutes}/${currentUser._id}`);
        setContacts(data.data);
      } else {
        navigate("/setAvatar");
      }
    }
  }, []);

  return (
    <Container>
      <div className="container"></div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: cloumn;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #e1afd1;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #76abae;
    display: grid;
    grid-template-column: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-column: 35% 65%;
    }
  }
`;

export default Chat;
