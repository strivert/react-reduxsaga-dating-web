import React from 'react'
import PropTypes from 'prop-types';

const Pagination = ({
  current,
  total,
  onPrev,
  onNext
}) => (
  total > 0 ?
    <div className="pagination">
      { current > 1 &&
        <div className="pagination__prev" onClick={onPrev}>Prev</div>
      }
      <div className="pagination__current">{current}</div>
      <span className="pagination__text"> of {total}</span>
      { current < total &&
        <div className="pagination__next" onClick={onNext}>Next</div>
      }
    </div>
  : null
);

Pagination.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired
};

export default Pagination;
