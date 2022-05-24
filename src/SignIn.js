import styled from "styled-components";
import { ApplicationContext } from "./ApplicationContext";
import { useContext } from "react";


const SignIn = () => {
   const { SetIsLoggedIn, setUsername } = useContext(ApplicationContext);
    const logIn = async (ev) => {
      //authentication
      ev.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      const result = await fetch("https://steamfinderapp2.herokuapp.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }).then((res) => res.json());

      //error alert
      if (result.status === "ok") {
        console.log('Got the token: ', result.data);
        alert("logged in");

        console.log(username);
        //set a global state logged in to true and showcase steamFinder games
        setUsername(username);
        SetIsLoggedIn(true);
        
        //redirect to main page
        window.location.href = "/";

        
        
      } else {
        alert(result.error);
      }
    };

    

    return(
        <Wrapper>
            <Form>
                <h1>Sign In</h1>
                <input type="text" autoComplete="off" id="username" placeholder="Username"/>
                <input type="password"  autoComplete="off"  id="password" placeholder="Password"/>
                <button onClick={logIn}>Log In</button>
            </Form>
        </Wrapper>
    )
};

const Wrapper = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1E1E1E;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: space-evenly;
    align-items: center;
    height: 60%;
    width: 90%;

    h1{
        color: lightblue;
        font-size: 3rem;
    }
    input{
        width: 20%;
        height: 10%;
        margin: 1rem;
        border-radius: 5px;
        &::placeholder{
            color: black;
        }
        border: 1px solid gray;
        &:focus{
            outline: none;
            border-color: lightblue;
            box-shadow: 0 0 15px #719ECE;
        }
    }

    button{
        background-color: lightblue;
        width: 20%;
        height: 10%;
        margin: 1.5rem;
        border: none;
        color: white;
        font-size: 1rem;
        border-radius: 5px;
        transition-timing-function: ease-in;
        transition: 0.2s;
        &:hover{
            transform: scale(1.2);
        }

    }

`;


export default SignIn;