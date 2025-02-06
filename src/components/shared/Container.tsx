const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="mx-auto max-w-[1200px] px-4 lg:px-0">{children}</div>;
};

export default Container;
