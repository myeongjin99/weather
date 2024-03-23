import React from "react";
import styled from "styled-components";
import { FaPerson } from "react-icons/fa6";

const ChatGptApi = ({ gptResMsg }: { gptResMsg: any }) => {
  const renderItems = () => {
    if (!gptResMsg || gptResMsg.length === 0) return null;

    return gptResMsg.map((item: string, index: number) => (
      <RecommendItem key={index}>{item.replace(/['\[\]]/g, "")}</RecommendItem>
    ));
  };

  return (
    <AiLayout>
      <FaPerson style={{ width: "230px", height: "230px" }} />
      <RecommendClothesContainer>{renderItems()}</RecommendClothesContainer>
    </AiLayout>
  );
};

const AiLayout = styled.article`
  width: 410px;
  background-color: #e4e4e4;
  opacity: 90%;
  border-radius: 20px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20%;
  margin-top: 40px;
  padding: 20px;
`;

const RecommendClothesContainer = styled.div`
  /* border: 1px solid black; */
  width: 200px;
`;

const RecommendItem = styled.div`
  font-family: "GongGothicMedium";
  font-size: 20px;
  margin-top: 30px;
`;
export default ChatGptApi;
