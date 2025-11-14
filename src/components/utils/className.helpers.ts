import type { CustomStyles } from "../types";

export function getClassName(
  defaultClass: string,
  defaultKey: string,
  customStyleModule?: CustomStyles,
  customClass?: string,
  useDefaultStyles: boolean = true
): string {
  if (!useDefaultStyles && customStyleModule) {
    return customStyleModule[defaultKey] || customClass || '';
  }
  if (customStyleModule?.[defaultKey]) {
    return `${defaultClass} ${customStyleModule[defaultKey]} ${customClass || ''}`.trim();
  }
  return customClass ? `${defaultClass} ${customClass}` : defaultClass;
}

