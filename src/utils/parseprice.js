// Your products store price as a display string, e.g. "250/-".
// Cart math (subtotal, quantity × price) needs a real number.
// This never touches how price is *displayed* — only how it's calculated.

export function parsePrice(priceString) {
  // Strips anything that isn't a digit or a decimal point, e.g.
  // "250/-" -> "250" -> 250
  const numeric = String(priceString).replace(/[^0-9.]/g, "");
  const value = parseFloat(numeric);
  return isNaN(value) ? 0 : value;
}