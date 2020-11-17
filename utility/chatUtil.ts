import type { Chat } from '../schema/chat';

export const replaceEmoji = function (text: string) {
	return text.replace(
		":D"
		, "😄" // 😄
	);
}