import React from "react";
import { Link } from "react-router-dom";

const ProfileTop = ({
    profile: {
        status,
        company,
        location,
        website,
        social,
        user: { name, avatar },
    },
}) => {
    return (
        <div className="profile-top bg-primary p-2">
            <img className="round-img my-1" src={avatar} alt={`${name}'s avatar`} />
            <h1 className="large">{name}</h1>
            <p className="lead">
                {status} {company && <span>at {company}</span>}
            </p>
            <p>{location && <span>{location}</span>}</p>
            <div className="icons my-1">
                {website && (
                    <Link to={website} target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-globe fa-2x" />
                    </Link>
                )}
                {social && social.twitter && (
                    <Link to={social.twitter} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter fa-2x" />
                    </Link>
                )}
                {social && social.facebook && (
                    <Link to={social.facebook} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook fa-2x" />
                    </Link>
                )}
                {social && social.linkedin && (
                    <Link to={social.linkedin} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin fa-2x" />
                    </Link>
                )}
                {social && social.youtube && (
                    <Link to={social.youtube} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-youtube fa-2x" />
                    </Link>
                )}
                {social && social.instagram && (
                    <Link to={social.instagram} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram fa-2x" />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default ProfileTop;
