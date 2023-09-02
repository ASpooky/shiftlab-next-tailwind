import React from 'react'

export const Week = () => {
  const week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  return (
    <header className="flex items-center">
      {week.map((week) => (
        <div
          key={Math.random()}
          className="text-sm mt-1 border w-full flex justify-center items-center"
        >
          {week}
        </div>
      ))}
    </header>
  )
}
