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
    fave_id,
    love_id,
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

  const handleLove = async () => {
    try {
      const { data } = await axiosRes.post("/love/", { post: id });
      setCaptions((prevCaptions) => ({
        ...prevCaptions,
        results: prevCaptions.results.map((caption) => {
          return caption.id === id
            ? { ...caption, love_id: data.id }
            : caption;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlove = async () => {
    try {
      await axiosRes.delete(`/love/${love_id}/`);
      setCaptions((prevCaptions) => ({
        ...prevCaptions,
        results: prevCaptions.results.map((caption) => {
          return caption.id === id
            ? { ...caption, love_count: caption.love_count - 1, love_id: null }
            : caption;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleFaveCaptions = async () => {
    try {
      const { data } = await axiosRes.post("/fave/", { post: id });
      setCaptions((prevCaptions) => ({
        ...prevCaptions,
        results: prevCaptions.results.map((caption) => {
          return caption.id === id
            ? {
                ...caption, fave_count: caption.fave_count + 1,
                fave_id: data.id,
              } 
            : caption;
        }),
      }));
    } catch (error) {
      console.log(err);
    }
  };

  const handleUnfaveCaptions = async () => {
    try {
      await axiosRes.delete(`/fave/${fave_id}/`);
      setCaptions((prevCaptions) => ({
        ...prevCaptions,
        results: prevCaptions.results.map((caption) => {
          return caption.id === id
            ? {
                ...caption,
                fave_count: caption.fave_count - 1,
                fave_id: null,
              }
            : caption;
        }),
      }));
    } catch (error) {
      console.log(error);
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

        {/* Love captions */}
        {is_owner ? (
          <OverlayTrigger placement='top' overlay={<Tooltip>You can't love your own caption!</Tooltip>}>
            <i className="far fa-heart"/>
          </OverlayTrigger>
        ) : love_id ? (
        <span onClick={handleUnlove}>
          <i className={`fas fa-heart ${styles.Heart}`}/>
        </span>
        ) : currentUser ? (
          <span onClick={handleLove}>
            <i className={`far fa-heart ${styles.HeartOutline}`}/>
          </span>
        ) : (
          <OverlayTrigger 
          placement='top' 
          overlay={<Tooltip>Log in to love captions!</Tooltip>}
          >
            <i className='far fa-heart'/>
          </OverlayTrigger>
        )}
        <Link to={`/captions/${id}`}>
          <i className='far fa-comments'/>
        </Link>

         {/* Fave captions*/}
         {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't fave your own caption!</Tooltip>}
            >
              <i className="fa-regular fa-bookmark" />
            </OverlayTrigger>
          ) : fave_id ? (
            <span onClick={handleUnfaveCaptions}>
              <i className={`fa-regular fa-bookmark ${styles.Fave}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleFaveCaptions}>
              <i className={`fa-regular fa-bookmark ${styles.Fave}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to fave captions!</Tooltip>}
            >
              <i className="fa-regular fa-bookmark" />
            </OverlayTrigger>
          )}
      </div>
    </Card.Body>
  </Card>
  );
};

export default Caption
