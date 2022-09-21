import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {direction5} from "./api/mapApi";

function useMap() {
    /**
     * 내 위치 추적
     */
    const [myLocation, setMyLocation] = useState<
        { latitude: number; longitude: number } | string
        >({latitude: 0, longitude: 0});

    useEffect(() => {
        // geolocation 이용 현재 위치 확인, 위치 미동의 시 기본 위치로 지정
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setMyLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            });
        } else {
            window.alert('현재 위치를 알 수 없어 기본 위치로 지정합니다.');
            setMyLocation({ latitude: 37.4862618, longitude: 127.1222903 });
        }
    }, []);


    /**
     * 지도 생성
     */
    const mapRef = useRef<HTMLElement | null | any>(null);
    useEffect(() => {
        // 현재 위치 추적
        // let currentPosition = [myLocation.latitude, myLocation.longitude];

        // Naver Map 생성
        mapRef.current = new naver.maps.Map('map', {
            // center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
            center: new naver.maps.LatLng(37.359708, 127.1058342),
            zoomControl: true,
        });
        console.log(mapRef.current);
    }, []);

    /**
     * 마커 하나
     */
    const markerRef = useRef<any | null>(null);
    useEffect(() => {
        if(mapRef.current) {
            markerRef.current = new naver.maps.Marker({
                // position: new naver.maps.LatLng(35.1466579, 126.8472963),
                position: new naver.maps.LatLng(37.359708, 127.1058342),
                map: mapRef.current,
            });
            markerClickEvent(markerRef.current);
        }
        console.log(markerRef.current);
    }, [mapRef])


    // /**
    //  * 마커 여러개
    //  */
    // data?.map((item: ShopsListType) => {
    //     markerRef.current = new naver.maps.Marker({
    //         position: new naver.maps.LatLng(item?.map_y_location, item?.map_x_location),
    //         map: mapRef.current,
    //     });
    // });

    /**
     * 마커 클릭 이벤트
     */
    const markerClickEvent = (marker: any) => {
        naver.maps.Event.addListener(marker, 'click', (e: any) => {
            // const mapLatLng = new naver.maps.LatLng(
            //     Number(item?.map_y_location),
            //     Number(item?.map_x_location)
            // );
            const mapLatLng = new naver.maps.LatLng(35.1466579, 126.8472963);

            // 선택한 마커로 부드럽게 이동합니다.
            mapRef.current.panTo(mapLatLng, e?.coord);
        });
    }

    /**
     * 지도에서 경로 찍기
     */
    const [routeList,setRouteList] = useState<any[]>([]);
    const test: any[] = [];
    const route = async () => {
        const res = await direction5();
        const list1 = [];
        list1.push(...[res.route.trafast[0].summary.start.location]);
        list1.push(...res.route.trafast[0].path);
        list1.push(...[res.route.trafast[0].summary.goal.location]);

        list1.map((info) => {
            test.push(new naver.maps.LatLng(info[1],info[0]));
        });
        setRouteList(test);
    }



    const polylineRef = useRef<any | null>(null);
    useEffect(() => {
        if(mapRef.current) {
            polylineRef.current = new naver.maps.Polyline({
                path: routeList,
                strokeColor: '#FF0000', //선 색 빨강 #빨강,초록,파랑
                strokeOpacity: 0.8, //선 투명도 0 ~ 1
                strokeWeight: 6,   //선 두께
                map: mapRef.current,
            });
        }
        console.log(polylineRef.current);
    }, [mapRef,routeList])


    return (
        <>
            <div id="map" style={{width:'800px', height:'800px'}}/>
            <button onClick={route}>길찾기</button>
        </>
    );
}
export default useMap;

