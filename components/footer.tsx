'use client';

export default function Footer() {
  return (
    <footer className="footer footer-horizontal footer-center bg-base-200 p-10">
      <aside>
        <img src="/logo.png" alt="Logo" className="w-18 h-18" />
        <p className="font-bold">
          Cryptography & Network Security (CNS)
          <br />
          Securing Your Digital World Since 2025
        </p>
        <p>
          Made with ❤️ by{' '}
          <a
            href="https://github.com/AlicelieseLou"
            target="_blank"
            className="link font-semibold underline"
          >
            AlicelieseLou
          </a>
        </p>
      </aside>
    </footer>
  );
}
