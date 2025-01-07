export interface GameSummary {
  gameId: string;
  winloss: number;
  currency: string;
  gameName?: string;
}

export interface TopGamesResult {
  profits: GameSummary[];
  losses: GameSummary[];
}

export interface BaseSummaryService {
  getData(): Promise<GameSummary[]>;
  getTopGames(): Promise<TopGamesResult>;
}
