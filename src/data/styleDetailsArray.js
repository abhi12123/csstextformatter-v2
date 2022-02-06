import { googleFonts } from "./googleFonts";
const units = ["px", "rem", "em", "%", "in", "cm", "mm"];
let styleDetailsArray = [
  {
    name: "font-family",
    type: "dropdown",
    defaultValue: "Arial",
    options: googleFonts,
  },
  {
    name: "font-size",
    type: "number",
    units,
    defaultValue: 16,
  },
  {
    name: "font-kerning",
    type: "dropdown",
    defaultValue: "normal",
    options: ["none"],
  },
  {
    name: "font-style",
    type: "dropdown",
    defaultValue: "normal",
    options: ["italic", "oblique"],
  },
  {
    name: "font-weight",
    type: "dropdown",
    defaultValue: "normal",
    options: ["bold"],
  },
  {
    name: "color",
    type: "color",
    defaultValue: "rgb(0,0,0,1)",
  },
  {
    name: "background-color",
    type: "color",
    defaultValue: "rgb(255,255,255,0)",
  },
  {
    name: "text-indent",
    type: "number",
    units,
    defaultValue: 0,
  },
  {
    name: "letter-spacing",
    type: "number",
    units,
    defaultValue: 0,
  },
  {
    name: "word-spacing",
    type: "number",
    units,
    defaultValue: 0,
  },
  {
    name: "line-height",
    type: "number",
    defaultValue: 1.5,
  },
  {
    name: "text-align",
    type: "dropdown",
    defaultValue: "start",
    options: ["end", "center", "justify"],
  },
  {
    name: "text-align-last",
    type: "dropdown",
    defaultValue: "left",
    options: ["right", "center"],
  },
  {
    name: "text-decoration-line",
    type: "dropdown",
    defaultValue: "none",
    options: ["underline", "overline", "line-through"],
  },
  {
    name: "text-decoration-color",
    type: "color",
    defaultValue: "rgb(0,0,0,1)",
  },
  {
    name: "text-decoration-style",
    type: "dropdown",
    defaultValue: "solid",
    options: ["double", "dotted", "dashed", "wavy"],
  },
  {
    name: "text-decoration-thickness",
    type: "number",
    units,
    defaultValue: 1,
  },
  {
    name: "text-underline-offset",
    type: "number",
    units,
    defaultValue: 0,
  },
  {
    name: "text-transform",
    type: "dropdown",
    defaultValue: "none",
    options: ["capitalize", "uppercase", "lowercase"],
  },
  {
    name: "opacity",
    type: "number",
    defaultValue: 1,
  },
];

export { styleDetailsArray };
