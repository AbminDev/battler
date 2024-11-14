import React, { useEffect, useRef, useState } from "react";
import { Card } from "../../components/Card";
import { CardProps } from "../../interfaces/card";
import { useScroll } from "../../utils/ScrollContext";
import {PopupButton} from "../../components/PopupButton";
import { GoldIco } from "../../layout/components/HeaderFarm/components/ResourceCard";
import {buyCard, getShopItems, purchaseTelegram} from "../../endpoints/dungeonEndpoints";
import {useTelegram} from "../../hooks/useTelegram";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {useTranslation} from "react-i18next";
import {HandleBackButton} from "../../layout/components/HeaderCave/components";
import {TitleField} from "../../containers/Room";
import {useSoundService} from "../../utils/soundService";
import { getBalance } from "../../endpoints/farmMock";

export const Shop = ({gold, close}: {
  gold: number,
  close: () => void
}) => {
  const {t} = useTranslation();
  const {tg, userId} = useTelegram();
  const [activeTab, setActiveTab] = useState("kitsune");
  const [buyModalOpen, setBuyModal] = useState(false);
  const { setScrollable } = useScroll();
  const scrollableElRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchaseLoading, setIsPurchaseLoading] = useState(false);
  const [isSuccessPurchase, setIsSuccessPurchase] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState({} as any);
  const appConfig = useSelector((state: RootState) => state.appConfig.configs);
  const { playSound } = useSoundService();
  const { offers: { variables: allOffers } } = appConfig;

  useEffect(() => {
    setScrollable(true, scrollableElRef);

    return () => {
      setScrollable(false);
    };
  }, [setScrollable]);

  const buyModalHandler = (offerId: number) => {
    playSound('notification');

    const offer = allOffers.find((offer: any) => offer.offerId.value === offerId);

    if (offer) {
      setSelectedOffer(offer);
      setBuyModal(true);
    }
  }

  const telegramPurchaseHandler = async () => {
    setIsPurchaseLoading(true);
    playSound('button');
    const invoiceLink = await purchaseTelegram({
      offerId: selectedOffer.offerId.value,
      offerType: selectedOffer.offerType.value,
      title: selectedOffer?.title ?? selectedOffer.amount.value.toLocaleString()+' $KITSU',
      description: selectedOffer?.description ?? selectedOffer.amount.value.toLocaleString()+' $KITSU',
      label: selectedOffer?.title ?? selectedOffer.amount.value.toLocaleString()+' $KITSU'
    });

    tg.openInvoice(invoiceLink, (status: string|undefined) => {
      if (status === "paid") {
        setIsSuccessPurchase(true);
        setBuyModal(false);
      }

      setIsPurchaseLoading(false);
      setTimeout(async () => {
        await getBalance({clientId: `${userId}`})
        setIsSuccessPurchase(false);
      }, 1500);
    });
  }

  useEffect(() => {

  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <div className="z-40 absolute">
          <div className="w-full fixed top-0 left-0 bottom-0 right-0 z-5 flex items-center justify-center">
            <div className="w-full h-full absolute bg-black opacity-60"></div>
            <div className="relative w-full h-full bg-[#554837] border border-[#18191a] rounded-[2px] p-[2px]">
              <div
                className=" w-full h-full bg-[#242520] border border-[#18191a] rounded-[2px] p-3 shadow-inner-sm-white">
                <div
                  className="relative w-full h-full bg-[#201b18] rounded-[1px] p-3 shadow-inner-sm-black overflow-hidden">
                  {activeTab === "dailySale" && (
                    <div className={`absolute h-[400px] w-full bg-no-repeat top-0 left-0 bg-cover bg-top 
                      bg-[url('./assets/images/daily-sale-background.jpg')]`}></div>
                  )}
                  <div className="top-4 left-4 absolute z-[2]"><HandleBackButton onClick={close}/></div>
                  <div className="absolute top-3 left-0 right-0 flex justify-center">
                    <TitleField title={t('shop')}/>
                  </div>
                  <div className="text-white mt-14 relative w-full text-center flex justify-center items-center">
                    <div className="mr-2 text-[#a49a7c] inline-block font-[800] text-[16px]">Balance:</div>
                    <div className="bg-[#312d27] border border-[#18191a] inline-block px-3 py-1 rounded-[6px]">
                      <div className="flex">
                        <div className="flex justify-center items-center text-center mr-[4px]">
                          <img src={require("../../assets/images/kitsu-icon.png")} className="w-[20px] h-[20px]"
                               alt=""/>
                        </div>
                        {gold}
                      </div>
                    </div>
                  </div>
                  <div className="relative mt-4 flex justify-center gap-x-4 mb-4">
                    <button
                      className={`border border-[#18191a] bg-[#4c3f2f] shadow-inner-sm-white rounded-[2px] p-[1px]
                        ${activeTab !== "kitsune" ? "opacity-40" : ""}`}
                    >
                      <div
                        className="w-full h-full border border-[#272018] bg-[#4c3f2f] rounded-[1px] text-white text-sm leading-none p-3"
                        onClick={() => {
                          setActiveTab("kitsune");
                          if (activeTab !== "kitsune") {
                            playSound('button');
                          }
                        }}
                      >
                        KITSU
                      </div>
                    </button>
                    <button
                      className={`border border-[#18191a] bg-[#4c3f2f] shadow-inner-sm-white rounded-[2px] p-[1px]
                        ${activeTab !== "dailySale" ? "opacity-40" : ""}`}>
                      <div
                        className="w-full h-full border border-[#272018] bg-[#4c3f2f] rounded-[1px] text-white text-sm leading-none p-3"
                        onClick={() => {
                          // setActiveTab("dailySale")
                          // if (activeTab !== "dailySale") {
                          //   playSound('button');
                          // }
                        }}
                      >
                        Daily Sale
                      </div>
                    </button>
                    <button
                      className={`border border-[#18191a] bg-[#4c3f2f] shadow-inner-sm-white rounded-[2px] p-[1px]
                        ${activeTab !== "packStore" ? "opacity-40" : ""}`}>
                      <div
                        className="w-full h-full border border-[#272018] bg-[#4c3f2f] rounded-[1px] text-white text-sm leading-none p-3"
                        onClick={() => {
                          // setActiveTab("packStore");
                          // if (activeTab !== "packStore") {
                          //   playSound('button');
                          // }
                        }}
                      >
                        Pack Store
                      </div>
                    </button>
                  </div>
                  {activeTab === "kitsune" && (
                    <div className="grid grid-cols-2 gap-4 mb-3 text-white overflow-auto h-[calc(100%-166px)]">
                      {allOffers.filter((offer: any) => offer.offerType.value === 0).map((offer: any) => (
                        <div key={offer.offerId.value} className="bg-[#50493f] p-[3px] border-[black] border-[1px] rounded-[2px] max-h-[220px]"
                          onClick={() => buyModalHandler(offer.offerId.value)}>
                          <div className="bg-[#c3b996] h-full p-2 border-[black] border-[1px] rounded-[1px] text-center flex justify-center flex-wrap">
                            <img src={require(`../../assets/images/offers/offer-${offer.offerId.value}.png`)} className="transform scale-[0.67]"
                                 alt=""/>
                            <div className="bg-[#aca385] rounded-[2px] p-2 mt-1 w-full flex flex-wrap items-center">
                              <div className="flex justify-center items-center text-[#feee4a] text-stroke-regular
                                text-[20px] leading-[1] mb-1 w-full text-center font-[800]">
                                <div className="flex justify-center items-center text-center mr-[4px]">
                                  <img src={require("../../assets/images/kitsu-icon.png")} className="w-[20px] h-[20px]"
                                       alt=""/>
                                </div>
                                {offer?.amount?.value.toLocaleString()}
                              </div>
                              <div className="text-white text-stroke-regular text-[18px] leading-[1] w-full text-center font-[800]">
                                ${offer?.price?.value}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTab === "dailySale" && (
                    <div className="mb-3 text-white -mx-2 px-2 overflow-auto h-full">
                      <div className="relative h-[230px] mb-6">
                        <div className="flex items-center text-2xl z-[2] relative">
                          <img src={require("../../assets/images/info-icon.png")} className="w-6 h-6 mr-2" alt=""/>
                          Daily Sale
                        </div>
                        <div className="flex items-center ml-8 text-base z-[2] relative">
                          <img src={require("../../assets/images/times-icon.png")} className="w-4 h-4 mr-1" alt=""/>
                          16:06:12
                        </div>
                        <div className="absolute ml-8 bottom-[76px] left-0">
                          <img src={require("../../assets/images/daily-freebie-icon.png")} className="w-[66px] h-auto"
                               alt=""/>
                          <div
                            className="absolute whitespace-nowrap text-[14px] text-stroke-regular text-[#FFF3DB] -bottom-1">Daily
                            Freebie
                          </div>
                        </div>
                        <img src={require("../../assets/images/shop-hero-buy.png")}
                             className="absolute top-2 right-0 w-[190px] h-auto" alt=""/>
                        <div className="absolute right-1 bottom-[104px]">
                          <PopupButton type="blue" onClick={() => {
                          }} height="32px" width="32px">
                            <img src={require("../../assets/images/other-hero-btn-icon.png")}
                                 className="absolute bottom-0 right-0" alt=""/>
                          </PopupButton>
                        </div>
                        <div
                          className="absolute right-1 bottom-[62px] text-[28px] text-stroke-regular uppercase font-[600]">Hero
                          name
                        </div>
                        <div
                          className="absolute bottom-0 h-16 -left-3 -right-3 bg-gradient-to-r from-[#e4e081] to-[#fd9051] border-[1px] border-l-0 border-r-0 border-[#534037]">
                          <div className="flex h-full items-center justify-between">
                            <div className="w-[84px] min-w-[84px] text-center">
                              <img src={require("../../assets/images/shop-discount-flag.png")}
                                   className="absolute w-[96px] h-[46px] top-2" alt=""/>
                              <div className="text-stroke-regular z-[2] relative text-2xl uppercase">5765%</div>
                            </div>
                            <div className="ml-4 text-[#372C25] text-base leading-[1.2]">Bundle all packs for a
                              discount
                            </div>
                            <div className="mx-2 whitespace-nowrap">
                              <PopupButton type="gold" onClick={() => buyModalHandler(111)} width="auto">
                                <div
                                  className="text-stroke-regular relative text-[18px] text-[#54320E] mx-auto leading-[1]">
                                  <div className="relative z-[1] text-[13px]">7 USD</div>
                                  <div className="absolute top-0.5 mx-auto leading-[1] h-full w-full bg-[length:50px]
                                    bg-[url('./assets/images/crossed-out-old-price.png')] z-[2] bg-no-repeat bg-center">
                                  </div>
                                </div>
                                <div className="text-stroke-regular text-[18px] leading-[1]">4,99 USD</div>
                              </PopupButton>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-3 text-white overflow-auto h-[calc(100%-166px)]">

                        <div
                          className="w-full h-[200px] bg-[#50493f] border-[1px] border-black p-1 rounded-[2px] relative">
                          <div className="absolute top-0 right-0 bg-[url('./assets/images/daily-sale-label-sale.png')]
                            bg-no-repeat bg-contain bg-right-top w-[40px] h-[36px]"></div>
                          <div className="absolute top-[6px] right-[6px] text-[10px] font-[300] text-white rotate-[38deg]
                            text-center pl-[4px] leading-[1] z-[2]">55%
                          </div>
                          <div className="rounded-[1px] bg-[#c3b996] w-full h-full border-[1px] border-black p-2">
                            <div className="leading-[1] text-[14px] text-stroke-regular font-[600]">
                              <PopupButton type="gold" height="34px" onClick={() => buyModalHandler(111)}>
                                0,99 USD
                              </PopupButton>
                            </div>
                          </div>
                        </div>

                        <div
                          className="w-full h-[200px] bg-[#50493f] border-[1px] border-black p-1 rounded-[2px] relative">
                          <div className="absolute top-0 right-0 bg-[url('./assets/images/daily-sale-label-sale.png')]
                            bg-no-repeat bg-contain bg-right-top w-[40px] h-[36px]"></div>
                          <div
                            className="absolute top-[6px] right-[6px] text-[10px] font-[300] text-white rotate-[38deg]
                              text-center pl-[4px] leading-[1] z-[2]">55%
                          </div>
                          <div className="rounded-[1px] bg-[#a3886a] w-full h-full border-[1px] border-black p-2">
                            <div className="leading-[1] text-[14px] text-stroke-regular font-[600]">
                              <PopupButton type="gold" height="34px" onClick={() => buyModalHandler(111)}>
                                0,99 USD
                              </PopupButton>
                            </div>
                          </div>
                        </div>

                        <div
                          className="w-full h-[200px] bg-[#50493f] border-[1px] border-black p-1 rounded-[2px] relative">
                          <div className="absolute top-0 right-0 bg-[url('./assets/images/daily-sale-label-sale.png')]
                            bg-no-repeat bg-contain bg-right-top w-[40px] h-[36px]"></div>
                          <div
                            className="absolute top-[6px] right-[6px] text-[10px] font-[300] text-white rotate-[38deg]
                              text-center pl-[4px] leading-[1] z-[2]">55%
                          </div>
                          <div className="rounded-[1px] bg-[#a3886a] w-full h-full border-[1px] border-black p-2">
                            <div className="leading-[1] text-[14px] text-stroke-regular font-[600]">
                              <PopupButton type="gold" height="34px" onClick={() => buyModalHandler(111)}>
                                0,99 USD
                              </PopupButton>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}
                  {activeTab === "packStore" && (
                    <div className="overflow-auto h-[calc(100%-166px)]">
                      <div className="w-full h-[146px] bg-[#c8bb94] relative p-2 text-white rounded-[2px] border-[2px] mb-3
                        border-[#513f37] bg-[url('./assets/images/pack-store-offer-image.png')] bg-no-repeat bg-contain bg-right-top">
                        <div className="text-stroke-regular text-[18px] font-[600]">Daily Sale</div>
                        <img src={require("../../assets/images/shop-pack-store-line.png")} alt=""/>
                        <div className="flex items-center text-[14px] text-stroke-regular mb-2">
                          <img src={require("../../assets/images/times-icon.png")} className="w-[14px] h-[14px] mr-1"
                               alt=""/>
                          16:06:12
                        </div>
                        <div className="text-[#4A4432] text-[12px] leading-[1.2] max-w-[180px]">Lorem ipsum dolor sit
                          amet consectetur. Blandit in in placerat.
                        </div>
                        <div className="absolute bottom-2 right-2 text-[18px] font-[600] text-stroke-regular">
                          <PopupButton type="gold" onClick={() => buyModalHandler(111)} width="auto">
                            4,99 USD
                          </PopupButton>
                        </div>
                      </div>

                      <div className="w-full h-[146px] bg-[#c8bb94] relative p-2 text-white rounded-[2px] border-[2px] mb-3
                        border-[#513f37] bg-[url('./assets/images/pack-store-offer-image.png')] bg-no-repeat bg-contain bg-right-top">
                        <div className="text-stroke-regular text-[18px] font-[600]">Daily Sale</div>
                        <img src={require("../../assets/images/shop-pack-store-line.png")} alt=""/>
                        <div className="flex items-center text-[14px] text-stroke-regular mb-2">
                          <img src={require("../../assets/images/times-icon.png")} className="w-[14px] h-[14px] mr-1"
                               alt=""/>
                          16:06:12
                        </div>
                        <div className="text-[#4A4432] text-[12px] leading-[1.2] max-w-[180px]">Lorem ipsum dolor sit
                          amet consectetur. Blandit in in placerat.
                        </div>
                        <div className="absolute bottom-2 right-2 text-[18px] font-[600] text-stroke-regular">
                          <PopupButton type="gold" onClick={() => buyModalHandler(111)} width="auto">
                            4,99 USD
                          </PopupButton>
                        </div>
                      </div>

                      <div className="w-full h-[146px] bg-[#c8bb94] relative p-2 text-white rounded-[2px] border-[2px] mb-3
                        border-[#513f37] bg-[url('./assets/images/pack-store-offer-image.png')] bg-no-repeat bg-contain bg-right-top">
                        <div className="text-stroke-regular text-[18px] font-[600]">Daily Sale</div>
                        <img src={require("../../assets/images/shop-pack-store-line.png")} alt=""/>
                        <div className="flex items-center text-[14px] text-stroke-regular mb-2">
                          <img src={require("../../assets/images/times-icon.png")} className="w-[14px] h-[14px] mr-1"
                               alt=""/>
                          16:06:12
                        </div>
                        <div className="text-[#4A4432] text-[12px] leading-[1.2] max-w-[180px]">Lorem ipsum dolor sit
                          amet consectetur. Blandit in in placerat.
                        </div>
                        <div className="absolute bottom-2 right-2 text-[18px] font-[600] text-stroke-regular">
                          <PopupButton type="gold" onClick={() => buyModalHandler(111)} width="auto">
                            4,99 USD
                          </PopupButton>
                        </div>
                      </div>

                      <div className="w-full h-[146px] bg-[#c8bb94] relative p-2 text-white rounded-[2px] border-[2px]
                        border-[#513f37] bg-[url('./assets/images/pack-store-offer-image.png')] bg-no-repeat bg-contain bg-right-top">
                        <div className="text-stroke-regular text-[18px] font-[600]">Daily Sale</div>
                        <img src={require("../../assets/images/shop-pack-store-line.png")} alt=""/>
                        <div className="flex items-center text-[14px] text-stroke-regular mb-2">
                          <img src={require("../../assets/images/times-icon.png")} className="w-[14px] h-[14px] mr-1"
                               alt=""/>
                          16:06:12
                        </div>
                        <div className="text-[#4A4432] text-[12px] leading-[1.2] max-w-[180px]">Lorem ipsum dolor sit
                          amet consectetur. Blandit in in placerat.
                        </div>
                        <div className="absolute bottom-2 right-2 text-[18px] font-[600] text-stroke-regular">
                          <PopupButton type="gold" onClick={() => buyModalHandler(111)} width="auto">
                            4,99 USD
                          </PopupButton>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={`absolute z-10 bg-[#201f1e] w-full h-full duration-200
              ${buyModalOpen || isSuccessPurchase ? "visible opacity-85" : "invisible opacity-0"}
            `} onClick={() => {
              setBuyModal(false);
              setIsSuccessPurchase(false);
            }}></div>

            <div className={`absolute transform transition-transform duration-200 z-10 left-0 right-0 p-5 h-[282px] 
              -bottom-[282px] bg-no-repeat bg-[length:100%_100%] bg-[url('./assets/images/shop-buy-modal-background.png')]
              ${isSuccessPurchase ? "-translate-y-full" : "translate-y-0"}`}>
              <button className="absolute z-10 w-5 h-5 top-3.5 right-3.5 flex items-center justify-center"
                onClick={() => setIsSuccessPurchase(false)}>
                <img src={require("../../assets/images/shop-modal-close.png")} className="w-5 h-5" alt=""/>
              </button>
              <div className="text-[32px] mt-3 text-[#19191B] text-center">Purchase</div>
              <div className="text-stroke-regular text-[32px] text-white flex justify-center items-center mt-8">
                <img src={require("../../assets/images/kitsu-icon.png")} className="w-[32px] h-[32px] mr-1" alt=""/>
                <span className="font-[300]">Success!</span>
              </div>
              <div className="flex justify-center mt-6">
                <PopupButton type="green" width="180px" onClick={() => setIsSuccessPurchase(false)}>
                  <div className="flex items-center justify-center text-stroke-regular text-[20px]">
                    Close
                  </div>
                </PopupButton>
              </div>
            </div>

            <div className={`absolute transform transition-transform duration-200 z-10 left-0 right-0 p-5 h-[282px] 
              -bottom-[282px] bg-no-repeat bg-[length:100%_100%] bg-[url('./assets/images/shop-buy-modal-background.png')]
              ${buyModalOpen ? "-translate-y-full" : "translate-y-0"}`}>
              <button className="absolute z-10 w-5 h-5 top-3.5 right-3.5 flex items-center justify-center"
                onClick={() => setBuyModal(false)}>
                <img src={require("../../assets/images/shop-modal-close.png")} className="w-5 h-5" alt=""/>
              </button>
              <div className="text-[32px] mt-3 text-[#19191B] text-center">Purchase</div>
              {selectedOffer?.amount?.value && selectedOffer?.price?.value && (
                <div className="text-stroke-regular text-[32px] text-white flex justify-center items-center mt-8 font-[800]">
                  <img src={require("../../assets/images/kitsu-icon.png")} className="w-[32px] h-[32px] mr-1" alt=""/>
                  <span className="text-[#FFC923] pr-2">{selectedOffer.amount.value.toLocaleString()}</span>
                  <span className="font-[600]">= ${selectedOffer.price.value}</span>
                </div>
              )}
              <div className="flex justify-center mt-6">
                <PopupButton size="medium" type="green" width="200px" onClick={() => telegramPurchaseHandler()} disabled={isPurchaseLoading}>
                  <div className="flex items-center justify-center">
                    <img src={require("../../assets/images/telegram-stars-icon.png")} className="w-[20px] h-[20px] mr-1" alt=""/>
                    {selectedOffer?.stars?.value} Stars
                  </div>
                </PopupButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
