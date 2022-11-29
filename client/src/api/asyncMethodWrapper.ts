//This will wrap API calls that need client-side data validation to pass down errors correctly
export function asyncMethodWrapper<T>(
  controller: (...args: any[]) => Promise<T>
): (...args: any[]) => Promise<T> {
  return async function (...args: any[]) {
    try {
      return await controller(...args);
    } catch (error) {
      if (typeof error === typeof {}) {
        error = JSON.parse(error as string);
      }
      console.log("type:", typeof error);
      console.error("Error: ", error);
      return Promise.reject(error);
    }
  };
}
