import Image from "next/image";
import React from "react";
import Container from "./Container";

const LoadingPage = () => {
  const SIZE = 2048;

  return (
    <Container className="flex flex-1 w-full min-h-full items-center justify-center">
      <>
        <Image
          src="/illustrations/loading_turtle.svg"
          alt="Laster inn siden"
          width={SIZE}
          height={SIZE}
          className="max-w-full w-full h-auto absolute motion-safe:animate-ping-small opacity-75"
          priority
        />
        <Image
          src="/illustrations/loading_turtle.svg"
          alt="Laster inn siden"
          width={SIZE}
          height={SIZE}
          className="max-w-full w-full h-auto"
          priority
        />
      </>
    </Container>
  );
};

export default LoadingPage;
