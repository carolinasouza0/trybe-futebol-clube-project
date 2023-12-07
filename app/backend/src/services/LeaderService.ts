import { ILeaderboard, TeamGoals } from '../Interfaces/Leaderboard/ILeaderboard';
import { MatchWithTeams } from '../Interfaces/Match/IMatches';
import MatchModel from '../models/MatchModel';

export default class LeaderService {
  private model: MatchModel;

  constructor(model: MatchModel = new MatchModel()) {
    this.model = model;
  }

  private static calculateScore(
    match: MatchWithTeams,
    teamOne: TeamGoals,
    teamTwo: TeamGoals,
  ): { loss: number; win: number; tye: number; point: number } {
    const score = { loss: 0, win: 0, tye: 0, point: 0 };

    if (match[teamOne] === match[teamTwo]) {
      return { ...score, point: 1, tye: 1 };
    }

    if (match[teamOne] > match[teamTwo]) {
      return { ...score, point: 3, win: 1 };
    }

    return { ...score, loss: 1 };
  }

  private static createMatches(
    matches: MatchWithTeams[],
    teamOne: TeamGoals,
    teamTwo: TeamGoals,
  ): ILeaderboard[] {
    return matches.filter((game) => !game.inProgress)
      .map((game) => {
        const actualTeam = teamOne === 'homeTeamGoals' ? 'homeTeam' : 'awayTeam';
        const { point, loss, tye, win } = LeaderService.calculateScore(game, teamOne, teamTwo);
        return {
          name: game[actualTeam].teamName,
          totalPoints: point,
          totalVictories: win,
          totalDraws: tye,
          totalLosses: loss,
          goalsFavor: game[teamOne],
          goalsOwn: game[teamTwo],
        } as ILeaderboard;
      });
  }

  private static accMatches(matches: ILeaderboard[]): ILeaderboard[] {
    const leaderBoard: ILeaderboard[] = [];
    matches.forEach((game) => {
      const { name, totalPoints, totalVictories, totalDraws, totalLosses, goalsFavor,
        goalsOwn } = game;
      const index = leaderBoard.findIndex((accGame) => accGame.name === name);
      if (index === -1) return leaderBoard.push({ ...game, totalGames: 1 });
      leaderBoard[index].totalPoints += totalPoints;
      leaderBoard[index].totalGames += 1;
      leaderBoard[index].totalVictories += totalVictories;
      leaderBoard[index].totalDraws += totalDraws;
      leaderBoard[index].totalLosses += totalLosses;
      leaderBoard[index].goalsFavor += goalsFavor;
      leaderBoard[index].goalsOwn += goalsOwn;
    });
    return leaderBoard;
  }

  private static createHomeMatches(matches: MatchWithTeams[]): ILeaderboard[] {
    return LeaderService.createMatches(matches, 'homeTeamGoals', 'awayTeamGoals');
  }

  async getHomeMatches(): Promise<ILeaderboard[]> {
    const matches = await this.model.findAll() as MatchWithTeams[];
    const homeMatches = LeaderService.createHomeMatches(matches);
    const accMatches = LeaderService.accMatches(homeMatches);
    return accMatches;
  }
}
