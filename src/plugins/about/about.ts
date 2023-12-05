/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

/**
 * [[include:plugins/about/README.md]]
 * @packageDocumentation
 * @module plugins/about
 */

import './about.less';

import type { IControlType, IJodit } from 'jodit/types';
import { Config } from 'jodit/config';
import { css, isLicense, normalizeLicense } from 'jodit/core/helpers/';
import * as constants from 'jodit/core/constants';
import { pluginSystem } from 'jodit/core/global';
import { Icon } from 'jodit/core/ui/icon';
import { HOMEPAGE } from 'jodit/core/constants';

import aboutIcon from './about.svg';

Config.prototype.controls.about = {
	exec: (editor: IJodit) => {
		const dialog = editor.dlg({ closeOnClickOverlay: true }),
			i = editor.i18n.bind(editor);

		dialog
			.setMod('theme', editor.o.theme)
			.setHeader(i('About Jodit'))
			.setContent(
				`<div class="jodit-about">
					<div class="title">Переменные</div>
					<div>{{.FirstName}} - Имя </div>
					<div>{{.LastName}} - Фамилия</div>
					<div>{{.CurrentDay}} - День</div>
					<div>{{.CurrentMonth}} - Месяц</div>
					<div>{{.CurrentYear}} - Год</div>
					<div>{{.URL}} - ссылка на фиш. сайт</div>
				</div>`
			);

		css(dialog.dialog, {
			minHeight: 200,
			minWidth: 420
		});

		dialog.open(true, true);
	},
	tooltip: 'About Jodit',
	mode: constants.MODE_SOURCE + constants.MODE_WYSIWYG
} as IControlType;

function about(editor: IJodit): void {
	editor.registerButton({
		name: 'about',
		group: 'info'
	});
}

pluginSystem.add('about', about);
Icon.set('about', aboutIcon);
