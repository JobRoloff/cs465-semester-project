import { z } from "zod";

export const SelectionTechnique = z.enum(["RETICLE", "TOUCH_POINT"]);
export type SelectionTechnique = z.infer<typeof SelectionTechnique>;

export const InputType = z.enum(["MOUSE", "TOUCH", "PEN", "UNKNOWN"]);
export type InputType = z.infer<typeof InputType>;

export const TrialOutcome = z.enum(["HIT", "MISS", "WRONG_TARGET", "TIMEOUT"]);
export type TrialOutcome = z.infer<typeof TrialOutcome>;

export const EventType = z.enum([
  "CLICK_OR_TAP",
  "POINTER_DOWN",
  "POINTER_UP",
  "RAYCAST_RESULT",
  "CAMERA_MOVE",
]);
export type EventType = z.infer<typeof EventType>;
