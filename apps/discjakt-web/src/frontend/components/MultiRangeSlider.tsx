import clsx from "clsx";
import React, { useMemo, useRef, useState } from "react";

import css from "src/styles/MultiRangeSlider.module.css";
import Input from "./Input";

type Props = {
  min: number;
  max: number;

  step?: number;

  onChange?: ({ min, max }: { min: number; max: number }) => void;
};

const MultiRangeSlider: React.FC<Props> = ({
  min,
  max,
  step = 1,
  onChange,
}) => {
  const diffRange = max - min;

  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const left = useMemo(() => {
    return (minValue - min) / (max - min);
  }, [max, min, minValue]);

  const right = useMemo(() => {
    if (min < 0) {
      const diff = max - min;
      return (maxValue + diff - 1) / diff;
    }

    return (maxValue - min) / (max - min);
  }, [max, maxValue, min]);

  const handleOnChangeMinValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = Math.max(
      Math.min(+event.currentTarget.value, maxValue - step),
      min
    );

    setMinValue(value);

    event.currentTarget.value = value.toString();

    onChange?.({ min: value, max: maxValue });
  };
  const handleOnChangeMaxValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = Math.min(
      Math.max(+event.currentTarget.value, minValue + step),
      max
    );

    setMaxValue(value);

    event.currentTarget.value = value.toString();

    onChange?.({ min: minValue, max: value });
  };
  return (
    <div className="relative w-full">
      <input
        type="range"
        className={clsx(css["range"])}
        min={min}
        max={max}
        step={step}
        value={minValue}
        onChange={handleOnChangeMinValue}
        title="Minimum value"
      />

      <input
        type="range"
        className={clsx(css["range"])}
        min={min}
        max={max}
        step={step}
        value={maxValue}
        onChange={handleOnChangeMaxValue}
        title="Maximum value"
      />

      <div className="relative z-10 h-1">
        <div className="absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200"></div>

        <div
          className={clsx(
            "absolute z-20 top-0 bottom-0 rounded-md bg-teal-200"
          )}
          style={{
            left: `${(left * 100).toFixed(1)}%`,
            right: `${(100 - right * 100).toFixed(1)}%`,
          }}
        ></div>

        <div
          className={clsx(
            "absolute z-30 w-4 h-4 -top-1.5 left-0 bg-teal-500 rounded-full"
          )}
          style={{
            left: `calc(${(left * 100).toFixed(1)}% - ${left * 16}px)`,
          }}
        ></div>

        <div
          className={clsx(
            "absolute z-30 w-4 h-4 -top-1.5 right-0 bg-teal-500 rounded-full"
          )}
          style={{
            right: `calc(${(100 - right * 100).toFixed(1)}% - ${
              16 - right * 16
            }px)`,
          }}
        ></div>
      </div>

      <div className="flex justify-between items-center pt-4 gap-1">
        <Input
          type="number"
          min={min}
          max={max - 1}
          value={minValue}
          onChange={handleOnChangeMinValue}
        />

        <span>-</span>

        <Input
          type="number"
          min={min + 1}
          max={max}
          value={maxValue}
          onChange={handleOnChangeMaxValue}
        />
      </div>
    </div>
  );
};

export default MultiRangeSlider;
