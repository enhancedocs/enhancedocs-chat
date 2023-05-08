import type { Config } from '../../../Chat';
import { Get, Post } from './instance';

export type AnswerType = {
  answerId: string;
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

type AnswerFeedbackType = {
  answerId: string;
  usefulFeedback: boolean;
  config: Config;
}

export function getAnswers ({ config, search }: GetAnswers): Promise<any> {
  let url = `/ask/stream?question=${search}`;
  if (config.projectId) url = `${url}&projectId=${config.projectId}`;

  return Get(url, config, {
    headers: { Authorization: `Bearer ${config.accessToken}` },
    stream: true
  });
}

export function getAnswersWithHistory ({ config, search, history }: GetAnswersWithHistory): Promise<any> {
  let url = '/ask/stream';
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
    }),
    stream: true
  });
}

export function answerFeedback ({ answerId, usefulFeedback, config }: AnswerFeedbackType) {
  return Post(`/answers/${answerId}`, config, {
    headers: {
      Authorization: `Bearer ${config.accessToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ useful_feedback: usefulFeedback })
  });
}
