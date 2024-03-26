import React, { useState } from "react";
import styled from "styled-components";
import { IoWaterOutline } from "react-icons/io5";

const CurrentTemp = ({ weather }: any) => {
  return (
    <div>
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
    </div>
  );
};

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
export default CurrentTemp;
