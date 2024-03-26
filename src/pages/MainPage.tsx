import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import sun from "../assets/images/sun.jpg";
import ChatGptApi from "../components/ChatGptApi";
import CurrentTemp from "../components/CurrentTemp";
import TodayClothesClick from "../components/TodayClothesClick";

const queryClient = new QueryClient();

const MainPage = () => {
  const [weather, setWeather] = useState<any>(null);
  const [currentTemperature, setCurrentTemperature] = useState<number | null>(
    null
  );
  const [gptResMsg, setGptResMsg] = useState<string | undefined>();

  const getCurrentLocation = () => {
    // 현재 위치 가져오기
    navigator.geolocation.getCurrentPosition(async (position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      // console.log("현재 위치", lat, lon);
      const weatherData = await getWeather(lat, lon);
      setCurrentTemperature(Math.round(weatherData.main.temp - 273.15));
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
      // console.log("날씨 데이터:", response.data);
      setWeather(response.data);
      return response.data;
    } catch (error) {
      // console.error("날씨 데이터를 가져오는 데 실패했습니다.", error);
      throw error;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <CenteredContent>
        <MainPageContainer>
          <CurrentTemp weather={weather} />
          <TodayClothesClick
            weather={weather}
            currentTemperature={currentTemperature}
            setGptResMsg={setGptResMsg}
          />
          <ChatGptApi gptResMsg={gptResMsg} />
        </MainPageContainer>
      </CenteredContent>
    </QueryClientProvider>
  );
};

const CenteredContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const MainPageContainer = styled.div`
  width: 500px;
  margin: 0 auto;
  background-image: url(${sun});
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 70%;
  padding-bottom: 40px;
  box-shadow: 5px 5px 5px gray;
`;

export default MainPage;
