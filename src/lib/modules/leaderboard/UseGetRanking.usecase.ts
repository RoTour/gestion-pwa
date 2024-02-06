import { LeaderboardRepository } from './Leaderboard.repository';

export const UseGetRanking = () => ({
	execute: async () => {
		const repository = LeaderboardRepository();
		return repository.getRanking();
	}
});
