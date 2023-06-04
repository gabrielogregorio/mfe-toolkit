export const downloadFile = (content: string, filename: string, blobOptions: BlobPropertyBag): boolean => {
  try {
    const dataBlob = new Blob([content], blobOptions);
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
    return true;
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.error(`Error on download file ${error}`);
    return false;
  }
};
