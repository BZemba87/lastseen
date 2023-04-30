import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useCurrentUser } from "../../contexts/CurrentUserContexts";
import { useParams } from "react-router";
import {axiosReq} from "../../api/axiosDefault";
import {
    useProfileData,
    useSetProfileData,
  } from "../../contexts/ProfileDataContext";
import { Button, Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Caption from "../captions/Caption";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";


function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profileCaptions, setProfileCaptions] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const { id } = useParams();
  const setProfileData = useSetProfileData();
  const {pageProfile} = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile}, { data: profileCaptions }] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(`/captions/?owner__profile=${id}`),
        ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfileCaptions(profileCaptions);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="my-2">
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.followers_count}</div>
              <div></div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.following_count}</div>
              <div></div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                onClick={() => {}}
              >
                unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Black}`}
                onClick={() => {}}
              >
                follow
              </Button>
            ))}
        </Col>
        {profile?.content && <Col className="p-3">{profile.content}</Col>}
      </Row>
    </>
  );

  const mainProfileCaptions = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}'s Captions</p>
      <hr />
      
      {profileCaptions.results.length ? (
        <InfiniteScroll
          children={profileCaptions.results.map((caption) => (
            <Caption key={caption.id} {...caption} setCaptions={setProfileCaptions} />
          ))}
          dataLength={profileCaptions.results.length}
          loader={<Asset spinner />}
          hasMore={!!profileCaptions.next}
          next={() => fetchMoreData(profileCaptions, setProfileCaptions)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`Nothing to see here, ${profile?.owner} has no captions!`}
        />
      )}
    </>
  );
   
  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfileCaptions}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
    </Row>
  );
}

export default ProfilePage;