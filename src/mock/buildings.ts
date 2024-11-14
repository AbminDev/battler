import { RoomStatus } from "../enums/buildingStatus";
import { Resources } from "../enums/resources";
import { RoomTypes } from "../enums/roomType";
import { BuildingConfig, Island, IslandConfig } from "../interfaces/farm";

export const farmRoomMock: Island[] = [
  {
    id: 1,
    buildings: [
      {
        id: 1,
        buildingId: 1,
        lvl: 1,
        status: RoomStatus.builded,
        statusUpdateDate: new Date(Date.now()),
        instabuild: false,
      },
      {
        id: 2,
        buildingId: 2,
        lvl: 1,
        status: RoomStatus.battle,
        statusUpdateDate: new Date(Date.now()),
        instabuild: false,
      },
    ],
  },
];

export const islandsConfigMock: IslandConfig[] = [
  {
    id: 1,
    title: "Start Island",
    scheme: [
      {
        id: 1,
        left: 325,
        width: 390,
        height: 300,
        top: 695, 
        buildingId: 1,
        zIndex: 20,
      },
      {
        id: 2,
        left: 530,
        width: 385,
        height: 320,
        top: 905,
        buildingId: 2, 
        zIndex: 40,
      },
      {
        id: 3,
        left: 155,
        width: 425,
        height: 320,
        top: 975,
        buildingId: 3,
        zIndex: 40,
      },
      {
        id: 4,
        left: -10,
        width: 400,
        height: 325,
        top: 680,
        buildingId: 4,
        zIndex: 30,
      },
      {
        id: 5,
        left: 50,
        width: 370,
        height: 320,
        top: 420,
        buildingId: 5,
        zIndex: 20,
      },
      {
        id: 6,
        left: 450,
        width: 400,
        height: 400,
        top: 325,
        buildingId: 6,
        zIndex: 20,
      },
      {
        id: 7,
        left: 650,
        width: 420,
        height: 370,
        top: 580,
        buildingId: 7,
        zIndex: 20,
      },
    ],
  },
  {
    id: 2,
    title: "Second Island",
    scheme: [
      {
        id: 1,
        left: 325,
        width: 380,
        height: 300,
        top: 778,
        buildingId: 1,
        zIndex: 0,
      },
      {
        id: 2,
        left: 500,
        width: 430,
        height: 480,
        top: 305,
        buildingId: 1,
        zIndex: 0,
      },
      {
        id: 3,
        left: 800,
        width: 224,
        height: 200,
        top: 710,
        buildingId: 2,
        zIndex: 0,
      },
      {
        id: 4,
        left: 640,
        width: 345,
        height: 510,
        top: 930,
        buildingId: 3,
        zIndex: 0,
      },
      {
        id: 5,
        left: 65,
        width: 420,
        height: 395,
        top: 1045,
        buildingId: 5,
        zIndex: 0,
      },
      {
        id: 6,
        left: 5,
        width: 280,
        height: 310,
        top: 800,
        buildingId: 6,
        zIndex: 0,
      },
      {
        id: 7,
        left: 20,
        width: 290,
        height: 310,
        top: 560,
        buildingId: 4,
        zIndex: 0,
      },
    ],
  },
  {
    id: 3,
    title: "Third Island",
    scheme: [
      {
        id: 1,
        left: 325,
        width: 380,
        height: 300,
        top: 778,
        buildingId: 1,
        zIndex: 0,
      },
      {
        id: 2,
        left: 500,
        width: 430,
        height: 480,
        top: 305,
        buildingId: 1,
        zIndex: 0,
      },
      {
        id: 3,
        left: 800,
        width: 224,
        height: 200,
        top: 710,
        buildingId: 2,
        zIndex: 0,
      },
      {
        id: 4,
        left: 640,
        width: 345,
        height: 410,
        top: 930,
        buildingId: 3,
        zIndex: 0,
      },
      {
        id: 5,
        left: 95,
        width: 420,
        height: 395,
        top: 1045,
        buildingId: 5,
        zIndex: 0,
      },
      {
        id: 6,
        left: 5,
        width: 280,
        height: 310,
        top: 800,
        buildingId: 6,
        zIndex: 0,
      },
      {
        id: 7,
        left: 20,
        width: 290,
        height: 310,
        top: 560,
        buildingId: 4,
        zIndex: 0,
      },
    ],
  },
];

