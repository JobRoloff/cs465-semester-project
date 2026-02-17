import { z } from "zod";
import { InputType } from "./enums";

export const DeviceContextSchema = z
  .object({
    userAgent: z.string().min(1).max(1024).optional(),
    platform: z.string().min(1).max(128).optional(),
    browser: z.string().min(1).max(128).optional(),
    inputType: InputType.default("UNKNOWN"),
    screenW: z.number().int().positive().optional(),
    screenH: z.number().int().positive().optional(),
    devicePixelRatio: z.number().positive().optional(),
    locale: z.string().min(2).max(32).optional(),
  })
  .strict();

export type DeviceContext = z.infer<typeof DeviceContextSchema>;
