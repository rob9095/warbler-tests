import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import DefaultProfileImg from '../images/default-profile-image.jpg';

const MessageItem = ({isFollowing, date, profileImageUrl, text, username, removeMessage, followUser, unFollowUser, isCorrectUser }) => (
  <div>
    <li className="list-group-item">
      <img src={profileImageUrl || DefaultProfileImg} alt={username} height="100" width="100" className="timeline-image" />
      <div className="message-area">
        <Link to={`/users/${username}/profile`}>@{username} &nbsp;</Link>
        <span className="text-muted">
          <Moment className='text-muted' format='Do MMM YYYY'>
            {date}
          </Moment>
        </span>
        <p>{text}</p>
		<div className="">
			{isCorrectUser && (<a className="btn btn-danger" onClick={removeMessage}>Delete</a>)}
			{!isCorrectUser&& (isFollowing ? <a className="btn btn-success" onClick={unFollowUser}>Un-Follow</a> : <a className="btn btn-success" onClick={followUser}>Follow</a>)}
		</div>
	  </div>
    </li>
</div>
);

export default MessageItem;