import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, ListGroup, Form, FormControl, Button, Row, Col } from 'react-bootstrap';
import '../Styles/App.scss';

interface Post {
  _id: string;
  title: string;
  content: string;
  comments?: { author: string; text: string }[];
}

const Blogs: React.FC = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="blogsMainContainer">
      <h1 className="blogsMainHeader">Blogs</h1>
      <Row>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Col md={8} key={post._id}>
              <Card>
                <Card.Header as="h2">{post.title}</Card.Header>
                <Card.Body>
                  <Card.Text>{post.content}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <ListGroup variant="flush">
                    {post.comments && post.comments.map((comment, index) => (
                      <ListGroup.Item key={index}>
                        <Card>
                          <h5>{comment.author}</h5>
                          <p>{comment.text}</p>
                        </Card>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <Col md={8}>
            <div className="noPostsAvailable">
                <div>No posts available</div>
                <a href="#">Create your first blog post</a>
            </div>
          </Col>
        )}
        <Col className="blogCommentBox" md={4}>
          <Card>
            <Card.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Add a comment</Form.Label>
                  <FormControl as="textarea" rows={3} />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Blogs;
