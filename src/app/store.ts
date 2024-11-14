import {combineReducers, configureStore} from "@reduxjs/toolkit";
import currentBuildingReducer from "./features/buildingSlice";
import languageReducer from "./features/languageSlice";
import webSocketReducer from "./features/webSocketSlice";
import userIdReducer from "./features/userIdSlice";
import selectedRoomReducer from "./features/selectedRoom";
import tutorialSaveReducer from "./features/tutorialSaveSlice";
import dialoguesReducer from "./features/dialoguesSlice";
import islandsReducer from "./features/islandsSlice";
import resourcesReducer from "./features/resourcesSlice";
import exchangeReducer from "./features/exchangeSlice";
import selectedIslandReducer from "./features/selectedIsland";
import selectedHeroReducer from "./features/selectedHero";
import inventoryReducer from "./features/inventorySlice";
import battleSaveReducer from "./features/battleSaveSlice";
import dungeonPropsReducer from "./features/dungeonPropsSlice";
import farmTutorialReducer from "./features/farmTutoralSlice";
import configReducer from "./features/configSlice";
import dungeonCompletedReducer from "./features/dungeonCompleted";
import heroReducer from "./features/heroSlice";
import questsReducer from "./features/questsSlice";
import settingsReducer from "./features/userSettings";
import appConfigReducer from "./features/appConfigSlice";
import heroesReducer from './features/heroesSlice'
import { persistReducer, persistStore, PersistConfig } from "redux-persist";
import storage from "redux-persist/es/storage/session";


// Настройки redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['islands','heroes', 'currentBuilding', 'selectedRoom', 'resources', 'language', 'dungeonProps', 'farmTutorial', 'config', 'dungeonCompleted', 'heroData',
    'quests', 'settings', 'appConfig', 'websocket', 'tutorialSave', 'dialogueInfo', 'exchange', 'selectedIsland', 'selectedHero', 'inventory', 'battleSave'],
};

// Корневой редьюсер
const rootReducer = combineReducers({
  islands: islandsReducer,
  currentBuilding: currentBuildingReducer,
  selectedRoom: selectedRoomReducer,
  resources: resourcesReducer,
  language: languageReducer,
  webSocket: webSocketReducer,
  userId: userIdReducer,
  tutorialSave: tutorialSaveReducer,
  dialogueInfo: dialoguesReducer,
  exchange: exchangeReducer,
  selectedIsland: selectedIslandReducer,
  selectedHero: selectedHeroReducer,
  inventory: inventoryReducer,
  battleSave: battleSaveReducer,
  dungeonProps: dungeonPropsReducer,
  farmTutorial: farmTutorialReducer,
  config: configReducer,
  dungeonCompleted: dungeonCompletedReducer,
  heroData: heroReducer,
  heroes: heroesReducer,
  quests: questsReducer,
  settings: settingsReducer,
  appConfig: appConfigReducer,
});

// Применяем persistReducer к rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Настройка store с persistedReducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// export const store = configureStore({
//   reducer: {
//     islands: islandsReducer,
//     currentBuilding: currentBuildingReducer,
//     selectedRoom: selectedRoomReducer,
//     resources: resourcesReducer,
//     language: languageReducer,
//     webSocket: webSocketReducer,
//     userId: userIdReducer,
//     tutorialSave: tutorialSaveReducer,
//     dialogueInfo: dialoguesReducer,
//     exchange: exchangeReducer,
//     selectedIsland: selectedIslandReducer,
//     selectedHero: selectedHeroReducer,
//     inventory: inventoryReducer,
//     battleSave: battleSaveReducer,
//     dungeonProps: dungeonPropsReducer,
//     farmTutorial: farmTutorialReducer,
//     config: configReducer,
//     dungeonCompleted: dungeonCompletedReducer,
//     heroData: heroReducer,
//     quests: questsReducer,
//     settings: settingsReducer,
//     appConfig: appConfigReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });
//
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
//export {store, persistor};
