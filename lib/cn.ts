type ClassValue = string | false | null | undefined;

/** Junta classes condicionais sem trazer clsx para o bundle. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
