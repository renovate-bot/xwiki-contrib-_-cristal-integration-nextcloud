<!--
  See the LICENSE file distributed with this work for additional
  information regarding copyright ownership.

  This is free software; you can redistribute it and/or modify it
  under the terms of the GNU Lesser General Public License as
  published by the Free Software Foundation; either version 2.1 of
  the License, or (at your option) any later version.

  This software is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
  Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General Public
  License along with this software; if not, write to the Free
  Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
  02110-1301 USA, or see the FSF site: http://www.fsf.org.
-->
<script setup lang="ts">
import type { TextFieldProps } from '@xwiki/platform-dsapi'

import NcTextField from '@nextcloud/vue/components/NcTextField'

const input = defineModel<string>()
defineProps<TextFieldProps>()
</script>

<template>
	<!--
	  NcTextField is a text input, and its only slot for custom content is a
	  leading slot sized for a single icon. When a caller slots arbitrary
	  content (e.g. a read-only location breadcrumb), render a field-like,
	  non-interactive container that matches the Nextcloud input look instead
	  of forcing the content through the text input.
	-->
	<div v-if="$slots.default" class="x-text-field-display">
		<span class="x-text-field-display__label">{{ label }}</span>
		<div class="x-text-field-display__content">
			<slot name="default" />
		</div>
		<span v-if="help" class="x-text-field-display__help">{{ help }}</span>
	</div>
	<NcTextField
		v-else
		v-model="input"
		:label="label"
		:autofocus="autofocus"
		:helperText="help"
		:readonly="readonly"
		:required="required"
		:type="type ?? 'text'" />
</template>

<style scoped>
.x-text-field-display {
  width: 100%;
  margin-block-start: 6px;
}

.x-text-field-display__label {
  display: block;
  margin-block-end: 2px;
  color: var(--color-main-text);
  font-size: 13px;
  font-weight: var(--font-weight-element, 500);
}

.x-text-field-display__content {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: var(--default-clickable-area);
  padding-inline: var(--border-radius-element);
  /*
   * Slotted content (e.g. a Nextcloud breadcrumb) is a tall standalone widget;
   * keep the field one line high and let its own vertical padding clip.
   */
  overflow: hidden;
  border: 2px solid var(--color-border-maxcontrast);
  border-radius: var(--border-radius-element);
}

.x-text-field-display__help {
  display: block;
  padding-block: 4px;
  padding-inline: var(--border-radius-element);
  color: var(--color-text-maxcontrast);
  font-size: 13px;
}
</style>
