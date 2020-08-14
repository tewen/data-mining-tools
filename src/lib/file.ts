import fs from 'fs-extra';

export async function filesExist(
  ...files: ReadonlyArray<string>
): Promise<boolean> {
  const allExist: ReadonlyArray<boolean> = await Promise.all(
    files.map((file: string) => fs.exists(file))
  );
  return allExist.every((exists, idx) => {
    return (
      exists ||
      (() => {
        const error: string = `${files[idx]} does not exist in the file system.`;
        throw new Error(error);
      })()
    );
  });
}
