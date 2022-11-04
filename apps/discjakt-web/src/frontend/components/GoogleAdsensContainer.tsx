import React, { useEffect } from "react";
import Container from "./Container";

type Props = {
  client: string;
  slot: string;
};

const GoogleAdsensContainer: React.FC<Props> = ({ client, slot }) => {
  useEffect(() => {
    ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
  }, []);

  return (
    <Container>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </Container>
  );
};

export default GoogleAdsensContainer;
