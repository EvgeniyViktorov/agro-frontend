// vendors
import React, { Component } from 'react';
import toBe from 'prop-types';
import { connect } from 'react-redux';
import Plot from 'react-plotly.js';
import _ from 'lodash/fp';
import Moment from 'moment';

// styles
import './statistics.scss';

// components
import BackButton from 'components/BackButton/BackButton';

// constants
import { FORM_FIELDS_MAPPING } from 'constants/formFieldTypes';
import { ROUTES } from 'constants/router';

// modules
import { getStatisticsByField, resetStatistics } from 'modules/statistics';


export class Statistics extends Component {
  static propTypes = {
    statistics: toBe.object,
  };

	static contextTypes = {
		router: toBe.object,
	};

	componentDidMount() {
		if(!this.props.statistics.loading) {
			this.props.getStatisticsByField(this.context.router.getState().params.id);
		}
	}

	componentWillUnmount() {
		this.props.resetStatistics();
	}

	getStatisticsXY(formData, fieldName) {
		const yValues = formData.map(item => item.formValues[fieldName]);
		const xValues = formData.map(item => item.dateUpdated);
		return { x: xValues, y: yValues, name: FORM_FIELDS_MAPPING[fieldName] };
	}

  render() {
		const { statistics: { items } } = this.props;

	  const typeMode = { type: 'scatter', mode: 'lines+markers+text', hoverinfo: 'y' };
		const branchesAmountXY = this.getStatisticsXY(items, 'branchesAmount');
	  const leafLengthXY = this.getStatisticsXY(items, 'leafLength');
	  const leafWidthXY = this.getStatisticsXY(items, 'leafWidth');
	  const stemLengthXY = this.getStatisticsXY(items, 'stemLength');
	  const stemThicknessXY = this.getStatisticsXY(items, 'stemThickness');
		const fruitLengthXY = this.getStatisticsXY(items, 'fruitLength');
		const fruitsAmountXY = this.getStatisticsXY(items, 'fruitsAmount');
		const sweetnessXY = this.getStatisticsXY(items, 'sweetness');

		const plotData = [
			{ ...branchesAmountXY, ...typeMode, marker: { color: 'red' } },
			{ ...fruitLengthXY, ...typeMode, marker: { color: 'blue' } },
			{ ...fruitsAmountXY, ...typeMode, marker: { color: 'green' } },
			{ ...leafLengthXY, ...typeMode, marker: { color: 'grey' } },
			{ ...leafWidthXY, ...typeMode, marker: { color: 'violet' } },
			{ ...stemLengthXY, ...typeMode, marker: { color: 'black' } },
			{ ...stemThicknessXY, ...typeMode, marker: { color: 'black' } },
			{ ...sweetnessXY, ...typeMode, marker: { color: 'black' } },
		];

		const layout = {
			title: _.getOr('', 'formValues.plantType.value', items[0]),
			margin: { t: 100, r: 40, b: 30, l: 30 },
			legend: { orientation: 'h' },
		};

		const startDate = Moment().format('DD/MM/YYYY', _.getOr('', 'dateUpdated', items[0]));
		const endDate = Moment().format('DD/MM/YYYY', _.getOr('', 'dateUpdated', items[items.length - 1]));

  	return (
      <div className="statistics-page page">
	      <div className="heading-holder">
		      <BackButton routeName={ROUTES.STATISTICS_LIST} />
		      <h2>Динамика изменений показателей</h2>
	      </div>
	      <p>{ startDate } - { endDate }</p>
	      <div className="stat-graph">
		      <Plot
			      className="plotly-component"
			      data={plotData}
			      layout={layout}
		      />
	      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  statistics: state.statistics,
});

const mapDispatchToProps = {
	getStatisticsByField,
	resetStatistics,
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
