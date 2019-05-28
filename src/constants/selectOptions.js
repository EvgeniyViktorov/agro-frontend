import {
	// FIELD_TYPE_SELECT,
	FIELD_TYPE_NUMERIC,
	FIELD_TYPE_TEXT,
	FIELD_TYPE_TEXTAREA,
	// FIELD_TYPE_RADIO,
	// FIELD_TYPE_CHECKBOX,
	// FIELD_TYPE_COLOR,
	// FIELD_TYPE_RANGE,
} from 'constants/formFieldTypes';

export const fieldTypeOptions = [
	// { value: FIELD_TYPE_SELECT, label: 'Выбор вариантов (селект)' },
	{ value: FIELD_TYPE_NUMERIC, label: 'Цифровое поле' },
	{ value: FIELD_TYPE_TEXT, label: 'Текстовое поле (до 140 символов)' },
	{ value: FIELD_TYPE_TEXTAREA, label: 'Большое текстовое поле (больше 140 символов)' },
	// { value: FIELD_TYPE_RADIO, label: 'Радио кнопки (выбор одного варианта из многих' },
	// { value: FIELD_TYPE_CHECKBOX, label: 'Чекбокс (да/нет)' },
	// { value: FIELD_TYPE_COLOR, label: 'Выбор цвета' },
	// { value: FIELD_TYPE_RANGE, label: 'Выбор диапазона' },
];
