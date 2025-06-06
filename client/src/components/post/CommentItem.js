import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../redux/thunks/postThunks';

const CommentItem = ({
    postId,
    comment: { _id, text, name, avatar, user, date },
}) => {
    const auth = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const formatDate = (date) => dayjs(date).format('YYYY/MM/DD');

    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${user}`}>
                    <img className="round-img" src={avatar} alt={`${name}'s avatar`} />
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">{text}</p>
                <p className="post-date">
                    Posted on {formatDate(date)}
                </p>
                {!auth.loading && user === auth.user._id && (
                    <button 
                        onClick={e => dispatch(deleteComment({postId, commentId: _id}))} 
                        type="button" 
                        className="btn btn-danger"
                    >
                        <i className="fas fa-times" />
                    </button>
                )}
            </div>
        </div>
    );
}

export default CommentItem;