// export const buildingConfigMock: BuildingConfig[] = [
//   {
//     id: 1,
//     title: "buildings.titles.shrine",
//     description: "buildings.descriptions.shrine",
//     maxCount: 1,
//     possibleSpots: [RoomTypes.square],
//     lvlInfo: [
//       {
//         lvl: 1,
//         createCost: 1000,
//         buildingTimeMs: 0,
//         upgradeData: [
//           {
//             title: "farm.upgrade.damage",
//             value: 200,
//           },
//           {
//             title: "farm.upgrade.hp",
//             value: 100,
//           },
//         ],
//       },
//       {
//         lvl: 2,
//         createCost: 2000,
//         buildingTimeMs: 2 * 60 * 60 * 1000,
//         condition: [],
//         upgradeData: [
//           {
//             title: "farm.upgrade.damage",
//             value: 400,
//           },
//           {
//             title: "farm.upgrade.hp",
//             value: 200,
//           },
//         ],
//       },
//       {
//         lvl: 3,
//         createCost: 3000,
//         buildingTimeMs: 20000,
//         condition: [
//           {
//             buildingId: 1,
//             neededLvl: 3,
//           },
//         ],
//       },
//       {
//         lvl: 4,
//         createCost: 4000,
//         buildingTimeMs: 8 * 60 * 60 * 1000,
//         condition: [],
//       },
//       {
//         lvl: 5,
//         createCost: 5000,
//         buildingTimeMs: 16 * 60 * 60 * 1000,
//         condition: [],
//       },
//       {
//         lvl: 6,
//         createCost: 6000,
//         buildingTimeMs: 24 * 60 * 60 * 1000,
//         condition: [],
//       },
//       {
//         lvl: 7,
//         createCost: 7000,
//         buildingTimeMs: 2 * 24 * 60 * 60 * 1000,
//         condition: [],
//       },
//       {
//         lvl: 8,
//         createCost: 8000,
//         buildingTimeMs: 3 * 24 * 60 * 60 * 1000,
//         condition: [],
//       },
//       {
//         lvl: 9,
//         createCost: 9000,
//         buildingTimeMs: 4 * 24 * 60 * 60 * 1000,
//         condition: [],
//       },
//       {
//         lvl: 10,
//         createCost: 10000,
//         buildingTimeMs: 5 * 24 * 60 * 60 * 1000,
//         condition: [],
//       },
//       {
//         lvl: 11,
//         createCost: 11000,
//         buildingTimeMs: 6 * 24 * 60 * 60 * 1000,
//         condition: [],
//       },
//       {
//         lvl: 12,
//         createCost: 12000,
//         buildingTimeMs: 7 * 24 * 60 * 60 * 1000,
//         condition: [],
//       },
//     ],
//   },

