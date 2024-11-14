import React from "react";

export const ItemList = ({ items }: { items: any[] }) => {
  return (
    <div className="p-1.5 justify-start items-start gap-[11px] inline-flex">
      {/*<div className="w-4 h-4 flex flex-col items-center gap-y-0.5">*/}
      {/*  <div>*/}
      {/*    <img className="w-[18px] min-w-[18px] h-[18px]" src={require('../../../../../assets/images/card-mana.png')} alt=""/>*/}
      {/*  </div>*/}
      {/*  <div className="text-center text-violet-100 text-xs font-light leading-3">1</div>*/}
      {/*</div>*/}
      <div className="w-4 h-4 flex flex-col items-center gap-y-0.5">
        <div>
          <img className="w-[18px] min-w-[18px] h-[18px]" src={require('../../../../../assets/images/mana-icon.png')} alt=""/>
        </div>
        <div className="text-center text-violet-100 text-xs font-light leading-3">2</div>
      </div>
      <div className="w-4 h-4 flex flex-col items-center gap-y-0.5">
        <div>
          <img className="w-[18px] min-w-[18px] h-[18px]" src={require('../../../../../assets/images/cards-icon.png')} alt=""/>
        </div>
        <div className="text-center text-violet-100 text-xs font-light leading-3">2</div>
      </div>
    </div>
  );
};



