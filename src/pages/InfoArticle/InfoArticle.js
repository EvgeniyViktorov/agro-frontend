// vendors
import React, { Component } from 'react';
import toBe from 'prop-types';
import _ from 'lodash/fp';

// components
import BackButton from 'components/BackButton/BackButton';

// constants
import { ROUTES } from 'constants/router';
import { INFO } from 'data';

// assets
import teplica from 'assets/images/info/teplica.jpg';
import griadki from 'assets/images/info/griadki.jpg';
import hydroponica from 'assets/images/info/hydroponica.jpg';

const IMAGES = { teplica, griadki, hydroponica };


class InfoArticle extends Component {
	static propTypes = {
		article: toBe.object
	};

	static defaultProps = {
		article: {}
	};

	static contextTypes = {
		router: toBe.object,
	};

	render() {
		const articleId = this.context.router.getState().params.id;
		const article = INFO[0].articles.find(el => el.id.toString() === articleId.toString());

		return !_.isEmpty(article) && (
			<div className="page info-article-page">
				<div className="heading-holder">
					<BackButton routeName={ROUTES.INFO} />
					<h2>{ article.title }</h2>
				</div>

				<div className="main-img-holder">
					<img src={IMAGES[article.image]} alt={article.title} />
				</div>

				<div className="text">
					<div className="description">{ article.description }</div>
					<div className="content" dangerouslySetInnerHTML={{ __html: article.content }} />
				</div>
			</div>
		)
	}
}

export default InfoArticle
