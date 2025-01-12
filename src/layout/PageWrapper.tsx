interface IPageWrapper {
  children: JSX.Element;
  hasFooter?: boolean;
}

const PageWrapper = ({ children, hasFooter }: IPageWrapper): JSX.Element => {
  const footerPaddingClass = hasFooter ? 'pb-32' : '';

  return <div className={`h-full w-full p-2 ${footerPaddingClass}`}>{children}</div>;
};

export { PageWrapper };
