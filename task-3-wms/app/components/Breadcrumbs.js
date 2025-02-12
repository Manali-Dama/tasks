export const Breadcrumbs = ({ paths }) => {
    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb flex items-center space-x-2">
          {paths.map((path, index) => (
            <li key={index} className="breadcrumb-item flex items-center">
              {path.link ? (
                <a href={path.link} className="flex items-center">
                  {/* Display only Home Icon */}
                  {index === 0 && (
                    <img
                      src="https://stage.mkwms.dev/assets/home_breadcrumb.svg"
                      alt="Home"
                      className="h-6 w-6"
                    />
                  )}
                  {/* Don't display text for the Home icon */}
                  {index !== 0 && <span className="mx-2">&gt;&gt; </span>}
                </a>
              ) : (
                // Display current page name without link
                <>
                  {index !== 0 && <span className="mx-2">&gt;&gt;</span>}
                  {path.name}
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  };
  
  