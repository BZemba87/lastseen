import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefault";
import Caption from "./Caption";
import Comment from "../comments/Comment";

import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContexts";

import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";

function CaptionPage() {
  const { id } = useParams();
  const [caption, setCaption] = useState({ results: []});

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: caption }, { data: comments }] = await Promise.all([
          axiosReq.get(`/captions/${id}`),
          axiosReq.get(`/comments/?caption=${id}`),
        ]);
        setCaption({ results: [caption] });
        setComments(comments);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Caption {...caption.results[0]} setCaptions={setCaption} captionPage />
        <Container className={appStyles.Content}>
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              caption={id}
              setCaption={setCaption}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            "Comments"
          ) : null}
          {comments.results.length ? (
             <InfiniteScroll
             children={comments.results.map((comment) => (
               <Comment
                 key={comment.id}
                 {...comment}
                 setCaption={setCaption}
                 setComments={setComments}
               />
             ))}
             dataLength={comments.results.length}
             loader={<Asset spinner />}
             hasMore={!!comments.next}
             next={() => fetchMoreData(comments, setComments)}
           />
            
          ) : currentUser ? (
            <span>Got something to say?  Leave a comment!</span>
          ) : (
            <span>No comments!</span>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
      </Col>
    </Row>
  );
}

export default CaptionPage;