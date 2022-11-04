import React, { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { useBrands } from "../hooks";
import Heading from "./Heading";
import Input from "./Input";
import Select from "./Select";

export type DiscMultiFilterValue = {
  minPrice: number;
  maxPrice: number;

  discType: "putter" | "midrage" | "fairway" | "distance" | undefined;

  brandId: number | undefined;

  minSpeed: number;
  maxSpeed: number;

  minGlide: number;
  maxGlide: number;

  minTurn: number;
  maxTurn: number;

  minFade: number;
  maxFade: number;
};

type Props = {
  onChange: (value: DiscMultiFilterValue) => void;
};

const DiscMultiFilter: React.FC<Props> = ({ onChange }) => {
  const { brands } = useBrands();

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(999); // TODO: regn ut høyeste pris?
  const [discType, setDiscType] = useState<
    "all" | "putter" | "midrage" | "fairway" | "distance"
  >("all");
  const [brandId, setBrandId] = useState<number>(0);

  const [minSpeed, setMinSpeed] = useState(1);
  const [maxSpeed, setMaxSpeed] = useState(15);

  const [minGlide, setMinGlide] = useState(1);
  const [maxGlide, setMaxGlide] = useState(7);

  const [minTurn, setMinTurn] = useState(-4);
  const [maxTurn, setMaxTurn] = useState(1);

  const [minFade, setMinFade] = useState(0);
  const [maxFade, setMaxFade] = useState(6);

  const debounceValue = useDebounce(
    {
      minPrice,
      maxPrice,

      discType: discType === "all" ? undefined : discType,

      brandId: brandId === 0 ? undefined : brandId,

      minSpeed,
      maxSpeed,

      minGlide,
      maxGlide,

      minTurn,
      maxTurn,

      minFade,
      maxFade,
    },
    200
  );

  useEffect(() => {
    onChange(debounceValue);
  }, [debounceValue]);

  return (
    <div className="p-4">
      <div className="flex flex-col gap-8">
        <section className="">
          <Heading as="h5" className="mb-2">
            Pris
          </Heading>

          <div className="flex items-center gap-2">
            <Input
              type="number"
              name="price-min"
              value={minPrice}
              onChange={(event) => setMinPrice(+event.currentTarget.value)}
            />
            <span>-</span>
            <Input
              type="number"
              name="price-max"
              value={maxPrice}
              onChange={(event) => setMaxPrice(+event.currentTarget.value)}
            />
          </div>
        </section>

        <section>
          <Heading as="h5" className="mb-2">
            Disc type
          </Heading>

          <Select
            options={[
              { value: "all", label: "Alle" },
              { value: "putter", label: "Putt & Approach" },
              { value: "midrage", label: "Midrage" },
              { value: "fairway", label: "Fairway Driver" },
              { value: "distance", label: "Distance Driver" },
            ]}
            value={discType}
            onChange={(event) => setDiscType(event.currentTarget.value as any)}
          />
        </section>

        <section>
          <Heading as="h5" className="mb-2">
            Merke
          </Heading>

          <Select
            options={[
              { value: 0, label: "Alle" },
              ...brands.map((brand) => ({
                value: brand.id,
                label: brand.name,
              })),
            ]}
            value={brandId}
            onChange={(event) => setBrandId(+event.currentTarget.value)}
          />
        </section>

        <section className="">
          <Heading as="h5" className="mb-2">
            Speed
          </Heading>

          <div className="flex items-center gap-2">
            <Input
              type="number"
              name="speed-min"
              value={minSpeed}
              onChange={(event) => setMinSpeed(+event.currentTarget.value)}
              step={0.5}
            />
            <span>-</span>
            <Input
              type="number"
              name="speed-max"
              value={maxSpeed}
              onChange={(event) => setMaxSpeed(+event.currentTarget.value)}
              step={0.5}
            />
          </div>
        </section>

        <section className="">
          <Heading as="h5" className="mb-2">
            Glide
          </Heading>

          <div className="flex items-center gap-2">
            <Input
              type="number"
              name="Glide-min"
              value={minGlide}
              onChange={(event) => setMinGlide(+event.currentTarget.value)}
              step={0.5}
            />
            <span>-</span>
            <Input
              type="number"
              name="Glide-max"
              value={maxGlide}
              onChange={(event) => setMaxGlide(+event.currentTarget.value)}
              step={0.5}
            />
          </div>
        </section>

        <section className="">
          <Heading as="h5" className="mb-2">
            Turn
          </Heading>

          <div className="flex items-center gap-2">
            <Input
              type="number"
              name="Turn-min"
              value={minTurn}
              onChange={(event) => setMinTurn(+event.currentTarget.value)}
              step={0.5}
            />
            <span>-</span>
            <Input
              type="number"
              name="Turn-max"
              value={maxTurn}
              onChange={(event) => setMaxTurn(+event.currentTarget.value)}
              step={0.5}
            />
          </div>
        </section>

        <section className="">
          <Heading as="h5" className="mb-2">
            Fade
          </Heading>

          <div className="flex items-center gap-2">
            <Input
              type="number"
              name="Fade-min"
              value={minFade}
              onChange={(event) => setMinFade(+event.currentTarget.value)}
              step={0.5}
            />
            <span>-</span>
            <Input
              type="number"
              name="Fade-max"
              value={maxFade}
              onChange={(event) => setMaxFade(+event.currentTarget.value)}
              step={0.5}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiscMultiFilter;
