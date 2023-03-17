/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
import { css } from 'lit';
export const styles = css `:host{--_shape-start-start: var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, 9999px));--_shape-start-end: var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, 9999px));--_shape-end-end: var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, 9999px));--_shape-end-start: var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, 9999px));--_offset: var(--md-focus-ring-offset, 2px);--_width: var(--md-focus-ring-width, 3px);--_color: var(--md-focus-ring-color, var(--md-sys-color-secondary, #625b71));display:none;position:absolute;box-sizing:border-box;pointer-events:none;border:var(--_width) solid var(--_color);border-start-start-radius:calc(var(--_offset) + var(--_width) + var(--_shape-start-start));border-start-end-radius:calc(var(--_offset) + var(--_width) + var(--_shape-start-end));border-end-start-radius:calc(var(--_offset) + var(--_width) + var(--_shape-end-start));border-end-end-radius:calc(var(--_offset) + var(--_width) + var(--_shape-end-end));inset:calc(-1*(var(--_offset) + var(--_width)))}:host([visible]){display:flex}/*# sourceMappingURL=focus-ring-styles.css.map */
`;
//# sourceMappingURL=focus-ring-styles.css.js.map