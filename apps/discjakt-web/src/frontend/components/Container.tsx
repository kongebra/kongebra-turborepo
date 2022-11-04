import clsx from "clsx";
import React from "react";

type Props = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement> & {
    fullWidth?: boolean;
  }
>;

const Container = React.forwardRef<HTMLDivElement, Props>(
  ({ children, className, fullWidth, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "lg:px-0 px-4",
          fullWidth === true ? "max-w-full" : "max-w-7xl mx-auto",
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export default Container;
