import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class AccountUpgradePage extends Component {

  componentDidMount() {
    const {
      pricePlans,
      fetchAccountUpgradePlansRequest,
      setComponentLoadingRequest
    } = this.props;

    if(!pricePlans) {
      setComponentLoadingRequest(true);
      fetchAccountUpgradePlansRequest();
    } else {
      setComponentLoadingRequest(false);
    }
  }
  render() {
    const {pricePlans, onSelectPlan, selectedIndex, nextStep} = this.props;
    if (!pricePlans) return null;

    return (
      <div className="account__upgrade">
        <h3 className="account__upgrade__heading">Choose a Plan<span className="account__upgrade__sm-hide">, Let's Get Started.</span></h3>
        <div className="account__upgrade__plans">
          <div
            className={classnames("account__upgrade__option", {"is-selected": selectedIndex === 2})}
            onClick={() => onSelectPlan(2)}>
            <span className="save">Save</span>
            <span className="percent">20%</span>
            <div className="pricing">
              <p>$24.95</p>
              <p>per month</p>
            </div>
            <span className="plan">Monthly Billing</span>
          </div>
          <div
            className={classnames("account__upgrade__option", {"is-selected": selectedIndex === 0})}
            onClick={() => onSelectPlan(0)}>
            <span className="save">Save</span>
            <span className="percent">50%</span>
            <div className="pricing">
              <p>$12.49</p>
              <p>per month</p>
            </div>
            <span className="plan">Semi-Annual Billing</span>
          </div>
          <div
            className={classnames("account__upgrade__option", {"is-selected": selectedIndex === 1})}
            onClick={() => onSelectPlan(1)}>
            <span className="save">Low</span>
            <span className="quarterly">Monthly Rate</span>
            <div className="pricing">
              <p>$16.65</p>
              <p>per month</p>
            </div>
            <span className="plan">Quarterly Billing</span>
          </div>
        </div>
        <div className="account__upgrade__actions">
          <button className="account__upgrade__btn account__upgrade__bg-hide" onClick={nextStep}>
            Get Started
          </button>
          <div className="account__upgrade__benefits">
            <h3 className="account__upgrade__heading">Here's What You Get</h3>
            <p>Unlimited Messages to Other Members</p>
            <p>Unlimited Photo Uploads</p>
            <p>View Member Profiles</p>
            <p>Advanced Searching</p>
            <p>Unlimited Icebreakers</p>
          </div>
          <div className="account__upgrade__action__specifics">
            <div className="account__upgrade__description">
              <p className="pricing">{(pricePlans[selectedIndex].monthly_price_description).replace('per', '/')}</p>
              <p>{pricePlans[selectedIndex].description}</p>
              <p>{pricePlans[selectedIndex].length_membership_description}</p>
            </div>
            <button className="account__upgrade__btn account__upgrade__sm-hide" onClick={nextStep}>
              Get Started
            </button>
            <Link to="/" className="account__upgrade__start__free">
              <p>I don't want full access. Start me with free limited account.</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

AccountUpgradePage.propTypes = {
  pricePlans: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    monthly_price_description: PropTypes.string,
    length_membership_description: PropTypes.description
  })),
}


export default AccountUpgradePage;
