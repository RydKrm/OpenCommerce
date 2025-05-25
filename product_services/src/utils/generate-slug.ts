function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function generateUniqueSlug(name: string, idOrSuffix?: string): string {
  const baseSlug = generateSlug(name);
  const suffix = idOrSuffix || Math.random().toString(36).substring(2, 7);
  return `${baseSlug}-${suffix}`;
}

export { generateSlug, generateUniqueSlug };
