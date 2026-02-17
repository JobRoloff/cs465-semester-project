/**
 * 
 * This is a visualization of how the types defined within this file is structured / nested together in our experiment
 * 
 * Session (one run)
    * ConditionBlock (one technique + practice/timed)
        * Round (sequence chunk)
            * Trial (one target acquisition)
                * TrialEvent (per click/tap/move)

EventPayload (details)
 */

import { z } from "zod";
import { ISODateTime, UUID, Vec2, Vec3 } from "./primitives";
import { DeviceContextSchema } from "./device";
import { SelectionTechnique, TrialOutcome, EventType } from "./enums";

/**
 * A single experimental condititon within a session. This is where our independent variables are and itt ensures both techniques can resue the same layouts / seeds
 */
export const ConditionBlock = z
  .object({
    id: UUID.optional(),
    sessionId: UUID,
    technique: SelectionTechnique,
    isPractice: z.boolean().default(false),
    targetLayoutId: z.string().max(128).optional(),
    targetSequenceSeed: z.number().int().optional(),
    createdAt: ISODateTime.optional(),
  })
  .strict();
export type ConditionBlock = z.infer<typeof ConditionBlock>;

/**
 * A chunk of work inside a condition block where the chunk of work is mutiple objects the user is to aquire. This helps in analyzing learning/fatigue over time, lets us insert breaks, or modify how difficlut a round is without redifining what a trial is
 */
export const Round = z
  .object({
    id: UUID.optional(),
    blockId: UUID,
    roundIndex: z.number().int().nonnegative(),
    plannedTrialCount: z.number().int().positive().optional(),
    difficultyLabel: z.string().max(64).optional(),
    startedAt: ISODateTime.optional(),
    endedAt: ISODateTime.optional(),
  })
  .strict();
export type Round = z.infer<typeof Round>;

/**
 * One target acquisition. This is where we measure our dependent vairables: time, outcome, error counts,
 */
export const Trial = z
  .object({
    id: UUID.optional(),
    roundId: UUID,
    trialIndex: z.number().int().nonnegative(),
    targetId: z.string().max(128),
    targetPosition: Vec3.optional(),
    targetRadius: z.number().positive().optional(),
    targetDistance: z.number().positive().optional(),
    startedAt: ISODateTime,
    endedAt: ISODateTime.optional(),
    durationMs: z.number().int().nonnegative().optional(),
    outcome: TrialOutcome,
    attemptCount: z.number().int().nonnegative().default(0),
    missCount: z.number().int().nonnegative().default(0),
    wrongTargetCount: z.number().int().nonnegative().default(0),
  })
  .strict();
export type Trial = z.infer<typeof Trial>;

/**
 * one full experiemental run by a test subject. This lets us compare the performance across people/devices and track which app version produced data
 */
export const Session = z
  .object({
    id: UUID.optional(),
    participantId: UUID,
    startedAt: ISODateTime,
    endedAt: ISODateTime.optional(),
    appVersion: z.string().max(64).optional(),
    commitHash: z.string().max(64).optional(),
    device: DeviceContextSchema.optional(),
  })
  .strict();
export type Session = z.infer<typeof Session>;

export const EventPayload = z
  .object({
    screen: Vec2.optional(),
    ndc: Vec2.optional(),
    rayOrigin: Vec3.optional(),
    rayDirection: Vec3.optional(),
    hit: z.boolean().optional(),
    hitObjectId: z.string().max(128).optional(),
    hitDistance: z.number().nonnegative().optional(),
    cameraPos: Vec3.optional(),
    cameraDir: Vec3.optional(),
  })
  .strict();
export type EventPayload = z.infer<typeof EventPayload>;

/**
 * A trial event is each observable interaciton event during a trial: tap, click, camera move.. This lets us explain why a trial had misses and enable more useful metrics later
 */
export const TrialEvent = z
  .object({
    id: UUID.optional(),
    trialId: UUID,
    type: EventType,
    tMsFromTrialStart: z.number().int().nonnegative(),
    payload: EventPayload.optional(),
  })
  .strict();
export type TrialEvent = z.infer<typeof TrialEvent>;
