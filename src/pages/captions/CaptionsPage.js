import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Caption from "./Caption";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/CaptionsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefault";

import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function CaptionsPage({ message, filter = "" }) {
  const [captions, setCaptions] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchCaptions = async () => {
      try {
        const { data } = await axiosReq.get(`/captions/?${filter}search=${query}`);
        setCaptions(data);
        setHasLoaded(true);
        console.log(filter)
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchCaptions();
    }, 1000)
    return () => {
      clearTimeout(timer);
    }
  }, [filter, query, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form className={styles.SearchBar}
          onSubmit={(event) => event.PreventDefault()}
          >
            <Form.Control 
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text" 
            className="mr-sm-2"
            placeholder="Find Captions" />
        </Form>
        {hasLoaded ? (
          <>
            {captions.results.length ? (
              <InfiniteScroll
                children={
                  captions.results.map((caption) => (
                    <Caption key={caption.id} {...caption} setCaptions={setCaptions} />
                  ))

                }
                dataLength={captions.results.length}
                loader={<Asset spinner />}
                hasMore={!!captions.next}
                next={() => fetchMoreData(captions, setCaptions)}
              
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
      </Col>
    </Row>
  );
}

export default CaptionsPage;