import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Example } from "./Example";

const meta: Meta<typeof Example> = {
  title: "Strict Locale",
  component: Example,
  args: {},
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Example>;

export const Standard: Story = {
  name: "Strict Locale",
  args: {},
  render: (args) => <Example />,
};
