import React from "react";
import { Link } from 'react-router-dom'
import styled from "styled-components";

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`
const Home = () => {
  return (
    <HomeWrapper>
      <h1>Пройдите тестирование!</h1>
      <Link to="/test"><button type="button" className="btn btn-primary btn-lg">Начать тест</button></Link>
    </HomeWrapper>
  );
}

export default Home;