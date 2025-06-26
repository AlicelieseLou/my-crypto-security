'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="navbar sticky top-0 z-50 bg-base-200 shadow-md px-8">
      <div className="navbar-start flex gap-4 items-center">
        <Link href="/" className="flex text-xl items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          <span>Cryptography & Network Security</span>
        </Link>
      </div>
      <div className="navbar-end w-full">
        <a
          href="https://github.com/AlicelieseLou"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current transition-colors h-6 w-6"
            viewBox="0 0 24 24"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.583 0-.288-.01-1.05-.015-2.06-3.338.725-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.495.998.108-.776.42-1.305.763-1.605-2.665-.3-5.466-1.335-5.466-5.933 0-1.31.468-2.382 1.235-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3-.403c1.02.005 2.047.138 3 .403 2.29-1.552 3.295-1.23 3.295-1.23.655 1.653.244 2.873.12 3.176.77.838 1.233 1.91 1.233 3.22 0 4.61-2.807 5.63-5.48 5.922.432.372.816 1.103.816 2.222 0 1.604-.015 2.896-.015 3.29 0 .323.216.7.825.58C20.565 21.795 24 17.296 24 12c0-6.63-5.373-12-12-12z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
