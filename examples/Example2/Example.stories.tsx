import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Example } from "./Example";

const meta: Meta<typeof Example> = {
  title: "Domain Objects",
  component: Example,
  args: {},
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Example>;

export const Standard: Story = {
  name: "Language / Country / Continent",
  args: {},
  render: (args) => <Example />,
};
