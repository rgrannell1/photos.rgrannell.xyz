/* Wildlife statistics and life-list models. */

export type SubjectStats = {
  wildSpecies: number;
  totalSpecies: number;
  irishWildSpecies: number;
};

export type NemesisSpecies = {
  speciesId: string;
  name: string;
};

export type ChecklistEntry = {
  speciesId: string;
  speciesType: string;
  name: string;
  firstSeen: string;
  isIrish: boolean;
  isWild: boolean;
  scarce: boolean;
  nemesis: boolean;
  target: boolean;
};
