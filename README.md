# WeatherWear

### 프로젝트 소개

날씨에 따라서 Chat GPT가 옷을 추천해주는 서비스입니다!
<br/>
<br/>

### 프로젝트 기간

- 2024.03.12 ~ 2024.03.25

<br/>

### 😎 Members
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/LOCA525"><img src="https://avatars.githubusercontent.com/u/98865366?v=4" width="50px;" alt=""/><br /><sub><b>FE 서명</b></sub></a><br /></td>
  </tbody>
</table>

### 🔥 Trouble Shooting

<details>
  <summary>
    Issue1 날씨 정보 실시간 업데이트 되지 않는 문제
  </summary>
  
  #### 문제 상황
  
- 페이지가 로드될 때 한 번만 현재 위치의 날씨 정보를 가져오고 있음
- 이로인해 페이지를 다시 로드하지 않는 이상 날씨 정보가 업데이트 되지 않음
  
  #### 개선방향
  
- setInterval 함수를 사용하여 일정 시간 간격으로 현재 위치의 날씨 정보를 업데이트하여 사용자에게 최신 정보를 제공
  
  #### 도입이유
  
- 날씨가 변할 수 있으니 계속해서 시간을 두고 업데이트 해주는게  필요하다고 생각함
  
  #### 개선결과
  
  - 사용자에게 실시간으로 최신 날씨 정보를 제공하여 항상 현재의 날씨를 파악할 수 있도록 도와줌
  
</details>
  
