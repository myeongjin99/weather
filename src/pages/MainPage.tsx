import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import sun from "../assets/images/sun.jpg";
import ChatGptApi from "../components/ChatGptApi";
import CurrentTemp from "../components/CurrentTemp";

// 전역으로 QueryClient 객체 생성
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

  const fetchResponse = async () => {
    try {
      const apiKey = process.env.REACT_APP_CHATGPT_KEY;

      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `기온이 ${currentTemperature}도인 상태에서 입고나가기 좋은 옷 종류를 모자, 상의, 하의, 신발 순으로 4개만 한국말로 배열에 담아서 보내줘.`, // Replace with your starting message
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      // console.log("gpt 응답값", res.data.choices[0].message.content);
      setGptResMsg(res.data.choices[0].message.content.split(","));
    } catch (error) {
      // console.log(error, "에러");
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <CenteredContent>
        <MainPageContainer>
          <CurrentTemp weather={weather} />
          <DayOfWeatherContainer>
            {weather?.weather && (
              <IconContainer>
                <Icon
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  alt="Weather Icon"
                />
              </IconContainer>
            )}
            <TodayClothes onClick={fetchResponse}>
              오늘 <LargeText>뭐</LargeText> 입을까?
            </TodayClothes>
          </DayOfWeatherContainer>
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
  border: 1px solid black;
  margin: 0 auto;
  background-image: url(${sun});
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 70%;
  padding-bottom: 40px;
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
  flex-direction: column;
`;

const IconContainer = styled.div``;

const Icon = styled.img`
  width: 100px;
  height: 100px;
`;

const TodayClothes = styled.div`
  font-family: "GongGothicMedium";
  font-size: 20px;
  cursor: pointer;
`;

const LargeText = styled.span`
  font-size: 30px;
`;
export default MainPage;
