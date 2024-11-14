import React from "react";
import {PopupButton} from "../../../../../../components/PopupButton";

export const RecruitCardsModal = ({close}: { close: () => void }) => {
 return (
   <div className="z-20 absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.6)]">
     <div className="absolute w-[90%] left-[5%] right-[5%] top-16 bottom-16 bg-[#554837] border border-[#18191a] rounded-[2px] p-[2px]">
       <img src={require("../../../../../../assets/images/cards-modal-border.png")}
            className="absolute w-[17.5px] h-[21px] -top-[6px] -left-[5px]" alt="" />
       <img src={require("../../../../../../assets/images/cards-modal-border.png")}
            className="absolute w-[17.5px] h-[21px] -bottom-[6.5px] -left-[4.5px] -rotate-90" alt="" />
       <img src={require("../../../../../../assets/images/cards-modal-border.png")}
            className="absolute w-[17.5px] h-[21px] -bottom-[5.5px] -right-[4.5px] -rotate-180" alt="" />
       <button className="absolute z-10 w-7 h-7 -top-2 -right-2 flex items-center justify-center" onClick={close}>
         <img src={require("../../../../../../assets/images/shop-modal-close.png")} className="w-7 h-7" alt=""/>
       </button>
       <div
         className=" w-full h-full bg-[#242520] border border-[#18191a] rounded-[2px] p-3 shadow-inner-sm-white">
         <div className="absolute top-[-28px] left-0 right-0 flex justify-self-center">
           <div className="min-w-[120px] bg-[#847a70] border border-[#18191a] rounded-[2px] p-[1px] mx-auto">
             <div className="bg-[#351d1e] text-center text-white text-xl p-[7px] leading-none rounded-[1px]
                  border border-[#18191a] shadow-inner-sm-black uppercase">Missing items
             </div>
           </div>
         </div>
         <div
           className="relative w-full h-full bg-[#201b18] rounded-[1px] p-3 pt-7 shadow-inner-sm-black overflow-auto">
           <div className="flex items-center bg-[#242323] border-[1px] border-[#18191a] rounded-[4px] p-2 mb-2">
             <div
               className="w-[56px] h-[56px] bg-[#5c5040] border-[2px] border-black rounded-full p-[6px] shrink-0 mr-2">
               <div className="bg-[#312d27] border-[1px] border-black rounded-full w-full h-full p-[4px]">
                 <img src={require("../../../../../../assets/images/recruit-cards-item-1.png")}
                      className="w-full h-auto"
                      alt=""/>
               </div>
             </div>
             <div className="w-full">
               <div className={`text-stroke-small text-[14px] ${1 > 2 ? "text-white" : "text-[#676767]"}`}>Legendary
                 Recruitment
               </div>
               <div className="text-[#676767] text-[12px] leading-[1.2]">Owned: 6</div>
             </div>
             {1 > 2 ? (
               <div className="ml-2">
                 <PopupButton type="gold" width="auto">Buy</PopupButton>
               </div>
             ) : null}
           </div>
           <div className="flex items-center bg-[#473d37] border-[1px] border-[#18191a] rounded-[4px] p-2 mb-2">
             <div
               className="w-[56px] h-[56px] bg-[#5c5040] border-[2px] border-black rounded-full p-[6px] shrink-0 mr-2">
               <div className="bg-[#312d27] border-[1px] border-black rounded-full w-full h-full p-[4px]">
                 <img src={require("../../../../../../assets/images/recruit-cards-item-1.png")}
                      className="w-full h-auto"
                      alt=""/>
               </div>
             </div>
             <div className="w-full">
               <div className={`text-stroke-small text-[14px] ${1 < 2 ? "text-white" : "text-[#676767]"}`}>Legendary
                 Recruitment
               </div>
               <div className="text-[#DFD9C4] text-[12px] leading-[1.2]">Use Recruitment to get Heroes and Hero
                 Shards!
               </div>
             </div>
             {1 < 2 ? (
               <div className="ml-2">
                 <PopupButton type="gold" width="auto">Buy</PopupButton>
               </div>
             ) : null}
           </div>
           <div className="flex items-center bg-[#473d37] border-[1px] border-[#18191a] rounded-[4px] p-2 mb-2">
             <div
               className="w-[56px] h-[56px] bg-[#5c5040] border-[2px] border-black rounded-full p-[6px] shrink-0 mr-2">
               <div className="bg-[#312d27] border-[1px] border-black rounded-full w-full h-full p-[4px]">
                 <img src={require("../../../../../../assets/images/recruit-cards-item-1.png")}
                      className="w-full h-auto"
                      alt=""/>
               </div>
             </div>
             <div className="w-full">
               <div className={`text-stroke-small text-[14px] ${1 < 2 ? "text-white" : "text-[#676767]"}`}>Legendary
                 Recruitment
               </div>
               <div className="text-[#DFD9C4] text-[12px] leading-[1.2]">Use Recruitment to get Heroes and Hero
                 Shards!
               </div>
             </div>
             {1 > 2 ? (
               <div className="ml-2">
                 <PopupButton type="gold" width="auto">Buy</PopupButton>
               </div>
             ) : null}
           </div>
           <div className="flex items-center bg-[#473d37] border-[1px] border-[#18191a] rounded-[4px] p-2 mb-2">
             <div
               className="w-[56px] h-[56px] bg-[#5c5040] border-[2px] border-black rounded-full p-[6px] shrink-0 mr-2">
               <div className="bg-[#312d27] border-[1px] border-black rounded-full w-full h-full p-[4px]">
                 <img src={require("../../../../../../assets/images/recruit-cards-item-1.png")}
                      className="w-full h-auto"
                      alt=""/>
               </div>
             </div>
             <div className="w-full">
               <div className={`text-stroke-small text-[14px] ${1 < 2 ? "text-white" : "text-[#676767]"}`}>Legendary
                 Recruitment
               </div>
               <div className="text-[#DFD9C4] text-[12px] leading-[1.2]">Use Recruitment to get Heroes and Hero
                 Shards!
               </div>
             </div>
             {1 > 2 ? (
               <div className="ml-2">
                 <PopupButton type="gold" width="auto">Buy</PopupButton>
               </div>
             ) : null}
           </div>
           <div className="flex items-center bg-[#473d37] border-[1px] border-[#18191a] rounded-[4px] p-2 mb-2">
             <div
               className="w-[56px] h-[56px] bg-[#5c5040] border-[2px] border-black rounded-full p-[6px] shrink-0 mr-2">
               <div className="bg-[#312d27] border-[1px] border-black rounded-full w-full h-full p-[4px]">
                 <img src={require("../../../../../../assets/images/recruit-cards-item-1.png")}
                      className="w-full h-auto"
                      alt=""/>
               </div>
             </div>
             <div className="w-full">
               <div className={`text-stroke-small text-[14px] ${1 < 2 ? "text-white" : "text-[#676767]"}`}>Legendary
                 Recruitment
               </div>
               <div className="text-[#DFD9C4] text-[12px] leading-[1.2]">Use Recruitment to get Heroes and Hero
                 Shards!
               </div>
             </div>
             {1 > 2 ? (
               <div className="ml-2">
                 <PopupButton type="gold" width="auto">Buy</PopupButton>
               </div>
             ) : null}
           </div>
           <div className="flex items-center bg-[#473d37] border-[1px] border-[#18191a] rounded-[4px] p-2 mb-2">
             <div
               className="w-[56px] h-[56px] bg-[#5c5040] border-[2px] border-black rounded-full p-[6px] shrink-0 mr-2">
               <div className="bg-[#312d27] border-[1px] border-black rounded-full w-full h-full p-[4px]">
                 <img src={require("../../../../../../assets/images/recruit-cards-item-1.png")}
                      className="w-full h-auto"
                      alt=""/>
               </div>
             </div>
             <div className="w-full">
               <div className={`text-stroke-small text-[14px] ${1 < 2 ? "text-white" : "text-[#676767]"}`}>Legendary
                 Recruitment
               </div>
               <div className="text-[#DFD9C4] text-[12px] leading-[1.2]">Use Recruitment to get Heroes and Hero
                 Shards!
               </div>
             </div>
             {1 > 2 ? (
               <div className="ml-2">
                 <PopupButton type="gold" width="auto">Buy</PopupButton>
               </div>
             ) : null}
           </div>
         </div>
       </div>
     </div>
   </div>
 );
}
