import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Example } from "./Example";

const meta: Meta<typeof Example> = {
  title: "Resolve Locale",
  component: Example,
  args: {},
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Example>;

export const Standard: Story = {
  name: "Resolve Locale",
  args: {},
  render: (args) => <Example />,
};
