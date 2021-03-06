import React, { useContext } from "react";
import { Card, Button, Popup } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

import { AuthContext } from "../Context/auth";
import LikeButton from "../Components/LikeButton";
import DeleteButton from "../Components/DeleteButton";

/**
 * Handles the display of the post in the forum
 * @param {Object} post
 * @returns
 */
function PostCard({
  post: {
    body,
    createdAt,
    id,
    username,
    likeCount,
    comments,
    commentCount,
    likes,
  },
}) {
  const { user: currentUser } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description> {body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={currentUser} post={{ id, likeCount, likes }} />
        <Popup
          content="Comment post!"
          trigger={
            <Button
              basic
              color="blue"
              content="Comments"
              icon="comment"
              as={Link}
              to={`/posts/${id}`}
              size="small"
              label={{
                basic: true,
                color: "blue",
                pointing: "left",
                content: commentCount,
              }}
            />
          }
        />
        {currentUser && currentUser.username === username && (
          <DeleteButton postId={id} />
        )}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
