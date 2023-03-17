/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import '../../field/filled-field.js';
import { TextField } from './text-field.js';
declare global {
    interface HTMLElementTagNameMap {
        'md-test-text-field': TestTextField;
    }
}
declare class TestTextField extends TextField {
    protected readonly fieldTag: import("lit-html/static.js").StaticValue;
    getHasError(): boolean;
    getSupportingTextValue(): string;
    didErrorAnnounce(): boolean;
}
export {};
