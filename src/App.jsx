import { useState } from "react";

const url = "";

function App() {
  const [value, setValue] = useState();

  const handleClick = async () => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/event-stream",
      },
    });

    const reader = response.body
      .pipeThrough(new TextDecoderStream())
      .getReader();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      console.log("Received:", value);
      setValue((prev) => prev + value);
    }
  };

  return (
    <main>
      <p>response:</p>
      <br />
      <div
        style={{
          whiteSpace: "pre-wrap",
        }}
      >
        {value}
      </div>
      <button onClick={handleClick}>send</button>
    </main>
  );
}

export default App;
