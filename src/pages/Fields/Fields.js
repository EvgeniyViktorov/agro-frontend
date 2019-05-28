// vendors
import React, { Component } from 'react';
import toBe from 'prop-types';
import { connect } from 'react-redux';

// styles
import './fields.scss';

// components
import Link from 'components/Link/Link';

// constants
import { ROUTES } from 'constants/router';


class Fields extends Component {
	static propTypes = {
		fields: toBe.object,
		getAllFields: toBe.func
	};

	static contextTypes = {
		router: toBe.object
	};

	renderFieldLink = (field) => {
		const route = { name: ROUTES.FIELD, params: { id: field.id }, reload: true };
		return (
			<div className="field-list-item" key={field.id}>
				<Link url="0" route={route} className="form-link link">
					Поле #{ field.number } ({ field.plant })
				</Link>
			</div>
		);
	};

	render() {
		const { fields } = this.props;

		return (
			<div className="page fields-page">
				<h2>Информация о полях</h2>
				{ fields.list.map(field => this.renderFieldLink(field)) }
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	fields: state.fields
});

export default connect(mapStateToProps)(Fields)
