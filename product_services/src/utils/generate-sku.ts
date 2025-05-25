import { randomBytes } from "crypto";

function generateSKU(productName: string, categoryName: string): string {
  // Sanitize names: uppercase, remove special chars, shorten
  const cleanName = productName.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  const cleanCategory = categoryName.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

  const shortName = cleanName.substring(0, 6);
  const shortCategory = cleanCategory.substring(0, 4);

  // Generate a random alphanumeric suffix
  const randomSuffix = randomBytes(2).toString("hex").toUpperCase(); // 4 hex chars

  // Combine to form SKU
  return `PROD-${shortCategory}-${shortName}-${randomSuffix}`;
}

export default generateSKU;
