import type { User } from './../schema/user';

export default function maleProbability(user: Partial<User>): number{
	if (!user) {
		return 0;
	}
	if (user > 20)
	{
		return 1
	} else
	{
		return 0;
	}
}