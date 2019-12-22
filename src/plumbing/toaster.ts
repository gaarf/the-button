import { Position, Toaster, IToastProps } from "@blueprintjs/core";

export const AppToaster = Toaster.create({
  position: Position.BOTTOM_RIGHT
});

export function showToast(
  message: string,
  props?: Omit<IToastProps, "message">,
  key?: string
) {
  AppToaster.show({ message, ...props }, key);
}
