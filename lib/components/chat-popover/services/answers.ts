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
  threadId?: string;
}

type AnswerFeedbackType = {
  answerId: string;
  usefulFeedback: boolean;
  config: Config;
}

export function getAnswers ({ config, search, threadId }: GetAnswers): Promise<any> {
  let url = `/ask/stream?question=${search}`;
  if (config.projectId) url = `${url}&projectId=${config.projectId}`;
  if (threadId) url = `${url}&threadId=${threadId}`;

  return Get(url, config, {
    headers: {
      Authorization: `Bearer ${config.accessToken}`,
      'X-EnhanceDocs-Version': '1.0'
    },
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
