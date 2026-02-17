import { z } from "zod";

export const UUID = z.string().uuid();
export const ISODateTime = z
  .string()
  .datetime({ offset: true })
  .or(z.string().datetime({ offset: false }));


export const Vec2 = z.object({ x: z.number(), y: z.number() }).strict();
export type Vec2 = z.infer<typeof Vec2>;

export const Vec3 = z.object({ x: z.number(), y: z.number(), z: z.number() }).strict();
export type Vec3 = z.infer<typeof Vec3>;