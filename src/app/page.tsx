"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/anime")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <p>Home</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
