import { Outlet, useLocation } from "react-router-dom";
import { Balance, Setting } from "../../containers";
import { Background } from "../../layout/components/Background";
import { TitleField } from "../../containers/Room";
import { HandleBackButton } from "../../layout/components/HeaderCave/components";
import { useTranslation } from "react-i18next";
import PageTransition from "../../containers/Router/components/PageTransition";

export const Profile = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const PAGES = [
    "/profile/language",
    "/profile/exchange",
    "/profile/delete-account",
  ];

  const isCurrentPageInArray = PAGES.some((page) =>
    location.pathname.includes(page)
  );

  return (
    <>
      <PageTransition>
        {!isCurrentPageInArray && (
          <>
            <div className="absolute pt-5 pl-5 z-10">
              <HandleBackButton />
            </div>
            <div className="p-4 bg-[#201B18] h-full">
              <TitleField title={t("profile.name")}/>

              <div className="overflow-auto h-full pb-10">
                <Balance/>
                <Setting/>
                <Outlet/>
              </div>
            </div>
          </>
        )}
        {isCurrentPageInArray && <Outlet />}
      </PageTransition>
    </>
  );
};
