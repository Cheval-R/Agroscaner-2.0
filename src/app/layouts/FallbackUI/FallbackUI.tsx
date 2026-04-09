import React from "react";

interface Props {
  errorMessage: string;
}

const FallbackUI: React.FC<Props> = ({ errorMessage }) => {
  return (
    <>
      <div>{errorMessage}</div>
    </>
  );
};

export default FallbackUI;
