import type { Config } from '../../../Chat';
import { Get, Post } from './instance';

export type AnswerType = {
  _id: string;
  search: string;
  answer: string;
  sources: Array<string>;
};

type GetAnswers = {
  config: Config;
  search: string;
}

type GetAnswersWithHistory = {
  config: Config;
  search: string;
  history?: Array<string>;
}

export function getAnswers ({ config, search }: GetAnswers): Promise<AnswerType> {
  let url = `/ask?question=${search}`;
  if (config.projectId) url = `${url}&projectId=${config.projectId}`;

  return Get(url, config, { headers: { Authorization: `Bearer ${config.accessToken}` } });
}

export function getAnswersWithHistory ({ config, search, history }: GetAnswersWithHistory): Promise<AnswerType> {
  let url = '/ask';
  if (config.projectId) url = `${url}?projectId=${config.projectId}`;

  return Post(url, config, {
    headers: {
      Authorization: `Bearer ${config.accessToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      question: search,
      history
    })
  });
}
