// vendors
import React, { Component } from 'react';
import toBe from 'prop-types';

// styles
import './info.scss';

// components
import Link from 'components/Link/Link';
import { ROUTES } from 'constants/router';

// constants
import { INFO } from 'data';

class Info extends Component {

	static contextTypes = {
		router: toBe.object,
	};

	renderChild = (article) => {
		const route = { name: ROUTES.INFO_ARTICLE, params: { id: article.id }, reload: true };
		return (
			<div className="article" key={article.id}>
				<Link url="0" route={route} className="link">
					{ article.title }
				</Link>
			</div>
		);
	};

	renderChapter = (chapter, index) => {
		return (
			<div className="chapter" key={chapter.id}>
				<h3>{ index + 1 }. { chapter.title }</h3>
				{ chapter.articles.map(article => this.renderChild(article)) }
			</div>
		);
	};

	render() {
		return (
			<div className="page info-page">
				<h2>Справочная информация</h2>
				{ INFO.map((chapter, index) => this.renderChapter(chapter, index)) }
			</div>
		);
	}
}

export default Info;
