import React from 'react';

export default function Skeleton() {
    return (
      <div>
        {[1, 2, 3].map((i: number) => (
          <div key={i} style={{
            height: "20px",
            background: "#eee",
            margin: "5px 0",
            borderRadius: "4px"
          }} />
        ))}
      </div>
    );
  };