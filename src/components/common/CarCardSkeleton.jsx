import React from 'react';

export default function CarCardSkeleton() {
  return (
    <div className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-64 bg-zinc-900" />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-zinc-900 rounded-lg w-3/4" />
        <div className="h-4 bg-zinc-900 rounded-lg w-full" />
        <div className="h-4 bg-zinc-900 rounded-lg w-5/6" />
        <div className="grid grid-cols-2 gap-2 py-3 border-y border-zinc-900">
          <div className="h-4 bg-zinc-900 rounded w-1/2" />
          <div className="h-4 bg-zinc-900 rounded w-1/2" />
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-zinc-900 rounded w-1/3" />
          <div className="h-8 bg-zinc-900 rounded-xl w-24" />
        </div>
      </div>
    </div>
  );
}