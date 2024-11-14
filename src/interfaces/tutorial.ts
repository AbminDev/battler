export interface TutorialSave {
  stage?: TutorialStage;
  enemyId?: number;
  dialogueId?: number;
  completed?: boolean;
}

export interface TutorialFarmSave {
  stage?: TutorialFarmStage;
  dialogueId?: number;
  completed?: boolean;
}

export enum TutorialStage {
  start,
  stone,
  stone2,
  torch,
  fire,
  amulet,
  battle,
  dungeon,
  dialogue1,
  dialogue2,
  dialogue3,
  finish,
}

export enum TutorialFarmStage {
  start,
  building,
  battle,
  endbattle,
  repair,
  startRepair,
  finishRepair,
  finishFirstBuilding,
  finishSecondBuilding,
  finish
}

export enum HeroList {
  hero1,
}
