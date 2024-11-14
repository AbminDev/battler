import { MutableRefObject } from "react";
import { ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import { Island } from "../Island";
import { IslandConfig } from "../../../interfaces/farm";


export const RenderIslands = (props: {islands: IslandConfig[], zoomRef: MutableRefObject<ReactZoomPanPinchRef | null>}) => {
    const { islands, zoomRef } = props;
  {/*//@ts-ignore*/}
    let islandsArray = [];

    islands.forEach((island, index) => {
      islandsArray.push(
        <div key={island.id} className="w-full flex justify-end items-end py-8">
          <Island zoomRef={zoomRef} island={island}/>
          {!index && <div className="absolute flex flex-row left-[45%]">
              <img src={require('../../../assets/images/stair.png')} className="w-[40px] h-[30px] grayscale-[100%]" style={{marginTop: index % 2 === 0 ? -40 : 40}}/>
              <img src={require('../../../assets/images/stair.png')} className="w-[40px] h-[30px] grayscale-[100%]" style={{marginTop: index % 2 === 0 ? -20 : 20}}/>
              <img src={require('../../../assets/images/stair.png')} className="w-[40px] h-[30px] grayscale-[100%]"/>
          </div>}
        </div>
      )
    })

    // for (let index = 0; index < islands.length; index++) {
    //     islandsArray.push(
    //         <div key={islands[index].id} className="w-full flex justify-end items-end py-8">
    //             <Island zoomRef={zoomRef} island={islands[index]}/>
    //             {index !== 0 && <div className="absolute flex flex-row left-[45%]">
    //                 <img src={require('../../../assets/images/stair.png')} className="w-[40px] h-[30px] grayscale-[100%]" style={{marginTop: index % 2 === 0 ? -40 : 40}}/>
    //                 <img src={require('../../../assets/images/stair.png')} className="w-[40px] h-[30px] grayscale-[100%]" style={{marginTop: index % 2 === 0 ? -20 : 20}}/>
    //                 <img src={require('../../../assets/images/stair.png')} className="w-[40px] h-[30px] grayscale-[100%]"/>
    //             </div>}
    //         </div>
    //     )
    // }

    return (
        <div className="w-full h-full flex flex-row">
            <div className="w-[50%] h-full flex flex-col gap-10 justify-center items-center">
              {/*//@ts-ignore*/}
                {islandsArray.filter((item, index) => index % 2 === 0).reverse()}
            </div>
            <div className="w-[50%] h-full flex flex-col gap-10 justify-center items-center">
              {/*//@ts-ignore*/}
                {islandsArray.filter((item, index) => index % 2 === 1).reverse()}
            </div>
        </div>
    )
};
