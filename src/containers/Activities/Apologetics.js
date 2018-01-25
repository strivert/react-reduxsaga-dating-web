import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import LocalSpinner from '../../components/LocalSpinner';
import { apologeticsActions } from '../../actions'
import { apologeticsSelectors } from '../../selectors';
import InfiniteScroll from 'react-infinite-scroller';
import Spinner from 'react-spinkit';

class Apologetics extends Component {
  state = {
    loaded: false
  }

	componentDidMount() {
		const { apologetics, fetchApologeticsRequest } = this.props;
    if (apologetics.length === 0) {
      fetchApologeticsRequest(1)
    }
    if (window.apologeticsLoaded) {
      this.setState({
        loaded: true
      });
    }
	}

  componentWillReceiveProps(nextProps) {
    if (!this.apologetics && nextProps.apologetics.length > 0 ) {
      window.apologeticsLoaded = true;
      this.setState({
        loaded: true
      })
    }
  }

  renderApologetics() {
    const { apologetics } = this.props;

    if (apologetics.length > 0) {
      return apologetics.map((apologetic) => {
        if (apologetic.id) {
          return (
            <div className="apologetic" key={apologetic.id}>
              <h3 dangerouslySetInnerHTML={{ __html: apologetic.title }} />

              <div dangerouslySetInnerHTML={{ __html: apologetic.content_html}} />
            </div>
          );
        }
        return null;
      });
    }

    return <div></div>;
  }

  loadApologetics = (page) => {
    const { fetchApologeticsRequest, hasMore } = this.props;

    if (hasMore) {
      fetchApologeticsRequest(page);
    }
  }

	render() {
    const { loaded } = this.state;
		return (
      <div>

        <h2>Apologetics</h2>
        <h3>Sponsored by Catholic Answers</h3>

        { (loaded===false) &&
            <LocalSpinner />
        }

        <InfiniteScroll
          pageStart={1}
          initialLoad={false}
          loadMore={this.loadApologetics}
          hasMore={this.props.hasMore}
          loader={<div className="load-more-spinner"><Spinner name="ball-spin-fade-loader" /></div>}
        >
          {this.renderApologetics()}
        </InfiniteScroll>
      </div>
		);
	}
}

const mapStateToProps = () => {
	return createStructuredSelector({
		apologetics: apologeticsSelectors.apologeticsSelector(),
    hasMore: apologeticsSelectors.hasMoreApologeticsSelector()
	})
}

const mapDispatchToProps = {
	fetchApologeticsRequest: apologeticsActions.fetchApologeticsRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(Apologetics);
