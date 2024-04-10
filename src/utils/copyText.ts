export const copyText = async (text: string) => {
  await navigator.clipboard.writeText(text);
};
