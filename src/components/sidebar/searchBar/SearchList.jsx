import React from 'react';
import CardTopic from './CardTopic';
import CardPost from './CardPost';
import CardUser from './CardUser';

function SearchList({ filteredTopics, filteredPosts, filteredUsers }) {
  const filteredTop = filteredTopics?.map(topic =>  <CardTopic key={topic.topicId} topic={topic} />); 
  const filteredPos = filteredPosts?.map(post =>  <CardPost key={post.postId} post={post} />); 
  const filteredUs = filteredUsers?.map(user =>  <CardUser key={user.userId} user={user} />); 
  return (
    <>
    
<div>
    {filteredTop}
    </div>
    <div>
    {filteredPos}
    </div>
    <div>
    {filteredUs}
    </div>
    </>  
  );
}

export default SearchList;