//   {
//     id: 2,
//     title: "buildings.titles.dwelling",
//     description: "buildings.descriptions.dwelling",
//     possibleSpots: [RoomTypes.vertical],
//     resourceType: Resources.experience,
//     lvlInfo: [
//       {
//         lvl: 1,
//         createCost: 500,
//         buildingTimeMs: 20000,
//         resourceAmount: 10,
//         upgradeData: [
//           {
//             title: "farm.upgrade.dwellers",
//             value: 10,
//           },
//         ],
//       },
//       {
//         lvl: 2,
//         createCost: 1000,
//         buildingTimeMs: 60 * 60 * 1000,
//         resourceAmount: 10,
//         upgradeData: [
//           {
//             title: "farm.upgrade.dwellers",
//             value: 20,
//           },
//         ],
//       },
//       {
//         lvl: 3,
//         createCost: 1500,
//         buildingTimeMs: 2 * 60 * 60 * 1000,
//         resourceAmount: 10,
//         upgradeData: [
//           {
//             title: "farm.upgrade.dwellers",
//             value: 30,
//           },
//         ],
//       },
//       {
//         lvl: 4,
//         createCost: 2000,
//         buildingTimeMs: 4 * 60 * 60 * 1000,
//         resourceAmount: 10,
//         condition: [
//           {
//             buildingId: 1,
//             neededLvl: 3,
//           },
//         ],
//       },
//       {
//         lvl: 5,
//         createCost: 2500,
//         buildingTimeMs: 8 * 60 * 60 * 1000,
//         resourceAmount: 10,
//         condition: [
//           {
//             buildingId: 1,
//             neededLvl: 3,
//           },
//         ],
//       },
//       {
//         lvl: 6,
//         createCost: 3000,
//         buildingTimeMs: 12 * 60 * 60 * 1000,
//         resourceAmount: 10,
//         condition: [
//           {
//             buildingId: 1,
//             neededLvl: 4,
//           },
//         ],
//       },
//       {
//         lvl: 7,
//         createCost: 3500,
//         buildingTimeMs: 16 * 60 * 60 * 1000,
//         resourceAmount: 10,
//         condition: [
//           {
//             buildingId: 1,
//             neededLvl: 5,
//           },
//         ],
//       },
//       {
//         lvl: 8,
//         createCost: 4000,
//         buildingTimeMs: 24 * 60 * 60 * 1000,
//         resourceAmount: 10,
//         condition: [
//           {
//             buildingId: 1,
//             neededLvl: 6,
//           },
//         ],
//       },
//       {
//         lvl: 9,
//         createCost: 4500,
//         buildingTimeMs: 2 * 24 * 60 * 60 * 1000,
//         resourceAmount: 10,
//         condition: [
//           {
//             buildingId: 1,
//             neededLvl: 7,
//           },
//         ],
//       },
//       {
//         lvl: 10,
//         createCost: 5000,
//         buildingTimeMs: 3 * 24 * 60 * 60 * 1000,
//         resourceAmount: 10,
//         condition: [
//           {
//             buildingId: 1,
//             neededLvl: 8,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 3,
//     title: "buildings.titles.arsenal",
//     description: "buildings.descriptions.arsenal",
//     maxCount: 1,
//     possibleSpots: [RoomTypes.square],
//     lvlInfo: [
//       {
//         lvl: 1,
//         createCost: 800,
//         buildingTimeMs: 30 * 60 * 1000,
//       },
//       {
//         lvl: 2,
//         createCost: 1600,
//         buildingTimeMs: 60 * 60 * 1000,
//       },
//       {
//         lvl: 3,
//         createCost: 2400,
//         buildingTimeMs: 2 * 60 * 60 * 1000,
//       },
//       {
//         lvl: 4,
//         createCost: 3200,
//         buildingTimeMs: 4 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 2,
//             neededLvl: 3,
//           },
//         ],
//       },
//       {
//         lvl: 5,
//         createCost: 4000,
//         buildingTimeMs: 8 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 1,
//             neededLvl: 4,
//           },
//         ],
//       },
//       {
//         lvl: 6,
//         createCost: 4800,
//         buildingTimeMs: 12 * 60 * 60 * 1000,
//       },
//       {
//         lvl: 7,
//         createCost: 5600,
//         buildingTimeMs: 16 * 60 * 60 * 1000,
//       },
//       {
//         lvl: 8,
//         createCost: 6400,
//         buildingTimeMs: 24 * 60 * 60 * 1000,
//       },
//       {
//         lvl: 9,
//         createCost: 7200,
//         buildingTimeMs: 2 * 24 * 60 * 60 * 1000,
//       },
//       {
//         lvl: 10,
//         createCost: 8000,
//         buildingTimeMs: 3 * 24 * 60 * 60 * 1000,
//       },
//     ],
//   },
//   {
//     id: 4,
//     title: "buildings.titles.farm",
//     description: "buildings.descriptions.farm",
//     resourceType: Resources.gold,
//     lvlInfo: [
//       {
//         lvl: 1,
//         createCost: 600,
//         buildingTimeMs: 30 * 60 * 1000,
//         resourceAmount: 5,
//         gatherDelayMs: 60 * 60 * 1000,
//         upgradeData: [
//           {
//             title: "farm.upgrade.food",
//             value: 5,
//           },
//         ],
//       },
//       {
//         lvl: 2,
//         createCost: 1200,
//         buildingTimeMs: 60 * 60 * 1000,
//         resourceAmount: 7,
//         gatherDelayMs: 2 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 3,
//             neededLvl: 3,
//           },
//         ],
//         upgradeData: [
//           {
//             title: "farm.upgrade.gold",
//             value: 7,
//           },
//         ],
//       },
//       {
//         lvl: 3,
//         createCost: 1800,
//         buildingTimeMs: 3 * 60 * 60 * 1000,
//         resourceAmount: 9,
//         gatherDelayMs: 3 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 4,
//             neededLvl: 4,
//           },
//         ],
//       },
//       {
//         lvl: 4,
//         createCost: 2400,
//         buildingTimeMs: 4 * 60 * 60 * 1000,
//         resourceAmount: 12,
//         gatherDelayMs: 4 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 1,
//             neededLvl: 2,
//           },
//         ],
//       },
//       {
//         lvl: 5,
//         createCost: 3000,
//         buildingTimeMs: 8 * 60 * 60 * 1000,
//         resourceAmount: 16,
//         gatherDelayMs: 5 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 1,
//             neededLvl: 3,
//           },
//         ],
//       },
//       {
//         lvl: 6,
//         createCost: 3600,
//         buildingTimeMs: 14 * 60 * 60 * 1000,
//         resourceAmount: 19,
//         gatherDelayMs: 6 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 1,
//             neededLvl: 4,
//           },
//         ],
//       },
//       {
//         lvl: 7,
//         createCost: 4200,
//         buildingTimeMs: 20 * 60 * 60 * 1000,
//         resourceAmount: 23,
//         gatherDelayMs: 7 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 1,
//             neededLvl: 5,
//           },
//         ],
//       },
//       {
//         lvl: 8,
//         createCost: 4800,
//         buildingTimeMs: 24 * 60 * 60 * 1000,
//         resourceAmount: 26,
//         gatherDelayMs: 8 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 1,
//             neededLvl: 6,
//           },
//         ],
//       },
//       {
//         lvl: 9,
//         createCost: 5400,
//         buildingTimeMs: 2 * 24 * 60 * 60 * 1000,
//         resourceAmount: 30,
//         gatherDelayMs: 9 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 3,
//             neededLvl: 8,
//           },
//           {
//             buildingId: 4,
//             neededLvl: 8,
//           },
//         ],
//       },
//       {
//         lvl: 10,
//         createCost: 6000,
//         buildingTimeMs: 3 * 24 * 60 * 60 * 1000,
//         resourceAmount: 35,
//         gatherDelayMs: 10 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 1,
//             neededLvl: 7,
//           },
//           {
//             buildingId: 3,
//             neededLvl: 9,
//           },
//           {
//             buildingId: 4,
//             neededLvl: 9,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 5,
//     title: "buildings.titles.tavern",
//     description: "buildings.descriptions.tavern",
//     lvlInfo: [
//       {
//         lvl: 1,
//         createCost: 600,
//         buildingTimeMs: 30 * 60 * 1000,
//         upgradeData: [
//           {
//             title: "farm.upgrade.tavern",
//             value: 5,
//           },
//         ],
//       },
//       {
//         lvl: 2,
//         createCost: 1200,
//         buildingTimeMs: 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 3,
//             neededLvl: 3,
//           },
//         ],
//         upgradeData: [
//           {
//             title: "farm.upgrade.gold",
//             value: 7,
//           },
//         ],
//       },
//       {
//         lvl: 3,
//         createCost: 1800,
//         buildingTimeMs: 3 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 4,
//             neededLvl: 4,
//           },
//         ],
//       },
//       {
//         lvl: 4,
//         createCost: 2400,
//         buildingTimeMs: 4 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 1,
//             neededLvl: 2,
//           },
//         ],
//       },
//       {
//         lvl: 5,
//         createCost: 3000,
//         buildingTimeMs: 8 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 1,
//             neededLvl: 3,
//           },
//         ],
//       },
//       {
//         lvl: 6,
//         createCost: 3600,
//         buildingTimeMs: 14 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 1,
//             neededLvl: 4,
//           },
//         ],
//       },
//       {
//         lvl: 7,
//         createCost: 4200,
//         buildingTimeMs: 20 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 1,
//             neededLvl: 5,
//           },
//         ],
//       },
//       {
//         lvl: 8,
//         createCost: 4800,
//         buildingTimeMs: 24 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 1,
//             neededLvl: 6,
//           },
//         ],
//       },
//       {
//         lvl: 9,
//         createCost: 5400,
//         buildingTimeMs: 2 * 24 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 3,
//             neededLvl: 8,
//           },
//           {
//             buildingId: 4,
//             neededLvl: 8,
//           },
//         ],
//       },
//       {
//         lvl: 10,
//         createCost: 6000,
//         buildingTimeMs: 3 * 24 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 1,
//             neededLvl: 7,
//           },
//           {
//             buildingId: 3,
//             neededLvl: 9,
//           },
//           {
//             buildingId: 4,
//             neededLvl: 9,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 6,
//     title: "buildings.titles.shrine",
//     description: "buildings.descriptions.shrine",
//     maxCount: 1,
//     possibleSpots: [RoomTypes.square],
//     lvlInfo: [
//       {
//         lvl: 1,
//         createCost: 1000,
//         buildingTimeMs: 0,
//         upgradeData: [
//           {
//             title: "farm.upgrade.damage",
//             value: 200,
//           },
//           {
//             title: "farm.upgrade.hp",
//             value: 100,
//           },
//         ],
//       },
//       {
//         lvl: 2,
//         createCost: 2000,
//         buildingTimeMs: 2 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 2,
//             neededLvl: 3,
//           },
//           {
//             buildingId: 3,
//             neededLvl: 3,
//           },
//           {
//             buildingId: 4,
//             neededLvl: 3,
//           },
//         ],
//         upgradeData: [
//           {
//             title: "farm.upgrade.damage",
//             value: 400,
//           },
//           {
//             title: "farm.upgrade.hp",
//             value: 200,
//           },
//         ],
//       },
//       {
//         lvl: 3,
//         createCost: 3000,
//         buildingTimeMs: 20000,
//         condition: [
//           {
//             buildingId: 2,
//             neededLvl: 4,
//           },
//           {
//             buildingId: 3,
//             neededLvl: 4,
//           },
//           {
//             buildingId: 4,
//             neededLvl: 4,
//           },
//         ],
//       },
//       {
//         lvl: 4,
//         createCost: 4000,
//         buildingTimeMs: 8 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 2,
//             neededLvl: 5,
//           },
//           {
//             buildingId: 3,
//             neededLvl: 5,
//           },
//           {
//             buildingId: 4,
//             neededLvl: 5,
//           },
//         ],
//       },
//       {
//         lvl: 5,
//         createCost: 5000,
//         buildingTimeMs: 16 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 2,
//             neededLvl: 6,
//           },
//           {
//             buildingId: 3,
//             neededLvl: 6,
//           },
//           {
//             buildingId: 4,
//             neededLvl: 6,
//           },
//         ],
//       },
//       {
//         lvl: 6,
//         createCost: 6000,
//         buildingTimeMs: 24 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 2,
//             neededLvl: 7,
//           },
//           {
//             buildingId: 3,
//             neededLvl: 7,
//           },
//           {
//             buildingId: 4,
//             neededLvl: 7,
//           },
//         ],
//       },
//       {
//         lvl: 7,
//         createCost: 7000,
//         buildingTimeMs: 2 * 24 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 2,
//             neededLvl: 9,
//           },
//           {
//             buildingId: 3,
//             neededLvl: 9,
//           },
//           {
//             buildingId: 4,
//             neededLvl: 9,
//           },
//         ],
//       },
//       {
//         lvl: 8,
//         createCost: 8000,
//         buildingTimeMs: 3 * 24 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 2,
//             neededLvl: 10,
//           },
//           {
//             buildingId: 3,
//             neededLvl: 10,
//           },
//           {
//             buildingId: 4,
//             neededLvl: 10,
//           },
//         ],
//       },
//       {
//         lvl: 9,
//         createCost: 9000,
//         buildingTimeMs: 4 * 24 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 2,
//             neededLvl: 11,
//           },
//           {
//             buildingId: 3,
//             neededLvl: 11,
//           },
//           {
//             buildingId: 4,
//             neededLvl: 11,
//           },
//         ],
//       },
//       {
//         lvl: 10,
//         createCost: 10000,
//         buildingTimeMs: 5 * 24 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 2,
//             neededLvl: 12,
//           },
//           {
//             buildingId: 3,
//             neededLvl: 12,
//           },
//           {
//             buildingId: 4,
//             neededLvl: 12,
//           },
//         ],
//       },
//       {
//         lvl: 11,
//         createCost: 11000,
//         buildingTimeMs: 6 * 24 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 2,
//             neededLvl: 13,
//           },
//           {
//             buildingId: 3,
//             neededLvl: 13,
//           },
//           {
//             buildingId: 4,
//             neededLvl: 13,
//           },
//         ],
//       },
//       {
//         lvl: 12,
//         createCost: 12000,
//         buildingTimeMs: 7 * 24 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 2,
//             neededLvl: 14,
//           },
//           {
//             buildingId: 3,
//             neededLvl: 14,
//           },
//           {
//             buildingId: 4,
//             neededLvl: 14,
//           },
//         ],
//       },
//     ],
//   },

