'use client';

export default function Hero() {
  return (
    <div className="hero bg-base-100 h-[350px]">
      <div className="hero-content text-center">
        <div className="max-w-full px-4">
          <h1 className="text-5xl font-bold">
            Cryptography & Network Security
          </h1>
          <p className="py-6 max-w-2xl mx-auto text-center">
            Secure your message with various encryption and decryption
            algorithms. Choose from symmetric or asymmetric encryption methods
            to protect your data. Everything you need in one place!
          </p>
          <p className="py-2">
            Choose an algorithm
            <br />↓
          </p>
        </div>
      </div>
    </div>
  );
}
