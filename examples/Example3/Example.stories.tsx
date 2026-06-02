import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Example } from "./Example";

const meta: Meta<typeof Example> = {
  title: "Custom Locale",
  component: Example,
  args: {},
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Example>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Standard: Story = {
  name: "Custom Locale",
  args: {},
  render: (args) => <Example />,
};