//   {
//     id: 7,
//     title: "buildings.titles.mine",
//     description: "buildings.descriptions.mine",
//     resourceType: Resources.gold,
//     lvlInfo: [
//       {
//         lvl: 1,
//         createCost: 600,
//         buildingTimeMs: 30 * 60 * 1000,
//         resourceAmount: 5,
//         gatherDelayMs: 60 * 60 * 1000,
//         upgradeData: [
//           {
//             title: "farm.upgrade.gold",
//             value: 5,
//           },
//         ],
//       },
//       {
//         lvl: 2,
//         createCost: 1200,
//         buildingTimeMs: 60 * 60 * 1000,
//         resourceAmount: 7,
//         gatherDelayMs: 2 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 3,
//             neededLvl: 3,
//           },
//         ],
//         upgradeData: [
//           {
//             title: "farm.upgrade.gold",
//             value: 7,
//           },
//         ],
//       },
//       {
//         lvl: 3,
//         createCost: 1800,
//         buildingTimeMs: 3 * 60 * 60 * 1000,
//         resourceAmount: 9,
//         gatherDelayMs: 3 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 4,
//             neededLvl: 4,
//           },
//         ],
//       },
//       {
//         lvl: 4,
//         createCost: 2400,
//         buildingTimeMs: 4 * 60 * 60 * 1000,
//         resourceAmount: 12,
//         gatherDelayMs: 4 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 1,
//             neededLvl: 2,
//           },
//         ],
//       },
//       {
//         lvl: 5,
//         createCost: 3000,
//         buildingTimeMs: 8 * 60 * 60 * 1000,
//         resourceAmount: 16,
//         gatherDelayMs: 5 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 1,
//             neededLvl: 3,
//           },
//         ],
//       },
//       {
//         lvl: 6,
//         createCost: 3600,
//         buildingTimeMs: 14 * 60 * 60 * 1000,
//         resourceAmount: 19,
//         gatherDelayMs: 6 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 1,
//             neededLvl: 4,
//           },
//         ],
//       },
//       {
//         lvl: 7,
//         createCost: 4200,
//         buildingTimeMs: 20 * 60 * 60 * 1000,
//         resourceAmount: 23,
//         gatherDelayMs: 7 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 1,
//             neededLvl: 5,
//           },
//         ],
//       },
//       {
//         lvl: 8,
//         createCost: 4800,
//         buildingTimeMs: 24 * 60 * 60 * 1000,
//         resourceAmount: 26,
//         gatherDelayMs: 8 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 1,
//             neededLvl: 6,
//           },
//         ],
//       },
//       {
//         lvl: 9,
//         createCost: 5400,
//         buildingTimeMs: 2 * 24 * 60 * 60 * 1000,
//         resourceAmount: 30,
//         gatherDelayMs: 9 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 3,
//             neededLvl: 8,
//           },
//           {
//             buildingId: 4,
//             neededLvl: 8,
//           },
//         ],
//       },
//       {
//         lvl: 10,
//         createCost: 6000,
//         buildingTimeMs: 3 * 24 * 60 * 60 * 1000,
//         resourceAmount: 35,
//         gatherDelayMs: 10 * 60 * 60 * 1000,
//         condition: [
//           {
//             buildingId: 1,
//             neededLvl: 7,
//           },
//           {
//             buildingId: 3,
//             neededLvl: 9,
//           },
//           {
//             buildingId: 4,
//             neededLvl: 9,
//           },
//         ],
//       },
//     ],
//   },
// ];
