"use client";

import Link from "next/link";

export const Breadcrumbs = ({ paths }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb flex items-center space-x-2">
        {paths.map((path, index) => (
          <li key={index} className="breadcrumb-item flex items-center">
            {index === 0 ? (
              // Home icon with navigation
              <Link href={path.link}>
                <img
                  src="https://stage.mkwms.dev/assets/home_breadcrumb.svg"
                  alt="Home"
                  className="h-6 w-6"
                />
              </Link>
            ) : (
              <>
                <span className="mx-2">&gt;&gt;</span>
                {path.link ? (
                  <Link href={path.link} className="text-blue-500 hover:underline">
                    {path.name}
                  </Link>
                ) : (
                  <span className="text-gray-700">{path.name}</span>
                )}
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
