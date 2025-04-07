import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfiles } from "../../redux/thunks/profileThunks";
import ProfileItem from "./ProfileItem";
import Spinner from "../layout/Spinner";

const Profiles = () => {
    const { profiles, loading } = useSelector((state) => state.profile);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProfiles());
    }, [dispatch]);

    return (
        <Fragment>
            {loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <h1 className="large text-primary">Developers</h1>
                    <p className="lead">
                        <i className="fab fa-connectdevelop" /> Browse and connect with developers
                    </p>
                    <div className="profiles">
                        {profiles.length > 0 ? (
                            profiles.map((profile) => (
                                <ProfileItem key={profile._id} profile={profile} />
                            ))
                        ) : (
                            <h4>No profiles found...</h4>
                        )}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Profiles;
