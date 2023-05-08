export async function processStream (stream: ReadableStream, callback: (result: string) => void) {
  const reader = stream.getReader();
  const decoder = new TextDecoder('utf-8');
  let result = '';

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    result += decoder.decode(value);

    if (callback) callback(result);
  }
}
