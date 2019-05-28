// imports from vendor deps
import React from 'react';
import toBe from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import _ from 'lodash/fp';

// imports from styles
import './form-builder.scss';

// imports from constants
import {
	FIELD_TYPE_TEXT,
	FIELD_TYPE_NUMERIC,
	FIELD_TYPE_RANGE,
	FIELD_TYPE_SELECT,
	FIELD_TYPE_COLOR,
	FIELD_TYPE_TEXTAREA,
	MULTILINE_FIELD_TYPES,
} from 'constants/formFieldTypes';

// imports from components
import InputText from 'components/InputText/InputText';
import Textarea from 'components/Textarea/Textarea';


const dot = (color = '#ccc') => ({
	alignItems: 'center',
	display: 'flex',

	':before': {
		backgroundColor: color,
		borderRadius: 15,
		content: '" "',
		display: 'block',
		marginRight: 8,
		height: 15,
		width: 15,
	},
});

const colorStyles = {
	control: styles => ({ ...styles, backgroundColor: 'white' }),
	option: (styles, { data }) => ({ ...styles, ...dot(data.value) }),
	singleValue: (styles, { data }) => ({ ...styles, ...dot(data.value) }),
};

export const fieldRenderers = {
	[FIELD_TYPE_TEXT]: ({ fieldName, isRequired }, { constructorMode, formValues, onChange }) => {
		const constructorModeValue = 'Текстовое поле (до 140 символов)';
		const value = constructorMode ? constructorModeValue : formValues[fieldName] || '';
	  return (
		  <InputText
			  type="text"
			  className="input-text"
			  disabled={constructorMode}
			  value={value}
			  onChange={onChange.bind(this, fieldName, FIELD_TYPE_TEXT)}
		  />
	  );
  },
	[FIELD_TYPE_NUMERIC]: ({ fieldName, isRequired }, { constructorMode, formValues, onChange }) => {
		const constructorModeValue = 'Цифровое поле';
		const value = constructorMode ? constructorModeValue : formValues[fieldName] || '';
		return (
			<InputText
				type="number"
				className="input-numeric"
				disabled={constructorMode}
				value={value}
				onChange={onChange.bind(this, fieldName, FIELD_TYPE_NUMERIC)}
			/>
		);
	},
	[FIELD_TYPE_RANGE]: ({ fieldName, isRequired }, { constructorMode, formValues, onChange }) => {
		return (
			<input
				id="fieldName"
				type="range"
				className="input-range"
				min="1"
				max="5"
				step="1"
				name={fieldName}
				disabled={constructorMode}
				value={formValues[fieldName] || 1}
				onChange={onChange.bind(this, fieldName, FIELD_TYPE_RANGE)}
			/>
		)
	},
	[FIELD_TYPE_SELECT]: ({ fieldName, isRequired }, { selectOptions = {}, constructorMode, formValues, onChange }) => {
		const constructorModeValue = 'Выбор варианта';
		const value = constructorMode ? constructorModeValue : formValues[fieldName] || {};
		return (
			<Select
				className="select"
				disabled={constructorMode}
				getOptionLabel={option => option.value}
				getOptionValue={option => option.id}
				value={value}
				placeholder="Выберите"
				options={_.isEmpty(selectOptions[fieldName]) ? [] : selectOptions[fieldName].list}
				onChange={onChange.bind(this, fieldName, FIELD_TYPE_SELECT)}
			/>
		);
	},
	[FIELD_TYPE_COLOR]: ({ fieldName, isRequired }, { selectOptions = {}, constructorMode, formValues, onChange }) => {
		const constructorModeValue = 'Выбор цвета';
		const value = constructorMode ? constructorModeValue : formValues[fieldName] || {};
		return (
			<Select
				className="select"
				disabled={constructorMode}
				getOptionLabel={option => option.value}
				getOptionValue={option => option.id}
				value={value}
				placeholder="Выберите"
				options={_.isEmpty(selectOptions[fieldName]) ? [] : selectOptions[fieldName].list}
				onChange={onChange.bind(this, fieldName, FIELD_TYPE_SELECT)}
				styles={colorStyles}
			/>
		);
	},
	[FIELD_TYPE_TEXTAREA]: ({ fieldName, isRequired }, { constructorMode, formValues, onChange }) => {
		const constructorModeValue = 'Большое текстовое поле';
		const value = constructorMode ? constructorModeValue : formValues[fieldName] || '';
		return (
			<Textarea
				className="textarea"
				disabled={constructorMode}
				value={value}
				onChange={onChange.bind(this, fieldName, FIELD_TYPE_TEXTAREA)}
			/>
		);
	}
};


export default class FormBuilder extends React.Component {
  static propTypes = {
    className: toBe.string,
    loading: toBe.bool,
    disabled: toBe.bool,
    children: toBe.any,
    onFieldChange: toBe.func,
    form: toBe.object,
	  formValues: toBe.object,
	  selectOptions: toBe.object,
  };

  static defaultProps = {
    onFieldChange: _.noop,
	  formValues: {},
	  selectOptions: {},
  };

  renderField = (field) => {
  	const { selectOptions, onFieldChange, formValues } = this.props;
    const { fieldName, value, isRequired, fieldType } = field;
	  const renderer = fieldRenderers[fieldType] || (() => 'Field description is missing!');
	  const params = { onChange: onFieldChange, formValues, selectOptions };
	  return renderer({ fieldName, value, isRequired }, params);
  };

	renderFields = (fields = []) => {
    return fields.map(field => {
	    const computedClassName = classNames('form-field', this.props.className, {
		    '-multiline': MULTILINE_FIELD_TYPES.includes(field.fieldType),
		    '-notes': field.fieldName === 'note',
	    });
      return (
        <div className={computedClassName} key={field.id}>
	        <label className="label" htmlFor={field.fieldName}>{ field.fieldNameShown }</label>
          { this.renderField(field) }
        </div>
      )
    })
  };

  render() {
    const { loading, disabled, form } = this.props;
    const computedClassName = classNames('form-builder', this.props.className, {
      '-loading': loading,
      '-disabled': disabled,
    });

    return (
      <div className={computedClassName}>
        { !_.isEmpty(form.formStructures) && this.renderFields(form.formStructures) }
      </div>
    );
  }
}
