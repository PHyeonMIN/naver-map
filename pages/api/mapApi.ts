import axios from "axios";


export async function geocoding(query="분당구 불정로 6") {
    console.log(process.env.NEXT_PUBLIC_MAP_KEY);
    console.log(process.env.NEXT_PUBLIC_NAVER_CLIENT_ID);
    console.log(process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET);
    const location = await axios
        .get('/example/map-geocode/v2/geocode', {
            params: {
                query,
            },
            headers: {
                "X-NCP-APIGW-API-KEY-ID": `${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`,
                "X-NCP-APIGW-API-KEY": `${process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET}`,

            },
        })
        .then(res => {
            // TODO: check if response is ok
            console.log(res);
            return res.data;
        })
        .then(data => {
            if (data.addresses.length > 1) {
                console.log(`${query}에는 여러 주소가 있어요.`);
            } else if (data.addresses.length === 0) {
                console.log(`${query}에 해당되는 좌표가 없어요.`);
                return [-1, -1];
            }
            return [data.addresses[0].x, data.addresses[0].y];
        });
    console.log(location);
    return location;
}

export const reverseGeocoding = async () => {
    const localInfo = await axios
        .get('/example/map-reversegeocode/v2/gc', {
            params: {
                request: "coordsToaddr",
                coords: "126.8473066,35.1466323",   // 입력좌표
                sourcecrs: "epsg:4326",             // 입력좌표계코드(위경도좌표계)
                output: "json",
                orders: "legalcode,admcode"         // 변환작업 (좌표 to 법접동, 좌표 to 행정동)
            },
            headers: {
                "X-NCP-APIGW-API-KEY-ID": `${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`,
                "X-NCP-APIGW-API-KEY": `${process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET}`,
            },
        })
        .then(res => {
            // TODO: check if response is ok
            console.log(res);
            return res.data;
        });
    return localInfo;
}

export const direction5 = async () => {
    const localInfo = await axios
        .get('/example/map-direction/v1/driving', {
            params: {
                start: "126.8473066,35.1466323",
                goal: "126.8798817,35.1612826",
                option: "trafast"               // 탐색옵션
            },
            headers: {
                "X-NCP-APIGW-API-KEY-ID": `${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`,
                "X-NCP-APIGW-API-KEY": `${process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET}`,
            },
        })
        .then(res => {
            // TODO: check if response is ok
            console.log(res.data);
            return res.data;
        });
    return localInfo;
}

export const direction15 = async () => {
    const localInfo = await axios
        .get('/example/map-direction-15/v1/driving', {
            params: {
                start: "출발지",
                goal: "목적지",
                option: "탐색옵션"
            },
            headers: {
                "X-NCP-APIGW-API-KEY-ID": `${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`,
                "X-NCP-APIGW-API-KEY": `${process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET}`,
            },
        })
        .then(res => {
            // TODO: check if response is ok
            console.log(res);
            return res.data;
        });
}

// 김대중컨벤션센터 : 126.8409538,35.1468849
// 여보야 : 126.8473066,35.1466323
// 유스퀘어 : 126.8798817,35.1612826
// 문화의 전당 : 126.9202542,35.1467193
