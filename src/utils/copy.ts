
export const handleCopy = (code: string, setIsCopied: (copied: boolean) => void) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); 
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
};
