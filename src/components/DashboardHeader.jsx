const DashboardHeader = ({ title, description, children }) => {
  return (
    <div className="border-b border-black/20 dark:border-white/20 bg-white dark:bg-black px-6 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-wider mb-1">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default DashboardHeader;
