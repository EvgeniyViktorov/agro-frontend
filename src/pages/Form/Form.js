// vendors
import React, { Component } from 'react';
import toBe from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash/fp';

// components
import BackButton from 'components/BackButton/BackButton';
import FormBuilder from 'components/FormBuilder/FormBuilder';
import Button from 'components/Button/Button';

// constants
import { ROUTES } from 'constants/router';
import { FIELD_TYPE_CHECKBOX } from 'constants/formFieldTypes';
import { SUCCESS_MESSAGE } from 'constants/common';

// modules
import {
	getCurrentForm,
	saveFormValues,
	editFormValue,
	resetCurrentForm,
} from 'modules/currentForm';
import { addNotifications } from 'modules/notifications';


class Form extends Component {
	static propTypes = {
		forms: toBe.object,
		currentForm: toBe.object,
		selectOptions: toBe.object,
	};

	static contextTypes = {
		router: toBe.object,
	};

	componentDidMount() {
		if(!this.props.currentForm.item.loading) {
			this.props.getCurrentForm(this.context.router.getState().params.id);
		}
	}

	componentWillUnmount() {
		this.props.resetCurrentForm();
	}

	getCurrentFormStructure(forms) {
		const currentFormId = this.context.router.getState().params.id;
		return _.isEmpty(forms.list)
			? {}
			: forms.list.find(field => field.id.toString() === currentFormId.toString());
	}

	saveForm = () => {
		const { currentForm: { item } } = this.props;
		const id = this.context.router.getState().params.id;
		this.props.saveFormValues({ ...item, id })
			.then(() => {
				this.props.addNotifications({
					level: SUCCESS_MESSAGE,
					message: 'Форма была сохранена.'
				});
			});
	};

	onFieldChange = (fieldName, fieldType, e) => {
		// let value = _.get('target.value', e);
		let value = e;
		if(fieldType === FIELD_TYPE_CHECKBOX) {
			value = e.target.checked
		}
		this.props.editFormValue(fieldName, value);
	};

	render() {
		const { forms, currentForm, selectOptions } = this.props;
		const formStructure = this.getCurrentFormStructure(forms);

		return !_.isEmpty(formStructure) && (
			<div className="page form-page">
				<div className="heading-holder">
					<BackButton routeName={ROUTES.FORMS} />
					{ forms.loading
						? <h2>Загружается информация о форме</h2>
						: <h2>{ formStructure.formName }</h2>
					}
				</div>
				<div className="form" key={formStructure.id}>
					<div className="form-description">
						<p>{ formStructure.description }</p>
						<FormBuilder
							form={formStructure}
							selectOptions={selectOptions}
							onFieldChange={this.onFieldChange}
							formValues={currentForm.item}
						/>
						<Button onClick={this.saveForm}>Сохранить</Button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	forms: state.forms,
	currentForm: state.currentForm,
	selectOptions: { leafColor: state.colors, plantType: state.plants },
});

const mapDispatchToProps = {
	saveFormValues,
	editFormValue,
	resetCurrentForm,
	getCurrentForm,
	addNotifications,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form)
