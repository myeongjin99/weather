import React from "react";
import styled from "styled-components";

const MainPage = () => {
  return (
    <MainPageContainer>
      <Location>서울특별시</Location>
      <Temperature>7 °</Temperature>
      <Wrapper>
        <TemperatureContainer>
          <MTemp>최고 : 8°</MTemp>
          <MTemp>최저 : 7°</MTemp>
        </TemperatureContainer>
        <Humidity>42%</Humidity>
      </Wrapper>
      <DayOfWeatherContainer>
        <DayWeather>
          월<div>10° 0°</div>
        </DayWeather>
        <DayWeather>
          화<div>13° 4°</div>
        </DayWeather>
        <DayWeather>
          수<div>11° 2°</div>
        </DayWeather>
      </DayOfWeatherContainer>
    </MainPageContainer>
  );
};

const MainPageContainer = styled.div`
  width: 500px;
  height: 100vh;
  border: 1px solid black;
  margin: 0 auto;
`;

const Location = styled.div`
  font-family: "GongGothicMedium";
  font-size: 25px;
  display: flex;
  left: 0;
  margin: 25px;
`;

const Temperature = styled.div`
  font-family: "GongGothicMedium";
  font-size: 50px;
  display: flex;
  left: 0;
  margin: 25px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 25px;
`;
const TemperatureContainer = styled.div`
  display: flex;

  color: gray;
`;

const MTemp = styled.div`
  font-family: "GongGothicMedium";
  font-size: 20px;
`;

const Humidity = styled.div`
  font-family: "GongGothicMedium";
  font-size: 20px;
`;

const DayOfWeatherContainer = styled.div`
  width: 450px;
  height: 200px;
  border: 1px solid black;
  border-radius: 20px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20%;
`;

const DayWeather = styled.div`
  font-family: "GongGothicMedium";
`;
export default MainPage;
