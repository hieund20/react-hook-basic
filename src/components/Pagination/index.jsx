import React from 'react';
import PropTypes from 'prop-types';

Pagination.propTypes = {
    //Required, if don't bring in props this will error
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func
};

Pagination.propTypes = {
    onPageChange: null
};

function Pagination(props) {
    const { pagination, onPageChange } = props;
    const { _page, _limit, _totalRows } = pagination
    const totalPage = Math.ceil(_totalRows / _limit);

    function handlePageChange(newPage) {
        if (onPageChange !== null) {
            onPageChange(newPage);
        }
    }

    return (
        <div>
            <button
                disabled={_page <= 1}
                onClick={() => handlePageChange(_page - 1)}
            >
                Prev
            </button>

            <button
                disabled={_page >= totalPage}
                onClick={() => handlePageChange(_page + 1)}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;