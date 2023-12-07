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

type MatchWithTeams = {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam: {
    teamName: string;
  },
  awayTeam: {
    teamName: string;
  }
};

export default IMatches;
export {
  UpdateMatch,
  UpdateTeamsGoals,
  UpdateMatchInProgress,
  MatchWithTeams,
};
