import { StateMachine as S } from "@zag-js/core"
import { Context } from "@zag-js/types"
import { Point } from "@zag-js/rect-utils"

type ValidityState = "rangeUnderflow" | "rangeOverflow"

type InputSelection = Record<"start" | "end", number | null>

type IntlMessages = {
  /**
   * Function that returns the human-readable value.
   * It is used to set the `aria-valuetext` property of the input
   */
  valueText?: (value: string) => string
  /**
   * The label foe the increment button
   */
  incrementLabel: string
  /**
   * The label for the decrement button
   */
  decrementLabel: string
}

export type MachineContext = Context<{
  /**
   * The name attribute of the number input. Useful for form submission.
   */
  name?: string
  /**
   * Whether the number input is disabled.
   */
  disabled?: boolean
  /**
   * Whether the number input is readonly
   */
  readonly?: boolean
  /**
   * Whether the number input value is invalid.
   */
  invalid?: boolean
  /**
   * The number of decimal points used to round the value
   */
  precision?: number
  /**
   * The pattern used to check the <input> element's value against
   *
   * @default
   * "[0-9]*(.[0-9]+)?"
   */
  pattern: string
  /**
   * The value of the input
   */
  value: string
  /**
   * @computed the value of the input as a number
   */
  readonly valueAsNumber: number
  /**
   * The minimum value of the number input
   */
  min: number
  /**
   * The maximum value of the number input
   */
  max: number
  /**
   * The step value of the number input
   */
  step: number
  /**
   * Whether to allow mouse wheel to change the value
   */
  allowMouseWheel?: boolean
  /**
   * Whether to allow the value overflow the min/max range
   * @default true
   */
  allowOverflow: boolean
  /**
   * Whether the pressed key should be allowed in the input.
   * The default behavior is to allow DOM floating point characters defined by /^[Ee0-9+\-.]$/
   */
  validateCharacter?: (char: string) => boolean
  /**
   * Whether to clamp the value when the input loses focus (blur)
   * @default true
   */
  clampValueOnBlur: boolean
  /**
   * Whether to focus input when the value changes
   * @default true
   */
  focusInputOnChange: boolean
  /**
   * Specifies the localized strings that identifies the accessibility elements and their states
   */
  messages: IntlMessages
  /**
   * If using a custom display format, this converts the custom format to a format `parseFloat` understands.
   */
  parse?: (value: string) => string
  /**
   * If using a custom display format, this converts the default format to the custom format.
   */
  format?: (value: string) => string | number
  /**
   * @internal The hint that determines if we're incrementing or decrementing
   */
  hint: "increment" | "decrement" | "set" | null
  /**
   * Hints at the type of data that might be entered by the user. It also determines
   * the type of keyboard shown to the user on mobile devices
   * @default "decimal"
   */
  inputMode: "text" | "tel" | "numeric" | "decimal"
  /**
   * The scrubber cursor position
   */
  scrubberCursorPoint: Point | null
  /**
   * Function invoked when the value changes
   */
  onChange?: (details: { value: string; valueAsNumber: number }) => void
  /**
   * Function invoked when the value overflows or underflows the min/max range
   */
  onInvalid?: (details: { reason: ValidityState; value: string; valueAsNumber: number }) => void
  /**
   * @internal The selection range of the input
   */
  inputSelection: InputSelection | null
  /**
   * @computed Whehter the value is at the min
   */
  readonly isAtMin: boolean
  /**
   * @computed Whether the value is at the max
   */
  readonly isAtMax: boolean
  /**
   * @computed Whether the value is out of the min/max range
   */
  readonly isOutOfRange: boolean
  /**
   * @computed Whether the increment button is enabled
   */
  readonly canIncrement: boolean
  /**
   * @computed Whether the decrement button is enabled
   */
  readonly canDecrement: boolean
  /**
   * @computed The `aria-valuetext` attribute of the input
   */
  readonly valueText: string
  /**
   * @computed The formatted value of the input
   */
  readonly formattedValue: string
  /**
   * @computed Whether the writing direction is RTL
   */
  readonly isRtl: boolean
}>

export type MachineState = {
  value: "unknown" | "idle" | "focused" | "spinning" | "before:spin" | "scrubbing"
  tags: "focus"
}

export type State = S.State<MachineContext, MachineState>

export type Send = (event: S.Event<S.AnyEventObject>) => void
