import React, { useState, useEffect, useContext } from 'react';
import { Link } from '@mui/material';

import ItemComment from './ItemComment';
import commentContext from '../../context/comment/commentContext';

const Comment = ({ id_post }) => {
  const [countCmt, setCountCmt] = useState(4);
  const { comments, getAllComments } = useContext(commentContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getAllComments(id_post);
    // eslint-disable-next-line
  }, []);

  const onClick = (e) => {
    e.preventDefault();
    if (countCmt <= comments?.length) setCountCmt(countCmt + 3);
  };

  return (
    <div>
      {comments?.length > countCmt && (
        <Link
          sx={{ cursor: 'pointer' }}
          onClick={onClick}
          style={{ margin: '20px' }}
        >
          Xem thêm bình luận
        </Link>
      )}
      {!!comments?.length &&
        // eslint-disable-next-line array-callback-return
        comments.map((cmt, index) => {
          if (index >= comments.length - countCmt) {
            return <ItemComment key={index} {...cmt} />;
          }
        })}
    </div>
  );
};

export default Comment;
