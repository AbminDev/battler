import {BattleSaves} from "../endpoints/mock";
import {store} from "../app/store";
import {setBattleSave} from "../app/features/battleSaveSlice";
import {updateBattleProgress} from "../endpoints/battleProgress";

export const updateBattleSave = async ({save, clientId}: {save: BattleSaves, clientId: string}) => {
   store.dispatch(setBattleSave(save));
};
