import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, ListGroup, Form, FormControl, Button, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../Styles/App.scss';
import { useUser } from '../Contexts/UserContext';

interface Comment {
  author: string;
  text: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  comments?: Comment[];
}

const Blogs: React.FC = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [commentText, setCommentText] = useState<string>('');
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
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
    setUser(null);
    navigate('/');
  };

  const handleCommentSubmit = async (postId: string) => {
    if (!commentText) return;

    try {
      const response = await axios.post(`http://localhost:3001/posts/${postId}/comments`, {
        author: user?.firstName || 'Anonymous',
        text: commentText,
      });

      setPosts((prevPosts) => {
        if (!prevPosts) return null;

        return prevPosts.map((post) =>
          post._id === postId ? { ...post, comments: response.data.comments } : post
        );
      });

      setCommentText(''); // Clear the comment input
    } catch (error) {
      console.error('Error adding comment: ', error);
    }
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
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleCommentSubmit(post._id);
                    }}
                  >
                    <Form.Group>
                      <Form.Label>Add a comment</Form.Label>
                      <FormControl
                        as="textarea"
                        rows={3}
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <Col md={8}>
            <div className="noPostsAvailable">
              <div>No posts available</div>
              <a href="/createablog">Create your first blog post</a>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Blogs;
