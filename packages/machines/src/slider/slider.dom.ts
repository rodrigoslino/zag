import { Point } from "@core-graphics/point"
import { NumericRange } from "@core-foundation/numeric-range"
import type { SliderMachineContext } from "./slider.machine"

export function getElementIds(uid: string) {
  return {
    thumb: `slider-${uid}-thumb`,
    root: `slider-${uid}-root`,
    input: `slider-${uid}-input`,
    track: `slider-${uid}-track`,
    innerTrack: `slider-${uid}-inner-track`,
  }
}

export function getElements(ctx: SliderMachineContext) {
  const doc = ctx.doc ?? document
  const ids = getElementIds(ctx.uid)
  return {
    doc,
    thumb: doc.getElementById(ids.thumb),
    root: doc.getElementById(ids.root),
    input: doc.getElementById(ids.input),
  }
}

export function pointToValue(ctx: SliderMachineContext, info: Point) {
  const { root } = getElements(ctx)
  if (!root) return

  const { progress } = info.relativeToNode(root)
  const opts = { min: 0, max: 1, value: progress.x }

  let percent = new NumericRange(opts).clamp().valueOf()
  percent = ctx.dir === "rtl" ? 1 - percent : percent
  const range = NumericRange.fromPercent(percent, ctx)

  return range.clone().snapToStep().valueOf()
}
