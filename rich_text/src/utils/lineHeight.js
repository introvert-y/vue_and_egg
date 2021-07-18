import Quill from "quill";
console.log('Quill', Quill)
let Parchment = Quill.import("parchment");
let fontSizeStyle = Quill.import("attributors/style/size");
fontSizeStyle.whitelist = [
  "12px",
  "14px",
  "16px",
  "18px",
  "22px",
  "26px",
  "30px",
  "36px",
  "42px",
];

console.log(Parchment);
class lineHeightAttributor extends Parchment.Attributor.Style {}
const lineHeightStyle = new lineHeightAttributor("lineHeight", "line-height", {
  scope: Parchment.Scope.INLINE,
  whitelist: ["initial", "1", "1.5", "1.75", "2", "3", "4"]
});

export { lineHeightStyle, fontSizeStyle };