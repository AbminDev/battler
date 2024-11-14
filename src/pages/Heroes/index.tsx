import { PopupButton } from "../../components/PopupButton";
import { HeroesList } from "../../containers";
import PageTransition from "../../containers/Router/components/PageTransition";
import { HandleBackButton } from "../../layout/components/HeaderCave/components";

export const Heroes = () => {
  const backgroundHeroes = require("../../assets/images/backgroundHeroes.jpg");
  return (
    <PageTransition>
      <main
        className={`w-full absolute min-h-full bg-[#201B18] left-0 top-0 flex flex-col overflow-hidden`}
        style={{
          background: `linear-gradient(to top, rgba(32, 27, 24, 1), rgba(32, 27, 24, 1), rgba(32, 27, 24, 1), rgba(32, 27, 24, 1), rgba(32, 27, 24, 0.4), rgba(32, 27, 24, 0.1), transparent), url(${backgroundHeroes}) no-repeat center/cover`,
        }}
      >
        <HeroesList/>
      </main>
    </PageTransition>
  );
};
