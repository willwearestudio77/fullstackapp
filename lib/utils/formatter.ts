import { inspect } from "util";
const hyphenate = (str:any) => str.replaceAll(" ", "-");
const slugify = (str:any, id:any) => `${hyphenate(str).toLowerCase()}-${id}`;
const log = (label:any, target:any) =>
  console.log(
    label,
    inspect(target, {
      showHidden: true,
      colors: true,
      depth: null,
    })
  );
  const formatter = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' });
const formatPrice = (p:any) => {
  return formatter.format(p);
}
export { hyphenate, slugify, log, formatPrice };
