import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, ListGroup, Form, FormControl, Button, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../Styles/App.scss';

interface Post {
  _id: string;
  title: string;
  content: string;
  comments?: { author: string; text: string }[];
}

interface User {
  firstName: string;
}

const Blogs: React.FC = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserString = localStorage.getItem('user');
    
    if (storedUserString) {
      try {
        const storedUser = JSON.parse(storedUserString);
        console.log('Stored User:', storedUser);
        setUser(storedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
      }
    } else {
      console.warn('No user found in localStorage');
    }
    
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="blogsMainContainer">
      <Navbar expand="lg">
        <Navbar.Brand>My Blog</Navbar.Brand>
        <Nav className="ml-auto">
          {user && (
            <Nav.Link onClick={handleLogout}>
              Logout {user.firstName}?
            </Nav.Link>
          )}
        </Nav>
      </Navbar>

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