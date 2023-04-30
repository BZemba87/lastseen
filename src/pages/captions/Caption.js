import React from 'react'
import styles from "../../styles/Caption.module.css"
import { useCurrentUser } from '../../contexts/CurrentUserContexts';
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from "../../components/Avatar";
import { axiosRes } from '../../api/axiosDefault';
import { MoreDropdown } from '../../components/MoreDropdown';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Caption = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    like_id,
    title,
    content,
    image,
    created_at,
    captionPage,
    setCaptions,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/captions/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/captions/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.caption("/likes/", { caption: id });
      setCaptions((prevCaptions) => ({
        ...prevCaptions,
        results: prevCaptions.results.map((caption) => {
          return caption.id === id
            ? { ...caption, like_id: data.id }
            : caption;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setCaptions((prevCaptions) => ({
        ...prevCaptions,
        results: prevCaptions.results.map((caption) => {
          return caption.id === id
            ? { ...caption, likes_count: caption.likes_count - 1, like_id: null }
            : caption;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
  <Card className={styles.Caption}>
    <Card.Body>
      <Media className='align-items-center justify-content-between'>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} height={55}/>
          {owner}
        </Link>
        <div className='d-flex align-items-center'>
          <span>{created_at}</span>
          {is_owner && captionPage &&  (<MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
        </div>
      </Media>
    </Card.Body>
    <Link to={`/captions/${id}`}>
    <Card.Img src={image} alt={title}/>
    </Link>
    <Card.Body>
      {title && <Card.Title className='text-center'>{title}</Card.Title>}
      {content && <Card.Text>{content}</Card.Text>}
      <div className={styles.CaptionBar}>
        {is_owner ? (
          <OverlayTrigger placement='top' overlay={<Tooltip>You can't like your own caption!</Tooltip>}>
            <i className="far fa-heart"/>
          </OverlayTrigger>
        ) : like_id ? (
        <span onClick={handleUnlike}>
          <i className={`fas fa-heart ${styles.Heart}`}/>
        </span>
        ) : currentUser ? (
          <span onClick={handleLike}>
            <i className={`far fa-heart ${styles.HeartOutline}`}/>
          </span>
        ) : (
          <OverlayTrigger 
          placement='top' 
          overlay={<Tooltip>Log in to like captions</Tooltip>}
          >
            <i className='far fa-heart'/>
          </OverlayTrigger>
        )}
        <Link to={`/captions/${id}`}>
          <i className='far fa-comments'/>
        </Link>
      </div>
    </Card.Body>
  </Card>
  );
};

export default Caption
