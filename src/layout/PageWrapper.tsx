interface IPageWrapper {
  children: React.ReactNode;
  hasFooter?: boolean;
}

const PageWrapper = ({ children, hasFooter }: IPageWrapper): React.ReactNode => {
  const footerPaddingClass = hasFooter ? 'pb-32' : '';

  return <div className={`h-full w-full p-2 ${footerPaddingClass}`}>{children}</div>;
};

export { PageWrapper };
