const PageWrapper = ({ children }: { children: JSX.Element }): JSX.Element => {
  return <div className="h-full w-full p-2">{children}</div>;
};

export { PageWrapper };
