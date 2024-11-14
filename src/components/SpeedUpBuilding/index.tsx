import { useTranslation } from "react-i18next";
import { UpgradeArrow } from "../../containers/Room";
import { LevelUpBanner } from "../LevelUp";
import { UpgradeDataRow } from "../PopupUpgradeTable";

import { RootState } from "../../app/store";

export const SpeedUpBuilding = ({
  upgradeData,
}: {
  upgradeData: UpgradeDataRow[];
}) => {
  const { t } = useTranslation();

  return <div>test</div>;
};
