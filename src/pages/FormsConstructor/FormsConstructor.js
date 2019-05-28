// vendors
import React, { Component } from 'react';
import toBe from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import _ from 'lodash/fp';

// styles
import './forms-constructor.scss';

// components
import Button from 'components/Button/Button';
import FormRow from 'components/FormRow/FormRow';
import InputText from 'components/InputText/InputText';
import { fieldRenderers } from 'components/FormBuilder/FormBuilder';

// constants
import {
	FIELD_TYPE_SELECT,
	// FIELD_TYPE_NUMERIC,
	FIELD_TYPE_TEXT,
	// FIELD_TYPE_TEXTAREA,
	// FIELD_TYPE_RADIO,
	FIELD_TYPE_CHECKBOX,
	// FIELD_TYPE_TEXTAREA,
	// FIELD_TYPE_COLOR,
	// FIELD_TYPE_RANGE,
	MULTILINE_FIELD_TYPES
} from 'constants/formFieldTypes';

import { fieldTypeOptions } from 'constants/selectOptions';

// modules
import { getAllForms } from 'modules/forms';
import { createNewForm } from 'modules/currentForm';
import { addNotifications } from 'modules/notifications';

// additional code
export const FORM_NAME = 'formName';
export const FIELD_NAME = 'fieldName';
export const FIELD_NAME_SHOWN = 'fieldNameShown';
export const FIELD_TYPE = 'fieldType';
export const IS_REQUIRED = 'isRequired';

const EMPTY_FIELD = {
	id: null,
	fieldName: '',
	fieldNameShown: '',
	fieldType: '',
	isRequired: true,
};

class FormsConstructor extends Component {
	static propTypes = {
		forms: toBe.object,
		getAllForms: toBe.func
	};

	static contextTypes = {
		router: toBe.object,
	};

	constructor(props) {
		super(props);
		this.state = {
			showAddField: false,
			formField: EMPTY_FIELD,
			formName: '',
			form: [],
		};
	}

	onFieldChange = (fieldName, fieldType, e) => {
		// let value = _.get('target.value', e);
		let value = e;
		if(fieldType === FIELD_TYPE_CHECKBOX) {
			value = e.target.checked
		} else if (fieldType === FIELD_TYPE_SELECT) {
			value = e.value || '';
		}
		this.setState(state => ({ formField: { ...state.formField, [fieldName]: value } }));
	};

	toggleAddFieldPopup = () => {
		this.setState(state => ({
			showAddField: !state.showAddField,
			formField: state.showAddField ? EMPTY_FIELD : state.formField,
		}));
	};

	addField = () => {
		const { form, formField } = this.state;
		const currentForm = form;
		currentForm.push({ ...formField, id: ++form.length });
		this.setState(state => ({
			showAddField: !state.showAddField,
			form: currentForm,
			formField: EMPTY_FIELD,
		}));
	};

	createNewForm = () => {
		this.props.createNewForm(_.values(_.compact(this.state.form)))
			.then((response) => {
				return this.props.addNotifications({ level: 'success', message: 'Новая форма была сохранена' });
			}, this.props.addNotifications({ level: 'error', message: 'Не удалось сохранить новую форму' }))
	};

	renderPopup(formField) {
		return (
			<div className="popup">
				<i className="fi-cancel" onClick={this.toggleAddFieldPopup} />
				{ this.renderAddFieldForm(formField) }
				<div className="add-field" onClick={this.addField}>
					<Button>Добавить</Button>
				</div>
			</div>
		);
	}

	renderField = (field) => {
		const { fieldName, isRequired, fieldType } = field;
		const renderer = fieldRenderers[fieldType] || (() => 'Field description is missing!');
		const params = { onChange: _.noop, formValues: {}, constructorMode: true };
		return renderer({ fieldName, isRequired }, params);
	};

	renderFormFields = () => {
		const { form } = this.state;
		return (
			<div className="form-fields">
				<strong><p>Поля формы</p></strong>
				{ form.map(field => {
					return !_.isEmpty(field) && (
						<FormRow
							key={field.id}
							className="form-field"
							multiline={MULTILINE_FIELD_TYPES.includes(field.fieldType)}
						>
							<label htmlFor={field.fieldName} className="label">{ field.fieldNameShown }</label>
							{ this.renderField(field) }
						</FormRow>
					) })
				}
			</div>
		);
	};

	renderAddFieldForm(formField) {
		return (
			<div className="forms-constructor-holder">
				<FormRow multiline>
					<label className="label">Идентификатор поля (латинница без пробелов)</label>
					<InputText
						placeholder="plantType"
						value={formField[FIELD_NAME]}
						onChange={this.onFieldChange.bind(this, FIELD_NAME, FIELD_TYPE_TEXT)}
					/>
				</FormRow>
				<FormRow multiline>
					<label className="label">Название поля (кириллица)</label>
					<InputText
						placeholder="Вид растения"
						value={formField[FIELD_NAME_SHOWN]}
						onChange={this.onFieldChange.bind(this, FIELD_NAME_SHOWN, FIELD_TYPE_TEXT)}
					/>
				</FormRow>
				<FormRow multiline>
					<label className="label">Тип поля</label>
					<div className="select">
						<Select
							value={formField[FIELD_TYPE]}
							placeholder="Выберите вариант"
							options={fieldTypeOptions}
							onChange={this.onFieldChange.bind(this, FIELD_TYPE, FIELD_TYPE_SELECT)}
						/>
					</div>
				</FormRow>
				<FormRow className="mandatory">
					<label className="label">Обязательное для заполнения</label>
					<input
						className="checkbox"
						type="checkbox"
						checked={formField[IS_REQUIRED]}
						onChange={this.onFieldChange.bind(this, IS_REQUIRED, FIELD_TYPE_CHECKBOX)}/>
				</FormRow>
			</div>
		);
	};

	render() {
		const { formField, showAddField, form } = this.state;

		return (
			<div className="page forms-constructor-page">
				<h2>Конструктор форм</h2>
				<div className="formHolder">
					<FormRow multiline>
						<InputText
							placeholder="Введите название формы"
							value={formField[FORM_NAME]}
							onChange={this.onFieldChange.bind(this, FORM_NAME, FIELD_TYPE_TEXT)}
						/>
					</FormRow>
				</div>
				{ showAddField && this.renderPopup(formField) }
				{ !_.isEmpty(form) && this.renderFormFields() }
				{ !showAddField && (
					<div className="add-field" onClick={this.toggleAddFieldPopup}>
						<Button>Добавить новое поле</Button>
					</div>
				) }
				<br />
				{ !_.isEmpty(this.state.form) &&
				  <Button onClick={this.createNewForm}>Сохранить новую форму</Button>
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	forms: state.forms
});

const mapDispatchToProps = {
	getAllForms,
	createNewForm,
	addNotifications,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormsConstructor)
