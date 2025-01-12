export const GAME_COLLECTION_MAP: { [key: number]: string } = {
  2: 'xocxoc',
  22: 'vipsedie',
  9: 'minisedie',
};

export function getCollectionName(gameId: number): string | undefined {
  return GAME_COLLECTION_MAP[gameId];
}
