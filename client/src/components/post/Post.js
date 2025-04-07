import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getPost } from '../../redux/thunks/postThunks';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import Spinner from '../layout/Spinner';

const Post = () => {
    const {post, loading} = useSelector((state) => state.post);

    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPost(id));
    }, [dispatch, id]);

    return (
        <Fragment>
            {loading || post === null ? (
                <Spinner /> 
            ) : (
                <Fragment>
                    <Link to='/posts' className='btn'>
                        Back To Posts
                    </Link>
                    <PostItem post={post} showActions={false} />
                    <CommentForm postId={post._id} />
                    <div className='comments'>
                        {post.comments.length > 0 && (
                            post.comments.map(comment => (
                                <CommentItem key={comment._id} comment={comment} postId={post._id} />
                            ))
                        )}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

export default Post;
