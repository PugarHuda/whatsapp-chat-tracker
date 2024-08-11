import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarDropdown = ({ item }) => {
  const pathname = usePathname();
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenItem(openItem === label ? null : label);
  };

  return (
    <>
      <ul className="my-2 flex flex-col gap-1.5 pl-9">
        {item.map((item, index) => (
          <li key={index} className="relative">
            <Link
              href={item.route}
              className={`flex items-center justify-between rounded-[7px] px-3.5 py-2 font-medium duration-300 ease-in-out ${
                pathname === item.route
                  ? "bg-primary/[.07] text-primary dark:bg-white/10 dark:text-white"
                  : "text-dark-4 hover:bg-gray-2 hover:text-dark dark:text-gray-5 dark:hover:bg-white/10 dark:hover:text-white"
              }`}
              onClick={(e) => {
                if (item.children) {
                  e.preventDefault(); // Prevent navigation
                  toggleDropdown(item.label);
                }
              }}
            >
              {item.label}
              {item.children && (
                <svg
                  className={`absolute right-3.5 top-1/2 -translate-y-1/2 fill-current transition-transform duration-300 ${
                    openItem === item.label ? "rotate-0" : "rotate-180"
                  }`}
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.5525 7.72801C10.81 7.50733 11.1899 7.50733 11.4474 7.72801L17.864 13.228C18.1523 13.4751 18.1857 13.9091 17.9386 14.1974C17.6915 14.4857 17.2575 14.5191 16.9692 14.272L10.9999 9.15549L5.03068 14.272C4.7424 14.5191 4.30838 14.4857 4.06128 14.1974C3.81417 13.9091 3.84756 13.4751 4.13585 13.228L10.5525 7.72801Z"
                    fill=""
                  />
                </svg>
              )}
            </Link>
            {openItem === item.label && item.children && (
              <>
                <ul className="mt-2 pl-4">
                  {item.children.map((child, childIndex) => (
                    <li key={childIndex}>
                      <Link
                        href={child.route}
                        className={`block rounded-[7px] px-3.5 py-2 font-medium duration-300 ease-in-out ${
                          pathname === child.route
                            ? "bg-primary/[.07] text-primary dark:bg-white/10 dark:text-white"
                            : "text-dark-4 hover:bg-gray-2 hover:text-dark dark:text-gray-5 dark:hover:bg-white/10 dark:hover:text-white"
                        }`}
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                {/* Dropdown for Graph and Table */}
                <div className="ml-4 mt-2">
                  <button
                    onClick={() => console.log("Graph clicked")}
                    className="block rounded-[7px] bg-gray-200 px-3.5 py-2 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    Graph
                  </button>
                  <button
                    onClick={() => console.log("Table clicked")}
                    className="mt-2 block rounded-[7px] bg-gray-200 px-3.5 py-2 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    Table
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default SidebarDropdown;
