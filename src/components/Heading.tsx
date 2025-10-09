import React from "react";

type Props = {
  title: string;
};

export const Heading = (props: Props) => (
  <h1 className="text-xl sm:text-3xl font-bold text-center py-8 tracking-widest font-dela-one text-umenobe-dark-blue">
    {props.title}
  </h1>
);
