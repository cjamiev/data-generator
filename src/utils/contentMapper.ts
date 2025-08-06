export const capitalizeEachWord = (text: string) => {
  return text.toLocaleLowerCase().split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}