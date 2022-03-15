export const arePropertiesAllowed = (
  properties: string[],
  allowedProperties: string[],
): boolean => {
  return !properties.some((property) => !allowedProperties.includes(property));
};
