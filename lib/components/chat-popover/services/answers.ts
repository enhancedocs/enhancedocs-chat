import type { Config } from '../../../Chat';
import { Get } from './instance';

export type AnswerType = {
  _id: string;
  search: string;
  answer: string;
  sources: Array<string>;
};

export type GetAnswers = {
  config: Config;
  search: string;
}

export function getAnswers ({ config, search }: GetAnswers): Promise<AnswerType> {
  let url = `/ask?question=${search}`;
  if (config.projectId) url = `${url}&projectId=${config.projectId}`;
  return Get(url, config, { headers: { Authorization: `Bearer ${config.accessToken}` } });
}
