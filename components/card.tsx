'use client';

import Link from 'next/link';

import { algorithms } from '@/data/algorithms';

export default function Card() {
  return (
    <section className="pb-12 bg-base-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">All Algorithms</h2>
        <div className="grid grid-cols-4 gap-6 justify-center">
          {algorithms.map((algorithm, idx) => (
            <Link key={idx} href={algorithm.link}>
              <div className="card bg-base-200 min-h-[275px] flex flex-col text-base-content p-6 rounded-xl shadow transition-all cursor-pointer hover:outline hover:outline-2 hover:outline-primary">
                <div className="mb-4 p-3 bg-neutral rounded-md w-fit mx-auto">
                  {algorithm.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 text-center h-12 flex items-center justify-center">
                  {algorithm.title}
                </h3>
                <p className="text-sm opacity-80 text-center leading-relaxed">
                  {algorithm.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
