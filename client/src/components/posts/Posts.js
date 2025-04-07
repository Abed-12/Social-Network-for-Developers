import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../redux/thunks/postThunks';
import PostItem from './PostItem';
import Spinner from '../layout/Spinner';
import PostForm from './PostForm';

const Posts = () => {
    const {posts, loading} = useSelector((state) => state.post);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <Fragment>
            {loading ? (
                <Spinner /> 
            ) : (
                <Fragment>
                    <h1 className='large text-primary'>Posts</h1>
                    <p className='lead'>
                        <i className='fas fa-user' /> Welcome to the community
                    </p>
                    <PostForm />
                    <div className='posts'>
                        {posts.map(post => (
                            <PostItem key={post._id} post={post} />
                        ))}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

export default Posts;
