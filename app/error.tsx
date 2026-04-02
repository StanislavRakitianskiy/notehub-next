"use client";

type Props = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  return (
    <>
      <h2>Error site</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </>
  );
};

export default Error;
