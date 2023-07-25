import React,{useContext} from "react";
import styled from "styled-components";
import { ResponsiveBar } from '@nivo/bar';
import { UserContext } from "../context/UserInfo";

const Container=styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
.nivoChart{
    width: 100%;
    height: 90%;
}
.cartCaption{
    width: 100%;
    margin: 0px 0 0 200px;
    font-size: 12px;
    /* border: 1px solid black; */
    
}
`


const SaleDate=()=>{
      //일자별 정보 얻기
    const context = useContext(UserContext);
    const {toDayBefore,oneDayBefore,twoDayBefore,threeDayBefore,
            fourDayBefore,fiveDayBefore,sixDayBefore} = context;
    const handle = {
        padClick: (data) => {
            console.log(data);
        },
        legendClick: (data) => {
            console.log(data);
        },
    };

    const currentDate = new Date();
    const DayOne = 24 * 60 * 60 * 1000; // 1일을 밀리초로 표현
    const todayBefore= new Date(currentDate.getTime());
    const oneDayBe= new Date(currentDate.getTime() - DayOne);
    const twoDayBe= new Date(currentDate.getTime() - DayOne * 2);
    const threeDayBe= new Date(currentDate.getTime() - DayOne * 3);
    const fourDayBe= new Date(currentDate.getTime() - DayOne * 4);
    const fiveDayBe= new Date(currentDate.getTime() - DayOne * 5);
    const sixDayBe = new Date(currentDate.getTime() - DayOne * 6);
     
    function formatDate(date) {
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${month}-${day}`;
    }
   
    const today=formatDate(todayBefore);
    const oneDay=formatDate(oneDayBe);
    const towDay=formatDate(twoDayBe);
    const threeDay=formatDate(threeDayBe);
    const fourDay=formatDate(fourDayBe);
    const fiveDay=formatDate(fiveDayBe);
    const sixDay=formatDate(sixDayBe);

    return (
        <Container>
            <div className="cartCaption">
            일주일 판매량(price : 10,000단위)    
            </div> 
            {/*  chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정 */}
        <div className="nivoChart">
        
            <ResponsiveBar
                /**
                 * chart에 사용될 데이터 price는 만원단위로 나눈다.
                 */
                data={[
                    { day: today, order: toDayBefore[0], price:toDayBefore[1]/10000},
                    { day: oneDay, order: oneDayBefore[0], price:oneDayBefore[1]/10000},
                    { day: towDay, order: twoDayBefore[0], price:twoDayBefore[1]/10000},
                    { day: threeDay, order: threeDayBefore[0], price:threeDayBefore[1]/10000},
                    { day: fourDay, order: fourDayBefore[0], price:fourDayBefore[1]/10000},                    
                    { day: fiveDay, order: fiveDayBefore[0], price:fiveDayBefore[1]/10000},                    
                    { day: sixDay, order: sixDayBefore[0], price:sixDayBefore[1]/10000},
                ]}
                /**
                 * chart에 보여질 데이터 key (측정되는 값)
                 */
                keys={['order','price']}

                groupMode="grouped"
                
                /**
                 * keys들을 그룹화하는 index key (분류하는 값)
                 */
                indexBy="day"
                /**
                 * chart margin
                 */
                margin={{ top: 50, right: 170, bottom: 100, left:170 }}
                /**
                 * chart padding (bar간 간격)
                 */
                padding={0.6}
                /**
                 * chart 색상
                 */
                colors={['black', 'gray', 'orange']} // 커스터하여 사용할 때
                // colors={{ scheme: 'nivo' }} // nivo에서 제공해주는 색상 조합 사용할 때
                /**
                 * color 적용 방식
                 */
                colorBy="id" // 색상을 keys 요소들에 각각 적용
                // colorBy="indexValue" // indexBy로 묵인 인덱스별로 각각 적용
                theme={{
                    /**
                     * label style (bar에 표현되는 글씨)
                     */
                    labels: {
                        text: {
                            fontSize: 12,
                            fill: '#ffffff',
                        },
                    },
                    /**
                     * legend style (default로 우측 하단에 있는 색상별 key 표시)
                     */
                    legends: {
                        text: {
                            fontSize: 12,
                            fill: '#000000',
                        },
                    },
                    axis: {
                        /**
                         * axis legend style (bottom, left에 있는 글씨)
                         */
                        legend: {
                            text: {
                                fontSize: 20,
                                fill: '#000000',
                            },
                        },
                        /**
                         * axis ticks style (bottom, left에 있는 값)
                         */
                        ticks: {
                            text: {
                                fontSize: 12,
                                fill: '#000000',
                            },
                        },
                    },
                }}
                /**
                 * axis bottom 설정
                 */
                axisBottom={{
                    tickSize: 5, // 값 설명하기 위해 튀어나오는 점 크기
                    tickPadding: 5, // tick padding
                    tickRotation: 0, // tick 기울기
                    legend: 'day', // bottom 글씨
                    legendPosition: 'middle', // 글씨 위치
                    legendOffset: 40, // 글씨와 chart간 간격
                }}
                /**
                 * axis left 설정
                 */
                axisLeft={{
                    tickSize: 5, // 값 설명하기 위해 튀어나오는 점 크기
                    tickPadding: 5, // tick padding
                    tickRotation: 0, // tick 기울기
                    legend: 'count', // left 글씨
                    legendPosition: 'middle', // 글씨 위치
                    legendOffset: -60, // 글씨와 chart간 간격
                }}

                INTERACTIVITY
                /**
                 * label 안보이게 할 기준 width
                 */
                labelSkipWidth={36}
                /**
                 * label 안보이게 할 기준 height
                 */
                labelSkipHeight={12}
                /**
                 * bar 클릭 이벤트
                 */
                onClick={handle.barClick}
                /**
                 * legend 설정 (default로 우측 하단에 있는 색상별 key 표시)
                 */
                legends={[
                    {
                        dataFrom: 'keys', // 보일 데이터 형태
                        anchor: 'bottom-right', // 위치
                        direction: 'column', // item 그려지는 방향
                        justify: false, // 글씨, 색상간 간격 justify 적용 여부
                        translateX: 120, // chart와 X 간격
                        translateY: 0, // chart와 Y 간격
                        itemsSpacing: 2, // item간 간격
                        itemWidth: 100, // item width
                        itemHeight: 20, // item height
                        itemDirection: 'left-to-right', // item 내부에 그려지는 방향
                        itemOpacity: 0.85, // item opacity
                        symbolSize: 20, // symbol (색상 표기) 크기
                        effects: [
                            {
                                // 추가 효과 설정 (hover하면 item opacity 1로 변경)
                                on: 'hover',
                                style: {
                                    itemOpacity: 1,
                                },
                            },
                        ],
                        onClick: handle.legendClick, // legend 클릭 이벤트
                    },
                ]}
            />
        </div>
        </Container>
    );
};

export default SaleDate;