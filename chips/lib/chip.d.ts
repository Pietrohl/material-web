/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import '../../elevation/elevation.js';
import '../../focus/focus-ring.js';
import '../../ripple/ripple.js';
import { LitElement } from 'lit';
/**
 * A chip component.
 */
export declare class Chip extends LitElement {
    disabled: boolean;
    elevated: boolean;
    href: string;
    label: string;
    target: string;
    private showFocusRing;
    private showRipple;
    private readonly ripple;
    render(): import("lit-html").TemplateResult<2 | 1>;
    private readonly getRipple;
    private readonly renderRipple;
    private handleBlur;
    private handleFocus;
    private handlePointerDown;
}
