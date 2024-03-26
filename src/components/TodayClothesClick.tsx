import React from "react";
import styled from "styled-components";
import axios from "axios";

const TodayClothesClick = ({
  weather,
  currentTemperature,
  setGptResMsg,
}: any) => {
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
    <div>
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
    </div>
  );
};

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
export default TodayClothesClick;
