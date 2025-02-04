import { createScope } from "@zag-js/dom-query"
import type { MachineContext as Ctx } from "./switch.types"

export const dom = createScope({
  getRootId: (ctx: Ctx) => ctx.ids?.root ?? `switch:${ctx.id}`,
  getLabelId: (ctx: Ctx) => ctx.ids?.label ?? `switch:${ctx.id}:label`,
  getThumbId: (ctx: Ctx) => ctx.ids?.thumb ?? `switch:${ctx.id}:thumb`,
  getControlId: (ctx: Ctx) => ctx.ids?.control ?? `switch:${ctx.id}:control`,
  getInputId: (ctx: Ctx) => ctx.ids?.input ?? `switch:${ctx.id}:input`,
  getInputEl: (ctx: Ctx) => dom.queryById<HTMLInputElement>(ctx, dom.getInputId(ctx)),
})
