export const copyToClipboard = async (contents: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(contents);
  } catch (err) {
    console.error('Failed to copy contents:', err);
  }
};
