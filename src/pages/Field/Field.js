// vendors
import React, { Component } from 'react';
import toBe from 'prop-types';
import Moment from 'moment';
import { connect } from 'react-redux';
import _ from 'lodash/fp';

// styles
import './field.scss';

// components
import BackButton from 'components/BackButton/BackButton';

// constants
import { ROUTES } from 'constants/router';


class Field extends Component {

	static contextTypes = {
		router: toBe.object
	};

	render() {
		const { fields } = this.props;
		const fieldId = this.context.router.getState().params.id;
		const field = _.isEmpty(fields.list)
			? null
			: fields.list.find(field => field.id.toString() === fieldId.toString());

		return (
			<div className="page field-page">
				<div className="field">
					<div className="heading-holder">
						<BackButton routeName={ROUTES.FIELDS} />
						{ fields.loading
							? <h2>Загружается информация о поле</h2>
							: <h2>Поле #{ _.get('number', field) }</h2>
						}
						{ !_.isEmpty(field) && (
							<div className="description">
								<span className="label">Ответственный: </span>
								<span className="value">
									{ field.responsible.firstName } { field.responsible.lastName }
								</span>
							</div>
						) }
					</div>

					{ !_.isEmpty(field) && [
						<div className="field-description" key="description">
							<p>
								<span className="label">Посевная культура: </span>
								<span className="value">{ field.plant }</span>
							</p>
							<p>
								<span className="label">Подвид культуры: </span>
								<span className="value">{ field.plantType.name }</span>
							</p>
							<p>
								<span className="label">Создатель культуры: </span>
								<span className="value">
									{ field.creator.firstName } { field.creator.lastName }
									</span>
							</p>
							<p>
								<span className="label">Дата сева: </span>
								<span className="value">{ Moment().format('DD/MM/YYYY', field.sowingDate) }</span>
							</p>
							<p>
								<span className="label">Примерное количество растений: </span>
								<span className="value">{ field.approximatePlantsAmount }</span>
							</p>
						</div>,
						<div className="field-map" key="map">
							<iframe title="карта поля" src={field.googleMapsSrc} />
						</div>
					] }
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	fields: state.fields
});

export default connect(mapStateToProps)(Field)
