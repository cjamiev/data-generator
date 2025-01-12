export const scrollToTopOfPage = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

export const scrollToBottomOfPage = () => {
  document.body.scrollTop = document.body.scrollHeight;
  document.documentElement.scrollTop = document.body.scrollHeight;
};
