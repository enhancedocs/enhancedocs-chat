import type { HistoryItem } from '../ChatPopover';

export const INITIAL_HISTORY_ID = 'ai-0';

export function formatHistory (history: Array<HistoryItem>) {
  return history
    .filter(({ _id }) => _id == INITIAL_HISTORY_ID)
    .map((historyItem) => {
      const prefix = historyItem.origin == 'ai' ? 'AI: ' : 'Human: ';
      return `${prefix}${historyItem.value}`;
    });
}
