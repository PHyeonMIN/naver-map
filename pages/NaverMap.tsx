import {useEffect, useRef, useState} from 'react';
import {direction5, geocoding, reverseGeocoding} from "./api/mapApi";

function useMap() {
    /**
     * 내 위치 추적
     */
    // const [myLocation, setMyLocation] = useState<
    //     { latitude: number; longitude: number } | string
    //     >({latitude: 0, longitude: 0});
    //
    // useEffect(() => {
    //     // geolocation 이용 현재 위치 확인, 위치 미동의 시 기본 위치로 지정
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition((position) => {
    //             setMyLocation({
    //                 latitude: position.coords.latitude,
    //                 longitude: position.coords.longitude,
    //             });
    //         });
    //     } else {
    //         window.alert('현재 위치를 알 수 없어 기본 위치로 지정합니다.');
    //         setMyLocation({ latitude: 37.4862618, longitude: 127.1222903 });
    //     }
    // }, []);


    /**
     * 지도 생성
     */
    const mapRef = useRef<HTMLElement | null | any>(null);
    useEffect(() => {
        // 현재 위치 추적
        // let currentPosition = [myLocation.latitude, myLocation.longitude];

        // Naver Map 생성
        if(mapRef.current === null){
            mapRef.current = new naver.maps.Map('map', {
                // center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
                // center: new naver.maps.LatLng(37.359708, 127.1058342),
                center: new naver.maps.LatLng(35.1466323, 126.8473066),
                zoomControl: true,
            });
        }
        console.log(mapRef.current);
    }, []);

    /**
     * 마커 하나
     */
    const [markerList, setMarkerList] = useState<any[]>([]);
    const markerRef = useRef<any | null>(null);
    useEffect(() => {
        if(mapRef.current !== null && markerRef.current === null) {
            markerRef.current = new naver.maps.Marker({
                // position: new naver.maps.LatLng(37.359708, 127.1058342),
                position: new naver.maps.LatLng(35.1466579, 126.8472963),
                map: mapRef.current,
            });
            setMarkerList((prev) => [...prev,markerRef.current]);
            // markerClickEvent(markerRef.current);
        }

        console.log(markerRef.current);

    }, [])


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
            // const mapLatLng = new naver.maps.LatLng(35.1466579, 126.8472963);

            // 선택한 마커로 부드럽게 이동합니다.
            // mapRef.current.panTo(mapLatLng, e?.coord);
        });
    }

    /**
     * 지도에서 경로 찍기
     */
    const polylineRef = useRef<any | null>(null);
    const test: any[] = [];

    const route = async () => {
        if(infowindowRef.current !== null){
            if (infowindowRef.current.getMap()) {
                infowindowRef.current.close();
            }
        }
        markerList.map((data) => {
            data.setMap(null);
        })

        if(polylineRef.current !== null){
            polylineRef.current.setMap(null);
        }
        const res = await direction5();
        const list1 = [];
        list1.push(...[res.route.trafast[0].summary.start.location]);
        list1.push(...res.route.trafast[0].path);
        list1.push(...[res.route.trafast[0].summary.goal.location]);
        list1.map((info) => {
            test.push(new naver.maps.LatLng(info[1],info[0]));
        });

        markerRef.current = new naver.maps.Marker({
            position: test[0],
            map: mapRef.current,
        });
        setMarkerList((prev) => [...prev,markerRef.current]);
        markerRef.current = new naver.maps.Marker({
            position: test[test.length - 1],
            map: mapRef.current,
        });
        setMarkerList((prev) => [...prev,markerRef.current]);

        if(mapRef.current) {
            polylineRef.current = new naver.maps.Polyline({
                path: test,
                strokeColor: '#FF0000', //선 색 빨강 #빨강,초록,파랑
                strokeOpacity: 0.8, //선 투명도 0 ~ 1
                strokeWeight: 6,   //선 두께
                map: mapRef.current,
            });
        }
        const yeboya = new naver.maps.LatLng(35.1466323,126.8473066);
        mapRef.current.setCenter(yeboya);
        console.log(polylineRef.current);
    }


    const infowindowRef = useRef<any | null>(null);
    const geocodingEvent = async (event:any) => {
        event.preventDefault();
        if(infowindowRef.current !== null){
            if (infowindowRef.current.getMap()) {
                infowindowRef.current.close();
            }
        }
        markerList.map((data) => {
            data.setMap(null);
        });

        if(polylineRef.current !== null){
            polylineRef.current.setMap(null);
        }
        const res = await geocoding();
        const geoCenter = new naver.maps.LatLng(res[1],res[0]);
        mapRef.current.setCenter(geoCenter);
        markerRef.current = new naver.maps.Marker({
            position: geoCenter,
            map: mapRef.current,
        });
        setMarkerList((prev) => [...prev,markerRef.current]);
    }


    const reverseGeoEvent = async (event:any) => {
        event.preventDefault();
        console.log(infowindowRef);
        if(infowindowRef.current !== null){
            if (infowindowRef.current.getMap()) {
                infowindowRef.current.close();
            }
        }
        markerList.map((data) => {
            data.setMap(null);
        })
        if(polylineRef.current !== null){
            polylineRef.current.setMap(null);
        }
        const res = await reverseGeocoding();

        const reverseGoeCenter = new naver.maps.LatLng(35.1466323,126.8473066);
        mapRef.current.setCenter(reverseGoeCenter);
        markerRef.current = new naver.maps.Marker({
            position: reverseGoeCenter,
            map: mapRef.current,
        });
        setMarkerList((prev) => [...prev,markerRef.current]);
        // markerClickEvent(markerRef.current);

        let content: any = '';
        const reverseInfo = Object.values(res.results[0].region);

        reverseInfo.map((info:any) => {
            if(info.name === null || info.name === ''){
                return;
            }
            if(info.name){
                content = content + info.name + " ";
            }
        });
        infowindowRef.current = new naver.maps.InfoWindow({
            content: content
        });

        infowindowRef.current.open(mapRef.current, markerRef.current);

        naver.maps.Event.addListener(markerRef.current, "click", function(e) {
            if (infowindowRef.current.getMap()) {
                infowindowRef.current.close();
            } else {
                infowindowRef.current.open(mapRef.current, markerRef.current);
            }
        });
    }


    return (
        <>
            <div id="map" style={{width:'800px', height:'800px'}}/>
            <button onClick={route}>길찾기(direction5)</button>
            <button onClick={geocodingEvent}>geocoding</button>
            <button onClick={reverseGeoEvent}>reverseGeocoding</button>
        </>
    );
}
export default useMap;

