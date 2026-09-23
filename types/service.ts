export type ServiceIcon = "palette" | "film" | "video" | "gamepad";

export interface Service {
  id: number;
  name: string;
  icon: ServiceIcon;
  description: string;
}
