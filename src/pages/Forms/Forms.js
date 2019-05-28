// vendors
import React, { Component } from 'react';
import toBe from 'prop-types';
import { connect } from 'react-redux';

// styles
import './forms.scss';

// components
import Link from 'components/Link/Link';

// constants
import { ROUTES } from 'constants/router';

// modules


class Forms extends Component {
	static propTypes = {
		forms: toBe.object,
		getAllForms: toBe.func
	};

	static contextTypes = {
		router: toBe.object,
	};

	renderTableOfContents = (form) =>{
		const route = { name: ROUTES.FORM, params: { id: form.id }, reload: true };
		return (
			<div className="form-list-item" key={form.id}>
				<div className="form-description">
					<Link url="0" route={route} className="form-link link">
						{ form.formName }
					</Link>
				</div>
			</div>
		);
	};

	render() {
		const { forms } = this.props;
		return (
			<div className="page forms-page">
				<h2>Полевой журнал</h2>
				{ forms.list.map(form => this.renderTableOfContents(form)) }
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	forms: state.forms
});

export default connect(mapStateToProps)(Forms)
