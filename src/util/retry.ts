/**
 * Creates a function that retries executing an asynchronous function until a
 * truthy result is returned or the retry count is exceeded.
 *
 * @param count The maximum number of retries.
 * @returns A function that retries executing the provided asynchronous function.
 */
export function retryAsync(count: number) {
  let retryCount = 0;

  return async function retry<T>(f: () => Promise<T>): Promise<T | undefined> {
    retryCount += 1;
    if (retryCount > count) {
      return;
    }

    const result = await f();
    if (result) {
      return result;
    }

    return retry(f);
  };
}
