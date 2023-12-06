type IMatches = {
  id: number,
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
};

type UpdateTeamsGoals = {
  homeTeamGoals: number;
  awayTeamGoals: number;
};

type UpdateMatchInProgress = {
  inProgress: boolean;
};

type UpdateMatch = UpdateTeamsGoals | UpdateMatchInProgress;

export default IMatches;
export {
  UpdateMatch,
  UpdateTeamsGoals,
  UpdateMatchInProgress,
};
