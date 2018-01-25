import React, { Component } from "react";

import MemberCard from '../../../components/MemberCard';
import Pagination from '../../../components/Pagination';
import LocalSpinner from '../../../components/LocalSpinner';

const PER_PAGE = 9;

class Gallery extends Component {
  render() {
    const { members, isLoading, currentPage, totalPage, onSelectPage } = this.props;

    let pagedMembers = [];
    if (members && members.length) {
      pagedMembers = members.slice(
        Math.max(0, (currentPage - 1) * PER_PAGE),
        currentPage * PER_PAGE
      );
    }

    return (
      <div className="gallery-wrapper">
        <div className="gallery__header"> <h3>Your Matches</h3> </div>
        <div className="gallery">
          { members && members.length
            ? pagedMembers.map((member) => <MemberCard key={member.id} member={member} />)
            : <div>No Search Result. Redefine your search :)</div>
          }
        </div>
        <LocalSpinner loaded={!isLoading} />
        { !isLoading && <Pagination
          current={currentPage}
          total={totalPage}
          onNext={() => {
            onSelectPage(Math.min(currentPage + 1, totalPage));
            window.scrollTo(0, 0);
          }}
          onPrev={() => {
            onSelectPage(Math.max(1, currentPage - 1));
            window.scrollTo(0, 0);
          }}
        /> }
      </div>
    );
  }
}

export default Gallery;