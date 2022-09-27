# 1. naver-map API 정리
![image](https://user-images.githubusercontent.com/94040224/192460183-503f3b97-bd10-4de4-8c2f-24861ba4270c.png)
+ naver-map React Library
  + 해당 라이브러리를 쓸려면 react 버전이 맞아야 합니다.
    + npm ERR! peer react@"^0.14.0 || ^15.0.0-0 || ^16.0.0-0" from react-naver-maps@0.0.13
  + 하지만 저희가 쓰는 next버전(12.x.x)에는 맞는 react 버전이 없습니다.
    + npm ERR! peer react@"^17.0.2 || ^18.0.0-0" from next@12.2.5
+ Typescript 기반으로 프로젝트를 만들 예정으로 다음 dependency 추가
  + "@types/navermaps": "^3.0.17",
  
# 2. 구현기능
### 1. 클릭시 해당 위치로 마커이동 및 맵중앙정렬 
![Honeycam 2022-09-27 16-25-53](https://user-images.githubusercontent.com/94040224/192461799-79eaa18b-337e-431d-a503-539fbbb83420.gif)

### 2. 해당 위치 이동 및 위치 정보 infowindow
![Honeycam 2022-09-27 16-26-20](https://user-images.githubusercontent.com/94040224/192461869-4753ae94-dd23-4569-b722-d933f7758be5.gif)

### 3. 길찾기 API 및 polygon으로 지도에 선 그리기
![Honeycam 2022-09-27 16-25-33](https://user-images.githubusercontent.com/94040224/192461768-b258eb56-b391-4bc9-95c4-eb024f1ecd0e.gif)

# 3. 각 API 설명
+ Geocoding : 주소 텍스트 → 좌표(경위도) 및 상세정보 반환
  + "분당구 불정로 6" 와 같이 주소를 보내줘야 데이터를 받을 수 있습니다
  + 특정단어 같은 내용은 데이터를 받을 수 없습니다
+ ReverseGeocoding : 좌표(경위도) → 주소정보반환
  + 주소 정보 반환 ex) "서울시 분당구 불정로 6"
+ Direction5 : 최대 경유지 5개 경로 관련 정보제공
  + Direction15와 경유지15개 적용해주는 것 말고는 모든 옵션이 같습니다.
  + api로 경위도 데이터만 받아오기에 따로 지도 api polygon기능으로 경로를 그려줘야합니다
  
# 4. 시행착오
+ map 뿌려주는 div를 styled component로 하면 아마 mapAPI랑 충돌이 나는거 같습니다.
  + next는 scss module만 해당 파일에 적용 가능 그렇기에 id로 css 적용 힘듬 ( 애초에 리엑트는 id 사용 권장 X )
  + className을 따로 지정해서 css를 적용할 것
  + id 넣어주는 곳의 속성이 HTMLElement 이므로 id를 사용하기 싫다면 useRef를 사용해서 적용해도 됨.
  
# 5. 기타참조
1. naver-map 콘솔 : https://console.ncloud.com/naver-service/application
2. naver-map 요금정보 : https://www.ncloud.com/product/applicationService/maps
3. naver-map API docs : https://api.ncloud-docs.com/docs/ai-naver-mapsdirections-driving#OptionCode
4. naver-map typescript+nextjs 1 : https://velog.io/@silverbeen/Naver-Map-%EC%9E%90%EC%9C%A0%EB%A1%AD%EA%B2%8C-%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B0
5. naver-map typescript+nextjs 2 : https://dj-min43.medium.com/next-js%EC%97%90-%EB%84%A4%EC%9D%B4%EB%B2%84%EB%A7%B5-api-%EC%98%AC%EB%A6%AC%EA%B8%B0-8ee385cbf160
