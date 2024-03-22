import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import axios from "axios";
import sun from "../assets/images/sun.jpg";
import { IoWaterOutline } from "react-icons/io5";

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

  const getWeather = async (lat: number, lon: number) => {
    try {
      const weatherKey = process.env.REACT_APP_WEATHERKEY;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherKey}`
      );
      console.log("날씨 데이터:", response.data);
      setWeather(response.data);
      return response.data;

      // 날씨 아이콘을 불러오기
      const weatherIcon = response.data.weather[0].icon;
      const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
      console.log("날씨 아이콘 URL:", weatherIconUrl);

      // 여기서 날씨 아이콘을 사용하거나, 상태로 설정하거나, 렌더링에 적용할 수 있습니다.
      return { weatherData: response.data, weatherIconUrl };
    } catch (error) {
      console.error("날씨 데이터를 가져오는 데 실패했습니다.", error);
      throw error; // 에러를 호출자에게 전파할 수도 있습니다.
    }
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
              <HumidityContainer>
                <IoWaterOutline
                  style={{
                    color: "white",
                    width: "20px",
                    height: "20px",
                    marginRight: "5px",
                  }}
                />
                <Humidity>{weather.main.humidity}%</Humidity>
              </HumidityContainer>
            </Wrapper>
          </>
        )}
        <DayOfWeatherContainer>
          {weather?.weather && (
            <IconContainer>
              <Icon
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt="Weather Icon"
              />
            </IconContainer>
          )}
          <DayWeather> 오늘 뭐 입을까?</DayWeather>
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

const HumidityContainer = styled.div`
  display: flex;
  align-items: center;
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
  opacity: 90%;
  border-radius: 20px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20%;
`;

const IconContainer = styled.div``;

const Icon = styled.img`
  width: 100px; /* 아이콘 크기에 따라 조절하세요 */
  height: 100px; /* 아이콘 크기에 따라 조절하세요 */
`;

const DayWeather = styled.div`
  font-family: "GongGothicMedium";
`;
export default MainPage;
