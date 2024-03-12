import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import axios from "axios";
import sun from "../assets/images/sun.jpg";

// 전역으로 QueryClient 객체 생성
const queryClient = new QueryClient();

const MainPage = () => {
  const [weather, setWeather] = useState<any>(null);

  const getCurrentLocation = () => {
    // 현재 위치 가져오기
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log("현재 위치", lat, lon);
      getWeather(lat, lon);
    });
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getWeather = async (lat: any, lon: any) => {
    const weatherKey = process.env.REACT_APP_WEATHERKEY;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherKey}`
    );
    console.log("날씨 데이터:", response.data);
    setWeather(response.data);
    return response.data;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <MainPageContainer>
        {weather && (
          <>
            <Location>{weather.name}</Location>
            <Temperature>{Math.round(weather.main.temp - 273.15)}°</Temperature>
            <Wrapper>
              <TemperatureContainer>
                <MTemp>
                  최고 : {Math.round(weather.main.temp_max - 273.15)}°
                </MTemp>
                <MTemp>
                  최저 : {Math.round(weather.main.temp_min - 273.15)}°
                </MTemp>
              </TemperatureContainer>
              {/* <img src={rainy} alt="" /> */}
              <Humidity>{weather.main.humidity}%</Humidity>
            </Wrapper>
          </>
        )}
        <DayOfWeatherContainer>
          <DayWeather>
            월<div>{}</div>
          </DayWeather>
          <DayWeather>
            화<div>{/* 날씨 데이터 적용 */}</div>
          </DayWeather>
          <DayWeather>
            수<div>{/* 날씨 데이터 적용 */}</div>
          </DayWeather>
        </DayOfWeatherContainer>
      </MainPageContainer>
    </QueryClientProvider>
  );
};

const MainPageContainer = styled.div`
  width: 500px;
  height: 100vh;
  border: 1px solid black;
  margin: 0 auto;
  background-image: url(${sun});
  opacity: 70%;
`;

const Location = styled.div`
  font-family: "GongGothicMedium";
  font-size: 25px;
  display: flex;
  left: 0;
  margin: 25px;
  color: white;
`;

const Temperature = styled.div`
  font-family: "GongGothicMedium";
  font-size: 50px;
  display: flex;
  left: 0;
  margin: 25px;
  color: white;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 25px;
`;
const TemperatureContainer = styled.div`
  display: flex;

  color: #e4e4e4;
`;

const MTemp = styled.div`
  font-family: "GongGothicMedium";
  font-size: 20px;
`;

const Humidity = styled.div`
  font-family: "GongGothicMedium";
  font-size: 20px;
  color: #e4e4e4;
`;

const DayOfWeatherContainer = styled.div`
  width: 450px;
  height: 200px;
  background-color: #e4e4e4;
  opacity: 80%;
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
