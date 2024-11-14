import {ExecutionActionType, MakeAction, Opponent, Parameter} from "../endpoints/mock";

export function isAddEffectAction(action: MakeAction): action is {
  type: ExecutionActionType;
  effectUid: string;
  effectId: number;
  durationInRounds: number;
  target: Opponent;
} {
  return 'effectId' in action && 'effectUid' in action && 'durationInRounds' in action && 'target' in action;
}

export function isChangeParametersAction(action: MakeAction): action is {
  type: ExecutionActionType;
  target: Opponent;
  parameter: Parameter;
  value: number;
} {
  return 'parameter' in action && 'value' in action && 'target' in action;
}

export function isUpdateCardsAction(action: MakeAction): action is {
  type: ExecutionActionType;
  target: Opponent;
  cardIds: number[];
} {
  return 'cardIds' in action && 'target' in action;
}

export function isDiscardCardsAction(action: MakeAction): action is {
  type: ExecutionActionType;
  target: Opponent;
  cardIds: number[];
  value: number;
} {
  return 'cardIds' in action && 'target' in action && 'value' in action;
}

export function isShuffleCardsAction(action: MakeAction): action is {
  type: ExecutionActionType;
  target: Opponent;
  value: number;
} {
  return 'target' in action && 'value' in action;
}


